import fs from 'node:fs';
import path from 'node:path';
import {
  PHOTO_GALLERY_CATEGORIES,
  PortfolioCategoryId,
  isValidPhotoFilename,
  sortPhotoFilenames,
} from './photo-categories';
import {
  PortfolioItem,
  PhotoDimensions,
  buildPortfolioItemFromPhoto,
  buildPortfolioItemsFromMap,
} from './portfolio-data';
import manifestData from './photos-manifest.json';

export { buildPortfolioItemFromPhoto, buildPortfolioItemsFromMap };
export type { PhotoDimensions };

export interface PhotoDiscoveryResult {
  items: PortfolioItem[];
  source: 'filesystem' | 'manifest';
  countsByCategory: Record<PortfolioCategoryId, number>;
}

function parseDimensionsFromBuffer(buf: Buffer): PhotoDimensions | null {
  // PNG
  if (
    buf.length >= 24 &&
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47
  ) {
    const width = buf.readUInt32BE(16);
    const height = buf.readUInt32BE(20);
    if (width > 0 && height > 0) return { width, height };
  }
  // JPEG
  if (buf.length >= 4 && buf[0] === 0xff && buf[1] === 0xd8) {
    let offset = 2;
    while (offset < buf.length) {
      while (offset < buf.length && buf[offset] === 0xff) offset++;
      if (offset >= buf.length) break;
      const marker = buf[offset++];
      if (
        marker === 0xd8 ||
        marker === 0xd9 ||
        (marker >= 0xd0 && marker <= 0xd7) ||
        marker === 0x01
      ) {
        continue;
      }
      if (offset + 2 > buf.length) break;
      const len = buf.readUInt16BE(offset);
      if (
        marker >= 0xc0 &&
        marker <= 0xcf &&
        marker !== 0xc4 &&
        marker !== 0xc8 &&
        marker !== 0xcc
      ) {
        if (offset + 7 <= buf.length) {
          const height = buf.readUInt16BE(offset + 3);
          const width = buf.readUInt16BE(offset + 5);
          if (width > 0 && height > 0) return { width, height };
        }
        break;
      }
      offset += len;
    }
  }
  // WebP
  if (
    buf.length >= 30 &&
    buf.toString('ascii', 0, 4) === 'RIFF' &&
    buf.toString('ascii', 8, 12) === 'WEBP'
  ) {
    const chunk = buf.toString('ascii', 12, 16);
    if (chunk === 'VP8 ') {
      const width = buf.readUInt16LE(26) & 0x3fff;
      const height = buf.readUInt16LE(28) & 0x3fff;
      if (width > 0 && height > 0) return { width, height };
    }
    if (chunk === 'VP8L') {
      const b0 = buf[21];
      const b1 = buf[22];
      const b2 = buf[23];
      const b3 = buf[24];
      const width = 1 + (((b1 & 0x3f) << 8) | b0);
      const height =
        1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6));
      if (width > 0 && height > 0) return { width, height };
    }
    if (chunk === 'VP8X') {
      const width = 1 + buf.readUIntLE(24, 3);
      const height = 1 + buf.readUIntLE(27, 3);
      if (width > 0 && height > 0) return { width, height };
    }
  }
  return null;
}

/**
 * Čita stvarne piksel dimenzije (width i height) iz zaglavlja slikovnog fajla (JPEG, PNG, WebP).
 * Radi brzine prvo čita prvih 256 KB zaglavlja, a po potrebi ceo fajl.
 */
export function readImageDimensions(filePath: string): PhotoDimensions | null {
  try {
    const fd = fs.openSync(filePath, 'r');
    try {
      const headBuf = Buffer.allocUnsafe(262144);
      const bytesRead = fs.readSync(fd, headBuf, 0, headBuf.length, 0);
      const slice = headBuf.subarray(0, bytesRead);
      const quickDims = parseDimensionsFromBuffer(slice);
      if (quickDims) return quickDims;
    } finally {
      fs.closeSync(fd);
    }
    const fullBuf = fs.readFileSync(filePath);
    return parseDimensionsFromBuffer(fullBuf);
  } catch {
    // ignore read errors
  }
  return null;
}


