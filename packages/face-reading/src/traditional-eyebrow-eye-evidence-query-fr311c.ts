import {
  queryEvidenceLensFR311C,
  type EvidenceLensKeyFR311C,
} from './traditional-face-topic-lenses-fr311c.js';
import {
  resolveTraditionalCombinationFR311C,
  type CombinationResolutionStatusFR311C,
} from './traditional-eyebrow-eye-combination-resolver-fr311c.js';

export type IntegratedQueryStatusFR311C =
  | 'source_conflict'
  | CombinationResolutionStatusFR311C
  | 'evidence_only'
  | 'no_evidence';

export interface IntegratedTraditionalEvidenceQueryFR311C {
  readonly lensKey: EvidenceLensKeyFR311C;
  readonly formKeys?: readonly string[];
  readonly morphologyTermKeys?: readonly string[];
}

export interface IntegratedTraditionalEvidenceResultFR311C {
  readonly status: IntegratedQueryStatusFR311C;
  readonly lensKey: EvidenceLensKeyFR311C;
  readonly namedEvidenceIds: readonly string[];
  readonly directRuleIds: readonly string[];
  readonly combinationRuleIds: readonly string[];
  readonly namedFormContextIds: readonly string[];
  readonly uncertainEvidenceIds: readonly string[];
  readonly aggregateJudgementAuthorized: false;
  readonly scoreAuthorized: false;
  readonly synthesisAuthorized: false;
  readonly reason: string;
}

export function queryIntegratedTraditionalEvidenceFR311C(
  query: IntegratedTraditionalEvidenceQueryFR311C,
): IntegratedTraditionalEvidenceResultFR311C {
  const lens = queryEvidenceLensFR311C({
    lensKey: query.lensKey,
    ...(query.formKeys === undefined ? {} : { formKeys: query.formKeys }),
    ...(query.morphologyTermKeys === undefined ? {} : { morphologyTermKeys: query.morphologyTermKeys }),
  });
  const combination = resolveTraditionalCombinationFR311C({
    ...(query.formKeys === undefined ? {} : { formKeys: query.formKeys }),
    ...(query.morphologyTermKeys === undefined ? {} : { morphologyTermKeys: query.morphologyTermKeys }),
  });

  let status: IntegratedQueryStatusFR311C;
  if (lens.conflictState === 'source_conflict') {
    status = 'source_conflict';
  } else if (
    combination.status === 'direct_source_combination' ||
    combination.status === 'named_form_context' ||
    combination.status === 'parallel_evidence_only'
  ) {
    status = combination.status;
  } else if (lens.namedEvidenceIds.length > 0 || lens.directRuleIds.length > 0) {
    status = 'evidence_only';
  } else {
    status = 'no_evidence';
  }

  return Object.freeze({
    status,
    lensKey: query.lensKey,
    namedEvidenceIds: lens.namedEvidenceIds,
    directRuleIds: lens.directRuleIds,
    combinationRuleIds: combination.matchedDirectRuleIds,
    namedFormContextIds: combination.matchedContextIds,
    uncertainEvidenceIds: lens.uncertainNamedEvidenceIds,
    aggregateJudgementAuthorized: false as const,
    scoreAuthorized: false as const,
    synthesisAuthorized: false as const,
    reason: status === 'source_conflict'
      ? '같은 질의 주제에 서로 다른 방향의 직접 근거가 함께 존재한다. 충돌을 유지하고 우선순위를 만들지 않는다.'
      : combination.status !== 'unsupported'
        ? combination.reason
        : lens.reason,
  });
}
