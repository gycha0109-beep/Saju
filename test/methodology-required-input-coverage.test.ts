import { describe, expect, test } from 'vitest';
import {
  RegistryConfigurationError,
  createRuleRegistrySnapshot,
  type InterpretationPack,
  type MethodologyDefinition,
  type RuleDefinition,
} from '../src/index.js';

type InputContract = NonNullable<MethodologyDefinition['inputContract']>;

function methodology(
  inputContract: InputContract,
  id = 'METHOD-REQUIRED-COVERAGE',
  version = '1.0.0',
): MethodologyDefinition {
  return {
    methodologyId: id,
    version,
    family: 'domain_synthesis',
    name: 'Required input coverage fixture',
    description: 'Synthetic registry-governance fixture only.',
    assumptions: [],
    requiredFactTypes: [],
    inputContract,
    sourceIds: [],
    status: 'research',
  };
}

function rule(
  inputs: RuleDefinition['inputs'],
  overrides: Partial<RuleDefinition> = {},
): RuleDefinition {
  return {
    ruleId: 'RULE-REQUIRED-COVERAGE',
    version: '1.0.0',
    ruleSetId: 'required-coverage',
    taxonomy: { tier: 'T8', category: 'synthetic_required_coverage' },
    methodologyRef: { id: 'METHOD-REQUIRED-COVERAGE', version: '1.0.0' },
    title: 'Required coverage fixture',
    description: 'Synthetic registry-governance fixture only.',
    inputs,
    condition: { op: 'exists', value: { kind: 'literal', value: true } },
    output: {
      claimType: 'SYNTHETIC_REQUIRED_COVERAGE',
      subject: 'synthetic',
      predicate: 'covered',
      value: true,
    },
    sourceRefs: [],
    quality: {
      provenanceQuality: 'unknown',
      testCoverage: 'unit',
      methodologyStability: 'experimental',
      reviewerStatus: 'unreviewed',
    },
    status: 'research',
    ...overrides,
  };
}

function pack(
  methodologyId = 'METHOD-REQUIRED-COVERAGE',
  methodologyVersion = '1.0.0',
  overrides: Partial<InterpretationPack> = {},
): InterpretationPack {
  return {
    packId: 'PACK-REQUIRED-COVERAGE',
    version: '1.0.0',
    name: 'Required coverage fixture',
    methodologyRefs: [{ id: methodologyId, version: methodologyVersion }],
    enabledRuleSets: ['required-coverage'],
    conflictPolicy: 'preserve_all',
    ambiguityPolicy: 'propagate',
    compositionPolicyRef: { id: 'COMPOSITION-REQUIRED-COVERAGE', version: '1.0.0' },
    status: 'research',
    ...overrides,
  };
}

function derivedInput(path: string, required = true): RuleDefinition['inputs'][number] {
  return {
    key: path.replaceAll('.', '-'),
    source: 'derived_fact',
    pathOrClaimType: path,
    required,
    ambiguityBehavior: 'requires_resolved',
  };
}

function expectCoverageError(action: () => unknown): void {
  expect(action).toThrow(RegistryConfigurationError);
  try {
    action();
  } catch (error) {
    expect((error as RegistryConfigurationError).code).toBe(
      'METHODOLOGY_REQUIRED_INPUT_NOT_COVERED',
    );
  }
}

