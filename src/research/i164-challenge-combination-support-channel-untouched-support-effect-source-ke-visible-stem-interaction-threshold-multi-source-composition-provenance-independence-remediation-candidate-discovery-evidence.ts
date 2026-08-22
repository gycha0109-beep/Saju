import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  I163_DISCOVERY_OUTPUT_REQUIREMENT_IDS,
  type ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryReadinessReviewReport,
  type I163DiscoveryOutputRequirementId,
} from './i163-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-provenance-independence-remediation-candidate-discovery-readiness-review.js';

export const I164_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_DISCOVERY_EVIDENCE_VERSION =
  'myeonghwa-challenge-combination-support-channel-untouched-support-effect-source-ke-visible-stem-interaction-threshold-multi-source-composition-provenance-independence-remediation-candidate-discovery-evidence-v1';

export const I164_REMEDIATION_DISCOVERY_CANDIDATE_IDS = Object.freeze([
  'candidate_li_hanchen_bazi_yuce_zhenzong_ge_bu_zuoyong',
  'candidate_sun_haiyi_mingli_guo_sanguan_gegan_yaoge',
] as const);

export type I164RemediationDiscoveryCandidateId =
  (typeof I164_REMEDIATION_DISCOVERY_CANDIDATE_IDS)[number];

export type I164CandidateProvenanceDisposition =
  | 'NEW_PROVENANCE_CANDIDATE_PENDING_DERIVATIVE_RELATIONSHIP_ADJUDICATION'
  | 'LINEAGE_DEPENDENCY_RISK_UNRESOLVED_NOT_ELIGIBLE_AS_INDEPENDENT_AUTHORITY';

export interface I164RemediationCandidateEvidenceRecord {
  candidateId: I164RemediationDiscoveryCandidateId;
  authorOrAttribution: string;
  workTitle: string;
  inspectedWitnessFinding: string;
  chronologyFinding: string;
  visibleStemScopeFinding: string;
  binaryInteractionFinding: string;
  derivativeRelationshipFinding: string;
  semanticBridgeImpact: string;
  contradictionImpact: string;
  prospectiveDeltaImpact: string;
  sourceLocators: readonly string[];
  boundedSearchQueries: readonly string[];
  discoveryOutputRequirementIdsApplied: readonly I163DiscoveryOutputRequirementId[];
  exactSourceIdentityBound: true;
  reproducibleWitnessLocated: true;
  visibleStemScopeSignalPresent: true;
  explicitBinaryInteractionSignalPresent: true;
  sameWorkDuplicateWitnessNormalized: true;
  candidateAlreadyInCurrentV2CandidateSet: false;
  provenanceDisposition: I164CandidateProvenanceDisposition;
  potentiallyUsefulForNewProvenanceTrack: boolean;
  potentiallyUsefulForReplacementTrack: boolean;
  eligibleToCountAsIndependentAuthorityByThisGate: false;
  derivativeDependencyEstablishedByThisGate: false;
  explicitNegativeDerivativeFindingEstablishedByThisGate: false;
  independenceEstablishedByThisGate: false;
  remediationSelectedByThisRecord: false;
  numericWeight: null;
}

