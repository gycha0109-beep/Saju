import { describe, expect, test } from 'vitest';
import type { FactState } from '../src/contracts/common.js';
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

const yangDayMaster: FactState<StemFact> = {
  state: 'resolved',
  value: {
    value: '갑',
    hanja: '甲',
    element: '목',
    yinYang: '양',
  },
  evidenceRefs: ['derivedFacts.dayMaster:甲'],
};

const yinDayMaster: FactState<StemFact> = {
  state: 'resolved',
  value: {
    value: '을',
    hanja: '乙',
    element: '목',
    yinYang: '음',
  },
  evidenceRefs: ['derivedFacts.dayMaster:乙', 'calculation:day-master'],
};

const ambiguousDayMaster: FactState<StemFact> = {
  state: 'ambiguous',
  candidates: [
    {
      candidateId: 'candidate-yang',
      value: {
        value: '갑',
        hanja: '甲',
        element: '목',
        yinYang: '양',
      },
      evidenceRefs: ['candidate:甲'],
    },
    {
      candidateId: 'candidate-yin',
      value: {
        value: '을',
        hanja: '乙',
        element: '목',
        yinYang: '음',
      },
      evidenceRefs: ['candidate:乙'],
    },
  ],
  reasonRefs: ['day-master-ambiguous'],
};

const unavailableDayMaster: FactState<StemFact> = {
  state: 'unavailable',
  reasonRefs: ['day-master-unavailable'],
};

