import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS } from './relationship-spouse-t8-authority-acquisition-readiness-review.js';
import {
  RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
  RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_TASKS,
  type RelationshipSpouseT8CurrentMethodResidualAcquisitionTaskId,
  type RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionReadinessReviewReport,
} from './relationship-spouse-t8-current-method-residual-authority-acquisition-readiness-review.js';

export const RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_VERSION =
  'myeonghwa-relationship-spouse-t8-current-method-residual-authority-acquisition-evidence-v1' as const;

export type RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionDisposition =
  | 'QUALIFYING_EVIDENCE_ACQUIRED'
  | 'PARTIAL_EVIDENCE_ACQUIRED'
  | 'PAGE_BINDING_NOT_ESTABLISHED'
  | 'DIRECT_IMAGE_ACCESS_BLOCKED'
  | 'PRIMARY_WITNESS_NOT_FOUND'
  | 'PROVENANCE_INSUFFICIENT'
  | 'APPLICABILITY_AUTHORITY_NOT_FOUND'
  | 'COMPOSITION_SCOPE_AUTHORITY_NOT_FOUND'
  | 'SEMANTIC_MISMATCH'
  | 'SCOPE_INCOMPATIBLE';

export type RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionSourceClass =
  | 'PRIMARY_FACSIMILE_SCAN_AND_INDEXED_TRANSCRIPTION'
  | 'PRIMARY_FACSIMILE_PAGE'
  | 'SCHOLARLY_MODERN_ARTICLE'
  | 'PRIMARY_TRADITIONAL_METHOD_TEXT';

export interface RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceRecord {
  taskId: RelationshipSpouseT8CurrentMethodResidualAcquisitionTaskId;
  sourceIdentity: string;
  sourceClass: RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionSourceClass;
  exactLocator: string;
  inspectedSurface: string;
  inspectedAt: '2026-09-05';
  directPrimaryImageInspected: boolean;
  boundedContextInspected: boolean;
  historicalSpouseSemanticBindingObserved: boolean;
  applicabilityExplicit: boolean;
  sourceProvenanceIndependent: boolean;
  independentNormativeProvenanceAdequate: boolean;
  eligibleCurrentUpstreamClaimClassesExplicit: boolean;
  multiClaimCompositionExplicit: boolean;
  conflictOrAmbiguityHandlingExplicit: boolean;
  positiveScopeExclusionsAndExceptionsExplicit: boolean;
  currentGovernedMethodCompatible: boolean;
  currentGovernedMethodSemanticCorrespondenceEstablished: boolean;
  disposition: RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionDisposition;
  secondaryDispositions: readonly RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionDisposition[];
  qualifyingCandidate: false;
  authorityAdmissionAuthorized: false;
  gapClosureAuthorized: false;
  evidenceNote: string;
}

function record(
  value: RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceRecord,
): RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceRecord {
  return Object.freeze(value);
}

