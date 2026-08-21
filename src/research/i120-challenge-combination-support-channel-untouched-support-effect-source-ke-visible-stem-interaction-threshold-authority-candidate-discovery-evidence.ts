import type { SourceReference } from '../contracts/interpretation.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I118ThresholdAuthorityRequirementId } from './i118-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-authority-gap-requirements-review.js';
import type { ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityAcquisitionReadinessReviewReport } from './i119-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-authority-acquisition-readiness-review.js';

export const I120_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-authority-candidate-discovery-evidence-v1';

export type I120CandidateInspectionState =
  | 'KNOWN_SOURCE_REINSPECTED_STILL_INSUFFICIENT'
  | 'NEW_INDEPENDENT_CANDIDATE_REJECTED_MISSING_REQUIRED_SEMANTIC_LOCATOR';

export interface I120CandidateRequirementLocatorObservation {
  requirementId: I118ThresholdAuthorityRequirementId;
  exactRelevantLocatorVerified: boolean;
  locator: string | null;
  sourceAnchor: string | null;
  relevanceStatement: string;
  requirementCoverageEvaluated: false;
  countsAsRequirementSatisfied: false;
}

export interface I120InspectedThresholdAuthorityCandidate {
  candidateInspectionId: string;
  inspectionState: I120CandidateInspectionState;
  sourceReference: SourceReference;
  sourceTextInspectedAtLocator: true;
  exactSourceIdentityResolvedForInspectedCopy: true;
  stableRevisionOrEquivalentReproducibleLocatorResolved: true;
  requirementLocatorObservations: readonly I120CandidateRequirementLocatorObservation[];
  verifiedRelevantLocatorCount: number;
  missingRequiredSemanticLocatorIds: readonly I118ThresholdAuthorityRequirementId[];
  allSixRequiredSemanticLocatorsVerified: false;
  registrationAcceptedUnderI119: false;
  requirementCoverageEvaluationStatus: 'NOT_STARTED';
  rejectionReason: string;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityCandidateDiscoveryEvidenceReport {
  evidenceId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE'
    | 'I119_UNRESOLVED_OR_INVALID';
  decision:
    | 'NO_SINGLE_CANDIDATE_WITH_ALL_SIX_I118_REQUIRED_SEMANTIC_LOCATORS_VERIFIED_THRESHOLD_AUTHORITY_NOT_REGISTERED'
    | 'VISIBLE_STEM_THRESHOLD_AUTHORITY_DISCOVERY_NOT_PERFORMED';
  upstreamI119ReviewId: string;
  externalDiscoveryPerformed: boolean;
  targetSourceTerm: '克' | null;
  targetScope: 'VISIBLE_HEAVENLY_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY' | null;
  discoveryMode:
    | 'SINGLE_CANDIDATE_FULL_SIX_REQUIREMENT_VISIBLE_STEM_THRESHOLD_AUTHORITY_ONLY'
    | 'NONE';
  discoverySearchScope: readonly string[];
  inspectedCandidateCount: number;
  inspectedCandidates: readonly I120InspectedThresholdAuthorityCandidate[];
  registeredCandidateCount: 0;
  registeredCandidate: null;
  strongestRejectedCandidateInspectionId: string | null;
  strongestRejectedCandidateMissingRequirementIds: readonly I118ThresholdAuthorityRequirementId[];
  noFullSixSemanticLocatorCandidateVerified: boolean;
  candidateRegistrationPerformedByThisGate: false;
  candidateRequirementCoverageEvaluatedByThisGate: false;
  candidateRegistrationMeansRequirementSatisfied: false;
  candidateSatisfiesAllSixRequirements: 'not_evaluated';
  existingI107CandidatePromoted: false;
  weiQianliCandidatePromoted: false;
  weiQianliQualitativeVsBinaryDistinctionObserved: boolean;
  weiQianliExplicitWuLiBoundaryObserved: false;
  missingWuLiBoundaryRemainsPrimaryDiscoveryDeficit: boolean;
  searchSnippetMayCountAsAuthorityEvidence: false;
  modelSynthesisMayCountAsAuthorityEvidence: false;
  generalKnowledgeMayCountAsAuthorityEvidence: false;
  numericCalibrationMayCountAsNormativeAuthority: false;
  qualitativeOrderingMayCountAsBinaryThreshold: false;
  crossCandidateCompositionPerformed: false;
  crossCandidateCompositionAuthorized: false;
  partialCandidatesMayBeCombinedToCloseGap: false;
  noCandidateFoundMayBeConvertedToDefaultRule: false;
  visibleStemBinaryEffectiveInteractionEligibilityResolved: false;
  effectiveInteractionSetResolved: false;
  thresholdRuleCreatedByThisGate: false;
  damageEvaluationAuthorized: false;
  i98KeDamageVocabularyEvaluationResolved: false;
  i98ResearchMethodologyMaterializationAuthorized: false;
  hiddenStemInteractionEligibilityGapRemains: true;
  hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED';
  methodologyDefinitionCreatedByThisGate: false;
  ruleDefinitionCreatedByThisGate: false;
  registrySnapshotMutatedByThisGate: false;
  reviewAttestationCreatedByThisGate: false;
  noTrackedRelationTouchSemanticsRemainUnchanged: true;
  structuralRelationKindMutationAuthorized: false;
  sourceActivationVerdictAuthorized: false;
  sourcePersistenceVerdictAuthorized: false;
  sourceEffectiveSupportVerdictAuthorized: false;
  relativeForceVerdictAuthorized: false;
  clashWinnerVerdictAuthorized: false;
  rescueEffectAuthorized: false;
  clashSettlementAuthorized: false;
  crossRelationPrecedenceAuthorized: false;
  targetPostRelationRootState: 'not_determined';
  effectiveMechanismForceVerdict: 'not_determined';
  relationSpecificUsefulnessHarmfulness: 'not_determined';
  classificationAuthorized: false;
  numericScoringAuthorized: false;
  recommendedNextGate:
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_WU_LI_BOUNDARY_TARGETED_AUTHORITY_DISCOVERY_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_AUTHORITY_ACQUISITION_READINESS_REVIEW';
  notes: readonly string[];
}

const REQUIREMENT_IDS = Object.freeze([
  'EXPLICIT_BINARY_EFFECTIVE_INTERACTION_SEMANTICS',
  'VISIBLE_STEM_POSITION_SCOPE_AND_POSITION_CLASS_APPLICABILITY',
  'QUALITATIVE_FORCE_VS_BINARY_ELIGIBILITY_SEPARATION',
  'WU_LI_BOUNDARY_SEMANTICS_AND_EXCEPTIONS',
  'CONTEXT_AND_EXCEPTION_CONDITIONS',
  'INDEPENDENT_NORMATIVE_PROVENANCE',
] as const satisfies readonly I118ThresholdAuthorityRequirementId[]);

function currentChenYuanSourceReference(): SourceReference {
  return {
    sourceId: 'source_chenyuan_sizhu_yuce_rumen_1995_isbn9787805922515',
    sourceType: 'modern_book',
    title: '邵伟华四柱预测学入门',
    author: '陈园',
    editor: '邵伟华（审订）',
    publisher: '广州出版社',
    edition: '1995 first edition',
    publicationYear: 1995,
    language: 'zh-Hans',
    locator: {
      chapter: '第四章 四柱三元',
      section: '第五节 三元论事 / 二、天干生克要则',
      anchor: '两干相克，邻干力大，隔干次之，远干无力；隔干之克，中隔之干化克则不以克论',
    },
    url: 'https://www.quanxue.cn/qt_mingxiang/sizhu/sizhu17.html',
    accessedAt: '2026-08-22',
    provenanceTier: 'practitioner_secondary',
    notes:
      'Existing I107 normalized source re-inspected under I119. The exact visible-stem positional and exception text remains useful non-binary evidence, but I118 already established that it does not explicitly define a Boolean effective-interaction threshold or the semantic boundary of 无力.',
  };
}

function weiQianliSourceReference(): SourceReference {
  return {
    sourceId: 'source_wei_qianli_qianli_minggao_mingxue_jiangyi_webpdf_20260822',
    sourceType: 'web',
    title: '千里命稿（命学讲义）',
    author: '韦千里',
    publicationYear: 1935,
    language: 'zh-Hans',
    locator: {
      section: '第一部分 命学讲义上集 / 第十九节 补充篇 / 干克之区别',
      page: '67',
      anchor: '地位愈远，克力愈轻；地位远隔，不能相克',
    },
    url: 'https://www.lshack.cn/wp-content/uploads/2018/12/lshack.cn_2018-12-14_12-03-22.pdf',
    accessedAt: '2026-08-22',
    provenanceTier: 'cross_reference',
    notes:
      'Research-only inspected web PDF reproduction. The PDF identifies 千里命稿, contains 1934 prefaces naming 韦千里 and a self-preface dated 民国乙亥, and exposes a reproducible page/section/anchor for 干克之区别. It is not claimed here to be an original first-edition scan. Discovery registration is rejected because the same candidate does not provide an explicit visible-stem 无力 semantic-boundary locator.',
  };
}

function chenYuanObservations(): readonly I120CandidateRequirementLocatorObservation[] {
  return [
    {
      requirementId: 'EXPLICIT_BINARY_EFFECTIVE_INTERACTION_SEMANTICS',
      exactRelevantLocatorVerified: false,
      locator: null,
      sourceAnchor: null,
      relevanceStatement:
        'The source gives scoped 不以克论 exceptions but does not state a general Boolean effective-interaction threshold for the visible-stem positional classes.',
      requirementCoverageEvaluated: false,
      countsAsRequirementSatisfied: false,
    },
    {
      requirementId: 'VISIBLE_STEM_POSITION_SCOPE_AND_POSITION_CLASS_APPLICABILITY',
      exactRelevantLocatorVerified: true,
      locator: '第四章 四柱三元 / 第五节 三元论事 / 二、天干生克要则',
      sourceAnchor: '两干相克，邻干力大，隔干次之，远干无力',
      relevanceStatement:
        'The inspected text directly names two heavenly stems and the 邻干/隔干/远干 positional classes.',
      requirementCoverageEvaluated: false,
      countsAsRequirementSatisfied: false,
    },
    {
      requirementId: 'QUALITATIVE_FORCE_VS_BINARY_ELIGIBILITY_SEPARATION',
      exactRelevantLocatorVerified: false,
      locator: null,
      sourceAnchor: null,
      relevanceStatement:
        'The source orders 力大/次之/无力 but does not explicitly state how that qualitative ordering differs from or maps to a Boolean effective-interaction state.',
      requirementCoverageEvaluated: false,
      countsAsRequirementSatisfied: false,
    },
    {
      requirementId: 'WU_LI_BOUNDARY_SEMANTICS_AND_EXCEPTIONS',
      exactRelevantLocatorVerified: false,
      locator: null,
      sourceAnchor: '远干无力',
      relevanceStatement:
        'The literal term 无力 is present, but the source does not explicitly define whether it means no interaction, ineffective interaction, negligible force, or another state.',
      requirementCoverageEvaluated: false,
      countsAsRequirementSatisfied: false,
    },
    {
      requirementId: 'CONTEXT_AND_EXCEPTION_CONDITIONS',
      exactRelevantLocatorVerified: true,
      locator: '第四章 四柱三元 / 第五节 三元论事 / 二、天干生克要则',
      sourceAnchor: '中隔之干化克则不以克论；克中有合，合去克则不作克论；日干被他干克，又有他干的制，不作克论',
      relevanceStatement:
        'The same section contains explicit mediation, combination, and counter-control exceptions that can change whether a stated 克 relation is treated as 克.',
      requirementCoverageEvaluated: false,
      countsAsRequirementSatisfied: false,
    },
    {
      requirementId: 'INDEPENDENT_NORMATIVE_PROVENANCE',
      exactRelevantLocatorVerified: true,
      locator: '陈园《邵伟华四柱预测学入门》广州出版社 1995 ISBN 9787805922515',
      sourceAnchor: '第四章 四柱三元 / 第五节 三元论事',
      relevanceStatement:
        'The existing candidate has a previously normalized published-book identity and reproducible chapter/section/anchor context.',
      requirementCoverageEvaluated: false,
      countsAsRequirementSatisfied: false,
    },
  ];
}

function weiQianliObservations(): readonly I120CandidateRequirementLocatorObservation[] {
  return [
    {
      requirementId: 'EXPLICIT_BINARY_EFFECTIVE_INTERACTION_SEMANTICS',
      exactRelevantLocatorVerified: true,
      locator: 'PDF p.67 / 干克之区别 / examples 七至十一',
      sourceAnchor: '似克而非克；庚甲不克；仍作克论；地位远隔，不能相克',
      relevanceStatement:
        'The inspected section explicitly distinguishes cases treated as 克 from cases treated as non-克, including a distance-based 不能相克 statement.',
      requirementCoverageEvaluated: false,
      countsAsRequirementSatisfied: false,
    },
    {
      requirementId: 'VISIBLE_STEM_POSITION_SCOPE_AND_POSITION_CLASS_APPLICABILITY',
      exactRelevantLocatorVerified: true,
      locator: 'PDF p.67 / 干克之区别 / examples 六、七、十、十一',
      sourceAnchor: '庚年甲巳，有月柱间隔；庚年甲时，有月柱日柱间隔；庚甲地位接近；地位远隔',
      relevanceStatement:
        'The examples are explicitly framed by heavenly-stem positions across year, month, day, and hour pillars and distinguish intervening-pillar distance.',
      requirementCoverageEvaluated: false,
      countsAsRequirementSatisfied: false,
    },
    {
      requirementId: 'QUALITATIVE_FORCE_VS_BINARY_ELIGIBILITY_SEPARATION',
      exactRelevantLocatorVerified: true,
      locator: 'PDF p.67 / 干克之区别 / examples 六、七、十一',
      sourceAnchor: '克力较轻；地位愈远，克力愈轻；地位远隔，不能相克',
      relevanceStatement:
        'Within the same section, the text separately describes lighter 克 force and a 不能相克 state, providing an explicit research target for qualitative-force versus binary-interaction separation.',
      requirementCoverageEvaluated: false,
      countsAsRequirementSatisfied: false,
    },
    {
      requirementId: 'WU_LI_BOUNDARY_SEMANTICS_AND_EXCEPTIONS',
      exactRelevantLocatorVerified: false,
      locator: null,
      sourceAnchor: null,
      relevanceStatement:
        'Full-text inspection did not locate the visible-stem term 无力 in this candidate, so its 不能相克 language cannot be mapped to the I107 无力 vocabulary without forbidden cross-source semantic synthesis.',
      requirementCoverageEvaluated: false,
      countsAsRequirementSatisfied: false,
    },
    {
      requirementId: 'CONTEXT_AND_EXCEPTION_CONDITIONS',
      exactRelevantLocatorVerified: true,
      locator: 'PDF p.67 / 干克之区别 / examples 八至十三',
      sourceAnchor: '壬水泄庚金而生甲木…似克而非克；丙火克庚，则庚甲不克；壬水远隔…仍作克论；若庚金最强…若甲木最强…若戊土最强',
      relevanceStatement:
        'The section supplies mediator, counter-control, distance, comparative-strength, and yin/yang conditions that alter the treatment of 克.',
      requirementCoverageEvaluated: false,
      countsAsRequirementSatisfied: false,
    },
    {
      requirementId: 'INDEPENDENT_NORMATIVE_PROVENANCE',
      exactRelevantLocatorVerified: true,
      locator: 'PDF title/contents and pp.3-4 prefaces/self-preface; 干克之区别 at p.67',
      sourceAnchor: '千里命稿；韦子千里；编印《命学讲义》；民国乙亥夏日浙江嘉兴韦千里谨识',
      relevanceStatement:
        'The inspected copy identifies the historical work and author in its own front matter and preserves a reproducible section/page/anchor for later provenance evaluation.',
      requirementCoverageEvaluated: false,
      countsAsRequirementSatisfied: false,
    },
  ];
}

function candidate(
  inspectionState: I120CandidateInspectionState,
  sourceReference: SourceReference,
  observations: readonly I120CandidateRequirementLocatorObservation[],
  rejectionReason: string,
): I120InspectedThresholdAuthorityCandidate {
  const missing = observations
    .filter((item) => !item.exactRelevantLocatorVerified)
    .map((item) => item.requirementId);
  const material = {
    inspectionState,
    sourceReference,
    sourceTextInspectedAtLocator: true as const,
    exactSourceIdentityResolvedForInspectedCopy: true as const,
    stableRevisionOrEquivalentReproducibleLocatorResolved: true as const,
    requirementLocatorObservations: observations,
    verifiedRelevantLocatorCount: observations.length - missing.length,
    missingRequiredSemanticLocatorIds: missing,
    allSixRequiredSemanticLocatorsVerified: false as const,
    registrationAcceptedUnderI119: false as const,
    requirementCoverageEvaluationStatus: 'NOT_STARTED' as const,
    rejectionReason,
  };
  return {
    candidateInspectionId: `visible_stem_threshold_candidate_inspection_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function inspectedCandidates(): readonly I120InspectedThresholdAuthorityCandidate[] {
  const chen = candidate(
    'KNOWN_SOURCE_REINSPECTED_STILL_INSUFFICIENT',
    currentChenYuanSourceReference(),
    chenYuanObservations(),
    'Existing I107 authority remains insufficient under I118: it lacks an explicit general binary threshold, lacks an explicit qualitative-force versus Boolean-eligibility separation, and does not define the semantic boundary of 无力.',
  );
  const wei = candidate(
    'NEW_INDEPENDENT_CANDIDATE_REJECTED_MISSING_REQUIRED_SEMANTIC_LOCATOR',
    weiQianliSourceReference(),
    weiQianliObservations(),
    'The inspected 千里命稿/命学讲义 candidate provides exact visible-stem distance, qualitative-force, explicit non-克, and exception material, but no explicit visible-stem 无力 semantic-boundary locator was found. I119 forbids filling that missing requirement by combining it with the I107 source.',
  );
  return [chen, wei];
}

function exactI119Accepted(
  i119: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityAcquisitionReadinessReviewReport,
): boolean {
  return (
    i119.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_AUTHORITY_ACQUISITION_READINESS' &&
    i119.decision ===
      'VISIBLE_STEM_THRESHOLD_SINGLE_CANDIDATE_GOVERNED_AUTHORITY_ACQUISITION_CONTRACT_FROZEN_NO_AUTHORITY_ACQUIRED' &&
    i119.candidateSourceIdContext !== null &&
    i119.targetSourceTerm === '克' &&
    i119.targetScope === 'VISIBLE_HEAVENLY_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY' &&
    i119.acquisitionMode ===
      'SINGLE_CANDIDATE_FULL_SIX_REQUIREMENT_VISIBLE_STEM_THRESHOLD_AUTHORITY_ONLY' &&
    i119.oneCandidatePerEvaluation &&
    i119.oneNormalizedSourceReferencePerCandidateRequired &&
    i119.originalSourceInspectionRequired &&
    i119.exactSourceIdentityRequired &&
    i119.stableRevisionOrEquivalentReproducibleLocatorRequired &&
    i119.exactLocatorPerRequirementRequired &&
    i119.sameCandidateMustCoverAllSixI118Requirements &&
    i119.singleCandidateFullCoverageRequiredForPromotionUnderThisContract &&
    i119.admissionRequirementCount === REQUIREMENT_IDS.length &&
    i119.admissionRequirements.map((item) => item.requirementId).join('|') ===
      REQUIREMENT_IDS.join('|') &&
    i119.admissionRequirements.every(
      (item) =>
        item.exactEvidenceWithinSameCandidateRequired &&
        item.exactLocatorRequired &&
        item.originalOrVerifiedSourceContextRequired &&
        item.inferredFromGeneralKnowledgeAllowed === false &&
        item.searchSnippetSubstitutionAllowed === false &&
        item.modelSynthesisSubstitutionAllowed === false &&
        item.numericCalibrationSubstitutionAllowed === false &&
        item.qualitativeOrderingAloneAllowed === false &&
        item.crossCandidateCompositionAllowed === false,
    ) &&
    i119.sourceClassAloneMaySatisfyRequirement === false &&
    i119.existingI107CandidateAutomaticallyAcceptedForThresholdAuthority === false &&
    i119.sourceRegistrationAloneMayCloseThresholdGap === false &&
    i119.requirementCoverageEvaluationRequiredAfterDiscovery &&
    i119.vocabularyMentionAloneMaySatisfyThresholdAuthority === false &&
    i119.qualitativePositionLanguageAloneMaySatisfyThresholdAuthority === false &&
    i119.searchSnippetMayCountAsAuthorityEvidence === false &&
    i119.modelGeneratedSynthesisMayCountAsAuthorityEvidence === false &&
    i119.generalKnowledgeMayCountAsAuthorityEvidence === false &&
    i119.numericCalibrationMayCountAsNormativeAuthority === false &&
    i119.crossCandidateCompositionAuthorized === false &&
    i119.multiplePartialCandidatesMaySubstituteForOneAcceptedCandidate === false &&
    i119.multiSourceCompositionPolicyResolved === false &&
    i119.candidateDiscoveryPerformedByThisGate === false &&
    i119.candidateRegisteredByThisGate === false &&
    i119.requirementCoverageEvaluatedByThisGate === false &&
    i119.authorityAcquiredByThisGate === false &&
    i119.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i119.effectiveInteractionSetResolved === false &&
    i119.thresholdRuleCreatedByThisGate === false &&
    i119.damageEvaluationAuthorized === false &&
    i119.i98KeDamageVocabularyEvaluationResolved === false &&
    i119.i98ResearchMethodologyMaterializationAuthorized === false &&
    i119.hiddenStemInteractionEligibilityGapRemains &&
    i119.hiddenStemAuthorityGap ===
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i119.hiddenStemAuthorityMaySubstitute === false &&
    i119.classificationAuthorized === false &&
    i119.numericScoringAuthorized === false &&
    i119.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE'
  );
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityCandidateDiscoveryEvidenceReport, 'evidenceId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityCandidateDiscoveryEvidenceReport {
  return {
    evidenceId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_candidate_discovery_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

function common(
  i119: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityAcquisitionReadinessReviewReport,
) {
  return {
    evidenceVersion:
      I120_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE_VERSION,
    upstreamI119ReviewId: i119.reviewId,
    registeredCandidateCount: 0 as const,
    registeredCandidate: null,
    candidateRegistrationPerformedByThisGate: false as const,
    candidateRequirementCoverageEvaluatedByThisGate: false as const,
    candidateRegistrationMeansRequirementSatisfied: false as const,
    candidateSatisfiesAllSixRequirements: 'not_evaluated' as const,
    existingI107CandidatePromoted: false as const,
    weiQianliCandidatePromoted: false as const,
    weiQianliExplicitWuLiBoundaryObserved: false as const,
    searchSnippetMayCountAsAuthorityEvidence: false as const,
    modelSynthesisMayCountAsAuthorityEvidence: false as const,
    generalKnowledgeMayCountAsAuthorityEvidence: false as const,
    numericCalibrationMayCountAsNormativeAuthority: false as const,
    qualitativeOrderingMayCountAsBinaryThreshold: false as const,
    crossCandidateCompositionPerformed: false as const,
    crossCandidateCompositionAuthorized: false as const,
    partialCandidatesMayBeCombinedToCloseGap: false as const,
    noCandidateFoundMayBeConvertedToDefaultRule: false as const,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false as const,
    effectiveInteractionSetResolved: false as const,
    thresholdRuleCreatedByThisGate: false as const,
    damageEvaluationAuthorized: false as const,
    i98KeDamageVocabularyEvaluationResolved: false as const,
    i98ResearchMethodologyMaterializationAuthorized: false as const,
    hiddenStemInteractionEligibilityGapRemains: true as const,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' as const,
    methodologyDefinitionCreatedByThisGate: false as const,
    ruleDefinitionCreatedByThisGate: false as const,
    registrySnapshotMutatedByThisGate: false as const,
    reviewAttestationCreatedByThisGate: false as const,
    noTrackedRelationTouchSemanticsRemainUnchanged: true as const,
    structuralRelationKindMutationAuthorized: false as const,
    sourceActivationVerdictAuthorized: false as const,
    sourcePersistenceVerdictAuthorized: false as const,
    sourceEffectiveSupportVerdictAuthorized: false as const,
    relativeForceVerdictAuthorized: false as const,
    clashWinnerVerdictAuthorized: false as const,
    rescueEffectAuthorized: false as const,
    clashSettlementAuthorized: false as const,
    crossRelationPrecedenceAuthorized: false as const,
    targetPostRelationRootState: 'not_determined' as const,
    effectiveMechanismForceVerdict: 'not_determined' as const,
    relationSpecificUsefulnessHarmfulness: 'not_determined' as const,
    classificationAuthorized: false as const,
    numericScoringAuthorized: false as const,
  };
}

export function buildI120ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityCandidateDiscoveryEvidence(
  i119: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityAcquisitionReadinessReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdAuthorityCandidateDiscoveryEvidenceReport {
  const base = common(i119);
  if (!exactI119Accepted(i119)) {
    return finalized({
      ...base,
      status: 'I119_UNRESOLVED_OR_INVALID',
      decision: 'VISIBLE_STEM_THRESHOLD_AUTHORITY_DISCOVERY_NOT_PERFORMED',
      externalDiscoveryPerformed: false,
      targetSourceTerm: null,
      targetScope: null,
      discoveryMode: 'NONE',
      discoverySearchScope: [],
      inspectedCandidateCount: 0,
      inspectedCandidates: [],
      strongestRejectedCandidateInspectionId: null,
      strongestRejectedCandidateMissingRequirementIds: [],
      noFullSixSemanticLocatorCandidateVerified: false,
      weiQianliQualitativeVsBinaryDistinctionObserved: false,
      missingWuLiBoundaryRemainsPrimaryDiscoveryDeficit: false,
      recommendedNextGate:
        'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_AUTHORITY_ACQUISITION_READINESS_REVIEW',
      notes: [
        'I120 requires exact resolved I119 single-candidate acquisition readiness before external discovery evidence may be recorded.',
      ],
    });
  }

  const candidates = inspectedCandidates();
  const strongest = candidates[1];
  if (!strongest) {
    throw new Error('I120 strongest inspected candidate invariant failed.');
  }
  return finalized({
    ...base,
    status:
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_AUTHORITY_CANDIDATE_DISCOVERY_EVIDENCE',
    decision:
      'NO_SINGLE_CANDIDATE_WITH_ALL_SIX_I118_REQUIRED_SEMANTIC_LOCATORS_VERIFIED_THRESHOLD_AUTHORITY_NOT_REGISTERED',
    externalDiscoveryPerformed: true,
    targetSourceTerm: '克',
    targetScope: 'VISIBLE_HEAVENLY_STEM_BINARY_EFFECTIVE_INTERACTION_ELIGIBILITY',
    discoveryMode:
      'SINGLE_CANDIDATE_FULL_SIX_REQUIREMENT_VISIBLE_STEM_THRESHOLD_AUTHORITY_ONLY',
    discoverySearchScope: [
      'existing normalized I107 陈园 source reinspection',
      'historical Four Pillars texts discussing 天干/干克 positional interaction',
      '韦千里《千里命稿》/《命学讲义》 reproducible web-PDF text',
      'targeted exact-phrase search for 远干无力 plus explicit non-interaction semantics',
    ],
    inspectedCandidateCount: candidates.length,
    inspectedCandidates: candidates,
    strongestRejectedCandidateInspectionId: strongest.candidateInspectionId,
    strongestRejectedCandidateMissingRequirementIds:
      strongest.missingRequiredSemanticLocatorIds,
    noFullSixSemanticLocatorCandidateVerified: true,
    weiQianliQualitativeVsBinaryDistinctionObserved: true,
    missingWuLiBoundaryRemainsPrimaryDiscoveryDeficit: true,
    recommendedNextGate:
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_WU_LI_BOUNDARY_TARGETED_AUTHORITY_DISCOVERY_READINESS_REVIEW',
    notes: [
      'The existing I107 source was re-inspected and remains insufficient under the frozen I118 authority contract; no previously rejected semantic gap is silently reopened.',
      '韦千里《千里命稿》/《命学讲义》 is materially stronger on visible-stem binary interaction because one inspected section distinguishes lighter 克力 from 不能相克 and records context-sensitive non-克 cases.',
      'That candidate still lacks an explicit locator defining the semantic boundary of the I107 vocabulary term 无力. Treating its 不能相克 as the meaning of another source’s 无力 would be cross-source synthesis and is forbidden by I119.',
      'No candidate is registered because I119 requires one candidate to expose all six required semantic loci before the later requirement-coverage evaluation path is opened.',
      'This negative discovery result is scoped to the inspected discovery corpus; it does not prove that no qualifying authority exists elsewhere.',
      'No threshold, interaction set, damage state, hidden-stem rule, settlement, classifier, numeric score, or production interpretation authority is created.',
    ],
  });
}
