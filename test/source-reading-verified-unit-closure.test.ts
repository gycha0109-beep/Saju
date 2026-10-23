import { describe, expect, it, vi } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { CalculationPolicySnapshot } from '../src/contracts/calculation.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { SUPPORTED_NARRATIVE_OUTPUT_SCHEMA } from '../src/llm/prompt-compiler.js';
import { createGeneralNatalUsefulReadingCandidateRegistry } from
  '../src/research/general-natal-useful-reading-candidate.js';
import { executeProductReading } from '../src/reading/governed-reading-execution.js';
import { buildProductReadingDelivery } from '../src/reading/product-reading-delivery.js';
import { buildProductReadingResponse } from '../src/reading/product-reading-response.js';
import {
  inspectSajuReaderRecordsSourceHandoffV1,
} from '../src/reading/source-reading-reader-records-handoff.js';
import { inspectSourceReadingProofReadinessV1 } from
  '../src/reading/source-reading-proof-readiness.js';
import {
  issueHeldSourceReadingTransportProofV1,
} from '../src/reading/source-reading-transport-proof.js';
import {
  verifyHeldSajuSourceUnitClosureV1,
  type VerifyHeldSajuSourceUnitClosureOptionsV1,
} from '../src/reading/source-reading-verified-unit-closure.js';

const KEY = Buffer.alloc(32, 97);
const ISSUE_TIME = 1_800_000_000_000;
const NONCE = 'b'.repeat(30);
const REQUEST = {
  birth: {
    calendarType: 'solar', date: '2024-03-10', time: '12:00',
    sex: 'unspecified',
  },
  reading: { text: '사주' },
};
const POLICY: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/source-unit-proof-closure-fixture',
  policyVersion: '1.0.0',
  dayBoundary: 'midnight',
  trueSolarTime: {
    enabled: false, longitudeSource: 'not-applicable',
    applyEquationOfTime: false, applyHistoricalDst: false,
  },
  timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
};
async function actualReading() {
  const snapshot = calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year: 2024, month: 3, day: 10 },
    time: { known: true, hour: 12, minute: 0 },
    sexForTraditionalCalculation: 'unspecified',
  }, POLICY, { now: new Date('2026-08-24T00:00:00.000Z') });
  const registry = createGeneralNatalUsefulReadingCandidateRegistry(
    '2026-08-24T00:04:00.000Z',
  );
  const interpretation = runInterpretation(snapshot, registry, {
    requestId: 'source-unit-proof-closure-interpretation',
    now: new Date('2026-08-24T00:05:00.000Z'),
  });
  const execution = await executeProductReading(
    snapshot, interpretation, registry,
    { requestId: 'source-unit-proof-closure-reading', text: '사주' },
    {
      outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
      readingVersion: 'source-unit-proof-closure-fixture-v1',
    },
  );
  const delivery = buildProductReadingDelivery(execution);
  const response = buildProductReadingResponse(delivery);
  const run = { snapshot, registry, interpretation, execution, delivery, response };
  const readiness = inspectSourceReadingProofReadinessV1(run);
  const handoff = inspectSajuReaderRecordsSourceHandoffV1(run);
  const proof = issueHeldSourceReadingTransportProofV1({
    issuer: 'saju-source-proof-owner',
    audience: 'myeongha-server-verifier',
    keyId: 'preview-key-v1',
    keyBytes: KEY, nonce: NONCE,
    executedRequestBody: REQUEST, response, readiness,
    issuedAtMs: ISSUE_TIME, ttlMs: 60_000,
  });
  expect(readiness.state).toBe('held');
  expect(handoff.state).toBe('held');
  expect(proof).not.toBeNull();
  if (handoff.state !== 'held' || !proof) throw new Error('Expected real held source fixture');
  return { response, readiness, handoff: handoff.handoff, proof };
}
function verifier(
  response: Awaited<ReturnType<typeof actualReading>>['response'],
  trustedPolicy: Awaited<ReturnType<typeof actualReading>>['handoff']['source'],
  overrides: Partial<VerifyHeldSajuSourceUnitClosureOptionsV1> = {},
): VerifyHeldSajuSourceUnitClosureOptionsV1 {
  const seen = new Set<string>();
  return {
    trustedIssuer: 'saju-source-proof-owner',
    expectedAudience: 'myeongha-server-verifier',
    trustedKeyId: 'preview-key-v1',
    keyBytes: KEY,
    expectedNonce: NONCE, expectedRequestBody: REQUEST,
    response, nowMs: ISSUE_TIME + 5_000,
    expectedInterpretationPolicy: {
      registrySnapshotId: trustedPolicy.registrySnapshotId,
      profileRef: trustedPolicy.profileRef,
    },
    claimNonceOnce: vi.fn(async (key: string) => {
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }),
    ...overrides,
  };
}

