import { describe, expect, it } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import { buildCurrentSajuEngineCapabilityFrontier } from '../src/interpretation/saju-engine-capability-frontier.js';
import { inspectMyeonghwaProductionComposition } from '../src/production/production-composition.js';
import { buildRelationshipSpouseT8BoundedEngineDevelopmentAdmission } from '../src/research/relationship-spouse-t8-bounded-engine-development-admission.js';
import { RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY } from '../src/research/relationship-spouse-t8-source-bound-runtime.js';

describe('Relationship / Spouse T8 bounded Engine-development admission', () => {
  it('admits exactly the current source-bound runtime for bounded Engine development', () => {
    const admission = buildRelationshipSpouseT8BoundedEngineDevelopmentAdmission();

    expect(admission.capabilityKey).toBe('relationship:natal:spouse');
    expect(admission.sourceBoundRuntimeVersion).toBe('1.0.1');
    expect(admission.disposition).toBe('BOUNDED_ENGINE_DEVELOPMENT_ADMITTED');
    expect(admission.admissionAuthorized).toBe(true);
    expect(admission.prerequisites).toEqual({
      capabilityExact: true,
      runtimeVersionExact: true,
      runtimeSourceBound: true,
      runtimeStillResearchOnly: true,
      exactCurrentReviewBinding: true,
      aiAssistedInternalReviewEstablished: true,
      exactlyThreeInternalApprovals: true,
      sourceRoleBoundaryPreserved: true,
      noHumanDomainReviewClaim: true,
      noTrustGrant: true,
      productionStillHeld: true,
    });
  });

  it('publishes exact content-addressed admission, methodology, and rule/claim contract refs', () => {
    const admission = buildRelationshipSpouseT8BoundedEngineDevelopmentAdmission();
    const registry = RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY;
    const sha256 = /^[a-f0-9]{64}$/;

    expect(admission.admissionRef.contentHash).toMatch(sha256);
    expect(admission.methodologyRef).toEqual(registry.snapshot.methodologies[0]);
    expect(admission.methodologyRef.contentHash).toMatch(sha256);
    expect(admission.ruleClaimContractRef.contentHash).toMatch(sha256);
    expect(admission.ruleClaimContractRef.contentHash).toBe(
      deterministicContentHash(admission.ruleClaimContract),
    );

    const { admissionRef: _admissionRef, admissionAuthorized: _authorized, ruleClaimContract: _contract, ...material } =
      admission;
    expect(admission.admissionRef.contentHash).toBe(deterministicContentHash(material));
  });

  it('binds the rule/claim contract to exactly two selector rules and the registered claim contract', () => {
    const admission = buildRelationshipSpouseT8BoundedEngineDevelopmentAdmission();
    const contract = admission.ruleClaimContract;

    expect(contract.ruleRefs).toHaveLength(2);
    expect(contract.ruleRefs.map((ref) => ref.id).sort()).toEqual([
      'relationship-spouse-t8-yang-day-master',
      'relationship-spouse-t8-yin-day-master',
    ]);
    expect(contract.requiredInputs).toEqual(['derivedFacts.dayMaster']);
    expect(contract.allowedClaims).toHaveLength(2);
    expect(contract.forbiddenClaims).toContain('PARTNER_IDENTITY_INFERENCE');
    expect(contract.forbiddenClaims).toContain('COMPATIBILITY_SCORING');
    expect(contract.forbiddenClaims).toContain(
      'ANNUAL_OR_MONTHLY_SPOUSE_AUTHORITY_EXPANSION',
    );
    expect(contract.semanticBoundary.schoolDependencePreserved).toBe(true);
    expect(contract.semanticBoundary.newSajuSemanticsAuthorized).toBe(false);
  });

  it('authorizes Engine development classes without authorizing any public or Production surface', () => {
    const admission = buildRelationshipSpouseT8BoundedEngineDevelopmentAdmission();

    expect(admission.engineDevelopmentAuthorization).toEqual({
      producerRuntimeDevelopmentAuthorized: true,
      compositionDevelopmentAuthorized: true,
      deterministicGuardDevelopmentAuthorized: true,
      engineE2EDevelopmentAuthorized: true,
      existingProducerRuntimeMayBeReused: true,
      semanticExpansionAuthorized: false,
    });
    expect(admission.publicAndProductionBoundary).toEqual({
      independentHumanDomainReviewStillRequired: true,
      trustedDomainAttestationStillRequired: true,
      reviewerTrustGrantStillRequired: true,
      reviewerStatusPromotionAuthorized: false,
      provenanceQualityPromotionAuthorized: false,
      lifecyclePromotionAuthorized: false,
      previewActivationAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      publicSemanticAuthorityAuthorized: false,
      productionAdmissionAuthorized: false,
      production: 'HOLD',
    });
  });

  it('does not mutate G2A/frontier routing in this slice', () => {
    const admission = buildRelationshipSpouseT8BoundedEngineDevelopmentAdmission();
    const frontier = buildCurrentSajuEngineCapabilityFrontier();
    const spouse = frontier.entries.find(
      (entry) => entry.capabilityKey === 'relationship:natal:spouse',
    );

    expect(admission.g2aBoundary.currentG2ARoutingMutationAuthorizedInThisArtifact).toBe(false);
    expect(admission.g2aBoundary.currentG2ARoutingMustRemain).toBe('HOLD_AUTHORITY');
    expect(admission.g2aBoundary.separateG2AHandoffRequired).toBe(true);
    expect(spouse?.currentRouting).toBe('HOLD_AUTHORITY');
    expect(spouse?.implementationMayProceed).toBe(false);
  });

  it('keeps the underlying source-bound registry blocked from Production', () => {
    const inspection = inspectMyeonghwaProductionComposition({
      registry: RELATIONSHIP_SPOUSE_T8_SOURCE_BOUND_RUNTIME_REGISTRY,
    });

    expect(inspection.status).toBe('blocked');
    if (inspection.status !== 'blocked') throw new Error('Expected Production block.');
    expect(inspection.blockers).toContainEqual(
      expect.objectContaining({ code: 'INTERPRETATION_PACK_NOT_PRODUCTION' }),
    );
  });

  it('is deterministic and content-addresses drift-sensitive material', () => {
    const left = buildRelationshipSpouseT8BoundedEngineDevelopmentAdmission();
    const right = buildRelationshipSpouseT8BoundedEngineDevelopmentAdmission();

    expect(left).toEqual(right);
    expect(left.admissionRef).toEqual(right.admissionRef);
    expect(left.ruleClaimContractRef).toEqual(right.ruleClaimContractRef);

    const driftedContract = {
      ...left.ruleClaimContract,
      requiredInputs: ['derivedFacts.dayMaster', 'forbidden.synthetic.input'],
    };
    expect(deterministicContentHash(driftedContract)).not.toBe(
      left.ruleClaimContractRef.contentHash,
    );
  });
});
