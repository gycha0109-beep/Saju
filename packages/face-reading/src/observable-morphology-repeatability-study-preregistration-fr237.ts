import { createHash } from 'node:crypto';
import { FaceAuthorityValidationError } from './validation.js';

export const FR237_CONTRACT_VERSION =
  'FR237-OBSERVABLE-MORPHOLOGY-REPEATABILITY-STUDY-PREREGISTRATION-v1' as const;

export const FR237_PRIMARY_METRIC =
  'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0' as const;

export interface FR237RepeatabilityStudyPreregistration {
  readonly schemaVersion: 'fr237-observable-morphology-repeatability-study-preregistration-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR237_CONTRACT_VERSION;
  readonly authorityState: 'real_person_repeatability_protocol_frozen_collection_not_authorized';
  readonly predecessor: {
    readonly fr224ContractVersion: 'FR224-EMPIRICAL-STUDY-READINESS-GATE-v1';
    readonly unresolvedEmpiricalBlockersCarriedForward: true;
  };
  readonly primaryEndpoint: {
    readonly metricRef: typeof FR237_PRIMARY_METRIC;
    readonly unit: 'degree';
    readonly endpointCount: 1;
    readonly candidateSelectionFrozenBeforeCollection: true;
  };
  readonly participantDesign: {
    readonly sessionsPerParticipant: 2;
    readonly acceptedCapturesPerSession: 2;
    readonly minimumAcceptedCapturesPerParticipant: 4;
    readonly sessionsMustBeTemporallySeparated: true;
    readonly participantLevelPartition: 'selection_or_holdout';
    readonly participantLeakageForbidden: true;
    readonly captureFamilyLeakageForbidden: true;
  };
  readonly acquisitionDesign: {
    readonly liveCaptureOnly: true;
    readonly galleryUploadEligible: false;
    readonly retrospectiveDevelopmentCaptureEligible: false;
    readonly freshSessionNonceRequired: true;
    readonly freshCaptureNonceRequired: true;
    readonly serverTimestampRequired: true;
    readonly biometricIdentityMatchingRequired: false;
    readonly operatorParticipantGroupingConfirmationRequired: true;
  };
  readonly qualityDesign: {
    readonly qualityDecisionBeforeMetricInspection: true;
    readonly requiredChecks: readonly [
      'single_face',
      'frontal_pose',
      'sharpness',
      'bilateral_eye_region_visibility',
      'bilateral_eye_landmark_coverage',
      'major_eye_region_occlusion',
    ];
    readonly rejectedCaptureReasonRequired: true;
    readonly rejectedCaptureEligibleForPrimaryAnalysis: false;
  };
  readonly privacyDesign: {
    readonly pseudonymousParticipantRefRequired: true;
    readonly realNameRequiredInMeasurementDataset: false;
    readonly faceEmbeddingRequired: false;
    readonly identityTemplateRequired: false;
    readonly finiteReviewImageRetentionRequiredBeforeCollection: true;
    readonly maxReviewImageRetentionDays: null;
    readonly collectionBlockedUntilFiniteRetentionIssued: true;
  };
  readonly analysisFreeze: {
    readonly selectionMayInformEngineRevision: true;
    readonly holdoutMayInformEngineRevision: false;
    readonly holdoutMustRemainUntouchedUntilEngineFreeze: true;
    readonly numericRepeatabilityAcceptanceThreshold: null;
    readonly calibrationRef: null;
    readonly transitionZoneRef: null;
    readonly classifierRef: null;
    readonly traditionalBindingRef: null;
    readonly confirmatorySampleSize: null;
    readonly confirmatorySampleSizeMustBeFrozenBeforeConfirmatoryCollection: true;
  };
  readonly authorityBoundary: {
    readonly participantDataCollectedByThisArtifact: false;
    readonly captureFreshnessIndependentlyVerified: false;
    readonly sameParticipantIdentityIndependentlyVerified: false;
    readonly captureQualityValidated: false;
    readonly empiricalRepeatabilityEstablished: false;
    readonly repeatCaptureStabilityEstablished: false;
    readonly empiricalSufficiencyEstablished: false;
    readonly interpretationValidityEstablished: false;
    readonly physiognomyScientificallyValidated: false;
    readonly thresholdIssued: false;
    readonly calibrationIssued: false;
    readonly classifierIssued: false;
    readonly traditionalBindingIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
  readonly collectionAuthorization: {
    readonly researchCaptureRuntimeImplemented: false;
    readonly finiteRetentionPolicyIssued: false;
    readonly actualParticipantCollectionAuthorized: false;
  };
  readonly nextAction: 'implement_research_live_capture_session_runtime_without_collecting_participant_data';
  readonly protocolDigest: string;
  readonly protocolRef: string;
}

const ISSUED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-237 ${message}`);
}

function canonicalJson(value: unknown): string {
  if (value === null) return 'null';
  if (typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) fail('protocol cannot contain non-finite numbers.');
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map((entry) => canonicalJson(entry)).join(',')}]`;
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map((key) => {
      const child = record[key];
      if (child === undefined) fail('protocol cannot contain undefined.');
      return `${JSON.stringify(key)}:${canonicalJson(child)}`;
    }).join(',')}}`;
  }
  fail('protocol must be JSON-compatible.');
}

function sha256(value: string): string {
  return `sha256:${createHash('sha256').update(value, 'utf8').digest('hex')}`;
}

export function preregisterObservableMorphologyRepeatabilityStudyFR237():
FR237RepeatabilityStudyPreregistration {
  const core = {
    contractVersion: FR237_CONTRACT_VERSION,
    predecessor: {
      fr224ContractVersion: 'FR224-EMPIRICAL-STUDY-READINESS-GATE-v1' as const,
      unresolvedEmpiricalBlockersCarriedForward: true as const,
    },
    primaryEndpoint: {
      metricRef: FR237_PRIMARY_METRIC,
      unit: 'degree' as const,
      endpointCount: 1 as const,
      candidateSelectionFrozenBeforeCollection: true as const,
    },
    participantDesign: {
      sessionsPerParticipant: 2 as const,
      acceptedCapturesPerSession: 2 as const,
      minimumAcceptedCapturesPerParticipant: 4 as const,
      sessionsMustBeTemporallySeparated: true as const,
      participantLevelPartition: 'selection_or_holdout' as const,
      participantLeakageForbidden: true as const,
      captureFamilyLeakageForbidden: true as const,
    },
    acquisitionDesign: {
      liveCaptureOnly: true as const,
      galleryUploadEligible: false as const,
      retrospectiveDevelopmentCaptureEligible: false as const,
      freshSessionNonceRequired: true as const,
      freshCaptureNonceRequired: true as const,
      serverTimestampRequired: true as const,
      biometricIdentityMatchingRequired: false as const,
      operatorParticipantGroupingConfirmationRequired: true as const,
    },
    qualityDesign: {
      qualityDecisionBeforeMetricInspection: true as const,
      requiredChecks: [
        'single_face',
        'frontal_pose',
        'sharpness',
        'bilateral_eye_region_visibility',
        'bilateral_eye_landmark_coverage',
        'major_eye_region_occlusion',
      ] as const,
      rejectedCaptureReasonRequired: true as const,
      rejectedCaptureEligibleForPrimaryAnalysis: false as const,
    },
    privacyDesign: {
      pseudonymousParticipantRefRequired: true as const,
      realNameRequiredInMeasurementDataset: false as const,
      faceEmbeddingRequired: false as const,
      identityTemplateRequired: false as const,
      finiteReviewImageRetentionRequiredBeforeCollection: true as const,
      maxReviewImageRetentionDays: null,
      collectionBlockedUntilFiniteRetentionIssued: true as const,
    },
    analysisFreeze: {
      selectionMayInformEngineRevision: true as const,
      holdoutMayInformEngineRevision: false as const,
      holdoutMustRemainUntouchedUntilEngineFreeze: true as const,
      numericRepeatabilityAcceptanceThreshold: null,
      calibrationRef: null,
      transitionZoneRef: null,
      classifierRef: null,
      traditionalBindingRef: null,
      confirmatorySampleSize: null,
      confirmatorySampleSizeMustBeFrozenBeforeConfirmatoryCollection: true as const,
    },
    authorityBoundary: {
      participantDataCollectedByThisArtifact: false as const,
      captureFreshnessIndependentlyVerified: false as const,
      sameParticipantIdentityIndependentlyVerified: false as const,
      captureQualityValidated: false as const,
      empiricalRepeatabilityEstablished: false as const,
      repeatCaptureStabilityEstablished: false as const,
      empiricalSufficiencyEstablished: false as const,
      interpretationValidityEstablished: false as const,
      physiognomyScientificallyValidated: false as const,
      thresholdIssued: false as const,
      calibrationIssued: false as const,
      classifierIssued: false as const,
      traditionalBindingIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    },
    collectionAuthorization: {
      researchCaptureRuntimeImplemented: false as const,
      finiteRetentionPolicyIssued: false as const,
      actualParticipantCollectionAuthorized: false as const,
    },
    nextAction:
      'implement_research_live_capture_session_runtime_without_collecting_participant_data' as const,
  };

  const protocolDigest = sha256(canonicalJson(core));
  const result: FR237RepeatabilityStudyPreregistration = Object.freeze({
    schemaVersion: 'fr237-observable-morphology-repeatability-study-preregistration-v1' as const,
    artifactVersion: '0.1.0' as const,
    authorityState:
      'real_person_repeatability_protocol_frozen_collection_not_authorized' as const,
    ...core,
    protocolDigest,
    protocolRef:
      `evidence.fr237.observable_morphology_repeatability_preregistration:${protocolDigest.slice('sha256:'.length)}`,
  });
  ISSUED.add(result);
  return result;
}

export function assertObservableMorphologyRepeatabilityStudyFR237(
  protocol: FR237RepeatabilityStudyPreregistration,
): void {
  if (!ISSUED.has(protocol)) fail('protocol was not issued by the active FR237 runtime.');
  if (
    protocol.schemaVersion
      !== 'fr237-observable-morphology-repeatability-study-preregistration-v1'
    || protocol.contractVersion !== FR237_CONTRACT_VERSION
    || protocol.primaryEndpoint.metricRef !== FR237_PRIMARY_METRIC
    || protocol.participantDesign.sessionsPerParticipant !== 2
    || protocol.participantDesign.acceptedCapturesPerSession !== 2
    || protocol.acquisitionDesign.liveCaptureOnly !== true
    || protocol.acquisitionDesign.galleryUploadEligible !== false
    || protocol.qualityDesign.qualityDecisionBeforeMetricInspection !== true
    || protocol.privacyDesign.collectionBlockedUntilFiniteRetentionIssued !== true
    || protocol.analysisFreeze.numericRepeatabilityAcceptanceThreshold !== null
    || protocol.analysisFreeze.confirmatorySampleSize !== null
    || protocol.authorityBoundary.empiricalRepeatabilityEstablished !== false
    || protocol.authorityBoundary.interpretationValidityEstablished !== false
    || protocol.authorityBoundary.traditionalBindingIssued !== false
    || protocol.collectionAuthorization.actualParticipantCollectionAuthorized !== false
  ) fail('FR237 preregistration authority boundary drift.');
}