export interface ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryEvidenceReport {
  evidenceRecordSetId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_DISCOVERY_EVIDENCE'
    | 'I163_REMEDIATION_CANDIDATE_DISCOVERY_READINESS_INVALID';
  decision:
    | 'REMEDIATION_CANDIDATE_DISCOVERY_EXECUTED_ONE_NEW_PROVENANCE_CANDIDATE_AND_ONE_LINEAGE_RISK_SIGNAL_DISCOVERED_ZERO_INDEPENDENCE_OR_REMEDIATION_SELECTION'
    | 'REMEDIATION_CANDIDATE_DISCOVERY_NOT_EXECUTED';
  upstreamI163ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI163ReadinessAccepted: boolean;
  discoveryOutputRequirementIdsApplied: readonly I163DiscoveryOutputRequirementId[];
  discoveryOutputRequirementCount: 9;
  candidateEvidenceRecords: readonly I164RemediationCandidateEvidenceRecord[];
  candidateEvidenceRecordCount: 2 | 0;
  newProvenanceCandidatePendingAdjudicationCount: 1 | 0;
  lineageDependencyRiskSignalCount: 1 | 0;
  derivativeDependencyEstablishedCount: 0;
  explicitNegativeDerivativeFindingEstablishedCount: 0;
  independentNormativeProvenanceEstablishedCount: 0;
  liHanchenCandidateDiscovered: boolean;
  liHanchen1997_1999SelfDisclosedWorkChronologyRecorded: boolean;
  liHanchen2003InspectedEditionRecorded: boolean;
  liHanchenBinaryNonInteractionRuleRecorded: boolean;
  liHanchenIndependenceNotInferredFromAuthorshipOrChronology: boolean;
  sunHaiyiCandidateRecordedAsLineageRiskOnly: boolean;
  sunHaiyi2004WitnessRecorded: boolean;
  sunHaiyiSpecificTextualDependencyOnLiHanchenNotProven: boolean;
  thirdPartyNewSchoolLineageSignalRecorded: boolean;
  sameDoctrineSimilarityNotPromotedToDerivativeDependency: boolean;
  sameWorkDuplicateWitnessesNotCountedAsIndependentAuthority: boolean;
  newCandidateDiscoveryIsNotCandidateSetSelection: true;
  newCandidateDiscoveryIsNotCandidateReplacement: true;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  remediationCandidateDiscoveryExecutedByThisGate: boolean;
  remediationStrategySelectedByThisGate: false;
  remediationExecutionAuthorizedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  candidateRemovedByThisGate: false;
  candidateReplacedByThisGate: false;
  evidenceReboundByThisGate: false;
  newCandidateSetVersionCreatedByThisGate: false;
  newInputPackageVersionCreatedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  candidateSetReevaluationAuthorizedByThisGate: false;
  candidateSetReevaluationPerformedByThisGate: false;
  candidateSetAdmissibilityEstablishedByThisGate: false;
  sourceCountVotingAllowed: false;
  provenanceTierWeightingAllowed: false;
  productionPolicyExecutionAuthorized: false;
  actualCompositionPerformedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_EVIDENCE_ADEQUACY_AND_LINEAGE_ADJUDICATION_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_DISCOVERY_READINESS_REVIEW';
  notes: readonly string[];
}

function exactI163Accepted(
  i163: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryReadinessReviewReport,
): boolean {
  const exactOutputRequirements =
    i163.discoveryOutputRequirementIds.length === I163_DISCOVERY_OUTPUT_REQUIREMENT_IDS.length &&
    i163.discoveryOutputRequirementIds.every(
      (requirementId, index) => requirementId === I163_DISCOVERY_OUTPUT_REQUIREMENT_IDS[index],
    );

  return (
    i163.status ===
      'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_DISCOVERY_READINESS_REVIEW' &&
    i163.decision ===
      'FIVE_REMEDIATION_DISCOVERY_TRACKS_READY_UNDER_FIFTEEN_FROZEN_REQUIREMENTS_NO_CANDIDATE_DISCOVERED_SELECTED_OR_EXECUTED' &&
    i163.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i163.policyVersion === 'v1-definition' &&
    i163.adoptionVersion === 'v1-adoption' &&
    i163.currentCandidateSetVersion === 'v1-candidate-set' &&
    i163.currentInputPackageVersion === 'v2-input-package' &&
    i163.exactI162BoundaryAccepted &&
    i163.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i163.frozenI162RequirementCount === 15 &&
    i163.reviewableStrategyCount === 5 &&
    exactOutputRequirements &&
    i163.discoveryOutputRequirementCount === 9 &&
    i163.discoveryTrackCount === 5 &&
    i163.allTracksConclusionNeutral &&
    i163.remediationCandidateDiscoveryAuthorizedByThisGate &&
    i163.remediationCandidateDiscoveryExecutedByThisGate === false &&
    i163.remediationCandidateDiscoveredByThisGate === false &&
    i163.remediationStrategySelectedByThisGate === false &&
    i163.remediationExecutionAuthorizedByThisGate === false &&
    i163.currentV2PackageAndCandidateSetRemainImmutable &&
    i163.inputPackageMutatedByThisGate === false &&
    i163.newPackageVersionCreatedByThisGate === false &&
    i163.candidateSetMutatedByThisGate === false &&
    i163.provenanceIndependenceAdjudicatedByThisGate === false &&
    i163.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i163.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i163.candidateSetReevaluationAuthorizedByThisGate === false &&
    i163.candidateSetReevaluationPerformedByThisGate === false &&
    i163.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i163.sourceCountVotingAllowed === false &&
    i163.provenanceTierWeightingAllowed === false &&
    i163.productionPolicyExecutionAuthorized === false &&
    i163.actualCompositionPerformedByThisGate === false &&
    i163.multiSourceCompositionAuthorized === false &&
    i163.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i163.thresholdRuleCreatedByThisGate === false &&
    i163.classificationAuthorized === false &&
    i163.numericScoringAuthorized === false &&
    i163.hiddenStemInteractionEligibilityGapRemains &&
    i163.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_DISCOVERY_EVIDENCE'
  );
}

