import { createHash } from 'node:crypto';
import {
  assertVerifiedPersistedAnnotationEvidenceFR220,
  type FR220ItemLabelDistribution,
  type FR220VerifiedPersistedAnnotationEvidence,
} from './observable-morphology-persisted-annotation-intake-fr220.js';
import {
  assertVerifiedPersistedCandidateProvenanceEvidenceFR221,
  type FR221PersistedCandidateRecord,
  type FR221VerifiedPersistedCandidateEvidence,
} from './observable-morphology-persisted-candidate-provenance-fr221.js';
import type { FR218ObservableLabelKey } from './observable-morphology-validation-fr218.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR222_CONTRACT_VERSION =
  'FR222-VERIFIED-CANDIDATE-ANNOTATION-CORRESPONDENCE-v1' as const;

export interface FR222CorrespondenceRecord {
  readonly reviewItemRef: string;
  readonly sampleRef: string;
  readonly participantKey: string;
  readonly captureFamilyKey: string;
  readonly partition: 'selection' | 'holdout';
  readonly reviewArtifactRef: string;
  readonly metricRef: 'neutral.eye.outer_corner_tilt.mean_degrees@0.1.0';
  readonly metricValue: number;
  readonly unit: 'degree';
  readonly confounderTags: readonly string[];
  readonly annotationCount: number;
  readonly reviewerCount: number;
  readonly countsByLabel: Readonly<Record<FR218ObservableLabelKey, number>>;
  readonly rawReviewerDisagreementPreserved: true;
  readonly consensusCollapsed: false;
  readonly consensusLabelIssued: false;
  readonly metricValueWasExposedDuringReview: false;
  readonly partitionWasExposedDuringReview: false;
  readonly holdoutMayBeUsedForRuleSelection: false;
}

export interface FR222VerifiedCandidateAnnotationCorrespondence {
  readonly schemaVersion: 'fr222-verified-candidate-annotation-correspondence-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR222_CONTRACT_VERSION;
  readonly authorityState:
    'verified_candidate_annotation_correspondence_assembled_descriptive_only_no_calibration_authority';
  readonly sourceEvidence: {
    readonly fr220AnnotationEvidenceRef: string;
    readonly fr220AnnotationEvidenceDigest: string;
    readonly fr221CandidateEvidenceRef: string;
    readonly fr221CandidateEvidenceDigest: string;
  };
  readonly reviewedItemCount: number;
  readonly annotationCount: number;
  readonly selectionReviewedItemCount: number;
  readonly holdoutReviewedItemCount: number;
  readonly correspondenceRecords: readonly FR222CorrespondenceRecord[];
  readonly correspondenceDigest: string;
  readonly correspondenceRef: string;
  readonly joinIntegrity: {
    readonly activeFR220VerificationRequired: true;
    readonly activeFR221VerificationRequired: true;
    readonly exactReviewItemRefJoinRequired: true;
    readonly orphanAnnotationItemRejected: true;
    readonly duplicateAnnotationDistributionRejected: true;
    readonly duplicateCandidateReviewItemRejectedUpstream: true;
    readonly reviewerIdentityExcludedFromOutput: true;
    readonly reviewerSessionMappingExcludedFromOutput: true;
    readonly disagreementPreserved: true;
    readonly consensusCollapsed: false;
    readonly selectionHoldoutPreserved: true;
  };
  readonly evidenceState: {
    readonly declaredHumanAnnotationEvidencePresent: boolean;
    readonly allReviewersHumanAttested: boolean;
    readonly allReviewersIndependentAttested: boolean;
  };
  readonly authorityBoundary: {
    readonly descriptiveCorrespondenceMeansEmpiricalSufficiency: false;
    readonly reviewerHumanStatusIndependentlyVerified: false;
    readonly reviewerIndependenceIndependentlyVerified: false;
    readonly captureFreshnessIndependentlyVerified: false;
    readonly sameParticipantIdentityIndependentlyVerified: false;
    readonly captureQualityValidated: false;
    readonly repeatCaptureStabilityEstablished: false;
    readonly transitionZoneIssued: false;
    readonly thresholdIssued: false;
    readonly classifierIssued: false;
    readonly consensusLabelIssued: false;
    readonly traditionalBindingIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

const ASSEMBLED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-222 ${message}`);
}

function canonicalJson(value: unknown): string {
  if (value === null) return 'null';
  if (typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) fail('correspondence cannot contain non-finite numbers.');
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map((entry) => canonicalJson(entry)).join(',')}]`;
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return `{${Object.keys(record).sort().map((key) => {
      const child = record[key];
      if (child === undefined) fail('correspondence cannot contain undefined.');
      return `${JSON.stringify(key)}:${canonicalJson(child)}`;
    }).join(',')}}`;
  }
  fail('correspondence must be JSON-compatible.');
}

