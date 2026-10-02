import { describe, expect, test } from 'vitest';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION,
} from '../src/research/relationship-spouse-t8-day-branch-palace-claim-contract-candidate.js';
import {
  buildRelationshipSpouseT8DayBranchPalaceProjectGovernedMaterialityDecision,
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROHIBITED_NARRATIVE_EXTENSIONS,
} from '../src/research/relationship-spouse-t8-day-branch-palace-project-governed-materiality-decision.js';
import {
  RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE,
} from '../src/research/relationship-spouse-t8-day-branch-palace-staging-lifecycle-materialization.js';

const TEST_TIMEOUT_MS = 20_000;

describe('Relationship / Spouse T8 Day-Branch spouse-palace project-governed SA-5L materiality decision', () => {
  test('establishes the internal project materiality decision', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceProjectGovernedMaterialityDecision();

    expect(result.blockers).toEqual([]);
    expect(result.projectGovernedMaterialityDecisionEstablished).toBe(true);
    expect(result.governanceMode).toBe('PROJECT_INTERNAL_GOVERNANCE');
    expect(result.decision).toBe(
      'APPROVE_POSITION_ONLY_NARRATIVE_MATERIALITY_BY_PROJECT_GOVERNANCE',
    );
    expect(result.nextDisposition).toBe(
      'RUN_SA_5M_PROJECT_GOVERNED_NARRATIVE_MATERIALIZATION',
    );
  }, TEST_TIMEOUT_MS);

  test('freezes only the exact position-only narrative meaning', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceProjectGovernedMaterialityDecision();

    expect(result.semanticScope).toBe('position_only');
    expect(result.allowedNarrativeProposition).toEqual({
      position: 'day_branch',
      traditionalRole: 'spouse_palace',
      semanticScope: 'position_only',
    });
    expect(result.prohibitedExtensions).toEqual(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_PROHIBITED_NARRATIVE_EXTENSIONS,
    );
    expect(result.prohibitedExtensions).toEqual([
      'spouse_star_selection',
      'partner_personality',
      'partner_identity',
      'marriage_timing',
      'marriage_outcome',
      'relationship_outcome',
      'favorable_unfavorable_palace_judgment',
      'yongshin_jisin_semantics',
      'second_chart_compatibility',
      'sex_scoped_spouse_role_expansion',
    ]);
  }, TEST_TIMEOUT_MS);

  test('targets internal review status and narrative materiality for the next gate without applying them here', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceProjectGovernedMaterialityDecision();

    expect(result.targetMutationForNextGate).toEqual({
      materialForNarrative: true,
      reviewerStatus: 'internal_reviewed',
      preserveProvenanceQuality: 'multi_source_supported',
      preserveMethodologyLifecycle: 'reviewed',
      preserveRuleLifecycle: 'reviewed',
      preservePackLifecycle: 'staging',
    });

    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_STAGING_RULE.quality
        .reviewerStatus,
    ).toBe('unreviewed');
    expect(
      RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_CLAIM_TYPE_DEFINITION
        .materialForNarrative,
    ).toBe(false);

    expect(result.authorityBoundary.materialForNarrativeMutationApplied).toBe(
      false,
    );
    expect(result.authorityBoundary.reviewerStatusPromotionApplied).toBe(false);
  }, TEST_TIMEOUT_MS);

  test('does not grant runtime, delivery, preview, official, public, or production authority', async () => {
    const result =
      await buildRelationshipSpouseT8DayBranchPalaceProjectGovernedMaterialityDecision();

    expect(result.authorityBoundary).toEqual({
      projectGovernedMaterialityDecisionEstablished: true,
      materialForNarrativeMutationApplied: false,
      reviewerStatusPromotionApplied: false,
      narrativeProfileAuthorityEstablished: false,
      narrativeGenerationAuthorized: false,
      artifactAssemblyAuthorized: false,
      deliveryAuthorityAuthorized: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      publicSemanticAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      production: 'HOLD',
    });
  }, TEST_TIMEOUT_MS);

  test('is deterministic for the unchanged project-governed boundary', async () => {
    const first =
      await buildRelationshipSpouseT8DayBranchPalaceProjectGovernedMaterialityDecision();
    const second =
      await buildRelationshipSpouseT8DayBranchPalaceProjectGovernedMaterialityDecision();

    expect(first).toEqual(second);
    expect(first.decisionId).toBe(second.decisionId);
    expect(first.decisionId).toMatch(/^[a-f0-9]{64}$/u);
  }, TEST_TIMEOUT_MS);
});
