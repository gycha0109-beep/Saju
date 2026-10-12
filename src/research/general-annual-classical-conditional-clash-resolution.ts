import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ReadingRequest } from '../contracts/reading.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { auditAnnualJuan2PrintImageScope } from './general-annual-juan2-print-image-collation.js';

/**
 * An independent printed classical passage gives both resolution and
 * reinstatement counterexamples. Neither is a cross-temporal annual rule.
 */
export const ANNUAL_CLASSICAL_RESOLUTION_METHOD_VERSION =
  'sa7d-annual-classical-conditional-resolution-evidence-v1' as const;

export const CLASSICAL_RESOLUTION_PRINT_WITNESS = Object.freeze({
  id: 'ZIPING-ZHENQUAN-NLC416-VOL1-CH7',
  title: '子平真詮' as const,
  chapter: '七、論刑沖會合解法' as const,
  scanUrl: 'https://commons.wikimedia.org/wiki/File:NLC416-11jh010455-35296_子平真詮.pdf' as const,
  scanDirectUrl:
    'https://upload.wikimedia.org/wikipedia/commons/f/fe/NLC416-11jh010455-35296_子平真詮.pdf' as const,
  pdfPageOneBasedStart: 23 as const,
  pdfPageOneBasedEnd: 25 as const,
  printedLeafPageStart: '十四' as const,
  printedLeafPageEnd: '十六' as const,
  carrier: 'scanned_print_image_manually_compared' as const,
  webTranscript: 'https://www.donglishuzhai.net/chapter/3720.html' as const,
  printScanPageChecked: true as const,
  titleSpecificPrintEditionDated: false as const,
  appendedDigitalEditorNotesCountAsPrint: false as const,
  originalNatalFourPillarsContext: true as const,
  natalDayunAnnualInteractionExplicitlyAttested: false as const,
});

export const CLASSICAL_RESOLUTION_CLAUSES = Object.freeze([
  Object.freeze({
    id: 'THREE_BRANCH_HAI_MAO_WEI_RESOLVES_MAO_YOU_CLASH',
    pdfPageOneBased: 24 as const,
    printedPage: '十五' as const,
    excerpt: '有亥與未則卯與亥未會而不沖' as const,
    referencedBranches: Object.freeze(['酉', '卯', '亥', '未'] as const),
    describedRelation: 'three_branch_combination_can_resolve_clash_in_example' as const,
    historicalExampleAffirmsResolution: true as const,
    historicalExampleAffirmsReinstatement: false as const,
    fourPillarSourceScenarioNotPortableToCrossTemporalLayers: true as const,
    admitsAutomaticWinner: false as const,
  }),
  Object.freeze({
    id: 'THREE_BRANCH_SI_YOU_CHOU_RESOLVES_MAO_YOU_CLASH',
    pdfPageOneBased: 24 as const,
    printedPage: '十五' as const,
    excerpt: '有巳與丑則酉與巳丑會而不沖' as const,
    referencedBranches: Object.freeze(['酉', '卯', '巳', '丑'] as const),
    describedRelation: 'three_branch_combination_can_resolve_clash_in_example' as const,
    historicalExampleAffirmsResolution: true as const,
    historicalExampleAffirmsReinstatement: false as const,
    fourPillarSourceScenarioNotPortableToCrossTemporalLayers: true as const,
    admitsAutomaticWinner: false as const,
  }),
  Object.freeze({
    id: 'SECOND_COMBINATION_REINSTATES_ZI_WU_CLASH',
    pdfPageOneBased: 25 as const,
    printedPage: '十六' as const,
    excerpt: '而時逢巳酉則丑與巳酉會而子復沖午' as const,
    referencedBranches: Object.freeze(['子', '午', '丑', '巳', '酉'] as const),
    describedRelation: 'alternative_combination_can_reinstate_clash_in_example' as const,
    historicalExampleAffirmsResolution: false as const,
    historicalExampleAffirmsReinstatement: true as const,
    fourPillarSourceScenarioNotPortableToCrossTemporalLayers: true as const,
    admitsAutomaticWinner: false as const,
  }),
  Object.freeze({
    id: 'ONE_COMBINATION_ONE_PUNISHMENT',
    pdfPageOneBased: 25 as const,
    printedPage: '十六' as const,
    excerpt: '一合而一刑' as const,
    referencedBranches: Object.freeze(['子', '卯', '戌'] as const),
    describedRelation: 'same_branch_value_multiple_distinct_slots_matter' as const,
    historicalExampleAffirmsResolution: false as const,
    historicalExampleAffirmsReinstatement: true as const,
    fourPillarSourceScenarioNotPortableToCrossTemporalLayers: true as const,
    admitsAutomaticWinner: false as const,
  }),
]);

