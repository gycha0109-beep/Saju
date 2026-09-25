import {
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_VERSION,
} from './general-natal-geju-candidate-source-frontier.js';
import {
  GENERAL_NATAL_GEJU_SELECTION_SIGNAL_OBSERVATION_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_SELECTION_SIGNAL_OBSERVATION_VERSION,
} from './general-natal-geju-selection-signal-observation.js';
import {
  GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_DIRECT_EXEMPLARS,
  GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_VERSION,
} from './general-natal-geju-source-semantic-use-identity.js';
import {
  GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_VERSION,
  GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_SOURCE_REFERENCES,
} from './general-natal-geju-month-order-hidden-stem-selection-admission-review.js';
import {
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EVIDENCE_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EVIDENCE_VERSION,
} from './general-natal-geju-branch-meeting-source-evidence.js';
import {
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_DEFINITION_HASH,
  GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_VERSION,
} from './general-natal-geju-branch-meeting-selection-effect-admission-review.js';
import {
  R131_AUTHORITY,
  R131_PATTERN_CANDIDATE_ESTABLISHMENT_BOUNDARY_VERSION,
} from './general-natal-pattern-candidate-establishment-formal-boundary-audit.js';

export const R132_MIXED_MONTH_QI_CANDIDATE_SELECTION_VARIANT_CORPUS_VERSION =
  '0.1.0-research' as const;

export type R132Provenance =
  | 'DIRECT_SOURCE_SEMANTIC_EXEMPLAR'
  | 'DIRECT_EXACT_SOURCE_ROLE'
  | 'GOVERNED_SOURCE_ALIGNED_OBSERVATION'
  | 'SYNTHETIC_COUNTERFACTUAL'
  | 'SYNTHETIC_NEGATIVE_CONTROL';

export type R132VariantClass =
  | 'ZERO_VS_ONE_TRANSPARENCY'
  | 'ONE_VS_MULTIPLE_TRANSPARENCIES'
  | 'SAME_USE_CROSS_MECHANISM'
  | 'DISTINCT_USE_CROSS_MECHANISM'
  | 'THREE_SIGNALS_TWO_USES'
  | 'EXACT_YIN_ROLE_AND_SUBSTITUTION'
  | 'HIDDEN_STEM_STORAGE_ORDER_CONTROL'
  | 'PARTIAL_VS_FULL_BRANCH_MEETING'
  | 'STRUCTURAL_MEETING_EFFECTIVENESS_UNRESOLVED'
  | 'SIGNAL_ARRAY_ORDER_CONTROL'
  | 'SOURCE_USE_CARDINALITY_CONTRAST'
  | 'EXACT_EXEMPLAR_EXTRA_SIGNAL_BOUNDARY';

export type R132SemanticUseStatus =
  | 'DIRECT_SOURCE_USE_IDENTITY_OBSERVED'
  | 'EXACT_SOURCE_ROLE_OBSERVED'
  | 'SOURCE_ALIGNED_MEETING_OBSERVED_USE_UNRESOLVED'
  | 'NO_DIRECT_SOURCE_USE_ASSERTED';

export interface R132VariantRow {
  caseId: string;
  comparisonGroupId: string;
  variantClass: R132VariantClass;
  provenance: R132Provenance;
  synthetic: boolean;
  negativeControl: boolean;
  exactSourceExemplarMatch: boolean;
  sourceDirectStatementObserved: boolean;
  dayMaster: string | null;
  monthBranch: string;
  hiddenStemMembership: readonly string[];
  hiddenStemStorageOrderSemantic: false;
  governedSignals: readonly string[];
  governedSignalCount: number;
  branchMeetingStructuralStatus:
    | 'NOT_PRESENT'
    | 'PARTIAL_NOT_GOVERNED_AS_FULL_MEETING'
    | 'SOURCE_ALIGNED_FULL_THREE_STRUCTURAL_MATCH'
    | 'SAME_STRUCTURAL_MATCH_POST_INTERACTION_EFFECT_UNRESOLVED';
  branchMeetingEffectEstablished: false;
  sourceSemanticUseStatus: R132SemanticUseStatus;
  sourceSemanticUseLabels: readonly string[] | null;
  sourceSemanticUseCount: number | null;
  candidateCount: null;
  candidateRank: null;
  candidatePrecedence: null;
  candidateIdentityAuthorized: false;
  candidateDerivationAuthorized: false;
  establishmentPredicateAuthorized: false;
  candidateFactsEmitted: false;
  establishmentFactsEmitted: false;
  sourceRefs: readonly string[];
  unresolvedBridge: string;
  invalidInference: string;
  authorityConsequence: string;
}

export const R132_UPSTREAM_BINDINGS = Object.freeze({
  candidateSourceFrontier: Object.freeze({
    version: GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_VERSION,
    definitionHash: GENERAL_NATAL_GEJU_CANDIDATE_SOURCE_FRONTIER_DEFINITION_HASH,
  }),
  selectionSignalObservation: Object.freeze({
    version: GENERAL_NATAL_GEJU_SELECTION_SIGNAL_OBSERVATION_VERSION,
    definitionHash: GENERAL_NATAL_GEJU_SELECTION_SIGNAL_OBSERVATION_DEFINITION_HASH,
  }),
  sourceSemanticUseIdentity: Object.freeze({
    version: GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_VERSION,
    definitionHash: GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_IDENTITY_DEFINITION_HASH,
  }),
  monthOrderHiddenStemSelection: Object.freeze({
    version:
      GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_VERSION,
    definitionHash:
      GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_REVIEW_DEFINITION_HASH,
  }),
  branchMeetingSourceEvidence: Object.freeze({
    version: GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EVIDENCE_VERSION,
    definitionHash: GENERAL_NATAL_GEJU_BRANCH_MEETING_SOURCE_EVIDENCE_DEFINITION_HASH,
  }),
  branchMeetingSelectionEffect: Object.freeze({
    version:
      GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_VERSION,
    definitionHash:
      GENERAL_NATAL_GEJU_BRANCH_MEETING_SELECTION_EFFECT_ADMISSION_REVIEW_DEFINITION_HASH,
  }),
  r131Boundary: Object.freeze({
    version: R131_PATTERN_CANDIDATE_ESTABLISHMENT_BOUNDARY_VERSION,
    candidateIdentityAuthorized: R131_AUTHORITY.candidateIdentityAuthorized,
    candidateDerivationAuthorized: R131_AUTHORITY.candidateDerivationAuthorized,
    establishmentPredicateAuthorized: R131_AUTHORITY.establishmentPredicateAuthorized,
  }),
});

