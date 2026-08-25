import { describe, expect, test } from 'vitest';
import type { CalculationPolicySnapshot } from '../src/contracts/calculation.js';
import type {
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
  SourceReference,
} from '../src/contracts/interpretation.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import {
  ResearchEvidenceExecutionError,
  runInterpretation,
} from '../src/interpretation/interpretation-engine.js';
import {
  createResearchEvidenceEnvelope,
  validateResearchEvidenceEnvelope,
  type ResearchEvidenceDefinition,
} from '../src/interpretation/research-evidence.js';
import {
  createResearchEvidenceRuntimeRegistry,
  type ResearchEvidenceRuntimeAdapter,
} from '../src/interpretation/research-evidence-runtime.js';
import {
  createRuleRegistrySnapshot,
  RegistryConfigurationError,
} from '../src/interpretation/rule-registry.js';
import { evaluateRule } from '../src/interpretation/rule-evaluator.js';

const calculationPolicy: CalculationPolicySnapshot = {
  policyId: 'synthetic/research-evidence-rule-input-boundary',
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

const source: SourceReference = {
  sourceId: 'SOURCE-SYNTHETIC-RESEARCH-EVIDENCE-BOUNDARY',
  sourceType: 'internal_research',
  title: 'Synthetic research evidence boundary source',
  provenanceTier: 'internal',
  notes: 'Infrastructure-only synthetic fixture. No saju interpretation authority.',
};

const evidenceDefinitionV1: ResearchEvidenceDefinition = {
  definitionId: 'SYNTHETIC-EVIDENCE-DEFINITION-V1',
  version: '1.0.0',
  evidenceType: 'SYNTHETIC_SNAPSHOT_QUALIFIER',
  evidenceVersion: '1.0.0',
  producerRef: { id: 'SYNTHETIC-PRODUCER', version: '1.0.0' },
  payloadContractRef: { id: 'SYNTHETIC-PAYLOAD', version: '1.0.0' },
  sourceIds: [source.sourceId],
  authority: 'research_only',
  snapshotBinding: 'snapshot_id_and_hash',
};

const evidenceDefinitionV2: ResearchEvidenceDefinition = {
  ...evidenceDefinitionV1,
  definitionId: 'SYNTHETIC-EVIDENCE-DEFINITION-V2',
  version: '2.0.0',
  evidenceVersion: '2.0.0',
};

function adapter(definition: ResearchEvidenceDefinition): ResearchEvidenceRuntimeAdapter {
  return {
    definition,
    validate: (envelope, snapshot) => validateResearchEvidenceEnvelope(envelope, snapshot, definition),
  };
}

function snapshot(day = 3) {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2001, month: 2, day },
      time: { known: true, hour: 11, minute: 20 },
      sexForTraditionalCalculation: 'unspecified',
    },
    calculationPolicy,
    { now: new Date('2026-08-25T00:00:00.000Z') },
  );
}

function methodology(
  mode: 'allowed' | 'required' | 'forbidden' = 'allowed',
  declareEvidence = true,
): MethodologyDefinition {
  return {
    methodologyId: 'METHOD-SYNTHETIC-RESEARCH-EVIDENCE',
    version: '1.0.0',
    family: 'stem_branch_interaction',
    name: 'Synthetic research evidence methodology',
    description: 'Infrastructure-only methodology.',
    assumptions: [],
    requiredFactTypes: [],
    inputContract: declareEvidence
      ? {
          researchEvidenceInputs: [
            {
              source: 'research_evidence',
              evidenceType: evidenceDefinitionV1.evidenceType,
              mode,
              rationale: 'Synthetic governed evidence transport only.',
            },
          ],
        }
      : { researchEvidenceInputs: [] },
    sourceIds: [source.sourceId],
    status: 'research',
  };
}

function pack(status: InterpretationPack['status'] = 'research'): InterpretationPack {
  const method = methodology();
  return {
    packId: 'PACK-SYNTHETIC-RESEARCH-EVIDENCE',
    version: '1.0.0',
    name: 'Synthetic research evidence pack',
    methodologyRefs: [{ id: method.methodologyId, version: method.version }],
    enabledRuleSets: ['research-evidence-boundary'],
    conflictPolicy: 'preserve_all',
    ambiguityPolicy: 'propagate',
    compositionPolicyRef: { id: 'COMPOSITION-SYNTHETIC', version: '1.0.0' },
    status,
  };
}

