import type { FaceAuthorityRegistry, SourcePassage } from './contracts.js';
import { FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0 } from './five-officers-six-fus-research-v0.js';
import { FR104_NLC_INTAKE_PAGE_VERIFICATION } from './five-officers-mouth-direct-source-page-verification-fr104.js';
import {
  validateFiveOfficerIntakeCriterionMethodologyRegistryAdmissionReviewFR108,
  type FiveOfficerIntakeCriterionMethodologyRegistryAdmissionReviewFR108V1,
} from './five-officers-intake-criterion-methodology-registry-admission-review-fr108.js';
import { FaceAuthorityValidationError, validateFaceAuthorityRegistry } from './validation.js';

const HISTORICAL_PASSAGE_REF = 'passage.shenxiang.five_officers.intake' as const;
const WITNESS_QUALIFIED_PASSAGE_REF = 'passage.shenxiang.five_officers.intake.nlc_1925' as const;
const CTEXT_WITNESS = 'witness.shenxiang_quanbian.ctext' as const;
const NLC_WITNESS = 'witness.shenxiang_quanbian.nlc_1925' as const;

export type IntakePassagePersistenceStrategyFR109V1 =
  | 'same_id_duplicate_append'
  | 'same_id_historical_replacement'
  | 'witness_qualified_new_passage_identity'
  | 'registry_overlay_schema_extension';

export interface IntakePassagePersistenceStrategyReviewFR109V1 {
  readonly strategy: IntakePassagePersistenceStrategyFR109V1;
  readonly structurallyValidUnderCurrentFaceRegistry: boolean;
  readonly preservesHistoricalCtextPassageRecord: boolean;
  readonly preservesScanCheckedNlcWitnessIdentity: boolean;
  readonly requiresVerificationRecordPassageIdChange: boolean;
  readonly requiresMethodologySourceRefRewrite: boolean;
  readonly requiresRegistryContractChange: boolean;
  readonly authorityAdmitted: false;
  readonly reason: string;
}

