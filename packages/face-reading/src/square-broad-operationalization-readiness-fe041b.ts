export const FE041B_SQUARE_BROAD_OPERATIONALIZATION_READINESS_VERSION =
  'FE041B-SQUARE-BROAD-OPERATIONALIZATION-READINESS-v1' as const;

export const FE041B_AUTHORITY_SNAPSHOT_COMMIT =
  '50fd5b511326033861b3cab48028b989c4499b3c' as const;

export interface FE041BSquareBroadOperationalizationReadiness {
  readonly schemaVersion:
    'fe041b-square-broad-operationalization-readiness-v1';
  readonly contractVersion:
    typeof FE041B_SQUARE_BROAD_OPERATIONALIZATION_READINESS_VERSION;
  readonly authoritySnapshot: {
    readonly repository: 'gycha0109-beep/Saju';
    readonly commit: typeof FE041B_AUTHORITY_SNAPSHOT_COMMIT;
    readonly fr140SourceBlob:
      'c6ebcb9213db11dfdd2abda5dd723911355f3859';
    readonly fr141SourceBlob:
      'a2a621bb2088f9002480caf6a89bbc0a40e50538';
    readonly methodologyApprovalBlob:
      'ad9ea864092dd5f70a691c842ba8ef4ca618f971';
  };
  readonly target: {
    readonly criterionRef: 'criterion.intake.square_broad';
    readonly sourceConcept: '方大';
    readonly sourcePassageRef:
      'passage.shenxiang.five_officers.intake.nlc_1925';
    readonly sourcePassageVerificationStatus: 'scan_checked';
    readonly reviewedMethodologyRef:
      'method.shenxiang.five_officers.intake_criteria@0.3.0';
    readonly methodologyReviewStatus: 'reviewed';
  };
  readonly operationalization: {
    readonly state:
      'reviewed_methodology_present_operationalization_not_authorized';
    readonly canonicalInputMetricRefs: readonly [];
    readonly classificationBands: null;
    readonly numericThresholds: null;
    readonly calibrationRef: null;
    readonly ruleRef: null;
  };
  readonly blockers: readonly [
    'canonical_metric_to_traditional_construct_binding_not_authorized',
    'construct_validity_not_established',
    'empirical_semantic_evidence_not_admitted',
    'calibration_authority_not_issued',
    'numeric_threshold_not_authorized',
  ];
  readonly authorityBoundary: {
    readonly sourcePassageScanChecked: true;
    readonly reviewedMethodologyAuthorityPresent: true;
    readonly canonicalMetricBindingAuthorized: false;
    readonly constructValidityEstablished: false;
    readonly empiricalSemanticEvidenceAdmitted: false;
    readonly calibrationAuthorityIssued: false;
    readonly numericThresholdAuthorityIssued: false;
    readonly classificationBandsIssued: false;
    readonly deterministicCriterionStateIssued: false;
    readonly ruleAuthorityIssued: false;
    readonly structuredClaimIssued: false;
    readonly narrativeAuthorityIssued: false;
    readonly productionSemanticExecutionAuthorized: false;
  };
  readonly nextFrontier:
    'source_grounded_canonical_metric_mapping_evidence_before_calibration';
}

const SNAPSHOT: FE041BSquareBroadOperationalizationReadiness = Object.freeze({
  schemaVersion:
    'fe041b-square-broad-operationalization-readiness-v1' as const,
  contractVersion:
    FE041B_SQUARE_BROAD_OPERATIONALIZATION_READINESS_VERSION,
  authoritySnapshot: Object.freeze({
    repository: 'gycha0109-beep/Saju' as const,
    commit: FE041B_AUTHORITY_SNAPSHOT_COMMIT,
    fr140SourceBlob:
      'c6ebcb9213db11dfdd2abda5dd723911355f3859' as const,
    fr141SourceBlob:
      'a2a621bb2088f9002480caf6a89bbc0a40e50538' as const,
    methodologyApprovalBlob:
      'ad9ea864092dd5f70a691c842ba8ef4ca618f971' as const,
  }),
  target: Object.freeze({
    criterionRef: 'criterion.intake.square_broad' as const,
    sourceConcept: '方大' as const,
    sourcePassageRef:
      'passage.shenxiang.five_officers.intake.nlc_1925' as const,
    sourcePassageVerificationStatus: 'scan_checked' as const,
    reviewedMethodologyRef:
      'method.shenxiang.five_officers.intake_criteria@0.3.0' as const,
    methodologyReviewStatus: 'reviewed' as const,
  }),
  operationalization: Object.freeze({
    state:
      'reviewed_methodology_present_operationalization_not_authorized' as const,
    canonicalInputMetricRefs: Object.freeze([] as const),
    classificationBands: null,
    numericThresholds: null,
    calibrationRef: null,
    ruleRef: null,
  }),
  blockers: Object.freeze([
    'canonical_metric_to_traditional_construct_binding_not_authorized',
    'construct_validity_not_established',
    'empirical_semantic_evidence_not_admitted',
    'calibration_authority_not_issued',
    'numeric_threshold_not_authorized',
  ] as const),
  authorityBoundary: Object.freeze({
    sourcePassageScanChecked: true as const,
    reviewedMethodologyAuthorityPresent: true as const,
    canonicalMetricBindingAuthorized: false as const,
    constructValidityEstablished: false as const,
    empiricalSemanticEvidenceAdmitted: false as const,
    calibrationAuthorityIssued: false as const,
    numericThresholdAuthorityIssued: false as const,
    classificationBandsIssued: false as const,
    deterministicCriterionStateIssued: false as const,
    ruleAuthorityIssued: false as const,
    structuredClaimIssued: false as const,
    narrativeAuthorityIssued: false as const,
    productionSemanticExecutionAuthorized: false as const,
  }),
  nextFrontier:
    'source_grounded_canonical_metric_mapping_evidence_before_calibration' as const,
});

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new Error('FE041B ' + message);
}

