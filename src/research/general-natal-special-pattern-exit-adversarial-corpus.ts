import {
  R029_AUTHORITY,
  R029_ENTRY_PROPOSITIONS,
  R029_EXCLUSIONS,
  R029_EXECUTION_GAPS,
  R029_FOLLOW_PATTERN_VERSION,
  type R029FollowTarget,
} from './general-natal-follow-pattern-entry-exit.js';
import {
  R030_AUTHORITY,
  R030_CONFLICT_SCENARIOS,
  R030_GEJU_CONFLICT_MATRIX_VERSION,
} from './general-natal-geju-conflict-resolution-matrix.js';
import {
  R131_AUTHORITY,
  R131_PATTERN_CANDIDATE_ESTABLISHMENT_BOUNDARY_VERSION,
} from './general-natal-pattern-candidate-establishment-formal-boundary-audit.js';
import {
  R133_AUTHORITY,
  R133_PATTERN_RESCUE_FAILURE_PRECEDENCE_GRAPH_VERSION,
} from './general-natal-pattern-rescue-failure-precedence-graph.js';

export const R134_SPECIAL_PATTERN_EXIT_ADVERSARIAL_CORPUS_VERSION =
  '0.1.0-research' as const;

export type R134ScenarioRole = 'BASELINE' | 'PERTURBATION';

export type R134EvidenceNature =
  | 'COMMENTARY_DIRECT'
  | 'GOVERNED_REPOSITORY'
  | 'RESEARCH_SYNTHESIS';

export type R134ResultState =
  | 'SPECIAL_PATH_REMAINS_RESEARCH_PLAUSIBLE'
  | 'BLOCKED_BY_ORDINARY_PATH'
  | 'BLOCKED_BY_SUPPORT_CONTROL'
  | 'BLOCKED_BY_MISSING_TARGET_PREREQUISITE'
  | 'BROKEN_ORDINARY_RETAINED'
  | 'UNRESOLVED_OPERAND'
  | 'INDETERMINATE';

export type R134ExitReasonClass =
  | 'NONE'
  | 'SOURCE_STATED_EXCLUSION'
  | 'MISSING_PREREQUISITE'
  | 'UNRESOLVED_OPERAND'
  | 'BROKEN_ORDINARY_RETENTION';

export interface R134AdversarialPair {
  pairId: string;
  target: R029FollowTarget;
  sourceNature: R134EvidenceNature;
  sourceStratum: string;
  sourceRefs: readonly string[];
  sourceStatement: string;
  baselineCondition: string;
  perturbation: string;
  changedDimension: string;
  perturbedState: Exclude<
    R134ResultState,
    'SPECIAL_PATH_REMAINS_RESEARCH_PLAUSIBLE'
  >;
  exitReasonClass: Exclude<R134ExitReasonClass, 'NONE'>;
  ordinaryFailureCounterexample: boolean;
}

export interface R134AdversarialScenario {
  caseId: string;
  pairId: string;
  role: R134ScenarioRole;
  target: R029FollowTarget;
  sourceNature: R134EvidenceNature;
  sourceStratum: string;
  sourceRefs: readonly string[];
  sourceStatement: string;
  baselineCondition: string;
  perturbation: string;
  changedDimension: string;
  resultState: R134ResultState;
  exitReasonClass: R134ExitReasonClass;
  ordinaryFailureCounterexample: boolean;
  minimalPairDoesNotImplyNumericDistance: true;
  sourceExclusionDoesNotImplyExecutableClassifier: true;
  unresolvedOperandDoesNotImplyExitConfirmed: true;
  temporalTransitionAuthorized: false;
  specialPatternResolverAuthorized: false;
  candidateIdentityAuthorized: false;
  establishmentPredicateAuthorized: false;
  candidateFactsEmitted: false;
  establishmentFactsEmitted: false;
  productionAuthorityPromoted: false;
}

