import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationReadinessReviewReport } from './i142-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-candidate-set-evidence-rebinding-adjudication-input-materialization-readiness-review.js';

export const I143_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_ADJUDICATION_INPUT_MATERIALIZATION_RECORD_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-candidate-set-evidence-rebinding-adjudication-input-materialization-record-v1';

export const I143_I118_REQUIREMENT_IDS = [
  'EXPLICIT_BINARY_EFFECTIVE_INTERACTION_SEMANTICS',
  'VISIBLE_STEM_POSITION_SCOPE_AND_POSITION_CLASS_APPLICABILITY',
  'QUALITATIVE_FORCE_VS_BINARY_ELIGIBILITY_SEPARATION',
  'WU_LI_BOUNDARY_SEMANTICS_AND_EXCEPTIONS',
  'CONTEXT_AND_EXCEPTION_CONDITIONS',
  'INDEPENDENT_NORMATIVE_PROVENANCE',
] as const;

export type I143I118RequirementId = (typeof I143_I118_REQUIREMENT_IDS)[number];

export interface I143CandidateManifestRecord {
  candidateSetId: string;
  candidateSetVersion: 'v1-candidate-set';
  adoptionId: string;
  candidateIds: readonly string[];
  candidateCount: 6;
  frozen: true;
}

export interface I143WitnessIdentityBinding {
  witnessId: string;
  sourceId: string;
  stableLocator: string;
  normalizedCandidateId: string;
  identityResolutionBasis: string;
  reproducible: true;
}

export interface I143EvidenceRebindingRecord {
  evidenceId: string;
  candidateId: string;
  sourceId: string;
  witnessId: string;
  locator: string;
  observation: string;
  i118RequirementIds: readonly I143I118RequirementId[];
  bindingState: 'REGISTERED_INPUT_NOT_ADJUDICATED';
}

export interface I143RequirementOwnershipBinding {
  i118RequirementId: I143I118RequirementId;
  owningEvidenceIds: readonly string[];
  ownershipBasis: string;
  satisfactionFindingMade: false;
}

export interface I143ScopeCompatibilityInput {
  evidenceId: string;
  targetScope: 'VISIBLE_HEAVENLY_STEM_KE_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY';
  positionClass: 'VISIBLE_STEM_POSITION_CLASS' | 'GENERAL_VISIBLE_STEM_FORCE_CONTEXT';
  compatibilityState: 'UNRESOLVED';
  basis: string;
}

export interface I143ProvenanceIndependenceInput {
  evidenceId: string;
  provenanceIdentity: string;
  independenceState: 'UNRESOLVED';
  dependencyLinks: readonly string[];
  basis: string;
  numericWeight: null;
}

export interface I143SemanticBridgeInput {
  bridgeId: string;
  fromTerm: string;
  toTerm: string;
  scope: 'VISIBLE_HEAVENLY_STEM_KE_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY';
  bridgeState: 'UNRESOLVED';
  authorityEvidenceIds: readonly string[];
  lexicalSimilarityIsNotAuthority: true;
}

