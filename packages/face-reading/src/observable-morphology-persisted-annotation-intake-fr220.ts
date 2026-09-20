import { createHash } from 'node:crypto';
import type {
  FR219AnnotationEvidenceReceipt,
  FR219AnnotationRecord,
} from './observable-morphology-human-review-fr219.js';
import type { FR218ObservableLabelKey } from './observable-morphology-validation-fr218.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR220_CONTRACT_VERSION =
  'FR220-PERSISTED-ANNOTATION-EVIDENCE-INTAKE-v1' as const;

export interface FR220ItemLabelDistribution {
  readonly reviewItemRef: string;
  readonly annotationCount: number;
  readonly reviewerCount: number;
  readonly countsByLabel: Readonly<Record<FR218ObservableLabelKey, number>>;
  readonly rawReviewerDisagreementPreserved: true;
  readonly consensusCollapsed: false;
}

export interface FR220VerifiedPersistedAnnotationEvidence {
  readonly schemaVersion: 'fr220-verified-persisted-annotation-evidence-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR220_CONTRACT_VERSION;
  readonly authorityState: 'persisted_fr219_ledger_and_receipt_integrity_verified_no_empirical_sufficiency';
  readonly fr219EvidenceRef: string;
  readonly fr219EvidenceDigest: string;
  readonly annotationCount: number;
  readonly reviewedItemCount: number;
  readonly reviewerCount: number;
  readonly sessionCount: number;
  readonly itemDistributions: readonly FR220ItemLabelDistribution[];
  readonly declaredHumanAnnotationEvidencePresent: boolean;
  readonly allReviewersHumanAttested: boolean;
  readonly allReviewersIndependentAttested: boolean;
  readonly integrityBoundary: {
    readonly annotationDigestsRecomputed: true;
    readonly evidenceDigestRecomputed: true;
    readonly evidenceRefRecomputed: true;
    readonly receiptCountsRecomputed: true;
    readonly receiptSetsRecomputed: true;
    readonly sessionAttestationsCrossChecked: true;
    readonly duplicateReviewerItemRejected: true;
    readonly emptyPersistedSessionAccepted: false;
  };
  readonly authorityBoundary: {
    readonly persistedIntegrityVerificationMeansReviewerIsHuman: false;
    readonly persistedIntegrityVerificationMeansReviewerIndependenceVerified: false;
    readonly reviewerHumanStatusIndependentlyVerified: false;
    readonly reviewerIndependenceIndependentlyVerified: false;
    readonly empiricalSufficiencyEstablished: false;
    readonly repeatCaptureStabilityEstablished: false;
    readonly transitionZoneIssued: false;
    readonly thresholdIssued: false;
    readonly classifierIssued: false;
    readonly traditionalBindingIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

const SHA256 = /^sha256:[0-9a-f]{64}$/u;
const EVIDENCE_REF = /^evidence\.fr219\.observable_morphology_annotation:([0-9a-f]{64})$/u;
const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/u;
const LABELS = Object.freeze([
  'clearly_downturned',
  'slightly_downturned',
  'approximately_horizontal',
  'slightly_upturned',
  'clearly_upturned',
  'not_assessable',
] as const satisfies readonly FR218ObservableLabelKey[]);
const LABEL_SET = new Set<string>(LABELS);
const VERIFIED = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-220 ${message}`);
}

function canonicalJson(value: unknown): string {
  if (value === null) return 'null';
  if (typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) fail('canonical persisted evidence cannot contain non-finite numbers.');
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map((entry) => canonicalJson(entry)).join(',')}]`;
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const keys = Object.keys(record).sort();
    return `{${keys.map((key) => {
      const child = record[key];
      if (child === undefined) fail('canonical persisted evidence cannot contain undefined.');
      return `${JSON.stringify(key)}:${canonicalJson(child)}`;
    }).join(',')}}`;
  }
  fail('canonical persisted evidence must be JSON-compatible.');
}

function sha256(value: string): string {
  return `sha256:${createHash('sha256').update(value, 'utf8').digest('hex')}`;
}

function safeRef(value: unknown, label: string): string {
  if (typeof value !== 'string' || !SAFE_REF.test(value)) {
    fail(`${label} must be a bounded opaque reference.`);
  }
  return value;
}