export const RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_RECORDS =
  Object.freeze([
    record({
      taskId: 'WYG_DIRECT_PRIMARY_IMAGE_AUTHORITY_ACQUISITION',
      sourceIdentity:
        '景印文淵閣四庫全書 第0810冊 / 三命通會; supporting exact WYG folio transcription from Kanripo KR3g0042/WYG/005 and KR3g0042/WYG/006',
      sourceClass: 'PRIMARY_FACSIMILE_SCAN_AND_INDEXED_TRANSCRIPTION',
      exactLocator:
        '文淵閣四庫全書 0810冊 scan container, 三命通會 scan-index range 1-692; Kanripo WYG/005 folios 005-2a through 005-3a and WYG/006 folios 006-89b through 006-90a',
      inspectedSurface:
        'The 0810 primary scan container identity and bounded indexed WYG folio contexts were rechecked. The indexed text contains 妻財 / 正妻 / 偏妻 and 官煞者夫也財者妻也 historical role language, but no exact folio-to-0810 scan-page binding was established and therefore the required target primary page image was not inspected.',
      inspectedAt: '2026-09-05',
      directPrimaryImageInspected: false,
      boundedContextInspected: true,
      historicalSpouseSemanticBindingObserved: true,
      applicabilityExplicit: false,
      sourceProvenanceIndependent: false,
      independentNormativeProvenanceAdequate: false,
      eligibleCurrentUpstreamClaimClassesExplicit: false,
      multiClaimCompositionExplicit: false,
      conflictOrAmbiguityHandlingExplicit: false,
      positiveScopeExclusionsAndExceptionsExplicit: false,
      currentGovernedMethodCompatible: false,
      currentGovernedMethodSemanticCorrespondenceEstablished: false,
      disposition: 'PAGE_BINDING_NOT_ESTABLISHED',
      secondaryDispositions: Object.freeze(['PARTIAL_EVIDENCE_ACQUIRED']),
      qualifyingCandidate: false,
      authorityAdmissionAuthorized: false,
      gapClosureAuthorized: false,
      evidenceNote:
        'WYG navigation and historical role correspondence remain useful lead evidence only. The frozen acquisition contract expressly requires exact folio-to-scan-page binding plus direct target-image inspection; indexed text cannot substitute for that evidence.',
    }),
    record({
      taskId: 'YUANHAI_PRIMARY_PASSAGE_AUTHORITY_ACQUISITION',
      sourceIdentity:
        '刻京臺增補淵海子平大全 第2冊, 卷之三, 明萬曆[1573-1620]刻本, National Library of China digitized ancient book NLC892-2642-210288',
      sourceClass: 'PRIMARY_FACSIMILE_PAGE',
      exactLocator:
        'Wikimedia Commons File:NLC892-2642-210288 刻京臺增補淵海子平大全 第2冊.pdf, 30-page scan; PDF zero-based page 14 (viewer page 15), continued zero-based page 15 (viewer page 16), 論六親總要 / 六親捷要歌 local context',
      inspectedSurface:
        'The direct institutional facsimile page was inspected. The target page visibly enters 論六親總要 after the adjacent 六親 diagram material, and the following page continues the bounded section including 六親捷要歌. This upgrades the prior OCR/container lead to passage-level primary-image verification for this witness.',
      inspectedAt: '2026-09-05',
      directPrimaryImageInspected: true,
      boundedContextInspected: true,
      historicalSpouseSemanticBindingObserved: true,
      applicabilityExplicit: false,
      sourceProvenanceIndependent: true,
      independentNormativeProvenanceAdequate: false,
      eligibleCurrentUpstreamClaimClassesExplicit: false,
      multiClaimCompositionExplicit: false,
      conflictOrAmbiguityHandlingExplicit: false,
      positiveScopeExclusionsAndExceptionsExplicit: false,
      currentGovernedMethodCompatible: false,
      currentGovernedMethodSemanticCorrespondenceEstablished: false,
      disposition: 'PARTIAL_EVIDENCE_ACQUIRED',
      secondaryDispositions: Object.freeze(['PROVENANCE_INSUFFICIENT', 'SEMANTIC_MISMATCH']),
      qualifyingCandidate: false,
      authorityAdmissionAuthorized: false,
      gapClosureAuthorized: false,
      evidenceNote:
        'The exact primary-image requirement for the Yuanhai target context is materially advanced. It still does not establish independent normative genealogy, modern gender-neutral applicability, or correspondence to the current five governed T5 family_presence claim classes. Work-identity independence from 三命通會 is not itself enough for normative authority admission.',
    }),
    record({
      taskId: 'MODERN_APPLICABILITY_NORMATIVE_PROVENANCE_ACQUISITION',
      sourceIdentity:
        '김만태, 배우자 인연의 중시로서 궁합(宮合)에 관한 고찰, 한류문화연구 5(3), 2025, pp.143-168, DOI 10.58936/gcr.2025.9.5.3.143; compared against current practitioner/editorial gender-neutral spouse-policy leads',
      sourceClass: 'SCHOLARLY_MODERN_ARTICLE',
      exactLocator:
        'KCI ART003250308 / DOI 10.58936/gcr.2025.9.5.3.143, abstract and bibliographic record; retained web-policy leads remain non-scholarly practitioner/editorial surfaces',
      inspectedSurface:
        'A higher-provenance modern scholarly source was located and inspected at the bibliographic/abstract level. It treats spousal compatibility and explicitly frames the marital case as a man and woman forming a family; it does not provide the required gender-neutral spouse-natal applicability policy, no-sex/no-orientation inference contract, or a bridge preserving historical role meaning for this product scope.',
      inspectedAt: '2026-09-05',
      directPrimaryImageInspected: false,
      boundedContextInspected: true,
      historicalSpouseSemanticBindingObserved: true,
      applicabilityExplicit: false,
      sourceProvenanceIndependent: true,
      independentNormativeProvenanceAdequate: false,
      eligibleCurrentUpstreamClaimClassesExplicit: false,
      multiClaimCompositionExplicit: false,
      conflictOrAmbiguityHandlingExplicit: false,
      positiveScopeExclusionsAndExceptionsExplicit: false,
      currentGovernedMethodCompatible: false,
      currentGovernedMethodSemanticCorrespondenceEstablished: false,
      disposition: 'APPLICABILITY_AUTHORITY_NOT_FOUND',
      secondaryDispositions: Object.freeze(['SCOPE_INCOMPATIBLE', 'PROVENANCE_INSUFFICIENT']),
      qualifyingCandidate: false,
      authorityAdmissionAuthorized: false,
      gapClosureAuthorized: false,
      evidenceNote:
        'Higher provenance alone is insufficient. The located scholarly item is compatibility-scoped and does not satisfy the frozen gender-neutral spouse-natal applicability contract. The retained practitioner/editorial policy pages remain inadequate normative provenance and cannot repair the gap by stitching.',
    }),
    record({
      taskId: 'EXACT_CURRENT_CLAIM_CLASS_COMPOSITION_AUTHORITY_ACQUISITION',
      sourceIdentity:
        '子平真詮, 論宮分用神配六親 / 論妻子 current-method comparison surface; bounded spouse method cross-checked against the governed upstream T5 family_presence contract',
      sourceClass: 'PRIMARY_TRADITIONAL_METHOD_TEXT',
      exactLocator:
        '子平真詮 論宮分用神配六親 and 論妻子 passages: 妻宮 + 妻星/財 + 月令用神 + 喜忌 + 格局 contextual composition; current repository upstream classes are TEN_GOD_FAMILY_PEER_PRESENT / RESOURCE_PRESENT / OUTPUT_PRESENT / WEALTH_PRESENT / OFFICER_PRESENT',
      inspectedSurface:
        'The traditional spouse method explicitly rejects single-factor reading and composes 妻宮, 妻星, 月令用神, 喜忌 and 格局 with counterexamples where the apparent local symbol reverses under broader context. That is genuine multi-factor methodology, but it consumes a different semantic substrate from the current five broad family_presence T5 claim classes and also requires context not established on the current relationship T6 path.',
      inspectedAt: '2026-09-05',
      directPrimaryImageInspected: true,
      boundedContextInspected: true,
      historicalSpouseSemanticBindingObserved: true,
      applicabilityExplicit: false,
      sourceProvenanceIndependent: true,
      independentNormativeProvenanceAdequate: false,
      eligibleCurrentUpstreamClaimClassesExplicit: false,
      multiClaimCompositionExplicit: true,
      conflictOrAmbiguityHandlingExplicit: true,
      positiveScopeExclusionsAndExceptionsExplicit: true,
      currentGovernedMethodCompatible: false,
      currentGovernedMethodSemanticCorrespondenceEstablished: false,
      disposition: 'SEMANTIC_MISMATCH',
      secondaryDispositions: Object.freeze(['COMPOSITION_SCOPE_AUTHORITY_NOT_FOUND']),
      qualifyingCandidate: false,
      authorityAdmissionAuthorized: false,
      gapClosureAuthorized: false,
      evidenceNote:
        'This is not a license to retrofit the current family_presence claims. It demonstrates a multi-factor spouse methodology whose required inputs are 妻宮/妻星/月令用神/喜忌/格局 rather than the exact current governed T5 classes. Adopting that substrate would be a separate methodology/producer authority decision, not evidence that the existing contract is already composition-ready.',
    }),
  ] as const satisfies readonly RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceRecord[]);

