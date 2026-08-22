import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { I173Li1998PriorWitnessIdentityAcquisitionReadinessReviewReport } from './i173-li-1998-prior-witness-identity-acquisition-readiness-review.js';

export const I174_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_EVIDENCE_VERSION =
  'myeonghwa-li-1998-prior-witness-identity-acquisition-evidence-v1';

export type I174IdentityEvidenceFinding =
  | 'SATISFIED'
  | 'UNRESOLVED_AFTER_TARGETED_IDENTITY_DISCOVERY';

export type I174IdentityEvidenceFunctionId =
  | 'AUTHOR_OFFICIAL_CHRONOLOGY_OR_BIBLIOGRAPHIC_APPEARANCE_BASIS'
  | 'PUBLICATION_MEDIUM_OR_EXPLICIT_NONFORMAL_STATUS_METADATA'
  | 'REPRODUCIBLE_DIGITAL_OR_PHYSICAL_WITNESS_IDENTITY'
  | 'TARGET_CHAPTER_OR_PASSAGE_CONTENT_WITNESS'
  | 'SAME_AUTHOR_1998_TO_2004_DERIVATIVE_MATCH_EVIDENCE'
  | 'DUPLICATE_WITNESS_NORMALIZATION_METADATA';

export interface I174IdentityEvidenceRecord {
  functionId: I174IdentityEvidenceFunctionId;
  finding: I174IdentityEvidenceFinding;
  sourceLocators: readonly string[];
  evidenceSummary: readonly string[];
}

export interface I174Li1998PriorWitnessIdentityAcquisitionEvidenceReport {
  evidenceRecordSetId: string;
  evidenceVersion: string;
  status:
    | 'RESOLVED_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_EVIDENCE'
    | 'I173_IDENTITY_ACQUISITION_BOUNDARY_INVALID';
  decision:
    | 'LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_EXECUTED_FOUR_FUNCTIONS_SATISFIED_TWO_UNRESOLVED_PUBLICATION_MEDIUM_AND_CANONICAL_WITNESS_NORMALIZATION_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE'
    | 'LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_EVIDENCE_NOT_EXECUTED';
  upstreamI173ReviewId: string;
  policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy';
  policyVersion: 'v1-definition';
  adoptionVersion: 'v1-adoption';
  currentCandidateSetVersion: 'v1-candidate-set';
  currentInputPackageVersion: 'v2-input-package';
  exactI173BoundaryAccepted: boolean;
  targetPriorWitnessId: 'LI_SHUNXIANG_SIZHU_MINGLI_ZIXIU_JIAOCHENG_PUJIBAN_1998' | null;
  identityEvidenceRecords: readonly I174IdentityEvidenceRecord[];
  identityEvidenceRecordCount: 6 | 0;
  satisfiedFunctionCount: 4 | 0;
  unresolvedFunctionCount: 2 | 0;
  authorTitleAnd1998AppearanceBasisEstablished: boolean;
  authorOfficialChronologyLocator: 'https://www.sxw.cc/sjw/zj/' | null;
  formal1998PublisherOrIsbnEstablished: false;
  explicitNonformal1998PublicationStatusEstablished: false;
  publicationMediumOrEntityIdentityEstablished: false;
  later2002FormalEditionObserved: boolean;
  later2002FormalEditionIsbn: '9789627943679' | null;
  later2002FormalEditionBackProjectedTo1998: false;
  ambiguousUploaderFieldObserved: boolean;
  ambiguousUploaderFieldUsedAs1998PublicationStatus: false;
  publicReproducibleWitnessIdentityEstablished: boolean;
  publicContentWitnessLocators: readonly string[];
  targetChapterOrPassageWitnessIntegrityEstablished: boolean;
  targetPassageMatchTo2004WitnessEstablished: boolean;
  sameAuthor1998To2004DerivativeChainConfirmed: boolean;
  observedDigitalWitnessPageCounts: readonly number[];
  observedDigitalWitnessSizesMb: readonly number[];
  digitalWitnessVariantsObserved: boolean;
  canonicalDigitalWitnessNormalizationEstablished: false;
  digitalPageCountOrFileSizeDifferenceCreatesDistinctAuthority: false;
  derivativeDigitalCopiesCountAsIndependentAuthorities: false;
  identityEvidenceAdequateForImmediateRebindingByThisGate: false;
  evidenceRebindingSelectedByThisGate: false;
  evidenceRebindingExecutedByThisGate: false;
  candidateSelectedByThisGate: false;
  remediationStrategySelectedByThisGate: false;
  remediationExecutionAuthorizedByThisGate: false;
  candidateSetMutatedByThisGate: false;
  newCandidateSetVersionCreatedByThisGate: false;
  newInputPackageVersionCreatedByThisGate: false;
  provenanceIndependenceAdjudicatedByThisGate: false;
  independentNormativeProvenanceEstablishedCount: 0;
  I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false;
  I132IndependentNormativeProvenanceRequirementRemainsNormative: boolean;
  I132PolicyRelaxationAuthorizedByThisGate: false;
  chronologyAloneEstablishesIdentityOrIndependence: false;
  sameAuthorIdentityAloneEstablishesIndependence: false;
  publicationFormalityAloneEstablishesIndependence: false;
  searchSilenceCreatesNegativeFinding: false;
  sourceCountVotingAllowed: false;
  provenanceTierWeightingAllowed: false;
  externalLineageUnresolvedStatusPreserved: boolean;
  currentV2PackageAndCandidateSetRemainImmutable: boolean;
  currentV2ProvenanceDisposition: 'BLOCKED_UNDER_CURRENT_EVIDENCE' | 'NOT_ASSESSED';
  candidateSetReevaluationAuthorizedByThisGate: false;
  candidateSetAdmissibilityEstablishedByThisGate: false;
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
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PRIOR_WITNESS_IDENTITY_EVIDENCE_ADEQUACY_AND_REBINDING_READINESS_REVIEW'
    | 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_EVIDENCE';
  notes: readonly string[];
}

