import { createHash } from 'node:crypto';
import {
  assertVerifiedCandidateAnnotationCorrespondenceFR222,
  type FR222VerifiedCandidateAnnotationCorrespondence,
} from './observable-morphology-candidate-annotation-correspondence-fr222.js';
import {
  assertDeclaredRepeatCaptureFamilyDescriptivesFR223,
  type FR223DeclaredRepeatCaptureFamilyEvidence,
} from './observable-morphology-repeat-capture-family-fr223.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR224_CONTRACT_VERSION =
  'FR224-EMPIRICAL-STUDY-READINESS-GATE-v1' as const;

export type FR224StructuralGap =
  | 'declared_human_annotation_evidence_absent'
  | 'selection_human_review_coverage_absent'
  | 'holdout_human_review_coverage_absent'
  | 'selection_declared_repeat_family_coverage_absent'
  | 'holdout_declared_repeat_family_coverage_absent'
  | 'reviewed_item_repeat_family_overlap_absent';

export type FR224AuthorityBlocker =
  | 'reviewer_human_status_not_independently_verified'
  | 'reviewer_independence_not_independently_verified'
  | 'capture_freshness_not_independently_verified'
  | 'same_participant_identity_not_independently_verified'
  | 'capture_quality_not_validated'
  | 'empirical_repeatability_not_established'
  | 'repeat_capture_stability_not_established'
  | 'empirical_sufficiency_not_established';