describe('methodology required-input coverage', () => {
  test('accepts a selected rule covering a required precise fact input', () => {
    const method = methodology({
      factInputs: [{ source: 'derived_fact', pathPattern: 'derivedFacts.dayMaster', mode: 'required', rationale: 'fixture' }],
    });
    expect(() => createRuleRegistrySnapshot({ rules: [rule([derivedInput('derivedFacts.dayMaster')])], methodologies: [method] }, pack())).not.toThrow();
  });

  test('accepts wildcard required fact coverage', () => {
    const method = methodology({
      factInputs: [{ source: 'derived_fact', pathPattern: 'derivedFacts.tenGods.*.stem', mode: 'required', rationale: 'fixture' }],
    });
    expect(() => createRuleRegistrySnapshot({ rules: [rule([derivedInput('derivedFacts.tenGods.month.stem')])], methodologies: [method] }, pack())).not.toThrow();
  });

  test('rejects a selected methodology whose required fact input is uncovered', () => {
    const method = methodology({
      factInputs: [{ source: 'derived_fact', pathPattern: 'derivedFacts.dayMaster', mode: 'required', rationale: 'fixture' }],
    });
    expectCoverageError(() => createRuleRegistrySnapshot({ rules: [rule([])], methodologies: [method] }, pack()));
  });

  test('does not require coverage for allowed inputs', () => {
    const method = methodology({
      factInputs: [{ source: 'derived_fact', pathPattern: 'derivedFacts.dayMaster', mode: 'allowed', rationale: 'fixture' }],
    });
    expect(() => createRuleRegistrySnapshot({ rules: [rule([])], methodologies: [method] }, pack())).not.toThrow();
  });

  test('covers required claim input across the selected methodology rule set', () => {
    const method = methodology({
      claimInputs: [{ source: 'interpretation_claim', claimType: 'UPSTREAM_CLAIM', mode: 'required', rationale: 'fixture' }],
    });
    const claimInput: RuleDefinition['inputs'][number] = {
      key: 'upstream', source: 'interpretation_claim', pathOrClaimType: 'UPSTREAM_CLAIM', required: false, ambiguityBehavior: 'scenario_preserving',
    };
    expect(() => createRuleRegistrySnapshot({ rules: [rule([claimInput])], methodologies: [method] }, pack())).not.toThrow();
  });

  test('keeps methodology requiredness distinct from per-rule runtime optionality', () => {
    const method = methodology({
      factInputs: [{ source: 'derived_fact', pathPattern: 'derivedFacts.dayMaster', mode: 'required', rationale: 'fixture' }],
    });
    expect(() => createRuleRegistrySnapshot({ rules: [rule([derivedInput('derivedFacts.dayMaster', false)])], methodologies: [method] }, pack())).not.toThrow();
  });

  test('requires research evidence version and definition when declared', () => {
    const requiredV2 = {
      source: 'research_evidence' as const,
      evidenceType: 'EVIDENCE-X',
      evidenceVersion: '2.0.0',
      definitionRef: { id: 'DEF-X', version: '2.0.0' },
      mode: 'required' as const,
      rationale: 'fixture',
    };
    const allowedV1 = {
      source: 'research_evidence' as const,
      evidenceType: 'EVIDENCE-X',
      evidenceVersion: '1.0.0',
      definitionRef: { id: 'DEF-X', version: '1.0.0' },
      mode: 'allowed' as const,
      rationale: 'fixture alternate',
    };
    const method = methodology({ researchEvidenceInputs: [requiredV2, allowedV1] });
    const v2Input: RuleDefinition['inputs'][number] = {
      key: 'evidence-v2', source: 'research_evidence', pathOrClaimType: 'EVIDENCE-X', evidenceVersion: '2.0.0', researchEvidenceDefinitionRef: { id: 'DEF-X', version: '2.0.0' }, required: true, ambiguityBehavior: 'requires_resolved',
    };
    const v1Input: RuleDefinition['inputs'][number] = {
      key: 'evidence-v1', source: 'research_evidence', pathOrClaimType: 'EVIDENCE-X', evidenceVersion: '1.0.0', researchEvidenceDefinitionRef: { id: 'DEF-X', version: '1.0.0' }, required: true, ambiguityBehavior: 'requires_resolved',
    };
    expect(() => createRuleRegistrySnapshot({ rules: [rule([v2Input])], methodologies: [method] }, pack())).not.toThrow();
    expectCoverageError(() => createRuleRegistrySnapshot({ rules: [rule([v1Input])], methodologies: [method] }, pack()));
  });

  test('disabled rules cannot satisfy required coverage', () => {
    const method = methodology({
      factInputs: [{ source: 'derived_fact', pathPattern: 'derivedFacts.dayMaster', mode: 'required', rationale: 'fixture' }],
    });
    const covering = rule([derivedInput('derivedFacts.dayMaster')], { ruleId: 'RULE-COVERING-DISABLED' });
    expectCoverageError(() => createRuleRegistrySnapshot({ rules: [covering], methodologies: [method] }, pack('METHOD-REQUIRED-COVERAGE', '1.0.0', { disabledRuleIds: ['RULE-COVERING-DISABLED'] })));
  });

  test('a rule under another methodology cannot satisfy required coverage', () => {
    const requiredMethod = methodology({
      factInputs: [{ source: 'derived_fact', pathPattern: 'derivedFacts.dayMaster', mode: 'required', rationale: 'fixture' }],
    });
    const otherMethod = methodology({
      factInputs: [{ source: 'derived_fact', pathPattern: 'derivedFacts.dayMaster', mode: 'allowed', rationale: 'fixture' }],
    }, 'METHOD-OTHER');
    const otherRule = rule([derivedInput('derivedFacts.dayMaster')], { methodologyRef: { id: 'METHOD-OTHER', version: '1.0.0' } });
    const selectedPack = pack('METHOD-REQUIRED-COVERAGE', '1.0.0', { methodologyRefs: [{ id: 'METHOD-REQUIRED-COVERAGE', version: '1.0.0' }, { id: 'METHOD-OTHER', version: '1.0.0' }] });
    expectCoverageError(() => createRuleRegistrySnapshot({ rules: [otherRule], methodologies: [requiredMethod, otherMethod] }, selectedPack));
  });

  test('multiple required dimensions may be covered across multiple selected rules', () => {
    const method = methodology({
      factInputs: [
        { source: 'derived_fact', pathPattern: 'derivedFacts.dayMaster', mode: 'required', rationale: 'fixture' },
        { source: 'derived_fact', pathPattern: 'derivedFacts.tenGods.month.stem', mode: 'required', rationale: 'fixture' },
      ],
    });
    const first = rule([derivedInput('derivedFacts.dayMaster')], { ruleId: 'RULE-COVERAGE-A' });
    const second = rule([derivedInput('derivedFacts.tenGods.month.stem')], { ruleId: 'RULE-COVERAGE-B' });
    expect(() => createRuleRegistrySnapshot({ rules: [first, second], methodologies: [method] }, pack())).not.toThrow();
  });
});