function stringArray(value: unknown, label: string): readonly string[] {
  if (!Array.isArray(value) || value.some((entry) => typeof entry !== 'string')) {
    fail(`${label} must be an array of strings.`);
  }
  return value as readonly string[];
}

function exactSortedSet(values: readonly string[], expected: readonly string[], label: string): void {
  if (new Set(values).size !== values.length) fail(`${label} contains duplicates.`);
  const sorted = [...values].sort();
  if (canonicalJson(sorted) !== canonicalJson(expected)) {
    fail(`${label} does not match recomputed persisted evidence.`);
  }
}

function verifyPersistedAnnotationRecord(
  value: unknown,
  index: number,
): FR219AnnotationRecord {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    fail(`annotation[${index}] must be an object.`);
  }
  const record = value as Record<string, unknown>;
  if (
    record.schemaVersion !== 'fr219-observable-morphology-annotation-record-v1'
    || record.contractVersion !== 'FR219-OBSERVABLE-MORPHOLOGY-HUMAN-REVIEW-v1'
  ) fail(`annotation[${index}] schema/contract drift.`);

  const sessionRef = safeRef(record.sessionRef, `annotation[${index}].sessionRef`);
  const reviewItemRef = safeRef(record.reviewItemRef, `annotation[${index}].reviewItemRef`);
  const reviewerKey = safeRef(record.reviewerKey, `annotation[${index}].reviewerKey`);
  if (typeof record.label !== 'string' || !LABEL_SET.has(record.label)) {
    fail(`annotation[${index}].label is unsupported.`);
  }
  if (typeof record.recordedAt !== 'string' || !Number.isFinite(Date.parse(record.recordedAt))) {
    fail(`annotation[${index}].recordedAt must be a parseable timestamp.`);
  }
  if (
    typeof record.reviewerHumanAttested !== 'boolean'
    || typeof record.reviewerIndependenceAttested !== 'boolean'
    || record.reviewerIdentityIndependentlyVerified !== false
    || record.reviewerIndependenceIndependentlyVerified !== false
    || record.metricValueObservedByReviewer !== false
    || record.metricIdentityObservedByReviewer !== false
    || record.providerIdentityObservedByReviewer !== false
    || record.peerLabelsObservedByReviewer !== false
    || record.traditionalMeaningObservedByReviewer !== false
  ) fail(`annotation[${index}] authority boundary drift.`);
  if (typeof record.annotationDigest !== 'string' || !SHA256.test(record.annotationDigest)) {
    fail(`annotation[${index}].annotationDigest must be canonical sha256.`);
  }

  const expectedDigest = sha256(canonicalJson({
    sessionRef,
    reviewItemRef,
    reviewerKey,
    label: record.label,
    recordedAt: record.recordedAt,
  }));
  if (record.annotationDigest !== expectedDigest) {
    fail(`annotation[${index}] digest mismatch.`);
  }

  return record as unknown as FR219AnnotationRecord;
}

function verifyReceiptFixedBoundary(receipt: Record<string, unknown>): void {
  if (
    receipt.schemaVersion !== 'fr219-observable-morphology-annotation-evidence-receipt-v1'
    || receipt.contractVersion !== 'FR219-OBSERVABLE-MORPHOLOGY-HUMAN-REVIEW-v1'
    || receipt.rawReviewerDisagreementPreserved !== true
    || receipt.consensusCollapsed !== false
    || receipt.reviewerHumanStatusIndependentlyVerified !== false
    || receipt.reviewerIndependenceIndependentlyVerified !== false
    || receipt.empiricalSufficiencyEstablished !== false
    || receipt.repeatCaptureStabilityEstablished !== false
    || receipt.transitionZoneIssued !== false
    || receipt.thresholdIssued !== false
    || receipt.classifierIssued !== false
    || receipt.traditionalBindingIssued !== false
    || receipt.productionActivated !== false
    || receipt.commerceActivated !== false
  ) fail('persisted FR219 receipt authority boundary drift.');
}

