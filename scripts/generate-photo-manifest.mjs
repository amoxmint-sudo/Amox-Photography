import fs from 'node:fs';
import path from 'node:path';

const CATEGORY_FOLDERS = [
  'svadbe',
  '18-rodjendani',
  '1-rodjendani',
  'krstenja',
  'portreti',
  'ngo-organizacije',
  'korporativni-dogadjaji',
];

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'];

function isValidFilename(filename) {
  if (!filename || typeof filename !== 'string') return false;
  const trimmed = filename.trim();
  if (!trimmed || trimmed.startsWith('.')) return false;
  if (trimmed.includes('..') || trimmed.includes('/') || trimmed.includes('\\')) return false;
  const lower = trimmed.toLowerCase();
  return ALLOWED_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

function parseDimensionsFromBuffer(buf) {
  // PNG
  if (
    buf.length >= 24 &&
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47
  ) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
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
          return {
            height: buf.readUInt16BE(offset + 3),
            width: buf.readUInt16BE(offset + 5),
          };
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
      return {
        width: buf.readUInt16LE(26) & 0x3fff,
        height: buf.readUInt16LE(28) & 0x3fff,
      };
    }
    if (chunk === 'VP8L') {
      const b0 = buf[21];
      const b1 = buf[22];
      const b2 = buf[23];
      const b3 = buf[24];
      return {
        width: 1 + (((b1 & 0x3f) << 8) | b0),
        height: 1 + (((b3 & 0x0f) << 10) | (b2 << 2) | ((b1 & 0xc0) >> 6)),
      };
    }
    if (chunk === 'VP8X') {
      return {
        width: 1 + buf.readUIntLE(24, 3),
        height: 1 + buf.readUIntLE(27, 3),
      };
    }
  }
  return null;
}

function getImageDimensions(filePath) {
  try {
    const fd = fs.openSync(filePath, 'r');
    try {
      const headBuf = Buffer.allocUnsafe(262144);
      const bytesRead = fs.readSync(fd, headBuf, 0, headBuf.length, 0);
      const quickDims = parseDimensionsFromBuffer(headBuf.subarray(0, bytesRead));
      if (quickDims) return quickDims;
    } finally {
      fs.closeSync(fd);
    }
    const buf = fs.readFileSync(filePath);
    return parseDimensionsFromBuffer(buf);
  } catch {
    // ignore read errors
  }
  return null;
}

function generateManifest() {
  const photosRoot = path.join(process.cwd(), 'public', 'photos');
  const categories = {};
  const dimensions = {};

  for (const folder of CATEGORY_FOLDERS) {
    const dirPath = path.join(photosRoot, folder);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const files = entries
      .filter((entry) => entry.isFile() && isValidFilename(entry.name))
      .map((entry) => entry.name)
      .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

    categories[folder] = files;

    for (const file of files) {
      const dims = getImageDimensions(path.join(dirPath, file));
      if (dims && dims.width > 0 && dims.height > 0) {
        dimensions[`${folder}/${file}`] = dims;
      }
    }
  }

  const manifest = {
    generatedAt: new Date().toISOString(),
    categories,
    dimensions,
  };

  const outputPath = path.join(process.cwd(), 'lib', 'photos-manifest.json');
  fs.writeFileSync(outputPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');
  console.log(`[photos-manifest] Uspešno generisan manifest u lib/photos-manifest.json`);
}

generateManifest();