export interface FiveOfficerIntakeScanCheckedPassageRegistryIdentityPersistenceReviewFR109V1 {
  readonly schemaVersion: 'fr109-five-officers-intake-scanchecked-passage-registry-identity-persistence-review-v1';
  readonly artifactVersion: '0.1.0';
  readonly authorityState: 'witness_qualified_passage_identity_candidate_preferred_but_not_authorized';
  readonly upstream: {
    readonly fr108SchemaVersion: 'fr108-five-officers-intake-criterion-methodology-registry-admission-review-v1';
    readonly fr108AuthorityState: 'intake_criterion_methodology_registry_admission_blocked_scan_checked_passage_authority_not_persisted';
    readonly historicalPassageRef: typeof HISTORICAL_PASSAGE_REF;
    readonly historicalPassageWitnessId: typeof CTEXT_WITNESS;
    readonly historicalPassageVerificationStatus: 'unverified_ocr';
    readonly nlcWitnessRegistered: true;
    readonly nlcWitnessStatus: 'verified';
    readonly governedScanCheckedAuthorityPresent: true;
    readonly registryAdmissionAuthorizedBefore: false;
    readonly metricBindingsIssued: 0;
    readonly thresholdsIssued: 0;
    readonly criterionStatesIssued: 0;
    readonly claimsIssued: 0;
    readonly traditionalSemanticAuthority: false;
  };
  readonly directSourceIdentityContract: {
    readonly verificationRecordPassageId: typeof HISTORICAL_PASSAGE_REF;
    readonly materializedPassagePreservesRecordPassageId: true;
    readonly pageVerificationPassageIdsUniqueWithinDirectSourceRegistry: true;
    readonly faceRegistryPassageIdsUnique: true;
    readonly verificationRecordAllowsImplicitPassageAlias: false;
  };
  readonly strategyReviews: readonly [
    IntakePassagePersistenceStrategyReviewFR109V1,
    IntakePassagePersistenceStrategyReviewFR109V1,
    IntakePassagePersistenceStrategyReviewFR109V1,
    IntakePassagePersistenceStrategyReviewFR109V1,
  ];
  readonly decision: {
    readonly preferredStrategyCandidate: 'witness_qualified_new_passage_identity';
    readonly proposedPassageRef: typeof WITNESS_QUALIFIED_PASSAGE_REF;
    readonly proposedWitnessId: typeof NLC_WITNESS;
    readonly proposedVerificationStatus: 'scan_checked';
    readonly proposedScanPage: 88;
    readonly proposedOriginalTextExactMatch: true;
    readonly proposedPassageStructurallyValid: true;
    readonly historicalPassageRetained: true;
    readonly sameIdReplacementRejectedAsAuthorityShortcut: true;
    readonly implicitAliasFromFr104VerificationRejected: true;
    readonly newPassageIdentityDefinitionAdmitted: false;
    readonly newVerificationRecordAuthorized: false;
    readonly methodologySourceRefRewriteAuthorized: false;
    readonly persistentRegistryMutationAuthorized: false;
  };
  readonly execution: {
    readonly passagesPersisted: 0;
    readonly verificationRecordsReissued: 0;
    readonly methodologyDefinitionsPersisted: 0;
    readonly methodologyExecutionIssued: false;
    readonly methodologyProductionPromotionAuthorized: false;
    readonly metricBindingsIssued: 0;
    readonly thresholdsIssued: 0;
    readonly morphologyProduced: false;
    readonly criterionStatesIssued: 0;
    readonly claimsIssued: 0;
    readonly traditionalFormationAuthorized: false;
    readonly traditionalSemanticAuthority: false;
  };
  readonly authorityBoundary: {
    readonly structuralReplacementValidityMeansHistoricalRebindAuthority: false;
    readonly structuralNewIdentityValidityMeansIdentityDefinitionAuthority: false;
    readonly exactTextMatchMeansPassageIdentityInterchangeable: false;
    readonly verifiedWitnessMeansVerificationRecordMayBeRenamed: false;
    readonly preferredPersistenceStrategyMeansRegistryMutation: false;
    readonly identityReviewMeansMetricBinding: false;
    readonly identityReviewMeansThreshold: false;
    readonly identityReviewMeansTraditionalSemantics: false;
  };
  readonly recommendedNextFrontier: 'intake_witness_qualified_passage_identity_definition_review';
  readonly remainingBlockers: readonly [
    'witness_qualified_intake_passage_identity_not_defined',
    'fr104_verification_record_passage_id_reissue_or_alias_not_authorized',
    'intake_criterion_methodology_source_ref_rewrite_not_authorized',
    'intake_criterion_methodology_not_registered',
    'intake_officer_mapping_dependency_not_re_reviewed',
    'intake_metric_to_source_concept_mapping_not_authorized',
    'intake_calibration_and_thresholds_not_authorized',
    'fr64_methodology_execution_and_claim_gates_remain',
  ];
  readonly prohibitedShortcuts: readonly [
    'structural_same_id_replacement_to_historical_rebind',
    'structural_new_passage_to_identity_authority',
    'exact_text_match_to_passage_identity_equivalence',
    'verified_witness_to_verification_record_rename',
    'preferred_strategy_to_registry_mutation',
    'identity_review_to_methodology_source_ref_rewrite',
    'identity_review_to_metric_binding',
    'identity_review_to_numeric_threshold',
    'identity_review_to_traditional_semantics',
  ];
}

const REQUIRED_BLOCKERS = Object.freeze([
  'witness_qualified_intake_passage_identity_not_defined',
  'fr104_verification_record_passage_id_reissue_or_alias_not_authorized',
  'intake_criterion_methodology_source_ref_rewrite_not_authorized',
  'intake_criterion_methodology_not_registered',
  'intake_officer_mapping_dependency_not_re_reviewed',
  'intake_metric_to_source_concept_mapping_not_authorized',
  'intake_calibration_and_thresholds_not_authorized',
  'fr64_methodology_execution_and_claim_gates_remain',
] as const);