export const RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_CONTROL_IDS =
  Object.freeze([
    'FOUR_FROZEN_CURRENT_METHOD_ACQUISITION_TASKS_EXECUTED_AS_EVIDENCE_RECORDS',
    'WYG_FOLIO_TO_0810_PAGE_BINDING_STILL_NOT_ESTABLISHED_NO_IMAGE_SUBSTITUTION',
    'YUANHAI_NLC892_2642_210288_DIRECT_TARGET_PRIMARY_IMAGE_AND_BOUNDED_CONTEXT_VERIFIED',
    'YUANHAI_PRIMARY_IMAGE_PROGRESS_DOES_NOT_ESTABLISH_INDEPENDENT_NORMATIVE_AUTHORITY',
    'HIGHER_PROVENANCE_MODERN_COMPATIBILITY_SOURCE_DOES_NOT_SATISFY_GENDER_NEUTRAL_SPOUSE_NATAL_APPLICABILITY',
    'PRACTITIONER_OR_EDITORIAL_GENDER_NEUTRAL_POLICY_CANNOT_UPGRADE_NORMATIVE_PROVENANCE',
    'ZIPING_SPOUSE_METHOD_IS_MULTI_FACTOR_BUT_CONSUMES_DIFFERENT_SEMANTIC_INPUTS',
    'CURRENT_FIVE_T5_FAMILY_PRESENCE_CLAIM_CLASSES_HAVE_NO_EXPLICIT_SPOUSE_COMPOSITION_AUTHORITY',
    'CURRENT_RELATIONSHIP_T6_INPUT_PATH_REMAINS_ABSENT',
    'NO_CROSS_SOURCE_OR_CROSS_TASK_STITCHING_TO_SIMULATE_COMPLETE_AUTHORITY',
    'NO_HISTORICAL_GENDER_ROLE_UNIVERSALIZATION_OR_USER_PARTNER_SEX_OR_ORIENTATION_INFERENCE',
    'NEGATIVE_PARTIAL_AND_SCOPE_MISMATCH_EVIDENCE_IS_FIRST_CLASS_EVIDENCE',
    'ACQUISITION_EVIDENCE_DOES_NOT_AUTO_ADMIT_AUTHORITY_OR_CLOSE_ANY_GAP',
    'ALL_FIVE_GAPS_REMAIN_OPEN_NO_SPOUSE_T8_SEMANTIC_OR_PRODUCT_ARTIFACT',
  ] as const);