export interface FR224EmpiricalStudyReadinessGate {
  readonly schemaVersion: 'fr224-empirical-study-readiness-gate-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR224_CONTRACT_VERSION;
  readonly authorityState:
    'structural_evidence_streams_checked_empirical_authority_blocked';
  readonly sourceEvidence: {
    readonly fr222CorrespondenceRef: string;
    readonly fr222CorrespondenceDigest: string;
    readonly fr223RepeatFamilyEvidenceRef: string;
    readonly fr223RepeatFamilyEvidenceDigest: string;
    readonly sharedFR221CandidateEvidenceRef: string;
    readonly sharedFR221CandidateEvidenceDigest: string;
  };
  readonly structuralDiagnostics: {
    readonly reviewedItemCount: number;
    readonly annotationCount: number;
    readonly selectionReviewedItemCount: number;
    readonly holdoutReviewedItemCount: number;
    readonly repeatFamilyCount: number;
    readonly selectionRepeatFamilyCount: number;
    readonly holdoutRepeatFamilyCount: number;
    readonly reviewedItemInRepeatFamilyCount: number;
    readonly selectionReviewedItemInRepeatFamilyCount: number;
    readonly holdoutReviewedItemInRepeatFamilyCount: number;
    readonly declaredHumanAnnotationEvidencePresent: boolean;
    readonly allReviewersHumanAttested: boolean;
    readonly allReviewersIndependentAttested: boolean;
  };
  readonly structuralGaps: readonly FR224StructuralGap[];
  readonly authorityBlockers: readonly FR224AuthorityBlocker[];
  readonly readinessState:
    | 'STRUCTURAL_GAPS_AND_EMPIRICAL_AUTHORITY_BLOCKERS_PRESENT'
    | 'STRUCTURAL_EVIDENCE_PRESENT_EMPIRICAL_AUTHORITY_BLOCKED';
  readonly noInventedSufficiencyRule: {
    readonly minimumSampleThresholdInvented: false;
    readonly minimumReviewerThresholdInvented: false;
    readonly minimumRepeatFamilyThresholdInvented: false;
    readonly numericRepeatabilityAcceptanceThresholdInvented: false;
  };
  readonly authorityBoundary: {
    readonly evidencePresenceMeansEmpiricalSufficiency: false;
    readonly structuralReadinessMeansCalibrationAuthorized: false;
    readonly reviewerHumanStatusIndependentlyVerified: false;
    readonly reviewerIndependenceIndependentlyVerified: false;
    readonly captureFreshnessIndependentlyVerified: false;
    readonly sameParticipantIdentityIndependentlyVerified: false;
    readonly captureQualityValidated: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly repeatCaptureStabilityEstablished: false;
    readonly empiricalSufficiencyEstablished: false;
    readonly transitionZoneIssued: false;
    readonly thresholdIssued: false;
    readonly classifierIssued: false;
    readonly consensusLabelIssued: false;
    readonly traditionalBindingIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly nextAction:
    'collect_and_independently_verify_human_and_repeat_capture_evidence_before_any_calibration';
  readonly gateDigest: string;
  readonly gateRef: string;
}

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-224 ${message}`);
}

function canonicalJson(value: unknown): string {
  if (value === null) return 'null';
  if (typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) fail('readiness gate cannot contain non-finite numbers.');
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map((entry) => canonicalJson(entry)).join(',')}]`;
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map((key) => {
      const child = record[key];
      if (child === undefined) fail('readiness gate cannot contain undefined.');
      return `${JSON.stringify(key)}:${canonicalJson(child)}`;
    }).join(',')}}`;
  }
  fail('readiness gate must be JSON-compatible.');
}

function sha256(value: string): string {
  return `sha256:${createHash('sha256').update(value, 'utf8').digest('hex')}`;
}

export function assembleEmpiricalStudyReadinessGateFR224(input: {
  readonly correspondence: FR222VerifiedCandidateAnnotationCorrespondence;
  readonly repeatFamilies: FR223DeclaredRepeatCaptureFamilyEvidence;
}): FR224EmpiricalStudyReadinessGate {
  assertVerifiedCandidateAnnotationCorrespondenceFR222(input.correspondence);
  assertDeclaredRepeatCaptureFamilyDescriptivesFR223(input.repeatFamilies);

  if (
    input.correspondence.sourceEvidence.fr221CandidateEvidenceRef
      !== input.repeatFamilies.sourceEvidence.fr221CandidateEvidenceRef
    || input.correspondence.sourceEvidence.fr221CandidateEvidenceDigest
      !== input.repeatFamilies.sourceEvidence.fr221CandidateEvidenceDigest
  ) {
    fail('FR222 and FR223 must derive from the exact same FR221 candidate evidence.');
  }

  const repeatFamilyKeys = new Set(
    input.repeatFamilies.repeatFamilies.map((family) => family.captureFamilyKey),
  );
  const reviewedInRepeatFamilies = input.correspondence.correspondenceRecords.filter(
    (record) => repeatFamilyKeys.has(record.captureFamilyKey),
  );
  const selectionReviewedItemInRepeatFamilyCount = reviewedInRepeatFamilies.filter(
    (record) => record.partition === 'selection',
  ).length;
  const holdoutReviewedItemInRepeatFamilyCount =
    reviewedInRepeatFamilies.length - selectionReviewedItemInRepeatFamilyCount;

  const structuralGaps: FR224StructuralGap[] = [];
  if (!input.correspondence.evidenceState.declaredHumanAnnotationEvidencePresent) {
    structuralGaps.push('declared_human_annotation_evidence_absent');
  }
  if (input.correspondence.selectionReviewedItemCount === 0) {
    structuralGaps.push('selection_human_review_coverage_absent');
  }
  if (input.correspondence.holdoutReviewedItemCount === 0) {
    structuralGaps.push('holdout_human_review_coverage_absent');
  }
  if (input.repeatFamilies.selectionRepeatFamilyCount === 0) {
    structuralGaps.push('selection_declared_repeat_family_coverage_absent');
  }
  if (input.repeatFamilies.holdoutRepeatFamilyCount === 0) {
    structuralGaps.push('holdout_declared_repeat_family_coverage_absent');
  }
  if (reviewedInRepeatFamilies.length === 0) {
    structuralGaps.push('reviewed_item_repeat_family_overlap_absent');
  }

  const authorityBlockers = Object.freeze([
    'reviewer_human_status_not_independently_verified',
    'reviewer_independence_not_independently_verified',
    'capture_freshness_not_independently_verified',
    'same_participant_identity_not_independently_verified',
    'capture_quality_not_validated',
    'empirical_repeatability_not_established',
    'repeat_capture_stability_not_established',
    'empirical_sufficiency_not_established',
  ] satisfies readonly FR224AuthorityBlocker[]);

  const structuralDiagnostics = Object.freeze({
    reviewedItemCount: input.correspondence.reviewedItemCount,
    annotationCount: input.correspondence.annotationCount,
    selectionReviewedItemCount: input.correspondence.selectionReviewedItemCount,
    holdoutReviewedItemCount: input.correspondence.holdoutReviewedItemCount,
    repeatFamilyCount: input.repeatFamilies.repeatFamilyCount,
    selectionRepeatFamilyCount: input.repeatFamilies.selectionRepeatFamilyCount,
    holdoutRepeatFamilyCount: input.repeatFamilies.holdoutRepeatFamilyCount,
    reviewedItemInRepeatFamilyCount: reviewedInRepeatFamilies.length,
    selectionReviewedItemInRepeatFamilyCount,
    holdoutReviewedItemInRepeatFamilyCount,
    declaredHumanAnnotationEvidencePresent:
      input.correspondence.evidenceState.declaredHumanAnnotationEvidencePresent,
    allReviewersHumanAttested: input.correspondence.evidenceState.allReviewersHumanAttested,
    allReviewersIndependentAttested:
      input.correspondence.evidenceState.allReviewersIndependentAttested,
  });

  const gateDigest = sha256(canonicalJson({
    contractVersion: FR224_CONTRACT_VERSION,
    fr222CorrespondenceRef: input.correspondence.correspondenceRef,
    fr222CorrespondenceDigest: input.correspondence.correspondenceDigest,
    fr223RepeatFamilyEvidenceRef: input.repeatFamilies.evidenceRef,
    fr223RepeatFamilyEvidenceDigest: input.repeatFamilies.evidenceDigest,
    structuralDiagnostics,
    structuralGaps,
    authorityBlockers,
  }));

  const result: FR224EmpiricalStudyReadinessGate = Object.freeze({
    schemaVersion: 'fr224-empirical-study-readiness-gate-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR224_CONTRACT_VERSION,
    authorityState: 'structural_evidence_streams_checked_empirical_authority_blocked' as const,
    sourceEvidence: Object.freeze({
      fr222CorrespondenceRef: input.correspondence.correspondenceRef,
      fr222CorrespondenceDigest: input.correspondence.correspondenceDigest,
      fr223RepeatFamilyEvidenceRef: input.repeatFamilies.evidenceRef,
      fr223RepeatFamilyEvidenceDigest: input.repeatFamilies.evidenceDigest,
      sharedFR221CandidateEvidenceRef:
        input.correspondence.sourceEvidence.fr221CandidateEvidenceRef,
      sharedFR221CandidateEvidenceDigest:
        input.correspondence.sourceEvidence.fr221CandidateEvidenceDigest,
    }),
    structuralDiagnostics,
    structuralGaps: Object.freeze(structuralGaps),
    authorityBlockers,
    readinessState: structuralGaps.length === 0
      ? 'STRUCTURAL_EVIDENCE_PRESENT_EMPIRICAL_AUTHORITY_BLOCKED' as const
      : 'STRUCTURAL_GAPS_AND_EMPIRICAL_AUTHORITY_BLOCKERS_PRESENT' as const,
    noInventedSufficiencyRule: Object.freeze({
      minimumSampleThresholdInvented: false as const,
      minimumReviewerThresholdInvented: false as const,
      minimumRepeatFamilyThresholdInvented: false as const,
      numericRepeatabilityAcceptanceThresholdInvented: false as const,
    }),
    authorityBoundary: Object.freeze({
      evidencePresenceMeansEmpiricalSufficiency: false as const,
      structuralReadinessMeansCalibrationAuthorized: false as const,
      reviewerHumanStatusIndependentlyVerified: false as const,
      reviewerIndependenceIndependentlyVerified: false as const,
      captureFreshnessIndependentlyVerified: false as const,
      sameParticipantIdentityIndependentlyVerified: false as const,
      captureQualityValidated: false as const,
      empiricalRepeatabilityEstablished: false as const,
      repeatCaptureStabilityEstablished: false as const,
      empiricalSufficiencyEstablished: false as const,
      transitionZoneIssued: false as const,
      thresholdIssued: false as const,
      classifierIssued: false as const,
      consensusLabelIssued: false as const,
      traditionalBindingIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
    nextAction:
      'collect_and_independently_verify_human_and_repeat_capture_evidence_before_any_calibration' as const,
    gateDigest,
    gateRef: `evidence.fr224.observable_morphology_study_readiness:${gateDigest.slice('sha256:'.length)}`,
  });
  ISSUED.add(result);
  return result;
}

export function assertEmpiricalStudyReadinessGateFR224(
  gate: FR224EmpiricalStudyReadinessGate,
): void {
  if (!ISSUED.has(gate)) fail('readiness gate was not issued by the active FR224 runtime.');
  if (
    gate.schemaVersion !== 'fr224-empirical-study-readiness-gate-v1'
    || gate.contractVersion !== FR224_CONTRACT_VERSION
    || gate.authorityState !== 'structural_evidence_streams_checked_empirical_authority_blocked'
    || gate.authorityBlockers.length === 0
    || gate.noInventedSufficiencyRule.minimumSampleThresholdInvented !== false
    || gate.noInventedSufficiencyRule.minimumReviewerThresholdInvented !== false
    || gate.noInventedSufficiencyRule.minimumRepeatFamilyThresholdInvented !== false
    || gate.noInventedSufficiencyRule.numericRepeatabilityAcceptanceThresholdInvented !== false
    || gate.authorityBoundary.evidencePresenceMeansEmpiricalSufficiency !== false
    || gate.authorityBoundary.structuralReadinessMeansCalibrationAuthorized !== false
    || gate.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || gate.authorityBoundary.repeatCaptureStabilityEstablished !== false
    || gate.authorityBoundary.empiricalSufficiencyEstablished !== false
    || gate.authorityBoundary.transitionZoneIssued !== false
    || gate.authorityBoundary.thresholdIssued !== false
    || gate.authorityBoundary.classifierIssued !== false
    || gate.authorityBoundary.consensusLabelIssued !== false
    || gate.authorityBoundary.traditionalBindingIssued !== false
    || gate.authorityBoundary.productionActivated !== false
    || gate.authorityBoundary.commerceActivated !== false
  ) fail('FR224 readiness-gate authority boundary drift.');
}
