import process from 'node:process';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const SIZES = Object.freeze({ first_500: 500, additional_1000: 1000, east_asia_source_500: 500 });
const STATES = [
  'not_run',
  'partially_visible_or_occluded',
  'visible_interface_candidate',
  'unavailable',
  'no_visible_hairline_candidate',
];
const FACES = ['face_landmarks', 'no_face', 'multiple_faces', 'error'];
const REQUIRED = ['dataset', 'photo_id', 'landmark_face_status', 'hairline_state'];
const REVIEW_CASES = Object.freeze({
  face_not_single: 'not_run',
  hairline_candidate_needs_review: 'visible_interface_candidate',
  hairline_not_visible: 'no_visible_hairline_candidate',
  hairline_partial_or_occluded: 'partially_visible_or_occluded',
  hairline_unavailable: 'unavailable',
});
const REVIEW_DECISIONS = Object.freeze(['correct', 'wrong', 'partial', 'unknown', 'undecided']);
function decisionCounts() {
  return Object.fromEntries(REVIEW_DECISIONS.map((decision) => [decision, 0]));
}

export function parseEvidenceCsv(text) {
  if (typeof text !== 'string') throw Error('EVIDENCE_CSV_INVALID');
  const data = text.replace(/^\uFEFF/, '');
  let rows = [],
    row = [],
    value = '',
    quoted = false,
    closed = false;
  for (let i = 0; i < data.length; i++) {
    const c = data[i];
    if (quoted) {
      if (c === '"') {
        if (data[i + 1] === '"') {
          value += '"';
          i++;
        } else {
          quoted = false;
          closed = true;
        }
      } else {
        value += c;
      }
    } else if (c === '"' && !closed && value.length === 0) {
      quoted = true;
    } else if (c === ',') {
      row.push(value);
      value = '';
      closed = false;
    } else if (c === '\r' || c === '\n') {
      if (c === '\r' && data[i + 1] === '\n') i++;
      row.push(value);
      if (row.some((x) => x !== '')) rows.push(row);
      row = [];
      value = '';
      closed = false;
    } else if (c === '"' || closed) {
      throw Error('EVIDENCE_CSV_INVALID');
    } else {
      value += c;
    }
  }
  if (quoted) throw Error('EVIDENCE_CSV_INVALID');
  if (row.length || value.length) {
    row.push(value);
    rows.push(row);
  }
  if (!rows.length) throw Error('EVIDENCE_CSV_INVALID');
  const header = rows.shift();
  if (new Set(header).size !== header.length || header.some((x) => !x))
    throw Error('EVIDENCE_CSV_INVALID');
  return {
    header,
    rows: rows.map((values) => {
      if (values.length !== header.length) throw Error('EVIDENCE_CSV_INVALID');
      return Object.fromEntries(header.map((name, i) => [name, values[i]]));
    }),
  };
}

function requiredHeaders(table, required) {
  if (!required.every((key) => table.header.includes(key))) throw Error('EVIDENCE_COLUMNS_INVALID');
}

function tally(rows) {
  const result = {
    processed: rows.length,
    faceSingle: 0,
    faceNone: 0,
    faceMultiple: 0,
    faceError: 0,
    hairlineCandidates: 0,
    hairlineStates: Object.fromEntries(STATES.map((state) => [state, 0])),
  };
  for (const row of rows) {
    if (!FACES.includes(row.landmark_face_status) || !STATES.includes(row.hairline_state))
      throw Error('EVIDENCE_STATE_INVALID');
    result.faceSingle += Number(row.landmark_face_status === 'face_landmarks');
    result.faceNone += Number(row.landmark_face_status === 'no_face');
    result.faceMultiple += Number(row.landmark_face_status === 'multiple_faces');
    result.faceError += Number(row.landmark_face_status === 'error');
    result.hairlineCandidates += Number(row.hairline_state === 'visible_interface_candidate');
    result.hairlineStates[row.hairline_state] += 1;
  }
  return result;
}
function verifySummary(s, t) {
  if (
    !s ||
    s.processed !== t.processed ||
    s.face_single_count !== t.faceSingle ||
    s.face_none_count !== t.faceNone ||
    s.face_multiple_count !== t.faceMultiple ||
    s.face_error_count !== t.faceError ||
    s.hairline_candidate_count !== t.hairlineCandidates ||
    s.hairline_runtime_authorized_count !== 0 ||
    s.ear_boundary_supported_count !== 0 ||
    !s.hairline_states ||
    STATES.some((k) => s.hairline_states[k] !== t.hairlineStates[k])
  )
    throw Error('EVIDENCE_SUMMARY_MISMATCH');
}