describe('Relationship spouse T8 role-neutral T6 input governance', () => {
  test('reuses the repository standard resolved-only derived-fact input vocabulary', () => {
    expect(RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_REQUIREMENT).toEqual({
      key: 'relationship_spouse_role_neutral_day_master',
      source: 'derived_fact',
      pathOrClaimType: 'derivedFacts.dayMaster',
      acceptedStatuses: ['resolved'],
      required: true,
      ambiguityBehavior: 'requires_resolved',
    });
    expect(RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_GOVERNANCE.targetTaxonomyTier).toBe('T6');
    expect(
      RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_GOVERNANCE.canonicalContract.selectorField,
    ).toBe('value.yinYang');
    expect(
      RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_GOVERNANCE.canonicalContract
        .preserveSourceEvidenceRefs,
    ).toBe(true);
  });

  test('projects a resolved Yang Day Master into the governed T6 envelope and preserves provenance', () => {
    const input = buildRelationshipSpouseT8RoleNeutralT6InputFromDayMaster(yangDayMaster);
    expect(input).not.toBeNull();
    expect(input).toMatchObject({
      taxonomyTier: 'T6',
      source: 'derived_fact',
      pathOrClaimType: 'derivedFacts.dayMaster',
      selectorField: 'value.yinYang',
      factState: 'resolved',
      dayMasterPolarity: '양',
      correspondence: {
        dayMasterPolarity: '양',
        spouseStarSemantic: 'INDIRECT_WEALTH',
        tenGodNativeLabel: '편재',
        tenGodHanjaLabel: '偏財',
      },
      evidenceRefs: ['derivedFacts.dayMaster:甲'],
    });
  });

  test('projects a resolved Yin Day Master into the governed T6 envelope and preserves all evidence refs', () => {
    const input = buildRelationshipSpouseT8RoleNeutralT6InputFromDayMaster(yinDayMaster);
    expect(input).not.toBeNull();
    expect(input).toMatchObject({
      taxonomyTier: 'T6',
      source: 'derived_fact',
      pathOrClaimType: 'derivedFacts.dayMaster',
      selectorField: 'value.yinYang',
      factState: 'resolved',
      dayMasterPolarity: '음',
      correspondence: {
        dayMasterPolarity: '음',
        spouseStarSemantic: 'INDIRECT_POWER',
        tenGodNativeLabel: '편관',
        tenGodHanjaLabel: '偏官',
      },
      evidenceRefs: ['derivedFacts.dayMaster:乙', 'calculation:day-master'],
    });
  });

  test('fails closed for ambiguous and unavailable Day Master facts', () => {
    expect(buildRelationshipSpouseT8RoleNeutralT6InputFromDayMaster(ambiguousDayMaster)).toBeNull();
    expect(buildRelationshipSpouseT8RoleNeutralT6InputFromDayMaster(unavailableDayMaster)).toBeNull();
    expect(
      RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_GOVERNANCE.canonicalContract
        .ambiguousFactProducesT6Input,
    ).toBe(false);
    expect(
      RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_GOVERNANCE.canonicalContract
        .unavailableFactProducesT6Input,
    ).toBe(false);
  });

  test('chains only from the exact upstream four-of-five semantic-governance state', () => {
    const upstream = buildRelationshipSpouseT8RoleNeutralSemanticCorrespondenceGovernance();
    const report = buildRelationshipSpouseT8RoleNeutralT6InputGovernance();
    expect(upstream.status).toBe(
      'GOVERNED_CANONICAL_DAY_MASTER_POLARITY_SPOUSE_STAR_SEMANTIC_CORRESPONDENCE_ESTABLISHED',
    );
    expect(upstream.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(true);
    expect(upstream.currentRelationshipT6InputPathEstablished).toBe(false);
    expect(upstream.authorityGapsClosedCount).toBe(4);
    expect(upstream.authorityGapsOpenCount).toBe(1);
    expect(report.upstreamEvidenceId).toBe(upstream.evidenceId);
    expect(report.exactUpstreamFourOfFiveStateAccepted).toBe(true);
    expect(report.explicitRoleNeutralNatalMappingEstablished).toBe(true);
    expect(report.currentGovernedMethodSemanticCorrespondenceEstablished).toBe(true);
    expect(report.currentRelationshipT6InputPathEstablished).toBe(true);
    expect(report.relationshipT6InputGapClosedByThisEvidence).toBe(true);
    expect(report.qualifyingPrimaryWitnessRemainsClosed).toBe(true);
    expect(report.independentNormativeProvenanceRemainsClosed).toBe(true);
    expect(report.authorityGapsClosedCount).toBe(5);
    expect(report.authorityGapsOpenCount).toBe(0);
  });

  test('keeps five-of-five research authority closure separate from runtime admission and Production', () => {
    const report = buildRelationshipSpouseT8RoleNeutralT6InputGovernance();
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
    expect(report.recommendedNextAction).toBe(
      'REVIEW_SEPARATE_RUNTIME_ADMISSION_AFTER_FIVE_OF_FIVE_RESEARCH_AUTHORITY_CLOSURE',
    );
  });

  test('preserves the historical fail-closed and inference boundaries', () => {
    const governance = RELATIONSHIP_SPOUSE_T8_ROLE_NEUTRAL_T6_INPUT_GOVERNANCE;
    expect(governance.historicalFailClosedBoundary.broadT5FamilyPresenceCannotBeRelabelledAsSpouseAuthority).toBe(
      true,
    );
    expect(governance.historicalFailClosedBoundary.discardedT5SubtypeReconstructionAuthorized).toBe(false);
    expect(governance.historicalFailClosedBoundary.generalRelationshipT8RelabellingAuthorized).toBe(false);
    expect(governance.historicalFailClosedBoundary.oldT5InformationLossFindingOverridden).toBe(false);
    expect(governance.semanticBoundary.nativeSexInputRequired).toBe(false);
    expect(governance.semanticBoundary.partnerSexInputRequired).toBe(false);
    expect(governance.semanticBoundary.partnerIdentityInputRequired).toBe(false);
    expect(governance.semanticBoundary.sexualOrientationInputRequired).toBe(false);
    expect(governance.semanticBoundary.secondChartInputRequired).toBe(false);
    expect(governance.semanticBoundary.compatibilityInputRequired).toBe(false);
    expect(governance.semanticBoundary.marriageGuaranteeInferenceAuthorized).toBe(false);
    expect(governance.semanticBoundary.fertilityInferenceAuthorized).toBe(false);
    expect(governance.semanticBoundary.relationshipLegalityOrEthicsInferenceAuthorized).toBe(false);
    expect(governance.semanticBoundary.crossSourceSemanticStitchingAuthorized).toBe(false);
  });

  test('freezes the control set and deterministic content address', () => {
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
    expect(first.status).toBe(
      'GOVERNED_RESOLVED_CANONICAL_DAY_MASTER_T6_INPUT_CONTRACT_ESTABLISHED',
    );
    expect(second.evidenceId).toBe(first.evidenceId);
    expect(evidenceId).toBe(
      `relationship_spouse_t8_role_neutral_t6_input_governance_${deterministicContentHash(material).slice(0, 24)}`,
    );
  });
});
