import { READING_LOCALE_CATALOG_V1, type ReadingLocaleV1 } from './reading-localization.js';
import type { EngineMenuReason, TwelveMenuId } from './twelve-menu-engine-readiness.js';

/**
 * E-4: source-owned reader status copy, separate from Saju interpretation.
 * Locale recognition does not authorize a translated Reading or public release.
 */
export const READING_READER_LOCALE_RESOURCE_VERSION_V1 =
  'myeonghwa-reading-reader-locale-resources-v1' as const;

export type ReadingReaderLocaleResourceStateV1 =
  | 'internal_korean_copy'
  | 'not_registered';

export interface ReadingReaderLocaleResourceDescriptorV1 {
  readonly locale: ReadingLocaleV1;
  readonly state: ReadingReaderLocaleResourceStateV1;
}

export const READING_READER_LOCALE_RESOURCE_CATALOG_V1:
  readonly ReadingReaderLocaleResourceDescriptorV1[] = Object.freeze(
    READING_LOCALE_CATALOG_V1.map((locale) => Object.freeze({
      locale,
      state: locale === 'ko-KR' ? 'internal_korean_copy' : 'not_registered',
    })),
  );

const KOREAN_READER_REASON_MESSAGES_V1: Readonly<Record<EngineMenuReason, string>> =
  Object.freeze({
    not_executed: '이 메뉴의 실제 개인별 풀이가 아직 실행되지 않았습니다.',
    input_required: '풀이에 필요한 입력을 먼저 확인해야 합니다.',
    evidence_insufficient: '현재 입력과 승인된 출처 범위로는 이 주제의 풀이 근거가 충분하지 않습니다.',
    limited_reading: '근거가 허용하는 일부 풀이만 표시합니다. 종합해석의 품질 완료나 정식 제공 승인은 아닙니다.',
    official_grounded_response:
      '허용된 근거로 생성한 풀이입니다. 전체 제품의 공개·보관·판매 권한과는 별개입니다.',
  });

const KOREAN_READER_MENU_LABELS_V1: Readonly<Record<TwelveMenuId, string>> =
  Object.freeze({
    general: '전체 사주',
    career: '직업·커리어',
    wealth: '재물',
    relationship: '연애·관계',
    business: '사업',
    family: '가족',
    life_stage: '삶의 단계',
    annual: '올해',
    monthly: '이번 달',
    spouse: '배우자·관계',
    compatibility: '궁합',
    question: '지금 고민으로 보기',
  });

const KOREAN_FAMILY_SECTION_TITLES_V1 = Object.freeze({
  'family:natal:parents': '부모와의 관계',
  'family:natal:children': '자녀와의 관계',
} as const);

/**
 * Copy-only controlled Korean display terms, not methodology definitions.
 * Do not infer new Saju semantics or produce translations from this table.
 */
export const KOREAN_READING_DISPLAY_TERMS_V1 = Object.freeze({
  natal_chart: '명식',
  ten_gods: '십신',
  spouse_palace: '배우자궁',
  annual_reading: '연운',
  monthly_reading: '월운',
} as const);

const KOREAN_RESOURCES_V1 = Object.freeze({
  version: READING_READER_LOCALE_RESOURCE_VERSION_V1,
  locale: 'ko-KR' as const,
  state: 'internal_korean_copy' as const,
  reasonMessages: KOREAN_READER_REASON_MESSAGES_V1,
  menuLabels: KOREAN_READER_MENU_LABELS_V1,
  familySectionTitles: KOREAN_FAMILY_SECTION_TITLES_V1,
  displayTerms: KOREAN_READING_DISPLAY_TERMS_V1,
  constraints: Object.freeze({
    mayTranslateUnapprovedMeanings: false as const,
    mayFallbackToAnotherLocale: false as const,
    mayGrantProductionOrPublicAvailability: false as const,
    mayClaimForeignLanguageCoverage: false as const,
  }),
});

/**
 * Missing locales are never filled by automatic Korean/English fallback.
 * zh-CN vs zh-TW and ms-MY vs id-ID remain separate resource identities.
 */
export function getReadingReaderLocaleResourcesV1(
  locale: ReadingLocaleV1,
): typeof KOREAN_RESOURCES_V1 {
  if (!(READING_LOCALE_CATALOG_V1 as readonly string[]).includes(locale)) {
    throw new RangeError('Unknown Reader locale: ' + locale);
  }
  if (locale !== 'ko-KR') {
    throw new RangeError('Reader locale resources are not registered: ' + locale);
  }
  return KOREAN_RESOURCES_V1;
}

export function readReaderMenuLabelV1(
  locale: ReadingLocaleV1,
  menuId: TwelveMenuId,
): string {
  const resources = getReadingReaderLocaleResourcesV1(locale);
  const label: string | undefined =
    (resources.menuLabels as Partial<Record<string, string>>)[menuId];
  if (typeof label !== 'string' || label.trim().length === 0) {
    throw new TypeError('Unknown Reader menu key: ' + menuId);
  }
  return label;
}

export function readReaderReasonMessageV1(
  locale: ReadingLocaleV1,
  reason: EngineMenuReason,
): string {
  const resources = getReadingReaderLocaleResourcesV1(locale);
  const message: string | undefined =
    (resources.reasonMessages as Partial<Record<string, string>>)[reason];
  if (typeof message !== 'string' || message.trim().length === 0) {
    throw new TypeError('Unknown Reader message key: ' + reason);
  }
  return message;
}

export function readReaderSectionTitleV1(
  locale: ReadingLocaleV1,
  menuTitle: string,
  readingSection: string,
): string {
  const resources = getReadingReaderLocaleResourcesV1(locale);
  if (readingSection === 'family:natal:parents') {
    return resources.familySectionTitles['family:natal:parents'];
  }
  if (readingSection === 'family:natal:children') {
    return resources.familySectionTitles['family:natal:children'];
  }
  return menuTitle;
}