export const R134_SOURCE_REFERENCES = Object.freeze({
  selectedCommentary: Object.freeze({
    sourceId: 'SRC-R134-ZIPING-ZHENQUAN-PINGZHU-WAIGE-YONGSHE',
    title: '子平真詮評註 / 論外格用捨',
    url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_034.htm',
    sourceNature: 'COMMENTARY_DIRECT' as const,
    verifiedOn: '2026-09-26',
    anchors: Object.freeze([
      '若月令自有用神，豈可另尋外格？',
      '必四柱氣象偏於一方',
      '四柱無可扶抑',
      '日與月同，則從強從旺',
      '日不與月同，而日元臨絕，則從官煞、從財、從食傷',
      '月令有用神、四柱有扶抑，豈有捨之別取之理？',
      '財被劫官被傷者，當觀其有無救應之神，無救應則為破格',
    ]),
  }),
});

export const R134_UPSTREAM_BINDINGS = Object.freeze({
  r029: Object.freeze({
    version: R029_FOLLOW_PATTERN_VERSION,
    entryIds: Object.freeze(R029_ENTRY_PROPOSITIONS.map((item) => item.id)),
    exclusionIds: Object.freeze(R029_EXCLUSIONS.map((item) => item.id)),
    executionGaps: Object.freeze([...R029_EXECUTION_GAPS]),
    executableFollowPatternResolverAuthorized:
      R029_AUTHORITY.executableFollowPatternResolverAuthorized,
  }),
  r030: Object.freeze({
    version: R030_GEJU_CONFLICT_MATRIX_VERSION,
    ordinaryPathState: R030_CONFLICT_SCENARIOS.find(
      (item) => item.id === 'ordinary-path-present',
    )?.state,
    brokenOrdinaryState: R030_CONFLICT_SCENARIOS.find(
      (item) => item.id === 'broken-ordinary-no-rescue',
    )?.state,
    conflictWinnerResolverAuthorized:
      R030_AUTHORITY.conflictWinnerResolverAuthorized,
  }),
  r131: Object.freeze({
    version: R131_PATTERN_CANDIDATE_ESTABLISHMENT_BOUNDARY_VERSION,
    candidateIdentityAuthorized: R131_AUTHORITY.candidateIdentityAuthorized,
    establishmentPredicateAuthorized:
      R131_AUTHORITY.establishmentPredicateAuthorized,
    candidateFactsEmitted: R131_AUTHORITY.candidateFactsEmitted,
    establishmentFactsEmitted: R131_AUTHORITY.establishmentFactsEmitted,
  }),
  r133: Object.freeze({
    version: R133_PATTERN_RESCUE_FAILURE_PRECEDENCE_GRAPH_VERSION,
    globalRelationPrecedenceAuthorized:
      R133_AUTHORITY.globalRelationPrecedenceAuthorized,
    rescueResolverAuthorized: R133_AUTHORITY.rescueResolverAuthorized,
    establishmentPredicateAuthorized:
      R133_AUTHORITY.establishmentPredicateAuthorized,
  }),
});

const COMMENTARY = R134_SOURCE_REFERENCES.selectedCommentary.sourceId;