describe('Saju 2B-3C Preview signed response and Reader S3 source-unit closure', () => {
  it('reconstructs the exact original Source Unit ref/hash inventory from one signed actual response', async () => {
    const { response, proof, handoff } = await actualReading();
    const result = await verifyHeldSajuSourceUnitClosureV1(proof, verifier(response, handoff.source));
    expect(result.state).toBe('held');
    if (result.state !== 'held') return;
    expect(result.transportIntegrity).toBe('VERIFIED');
    expect(result.lifecycle).toBe('preview');
    expect(result.sourceAuthority).toBe('NOT_EVALUATED');
    expect(result.semanticOutputAuthority).toBe('NOT_EVALUATED');
    expect(result.selectedCoPresentDisclosuresAuthority).toBe('NOT_EVALUATED');
    expect(result.subjectBirthRevisionBinding).toBe('MYEONGHA_OWNER_REQUIRED');
    expect(result.databaseOfficialReadingCorrelation).toBe('DB_OWNER_REQUIRED');
    expect(result.sourceUnitInventory).toEqual(handoff.inventory);
    expect(result.sourceUnitInventoryHash).toBe(handoff.source.inventoryHash);
    expect(result.material.snapshotId).toBe(handoff.source.snapshotId);
    expect(result.material.interpretationRunId).toBe(handoff.source.interpretationRunId);
    expect(result.material.registrySnapshotId).toBe(handoff.source.registrySnapshotId);
    expect(result.material.profileRef).toEqual(handoff.source.profileRef);
    expect(result.interpretationPolicyVersionPins).toEqual({
      registrySnapshotId: handoff.source.registrySnapshotId,
      profileRef: handoff.source.profileRef,
    });
    expect(result.material.evidenceBundleHash).toBe(handoff.source.evidenceBundleHash);
    expect(result.material.responseBodyHash).toBe(deterministicContentHash(response));
    expect(result.sourceUnitInventory.segments.length).toBeGreaterThan(0);
    expect(result.sourceUnitInventory.segments.every(unit =>
      /^response\.reading\.sections\.\d+\.blocks\.\d+/u.test(unit.sourceRef) &&
      /^sha256:v1:[0-9a-f]{64}$/u.test(unit.contentHash))).toBe(true);
    expect(result.canExecute).toBe(false);
    expect(result.canPersist).toBe(false);
    expect(result.canDisclose).toBe(false);
    expect(result.canPublish).toBe(false);
    expect(result.canSell).toBe(false);
    expect(JSON.stringify(result)).not.toContain('2024-03-10');
    expect(JSON.stringify(result)).not.toContain('source-unit-proof-closure-fixture-v1');
  });

  it('rejects response mutation, wrong caller request, nonce or issuer and never discloses units', async () => {
    const { response, proof, handoff } = await actualReading();
    // Tamper with an unconditional v2 response field: the fixture's first
    // block can legitimately be a non-paragraph while still being delivered.
    const mutated = { ...response, responseId: response.responseId + '-tampered' };
    for (const options of [
      verifier(mutated, handoff.source),
      verifier(response, handoff.source, { expectedRequestBody: {
        ...REQUEST, reading: { text: '재물운' },
      } }),
      verifier(response, handoff.source, { expectedNonce: 'z'.repeat(30) }),
      verifier(response, handoff.source, { trustedIssuer: 'another-source-owner' }),
      verifier(response, handoff.source, { trustedKeyId: 'wrong-rotation-key' }),
    ]) {
      const result = await verifyHeldSajuSourceUnitClosureV1(proof, options);
      expect(result).toEqual({
        state: 'blocked', reason: 'transport_not_verified',
        canExecute: false, canPersist: false, canDisclose: false,
        canPublish: false, canSell: false,
      });
      expect('sourceUnitInventory' in result).toBe(false);
    }
  });

  it('rejects stale independent Registry/Profile version pins before claiming nonce', async () => {
    const { response, proof, handoff } = await actualReading();
    const correct = verifier(response, handoff.source);
    for (const expectedInterpretationPolicy of [
      { ...correct.expectedInterpretationPolicy, registrySnapshotId: 'registry-stale' },
      { ...correct.expectedInterpretationPolicy, profileRef: {
        ...correct.expectedInterpretationPolicy.profileRef, version: 'stale-version',
      } },
      { ...correct.expectedInterpretationPolicy, profileRef: {
        ...correct.expectedInterpretationPolicy.profileRef, contentHash: '0'.repeat(64),
      } },
    ]) {
      const options = verifier(response, handoff.source, {
        expectedInterpretationPolicy,
      });
      const verdict = await verifyHeldSajuSourceUnitClosureV1(proof, options);
      expect(verdict).toMatchObject({
        state: 'blocked', reason: 'interpretation_policy_version_mismatch',
        canExecute: false, canPersist: false, canDisclose: false, canSell: false,
      });
      expect(options.claimNonceOnce).not.toHaveBeenCalled();
      expect('sourceUnitInventory' in verdict).toBe(false);
    }
    // The valid exact version must still be independently signed/MAC-checked.
    expect((await verifyHeldSajuSourceUnitClosureV1(proof, correct)).state).toBe('held');
    expect(correct.claimNonceOnce).toHaveBeenCalledTimes(1);
  });

  it('allows only one atomic nonce claim and blocks ledger failure', async () => {
    const { response, proof, handoff } = await actualReading();
    const options = verifier(response, handoff.source);
    expect((await verifyHeldSajuSourceUnitClosureV1(proof, options)).state).toBe('held');
    expect((await verifyHeldSajuSourceUnitClosureV1(proof, options)).state).toBe('blocked');
    const unavailableLedger = verifier(response, handoff.source, {
      claimNonceOnce: async () => { throw new Error('ledger unavailable'); },
    });
    expect((await verifyHeldSajuSourceUnitClosureV1(proof, unavailableLedger)).state)
      .toBe('blocked');
  });

  it('keeps incomplete or synthetic-fallback content from becoming S3 source coverage', async () => {
    const { response, readiness, handoff } = await actualReading();
    const fallback = {
      ...response, state: 'delivered_with_fallback' as const,
      messageCode: 'READING_DELIVERED_WITH_GROUNDED_FALLBACK' as const,
    };
    const refreshedReadiness = {
      ...readiness,
      material: { ...readiness.material!, responseBodyHash: deterministicContentHash(fallback) },
    };
    const proof = issueHeldSourceReadingTransportProofV1({
      issuer: 'saju-source-proof-owner',
      audience: 'myeongha-server-verifier',
      keyId: 'preview-key-v1',
      keyBytes: KEY, nonce: NONCE,
      executedRequestBody: REQUEST,
      response: fallback, readiness: refreshedReadiness,
      issuedAtMs: ISSUE_TIME, ttlMs: 60_000,
    });
    expect(proof).not.toBeNull();
    if (!proof) return;
    const result = await verifyHeldSajuSourceUnitClosureV1(proof, verifier(fallback, handoff.source));
    expect(result.state).toBe('blocked');
    expect(result).toMatchObject({ reason: 'source_units_incomplete' });
    expect('sourceUnitInventory' in result).toBe(false);
  });
});
