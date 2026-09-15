import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8RoleNeutralT6InputGovernance } from '../src/research/relationship-spouse-t8-role-neutral-t6-input-governance.js';
import {
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE_WITNESS,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_VALUE_SCHEMA_WITNESS,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY_WITNESS,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_NON_ACTIVATION_BOUNDARY,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_PACK_WITNESS,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_READINESS_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_READINESS_GATES,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_READINESS_VERSION,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULE_WITNESSES,
  RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_SEMANTIC_BOUNDARY,
  buildRelationshipSpouseT8RuntimeAdmissionReadiness,
} from '../src/research/relationship-spouse-t8-runtime-admission-readiness-review.js';

describe('Relationship spouse T8 runtime admission readiness review', () => {
  test('requires the exact successful five-of-five upstream research authority state', () => {
    const upstream = buildRelationshipSpouseT8RoleNeutralT6InputGovernance();
    const report = buildRelationshipSpouseT8RuntimeAdmissionReadiness();

    expect(upstream.status).toBe(
      'GOVERNED_ROLE_NEUTRAL_RELATIONSHIP_T6_INPUT_CONTRACT_ESTABLISHED',
    );
    expect(upstream.authorityGapsClosedCount).toBe(5);
    expect(upstream.authorityGapsOpenCount).toBe(0);
    expect(upstream.currentRelationshipT6InputPathEstablished).toBe(true);
    expect(upstream.authorityAdmissionReady).toBe(false);
    expect(upstream.spouseT8ProducerReady).toBe(false);
    expect(upstream.productionState).toBe('HOLD');

    expect(report.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(report.exactUpstreamFiveOfFiveStateAccepted).toBe(true);
    expect(report.fiveOfFiveResearchAuthorityAvailable).toBe(true);
  });

  test('proves the existing runtime input and taxonomy vocabulary can represent the governed boundary', () => {
    const gates = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_READINESS_GATES;
    const methodology = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_METHODOLOGY_WITNESS;

    expect(gates.standardT6DerivedFactInputRepresentable).toBe(true);
    expect(gates.relationshipSpouseTaxonomyRepresentable).toBe(true);
    expect(gates.methodologyInputContractRepresentable).toBe(true);
    expect(gates.failClosedRuleRepresentable).toBe(true);
    expect(gates.runtimeSchemaInventionRequired).toBe(false);

    expect(methodology.family).toBe('ten_gods');
    expect(methodology.status).toBe('research');
    expect(methodology.requiredFactTypes).toEqual(['derivedFacts.dayMaster']);
    expect(methodology.inputContract?.factInputs).toEqual([
      {
        source: 'derived_fact',
        pathPattern: 'derivedFacts.dayMaster',
        mode: 'required',
        rationale:
          'The governed T6 contract consumes only resolved canonical Day Master polarity and reconstructs no T5 subtype.',
      },
    ]);
  });

  test('represents the two governed polarity correspondences as two static T8 rules', () => {
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULE_WITNESSES).toHaveLength(2);

    const [yangRule, yinRule] = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULE_WITNESSES;
    expect(yangRule.taxonomy).toEqual({
      tier: 'T8',
      category: 'relationship',
      subcategory: 'spouse',
    });
    expect(yinRule.taxonomy).toEqual(yangRule.taxonomy);

    for (const rule of RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_RULE_WITNESSES) {
      expect(rule.status).toBe('research');
      expect(rule.inputs).toEqual([
        {
          key: 'relationship_spouse_role_neutral_day_master',
          source: 'derived_fact',
          pathOrClaimType: 'derivedFacts.dayMaster',
          acceptedStatuses: ['resolved'],
          required: true,
          ambiguityBehavior: 'requires_resolved',
        },
      ]);
      expect(rule.sourceRefs).toEqual([]);
    }

    expect(yangRule.condition).toEqual({
      op: 'eq',
      left: {
        kind: 'input',
        key: 'relationship_spouse_role_neutral_day_master',
        path: 'value.yinYang',
      },
      right: { kind: 'literal', value: '양' },
    });
    expect(yangRule.output.value).toEqual({
      dayMasterPolarity: '양',
      spouseStarSemantic: 'INDIRECT_WEALTH',
      tenGodNativeLabel: '편재',
      tenGodHanjaLabel: '偏財',
    });

    expect(yinRule.condition).toEqual({
      op: 'eq',
      left: {
        kind: 'input',
        key: 'relationship_spouse_role_neutral_day_master',
        path: 'value.yinYang',
      },
      right: { kind: 'literal', value: '음' },
    });
    expect(yinRule.output.value).toEqual({
      dayMasterPolarity: '음',
      spouseStarSemantic: 'INDIRECT_POWER',
      tenGodNativeLabel: '편관',
      tenGodHanjaLabel: '偏官',
    });
  });

  test('represents the bounded spouse-star value without a new runtime schema primitive', () => {
    const schema = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_VALUE_SCHEMA_WITNESS;
    const claimType = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_CLAIM_TYPE_WITNESS;

    expect(schema.root.kind).toBe('union');
    if (schema.root.kind !== 'union') throw new Error('expected union readiness witness');
    expect(schema.root.anyOf).toHaveLength(2);
    expect(claimType.scope).toBe('natal');
    expect(claimType.allowedTaxonomyTiers).toEqual(['T8']);
    expect(claimType.materialForNarrative).toBe(false);
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_READINESS_GATES.boundedSpouseStarClaimSchemaRepresentable).toBe(
      true,
    );
  });

  test('represents a research pack while keeping registration and activation outside this frontier', () => {
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_PACK_WITNESS.status).toBe('research');
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_PACK_WITNESS.claimContractMode).toBe(
      'registered_required',
    );
    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_PACK_WITNESS.ambiguityPolicy).toBe(
      'skip_requires_resolved',
    );

    expect(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_NON_ACTIVATION_BOUNDARY).toEqual({
      methodologyRegistered: false,
      ruleRegistered: false,
      producerRegistered: false,
      claimTypeRegistered: false,
      claimValueSchemaRegistered: false,
      interpretationPackRegistered: false,
      compositionPolicyRegistered: false,
      consumerNarrativeActivated: false,
      compatibilityConsumerActivated: false,
      previewDefaultRouteChanged: false,
      productionBehaviorChanged: false,
      spouseT8ProducerReady: false,
      productionPromotionReady: false,
      productionState: 'HOLD',
    });
  });

  test('keeps T5 reconstruction, demographic inputs, second-chart use, and compatibility semantics forbidden', () => {
    const boundary = RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_SEMANTIC_BOUNDARY;

    expect(boundary.t5SubtypeReconstructionAuthorized).toBe(false);
    expect(boundary.t5SlotReconstructionAuthorized).toBe(false);
    expect(boundary.genericRelationshipT8RelabellingAuthorized).toBe(false);
    expect(boundary.nativeSexInputRequired).toBe(false);
    expect(boundary.partnerSexInputRequired).toBe(false);
    expect(boundary.partnerIdentityInputRequired).toBe(false);
    expect(boundary.sexualOrientationInputRequired).toBe(false);
    expect(boundary.secondChartInputRequired).toBe(false);
    expect(boundary.compatibilityInputRequired).toBe(false);
    expect(boundary.marriageGuaranteeInferenceAuthorized).toBe(false);
    expect(boundary.fertilityInferenceAuthorized).toBe(false);
    expect(boundary.relationshipLegalityOrEthicsInferenceAuthorized).toBe(false);
    expect(boundary.compatibilityScoringAuthorized).toBe(false);
  });

  test('advances only authority admission readiness while producer and Production remain blocked', () => {
    const report = buildRelationshipSpouseT8RuntimeAdmissionReadiness();

    expect(report.status).toBe(
      'RUNTIME_ADMISSION_REPRESENTABLE_AFTER_FIVE_OF_FIVE_RESEARCH_AUTHORITY',
    );
    expect(report.standardT6DerivedFactInputRepresentable).toBe(true);
    expect(report.relationshipSpouseTaxonomyRepresentable).toBe(true);
    expect(report.methodologyInputContractRepresentable).toBe(true);
    expect(report.failClosedRuleRepresentable).toBe(true);
    expect(report.boundedSpouseStarClaimSchemaRepresentable).toBe(true);
    expect(report.interpretationPackRepresentable).toBe(true);
    expect(report.twoStaticRulesPreservePolarityCorrespondenceWithoutDynamicOutputSchema).toBe(true);
    expect(report.runtimeSchemaInventionRequired).toBe(false);
    expect(report.authorityAdmissionReady).toBe(true);

    expect(report.methodologyRegistered).toBe(false);
    expect(report.ruleRegistered).toBe(false);
    expect(report.producerRegistered).toBe(false);
    expect(report.claimTypeRegistered).toBe(false);
    expect(report.claimValueSchemaRegistered).toBe(false);
    expect(report.interpretationPackRegistered).toBe(false);
    expect(report.compositionPolicyRegistered).toBe(false);
    expect(report.consumerNarrativeActivated).toBe(false);
    expect(report.compatibilityConsumerActivated).toBe(false);
    expect(report.previewDefaultRouteChanged).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.productionState).toBe('HOLD');
    expect(report.recommendedNextAction).toBe(
      'REGISTER_SEPARATE_RUNTIME_ADMISSION_CONTRACTS_WITHOUT_PRODUCTION_ACTIVATION',
    );
  });

  test('keeps deterministic content addressing and the permanent control set stable', () => {
    const first = buildRelationshipSpouseT8RuntimeAdmissionReadiness();
    const second = buildRelationshipSpouseT8RuntimeAdmissionReadiness();
    const { evidenceId, ...material } = first;

    expect(first.evidenceVersion).toBe(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_READINESS_VERSION);
    expect(first.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_READINESS_CONTROL_IDS);
    expect(first.controlCount).toBe(
      RELATIONSHIP_SPOUSE_T8_RUNTIME_ADMISSION_READINESS_CONTROL_IDS.length,
    );
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_runtime_admission_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    );
  });
});