/** Context classification, not an executable 吉凶/合化 resolution algorithm. */
export const CLASSICAL_RESOLUTION_METHOD_QUESTIONS = Object.freeze([
  Object.freeze({
    id: 'DOES_CLASSICAL_TEXT_ALLOW_CONDITIONAL_TRIPLE_TO_RESOLVE_CLASH',
    witnessedBy: Object.freeze([
      'THREE_BRANCH_HAI_MAO_WEI_RESOLVES_MAO_YOU_CLASH',
      'THREE_BRANCH_SI_YOU_CHOU_RESOLVES_MAO_YOU_CLASH',
    ]),
    historicalStatementDirectlyAttested: true as const,
    executableModernRuleAuthorized: false as const,
    decision: 'TEXTUALLY_ATTESTED_SCOPE_LIMITED' as const,
  }),
  Object.freeze({
    id: 'CAN_OTHER_COMBINATIONS_REINSTATE_CLASH',
    witnessedBy: Object.freeze(['SECOND_COMBINATION_REINSTATES_ZI_WU_CLASH']),
    historicalStatementDirectlyAttested: true as const,
    executableModernRuleAuthorized: false as const,
    decision: 'TEXTUALLY_ATTESTED_SCOPE_LIMITED' as const,
  }),
  Object.freeze({
    id: 'DOES_TRIPLE_ALWAYS_OUTRANK_CLASH',
    witnessedBy: Object.freeze([
      'THREE_BRANCH_HAI_MAO_WEI_RESOLVES_MAO_YOU_CLASH',
      'SECOND_COMBINATION_REINSTATES_ZI_WU_CLASH',
    ]),
    historicalStatementDirectlyAttested: false as const,
    executableModernRuleAuthorized: false as const,
    decision: 'HOLD_DIRECT_COUNTEREXAMPLE_TO_BLANKET_PRIORITY' as const,
  }),
  Object.freeze({
    id: 'DOES_CLASH_ALWAYS_BREAK_TRIPLE',
    witnessedBy: Object.freeze(['THREE_BRANCH_SI_YOU_CHOU_RESOLVES_MAO_YOU_CLASH']),
    historicalStatementDirectlyAttested: false as const,
    executableModernRuleAuthorized: false as const,
    decision: 'HOLD_COUNTEREXAMPLE_TO_BLANKET_CLASH_PRIORITY' as const,
  }),
  Object.freeze({
    id: 'DO_FOUR_PILLAR_EXAMPLES_DEFINE_ANNUAL_DAYUN_NATAL_LAYER_PORTABILITY',
    witnessedBy: Object.freeze([]),
    historicalStatementDirectlyAttested: false as const,
    executableModernRuleAuthorized: false as const,
    decision: 'HOLD_ORIGINAL_CONTEXT_NOT_THREE_TEMPORAL_LAYERS' as const,
  }),
  Object.freeze({
    id: 'DOES_ANNUAL_AUTOMATICALLY_RANK_ABOVE_DAYUN_OR_NATAL',
    witnessedBy: Object.freeze([]),
    historicalStatementDirectlyAttested: false as const,
    executableModernRuleAuthorized: false as const,
    decision: 'HOLD_NO_CROSS_TEMPORAL_ORDER' as const,
  }),
  Object.freeze({
    id: 'CAN_HISTORICAL_FIVE_BRANCH_ILLUSTRATION_BE_EXECUTED_AS_FOUR_SLOTS',
    witnessedBy: Object.freeze(['SECOND_COMBINATION_REINSTATES_ZI_WU_CLASH']),
    historicalStatementDirectlyAttested: false as const,
    executableModernRuleAuthorized: false as const,
    decision: 'HOLD_ILLUSTRATIVE_RELATIONS_REQUIRE_SLOT_DISAMBIGUATION' as const,
  }),
]);

export const CLASSICAL_RESOLUTION_METHOD_UNRESOLVED = Object.freeze([
  'FOUR_PILLAR_EXAMPLES_ARE_NOT_AN_ANNUAL_DAYUN_NATAL_PRECEDENCE_PROGRAM',
  'SOURCE_USES_SANHUI_FOR_SHEN_ZI_CHEN_NOT_MODERN_SANHUI_TERMINOLOGY',
  'FIVE_BRANCH_ILLUSTRATION_CANNOT_BE_LOADED_INTO_FOUR_DISTINCT_PILLAR_SLOTS_AS_WRITTEN',
  'DUPLICATED_MAO_VALUES_DO_NOT_COLLAPSE_DISTINCT_NATAL_SLOTS',
  'EXACT_PRINT_EDITION_AND_COMMENTARY_RELATION_NOT_DATED',
  'NO_PERSONAL_SEVERITY_EVENT_OR_TIMING_AUTHORITY',
] as const);

