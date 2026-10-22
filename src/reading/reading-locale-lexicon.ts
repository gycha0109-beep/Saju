import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ProductReadingResponseMessageCode } from './product-reading-response.js';
import {
  READING_LOCALE_CATALOG_V1,
  type ReadingLocaleV1,
} from './reading-localization.js';

export const READING_LOCALE_LEXICON_SCHEMA_VERSION_V1 =
  'myeonghwa-reading-locale-lexicon-v1' as const;

/**
 * Terminology is keyed by meaning-neutral concept IDs, never by source Claim
 * or an assumption that translated terms grant interpretation authority.
 */
export const READING_TERMINOLOGY_KEYS_V1 = [
  'four_pillars',
  'year_pillar',
  'month_pillar',
  'day_pillar',
  'hour_pillar',
  'day_master',
  'ten_gods',
  'ten_year_luck_cycle',
] as const;

export type ReadingTerminologyKeyV1 = (typeof READING_TERMINOLOGY_KEYS_V1)[number];

export const READING_STATUS_MESSAGE_CODES_V1 = [
  'READING_DELIVERED',
  'READING_DELIVERED_WITH_GROUNDED_FALLBACK',
  'READING_REQUEST_CLARIFICATION_REQUIRED',
  'READING_REQUEST_NOT_SUPPORTED',
  'READING_REQUEST_INVALID',
  'READING_EVIDENCE_PARTIAL',
  'READING_EVIDENCE_INSUFFICIENT',
  'READING_INTENT_NOT_AVAILABLE',
  'READING_TEMPORARILY_UNAVAILABLE',
] as const satisfies readonly ProductReadingResponseMessageCode[];

export interface ReadingLocaleLexiconV1 {
  schemaVersion: typeof READING_LOCALE_LEXICON_SCHEMA_VERSION_V1;
  locale: ReadingLocaleV1;
  glossaryVersion: string;
  /** Language-specific terms for the same structural concept. */
  terminology: Readonly<Record<ReadingTerminologyKeyV1, string>>;
  /** Neutral messages only; no personalized fortune inference. */
  statusMessages: Readonly<Record<ProductReadingResponseMessageCode, string>>;
  contentHash: string;
  constraints: {
    mayRenderPersonalReading: false;
    mayTreatLexiconAsClaimAuthority: false;
    mayFallbackToAnotherLocale: false;
  };
}

const CONSTRAINTS = Object.freeze({
  mayRenderPersonalReading: false as const,
  mayTreatLexiconAsClaimAuthority: false as const,
  mayFallbackToAnotherLocale: false as const,
});

type LocaleLexiconSource = Pick<
  ReadingLocaleLexiconV1,
  'locale' | 'glossaryVersion' | 'terminology' | 'statusMessages'
>;

/**
 * Only these two locale resources are authored at this stage.
 * ja-JP / zh-CN / zh-TW / vi-VN / ms-MY / id-ID are catalog entries only.
 */
const REGISTERED_LOCALE_SOURCES: readonly LocaleLexiconSource[] = [
  {
    locale: 'ko-KR',
    glossaryVersion: 'myeonghwa-reading-terms-ko-KR-v1',
    terminology: {
      four_pillars: '사주',
      year_pillar: '년주',
      month_pillar: '월주',
      day_pillar: '일주',
      hour_pillar: '시주',
      day_master: '일간',
      ten_gods: '십신',
      ten_year_luck_cycle: '대운',
    },
    statusMessages: {
      READING_DELIVERED: '확인된 근거 범위에서 풀이를 제공합니다.',
      READING_DELIVERED_WITH_GROUNDED_FALLBACK: '확인된 근거 범위에서 대체 풀이를 제공합니다.',
      READING_REQUEST_CLARIFICATION_REQUIRED: '어떤 내용을 알고 싶은지 조금 더 구체적으로 선택해 주세요.',
      READING_REQUEST_NOT_SUPPORTED: '요청한 내용은 현재 지원하지 않습니다.',
      READING_REQUEST_INVALID: '풀이에 필요한 입력 정보를 확인해 주세요.',
      READING_EVIDENCE_PARTIAL: '현재 근거로는 일부 내용만 설명할 수 있습니다.',
      READING_EVIDENCE_INSUFFICIENT: '현재 근거만으로는 풀이를 제공하기 어렵습니다.',
      READING_INTENT_NOT_AVAILABLE: '이 주제의 풀이는 현재 제공할 수 없습니다.',
      READING_TEMPORARILY_UNAVAILABLE: '일시적으로 풀이를 제공할 수 없습니다.',
    },
  },
  {
    locale: 'en-US',
    glossaryVersion: 'myeonghwa-reading-terms-en-US-v1',
    terminology: {
      four_pillars: 'Four Pillars (Saju)',
      year_pillar: 'Year Pillar',
      month_pillar: 'Month Pillar',
      day_pillar: 'Day Pillar',
      hour_pillar: 'Hour Pillar',
      day_master: 'Day Master',
      ten_gods: 'Ten Gods',
      ten_year_luck_cycle: 'Ten-Year Luck Cycle',
    },
    statusMessages: {
      READING_DELIVERED: 'A reading is available within the supported evidence.',
      READING_DELIVERED_WITH_GROUNDED_FALLBACK: 'An alternative reading is available within the supported evidence.',
      READING_REQUEST_CLARIFICATION_REQUIRED: 'Please clarify which subject you would like to explore.',
      READING_REQUEST_NOT_SUPPORTED: 'This request is not currently supported.',
      READING_REQUEST_INVALID: 'Please check the information needed for this reading.',
      READING_EVIDENCE_PARTIAL: 'Only part of this subject can be explained with the available evidence.',
      READING_EVIDENCE_INSUFFICIENT: 'There is not enough supported evidence for this reading.',
      READING_INTENT_NOT_AVAILABLE: 'A reading for this subject is not currently available.',
      READING_TEMPORARILY_UNAVAILABLE: 'This reading is temporarily unavailable.',
    },
  },
];