export const R134_ADVERSARIAL_PAIRS: readonly R134AdversarialPair[] =
  Object.freeze([
    {
      pairId: 'R134-P01-FOLLOW-STRONG-SUPPORT-CONTROL-APPEARS',
      target: 'FOLLOW_STRONG',
      sourceNature: 'COMMENTARY_DIRECT',
      sourceStratum: '子平真詮評註 / 論外格用捨',
      sourceRefs: [COMMENTARY, 'R029:day-month-same-follow-strong'],
      sourceStatement: '必四柱氣象偏於一方；四柱無可扶抑；日與月同，則從強從旺',
      baselineCondition: 'one-sided whole-chart research condition; no ordinary support/control path; day and month treated as same',
      perturbation: 'an ordinary 扶抑 path becomes available',
      changedDimension: 'ordinary-support-control-availability',
      perturbedState: 'BLOCKED_BY_SUPPORT_CONTROL',
      exitReasonClass: 'SOURCE_STATED_EXCLUSION',
      ordinaryFailureCounterexample: false,
    },
    {
      pairId: 'R134-P02-FOLLOW-PROSPEROUS-MONTH-YONGSHEN-APPEARS',
      target: 'FOLLOW_PROSPEROUS',
      sourceNature: 'COMMENTARY_DIRECT',
      sourceStratum: '子平真詮評註 / 論外格用捨',
      sourceRefs: [COMMENTARY, 'R029:month-order-has-usable-yongshen'],
      sourceStatement: '若月令自有用神，豈可另尋外格？',
      baselineCondition: 'external/follow path remains research-plausible only while ordinary month-use availability is absent',
      perturbation: '月令自有用神 becomes available',
      changedDimension: 'month-order-ordinary-use-availability',
      perturbedState: 'BLOCKED_BY_ORDINARY_PATH',
      exitReasonClass: 'SOURCE_STATED_EXCLUSION',
      ordinaryFailureCounterexample: true,
    },
    {
      pairId: 'R134-P03-FOLLOW-OFFICER-KILL-LINJUE-REMOVED',
      target: 'FOLLOW_OFFICER_KILL',
      sourceNature: 'COMMENTARY_DIRECT',
      sourceStratum: '子平真詮評註 / 論外格用捨',
      sourceRefs: [COMMENTARY, 'R029:day-month-different-daymaster-extinct-follow-officer-kill'],
      sourceStatement: '日不與月同，而日元臨絕，則從官煞、從財、從食傷',
      baselineCondition: 'day/month different; 日元臨絕 observed; one-sidedness and no ordinary support/control retained',
      perturbation: '日元臨絕 is no longer satisfied',
      changedDimension: 'day-master-lin-jue',
      perturbedState: 'BLOCKED_BY_MISSING_TARGET_PREREQUISITE',
      exitReasonClass: 'MISSING_PREREQUISITE',
      ordinaryFailureCounterexample: false,
    },
    {
      pairId: 'R134-P04-FOLLOW-WEALTH-LINJUE-UNRESOLVED',
      target: 'FOLLOW_WEALTH',
      sourceNature: 'GOVERNED_REPOSITORY',
      sourceStratum: 'R029 governed entry boundary',
      sourceRefs: ['R029:day-month-different-daymaster-extinct-follow-wealth'],
      sourceStatement: 'R029 preserves 日元臨絕 as a non-executable prerequisite',
      baselineCondition: 'all bounded R029 research prerequisites recorded as observed',
      perturbation: '日元臨絕 operand becomes unresolved rather than false',
      changedDimension: 'day-master-lin-jue-resolution',
      perturbedState: 'UNRESOLVED_OPERAND',
      exitReasonClass: 'UNRESOLVED_OPERAND',
      ordinaryFailureCounterexample: false,
    },
    {
      pairId: 'R134-P05-FOLLOW-OUTPUT-VISIBLE-ORDINARY-PATH',
      target: 'FOLLOW_OUTPUT',
      sourceNature: 'COMMENTARY_DIRECT',
      sourceStratum: '子平真詮評註 / 論外格用捨',
      sourceRefs: [COMMENTARY, 'R029:visible-ordinary-path'],
      sourceStatement: '干頭已有財官七煞，而棄之以就外格，亦太謬矣',
      baselineCondition: 'no visible governed ordinary path is available',
      perturbation: 'a visible ordinary 財/官/七煞 path becomes available',
      changedDimension: 'visible-ordinary-path',
      perturbedState: 'BLOCKED_BY_ORDINARY_PATH',
      exitReasonClass: 'SOURCE_STATED_EXCLUSION',
      ordinaryFailureCounterexample: true,
    },
    {
      pairId: 'R134-P06-TRANSFORM-QI-VALIDITY-UNRESOLVED',
      target: 'TRANSFORM_QI',
      sourceNature: 'GOVERNED_REPOSITORY',
      sourceStratum: 'R029 governed entry boundary',
      sourceRefs: ['R029:daystem-transformation'],
      sourceStatement: '日干化合，則為化氣 is preserved without executable transformation validity',
      baselineCondition: 'day-stem transformation wording is observed in the bounded research surface',
      perturbation: 'DAY_STEM_TRANSFORMATION_VALIDITY remains unresolved',
      changedDimension: 'day-stem-transformation-validity',
      perturbedState: 'UNRESOLVED_OPERAND',
      exitReasonClass: 'UNRESOLVED_OPERAND',
      ordinaryFailureCounterexample: false,
    },
    {
      pairId: 'R134-P07-FOLLOW-STRONG-ONE-SIDEDNESS-BROKEN',
      target: 'FOLLOW_STRONG',
      sourceNature: 'COMMENTARY_DIRECT',
      sourceStratum: '子平真詮評註 / 論外格用捨',
      sourceRefs: [COMMENTARY],
      sourceStatement: '必四柱氣象偏於一方',
      baselineCondition: 'whole-chart one-sidedness is the bounded research premise',
      perturbation: 'the one-sidedness premise is contradicted by the adversarial case',
      changedDimension: 'whole-chart-one-sidedness',
      perturbedState: 'BLOCKED_BY_MISSING_TARGET_PREREQUISITE',
      exitReasonClass: 'MISSING_PREREQUISITE',
      ordinaryFailureCounterexample: false,
    },
    {
      pairId: 'R134-P08-FOLLOW-PROSPEROUS-ONE-SIDEDNESS-UNRESOLVED',
      target: 'FOLLOW_PROSPEROUS',
      sourceNature: 'GOVERNED_REPOSITORY',
      sourceStratum: 'R029 execution-gap boundary',
      sourceRefs: ['R029:WHOLE_CHART_ONE_SIDEDNESS'],
      sourceStatement: 'WHOLE_CHART_ONE_SIDEDNESS remains an unresolved executable operand',
      baselineCondition: 'one-sidedness is provisionally recorded only as research evidence',
      perturbation: 'one-sidedness cannot be resolved from governed operands',
      changedDimension: 'whole-chart-one-sidedness-resolution',
      perturbedState: 'UNRESOLVED_OPERAND',
      exitReasonClass: 'UNRESOLVED_OPERAND',
      ordinaryFailureCounterexample: false,
    },
    {
      pairId: 'R134-P09-FOLLOW-OFFICER-KILL-BROKEN-ORDINARY-RESCUABLE',
      target: 'FOLLOW_OFFICER_KILL',
      sourceNature: 'COMMENTARY_DIRECT',
      sourceStratum: '子平真詮評註 / 論外格用捨 + R133 rescue boundary',
      sourceRefs: [COMMENTARY, 'R029:broken-ordinary-pattern-is-not-month-order-useless', 'R133'],
      sourceStatement: '財被劫官被傷者，當觀其有無救應之神',
      baselineCondition: 'special path is only being stress-tested; no established special candidate exists',
      perturbation: 'ordinary 官 path is damaged but a bounded rescue proposition is present',
      changedDimension: 'ordinary-path-damage-with-rescue',
      perturbedState: 'BROKEN_ORDINARY_RETAINED',
      exitReasonClass: 'BROKEN_ORDINARY_RETENTION',
      ordinaryFailureCounterexample: true,
    },
    {
      pairId: 'R134-P10-FOLLOW-WEALTH-BROKEN-ORDINARY-NO-RESCUE',
      target: 'FOLLOW_WEALTH',
      sourceNature: 'COMMENTARY_DIRECT',
      sourceStratum: '子平真詮評註 / 論外格用捨',
      sourceRefs: [COMMENTARY, 'R029:broken-ordinary-pattern-is-not-month-order-useless'],
      sourceStatement: '無救應則為破格',
      baselineCondition: 'special path is only being stress-tested; ordinary-path absence has not been proven',
      perturbation: 'ordinary 財 path is damaged and no rescue is observed',
      changedDimension: 'ordinary-path-damage-without-rescue',
      perturbedState: 'BROKEN_ORDINARY_RETAINED',
      exitReasonClass: 'BROKEN_ORDINARY_RETENTION',
      ordinaryFailureCounterexample: true,
    },
    {
      pairId: 'R134-P11-FOLLOW-OUTPUT-DAY-MONTH-RELATION-CHANGED',
      target: 'FOLLOW_OUTPUT',
      sourceNature: 'COMMENTARY_DIRECT',
      sourceStratum: '子平真詮評註 / 論外格用捨',
      sourceRefs: [COMMENTARY, 'R029:day-month-different-daymaster-extinct-follow-output'],
      sourceStatement: '日不與月同，而日元臨絕，則從官煞、從財、從食傷',
      baselineCondition: '日不與月同 and 日元臨絕 are both retained',
      perturbation: 'day/month relation changes to 日與月同',
      changedDimension: 'day-month-same-semantics',
      perturbedState: 'BLOCKED_BY_MISSING_TARGET_PREREQUISITE',
      exitReasonClass: 'MISSING_PREREQUISITE',
      ordinaryFailureCounterexample: false,
    },
    {
      pairId: 'R134-P12-TRANSFORM-QI-MONTH-YONGSHEN-APPEARS',
      target: 'TRANSFORM_QI',
      sourceNature: 'COMMENTARY_DIRECT',
      sourceStratum: '子平真詮評註 / 論外格用捨',
      sourceRefs: [COMMENTARY, 'R029:month-order-has-usable-yongshen'],
      sourceStatement: '月令有用神、四柱有扶抑，豈有捨之別取之理？',
      baselineCondition: 'transformation wording is present but ordinary-path availability is absent',
      perturbation: '月令 ordinary 用神 becomes available',
      changedDimension: 'month-order-ordinary-use-availability',
      perturbedState: 'BLOCKED_BY_ORDINARY_PATH',
      exitReasonClass: 'SOURCE_STATED_EXCLUSION',
      ordinaryFailureCounterexample: true,
    },
    {
      pairId: 'R134-P13-FOLLOW-STRONG-VISIBLE-ORDINARY-PATH',
      target: 'FOLLOW_STRONG',
      sourceNature: 'COMMENTARY_DIRECT',
      sourceStratum: '子平真詮評註 / 論外格用捨',
      sourceRefs: [COMMENTARY, 'R029:visible-ordinary-path'],
      sourceStatement: '干頭已有財官七煞，而棄之以就外格，亦太謬矣',
      baselineCondition: 'no visible ordinary path is available',
      perturbation: 'visible 財/官/七煞 ordinary path appears',
      changedDimension: 'visible-ordinary-path',
      perturbedState: 'BLOCKED_BY_ORDINARY_PATH',
      exitReasonClass: 'SOURCE_STATED_EXCLUSION',
      ordinaryFailureCounterexample: true,
    },
    {
      pairId: 'R134-P14-FOLLOW-PROSPEROUS-BROKEN-ORDINARY-RETAINED',
      target: 'FOLLOW_PROSPEROUS',
      sourceNature: 'GOVERNED_REPOSITORY',
      sourceStratum: 'R029 + R030 broken-ordinary boundary',
      sourceRefs: ['R029:broken-ordinary-pattern-is-not-month-order-useless', 'R030:broken-ordinary-no-rescue'],
      sourceStatement: 'broken ordinary pattern is preserved as broken rather than converted into follow',
      baselineCondition: 'external path has not acquired candidate or establishment authority',
      perturbation: 'an ordinary pattern is observed as broken',
      changedDimension: 'ordinary-pattern-failure-state',
      perturbedState: 'BROKEN_ORDINARY_RETAINED',
      exitReasonClass: 'BROKEN_ORDINARY_RETENTION',
      ordinaryFailureCounterexample: true,
    },
    {
      pairId: 'R134-P15-FOLLOW-WEALTH-DAY-MONTH-RELATION-CHANGED',
      target: 'FOLLOW_WEALTH',
      sourceNature: 'COMMENTARY_DIRECT',
      sourceStratum: '子平真詮評註 / 論外格用捨',
      sourceRefs: [COMMENTARY, 'R029:day-month-different-daymaster-extinct-follow-wealth'],
      sourceStatement: '日不與月同，而日元臨絕，則從官煞、從財、從食傷',
      baselineCondition: '日不與月同 and 日元臨絕 are both retained',
      perturbation: 'day/month relation changes to 日與月同',
      changedDimension: 'day-month-same-semantics',
      perturbedState: 'BLOCKED_BY_MISSING_TARGET_PREREQUISITE',
      exitReasonClass: 'MISSING_PREREQUISITE',
      ordinaryFailureCounterexample: false,
    },
    {
      pairId: 'R134-P16-FOLLOW-OUTPUT-LINJUE-REMOVED',
      target: 'FOLLOW_OUTPUT',
      sourceNature: 'COMMENTARY_DIRECT',
      sourceStratum: '子平真詮評註 / 論外格用捨',
      sourceRefs: [COMMENTARY, 'R029:day-month-different-daymaster-extinct-follow-output'],
      sourceStatement: '日不與月同，而日元臨絕，則從官煞、從財、從食傷',
      baselineCondition: '日元臨絕 is retained as a bounded research prerequisite',
      perturbation: '日元臨絕 is contradicted',
      changedDimension: 'day-master-lin-jue',
      perturbedState: 'BLOCKED_BY_MISSING_TARGET_PREREQUISITE',
      exitReasonClass: 'MISSING_PREREQUISITE',
      ordinaryFailureCounterexample: false,
    },
    {
      pairId: 'R134-P17-FOLLOW-OFFICER-KILL-ORDINARY-USE-UNRESOLVED',
      target: 'FOLLOW_OFFICER_KILL',
      sourceNature: 'GOVERNED_REPOSITORY',
      sourceStratum: 'R029 execution-gap boundary',
      sourceRefs: ['R029:ORDINARY_YONGSHEN_AVAILABILITY'],
      sourceStatement: 'ORDINARY_YONGSHEN_AVAILABILITY remains unresolved executable input',
      baselineCondition: 'ordinary-use absence is provisionally represented only at research level',
      perturbation: 'ordinary-yongshen availability cannot be resolved',
      changedDimension: 'ordinary-yongshen-availability-resolution',
      perturbedState: 'INDETERMINATE',
      exitReasonClass: 'UNRESOLVED_OPERAND',
      ordinaryFailureCounterexample: false,
    },
    {
      pairId: 'R134-P18-FOLLOW-OUTPUT-BROKEN-OFFICER-NO-RESCUE',
      target: 'FOLLOW_OUTPUT',
      sourceNature: 'COMMENTARY_DIRECT',
      sourceStratum: '子平真詮評註 / 論外格用捨',
      sourceRefs: [COMMENTARY, 'R029:broken-ordinary-pattern-is-not-month-order-useless'],
      sourceStatement: '官被傷...無救應則為破格',
      baselineCondition: 'ordinary-path absence is not established merely because 官 is damaged',
      perturbation: '官 is damaged and no rescue is observed',
      changedDimension: 'broken-officer-without-rescue',
      perturbedState: 'BROKEN_ORDINARY_RETAINED',
      exitReasonClass: 'BROKEN_ORDINARY_RETENTION',
      ordinaryFailureCounterexample: true,
    },
  ]);

