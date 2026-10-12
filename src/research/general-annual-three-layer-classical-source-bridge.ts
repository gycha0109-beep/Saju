import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  auditAnnualClassicalResolutionMethodScope,
  buildClassicalConditionalResolutionEvidence,
} from './general-annual-classical-conditional-clash-resolution.js';

/**
 * Exact-page classical evidence for *considering* natal + Dayun + annual
 * together. Historical statements are not an executable priority algorithm
 * and cannot turn structural observations into modern personal predictions.
 */
export const ANNUAL_THREE_LAYER_CLASSICAL_BRIDGE_VERSION =
  'sa7d-annual-three-layer-classical-printed-scope-bridge-v1' as const;

export const ANNUAL_THREE_LAYER_CLASSICAL_PRINT_SOURCES = Object.freeze([
  Object.freeze({
    id: 'ZIPING-ZHENQUAN-NLC416-LUCK',
    title: '子平真詮' as const,
    section: '論行運' as const,
    url: 'https://commons.wikimedia.org/wiki/File:NLC416-11jh010455-35296_子平真詮.pdf' as const,
    pdfPagesOneBased: Object.freeze([56, 58] as const),
    printedPages: Object.freeze(['四十七', '四十九'] as const),
    evidenceTier: 'specific_scanned_print_pages_visually_inspected' as const,
    printDateAndOriginalEditionConfirmed: false as const,
    directlyAttestsNatalAndLuck: true as const,
    directlyAttestsNatalLuckAndAnnualInOneMethod: false as const,
  }),
  Object.freeze({
    id: 'SANMING-TONGHUI-NLC892-JUAN2-LUCK-YEAR',
    title: '三命通會' as const,
    section: '論太歲；總論歲運' as const,
    url: 'https://commons.wikimedia.org/wiki/File:NLC892-411999029701-67187_三命通會_第4冊.pdf' as const,
    pdfPagesOneBased: Object.freeze([25, 26, 27] as const),
    printedPages: null,
    evidenceTier: 'specific_scanned_print_pages_visually_inspected' as const,
    printDateAndOriginalEditionConfirmed: false as const,
    directlyAttestsNatalAndLuck: true as const,
    directlyAttestsNatalLuckAndAnnualInOneMethod: true as const,
  }),
]);