const DIRECT_EXEMPLAR_IDS = Object.freeze(
  GENERAL_NATAL_GEJU_SOURCE_SEMANTIC_USE_DIRECT_EXEMPLARS.map(
    (exemplar) => exemplar.exemplarId,
  ),
);

const YIN_PRIMARY_SOURCE_ID =
  GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_SOURCE_REFERENCES
    .yinPrimaryRole.sourceId;
const YIN_SUBSTITUTION_SOURCE_ID =
  GENERAL_NATAL_GEJU_MONTH_ORDER_HIDDEN_STEM_SELECTION_ADMISSION_SOURCE_REFERENCES
    .yinTransparencySubstitution.sourceId;

function row(
  input: Omit<
    R132VariantRow,
    | 'hiddenStemStorageOrderSemantic'
    | 'branchMeetingEffectEstablished'
    | 'candidateCount'
    | 'candidateRank'
    | 'candidatePrecedence'
    | 'candidateIdentityAuthorized'
    | 'candidateDerivationAuthorized'
    | 'establishmentPredicateAuthorized'
    | 'candidateFactsEmitted'
    | 'establishmentFactsEmitted'
  >,
): R132VariantRow {
  return Object.freeze({
    ...input,
    hiddenStemStorageOrderSemantic: false,
    branchMeetingEffectEstablished: false,
    candidateCount: null,
    candidateRank: null,
    candidatePrecedence: null,
    candidateIdentityAuthorized: false,
    candidateDerivationAuthorized: false,
    establishmentPredicateAuthorized: false,
    candidateFactsEmitted: false,
    establishmentFactsEmitted: false,
  });
}

