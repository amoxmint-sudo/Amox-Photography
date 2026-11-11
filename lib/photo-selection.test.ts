import test from 'node:test';
import assert from 'node:assert/strict';
import {
  allocatePagePhotos,
  buildPortfolioGalleryOrder,
  createSeededRng,
  shuffleItems,
  isConfirmedVerticalPhoto,
  getVerticalCategoryItems,
} from './photo-selection';
import { discoverPortfolioPhotos } from './photo-discovery';

test('createSeededRng produces deterministic sequences for the same seed', () => {
  const rng1 = createSeededRng(42);
  const rng2 = createSeededRng(42);
  const seq1 = [rng1(), rng1(), rng1(), rng1()];
  const seq2 = [rng2(), rng2(), rng2(), rng2()];
  assert.deepEqual(seq1, seq2);
});

test('shuffleItems does not mutate input array and preserves all elements', () => {
  const input = [1, 2, 3, 4, 5, 6];
  const snapshot = [...input];
  const shuffled = shuffleItems(input, createSeededRng(101));
  assert.deepEqual(input, snapshot);
  assert.deepEqual([...shuffled].sort(), snapshot);
});

test('isConfirmedVerticalPhoto strictly requires confirmed height > width', () => {
  const { items } = discoverPortfolioPhotos();

  const verticalWeddings = getVerticalCategoryItems(items, 'svadbe');
  assert.equal(verticalWeddings.length, 9);
  verticalWeddings.forEach((item) => {
    assert.ok(item.width && item.height && item.height > item.width);
    assert.equal(isConfirmedVerticalPhoto(item), true);
  });

  const verticalEvents = getVerticalCategoryItems(items, '18-rodjendani');
  assert.equal(verticalEvents.length, 3);
  verticalEvents.forEach((item) => {
    assert.ok(item.width && item.height && item.height > item.width);
    assert.equal(isConfirmedVerticalPhoto(item), true);
  });

  const verticalPortraits = getVerticalCategoryItems(items, 'portreti');
  assert.equal(verticalPortraits.length, 12);
  verticalPortraits.forEach((item) => {
    assert.ok(item.width && item.height && item.height > item.width);
    assert.equal(isConfirmedVerticalPhoto(item), true);
  });

  // Horizontal portrait AMX04056.jpg (6192x4128) must be rejected
  const horizPortrait = items.find((i) => i.imagePath.endsWith('/AMX04056.jpg'));
  assert.ok(horizPortrait);
  assert.equal(isConfirmedVerticalPhoto(horizPortrait), false);
});

test('allocatePagePhotos assigns a single vertical photo per service without mixing categories or picking horizontal photos', () => {
  const { items } = discoverPortfolioPhotos();

  for (const seed of [1, 7, 42, 999, 123456]) {
    const selection = allocatePagePhotos(items, seed);

    // 1. Weddings: primary and BrandIntro cover must be confirmed vertical 'svadbe' photos and distinct
    const weddingCover = selection.brandIntroCoverBySlug.weddings;
    const weddingPrimary = selection.servicesBySlug.weddings.primary;

    assert.ok(weddingCover, 'Weddings BrandIntro cover must be assigned');
    assert.ok(weddingPrimary, 'Weddings ServicesOverview primary must be assigned');
    assert.equal(weddingCover.category, 'svadbe');
    assert.equal(weddingPrimary.category, 'svadbe');
    assert.equal(isConfirmedVerticalPhoto(weddingCover), true);
    assert.equal(isConfirmedVerticalPhoto(weddingPrimary), true);
    assert.notEqual(weddingCover.imagePath, weddingPrimary.imagePath);

    // 2. Events: primary and BrandIntro cover must be confirmed vertical '18-rodjendani' photos and distinct
    const eventCover = selection.brandIntroCoverBySlug.events;
    const eventPrimary = selection.servicesBySlug.events.primary;

    assert.ok(eventCover);
    assert.ok(eventPrimary);
    assert.equal(eventCover.category, '18-rodjendani');
    assert.equal(eventPrimary.category, '18-rodjendani');
    assert.equal(isConfirmedVerticalPhoto(eventCover), true);
    assert.equal(isConfirmedVerticalPhoto(eventPrimary), true);
    assert.notEqual(eventCover.imagePath, eventPrimary.imagePath);

    // 3. Portraits: primary and BrandIntro cover must be confirmed vertical 'portreti' photos and distinct
    const portraitCover = selection.brandIntroCoverBySlug.portraits;
    const portraitPrimary = selection.servicesBySlug.portraits.primary;

    assert.ok(portraitCover, 'Portraits BrandIntro cover must be assigned');
    assert.ok(portraitPrimary, 'Portraits ServicesOverview primary must be assigned');
    assert.equal(portraitCover.category, 'portreti');
    assert.equal(portraitPrimary.category, 'portreti');
    assert.equal(isConfirmedVerticalPhoto(portraitCover), true);
    assert.equal(isConfirmedVerticalPhoto(portraitPrimary), true);
    assert.notEqual(portraitCover.imagePath, portraitPrimary.imagePath);

    // 4. Stability check: calling allocatePagePhotos with the same seed yields identical results
    const repeatSelection = allocatePagePhotos(items, seed);
    assert.deepEqual(selection, repeatSelection);
  }
});

