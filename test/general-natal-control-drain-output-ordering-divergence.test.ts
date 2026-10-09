import { describe, expect, it } from 'vitest';
import {
  R126_AUTHORITY,
  R126_COMPARISON_GROUPS,
  R126_CONTROL_DRAIN_OUTPUT_ORDERING_VERSION,
  R126_ORDERING_CASES,
  R126_REJECTED_DERIVATIONS,
  R126_SUMMARY,
} from '../src/research/general-natal-control-drain-output-ordering-divergence.js';

describe('R126 control, drain, and output ordering divergence', () => {
  it('publishes the planned corpus and comparison groups', () => {
    expect(R126_CONTROL_DRAIN_OUTPUT_ORDERING_VERSION).toBe('0.1.0-research');
    expect(R126_ORDERING_CASES).toHaveLength(24);
    expect(R126_SUMMARY.caseCount).toBe(24);
    expect(R126_SUMMARY.comparisonGroupCount).toBe(11);
    expect(new Set(R126_ORDERING_CASES.map((row) => row.caseId)).size).toBe(24);
  });

  it('meets control, output, wealth, and chain coverage targets', () => {
    expect(R126_SUMMARY.controlCount).toBeGreaterThanOrEqual(3);
    expect(R126_SUMMARY.outputCount).toBeGreaterThanOrEqual(3);
    expect(R126_SUMMARY.wealthCapacityCount).toBeGreaterThanOrEqual(3);
    expect(R126_SUMMARY.outputToWealthCount).toBeGreaterThanOrEqual(3);
    expect(R126_SUMMARY.wealthToControlCount).toBeGreaterThanOrEqual(3);
    expect(R126_SUMMARY.rescueContaminationCount).toBeGreaterThanOrEqual(4);
  });

  it('keeps source statement, interpretation, and inference separate', () => {
    for (const row of R126_ORDERING_CASES) {
      expect(row.sourceStatement.length).toBeGreaterThan(0);
      expect(row.interpretiveReading.length).toBeGreaterThan(0);
      expect(row.researchInference.length).toBeGreaterThan(0);
      expect(row.sourceRefs.length).toBeGreaterThan(0);
      expect(row.prohibitedExtensions.length).toBeGreaterThan(0);
    }
  });

  it('never lets relation presence settle the outcome by itself', () => {
    expect(
      R126_ORDERING_CASES.every(
        (row) => row.relationPresenceSettlesOutcome === false,
      ),
    ).toBe(true);
  });

  it('keeps useful output leakage distinct from globally adverse output', () => {
    const useful = R126_ORDERING_CASES.find(
      (row) => row.caseId === 'R126-C02-OUTPUT-LEAKAGE-CAN-BE-USEFUL',
    );
    const owl = R126_ORDERING_CASES.find(
      (row) => row.caseId === 'R126-C21-FOOD-MEETS-OWL',
    );
    const protectedFood = R126_ORDERING_CASES.find(
      (row) => row.caseId === 'R126-C22-WEALTH-PROTECTS-FOOD',
    );

    expect(useful).toMatchObject({
      family: 'OUTPUT',
      scope: 'BOTH_EXPLICIT',
      orderingType: 'CONTEXT_DEPENDENT',
      genericChallengingCollapseAuthorized: false,
    });
    expect(owl?.family).toBe('OUTPUT');
    expect(protectedFood).toMatchObject({
      family: 'OUTPUT',
      orderingType: 'RESCUE_CHAIN',
    });
  });

  it('preserves output-to-wealth chains as ordered and non-additive', () => {
    for (const caseId of [
      'R126-C03-FOOD-GENERATES-WEALTH',
      'R126-C04-HURTING-GENERATES-WEALTH',
      'R126-C05-HURTING-WEALTH-KILL-CHAIN',
    ]) {
      const row = R126_ORDERING_CASES.find(
        (candidate) => candidate.caseId === caseId,
      );
      expect(row).toMatchObject({
        family: 'OUTPUT_TO_WEALTH',
        orderingType: 'GENERATIVE_CHAIN',
        orderingEvidence: 'EXPLICIT_IN_SOURCE',
        scalarAggregationAuthorized: false,
        independentCountingAuthorized: false,
      });
      expect(row?.causalChainDoubleCountingRisk).toBe(true);
    }
  });

  it('preserves wealth-to-control chains without independent penalty counting', () => {
    for (const caseId of [
      'R126-C06-WEALTH-GENERATES-OFFICER',
      'R126-C07-WEALTH-GENERATES-KILL',
      'R126-C13-WEALTH-MANY-GENERATES-KILL',
    ]) {
      const row = R126_ORDERING_CASES.find(
        (candidate) => candidate.caseId === caseId,
      );
      expect(row).toMatchObject({
        family: 'WEALTH_TO_CONTROL',
        orderingType: 'GENERATIVE_CHAIN',
        independentCountingAuthorized: false,
        numericWeightAuthorized: false,
      });
      expect(row?.causalChainDoubleCountingRisk).toBe(true);
    }
  });

  it('keeps output as a controller of kill rather than pure leakage only', () => {
    const row = R126_ORDERING_CASES.find(
      (candidate) => candidate.caseId === 'R126-C08-FOOD-CONTROLS-KILL',
    );

    expect(row).toMatchObject({
      family: 'OUTPUT_CONTROLS_KILL',
      orderingType: 'CONTROL_CHAIN',
      orderingEvidence: 'EXPLICIT_IN_SOURCE',
      genericChallengingCollapseAuthorized: false,
    });
    expect(row?.prohibitedExtensions).toContain(
      'OUTPUT_HAS_ONLY_LEAKAGE_ROLE',
    );
  });

  it('keeps control dependent on body state and mediation', () => {
    const strong = R126_ORDERING_CASES.find(
      (row) => row.caseId === 'R126-C09-STRONG-BODY-KILL-CONTROLLED',
    );
    const fed = R126_ORDERING_CASES.find(
      (row) => row.caseId === 'R126-C10-SEVEN-KILL-FED-WITHOUT-CONTROL',
    );
    const mediated = R126_ORDERING_CASES.find(
      (row) =>
        row.caseId ===
        'R126-C23-WEAK-BODY-HEAVY-OFFICER-RESOURCE-MEDIATION',
    );

    expect(strong?.family).toBe('CONTROL');
    expect(fed?.family).toBe('CONTROL');
    expect(mediated).toMatchObject({
      family: 'CONTROL',
      scope: 'BOTH_EXPLICIT',
      orderingType: 'RESCUE_CHAIN',
    });
  });

  it('keeps wealth tied to capacity and relative context rather than a fixed drain', () => {
    const manyWeak = R126_ORDERING_CASES.find(
      (row) => row.caseId === 'R126-C11-WEALTH-MANY-BODY-WEAK',
    );
    const resourceRemedy = R126_ORDERING_CASES.find(
      (row) => row.caseId === 'R126-C12-WEALTH-WEAK-BODY-RESOURCE-REMEDY',
    );
    const lightWealthHeavyPeer = R126_ORDERING_CASES.find(
      (row) => row.caseId === 'R126-C24-LIGHT-WEALTH-HEAVY-PEER',
    );

    expect(manyWeak?.family).toBe('WEALTH_CAPACITY');
    expect(resourceRemedy).toMatchObject({
      family: 'WEALTH_CAPACITY',
      orderingType: 'RESCUE_CHAIN',
    });
    expect(lightWealthHeavyPeer).toMatchObject({
      family: 'WEALTH_CAPACITY',
      orderingType: 'CONTEXT_DEPENDENT',
    });
  });

  it('preserves contamination and rescue order in the kill-food-seal-wealth chain', () => {
    const contamination = R126_ORDERING_CASES.find(
      (row) => row.caseId === 'R126-C14-KILL-FOOD-SEAL-CONTAMINATION',
    );
    const rescue = R126_ORDERING_CASES.find(
      (row) => row.caseId === 'R126-C15-KILL-FOOD-SEAL-WEALTH-RESCUE',
    );

    expect(contamination).toMatchObject({
      family: 'RESCUE_CONTAMINATION',
      orderingType: 'CONTAMINATION_CHAIN',
      orderingEvidence: 'EXPLICIT_IN_SOURCE',
    });
    expect(rescue).toMatchObject({
      family: 'RESCUE_CONTAMINATION',
      orderingType: 'RESCUE_CHAIN',
      orderingEvidence: 'EXPLICIT_IN_SOURCE',
    });
    expect(rescue?.chain).toEqual([
      '煞逢食制',
      '印來護煞',
      '財去印',
      '存食',
    ]);
  });

  it('keeps rescue chains non-scalar', () => {
    for (const caseId of [
      'R126-C16-WEALTH-ROBBERY-OUTPUT-RESCUE',
      'R126-C17-OFFICER-HURTING-RESOURCE-RESCUE',
    ]) {
      const row = R126_ORDERING_CASES.find(
        (candidate) => candidate.caseId === caseId,
      );
      expect(row).toMatchObject({
        family: 'RESCUE_CONTAMINATION',
        orderingType: 'RESCUE_CHAIN',
        scalarAggregationAuthorized: false,
        independentCountingAuthorized: false,
      });
    }
  });

  it('preserves position-dependent settlement', () => {
    const row = R126_ORDERING_CASES.find(
      (candidate) =>
        candidate.caseId === 'R126-C18-WEALTH-RESOURCE-POSITION-COMPATIBILITY',
    );

    expect(row).toMatchObject({
      family: 'POSITION_CONTEXT',
      orderingType: 'POSITION_DEPENDENT',
      relationPresenceSettlesOutcome: false,
      globalPrecedenceAuthorized: false,
    });
  });

  it('finds enough paired comparison groups without forcing every group to be symmetric', () => {
    const paired = R126_COMPARISON_GROUPS.filter(
      (groupId) =>
        R126_ORDERING_CASES.filter(
          (row) => row.comparisonGroupId === groupId,
        ).length >= 2,
    );

    expect(paired.length).toBeGreaterThanOrEqual(6);
  });

  it('finds no scalar aggregation, global precedence, or numeric weights', () => {
    expect(R126_SUMMARY.scalarAggregationAuthorizedCount).toBe(0);
    expect(R126_SUMMARY.globalPrecedenceAuthorizedCount).toBe(0);
    expect(R126_SUMMARY.numericWeightAuthorizedCount).toBe(0);

    expect(
      R126_ORDERING_CASES.every(
        (row) =>
          row.scalarAggregationAuthorized === false &&
          row.globalPrecedenceAuthorized === false &&
          row.numericWeightAuthorized === false &&
          row.finalStrengthAuthorized === false,
      ),
    ).toBe(true);
  });

  it('locks double-counting and global-order shortcuts closed', () => {
    expect(R126_SUMMARY.doubleCountingRiskCount).toBeGreaterThanOrEqual(10);
    expect(R126_REJECTED_DERIVATIONS).toContain(
      'CHALLENGING_COUNT_EQUALS_STRENGTH',
    );
    expect(R126_REJECTED_DERIVATIONS).toContain(
      'CHAIN_COMPONENTS_CAN_BE_SUMMED_INDEPENDENTLY',
    );
    expect(R126_REJECTED_DERIVATIONS).toContain(
      'SOURCE_SENTENCE_ORDER_EQUALS_RUNTIME_PRECEDENCE',
    );
    expect(R126_REJECTED_DERIVATIONS).toContain(
      'LOCAL_ORDER_EQUALS_GLOBAL_PRECEDENCE',
    );
  });

  it('preserves the research-only authority boundary', () => {
    expect(R126_AUTHORITY).toEqual({
      status: 'RESEARCH_CONTROL_DRAIN_OUTPUT_ORDERING_DIVERGENCE_COMPLETE',
      researchOnly: true,
      controlMechanismObserved: true,
      outputLeakageMechanismObserved: true,
      wealthCapacityMechanismObserved: true,
      localGenerativeOrderingObserved: true,
      localControlOrderingObserved: true,
      localRescueOrderingObserved: true,
      localContaminationOrderingObserved: true,
      positionDependentSettlementObserved: true,
      challengingRelationsMechanismEquivalentEstablished: false,
      independentChainCountingAuthorized: false,
      genericChallengingScalarAuthorized: false,
      globalRelationPrecedenceAuthorized: false,
      numericStrengthWeightsAuthorized: false,
      patternToStrengthTransferAuthorized: false,
      finalQiangRuoClassifierAuthorized: false,
      finalWangShuaiClassifierAuthorized: false,
      automaticAuthorityAdmissionAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
