import type { ContentAddressedVersionedRef } from '../contracts/common.js';
import type { ReadingIntent, ReadingRequest } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { resolveDomainReadingProfile } from './reading-intent-composition.js';
import { resolveReadingProfileSelectionAuthorization } from './reading-profile-authorization.js';

export const CONSUMER_READING_REQUEST_ADAPTER_VERSION =
  'myeonghwa-consumer-reading-request-adapter-v1';

export type ConsumerReadingNormalizationState =
  | 'resolved'
  | 'ambiguous'
  | 'unsupported'
  | 'invalid';

export interface ConsumerReadingRequestInput {
  requestId: string;
  text: string;
  targetPersonRef?: string;
  outputPreferences?: ReadingRequest['outputPreferences'];
}

export interface ConsumerReadingNormalizationResult {
  normalizationId: string;
  adapterVersion: string;
  state: ConsumerReadingNormalizationState;
  normalizedText: string;
  request?: ReadingRequest;
  profileRef?: ContentAddressedVersionedRef;
  profileAuthorizationRef?: ContentAddressedVersionedRef;
  candidateIntents: readonly ReadingIntent[];
  reasonCodes: readonly string[];
  constraints: {
    mayUseLLMForIntentResolution: false;
    mayGenerateInterpretationClaims: false;
    mayAuthorizeDomainSemantics: false;
    mayPromoteResearchAuthority: false;
  };
}

interface SemanticAlias {
  aliases: readonly string[];
  domain: ReadingIntent['domain'];
  relationshipScope?: ReadingIntent['relationshipScope'];
}

const SEMANTIC_ALIASES: readonly SemanticAlias[] = [
  { aliases: ['사주', '일반 사주', '전체 사주', '종합 사주'], domain: 'general' },
  { aliases: ['부모운', '부모 운'], domain: 'family', relationshipScope: 'parents' },
  { aliases: ['자녀운', '자녀 운'], domain: 'family', relationshipScope: 'children' },
  {
    aliases: ['연애운', '연애 운', '관계운', '관계 운'],
    domain: 'relationship',
    relationshipScope: 'general',
  },
  {
    aliases: ['배우자운', '배우자 운'],
    domain: 'relationship',
    relationshipScope: 'spouse',
  },
  { aliases: ['궁합'], domain: 'compatibility' },
  { aliases: ['직업운', '직업 운'], domain: 'career' },
  { aliases: ['사업운', '사업 운'], domain: 'business' },
  { aliases: ['재물운', '재물 운'], domain: 'wealth' },
  { aliases: ['평생 흐름', '인생 흐름'], domain: 'life_stage' },
];

const ANNUAL_MARKERS = ['올해', '금년', '연운'] as const;
const MONTHLY_MARKERS = ['이번 달', '이번달', '이달', '월운'] as const;
const POLITE_SUFFIXES = [
  '봐주세요',
  '봐 줘요',
  '봐줘요',
  '봐 주세요',
  '봐줘',
  '봐 줘',
  '알려주세요',
  '알려 주세요',
  '알려줘',
  '알려 줘',
  '풀이해주세요',
  '풀이해 주세요',
  '풀이해줘',
  '풀이해 줘',
] as const;

const DIRECT_GENERAL_PERIOD_ALIASES: Readonly<Record<string, ReadingIntent>> = {
  연운: { domain: 'general', temporalScope: 'annual' },
  '올해 운': { domain: 'general', temporalScope: 'annual' },
  '올해 운세': { domain: 'general', temporalScope: 'annual' },
  월운: { domain: 'general', temporalScope: 'monthly' },
  '이번 달 운': { domain: 'general', temporalScope: 'monthly' },
  '이번달 운': { domain: 'general', temporalScope: 'monthly' },
  '이달 운': { domain: 'general', temporalScope: 'monthly' },
  '이번 달 운세': { domain: 'general', temporalScope: 'monthly' },
};

const CONSTRAINTS = Object.freeze({
  mayUseLLMForIntentResolution: false as const,
  mayGenerateInterpretationClaims: false as const,
  mayAuthorizeDomainSemantics: false as const,
  mayPromoteResearchAuthority: false as const,
});

