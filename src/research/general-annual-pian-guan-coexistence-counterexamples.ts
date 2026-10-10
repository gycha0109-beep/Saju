import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ThreeLayerPairKey } from './general-annual-three-layer-fact-corpus.js';
import {
  auditPianGuanThreeLayerMethodForAnnualRequest,
  buildPianGuanThreeLayerTextMethodAudit,
} from './general-annual-pian-guan-three-layer-method-audit.js';

export const PIAN_GUAN_COEXISTENCE_COUNTEREXAMPLE_VERSION =
  'sa7d-pian-guan-three-layer-structural-counterexamples-v1' as const;

const TEXT_URL = 'https://zh.wikisource.org/zh-hant/三命通會/卷二' as const;

/**
 * Text witnesses describe historical statements only.
 * Neither a structural resemblance nor the source's classical forecast
 * licenses a prediction about a present-day individual.
 */
export const PIAN_GUAN_COEXISTENCE_TEXT_ANCHORS = Object.freeze([
  Object.freeze({
    id: 'TX-ANNUAL-DAYUN-SAME-PILLAR',
    section: '論太歲' as const,
    shortExcerpt: '又如甲子流年又是甲子運，謂之歲運並臨',
    sourceUrl: TEXT_URL,
    witnessStatus: 'digital_transcription_only' as const,
    fullPrintedLineRechecked: false as const,
    scope: 'exact_textual_jiazi_example_not_generalized' as const,
  }),
  Object.freeze({
    id: 'TX-TEMPORAL-MONTH-CLASH',
    section: '總論歲運' as const,
    shortExcerpt: '若歲運沖月必禍',
    sourceUrl: TEXT_URL,
    witnessStatus: 'digital_transcription_only' as const,
    fullPrintedLineRechecked: false as const,
    scope: 'describes_classical_month_clash_claim_only' as const,
  }),
  Object.freeze({
    id: 'TX-EXPLICIT-PERSONAL-METHOD-CONDITION',
    section: '論太歲' as const,
    shortExcerpt: '要大運日主與太歲相和相順',
    sourceUrl: TEXT_URL,
    witnessStatus: 'digital_transcription_only' as const,
    fullPrintedLineRechecked: false as const,
    scope: 'source_text_requires_other_context_not_a_scoring_rule' as const,
  }),
]);

export type CoexistenceCounterexampleId =
  | 'IDENTICAL_ANNUAL_AND_DAYUN_PILLARS'
  | 'MULTIPLE_CANDIDATES_WITHIN_ONE_PAIR'
  | 'PARALLEL_TEMPORAL_MATCH_TO_NATAL_DAY'
  | 'MONTH_BRANCH_CLASH_OBSERVED'
  | 'ANNUAL_DAYUN_AND_NATAL_RELATIONS_COEXIST';

export const PIAN_GUAN_COEXISTENCE_UNRESOLVED = Object.freeze([
  'STRUCTURAL_CANDIDATE_DOES_NOT_ESTABLISH_TRADITIONAL_EFFECT',
  'SAME_PILLAR_DOES_NOT_AUTOMATICALLY_ADMIT_SUI_YUN_BING_LIN_OUTCOME',
  'MONTH_CLASH_DOES_NOT_AUTOMATICALLY_ADMIT_AN_EVENT',
  'SYNTHESIS_PRECEDENCE_AND_CONFLICT_RESOLUTION_UNAPPROVED',
  'NATAL_DAYUN_ANNUAL_INTERACTION_METHOD_UNAPPROVED',
  'ORIGINAL_PRINT_FULL_CLAUSE_AND_VARIANTS_UNVERIFIED',
  'MODERN_PERSONAL_OUTCOME_UNSUPPORTED',
] as const);

export function buildPianGuanCoexistenceTextEvidence() {
  const previous = buildPianGuanThreeLayerTextMethodAudit();
  if (
    previous.methodBoundary.traditionalPrecedenceRuleAuthorized ||
    previous.methodBoundary.modernEventOutcomeAuthorized ||
    previous.methodBoundary.pianCaiRescueReusableForPianGuan ||
    previous.sourceWitnessLevel !==
      'digital_transcription_compared_to_previous_print_relation_identity'
  ) throw new Error('Prior annual method witness requires authority review');

  const material = Object.freeze({
    version: PIAN_GUAN_COEXISTENCE_COUNTEREXAMPLE_VERSION,
    parentMethodAuditHash: previous.auditHash,
    anchors: PIAN_GUAN_COEXISTENCE_TEXT_ANCHORS,
    unresolved: PIAN_GUAN_COEXISTENCE_UNRESOLVED,
    method: Object.freeze({
      yearAndLuckPillarSamenessOnlyStructural: true as const,
      branchClashMonthOnlyStructural: true as const,
      exactJiaZiExampleGeneralized: false as const,
      historicalMisfortuneClaimAdmitted: false as const,
      realWorldOutcomeValidated: false as const,
      personalMeaningApproved: false as const,
      productionAuthorized: false as const,
    }),
  });
  return Object.freeze({
    ...material,
    evidenceHash: deterministicContentHash(material),
  });
}

/**
 * Audits counterexamples to "one observed relation => one predictable outcome".
 * Inputs come from the approved fact producer and historical research HOLD
 * contract. There is no caller-supplied interpretation rule or weight.
 */