function rule(required = true): RuleDefinition {
  const method = methodology();
  return {
    ruleId: required ? 'RULE-SYNTHETIC-REQUIRED-EVIDENCE' : 'RULE-SYNTHETIC-OPTIONAL-EVIDENCE',
    version: '1.0.0',
    ruleSetId: 'research-evidence-boundary',
    taxonomy: { tier: 'T6', category: 'synthetic_research_evidence' },
    methodologyRef: { id: method.methodologyId, version: method.version },
    title: 'Synthetic research evidence consumer',
    description: 'Infrastructure-only rule. Produces no saju semantic authority.',
    inputs: [
      {
        key: 'researchQualifier',
        source: 'research_evidence',
        pathOrClaimType: evidenceDefinitionV1.evidenceType,
        required,
        ambiguityBehavior: 'requires_resolved',
      },
    ],
    condition: { op: 'exists', value: { kind: 'input', key: 'researchQualifier' } },
    output: {
      claimType: 'SYNTHETIC_RESEARCH_EVIDENCE_TRANSPORT',
      subject: 'synthetic',
      predicate: 'transported',
      value: { semanticAuthority: 'none', purpose: 'infrastructure_test' },
      polarity: 'neutral',
    },
    sourceRefs: [{ sourceId: source.sourceId, supportType: 'implementation_reference' }],
    quality: {
      provenanceQuality: 'unknown',
      testCoverage: 'unit',
      methodologyStability: 'experimental',
      reviewerStatus: 'unreviewed',
    },
    status: 'research',
  };
}

function registry(
  selectedRule: RuleDefinition = rule(),
  selectedMethodology: MethodologyDefinition = methodology(),
  selectedPack: InterpretationPack = pack(),
) {
  return createRuleRegistrySnapshot(
    {
      rules: [selectedRule],
      methodologies: [selectedMethodology],
      sources: [source],
    },
    selectedPack,
    '2026-08-25T00:00:00.000Z',
  );
}

const payload = Object.freeze({ category: 'synthetic', phase: 'alpha' });