function scenario(
  pair: R134AdversarialPair,
  role: R134ScenarioRole,
): R134AdversarialScenario {
  const baseline = role === 'BASELINE';
  return Object.freeze({
    caseId: `${pair.pairId}-${role}`,
    pairId: pair.pairId,
    role,
    target: pair.target,
    sourceNature: pair.sourceNature,
    sourceStratum: pair.sourceStratum,
    sourceRefs: pair.sourceRefs,
    sourceStatement: pair.sourceStatement,
    baselineCondition: pair.baselineCondition,
    perturbation: pair.perturbation,
    changedDimension: pair.changedDimension,
    resultState: baseline
      ? 'SPECIAL_PATH_REMAINS_RESEARCH_PLAUSIBLE'
      : pair.perturbedState,
    exitReasonClass: baseline ? 'NONE' : pair.exitReasonClass,
    ordinaryFailureCounterexample:
      baseline ? false : pair.ordinaryFailureCounterexample,
    minimalPairDoesNotImplyNumericDistance: true,
    sourceExclusionDoesNotImplyExecutableClassifier: true,
    unresolvedOperandDoesNotImplyExitConfirmed: true,
    temporalTransitionAuthorized: false,
    specialPatternResolverAuthorized: false,
    candidateIdentityAuthorized: false,
    establishmentPredicateAuthorized: false,
    candidateFactsEmitted: false,
    establishmentFactsEmitted: false,
    productionAuthorityPromoted: false,
  });
}