function exactI173Accepted(i173: I173Li1998PriorWitnessIdentityAcquisitionReadinessReviewReport): boolean {
  return (
    i173.status === 'RESOLVED_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_READINESS_REVIEW' &&
    i173.decision ===
      'I172_BOUNDARY_SUPPORTS_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_WITH_FORMAL_OR_EXPLICIT_NONFORMAL_PUBLICATION_PATHS_DUPLICATE_WITNESS_NORMALIZATION_REQUIRED_NO_REBINDING_NO_INDEPENDENCE' &&
    i173.policyId === 'myeonghwa-visible-stem-ke-multi-source-composition-policy' &&
    i173.policyVersion === 'v1-definition' &&
    i173.adoptionVersion === 'v1-adoption' &&
    i173.currentCandidateSetVersion === 'v1-candidate-set' &&
    i173.currentInputPackageVersion === 'v2-input-package' &&
    i173.exactI172BoundaryAccepted &&
    i173.targetPriorWitnessId === 'LI_SHUNXIANG_SIZHU_MINGLI_ZIXIU_JIAOCHENG_PUJIBAN_1998' &&
    i173.targetAuthor === '李顺祥' &&
    i173.targetTitle === '四柱命理学自修教程（普及班）' &&
    i173.targetAppearanceYear === 1998 &&
    i173.targetAppearanceBasisMustBeEvidenceBound &&
    i173.formalPublisherOrIsbnRequiredUnconditionally === false &&
    i173.formalPublicationIdentityPathPermitted &&
    i173.explicitNonformalPublicationIdentityPathPermitted &&
    i173.explicitNonformalStatusMaySubstituteForInventedPublisherMetadata &&
    i173.unknownPublicationStatusMayBePromotedToFormalPublication === false &&
    i173.reproduciblePublicWitnessLocatorRequired &&
    i173.targetChapterOrPassageWitnessIntegrityRequired &&
    i173.targetPassageMatchTo2004WitnessRequired &&
    i173.duplicateDigitalWitnessNormalizationRequired &&
    i173.digitalPageCountMismatchAloneCreatesDistinctWorkIdentity === false &&
    i173.derivativeDigitalCopiesMayBeCountedAsIndependentAuthorities === false &&
    i173.sameAuthor1998To2004DerivativeChainMustRemainBound &&
    i173.externalLineageUnresolvedStatusMustRemainPreserved &&
    i173.identityAcquisitionControlCount === 12 &&
    i173.identityAcquisitionControlsFrozenProspectively &&
    i173.identityEvidenceFunctionCount === 6 &&
    i173.publicationIdentityPathCount === 2 &&
    i173.priorWitnessIdentityAcquisitionEvidenceMayProceed &&
    i173.authorizationIsIdentityEvidenceCollection &&
    i173.authorizationIsEvidenceRebinding === false &&
    i173.authorizationIsCandidateReplacement === false &&
    i173.authorizationIsCandidateSelection === false &&
    i173.authorizationIsRemediationExecution === false &&
    i173.evidenceRebindingSelectedByThisGate === false &&
    i173.evidenceRebindingExecutedByThisGate === false &&
    i173.candidateSetMutatedByThisGate === false &&
    i173.newCandidateSetVersionCreatedByThisGate === false &&
    i173.newInputPackageVersionCreatedByThisGate === false &&
    i173.provenanceIndependenceAdjudicatedByThisGate === false &&
    i173.independentNormativeProvenanceEstablishedCount === 0 &&
    i173.I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate === false &&
    i173.I132IndependentNormativeProvenanceRequirementRemainsNormative &&
    i173.I132PolicyRelaxationAuthorizedByThisGate === false &&
    i173.chronologyAloneEstablishesIdentityOrIndependence === false &&
    i173.sameAuthorIdentityAloneEstablishesIndependence === false &&
    i173.publicationFormalityAloneEstablishesIndependence === false &&
    i173.searchSilenceCreatesNegativeFinding === false &&
    i173.sourceCountVotingAllowed === false &&
    i173.provenanceTierWeightingAllowed === false &&
    i173.currentV2PackageAndCandidateSetRemainImmutable &&
    i173.currentV2ProvenanceDisposition === 'BLOCKED_UNDER_CURRENT_EVIDENCE' &&
    i173.candidateSetReevaluationAuthorizedByThisGate === false &&
    i173.candidateSetAdmissibilityEstablishedByThisGate === false &&
    i173.productionPolicyExecutionAuthorized === false &&
    i173.actualCompositionPerformedByThisGate === false &&
    i173.multiSourceCompositionAuthorized === false &&
    i173.authorityAcquiredByThisGate === false &&
    i173.visibleStemBinaryEffectiveInteractionEligibilityResolved === false &&
    i173.thresholdRuleCreatedByThisGate === false &&
    i173.damageEvaluationAuthorized === false &&
    i173.classificationAuthorized === false &&
    i173.numericScoringAuthorized === false &&
    i173.hiddenStemInteractionEligibilityGapRemains &&
    i173.hiddenStemAuthorityGap === 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED' &&
    i173.recommendedNextGate ===
      'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_EVIDENCE'
  );
}

