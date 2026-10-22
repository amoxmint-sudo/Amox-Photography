import test from 'node:test';
import assert from 'node:assert/strict';
import { translations } from './translations';

function getKeys(obj: Record<string, unknown>, prefix = ''): string[] {
  let keys: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      keys = keys.concat(getKeys(value as Record<string, unknown>, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys.sort();
}

test('translations dictionary has full parity between sr and en', () => {
  const srKeys = getKeys(translations.sr as unknown as Record<string, unknown>);
  const enKeys = getKeys(translations.en as unknown as Record<string, unknown>);

  assert.deepEqual(srKeys, enKeys, 'All translation keys in sr must exist in en and vice versa');
  assert.ok(srKeys.length > 50, 'Translation dictionary must be fully populated');

  // Verify non-empty strings
  for (const key of srKeys) {
    const srVal = key.split('.').reduce((acc: any, part) => acc?.[part], translations.sr);
    const enVal = key.split('.').reduce((acc: any, part) => acc?.[part], translations.en);
    assert.ok(typeof srVal === 'string' && srVal.length > 0, `sr.${key} must be a non-empty string`);
    assert.ok(typeof enVal === 'string' && enVal.length > 0, `en.${key} must be a non-empty string`);
  }
});