function evidenceRecords(): readonly I164RemediationCandidateEvidenceRecord[] {
  return Object.freeze([
    Object.freeze({
      candidateId: 'candidate_li_hanchen_bazi_yuce_zhenzong_ge_bu_zuoyong' as const,
      authorOrAttribution: '李涵辰',
      workTitle: '《八字预测真踪》',
      inspectedWitnessFinding:
        'A reproducible 2003-06 inspected edition identifies 李涵辰 as author. Its preface says 《四柱预测真踪》 was written from lunar 1996-10 to 1997-01, 《八字预测真踪》 appeared in spring 1999, and the inspected edition was revised from the 1999 version.',
      chronologyFinding:
        'The author-disclosed work chronology predates 孙海义《命理过三关》 (2004). Chronology is evidence for ordering only and is not treated as independence or specific dependency proof.',
      visibleStemScopeFinding:
        'Reproductions of the 涵辰 system state that heavenly stems act by position: year stem acts on month stem, month stem and hour stem act on day stem, while year-day, month-hour, and hour-year pairs do not directly act.',
      binaryInteractionFinding:
        'The rule is expressed as 隔不作用 / 互不作用 rather than merely as weaker force. That is a direct binary interaction signal relevant to the visible-heavenly-stem eligibility target, but no threshold authority is established by discovery alone.',
      derivativeRelationshipFinding:
        'The inspected preface says the work inherits the traditional 八字 framework while combining techniques the author says he discovered and verified. No exact upstream source for the specific 隔不作用 rule was established in this bounded discovery, so independence remains unresolved and must be separately adjudicated.',
      semanticBridgeImpact:
        'Potentially useful for the explicit binary-semantics and visible-position bridge because it uses direct non-interaction language. This record does not authorize rebinding or bridge resolution.',
      contradictionImpact:
        'The binary non-interaction formulation can conflict with authorities that treat remote interaction as small or conditional rather than absent; contradiction review is therefore mandatory before any remediation adoption.',
      prospectiveDeltaImpact:
        'Any use would require prospective candidate-set selection, a new candidate-set version, new input-package version, exact rebinding, and a fresh single-use nine-step evaluation.',
      sourceLocators: Object.freeze([
        'https://www.scribd.com/document/938380284/',
        'https://www.guoxuedashi.com/a/22337wzuc/281431r.html',
        'https://www.fengshui86.com/fengshui/020G3E15920241369159.html',
      ]),
      boundedSearchQueries: Object.freeze([
        '李涵辰 八字预测真踪 隔不作用',
        '八字预测真踪 年干与日干 月干与时干 不作用',
        '八字预测真踪 1999 2003 李涵辰',
      ]),
      discoveryOutputRequirementIdsApplied: I163_DISCOVERY_OUTPUT_REQUIREMENT_IDS,
      exactSourceIdentityBound: true as const,
      reproducibleWitnessLocated: true as const,
      visibleStemScopeSignalPresent: true as const,
      explicitBinaryInteractionSignalPresent: true as const,
      sameWorkDuplicateWitnessNormalized: true as const,
      candidateAlreadyInCurrentV2CandidateSet: false as const,
      provenanceDisposition:
        'NEW_PROVENANCE_CANDIDATE_PENDING_DERIVATIVE_RELATIONSHIP_ADJUDICATION' as const,
      potentiallyUsefulForNewProvenanceTrack: true,
      potentiallyUsefulForReplacementTrack: true,
      eligibleToCountAsIndependentAuthorityByThisGate: false as const,
      derivativeDependencyEstablishedByThisGate: false as const,
      explicitNegativeDerivativeFindingEstablishedByThisGate: false as const,
      independenceEstablishedByThisGate: false as const,
      remediationSelectedByThisRecord: false as const,
      numericWeight: null,
    }),
    Object.freeze({
      candidateId: 'candidate_sun_haiyi_mingli_guo_sanguan_gegan_yaoge' as const,
      authorOrAttribution: '孙海义',
      workTitle: '《命理过三关》',
      inspectedWitnessFinding:
        'A reproducible revised witness identifies 孙海义 as author, 北易 as organizer, and dates the author preface to summer 2004.',
      chronologyFinding:
        'The inspected 2004 witness is later than the 李涵辰 work chronology recorded above. This ordering alone does not prove textual dependence.',
      visibleStemScopeFinding:
        'The work explicitly distinguishes adjacent, separated, and remote heavenly-stem 生克耗泄 and states that separated/remote 生克耗泄 has no effect for the旺衰-analysis rule.',
      binaryInteractionFinding:
        'The passage says 隔干与遥隔的生克耗泄没有作用 and 干支隔不作用, creating a binary non-interaction signal with an explicit context limitation: the rule is for 旺衰 analysis and remote images may later be referenced after旺衰 is fixed.',
      derivativeRelationshipFinding:
        'Third-party historical discussion classifies 孙海义 among representatives of the 李涵辰-led 新派, and the core 隔不作用 doctrine materially overlaps. That is a lineage-dependency risk signal, not proof that the specific 孙海义 text was copied from 李涵辰; specific textual dependency remains unresolved.',
      semanticBridgeImpact:
        'The explicit context limitation is potentially useful for exception/condition analysis, but the lineage risk prevents this record from being counted as a new independent authority.',
      contradictionImpact:
        'The work itself narrows 隔不作用 to旺衰 determination and later allows遥象 reference, so any future bridge must preserve that contextual qualification rather than generalize a universal no-interaction rule.',
      prospectiveDeltaImpact:
        'No candidate-set delta is authorized. Before possible use as independent provenance, specific lineage adjudication would have to resolve the dependency risk under I132/I162.',
      sourceLocators: Object.freeze([
        'https://kknews.cc/zh-cn/culture/pgnjg8p.html',
        'https://www.dushu.com/guoxue/105325/1143245.html',
        'https://blog.sina.com.cn/s/blog_9b6237b80101kl7d.html',
      ]),
      boundedSearchQueries: Object.freeze([
        '孙海义 命理过三关 隔干 遥隔',
        '孙海义 李涵辰 新派',
        '命理过三关 隔不作用 李涵辰',
      ]),
      discoveryOutputRequirementIdsApplied: I163_DISCOVERY_OUTPUT_REQUIREMENT_IDS,
      exactSourceIdentityBound: true as const,
      reproducibleWitnessLocated: true as const,
      visibleStemScopeSignalPresent: true as const,
      explicitBinaryInteractionSignalPresent: true as const,
      sameWorkDuplicateWitnessNormalized: true as const,
      candidateAlreadyInCurrentV2CandidateSet: false as const,
      provenanceDisposition:
        'LINEAGE_DEPENDENCY_RISK_UNRESOLVED_NOT_ELIGIBLE_AS_INDEPENDENT_AUTHORITY' as const,
      potentiallyUsefulForNewProvenanceTrack: false,
      potentiallyUsefulForReplacementTrack: false,
      eligibleToCountAsIndependentAuthorityByThisGate: false as const,
      derivativeDependencyEstablishedByThisGate: false as const,
      explicitNegativeDerivativeFindingEstablishedByThisGate: false as const,
      independenceEstablishedByThisGate: false as const,
      remediationSelectedByThisRecord: false as const,
      numericWeight: null,
    }),
  ]);
}

