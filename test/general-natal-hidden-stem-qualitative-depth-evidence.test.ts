import { describe, expect, it } from 'vitest';
import {
  R123_AUTHORITY,
  R123_EVIDENCE_DIMENSIONS,
  R123_HIDDEN_STEM_QUALITATIVE_DEPTH_VERSION,
  R123_QUALITATIVE_EVIDENCE_ROWS,
  R123_REJECTED_NORMALIZATIONS,
  R123_SUMMARY,
} from '../src/research/general-natal-hidden-stem-qualitative-depth-evidence.js';

describe('R123 hidden-stem qualitative evidence comparison', () => {
  it('publishes a non-numeric qualitative evidence matrix', () => {
    expect(R123_HIDDEN_STEM_QUALITATIVE_DEPTH_VERSION).toBe('0.1.0-research');
    expect(R123_QUALITATIVE_EVIDENCE_ROWS).toHaveLength(18);
    expect(R123_SUMMARY.evidenceRowCount).toBe(18);
    expect(R123_SUMMARY.dimensionCount).toBe(7);
    expect(R123_SUMMARY.numericWeightAuthorizedCount).toBe(0);
    expect(R123_SUMMARY.finalStrengthAuthorizedCount).toBe(0);
  });

  it('keeps canonical hidden-stem storage order explicitly non-semantic', () => {
    const row = R123_QUALITATIVE_EVIDENCE_ROWS.find(
      (item) => item.evidenceId === 'R123-E02-CANONICAL-STORAGE-ORDER-NONSEMANTIC',
    );

    expect(row).toMatchObject({
      evidenceType: 'STORAGE_ORDER_BOUNDARY',
      sourceNature: 'REPOSITORY_CANONICAL_SUBSTRATE',
      generalizability: 'BOUNDED_GENERAL',
      authorizesSemanticDepthRanking: false,
      authorizesAllBranchMapping: false,
      authorizesNumericWeight: false,
    });
    expect(row?.prohibitedExtensions).toContain(
      'ARRAY_INDEX_ZERO_EQUALS_PRIMARY_HIDDEN_STEM',
    );
    expect(
      R123_QUALITATIVE_EVIDENCE_ROWS.every(
        (item) => item.authorizesSemanticDepthRanking === false,
      ),
    ).toBe(true);
    expect(R123_REJECTED_NORMALIZATIONS).toContain(
      'HIDDEN_STEM_ARRAY_ORDER_EQUALS_SEMANTIC_RANK',
    );
  });

  it('preserves exact Yin primary-role evidence without generalizing 本主 into generic 本氣 mapping', () => {
    const row = R123_QUALITATIVE_EVIDENCE_ROWS.find(
      (item) => item.evidenceId === 'R123-E03-YIN-JIA-PRIMARY-ROLE',
    );

    expect(row).toMatchObject({
      evidenceType: 'EXACT_PRIMARY_ROLE',
      sourceNature: 'BASE_TEXT',
      generalizability: 'EXACT_EXAMPLE_ONLY',
      authorizesQualitativeRoleDifferentiation: true,
      authorizesSemanticDepthRanking: false,
      authorizesAllBranchMapping: false,
      authorizesNumericWeight: false,
    });
    expect(row?.prohibitedExtensions).toContain(
      'BENZHU_EQUALS_GENERIC_BENQI_LABEL',
    );
    expect(R123_REJECTED_NORMALIZATIONS).toContain(
      'BENZHU_EQUALS_GENERIC_BENQI_MAPPING',
    );
  });

  it('preserves exact Yin transparency substitution as role change rather than a universal selector', () => {
    const row = R123_QUALITATIVE_EVIDENCE_ROWS.find(
      (item) => item.evidenceId === 'R123-E04-YIN-BING-TRANSPARENCY-SUBSTITUTION',
    );

    expect(row).toMatchObject({
      evidenceType: 'TRANSPARENCY_SUBSTITUTION',
      generalizability: 'EXACT_EXAMPLE_ONLY',
      authorizesAllBranchMapping: false,
      authorizesNumericWeight: false,
    });
    expect(row?.prohibitedExtensions).toContain(
      'ONE_YIN_EXAMPLE_EQUALS_GENERAL_SELECTOR',
    );
  });

  it('keeps all-branch primary and main-secondary-residual mappings unresolved', () => {
    const primary = R123_QUALITATIVE_EVIDENCE_ROWS.find(
      (item) =>
        item.evidenceId === 'R123-E06-ALL-BRANCH-PRIMARY-MAPPING-UNRESOLVED',
    );
    const threeLevel = R123_QUALITATIVE_EVIDENCE_ROWS.find(
      (item) =>
        item.evidenceId === 'R123-E07-MAIN-SECONDARY-RESIDUAL-MAPPING-UNRESOLVED',
    );

    expect(primary).toMatchObject({
      evidenceType: 'GENERALIZATION_GAP',
      generalizability: 'UNRESOLVED',
      authorizesAllBranchMapping: false,
    });
    expect(threeLevel).toMatchObject({
      evidenceType: 'GENERALIZATION_GAP',
      generalizability: 'UNRESOLVED',
      authorizesSemanticDepthRanking: false,
      authorizesAllBranchMapping: false,
    });
    expect(threeLevel?.prohibitedExtensions).toContain(
      'AUTO_LABEL_ALL_HIDDEN_STEMS_BENQI_ZHONGQI_YUQI',
    );
  });

  it('separates temporal command observations from static hidden-stem depth', () => {
    const timing = R123_QUALITATIVE_EVIDENCE_ROWS.find(
      (item) => item.evidenceId === 'R123-E08-REN-YUAN-COMMAND-TIMING-OBSERVED',
    );
    const antiRigid = R123_QUALITATIVE_EVIDENCE_ROWS.find(
      (item) => item.evidenceId === 'R123-E09-REN-YUAN-ANTI-RIGIDITY-WARNING',
    );

    expect(timing).toMatchObject({
      evidenceType: 'TEMPORAL_COMMAND_OBSERVATION',
      sourceNature: 'LATER_COMMENTARY',
      authorizesNumericWeight: false,
    });
    expect(antiRigid?.prohibitedExtensions).toContain(
      'COMMAND_DAY_TABLE_EQUALS_EXACT_RUNTIME_WEIGHT_CURVE',
    );
    expect(R123_REJECTED_NORMALIZATIONS).toContain(
      'COMMAND_DAY_DURATION_EQUALS_STRENGTH_WEIGHT',
    );
  });

  it('preserves Yuqi temporal variability without converting it to a scalar depth score', () => {
    const row = R123_QUALITATIVE_EVIDENCE_ROWS.find(
      (item) => item.evidenceId === 'R123-E10-YUQI-TEMPORAL-VARIABILITY',
    );

    expect(row).toMatchObject({
      evidenceType: 'TEMPORAL_VARIABILITY',
      generalizability: 'EXACT_EXAMPLE_ONLY',
      authorizesNumericWeight: false,
    });
    expect(row?.prohibitedExtensions).toContain(
      'YUQI_EQUALS_STATIC_DEPTH_SCORE',
    );
  });

  it('keeps an exact Chen 本氣/餘氣 commentary example bounded to that context', () => {
    const row = R123_QUALITATIVE_EVIDENCE_ROWS.find(
      (item) =>
        item.evidenceId === 'R123-E11-CHEN-BENQI-YUQI-EXACT-COMMENTARY',
    );

    expect(row).toMatchObject({
      sourceNature: 'LATER_COMMENTARY',
      generalizability: 'EXACT_EXAMPLE_ONLY',
      authorizesQualitativeRoleDifferentiation: true,
      authorizesSemanticDepthRanking: false,
      authorizesAllBranchMapping: false,
      authorizesNumericWeight: false,
    });
    expect(row?.prohibitedExtensions).toContain(
      'ONE_CHEN_EXAMPLE_EQUALS_ALL_BRANCH_BENQI_YUQI_TABLE',
    );
  });

  it('keeps qualitative root-class heavy/light language separate from hidden-stem depth', () => {
    const row = R123_QUALITATIVE_EVIDENCE_ROWS.find(
      (item) =>
        item.evidenceId === 'R123-E12-HEAVY-LIGHT-ROOT-CLASS-NOT-HIDDEN-DEPTH',
    );

    expect(row).toMatchObject({
      evidenceType: 'QUALITATIVE_ROOT_CLASS_LANGUAGE',
      authorizesSemanticDepthRanking: false,
      authorizesNumericWeight: false,
    });
    expect(row?.prohibitedExtensions).toContain(
      'ROOT_CLASS_HEAVY_LIGHT_EQUALS_HIDDEN_STEM_DEPTH',
    );
    expect(R123_REJECTED_NORMALIZATIONS).toContain(
      'ROOT_CLASS_HEAVY_LIGHT_EQUALS_HIDDEN_DEPTH',
    );
  });

  it('keeps membership distinct from interaction activation', () => {
    const membership = R123_QUALITATIVE_EVIDENCE_ROWS.find(
      (item) =>
        item.evidenceId === 'R123-E13-HIDDEN-MEMBERSHIP-NOT-ACTIVATION',
    );
    const clash = R123_QUALITATIVE_EVIDENCE_ROWS.find(
      (item) => item.evidenceId === 'R123-E14-CLASH-NOT-UNIVERSAL-EXPOSURE',
    );
    const meeting = R123_QUALITATIVE_EVIDENCE_ROWS.find(
      (item) =>
        item.evidenceId === 'R123-E15-MEETING-NOT-EACH-HIDDEN-STEM-ACTIVATION',
    );

    expect(membership?.evidenceType).toBe('INTERACTION_BOUNDARY');
    expect(clash?.prohibitedExtensions).toContain(
      'CLASH_REVEALS_ALL_HIDDEN_STEMS',
    );
    expect(meeting?.prohibitedExtensions).toContain(
      'MEETING_ACTIVATES_EACH_HIDDEN_STEM_INDEPENDENTLY',
    );
  });

  it('rejects numeric hidden-depth models and final strength promotion', () => {
    const numeric = R123_QUALITATIVE_EVIDENCE_ROWS.find(
      (item) =>
        item.evidenceId === 'R123-E16-NUMERIC-HIDDEN-DEPTH-MODEL-UNSUPPORTED',
    );
    const finalStrength = R123_QUALITATIVE_EVIDENCE_ROWS.find(
      (item) =>
        item.evidenceId === 'R123-E18-QUALITATIVE-EVIDENCE-NOT-FINAL-STRENGTH',
    );

    expect(numeric).toMatchObject({
      generalizability: 'NOT_GENERALIZABLE',
      authorizesNumericWeight: false,
      authorizesFinalStrength: false,
    });
    expect(finalStrength).toMatchObject({
      generalizability: 'NOT_GENERALIZABLE',
      authorizesFinalStrength: false,
    });
    expect(R123_REJECTED_NORMALIZATIONS).toContain(
      'QUALITATIVE_DEPTH_EQUALS_NUMERIC_WEIGHT',
    );
    expect(R123_REJECTED_NORMALIZATIONS).toContain(
      'QUALITATIVE_DEPTH_EQUALS_FINAL_STRENGTH',
    );
  });

  it('covers all intended qualitative evidence dimensions', () => {
    expect(R123_EVIDENCE_DIMENSIONS).toEqual([
      'MEMBERSHIP',
      'EXACT_ROLE',
      'TRANSPARENCY',
      'TEMPORAL_COMMAND',
      'TEMPORAL_VARIABILITY',
      'ROOT_CLASS_QUALITATIVE_LANGUAGE',
      'INTERACTION_STATE',
    ]);
  });

  it('preserves the research-only authority boundary', () => {
    expect(R123_AUTHORITY).toEqual({
      status: 'RESEARCH_QUALITATIVE_EVIDENCE_COMPARISON_COMPLETE',
      researchOnly: true,
      hiddenStemMembershipAuthorized: true,
      canonicalStorageOrderSemanticRankAuthorized: false,
      exactYinJiaPrimaryRoleObserved: true,
      exactYinBingTransparencySubstitutionObserved: true,
      exactYinEvidenceGeneralizedBeyondYin: false,
      allBranchPrimaryHiddenStemMappingAuthorized: false,
      mainSecondaryResidualMappingAuthorized: false,
      renYuanTimingObserved: true,
      renYuanTimingRigidRuntimeAuthorized: false,
      yuqiTemporalVariabilityObserved: true,
      rootClassHeavyLightObserved: true,
      rootClassHeavyLightEqualsHiddenDepth: false,
      genericInteractionActivationAuthorized: false,
      hiddenStemDepthNumericWeightsAuthorized: false,
      generalizedHiddenStemSelectorAuthorized: false,
      finalQiangRuoClassifierAuthorized: false,
      finalWangShuaiClassifierAuthorized: false,
      gyeokgukCandidateDerivationAuthorized: false,
      automaticAuthorityAdmissionAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