function isCatalogLocale(locale: string): locale is ReadingLocaleV1 {
  return (READING_LOCALE_CATALOG_V1 as readonly string[]).includes(locale);
}

function normalizedTexts<T extends string>(
  expectedKeys: readonly T[],
  value: Readonly<Record<T, string>>,
): Readonly<Record<T, string>> {
  const sourceKeys = Object.keys(value).sort();
  if (
    sourceKeys.length !== expectedKeys.length ||
    expectedKeys.some((key) => !Object.prototype.hasOwnProperty.call(value, key))
  ) {
    throw new TypeError('Reading locale resource has missing or unexpected message/term keys.');
  }
  const normalized = {} as Record<T, string>;
  for (const key of expectedKeys) {
    const text = value[key]?.trim();
    if (text === undefined || text.length === 0) {
      throw new TypeError('Reading locale resource contains an empty translation.');
    }
    normalized[key] = text;
  }
  return Object.freeze(normalized);
}

function buildLexicon(source: LocaleLexiconSource): ReadingLocaleLexiconV1 {
  if (!isCatalogLocale(source.locale) || source.glossaryVersion.trim().length === 0) {
    throw new TypeError('Reading locale lexicon has an invalid locale/version.');
  }
  const terminology = normalizedTexts(READING_TERMINOLOGY_KEYS_V1, source.terminology);
  const statusMessages = normalizedTexts(READING_STATUS_MESSAGE_CODES_V1, source.statusMessages);
  const material = {
    schemaVersion: READING_LOCALE_LEXICON_SCHEMA_VERSION_V1,
    locale: source.locale,
    glossaryVersion: source.glossaryVersion,
    terminology,
    statusMessages,
    constraints: CONSTRAINTS,
  };
  return Object.freeze({
    ...material,
    contentHash: deterministicContentHash(material),
  });
}

const REGISTRY = new Map(
  REGISTERED_LOCALE_SOURCES.map((source) => {
    const resource = buildLexicon(source);
    return [resource.locale, resource] as const;
  }),
);

/**
 * A known locale with no registered lexicon fails explicitly rather than
 * borrowing Korean/English terms or claiming it is launch-ready.
 */
export function requireReadingLocaleLexiconV1(
  locale: string,
): ReadingLocaleLexiconV1 {
  if (!isCatalogLocale(locale)) {
    throw new RangeError('Unsupported reading locale: ' + locale);
  }
  const resource = REGISTRY.get(locale);
  if (resource === undefined) {
    throw new RangeError('Reading locale lexicon not registered: ' + locale);
  }
  return resource;
}

export function readingLocaleLexiconStatusV1(
  locale: string,
): 'registered' | 'not_registered' | 'unsupported' {
  if (!isCatalogLocale(locale)) return 'unsupported';
  return REGISTRY.has(locale) ? 'registered' : 'not_registered';
}

export function localizedReadingStatusMessageV1(
  locale: string,
  messageCode: ProductReadingResponseMessageCode,
): string {
  const resource = requireReadingLocaleLexiconV1(locale);
  if (!Object.prototype.hasOwnProperty.call(resource.statusMessages, messageCode)) {
    throw new RangeError('Unknown reading status message code.');
  }
  return resource.statusMessages[messageCode];
}