export function auditRealPhotoEvidence(summary, resultsCsv, reviewCsv, gt) {
  if (
    !summary ||
    summary.not_ground_truth_accuracy !== true ||
    !/^[a-f0-9]{64}$/i.test(summary.model_sha256 || '') ||
    !/^[a-f0-9]{64}$/i.test(summary.hairline_source_sha256 || '') ||
    !summary.results ||
    !gt ||
    gt.schemaVersion == null ||
    !gt.records ||
    Array.isArray(gt.records) ||
    typeof gt.records !== 'object'
  )
    throw Error('EVIDENCE_PROVENANCE_INVALID');
  const results = parseEvidenceCsv(resultsCsv),
    review = parseEvidenceCsv(reviewCsv);
  requiredHeaders(results, REQUIRED);
  requiredHeaders(review, [
    'dataset',
    'photo_id',
    'human_review_decision',
    'human_review_notes',
    'reviewed_at',
    'review_case',
    'landmark_face_status',
    'hairline_state',
  ]);
  const seen = new Set(),
    modelByKey = new Map(),
    byGroup = Object.fromEntries(Object.keys(SIZES).map((k) => [k, []]));
  for (const row of results.rows) {
    if (!Object.hasOwn(SIZES, row.dataset) || !row.photo_id) throw Error('EVIDENCE_ROW_INVALID');
    const key = row.dataset + ':' + row.photo_id;
    if (seen.has(key)) throw Error('EVIDENCE_DUPLICATE_ROW');
    seen.add(key);
    modelByKey.set(key, row);
    byGroup[row.dataset].push(row);
  }
  const groups = {};
  for (const [name, expected] of Object.entries(SIZES)) {
    const stats = tally(byGroup[name]);
    if (stats.processed !== expected) throw Error('EVIDENCE_DATASET_INCOMPLETE');
    verifySummary(summary.results[name], stats);
    groups[name] = {
      processed: stats.processed,
      singleFaceLandmarks: stats.faceSingle,
      hairlineInterfaceCandidate: stats.hairlineCandidates,
      hairlineModelStates: stats.hairlineStates,
    };
  }
  const all = tally(results.rows);
  verifySummary(summary.results.all, all);
  const selected = new Set(),
    decisions = decisionCounts();
  const queueByGroup = Object.fromEntries(Object.keys(SIZES).map((k) => [k, 0]));
  const byDataset = Object.fromEntries(
    Object.keys(SIZES).map((k) => [k, { selected: 0, decisions: decisionCounts() }]),
  );
  const byReviewCase = Object.fromEntries(
    Object.keys(REVIEW_CASES).map((k) => [k, { selected: 0, decisions: decisionCounts() }]),
  );
  for (const row of review.rows) {
    const key = row.dataset + ':' + row.photo_id;
    const matched = modelByKey.get(key);
    if (
      !matched ||
      selected.has(key) ||
      !Object.hasOwn(REVIEW_CASES, row.review_case) ||
      row.hairline_state !== matched.hairline_state ||
      row.landmark_face_status !== matched.landmark_face_status ||
      row.hairline_state !== REVIEW_CASES[row.review_case]
    )
      throw Error('EVIDENCE_QUEUE_INVALID');
    selected.add(key);
    queueByGroup[row.dataset] += 1;
    const choice = row.human_review_decision || 'undecided';
    if (!Object.hasOwn(decisions, choice)) throw Error('EVIDENCE_QUEUE_INVALID');
    if ((choice === 'undecided') !== (row.reviewed_at.trim().length === 0))
      throw Error('EVIDENCE_QUEUE_INVALID');
    decisions[choice] += 1;
    byDataset[row.dataset].selected += 1;
    byDataset[row.dataset].decisions[choice] += 1;
    byReviewCase[row.review_case].selected += 1;
    byReviewCase[row.review_case].decisions[choice] += 1;
  }
  if (selected.size !== 168 || Object.values(queueByGroup).some((n) => n !== 56))
    throw Error('EVIDENCE_QUEUE_INVALID');
  let draftBoundaryRecords = 0,
    manuallyMarkedBoundaryRecords = 0,
    reviewerFlaggedRecords = 0;
  for (const [key, item] of Object.entries(gt.records)) {
    if (
      !selected.has(key) ||
      !item ||
      typeof item !== 'object' ||
      !Array.isArray(item.segments) ||
      typeof item.humanReviewed !== 'boolean' ||
      typeof item.anatomicalHairlineAuthorized !== 'boolean'
    )
      throw Error('EVIDENCE_ANNOTATION_INVALID');
    draftBoundaryRecords++;
    if (item.segments.length > 0) manuallyMarkedBoundaryRecords++;
    if (item.humanReviewed && item.segments.length > 0) reviewerFlaggedRecords++;
  }
  return Object.freeze({
    schemaVersion: 'local-2000-photo-evidence-and-review-readiness@0.2.0',
    source: 'existing_local_20261104_mediapipe_hairline_evaluation',
    modelEvidence: {
      processed: all.processed,
      singleFaceLandmarks: all.faceSingle,
      noFace: all.faceNone,
      multipleFaces: all.faceMultiple,
      modelErrors: all.faceError,
      hairlineInterfaceCandidates: all.hairlineCandidates,
      hairlineModelStates: all.hairlineStates,
      groups,
    },
    humanReview: {
      reviewQueueSize: selected.size,
      reviewDecisionCounts: decisions,
      stratifiedReview: {
        byDataset,
        byModelReviewCase: byReviewCase,
        selection: 'stratified_case_queue_not_random_population_sample',
        populationAccuracyEstimationAuthorized: false,
      },
      draftBoundaryRecords,
      recordsWithDrawnSegments: manuallyMarkedBoundaryRecords,
      reviewerFlaggedBoundaryRecords: reviewerFlaggedRecords,
      independentBoundaryAccuracyValidated: false,
      humanBoundaryAdjudicationState: 'not_evaluated',
    },
    proofLimit: 'model_in_frame_and_hairline_candidate_coverage_not_anatomical_accuracy',
    photoIdentifiersOrGeometryEmitted: false,
    canonicalF0Admitted: false,
    traditionalF1BindingAuthorized: false,
    productionAuthorized: false,
  });
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.length !== 3) {
    process.stderr.write(
      'Usage: node tools/face-reading/two-view/real-photo-evidence-audit.mjs <private-evaluation-dir>\n',
    );
    process.exitCode = 2;
  } else {
    try {
      const path = process.argv[2];
      const [summary, results, review, groundTruth] = await Promise.all([
        readFile(join(path, 'summary.json'), 'utf8').then(JSON.parse),
        readFile(join(path, 'results.csv'), 'utf8'),
        readFile(join(path, 'manual_review_queue.csv'), 'utf8'),
        readFile(join(path, 'manual_ground_truth_168.json'), 'utf8').then(JSON.parse),
      ]);
      process.stdout.write(
        JSON.stringify(auditRealPhotoEvidence(summary, results, review, groundTruth), null, 2) +
          '\n',
      );
    } catch {
      process.stderr.write('FACE_REAL_PHOTO_EVIDENCE_UNAVAILABLE: local evidence inconsistent\n');
      process.exitCode = 1;
    }
  }
}