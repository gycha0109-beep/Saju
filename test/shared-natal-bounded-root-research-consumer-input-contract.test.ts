import { describe, expect, test } from 'vitest';
import type { CalculationPolicySnapshot } from '../src/contracts/calculation.js';
import type {
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
  SourceReference,
} from '../src/contracts/interpretation.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import { createResearchEvidenceRuntimeRegistry } from '../src/interpretation/research-evidence-runtime.js';
import {
  createRuleRegistrySnapshot,
  RegistryConfigurationError,
} from '../src/interpretation/rule-registry.js';
import {
  buildSharedNatalBoundedRootResearchEvidence,
  SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
} from '../src/research/shared-natal-bounded-root-research-evidence-adapter.js';
import {
  SHARED_NATAL_BOUNDED_ROOT_METHODOLOGY_RESEARCH_INPUT,
  SHARED_NATAL_BOUNDED_ROOT_RESEARCH_CONSUMER_INPUT_CONTRACT,
  SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_DEFINITION_REF,
  SHARED_NATAL_BOUNDED_ROOT_RULE_INPUT_REQUIREMENT,
} from '../src/research/shared-natal-bounded-root-research-consumer-input-contract.js';

const calculationPolicy: CalculationPolicySnapshot = {
  policyId: 'synthetic/saju-r3-bounded-root-consumer',
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
  sourceId: 'SOURCE-SYNTHETIC-SAJU-R3-BOUNDED-ROOT-CONSUMER',
  sourceType: 'internal_research',
  title: 'Synthetic SAJU-R3 bounded-root consumer contract fixture',
  provenanceTier: 'internal',
  notes: 'Contract regression fixture only. No Saju semantic authority.',
};

function snapshot() {
  return calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2001, month: 2, day: 3 },
      time: { known: true, hour: 11, minute: 20 },
      sexForTraditionalCalculation: 'unspecified',
    },
    calculationPolicy,
    { now: new Date('2026-10-03T01:20:00.000Z') },
  );
}

function methodology(
  researchInput = SHARED_NATAL_BOUNDED_ROOT_METHODOLOGY_RESEARCH_INPUT,
): MethodologyDefinition {
  return {
    methodologyId: 'METHOD-SYNTHETIC-SAJU-R3-BOUNDED-ROOT-CONSUMER',
    version: '1.0.0-research',
    family: 'structural_balance',
    name: 'Synthetic bounded-root consumer',
    description: 'Regression-only consumer of the exact SAJU-R2 research evidence contract.',
    assumptions: [],
    requiredFactTypes: [],
    inputContract: { researchEvidenceInputs: [researchInput] },
    sourceIds: [source.sourceId],
    status: 'research',
  };
}

