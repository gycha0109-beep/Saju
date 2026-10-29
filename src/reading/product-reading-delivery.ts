import type { ReadingArtifact, ReadingIntent } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { GovernedReadingExecutionResult } from './governed-reading-execution.js';
import { unansweredQuestionGuidance } from './question-scope-guidance.js';

export const PRODUCT_READING_DELIVERY_VERSION = 'myeonghwa-product-reading-delivery-v1';

export type ProductReadingDeliveryState =
  | 'delivered'
  | 'delivered_with_fallback'
  | 'clarification_required'
  | 'unsupported_request'
  | 'invalid_request'
  | 'partial_evidence'
  | 'insufficient_evidence'
  | 'unsupported_intent'
  | 'temporarily_unavailable';

export type ProductReadingDeliveryMessageCode =
  | 'READING_DELIVERED'
  | 'READING_DELIVERED_WITH_GROUNDED_FALLBACK'
  | 'READING_REQUEST_CLARIFICATION_REQUIRED'
  | 'READING_REQUEST_NOT_SUPPORTED'
  | 'READING_REQUEST_INVALID'
  | 'READING_EVIDENCE_PARTIAL'
  | 'READING_EVIDENCE_INSUFFICIENT'
  | 'READING_INTENT_NOT_AVAILABLE'
  | 'READING_TEMPORARILY_UNAVAILABLE';

export type ProductReadingRequiredAction =
  | 'none'
  | 'clarify_request'
  | 'revise_request'
  | 'provide_required_context'
  | 'try_again_later';

export interface ProductReadingCoverageSummary {
  state: 'partial' | 'insufficient' | 'unsupported';
  hasAvailableEvidence: boolean;
  missingRequirementCount: number;
  /** Public, controlled Korean explanation; never an internal requirement code. */
  explanation?: string;
}

export interface ProductReadingClarification {
  kind: 'domain' | 'temporal_scope' | 'request';
  options?: readonly ReadingIntent[];
}

export interface ProductReadingDeliveryResult {
  deliveryId: string;
  deliveryVersion: string;
  state: ProductReadingDeliveryState;
  messageCode: ProductReadingDeliveryMessageCode;
  requiredAction: ProductReadingRequiredAction;
  artifact?: ReadingArtifact;
  clarification?: ProductReadingClarification;
  coverage?: ProductReadingCoverageSummary;
  consumerDiagnostics?: readonly (
    | 'target_person_required'
    | 'request_text_required'
    | 'question_text_required'
    | 'request_not_recognized'
  )[];
  audit: {
    executionId: string;
    preparationId: string;
  };
  constraints: {
    mayExposeInternalClaimIds: false;
    mayExposeRawInternalReasonCodes: false;
    mayExposeResearchAuthorityStateAsConsumerMeaning: false;
    mayRenderCoverageAsFortuneJudgment: false;
    maySynthesizeMissingReadingText: false;
    mayTreatClarificationCandidateAsSelectedIntent: false;
    mayTreatFallbackAsNewInterpretationAuthority: false;
  };
}

const DELIVERY_CONSTRAINTS = Object.freeze({
  mayExposeInternalClaimIds: false as const,
  mayExposeRawInternalReasonCodes: false as const,
  mayExposeResearchAuthorityStateAsConsumerMeaning: false as const,
  mayRenderCoverageAsFortuneJudgment: false as const,
  maySynthesizeMissingReadingText: false as const,
  mayTreatClarificationCandidateAsSelectedIntent: false as const,
  mayTreatFallbackAsNewInterpretationAuthority: false as const,
});

function consumerDiagnostics(
  reasonCodes: readonly string[],
): ProductReadingDeliveryResult['consumerDiagnostics'] {
  const diagnostics = new Set<NonNullable<ProductReadingDeliveryResult['consumerDiagnostics']>[number]>();
  for (const code of reasonCodes) {
    switch (code) {
      case 'TARGET_PERSON_REFERENCE_REQUIRED_FOR_COMPATIBILITY_INTENT':
        diagnostics.add('target_person_required');
        break;
      case 'READING_REQUEST_TEXT_REQUIRED':
        diagnostics.add('request_text_required');
        break;
      case 'QUESTION_TEXT_REQUIRED':
        diagnostics.add('question_text_required');
        break;
      case 'CONSUMER_READING_PHRASE_NOT_IN_FROZEN_GRAMMAR':
        diagnostics.add('request_not_recognized');
        break;
      default:
        break;
    }
  }
  return diagnostics.size === 0 ? undefined : [...diagnostics].sort();
}