export function buildClassicalConditionalResolutionEvidence() {
  const clauses = CLASSICAL_RESOLUTION_CLAUSES;
  const caseIds = new Set<string>(clauses.map((c) => c.id));
  if (
    !CLASSICAL_RESOLUTION_PRINT_WITNESS.printScanPageChecked ||
    CLASSICAL_RESOLUTION_PRINT_WITNESS.natalDayunAnnualInteractionExplicitlyAttested ||
    clauses.length !== 4 ||
    caseIds.size !== 4 ||
    CLASSICAL_RESOLUTION_METHOD_QUESTIONS.length !== 7 ||
    clauses.some((c) =>
      c.admitsAutomaticWinner || !c.fourPillarSourceScenarioNotPortableToCrossTemporalLayers ||
      c.pdfPageOneBased < 24 || c.pdfPageOneBased > 25) ||
    CLASSICAL_RESOLUTION_METHOD_QUESTIONS.some((q) =>
      q.executableModernRuleAuthorized || q.witnessedBy.some((id) => !caseIds.has(id))) ||
    clauses.filter((c) => c.historicalExampleAffirmsResolution).length !== 2 ||
    clauses.filter((c) => c.historicalExampleAffirmsReinstatement).length !== 2
  ) throw new Error('Unreviewed classical resolution rule promotion or source drift');

  const material = {
    status: 'classical_conditional_resolution_and_counterexample_attested' as const,
    version: ANNUAL_CLASSICAL_RESOLUTION_METHOD_VERSION,
    source: CLASSICAL_RESOLUTION_PRINT_WITNESS,
    clauses,
    questionGates: CLASSICAL_RESOLUTION_METHOD_QUESTIONS,
    unresolved: CLASSICAL_RESOLUTION_METHOD_UNRESOLVED,
    authority: Object.freeze({
      printedTextSupportsConditionalHistoricalCases: true as const,
      printedTextSupportsUniversalTripleWinner: false as const,
      printedTextSupportsUniversalClashWinner: false as const,
      historicalExampleFullySpecifiedAsValidFourPillarChart: false as const,
      natalDayunAnnualTransportMethodAuthorized: false as const,
      ruleCompetitionResolverAuthorized: false as const,
      modernIndividualInterpretationAuthorized: false as const,
      productionAuthorized: false as const,
    }),
  };
  return Object.freeze({ ...material, classicalMethodHash: deterministicContentHash(material) });
}

export function auditAnnualClassicalResolutionMethodScope(
  snapshot: CanonicalSajuSnapshot,
  request: ReadingRequest,
) {
  const previous = auditAnnualJuan2PrintImageScope(snapshot, request);
  if (previous.status === 'input_unavailable') return Object.freeze({
    status: 'input_unavailable' as const,
    reasonCode: previous.reasonCode,
    productionAuthorized: false as const,
  });
  if (
    previous.status !== 'research_one_print_witness_priority_hold' ||
    previous.authority.productionAuthorized ||
    previous.authority.branchTripleClashPriorityAuthorized ||
    previous.tripleClashPriorityDecision !== null
  ) throw new Error('Upstream print or structural authority changed');

  const evidence = buildClassicalConditionalResolutionEvidence();
  const material = {
    status: 'research_conditional_method_scope_hold' as const,
    version: ANNUAL_CLASSICAL_RESOLUTION_METHOD_VERSION,
    upstreamPrintScopeAuditHash: previous.auditHash,
    classicalMethodHash: evidence.classicalMethodHash,
    observedTripleCandidates: previous.observedTripleCandidates,
    observedPairClashes: previous.observedPairClashes,
    observedCoexistencePairs: previous.observedCoexistencePairs,
    observedModernCasesAdjudicatedByHistoricalPrecedence: 0 as const,
    contextualHistoricalCases: evidence.clauses.length,
    possibleHistoricalAnalogiesAsAuthorizedForecasts: 0 as const,
    globalTripleOrClashPriority: null,
    natalDayunAnnualResolutionAlgorithm: null,
    personalOutcome: null,
    authority: evidence.authority,
  };
  return Object.freeze({ ...material, auditHash: deterministicContentHash(material) });
}
