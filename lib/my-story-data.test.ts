import test from 'node:test';
import assert from 'node:assert/strict';
import { MY_STORY_CONTENT } from './my-story-data';

test('MY_STORY_CONTENT has complete 6-section luxury editorial magazine structure in SR and EN without removed sections', () => {
  for (const lang of ['sr', 'en'] as const) {
    const data = MY_STORY_CONTENT[lang];

    // 01 — Editorial Hero
    assert.equal(data.hero.sectionNum, '01');
    assert.equal(data.hero.publicationHeader, 'AMOX PHOTOGRAPHY & FILM');
    assert.equal(data.hero.titleLines.length, 2);
    assert.ok(data.hero.subtitle.length > 0);
    assert.ok(data.hero.intro.length > 0);
    assert.ok(data.hero.metaExperienceValue.includes('5+'));
    assert.ok(!data.hero.metaDisciplineValue.includes('Film'));

    // 02 — Selected Experience (6 items, asymmetric variants)
    assert.equal(data.selectedExperience.sectionNum, '02');
    assert.equal(data.selectedExperience.items.length, 6);
    assert.equal(data.selectedExperience.items[0].layoutVariant, 'lead');
    assert.equal(data.selectedExperience.items[0].title, 'OBRUČ');
    assert.equal(data.selectedExperience.items[1].layoutVariant, 'major');
    assert.equal(
      data.selectedExperience.items[1].title,
      'MONACO YACHT SHOW — 2026'
    );

    // 03 — Creative Process (4 columns covering all 9 roles)
    assert.equal(data.creativeProcess.sectionNum, '03');
    assert.equal(data.creativeProcess.columns.length, 4);
    const totalRoles = data.creativeProcess.columns.reduce(
      (sum, col) => sum + col.roles.length,
      0
    );
    assert.equal(totalRoles, 9, `${lang} creativeProcess must include all 9 roles across 4 columns`);

    // 04 — Tools of Craft (7 tools, no skill level indicators)
    assert.equal(data.tools.sectionNum, '04');
    assert.equal(data.tools.items.length, 7);
    assert.equal('levelLabel' in data.tools, false);
    assert.equal('unratedValue' in data.tools, false);
    for (const tool of data.tools.items) {
      assert.equal(
        'level' in tool,
        false,
        `${lang} tool ${tool.name} must not have any skill level field`
      );
      assert.ok(tool.name.length > 0);
      assert.ok(tool.purpose.length > 0);
    }

    // 05 — Philosophy of Work
    assert.equal(data.philosophy.sectionNum, '05');
    assert.ok(data.philosophy.p1.length > 0);
    assert.ok(data.philosophy.p2.length > 0);
    assert.ok(data.philosophy.pullQuote.length > 0);

    // Removed sections must not exist
    assert.equal('exhibitions' in data, false);
    assert.equal('education' in data, false);

    // 06 — Closing
    assert.equal(data.closing.sectionNum, '06');
    assert.ok(data.closing.title.length > 0);
    assert.ok(data.closing.text.length > 0);
  }

  // Exact Serbian & English copy verification
  assert.equal(MY_STORY_CONTENT.sr.hero.metaExperienceValue, '5+ godina iskustva');
  assert.equal(MY_STORY_CONTENT.en.hero.metaExperienceValue, '5+ years of experience');
  assert.equal(
    MY_STORY_CONTENT.sr.hero.metaDisciplineValue,
    'Fotografija / Video / Postprodukcija'
  );
  assert.equal(
    MY_STORY_CONTENT.en.hero.metaDisciplineValue,
    'Photography / Video / Post-production'
  );
  assert.equal(
    MY_STORY_CONTENT.sr.hero.subtitle,
    'Fotografija. Video. Vizuelne priče.'
  );
  assert.equal(
    MY_STORY_CONTENT.en.hero.subtitle,
    'Photography. Video. Visual Stories.'
  );
  assert.equal(
    MY_STORY_CONTENT.sr.closing.kicker,
    '06 / ZAVRŠNA SEKCIJA'
  );
  assert.equal(
    MY_STORY_CONTENT.en.closing.kicker,
    '06 / CLOSING'
  );

  // Exact Serbian copy verification for remaining sections
  assert.deepEqual(MY_STORY_CONTENT.sr.hero.titleLines, [
    '„Slika je trenutak.',
    'Priča je ono što ostaje.“',
  ]);
  assert.equal(
    MY_STORY_CONTENT.sr.selectedExperience.title,
    'Rad koji govori umesto biografije.'
  );
  assert.equal(
    MY_STORY_CONTENT.sr.creativeProcess.title,
    'Od prvog kadra do poslednjeg detalja.'
  );
  assert.equal(MY_STORY_CONTENT.sr.tools.title, 'Alati mog zanata.');
  assert.equal(MY_STORY_CONTENT.sr.philosophy.title, 'Više od dobrog kadra.');
  assert.equal(
    MY_STORY_CONTENT.sr.closing.title,
    'Hajde da stvorimo nešto posebno.'
  );
});