function evidenceRecords(): readonly I174IdentityEvidenceRecord[] {
  return Object.freeze([
    {
      functionId: 'AUTHOR_OFFICIAL_CHRONOLOGY_OR_BIBLIOGRAPHIC_APPEARANCE_BASIS',
      finding: 'SATISFIED',
      sourceLocators: Object.freeze([
        'https://www.sxw.cc/sjw/zj/',
        'https://www.sxw.cc/e/action/ShowInfo.php?classid=1&id=612',
      ]),
      evidenceSummary: Object.freeze([
        'The author official chronology identifies 李顺祥 as author and states that 四柱命理学自修教程（普及班） formally appeared in 1998.',
        'This establishes author/title/appearance-year basis only; it does not by itself establish publication medium or independence.',
      ]),
    },
    {
      functionId: 'PUBLICATION_MEDIUM_OR_EXPLICIT_NONFORMAL_STATUS_METADATA',
      finding: 'UNRESOLVED_AFTER_TARGETED_IDENTITY_DISCOVERY',
      sourceLocators: Object.freeze([
        'https://www.sxw.cc/sjw/zj/',
        'https://www.xinyi.hk/goods-1387.html?from=rss',
        'https://r1689.com/m/view.php?aid=349',
      ]),
      evidenceSummary: Object.freeze([
        'The official chronology records 1998 appearance but does not identify a 1998 publisher or ISBN in the inspected witness.',
        'A later 2002 formal edition with ISBN 9789627943679 is observable, but later formal metadata is not back-projected to the 1998 witness.',
        'A download-site field rendering 非正式出版 is an uploader/metadata field and is insufficient to establish the 1998 publication medium.',
      ]),
    },
    {
      functionId: 'REPRODUCIBLE_DIGITAL_OR_PHYSICAL_WITNESS_IDENTITY',
      finding: 'SATISFIED',
      sourceLocators: Object.freeze([
        'https://www.6yao.com/thread-65487-1-1.html',
        'https://www.scribd.com/document/778943746/%E6%97%A5%E5%B9%B2',
        'https://www.guoxueziyuan.com/3415.html',
      ]),
      evidenceSummary: Object.freeze([
        'Multiple publicly addressable witnesses identify the work title and author and expose or catalog reproducible content/file witnesses.',
        'This is work/content witness identity evidence, not a finding that one observed scan is canonical.',
      ]),
    },
    {
      functionId: 'TARGET_CHAPTER_OR_PASSAGE_CONTENT_WITNESS',
      finding: 'SATISFIED',
      sourceLocators: Object.freeze([
        'https://www.6yao.com/thread-65487-1-1.html',
        'https://www.scribd.com/document/778943746/%E6%97%A5%E5%B9%B2',
      ]),
      evidenceSummary: Object.freeze([
        'Public witnesses explicitly bind the excerpt to 四柱命理学自修教程（普及班）, chapter nine 日干, authored by 李顺祥.',
        'The target section 干支紧密度及其生克力量 contains the position/distance-to-force semantics relevant to the governed threshold research question.',
      ]),
    },
    {
      functionId: 'SAME_AUTHOR_1998_TO_2004_DERIVATIVE_MATCH_EVIDENCE',
      finding: 'SATISFIED',
      sourceLocators: Object.freeze([
        'https://www.6yao.com/thread-65487-1-1.html',
        'https://www.scribd.com/document/744311908/04-2004%E5%B9%B406%E6%9C%88%E7%AC%AC1%E7%89%88-%E5%9B%9B%E6%9F%B1%E7%8E%84%E6%9C%BA-%E5%BC%A0%E5%BF%97%E6%98%A5%E4%B8%BB%E7%BC%96-%E6%9D%8E%E9%A1%BA%E7%A5%A5%E7%BC%96',
      ]),
      evidenceSummary: Object.freeze([
        'The 1998-title excerpt and the 2004 四柱玄机 witness use the same chapter/section structure and materially matching target-rule exposition.',
        'This confirms the already frozen same-author derivative-chain direction for witness handling; it does not establish independence from external lineage.',
      ]),
    },
    {
      functionId: 'DUPLICATE_WITNESS_NORMALIZATION_METADATA',
      finding: 'UNRESOLVED_AFTER_TARGETED_IDENTITY_DISCOVERY',
      sourceLocators: Object.freeze([
        'https://www.guoxueziyuan.com/3415.html',
        'https://r1689.com/m/view.php?aid=349',
        'https://www.linglonghui.com/?dir=%2F%E5%85%AB%E5%AD%97%E7%94%B5%E5%AD%90%E4%B9%A6%E5%90%88%E9%9B%86&tag=34&ts=34',
      ]),
      evidenceSummary: Object.freeze([
        'Public catalogs expose at least 314-page and 413-page representations and file-size variants for the same named work.',
        'No inspected evidence establishes a canonical scan or proves that page-count/file-size variants represent distinct normative work identities.',
      ]),
    },
  ]);
}