test('allocatePagePhotos rotates vertical primary photos across different visit seeds', () => {
  const { items } = discoverPortfolioPhotos();
  const seenCombinations = new Set<string>();

  for (let seed = 1; seed <= 30; seed++) {
    const sel = allocatePagePhotos(items, seed * 7919);
    const key = [
      sel.servicesBySlug.weddings.primary?.imagePath,
      sel.servicesBySlug.events.primary?.imagePath,
      sel.servicesBySlug.portraits.primary?.imagePath,
    ].join('|');
    seenCombinations.add(key);
  }

  assert.ok(
    seenCombinations.size >= 10,
    'Different visit seeds must select diverse vertical photos across page loads'
  );
});

test('buildPortfolioGalleryOrder mixes categories in "Sve" without consecutive same-category items and shuffles individual categories without mutating input', () => {
  const { items } = discoverPortfolioPhotos();
  const originalSnapshot = items.map((i) => i.id);

  const allOrdersSeen = new Set<string>();
  const svadbeOrdersSeen = new Set<string>();
  const portretiOrdersSeen = new Set<string>();

  for (const seed of [1, 2, 17, 42, 99, 1024, 7777, 65535]) {
    const order = buildPortfolioGalleryOrder(items, seed);

    // 1. Original array is never mutated
    assert.deepEqual(
      items.map((i) => i.id),
      originalSnapshot
    );

    // 2. "Sve" contains all 37 photos with no missing or duplicate entries
    assert.equal(order.all.length, items.length);
    assert.deepEqual(
      [...order.all.map((i) => i.id)].sort(),
      [...originalSnapshot].sort()
    );

    // 3. In "Sve", no two adjacent photos belong to the same category
    for (let i = 1; i < order.all.length; i++) {
      assert.notEqual(
        order.all[i].category,
        order.all[i - 1].category,
        `Adjacent items at ${i - 1} and ${i} should not share category ${order.all[i].category} (seed=${seed})`
      );
    }

    // 4. First 6 items in "Sve" contain at least 3 distinct categories
    const firstSixCategories = new Set(order.all.slice(0, 6).map((i) => i.category));
    assert.ok(firstSixCategories.size >= 3);

    // 5. Each individual category contains only its own items and all of them
    assert.equal(order.byCategory.svadbe.length, 11);
    assert.ok(order.byCategory.svadbe.every((i) => i.category === 'svadbe'));
    assert.equal(order.byCategory['18-rodjendani'].length, 9);
    assert.ok(order.byCategory['18-rodjendani'].every((i) => i.category === '18-rodjendani'));
    assert.equal(order.byCategory.portreti.length, 13);
    assert.ok(order.byCategory.portreti.every((i) => i.category === 'portreti'));

    // 6. Stability for the same seed
    const repeatOrder = buildPortfolioGalleryOrder(items, seed);
    assert.deepEqual(order, repeatOrder);

    allOrdersSeen.add(order.all.slice(0, 6).map((i) => i.id).join(','));
    svadbeOrdersSeen.add(order.byCategory.svadbe.map((i) => i.id).join(','));
    portretiOrdersSeen.add(order.byCategory.portreti.map((i) => i.id).join(','));
  }

  // 7. Different seeds produce different sequences for "Sve" and individual categories
  assert.ok(allOrdersSeen.size >= 6);
  assert.ok(svadbeOrdersSeen.size >= 6);
  assert.ok(portretiOrdersSeen.size >= 6);
});