function normalizeSurface(text: string): string {
  return text
    .normalize('NFKC')
    .trim()
    .replace(/\s+/gu, ' ')
    .replace(/[?!。！？.]+$/gu, '')
    .trim();
}

function stripPoliteSuffix(text: string): string {
  let current = text;
  for (const suffix of POLITE_SUFFIXES) {
    if (!current.endsWith(suffix)) continue;
    current = current.slice(0, -suffix.length).trim();
    break;
  }
  return current;
}

function intentKey(intent: ReadingIntent): string {
  return `${intent.domain}|${intent.temporalScope}|${intent.relationshipScope ?? ''}`;
}

function dedupeIntents(intents: readonly ReadingIntent[]): ReadingIntent[] {
  const byKey = new Map<string, ReadingIntent>();
  for (const intent of intents) byKey.set(intentKey(intent), intent);
  return [...byKey.values()].sort((left, right) => intentKey(left).localeCompare(intentKey(right)));
}

function containsAny(text: string, markers: readonly string[]): boolean {
  return markers.some((marker) => text.includes(marker));
}

function detectSemanticCandidates(text: string): ReadingIntent[] {
  const temporalScope = containsAny(text, MONTHLY_MARKERS)
    ? 'monthly'
    : containsAny(text, ANNUAL_MARKERS)
      ? 'annual'
      : 'natal';
  return dedupeIntents(
    SEMANTIC_ALIASES.flatMap((entry) =>
      entry.aliases.some((alias) => text.includes(alias))
        ? [
            {
              domain: entry.domain,
              temporalScope,
              ...(entry.relationshipScope === undefined
                ? {}
                : { relationshipScope: entry.relationshipScope }),
            },
          ]
        : [],
    ),
  );
}

function directNatalIntent(text: string): ReadingIntent | undefined {
  for (const entry of SEMANTIC_ALIASES) {
    if (!entry.aliases.includes(text)) continue;
    if (entry.domain === 'life_stage') {
      return { domain: 'life_stage', temporalScope: 'life_stage' };
    }
    return {
      domain: entry.domain,
      temporalScope: 'natal',
      ...(entry.relationshipScope === undefined
        ? {}
        : { relationshipScope: entry.relationshipScope }),
    };
  }
  return undefined;
}

function parseTemporalPrefix(text: string): ReadingIntent | undefined {
  const prefix = ANNUAL_MARKERS.find((marker) => text.startsWith(`${marker} `));
  const monthlyPrefix = MONTHLY_MARKERS.find((marker) => text.startsWith(`${marker} `));
  const temporalScope = monthlyPrefix === undefined ? 'annual' : 'monthly';
  const selectedPrefix = monthlyPrefix ?? prefix;
  if (selectedPrefix === undefined || selectedPrefix === '연운' || selectedPrefix === '월운') {
    return undefined;
  }
  const remainder = text.slice(selectedPrefix.length).trim();
  const natal = directNatalIntent(remainder);
  if (natal === undefined || natal.domain === 'life_stage') return undefined;
  return { ...natal, temporalScope };
}

