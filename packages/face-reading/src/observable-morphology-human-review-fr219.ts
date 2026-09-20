import { createHash } from 'node:crypto';
import {
  summarizeOrdinalAnnotationsFR218,
  type FR218BlindedReviewItem,
  type FR218ObservableLabelKey,
  type FR218ReviewerAnnotation,
} from './observable-morphology-validation-fr218.js';
import { FaceAuthorityValidationError } from './validation.js';

export const FR219_CONTRACT_VERSION =
  'FR219-OBSERVABLE-MORPHOLOGY-HUMAN-REVIEW-v1' as const;

export type FR219ReviewMediaType = 'image/png' | 'image/jpeg' | 'image/webp';

export interface FR219ReviewAssetInput {
  readonly reviewItem: FR218BlindedReviewItem;
  readonly assetPath: string;
  readonly assetDigest: string;
  readonly mediaType: FR219ReviewMediaType;
}

export interface FR219ReviewSessionInput {
  readonly sessionRef: string;
  readonly reviewerKey: string;
  readonly reviewerHumanAttested: boolean;
  readonly reviewerIndependenceAttested: boolean;
  readonly items: readonly FR219ReviewAssetInput[];
}

export interface FR219InternalAssetBinding {
  readonly reviewItemRef: string;
  readonly assetPath: string;
  readonly assetDigest: string;
  readonly mediaType: FR219ReviewMediaType;
  readonly assetRoute: string;
  readonly sourcePathExposedToReviewer: false;
  readonly assetDigestExposedToReviewer: false;
}

export interface FR219PublicReviewItem {
  readonly reviewItemRef: string;
  readonly assetRoute: string;
  readonly reviewerPrompt: string;
  readonly labelOptions: readonly Readonly<{
    key: FR218ObservableLabelKey;
    reviewerMeaning: string;
  }>[];
}

export interface FR219PublicReviewManifest {
  readonly schemaVersion: 'fr219-provider-blind-review-manifest-v1';
  readonly contractVersion: typeof FR219_CONTRACT_VERSION;
  readonly sessionRef: string;
  readonly constructRef: 'observable.eye_pair.outer_corner_orientation@0.1.0';
  readonly items: readonly FR219PublicReviewItem[];
  readonly metricValuesExposed: false;
  readonly metricIdentityExposed: false;
  readonly providerIdentityExposed: false;
  readonly extractorIdentityExposed: false;
  readonly sourcePathsExposed: false;
  readonly partitionExposed: false;
  readonly thresholdsExposed: false;
  readonly traditionalMeaningExposed: false;
  readonly fortuneOutputExposed: false;
  readonly peerLabelsExposed: false;
  readonly reviewerKeyExposed: false;
}

export interface FR219ReviewSession {
  readonly schemaVersion: 'fr219-observable-morphology-human-review-session-v1';
  readonly artifactVersion: '0.1.0';
  readonly contractVersion: typeof FR219_CONTRACT_VERSION;
  readonly authorityState: 'localhost_blinded_review_collection_ready_no_empirical_sufficiency_claim';
  readonly sessionRef: string;
  readonly reviewerKey: string;
  readonly reviewerAttestation: {
    readonly humanReviewerAttested: boolean;
    readonly reviewerIndependenceAttested: boolean;
    readonly humanIdentityIndependentlyVerified: false;
    readonly reviewerIndependenceIndependentlyVerified: false;
  };
  readonly reviewItems: readonly FR218BlindedReviewItem[];
  readonly internalAssetBindings: readonly FR219InternalAssetBinding[];
  readonly publicManifest: FR219PublicReviewManifest;
  readonly authorityBoundary: {
    readonly sessionMaterializationMeansHumanReviewOccurred: false;
    readonly sessionMaterializationMeansReviewerIsHuman: false;
    readonly reviewerAttestationMeansIndependentVerification: false;
    readonly annotationCountMeansEmpiricalSufficiency: false;
    readonly thresholdIssued: false;
    readonly classifierIssued: false;
    readonly transitionZoneIssued: false;
    readonly traditionalBindingIssued: false;
    readonly productionActivated: false;
    readonly commerceActivated: false;
  };
}

export interface FR219AnnotationInput {
  readonly reviewItemRef: string;
  readonly label: FR218ObservableLabelKey;
  readonly recordedAt: string;
}

