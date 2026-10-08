import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { CalculationPolicySnapshot } from '../src/contracts/calculation.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { SUPPORTED_NARRATIVE_OUTPUT_SCHEMA } from '../src/llm/prompt-compiler.js';
import { createGeneralNatalUsefulReadingCandidateRegistry } from '../src/research/general-natal-useful-reading-candidate.js';
import { executeProductReading } from '../src/reading/governed-reading-execution.js';
import { buildProductReadingDelivery } from '../src/reading/product-reading-delivery.js';
import { buildProductReadingResponse } from '../src/reading/product-reading-response.js';
import {
  inspectSourceReadingProofReadinessV1,
} from '../src/reading/source-reading-proof-readiness.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'myeonghwa/source-reading-proof-readiness-test',
  policyVersion: '1.0.0',
  dayBoundary: 'midnight',
  trueSolarTime: {
    enabled: false,
    longitudeSource: 'not-applicable',
    applyEquationOfTime: false,
    applyHistoricalDst: false,
  },
  timeZonePolicy: { source: 'service-default', timeZone: 'Asia/Seoul' },
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries',
};

async function fixture() {
  const snapshot = calculateCanonicalSajuSnapshot({
    calendarType: 'solar',
    date: { year: 2024, month: 3, day: 10 },
    time: { known: true, hour: 12, minute: 0 },
    sexForTraditionalCalculation: 'unspecified',
  }, policy, { now: new Date('2026-08-24T00:00:00.000Z') });

  // Research fixture intentionally cannot grant Production interpretation rights.
  const registry = createGeneralNatalUsefulReadingCandidateRegistry(
    '2026-08-24T00:04:00.000Z',
  );
  const interpretation = runInterpretation(snapshot, registry, {
    requestId: 'source-proof-readiness-fixture-interpretation',
    now: new Date('2026-08-24T00:05:00.000Z'),
  });
  const execution = await executeProductReading(
    snapshot,
    interpretation,
    registry,
    { requestId: 'source-proof-readiness-fixture-reading', text: '사주' },
    {
      outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
      readingVersion: 'source-proof-readiness-fixture-v1',
    },
  );
  const delivery = buildProductReadingDelivery(execution);
  const response = buildProductReadingResponse(delivery);
  return { snapshot, interpretation, registry, execution, delivery, response };
}