export const ANNUAL_THREE_LAYER_CLASSICAL_CLAUSES = Object.freeze([
  Object.freeze({
    id: 'ZIPING_LUCK_READS_WITH_NATAL',
    sourceId: 'ZIPING-ZHENQUAN-NLC416-LUCK',
    pdfPageOneBased: 56,
    excerpt: '論運與看命無二法也' as const,
    accompanyingOriginal: '運之干支配八字之喜忌' as const,
    scope: 'natal_dayun_joint_consideration' as const,
    supportsTemporalConsideration: true as const,
    supportsTripleClashWinner: false as const,
    permitsModernInterpretation: false as const,
  }),
  Object.freeze({
    id: 'ZIPING_DAYUN_CLASH_CONDITIONED_BY_NATAL_COMBINATION',
    sourceId: 'ZIPING-ZHENQUAN-NLC416-LUCK',
    pdfPageOneBased: 58,
    excerpt: '本命巳酉有相會則沖無力' as const,
    accompanyingOriginal: '行卯則沖' as const,
    scope: 'natal_dayun_conditional_clash' as const,
    supportsTemporalConsideration: true as const,
    supportsTripleClashWinner: false as const,
    permitsModernInterpretation: false as const,
  }),
  Object.freeze({
    id: 'ZIPING_YEAR_BRANCH_EXAMPLE_REQUIRES_DISAMBIGUATION',
    sourceId: 'ZIPING-ZHENQUAN-NLC416-LUCK',
    pdfPageOneBased: 58,
    excerpt: '年支亥未則卯逢年會' as const,
    accompanyingOriginal: '不沖月官之類是也' as const,
    scope: 'ambiguous_or_alternative_natal_year_branch_example' as const,
    supportsTemporalConsideration: true as const,
    supportsTripleClashWinner: false as const,
    permitsModernInterpretation: false as const,
  }),
  Object.freeze({
    id: 'SANMING_NATAL_LUCK_YEAR_MUTUAL_COMPATIBILITY',
    sourceId: 'SANMING-TONGHUI-NLC892-JUAN2-LUCK-YEAR',
    pdfPageOneBased: 26,
    excerpt: '要大運日主與太歲相和相順' as const,
    accompanyingOriginal: '歲運並臨' as const,
    scope: 'natal_dayun_annual_joint_consideration' as const,
    supportsTemporalConsideration: true as const,
    supportsTripleClashWinner: false as const,
    permitsModernInterpretation: false as const,
  }),
  Object.freeze({
    id: 'SANMING_DAYUN_PILLAR_CAN_CLASH_WITH_ANNUAL',
    sourceId: 'SANMING-TONGHUI-NLC892-JUAN2-LUCK-YEAR',
    pdfPageOneBased: 26,
    excerpt: '運干支傷沖太歲亦曰征' as const,
    accompanyingOriginal: '太歲干支沖日干支亦曰征' as const,
    scope: 'dayun_annual_and_natal_annual_clash_discussed' as const,
    supportsTemporalConsideration: true as const,
    supportsTripleClashWinner: false as const,
    permitsModernInterpretation: false as const,
  }),
  Object.freeze({
    id: 'SANMING_ANNUAL_DAYUN_ARE_JOINT',
    sourceId: 'SANMING-TONGHUI-NLC892-JUAN2-LUCK-YEAR',
    pdfPageOneBased: 27,
    excerpt: '運與流年二者相為表裏' as const,
    accompanyingOriginal: '扶持四柱' as const,
    scope: 'natal_dayun_annual_joint_consideration' as const,
    supportsTemporalConsideration: true as const,
    supportsTripleClashWinner: false as const,
    permitsModernInterpretation: false as const,
  }),
  Object.freeze({
    id: 'SANMING_DAYUN_ANNUAL_CLASH_NO_UNIVERSAL_SEVERITY',
    sourceId: 'SANMING-TONGHUI-NLC892-JUAN2-LUCK-YEAR',
    pdfPageOneBased: 27,
    excerpt: '最怕行運與太歲沖剋' as const,
    accompanyingOriginal: '若歲運沖月必禍' as const,
    scope: 'historical_qualitative_clash_and_month_pillar' as const,
    supportsTemporalConsideration: true as const,
    supportsTripleClashWinner: false as const,
    permitsModernInterpretation: false as const,
  }),
]);

