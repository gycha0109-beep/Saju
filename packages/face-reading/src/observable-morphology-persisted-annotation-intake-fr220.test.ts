import { describe, expect, it } from 'vitest';
import {
  admitHumanAnnotationFR219,
  buildAnnotationEvidenceReceiptFR219,
  materializeBlindedReviewSessionFR219,
  type FR219ReviewSession,
} from './observable-morphology-human-review-fr219.js';
import {
  assertVerifiedPersistedAnnotationEvidenceFR220,
  verifyPersistedAnnotationEvidenceFR220,
} from './observable-morphology-persisted-annotation-intake-fr220.js';
import type { FR218BlindedReviewItem } from './observable-morphology-validation-fr218.js';

function item(ref = 'review-item:shared'): FR218BlindedReviewItem {
  return {
    reviewItemRef: ref,
    reviewArtifactRef: `review-artifact:${ref}`,
    constructRef: 'observable.eye_pair.outer_corner_orientation@0.1.0',
    reviewerPrompt: '이 사람의 눈꼬리는 전체적으로 어떻게 보이나요?',
    labelOptions: [
      { key: 'clearly_downturned', reviewerMeaning: '눈꼬리가 확실히 내려가 보임' },
      { key: 'slightly_downturned', reviewerMeaning: '눈꼬리가 약간 내려가 보임' },
      { key: 'approximately_horizontal', reviewerMeaning: '눈꼬리가 거의 수평으로 보임' },
      { key: 'slightly_upturned', reviewerMeaning: '눈꼬리가 약간 올라가 보임' },
      { key: 'clearly_upturned', reviewerMeaning: '눈꼬리가 확실히 올라가 보임' },
      { key: 'not_assessable', reviewerMeaning: '이 이미지에서는 판단하기 어려움' },
    ],
    metricValuesExposed: false,
    candidateMetricIdentityExposed: false,
    providerIdentityExposed: false,
    extractorIdentityExposed: false,
    coverageBinExposed: false,
    candidateThresholdExposed: false,
    traditionalMeaningExposed: false,
    fortuneOutputExposed: false,
    peerLabelsExposed: false,
  };
}

function session(
  reviewerKey: string,
  items: readonly FR218BlindedReviewItem[],
  human = true,
  independent = true,
): FR219ReviewSession {
  return materializeBlindedReviewSessionFR219({
    sessionRef: `session:${reviewerKey}`,
    reviewerKey,
    reviewerHumanAttested: human,
    reviewerIndependenceAttested: independent,
    items: items.map((reviewItem, index) => ({
      reviewItem,
      assetPath: `/private/${reviewerKey}/${index}.png`,
      assetDigest: `sha256:${String(index + 1).repeat(64).slice(0, 64)}`,
      mediaType: 'image/png',
      embeddedMetadataSanitizedAttested: true,
    })),
  });
}

function persisted<T>(value: T): unknown {
  return JSON.parse(JSON.stringify(value));
}