export interface FR219AnnotationRecord {
  readonly schemaVersion: 'fr219-observable-morphology-annotation-record-v1';
  readonly contractVersion: typeof FR219_CONTRACT_VERSION;
  readonly sessionRef: string;
  readonly reviewItemRef: string;
  readonly reviewerKey: string;
  readonly label: FR218ObservableLabelKey;
  readonly recordedAt: string;
  readonly reviewerHumanAttested: boolean;
  readonly reviewerIndependenceAttested: boolean;
  readonly reviewerIdentityIndependentlyVerified: false;
  readonly reviewerIndependenceIndependentlyVerified: false;
  readonly metricValueObservedByReviewer: false;
  readonly metricIdentityObservedByReviewer: false;
  readonly providerIdentityObservedByReviewer: false;
  readonly peerLabelsObservedByReviewer: false;
  readonly traditionalMeaningObservedByReviewer: false;
  readonly annotationDigest: string;
}

export interface FR219AnnotationEvidenceReceipt {
  readonly schemaVersion: 'fr219-observable-morphology-annotation-evidence-receipt-v1';
  readonly contractVersion: typeof FR219_CONTRACT_VERSION;
  readonly evidenceRef: string;
  readonly sessionRefs: readonly string[];
  readonly reviewerKeys: readonly string[];
  readonly reviewItemRefs: readonly string[];
  readonly annotationCount: number;
  readonly reviewedItemCount: number;
  readonly reviewerCount: number;
  readonly humanReviewerAttestationCount: number;
  readonly reviewerIndependenceAttestationCount: number;
  readonly rawReviewerDisagreementPreserved: true;
  readonly consensusCollapsed: false;
  readonly annotationRecordsPresent: boolean;
  readonly declaredHumanAnnotationEvidencePresent: boolean;
  readonly allReviewersHumanAttested: boolean;
  readonly allReviewersIndependentAttested: boolean;
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
  readonly evidenceDigest: string;
}

const SHA256 = /^sha256:[0-9a-f]{64}$/u;
const SAFE_REF = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,255}$/u;
const ALLOWED_MEDIA_TYPES = new Set<FR219ReviewMediaType>([
  'image/png',
  'image/jpeg',
  'image/webp',
]);
const ISSUED_SESSIONS = new WeakSet<object>();
const ISSUED_ANNOTATIONS = new WeakSet<object>();

function fail(message: string): never {
  throw new FaceAuthorityValidationError(`FR-219 ${message}`);
}

function nonEmpty(value: string, label: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    fail(`${label} must be non-empty.`);
  }
  return value;
}

function safeRef(value: string, label: string): string {
  nonEmpty(value, label);
  if (!SAFE_REF.test(value)) fail(`${label} must be a bounded opaque reference.`);
  return value;
}

function digest(value: string): string {
  return `sha256:${createHash('sha256').update(value, 'utf8').digest('hex')}`;
}

function canonicalJson(value: unknown): string {
  if (value === null) return 'null';
  if (typeof value === 'string' || typeof value === 'boolean') return JSON.stringify(value);
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) fail('canonical evidence cannot contain non-finite numbers.');
    return JSON.stringify(value);
  }
  if (Array.isArray(value)) return `[${value.map((entry) => canonicalJson(entry)).join(',')}]`;
  if (typeof value === 'object') {
    const record = value as Record<string, unknown>;
    const keys = Object.keys(record).sort();
    return `{${keys.map((key) => {
      const child = record[key];
      if (child === undefined) fail('canonical evidence cannot contain undefined.');
      return `${JSON.stringify(key)}:${canonicalJson(child)}`;
    }).join(',')}}`;
  }
  fail('canonical evidence must be JSON-compatible.');
}

function assertBlindReviewItem(item: FR218BlindedReviewItem): void {
  if (
    item.constructRef !== 'observable.eye_pair.outer_corner_orientation@0.1.0'
    || item.reviewItemRef.trim().length === 0
    || item.reviewArtifactRef.trim().length === 0
    || item.reviewerPrompt.trim().length === 0
    || item.labelOptions.length === 0
    || item.metricValuesExposed !== false
    || item.candidateMetricIdentityExposed !== false
    || item.providerIdentityExposed !== false
    || item.extractorIdentityExposed !== false
    || item.coverageBinExposed !== false
    || item.candidateThresholdExposed !== false
    || item.traditionalMeaningExposed !== false
    || item.fortuneOutputExposed !== false
    || item.peerLabelsExposed !== false
  ) fail(`review item ${item.reviewItemRef} is not an FR218 provider/metric-blind item.`);

  const labels = item.labelOptions.map((option) => option.key);
  if (new Set(labels).size !== labels.length) fail(`review item ${item.reviewItemRef} contains duplicate label options.`);
  if (!labels.includes('not_assessable')) fail(`review item ${item.reviewItemRef} must preserve the not_assessable path.`);
}