describe('governed research_evidence rule input boundary', () => {
  test('transports only runtime-validated evidence and preserves provenance outside factRefs', () => {
    const base = snapshot();
    const envelope = createResearchEvidenceEnvelope(evidenceDefinitionV1, base, payload);
    const runtimeRegistry = createResearchEvidenceRuntimeRegistry([adapter(evidenceDefinitionV1)]);
    const result = runInterpretation(base, registry(), {
      researchEvidence: { runtimeRegistry, envelopes: [envelope] },
      now: new Date('2026-08-25T01:00:00.000Z'),
    });

    expect(result.run.status).toBe('completed');
    expect(result.integrity).toEqual({ valid: true, errors: [] });
    expect(result.claims).toHaveLength(1);
    const claim = result.claims[0];
    expect(claim?.factRefs).toEqual([]);
    expect(claim?.upstreamClaimRefs).toEqual([]);
    expect(claim?.researchEvidenceRefs).toEqual([envelope.envelopeId]);
    expect(result.evidenceIndex[claim?.claimId ?? '']?.researchEvidenceRefs).toEqual([
      envelope.envelopeId,
    ]);

    const inputRef = result.evaluations[0]?.inputRefs[0];
    expect(inputRef).toEqual(
      expect.objectContaining({
        sourceType: 'research_evidence',
        idOrPath: envelope.envelopeId,
        definitionRef: envelope.definitionRef,
        definitionContentHash: envelope.definitionContentHash,
        evidenceType: envelope.evidenceType,
        evidenceVersion: envelope.evidenceVersion,
        payloadHash: envelope.payloadHash,
      }),
    );
  });

  test('missing required research evidence fails closed as skipped_missing_input', () => {
    const result = runInterpretation(snapshot(), registry());
    expect(result.evaluations[0]?.status).toBe('skipped_missing_input');
    expect(result.claims).toEqual([]);
    expect(result.run.status).toBe('partial');
  });

  test('missing optional research evidence is explicit and does not block execution completeness', () => {
    const optionalRule = rule(false);
    const result = runInterpretation(snapshot(), registry(optionalRule));
    expect(result.evaluations[0]?.status).toBe('not_matched');
    expect(result.evaluations[0]?.inputRefs[0]).toEqual(
      expect.objectContaining({
        sourceType: 'research_evidence',
        evidenceType: evidenceDefinitionV1.evidenceType,
      }),
    );
    expect(result.run.status).toBe('completed');
  });

  test('undeclared research evidence input is rejected by methodology governance', () => {
    expect(() => registry(rule(), methodology('allowed', false))).toThrow(RegistryConfigurationError);
    try {
      registry(rule(), methodology('allowed', false));
    } catch (error) {
      expect((error as RegistryConfigurationError).code).toBe(
        'RULE_INPUT_NOT_ALLOWED_BY_METHODOLOGY',
      );
    }
  });

  test('forbidden research evidence input is rejected by methodology governance', () => {
    expect(() => registry(rule(), methodology('forbidden'))).toThrow(RegistryConfigurationError);
    try {
      registry(rule(), methodology('forbidden'));
    } catch (error) {
      expect((error as RegistryConfigurationError).code).toBe(
        'RULE_INPUT_NOT_ALLOWED_BY_METHODOLOGY',
      );
    }
  });

  test('production pack cannot select a rule that consumes research_only evidence', () => {
    expect(() => registry(rule(), methodology(), pack('production'))).toThrow(
      RegistryConfigurationError,
    );
    try {
      registry(rule(), methodology(), pack('production'));
    } catch (error) {
      expect((error as RegistryConfigurationError).code).toBe(
        'PRODUCTION_RULE_RESEARCH_EVIDENCE_FORBIDDEN',
      );
    }
  });

  test('tampered envelope is rejected at engine boundary before rule evaluation', () => {
    const base = snapshot();
    const envelope = createResearchEvidenceEnvelope(evidenceDefinitionV1, base, payload);
    const runtimeRegistry = createResearchEvidenceRuntimeRegistry([adapter(evidenceDefinitionV1)]);
    const tampered = { ...envelope, payload: { category: 'host-tampered', phase: 'beta' } };

    expect(() =>
      runInterpretation(base, registry(), {
        researchEvidence: { runtimeRegistry, envelopes: [tampered] },
      }),
    ).toThrow(ResearchEvidenceExecutionError);
  });

  test('snapshot-mismatched evidence is rejected before evaluator access', () => {
    const first = snapshot(3);
    const other = snapshot(4);
    const envelope = createResearchEvidenceEnvelope(evidenceDefinitionV1, first, payload);
    const runtimeRegistry = createResearchEvidenceRuntimeRegistry([adapter(evidenceDefinitionV1)]);

    expect(() =>
      runInterpretation(other, registry(), {
        researchEvidence: { runtimeRegistry, envelopes: [envelope] },
      }),
    ).toThrow(ResearchEvidenceExecutionError);
  });

  test('fact/scenario overrides cannot overwrite validated research evidence payload', () => {
    const base = snapshot();
    const envelope = createResearchEvidenceEnvelope(evidenceDefinitionV1, base, payload);
    const runtimeRegistry = createResearchEvidenceRuntimeRegistry([adapter(evidenceDefinitionV1)]);
    const validated = runtimeRegistry.validate(envelope, base);
    if (validated.status !== 'validated') throw new Error(validated.errors.join(', '));

    const result = evaluateRule(rule(), {
      snapshot: base,
      pack: pack(),
      validatedResearchEvidence: [validated.value],
      scenarioRef: 'synthetic-scenario',
      factOverrides: {
        [evidenceDefinitionV1.evidenceType]: { category: 'override', phase: 'forged' },
      },
      now: new Date('2026-08-25T01:00:00.000Z'),
    });

    expect(result.evaluation.status).toBe('matched');
    expect(result.evaluation.inputRefs[0]?.observedValue).toEqual(payload);
    expect(result.claims[0]?.researchEvidenceRefs).toEqual([envelope.envelopeId]);
  });

  test('same payload with different governed evidence provenance changes evaluation, claim, and run identity', () => {
    const base = snapshot();
    const firstEnvelope = createResearchEvidenceEnvelope(evidenceDefinitionV1, base, payload);
    const secondEnvelope = createResearchEvidenceEnvelope(evidenceDefinitionV2, base, payload);
    const runtimeRegistry = createResearchEvidenceRuntimeRegistry([
      adapter(evidenceDefinitionV1),
      adapter(evidenceDefinitionV2),
    ]);
    const stableRegistry = registry();

    const first = runInterpretation(base, stableRegistry, {
      researchEvidence: { runtimeRegistry, envelopes: [firstEnvelope] },
      now: new Date('2026-08-25T01:00:00.000Z'),
    });
    const second = runInterpretation(base, stableRegistry, {
      researchEvidence: { runtimeRegistry, envelopes: [secondEnvelope] },
      now: new Date('2026-08-25T01:00:00.000Z'),
    });

    expect(firstEnvelope.payloadHash).toBe(secondEnvelope.payloadHash);
    expect(firstEnvelope.envelopeId).not.toBe(secondEnvelope.envelopeId);
    expect(first.evaluations[0]?.evaluationId).not.toBe(second.evaluations[0]?.evaluationId);
    expect(first.claims[0]?.claimId).not.toBe(second.claims[0]?.claimId);
    expect(first.run.runHash).not.toBe(second.run.runHash);
  });

  test('multiple matching validated envelopes fail closed instead of reusing claim cardinality semantics', () => {
    const base = snapshot();
    const firstEnvelope = createResearchEvidenceEnvelope(evidenceDefinitionV1, base, payload);
    const secondEnvelope = createResearchEvidenceEnvelope(evidenceDefinitionV2, base, payload);
    const runtimeRegistry = createResearchEvidenceRuntimeRegistry([
      adapter(evidenceDefinitionV1),
      adapter(evidenceDefinitionV2),
    ]);
    const result = runInterpretation(base, registry(), {
      researchEvidence: { runtimeRegistry, envelopes: [firstEnvelope, secondEnvelope] },
    });

    expect(result.evaluations[0]?.status).toBe('skipped_cardinality_mismatch');
    expect(result.claims).toEqual([]);
    expect(result.run.status).toBe('partial');
  });
});
