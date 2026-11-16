import { describe, expect, it } from 'vitest';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { Buffer } from 'node:buffer';
import {
  prepareRealPhotoReviewPlan,
  chooseReviewCases,
  writePrivateRealPhotoPlan,
  admitReviewedPhotos,
} from '../tools/face-reading/two-view/real-photo-review-intake-bridge.mjs';

const hash = (value) => createHash('sha256').update(value).digest('hex');
const csv = (rows) => rows.map((line) => line.join(',')).join('\n') + '\n';
const rootHeaders = ['file', 'sha256', 'license'];
const resultHeaders = ['dataset', 'photo_id', 'landmark_face_status', 'hairline_state'];
const queueHeaders = [
  'dataset',
  'photo_id',
  'file_relative_to_MyeongHa_Facial_500',
  'review_case',
  'landmark_face_status',
  'hairline_state',
  'human_review_decision',
  'reviewed_at',
];

const cases = [
  ['face_not_single', 'no_face', 'not_run', 'wrong'],
  ['hairline_candidate_needs_review', 'face_landmarks', 'visible_interface_candidate', 'correct'],
  ['hairline_not_visible', 'face_landmarks', 'no_visible_hairline_candidate', 'wrong'],
  ['hairline_partial_or_occluded', 'face_landmarks', 'partially_visible_or_occluded', 'partial'],
  ['hairline_unavailable', 'face_landmarks', 'unavailable', 'unknown'],
];
const datasets = [
  ['first_500', 'photos', 'source_manifest.csv'],
  ['additional_1000', 'additional_1000/photos', 'additional_1000/source_manifest.csv'],
  ['east_asia_source_500', 'east_asia_500/photos', 'east_asia_500/source_manifest.csv'],
];
async function fixture() {
  const root = await mkdtemp(join(tmpdir(), 'face-review-bridge-'));
  const all = [],
    queued = [];
  for (const [dataset, images, manifest] of datasets) {
    await mkdir(join(root, images), { recursive: true });
    const lines = [rootHeaders];
    for (let i = 0; i < cases.length; i++) {
      const photo = 'face_' + String(i + 1).padStart(4, '0');
      const name = photo + '.jpg';
      const data = Buffer.from(dataset + ':' + name);
      await writeFile(join(root, images, name), data);
      lines.push([name, hash(data), 'CC BY 4.0']);
      if (dataset === 'first_500') {
        const [type, face, hairline, decision] = cases[i];
        all.push([dataset, photo, face, hairline]);
        queued.push([
          dataset,
          photo,
          images + '/' + name,
          type,
          face,
          hairline,
          decision,
          '2026-11-04T07:00:00Z',
        ]);
      }
    }
    await writeFile(join(root, manifest), csv(lines));
  }
  await mkdir(join(root, 'evaluation_2000'));
  await writeFile(join(root, 'evaluation_2000/results.csv'), csv([resultHeaders, ...all]));
  await writeFile(
    join(root, 'evaluation_2000/manual_review_queue.csv'),
    csv([queueHeaders, ...queued]),
  );
  return { root, cleanup: () => rm(root, { recursive: true, force: true }) };
}

describe('private real photo review intake bridge', () => {
  it('selects one existing reviewed case per class and never promotes old hairline evidence to 2D', async () => {
    const sample = await fixture();
    try {
      const plan = await prepareRealPhotoReviewPlan(sample.root, { perCase: 1 });
      expect(plan.selectedPhotoCount).toBe(5);
      expect(plan.entries.map((r) => r.legacyHairlineState)).toEqual(cases.map((row) => row[2]));
      expect(
        plan.entries.every(
          (r) =>
            r.current2dState === 'not_evaluated' &&
            r.viewRole === null &&
            r.independentAnatomicalBoundaryGroundTruth === false,
        ),
      ).toBe(true);
      expect(plan.sources.currentWholeFace2dExtractorsRun).toBe(false);
      const output = join(sample.root, 'evaluation_2000/private-plan.json');
      expect(await writePrivateRealPhotoPlan(plan, output)).toMatchObject({
        selectedPhotoCount: 5,
        poseReviewRequired: true,
      });
      await expect(writePrivateRealPhotoPlan(plan, output)).rejects.toThrow();
      expect((await readFile(output, 'utf8')).includes('sourceRelativePath')).toBe(true);
    } finally {
      await sample.cleanup();
    }
  });

  it('rejects changed JPEG bytes and mismatched legacy evidence', async () => {
    const sample = await fixture();
    try {
      await writeFile(join(sample.root, 'photos/face_0001.jpg'), 'altered');
      await expect(prepareRealPhotoReviewPlan(sample.root)).rejects.toThrow(
        'REAL_PHOTO_BRIDGE_IMAGE_MANIFEST_HASH_MISMATCH',
      );
    } finally {
      await sample.cleanup();
    }
  });

  it('does not admit photos without human pose decisions or model assets', async () => {
    const sample = await fixture();
    try {
      const plan = await prepareRealPhotoReviewPlan(sample.root, { perCase: 1 });
      const planPath = join(sample.root, 'evaluation_2000/plan.json');
      await writePrivateRealPhotoPlan(plan, planPath);
      const roles = plan.entries.map((item) => ({
        selectionRef: item.selectionRef,
        poseReviewed: false,
        viewRole: 'frontal',
        reviewedAt: '2026-11-12T01:00:00Z',
        reviewNote: 'test',
      }));
      const rolesPath = join(sample.root, 'evaluation_2000/roles.json');
      await writeFile(rolesPath, JSON.stringify(roles));
      const intake = join(sample.root, 'private-intake');
      await mkdir(intake, { recursive: true });
      await writeFile(join(intake, 'inventory.json'), '[]');
      await expect(admitReviewedPhotos(planPath, rolesPath, intake)).rejects.toThrow();
      await mkdir(join(intake, 'assets'));
      await writeFile(join(intake, 'assets/face_landmarker.task'), 'test pin');
      await writeFile(join(intake, 'combined-active.json'), '{}');
      await expect(admitReviewedPhotos(planPath, rolesPath, intake)).rejects.toThrow(
        'REAL_PHOTO_BRIDGE_PINNED_MODEL_MISSING_OR_CHANGED',
      );
      expect(chooseReviewCases([{ ...roles[0] }])).toEqual([]);
    } finally {
      await sample.cleanup();
    }
  });
});