function assetRoute(sessionRef: string, reviewItemRef: string, assetDigest: string): string {
  const routeKey = createHash('sha256')
    .update(`${sessionRef}\u0000${reviewItemRef}\u0000${assetDigest}`, 'utf8')
    .digest('hex');
  return `/asset/${routeKey}`;
}

export function materializeBlindedReviewSessionFR219(
  input: FR219ReviewSessionInput,
): FR219ReviewSession {
  const sessionRef = safeRef(input.sessionRef, 'sessionRef');
  const reviewerKey = safeRef(input.reviewerKey, 'reviewerKey');
  if (typeof input.reviewerHumanAttested !== 'boolean') fail('reviewerHumanAttested must be boolean.');
  if (typeof input.reviewerIndependenceAttested !== 'boolean') fail('reviewerIndependenceAttested must be boolean.');
  if (!Array.isArray(input.items) || input.items.length === 0) fail('review session requires at least one item.');

  const seenItems = new Set<string>();
  const seenRoutes = new Set<string>();
  const reviewItems: FR218BlindedReviewItem[] = [];
  const bindings: FR219InternalAssetBinding[] = [];
  const publicItems: FR219PublicReviewItem[] = [];

  for (const entry of input.items) {
    assertBlindReviewItem(entry.reviewItem);
    const reviewItemRef = safeRef(entry.reviewItem.reviewItemRef, 'reviewItemRef');
    if (seenItems.has(reviewItemRef)) fail(`duplicate review item: ${reviewItemRef}.`);
    seenItems.add(reviewItemRef);

    const path = nonEmpty(entry.assetPath, `${reviewItemRef}.assetPath`);
    if (!SHA256.test(entry.assetDigest)) fail(`${reviewItemRef}.assetDigest must be canonical sha256.`);
    if (!ALLOWED_MEDIA_TYPES.has(entry.mediaType)) fail(`${reviewItemRef}.mediaType is unsupported.`);

    const route = assetRoute(sessionRef, reviewItemRef, entry.assetDigest);
    if (seenRoutes.has(route)) fail(`duplicate opaque asset route: ${route}.`);
    seenRoutes.add(route);

    reviewItems.push(entry.reviewItem);
    bindings.push(Object.freeze({
      reviewItemRef,
      assetPath: path,
      assetDigest: entry.assetDigest,
      mediaType: entry.mediaType,
      assetRoute: route,
      sourcePathExposedToReviewer: false as const,
      assetDigestExposedToReviewer: false as const,
    }));
    publicItems.push(Object.freeze({
      reviewItemRef,
      assetRoute: route,
      reviewerPrompt: entry.reviewItem.reviewerPrompt,
      labelOptions: Object.freeze(entry.reviewItem.labelOptions.map((option) => Object.freeze({
        key: option.key,
        reviewerMeaning: option.reviewerMeaning,
      }))),
    }));
  }

  const publicManifest: FR219PublicReviewManifest = Object.freeze({
    schemaVersion: 'fr219-provider-blind-review-manifest-v1' as const,
    contractVersion: FR219_CONTRACT_VERSION,
    sessionRef,
    constructRef: 'observable.eye_pair.outer_corner_orientation@0.1.0' as const,
    items: Object.freeze(publicItems),
    metricValuesExposed: false as const,
    metricIdentityExposed: false as const,
    providerIdentityExposed: false as const,
    extractorIdentityExposed: false as const,
    sourcePathsExposed: false as const,
    partitionExposed: false as const,
    thresholdsExposed: false as const,
    traditionalMeaningExposed: false as const,
    fortuneOutputExposed: false as const,
    peerLabelsExposed: false as const,
    reviewerKeyExposed: false as const,
  });

  const session: FR219ReviewSession = Object.freeze({
    schemaVersion: 'fr219-observable-morphology-human-review-session-v1' as const,
    artifactVersion: '0.1.0' as const,
    contractVersion: FR219_CONTRACT_VERSION,
    authorityState: 'localhost_blinded_review_collection_ready_no_empirical_sufficiency_claim' as const,
    sessionRef,
    reviewerKey,
    reviewerAttestation: Object.freeze({
      humanReviewerAttested: input.reviewerHumanAttested,
      reviewerIndependenceAttested: input.reviewerIndependenceAttested,
      humanIdentityIndependentlyVerified: false as const,
      reviewerIndependenceIndependentlyVerified: false as const,
    }),
    reviewItems: Object.freeze(reviewItems),
    internalAssetBindings: Object.freeze(bindings),
    publicManifest,
    authorityBoundary: Object.freeze({
      sessionMaterializationMeansHumanReviewOccurred: false as const,
      sessionMaterializationMeansReviewerIsHuman: false as const,
      reviewerAttestationMeansIndependentVerification: false as const,
      annotationCountMeansEmpiricalSufficiency: false as const,
      thresholdIssued: false as const,
      classifierIssued: false as const,
      transitionZoneIssued: false as const,
      traditionalBindingIssued: false as const,
      productionActivated: false as const,
      commerceActivated: false as const,
    }),
  });
  ISSUED_SESSIONS.add(session);
  return session;
}

