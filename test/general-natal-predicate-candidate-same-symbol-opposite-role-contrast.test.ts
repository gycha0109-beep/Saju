import { describe, expect, it } from 'vitest';

import {
  R172_AUTHORITY,
  R172_CONFIGURATION_DIMENSIONS,
  R172_GOVERNANCE,
  R172_JIA_CONTRAST_CASES,
  R172_REJECTED_SHORTCUTS,
  R172_SAME_SYMBOL_OPPOSITE_ROLE_CONTRAST_VERSION,
  R172_SAME_SYMBOL_ROLE_CONTRAST,
  R172_SUMMARY,
  R172_UPSTREAM_BINDINGS,
} from '../src/research/general-natal-predicate-candidate-same-symbol-opposite-role-contrast.js';

describe('R172 same-symbol opposite-role configuration contrast', () => {
  it('compares the same Jia symbol across two source-linked configurations', () => {
    expect(R172_SAME_SYMBOL_OPPOSITE_ROLE_CONTRAST_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R172_JIA_CONTRAST_CASES).toHaveLength(2);
    expect(R172_JIA_CONTRAST_CASES.map((item) => item.roleClass)).toEqual([
      'FORMATION_OPPOSITION',
      'OFFICER_PROTECTION',
    ]);
    expect(R172_SUMMARY).toEqual({
      caseCount: 2,
      roleClassCount: 2,
      configurationDimensionCount: 6,
      standaloneJiaPredicateAuthorizedCount: 0,
      semanticPredicateEstablishedCount: 0,
    });
  });

  it('preserves the negative Jia context as a configuration-specific source case', () => {
    expect(R172_JIA_CONTRAST_CASES[0]).toMatchObject({
      dayStem: '壬',
      monthBranch: '午',
      luckSurface: '運透己官',
      originalTextSurface: '壬生午月，運透己官，而本命有甲乙之類是也',
      commentarySurface: '原局透甲，則官星被回剋而無用',
      jiaExplicitInOriginalSurface: true,
      reportedRoleSurface: '甲回剋運中所透官星',
      standaloneJiaPredicateAuthorized: false,
      exactConfigurationPredicateEstablished: false,
    });
  });

  it('preserves the protective Jia context without turning it into global rescue', () => {
    expect(R172_JIA_CONTRAST_CASES[1]).toMatchObject({
      dayStem: '丁',
      monthBranch: '辰',
      luckSurface: '透壬用官 / 逢戊',
      originalTextSurface: '丁生辰月，透壬用官，逢戊而命有甲',
      commentarySurface: '丁生辰月，壬甲並透，月印護官，不畏傷官之運',
      jiaExplicitInOriginalSurface: true,
      reportedRoleSurface: '甲印護官',
      standaloneJiaPredicateAuthorized: false,
      exactConfigurationPredicateEstablished: false,
    });
  });

  it('contradicts both unconditional rescue and unconditional harm predicates for Jia', () => {
    expect(R172_SAME_SYMBOL_ROLE_CONTRAST).toEqual({
      candidateSurface: '命有甲',
      comparedSymbol: '甲',
      comparedCaseCount: 2,
      distinctRoleClassCount: 2,
      sameRoleAcrossComparedContexts: false,
      configurationDependenceObserved: true,
      unconditionalJiaRescuePredicateContradicted: true,
      unconditionalJiaHarmPredicateContradicted: true,
      standalonePresencePredicateSufficient: false,
      exactConfigurationTuplePredicateEstablished: false,
      exactMinimalPredicateSetEstablished: false,
      boundedOutcomeSufficiencyEstablished: false,
    });
  });

  it('records the configuration dimensions that must remain visible in follow-up study', () => {
    expect(R172_CONFIGURATION_DIMENSIONS).toEqual([
      'DAY_STEM',
      'MONTH_BRANCH',
      'NATAL_TRANSPARENT_STEMS',
      'TARGET_STRUCTURE',
      'LUCK_TRIGGER_SURFACE',
      'ROLE_RELATION_TO_TARGET',
    ]);
  });

  it('preserves upstream research and source-layer boundaries', () => {
    expect(R172_GOVERNANCE).toEqual({
      upstreamJiaCandidateBound: true,
      upstreamSemanticPredicateStillClosed: true,
      originalTextLayerJiaWitnessAlreadyBound: true,
      sourceLayerDistinctionPreserved: true,
      commentaryDistinctFromProductionAuthority: true,
      configurationContrastDistinctFromMinimality: true,
      configurationContrastDistinctFromSufficiency: true,
    });
    expect(R172_UPSTREAM_BINDINGS.r165.semanticPredicateEstablished).toBe(false);
    expect(R172_UPSTREAM_BINDINGS.r168).toMatchObject({
      originalTextLayerJiaWitnessBound: true,
      sourceLayerDistinctionEstablished: true,
    });
  });

  it('rejects symbol-only, completeness, and execution shortcuts', () => {
    expect(R172_REJECTED_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'JIA_PRESENT_ALWAYS_RESCUES',
        'JIA_PRESENT_ALWAYS_HARMS',
        'MING_YOU_JIA_EQUALS_GLOBAL_RESCUE_PREDICATE',
        'OPPOSITE_ROLE_CONTRAST_EQUALS_EXACT_CONTEXT_PREDICATE',
        'ONE_CONTRAST_PAIR_EQUALS_COMPLETE_CONFIGURATION_SPACE',
        'CONFIGURATION_DIMENSION_LIST_EQUALS_MINIMAL_PREDICATE_SET',
        'ROLE_CONTRAST_AS_EXECUTABLE_RESOLVER',
      ]),
    );
  });

  it('keeps semantic, execution, claim, and production authority closed', () => {
    expect(R172_AUTHORITY).toMatchObject({
      researchOnly: true,
      sameJiaSymbolComparedAcrossTwoConfigurations: true,
      oppositeReportedRoleObserved: true,
      configurationDependenceObserved: true,
      unconditionalJiaRescuePredicateContradicted: true,
      unconditionalJiaHarmPredicateContradicted: true,
      standaloneJiaPredicateAuthorized: false,
      exactConfigurationTuplePredicateEstablished: false,
      exactMinimalPredicateSetEstablished: false,
      matchingSufficiencyEstablished: false,
      outcomeSufficiencyEstablished: false,
      settlementEstablished: false,
      executableResolverAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
