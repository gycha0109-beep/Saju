import { describe, expect, test } from 'vitest';
import type { CalculationPolicySnapshot } from '../src/contracts/calculation.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import {
  createResearchEvidenceRuntimeRegistry,
  type ResearchEvidenceRuntimeAdapter,
} from '../src/interpretation/research-evidence-runtime.js';
import { createResearchEvidenceEnvelope } from '../src/interpretation/research-evidence.js';
import {
  buildI20RelativeForceResearchEvidence,
  I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION,
  I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
} from '../src/research/i20-relative-force-research-evidence-adapter.js';
import type { RelativeForceEvidenceReport } from '../src/research/i20-relative-force-evidence.js';

const policy: CalculationPolicySnapshot = {
  policyId: 'synthetic/research-evidence-runtime',
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

function snapshot(day = 1) {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2000, month: 1, day },
      time: { known: true, hour: 12, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    policy,
    { now: new Date('2026-08-25T00:00:00.000Z') },
  );
}

function i20Envelope(day = 1) {
  const base = snapshot(day);
  const built = buildI20RelativeForceResearchEvidence(base);
  if (built.status !== 'resolved') throw new Error(`I20 evidence unavailable: ${built.reasonCode}`);
  return { base, envelope: built.envelope };
}

describe('research evidence runtime registry', () => {
  test('registers a deterministic content-addressed runtime adapter inventory', () => {
    const first = createResearchEvidenceRuntimeRegistry([
      I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
    ]);
    const second = createResearchEvidenceRuntimeRegistry([
      I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
    ]);

    expect(first.registryId).toBe(second.registryId);
    expect(first.adapters).toHaveLength(1);
    expect(first.adapters[0]).toEqual(
      expect.objectContaining({
        definitionRef: {
          id: I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION.definitionId,
          version: I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION.version,
        },
        evidenceType: I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION.evidenceType,
        evidenceVersion: I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION.evidenceVersion,
      }),
    );
    expect(first.adapters[0]?.definitionContentHash).toMatch(/^[0-9a-f]{64}$/);
  });

  test('validates builder-produced I20 evidence only against its exact snapshot', () => {
    const registry = createResearchEvidenceRuntimeRegistry([
      I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
    ]);
    const { base, envelope } = i20Envelope();
    const result = registry.validate(envelope, base);

    expect(result.status).toBe('validated');
    if (result.status !== 'validated') throw new Error(result.errors.join(', '));
    expect(result.value.envelope.envelopeId).toBe(envelope.envelopeId);
    expect(result.value.definition.definitionId).toBe(
      I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION.definitionId,
    );
  });

  test('freshly rehashed host-tampered seasonal payload is rejected by the registered reproducibility validator', () => {
    const registry = createResearchEvidenceRuntimeRegistry([
      I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
    ]);
    const { base, envelope } = i20Envelope();
    const firstPosition = envelope.payload.positions[0];
    if (firstPosition === undefined) throw new Error('expected I20 position');
    const changedPhase = firstPosition.seasonalPhase === '旺' ? '死' : '旺';
    const tamperedPayload: RelativeForceEvidenceReport = {
      ...envelope.payload,
      positions: [
        { ...firstPosition, seasonalPhase: changedPhase },
        ...envelope.payload.positions.slice(1),
      ],
    };
    const tamperedEnvelope = createResearchEvidenceEnvelope(
      I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION,
      base,
      tamperedPayload,
    );

    const result = registry.validate(tamperedEnvelope, base);
    expect(result.status).toBe('rejected');
    if (result.status === 'rejected') {
      expect(result.errors).toContain('i20_payload_not_reproducible_from_bound_snapshot');
    }
  });

  test('malformed payload is rejected without throwing through the runtime boundary', () => {
    const registry = createResearchEvidenceRuntimeRegistry([
      I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
    ]);
    const base = snapshot();
    const malformed = createResearchEvidenceEnvelope(
      I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION,
      base,
      'host-string-payload',
    );

    expect(() => registry.validate(malformed, base)).not.toThrow();
    const result = registry.validate(malformed, base);
    expect(result.status).toBe('rejected');
    if (result.status === 'rejected') {
      expect(result.errors).toContain('i20_payload_shape_invalid');
      expect(result.errors).toContain('i20_payload_not_reproducible_from_bound_snapshot');
    }
  });

  test('unregistered definition ref is rejected before any adapter validator is trusted', () => {
    const registry = createResearchEvidenceRuntimeRegistry([
      I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
    ]);
    const { base, envelope } = i20Envelope();
    const unknown = {
      ...envelope,
      definitionRef: { id: 'UNREGISTERED-EVIDENCE', version: '1' },
    };
    const result = registry.validate(unknown, base);
    expect(result).toEqual({
      status: 'rejected',
      errors: ['unregistered_research_evidence_definition:UNREGISTERED-EVIDENCE@1'],
    });
  });

  test('duplicate definition refs are rejected at runtime-registry construction', () => {
    expect(() =>
      createResearchEvidenceRuntimeRegistry([
        I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
        I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
      ]),
    ).toThrow(/Duplicate research evidence definition ref/);
  });

  test('different definitions cannot claim the same evidence type/version slot', () => {
    const duplicateTypeAdapter: ResearchEvidenceRuntimeAdapter = {
      definition: {
        ...I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION,
        definitionId: 'OTHER-I20-DEFINITION',
      },
      validate: () => ({ valid: true, errors: [] }),
    };
    expect(() =>
      createResearchEvidenceRuntimeRegistry([
        I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
        duplicateTypeAdapter,
      ]),
    ).toThrow(/Duplicate research evidence type\/version/);
  });

  test('non-research or weak snapshot-binding adapters are rejected before registration', () => {
    const widenedAuthority = {
      definition: {
        ...I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION,
        authority: 'production' as never,
      },
      validate: () => ({ valid: true, errors: [] }),
    } as ResearchEvidenceRuntimeAdapter;
    const weakenedBinding = {
      definition: {
        ...I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_DEFINITION,
        definitionId: 'WEAK-BINDING-I20',
        snapshotBinding: 'snapshot_id_only' as never,
      },
      validate: () => ({ valid: true, errors: [] }),
    } as ResearchEvidenceRuntimeAdapter;

    expect(() => createResearchEvidenceRuntimeRegistry([widenedAuthority])).toThrow(/research_only/);
    expect(() => createResearchEvidenceRuntimeRegistry([weakenedBinding])).toThrow(/snapshot_id_and_hash/);
  });

  test('evidence bound to one synthetic snapshot is rejected against another snapshot', () => {
    const registry = createResearchEvidenceRuntimeRegistry([
      I20_RELATIVE_FORCE_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
    ]);
    const first = i20Envelope(1);
    const other = snapshot(2);
    const result = registry.validate(first.envelope, other);
    expect(result.status).toBe('rejected');
    if (result.status === 'rejected') {
      expect(result.errors.some((error) => error.startsWith('snapshot_id_mismatch:'))).toBe(true);
      expect(result.errors).toContain('snapshot_hash_mismatch');
    }
  });
});
