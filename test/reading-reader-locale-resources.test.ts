import { describe, expect, it } from 'vitest';
import { READING_LOCALE_CATALOG_V1 } from '../src/reading/reading-localization.js';
import {
  getReadingReaderLocaleResourcesV1,
  KOREAN_READING_DISPLAY_TERMS_V1,
  READING_READER_LOCALE_RESOURCE_CATALOG_V1,
  readReaderReasonMessageV1,
  readReaderSectionTitleV1,
} from '../src/reading/reading-reader-locale-resources.js';
import { buildTwelveMenuReaderCards } from '../src/reading/twelve-menu-reader-cards.js';

describe('E-4 Korean Reader locale source-copy resources', () => {
  it('pins existing Korean messages, family titles and display terminology', () => {
    const resources = getReadingReaderLocaleResourcesV1('ko-KR');
    expect(resources.state).toBe('internal_korean_copy');
    expect(resources.reasonMessages).toEqual({
      not_executed: '이 메뉴의 실제 개인별 풀이가 아직 실행되지 않았습니다.',
      input_required: '풀이에 필요한 입력을 먼저 확인해야 합니다.',
      evidence_insufficient: '현재 입력과 승인된 출처 범위로는 이 주제의 풀이 근거가 충분하지 않습니다.',
      limited_reading: '근거가 허용하는 일부 풀이만 표시합니다. 종합해석의 품질 완료나 정식 제공 승인은 아닙니다.',
      official_grounded_response:
        '허용된 근거로 생성한 풀이입니다. 전체 제품의 공개·보관·판매 권한과는 별개입니다.',
    });
    expect(readReaderReasonMessageV1('ko-KR', 'not_executed'))
      .toBe(resources.reasonMessages.not_executed);
    expect(readReaderSectionTitleV1('ko-KR', '가족', 'family:natal:parents'))
      .toBe('부모와의 관계');
    expect(readReaderSectionTitleV1('ko-KR', '가족', 'family:natal:children'))
      .toBe('자녀와의 관계');
    expect(readReaderSectionTitleV1('ko-KR', '사업', 'business:natal'))
      .toBe('사업');
    expect(KOREAN_READING_DISPLAY_TERMS_V1).toEqual({
      natal_chart: '명식', ten_gods: '십신', spouse_palace: '배우자궁',
      annual_reading: '연운', monthly_reading: '월운',
    });
  });

  it('keeps all other catalog locales separate and fails closed without translation/fallback', () => {
    expect(READING_READER_LOCALE_RESOURCE_CATALOG_V1.map(x => x.locale))
      .toEqual(READING_LOCALE_CATALOG_V1);
    expect(new Set(READING_READER_LOCALE_RESOURCE_CATALOG_V1.map(x => x.locale)).size)
      .toBe(READING_LOCALE_CATALOG_V1.length);
    expect(READING_READER_LOCALE_RESOURCE_CATALOG_V1.filter(x => x.state === 'internal_korean_copy')
      .map(x => x.locale)).toEqual(['ko-KR']);
    for (const locale of ['en-US', 'ja-JP', 'zh-CN', 'zh-TW', 'vi-VN', 'ms-MY', 'id-ID'] as const) {
      expect(() => getReadingReaderLocaleResourcesV1(locale)).toThrow('not registered');
      expect(() => readReaderReasonMessageV1(locale, 'not_executed')).toThrow('not registered');
      expect(() => readReaderSectionTitleV1(locale, '가족', 'family:natal:parents'))
        .toThrow('not registered');
    }
    expect(() => getReadingReaderLocaleResourcesV1('xx-XX' as 'ko-KR'))
      .toThrow('Unknown Reader locale');
    expect(() => readReaderReasonMessageV1('ko-KR', 'invented' as 'not_executed'))
      .toThrow('Unknown Reader message key');
  });

  it('uses exact previous Korean copy in the real twelve-menu Reader cards without changing authority', () => {
    const cards = buildTwelveMenuReaderCards([]);
    expect(cards).toHaveLength(12);
    expect(cards.every(card => card.state === 'unavailable')).toBe(true);
    expect(cards.every(card => card.sections.every(section =>
      section.message === '이 메뉴의 실제 개인별 풀이가 아직 실행되지 않았습니다.' &&
      section.reading === undefined))).toBe(true);
    expect(cards.find(x => x.menuId === 'family')?.sections.map(x => x.title))
      .toEqual(['부모와의 관계', '자녀와의 관계']);
    expect(cards.every(card => !card.constraints.mayPublish &&
      !card.constraints.maySell && !card.constraints.mayGrantPublicAvailability)).toBe(true);
    const resources = getReadingReaderLocaleResourcesV1('ko-KR');
    expect(Object.values(resources.constraints).every(value => value === false)).toBe(true);
  });
});
