import { describe, expect, test } from 'vitest';
import { ambiguous, resolved, unavailable } from '../src/contracts/common.js';
import type { StemFact } from '../src/contracts/calculation.js';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildRelationshipSpouseT8RoleNeutralSemanticCorrespondenceGovernance } from '../src/research/relationship-spouse-t8-role-neutral-semantic-correspondence-governance.js';
import {
  RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_GOVERNANCE,
  RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_GOVERNANCE_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_GOVERNANCE_VERSION,
  RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_REQUIREMENT,
  buildRelationshipSpouseT8RoleNeutralT6InputFromDayMaster,
  buildRelationshipSpouseT8RoleNeutralT6InputGovernance,
} from '../src/research/relationship-spouse-t8-role-neutral-t6-input-governance.js';

const YANG_STEM: StemFact = {
  value: '갑',
  hanja: '甲',
  element: '목',
  yinYang: '양',
};

const YIN_STEM: StemFact = {
  value: '을',
  hanja: '乙',
  element: '목',
  yinYang: '음',
};

describe('Relationship spouse T8 role-neutral T6 input governance', () => {
  test('reuses the standard repository RuleInputRequirement vocabulary exactly', () => {
    expect(RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_REQUIREMENT).toEqual({
      key: 'relationship_spouse_role_neutral_day_master',
      source: 'derived_fact',
      pathOrClaimType: 'derivedFacts.dayMaster',
      acceptedStatuses: ['resolved'],
      required: true,
      ambiguityBehavior: 'requires_resolved',
    });

    const governance = RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_GOVERNANCE;
    expect(governance.targetTaxonomyTier).toBe('T6');
    expect(governance.canonicalContract.sourceFactPath).toBe('derivedFacts.dayMaster');
    expect(governance.canonicalContract.sourceFactContract).toBe('FactState<StemFact>');
    expect(governance.canonicalContract.factDiscriminator).toBe('status');
    expect(governance.canonicalContract.acceptedFactStatus).toBe('resolved');
    expect(governance.canonicalContract.selectorField).toBe('value.yinYang');
    expect(governance.canonicalContract.syntheticProvenanceFieldAuthorized).toBe(false);
  });

  test('projects resolved Yang Day Master through the governed INDIRECT_WEALTH correspondence', () => {
    const input = buildRelationshipSpouseT8RoleNeutralT6InputFromDayMaster(resolved(YANG_STEM));

    expect(input).toEqual({
      taxonomyTier: 'T6',
      source: 'derived_fact',
      pathOrClaimType: 'derivedFacts.dayMaster',
      selectorField: 'value.yinYang',
      factStatus: 'resolved',
      dayMasterPolarity: '양',
      correspondence: {
        dayMasterPolarity: '양',
        spouseStarSemantic: 'INDIRECT_WEALTH',
        tenGodNativeLabel: '편재',
        tenGodHanjaLabel: '偏財',
      },
    });
    expect(input).not.toHaveProperty('evidenceRefs');
    expect(Object.keys(input ?? {})).toEqual([
      'taxonomyTier',
      'source',
      'pathOrClaimType',
      'selectorField',
      'factStatus',
      'dayMasterPolarity',
      'correspondence',
    ]);
  });

  test('projects resolved Yin Day Master through the governed INDIRECT_POWER correspondence', () => {
    const input = buildRelationshipSpouseT8RoleNeutralT6InputFromDayMaster(resolved(YIN_STEM));

    expect(input?.dayMasterPolarity).toBe('음');
    expect(input?.correspondence).toEqual({
      dayMasterPolarity: '음',
      spouseStarSemantic: 'INDIRECT_POWER',
      tenGodNativeLabel: '편관',
      tenGodHanjaLabel: '偏官',
    });
    expect(input).not.toHaveProperty('evidenceRefs');
  });

  test('fails closed for ambiguous and unavailable Day Master facts', () => {
    const ambiguousDayMaster = ambiguous<StemFact>(
      [
        { candidateId: 'yang', value: YANG_STEM, reasonRefs: ['scenario:yang'] },
        { candidateId: 'yin', value: YIN_STEM, reasonRefs: ['scenario:yin'] },
      ],
      ['day_master_ambiguity'],
    );

    expect(buildRelationshipSpouseT8RoleNeutralT6InputFromDayMaster(ambiguousDayMaster)).toBeNull();
    expect(
      buildRelationshipSpouseT8RoleNeutralT6InputFromDayMaster(
        unavailable('day_master_unavailable'),
      ),
    ).toBeNull();
  });

  test('requires the exact content-addressed upstream four-of-five authority state', () => {
    const upstream = buildRelationshipSpouseT8RoleNeutralSemanticCorrespondenceGovernance();
    const report = buildRelationshipSpouseT8RoleNeutralT6InputGovernance();

    expect(upstream.status).toBe(
      'GOVERNED_CANONICAL_DAY_MASTER_POLARITY_SPOUSE_STAR_SEMANTIC_CORRESPONDENCE_ESTABLISHED',
    );
    expect(upstream.explicitRoleNeutralNatalMappingEstablished).toBe(true);
    expect(upstream.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(true);
    expect(upstream.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(upstream.authorityGapsClosedCount).toBe(4);
    expect(upstream.authorityGapsOpenCount).toBe(1);
    expect(report.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(report.exactUpstreamFourOfFiveStateAccepted).toBe(true);
  });

  test('preserves historical T5 information-loss boundaries without reconstruction', () => {
    const boundary = RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_GOVERNANCE.historicalFailClosedBoundary;

    expect(boundary.priorFeasibilityPr).toBe(312);
    expect(boundary.broadT5FamilyPresenceCannotBeRelabelledAsSpouseAuthority).toBe(true);
    expect(boundary.discardedT5SubtypeReconstructionAuthorized).toBe(false);
    expect(boundary.discardedT5SlotReconstructionAuthorized).toBe(false);
    expect(boundary.generalRelationshipT8RelabellingAuthorized).toBe(false);
    expect(boundary.oldT5InformationLossFindingOverridden).toBe(false);
    expect(boundary.t5FamilyInputRequired).toBe(false);
    expect(boundary.currentPathConsumesCanonicalDayMasterFactDirectly).toBe(true);
  });

  test('requires no sex, identity, orientation, second-chart, or compatibility input', () => {
    const boundary = RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_GOVERNANCE.semanticBoundary;

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
    expect(boundary.crossSourceSemanticStitchingAuthorized).toBe(false);
  });

  test('closes only RELATIONSHIP_T6_INPUT and advances the research ledger to exactly five of five', () => {
    const report = buildRelationshipSpouseT8RoleNeutralT6InputGovernance();

    expect(report.status).toBe(
      'GOVERNED_ROLE_NEUTRAL_RELATIONSHIP_T6_INPUT_CONTRACT_ESTABLISHED',
    );
    expect(report.canonicalSourceFactPath).toBe('derivedFacts.dayMaster');
    expect(report.selectorField).toBe('value.yinYang');
    expect(report.factDiscriminator).toBe('status');
    expect(report.acceptedFactStatus).toBe('resolved');
    expect(report.syntheticProvenanceFieldIntroduced).toBe(false);
    expect(report.explicitRoleNeutralNatalMappingEstablished).toBe(true);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(true);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(true);
    expect(report.relationshipT6InputGapClosedByThisEvidence).toBe(true);
    expect(report.qualifyingPrimaryWitnessRemainsClosed).toBe(true);
    expect(report.independentNormativeProvenanceRemainsClosed).toBe(true);
    expect(report.authorityGapsClosedCount).toBe(5);
    expect(report.authorityGapsOpenCount).toBe(0);
  });

  test('keeps admission, producer, registries, consumers, and Production disabled', () => {
    const report = buildRelationshipSpouseT8RoleNeutralT6InputGovernance();
    const runtime = RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_GOVERNANCE.runtimeBoundary;

    expect(report.authorityAdmissionReady).toBe(false);
    expect(report.spouseT8ProducerReady).toBe(false);
    expect(report.methodologyRegistered).toBe(false);
    expect(report.producerRegistered).toBe(false);
    expect(report.ruleRegistered).toBe(false);
    expect(report.claimTypeRegistered).toBe(false);
    expect(report.interpretationPackRegistered).toBe(false);
    expect(report.consumerNarrativeActivated).toBe(false);
    expect(report.compatibilityConsumerActivated).toBe(false);
    expect(report.previewDefaultRouteChanged).toBe(false);
    expect(report.productionPromotionReady).toBe(false);
    expect(report.productionState).toBe('HOLD');
    expect(runtime.researchT6InputContractEstablished).toBe(true);
    expect(runtime.methodologyRegistered).toBe(false);
    expect(runtime.producerRegistered).toBe(false);
    expect(runtime.ruleRegistered).toBe(false);
    expect(runtime.claimTypeRegistered).toBe(false);
    expect(runtime.interpretationPackRegistered).toBe(false);
    expect(runtime.consumerNarrativeActivated).toBe(false);
    expect(runtime.compatibilityConsumerActivated).toBe(false);
    expect(runtime.previewDefaultRouteChanged).toBe(false);
    expect(runtime.productionBehaviorChanged).toBe(false);
  });

  test('keeps the control set and deterministic content address stable', () => {
    const first = buildRelationshipSpouseT8RoleNeutralT6InputGovernance();
    const second = buildRelationshipSpouseT8RoleNeutralT6InputGovernance();
    const { evidenceId, ...material } = first;

    expect(first.controlIds).toEqual(
      RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_GOVERNANCE_CONTROL_IDS,
    );
    expect(first.controlCount).toBe(
      RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_GOVERNANCE_CONTROL_IDS.length,
    );
    expect(first.evidenceVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_GOVERNANCE_VERSION,
    );
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_role_neutral_t6_input_governance_${deterministicContentHash(material).slice(0, 24)}`,
    );
    expect(first.recommendedNextAction).toBe(
      'REVIEW_SEPARATE_RUNTIME_ADMISSION_AFTER_FIVE_OF_FIVE_RESEARCH_AUTHORITY',
    );
  });
});