function sha256(value: string): string {
  return `sha256:${createHash('sha256').update(value, 'utf8').digest('hex')}`;
}

function joinRecord(
  candidate: FR221PersistedCandidateRecord,
  distribution: FR220ItemLabelDistribution,
): FR222CorrespondenceRecord {
  if (candidate.reviewItemRef !== distribution.reviewItemRef) {
    fail('internal join attempted with mismatched reviewItemRef.');
  }
  return Object.freeze({
    reviewItemRef: candidate.reviewItemRef,
    sampleRef: candidate.sampleRef,
    participantKey: candidate.participantKey,
    captureFamilyKey: candidate.captureFamilyKey,
    partition: candidate.partition,
    reviewArtifactRef: candidate.reviewArtifactRef,
    metricRef: candidate.metricRef,
    metricValue: candidate.metricValue,
    unit: candidate.unit,
    confounderTags: Object.freeze([...candidate.confounderTags]),
    annotationCount: distribution.annotationCount,
    reviewerCount: distribution.reviewerCount,
    countsByLabel: Object.freeze({ ...distribution.countsByLabel }),
    rawReviewerDisagreementPreserved: true as const,
    consensusCollapsed: false as const,
    consensusLabelIssued: false as const,
    metricValueWasExposedDuringReview: false as const,
    partitionWasExposedDuringReview: false as const,
    holdoutMayBeUsedForRuleSelection: false as const,
  });
}

