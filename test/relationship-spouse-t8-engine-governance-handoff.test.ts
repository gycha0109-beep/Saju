import { describe, expect, it } from 'vitest';
import {
  RELATIONSHIP_SPOUSE_T8_ENGINE_CAPABILITY_KEY,
  buildRelationshipSpouseT8EngineGovernanceHandoff,
} from '../src/research/relationship-spouse-t8-engine-governance-handoff.js';

describe('Relationship Spouse T8 Engine governance handoff', () => {
  it('accepts the exact Bridge ENGINE_HANDOFF state without asserting ADMITTED', () => {
    const handoff = buildRelationshipSpouseT8EngineGovernanceHandoff();

    expect(handoff.upstreamAccepted).toBe(true);
    expect(handoff.engineIntake.capabilityKey).toBe('relationship:natal:spouse');
    expect(RELATIONSHIP_SPOUSE_T8_ENGINE_CAPABILITY_KEY).toBe(
      'relationship:natal:spouse',
    );
    expect(handoff.engineIntake.upstreamDisposition).toBe('AUTHORITY_GAP');
    expect(handoff.engineIntake.expectedG2ARouting).toBe('HOLD_AUTHORITY');
    expect(handoff.engineIntake.admittedAuthorityRefAvailable).toBe(false);
    expect(handoff.engineIntake.admittedMethodologyRefAvailable).toBe(false);
    expect(handoff.engineIntake.admittedRuleClaimContractRefAvailable).toBe(false);
  });

  it('allows governance remediation but no Engine semantic implementation lane', () => {
    const handoff = buildRelationshipSpouseT8EngineGovernanceHandoff();

    expect(handoff.engineIntake.governanceRemediationMayProceed).toBe(true);
    expect(handoff.engineIntake.engineSemanticImplementationMayProceed).toBe(false);
    expect(handoff.engineIntake.producerRuntimeAlreadyExistsInIsolatedResearchScope).toBe(
      true,
    );
    expect(handoff.engineIntake.implementationEvidenceMustNotOverrideAuthorityGap).toBe(
      true,
    );
    expect(handoff.nonActivationBoundary.engineP0RuntimeAuthorized).toBe(false);
    expect(handoff.nonActivationBoundary.engineP1CompositionAuthorized).toBe(false);
    expect(handoff.nonActivationBoundary.engineP2HardeningAuthorized).toBe(false);
  });

  it('preserves the bounded spouse-star claim contract and negative cases', () => {
    const handoff = buildRelationshipSpouseT8EngineGovernanceHandoff();

    expect(handoff.governedClaimBoundary.requiredInputs).toEqual([
      'derivedFacts.dayMaster',
    ]);
    expect(handoff.governedClaimBoundary.canonicalSelectorInput).toBe(
      'derivedFacts.dayMaster.yinYang',
    );
    expect(handoff.governedClaimBoundary.allowedClaims).toHaveLength(2);
    expect(handoff.governedClaimBoundary.forbiddenClaims).toContain(
      'MARRIAGE_EXISTENCE_OR_GUARANTEE',
    );
    expect(handoff.governedClaimBoundary.forbiddenClaims).toContain(
      'COMPATIBILITY_SCORING',
    );
    expect(handoff.governedClaimBoundary.forbiddenClaims).toContain(
      'ANNUAL_OR_MONTHLY_SPOUSE_AUTHORITY_EXPANSION',
    );
    expect(handoff.governedClaimBoundary.negativeCases).toContain(
      'NO_T5_SUBTYPE_RECONSTRUCTION',
    );
    expect(handoff.governedClaimBoundary.negativeCases).toContain(
      'NO_GENERAL_RELATIONSHIP_T8_RELABELLING',
    );
  });

  it('records the unresolved promotion-governance blockers instead of fabricating authority', () => {
    const handoff = buildRelationshipSpouseT8EngineGovernanceHandoff();

    expect(handoff.authorityGapBlockers).toEqual([
      {
        blocker: 'RUNTIME_SOURCE_BINDING_AUTHORITY_NOT_ESTABLISHED',
        closed: false,
      },
      {
        blocker: 'TRUST_PINNED_REVIEWER_AUTHORITY_NOT_ESTABLISHED',
        closed: false,
      },
      {
        blocker: 'LIFECYCLE_PROMOTION_NOT_AUTHORIZED',
        closed: false,
      },
    ]);
    expect(handoff.governanceHandoff.currentAdmissionBlockersClosed).toBe(false);
    expect(handoff.governanceHandoff.futureG2AAdmittedDispositionAuthorized).toBe(
      false,
    );
    expect(
      handoff.governanceHandoff.futureG2AAdmittedDispositionRequiresFreshBridgeAdmission,
    ).toBe(true);
  });

  it('keeps all consumer and Production activation closed', () => {
    const handoff = buildRelationshipSpouseT8EngineGovernanceHandoff();

    expect(handoff.nonActivationBoundary.semanticResearchReopenAuthorized).toBe(false);
    expect(handoff.nonActivationBoundary.lifecyclePromotionAuthorized).toBe(false);
    expect(handoff.nonActivationBoundary.consumerNarrativeActivationAuthorized).toBe(
      false,
    );
    expect(
      handoff.nonActivationBoundary.compatibilityConsumerActivationAuthorized,
    ).toBe(false);
    expect(
      handoff.nonActivationBoundary.previewDefaultRouteActivationAuthorized,
    ).toBe(false);
    expect(handoff.nonActivationBoundary.officialReadingAuthorityAuthorized).toBe(
      false,
    );
    expect(handoff.nonActivationBoundary.productionAdmissionAuthorized).toBe(false);
    expect(handoff.nonActivationBoundary.production).toBe('HOLD');
  });

  it('is deterministic for the same upstream Bridge state', () => {
    const left = buildRelationshipSpouseT8EngineGovernanceHandoff();
    const right = buildRelationshipSpouseT8EngineGovernanceHandoff();

    expect(left.handoffId).toBe(right.handoffId);
    expect(left.handoffId).toMatch(/^[a-f0-9]{64}$/);
    expect(left.nextDisposition).toBe('ENGINE_GOVERNANCE_REMEDIATION');
  });
});