function finalized(
  material: Omit<ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryEvidenceReport, 'evidenceRecordSetId'>,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryEvidenceReport {
  return {
    evidenceRecordSetId: `challenge_combination_support_channel_untouched_support_ke_visible_stem_threshold_provenance_remediation_candidate_discovery_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI164ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryEvidence(
  i163: ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryReadinessReviewReport,
): ChallengeCombinationSupportChannelUntouchedSupportEffectSourceKeVisibleStemInteractionThresholdMultiSourceCompositionProvenanceIndependenceRemediationCandidateDiscoveryEvidenceReport {
  const accepted = exactI163Accepted(i163);
  const records = accepted ? evidenceRecords() : Object.freeze([]);

  return finalized({
    evidenceVersion:
      I164_CHALLENGE_COMBINATION_SUPPORT_CHANNEL_UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_DISCOVERY_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_SOURCE_KE_VISIBLE_STEM_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_DISCOVERY_EVIDENCE'
      : 'I163_REMEDIATION_CANDIDATE_DISCOVERY_READINESS_INVALID',
    decision: accepted
      ? 'REMEDIATION_CANDIDATE_DISCOVERY_EXECUTED_ONE_NEW_PROVENANCE_CANDIDATE_AND_ONE_LINEAGE_RISK_SIGNAL_DISCOVERED_ZERO_INDEPENDENCE_OR_REMEDIATION_SELECTION'
      : 'REMEDIATION_CANDIDATE_DISCOVERY_NOT_EXECUTED',
    upstreamI163ReviewId: i163.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI163ReadinessAccepted: accepted,
    discoveryOutputRequirementIdsApplied: I163_DISCOVERY_OUTPUT_REQUIREMENT_IDS,
    discoveryOutputRequirementCount: 9,
    candidateEvidenceRecords: records,
    candidateEvidenceRecordCount: accepted ? 2 : 0,
    newProvenanceCandidatePendingAdjudicationCount: accepted ? 1 : 0,
    lineageDependencyRiskSignalCount: accepted ? 1 : 0,
    derivativeDependencyEstablishedCount: 0,
    explicitNegativeDerivativeFindingEstablishedCount: 0,
    independentNormativeProvenanceEstablishedCount: 0,
    liHanchenCandidateDiscovered: accepted,
    liHanchen1997_1999SelfDisclosedWorkChronologyRecorded: accepted,
    liHanchen2003InspectedEditionRecorded: accepted,
    liHanchenBinaryNonInteractionRuleRecorded: accepted,
    liHanchenIndependenceNotInferredFromAuthorshipOrChronology: accepted,
    sunHaiyiCandidateRecordedAsLineageRiskOnly: accepted,
    sunHaiyi2004WitnessRecorded: accepted,
    sunHaiyiSpecificTextualDependencyOnLiHanchenNotProven: accepted,
    thirdPartyNewSchoolLineageSignalRecorded: accepted,
    sameDoctrineSimilarityNotPromotedToDerivativeDependency: accepted,
    sameWorkDuplicateWitnessesNotCountedAsIndependentAuthority: accepted,
    newCandidateDiscoveryIsNotCandidateSetSelection: true,
    newCandidateDiscoveryIsNotCandidateReplacement: true,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    remediationCandidateDiscoveryExecutedByThisGate: accepted,
    remediationStrategySelectedByThisGate: false,
    remediationExecutionAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    candidateRemovedByThisGate: false,
    candidateReplacedByThisGate: false,
    evidenceReboundByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetReevaluationPerformedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
    sourceCountVotingAllowed: false,
    provenanceTierWeightingAllowed: false,
    productionPolicyExecutionAuthorized: false,
    actualCompositionPerformedByThisGate: false,
    multiSourceCompositionAuthorized: false,
    authorityAcquiredByThisGate: false,
    visibleStemBinaryEffectiveInteractionEligibilityResolved: false,
    thresholdRuleCreatedByThisGate: false,
    damageEvaluationAuthorized: false,
    classificationAuthorized: false,
    numericScoringAuthorized: false,
    hiddenStemInteractionEligibilityGapRemains: true,
    hiddenStemAuthorityGap:
      'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    recommendedNextGate: accepted
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_EVIDENCE_ADEQUACY_AND_LINEAGE_ADJUDICATION_READINESS_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_REMEDIATION_CANDIDATE_DISCOVERY_READINESS_REVIEW',
    notes: accepted
      ? Object.freeze([
          'I164 executes only the I163 discovery stage. It does not select or adopt a remediation strategy.',
          '李涵辰 is recorded as a new provenance candidate because stable authored witnesses and explicit visible-stem binary non-interaction semantics were found, but exact upstream lineage for the rule remains unresolved.',
          '孙海义 is recorded only as a lineage-dependency risk signal. Shared school lineage and doctrine similarity are not promoted into a specific derivative-dependency finding without direct evidence.',
          'Neither candidate counts as independent normative provenance at I164. The current v2 package and candidate set remain immutable and blocked.',
        ])
      : Object.freeze([
          'I163 readiness did not match the frozen discovery boundary. I164 discovery fails closed.',
        ]),
  });
}