function makeResult(
  input: ConsumerReadingRequestInput,
  normalizedText: string,
  state: ConsumerReadingNormalizationState,
  reasonCodes: readonly string[],
  candidateIntents: readonly ReadingIntent[],
  request?: ReadingRequest,
  profileRef?: ContentAddressedVersionedRef,
  profileAuthorizationRef?: ContentAddressedVersionedRef,
): ConsumerReadingNormalizationResult {
  const material = {
    adapterVersion: CONSUMER_READING_REQUEST_ADAPTER_VERSION,
    requestId: input.requestId.trim(),
    normalizedText,
    state,
    reasonCodes: [...reasonCodes].sort(),
    candidateIntents: dedupeIntents(candidateIntents),
    ...(request === undefined ? {} : { request }),
    ...(profileRef === undefined ? {} : { profileRef }),
    ...(profileAuthorizationRef === undefined ? {} : { profileAuthorizationRef }),
    constraints: CONSTRAINTS,
  };
  return {
    normalizationId: `reading_request_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function validatedResolvedResult(
  input: ConsumerReadingRequestInput,
  normalizedText: string,
  intent: ReadingIntent,
  question?: string,
): ConsumerReadingNormalizationResult {
  const requestId = input.requestId.trim();
  const targetPersonRef = input.targetPersonRef?.trim();
  if (intent.domain === 'compatibility' && (targetPersonRef === undefined || targetPersonRef.length === 0)) {
    return makeResult(
      input,
      normalizedText,
      'invalid',
      ['TARGET_PERSON_REFERENCE_REQUIRED_FOR_COMPATIBILITY_INTENT'],
      [intent],
    );
  }

  const resolvedProfile = resolveDomainReadingProfile(intent);
  if (resolvedProfile === undefined) {
    return makeResult(
      input,
      normalizedText,
      'unsupported',
      ['READING_PROFILE_NOT_AVAILABLE_FOR_NORMALIZED_INTENT'],
      [intent],
    );
  }
  const authorization = resolveReadingProfileSelectionAuthorization(resolvedProfile.profileRef);
  if (authorization.state !== 'authorized' || authorization.authorizationRef === undefined) {
    return makeResult(
      input,
      normalizedText,
      'unsupported',
      [
        authorization.state === 'content_mismatch'
          ? 'READING_PROFILE_CONTENT_HASH_NOT_AUTHORIZED'
          : 'READING_PROFILE_SELECTION_NOT_AUTHORIZED',
      ],
      [intent],
      undefined,
      resolvedProfile.profileRef,
    );
  }

  const request: ReadingRequest = {
    requestId,
    intent,
    ...(targetPersonRef === undefined || targetPersonRef.length === 0
      ? {}
      : { targetPersonRef }),
    ...(question === undefined ? {} : { question }),
    ...(input.outputPreferences === undefined ? {} : { outputPreferences: input.outputPreferences }),
  };
  return makeResult(
    input,
    normalizedText,
    'resolved',
    [],
    [intent],
    request,
    resolvedProfile.profileRef,
    authorization.authorizationRef,
  );
}

export function normalizeConsumerReadingRequest(
  input: ConsumerReadingRequestInput,
): ConsumerReadingNormalizationResult {
  const requestId = input.requestId.trim();
  const normalizedText = stripPoliteSuffix(normalizeSurface(input.text));
  if (requestId.length === 0) {
    return makeResult(input, normalizedText, 'invalid', ['REQUEST_ID_REQUIRED'], []);
  }
  if (normalizedText.length === 0) {
    return makeResult(input, normalizedText, 'invalid', ['READING_REQUEST_TEXT_REQUIRED'], []);
  }

  if (normalizedText.startsWith('질문:')) {
    const question = normalizedText.slice('질문:'.length).trim();
    const intent: ReadingIntent = { domain: 'question_specific', temporalScope: 'natal' };
    if (question.length === 0) {
      return makeResult(input, normalizedText, 'invalid', ['QUESTION_TEXT_REQUIRED'], [intent]);
    }
    return validatedResolvedResult(input, normalizedText, intent, question);
  }

  const annualDetected = containsAny(normalizedText, ANNUAL_MARKERS);
  const monthlyDetected = containsAny(normalizedText, MONTHLY_MARKERS);
  const semanticCandidates = detectSemanticCandidates(normalizedText);
  if (annualDetected && monthlyDetected) {
    return makeResult(
      input,
      normalizedText,
      'ambiguous',
      ['MULTIPLE_TEMPORAL_SCOPES_DETECTED'],
      semanticCandidates,
    );
  }
  if (semanticCandidates.length > 1) {
    return makeResult(
      input,
      normalizedText,
      'ambiguous',
      ['MULTIPLE_READING_DOMAINS_DETECTED'],
      semanticCandidates,
    );
  }

  const directPeriod = DIRECT_GENERAL_PERIOD_ALIASES[normalizedText];
  if (directPeriod !== undefined) {
    return validatedResolvedResult(input, normalizedText, directPeriod);
  }
  const directNatal = directNatalIntent(normalizedText);
  if (directNatal !== undefined) {
    return validatedResolvedResult(input, normalizedText, directNatal);
  }
  const temporal = parseTemporalPrefix(normalizedText);
  if (temporal !== undefined) {
    return validatedResolvedResult(input, normalizedText, temporal);
  }

  return makeResult(
    input,
    normalizedText,
    'unsupported',
    ['CONSUMER_READING_PHRASE_NOT_IN_FROZEN_GRAMMAR'],
    semanticCandidates,
  );
}