export const R134_ADVERSARIAL_SCENARIOS: readonly R134AdversarialScenario[] =
  Object.freeze(
    R134_ADVERSARIAL_PAIRS.flatMap((pair) => [
      scenario(pair, 'BASELINE'),
      scenario(pair, 'PERTURBATION'),
    ]),
  );

export const R134_REJECTED_SHORTCUTS = Object.freeze([
  'ORDINARY_FAILURE_EQUALS_SPECIAL_PATTERN_ENTRY',
  'BROKEN_ORDINARY_EQUALS_ABSENT_ORDINARY_PATH',
  'SPECIAL_LOOKING_CHART_EQUALS_ESTABLISHED_SPECIAL_PATTERN',
  'MISSING_PREREQUISITE_EQUALS_PROVEN_OPPOSITE_FACT',
  'UNRESOLVED_OPERAND_EQUALS_EXIT_CONFIRMED',
  'MINIMAL_PERTURBATION_EQUALS_NUMERIC_DISTANCE',
  'EXIT_CONDITION_EQUALS_TEMPORAL_TRANSITION',
  'SOURCE_EXCLUSION_EQUALS_EXECUTABLE_CLASSIFIER',
  'DAY_STEM_COMBINATION_EQUALS_VALID_TRANSFORM_QI',
  'ONE_SIDEDNESS_WORDING_EQUALS_EXECUTABLE_ONE_SIDEDNESS_DETECTOR',
] as const);