export function auditPianGuanCoexistingRelationCounterexamples(
  snapshot: CanonicalSajuSnapshot,
  request: ReadingRequest,
) {
  const parent = auditPianGuanThreeLayerMethodForAnnualRequest(snapshot, request);
  if (parent.status === 'input_unavailable') {
    return Object.freeze({
      status: 'input_unavailable' as const,
      reasonCode: parent.reasonCode,
      productionAuthorized: false as const,
    });
  }

  const evidence = buildPianGuanCoexistenceTextEvidence();
  const checks = parent.pairObservations;
  const expected: readonly ThreeLayerPairKey[] = [
    'annual:dayun',
    'annual:natal:year', 'dayun:natal:year',
    'annual:natal:month', 'dayun:natal:month',
    'annual:natal:day', 'dayun:natal:day',
    'annual:natal:hour', 'dayun:natal:hour',
  ];
  if (
    checks.length !== 9 ||
    new Set(checks.map((x) => x.pairKey)).size !== 9 ||
    expected.some((key) => !checks.some((x) => x.pairKey === key)) ||
    parent.evidenceOnly.hasTraditionalMethodAdjudication ||
    parent.evidenceOnly.productionAuthorized
  ) throw new Error('The nine-pair fact universe drifted; re-audit required');

  const get = (key: ThreeLayerPairKey) => {
    const result = checks.find((item) => item.pairKey === key);
    if (!result) throw new Error('Missing structural pair: ' + key);
    return result;
  };

  const counterexamples: {
    id: CoexistenceCounterexampleId;
    observedPairKeys: readonly ThreeLayerPairKey[];
    witnessAnchorId: string | null;
    observedOnly: true;
    sourceHistoricalOutcomeApplied: null;
    winningRelation: null;
    meaningOrSeverity: null;
    consumerClaim: null;
  }[] = [];

  const append = (
    id: CoexistenceCounterexampleId,
    observedPairKeys: readonly ThreeLayerPairKey[],
    witnessAnchorId: string | null,
  ) => {
    counterexamples.push(Object.freeze({
      id,
      observedPairKeys: Object.freeze([...observedPairKeys]),
      witnessAnchorId,
      observedOnly: true as const,
      sourceHistoricalOutcomeApplied: null,
      winningRelation: null,
      meaningOrSeverity: null,
      consumerClaim: null,
    }));
  };

  const annualDayun = get('annual:dayun');
  const natalKeys = expected.filter((key) => key !== 'annual:dayun');
  const natalObserved = natalKeys.filter((key) => get(key).observedCount > 0);
  const samePillar =
    parent.annualPillar.stem === parent.dayunPillar.stem &&
    parent.annualPillar.branch === parent.dayunPillar.branch;
  if (samePillar) {
    append('IDENTICAL_ANNUAL_AND_DAYUN_PILLARS', [],
      'TX-ANNUAL-DAYUN-SAME-PILLAR');
  }
  for (const pair of checks) {
    if (pair.observedCount >= 2) {
      append('MULTIPLE_CANDIDATES_WITHIN_ONE_PAIR', [pair.pairKey], null);
    }
  }
  if (
    get('annual:natal:day').observedCount > 0 &&
    get('dayun:natal:day').observedCount > 0
  ) {
    append('PARALLEL_TEMPORAL_MATCH_TO_NATAL_DAY',
      ['annual:natal:day', 'dayun:natal:day'], null);
  }
  const monthClashKeys: readonly ThreeLayerPairKey[] = [
    'annual:natal:month', 'dayun:natal:month',
  ];
  const observedMonthClashes = monthClashKeys.filter((key) =>
    get(key).relationKinds.includes('branch_clash'),
  );
  if (observedMonthClashes.length > 0) {
    append('MONTH_BRANCH_CLASH_OBSERVED', observedMonthClashes,
      'TX-TEMPORAL-MONTH-CLASH');
  }
  if (annualDayun.observedCount > 0 && natalObserved.length > 0) {
    append('ANNUAL_DAYUN_AND_NATAL_RELATIONS_COEXIST',
      ['annual:dayun', ...natalObserved], null);
  }

  // No listed pattern is not proof that a year is auspicious, harmless or free
  // of a different (unmodeled) interaction.
  const material = {
    status: 'research_structural_counterexamples_only_hold' as const,
    version: PIAN_GUAN_COEXISTENCE_COUNTEREXAMPLE_VERSION,
    parentThreeLayerReviewHash: parent.reviewHash,
    textualEvidenceHash: evidence.evidenceHash,
    threeLayerCorpusHash: parent.threeLayerFactCorpusHash,
    exactHistoricalGengJiaExample: parent.exactHistoricalGengJiaExample,
    annualStem: parent.annualPillar.stem,
    annualBranch: parent.annualPillar.branch,
    dayunStem: parent.dayunPillar.stem,
    dayunBranch: parent.dayunPillar.branch,
    pairUniverseCount: 9 as const,
    observedStructuralCandidateCount: parent.observedRelationTotal,
    counterexamples: Object.freeze(counterexamples),
    observedPatternCount: counterexamples.length,
    unresolved: PIAN_GUAN_COEXISTENCE_UNRESOLVED,
    gates: Object.freeze({
      observationsNeverImplyEffectStrength: true as const,
      absenceOfThesePatternsDoesNotMeanSafetyOrGoodFortune: true as const,
      samePillarHistoricalOutcomeAuthorized: false as const,
      monthClashHistoricalOutcomeAuthorized: false as const,
      crossPairConflictResolverAuthorized: false as const,
      winnerOrSeverityAuthorized: false as const,
      modernPersonalInterpretationAuthorized: false as const,
      productionAuthorized: false as const,
    }),
    possibleTraditionalOutcome: null,
    modernPersonalEvent: null,
    interpretationClaim: null,
  };
  return Object.freeze({
    ...material,
    auditHash: deterministicContentHash(material),
  });
}
