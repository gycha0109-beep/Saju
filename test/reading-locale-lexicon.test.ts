import { describe, expect, it } from 'vitest';
import {
  READING_STATUS_MESSAGE_CODES_V1,
  READING_TERMINOLOGY_KEYS_V1,
  localizedReadingStatusMessageV1,
  readingLocaleLexiconStatusV1,
  requireReadingLocaleLexiconV1,
} from '../src/reading/reading-locale-lexicon.js';

describe('Reading locale terminology and status-message resources', () => {
  it('provides complete and versioned Korean and English non-interpretive resources', () => {
    const korean = requireReadingLocaleLexiconV1('ko-KR');
    const english = requireReadingLocaleLexiconV1('en-US');
    for (const lexicon of [korean, english]) {
      expect(Object.keys(lexicon.terminology).sort())
        .toEqual([...READING_TERMINOLOGY_KEYS_V1].sort());
      expect(Object.keys(lexicon.statusMessages).sort())
        .toEqual([...READING_STATUS_MESSAGE_CODES_V1].sort());
      expect(lexicon.glossaryVersion.length).toBeGreaterThan(0);
      expect(lexicon.contentHash).toMatch(/^[0-9a-f]{64}$/u);
      expect(lexicon.constraints).toEqual({
        mayRenderPersonalReading: false,
        mayTreatLexiconAsClaimAuthority: false,
        mayFallbackToAnotherLocale: false,
      });
    }
    expect(korean.terminology.day_master).toBe('일간');
    expect(english.terminology.day_master).toBe('Day Master');
    expect(korean.contentHash).not.toBe(english.contentHash);
    expect(requireReadingLocaleLexiconV1('ko-KR')).toBe(korean);
  });

  it('localizes only static reading status codes and does not synthesize reading text', () => {
    expect(localizedReadingStatusMessageV1('ko-KR', 'READING_EVIDENCE_INSUFFICIENT'))
      .toContain('근거');
    expect(localizedReadingStatusMessageV1('en-US', 'READING_EVIDENCE_INSUFFICIENT'))
      .toContain('evidence');
    expect(localizedReadingStatusMessageV1('en-US', 'READING_INTENT_NOT_AVAILABLE'))
      .toContain('not currently available');
    expect(() => localizedReadingStatusMessageV1(
      'en-US', 'INVENTED_PREDICTION' as never,
    )).toThrow(RangeError);
  });

  it('keeps catalog membership separate from lexicon registration and foreign-language reading readiness', () => {
    expect(readingLocaleLexiconStatusV1('ko-KR')).toBe('registered');
    expect(readingLocaleLexiconStatusV1('en-US')).toBe('registered');
    for (const locale of ['ja-JP', 'zh-CN', 'zh-TW', 'vi-VN', 'ms-MY', 'id-ID']) {
      expect(readingLocaleLexiconStatusV1(locale)).toBe('not_registered');
      expect(() => requireReadingLocaleLexiconV1(locale)).toThrow(RangeError);
    }
    expect(readingLocaleLexiconStatusV1('fr-FR')).toBe('unsupported');
    expect(() => requireReadingLocaleLexiconV1('fr-FR')).toThrow(RangeError);
    expect(() => localizedReadingStatusMessageV1('vi-VN', 'READING_DELIVERED'))
      .toThrow(RangeError);
  });
});
