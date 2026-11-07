// Local research-only optional ledger. Same-frame agreement is descriptive,
// NOT reviewer identity proof, ground truth, or prospective repeatability.
import { EYE_FOLD_REVIEW_STATES } from './eye-fold-review.mjs';
import { EAR_DETAIL_STATES } from './ear-detail-review.mjs';

export const FR294_INDEPENDENT_PAIR_LEDGER_VERSION =
  'myeongha-fr294-independent-screen-review-pairs-v1';
export const FR294_INDEPENDENT_PAIR_AUDIT_VERSION = 'local-fr294-independent-pair-audit@0.1.0';
const TARGETS = Object.freeze({
  'eye.eyelid_crease_or_hooded_category': Object.freeze({
    kind: 'eye_fold_screen_category',
    statuses: EYE_FOLD_REVIEW_STATES,
    comparable: Object.freeze(['visible', 'hooded', 'no_visible_crease', 'partial']),
  }),
  'ear.visible_boundary_height_shape': Object.freeze({
    kind: 'ear_outer_rim_visibility',
    statuses: EAR_DETAIL_STATES,
    comparable: Object.freeze(['marked', 'partial', 'not_visible']),
  }),
});
const REF = /^capture-[0-9]{2,}$/;
const OPAQUE = /^[a-zA-Z0-9_-]{8,80}$/;
const SHA = /^[a-f0-9]{64}$/;
const isObject = (x) => x !== null && typeof x === 'object' && !Array.isArray(x);
const exact = (x, keys) =>
  isObject(x) &&
  Object.keys(x).length === keys.length &&
  keys.every((key) => Object.hasOwn(x, key));
function invalid() {
  throw Error('FR294_INDEPENDENT_PAIR_LEDGER_INVALID');
}
const noAuthority = Object.freeze({
  distinctRealHumanReviewersProven: false,
  reviewerBlindnessIndependentlyVerified: false,
  independentGroundTruthValidated: false,
  accuracyValidated: false,
  prospectiveRepeatCaptureValidated: false,
  canonicalF0Admitted: false,
  traditionalBindingAuthorized: false,
  productInterpretationAuthorized: false,
  modelTrainingAuthorized: false,
});