export function assertIssuedReviewSessionFR219(session: FR219ReviewSession): void {
  if (!ISSUED_SESSIONS.has(session)) fail(`review session ${session.sessionRef} was not issued by FR219.`);
  if (
    session.schemaVersion !== 'fr219-observable-morphology-human-review-session-v1'
    || session.artifactVersion !== '0.1.0'
    || session.contractVersion !== FR219_CONTRACT_VERSION
    || session.authorityState !== 'localhost_blinded_review_collection_ready_no_empirical_sufficiency_claim'
    || session.publicManifest.metricValuesExposed !== false
    || session.publicManifest.metricIdentityExposed !== false
    || session.publicManifest.providerIdentityExposed !== false
    || session.publicManifest.extractorIdentityExposed !== false
    || session.publicManifest.sourcePathsExposed !== false
    || session.publicManifest.partitionExposed !== false
    || session.publicManifest.thresholdsExposed !== false
    || session.publicManifest.traditionalMeaningExposed !== false
    || session.publicManifest.fortuneOutputExposed !== false
    || session.publicManifest.peerLabelsExposed !== false
    || session.publicManifest.reviewerKeyExposed !== false
  ) fail(`review session ${session.sessionRef} authority boundary drift.`);
}

export function admitHumanAnnotationFR219(
  session: FR219ReviewSession,
  input: FR219AnnotationInput,
): FR219AnnotationRecord {
  assertIssuedReviewSessionFR219(session);
  const reviewItemRef = safeRef(input.reviewItemRef, 'annotation.reviewItemRef');
  const item = session.reviewItems.find((candidate) => candidate.reviewItemRef === reviewItemRef);
  if (item === undefined) fail(`annotation references unknown review item: ${reviewItemRef}.`);
  if (!item.labelOptions.some((option) => option.key === input.label)) {
    fail(`annotation label ${String(input.label)} is not offered by ${reviewItemRef}.`);
  }
  const timestamp = Date.parse(input.recordedAt);
  if (!Number.isFinite(timestamp)) fail('annotation.recordedAt must be a parseable timestamp.');

  const digestPayload = canonicalJson({
    sessionRef: session.sessionRef,
    reviewItemRef,
    reviewerKey: session.reviewerKey,
    label: input.label,
    recordedAt: input.recordedAt,
  });
  const record: FR219AnnotationRecord = Object.freeze({
    schemaVersion: 'fr219-observable-morphology-annotation-record-v1' as const,
    contractVersion: FR219_CONTRACT_VERSION,
    sessionRef: session.sessionRef,
    reviewItemRef,
    reviewerKey: session.reviewerKey,
    label: input.label,
    recordedAt: input.recordedAt,
    reviewerHumanAttested: session.reviewerAttestation.humanReviewerAttested,
    reviewerIndependenceAttested: session.reviewerAttestation.reviewerIndependenceAttested,
    reviewerIdentityIndependentlyVerified: false as const,
    reviewerIndependenceIndependentlyVerified: false as const,
    metricValueObservedByReviewer: false as const,
    metricIdentityObservedByReviewer: false as const,
    providerIdentityObservedByReviewer: false as const,
    peerLabelsObservedByReviewer: false as const,
    traditionalMeaningObservedByReviewer: false as const,
    annotationDigest: digest(digestPayload),
  });
  ISSUED_ANNOTATIONS.add(record);
  return record;
}

export function assertIssuedAnnotationFR219(record: FR219AnnotationRecord): void {
  if (!ISSUED_ANNOTATIONS.has(record)) fail(`annotation ${record.annotationDigest} was not issued by FR219.`);
  if (
    record.schemaVersion !== 'fr219-observable-morphology-annotation-record-v1'
    || record.contractVersion !== FR219_CONTRACT_VERSION
    || !SHA256.test(record.annotationDigest)
    || record.reviewerIdentityIndependentlyVerified !== false
    || record.reviewerIndependenceIndependentlyVerified !== false
    || record.metricValueObservedByReviewer !== false
    || record.metricIdentityObservedByReviewer !== false
    || record.providerIdentityObservedByReviewer !== false
    || record.peerLabelsObservedByReviewer !== false
    || record.traditionalMeaningObservedByReviewer !== false
  ) fail(`annotation ${record.annotationDigest} authority boundary drift.`);
}

