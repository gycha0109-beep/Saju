import { describe, it, expect } from 'vitest';
import {
  FR294_INDEPENDENT_PAIR_LEDGER_VERSION,
  FR294_INDEPENDENT_PAIR_AUDIT_VERSION,
  auditFr294IndependentScreenReviewPairs,
  withheldFr294IndependentPairs,
} from '../tools/face-reading/two-view/fr294-independent-review-pairs.mjs';

const EYE = 'eye.eyelid_crease_or_hooded_category';
const EAR = 'ear.visible_boundary_height_shape';
const sha = 'a'.repeat(64);
const reviewer = (ref: string, session: string, imageLeft: string, imageRight: string) => ({
  reviewerRef: ref,
  sessionRef: session,
  reviewedAt: '2026-11-07T12:00:00.000Z',
  blindToOtherReviewAttested: true as const,
  originalViewedAttested: true as const,
  imageLeft,
  imageRight,
});
const pair = (featureKey: typeof EYE | typeof EAR = EYE) => ({
  captureRef: 'capture-01',
  sourceSha256: sha,
  featureKey,
  viewRole: 'frontal' as const,
  reviews: [
    reviewer('reviewer-alpha', 'session-alpha', 'visible', 'hooded'),
    reviewer('reviewer-bravo', 'session-bravo', 'visible', 'visible'),
  ] as [ReturnType<typeof reviewer>, ReturnType<typeof reviewer>],
  sameOriginalImageAttested: true as const,
  reviewerSeparationAttested: true as const,
  researchConsentAttested: true as const,
  usedForModelTraining: false as const,
});
const data = (items: ReturnType<typeof pair>[] = []) => ({
  schemaVersion: FR294_INDEPENDENT_PAIR_LEDGER_VERSION,
  pairs: items,
});
const human = (n = 2) => ({
  schemaVersion: 'local-fr294-human-evidence-readiness@0.1.0',
  status: 'available',
  captureCount: n,
  independentHumanReferenceValidated: false,
  repeatCaptureAgreementValidated: false,
  canonicalObservationAdmitted: false,
  captures: Object.fromEntries(
    Array.from({ length: n }, (_, index) => [
      'capture-' + String(index + 1).padStart(2, '0'),
      [EYE, EAR].map((featureKey) => ({
        featureKey,
        independentHumanReferenceValidated: false,
        repeatCaptureAgreementValidated: false,
        canonicalObservationAdmitted: false,
      })),
    ]),
  ),
});
const inventory = () =>
  new Map([
    ['capture-01', { sourceSha256: sha, viewRole: 'frontal' as const }],
    ['capture-02', { sourceSha256: 'b'.repeat(64), viewRole: 'profile' as const }],
  ]);
const audit = (ledger: ReturnType<typeof data>, inv = inventory(), h = human()) =>
  auditFr294IndependentScreenReviewPairs(ledger, inv, h);