export const ANNUAL_THREE_LAYER_CLASSICAL_GATE_QUESTIONS = Object.freeze([
  Object.freeze({
    id: 'CAN_NATAL_AND_DAYUN_RELATIONS_BE_CONSIDERED_TOGETHER',
    evidenceIds: Object.freeze([
      'ZIPING_LUCK_READS_WITH_NATAL',
      'ZIPING_DAYUN_CLASH_CONDITIONED_BY_NATAL_COMBINATION',
    ]),
    sourceAttestsRelation: true as const,
    answer: 'TEXTUALLY_ATTESTED_SCOPE_ONLY' as const,
    executableRuleAuthorized: false as const,
  }),
  Object.freeze({
    id: 'ARE_NATAL_DAYUN_AND_ANNUAL_JOINTLY_MENTIONED',
    evidenceIds: Object.freeze([
      'SANMING_NATAL_LUCK_YEAR_MUTUAL_COMPATIBILITY',
      'SANMING_ANNUAL_DAYUN_ARE_JOINT',
    ]),
    sourceAttestsRelation: true as const,
    answer: 'TEXTUALLY_ATTESTED_SCOPE_ONLY' as const,
    executableRuleAuthorized: false as const,
  }),
  Object.freeze({
    id: 'DOES_CLASSICAL_TEXT_DISCUSS_DAYUN_ANNUAL_CLASH',
    evidenceIds: Object.freeze([
      'SANMING_DAYUN_PILLAR_CAN_CLASH_WITH_ANNUAL',
      'SANMING_DAYUN_ANNUAL_CLASH_NO_UNIVERSAL_SEVERITY',
    ]),
    sourceAttestsRelation: true as const,
    answer: 'TEXTUALLY_ATTESTED_SCOPE_ONLY' as const,
    executableRuleAuthorized: false as const,
  }),
  Object.freeze({
    id: 'CAN_HAI_WEI_IN_ONE_NATAL_YEAR_SLOT_BE_AUTO_ASSIGNED',
    evidenceIds: Object.freeze(['ZIPING_YEAR_BRANCH_EXAMPLE_REQUIRES_DISAMBIGUATION']),
    sourceAttestsRelation: false as const,
    answer: 'HOLD_ORIGINAL_ALTERNATIVE_OR_ABBREVIATION_AMBIGUITY' as const,
    executableRuleAuthorized: false as const,
  }),
  Object.freeze({
    id: 'CAN_NATAL_DAYUN_ANNUAL_BRANCH_TRIPLES_ALWAYS_BE_RECONCILED',
    evidenceIds: Object.freeze(['SANMING_ANNUAL_DAYUN_ARE_JOINT']),
    sourceAttestsRelation: false as const,
    answer: 'HOLD_NO_COMPLETE_BRANCH_TRIPLE_COMPETITION_ALGORITHM' as const,
    executableRuleAuthorized: false as const,
  }),
  Object.freeze({
    id: 'DOES_ANNUAL_ALWAYS_OVERRIDE_DAYUN_AND_NATAL',
    evidenceIds: Object.freeze(['SANMING_DAYUN_PILLAR_CAN_CLASH_WITH_ANNUAL']),
    sourceAttestsRelation: false as const,
    answer: 'HOLD_NO_GLOBAL_TEMPORAL_WINNER' as const,
    executableRuleAuthorized: false as const,
  }),
  Object.freeze({
    id: 'CAN_CLASSICAL_WORDS_ABOUT_HARM_LICENSE_PERSONAL_EVENTS',
    evidenceIds: Object.freeze(['SANMING_DAYUN_ANNUAL_CLASH_NO_UNIVERSAL_SEVERITY']),
    sourceAttestsRelation: false as const,
    answer: 'HOLD_HISTORICAL_FORECAST_NOT_EMPIRICALLY_AUTHORIZED' as const,
    executableRuleAuthorized: false as const,
  }),
]);

export const ANNUAL_THREE_LAYER_CLASSICAL_UNRESOLVED = Object.freeze([
  'YEAR_BRANCH_HAI_WEI_IN_ZIPING_SCAN_IS_NOT_TWO_SIMULTANEOUS_YEAR_SLOTS',
  'ZIPING_SI_YOU_IS_A_PARTIAL_COMBINATION_NOT_A_COMPLETE_THREE_BRANCH_RESULT',
  'SANMING_THREE_TEMPORAL_LAYERS_ARE_DISCUSSED_WITHOUT_GLOBAL_TRIPLE_CLASH_WINNER',
  'HISTORICAL_JI_XIONG_AND_HARM_WORDING_DOES_NOT_LICENSE_PERSONAL_PREDICTION',
  'DAYUN_SEGMENT_AND_LICHUN_DATE_GATES_UNCHANGED',
  'NATAL_ONLY_RELATIONS_AND_UNOBSERVED_FOURTH_PILLAR_COMBINATIONS_NOT_EXCLUDED',
  'NO_EMPIRICALLY_VALIDATED_PERSONAL_OUTCOME_SEVERITY_OR_TIMING',
] as const);