export function verifyPersistedAnnotationEvidenceFR220(input: {
  readonly annotationRecords: readonly unknown[];
  readonly evidenceReceipt: unknown;
}): FR220VerifiedPersistedAnnotationEvidence {
  if (!Array.isArray(input.annotationRecords) || input.annotationRecords.length === 0) {
    fail('persisted evidence requires at least one annotation record.');
  }
  if (
    input.evidenceReceipt === null
    || typeof input.evidenceReceipt !== 'object'
    || Array.isArray(input.evidenceReceipt)
  ) fail('evidenceReceipt must be an object.');

  const records = input.annotationRecords.map(verifyPersistedAnnotationRecord);
  const receipt = input.evidenceReceipt as Record<string, unknown>;
  verifyReceiptFixedBoundary(receipt);

  const seenReviewerItem = new Set<string>();
  const sessionState = new Map<string, {
    reviewerKey: string;
    reviewerHumanAttested: boolean;
    reviewerIndependenceAttested: boolean;
  }>();
  for (const record of records) {
    const pair = `${record.reviewerKey}\u0000${record.reviewItemRef}`;
    if (seenReviewerItem.has(pair)) {
      fail(`duplicate reviewer/item annotation: ${record.reviewerKey} / ${record.reviewItemRef}.`);
    }
    seenReviewerItem.add(pair);

    const existing = sessionState.get(record.sessionRef);
    const state = {
      reviewerKey: record.reviewerKey,
      reviewerHumanAttested: record.reviewerHumanAttested,
      reviewerIndependenceAttested: record.reviewerIndependenceAttested,
    };
    if (existing === undefined) {
      sessionState.set(record.sessionRef, state);
    } else if (canonicalJson(existing) !== canonicalJson(state)) {
      fail(`persisted session attestation drift: ${record.sessionRef}.`);
    }
  }

  const sessionRefs = [...sessionState.keys()].sort();
  const reviewerKeys = [...new Set(records.map((record) => record.reviewerKey))].sort();
  const reviewItemRefs = [...new Set(records.map((record) => record.reviewItemRef))].sort();

  const receiptSessionRefs = stringArray(receipt.sessionRefs, 'receipt.sessionRefs');
  const receiptReviewerKeys = stringArray(receipt.reviewerKeys, 'receipt.reviewerKeys');
  const receiptReviewItemRefs = stringArray(receipt.reviewItemRefs, 'receipt.reviewItemRefs');
  exactSortedSet(receiptSessionRefs, sessionRefs, 'receipt.sessionRefs');
  exactSortedSet(receiptReviewerKeys, reviewerKeys, 'receipt.reviewerKeys');
  exactSortedSet(receiptReviewItemRefs, reviewItemRefs, 'receipt.reviewItemRefs');

  const humanSessionCount = [...sessionState.values()].filter(
    (state) => state.reviewerHumanAttested,
  ).length;
  const independentSessionCount = [...sessionState.values()].filter(
    (state) => state.reviewerIndependenceAttested,
  ).length;

  const expectedDeclaredHuman = records.length > 0 && humanSessionCount === sessionRefs.length;
  const expectedIndependent = independentSessionCount === sessionRefs.length;

  if (
    receipt.annotationCount !== records.length
    || receipt.reviewedItemCount !== reviewItemRefs.length
    || receipt.reviewerCount !== reviewerKeys.length
    || receipt.humanReviewerAttestationCount !== humanSessionCount
    || receipt.reviewerIndependenceAttestationCount !== independentSessionCount
    || receipt.annotationRecordsPresent !== true
    || receipt.declaredHumanAnnotationEvidencePresent !== expectedDeclaredHuman
    || receipt.allReviewersHumanAttested !== expectedDeclaredHuman
    || receipt.allReviewersIndependentAttested !== expectedIndependent
  ) fail('persisted FR219 receipt counts/attestations do not match ledger records.');

  const sortedRecords = [...records].sort((left, right) =>
    left.annotationDigest.localeCompare(right.annotationDigest));
  const expectedEvidenceDigest = sha256(canonicalJson(sortedRecords.map((record) => ({
    sessionRef: record.sessionRef,
    reviewItemRef: record.reviewItemRef,
    reviewerKey: record.reviewerKey,
    label: record.label,
    recordedAt: record.recordedAt,
    annotationDigest: record.annotationDigest,
  }))));

  if (receipt.evidenceDigest !== expectedEvidenceDigest || !SHA256.test(String(receipt.evidenceDigest))) {
    fail('persisted FR219 receipt evidenceDigest mismatch.');
  }
  const expectedEvidenceRef =
    `evidence.fr219.observable_morphology_annotation:${expectedEvidenceDigest.slice('sha256:'.length)}`;
  if (receipt.evidenceRef !== expectedEvidenceRef || !EVIDENCE_REF.test(String(receipt.evidenceRef))) {
    fail('persisted FR219 receipt evidenceRef mismatch.');
  }

  const itemDistributions = reviewItemRefs.map((reviewItemRef) => {
    const itemRecords = records.filter((record) => record.reviewItemRef === reviewItemRef);
    const counts = Object.fromEntries(
      LABELS.map((label) => [
        label,
        itemRecords.filter((record) => record.label === label).length,
      ]),
    ) as Record<FR218ObservableLabelKey, number>;
    return Object.freeze({
      reviewItemRef,
      annotationCount: itemRecords.length,
      reviewerCount: new Set(itemRecords.map((record) => record.reviewerKey)).size,
      countsByLabel: Object.freeze(counts),
      rawReviewerDisagreementPreserved: true as const,
      consensusCollapsed: false as const,
    });
  });

  const result: FR220VerifiedPersistedAnnotationEvidence = Object.freeze({
    schemaVersion: 'fr220-verified-persisted-annotation-evidence-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR220_CONTRACT_VERSION,
    authorityState:
      'persisted_fr219_ledger_and_receipt_integrity_verified_no_empirical_sufficiency' as const,
    fr219EvidenceRef: expectedEvidenceRef,
    fr219EvidenceDigest: expectedEvidenceDigest,
    annotationCount: records.length,
    reviewedItemCount: reviewItemRefs.length,
    reviewerCount: reviewerKeys.length,
    sessionCount: sessionRefs.length,
    itemDistributions: Object.freeze(itemDistributions),
    declaredHumanAnnotationEvidencePresent: expectedDeclaredHuman,
    allReviewersHumanAttested: expectedDeclaredHuman,
    allReviewersIndependentAttested: expectedIndependent,
    integrityBoundary: Object.freeze({
      annotationDigestsRecomputed: true as const,
      evidenceDigestRecomputed: true as const,
      evidenceRefRecomputed: true as const,
      receiptCountsRecomputed: true as const,
      receiptSetsRecomputed: true as const,
      sessionAttestationsCrossChecked: true as const,
      duplicateReviewerItemRejected: true as const,
      emptyPersistedSessionAccepted: false as const,
    }),
    authorityBoundary: Object.freeze({
      persistedIntegrityVerificationMeansReviewerIsHuman: false as const,
      persistedIntegrityVerificationMeansReviewerIndependenceVerified: false as const,
      reviewerHumanStatusIndependentlyVerified: false as const,
      reviewerIndependenceIndependentlyVerified: false as const,
      empiricalSufficiencyEstablished: false as const,
      repeatCaptureStabilityEstablished: false as const,
      transitionZoneIssued: false as const,
      thresholdIssued: false as const,
      classifierIssued: false as const,
      traditionalBindingIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });
  VERIFIED.add(result);
  return result;
}

export function assertVerifiedPersistedAnnotationEvidenceFR220(
  evidence: FR220VerifiedPersistedAnnotationEvidence,
): void {
  if (!VERIFIED.has(evidence)) fail('persisted annotation evidence was not verified by active FR220 runtime.');
  if (
    evidence.schemaVersion !== 'fr220-verified-persisted-annotation-evidence-v1'
    || evidence.artifactVersion !== '0.1.0'
    || evidence.contractVersion !== FR220_CONTRACT_VERSION
    || evidence.authorityState !==
      'persisted_fr219_ledger_and_receipt_integrity_verified_no_empirical_sufficiency'
    || evidence.integrityBoundary.annotationDigestsRecomputed !== true
    || evidence.integrityBoundary.evidenceDigestRecomputed !== true
    || evidence.integrityBoundary.evidenceRefRecomputed !== true
    || evidence.integrityBoundary.emptyPersistedSessionAccepted !== false
    || evidence.authorityBoundary.persistedIntegrityVerificationMeansReviewerIsHuman !== false
    || evidence.authorityBoundary.persistedIntegrityVerificationMeansReviewerIndependenceVerified !== false
    || evidence.authorityBoundary.empiricalSufficiencyEstablished !== false
    || evidence.authorityBoundary.repeatCaptureStabilityEstablished !== false
    || evidence.authorityBoundary.thresholdIssued !== false
    || evidence.authorityBoundary.classifierIssued !== false
    || evidence.authorityBoundary.traditionalBindingIssued !== false
  ) fail('verified FR220 evidence authority boundary drift.');
}