export function assertSquareBroadOperationalizationReadinessFE041B(
  value: FE041BSquareBroadOperationalizationReadiness,
): void {
  if (
    value.schemaVersion !==
      'fe041b-square-broad-operationalization-readiness-v1' ||
    value.contractVersion !==
      FE041B_SQUARE_BROAD_OPERATIONALIZATION_READINESS_VERSION ||
    value.authoritySnapshot.repository !== 'gycha0109-beep/Saju' ||
    value.authoritySnapshot.commit !== FE041B_AUTHORITY_SNAPSHOT_COMMIT ||
    value.authoritySnapshot.fr140SourceBlob !==
      'c6ebcb9213db11dfdd2abda5dd723911355f3859' ||
    value.authoritySnapshot.fr141SourceBlob !==
      'a2a621bb2088f9002480caf6a89bbc0a40e50538' ||
    value.authoritySnapshot.methodologyApprovalBlob !==
      'ad9ea864092dd5f70a691c842ba8ef4ca618f971'
  ) fail('authority snapshot identity drift.');

  if (
    value.target.criterionRef !== 'criterion.intake.square_broad' ||
    value.target.sourceConcept !== '方大' ||
    value.target.sourcePassageRef !==
      'passage.shenxiang.five_officers.intake.nlc_1925' ||
    value.target.sourcePassageVerificationStatus !== 'scan_checked' ||
    value.target.reviewedMethodologyRef !==
      'method.shenxiang.five_officers.intake_criteria@0.3.0' ||
    value.target.methodologyReviewStatus !== 'reviewed'
  ) fail('target authority coordinates drift.');

  if (
    value.operationalization.state !==
      'reviewed_methodology_present_operationalization_not_authorized' ||
    value.operationalization.canonicalInputMetricRefs.length !== 0 ||
    value.operationalization.classificationBands !== null ||
    value.operationalization.numericThresholds !== null ||
    value.operationalization.calibrationRef !== null ||
    value.operationalization.ruleRef !== null
  ) fail('operationalization authority widened.');

  if (
    value.authorityBoundary.sourcePassageScanChecked !== true ||
    value.authorityBoundary.reviewedMethodologyAuthorityPresent !== true ||
    Object.entries(value.authorityBoundary)
      .filter(([key]) =>
        key !== 'sourcePassageScanChecked' &&
        key !== 'reviewedMethodologyAuthorityPresent')
      .some(([, state]) => state !== false)
  ) fail('semantic authority boundary widened.');

  if (
    value.blockers.length !== 5 ||
    value.nextFrontier !==
      'source_grounded_canonical_metric_mapping_evidence_before_calibration'
  ) fail('readiness frontier drift.');
}

export function issueSquareBroadOperationalizationReadinessFE041B():
  FE041BSquareBroadOperationalizationReadiness {
  assertSquareBroadOperationalizationReadinessFE041B(SNAPSHOT);
  ISSUED.add(SNAPSHOT);
  return SNAPSHOT;
}

export function assertIssuedSquareBroadOperationalizationReadinessFE041B(
  value: FE041BSquareBroadOperationalizationReadiness,
): void {
  assertSquareBroadOperationalizationReadinessFE041B(value);
  if (!ISSUED.has(value as object)) {
    fail('readiness artifact was not issued by the active FE041B authority.');
  }
}