function clarificationFor(
  execution: GovernedReadingExecutionResult,
): ProductReadingClarification {
  const reasons = execution.preparation.reasonCodes;
  if (reasons.includes('MULTIPLE_READING_DOMAINS_DETECTED')) {
    const options = execution.preparation.normalization.candidateIntents;
    return {
      kind: 'domain',
      ...(options.length > 1 ? { options } : {}),
    };
  }
  if (reasons.includes('MULTIPLE_TEMPORAL_SCOPES_DETECTED')) {
    return { kind: 'temporal_scope' };
  }
  return { kind: 'request' };
}

function consumerMissingEvidenceLabel(requirement: string): string {
  // Whitelist classifications only; raw rule/Claim/requirement codes
  // must never reach a customer response.
  if (requirement === 'NATAL_GENERAL_FOUNDATION_CLAIM_REQUIRED') {
    return '원국의 기본 구조에 대한 풀이 근거';
  }
  if (requirement === 'NATAL_GENERAL_SYNTHESIS_CLAIM_REQUIRED') {
    return '명식의 여러 특징을 종합할 해석 근거';
  }
  if (requirement === 'COMPATIBILITY_CLAIM_REQUIRED') {
    return '두 사람의 명식을 함께 해석할 근거';
  }
  if (requirement === 'QUESTION_SPECIFIC_CLAIM_REQUIRED') {
    return '질문에 직접 대응하는 풀이 근거';
  }
  if (requirement === 'LIFE_STAGE_PERIOD_CLAIM_REQUIRED') {
    return '삶의 시기별 변화를 해석할 근거';
  }
  if (/^ANNUAL_[A-Z_]+_PERIOD_CLAIM_REQUIRED$/u.test(requirement)) {
    return '해당 연도의 흐름을 해석할 근거';
  }
  if (/^MONTHLY_[A-Z_]+_PERIOD_CLAIM_REQUIRED$/u.test(requirement)) {
    return '해당 월의 흐름을 해석할 근거';
  }
  if (/^NATAL_[A-Z_]+_DOMAIN_CLAIM_REQUIRED$/u.test(requirement) ||
      /^RELATIONSHIP_[A-Z_]+_DOMAIN_CLAIM_REQUIRED$/u.test(requirement)) {
    return '이 주제의 원국 해석 근거';
  }
  return '이 주제를 해석하는 데 필요한 일부 근거';
}

function coverageSummary(
  execution: GovernedReadingExecutionResult,
  state: ProductReadingCoverageSummary['state'],
): ProductReadingCoverageSummary {
  const selection = execution.preparation.composition?.selection;
  const missing = [...new Set(
    (selection?.missingRequirements ?? []).map(consumerMissingEvidenceLabel),
  )];
  const explanation = state === 'unsupported'
    ? '이 주제는 현재 제공 가능한 풀이 범위에 포함되지 않습니다.'
    : missing.length > 0
      ? (state === 'partial'
          ? '일부 풀이 근거가 확인됐지만, 아직 부족한 내용: '
          : '현재 명식에서 필요한 풀이 근거가 충분하지 않습니다. 부족한 내용: ') +
        missing.slice(0, 2).join(' · ') + (missing.length > 2 ? ' 등' : '')
      : state === 'partial'
        ? '일부 풀이 근거만 확인돼 전체 내용을 제공하기 어렵습니다.'
        : '현재 명식에서 이 주제에 대한 풀이 근거가 확인되지 않았습니다.';
  const isUnansweredOpenQuestion =
    state === 'insufficient' &&
    execution.preparation.normalization.request?.intent.domain === 'question_specific';
  return {
    state,
    hasAvailableEvidence: (selection?.selectedClaimIds.length ?? 0) > 0,
    missingRequirementCount: selection?.missingRequirements.length ?? 0,
    explanation: explanation +
      (isUnansweredOpenQuestion ? unansweredQuestionGuidance(
        execution.preparation.normalization.request?.question ?? '',
      ) : ''),
  };
}

