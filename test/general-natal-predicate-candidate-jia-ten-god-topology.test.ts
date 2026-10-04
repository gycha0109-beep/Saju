import { describe, expect, it } from 'vitest';

import {
  R176_AUTHORITY,
  R176_GOVERNANCE,
  R176_JIA_RELATION_ROWS,
  R176_JIA_TEN_GOD_TOPOLOGY_VERSION,
  R176_RELATION_TOPOLOGY_BOUNDARY,
  R176_REJECTED_SHORTCUTS,
  R176_REQUIRED_FOLLOW_UP,
  R176_SUMMARY,
  R176_TOPOLOGY_AUDIT,
  R176_UPSTREAM_BINDINGS,
  R176_UPSTREAM_TEN_GOD_SOURCE,
} from '../src/research/general-natal-predicate-candidate-jia-ten-god-topology.js';

describe('R176 Jia day-master-relative Ten-God topology', () => {
  it('binds research rows to the current calculation engine and inspected upstream function', () => {
    expect(R176_JIA_TEN_GOD_TOPOLOGY_VERSION).toBe('0.1.0-research');
    expect(R176_UPSTREAM_TEN_GOD_SOURCE).toMatchObject({
      localAdapterEngineName: 'manseryeok',
      localAdapterEngineVersion: '2.0.0',
      upstreamRepository: 'https://github.com/yhj1024/manseryeok',
      inspectedCommit: 'fba3253d7305b8b61189bd78318a7a27ed8c9b09',
      inspectedPath: 'src/features/ten-gods.ts',
      algorithmFunction: 'getTenGod',
      dayMasterRelativeCalculation: true,
    });
  });

  it('computes Ren-to-Jia as Food God and the luck Ji as Proper Officer', () => {
    expect(R176_JIA_RELATION_ROWS[0]).toMatchObject({
      dayMaster: '임',
      dayMasterHanja: '壬',
      dayMasterElement: '수',
      dayMasterYinYang: '양',
      jiaStem: '갑',
      jiaHanja: '甲',
      jiaElement: '목',
      jiaYinYang: '양',
      jiaTenGod: '식신',
      relatedLuckStem: '기',
      relatedLuckStemHanja: '己',
      relatedLuckTenGod: '정관',
      roleTopology: 'JIA_DIRECTLY_CONTROLS_OFFICER',
      sourceRoleClass: 'FORMATION_OPPOSITION',
      tenGodRelationObserved: true,
      fiveElementRelationObserved: true,
      causalSufficiencyEstablished: false,
    });
  });

  it('computes Ding-to-Jia as Proper Resource and the Wu/Ren roles as Hurting Officer/Proper Officer', () => {
    expect(R176_JIA_RELATION_ROWS[1]).toMatchObject({
      dayMaster: '정',
      dayMasterHanja: '丁',
      dayMasterElement: '화',
      dayMasterYinYang: '음',
      jiaStem: '갑',
      jiaHanja: '甲',
      jiaElement: '목',
      jiaYinYang: '양',
      jiaTenGod: '정인',
      harmfulLuckStem: '무',
      harmfulLuckStemHanja: '戊',
      harmfulLuckTenGod: '상관',
      protectedOfficerStem: '임',
      protectedOfficerStemHanja: '壬',
      protectedOfficerTenGod: '정관',
      roleTopology: 'JIA_CONTROLS_HURT_OFFICER',
      sourceRoleClass: 'OFFICER_PROTECTION',
      tenGodRelationObserved: true,
      fiveElementRelationObserved: true,
      causalSufficiencyEstablished: false,
    });
  });

  it('establishes day-master-relative Ten-God differentiation without outcome sufficiency', () => {
    expect(R176_TOPOLOGY_AUDIT).toEqual({
      sameComparedStem: '甲',
      comparedCaseCount: 2,
      observedJiaTenGods: ['식신', '정인'],
      distinctJiaTenGodCount: 2,
      sameSymbolDifferentDayMasterTenGodObserved: true,
      negativeCaseJiaTenGodIsFoodGod: true,
      protectiveCaseJiaTenGodIsProperResource: true,
      negativeCaseLuckOfficerIsProperOfficer: true,
      protectiveCaseHarmfulLuckIsHurtingOfficer: true,
      protectiveCaseProtectedStemIsProperOfficer: true,
      tenGodDifferenceConsistentWithOppositeRoleObservation: true,
      tenGodDifferenceEstablishesOutcomeSufficiency: false,
      relationTopologyEstablishesSettlement: false,
    });
  });

  it('keeps topology separate from strength and settlement semantics', () => {
    expect(R176_RELATION_TOPOLOGY_BOUNDARY).toEqual({
      tenGodIdentityIsDayMasterRelative: true,
      sameHeavenlyStemDoesNotImplySameTenGodAcrossDayMasters: true,
      elementControlEdgeDoesNotEncodeStrength: true,
      elementControlEdgeDoesNotEncodeTransparency: true,
      elementControlEdgeDoesNotEncodeRooting: true,
      elementControlEdgeDoesNotEncodeCombinationOrClashResolution: true,
      topologyDoesNotEncodeLuckDurationOrTiming: true,
      topologyDoesNotEstablishFinalFormationOutcome: true,
    });
  });

  it('keeps the next evidence frontier explicit', () => {
    expect(R176_REQUIRED_FOLLOW_UP).toEqual([
      'STRENGTH_AND_ROOTING_REQUIREMENTS_FOR_JIA_ROLE',
      'TRANSPARENCY_REQUIREMENTS_FOR_JIA_ROLE',
      'COMBINATION_INTERFERENCE_ON_JIA_TARGET_EDGE',
      'LUCK_TRIGGER_ACTIVATION_SCOPE',
      'COUNTEREXAMPLES_WITH_SAME_TEN_GOD_BUT_DIFFERENT_OUTCOME',
    ]);
    expect(R176_SUMMARY).toEqual({
      caseCount: 2,
      distinctJiaTenGodCount: 2,
      roleTopologyCount: 2,
      causalSufficiencyEstablishedCount: 0,
      settlementEstablishedCount: 0,
      requiredFollowUpCount: 5,
    });
  });

  it('preserves the R172 authority boundary and calculation provenance', () => {
    expect(R176_GOVERNANCE).toEqual({
      upstreamOppositeRoleObserved: true,
      upstreamConfigurationDependenceObserved: true,
      upstreamStandaloneJiaPredicateStillClosed: true,
      actualPinnedTenGodFunctionUsedForResearchRows: true,
      calculationFactDistinctFromResearchCausalInterpretation: true,
      topologyDistinctFromOutcomeSufficiency: true,
      topologyDistinctFromSettlement: true,
    });
    expect(R176_UPSTREAM_BINDINGS).toMatchObject({
      r172: {
        configurationDependenceObserved: true,
        standaloneJiaPredicateAuthorized: false,
      },
      calculation: {
        engineName: 'manseryeok',
        engineVersion: '2.0.0',
      },
    });
  });

  it('rejects Ten-God identity and topology shortcuts', () => {
    expect(R176_REJECTED_SHORTCUTS).toEqual(
      expect.arrayContaining([
        'SAME_JIA_EQUALS_SAME_TEN_GOD',
        'FOOD_GOD_JIA_ALWAYS_HARMS_OFFICER',
        'PROPER_RESOURCE_JIA_ALWAYS_PROTECTS_OFFICER',
        'WOOD_CONTROLS_EARTH_EQUALS_AUTOMATIC_SETTLEMENT',
        'TEN_GOD_IDENTITY_EQUALS_CAUSAL_SUFFICIENCY',
        'RELATION_TOPOLOGY_EQUALS_STRENGTH_MODEL',
        'RELATION_TOPOLOGY_EQUALS_EXECUTABLE_RESOLVER',
      ]),
    );
  });

  it('keeps semantic, execution, claim, and production authority closed', () => {
    expect(R176_AUTHORITY).toMatchObject({
      researchOnly: true,
      sameJiaDifferentTenGodAcrossDayMastersEstablished: true,
      renJiaFoodGodRelationEstablished: true,
      dingJiaProperResourceRelationEstablished: true,
      negativeCaseDirectOfficerControlTopologyObserved: true,
      protectiveCaseHurtOfficerControlTopologyObserved: true,
      topologyConsistentWithSourceRoleContrast: true,
      exactConfigurationTuplePredicateEstablished: false,
      exactMinimalPredicateSetEstablished: false,
      causalSufficiencyEstablished: false,
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