const REQUIRED_SHORTCUTS = Object.freeze([
  'structural_same_id_replacement_to_historical_rebind',
  'structural_new_passage_to_identity_authority',
  'exact_text_match_to_passage_identity_equivalence',
  'verified_witness_to_verification_record_rename',
  'preferred_strategy_to_registry_mutation',
  'identity_review_to_methodology_source_ref_rewrite',
  'identity_review_to_metric_binding',
  'identity_review_to_numeric_threshold',
  'identity_review_to_traditional_semantics',
] as const);

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-109 ${message}`);
}

function sameSequence<T>(actual: readonly T[], expected: readonly T[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function validateUpstream(source: FiveOfficerIntakeCriterionMethodologyRegistryAdmissionReviewFR108V1): void {
  validateFiveOfficerIntakeCriterionMethodologyRegistryAdmissionReviewFR108(source);
  if (
    source.schemaVersion !== 'fr108-five-officers-intake-criterion-methodology-registry-admission-review-v1' ||
    source.authorityState !== 'intake_criterion_methodology_registry_admission_blocked_scan_checked_passage_authority_not_persisted' ||
    source.faceRegistrySnapshot.intakePassageWitnessId !== CTEXT_WITNESS ||
    source.faceRegistrySnapshot.intakePassageVerificationStatus !== 'unverified_ocr' ||
    source.faceRegistrySnapshot.nlcWitnessRegistered !== true ||
    source.faceRegistrySnapshot.nlcWitnessStatus !== 'verified' ||
    source.admissionReview.governedScanCheckedAuthorityPresentUpstream !== true ||
    source.admissionReview.registryAdmissionAuthorized !== false ||
    source.execution.metricBindingsIssued !== 0 ||
    source.execution.thresholdsIssued !== 0 ||
    source.execution.criterionStatesIssued !== 0 ||
    source.execution.claimsIssued !== 0 ||
    source.execution.traditionalSemanticAuthority !== false
  ) fail('FR-108 upstream authority drift.');
}

function scanCheckedPassage(passageId: string): SourcePassage {
  const record = FR104_NLC_INTAKE_PAGE_VERIFICATION;
  if (
    record.passageId !== HISTORICAL_PASSAGE_REF ||
    record.witnessId !== NLC_WITNESS ||
    record.scanPage !== 88 ||
    record.state !== 'scan_checked'
  ) fail('FR-104 direct-source identity contract drift.');
  return Object.freeze({
    passageId,
    witnessId: record.witnessId,
    chapter: record.chapter,
    scanPage: record.scanPage,
    originalText: record.originalText,
    verificationStatus: 'scan_checked' as const,
  });
}

function registryWithPassages(passages: readonly SourcePassage[]): FaceAuthorityRegistry {
  return {
    ...FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0,
    passages,
  };
}

function assertDuplicateSameIdRejected(scanPassage: SourcePassage): void {
  let rejected = false;
  try {
    validateFaceAuthorityRegistry(registryWithPassages([...FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.passages, scanPassage]));
  } catch (error) {
    if (!(error instanceof FaceAuthorityValidationError)) throw error;
    rejected = true;
  }
  if (!rejected) fail('same passageId duplicate append unexpectedly validated.');
}

function assertSameIdReplacementStructurallyValid(scanPassage: SourcePassage): void {
  const passages = FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.passages.map((passage) =>
    passage.passageId === HISTORICAL_PASSAGE_REF ? scanPassage : passage,
  );
  validateFaceAuthorityRegistry(registryWithPassages(passages));
  const matching = passages.filter((passage) => passage.passageId === HISTORICAL_PASSAGE_REF);
  if (matching.length !== 1 || matching[0]?.witnessId !== NLC_WITNESS || matching[0]?.verificationStatus !== 'scan_checked') {
    fail('same-id replacement structural probe drift.');
  }
}

function assertWitnessQualifiedAppendStructurallyValid(scanPassage: SourcePassage): void {
  validateFaceAuthorityRegistry(registryWithPassages([...FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.passages, scanPassage]));
  const historical = FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.passages.find(
    (passage) => passage.passageId === HISTORICAL_PASSAGE_REF,
  );
  if (historical?.witnessId !== CTEXT_WITNESS || historical.verificationStatus !== 'unverified_ocr') {
    fail('historical passage changed during witness-qualified structural probe.');
  }
}

function inspectStrategies(): FiveOfficerIntakeScanCheckedPassageRegistryIdentityPersistenceReviewFR109V1['strategyReviews'] {
  validateFaceAuthorityRegistry(FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0);
  if ('sourceAuthorityOverlays' in FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0) {
    fail('Face authority registry gained overlay support and requires re-review.');
  }

  const historical = FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.passages.filter(
    (passage) => passage.passageId === HISTORICAL_PASSAGE_REF,
  );
  if (
    historical.length !== 1 ||
    historical[0]?.witnessId !== CTEXT_WITNESS ||
    historical[0]?.verificationStatus !== 'unverified_ocr'
  ) fail('historical intake passage identity drift.');

  const sameIdScan = scanCheckedPassage(HISTORICAL_PASSAGE_REF);
  assertDuplicateSameIdRejected(sameIdScan);
  assertSameIdReplacementStructurallyValid(sameIdScan);

  const witnessQualifiedScan = scanCheckedPassage(WITNESS_QUALIFIED_PASSAGE_REF);
  assertWitnessQualifiedAppendStructurallyValid(witnessQualifiedScan);

  return Object.freeze([
    Object.freeze({
      strategy: 'same_id_duplicate_append' as const,
      structurallyValidUnderCurrentFaceRegistry: false,
      preservesHistoricalCtextPassageRecord: true,
      preservesScanCheckedNlcWitnessIdentity: true,
      requiresVerificationRecordPassageIdChange: false,
      requiresMethodologySourceRefRewrite: false,
      requiresRegistryContractChange: false,
      authorityAdmitted: false as const,
      reason: 'FaceAuthorityRegistry requires unique passageId values; a second witness record cannot reuse the historical intake passageId.',
    }),
    Object.freeze({
      strategy: 'same_id_historical_replacement' as const,
      structurallyValidUnderCurrentFaceRegistry: true,
      preservesHistoricalCtextPassageRecord: false,
      preservesScanCheckedNlcWitnessIdentity: true,
      requiresVerificationRecordPassageIdChange: false,
      requiresMethodologySourceRefRewrite: false,
      requiresRegistryContractChange: false,
      authorityAdmitted: false as const,
      reason: 'The validator accepts replacement, but it globally rebinds every existing historical sourceRef from ctext to the NLC witness without explicit rebind authority.',
    }),
    Object.freeze({
      strategy: 'witness_qualified_new_passage_identity' as const,
      structurallyValidUnderCurrentFaceRegistry: true,
      preservesHistoricalCtextPassageRecord: true,
      preservesScanCheckedNlcWitnessIdentity: true,
      requiresVerificationRecordPassageIdChange: true,
      requiresMethodologySourceRefRewrite: true,
      requiresRegistryContractChange: false,
      authorityAdmitted: false as const,
      reason: 'A distinct stable passageId preserves both witnesses, but FR104 verifies the generic passageId and provides no authority to rename or alias that verification record.',
    }),
    Object.freeze({
      strategy: 'registry_overlay_schema_extension' as const,
      structurallyValidUnderCurrentFaceRegistry: false,
      preservesHistoricalCtextPassageRecord: true,
      preservesScanCheckedNlcWitnessIdentity: true,
      requiresVerificationRecordPassageIdChange: false,
      requiresMethodologySourceRefRewrite: false,
      requiresRegistryContractChange: true,
      authorityAdmitted: false as const,
      reason: 'FaceAuthorityRegistry has no source-authority overlay collection; adding one is a broader contract migration rather than a narrow persistence action.',
    }),
  ]);
}

export function reviewFiveOfficerIntakeScanCheckedPassageRegistryIdentityPersistenceFR109(
  source: FiveOfficerIntakeCriterionMethodologyRegistryAdmissionReviewFR108V1,
): FiveOfficerIntakeScanCheckedPassageRegistryIdentityPersistenceReviewFR109V1 {
  validateUpstream(source);
  const strategies = inspectStrategies();
  const witnessQualified = strategies.find((entry) => entry.strategy === 'witness_qualified_new_passage_identity');
  if (
    witnessQualified === undefined ||
    witnessQualified.structurallyValidUnderCurrentFaceRegistry !== true ||
    witnessQualified.preservesHistoricalCtextPassageRecord !== true ||
    witnessQualified.preservesScanCheckedNlcWitnessIdentity !== true ||
    witnessQualified.requiresVerificationRecordPassageIdChange !== true ||
    witnessQualified.requiresMethodologySourceRefRewrite !== true ||
    witnessQualified.authorityAdmitted !== false
  ) fail('preferred witness-qualified strategy probe drift.');

  const historical = FACE_AUTHORITY_FR3_RESEARCH_REGISTRY_V0.passages.find(
    (passage) => passage.passageId === HISTORICAL_PASSAGE_REF,
  );
  if (historical === undefined || historical.originalText !== FR104_NLC_INTAKE_PAGE_VERIFICATION.originalText) {
    fail('historical and NLC intake text exact-match prerequisite drift.');
  }

  return Object.freeze({
    schemaVersion: 'fr109-five-officers-intake-scanchecked-passage-registry-identity-persistence-review-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState: 'witness_qualified_passage_identity_candidate_preferred_but_not_authorized' as const,
    upstream: Object.freeze({
      fr108SchemaVersion: source.schemaVersion,
      fr108AuthorityState: source.authorityState,
      historicalPassageRef: HISTORICAL_PASSAGE_REF,
      historicalPassageWitnessId: CTEXT_WITNESS,
      historicalPassageVerificationStatus: 'unverified_ocr' as const,
      nlcWitnessRegistered: true as const,
      nlcWitnessStatus: 'verified' as const,
      governedScanCheckedAuthorityPresent: true as const,
      registryAdmissionAuthorizedBefore: false as const,
      metricBindingsIssued: 0 as const,
      thresholdsIssued: 0 as const,
      criterionStatesIssued: 0 as const,
      claimsIssued: 0 as const,
      traditionalSemanticAuthority: false as const,
    }),
    directSourceIdentityContract: Object.freeze({
      verificationRecordPassageId: HISTORICAL_PASSAGE_REF,
      materializedPassagePreservesRecordPassageId: true as const,
      pageVerificationPassageIdsUniqueWithinDirectSourceRegistry: true as const,
      faceRegistryPassageIdsUnique: true as const,
      verificationRecordAllowsImplicitPassageAlias: false as const,
    }),
    strategyReviews: strategies,
    decision: Object.freeze({
      preferredStrategyCandidate: 'witness_qualified_new_passage_identity' as const,
      proposedPassageRef: WITNESS_QUALIFIED_PASSAGE_REF,
      proposedWitnessId: NLC_WITNESS,
      proposedVerificationStatus: 'scan_checked' as const,
      proposedScanPage: 88 as const,
      proposedOriginalTextExactMatch: true as const,
      proposedPassageStructurallyValid: true as const,
      historicalPassageRetained: true as const,
      sameIdReplacementRejectedAsAuthorityShortcut: true as const,
      implicitAliasFromFr104VerificationRejected: true as const,
      newPassageIdentityDefinitionAdmitted: false as const,
      newVerificationRecordAuthorized: false as const,
      methodologySourceRefRewriteAuthorized: false as const,
      persistentRegistryMutationAuthorized: false as const,
    }),
    execution: Object.freeze({
      passagesPersisted: 0 as const,
      verificationRecordsReissued: 0 as const,
      methodologyDefinitionsPersisted: 0 as const,
      methodologyExecutionIssued: false as const,
      methodologyProductionPromotionAuthorized: false as const,
      metricBindingsIssued: 0 as const,
      thresholdsIssued: 0 as const,
      morphologyProduced: false as const,
      criterionStatesIssued: 0 as const,
      claimsIssued: 0 as const,
      traditionalFormationAuthorized: false as const,
      traditionalSemanticAuthority: false as const,
    }),
    authorityBoundary: Object.freeze({
      structuralReplacementValidityMeansHistoricalRebindAuthority: false as const,
      structuralNewIdentityValidityMeansIdentityDefinitionAuthority: false as const,
      exactTextMatchMeansPassageIdentityInterchangeable: false as const,
      verifiedWitnessMeansVerificationRecordMayBeRenamed: false as const,
      preferredPersistenceStrategyMeansRegistryMutation: false as const,
      identityReviewMeansMetricBinding: false as const,
      identityReviewMeansThreshold: false as const,
      identityReviewMeansTraditionalSemantics: false as const,
    }),
    recommendedNextFrontier: 'intake_witness_qualified_passage_identity_definition_review' as const,
    remainingBlockers: REQUIRED_BLOCKERS,
    prohibitedShortcuts: REQUIRED_SHORTCUTS,
  });
}

export function validateFiveOfficerIntakeScanCheckedPassageRegistryIdentityPersistenceReviewFR109(
  source: FiveOfficerIntakeScanCheckedPassageRegistryIdentityPersistenceReviewFR109V1,
): FiveOfficerIntakeScanCheckedPassageRegistryIdentityPersistenceReviewFR109V1 {
  if (
    source.schemaVersion !== 'fr109-five-officers-intake-scanchecked-passage-registry-identity-persistence-review-v1' ||
    source.artifactVersion !== '0.1.0' ||
    source.authorityState !== 'witness_qualified_passage_identity_candidate_preferred_but_not_authorized'
  ) fail('schema or authority state drift.');
  if (
    source.upstream.fr108SchemaVersion !== 'fr108-five-officers-intake-criterion-methodology-registry-admission-review-v1' ||
    source.upstream.fr108AuthorityState !== 'intake_criterion_methodology_registry_admission_blocked_scan_checked_passage_authority_not_persisted' ||
    source.upstream.historicalPassageRef !== HISTORICAL_PASSAGE_REF ||
    source.upstream.historicalPassageWitnessId !== CTEXT_WITNESS ||
    source.upstream.historicalPassageVerificationStatus !== 'unverified_ocr' ||
    source.upstream.nlcWitnessRegistered !== true ||
    source.upstream.nlcWitnessStatus !== 'verified' ||
    source.upstream.governedScanCheckedAuthorityPresent !== true ||
    source.upstream.registryAdmissionAuthorizedBefore !== false ||
    source.upstream.metricBindingsIssued !== 0 ||
    source.upstream.thresholdsIssued !== 0 ||
    source.upstream.criterionStatesIssued !== 0 ||
    source.upstream.claimsIssued !== 0 ||
    source.upstream.traditionalSemanticAuthority !== false
  ) fail('upstream authority snapshot drift.');
  if (
    source.directSourceIdentityContract.verificationRecordPassageId !== HISTORICAL_PASSAGE_REF ||
    source.directSourceIdentityContract.materializedPassagePreservesRecordPassageId !== true ||
    source.directSourceIdentityContract.pageVerificationPassageIdsUniqueWithinDirectSourceRegistry !== true ||
    source.directSourceIdentityContract.faceRegistryPassageIdsUnique !== true ||
    source.directSourceIdentityContract.verificationRecordAllowsImplicitPassageAlias !== false
  ) fail('direct-source identity contract drift.');
  if (source.strategyReviews.length !== 4) fail('strategy review cardinality drift.');
  const expectedStrategies: readonly IntakePassagePersistenceStrategyFR109V1[] = [
    'same_id_duplicate_append',
    'same_id_historical_replacement',
    'witness_qualified_new_passage_identity',
    'registry_overlay_schema_extension',
  ];
  if (!sameSequence(source.strategyReviews.map((entry) => entry.strategy), expectedStrategies)) {
    fail('strategy review ordering or inventory drift.');
  }
  if (source.strategyReviews.some((entry) => entry.authorityAdmitted !== false || entry.reason.trim().length === 0)) {
    fail('strategy review admitted authority or lost rationale.');
  }
  const duplicate = source.strategyReviews[0]!;
  const replacement = source.strategyReviews[1]!;
  const witnessQualified = source.strategyReviews[2]!;
  const overlay = source.strategyReviews[3]!;
  if (
    duplicate.structurallyValidUnderCurrentFaceRegistry !== false ||
    replacement.structurallyValidUnderCurrentFaceRegistry !== true ||
    replacement.preservesHistoricalCtextPassageRecord !== false ||
    witnessQualified.structurallyValidUnderCurrentFaceRegistry !== true ||
    witnessQualified.preservesHistoricalCtextPassageRecord !== true ||
    witnessQualified.requiresVerificationRecordPassageIdChange !== true ||
    witnessQualified.requiresMethodologySourceRefRewrite !== true ||
    overlay.structurallyValidUnderCurrentFaceRegistry !== false ||
    overlay.requiresRegistryContractChange !== true
  ) fail('strategy structural matrix drift.');
  if (
    source.decision.preferredStrategyCandidate !== 'witness_qualified_new_passage_identity' ||
    source.decision.proposedPassageRef !== WITNESS_QUALIFIED_PASSAGE_REF ||
    source.decision.proposedWitnessId !== NLC_WITNESS ||
    source.decision.proposedVerificationStatus !== 'scan_checked' ||
    source.decision.proposedScanPage !== 88 ||
    source.decision.proposedOriginalTextExactMatch !== true ||
    source.decision.proposedPassageStructurallyValid !== true ||
    source.decision.historicalPassageRetained !== true ||
    source.decision.sameIdReplacementRejectedAsAuthorityShortcut !== true ||
    source.decision.implicitAliasFromFr104VerificationRejected !== true ||
    source.decision.newPassageIdentityDefinitionAdmitted !== false ||
    source.decision.newVerificationRecordAuthorized !== false ||
    source.decision.methodologySourceRefRewriteAuthorized !== false ||
    source.decision.persistentRegistryMutationAuthorized !== false
  ) fail('decision authority drift.');
  if (
    source.execution.passagesPersisted !== 0 ||
    source.execution.verificationRecordsReissued !== 0 ||
    source.execution.methodologyDefinitionsPersisted !== 0 ||
    source.execution.methodologyExecutionIssued !== false ||
    source.execution.methodologyProductionPromotionAuthorized !== false ||
    source.execution.metricBindingsIssued !== 0 ||
    source.execution.thresholdsIssued !== 0 ||
    source.execution.morphologyProduced !== false ||
    source.execution.criterionStatesIssued !== 0 ||
    source.execution.claimsIssued !== 0 ||
    source.execution.traditionalFormationAuthorized !== false ||
    source.execution.traditionalSemanticAuthority !== false
  ) fail('execution boundary drift.');
  if (
    Object.values(source.authorityBoundary).some((value) => value !== false) ||
    source.recommendedNextFrontier !== 'intake_witness_qualified_passage_identity_definition_review' ||
    !sameSequence(source.remainingBlockers, REQUIRED_BLOCKERS) ||
    !sameSequence(source.prohibitedShortcuts, REQUIRED_SHORTCUTS)
  ) fail('authority boundary, blocker, or shortcut drift.');
  return source;
}