describe('2B-3A source Reading in-process proof readiness inventory', () => {
  it('inventories exact Saju-owned identities but never grants proof or Production authority', async () => {
    const source = await fixture();
    expect(source.execution.state).toBe('completed');
    const result = inspectSourceReadingProofReadinessV1(source);

    expect(result).toMatchObject({
      version: 'myeonghwa-source-reading-proof-readiness-v1',
      state: 'held',
      reason: 'source_attestation_not_implemented',
      requestBinding: 'NOT_ATTESTED',
      proofAuthenticity: 'NOT_ATTESTED',
      productionInterpretationAuthority: 'NOT_EVALUATED',
      releaseAuthorization: 'NOT_EVALUATED',
      canExecute: false,
      canPublish: false,
      canSell: false,
      material: {
        snapshotId: source.snapshot.snapshotId,
        interpretationRunId: source.interpretation.run.interpretationRunId,
        registrySnapshotId: source.registry.snapshot.registrySnapshotId,
        executionId: source.execution.executionId,
        preparationId: source.execution.preparation.preparationId,
        readingId: source.execution.artifact?.readingId,
        responseId: source.response.responseId,
        profileRef: source.execution.preparation.composition?.selection.profileRef,
      },
    });
    expect(result.material?.responseBodyHash).toMatch(/^[0-9a-f]{64}$/u);
    expect(result.material?.evidenceBundleHash).toMatch(/^[0-9a-f]{64}$/u);
    expect(Object.isFrozen(result)).toBe(true);
    expect(Object.isFrozen(result.material)).toBe(true);
    expect(Object.isFrozen(result.material?.profileRef)).toBe(true);
    expect(JSON.stringify(result)).not.toContain('selectedClaimIds');
  });

  it('rejects mismatched source interpretation ↔ canonical snapshot identity', async () => {
    const source = await fixture();
    const changed = structuredClone(source);
    changed.interpretation.run.snapshotId = 'snapshot-from-another-user';
    expect(inspectSourceReadingProofReadinessV1(changed)).toMatchObject({
      state: 'blocked', reason: 'invalid_source_identity', material: undefined,
    });
  });

  it('rejects registry snapshot drift even if public response still says delivered', async () => {
    const source = await fixture();
    const changed = structuredClone(source);
    changed.interpretation.run.registrySnapshotId = 'registry-unmatched';
    expect(inspectSourceReadingProofReadinessV1(changed)).toMatchObject({
      state: 'blocked', reason: 'invalid_source_identity',
    });
  });

  it('rejects profile contentHash mismatch instead of treating profile selection as semantic permission', async () => {
    const source = await fixture();
    const changed = structuredClone(source);
    const selection = changed.execution.preparation.composition?.selection;
    if (selection?.profileRef === undefined) throw new Error('Fixture expected selected profile');
    (selection.profileRef as { contentHash: string }).contentHash = 'f'.repeat(64);
    expect(inspectSourceReadingProofReadinessV1(changed)).toMatchObject({
      state: 'blocked', reason: 'profile_not_selection_authorized',
    });
  });

  it('rejects partial Claim coverage instead of inferring it from an admitted response', async () => {
    const source = await fixture();
    const changed = structuredClone(source);
    const selection = changed.execution.preparation.composition?.selection;
    if (!selection) throw new Error('Fixture expected selected evidence');
    (selection as { coverageState: string }).coverageState = 'partial_coverage';
    expect(inspectSourceReadingProofReadinessV1(changed)).toMatchObject({
      state: 'blocked', reason: 'incomplete_claim_coverage',
    });
  });

  it('rejects missing evidence hash rather than fabricating a source ref', async () => {
    const source = await fixture();
    const changed = structuredClone(source);
    const composition = changed.execution.preparation.composition;
    if (!composition) throw new Error('Fixture expected composition');
    (composition as { evidence?: unknown }).evidence = undefined;
    expect(inspectSourceReadingProofReadinessV1(changed)).toMatchObject({
      state: 'blocked', reason: 'missing_evidence_bundle',
    });
  });

  it('rejects mismatched internal ReadingArtifact provenance', async () => {
    const source = await fixture();
    const changed = structuredClone(source);
    if (!changed.execution.artifact) throw new Error('Fixture expected ReadingArtifact');
    (changed.execution.artifact.provenance as { snapshotId: string }).snapshotId = 'another-snapshot';
    expect(inspectSourceReadingProofReadinessV1(changed)).toMatchObject({
      state: 'blocked', reason: 'artifact_identity_mismatch',
    });
  });

  it('rejects a substituted delivery artifact', async () => {
    const source = await fixture();
    const changed = structuredClone(source);
    if (!changed.delivery.artifact) throw new Error('Fixture expected DeliveryArtifact');
    (changed.delivery.artifact as { readingId: string }).readingId = 'another-reading';
    expect(inspectSourceReadingProofReadinessV1(changed)).toMatchObject({
      state: 'blocked', reason: 'artifact_identity_mismatch',
    });
  });

  it('rejects a mismatched internal audit execution identifier', async () => {
    const source = await fixture();
    const changed = structuredClone(source);
    (changed.delivery.audit as { executionId: string }).executionId = 'another-execution';
    expect(inspectSourceReadingProofReadinessV1(changed)).toMatchObject({
      state: 'blocked', reason: 'artifact_identity_mismatch',
    });
  });

  it('rejects an invalid public response admission contract', async () => {
    const source = await fixture();
    const changed = structuredClone(source);
    changed.response.responseVersion = 'not-v2';
    expect(inspectSourceReadingProofReadinessV1(changed)).toMatchObject({
      state: 'blocked', reason: 'response_not_admitted',
    });
  });

  it('rejects a modified admitted response body despite the same responseId', async () => {
    const source = await fixture();
    const changed = structuredClone(source);
    if (!changed.response.reading) throw new Error('Fixture expected Delivered response');
    const section = changed.response.reading.sections[0];
    if (!section || !section.blocks.length) throw new Error('Fixture expected a response block');
    // Mutation preserves the vocabulary but changes the content of the admitted result.
    const newSections = [...changed.response.reading.sections];
    newSections[0] = {
      ...section,
      title: section.title + ' (altered)',
    };
    (changed.response.reading as unknown as { sections: typeof newSections }).sections = newSections;
    expect(inspectSourceReadingProofReadinessV1(changed)).toMatchObject({
      state: 'blocked', reason: 'response_delivery_mismatch',
    });
  });

  it('never promotes missing/blocked semantic execution into a source proof', async () => {
    const source = await fixture();
    const changed = structuredClone(source);
    (changed.execution.preparation as { state: string }).state = 'insufficient_evidence';
    expect(inspectSourceReadingProofReadinessV1(changed)).toMatchObject({
      state: 'blocked', reason: 'incomplete_execution', canSell: false,
    });
  });
});