export function buildAnnotationEvidenceReceiptFR219(
  sessions: readonly FR219ReviewSession[],
  annotations: readonly FR219AnnotationRecord[],
): FR219AnnotationEvidenceReceipt {
  if (sessions.length === 0) fail('evidence receipt requires at least one issued session.');
  sessions.forEach(assertIssuedReviewSessionFR219);
  const sessionByRef = new Map(sessions.map((session) => [session.sessionRef, session] as const));
  if (sessionByRef.size !== sessions.length) fail('evidence receipt contains duplicate session refs.');

  const seenReviewerItem = new Set<string>();
  for (const record of annotations) {
    assertIssuedAnnotationFR219(record);
    const session = sessionByRef.get(record.sessionRef);
    if (session === undefined) fail(`annotation references unknown session: ${record.sessionRef}.`);
    if (record.reviewerKey !== session.reviewerKey) fail(`annotation reviewer/session mismatch: ${record.annotationDigest}.`);
    const pair = `${record.reviewerKey}\u0000${record.reviewItemRef}`;
    if (seenReviewerItem.has(pair)) fail(`duplicate reviewer/item annotation: ${record.reviewerKey} / ${record.reviewItemRef}.`);
    seenReviewerItem.add(pair);
  }

  const reviewItemByRef = new Map<string, FR218BlindedReviewItem>();
  for (const session of sessions) {
    for (const item of session.reviewItems) {
      const existing = reviewItemByRef.get(item.reviewItemRef);
      if (existing === undefined) {
        reviewItemByRef.set(item.reviewItemRef, item);
      } else if (canonicalJson(existing) !== canonicalJson(item)) {
        fail(`review item definition drift across sessions: ${item.reviewItemRef}.`);
      }
    }
  }
  const allReviewItems = [...reviewItemByRef.values()];
  const fr218Annotations: FR218ReviewerAnnotation[] = annotations.map((record) => ({
    reviewItemRef: record.reviewItemRef,
    reviewerKey: record.reviewerKey,
    label: record.label,
  }));
  if (fr218Annotations.length > 0) {
    summarizeOrdinalAnnotationsFR218(allReviewItems, fr218Annotations);
  }

  const sortedRecords = [...annotations].sort((left, right) =>
    left.annotationDigest.localeCompare(right.annotationDigest));
  const evidenceDigest = digest(canonicalJson(sortedRecords.map((record) => ({
    sessionRef: record.sessionRef,
    reviewItemRef: record.reviewItemRef,
    reviewerKey: record.reviewerKey,
    label: record.label,
    recordedAt: record.recordedAt,
    annotationDigest: record.annotationDigest,
  }))));
  const reviewerKeys = [...new Set(sessions.map((session) => session.reviewerKey))].sort();
  const reviewItemRefs = [...new Set(annotations.map((record) => record.reviewItemRef))].sort();
  const humanReviewerAttestationCount = sessions.filter(
    (session) => session.reviewerAttestation.humanReviewerAttested,
  ).length;
  const reviewerIndependenceAttestationCount = sessions.filter(
    (session) => session.reviewerAttestation.reviewerIndependenceAttested,
  ).length;

  return Object.freeze({
    schemaVersion: 'fr219-observable-morphology-annotation-evidence-receipt-v1' as const,
    contractVersion: FR219_CONTRACT_VERSION,
    evidenceRef: `evidence.fr219.observable_morphology_annotation:${evidenceDigest.slice('sha256:'.length)}`,
    sessionRefs: Object.freeze([...sessionByRef.keys()].sort()),
    reviewerKeys: Object.freeze(reviewerKeys),
    reviewItemRefs: Object.freeze(reviewItemRefs),
    annotationCount: annotations.length,
    reviewedItemCount: reviewItemRefs.length,
    reviewerCount: reviewerKeys.length,
    humanReviewerAttestationCount,
    reviewerIndependenceAttestationCount,
    rawReviewerDisagreementPreserved: true as const,
    consensusCollapsed: false as const,
    annotationRecordsPresent: annotations.length > 0,
    declaredHumanAnnotationEvidencePresent:
      annotations.length > 0
      && sessions.length > 0
      && humanReviewerAttestationCount === sessions.length,
    allReviewersHumanAttested:
      sessions.length > 0 && humanReviewerAttestationCount === sessions.length,
    allReviewersIndependentAttested:
      sessions.length > 0 && reviewerIndependenceAttestationCount === sessions.length,
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
    evidenceDigest,
  });
}
