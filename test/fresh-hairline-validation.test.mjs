import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { execFileSync } from 'node:child_process';
import { link, mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import process from 'node:process';
import {
  adjudicate,
  preregister,
  privatePath,
  runStage,
  validatePlan,
  validateWorksheet,
} from '../scripts/run-fresh-hairline-validation.mjs';
import { FR308_CASES, FR312_CASES } from '../scripts/run-multisignal-hairline-review-packet.mjs';

let root;
let plan;
let campaignOrdinal = 0;
const json = async (path) => JSON.parse(await readFile(path, 'utf8'));
const save = async (path, value) => writeFile(path, JSON.stringify(value));

beforeAll(async () => {
  execFileSync(process.execPath, [
    'node_modules/typescript/bin/tsc',
    '-p',
    'tsconfig.face-reading.build.json',
  ]);
  await mkdir('.cache/face-reading', { recursive: true });
  root = await mkdtemp(resolve('.cache/face-reading/fr2337-test-'));
  const records = [
    ...FR308_CASES.map((name) => ['fr308', name]),
    ...FR312_CASES.flatMap((name) => [
      ['fr312', name],
      ['fr312', name],
    ]),
  ];
  plan = {
    schemaVersion: 'fr2337-private-preregistration-v1',
    candidate: {
      modelId: 'candidate.hairline.multisignal_visible_interface.fr306',
      modelRevision: '0.4.0',
      runnerContractVersion: 'MULTISIGNAL-VISIBLE-HAIRLINE-LOCAL-CANDIDATE-v1',
    },
    frozenBeforeCandidateExecution: true,
    records: records.map(([stage, name], index) => ({
      recordId: `capture-${String(index + 1).padStart(2, '0')}`,
      sourcePath: resolve(root, `synthetic-${index}.txt`),
      stage,
      case: name,
      opaqueSessionLabel: `session-0${(index % 3) + 1}`,
      freshIndependentCaptureAttested: true,
      usedForDevelopment: false,
      derivedFromAnotherCapture: false,
    })),
  };
  await Promise.all(
    plan.records.map((record) => writeFile(record.sourcePath, 'synthetic non-image fixture')),
  );
}, 60000);

afterAll(async () => {
  if (root) await rm(root, { recursive: true, force: true });
});

// This injected runner writes synthetic contracts only; it never loads a face or makes a human judgment.
async function syntheticRunner(manifestPath, output) {
  const manifest = await json(manifestPath);
  for (const record of manifest.records) {
    const dir = resolve(output, record.recordId);
    await mkdir(dir);
    await save(resolve(dir, 'candidate.json'), {
      schemaVersion: 'multisignal-visible-hairline-local-candidate-v1',
      recordId: record.recordId,
      method: {
        id: 'adaptive_skin_edge_texture_continuity',
        version: '0.4.0',
        hairColorClassificationApplied: false,
        demographicInferenceApplied: false,
        hiddenHairlineCompletionApplied: false,
      },
      humanReviewRequired: true,
      automaticAdmissionAuthorized: false,
      neutralRuntimeHairlineObservationAuthorized: false,
      engineeringPreviewState: 'visible_interface_candidate',
      candidateBoundaryExposed: true,
      boundaryPoints: [[0, 0]],
      diagnosticBoundaryPoints: [[0, 0]],
    });
    await writeFile(resolve(dir, 'overlay.jpg'), 'synthetic overlay placeholder');
  }
  await save(resolve(output, 'private-summary.json'), {
    schemaVersion: 'multisignal-visible-hairline-private-summary-v1',
    captureCount: manifest.records.length,
    humanReviewRequired: true,
    automaticAdmissionAuthorized: false,
    results: manifest.records.map((record) => ({
      ...record,
      engineeringPreviewState: 'visible_interface_candidate',
      humanReviewRequired: true,
      automaticAdmissionAuthorized: false,
      signals: {},
    })),
  });
}

async function fixture() {
  const path = resolve(root, `campaign-${campaignOrdinal++}`);
  return { path, frozen: await preregister(plan, path) };
}

async function syntheticReview(path, stage, overrides = {}) {
  const file = resolve(path, `${stage}-worksheet.json`);
  const worksheet = await json(file);
  for (const record of worksheet.records) {
    record.review = {
      reviewCompleted: true,
      sourceAndOverlayInspected: true,
      visibleHairCandidateObserved: true,
      foreheadSkinCandidateObserved: true,
      diagnosticHairlineCandidateObserved: true,
      grossMislocalizationObserved: false,
      hiddenCompletionObserved: false,
      outOfFrameCompletionObserved: false,
      visibleInterfaceCandidateObserved: true,
      candidateFailureMode: 'useful_candidate',
      directPromptAuthoritativeHallucinationRisk: false,
      disposition: 'supports_further_evaluation',
      ...overrides,
    };
  }
  worksheet.fr310HumanReview.completed = true;
  worksheet.fr310HumanReview.privacyReviewConfirmed = true;
  worksheet.fr312Review = {
    humanReviewCompleted: true,
    sessionLabelsOpaque: true,
    subjectCoverage: 'multiple_subjects',
    demographicAttributesCollected: false,
  };
  await save(file, worksheet);
}

describe('fresh v3.3 staged validation, with synthetic evidence only', () => {
  it('rejects source replacement and runner drift before invoking image execution', async () => {
    const first = await fixture();
    const changedRunner = globalThis.structuredClone(first.frozen);
    changedRunner.runnerCodeDigest = 'not-the-frozen-runner';
    let consumed = false;
    const runner = async () => {
      consumed = true;
    };
    await expect(runStage(first.path, changedRunner, 'fr308', runner)).rejects.toThrow(
      'FROZEN_RUNNER_CODE_CHANGED',
    );
    const second = await fixture();
    const replacement = resolve(root, 'changed-source.txt');
    await writeFile(replacement, 'changed synthetic source');
    second.frozen.records[0].sourcePath = replacement;
    await expect(runStage(second.path, second.frozen, 'fr308', runner)).rejects.toThrow(
      'FROZEN_SOURCE_FILE_CHANGED',
    );
    expect(consumed).toBe(false);
  });

  it('accepts private Windows/native paths and rejects tracked repository paths', () => {
    expect(privatePath('.cache/face-reading/local.json', true)).toContain('local.json');
    expect(() => privatePath('research/face-reading/face.jpg')).toThrow('PRIVATE_PATH_REQUIRED');
  });

  it.each(['used', 'derived', 'revision', 'sessions', 'case', 'duplicate'])(
    'rejects invalid preregistration: %s',
    (kind) => {
      const input = globalThis.structuredClone(plan);
      if (kind === 'used') input.records[0].usedForDevelopment = true;
      if (kind === 'derived') input.records[0].derivedFromAnotherCapture = true;
      if (kind === 'revision') input.candidate.modelRevision = '0.3.0';
      if (kind === 'sessions')
        input.records.forEach((record) => {
          record.opaqueSessionLabel = 'session-01';
        });
      if (kind === 'case') input.records[4].case = FR308_CASES[0];
      if (kind === 'duplicate') input.records[4].sourcePath = input.records[0].sourcePath;
      expect(() => validatePlan(input)).toThrow();
    },
  );

  it('rejects the same source file under a different hardlink and never overwrites a campaign', async () => {
    const duplicate = globalThis.structuredClone(plan);
    const alias = resolve(root, 'hardlink.txt');
    await link(duplicate.records[0].sourcePath, alias);
    duplicate.records[4].sourcePath = alias;
    await expect(preregister(duplicate, resolve(root, 'duplicate'))).rejects.toThrow(
      'DUPLICATE_SOURCE_FILE',
    );
    const { path } = await fixture();
    await expect(preregister(plan, path)).rejects.toThrow();
  });

  it('cannot consume expanded sources before bounded review and does not auto-fill judgments', async () => {
    const { path, frozen } = await fixture();
    let consumed = false;
    await expect(
      runStage(path, frozen, 'fr312', async () => {
        consumed = true;
      }),
    ).rejects.toThrow();
    expect(consumed).toBe(false);
    await runStage(path, frozen, 'fr308', syntheticRunner);
    const worksheet = await json(resolve(path, 'fr308-worksheet.json'));
    expect(worksheet.records).toHaveLength(4);
    expect(worksheet.records[0].review.reviewCompleted).toBe(false);
    expect(worksheet.records[0].review.disposition).toBeNull();
    await expect(adjudicate(path, frozen, 'fr308')).rejects.toThrow(
      'SOURCE_OVERLAY_HUMAN_REVIEW_REQUIRED',
    );
    worksheet.records[0].routing.fr308Case = FR308_CASES[1];
    expect(() => validateWorksheet(frozen, 'fr308', worksheet)).toThrow('WORKSHEET_ROUTING_DRIFT');
  });

  it.each(['reject', 'repeat'])(
    'FR310 %s prevents expanded execution even with a fabricated eligible receipt',
    async (kind) => {
      const { path, frozen } = await fixture();
      await runStage(path, frozen, 'fr308', syntheticRunner);
      await syntheticReview(
        path,
        'fr308',
        kind === 'reject'
          ? { hiddenCompletionObserved: true, disposition: 'rejects_current_candidate_behavior' }
          : { disposition: 'inconclusive' },
      );
      const result = await adjudicate(path, frozen, 'fr308');
      expect(result.receipt.status).toBe('blocked_at_fr310');
      expect(result.receipt.fr312Attempted).toBe(false);
      expect(result.receipt.fr310Receipt.failureReasons.length).toBeGreaterThan(0);
      await save(resolve(path, 'fr310-receipt.json'), {
        status: 'fr310_eligible_for_expanded_validation',
      });
      let consumed = false;
      await expect(
        runStage(path, frozen, 'fr312', async () => {
          consumed = true;
        }),
      ).rejects.toThrow('FR310_NOT_ELIGIBLE');
      expect(consumed).toBe(false);
    },
  );

  it.each([false, true])(
    'executes 4 then 12, retaining FR312 failure/admission boundaries (failure=%s)',
    async (failure) => {
      const { path, frozen } = await fixture();
      await runStage(path, frozen, 'fr308', syntheticRunner);
      await syntheticReview(path, 'fr308');
      const bounded = await adjudicate(path, frozen, 'fr308');
      expect(bounded.receipt.status).toBe('fr310_eligible_for_expanded_validation');
      expect(bounded.receipt.fr312Attempted).toBe(false);
      await runStage(path, frozen, 'fr312', syntheticRunner);
      await syntheticReview(path, 'fr312', failure ? { grossMislocalizationObserved: true } : {});
      const result = await adjudicate(path, frozen, 'fr312');
      expect(result.receipt.status).toBe(
        failure ? 'blocked_at_fr312' : 'fr312_eligible_for_model_admission_review',
      );
      expect(result.fr312Receipt?.representativeOrdinaryRgbReady ?? false).toBe(false);
      expect(result.receipt.fr313AdmissionIssued).toBe(false);
      expect(JSON.stringify(result.receipt)).not.toContain(root);
      if (failure) expect(result.receipt.fr312Receipt.failureReasons.length).toBeGreaterThan(0);
    },
  );
});