function rule(
  input = SHARED_NATAL_BOUNDED_ROOT_RULE_INPUT_REQUIREMENT,
): RuleDefinition {
  const method = methodology();
  return {
    ruleId: 'RULE-SYNTHETIC-SAJU-R3-BOUNDED-ROOT-CONSUMER',
    version: '1.0.0-research',
    ruleSetId: 'saju-r3-bounded-root-consumer',
    taxonomy: { tier: 'T6', category: 'synthetic_bounded_root_consumer' },
    methodologyRef: { id: method.methodologyId, version: method.version },
    title: 'Synthetic exact bounded-root evidence consumer',
    description: 'Infrastructure regression rule. It creates no Saju semantic authority.',
    inputs: [input],
    condition: {
      op: 'exists',
      value: { kind: 'input', key: SHARED_NATAL_BOUNDED_ROOT_RULE_INPUT_REQUIREMENT.key },
    },
    output: {
      claimType: 'SYNTHETIC_SAJU_R3_BOUNDED_ROOT_EVIDENCE_TRANSPORT',
      subject: 'synthetic',
      predicate: 'transported',
      value: { semanticAuthority: 'none', purpose: 'contract_regression' },
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

function pack(status: InterpretationPack['status'] = 'research'): InterpretationPack {
  const method = methodology();
  return {
    packId: 'PACK-SYNTHETIC-SAJU-R3-BOUNDED-ROOT-CONSUMER',
    version: '1.0.0-research',
    name: 'Synthetic SAJU-R3 bounded-root consumer pack',
    methodologyRefs: [{ id: method.methodologyId, version: method.version }],
    enabledRuleSets: ['saju-r3-bounded-root-consumer'],
    conflictPolicy: 'preserve_all',
    ambiguityPolicy: 'propagate',
    compositionPolicyRef: { id: 'COMPOSITION-SYNTHETIC-SAJU-R3', version: '1.0.0' },
    status,
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
    '2026-10-03T01:20:00.000Z',
  );
}

describe('SAJU-R3 bounded-root research consumer input contract', () => {
  test('binds the exact R2 evidence identity while preserving a fully closed semantic authority boundary', () => {
    expect(SHARED_NATAL_BOUNDED_ROOT_RESEARCH_CONSUMER_INPUT_CONTRACT.evidenceBinding).toEqual({
      evidenceType: 'SHARED_NATAL_BOUNDED_POSITIVE_ROOT_EVIDENCE',
      evidenceVersion: 'myeonghwa-shared-natal-bounded-root-research-evidence-v1',
      definitionRef: SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_DEFINITION_REF,
      authority: 'research_only',
      snapshotBinding: 'snapshot_id_and_hash',
    });
    expect(SHARED_NATAL_BOUNDED_ROOT_METHODOLOGY_RESEARCH_INPUT.mode).toBe('allowed');
    expect(SHARED_NATAL_BOUNDED_ROOT_RULE_INPUT_REQUIREMENT.required).toBe(true);
    expect(
      SHARED_NATAL_BOUNDED_ROOT_RESEARCH_CONSUMER_INPUT_CONTRACT.authorityBoundary,
    ).toEqual({
      exactEvidenceBindingRequired: true,
      researchOnlyConsumption: true,
      canonicalSizhuHasRootSettlementAuthorized: false,
      noRootInferenceAuthorized: false,
      observationCountSemanticsAuthorized: false,
      positionWeightingAuthorized: false,
      dangZhongSettlementAuthorized: false,
      qiangRuoClassificationAuthorized: false,
      wangShuaiClassificationAuthorized: false,
      gyeokgukDerivationAuthorized: false,
      semanticClaimEmissionAuthorized: false,
      runtimeRouteActivationAuthorized: false,
      narrativeMaterialityAuthorized: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      publicSemanticAuthorityAuthorized: false,
      productionFactEmissionAuthorized: false,
      productionClaimEmissionAuthorized: false,
      productionPackConsumptionAuthorized: false,
      productionAuthorityPromoted: false,
      externalHumanDomainReviewRequired: false,
    });
  });

  test('generic registry accepts the exact methodology and rule evidence selector contract', () => {
    expect(() => registry()).not.toThrow();
  });

  test('fails closed when a consumer widens or drifts the evidence version selector', () => {
    const drifted = {
      ...SHARED_NATAL_BOUNDED_ROOT_RULE_INPUT_REQUIREMENT,
      evidenceVersion: 'myeonghwa-shared-natal-bounded-root-research-evidence-v2',
    } as const;

    expect(() => registry(rule(drifted))).toThrow(RegistryConfigurationError);
    try {
      registry(rule(drifted));
    } catch (error) {
      expect((error as RegistryConfigurationError).code).toBe(
        'RULE_INPUT_NOT_ALLOWED_BY_METHODOLOGY',
      );
    }
  });

  test('fails closed when a consumer drifts the research evidence definition ref', () => {
    const drifted = {
      ...SHARED_NATAL_BOUNDED_ROOT_RULE_INPUT_REQUIREMENT,
      researchEvidenceDefinitionRef: {
        id: SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_DEFINITION_REF.id,
        version: '2.0.0-research',
      },
    } as const;

    expect(() => registry(rule(drifted))).toThrow(RegistryConfigurationError);
    try {
      registry(rule(drifted));
    } catch (error) {
      expect((error as RegistryConfigurationError).code).toBe(
        'RULE_INPUT_NOT_ALLOWED_BY_METHODOLOGY',
      );
    }
  });

  test('transports the exact validated R2 envelope and fails closed when required evidence is absent', () => {
    const base = snapshot();
    const built = buildSharedNatalBoundedRootResearchEvidence(base);
    if (built.status !== 'resolved') throw new Error(built.reasonCode);

    const runtimeRegistry = createResearchEvidenceRuntimeRegistry([
      SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_RUNTIME_ADAPTER,
    ]);
    const governedRegistry = registry();

    const resolved = runInterpretation(base, governedRegistry, {
      researchEvidence: { runtimeRegistry, envelopes: [built.envelope] },
      now: new Date('2026-10-03T01:21:00.000Z'),
    });
    expect(resolved.run.status).toBe('completed');
    expect(resolved.claims).toHaveLength(1);
    expect(resolved.claims[0]?.researchEvidenceRefs).toEqual([built.envelope.envelopeId]);
    expect(resolved.evaluations[0]?.inputRefs[0]).toEqual(
      expect.objectContaining({
        sourceType: 'research_evidence',
        idOrPath: built.envelope.envelopeId,
        definitionRef: SHARED_NATAL_BOUNDED_ROOT_RESEARCH_EVIDENCE_DEFINITION_REF,
        evidenceType: built.envelope.evidenceType,
        evidenceVersion: built.envelope.evidenceVersion,
        payloadHash: built.envelope.payloadHash,
      }),
    );

    const missing = runInterpretation(base, governedRegistry, {
      now: new Date('2026-10-03T01:21:00.000Z'),
    });
    expect(missing.evaluations[0]?.status).toBe('skipped_missing_input');
    expect(missing.claims).toEqual([]);
    expect(missing.run.status).toBe('partial');
  });

  test('production pack cannot select a rule that consumes the research-only bounded-root evidence', () => {
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
});