export function assembleVerifiedCandidateAnnotationCorrespondenceFR222(input: {
  readonly annotationEvidence: FR220VerifiedPersistedAnnotationEvidence;
  readonly candidateEvidence: FR221VerifiedPersistedCandidateEvidence;
}): FR222VerifiedCandidateAnnotationCorrespondence {
  assertVerifiedPersistedAnnotationEvidenceFR220(input.annotationEvidence);
  assertVerifiedPersistedCandidateProvenanceEvidenceFR221(input.candidateEvidence);

  const candidatesByReviewItem = new Map(
    input.candidateEvidence.records.map((record) => [record.reviewItemRef, record] as const),
  );
  if (candidatesByReviewItem.size !== input.candidateEvidence.records.length) {
    fail('candidate evidence contains duplicate reviewItemRef despite FR221 verification.');
  }

  const seenDistributions = new Set<string>();
  const joined = input.annotationEvidence.itemDistributions.map((distribution) => {
    if (seenDistributions.has(distribution.reviewItemRef)) {
      fail(`duplicate annotation distribution: ${distribution.reviewItemRef}.`);
    }
    seenDistributions.add(distribution.reviewItemRef);
    const candidate = candidatesByReviewItem.get(distribution.reviewItemRef);
    if (candidate === undefined) {
      fail(`orphan annotation reviewItemRef has no FR221 candidate: ${distribution.reviewItemRef}.`);
    }
    if (
      distribution.rawReviewerDisagreementPreserved !== true
      || distribution.consensusCollapsed !== false
    ) fail(`annotation distribution authority drift: ${distribution.reviewItemRef}.`);
    return joinRecord(candidate, distribution);
  }).sort((left, right) => left.reviewItemRef.localeCompare(right.reviewItemRef));

  if (joined.length === 0) fail('correspondence requires at least one reviewed item.');
  const annotationCount = joined.reduce((sum, record) => sum + record.annotationCount, 0);
  if (
    joined.length !== input.annotationEvidence.reviewedItemCount
    || annotationCount !== input.annotationEvidence.annotationCount
  ) fail('joined correspondence counts do not match verified FR220 evidence.');

  const selectionReviewedItemCount =
    joined.filter((record) => record.partition === 'selection').length;
  const holdoutReviewedItemCount = joined.length - selectionReviewedItemCount;

  const correspondenceDigest = sha256(canonicalJson({
    contractVersion: FR222_CONTRACT_VERSION,
    fr220AnnotationEvidenceRef: input.annotationEvidence.fr219EvidenceRef,
    fr220AnnotationEvidenceDigest: input.annotationEvidence.fr219EvidenceDigest,
    fr221CandidateEvidenceRef: input.candidateEvidence.evidenceRef,
    fr221CandidateEvidenceDigest: input.candidateEvidence.evidenceDigest,
    correspondenceRecords: joined,
  }));

  const result: FR222VerifiedCandidateAnnotationCorrespondence = Object.freeze({
    schemaVersion: 'fr222-verified-candidate-annotation-correspondence-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR222_CONTRACT_VERSION,
    authorityState:
      'verified_candidate_annotation_correspondence_assembled_descriptive_only_no_calibration_authority' as const,
    sourceEvidence: Object.freeze({
      fr220AnnotationEvidenceRef: input.annotationEvidence.fr219EvidenceRef,
      fr220AnnotationEvidenceDigest: input.annotationEvidence.fr219EvidenceDigest,
      fr221CandidateEvidenceRef: input.candidateEvidence.evidenceRef,
      fr221CandidateEvidenceDigest: input.candidateEvidence.evidenceDigest,
    }),
    reviewedItemCount: joined.length,
    annotationCount,
    selectionReviewedItemCount,
    holdoutReviewedItemCount,
    correspondenceRecords: Object.freeze(joined),
    correspondenceDigest,
    correspondenceRef:
      `evidence.fr222.observable_morphology_correspondence:${correspondenceDigest.slice('sha256:'.length)}`,
    joinIntegrity: Object.freeze({
      activeFR220VerificationRequired: true as const,
      activeFR221VerificationRequired: true as const,
      exactReviewItemRefJoinRequired: true as const,
      orphanAnnotationItemRejected: true as const,
      duplicateAnnotationDistributionRejected: true as const,
      duplicateCandidateReviewItemRejectedUpstream: true as const,
      reviewerIdentityExcludedFromOutput: true as const,
      reviewerSessionMappingExcludedFromOutput: true as const,
      disagreementPreserved: true as const,
      consensusCollapsed: false as const,
      selectionHoldoutPreserved: true as const,
    }),
    evidenceState: Object.freeze({
      declaredHumanAnnotationEvidencePresent:
        input.annotationEvidence.declaredHumanAnnotationEvidencePresent,
      allReviewersHumanAttested: input.annotationEvidence.allReviewersHumanAttested,
      allReviewersIndependentAttested: input.annotationEvidence.allReviewersIndependentAttested,
    }),
    authorityBoundary: Object.freeze({
      descriptiveCorrespondenceMeansEmpiricalSufficiency: false as const,
      reviewerHumanStatusIndependentlyVerified: false as const,
      reviewerIndependenceIndependentlyVerified: false as const,
      captureFreshnessIndependentlyVerified: false as const,
      sameParticipantIdentityIndependentlyVerified: false as const,
      captureQualityValidated: false as const,
      repeatCaptureStabilityEstablished: false as const,
      transitionZoneIssued: false as const,
      thresholdIssued: false as const,
      classifierIssued: false as const,
      consensusLabelIssued: false as const,
      traditionalBindingIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });
  ASSEMBLED.add(result);
  return result;
}

export function assertVerifiedCandidateAnnotationCorrespondenceFR222(
  evidence: FR222VerifiedCandidateAnnotationCorrespondence,
): void {
  if (!ASSEMBLED.has(evidence)) {
    fail('candidate/annotation correspondence was not assembled by the active FR222 runtime.');
  }
  if (
    evidence.schemaVersion !== 'fr222-verified-candidate-annotation-correspondence-v1'
    || evidence.contractVersion !== FR222_CONTRACT_VERSION
    || evidence.joinIntegrity.activeFR220VerificationRequired !== true
    || evidence.joinIntegrity.activeFR221VerificationRequired !== true
    || evidence.joinIntegrity.disagreementPreserved !== true
    || evidence.joinIntegrity.consensusCollapsed !== false
    || evidence.authorityBoundary.descriptiveCorrespondenceMeansEmpiricalSufficiency !== false
    || evidence.authorityBoundary.repeatCaptureStabilityEstablished !== false
    || evidence.authorityBoundary.transitionZoneIssued !== false
    || evidence.authorityBoundary.thresholdIssued !== false
    || evidence.authorityBoundary.classifierIssued !== false
    || evidence.authorityBoundary.consensusLabelIssued !== false
    || evidence.authorityBoundary.traditionalBindingIssued !== false
    || evidence.authorityBoundary.productionActivated !== false
    || evidence.authorityBoundary.commerceActivated !== false
  ) fail('assembled FR222 correspondence authority boundary drift.');
}