export const R132_VARIANT_CORPUS: readonly R132VariantRow[] = Object.freeze([
  row({
    caseId: 'R132-C01-ZERO-GOVERNED-SIGNALS',
    comparisonGroupId: 'R132-G01-ZERO-VS-ONE-TRANSPARENCY',
    variantClass: 'ZERO_VS_ONE_TRANSPARENCY',
    provenance: 'SYNTHETIC_COUNTERFACTUAL',
    synthetic: true,
    negativeControl: false,
    exactSourceExemplarMatch: false,
    sourceDirectStatementObserved: false,
    dayMaster: null,
    monthBranch: '진',
    hiddenStemMembership: ['무', '을', '계'],
    governedSignals: [],
    governedSignalCount: 0,
    branchMeetingStructuralStatus: 'NOT_PRESENT',
    sourceSemanticUseStatus: 'NO_DIRECT_SOURCE_USE_ASSERTED',
    sourceSemanticUseLabels: null,
    sourceSemanticUseCount: null,
    sourceRefs: ['general-natal-geju-selection-signal-observation'],
    unresolvedBridge:
      'The governed signal set is explicitly non-exhaustive; absence of a governed positive signal does not settle candidate existence.',
    invalidInference: 'ZERO_GOVERNED_SIGNALS_EQUALS_NO_CANDIDATE',
    authorityConsequence:
      'No candidate absence, candidate identity, or establishment conclusion is authorized.',
  }),
  row({
    caseId: 'R132-C02-ONE-TRANSPARENCY-SIGNAL',
    comparisonGroupId: 'R132-G01-ZERO-VS-ONE-TRANSPARENCY',
    variantClass: 'ZERO_VS_ONE_TRANSPARENCY',
    provenance: 'SYNTHETIC_COUNTERFACTUAL',
    synthetic: true,
    negativeControl: false,
    exactSourceExemplarMatch: false,
    sourceDirectStatementObserved: false,
    dayMaster: null,
    monthBranch: '진',
    hiddenStemMembership: ['무', '을', '계'],
    governedSignals: ['transparency:계'],
    governedSignalCount: 1,
    branchMeetingStructuralStatus: 'NOT_PRESENT',
    sourceSemanticUseStatus: 'NO_DIRECT_SOURCE_USE_ASSERTED',
    sourceSemanticUseLabels: null,
    sourceSemanticUseCount: null,
    sourceRefs: ['general-natal-geju-selection-signal-observation'],
    unresolvedBridge:
      'A transparency observation has no generalized signal-to-use or signal-to-candidate identity predicate.',
    invalidInference: 'ONE_TRANSPARENCY_EQUALS_ONE_CANDIDATE',
    authorityConsequence:
      'The perturbation is semantically material but does not authorize candidate count or identity.',
  }),
  row({
    caseId: 'R132-C03-ONE-TRANSPARENCY-BASELINE',
    comparisonGroupId: 'R132-G02-ONE-VS-MULTIPLE-TRANSPARENCIES',
    variantClass: 'ONE_VS_MULTIPLE_TRANSPARENCIES',
    provenance: 'SYNTHETIC_COUNTERFACTUAL',
    synthetic: true,
    negativeControl: false,
    exactSourceExemplarMatch: false,
    sourceDirectStatementObserved: false,
    dayMaster: null,
    monthBranch: '술',
    hiddenStemMembership: ['무', '신', '정'],
    governedSignals: ['transparency:신'],
    governedSignalCount: 1,
    branchMeetingStructuralStatus: 'NOT_PRESENT',
    sourceSemanticUseStatus: 'NO_DIRECT_SOURCE_USE_ASSERTED',
    sourceSemanticUseLabels: null,
    sourceSemanticUseCount: null,
    sourceRefs: ['general-natal-geju-selection-signal-observation'],
    unresolvedBridge:
      'One transparency does not define a canonical candidate or winner.',
    invalidInference: 'SIGNAL_COUNT_EQUALS_CANDIDATE_COUNT',
    authorityConsequence: 'Candidate count remains null.',
  }),
  row({
    caseId: 'R132-C04-TWO-TRANSPARENCIES',
    comparisonGroupId: 'R132-G02-ONE-VS-MULTIPLE-TRANSPARENCIES',
    variantClass: 'ONE_VS_MULTIPLE_TRANSPARENCIES',
    provenance: 'SYNTHETIC_COUNTERFACTUAL',
    synthetic: true,
    negativeControl: false,
    exactSourceExemplarMatch: false,
    sourceDirectStatementObserved: false,
    dayMaster: null,
    monthBranch: '술',
    hiddenStemMembership: ['무', '신', '정'],
    governedSignals: ['transparency:신', 'transparency:정'],
    governedSignalCount: 2,
    branchMeetingStructuralStatus: 'NOT_PRESENT',
    sourceSemanticUseStatus: 'NO_DIRECT_SOURCE_USE_ASSERTED',
    sourceSemanticUseLabels: null,
    sourceSemanticUseCount: null,
    sourceRefs: ['general-natal-geju-selection-signal-observation'],
    unresolvedBridge:
      '兼透 permits plural/coexisting source selection signals but does not define candidate multiplicity, ordering, or precedence.',
    invalidInference: 'MULTIPLE_TRANSPARENCIES_EQUAL_RANKED_CANDIDATES',
    authorityConsequence:
      'Plural signals are observed as a variant dimension only; no candidate array is authorized.',
  }),
  row({
    caseId: 'R132-C05-JIA-CHEN-EXACT-SAME-USE',
    comparisonGroupId: 'R132-G03-JIA-CHEN-EXACT-VS-MEETING-REMOVED',
    variantClass: 'SAME_USE_CROSS_MECHANISM',
    provenance: 'DIRECT_SOURCE_SEMANTIC_EXEMPLAR',
    synthetic: false,
    negativeControl: false,
    exactSourceExemplarMatch: true,
    sourceDirectStatementObserved: true,
    dayMaster: '갑',
    monthBranch: '진',
    hiddenStemMembership: ['무', '을', '계'],
    governedSignals: ['transparency:계', 'branch_meeting:CHEN_SHEN_ZI_MEETING'],
    governedSignalCount: 2,
    branchMeetingStructuralStatus: 'SOURCE_ALIGNED_FULL_THREE_STRUCTURAL_MATCH',
    sourceSemanticUseStatus: 'DIRECT_SOURCE_USE_IDENTITY_OBSERVED',
    sourceSemanticUseLabels: ['印'],
    sourceSemanticUseCount: 1,
    sourceRefs: ['JIA_CHEN_GUI_SHEN_ZI_ONE_YIN_USE'],
    unresolvedBridge:
      'Two signal mechanisms sharing one direct source use do not authorize semantic deduplication into one canonical candidate.',
    invalidInference: 'SAME_SOURCE_USE_EQUALS_ONE_CANONICAL_CANDIDATE',
    authorityConsequence:
      'Exact source same-use identity is preserved; canonical candidate identity remains unauthorized.',
  }),
  row({
    caseId: 'R132-C06-JIA-CHEN-MEETING-REMOVED',
    comparisonGroupId: 'R132-G03-JIA-CHEN-EXACT-VS-MEETING-REMOVED',
    variantClass: 'SAME_USE_CROSS_MECHANISM',
    provenance: 'SYNTHETIC_COUNTERFACTUAL',
    synthetic: true,
    negativeControl: false,
    exactSourceExemplarMatch: false,
    sourceDirectStatementObserved: false,
    dayMaster: '갑',
    monthBranch: '진',
    hiddenStemMembership: ['무', '을', '계'],
    governedSignals: ['transparency:계'],
    governedSignalCount: 1,
    branchMeetingStructuralStatus: 'NOT_PRESENT',
    sourceSemanticUseStatus: 'NO_DIRECT_SOURCE_USE_ASSERTED',
    sourceSemanticUseLabels: null,
    sourceSemanticUseCount: null,
    sourceRefs: ['JIA_CHEN_GUI_SHEN_ZI_ONE_YIN_USE'],
    unresolvedBridge:
      'Removing one required signal breaks exact exemplar matching; the remaining signal cannot inherit the exemplar semantic-use label by generalization.',
    invalidInference: 'PARTIAL_EXEMPLAR_INHERITS_DIRECT_SOURCE_LABEL',
    authorityConsequence:
      'The counterfactual has no invented source-use or candidate label.',
  }),
  row({
    caseId: 'R132-C07-REN-WEI-EXACT-DISTINCT-USES',
    comparisonGroupId: 'R132-G04-REN-WEI-EXACT-VS-TRANSPARENCY-REMOVED',
    variantClass: 'DISTINCT_USE_CROSS_MECHANISM',
    provenance: 'DIRECT_SOURCE_SEMANTIC_EXEMPLAR',
    synthetic: false,
    negativeControl: false,
    exactSourceExemplarMatch: true,
    sourceDirectStatementObserved: true,
    dayMaster: '임',
    monthBranch: '미',
    hiddenStemMembership: ['기', '정', '을'],
    governedSignals: ['transparency:기', 'branch_meeting:WEI_HAI_MAO_MEETING'],
    governedSignalCount: 2,
    branchMeetingStructuralStatus: 'SOURCE_ALIGNED_FULL_THREE_STRUCTURAL_MATCH',
    sourceSemanticUseStatus: 'DIRECT_SOURCE_USE_IDENTITY_OBSERVED',
    sourceSemanticUseLabels: ['官', '傷官'],
    sourceSemanticUseCount: 2,
    sourceRefs: ['REN_WEI_JI_HAI_MAO_GUAN_AND_SHANG_GUAN_USES'],
    unresolvedBridge:
      'Distinct source-named uses do not define canonical candidate multiplicity, ordering, precedence, or establishment.',
    invalidInference: 'TWO_SOURCE_USES_EQUAL_TWO_CANONICAL_CANDIDATES',
    authorityConsequence:
      'Exact distinct-use identity is preserved without candidate multiplicity authority.',
  }),
  row({
    caseId: 'R132-C08-REN-WEI-TRANSPARENCY-REMOVED',
    comparisonGroupId: 'R132-G04-REN-WEI-EXACT-VS-TRANSPARENCY-REMOVED',
    variantClass: 'DISTINCT_USE_CROSS_MECHANISM',
    provenance: 'SYNTHETIC_COUNTERFACTUAL',
    synthetic: true,
    negativeControl: false,
    exactSourceExemplarMatch: false,
    sourceDirectStatementObserved: false,
    dayMaster: '임',
    monthBranch: '미',
    hiddenStemMembership: ['기', '정', '을'],
    governedSignals: ['branch_meeting:WEI_HAI_MAO_MEETING'],
    governedSignalCount: 1,
    branchMeetingStructuralStatus: 'SOURCE_ALIGNED_FULL_THREE_STRUCTURAL_MATCH',
    sourceSemanticUseStatus: 'NO_DIRECT_SOURCE_USE_ASSERTED',
    sourceSemanticUseLabels: null,
    sourceSemanticUseCount: null,
    sourceRefs: ['REN_WEI_JI_HAI_MAO_GUAN_AND_SHANG_GUAN_USES'],
    unresolvedBridge:
      'The exact two-signal exemplar does not authorize semantic-use identity after one required signal is removed.',
    invalidInference: 'MEETING_ONLY_INHERITS_EXACT_EXEMPLAR_USE_SET',
    authorityConsequence:
      'No generalized source-use or candidate label is emitted.',
  }),
  row({
    caseId: 'R132-C09-JIA-XU-EXACT-THREE-SIGNALS-TWO-USES',
    comparisonGroupId: 'R132-G05-JIA-XU-EXACT-VS-ONE-TRANSPARENCY-REMOVED',
    variantClass: 'THREE_SIGNALS_TWO_USES',
    provenance: 'DIRECT_SOURCE_SEMANTIC_EXEMPLAR',
    synthetic: false,
    negativeControl: false,
    exactSourceExemplarMatch: true,
    sourceDirectStatementObserved: true,
    dayMaster: '갑',
    monthBranch: '술',
    hiddenStemMembership: ['무', '신', '정'],
    governedSignals: [
      'transparency:신',
      'transparency:정',
      'branch_meeting:XU_YIN_WU_MEETING',
    ],
    governedSignalCount: 3,
    branchMeetingStructuralStatus: 'SOURCE_ALIGNED_FULL_THREE_STRUCTURAL_MATCH',
    sourceSemanticUseStatus: 'DIRECT_SOURCE_USE_IDENTITY_OBSERVED',
    sourceSemanticUseLabels: ['官', '傷官'],
    sourceSemanticUseCount: 2,
    sourceRefs: ['JIA_XU_XIN_DING_YIN_WU_THREE_SIGNALS_TWO_USES'],
    unresolvedBridge:
      'Three governed signals map to two direct source uses in this exact exemplar, disproving signal-count/use-count equivalence without defining candidate count.',
    invalidInference: 'THREE_SIGNALS_EQUAL_THREE_CANDIDATES',
    authorityConsequence:
      'The 3-to-2 source relation is preserved; candidate cardinality remains null.',
  }),
  row({
    caseId: 'R132-C10-JIA-XU-XIN-REMOVED',
    comparisonGroupId: 'R132-G05-JIA-XU-EXACT-VS-ONE-TRANSPARENCY-REMOVED',
    variantClass: 'THREE_SIGNALS_TWO_USES',
    provenance: 'SYNTHETIC_COUNTERFACTUAL',
    synthetic: true,
    negativeControl: false,
    exactSourceExemplarMatch: false,
    sourceDirectStatementObserved: false,
    dayMaster: '갑',
    monthBranch: '술',
    hiddenStemMembership: ['무', '신', '정'],
    governedSignals: ['transparency:정', 'branch_meeting:XU_YIN_WU_MEETING'],
    governedSignalCount: 2,
    branchMeetingStructuralStatus: 'SOURCE_ALIGNED_FULL_THREE_STRUCTURAL_MATCH',
    sourceSemanticUseStatus: 'NO_DIRECT_SOURCE_USE_ASSERTED',
    sourceSemanticUseLabels: null,
    sourceSemanticUseCount: null,
    sourceRefs: ['JIA_XU_XIN_DING_YIN_WU_THREE_SIGNALS_TWO_USES'],
    unresolvedBridge:
      'Removing 辛 transparency breaks the exact three-signal exemplar; remaining 丁 plus meeting cannot inherit the source-use set through an unauthorized generalized matcher.',
    invalidInference: 'SUBSET_OF_EXACT_SIGNALS_INHERITS_SOURCE_USE_SET',
    authorityConsequence:
      'No source-use count, candidate count, or rank is inferred.',
  }),
  row({
    caseId: 'R132-C11-YIN-EXACT-PRIMARY-ROLE',
    comparisonGroupId: 'R132-G06-YIN-PRIMARY-VS-TRANSPARENCY-SUBSTITUTION',
    variantClass: 'EXACT_YIN_ROLE_AND_SUBSTITUTION',
    provenance: 'DIRECT_EXACT_SOURCE_ROLE',
    synthetic: false,
    negativeControl: false,
    exactSourceExemplarMatch: true,
    sourceDirectStatementObserved: true,
    dayMaster: null,
    monthBranch: '인',
    hiddenStemMembership: ['갑', '병', '무'],
    governedSignals: [],
    governedSignalCount: 0,
    branchMeetingStructuralStatus: 'NOT_PRESENT',
    sourceSemanticUseStatus: 'EXACT_SOURCE_ROLE_OBSERVED',
    sourceSemanticUseLabels: ['甲為本主'],
    sourceSemanticUseCount: 1,
    sourceRefs: [YIN_PRIMARY_SOURCE_ID],
    unresolvedBridge:
      'Exact 寅 role wording does not provide an all-branch hidden-stem hierarchy or candidate identity.',
    invalidInference: 'YIN_EXACT_PRIMARY_ROLE_EQUALS_ALL_BRANCH_PRIMARY_INDEX',
    authorityConsequence:
      '甲為本主 remains exact 寅 evidence only.',
  }),
  row({
    caseId: 'R132-C12-YIN-EXACT-TRANSPARENCY-SUBSTITUTION',
    comparisonGroupId: 'R132-G06-YIN-PRIMARY-VS-TRANSPARENCY-SUBSTITUTION',
    variantClass: 'EXACT_YIN_ROLE_AND_SUBSTITUTION',
    provenance: 'DIRECT_EXACT_SOURCE_ROLE',
    synthetic: false,
    negativeControl: false,
    exactSourceExemplarMatch: true,
    sourceDirectStatementObserved: true,
    dayMaster: null,
    monthBranch: '인',
    hiddenStemMembership: ['갑', '병', '무'],
    governedSignals: ['transparency:병'],
    governedSignalCount: 1,
    branchMeetingStructuralStatus: 'NOT_PRESENT',
    sourceSemanticUseStatus: 'EXACT_SOURCE_ROLE_OBSERVED',
    sourceSemanticUseLabels: ['丙可作主'],
    sourceSemanticUseCount: 1,
    sourceRefs: [YIN_SUBSTITUTION_SOURCE_ID],
    unresolvedBridge:
      'The exact condition 不透甲而透丙 is not a generalized selector for other branches, multiple transparencies, meetings, or conflicts.',
    invalidInference: 'YIN_SUBSTITUTION_EQUALS_GENERAL_TRANSPARENCY_WINNER_RULE',
    authorityConsequence:
      '丙可作主 is preserved only under the exact 寅 example boundary.',
  }),
  row({
    caseId: 'R132-C13-HIDDEN-STEM-ORDER-A',
    comparisonGroupId: 'R132-G07-HIDDEN-STEM-STORAGE-ORDER-CONTROL',
    variantClass: 'HIDDEN_STEM_STORAGE_ORDER_CONTROL',
    provenance: 'SYNTHETIC_NEGATIVE_CONTROL',
    synthetic: true,
    negativeControl: true,
    exactSourceExemplarMatch: false,
    sourceDirectStatementObserved: false,
    dayMaster: null,
    monthBranch: '인',
    hiddenStemMembership: ['갑', '병', '무'],
    governedSignals: [],
    governedSignalCount: 0,
    branchMeetingStructuralStatus: 'NOT_PRESENT',
    sourceSemanticUseStatus: 'NO_DIRECT_SOURCE_USE_ASSERTED',
    sourceSemanticUseLabels: null,
    sourceSemanticUseCount: null,
    sourceRefs: ['general-natal-geju-month-order-hidden-stem-selection-admission-review'],
    unresolvedBridge:
      'Canonical hidden-stem membership is enumerable but storage position has no semantic rank authority.',
    invalidInference: 'ARRAY_INDEX_EQUALS_HIDDEN_STEM_RANK',
    authorityConsequence:
      'Storage order must not alter candidate identity, rank, or selection.',
  }),
  row({
    caseId: 'R132-C14-HIDDEN-STEM-ORDER-B',
    comparisonGroupId: 'R132-G07-HIDDEN-STEM-STORAGE-ORDER-CONTROL',
    variantClass: 'HIDDEN_STEM_STORAGE_ORDER_CONTROL',
    provenance: 'SYNTHETIC_NEGATIVE_CONTROL',
    synthetic: true,
    negativeControl: true,
    exactSourceExemplarMatch: false,
    sourceDirectStatementObserved: false,
    dayMaster: null,
    monthBranch: '인',
    hiddenStemMembership: ['병', '갑', '무'],
    governedSignals: [],
    governedSignalCount: 0,
    branchMeetingStructuralStatus: 'NOT_PRESENT',
    sourceSemanticUseStatus: 'NO_DIRECT_SOURCE_USE_ASSERTED',
    sourceSemanticUseLabels: null,
    sourceSemanticUseCount: null,
    sourceRefs: ['general-natal-geju-month-order-hidden-stem-selection-admission-review'],
    unresolvedBridge:
      'Reordering the same membership set is a non-semantic storage perturbation.',
    invalidInference: 'REORDERED_ARRAY_CHANGES_CANDIDATE_RANK',
    authorityConsequence:
      'The negative control must remain candidate-neutral.',
  }),
  row({
    caseId: 'R132-C15-CHEN-PARTIAL-MEETING',
    comparisonGroupId: 'R132-G08-PARTIAL-VS-FULL-BRANCH-MEETING',
    variantClass: 'PARTIAL_VS_FULL_BRANCH_MEETING',
    provenance: 'SYNTHETIC_COUNTERFACTUAL',
    synthetic: true,
    negativeControl: false,
    exactSourceExemplarMatch: false,
    sourceDirectStatementObserved: false,
    dayMaster: '갑',
    monthBranch: '진',
    hiddenStemMembership: ['무', '을', '계'],
    governedSignals: [],
    governedSignalCount: 0,
    branchMeetingStructuralStatus: 'PARTIAL_NOT_GOVERNED_AS_FULL_MEETING',
    sourceSemanticUseStatus: 'NO_DIRECT_SOURCE_USE_ASSERTED',
    sourceSemanticUseLabels: null,
    sourceSemanticUseCount: null,
    sourceRefs: ['CHEN_SHEN_ZI_MEETING'],
    unresolvedBridge:
      'The governed branch-meeting bridge requires the exact full-three structural relation; a partial participant set is not promoted.',
    invalidInference: 'PARTIAL_MEETING_EQUALS_FULL_SOURCE_ALIGNED_MEETING',
    authorityConsequence:
      'No branch-meeting signal, source-use label, or candidate is inferred.',
  }),
  row({
    caseId: 'R132-C16-CHEN-FULL-STRUCTURAL-MEETING',
    comparisonGroupId: 'R132-G08-PARTIAL-VS-FULL-BRANCH-MEETING',
    variantClass: 'PARTIAL_VS_FULL_BRANCH_MEETING',
    provenance: 'GOVERNED_SOURCE_ALIGNED_OBSERVATION',
    synthetic: false,
    negativeControl: false,
    exactSourceExemplarMatch: false,
    sourceDirectStatementObserved: true,
    dayMaster: '갑',
    monthBranch: '진',
    hiddenStemMembership: ['무', '을', '계'],
    governedSignals: ['branch_meeting:CHEN_SHEN_ZI_MEETING'],
    governedSignalCount: 1,
    branchMeetingStructuralStatus: 'SOURCE_ALIGNED_FULL_THREE_STRUCTURAL_MATCH',
    sourceSemanticUseStatus: 'SOURCE_ALIGNED_MEETING_OBSERVED_USE_UNRESOLVED',
    sourceSemanticUseLabels: null,
    sourceSemanticUseCount: null,
    sourceRefs: ['CHEN_SHEN_ZI_MEETING'],
    unresolvedBridge:
      'Full-three structural match authorizes source-aligned meeting evidence but not post-interaction effectiveness or candidate identity.',
    invalidInference: 'FULL_STRUCTURAL_MEETING_EQUALS_EFFECTIVE_TRANSFORMATION',
    authorityConsequence:
      'Meeting evidence is observed with transformation and candidate authority still false.',
  }),
  row({
    caseId: 'R132-C17-CHOU-FULL-STRUCTURAL-MEETING',
    comparisonGroupId: 'R132-G09-STRUCTURAL-MEETING-EFFECTIVENESS-UNRESOLVED',
    variantClass: 'STRUCTURAL_MEETING_EFFECTIVENESS_UNRESOLVED',
    provenance: 'GOVERNED_SOURCE_ALIGNED_OBSERVATION',
    synthetic: false,
    negativeControl: false,
    exactSourceExemplarMatch: false,
    sourceDirectStatementObserved: true,
    dayMaster: null,
    monthBranch: '축',
    hiddenStemMembership: ['기', '계', '신'],
    governedSignals: ['branch_meeting:CHOU_SI_YOU_MEETING'],
    governedSignalCount: 1,
    branchMeetingStructuralStatus: 'SOURCE_ALIGNED_FULL_THREE_STRUCTURAL_MATCH',
    sourceSemanticUseStatus: 'SOURCE_ALIGNED_MEETING_OBSERVED_USE_UNRESOLVED',
    sourceSemanticUseLabels: null,
    sourceSemanticUseCount: null,
    sourceRefs: ['CHOU_SI_YOU_MEETING'],
    unresolvedBridge:
      'Source-aligned 金局 wording does not authorize canonical transformationEstablished=true.',
    invalidInference: 'SOURCE_MEETING_WORDING_EQUALS_CANONICAL_TRANSFORMATION',
    authorityConsequence:
      'Structural meeting evidence remains distinct from effective transformation.',
  }),
  row({
    caseId: 'R132-C18-CHOU-MEETING-WITH-UNSETTLED-INTERACTION',
    comparisonGroupId: 'R132-G09-STRUCTURAL-MEETING-EFFECTIVENESS-UNRESOLVED',
    variantClass: 'STRUCTURAL_MEETING_EFFECTIVENESS_UNRESOLVED',
    provenance: 'SYNTHETIC_COUNTERFACTUAL',
    synthetic: true,
    negativeControl: false,
    exactSourceExemplarMatch: false,
    sourceDirectStatementObserved: false,
    dayMaster: null,
    monthBranch: '축',
    hiddenStemMembership: ['기', '계', '신'],
    governedSignals: ['branch_meeting:CHOU_SI_YOU_MEETING'],
    governedSignalCount: 1,
    branchMeetingStructuralStatus: 'SAME_STRUCTURAL_MATCH_POST_INTERACTION_EFFECT_UNRESOLVED',
    sourceSemanticUseStatus: 'NO_DIRECT_SOURCE_USE_ASSERTED',
    sourceSemanticUseLabels: null,
    sourceSemanticUseCount: null,
    sourceRefs: ['general-natal-geju-branch-meeting-selection-effect-admission-review'],
    unresolvedBridge:
      'Clash, damage, and competing-interaction settlement are unresolved, so the same structural match cannot be assumed effective post-interaction.',
    invalidInference: 'STRUCTURAL_MATCH_SURVIVES_ALL_COMPETING_INTERACTIONS',
    authorityConsequence:
      'Post-interaction selection effect and candidate identity remain unresolved.',
  }),
  row({
    caseId: 'R132-C19-SIGNAL-ORDER-A',
    comparisonGroupId: 'R132-G10-SIGNAL-ARRAY-ORDER-CONTROL',
    variantClass: 'SIGNAL_ARRAY_ORDER_CONTROL',
    provenance: 'SYNTHETIC_NEGATIVE_CONTROL',
    synthetic: true,
    negativeControl: true,
    exactSourceExemplarMatch: false,
    sourceDirectStatementObserved: false,
    dayMaster: '갑',
    monthBranch: '진',
    hiddenStemMembership: ['무', '을', '계'],
    governedSignals: ['transparency:계', 'branch_meeting:CHEN_SHEN_ZI_MEETING'],
    governedSignalCount: 2,
    branchMeetingStructuralStatus: 'SOURCE_ALIGNED_FULL_THREE_STRUCTURAL_MATCH',
    sourceSemanticUseStatus: 'NO_DIRECT_SOURCE_USE_ASSERTED',
    sourceSemanticUseLabels: null,
    sourceSemanticUseCount: null,
    sourceRefs: ['general-natal-geju-selection-signal-observation'],
    unresolvedBridge:
      'Signal serialization order is explicitly non-semantic.',
    invalidInference: 'FIRST_SIGNAL_EQUALS_PRIMARY_CANDIDATE',
    authorityConsequence:
      'Array order must not create rank, precedence, or winner semantics.',
  }),
  row({
    caseId: 'R132-C20-SIGNAL-ORDER-B',
    comparisonGroupId: 'R132-G10-SIGNAL-ARRAY-ORDER-CONTROL',
    variantClass: 'SIGNAL_ARRAY_ORDER_CONTROL',
    provenance: 'SYNTHETIC_NEGATIVE_CONTROL',
    synthetic: true,
    negativeControl: true,
    exactSourceExemplarMatch: false,
    sourceDirectStatementObserved: false,
    dayMaster: '갑',
    monthBranch: '진',
    hiddenStemMembership: ['무', '을', '계'],
    governedSignals: ['branch_meeting:CHEN_SHEN_ZI_MEETING', 'transparency:계'],
    governedSignalCount: 2,
    branchMeetingStructuralStatus: 'SOURCE_ALIGNED_FULL_THREE_STRUCTURAL_MATCH',
    sourceSemanticUseStatus: 'NO_DIRECT_SOURCE_USE_ASSERTED',
    sourceSemanticUseLabels: null,
    sourceSemanticUseCount: null,
    sourceRefs: ['general-natal-geju-selection-signal-observation'],
    unresolvedBridge:
      'Reversing serialization order changes no source semantic relation.',
    invalidInference: 'REORDERED_SIGNALS_CHANGE_CANDIDATE_PRECEDENCE',
    authorityConsequence:
      'The negative control remains rank- and candidate-neutral.',
  }),
  row({
    caseId: 'R132-C21-DIRECT-SAME-USE-CARDINALITY-REFERENCE',
    comparisonGroupId: 'R132-G11-SOURCE-USE-CARDINALITY-CONTRAST',
    variantClass: 'SOURCE_USE_CARDINALITY_CONTRAST',
    provenance: 'DIRECT_SOURCE_SEMANTIC_EXEMPLAR',
    synthetic: false,
    negativeControl: false,
    exactSourceExemplarMatch: true,
    sourceDirectStatementObserved: true,
    dayMaster: '갑',
    monthBranch: '진',
    hiddenStemMembership: ['무', '을', '계'],
    governedSignals: ['transparency:계', 'branch_meeting:CHEN_SHEN_ZI_MEETING'],
    governedSignalCount: 2,
    branchMeetingStructuralStatus: 'SOURCE_ALIGNED_FULL_THREE_STRUCTURAL_MATCH',
    sourceSemanticUseStatus: 'DIRECT_SOURCE_USE_IDENTITY_OBSERVED',
    sourceSemanticUseLabels: ['印'],
    sourceSemanticUseCount: 1,
    sourceRefs: ['JIA_CHEN_GUI_SHEN_ZI_ONE_YIN_USE'],
    unresolvedBridge:
      'Two signals to one source use is an exact source relation, not a candidate deduplication rule.',
    invalidInference: 'SOURCE_USE_COUNT_EQUALS_CANDIDATE_COUNT',
    authorityConsequence:
      'The source-use count is recorded while candidate count remains null.',
  }),
  row({
    caseId: 'R132-C22-DIRECT-DISTINCT-USE-CARDINALITY-REFERENCE',
    comparisonGroupId: 'R132-G11-SOURCE-USE-CARDINALITY-CONTRAST',
    variantClass: 'SOURCE_USE_CARDINALITY_CONTRAST',
    provenance: 'DIRECT_SOURCE_SEMANTIC_EXEMPLAR',
    synthetic: false,
    negativeControl: false,
    exactSourceExemplarMatch: true,
    sourceDirectStatementObserved: true,
    dayMaster: '임',
    monthBranch: '미',
    hiddenStemMembership: ['기', '정', '을'],
    governedSignals: ['transparency:기', 'branch_meeting:WEI_HAI_MAO_MEETING'],
    governedSignalCount: 2,
    branchMeetingStructuralStatus: 'SOURCE_ALIGNED_FULL_THREE_STRUCTURAL_MATCH',
    sourceSemanticUseStatus: 'DIRECT_SOURCE_USE_IDENTITY_OBSERVED',
    sourceSemanticUseLabels: ['官', '傷官'],
    sourceSemanticUseCount: 2,
    sourceRefs: ['REN_WEI_JI_HAI_MAO_GUAN_AND_SHANG_GUAN_USES'],
    unresolvedBridge:
      'The same signal cardinality can correspond to a different source-use cardinality; candidate cardinality remains undefined.',
    invalidInference: 'SIGNAL_CARDINALITY_DETERMINES_SOURCE_USE_OR_CANDIDATE_CARDINALITY',
    authorityConsequence:
      'The contrast disproves cardinality equivalence without creating a candidate-count rule.',
  }),
  row({
    caseId: 'R132-C23-JIA-XU-EXACT-EXEMPLAR-REFERENCE',
    comparisonGroupId: 'R132-G12-EXACT-EXEMPLAR-EXTRA-SIGNAL-BOUNDARY',
    variantClass: 'EXACT_EXEMPLAR_EXTRA_SIGNAL_BOUNDARY',
    provenance: 'DIRECT_SOURCE_SEMANTIC_EXEMPLAR',
    synthetic: false,
    negativeControl: false,
    exactSourceExemplarMatch: true,
    sourceDirectStatementObserved: true,
    dayMaster: '갑',
    monthBranch: '술',
    hiddenStemMembership: ['무', '신', '정'],
    governedSignals: [
      'transparency:신',
      'transparency:정',
      'branch_meeting:XU_YIN_WU_MEETING',
    ],
    governedSignalCount: 3,
    branchMeetingStructuralStatus: 'SOURCE_ALIGNED_FULL_THREE_STRUCTURAL_MATCH',
    sourceSemanticUseStatus: 'DIRECT_SOURCE_USE_IDENTITY_OBSERVED',
    sourceSemanticUseLabels: ['官', '傷官'],
    sourceSemanticUseCount: 2,
    sourceRefs: ['JIA_XU_XIN_DING_YIN_WU_THREE_SIGNALS_TWO_USES'],
    unresolvedBridge:
      'The exact matcher requires the governed signal set to match the direct exemplar exactly.',
    invalidInference: 'EXACT_EXEMPLAR_EQUALS_GENERALIZED_MATCHER',
    authorityConsequence:
      'Direct source-use identity is limited to the exact signal set.',
  }),
  row({
    caseId: 'R132-C24-JIA-XU-EXTRA-SIGNAL-BREAKS-EXACT-MATCH',
    comparisonGroupId: 'R132-G12-EXACT-EXEMPLAR-EXTRA-SIGNAL-BOUNDARY',
    variantClass: 'EXACT_EXEMPLAR_EXTRA_SIGNAL_BOUNDARY',
    provenance: 'SYNTHETIC_COUNTERFACTUAL',
    synthetic: true,
    negativeControl: false,
    exactSourceExemplarMatch: false,
    sourceDirectStatementObserved: false,
    dayMaster: '갑',
    monthBranch: '술',
    hiddenStemMembership: ['무', '신', '정'],
    governedSignals: [
      'transparency:신',
      'transparency:정',
      'branch_meeting:XU_YIN_WU_MEETING',
      'transparency:synthetic-extra',
    ],
    governedSignalCount: 4,
    branchMeetingStructuralStatus: 'SOURCE_ALIGNED_FULL_THREE_STRUCTURAL_MATCH',
    sourceSemanticUseStatus: 'NO_DIRECT_SOURCE_USE_ASSERTED',
    sourceSemanticUseLabels: null,
    sourceSemanticUseCount: null,
    sourceRefs: ['JIA_XU_XIN_DING_YIN_WU_THREE_SIGNALS_TWO_USES'],
    unresolvedBridge:
      'An extra governed signal invalidates exact exemplar matching; the source-use labels cannot be generalized to the expanded signal set.',
    invalidInference: 'SUPERSET_OF_EXACT_SIGNALS_INHERITS_EXACT_SOURCE_LABELS',
    authorityConsequence:
      'No invented source-use set, candidate count, rank, precedence, or establishment outcome is emitted.',
  }),
]);