export interface RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceReport {
  evidenceId: string;
  evidenceVersion: typeof RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_VERSION;
  status:
    | 'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE'
    | 'UPSTREAM_CURRENT_METHOD_ACQUISITION_READINESS_INVALID';
  decision:
    | 'PARTIAL_EVIDENCE_ACQUIRED_ZERO_QUALIFYING_AUTHORITY_ALL_FIVE_GAPS_REMAIN_OPEN'
    | 'CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_NOT_EXECUTED';
  upstreamReadinessReviewId: string;
  exactReadinessBoundaryAccepted: boolean;
  domain: 'relationship';
  subcategory: 'spouse';
  temporalScope: 'natal';
  statusClass: 'research';
  executionPerformed: boolean;
  taskEvidenceRecords: readonly RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceRecord[];
  taskEvidenceRecordCount: 4 | 0;
  qualifyingAuthorityCandidateCount: 0;
  authorityAcceptedCandidateCount: 0;
  wygFolioTo0810ScanPageBindingEstablished: false;
  wygDirectTargetPageImageInspected: false;
  yuanhaiExactPrimaryPassagePageLocatorEstablished: boolean;
  yuanhaiDirectPrimaryPassageImageInspected: boolean;
  yuanhaiBoundedPrimaryContextInspected: boolean;
  yuanhaiWorkIdentityIndependentFromSamyeong: boolean;
  independentNormativeProvenanceEstablished: false;
  higherProvenanceModernSourceLocated: boolean;
  explicitGenderNeutralSpouseNatalApplicabilityEstablished: false;
  explicitNoUserPartnerSexOrOrientationInferenceEstablished: false;
  modernApplicabilityNormativeAuthorityAdequateCount: 0;
  zipingMultiFactorSpouseCompositionObserved: boolean;
  exactCurrentClaimClassCompositionAuthorityEstablished: false;
  currentGovernedMethodSemanticCorrespondenceEstablished: false;
  negativePartialAndMismatchEvidencePreserved: boolean;
  crossSourceStitchingAuthorized: false;
  crossTaskStitchingAuthorized: false;
  historicalGenderRoleUniversalizationAuthorized: false;
  currentRelationshipT6InputPathEstablished: false;
  relationshipT6ExecutionTaskCreated: false;
  allFiveGapsRemainOpen: true;
  unresolvedGapIds: readonly string[];
  authorityAcquiredByThisGate: false;
  authorityGapClosedByThisGate: false;
  spouseT8RuleAuthoringAuthorized: false;
  spouseT8ClaimTypeCreationAuthorized: false;
  spouseInterpretationPackCreationAuthorized: false;
  consumerNarrativeAuthorized: false;
  compatibilityAuthorityAuthorized: false;
  previewDefaultSwitchAuthorized: false;
  productionPromotionAuthorized: false;
  controlIds: readonly (typeof RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_CONTROL_IDS)[number][];
  controlCount: 14 | 0;
  controlsFrozen: boolean;
  implementationEffects: {
    acquisitionExecutionsPerformed: 4 | 0;
    evidenceRecordsCreated: 4 | 0;
    directPrimaryTargetPagesNewlyVerified: 1 | 0;
    higherProvenanceModernSourcesAssessed: 1 | 0;
    registeredSourcesCreated: 0;
    registeredCandidatesCreated: 0;
    authorityCandidatesAccepted: 0;
    authorityGapsClosed: 0;
    methodologyChoicesMade: 0;
    ruleDefinitionsCreated: 0;
    claimTypesCreated: 0;
    interpretationPacksCreated: 0;
    narrativePlansCreated: 0;
    previewRoutesChanged: 0;
  };
  recommendedNextGate:
    | 'RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW'
    | 'RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW';
}

