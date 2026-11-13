import { describe, it, expect } from 'vitest';
import { mkdtemp, writeFile, rm, unlink, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import {
  readCurrentFr294IndependentPairLedger,
  FR294_INDEPENDENT_PAIR_FILE_MAX_BYTES,
  FR294_INDEPENDENT_PAIR_LEDGER_VERSION,
  auditFr294IndependentScreenReviewPairs,
} from '../tools/face-reading/two-view/fr294-independent-review-pairs.mjs';

async function withScratch<T>(task: (file: string) => Promise<T>): Promise<T> {
  const dir = await mkdtemp(join(tmpdir(), 'face-fr294-private-ledger-test-'));
  try {
    return await task(join(dir, 'fr294-independent-pairs-private.json'));
  } finally {
    await rm(dir, { force: true, recursive: true });
  }
}
const syntheticSha = 'ab'.repeat(32);
const emptyLedger = () => ({ schemaVersion: FR294_INDEPENDENT_PAIR_LEDGER_VERSION, pairs: [] });
const pairLedger = () => ({
  schemaVersion: FR294_INDEPENDENT_PAIR_LEDGER_VERSION,
  pairs: [
    {
      captureRef: 'capture-01',
      sourceSha256: syntheticSha,
      featureKey: 'eye.eyelid_crease_or_hooded_category',
      viewRole: 'frontal',
      reviews: [
        {
          reviewerRef: 'test-code-A1',
          sessionRef: 'synthetic-session-one',
          reviewedAt: '2026-11-08T00:00:00.000Z',
          blindToOtherReviewAttested: true,
          originalViewedAttested: true,
          imageLeft: 'visible',
          imageRight: 'hooded',
        },
        {
          reviewerRef: 'test-code-B2',
          sessionRef: 'synthetic-session-two',
          reviewedAt: '2026-11-08T00:00:01.000Z',
          blindToOtherReviewAttested: true,
          originalViewedAttested: true,
          imageLeft: 'visible',
          imageRight: 'no_visible_crease',
        },
      ],
      sameOriginalImageAttested: true,
      reviewerSeparationAttested: true,
      researchConsentAttested: true,
      usedForModelTraining: false,
    },
  ],
});
function syntheticHumanReadiness() {
  return {
    schemaVersion: 'local-fr294-human-evidence-readiness@0.1.0',
    status: 'available',
    captureCount: 1,
    independentHumanReferenceValidated: false,
    repeatCaptureAgreementValidated: false,
    canonicalObservationAdmitted: false,
    captures: {
      'capture-01': [
        {
          featureKey: 'eye.eyelid_crease_or_hooded_category',
          independentHumanReferenceValidated: false,
          repeatCaptureAgreementValidated: false,
          canonicalObservationAdmitted: false,
        },
      ],
    },
  };
}
describe('FR294 private local pair file freshness (synthetic-only)', () => {
  it('reads a file created after the first request and forgets it when deleted', async () => {
    await withScratch(async (file) => {
      const missing = await readCurrentFr294IndependentPairLedger(file);
      expect(missing).toMatchObject({ status: 'not_collected', ledger: emptyLedger() });
      await writeFile(file, JSON.stringify(emptyLedger()), 'utf8');
      expect(await readCurrentFr294IndependentPairLedger(file)).toMatchObject({
        status: 'loaded',
        ledger: emptyLedger(),
      });
      await unlink(file);
      expect((await readCurrentFr294IndependentPairLedger(file)).status).toBe('not_collected');
    });
  });
  it('observes replacement, never reuses previously loaded reviewer data', async () => {
    await withScratch(async (file) => {
      await writeFile(file, JSON.stringify(pairLedger()), 'utf8');
      const first = await readCurrentFr294IndependentPairLedger(file);
      expect(first.status).toBe('loaded');
      if (first.status !== 'loaded') throw Error('synthetic fixture failed');
      const inventory = new Map([
        ['capture-01', { sourceSha256: syntheticSha, viewRole: 'frontal' as const }],
      ]);
      const firstAudit = auditFr294IndependentScreenReviewPairs(
        first.ledger as Parameters<typeof auditFr294IndependentScreenReviewPairs>[0],
        inventory,
        syntheticHumanReadiness(),
      );
      expect(firstAudit).toMatchObject({
        status: 'descriptive_pairs_only',
        reviewerCodePairsRecorded: 1,
        independentGroundTruthValidated: false,
        prospectiveRepeatCaptureValidated: false,
        accuracyValidated: false,
      });
      await writeFile(file, JSON.stringify(emptyLedger()), 'utf8');
      const changed = await readCurrentFr294IndependentPairLedger(file);
      expect(changed).toMatchObject({ status: 'loaded', ledger: emptyLedger() });
      if (changed.status !== 'loaded') throw Error('missing updated fixture');
      const currentAudit = auditFr294IndependentScreenReviewPairs(
        changed.ledger as Parameters<typeof auditFr294IndependentScreenReviewPairs>[0],
        inventory,
        syntheticHumanReadiness(),
      );
      expect(currentAudit).toMatchObject({
        status: 'not_collected',
        reviewerCodePairsRecorded: 0,
        accuracyValidated: false,
      });
    });
  });
  it('withholds invalid JSON, empty files, oversize files and directories', async () => {
    await withScratch(async (file) => {
      await writeFile(file, '{not-json', 'utf8');
      expect(await readCurrentFr294IndependentPairLedger(file)).toEqual({
        status: 'withheld',
        reason: 'LEDGER_RESTORE_FAILED',
      });
      await writeFile(file, '', 'utf8');
      expect((await readCurrentFr294IndependentPairLedger(file)).status).toBe('withheld');
      await writeFile(file, 'x'.repeat(FR294_INDEPENDENT_PAIR_FILE_MAX_BYTES + 1));
      expect((await readCurrentFr294IndependentPairLedger(file)).status).toBe('withheld');
      await unlink(file);
      await mkdir(file);
      expect((await readCurrentFr294IndependentPairLedger(file)).status).toBe('withheld');
    });
  });
  it('rejects a stale synthetic photo SHA without exposing reviewer codes', async () => {
    await withScratch(async (file) => {
      await writeFile(file, JSON.stringify(pairLedger()), 'utf8');
      const loaded = await readCurrentFr294IndependentPairLedger(file);
      expect(loaded.status).toBe('loaded');
      if (loaded.status !== 'loaded') throw Error('missing synthetic fixture');
      const stale = new Map([
        [
          'capture-01',
          {
            sourceSha256: 'cd'.repeat(32),
            viewRole: 'frontal' as const,
          },
        ],
      ]);
      expect(() =>
        auditFr294IndependentScreenReviewPairs(
          loaded.ledger as Parameters<typeof auditFr294IndependentScreenReviewPairs>[0],
          stale,
          syntheticHumanReadiness(),
        ),
      ).toThrow('FR294_INDEPENDENT_PAIR_LEDGER_INVALID');
    });
  });
});