function finalized(
  material: Omit<I174Li1998PriorWitnessIdentityAcquisitionEvidenceReport, 'evidenceRecordSetId'>,
): I174Li1998PriorWitnessIdentityAcquisitionEvidenceReport {
  return {
    evidenceRecordSetId: `i174_li_1998_identity_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildI174Li1998PriorWitnessIdentityAcquisitionEvidence(
  i173: I173Li1998PriorWitnessIdentityAcquisitionReadinessReviewReport,
): I174Li1998PriorWitnessIdentityAcquisitionEvidenceReport {
  const accepted = exactI173Accepted(i173);
  const records = accepted ? evidenceRecords() : Object.freeze([] as I174IdentityEvidenceRecord[]);

  return finalized({
    evidenceVersion: I174_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_EVIDENCE'
      : 'I173_IDENTITY_ACQUISITION_BOUNDARY_INVALID',
    decision: accepted
      ? 'LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_EXECUTED_FOUR_FUNCTIONS_SATISFIED_TWO_UNRESOLVED_PUBLICATION_MEDIUM_AND_CANONICAL_WITNESS_NORMALIZATION_UNRESOLVED_NO_REBINDING_NO_INDEPENDENCE'
      : 'LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_EVIDENCE_NOT_EXECUTED',
    upstreamI173ReviewId: i173.reviewId,
    policyId: 'myeonghwa-visible-stem-ke-multi-source-composition-policy',
    policyVersion: 'v1-definition',
    adoptionVersion: 'v1-adoption',
    currentCandidateSetVersion: 'v1-candidate-set',
    currentInputPackageVersion: 'v2-input-package',
    exactI173BoundaryAccepted: accepted,
    targetPriorWitnessId: accepted ? 'LI_SHUNXIANG_SIZHU_MINGLI_ZIXIU_JIAOCHENG_PUJIBAN_1998' : null,
    identityEvidenceRecords: records,
    identityEvidenceRecordCount: accepted ? 6 : 0,
    satisfiedFunctionCount: accepted ? 4 : 0,
    unresolvedFunctionCount: accepted ? 2 : 0,
    authorTitleAnd1998AppearanceBasisEstablished: accepted,
    authorOfficialChronologyLocator: accepted ? 'https://www.sxw.cc/sjw/zj/' : null,
    formal1998PublisherOrIsbnEstablished: false,
    explicitNonformal1998PublicationStatusEstablished: false,
    publicationMediumOrEntityIdentityEstablished: false,
    later2002FormalEditionObserved: accepted,
    later2002FormalEditionIsbn: accepted ? '9789627943679' : null,
    later2002FormalEditionBackProjectedTo1998: false,
    ambiguousUploaderFieldObserved: accepted,
    ambiguousUploaderFieldUsedAs1998PublicationStatus: false,
    publicReproducibleWitnessIdentityEstablished: accepted,
    publicContentWitnessLocators: accepted
      ? Object.freeze([
          'https://www.6yao.com/thread-65487-1-1.html',
          'https://www.scribd.com/document/778943746/%E6%97%A5%E5%B9%B2',
        ])
      : Object.freeze([]),
    targetChapterOrPassageWitnessIntegrityEstablished: accepted,
    targetPassageMatchTo2004WitnessEstablished: accepted,
    sameAuthor1998To2004DerivativeChainConfirmed: accepted,
    observedDigitalWitnessPageCounts: accepted ? Object.freeze([314, 413]) : Object.freeze([]),
    observedDigitalWitnessSizesMb: accepted ? Object.freeze([47.37, 47.44]) : Object.freeze([]),
    digitalWitnessVariantsObserved: accepted,
    canonicalDigitalWitnessNormalizationEstablished: false,
    digitalPageCountOrFileSizeDifferenceCreatesDistinctAuthority: false,
    derivativeDigitalCopiesCountAsIndependentAuthorities: false,
    identityEvidenceAdequateForImmediateRebindingByThisGate: false,
    evidenceRebindingSelectedByThisGate: false,
    evidenceRebindingExecutedByThisGate: false,
    candidateSelectedByThisGate: false,
    remediationStrategySelectedByThisGate: false,
    remediationExecutionAuthorizedByThisGate: false,
    candidateSetMutatedByThisGate: false,
    newCandidateSetVersionCreatedByThisGate: false,
    newInputPackageVersionCreatedByThisGate: false,
    provenanceIndependenceAdjudicatedByThisGate: false,
    independentNormativeProvenanceEstablishedCount: 0,
    I132IndependentNormativeProvenanceRequirementSatisfiedByThisGate: false,
    I132IndependentNormativeProvenanceRequirementRemainsNormative: accepted,
    I132PolicyRelaxationAuthorizedByThisGate: false,
    chronologyAloneEstablishesIdentityOrIndependence: false,
    sameAuthorIdentityAloneEstablishesIndependence: false,
    publicationFormalityAloneEstablishesIndependence: false,
    searchSilenceCreatesNegativeFinding: false,
    sourceCountVotingAllowed: false,
    provenanceTierWeightingAllowed: false,
    externalLineageUnresolvedStatusPreserved: accepted,
    currentV2PackageAndCandidateSetRemainImmutable: accepted,
    currentV2ProvenanceDisposition: accepted ? 'BLOCKED_UNDER_CURRENT_EVIDENCE' : 'NOT_ASSESSED',
    candidateSetReevaluationAuthorizedByThisGate: false,
    candidateSetAdmissibilityEstablishedByThisGate: false,
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
    hiddenStemAuthorityGap: 'SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED',
    recommendedNextGate: accepted
      ? 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PRIOR_WITNESS_IDENTITY_EVIDENCE_ADEQUACY_AND_REBINDING_READINESS_REVIEW'
      : 'UNTOUCHED_SUPPORT_EFFECT_SOURCE_KE_VISIBLE_STEM_INTERACTION_THRESHOLD_MULTI_SOURCE_COMPOSITION_PROVENANCE_INDEPENDENCE_LI_1998_PRIOR_WITNESS_IDENTITY_ACQUISITION_EVIDENCE',
    notes: accepted
      ? Object.freeze([
          'Author/title/1998 appearance, public witness availability, target content, and same-author 1998-to-2004 passage continuity are evidence-supported.',
          'The 1998 publication medium/entity remains unresolved because no inspected source securely binds 1998 to a publisher/ISBN or explicit nonformal publication status.',
          'The later 2002 ISBN edition is edition-lineage evidence only and is not back-projected as 1998 metadata.',
          'Public digital variants remain unnormalized to a canonical scan; page-count and file-size differences do not create distinct authority identities.',
          'No evidence rebinding, independence adjudication, candidate mutation, or production authorization occurs in I174.',
        ])
      : Object.freeze([
          'I173 boundary mismatch prevents execution of the bounded 1998 identity evidence acquisition.',
        ]),
  });
}