/**
 * Čita fotografije direktno iz `public/photos/<kategorija>` foldera na serveru.
 * Ukoliko fajl-sistem nije dostupan (npr. čist statički/edge hosting bez diska),
 * automatski koristi `lib/photos-manifest.json` kao rezervni izvor.
 */
export function discoverPortfolioPhotos(customPhotosRootDir?: string): PhotoDiscoveryResult {
  const photosRoot =
    customPhotosRootDir || path.join(process.cwd(), 'public', 'photos');
  const cachedManifestDims = !customPhotosRootDir
    ? ((manifestData as { dimensions?: Record<string, PhotoDimensions> })
        ?.dimensions || {})
    : {};

  try {
    if (fs.existsSync(photosRoot) && fs.statSync(photosRoot).isDirectory()) {
      const filesByCategory: Partial<Record<PortfolioCategoryId, string[]>> = {};
      const dimensionsByKey: Record<string, PhotoDimensions> = {};
      const prefixByFileKey: Record<string, string> = {};

      const rootEntries = fs.readdirSync(photosRoot, { withFileTypes: true });

      for (const catConfig of PHOTO_GALLERY_CATEGORIES) {
        let resolvedFolderName: string = catConfig.folderName;
        let categoryDir = path.join(photosRoot, resolvedFolderName);

        if (!fs.existsSync(categoryDir) || !fs.statSync(categoryDir).isDirectory()) {
          const caseInsensitiveMatch = rootEntries.find(
            (e) =>
              e.isDirectory() &&
              e.name.toLowerCase() === catConfig.folderName.toLowerCase()
          );
          if (caseInsensitiveMatch) {
            resolvedFolderName = caseInsensitiveMatch.name;
            categoryDir = path.join(photosRoot, resolvedFolderName);
          } else {
            filesByCategory[catConfig.id] = [];
            continue;
          }
        }

        const dirEntries = fs.readdirSync(categoryDir, { withFileTypes: true });
        const validFilenames = dirEntries
          .filter((entry) => entry.isFile() && isValidPhotoFilename(entry.name))
          .map((entry) => entry.name);

        const sortedFilenames = sortPhotoFilenames(validFilenames);
        filesByCategory[catConfig.id] = sortedFilenames;

        for (const filename of sortedFilenames) {
          const key = `${catConfig.folderName}/${filename}`;
          if (resolvedFolderName !== catConfig.folderName) {
            prefixByFileKey[key] = `/photos/${resolvedFolderName}`;
          }
          const cached = cachedManifestDims[key];
          if (cached && cached.width > 0 && cached.height > 0) {
            dimensionsByKey[key] = cached;
          } else {
            const fullFilePath = path.join(categoryDir, filename);
            const dims = readImageDimensions(fullFilePath);
            if (dims) {
              dimensionsByKey[key] = dims;
            }
          }
        }
      }

      const { items, countsByCategory } = buildPortfolioItemsFromMap(
        filesByCategory,
        dimensionsByKey,
        prefixByFileKey
      );
      return {
        items,
        source: 'filesystem',
        countsByCategory,
      };
    }
  } catch {
    // Fallback na statički manifest ako serversko čitanje direktorijuma nije podržano
  }

  const fallbackMap = (manifestData?.categories || {}) as Partial<
    Record<PortfolioCategoryId, string[]>
  >;
  const fallbackDimensions = ((
    manifestData as { dimensions?: Record<string, PhotoDimensions> }
  )?.dimensions || {});
  const { items, countsByCategory } = buildPortfolioItemsFromMap(
    fallbackMap,
    fallbackDimensions
  );
  return {
    items,
    source: 'manifest',
    countsByCategory,
  };
}