export function buildAnnualThreeLayerClassicalSourceBridge() {
  const upstream = buildClassicalConditionalResolutionEvidence();
  if (
    upstream.authority.productionAuthorized ||
    upstream.authority.ruleCompetitionResolverAuthorized ||
    ANNUAL_THREE_LAYER_CLASSICAL_PRINT_SOURCES.length !== 2 ||
    ANNUAL_THREE_LAYER_CLASSICAL_CLAUSES.length !== 7 ||
    ANNUAL_THREE_LAYER_CLASSICAL_GATE_QUESTIONS.length !== 7
  ) throw new Error('Classical source bridge requires methodological re-review');

  const sourceIds = new Set<string>(ANNUAL_THREE_LAYER_CLASSICAL_PRINT_SOURCES.map((x) => x.id));
  const clauseIds = new Set<string>(ANNUAL_THREE_LAYER_CLASSICAL_CLAUSES.map((x) => x.id));
  if (
    clauseIds.size !== ANNUAL_THREE_LAYER_CLASSICAL_CLAUSES.length ||
    ANNUAL_THREE_LAYER_CLASSICAL_CLAUSES.some((c) =>
      !sourceIds.has(c.sourceId) || c.supportsTripleClashWinner ||
      c.permitsModernInterpretation || !c.supportsTemporalConsideration) ||
    ANNUAL_THREE_LAYER_CLASSICAL_GATE_QUESTIONS.some((q) =>
      q.executableRuleAuthorized || q.evidenceIds.some((id) => !clauseIds.has(id))) ||
    ANNUAL_THREE_LAYER_CLASSICAL_PRINT_SOURCES.some((s) =>
      s.evidenceTier !== 'specific_scanned_print_pages_visually_inspected' ||
      s.printDateAndOriginalEditionConfirmed)
  ) throw new Error('Printed clause provenance or executable authority drift');

  const material = {
    status: 'three_temporal_layers_attested_but_resolution_method_hold' as const,
    version: ANNUAL_THREE_LAYER_CLASSICAL_BRIDGE_VERSION,
    upstreamConditionalHistoricalHash: upstream.classicalMethodHash,
    sources: ANNUAL_THREE_LAYER_CLASSICAL_PRINT_SOURCES,
    clauses: ANNUAL_THREE_LAYER_CLASSICAL_CLAUSES,
    questions: ANNUAL_THREE_LAYER_CLASSICAL_GATE_QUESTIONS,
    unresolved: ANNUAL_THREE_LAYER_CLASSICAL_UNRESOLVED,
    authority: Object.freeze({
      natalDayunConsiderationTextuallyAttested: true as const,
      natalDayunAnnualConsiderationTextuallyAttested: true as const,
      dayunAnnualClashConsiderationTextuallyAttested: true as const,
      originalNatalConditionAutomaticallyPortableAsAnnualTripleRule: false as const,
      fullySpecifiedTripleClashResolutionAlgorithm: false as const,
      severityOrGlobalLayerWinnerAuthorized: false as const,
      modernPersonalOutcomeAuthorized: false as const,
      officialReadingAuthorized: false as const,
      productionAuthorized: false as const,
    }),
  };
  return Object.freeze({ ...material, evidenceHash: deterministicContentHash(material) });
}

export function auditAnnualThreeLayerClassicalSourceScope(
  snapshot: CanonicalSajuSnapshot,
  request: ReadingRequest,
) {
  const previous = auditAnnualClassicalResolutionMethodScope(snapshot, request);
  if (previous.status === 'input_unavailable') return Object.freeze({
    status: 'input_unavailable' as const,
    reasonCode: previous.reasonCode,
    productionAuthorized: false as const,
  });
  if (
    previous.status !== 'research_conditional_method_scope_hold' ||
    previous.authority.productionAuthorized ||
    previous.authority.natalDayunAnnualTransportMethodAuthorized ||
    previous.globalTripleOrClashPriority !== null ||
    previous.natalDayunAnnualResolutionAlgorithm !== null
  ) throw new Error('Parent research authority changed');

  const evidence = buildAnnualThreeLayerClassicalSourceBridge();
  const material = {
    status: 'research_three_layer_scope_attested_priority_hold' as const,
    version: ANNUAL_THREE_LAYER_CLASSICAL_BRIDGE_VERSION,
    parentConditionalMethodAuditHash: previous.auditHash,
    evidenceHash: evidence.evidenceHash,
    observedTripleCandidates: previous.observedTripleCandidates,
    observedPairClashes: previous.observedPairClashes,
    observedCoexistencePairs: previous.observedCoexistencePairs,
    printedTemporalLayerReferencesVerified: 3 as const,
    completeHistoricalTripleClashAlgorithmCount: 0 as const,
    temporalLayerPrecedence: null,
    branchTripleClashResolution: null,
    outcomeSeverity: null,
    individualPrediction: null,
    authority: evidence.authority,
  };
  return Object.freeze({ ...material, auditHash: deterministicContentHash(material) });
}
