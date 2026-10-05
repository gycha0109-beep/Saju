import { describe, expect, it } from 'vitest';

import {
  R180_AUTHORITY,
  R180_COVERAGE_SUMMARY,
  R180_GOVERNANCE,
  R180_JIA_JI_REPOSITORY_EVIDENCE_COVERAGE_AUDIT_VERSION,
  R180_REJECTED_SHORTCUTS,
  R180_REPOSITORY_ASSET_AUDIT,
  R180_REQUIREMENT_COVERAGE,
} from '../src/research/general-natal-predicate-candidate-jia-ji-repository-evidence-coverage-audit.js';

describe('R180 Jia-Ji repository evidence coverage audit', () => {
  it('audits the existing pair, topology, source, and governance assets', () => {
    expect(R180_JIA_JI_REPOSITORY_EVIDENCE_COVERAGE_AUDIT_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R180_REPOSITORY_ASSET_AUDIT).toMatchObject({
      r051: {
        pairIdentityVerified: true,
        effectiveCombinationAuthorized: false,
        transformationAuthorized: false,
        globalEffectiveCombinationResolverAuthorized: false,
      },
      r142: {
        allFiveCombinationFamiliesCovered: true,
        allStructuralCandidatesPreserved: true,
        effectiveCombinationResolverAuthorized: false,
        transformationResolverAuthorized: false,
      },
      r172: {
        exactSourceNarrationAvailable: true,
        configurationDependenceObserved: true,
        standaloneJiaPredicateAuthorized: false,
        settlementEstablished: false,
      },
      r177: {
        exactControlSurfaceObserved: true,
        structuralCombinationCandidateObserved: true,
        dualRelationSurfaceObserved: true,
        exactContextSettlementEstablished: false,
        crossRelationPrecedenceAuthorized: false,
      },
      r178: {
        exactPairBothNonDayMaster: true,
        stemFiveScopeTransferBlocked: true,
        pairLocalInteractionOutcomeEstablished: false,
        jiaJiBindingEstablished: false,
        jiaJiTransformationEstablished: false,
      },
      r179: {
        exactPairRequirementSetEstablished: true,
        pairLocalNormativeAuthorityAcquired: false,
        requirementCount: 6,
      },
      i233: {
        authorityGap:
          'COMPETING_RELATION_SETTLEMENT_AUTHORITY_NOT_ESTABLISHED',
        authorityGapClosed: false,
        crossRelationPrecedenceAuthorized: false,
      },
    });
  });

  it('covers every R179 requirement without claiming normative satisfaction', () => {
    expect(R180_REQUIREMENT_COVERAGE).toHaveLength(6);
    expect(
      R180_REQUIREMENT_COVERAGE.map((item) => item.requirementId),
    ).toEqual([
      'EXACT_NON_DAY_MASTER_JIA_JI_INTERACTION_SOURCE',
      'CONTROL_AND_COMBINATION_COEXISTENCE_SEMANTICS',
      'BINDING_OR_NON_BINDING_SEMANTICS',
      'POST_COMBINATION_SUBJECT_IDENTITY_OR_FUNCTION_PERSISTENCE',
      'CONTEXT_AND_EXCEPTION_CONDITIONS',
      'PAIR_LOCAL_OUTCOME_DISTINCT_FROM_CROSS_RELATION_PRECEDENCE',
    ]);
    for (const row of R180_REQUIREMENT_COVERAGE) {
      expect(row.repositorySubstrateAvailable).toBe(true);
      expect(row.repositoryGovernanceBoundaryAvailable).toBe(true);
      expect(row.normativeAuthoritySatisfied).toBe(false);
      expect(row.externalPrimaryOrCanonicalWitnessStillRequired).toBe(true);
      expect(row.coveredAssetRefs.length).toBeGreaterThan(0);
      expect(row.finding.length).toBeGreaterThan(0);
    }
  });

  it('distinguishes partial substrate from outcome authority and governance-only coverage', () => {
    expect(
      R180_REQUIREMENT_COVERAGE.map((item) => item.coverageClass),
    ).toEqual([
      'PARTIAL_SUBSTRATE_ONLY',
      'NO_OUTCOME_AUTHORITY',
      'NO_OUTCOME_AUTHORITY',
      'NO_OUTCOME_AUTHORITY',
      'PARTIAL_SUBSTRATE_ONLY',
      'REPOSITORY_GOVERNANCE_ONLY',
    ]);
    expect(R180_COVERAGE_SUMMARY).toEqual({
      requirementCount: 6,
      repositorySubstrateAvailableCount: 6,
      repositoryGovernanceBoundaryAvailableCount: 6,
      normativeAuthoritySatisfiedCount: 0,
      externalPrimaryOrCanonicalWitnessStillRequiredCount: 6,
      partialSubstrateOnlyCount: 2,
      noOutcomeAuthorityCount: 3,
      repositoryGovernanceOnlyCount: 1,
    });
  });

  it('rejects promoting existing assets into a Jia-Ji outcome rule', () => {
    expect(R180_REJECTED_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'REPOSITORY_ASSET_EXISTS_EQUALS_NORMATIVE_AUTHORITY',
        'PAIR_IDENTITY_EQUALS_EFFECTIVE_COMBINATION',
        'STRUCTURAL_CANDIDATE_EQUALS_BINDING',
        'SOURCE_CONTROL_NARRATION_EQUALS_COEXISTENCE_SETTLEMENT',
        'REPOSITORY_GOVERNANCE_EQUALS_TRADITIONAL_SOURCE_AUTHORITY',
        'PARTIAL_SUBSTRATE_EQUALS_OUTCOME_PROMOTION_READY',
      ]),
    );
  });

  it('leaves every semantic and production authority closed', () => {
    expect(R180_GOVERNANCE).toEqual({
      r179RequirementContractPreserved: true,
      noR179RequirementSatisfiedByRepositoryAudit: true,
      sourceSubstrateDistinctFromNormativeOutcomeAuthority: true,
      repositoryGovernanceDistinctFromTraditionalAuthority: true,
      pairLocalOutcomeStillRequiredBeforeCrossRelationPrecedence: true,
      externalPrimaryCanonicalDiscoveryNowJustified: true,
      noExistingRepositoryAssetMayBePromotedByInference: true,
    });
    expect(R180_AUTHORITY).toMatchObject({
      researchOnly: true,
      repositoryEvidenceInventoryAudited: true,
      exactPairSubstrateAvailable: true,
      normativePairLocalOutcomeAuthorityFoundInRepository: false,
      externalPrimaryCanonicalWitnessDiscoveryRequired: true,
      pairLocalInteractionOutcomeEstablished: false,
      jiaJiBindingEstablished: false,
      jiaJiTransformationEstablished: false,
      coexistenceSettlementEstablished: false,
      exactContextSettlementEstablished: false,
      crossRelationPrecedenceAuthorized: false,
      competingRelationSettlementResolved: false,
      executableResolverAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