export interface I143ContradictionInput {
  contradictionId: string;
  evidenceIds: readonly string[];
  conflictDescription: string;
  resolutionState: 'UNRESOLVED';
  precedenceBasis: null;
  numericVoteOrWeightUsed: false;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport {
  recordId: string;
  recordVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_ADJUDICATION_INPUT_MATERIALIZATION_RECORD'
    | 'I142_MATERIALIZATION_READINESS_UNRESOLVED_OR_INVALID';
  decision:
    | 'EIGHT_INPUT_ARTIFACT_CLASSES_MATERIALIZED_AND_PACKAGE_REGISTERED_WITH_UNRESOLVED_ADJUDICATION_STATES_NO_EVALUATION'
    | 'INPUT_ARTIFACT_MATERIALIZATION_NOT_PERFORMED';
  upstreamI142ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  adoptionId: string | null;
  selectionContractVersion: 'v1-selection';
  candidateSetVersion: 'v1-candidate-set';
  candidateSetId: string | null;
  inputPackageVersion: 'v1-input-package';
  inputPackageId: string | null;
  inputPackageState: 'REGISTERED_NOT_EVALUATED' | 'NOT_REGISTERED';
  exactI142ReadinessAccepted: boolean;
  candidateManifest: I143CandidateManifestRecord | null;
  witnessIdentityBindings: readonly I143WitnessIdentityBinding[];
  witnessIdentityBindingCount: number;
  evidenceRebindingRecords: readonly I143EvidenceRebindingRecord[];
  evidenceRebindingRecordCount: number;
  requirementOwnershipBindings: readonly I143RequirementOwnershipBinding[];
  requirementOwnershipBindingCount: 6;
  scopeCompatibilityInputs: readonly I143ScopeCompatibilityInput[];
  provenanceIndependenceInputs: readonly I143ProvenanceIndependenceInput[];
  semanticBridgeInputs: readonly I143SemanticBridgeInput[];
  contradictionInputs: readonly I143ContradictionInput[];
  allEightArtifactClassesMaterialized: boolean;
  allSixI118RequirementsHaveExplicitOwnershipBindings: boolean;
  everyEvidenceRecordBindsFrozenCandidateSourceWitnessLocator: boolean;
  allWitnessBindingsStableAndReproducible: boolean;
  semanticBridgeUnresolvedCount: number;
  contradictionUnresolvedCount: number;
  scopeCompatibilityUnresolvedCount: number;
  provenanceIndependenceUnresolvedCount: number;
  unresolvedStatesPreservedWithoutInference: boolean;
  priorI126CoverageGrandfathered: false;
  priorI128DiscoveryGrandfathered: false;
  priorEvidenceEnteredOnlyThroughExplicitRebinding: boolean;
  implicitRequirementBorrowingPerformed: false;
  exampleToGeneralRulePromotionPerformed: false;
  numericWeightingOrMajorityVotePerformed: false;
  inputPackageRegisteredByThisGate: boolean;
  evidenceRebindingPerformedByThisGate: boolean;
  requirementOwnershipBindingsMaterializedByThisGate: boolean;
  witnessIdentityBindingsMaterializedByThisGate: boolean;
  scopeCompatibilityInputsMaterializedByThisGate: boolean;
  provenanceIndependenceInputsMaterializedByThisGate: boolean;
  semanticBridgeInputsMaterializedByThisGate: boolean;
  contradictionInputsMaterializedByThisGate: boolean;
  requirementCoverageAdjudicatedByThisGate: false;
  scopeCompatibilityAdjudicatedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  semanticBridgeAdjudicatedByThisGate: false;
  contradictionAdjudicatedByThisGate: false;
  policyExecutableByThisGate: false;
  candidateSetEvaluationAuthorizedByThisGate: false;
  candidateSetEvaluationPerformedByThisGate: false;
  candidateSetAdmissibilityEstablishedByThisGate: false;
  actualCompositionPerformedByThisGate: false;
  crossCandidateCompositionAuthorized: false;
  multiSourceCompositionAuthorized: false;
  authorityAcquiredByThisGate: false;
  visibleStemBinaryEffectiveInteractionEligibilityResolved: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  hiddenStemInteractionEligibilityGapRemains: true;
  hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED';
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_AND_ADJUDICATION_INPUT_MATERIALIZATION_READINESS_REVIEW';
  notes: readonly string[];
}

const SELECTED_CANDIDATE_IDS = [
  'candidate_chen_yuan_sizhu_yuce_rumen',
  'candidate_wei_qianli_qianli_minggao',
  'candidate_zhu_zuxia_bazi_yu_yongshen',
  'candidate_yimeng_tiangan_ke_theory',
  'candidate_wu_huaiyun_yinyang_wuxing_bazi_yucexue_chuji',
  'candidate_mingdeng_tiangan_youli_wuli_criteria',
] as const;

const WITNESS_BINDINGS: readonly I143WitnessIdentityBinding[] = [
  {
    witnessId: 'witness_chen_yuan_quanxue_sizhu17',
    sourceId: 'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515',
    stableLocator: 'https://www.quanxue.cn/qt_mingxiang/sizhu/sizhu17.html',
    normalizedCandidateId: 'candidate_chen_yuan_sizhu_yuce_rumen',
    identityResolutionBasis: 'I120/I122 same work and same source identity resolved to one candidate.',
    reproducible: true,
  },
  {
    witnessId: 'witness_wei_qianli_webpdf_reproduction',
    sourceId: 'source_wei_qianli_qianli_minggao_mingxue_jiangyi_webpdf_20260822',
    stableLocator: 'https://www.lshack.cn/wp-content/uploads/2018/12/lshack.cn_2018-12-14_12-03-22.pdf',
    normalizedCandidateId: 'candidate_wei_qianli_qianli_minggao',
    identityResolutionBasis: 'Alternate web-PDF witness attached to normalized 千里命稿 candidate.',
    reproducible: true,
  },
  {
    witnessId: 'witness_wei_qianli_nlc_1935_scan',
    sourceId: 'source_wei_qianli_qianli_minggao_nlc_1935_scan',
    stableLocator: 'https://commons.wikimedia.org/wiki/File:NLC416-01jh000372-10197_%E5%8D%83%E9%87%8C%E5%91%BD%E7%A8%BF.pdf',
    normalizedCandidateId: 'candidate_wei_qianli_qianli_minggao',
    identityResolutionBasis: 'NLC 1935 scan witness for normalized 千里命稿 candidate.',
    reproducible: true,
  },
  {
    witnessId: 'witness_wei_qianli_ctext_ganke_zhubie',
    sourceId: 'source_wei_qianli_qianli_minggao_ganke_zhubie_ctext',
    stableLocator: 'https://ctext.org/wiki.pl?chapter=497083&if=gb&remap=gb',
    normalizedCandidateId: 'candidate_wei_qianli_qianli_minggao',
    identityResolutionBasis: 'CText transcription witness attached to the same normalized 千里命稿 work, not a new provenance vote.',
    reproducible: true,
  },
  {
    witnessId: 'witness_zhu_zuxia_suanzhun_remote_ke',
    sourceId: 'source_zhu_zuxia_bazi_yu_yongshen_wuxing_xiangke_web_reproduction',
    stableLocator: 'https://www.suanzhun.net/book/1282.html',
    normalizedCandidateId: 'candidate_zhu_zuxia_bazi_yu_yongshen',
    identityResolutionBasis: 'I122 registered web reproduction of 八字与用神 relevant passage.',
    reproducible: true,
  },
  {
    witnessId: 'witness_yimeng_sina_kandian_tiangan_ke',
    sourceId: 'source_yimeng_tiangan_ke_theory_2026_sina_kandian',
    stableLocator: 'https://kandian.sina.cn/article_7879848901_1d5acf3c501901nobm.html',
    normalizedCandidateId: 'candidate_yimeng_tiangan_ke_theory',
    identityResolutionBasis: 'I122 registered practitioner article witness.',
    reproducible: true,
  },
  {
    witnessId: 'witness_wu_huaiyun_scribd_733612933',
    sourceId: 'source_wu_huaiyun_yinyang_wuxing_bazi_yucexue_chuji_scribd_733612933',
    stableLocator: 'https://www.scribd.com/document/733612933/',
    normalizedCandidateId: 'candidate_wu_huaiyun_yinyang_wuxing_bazi_yucexue_chuji',
    identityResolutionBasis: 'I125/I128 exact same-work witness.',
    reproducible: true,
  },
  {
    witnessId: 'witness_mingdeng_tiangan_youli_wuli',
    sourceId: 'source_mingdeng_tiangan_youli_wuli_criteria_2022',
    stableLocator: 'https://www.mingdengguoxue.com/?id=1095',
    normalizedCandidateId: 'candidate_mingdeng_tiangan_youli_wuli_criteria',
    identityResolutionBasis: 'I128 registered generic visible-stem force-criteria witness.',
    reproducible: true,
  },
] as const;

const EVIDENCE_RECORDS: readonly I143EvidenceRebindingRecord[] = [
  {
    evidenceId: 'evidence_chen_yuan_position_distance_wuli',
    candidateId: 'candidate_chen_yuan_sizhu_yuce_rumen',
    sourceId: 'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515',
    witnessId: 'witness_chen_yuan_quanxue_sizhu17',
    locator: 'visible-stem 克 position passage: 邻干力大 / 隔干次之 / 远干无力',
    observation: 'The source gives a visible-stem positional force ordering ending in 远干无力.',
    i118RequirementIds: [
      'VISIBLE_STEM_POSITION_SCOPE_AND_POSITION_CLASS_APPLICABILITY',
      'QUALITATIVE_FORCE_VS_BINARY_ELIGIBILITY_SEPARATION',
      'WU_LI_BOUNDARY_SEMANTICS_AND_EXCEPTIONS',
    ],
    bindingState: 'REGISTERED_INPUT_NOT_ADJUDICATED',
  },
  {
    evidenceId: 'evidence_wei_qianli_far_position_cannot_ke',
    candidateId: 'candidate_wei_qianli_qianli_minggao',
    sourceId: 'source_wei_qianli_qianli_minggao_nlc_1935_scan',
    witnessId: 'witness_wei_qianli_nlc_1935_scan',
    locator: '干克 chapter position rule and far-separated examples',
    observation: 'The work states that greater distance weakens 克 and includes far-separated cases described as 不能相克.',
    i118RequirementIds: [
      'EXPLICIT_BINARY_EFFECTIVE_INTERACTION_SEMANTICS',
      'VISIBLE_STEM_POSITION_SCOPE_AND_POSITION_CLASS_APPLICABILITY',
      'QUALITATIVE_FORCE_VS_BINARY_ELIGIBILITY_SEPARATION',
      'CONTEXT_AND_EXCEPTION_CONDITIONS',
    ],
    bindingState: 'REGISTERED_INPUT_NOT_ADJUDICATED',
  },
  {
    evidenceId: 'evidence_zhu_zuxia_remote_ke_conditions',
    candidateId: 'candidate_zhu_zuxia_bazi_yu_yongshen',
    sourceId: 'source_zhu_zuxia_bazi_yu_yongshen_wuxing_xiangke_web_reproduction',
    witnessId: 'witness_zhu_zuxia_suanzhun_remote_ke',
    locator: '五行相克的形式及其应用 remote-position section',
    observation: 'The source describes remote visible-stem 克 as context-dependent rather than a distance-only absolute.',
    i118RequirementIds: [
      'EXPLICIT_BINARY_EFFECTIVE_INTERACTION_SEMANTICS',
      'VISIBLE_STEM_POSITION_SCOPE_AND_POSITION_CLASS_APPLICABILITY',
      'CONTEXT_AND_EXCEPTION_CONDITIONS',
    ],
    bindingState: 'REGISTERED_INPUT_NOT_ADJUDICATED',
  },
  {
    evidenceId: 'evidence_yimeng_wuli_yaoke_example',
    candidateId: 'candidate_yimeng_tiangan_ke_theory',
    sourceId: 'source_yimeng_tiangan_ke_theory_2026_sina_kandian',
    witnessId: 'witness_yimeng_sina_kandian_tiangan_ke',
    locator: 'example phrase: 地位间隔，无力遥克',
    observation: 'The practitioner article uses 无力遥克 for a separated visible-stem relation.',
    i118RequirementIds: [
      'VISIBLE_STEM_POSITION_SCOPE_AND_POSITION_CLASS_APPLICABILITY',
      'WU_LI_BOUNDARY_SEMANTICS_AND_EXCEPTIONS',
      'CONTEXT_AND_EXCEPTION_CONDITIONS',
    ],
    bindingState: 'REGISTERED_INPUT_NOT_ADJUDICATED',
  },
  {
    evidenceId: 'evidence_wu_huaiyun_taxonomy_remote_and_operational_examples',
    candidateId: 'candidate_wu_huaiyun_yinyang_wuxing_bazi_yucexue_chuji',
    sourceId: 'source_wu_huaiyun_yinyang_wuxing_bazi_yucexue_chuji_scribd_733612933',
    witnessId: 'witness_wu_huaiyun_scribd_733612933',
    locator: 'taxonomy and 天干相克 sections plus remote operative examples',
    observation: 'The work distinguishes 远近遥临/有力无力, gives distance-sensitive 克力, contextual nullification language, and both 无力遥克 and operative 遥克/遥夺 examples.',
    i118RequirementIds: I143_I118_REQUIREMENT_IDS,
    bindingState: 'REGISTERED_INPUT_NOT_ADJUDICATED',
  },
  {
    evidenceId: 'evidence_mingdeng_generic_youli_wuli_criteria',
    candidateId: 'candidate_mingdeng_tiangan_youli_wuli_criteria',
    sourceId: 'source_mingdeng_tiangan_youli_wuli_criteria_2022',
    witnessId: 'witness_mingdeng_tiangan_youli_wuli',
    locator: '天干有力/无力 criteria article',
    observation: 'The article gives generic criteria for visible-stem 有力/无力 using root state and 克泄耗/生扶 context.',
    i118RequirementIds: [
      'QUALITATIVE_FORCE_VS_BINARY_ELIGIBILITY_SEPARATION',
      'WU_LI_BOUNDARY_SEMANTICS_AND_EXCEPTIONS',
      'CONTEXT_AND_EXCEPTION_CONDITIONS',
    ],
    bindingState: 'REGISTERED_INPUT_NOT_ADJUDICATED',
  },
] as const;

const OWNERSHIP_BINDINGS: readonly I143RequirementOwnershipBinding[] = I143_I118_REQUIREMENT_IDS.map((requirementId) => ({
  i118RequirementId: requirementId,
  owningEvidenceIds: EVIDENCE_RECORDS.filter((record) => record.i118RequirementIds.includes(requirementId)).map(
    (record) => record.evidenceId,
  ),
  ownershipBasis:
    requirementId === 'INDEPENDENT_NORMATIVE_PROVENANCE'
      ? 'Evidence set is explicitly designated for later provenance-independence adjudication; this is not an independence finding.'
      : 'Explicit evidence-to-I118 claim binding for later adjudication; this is not a requirement-satisfaction finding.',
  satisfactionFindingMade: false,
}));

const SCOPE_INPUTS: readonly I143ScopeCompatibilityInput[] = EVIDENCE_RECORDS.map((record) => ({
  evidenceId: record.evidenceId,
  targetScope: 'VISIBLE_HEAVENLY_STEM_KE_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY',
  positionClass:
    record.evidenceId === 'evidence_mingdeng_generic_youli_wuli_criteria'
      ? 'GENERAL_VISIBLE_STEM_FORCE_CONTEXT'
      : 'VISIBLE_STEM_POSITION_CLASS',
  compatibilityState: 'UNRESOLVED',
  basis: 'Input materialized for later governed scope adjudication; I143 makes no compatibility finding.',
}));

const PROVENANCE_INPUTS: readonly I143ProvenanceIndependenceInput[] = EVIDENCE_RECORDS.map((record) => ({
  evidenceId: record.evidenceId,
  provenanceIdentity: record.sourceId,
  independenceState: 'UNRESOLVED',
  dependencyLinks:
    record.candidateId === 'candidate_wei_qianli_qianli_minggao'
      ? ['witness_wei_qianli_webpdf_reproduction', 'witness_wei_qianli_ctext_ganke_zhubie']
      : [],
  basis: 'Input materialized without source-count weighting; independence requires later governed adjudication.',
  numericWeight: null,
}));

const SEMANTIC_BRIDGE_INPUTS: readonly I143SemanticBridgeInput[] = [
  {
    bridgeId: 'bridge_wuli_to_buneng_xiangke',
    fromTerm: '无力',
    toTerm: '不能相克',
    scope: 'VISIBLE_HEAVENLY_STEM_KE_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY',
    bridgeState: 'UNRESOLVED',
    authorityEvidenceIds: [
      'evidence_chen_yuan_position_distance_wuli',
      'evidence_wei_qianli_far_position_cannot_ke',
      'evidence_wu_huaiyun_taxonomy_remote_and_operational_examples',
    ],
    lexicalSimilarityIsNotAuthority: true,
  },
  {
    bridgeId: 'bridge_wuli_to_no_effective_interaction',
    fromTerm: '无力',
    toTerm: 'NO_EFFECTIVE_INTERACTION',
    scope: 'VISIBLE_HEAVENLY_STEM_KE_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY',
    bridgeState: 'UNRESOLVED',
    authorityEvidenceIds: [
      'evidence_yimeng_wuli_yaoke_example',
      'evidence_wu_huaiyun_taxonomy_remote_and_operational_examples',
      'evidence_mingdeng_generic_youli_wuli_criteria',
    ],
    lexicalSimilarityIsNotAuthority: true,
  },
  {
    bridgeId: 'bridge_reduced_ke_force_to_boolean_eligibility',
    fromTerm: '克力较小/克力较轻',
    toTerm: 'BOOLEAN_EFFECTIVE_INTERACTION_ELIGIBILITY',
    scope: 'VISIBLE_HEAVENLY_STEM_KE_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY',
    bridgeState: 'UNRESOLVED',
    authorityEvidenceIds: [
      'evidence_wei_qianli_far_position_cannot_ke',
      'evidence_wu_huaiyun_taxonomy_remote_and_operational_examples',
    ],
    lexicalSimilarityIsNotAuthority: true,
  },
] as const;

const CONTRADICTION_INPUTS: readonly I143ContradictionInput[] = [
  {
    contradictionId: 'contradiction_far_separation_cannot_ke_vs_operational_remote_ke',
    evidenceIds: [
      'evidence_wei_qianli_far_position_cannot_ke',
      'evidence_wu_huaiyun_taxonomy_remote_and_operational_examples',
    ],
    conflictDescription: 'One work includes far-separated 不能相克 language while another same-target work contains operative 遥克/遥夺 examples; scope and exception compatibility are unresolved.',
    resolutionState: 'UNRESOLVED',
    precedenceBasis: null,
    numericVoteOrWeightUsed: false,
  },
  {
    contradictionId: 'contradiction_distance_wuli_vs_context_dependent_remote_ke',
    evidenceIds: [
      'evidence_chen_yuan_position_distance_wuli',
      'evidence_zhu_zuxia_remote_ke_conditions',
      'evidence_yimeng_wuli_yaoke_example',
    ],
    conflictDescription: 'Distance-based 无力 language coexists with context-dependent and still-labeled 遥克 usage; whether these are contradictory or scope-compatible is unresolved.',
    resolutionState: 'UNRESOLVED',
    precedenceBasis: null,
    numericVoteOrWeightUsed: false,
  },
] as const;

function exactI142Accepted(
  i142: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationReadinessReviewReport,
): boolean {
  return (
    i142.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_ADJUDICATION_INPUT_MATERIALIZATION_READINESS_REVIEW' &&
    i142.decision ===
      'FROZEN_CANDIDATE_SET_READY_FOR_I138_GOVERNED_EVIDENCE_REBINDING_AND_ADJUDICATION_INPUT_MATERIALIZATION_NO_EVALUATION_AUTHORIZATION' &&
    i142.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i142.policyVersion === 'v1-definition' &&
    i142.adoptionVersion === 'v1-adoption' &&
    i142.adoptionId !== null &&
    i142.selectionContractVersion === 'v1-selection' &&
    i142.candidateSetVersion === 'v1-candidate-set' &&
    i142.candidateSetId !== null &&
    i142.exactI141FreezeRecordAccepted &&
    i142.i138InputRegistrationContractLineagePreservedThroughI139I140I141 &&
    i142.requiredInputArtifactClassCount === 8 &&
    i142.allEightArtifactClassesRequired &&
    i142.frozenCandidateManifestAvailable &&
    i142.frozenWitnessIdentityBindingsAvailable &&
    i142.selectedCandidateCount === 6 &&
    i142.selectedCandidateSetIdentityStable &&
    i142.candidateSetFrozenBeforeAdjudication &&
    i142.evidenceRebindingCanBindOnlyFrozenSelectedCandidates &&
    i142.evidenceRebindingMustBindExactCandidateWitnessAndLocator &&
    i142.requirementOwnershipMustBeExplicitPerI118Requirement &&
    i142.implicitRequirementBorrowingForbidden &&
    i142.unresolvedInputsPermittedAtMaterialization &&
    i142.unresolvedInputsMustFailClosedAtLaterEvaluation &&
    i142.materializationReadinessEstablished &&
    i142.evidenceRebindingAndAdjudicationInputMaterializationMayProceed &&
    i142.materializationAuthorizationLimitedToInputRecordsOnly &&
    i142.inputPackageRegisteredByThisGate === false &&
    i142.evidenceRebindingPerformedByThisGate === false &&
    i142.requirementCoverageAdjudicatedByThisGate === false &&
    i142.candidateSetEvaluationAuthorizedByThisGate === false &&
    i142.candidateSetEvaluationPerformedByThisGate === false &&
    i142.actualCompositionPerformedByThisGate === false &&
    i142.authorityAcquiredByThisGate === false &&
    i142.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i142.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_AND_ADJUDICATION_INPUT_MATERIALIZATION_RECORD'
  );
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport, 'recordId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport {
  return {
    recordId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_input_materialization_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI143ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecord(
  i142: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationReadinessReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetEvidenceRebindingAdjudicationInputMaterializationRecordReport {
  const accepted = exactI142Accepted(i142);
  const common = {
    recordVersion:
      I143_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_ADJUDICATION_INPUT_MATERIALIZATION_RECORD_VERSION,
    upstreamI142ReviewId: i142.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy' as const,
    policyVersion: 'v1-definition' as const,
    adoptionVersion: 'v1-adoption' as const,
    selectionContractVersion: 'v1-selection' as const,
    candidateSetVersion: 'v1-candidate-set' as const,
    inputPackageVersion: 'v1-input-package' as const,
    witnessIdentityBindings: WITNESS_BINDINGS,
    witnessIdentityBindingCount: WITNESS_BINDINGS.length,
    evidenceRebindingRecords: EVIDENCE_RECORDS,
    evidenceRebindingRecordCount: EVIDENCE_RECORDS.length,
    requirementOwnershipBindings: OWNERSHIP_BINDINGS,
    requirementOwnershipBindingCount: 6 as const,
    scopeCompatibilityInputs: SCOPE_INPUTS,
    provenanceIndependenceInputs: PROVENANCE_INPUTS,
    semanticBridgeInputs: SEMANTIC_BRIDGE_INPUTS,
    contradictionInputs: CONTRADICTION_INPUTS,
    semanticBridgeUnresolvedCount: SEMANTIC_BRIDGE_INPUTS.length,
    contradictionUnresolvedCount: CONTRADICTION_INPUTS.length,
    scopeCompatibilityUnresolvedCount: SCOPE_INPUTS.length,
    provenanceIndependenceUnresolvedCount: PROVENANCE_INPUTS.length,
    priorI126CoverageGrandfathered: false as const,
    priorI128DiscoveryGrandfathered: false as const,
    implicitRequirementBorrowingPerformed: false as const,
    exampleToGeneralRulePromotionPerformed: false as const,
    numericWeightingOrMajorityVotePerformed: false as const,
    requirementCoverageAdjudicatedByThisGate: false as const,
    scopeCompatibilityAdjudicatedByThisGate: false as const,
    provenanceIndependenceAdjudicatedByThisGate: false as const,
    semanticBridgeAdjudicatedByThisGate: false as const,
    contradictionAdjudicatedByThisGate: false as const,
    policyExecutableByThisGate: false as const,
    candidateSetEvaluationAuthorizedByThisGate: false as const,
    candidateSetEvaluationPerformedByThisGate: false as const,
    candidateSetAdmissibilityEstablishedByThisGate: false as const,
    actualCompositionPerformedByThisGate: false as const,
    crossCandidateCompositionAuthorized: false as const,
    multiSourceCompositionAuthorized: false as const,
    authorityAcquiredByThisGate: false as const,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false as const,
    thresholdRuleCreatedByThisGate: false as const,
    damageEvaluationAuthorized: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    hiddenStemInteractionEligibilityGapRemains: true as const,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' as const,
  };

  if (!accepted) {
    return finalized({
      ...common,
      status: 'I142_MATERIALIZATION_READINESS_UNRESOLVED_OR_INVALID',
      decision: 'INPUT_ARTIFACT_MATERIALIZATION_NOT_PERFORMED',
      adoptionId: null,
      candidateSetId: null,
      inputPackageId: null,
      inputPackageState: 'NOT_REGISTERED',
      exactI142ReadinessAccepted: false,
      candidateManifest: null,
      allEightArtifactClassesMaterialized: false,
      allSixI118RequirementsHaveExplicitOwnershipBindings: false,
      everyEvidenceRecordBindsFrozenCandidateSourceWitnessLocator: false,
      allWitnessBindingsStableAndReproducible: false,
      unresolvedStatesPreservedWithoutInference: false,
      priorEvidenceEnteredOnlyThroughExplicitRebinding: false,
      inputPackageRegisteredByThisGate: false,
      evidenceRebindingPerformedByThisGate: false,
      requirementOwnershipBindingsMaterializedByThisGate: false,
      witnessIdentityBindingsMaterializedByThisGate: false,
      scopeCompatibilityInputsMaterializedByThisGate: false,
      provenanceIndependenceInputsMaterializedByThisGate: false,
      semanticBridgeInputsMaterializedByThisGate: false,
      contradictionInputsMaterializedByThisGate: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_AND_ADJUDICATION_INPUT_MATERIALIZATION_READINESS_REVIEW',
      notes: ['I143 fails closed unless exact I142 materialization readiness remains intact.'],
    });
  }

  const candidateManifest: I143CandidateManifestRecord = {
    candidateSetId: i142.candidateSetId!,
    candidateSetVersion: 'v1-candidate-set',
    adoptionId: i142.adoptionId!,
    candidateIds: SELECTED_CANDIDATE_IDS,
    candidateCount: 6,
    frozen: true,
  };

  const packageMaterial = {
    policyId: common.policyId,
    policyVersion: common.policyVersion,
    adoptionId: i142.adoptionId,
    candidateSetId: i142.candidateSetId,
    candidateIds: SELECTED_CANDIDATE_IDS,
    evidenceIds: EVIDENCE_RECORDS.map((record) => record.evidenceId),
    witnessIds: WITNESS_BINDINGS.map((binding) => binding.witnessId),
    semanticBridgeIds: SEMANTIC_BRIDGE_INPUTS.map((input) => input.bridgeId),
    contradictionIds: CONTRADICTION_INPUTS.map((input) => input.contradictionId),
  };
  const inputPackageId = `visible_stem_ke_composition_input_package_${deterministicContentHash(packageMaterial).slice(0, 24)}`;

  return finalized({
    ...common,
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_ADJUDICATION_INPUT_MATERIALIZATION_RECORD',
    decision:
      'EIGHT_INPUT_ARTIFACT_CLASSES_MATERIALIZED_AND_PACKAGE_REGISTERED_WITH_UNRESOLVED_ADJUDICATION_STATES_NO_EVALUATION',
    adoptionId: i142.adoptionId,
    candidateSetId: i142.candidateSetId,
    inputPackageId,
    inputPackageState: 'REGISTERED_NOT_EVALUATED',
    exactI142ReadinessAccepted: true,
    candidateManifest,
    allEightArtifactClassesMaterialized: true,
    allSixI118RequirementsHaveExplicitOwnershipBindings: OWNERSHIP_BINDINGS.every(
      (binding) => binding.owningEvidenceIds.length > 0,
    ),
    everyEvidenceRecordBindsFrozenCandidateSourceWitnessLocator: EVIDENCE_RECORDS.every(
      (record) =>
        SELECTED_CANDIDATE_IDS.includes(record.candidateId as (typeof SELECTED_CANDIDATE_IDS)[number]) &&
        WITNESS_BINDINGS.some(
          (binding) =>
            binding.witnessId === record.witnessId &&
            binding.sourceId === record.sourceId &&
            binding.normalizedCandidateId === record.candidateId,
        ) &&
        record.locator.length > 0,
    ),
    allWitnessBindingsStableAndReproducible: WITNESS_BINDINGS.every(
      (binding) => binding.reproducible && binding.stableLocator.length > 0,
    ),
    unresolvedStatesPreservedWithoutInference: true,
    priorEvidenceEnteredOnlyThroughExplicitRebinding: true,
    inputPackageRegisteredByThisGate: true,
    evidenceRebindingPerformedByThisGate: true,
    requirementOwnershipBindingsMaterializedByThisGate: true,
    witnessIdentityBindingsMaterializedByThisGate: true,
    scopeCompatibilityInputsMaterializedByThisGate: true,
    provenanceIndependenceInputsMaterializedByThisGate: true,
    semanticBridgeInputsMaterializedByThisGate: true,
    contradictionInputsMaterializedByThisGate: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_REGISTERED_INPUT_PACKAGE_EVALUATION_AUTHORIZATION_READINESS_REVIEW',
    notes: [
      'I143 materializes and registers all eight I138-governed input artifact classes against the exact frozen v1 candidate set.',
      'Six evidence records are explicitly rebound to frozen candidate, source, witness, locator, and I118 claim ownership; this is not requirement satisfaction.',
      'Three semantic bridges, two contradiction sets, six scope inputs, and six provenance-independence inputs are all registered as UNRESOLVED.',
      'The input package state REGISTERED_NOT_EVALUATED does not make the policy executable and does not authorize candidate-set evaluation, composition, or threshold semantics.',
    ],
  });
}