describe('FR294 prospective-independent categorical pair audit', () => {
  it('starts empty for 18 existing development captures, no fabricated evidence', () => {
    const list = new Map(
      Array.from({ length: 18 }, (_, n) => [
        'capture-' + String(n + 1).padStart(2, '0'),
        { sourceSha256: sha, viewRole: 'frontal' as const },
      ]),
    );
    const result = auditFr294IndependentScreenReviewPairs(data(), list, human(18));
    expect(result).toMatchObject({
      schemaVersion: FR294_INDEPENDENT_PAIR_AUDIT_VERSION,
      status: 'not_collected',
      captureCount: 18,
      reviewerCodePairsRecorded: 0,
      independentGroundTruthValidated: false,
      prospectiveRepeatCaptureValidated: false,
      accuracyValidated: false,
      canonicalF0Admitted: false,
      modelTrainingAuthorized: false,
    });
    if (result.status === 'withheld') throw Error('unexpected withheld');
    expect(result.featureCounts[EYE]?.pairedCaptures).toBe(0);
    expect(result.featureCounts[EAR]?.pairedCaptures).toBe(0);
  });

  it('only counts two reviewer-code comparisons as descriptive, never truth', () => {
    const result = audit(data([pair()]));
    expect(result).toMatchObject({
      status: 'descriptive_pairs_only',
      reviewerCodePairsRecorded: 1,
      distinctRealHumanReviewersProven: false,
      reviewerBlindnessIndependentlyVerified: false,
      accuracyValidated: false,
      prospectiveRepeatCaptureValidated: false,
    });
    if (result.status === 'withheld') throw Error('unexpected withheld');
    expect(result.featureCounts[EYE]).toEqual({
      pairedCaptures: 1,
      agreementSides: 1,
      disagreementSides: 1,
      notComparableSides: 0,
    });
    expect(result.perCapture['capture-01']?.[0]).toMatchObject({
      matchingComparableSides: 1,
      differingComparableSides: 1,
      notComparableSides: 0,
      canonicalF0Admitted: false,
    });
    const publicText = JSON.stringify(result);
    expect(publicText).not.toContain(sha);
    expect(publicText).not.toContain('reviewer-alpha');
    expect(publicText).not.toContain('"imageRight":"hooded"');
  });

  it('excludes occluded and out-of-frame values from comparable counts', () => {
    const p = pair(EAR);
    p.reviews = [
      reviewer('reviewer-alpha', 'session-alpha', 'occluded', 'marked'),
      reviewer('reviewer-bravo', 'session-bravo', 'not_visible', 'marked'),
    ];
    const result = audit(data([p]));
    if (result.status === 'withheld') throw Error('unexpected withheld');
    expect(result.featureCounts[EAR]).toEqual({
      pairedCaptures: 1,
      agreementSides: 1,
      disagreementSides: 0,
      notComparableSides: 1,
    });
  });

  it('rejects duplicate reviewer or session codes and duplicate capture-feature pairs', () => {
    const p = pair();
    p.reviews[1].reviewerRef = 'reviewer-alpha';
    expect(() => audit(data([p]))).toThrow('FR294_INDEPENDENT_PAIR_LEDGER_INVALID');
    const q = pair();
    q.reviews[1].sessionRef = 'session-alpha';
    expect(() => audit(data([q]))).toThrow('FR294_INDEPENDENT_PAIR_LEDGER_INVALID');
    expect(() => audit(data([pair(), pair()]))).toThrow('FR294_INDEPENDENT_PAIR_LEDGER_INVALID');
  });

  it('rejects mismatched bytes, unknown capture and profile eye-fold review', () => {
    const p = pair();
    p.sourceSha256 = 'b'.repeat(64);
    expect(() => audit(data([p]))).toThrow('FR294_INDEPENDENT_PAIR_LEDGER_INVALID');
    const x = pair();
    x.captureRef = 'capture-99';
    expect(() => audit(data([x]))).toThrow();
    const y = pair();
    y.captureRef = 'capture-02';
    y.sourceSha256 = 'b'.repeat(64);
    y.viewRole = 'profile' as 'frontal';
    expect(() => audit(data([y]))).toThrow();
  });

  it('forbids training reuse, missing consent attestation and permission promotion', () => {
    const p = pair();
    Object.assign(p, { usedForModelTraining: true });
    expect(() => audit(data([p]))).toThrow();
    const q = pair();
    Object.assign(q, { researchConsentAttested: false });
    expect(() => audit(data([q]))).toThrow();
    const h = human();
    h.canonicalObservationAdmitted = true;
    expect(() => audit(data(), inventory(), h)).toThrow();
  });

  it('forbids unknown categories and arbitrary data fields in the ledger', () => {
    const p = pair();
    p.reviews[0].imageLeft = 'ethnicity_guess';
    expect(() => audit(data([p]))).toThrow();
    const q = pair();
    (q as typeof q & { rawPhotoPath: string }).rawPhotoPath = 'private.jpg';
    expect(() => audit(data([q]))).toThrow();
    expect(() => audit({ ...data(), trainingEnabled: true } as ReturnType<typeof data>)).toThrow();
  });

  it('withholds damaged ledger without revealing reviewer data', () => {
    for (const reason of [
      'LEDGER_RESTORE_FAILED',
      'STALE_SOURCE_OR_INVALID_LEDGER',
      'HUMAN_READINESS_UNAVAILABLE',
      'PROTOCOL_NOT_COLLECTED',
    ] as const) {
      const result = withheldFr294IndependentPairs(reason);
      expect(result).toMatchObject({
        status: 'withheld',
        reason,
        independentGroundTruthValidated: false,
        accuracyValidated: false,
        prospectiveRepeatCaptureValidated: false,
      });
      expect(JSON.stringify(result)).not.toContain(sha);
    }
  });
});