function buildDelivery(
  execution: GovernedReadingExecutionResult,
  state: ProductReadingDeliveryState,
  messageCode: ProductReadingDeliveryMessageCode,
  requiredAction: ProductReadingRequiredAction,
  optional: {
    artifact?: ReadingArtifact;
    clarification?: ProductReadingClarification;
    coverage?: ProductReadingCoverageSummary;
    consumerDiagnostics?: ProductReadingDeliveryResult['consumerDiagnostics'];
  } = {},
): ProductReadingDeliveryResult {
  const material = {
    deliveryVersion: PRODUCT_READING_DELIVERY_VERSION,
    executionId: execution.executionId,
    preparationId: execution.preparation.preparationId,
    state,
    messageCode,
    requiredAction,
    readingId: optional.artifact?.readingId,
    clarification: optional.clarification,
    coverage: optional.coverage,
    consumerDiagnostics: optional.consumerDiagnostics,
    constraints: DELIVERY_CONSTRAINTS,
  };
  return {
    deliveryId: `reading_delivery_${deterministicContentHash(material).slice(0, 24)}`,
    deliveryVersion: PRODUCT_READING_DELIVERY_VERSION,
    state,
    messageCode,
    requiredAction,
    ...(optional.artifact === undefined ? {} : { artifact: optional.artifact }),
    ...(optional.clarification === undefined ? {} : { clarification: optional.clarification }),
    ...(optional.coverage === undefined ? {} : { coverage: optional.coverage }),
    ...(optional.consumerDiagnostics === undefined
      ? {}
      : { consumerDiagnostics: optional.consumerDiagnostics }),
    audit: {
      executionId: execution.executionId,
      preparationId: execution.preparation.preparationId,
    },
    constraints: DELIVERY_CONSTRAINTS,
  };
}

export function buildProductReadingDelivery(
  execution: GovernedReadingExecutionResult,
): ProductReadingDeliveryResult {
  switch (execution.state) {
    case 'completed':
      if (execution.artifact === undefined) {
        return buildDelivery(
          execution,
          'temporarily_unavailable',
          'READING_TEMPORARILY_UNAVAILABLE',
          'try_again_later',
        );
      }
      return buildDelivery(execution, 'delivered', 'READING_DELIVERED', 'none', {
        artifact: execution.artifact,
      });
    case 'completed_with_fallback':
      if (execution.artifact === undefined) {
        return buildDelivery(
          execution,
          'temporarily_unavailable',
          'READING_TEMPORARILY_UNAVAILABLE',
          'try_again_later',
        );
      }
      return buildDelivery(
        execution,
        'delivered_with_fallback',
        'READING_DELIVERED_WITH_GROUNDED_FALLBACK',
        'none',
        { artifact: execution.artifact },
      );
    case 'input_ambiguous':
      return buildDelivery(
        execution,
        'clarification_required',
        'READING_REQUEST_CLARIFICATION_REQUIRED',
        'clarify_request',
        { clarification: clarificationFor(execution) },
      );
    case 'input_unsupported':
      return buildDelivery(
        execution,
        'unsupported_request',
        'READING_REQUEST_NOT_SUPPORTED',
        'revise_request',
        {
          consumerDiagnostics: consumerDiagnostics(execution.preparation.reasonCodes),
        },
      );
    case 'input_invalid':
      return buildDelivery(
        execution,
        'invalid_request',
        'READING_REQUEST_INVALID',
        'provide_required_context',
        {
          consumerDiagnostics: consumerDiagnostics(execution.preparation.reasonCodes),
        },
      );
    case 'partial_coverage':
      return buildDelivery(
        execution,
        'partial_evidence',
        'READING_EVIDENCE_PARTIAL',
        'none',
        { coverage: coverageSummary(execution, 'partial') },
      );
    case 'insufficient_evidence':
      return buildDelivery(
        execution,
        'insufficient_evidence',
        'READING_EVIDENCE_INSUFFICIENT',
        'none',
        { coverage: coverageSummary(execution, 'insufficient') },
      );
    case 'unsupported_intent':
      return buildDelivery(
        execution,
        'unsupported_intent',
        'READING_INTENT_NOT_AVAILABLE',
        'revise_request',
        { coverage: coverageSummary(execution, 'unsupported') },
      );
    case 'invariant_blocked':
      return buildDelivery(
        execution,
        'temporarily_unavailable',
        'READING_TEMPORARILY_UNAVAILABLE',
        'try_again_later',
      );
  }
}