export const R132_COMPARISON_GROUPS = Object.freeze(
  Array.from(new Set(R132_VARIANT_CORPUS.map((item) => item.comparisonGroupId))).sort(),
);

export const R132_VARIANT_CLASSES = Object.freeze(
  Array.from(new Set(R132_VARIANT_CORPUS.map((item) => item.variantClass))).sort(),
);

export const R132_SUMMARY = Object.freeze({
  caseCount: R132_VARIANT_CORPUS.length,
  comparisonGroupCount: R132_COMPARISON_GROUPS.length,
  variantClassCount: R132_VARIANT_CLASSES.length,
  directSourceSemanticExemplarRowCount: R132_VARIANT_CORPUS.filter(
    (item) => item.provenance === 'DIRECT_SOURCE_SEMANTIC_EXEMPLAR',
  ).length,
  exactYinRowCount: R132_VARIANT_CORPUS.filter(
    (item) => item.provenance === 'DIRECT_EXACT_SOURCE_ROLE',
  ).length,
  branchMeetingSensitiveRowCount: R132_VARIANT_CORPUS.filter(
    (item) => item.branchMeetingStructuralStatus !== 'NOT_PRESENT',
  ).length,
  pluralitySensitiveRowCount: R132_VARIANT_CORPUS.filter(
    (item) =>
      item.governedSignalCount > 1 ||
      (item.sourceSemanticUseCount !== null && item.sourceSemanticUseCount > 1),
  ).length,
  syntheticRowCount: R132_VARIANT_CORPUS.filter((item) => item.synthetic).length,
  negativeControlRowCount: R132_VARIANT_CORPUS.filter((item) => item.negativeControl)
    .length,
  exactSourceExemplarMatchRowCount: R132_VARIANT_CORPUS.filter(
    (item) => item.exactSourceExemplarMatch,
  ).length,
  candidateCountAuthorizedRowCount: R132_VARIANT_CORPUS.filter(
    (item) => item.candidateCount !== null,
  ).length,
  candidateRankAuthorizedRowCount: R132_VARIANT_CORPUS.filter(
    (item) => item.candidateRank !== null,
  ).length,
  candidatePrecedenceAuthorizedRowCount: R132_VARIANT_CORPUS.filter(
    (item) => item.candidatePrecedence !== null,
  ).length,
});