describe('FR220 persisted blinded annotation evidence intake', () => {
  it('round-trips real FR219 records and receipt after process-style JSON serialization', () => {
    const shared = item();
    const first = session('reviewer:1', [shared]);
    const second = session('reviewer:2', [shared]);

    const annotations = [
      admitHumanAnnotationFR219(first, {
        reviewItemRef: shared.reviewItemRef,
        label: 'slightly_upturned',
        recordedAt: '2026-09-20T12:30:00.000Z',
      }),
      admitHumanAnnotationFR219(second, {
        reviewItemRef: shared.reviewItemRef,
        label: 'approximately_horizontal',
        recordedAt: '2026-09-20T12:31:00.000Z',
      }),
    ];
    const receipt = buildAnnotationEvidenceReceiptFR219([first, second], annotations);

    const verified = verifyPersistedAnnotationEvidenceFR220({
      annotationRecords: persisted(annotations) as readonly unknown[],
      evidenceReceipt: persisted(receipt),
    });

    expect(verified.annotationCount).toBe(2);
    expect(verified.reviewedItemCount).toBe(1);
    expect(verified.reviewerCount).toBe(2);
    expect(verified.sessionCount).toBe(2);
    expect(verified.fr219EvidenceRef).toBe(receipt.evidenceRef);
    expect(verified.fr219EvidenceDigest).toBe(receipt.evidenceDigest);
    expect(verified.itemDistributions[0]!.countsByLabel.slightly_upturned).toBe(1);
    expect(verified.itemDistributions[0]!.countsByLabel.approximately_horizontal).toBe(1);
    expect(verified.itemDistributions[0]!.rawReviewerDisagreementPreserved).toBe(true);
    expect(verified.itemDistributions[0]!.consensusCollapsed).toBe(false);
    expect(verified.declaredHumanAnnotationEvidencePresent).toBe(true);
    expect(verified.allReviewersIndependentAttested).toBe(true);
    expect(verified.authorityBoundary.reviewerHumanStatusIndependentlyVerified).toBe(false);
    expect(verified.authorityBoundary.empiricalSufficiencyEstablished).toBe(false);
    expect(verified.authorityBoundary.repeatCaptureStabilityEstablished).toBe(false);
    expect(verified.authorityBoundary.thresholdIssued).toBe(false);
    expect(verified.authorityBoundary.classifierIssued).toBe(false);
    expect(verified.authorityBoundary.traditionalBindingIssued).toBe(false);
    expect(() => assertVerifiedPersistedAnnotationEvidenceFR220(verified)).not.toThrow();
  });

  it('rejects a persisted annotation whose label was tampered after digest issuance', () => {
    const reviewItem = item();
    const reviewer = session('reviewer:1', [reviewItem]);
    const annotation = admitHumanAnnotationFR219(reviewer, {
      reviewItemRef: reviewItem.reviewItemRef,
      label: 'slightly_upturned',
      recordedAt: '2026-09-20T12:30:00.000Z',
    });
    const receipt = buildAnnotationEvidenceReceiptFR219([reviewer], [annotation]);
    const tampered = persisted(annotation) as Record<string, unknown>;
    tampered.label = 'clearly_downturned';

    expect(() => verifyPersistedAnnotationEvidenceFR220({
      annotationRecords: [tampered],
      evidenceReceipt: persisted(receipt),
    })).toThrow(/annotation\[0\] digest mismatch/u);
  });

  it('rejects a persisted receipt whose aggregate counts were tampered', () => {
    const reviewItem = item();
    const reviewer = session('reviewer:1', [reviewItem]);
    const annotation = admitHumanAnnotationFR219(reviewer, {
      reviewItemRef: reviewItem.reviewItemRef,
      label: 'not_assessable',
      recordedAt: '2026-09-20T12:30:00.000Z',
    });
    const receipt = persisted(
      buildAnnotationEvidenceReceiptFR219([reviewer], [annotation]),
    ) as Record<string, unknown>;
    receipt.annotationCount = 99;

    expect(() => verifyPersistedAnnotationEvidenceFR220({
      annotationRecords: [persisted(annotation)],
      evidenceReceipt: receipt,
    })).toThrow(/counts\/attestations/u);
  });

  it('rejects duplicate reviewer/item annotations after persistence', () => {
    const reviewItem = item();
    const reviewer = session('reviewer:1', [reviewItem]);
    const annotation = admitHumanAnnotationFR219(reviewer, {
      reviewItemRef: reviewItem.reviewItemRef,
      label: 'slightly_downturned',
      recordedAt: '2026-09-20T12:30:00.000Z',
    });
    const receipt = buildAnnotationEvidenceReceiptFR219([reviewer], [annotation]);

    expect(() => verifyPersistedAnnotationEvidenceFR220({
      annotationRecords: [persisted(annotation), persisted(annotation)],
      evidenceReceipt: persisted(receipt),
    })).toThrow(/duplicate reviewer\/item annotation/u);
  });

  it('rejects session attestation drift across persisted records', () => {
    const firstItem = item('review-item:first');
    const secondItem = item('review-item:second');
    const reviewer = session('reviewer:1', [firstItem, secondItem]);
    const annotations = [
      admitHumanAnnotationFR219(reviewer, {
        reviewItemRef: firstItem.reviewItemRef,
        label: 'slightly_upturned',
        recordedAt: '2026-09-20T12:30:00.000Z',
      }),
      admitHumanAnnotationFR219(reviewer, {
        reviewItemRef: secondItem.reviewItemRef,
        label: 'slightly_upturned',
        recordedAt: '2026-09-20T12:31:00.000Z',
      }),
    ];
    const receipt = buildAnnotationEvidenceReceiptFR219([reviewer], annotations);
    const records = persisted(annotations) as Record<string, unknown>[];
    records[1]!.reviewerHumanAttested = false;

    expect(() => verifyPersistedAnnotationEvidenceFR220({
      annotationRecords: records,
      evidenceReceipt: persisted(receipt),
    })).toThrow(/session attestation drift/u);
  });

  it('does not upgrade self-attested persisted labels into empirical sufficiency', () => {
    const reviewItem = item();
    const reviewer = session('reviewer:unattested', [reviewItem], false, false);
    const annotation = admitHumanAnnotationFR219(reviewer, {
      reviewItemRef: reviewItem.reviewItemRef,
      label: 'not_assessable',
      recordedAt: '2026-09-20T12:30:00.000Z',
    });
    const receipt = buildAnnotationEvidenceReceiptFR219([reviewer], [annotation]);

    const verified = verifyPersistedAnnotationEvidenceFR220({
      annotationRecords: [persisted(annotation)],
      evidenceReceipt: persisted(receipt),
    });

    expect(verified.declaredHumanAnnotationEvidencePresent).toBe(false);
    expect(verified.allReviewersHumanAttested).toBe(false);
    expect(verified.allReviewersIndependentAttested).toBe(false);
    expect(verified.authorityBoundary.persistedIntegrityVerificationMeansReviewerIsHuman).toBe(false);
    expect(verified.authorityBoundary.empiricalSufficiencyEstablished).toBe(false);
  });

  it('rejects receipts that claim sessions with no persisted annotation record', () => {
    const reviewItem = item();
    const annotated = session('reviewer:annotated', [reviewItem]);
    const empty = session('reviewer:empty', [reviewItem]);
    const annotation = admitHumanAnnotationFR219(annotated, {
      reviewItemRef: reviewItem.reviewItemRef,
      label: 'approximately_horizontal',
      recordedAt: '2026-09-20T12:30:00.000Z',
    });
    const receipt = buildAnnotationEvidenceReceiptFR219([annotated, empty], [annotation]);

    expect(() => verifyPersistedAnnotationEvidenceFR220({
      annotationRecords: [persisted(annotation)],
      evidenceReceipt: persisted(receipt),
    })).toThrow(/receipt\.sessionRefs does not match/u);
  });
});