export function auditFr294IndependentScreenReviewPairs(ledger, inventory, humanReadiness) {
  if (
    !exact(ledger, ['schemaVersion', 'pairs']) ||
    ledger.schemaVersion !== FR294_INDEPENDENT_PAIR_LEDGER_VERSION ||
    !Array.isArray(ledger.pairs) ||
    ledger.pairs.length > 250 ||
    !(inventory instanceof Map) ||
    !isObject(humanReadiness) ||
    humanReadiness.schemaVersion !== 'local-fr294-human-evidence-readiness@0.1.0' ||
    humanReadiness.status !== 'available' ||
    humanReadiness.independentHumanReferenceValidated !== false ||
    humanReadiness.repeatCaptureAgreementValidated !== false ||
    humanReadiness.canonicalObservationAdmitted !== false ||
    !isObject(humanReadiness.captures)
  )
    invalid();

  const seen = new Set();
  const featureCounts = Object.fromEntries(
    Object.keys(TARGETS).map((k) => [
      k,
      { pairedCaptures: 0, agreementSides: 0, disagreementSides: 0, notComparableSides: 0 },
    ]),
  );
  const perCapture = Object.fromEntries([...inventory.keys()].map((k) => [k, []]));
  if (
    inventory.size !== humanReadiness.captureCount ||
    [...inventory.keys()].some(
      (ref) => !REF.test(ref) || !Array.isArray(humanReadiness.captures[ref]),
    )
  )
    invalid();

  for (const entry of ledger.pairs) {
    if (
      !exact(entry, [
        'captureRef',
        'sourceSha256',
        'featureKey',
        'viewRole',
        'reviews',
        'sameOriginalImageAttested',
        'reviewerSeparationAttested',
        'researchConsentAttested',
        'usedForModelTraining',
      ]) ||
      !REF.test(entry.captureRef) ||
      !SHA.test(entry.sourceSha256) ||
      !Object.hasOwn(TARGETS, entry.featureKey) ||
      !['frontal', 'profile'].includes(entry.viewRole) ||
      !Array.isArray(entry.reviews) ||
      entry.reviews.length !== 2 ||
      entry.sameOriginalImageAttested !== true ||
      entry.reviewerSeparationAttested !== true ||
      entry.researchConsentAttested !== true ||
      entry.usedForModelTraining !== false
    )
      invalid();
    const original = inventory.get(entry.captureRef);
    if (
      !original ||
      original.sourceSha256 !== entry.sourceSha256 ||
      original.viewRole !== entry.viewRole ||
      (TARGETS[entry.featureKey].kind === 'eye_fold_screen_category' &&
        entry.viewRole !== 'frontal')
    )
      invalid();

    const feature = humanReadiness.captures[entry.captureRef].find(
      (item) => item.featureKey === entry.featureKey,
    );
    if (
      !feature ||
      feature.independentHumanReferenceValidated !== false ||
      feature.repeatCaptureAgreementValidated !== false ||
      feature.canonicalObservationAdmitted !== false
    )
      invalid();
    const pairKey = entry.captureRef + '|' + entry.featureKey;
    if (seen.has(pairKey)) invalid();
    seen.add(pairKey);

    const reviewers = new Set();
    const sessions = new Set();
    const target = TARGETS[entry.featureKey];
    for (const r of entry.reviews) {
      if (
        !exact(r, [
          'reviewerRef',
          'sessionRef',
          'reviewedAt',
          'blindToOtherReviewAttested',
          'originalViewedAttested',
          'imageLeft',
          'imageRight',
        ]) ||
        !OPAQUE.test(r.reviewerRef) ||
        !OPAQUE.test(r.sessionRef) ||
        reviewers.has(r.reviewerRef) ||
        sessions.has(r.sessionRef) ||
        typeof r.reviewedAt !== 'string' ||
        !/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(r.reviewedAt) ||
        !Number.isFinite(Date.parse(r.reviewedAt)) ||
        r.blindToOtherReviewAttested !== true ||
        r.originalViewedAttested !== true ||
        !target.statuses.includes(r.imageLeft) ||
        !target.statuses.includes(r.imageRight)
      )
        invalid();
      reviewers.add(r.reviewerRef);
      sessions.add(r.sessionRef);
    }
    const pairCounts = { agree: 0, disagree: 0, notComparable: 0 };
    for (const side of ['imageLeft', 'imageRight']) {
      const [a, b] = entry.reviews.map((review) => review[side]);
      if (!target.comparable.includes(a) || !target.comparable.includes(b))
        pairCounts.notComparable++;
      else if (a === b) pairCounts.agree++;
      else pairCounts.disagree++;
    }
    const totals = featureCounts[entry.featureKey];
    totals.pairedCaptures++;
    totals.agreementSides += pairCounts.agree;
    totals.disagreementSides += pairCounts.disagree;
    totals.notComparableSides += pairCounts.notComparable;
    perCapture[entry.captureRef].push(
      Object.freeze({
        featureKey: entry.featureKey,
        reviewerCodePairRecorded: true,
        matchingComparableSides: pairCounts.agree,
        differingComparableSides: pairCounts.disagree,
        notComparableSides: pairCounts.notComparable,
        ...noAuthority,
      }),
    );
  }
  const count = ledger.pairs.length;
  return Object.freeze({
    schemaVersion: FR294_INDEPENDENT_PAIR_AUDIT_VERSION,
    status: count === 0 ? 'not_collected' : 'descriptive_pairs_only',
    captureCount: inventory.size,
    reviewerCodePairsRecorded: count,
    featureCounts: Object.freeze(
      Object.fromEntries(Object.entries(featureCounts).map(([k, v]) => [k, Object.freeze(v)])),
    ),
    perCapture: Object.freeze(
      Object.fromEntries(
        Object.entries(perCapture).map(([ref, entries]) => [ref, Object.freeze(entries)]),
      ),
    ),
    ...noAuthority,
  });
}

export function withheldFr294IndependentPairs(reason) {
  if (
    ![
      'LEDGER_RESTORE_FAILED',
      'STALE_SOURCE_OR_INVALID_LEDGER',
      'HUMAN_READINESS_UNAVAILABLE',
      'PROTOCOL_NOT_COLLECTED',
    ].includes(reason)
  )
    invalid();
  return Object.freeze({
    schemaVersion: FR294_INDEPENDENT_PAIR_AUDIT_VERSION,
    status: 'withheld',
    reason,
    ...noAuthority,
  });
}
