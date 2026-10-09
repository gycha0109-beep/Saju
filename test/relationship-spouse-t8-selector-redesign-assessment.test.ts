import { describe, expect, test } from 'vitest';
import { deterministicContentHash } from '../src/interpretation/rule-registry.js';
import {
  RELATIONSHIP_SPOUSE_T8_SELECTOR_REDESIGN_PATHS,
  buildRelationshipSpouseT8SelectorRedesignAssessment,
} from '../src/research/relationship-spouse-t8-selector-redesign-assessment.js';

const assessment = buildRelationshipSpouseT8SelectorRedesignAssessment();

function path(id: (typeof RELATIONSHIP_SPOUSE_T8_SELECTOR_REDESIGN_PATHS)[number]['pathId']) {
  const found = RELATIONSHIP_SPOUSE_T8_SELECTOR_REDESIGN_PATHS.find(
    (candidate) => candidate.pathId === id,
  );
  if (found === undefined) throw new Error(`Missing path ${id}`);
  return found;
}

describe('Relationship / Spouse T8 selector redesign assessment', () => {
  test('starts only after the current v1.1.0 Production provenance path is closed', () => {
    expect(assessment.upstreamCurrentSelectorVersion).toBe('1.1.0');
    expect(assessment.upstreamCurrentSelectorProductionPath).toBe(
      'CLOSED_WITH_PRODUCTION_HOLD',
    );
    expect(assessment.currentSelectorClosed).toBe(true);
  });

  test('evaluates exactly three mutually distinct redesign paths', () => {
    expect(RELATIONSHIP_SPOUSE_T8_SELECTOR_REDESIGN_PATHS).toHaveLength(3);
    expect(
      RELATIONSHIP_SPOUSE_T8_SELECTOR_REDESIGN_PATHS.map(
        (candidate) => candidate.pathId,
      ),
    ).toEqual([
      'TRADITIONAL_NATIVE_SEX_DEPENDENT_SPOUSE_STAR_FAMILY',
      'ROLE_NEUTRAL_DAY_BRANCH_SPOUSE_PALACE_POSITION',
      'MODERN_ROLE_BASED_CONTEXTUAL_SPOUSE_REMAP',
    ]);
  });

  test('keeps the traditional spouse-star family path out of the role-neutral default', () => {
    const traditional = path(
      'TRADITIONAL_NATIVE_SEX_DEPENDENT_SPOUSE_STAR_FAMILY',
    );

    expect(traditional.evidence.directSourceSupportEstablished).toBe(true);
    expect(traditional.inputContract.pureNatal).toBe(true);
    expect(traditional.inputContract.canonicalFactsAvailable).toBe(true);
    expect(traditional.inputContract.requiredCanonicalPaths).toEqual([
      'input.sexForTraditionalCalculation',
      'derivedFacts.tenGods',
    ]);
    expect(traditional.inputContract.requiresNativeSex).toBe(true);
    expect(traditional.inputContract.requiresPartnerSex).toBe(false);
    expect(
      traditional.productContract.compatibleWithRoleNeutralDefault,
    ).toBe(false);
    expect(
      traditional.provenanceOutlook.primaryFamilyLevelSupportExists,
    ).toBe(true);
    expect(traditional.provenanceOutlook.exactSubtypeSupportExists).toBe(false);
    expect(traditional.disposition).toBe('OPTIONAL_TRADITIONAL_MODE_ONLY');
    expect(assessment.observations.traditionalModeFeasible).toBe(true);
  });

  test('selects only the narrow Day-Branch spouse-palace position as Bridge re-entry research target', () => {
    const spousePalace = path(
      'ROLE_NEUTRAL_DAY_BRANCH_SPOUSE_PALACE_POSITION',
    );

    expect(spousePalace.evidence.directSourceSupportEstablished).toBe(true);
    expect(spousePalace.evidence.exactTargetSupportEstablished).toBe(true);
    expect(spousePalace.inputContract.pureNatal).toBe(true);
    expect(spousePalace.inputContract.canonicalFactsAvailable).toBe(true);
    expect(spousePalace.inputContract.requiredCanonicalPaths).toEqual([
      'pillars.day.branch',
    ]);
    expect(spousePalace.inputContract.requiresNativeSex).toBe(false);
    expect(spousePalace.inputContract.requiresPartnerSex).toBe(false);
    expect(spousePalace.inputContract.requiresRelationshipRole).toBe(false);
    expect(
      spousePalace.productContract.compatibleWithRoleNeutralDefault,
    ).toBe(true);
    expect(
      spousePalace.provenanceOutlook.productionProvenanceEstablishedNow,
    ).toBe(false);
    expect(
      spousePalace.provenanceOutlook.independentMultiSourceAcquisitionPlausible,
    ).toBe(true);
    expect(spousePalace.disposition).toBe(
      'BRIDGE_REENTRY_RESEARCH_CANDIDATE',
    );

    expect(
      assessment.observations.spousePalaceBridgeReentryResearchReady,
    ).toBe(true);
    expect(assessment.observations.selectedRedesignTarget).toBe(
      'ROLE_NEUTRAL_DAY_BRANCH_SPOUSE_PALACE_POSITION',
    );
    expect(
      assessment.observations.selectedTargetProductionProvenanceEstablished,
    ).toBe(false);
    expect(assessment.observations.selectedTargetRuntimeMaterialized).toBe(
      false,
    );
  });

  test('forbids spouse identity, personality, event, outcome, and compatibility expansion from the positional primitive', () => {
    const spousePalace = path(
      'ROLE_NEUTRAL_DAY_BRANCH_SPOUSE_PALACE_POSITION',
    );

    expect(spousePalace.productContract.forbiddenOutputScope).toEqual([
      'NO_SPOUSE_STAR_SELECTOR',
      'NO_PARTNER_IDENTITY_PERSONALITY_SEX_OR_ORIENTATION_INFERENCE',
      'NO_MARRIAGE_EXISTENCE_GUARANTEE_OR_TIMING',
      'NO_RELATIONSHIP_QUALITY_OR_OUTCOME_PREDICTION',
      'NO_FAVORABLE_UNFAVORABLE_SPOUSE_PALACE_JUDGMENT_WITHOUT_SEPARATE_AUTHORITY',
      'NO_YONGSIN_JISIN_OR_GUNGSEONG_SEMANTICS_IMPORT',
      'NO_SECOND_CHART_COMPATIBILITY',
    ]);
  });

  test('keeps Lee 2025 role-based remapping outside the pure natal capability', () => {
    const contextual = path(
      'MODERN_ROLE_BASED_CONTEXTUAL_SPOUSE_REMAP',
    );

    expect(contextual.evidence.directSourceSupportEstablished).toBe(true);
    expect(contextual.inputContract.pureNatal).toBe(false);
    expect(contextual.inputContract.canonicalFactsAvailable).toBe(false);
    expect(contextual.inputContract.requiresNativeSex).toBe(false);
    expect(contextual.inputContract.requiresPartnerSex).toBe(false);
    expect(contextual.inputContract.requiresRelationshipRole).toBe(true);
    expect(contextual.inputContract.requiresHouseholdEconomicRole).toBe(true);
    expect(contextual.inputContract.requiresSubjectIntent).toBe(true);
    expect(contextual.inputContract.requiresYongsinHeesinAuthority).toBe(true);
    expect(contextual.disposition).toBe(
      'CONTEXTUAL_INTERACTIVE_RESEARCH_ONLY',
    );
    expect(assessment.observations.contextualPathRequiresNewCapability).toBe(
      true,
    );
  });

  test('does not authorize Bridge re-entry or new runtime materialization yet', () => {
    expect(assessment.decision.assessmentComplete).toBe(true);
    expect(assessment.decision.bridgeReentryCandidateIdentified).toBe(true);
    expect(assessment.decision.bridgeReentryAuthorized).toBe(false);
    expect(assessment.decision.productionCandidateAuthorized).toBe(false);
    expect(assessment.decision.nextDisposition).toBe(
      'RUN_SA_5B_DAY_BRANCH_SPOUSE_PALACE_PROVENANCE_ACQUISITION',
    );

    expect(assessment.authorityBoundary).toEqual({
      currentSelectorReopened: false,
      sourceManifestMutationAuthorized: false,
      newRuleMaterializationAuthorized: false,
      provenanceQualityPromotionAuthorized: false,
      reviewerStatusPromotionAuthorized: false,
      humanDomainReviewEstablished: false,
      lifecycleMutationAuthorized: false,
      previewAuthorityAuthorized: false,
      officialReadingAuthorityAuthorized: false,
      productionAuthorityAuthorized: false,
      production: 'HOLD',
    });
  });

  test('preserves the current staging runtime unchanged', () => {
    expect(assessment.currentRuntimePreservation).toEqual({
      version: '1.1.0',
      methodologyStatus: 'reviewed',
      ruleStatuses: ['reviewed', 'reviewed'],
      provenanceQualities: ['unknown', 'unknown'],
      reviewerStatuses: ['unreviewed', 'unreviewed'],
      packStatus: 'staging',
    });
  });

  test('content-addresses the assessment deterministically', () => {
    const { assessmentId, ...material } = assessment;
    expect(assessmentId).toBe(deterministicContentHash(material));
    expect(assessmentId).toMatch(/^[a-f0-9]{64}$/);
  });
});
