import { describe, expect, it } from 'vitest';
import {
  R022_AUTHORITY,
  R022_EXECUTION_GAPS,
} from '../src/research/general-natal-wealth-pattern-conditions.js';
import {
  R050_AUTHORITY,
} from '../src/research/general-natal-ten-god-pair-matrix.js';
import {
  RELATIONSHIP_NATAL_GENERAL_RUNTIME_PATHS,
  buildRelationshipNatalGeneralRuntimeAdequacyEvidence,
} from '../src/research/relationship-natal-general-runtime-adequacy-evidence.js';

describe('Relationship Natal general runtime/source predicate adequacy', () => {
  it('covers exactly the two Phase-2 narrower research paths', () => {
    const evidence =
      buildRelationshipNatalGeneralRuntimeAdequacyEvidence();

    expect(evidence.exactNarrowedPathSurface).toBe(true);
    expect(evidence.runtimePathCount).toBe(2);
    expect(RELATIONSHIP_NATAL_GENERAL_RUNTIME_PATHS).toHaveLength(2);
  });

  it('keeps both current rules bound only to coarse family-presence inputs', () => {
    const evidence =
      buildRelationshipNatalGeneralRuntimeAdequacyEvidence();

    expect(evidence.currentRulesStillUseFamilyPresenceOnly).toBe(true);
    expect(
      evidence.runtimePaths.every(
        (row) => row.runtimeState.currentRuleConsumesFamilyPresenceOnly,
      ),
    ).toBe(true);
  });

  it('separates technical Output-member representability from Relationship authority', () => {
    const evidence =
      buildRelationshipNatalGeneralRuntimeAdequacyEvidence();
    const output = evidence.runtimePaths.find(
      (row) => row.pathId === 'OUTPUT_EXPRESSION_AXIS',
    );

    expect(output?.runtimeState.canonicalTenGodMemberIdentityPreserved).toBe(
      true,
    );
    expect(output?.runtimeState.exactMemberNarrowingTechnicallyRepresentable).toBe(
      true,
    );
    expect(output?.sourceState.relationshipConnectionOutcomeEstablished).toBe(
      false,
    );
    expect(output?.sourceState.sourceAdequateForRelationshipRule).toBe(false);
    expect(output?.engineRuleAuthoringAuthorized).toBe(false);
  });

  it('proves Peer+Wealth cannot be reduced to simple family co-presence', () => {
    const evidence =
      buildRelationshipNatalGeneralRuntimeAdequacyEvidence();
    const peerWealth = evidence.runtimePaths.find(
      (row) =>
        row.pathId === 'CONDITIONAL_PEER_WEALTH_RESOURCE_COMPETITION',
    );

    expect(
      peerWealth?.sourceState.simplePeerWealthCopresenceSufficient,
    ).toBe(false);
    expect(peerWealth?.requiredPredicates.length).toBeGreaterThanOrEqual(7);
    expect(
      peerWealth?.runtimeState.currentCanonicalDerivedFactsExposeFinalStrengthResolver,
    ).toBe(false);
    expect(
      peerWealth?.runtimeState.currentCanonicalDerivedFactsExposeWealthUseResolver,
    ).toBe(false);
    expect(
      peerWealth?.runtimeState.currentCanonicalDerivedFactsExposeEffectivePeerWealthContactResolver,
    ).toBe(false);
    expect(peerWealth?.engineRuleAuthoringAuthorized).toBe(false);
  });

  it('matches the existing research-only wealth/pair resolver boundaries', () => {
    const evidence =
      buildRelationshipNatalGeneralRuntimeAdequacyEvidence();

    expect(evidence.peerWealthResearchBoundaryValid).toBe(true);
    expect(R050_AUTHORITY.presenceOnlyPolarityAuthorized).toBe(false);
    expect(R050_AUTHORITY.executableRelationResolverAuthorized).toBe(false);
    expect(R022_AUTHORITY.executableWealthPatternResolverAuthorized).toBe(false);
    expect(R022_EXECUTION_GAPS).toContain('CAI_QING_RELATIVE_LIGHTNESS');
    expect(R022_EXECUTION_GAPS).toContain('BI_ZHONG_RELATIVE_HEAVINESS');
    expect(R022_EXECUTION_GAPS).toContain('BODY_STRENGTH');
  });

  it('keeps all research closure and downstream authority closed', () => {
    const evidence =
      buildRelationshipNatalGeneralRuntimeAdequacyEvidence();

    expect(evidence.engineAuthorablePathCount).toBe(0);
    expect(evidence.findings).toEqual({
      outputExactMemberPredicateTechnicallyRepresentable: true,
      outputRelationshipSemanticAuthorityEstablished: false,
      peerWealthConditionalPatternRequiresMoreThanFamilyPresence: true,
      peerWealthRequiredContextFullyAvailableInCanonicalFacts: false,
      peerWealthExecutableResolverAuthorizedByExistingResearch: false,
      exactBodyPassageClosureComplete: false,
    });
    expect(evidence.researchClosure).toEqual({
      relationshipSpecificSourceSupportComplete: false,
      tenGodToRelationshipDomainMappingAuthorityComplete: false,
      scopeQualifiersCounterexamplesComplete: false,
      schoolDependenceBoundaryComplete: false,
      exactRuleRetainNarrowRemoveDecisionComplete: false,
    });
    expect(evidence.decision.bridgeReentryReady).toBe(false);
    expect(evidence.decision.engineAuthorityAdmissionReady).toBe(false);
    expect(evidence.decision.currentElevenRuleSurfaceMayBePromotedUnchanged).toBe(
      false,
    );
    expect(evidence.authorityBoundary.production).toBe('HOLD');
  });

  it('is deterministic', () => {
    const left =
      buildRelationshipNatalGeneralRuntimeAdequacyEvidence();
    const right =
      buildRelationshipNatalGeneralRuntimeAdequacyEvidence();

    expect(left).toEqual(right);
    expect(left.evidenceId).toBe(right.evidenceId);
    expect(left.evidenceId).toMatch(
      /^relationship_natal_general_runtime_adequacy_[a-f0-9]{24}$/,
    );
  });
});
