import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProspectiveCandidateSetSelectionContractReport } from './i140-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-prospective-candidate-set-selection-contract.js';

export const I141_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_SELECTION_MATERIALIZATION_FREEZE_RECORD_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-candidate-set-selection-materialization-freeze-record-v1';

export type I141CandidateSourceGate = 'I120' | 'I122' | 'I125' | 'I128';

export interface I141CandidateWitnessBinding {
  witnessId: string;
  sourceGateOrigins: readonly I141CandidateSourceGate[];
  sourceIdentity: string;
  url: string;
  stableLocator: true;
  reproducibleTextInspection: true;
  alternateWitnessOfSameNormalizedWork: boolean;
}

export type I141CandidateSelectionDisposition =
  | 'SELECTED_UNDER_I140_PROSPECTIVE_RULES'
  | 'EXCLUDED_OBJECTIVE_SCOPE_MISMATCH';

export interface I141NormalizedCandidateSelectionRecord {
  candidateId: string;
  normalizedWorkIdentity: string;
  title: string;
  author: string | null;
  sourceGateOrigins: readonly I141CandidateSourceGate[];
  witnessBindings: readonly I141CandidateWitnessBinding[];
  witnessCount: number;
  targetScopeRelevant: boolean;
  exactNormalizedSourceIdentityResolved: true;
  stableReproducibleWitnessPresent: true;
  repositoryDocumentedI118RelevantEvidencePresent: boolean;
  selectionDisposition: I141CandidateSelectionDisposition;
  selected: boolean;
  objectiveExclusionReason: 'OUT_OF_SCOPE_NOT_VISIBLE_HEAVENLY_STEM_KE_TARGET' | null;
  selectionOutcomeIndependentOfCoverageSuccess: true;
  selectionOutcomeIndependentOfContradictionPresence: true;
  selectionOutcomeIndependentOfPreferredSemanticConclusion: true;
  requirementCoverageAdjudicatedByThisGate: false;
  scopeCompatibilityAdjudicatedForCompositionByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  semanticBridgeAdjudicatedByThisGate: false;
  contradictionAdjudicatedByThisGate: false;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetSelectionMaterializationFreezeRecordReport {
  recordId: string;
  recordVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_SELECTION_MATERIALIZATION_FREEZE_RECORD'
    | 'I140_SELECTION_CONTRACT_UNRESOLVED_OR_INVALID';
  decision:
    | 'PROSPECTIVELY_SELECTED_CANDIDATE_SET_MATERIALIZED_AND_FROZEN_SIX_SELECTED_ONE_OBJECTIVE_SCOPE_EXCLUSION_NO_EVALUATION'
    | 'CANDIDATE_SET_SELECTION_MATERIALIZATION_NOT_PERFORMED';
  upstreamI140ContractId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  adoptionId: string | null;
  selectionContractVersion: 'v1-selection';
  exactI140SelectionContractAccepted: boolean;
  candidateUniverseSourceGates: readonly ['I120', 'I122', 'I125', 'I128'];
  rawSourceGateCandidateObservationCount: 11;
  normalizedCandidateCount: 7;
  deduplicatedObservationCount: 4;
  normalizedCandidates: readonly I141NormalizedCandidateSelectionRecord[];
  selectedCandidates: readonly I141NormalizedCandidateSelectionRecord[];
  excludedCandidates: readonly I141NormalizedCandidateSelectionRecord[];
  selectedCandidateCount: 6;
  excludedCandidateCount: 1;
  candidateSetVersion: 'v1-candidate-set';
  candidateSetId: string | null;
  candidateUniverseMaterializedByThisGate: boolean;
  candidateSetSelectedByThisGate: boolean;
  candidateSetFrozenByThisGate: boolean;
  candidateManifestMaterializedByThisGate: boolean;
  witnessIdentityBindingsMaterializedByThisGate: boolean;
  candidateSetFrozenBeforeRequirementCoverageAdjudication: boolean;
  candidateSetFrozenBeforeScopeProvenanceBridgeContradictionAdjudication: boolean;
  outcomeDrivenCandidateAdditionPerformed: false;
  outcomeDrivenCandidateRemovalPerformed: false;
  coverageSuccessUsedForSelection: false;
  contradictionPresenceUsedForSelection: false;
  preferredSemanticConclusionUsedForSelection: false;
  excludedDitiansuiOnlyForVisibleStemScopeMismatch: boolean;
  weiQianliMirrorWitnessesDeduplicatedToOneCandidate: boolean;
  wuHuaiyunRepeatedGateObservationsDeduplicatedToOneCandidate: boolean;
  chenYuanRepeatedGateObservationsDeduplicatedToOneCandidate: boolean;
  inputPackageRegisteredByThisGate: false;
  evidenceRebindingPerformedByThisGate: false;
  requirementOwnershipAdjudicatedByThisGate: false;
  scopeCompatibilityAdjudicatedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  semanticBridgeAdjudicatedByThisGate: false;
  contradictionAdjudicatedByThisGate: false;
  candidateSetEvaluationAuthorizedByThisGate: false;
  candidateSetEvaluationPerformedByThisGate: false;
  candidateSetAdmissibilityEstablishedByThisGate: false;
  actualCompositionPerformedByThisGate: false;
  multiSourceCompositionAuthorized: false;
  authorityAcquiredByThisGate: false;
  visibleStemBinaryEffectiveInteractionEligibilityResolved: false;
  thresholdRuleCreatedByThisGate: false;
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  hiddenStemInteractionEligibilityGapRemains: true;
  hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED';
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_AND_ADJUDICATION_INPUT_MATERIALIZATION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROSPECTIVE_CANDIDATE_SET_SELECTION_CONTRACT';
  notes: readonly string[];
}

function witness(
  witnessId: string,
  sourceGateOrigins: readonly I141CandidateSourceGate[],
  sourceIdentity: string,
  url: string,
  alternateWitnessOfSameNormalizedWork = false,
): I141CandidateWitnessBinding {
  return {
    witnessId,
    sourceGateOrigins,
    sourceIdentity,
    url,
    stableLocator: true,
    reproducibleTextInspection: true,
    alternateWitnessOfSameNormalizedWork,
  };
}

function candidate(
  candidateId: string,
  normalizedWorkIdentity: string,
  title: string,
  author: string | null,
  sourceGateOrigins: readonly I141CandidateSourceGate[],
  witnessBindings: readonly I141CandidateWitnessBinding[],
  targetScopeRelevant: boolean,
  repositoryDocumentedI118RelevantEvidencePresent: boolean,
  selectionDisposition: I141CandidateSelectionDisposition,
  objectiveExclusionReason: 'OUT_OF_SCOPE_NOT_VISIBLE_HEAVENLY_STEM_KE_TARGET' | null,
): I141NormalizedCandidateSelectionRecord {
  return {
    candidateId,
    normalizedWorkIdentity,
    title,
    author,
    sourceGateOrigins,
    witnessBindings,
    witnessCount: witnessBindings.length,
    targetScopeRelevant,
    exactNormalizedSourceIdentityResolved: true,
    stableReproducibleWitnessPresent: true,
    repositoryDocumentedI118RelevantEvidencePresent,
    selectionDisposition,
    selected: selectionDisposition === 'SELECTED_UNDER_I140_PROSPECTIVE_RULES',
    objectiveExclusionReason,
    selectionOutcomeIndependentOfCoverageSuccess: true,
    selectionOutcomeIndependentOfContradictionPresence: true,
    selectionOutcomeIndependentOfPreferredSemanticConclusion: true,
    requirementCoverageAdjudicatedByThisGate: false,
    scopeCompatibilityAdjudicatedForCompositionByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    semanticBridgeAdjudicatedByThisGate: false,
    contradictionAdjudicatedByThisGate: false,
  };
}

function normalizedCandidateUniverse(): readonly I141NormalizedCandidateSelectionRecord[] {
  return [
    candidate(
      'candidate_chen_yuan_sizhu_yuce_rumen',
      '陈园｜邵伟华四柱预测学入门｜1995广州出版社',
      '邵伟华四柱预测学入门',
      '陈园',
      ['I120', 'I122'],
      [
        witness(
          'witness_chen_yuan_quanxue_sizhu17',
          ['I120', 'I122'],
          'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515',
          'https://www.quanxue.cn/qt_mingxiang/sizhu/sizhu17.html',
        ),
      ],
      true,
      true,
      'SELECTED_UNDER_I140_PROSPECTIVE_RULES',
      null,
    ),
    candidate(
      'candidate_wei_qianli_qianli_minggao',
      '韦千里｜千里命稿｜1935韦氏命苑',
      '千里命稿',
      '韦千里',
      ['I120', 'I122', 'I128'],
      [
        witness(
          'witness_wei_qianli_webpdf_reproduction',
          ['I120'],
          'source_wei_qianli_qianli_minggao_mingxue_jiangyi_webpdf_20260822',
          'https://www.lshack.cn/wp-content/uploads/2018/12/lshack.cn_2018-12-14_12-03-22.pdf',
          true,
        ),
        witness(
          'witness_wei_qianli_nlc_1935_scan',
          ['I122'],
          'source_wei_qianli_qianli_minggao_nlc_1935_scan',
          'https://commons.wikimedia.org/wiki/File:NLC416-01jh000372-10197_%E5%8D%83%E9%87%8C%E5%91%BD%E7%A8%BF.pdf',
        ),
        witness(
          'witness_wei_qianli_ctext_ganke_zhubie',
          ['I128'],
          'source_wei_qianli_qianli_minggao_ganke_zhubie_ctext',
          'https://ctext.org/wiki.pl?chapter=497083&if=gb&remap=gb',
          true,
        ),
      ],
      true,
      true,
      'SELECTED_UNDER_I140_PROSPECTIVE_RULES',
      null,
    ),
    candidate(
      'candidate_zhu_zuxia_bazi_yu_yongshen',
      '朱祖夏｜八字与用神｜五行相克的形式及其应用',
      '八字与用神',
      '朱祖夏',
      ['I122'],
      [
        witness(
          'witness_zhu_zuxia_suanzhun_remote_ke',
          ['I122'],
          'source_zhu_zuxia_bazi_yu_yongshen_wuxing_xiangke_web_reproduction',
          'https://www.suanzhun.net/book/1282.html',
        ),
      ],
      true,
      true,
      'SELECTED_UNDER_I140_PROSPECTIVE_RULES',
      null,
    ),
    candidate(
      'candidate_yimeng_tiangan_ke_theory',
      '易梦来源｜学四柱八字命理学基础之详解天干克的理论｜2026新浪看点',
      '学四柱八字命理学基础之详解天干克的理论',
      null,
      ['I122'],
      [
        witness(
          'witness_yimeng_sina_kandian_tiangan_ke',
          ['I122'],
          'source_yimeng_tiangan_ke_theory_2026_sina_kandian',
          'https://kandian.sina.cn/article_7879848901_1d5acf3c501901nobm.html',
        ),
      ],
      true,
      true,
      'SELECTED_UNDER_I140_PROSPECTIVE_RULES',
      null,
    ),
    candidate(
      'candidate_wu_huaiyun_yinyang_wuxing_bazi_yucexue_chuji',
      '吴怀云｜阴阳五行八字预测学（初级教材）｜Scribd 733612933',
      '阴阳五行八字预测学（初级教材）',
      '吴怀云',
      ['I125', 'I128'],
      [
        witness(
          'witness_wu_huaiyun_scribd_733612933',
          ['I125', 'I128'],
          'source_wu_huaiyun_yinyang_wuxing_bazi_yucexue_chuji_scribd_733612933',
          'https://www.scribd.com/document/733612933/',
        ),
      ],
      true,
      true,
      'SELECTED_UNDER_I140_PROSPECTIVE_RULES',
      null,
    ),
    candidate(
      'candidate_mingdeng_tiangan_youli_wuli_criteria',
      '明灯国学来源｜四柱八字天干力量分析：如何判断天干有力还是无力｜2022',
      '四柱八字天干力量分析：如何判断天干有力还是无力',
      null,
      ['I128'],
      [
        witness(
          'witness_mingdeng_tiangan_youli_wuli',
          ['I128'],
          'source_mingdeng_tiangan_youli_wuli_criteria_2022',
          'https://www.mingdengguoxue.com/?id=1095',
        ),
      ],
      true,
      true,
      'SELECTED_UNDER_I140_PROSPECTIVE_RULES',
      null,
    ),
    candidate(
      'candidate_ditiansui_chanwei_wuli_ke_case',
      '任铁樵评注传统｜滴天髓阐微｜无力克案例',
      '滴天髓阐微',
      '任铁樵（评注传统）',
      ['I128'],
      [
        witness(
          'witness_ditiansui_chanwei_daizhige',
          ['I128'],
          'source_ditiansui_chanwei_renshi_wuli_ke_case_daizhige',
          'https://daizhige.org/易藏/术数/滴天髓阐微.html',
        ),
      ],
      false,
      false,
      'EXCLUDED_OBJECTIVE_SCOPE_MISMATCH',
      'OUT_OF_SCOPE_NOT_VISIBLE_HEAVENLY_STEM_KE_TARGET',
    ),
  ] as const;
}

function exactI140Accepted(
  i140: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProspectiveCandidateSetSelectionContractReport,
): boolean {
  return (
    i140.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROSPECTIVE_CANDIDATE_SET_SELECTION_CONTRACT' &&
    i140.decision ===
      'PROSPECTIVE_CANDIDATE_SET_SELECTION_CONTRACT_FROZEN_BEFORE_MATERIALIZATION_NO_CANDIDATE_SET_SELECTED_NO_EVALUATION' &&
    i140.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i140.policyVersion === 'v1-definition' &&
    i140.adoptionVersion === 'v1-adoption' &&
    i140.adoptionId !== null &&
    i140.exactI139ReadinessAccepted &&
    i140.selectionContractVersion === 'v1-selection' &&
    i140.selectionControlCount === 6 &&
    i140.allSelectionControlsMandatory &&
    i140.candidateUniverseSourceGates.join('|') === 'I120|I122|I125|I128' &&
    i140.laterCandidateAdditionRequiresNewSelectionContractVersion &&
    i140.inclusionIndependentOfSupportiveContradictoryOrUnresolvedOutcome &&
    i140.exclusionBasedOnCoverageSuccessForbidden &&
    i140.exclusionBasedOnContradictionPresenceForbidden &&
    i140.exclusionBasedOnPreferredSemanticConclusionForbidden &&
    i140.sameNormalizedWorkAcrossMirrorWitnessesDeduplicatesToOneCandidate &&
    i140.selectionMustFreezeBeforeRequirementCoverageAdjudication &&
    i140.selectionMustFreezeBeforeScopeProvenanceBridgeContradictionAdjudication &&
    i140.postFreezeOutcomeDrivenAdditionForbidden &&
    i140.postFreezeOutcomeDrivenRemovalForbidden &&
    i140.candidateSelectionContractFrozenByThisGate &&
    i140.candidateUniverseMaterializedByThisGate === false &&
    i140.candidateSetSelectedByThisGate === false &&
    i140.candidateSetFrozenByThisGate === false &&
    i140.candidateSetEvaluationAuthorizedByThisGate === false &&
    i140.candidateSetEvaluationPerformedByThisGate === false &&
    i140.actualCompositionPerformedByThisGate === false &&
    i140.multiSourceCompositionAuthorized === false &&
    i140.authorityAcquiredByThisGate === false &&
    i140.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i140.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_SELECTION_MATERIALIZATION_AND_FREEZE_RECORD'
  );
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetSelectionMaterializationFreezeRecordReport, 'recordId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetSelectionMaterializationFreezeRecordReport {
  return {
    recordId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_candidate_set_freeze_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI141ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetSelectionMaterializationFreezeRecord(
  i140: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProspectiveCandidateSetSelectionContractReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionCandidateSetSelectionMaterializationFreezeRecordReport {
  const accepted = exactI140Accepted(i140);
  const normalizedCandidates = normalizedCandidateUniverse();
  const selectedCandidates = normalizedCandidates.filter((item) => item.selected);
  const excludedCandidates = normalizedCandidates.filter((item) => !item.selected);

  const common = {
    recordVersion:
      I141_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_SELECTION_MATERIALIZATION_FREEZE_RECORD_VERSION,
    upstreamI140ContractId: i140.contractId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy' as const,
    policyVersion: 'v1-definition' as const,
    adoptionVersion: 'v1-adoption' as const,
    selectionContractVersion: 'v1-selection' as const,
    candidateUniverseSourceGates: ['I120', 'I122', 'I125', 'I128'] as const,
    rawSourceGateCandidateObservationCount: 11 as const,
    normalizedCandidateCount: 7 as const,
    deduplicatedObservationCount: 4 as const,
    normalizedCandidates,
    selectedCandidates,
    excludedCandidates,
    selectedCandidateCount: 6 as const,
    excludedCandidateCount: 1 as const,
    candidateSetVersion: 'v1-candidate-set' as const,
    outcomeDrivenCandidateAdditionPerformed: false as const,
    outcomeDrivenCandidateRemovalPerformed: false as const,
    coverageSuccessUsedForSelection: false as const,
    contradictionPresenceUsedForSelection: false as const,
    preferredSemanticConclusionUsedForSelection: false as const,
    inputPackageRegisteredByThisGate: false as const,
    evidenceRebindingPerformedByThisGate: false as const,
    requirementOwnershipAdjudicatedByThisGate: false as const,
    scopeCompatibilityAdjudicatedByThisGate: false as const,
    provenanceIndependenceAdjudicatedByThisGate: false as const,
    semanticBridgeAdjudicatedByThisGate: false as const,
    contradictionAdjudicatedByThisGate: false as const,
    candidateSetEvaluationAuthorizedByThisGate: false as const,
    candidateSetEvaluationPerformedByThisGate: false as const,
    candidateSetAdmissibilityEstablishedByThisGate: false as const,
    actualCompositionPerformedByThisGate: false as const,
    multiSourceCompositionAuthorized: false as const,
    authorityAcquiredByThisGate: false as const,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false as const,
    thresholdRuleCreatedByThisGate: false as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
    hiddenStemInteractionEligibilityGapRemains: true as const,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' as const,
  };

  if (!accepted) {
    return finalized({
      ...common,
      status: 'I140_SELECTION_CONTRACT_UNRESOLVED_OR_INVALID',
      decision: 'CANDIDATE_SET_SELECTION_MATERIALIZATION_NOT_PERFORMED',
      adoptionId: null,
      exactI140SelectionContractAccepted: false,
      candidateSetId: null,
      candidateUniverseMaterializedByThisGate: false,
      candidateSetSelectedByThisGate: false,
      candidateSetFrozenByThisGate: false,
      candidateManifestMaterializedByThisGate: false,
      witnessIdentityBindingsMaterializedByThisGate: false,
      candidateSetFrozenBeforeRequirementCoverageAdjudication: false,
      candidateSetFrozenBeforeScopeProvenanceBridgeContradictionAdjudication: false,
      excludedDitiansuiOnlyForVisibleStemScopeMismatch: false,
      weiQianliMirrorWitnessesDeduplicatedToOneCandidate: false,
      wuHuaiyunRepeatedGateObservationsDeduplicatedToOneCandidate: false,
      chenYuanRepeatedGateObservationsDeduplicatedToOneCandidate: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROSPECTIVE_CANDIDATE_SET_SELECTION_CONTRACT',
      notes: ['I141 fails closed unless the exact I140 prospective selection contract remains intact.'],
    });
  }

  const candidateSetMaterial = {
    policyId: common.policyId,
    policyVersion: common.policyVersion,
    adoptionId: i140.adoptionId,
    selectionContractId: i140.contractId,
    candidateSetVersion: common.candidateSetVersion,
    selectedCandidateIds: selectedCandidates.map((item) => item.candidateId),
    selectedWitnessIds: selectedCandidates.flatMap((item) => item.witnessBindings.map((binding) => binding.witnessId)),
    excludedCandidateIds: excludedCandidates.map((item) => item.candidateId),
  };
  const candidateSetId = `visible_stem_ke_composition_candidate_set_${deterministicContentHash(candidateSetMaterial).slice(0, 24)}`;

  return finalized({
    ...common,
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_SELECTION_MATERIALIZATION_FREEZE_RECORD',
    decision:
      'PROSPECTIVELY_SELECTED_CANDIDATE_SET_MATERIALIZED_AND_FROZEN_SIX_SELECTED_ONE_OBJECTIVE_SCOPE_EXCLUSION_NO_EVALUATION',
    adoptionId: i140.adoptionId,
    exactI140SelectionContractAccepted: true,
    candidateSetId,
    candidateUniverseMaterializedByThisGate: true,
    candidateSetSelectedByThisGate: true,
    candidateSetFrozenByThisGate: true,
    candidateManifestMaterializedByThisGate: true,
    witnessIdentityBindingsMaterializedByThisGate: true,
    candidateSetFrozenBeforeRequirementCoverageAdjudication: true,
    candidateSetFrozenBeforeScopeProvenanceBridgeContradictionAdjudication: true,
    excludedDitiansuiOnlyForVisibleStemScopeMismatch: true,
    weiQianliMirrorWitnessesDeduplicatedToOneCandidate: true,
    wuHuaiyunRepeatedGateObservationsDeduplicatedToOneCandidate: true,
    chenYuanRepeatedGateObservationsDeduplicatedToOneCandidate: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_CANDIDATE_SET_EVIDENCE_REBINDING_AND_ADJUDICATION_INPUT_MATERIALIZATION_READINESS_REVIEW',
    notes: [
      'I141 materializes the I140 prospectively defined universe as eleven source-gate observations collapsed into seven normalized works.',
      'Six candidates are selected using target-scope, identity, witness, and I118-relevance criteria; no coverage or semantic outcome is used for selection.',
      '韦千里《千里命稿》 is one normalized candidate with three repository-documented witness bindings rather than three provenance votes.',
      '滴天髓阐微 is excluded only because the inspected I128 passage is a case-level 反克地支 judgment rather than the visible-heavenly-stem 克 target scope.',
      'The candidate set is frozen before requirement coverage, scope compatibility for composition, provenance independence, semantic bridge, contradiction, or admissibility adjudication.',
      'Selection freeze does not register the I138 input package, authorize candidate evaluation, compose sources, or create threshold authority.',
    ],
  });
}
