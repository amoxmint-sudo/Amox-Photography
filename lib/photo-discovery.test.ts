import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  PHOTO_GALLERY_CATEGORIES,
  isValidPhotoFilename,
  sortPhotoFilenames,
} from './photo-categories';
import { discoverPortfolioPhotos } from './photo-discovery';

test('PHOTO_GALLERY_CATEGORIES defines the exact 7 portfolio categories and folder names', () => {
  assert.equal(PHOTO_GALLERY_CATEGORIES.length, 7);

  const expected = [
    { id: 'svadbe', sr: 'Svadbe', en: 'Weddings' },
    { id: '18-rodjendani', sr: '18. rođendani', en: '18th Birthdays' },
    { id: '1-rodjendani', sr: '1. rođendani', en: '1st Birthdays' },
    { id: 'krstenja', sr: 'Krštenja', en: 'Baptisms' },
    { id: 'portreti', sr: 'Portreti', en: 'Portraits' },
    { id: 'ngo-organizacije', sr: 'NGO i organizacije', en: 'NGOs & Organizations' },
    { id: 'korporativni-dogadjaji', sr: 'Korporativni događaji', en: 'Corporate Events' },
  ];

  expected.forEach((exp, idx) => {
    const actual = PHOTO_GALLERY_CATEGORIES[idx];
    assert.equal(actual.id, exp.id);
    assert.equal(actual.folderName, exp.id);
    assert.equal(actual.publicPathPrefix, `/photos/${exp.id}`);
    assert.equal(actual.label.sr, exp.sr);
    assert.equal(actual.label.en, exp.en);
  });
});

test('isValidPhotoFilename validates supported formats and blocks unsafe paths', () => {
  assert.equal(isValidPhotoFilename('01-svadba.jpg'), true);
  assert.equal(isValidPhotoFilename('kadar.JPEG'), true);
  assert.equal(isValidPhotoFilename('portret.png'), true);
  assert.equal(isValidPhotoFilename('slika.webp'), true);
  assert.equal(isValidPhotoFilename('moderna.AVIF'), true);

  // Reject hidden files, traversal, slashes, and unsupported extensions
  assert.equal(isValidPhotoFilename('.DS_Store'), false);
  assert.equal(isValidPhotoFilename('.hidden.jpg'), false);
  assert.equal(isValidPhotoFilename('../secret.jpg'), false);
  assert.equal(isValidPhotoFilename('sub/photo.jpg'), false);
  assert.equal(isValidPhotoFilename('video.mp4'), false);
  assert.equal(isValidPhotoFilename('readme.txt'), false);
});

test('sortPhotoFilenames uses deterministic natural alphanumeric ordering', () => {
  const input = ['10-kadar.jpg', '2-kadar.jpg', '1-kadar.jpg', '03-kadar.webp'];
  const sorted = sortPhotoFilenames(input);
  assert.deepEqual(sorted, ['1-kadar.jpg', '2-kadar.jpg', '03-kadar.webp', '10-kadar.jpg']);
});

test('discoverPortfolioPhotos automatically discovers newly added photos across category folders', () => {
  const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'amox-photos-test-'));
  try {
    const dir18 = path.join(tmpDir, '18-rodjendani');
    fs.mkdirSync(dir18, { recursive: true });
    fs.writeFileSync(path.join(dir18, '10-torta.webp'), 'fake');
    fs.writeFileSync(path.join(dir18, '01-ulazak.jpg'), 'fake');
    fs.writeFileSync(path.join(dir18, '02-slavljenik-portret.avif'), 'fake');
    fs.writeFileSync(path.join(dir18, '.DS_Store'), 'ignored');
    fs.writeFileSync(path.join(dir18, 'notes.txt'), 'ignored');

    const dirPortreti = path.join(tmpDir, 'portreti');
    fs.mkdirSync(dirPortreti, { recursive: true });
    fs.writeFileSync(path.join(dirPortreti, '01-editorial-portret.jpg'), 'fake');
    fs.writeFileSync(path.join(dirPortreti, '.gitkeep'), '');

    const result = discoverPortfolioPhotos(tmpDir);
    assert.equal(result.source, 'filesystem');
    assert.equal(result.countsByCategory['18-rodjendani'], 3);
    assert.equal(result.countsByCategory['portreti'], 1);
    assert.equal(result.countsByCategory['svadbe'], 0);

    const items18 = result.items.filter((i) => i.category === '18-rodjendani');
    assert.equal(items18.length, 3);
    assert.equal(items18[0].imagePath, '/photos/18-rodjendani/01-ulazak.jpg');
    assert.equal(items18[1].imagePath, '/photos/18-rodjendani/02-slavljenik-portret.avif');
    assert.equal(items18[1].aspectRatio, 'portrait');
    assert.equal(items18[2].imagePath, '/photos/18-rodjendani/10-torta.webp');

    const itemsPortreti = result.items.filter((i) => i.category === 'portreti');
    assert.equal(itemsPortreti.length, 1);
    assert.equal(itemsPortreti[0].imagePath, '/photos/portreti/01-editorial-portret.jpg');
    assert.equal(itemsPortreti[0].title.sr, 'Portreti — Kadar 01');
    assert.equal(itemsPortreti[0].title.en, 'Portraits — Frame 01');
  } finally {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  }
});

test('discoverPortfolioPhotos reads real width, height, and aspectRatio from actual photos in public/photos including all 13 portraits', () => {
  const result = discoverPortfolioPhotos();
  assert.equal(result.countsByCategory['svadbe'], 11);
  assert.equal(result.countsByCategory['18-rodjendani'], 9);
  assert.equal(result.countsByCategory['1-rodjendani'], 0);
  assert.equal(result.countsByCategory['krstenja'], 0);
  assert.equal(result.countsByCategory['portreti'], 13);
  assert.equal(result.countsByCategory['ngo-organizacije'], 0);
  assert.equal(result.countsByCategory['korporativni-dogadjaji'], 0);
  assert.equal(result.items.length, 33);

  const svadbaLandscape = result.items.find((i) =>
    i.imagePath.endsWith('/AMX03165-Edit.jpg')
  );
  assert.ok(svadbaLandscape);
  assert.equal(svadbaLandscape.width, 6192);
  assert.equal(svadbaLandscape.height, 4128);
  assert.equal(svadbaLandscape.aspectRatio, 'landscape');

  const portraitVertical = result.items.find((i) =>
    i.imagePath.endsWith('/AMX00230-Edit.jpg')
  );
  assert.ok(portraitVertical);
  assert.equal(portraitVertical.category, 'portreti');
  assert.equal(portraitVertical.width, 4128);
  assert.equal(portraitVertical.height, 6192);
  assert.equal(portraitVertical.aspectRatio, 'portrait');

  const portraitHorizontal = result.items.find((i) =>
    i.imagePath.endsWith('/AMX04056.jpg')
  );
  assert.ok(portraitHorizontal);
  assert.equal(portraitHorizontal.category, 'portreti');
  assert.equal(portraitHorizontal.width, 6192);
  assert.equal(portraitHorizontal.height, 4128);
  assert.equal(portraitHorizontal.aspectRatio, 'landscape');

  const rodjendan18Landscape = result.items.find((i) =>
    i.imagePath.endsWith('/AMX01858.jpg')
  );
  assert.ok(rodjendan18Landscape);
  assert.equal(rodjendan18Landscape.width, 6192);
  assert.equal(rodjendan18Landscape.height, 4128);
  assert.equal(rodjendan18Landscape.aspectRatio, 'landscape');
});
