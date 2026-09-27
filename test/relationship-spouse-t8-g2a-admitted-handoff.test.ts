import { describe, expect, it } from 'vitest';
import {
  RELATIONSHIP_SPOUSE_T8_INITIAL_ENGINE_IMPLEMENTATION_EVIDENCE,
  buildRelationshipSpouseT8G2AAdmittedHandoff,
  createRelationshipSpouseT8G2AAdmittedContract,
  evaluateRelationshipSpouseT8G2AAdmittedHandoff,
} from '../src/research/relationship-spouse-t8-g2a-admitted-handoff.js';

describe('Relationship / Spouse T8 G2A admitted handoff', () => {
  it('constructs a complete existing G2A ADMITTED contract from the bounded Bridge refs', () => {
    const contract = createRelationshipSpouseT8G2AAdmittedContract();

    expect(contract.capabilityKey).toBe('relationship:natal:spouse');
    expect(contract.upstreamDisposition).toBe('ADMITTED');
    expect(contract.admittedAuthorityRef?.contentHash).toMatch(/^[a-f0-9]{64}$/);
    expect(contract.methodologyRef?.contentHash).toMatch(/^[a-f0-9]{64}$/);
    expect(contract.ruleClaimContractRef?.contentHash).toMatch(/^[a-f0-9]{64}$/);
    expect(contract.requiredInputs).toEqual(['derivedFacts.dayMaster']);
    expect(contract.allowedClaims).toHaveLength(2);
    expect(contract.forbiddenClaims).toContain('MARRIAGE_EXISTENCE_OR_GUARANTEE');
    expect(contract.negativeCases).toContain('NO_T5_SUBTYPE_RECONSTRUCTION');
  });

  it('routes the first Engine slice to P0_RUNTIME and not past it', () => {
    const handoff = buildRelationshipSpouseT8G2AAdmittedHandoff();

    expect(handoff.implementationEvidence).toEqual({
      producerRuntimeExists: false,
      compositionIntegrated: false,
      deterministicGuardsComplete: false,
      e2eComplete: false,
    });
    expect(handoff.g2aEvaluation.authorityContractComplete).toBe(true);
    expect(handoff.g2aEvaluation.routing).toBe('P0_RUNTIME');
    expect(handoff.g2aEvaluation.implementationMayProceed).toBe(true);
    expect(handoff.currentInitialP0RoutingValid).toBe(true);
    expect(handoff.nextDisposition).toBe(
      'IMPLEMENT_ENGINE_P0_SPOUSE_T8_PRODUCER',
    );
  });

  it('does not count the existing isolated Research runtime as an Engine producer', () => {
    const handoff = buildRelationshipSpouseT8G2AAdmittedHandoff();

    expect(handoff.researchRuntimeBoundary.sourceBoundRuntimeObserved).toBe(true);
    expect(handoff.researchRuntimeBoundary.sourceBoundRuntimeScope).toBe(
      'isolated_research_only',
    );
    expect(handoff.researchRuntimeBoundary.researchRuntimeCountsAsEngineProducer).toBe(
      false,
    );
    expect(handoff.researchRuntimeBoundary.researchRuntimeMaySkipP0Runtime).toBe(false);
    expect(
      RELATIONSHIP_SPOUSE_T8_INITIAL_ENGINE_IMPLEMENTATION_EVIDENCE.producerRuntimeExists,
    ).toBe(false);
  });

  it('keeps public and Production authority closed after G2A admission', () => {
    const handoff = buildRelationshipSpouseT8G2AAdmittedHandoff();

    expect(handoff.authorityBoundary).toEqual({
      independentHumanDomainReviewEstablished: false,
      reviewerTrustGrantEstablished: false,
      reviewerStatusPromotionAuthorized: false,
      provenanceQualityPromotionAuthorized: false,
      lifecyclePromotionAuthorized: false,
      previewExpansionAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      publicSemanticAuthorityAuthorized: false,
      productionAdmissionAuthorized: false,
      production: 'HOLD',
    });
    expect(handoff.g2aEvaluation.constraints.mayPromoteProductionAuthority).toBe(false);
  });

  it('shows why a future real Engine producer would move to P1 only after P0 implementation evidence exists', () => {
    const future = evaluateRelationshipSpouseT8G2AAdmittedHandoff({
      producerRuntimeExists: true,
      compositionIntegrated: false,
      deterministicGuardsComplete: false,
      e2eComplete: false,
    });

    expect(future.g2aEvaluation.routing).toBe('P1_COMPOSITION');
    expect(future.currentInitialP0RoutingValid).toBe(false);
    expect(future.nextDisposition).toBe(
      'REPAIR_G2A_HANDOFF_OR_ENGINE_EVIDENCE',
    );
  });

  it('is deterministic for the same governed repository state', () => {
    const left = buildRelationshipSpouseT8G2AAdmittedHandoff();
    const right = buildRelationshipSpouseT8G2AAdmittedHandoff();

    expect(left.handoffId).toBe(right.handoffId);
    expect(left.contract).toEqual(right.contract);
    expect(left.g2aEvaluation.evaluationHash).toBe(
      right.g2aEvaluation.evaluationHash,
    );
  });
});
