import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_CONTROL_IDS,
  RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS,
  buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview,
} from '../src/research/relationship-spouse-t8-authority-acquisition-readiness-review.js';

describe('Relationship spouse T8 authority acquisition readiness', () => {
  test('accepts the exact broad relationship research boundary without relabeling it as spouse authority', () => {
    const report = buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview();

    expect(report.reviewVersion).toBe(
      RELATIONSHIP_SPOUSE_T8_AUTHORITY_ACQUISITION_READINESS_REVIEW_VERSION,
    );
    expect(report.status).toBe(
      'RESOLVED_RELATIONSHIP_SPOUSE_T8_AUTHORITY_ACQUISITION_READINESS_REVIEW',
    );
    expect(report.decision).toBe(
      'FIVE_SPOUSE_T8_AUTHORITY_REQUIREMENTS_FROZEN_ZERO_SATISFIED_NO_SPOUSE_SEMANTICS_AUTHORIZED',
    );
    expect(report.broadRelationshipBoundaryAccepted).toBe(true);
    expect(report.broadRelationshipRuleCount).toBeGreaterThan(0);
    expect(report.broadRelationshipMayBeReusedAsSpouseAuthority).toBe(false);
    expect(report.broadRelationshipAuthorityInsufficientForSpouse).toBe(true);
    expect(report.spouseAuthorityAdmittedByThisGate).toBe(false);
    expect(report.spouseAuthorityGapClosedByThisGate).toBe(false);
  });

  test('freezes five mandatory unsatisfied spouse-specific authority requirements', () => {
    const report = buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview();

    expect(report.requirements).toEqual(RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS);
    expect(report.requirementCount).toBe(5);
    expect(report.allRequirementsMandatory).toBe(true);
    expect(report.allRequirementsCurrentlyUnsatisfied).toBe(true);
    expect(report.broadRelationshipAuthorityInsufficientForSpouse).toBe(true);
    expect(new Set(report.requirements.map((item) => item.gapId)).size).toBe(5);
  });

  test('requires exact source provenance spouse binding applicability and contextual limits', () => {
    const report = buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview();

    expect(report.sourceIdentityRequired).toBe(true);
    expect(report.exactLocatorRequired).toBe(true);
    expect(report.originalOrVerifiedSourceContextRequired).toBe(true);
    expect(report.explicitSpouseSemanticBindingRequired).toBe(true);
    expect(report.applicabilityBoundaryRequired).toBe(true);

    for (const requirement of report.requirements) {
      expect(requirement.exactSourceIdentityRequired).toBe(true);
      expect(requirement.exactLocatorRequired).toBe(true);
      expect(requirement.originalOrVerifiedSourceContextRequired).toBe(true);
      expect(requirement.explicitSpouseSemanticBindingRequired).toBe(true);
      expect(requirement.explicitApplicabilityBoundaryRequired).toBe(true);
      expect(requirement.explicitContextOrExceptionTreatmentRequired).toBe(true);
      expect(requirement.currentlySatisfied).toBe(false);
    }
  });

  test('forbids broad relationship reuse prototype projection general knowledge snippets model synthesis and compatibility laundering', () => {
    const report = buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview();

    for (const requirement of report.requirements) {
      expect(requirement.mayBeSatisfiedByBroadRelationshipClaimReuse).toBe(false);
      expect(requirement.mayBeSatisfiedByDayBranchSpouseProjectionAlone).toBe(false);
      expect(requirement.mayBeSatisfiedByGeneralKnowledge).toBe(false);
      expect(requirement.mayBeSatisfiedBySearchSnippet).toBe(false);
      expect(requirement.mayBeSatisfiedByModelSynthesis).toBe(false);
      expect(requirement.mayBeSatisfiedByCompatibilityAuthority).toBe(false);
    }
  });

  test('keeps partner attributes relationship outcomes timing and compatibility outside this gate', () => {
    const scopeRequirement = RELATIONSHIP_SPOUSE_T8_AUTHORITY_REQUIREMENTS.find(
      (item) => item.gapId === 'SPOUSE_SCOPE_LIMITS_AND_EXCEPTIONS_MISSING',
    );
    expect(scopeRequirement).toBeDefined();
    expect(scopeRequirement?.requiredAuthorityAssertions.join(' ')).toContain('Marriage outcome');
    expect(scopeRequirement?.requiredAuthorityAssertions.join(' ')).toContain('future relationship timing');
    expect(scopeRequirement?.requiredAuthorityAssertions.join(' ')).toContain('T10 compatibility authority');
  });

  test('authorizes no spouse T8 rule claim pack narrative preview compatibility or production effect', () => {
    const report = buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview();

    expect(report.dayBranchSpouseProjectionAuthorized).toBe(false);
    expect(report.tenGodSpouseRoleMappingAuthorized).toBe(false);
    expect(report.spouseT8RuleAuthoringAuthorized).toBe(false);
    expect(report.spouseT8ClaimTypeCreationAuthorized).toBe(false);
    expect(report.spouseInterpretationPackCreationAuthorized).toBe(false);
    expect(report.consumerNarrativeAuthorized).toBe(false);
    expect(report.compatibilityAuthorityAuthorized).toBe(false);
    expect(report.previewDefaultSwitchAuthorized).toBe(false);
    expect(report.productionPromotionAuthorized).toBe(false);
    expect(report.implementationEffects).toEqual({
      methodologyDefinitionsCreated: 0,
      ruleDefinitionsCreated: 0,
      claimTypesCreated: 0,
      registrySnapshotsCreated: 0,
      interpretationPacksCreated: 0,
      narrativePlansCreated: 0,
      previewRoutesChanged: 0,
    });
  });

  test('freezes controls and routes only to governed candidate discovery readiness', () => {
    const report = buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview();

    expect(report.controlIds).toEqual(RELATIONSHIP_SPOUSE_T8_AUTHORITY_CONTROL_IDS);
    expect(report.controlCount).toBe(12);
    expect(report.controlsFrozen).toBe(true);
    expect(report.recommendedNextGate).toBe(
      'RELATIONSHIP_SPOUSE_T8_AUTHORITY_CANDIDATE_DISCOVERY_READINESS_REVIEW',
    );
  });

  test('review identity is deterministic and content-addressed', () => {
    const first = buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview();
    const second = buildRelationshipSpouseT8AuthorityAcquisitionReadinessReview();

    expect(first).toEqual(second);
    const { reviewId, ...material } = first;
    expect(reviewId).toBe(
      `relationship_spouse_t8_authority_readiness_${deterministicContentHash(material).slice(0, 24)}`,
    );
  });
});
