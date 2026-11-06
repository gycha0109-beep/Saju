import { describe, it, expect } from 'vitest';
import {
  auditRealPhotoEvidence,
  parseEvidenceCsv,
} from '../tools/face-reading/two-view/real-photo-evidence-audit.mjs';

const groups = { first_500: 500, additional_1000: 1000, east_asia_source_500: 500 };
const sha = 'a'.repeat(64);
const stateCount = (total) => ({
  not_run: 0,
  partially_visible_or_occluded: 0,
  visible_interface_candidate: total,
  unavailable: 0,
  no_visible_hairline_candidate: 0,
});
const summaryGroup = (total) => ({
  processed: total,
  face_single_count: total,
  face_none_count: 0,
  face_multiple_count: 0,
  face_error_count: 0,
  hairline_candidate_count: total,
  hairline_runtime_authorized_count: 0,
  ear_boundary_supported_count: 0,
  hairline_states: stateCount(total),
});
function fixtures() {
  const summary = {
    not_ground_truth_accuracy: true,
    model_sha256: sha,
    hairline_source_sha256: sha,
    results: {
      all: summaryGroup(2000),
      ...Object.fromEntries(Object.entries(groups).map(([name, n]) => [name, summaryGroup(n)])),
    },
  };
  const results = ['dataset,photo_id,landmark_face_status,hairline_state'];
  const queue = [
    'dataset,photo_id,human_review_decision,human_review_notes,reviewed_at,review_case,landmark_face_status,hairline_state',
  ];
  for (const [dataset, n] of Object.entries(groups)) {
    for (let i = 0; i < n; i++) {
      const key = 'private-photo-' + i;
      results.push([dataset, key, 'face_landmarks', 'visible_interface_candidate'].join(','));
      if (i < 56) {
        const decision = i < 10 ? 'wrong' : '';
        queue.push(
          [
            dataset,
            key,
            decision,
            decision ? '"Observed, but wrong"' : '',
            decision ? '2026-11-04' : '',
            'hairline_candidate_needs_review',
            'face_landmarks',
            'visible_interface_candidate',
          ].join(','),
        );
      }
    }
  }
  const gt = {
    schemaVersion: 'human-hairline-review-v1',
    records: {
      'first_500:private-photo-0': {
        segments: [],
        humanReviewed: false,
        anatomicalHairlineAuthorized: false,
      },
    },
  };
  return { summary, results: results.join('\n'), queue: queue.join('\n'), gt };
}