export const R134_SUMMARY = Object.freeze({
  pairCount: R134_ADVERSARIAL_PAIRS.length,
  scenarioCount: R134_ADVERSARIAL_SCENARIOS.length,
  representedTargetCount: new Set(
    R134_ADVERSARIAL_SCENARIOS.map((item) => item.target),
  ).size,
  ordinaryPathBlockingCount: R134_ADVERSARIAL_SCENARIOS.filter(
    (item) => item.resultState === 'BLOCKED_BY_ORDINARY_PATH',
  ).length,
  supportControlBlockingCount: R134_ADVERSARIAL_SCENARIOS.filter(
    (item) => item.resultState === 'BLOCKED_BY_SUPPORT_CONTROL',
  ).length,
  missingPrerequisiteCount: R134_ADVERSARIAL_SCENARIOS.filter(
    (item) => item.resultState === 'BLOCKED_BY_MISSING_TARGET_PREREQUISITE',
  ).length,
  unresolvedOrIndeterminateCount: R134_ADVERSARIAL_SCENARIOS.filter(
    (item) =>
      item.resultState === 'UNRESOLVED_OPERAND' ||
      item.resultState === 'INDETERMINATE',
  ).length,
  brokenOrdinaryRetentionCount: R134_ADVERSARIAL_SCENARIOS.filter(
    (item) => item.resultState === 'BROKEN_ORDINARY_RETAINED',
  ).length,
  ordinaryFailureCounterexampleCount: R134_ADVERSARIAL_SCENARIOS.filter(
    (item) => item.ordinaryFailureCounterexample,
  ).length,
  temporalTransitionAuthorizedCount: R134_ADVERSARIAL_SCENARIOS.filter(
    (item) => item.temporalTransitionAuthorized,
  ).length,
  specialPatternResolverAuthorizedCount: R134_ADVERSARIAL_SCENARIOS.filter(
    (item) => item.specialPatternResolverAuthorized,
  ).length,
  candidateFactsEmittedCount: R134_ADVERSARIAL_SCENARIOS.filter(
    (item) => item.candidateFactsEmitted,
  ).length,
  establishmentFactsEmittedCount: R134_ADVERSARIAL_SCENARIOS.filter(
    (item) => item.establishmentFactsEmitted,
  ).length,
});

export const R134_AUTHORITY = Object.freeze({
  status: 'RESEARCH_SPECIAL_PATTERN_EXIT_ADVERSARIAL_CORPUS_COMPLETE' as const,
  researchOnly: true,
  adversarialExitCorpusObserved: true,
  sourceStatedExclusionsPreserved: true,
  missingPrerequisiteDistinctFromProvenOpposite: true,
  unresolvedOperandDistinctFromConfirmedExit: true,
  brokenOrdinaryDistinctFromAbsentOrdinaryPath: true,
  ordinaryFailureAutoSpecialEntryAuthorized: false,
  temporalTransitionSemanticsAuthorized: false,
  numericSpecialPatternScoreAuthorized: false,
  oneSidednessDetectorAuthorized: false,
  dayMasterLinJuePredicateAuthorized: false,
  ordinaryYongshenAvailabilityPredicateAuthorized: false,
  transformationValidityPredicateAuthorized: false,
  specialPatternResolverAuthorized: false,
  candidateIdentityAuthorized: false,
  establishmentPredicateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