const ALL_GAP_IDS = Object.freeze(
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS.map((requirement) => requirement.gapId),
);

function contentAddressedReadinessIdentityValid(
  readiness: RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionReadinessReviewReport,
): boolean {
  const { reviewId, ...material } = readiness;
  return (
    reviewId ===
    `relationship_spouse_t8_current_method_residual_authority_acquisition_readiness_${deterministicContentHash(material).slice(0, 24)}`
  );
}

function exactReadinessBoundaryAccepted(
  readiness: RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionReadinessReviewReport,
): boolean {
  return (
    contentAddressedReadinessIdentityValid(readiness) &&
    readiness.reviewVersion ===
      RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION &&
    readiness.status ===
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS' &&
    readiness.decision ===
      'FOUR_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_TASKS_READY_NO_AUTHORITY_ACQUIRED' &&
    readiness.exactMethodBoundaryAccepted &&
    readiness.acquisitionTaskCount === 4 &&
    deterministicContentHash(readiness.acquisitionTasks) ===
      deterministicContentHash(RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_TASKS) &&
    readiness.executableResidualClassCount === 4 &&
    readiness.wygDirectPrimaryImageAcquisitionReady &&
    readiness.yuanhaiPrimaryPassageAcquisitionReady &&
    readiness.modernApplicabilityProvenanceAcquisitionReady &&
    readiness.exactCurrentClaimClassCompositionAcquisitionReady &&
    readiness.acquisitionExecutionAuthorizedForNextGate &&
    readiness.acquisitionPerformedByThisGate === false &&
    readiness.authorityAcquiredByThisGate === false &&
    readiness.authorityGapClosedByThisGate === false &&
    readiness.crossSourceStitchingAuthorized === false &&
    readiness.currentRelationshipT6InputPathEstablished === false &&
    readiness.allFiveGapsRemainOpen &&
    deterministicContentHash(readiness.unresolvedGapIds) === deterministicContentHash(ALL_GAP_IDS) &&
    readiness.spouseT8RuleAuthoringAuthorized === false &&
    readiness.productionPromotionAuthorized === false &&
    readiness.controlsFrozen &&
    readiness.controlCount === 14 &&
    deterministicContentHash(readiness.controlIds) ===
      deterministicContentHash(
        RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_CONTROL_IDS,
      ) &&
    readiness.recommendedNextGate ===
      'RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE'
  );
}

function finalized(
  material: Omit<RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceReport, 'evidenceId'>,
): RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceReport {
  return {
    evidenceId: `relationship_spouse_t8_current_method_residual_authority_acquisition_evidence_${deterministicContentHash(material).slice(0, 24)}`,
    ...material,
  };
}

