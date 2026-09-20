import { describe, expect, it } from 'vitest';
import {
  admitHumanAnnotationFR219,
  buildAnnotationEvidenceReceiptFR219,
  materializeBlindedReviewSessionFR219,
  type FR219ReviewSession,
} from './observable-morphology-human-review-fr219.js';
import type { FR218BlindedReviewItem } from './observable-morphology-validation-fr218.js';

function reviewItem(ref = 'review-item:one'): FR218BlindedReviewItem {
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
  human = true,
  independent = true,
  item = reviewItem(),
): FR219ReviewSession {
  return materializeBlindedReviewSessionFR219({
    sessionRef: `session:${reviewerKey}`,
    reviewerKey,
    reviewerHumanAttested: human,
    reviewerIndependenceAttested: independent,
    items: [{
      reviewItem: item,
      assetPath: `/private/${reviewerKey}.png`,
      assetDigest: `sha256:${'a'.repeat(64)}`,
      mediaType: 'image/png',
    }],
  });
}

describe('FR219 observable morphology human review', () => {
  it('materializes an opaque reviewer manifest without leaking source or research metadata', () => {
    const value = session('reviewer:1');

    expect(value.publicManifest.items).toHaveLength(1);
    expect(value.publicManifest.items[0]!.assetRoute).toMatch(/^\/asset\/[0-9a-f]{64}$/u);
    expect(value.publicManifest).not.toHaveProperty('reviewerKey');
    expect(JSON.stringify(value.publicManifest)).not.toContain('/private/');
    expect(JSON.stringify(value.publicManifest)).not.toContain('sha256:');
    expect(value.publicManifest.metricValuesExposed).toBe(false);
    expect(value.publicManifest.metricIdentityExposed).toBe(false);
    expect(value.publicManifest.providerIdentityExposed).toBe(false);
    expect(value.publicManifest.extractorIdentityExposed).toBe(false);
    expect(value.publicManifest.sourcePathsExposed).toBe(false);
    expect(value.publicManifest.partitionExposed).toBe(false);
    expect(value.publicManifest.thresholdsExposed).toBe(false);
    expect(value.publicManifest.traditionalMeaningExposed).toBe(false);
    expect(value.publicManifest.peerLabelsExposed).toBe(false);
  });

  it('rejects a review item that widens the FR218 blind boundary', () => {
    const forged = {
      ...reviewItem(),
      metricValuesExposed: true,
    } as unknown as FR218BlindedReviewItem;

    expect(() => session('reviewer:bad', true, true, forged))
      .toThrow(/not an FR218 provider\/metric-blind item/u);
  });

  it('admits exactly offered labels and preserves reviewer attestation separately from verification', () => {
    const value = session('reviewer:1');
    const record = admitHumanAnnotationFR219(value, {
      reviewItemRef: 'review-item:one',
      label: 'slightly_upturned',
      recordedAt: '2026-09-20T11:40:00.000Z',
    });

    expect(record.label).toBe('slightly_upturned');
    expect(record.reviewerHumanAttested).toBe(true);
    expect(record.reviewerIndependenceAttested).toBe(true);
    expect(record.reviewerIdentityIndependentlyVerified).toBe(false);
    expect(record.reviewerIndependenceIndependentlyVerified).toBe(false);
    expect(record.metricValueObservedByReviewer).toBe(false);
    expect(record.providerIdentityObservedByReviewer).toBe(false);

    expect(() => admitHumanAnnotationFR219(value, {
      reviewItemRef: 'review-item:one',
      label: 'not-a-label' as never,
      recordedAt: '2026-09-20T11:40:00.000Z',
    })).toThrow(/is not offered/u);
  });

  it('aggregates multiple reviewers on the same item while preserving disagreement', () => {
    const item = reviewItem();
    const first = session('reviewer:1', true, true, item);
    const second = session('reviewer:2', true, true, item);

    const annotations = [
      admitHumanAnnotationFR219(first, {
        reviewItemRef: item.reviewItemRef,
        label: 'slightly_upturned',
        recordedAt: '2026-09-20T11:40:00.000Z',
      }),
      admitHumanAnnotationFR219(second, {
        reviewItemRef: item.reviewItemRef,
        label: 'approximately_horizontal',
        recordedAt: '2026-09-20T11:41:00.000Z',
      }),
    ];

    const receipt = buildAnnotationEvidenceReceiptFR219([first, second], annotations);
    expect(receipt.annotationCount).toBe(2);
    expect(receipt.reviewedItemCount).toBe(1);
    expect(receipt.reviewerCount).toBe(2);
    expect(receipt.rawReviewerDisagreementPreserved).toBe(true);
    expect(receipt.consensusCollapsed).toBe(false);
    expect(receipt.annotationRecordsPresent).toBe(true);
    expect(receipt.declaredHumanAnnotationEvidencePresent).toBe(true);
    expect(receipt.allReviewersHumanAttested).toBe(true);
    expect(receipt.allReviewersIndependentAttested).toBe(true);
    expect(receipt.reviewerHumanStatusIndependentlyVerified).toBe(false);
    expect(receipt.empiricalSufficiencyEstablished).toBe(false);
    expect(receipt.repeatCaptureStabilityEstablished).toBe(false);
    expect(receipt.thresholdIssued).toBe(false);
    expect(receipt.classifierIssued).toBe(false);
    expect(receipt.traditionalBindingIssued).toBe(false);
  });

  it('does not call records human evidence when a reviewer is not human-attested', () => {
    const value = session('reviewer:unattested', false, false);
    const annotation = admitHumanAnnotationFR219(value, {
      reviewItemRef: 'review-item:one',
      label: 'not_assessable',
      recordedAt: '2026-09-20T11:42:00.000Z',
    });

    const receipt = buildAnnotationEvidenceReceiptFR219([value], [annotation]);
    expect(receipt.annotationRecordsPresent).toBe(true);
    expect(receipt.declaredHumanAnnotationEvidencePresent).toBe(false);
    expect(receipt.allReviewersHumanAttested).toBe(false);
    expect(receipt.allReviewersIndependentAttested).toBe(false);
    expect(receipt.empiricalSufficiencyEstablished).toBe(false);
  });

  it('rejects duplicate reviewer/item annotations in evidence aggregation', () => {
    const value = session('reviewer:1');
    const first = admitHumanAnnotationFR219(value, {
      reviewItemRef: 'review-item:one',
      label: 'slightly_upturned',
      recordedAt: '2026-09-20T11:40:00.000Z',
    });
    const second = admitHumanAnnotationFR219(value, {
      reviewItemRef: 'review-item:one',
      label: 'approximately_horizontal',
      recordedAt: '2026-09-20T11:41:00.000Z',
    });

    expect(() => buildAnnotationEvidenceReceiptFR219([value], [first, second]))
      .toThrow(/duplicate reviewer\/item annotation/u);
  });
});