describe('private 2,000-photo evidence audit', () => {
  it('reconciles three model groups and review queue without confusing candidate coverage with accuracy', () => {
    const f = fixtures();
    const report = auditRealPhotoEvidence(f.summary, f.results, f.queue, f.gt);
    expect(report.modelEvidence).toMatchObject({
      processed: 2000,
      singleFaceLandmarks: 2000,
      hairlineInterfaceCandidates: 2000,
      noFace: 0,
    });
    expect(report.humanReview).toMatchObject({
      reviewQueueSize: 168,
      reviewDecisionCounts: { wrong: 30, undecided: 138 },
      stratifiedReview: {
        byDataset: {
          first_500: { selected: 56, decisions: { wrong: 10, undecided: 46 } },
          additional_1000: { selected: 56, decisions: { wrong: 10, undecided: 46 } },
          east_asia_source_500: { selected: 56, decisions: { wrong: 10, undecided: 46 } },
        },
        byModelReviewCase: {
          hairline_candidate_needs_review: {
            selected: 168,
            decisions: { wrong: 30, undecided: 138 },
          },
        },
        populationAccuracyEstimationAuthorized: false,
      },
      draftBoundaryRecords: 1,
      recordsWithDrawnSegments: 0,
      reviewerFlaggedBoundaryRecords: 0,
      independentBoundaryAccuracyValidated: false,
    });
    expect(report).toMatchObject({
      canonicalF0Admitted: false,
      traditionalF1BindingAuthorized: false,
      productionAuthorized: false,
      photoIdentifiersOrGeometryEmitted: false,
    });
    expect(JSON.stringify(report)).not.toMatch(/private-photo-|2026-11-04|Observed/);
  });

  it('rejects partial groups, contradictory summaries and duplicate photo records', () => {
    const f = fixtures();
    f.summary.results.first_500.hairline_candidate_count -= 1;
    expect(() => auditRealPhotoEvidence(f.summary, f.results, f.queue, f.gt)).toThrow(
      'EVIDENCE_SUMMARY_MISMATCH',
    );
    f.summary.results.first_500.hairline_candidate_count += 1;
    const truncated = f.results.split('\n').slice(0, -1).join('\n');
    expect(() => auditRealPhotoEvidence(f.summary, truncated, f.queue, f.gt)).toThrow(
      'EVIDENCE_DATASET_INCOMPLETE',
    );
    expect(() =>
      auditRealPhotoEvidence(f.summary, f.results + '\n' + f.results.split('\n')[1], f.queue, f.gt),
    ).toThrow('EVIDENCE_DUPLICATE_ROW');
  });

  it('does not accept unknown review labels, duplicate reviews or unauthorized annotation identities', () => {
    const f = fixtures();
    expect(() =>
      auditRealPhotoEvidence(
        f.summary,
        f.results,
        f.queue.replace(
          'wrong,"Observed, but wrong",2026-11-04',
          'made_up,"Observed, but wrong",2026-11-04',
        ),
        f.gt,
      ),
    ).toThrow('EVIDENCE_QUEUE_INVALID');
    f.gt.records['unknown:photo'] = {
      segments: [],
      humanReviewed: false,
      anatomicalHairlineAuthorized: false,
    };
    expect(() => auditRealPhotoEvidence(f.summary, f.results, f.queue, f.gt)).toThrow(
      'EVIDENCE_ANNOTATION_INVALID',
    );
  });

  it('rejects review states or case labels that disagree with the model record', () => {
    const f = fixtures();
    const caseMismatch = f.queue.replace(
      'hairline_candidate_needs_review,face_landmarks,visible_interface_candidate',
      'hairline_not_visible,face_landmarks,visible_interface_candidate',
    );
    expect(() => auditRealPhotoEvidence(f.summary, f.results, caseMismatch, f.gt)).toThrow(
      'EVIDENCE_QUEUE_INVALID',
    );
    const stateMismatch = f.queue.replace(
      'hairline_candidate_needs_review,face_landmarks,visible_interface_candidate',
      'hairline_candidate_needs_review,face_landmarks,no_visible_hairline_candidate',
    );
    expect(() => auditRealPhotoEvidence(f.summary, f.results, stateMismatch, f.gt)).toThrow(
      'EVIDENCE_QUEUE_INVALID',
    );
    const faceMismatch = f.queue.replace(
      'hairline_candidate_needs_review,face_landmarks,visible_interface_candidate',
      'hairline_candidate_needs_review,no_face,visible_interface_candidate',
    );
    expect(() => auditRealPhotoEvidence(f.summary, f.results, faceMismatch, f.gt)).toThrow(
      'EVIDENCE_QUEUE_INVALID',
    );
  });

  it('recognizes valid human annotations as draft evidence only, never as verified accuracy', () => {
    const f = fixtures();
    f.gt.records['first_500:private-photo-0'] = {
      segments: [
        {
          points: [
            { x: 0.3, y: 0.1 },
            { x: 0.6, y: 0.12 },
          ],
        },
      ],
      humanReviewed: true,
      anatomicalHairlineAuthorized: false,
    };
    const report = auditRealPhotoEvidence(f.summary, f.results, f.queue, f.gt);
    expect(report.humanReview.recordsWithDrawnSegments).toBe(1);
    expect(report.humanReview.reviewerFlaggedBoundaryRecords).toBe(1);
    expect(report.humanReview.independentBoundaryAccuracyValidated).toBe(false);
    expect(JSON.stringify(report)).not.toMatch(/"x"|"y"|"points"/);
  });

  it('parses quoted review notes safely and rejects corrupted CSV', () => {
    const x = parseEvidenceCsv('one,two\r\nfoo,"bar, baz\nwith ""quotes"""\r\n');
    expect(x.rows).toEqual([{ one: 'foo', two: 'bar, baz\nwith "quotes"' }]);
    expect(() => parseEvidenceCsv('one,two\n"a,b')).toThrow('EVIDENCE_CSV_INVALID');
    expect(() => parseEvidenceCsv('one,one\n1,2')).toThrow('EVIDENCE_CSV_INVALID');
  });
});