export function buildRelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidence(
  readiness: RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionReadinessReviewReport,
): RelationshipSpouseT8CurrentMethodResidualAuthorityAcquisitionEvidenceReport {
  const accepted = exactReadinessBoundaryAccepted(readiness);

  return finalized({
    evidenceVersion: RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_VERSION,
    status: accepted
      ? 'RESOLVED_RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE'
      : 'UPSTREAM_CURRENT_METHOD_ACQUISITION_READINESS_INVALID',
    decision: accepted
      ? 'PARTIAL_EVIDENCE_ACQUIRED_ZERO_QUALIFYING_AUTHORITY_ALL_FIVE_GAPS_REMAIN_OPEN'
      : 'CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_NOT_EXECUTED',
    upstreamReadinessReviewId: readiness.reviewId,
    exactReadinessBoundaryAccepted: accepted,
    domain: 'relationship',
    subcategory: 'spouse',
    temporalScope: 'natal',
    statusClass: 'research',
    executionPerformed: accepted,
    taskEvidenceRecords: accepted
      ? RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_RECORDS
      : Object.freeze([]),
    taskEvidenceRecordCount: accepted ? 4 : 0,
    qualifyingAuthorityCandidateCount: 0,
    authorityAcceptedCandidateCount: 0,
    wygFolioTo0810ScanPageBindingEstablished: false,
    wygDirectTargetPageImageInspected: false,
    yuanhaiExactPrimaryPassagePageLocatorEstablished: accepted,
    yuanhaiDirectPrimaryPassageImageInspected: accepted,
    yuanhaiBoundedPrimaryContextInspected: accepted,
    yuanhaiWorkIdentityIndependentFromSamyeong: accepted,
    independentNormativeProvenanceEstablished: false,
    higherProvenanceModernSourceLocated: accepted,
    explicitGenderNeutralSpouseNatalApplicabilityEstablished: false,
    explicitNoUserPartnerSexOrOrientationInferenceEstablished: false,
    modernApplicabilityNormativeAuthorityAdequateCount: 0,
    zipingMultiFactorSpouseCompositionObserved: accepted,
    exactCurrentClaimClassCompositionAuthorityEstablished: false,
    currentGovernedMethodSemanticCorrespondenceEstablished: false,
    negativePartialAndMismatchEvidencePreserved: accepted,
    crossSourceStitchingAuthorized: false,
    crossTaskStitchingAuthorized: false,
    historicalGenderRoleUniversalizationAuthorized: false,
    currentRelationshipT6InputPathEstablished: false,
    relationshipT6ExecutionTaskCreated: false,
    allFiveGapsRemainOpen: true,
    unresolvedGapIds: accepted ? ALL_GAP_IDS : Object.freeze([]),
    authorityAcquiredByThisGate: false,
    authorityGapClosedByThisGate: false,
    spouseT8RuleAuthoringAuthorized: false,
    spouseT8ClaimTypeCreationAuthorized: false,
    spouseInterpretationPackCreationAuthorized: false,
    consumerNarrativeAuthorized: false,
    compatibilityAuthorityAuthorized: false,
    previewDefaultSwitchAuthorized: false,
    productionPromotionAuthorized: false,
    controlIds: accepted
      ? RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_CONTROL_IDS
      : Object.freeze([]),
    controlCount: accepted ? 14 : 0,
    controlsFrozen: accepted,
    implementationEffects: {
      acquisitionExecutionsPerformed: accepted ? 4 : 0,
      evidenceRecordsCreated: accepted ? 4 : 0,
      directPrimaryTargetPagesNewlyVerified: accepted ? 1 : 0,
      higherProvenanceModernSourcesAssessed: accepted ? 1 : 0,
      registeredSourcesCreated: 0,
      registeredCandidatesCreated: 0,
      authorityCandidatesAccepted: 0,
      authorityGapsClosed: 0,
      methodologyChoicesMade: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    },
    recommendedNextGate: accepted
      ? 'RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_EVIDENCE_ADEQUACY_REASSESSMENT_REVIEW'
      : 'RELATIONSHIP_SPOUSE_T8_CURRENT_METHOD_RESIDUAL_AUTHORITY_ACQUISITION_READINESS_REVIEW',
  });
}