export const R132_CORPUS_INVARIANTS = Object.freeze({
  directExemplarIdsBound: DIRECT_EXEMPLAR_IDS,
  zeroGovernedSignalsMeansNoCandidateAuthorized: false,
  signalCountEqualsCandidateCountAuthorized: false,
  sourceUseCountEqualsCandidateCountAuthorized: false,
  hiddenStemStorageOrderRankingAuthorized: false,
  signalArrayOrderRankingAuthorized: false,
  transparencyAutomaticWinnerAuthorized: false,
  structuralBranchMeetingMeansEffectiveTransformationAuthorized: false,
  exactSourceExemplarGeneralizationAuthorized: false,
  syntheticCounterfactualSourceLabelAuthorized: false,
  corpusExhaustiveAuthorized: false,
});

export const R132_AUTHORITY = Object.freeze({
  status: 'RESEARCH_MIXED_MONTH_QI_CANDIDATE_SELECTION_VARIANT_CORPUS_COMPLETE' as const,
  researchOnly: true,
  variantCorpusCompleteForGovernedScope: true,
  directSourceRowsPreserved: true,
  syntheticCounterfactualsSeparated: true,
  negativeControlsPreserved: true,
  signalCardinalityVariationObserved: true,
  sourceUseCardinalityVariationObserved: true,
  exactYinRoleVariationObserved: true,
  branchMeetingStructuralVariationObserved: true,
  candidateIdentityAuthorized: false,
  candidateDerivationAuthorized: false,
  multipleCandidateRepresentationAuthorized: false,
  candidateRankingAuthorized: false,
  candidatePrecedenceAuthorized: false,
  generalizedMixedQiSelectorAuthorized: false,
  generalizedQingPredicateAuthorized: false,
  generalizedTransparencySelectorAuthorized: false,
  generalizedBranchMeetingSelectionEffectAuthorized: false,
  canonicalTransformationAuthorized: false,
  establishmentPredicateAuthorized: false,
  canonicalTerminalStateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  automaticAuthorityAdmissionAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
