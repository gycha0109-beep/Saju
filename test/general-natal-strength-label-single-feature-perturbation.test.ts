import { describe, expect, it } from 'vitest';
import {
  R127_AUTHORITY,
  R127_COMPARISON_GROUPS,
  R127_PERTURBATION_CASES,
  R127_REJECTED_DERIVATIONS,
  R127_STRENGTH_LABEL_INSTABILITY_VERSION,
  R127_SUMMARY,
} from '../src/research/general-natal-strength-label-single-feature-perturbation.js';

describe('R127 strength-label instability under single-feature perturbation', () => {
  it('publishes the intended corpus', () => {
    expect(R127_STRENGTH_LABEL_INSTABILITY_VERSION).toBe('0.1.0-research');
    expect(R127_PERTURBATION_CASES).toHaveLength(24);
    expect(R127_SUMMARY.caseCount).toBe(24);
    expect(R127_SUMMARY.comparisonGroupCount).toBe(12);
    expect(new Set(R127_PERTURBATION_CASES.map((row) => row.caseId)).size).toBe(24);
  });

  it('keeps every perturbation auditable and source-bounded', () => {
    for (const row of R127_PERTURBATION_CASES) {
      expect(row.baselineEvidence.length).toBeGreaterThan(0);
      expect(row.perturbation.length).toBeGreaterThan(0);
      expect(row.heldConstantClaim.length).toBeGreaterThan(0);
      expect(row.sourceStatement.length).toBeGreaterThan(0);
      expect(row.interpretiveReading.length).toBeGreaterThan(0);
      expect(row.researchInference.length).toBeGreaterThan(0);
      expect(row.sourceRefs.length).toBeGreaterThan(0);
      expect(row.prohibitedExtensions.length).toBeGreaterThan(0);
    }
  });

  it('preserves direct source labels without inventing the opposite side', () => {
    expect(R127_SUMMARY.directBaselineLabelCount).toBeGreaterThanOrEqual(6);
    expect(R127_SUMMARY.directPerturbedLabelCount).toBe(0);
    expect(R127_SUMMARY.exactSingleFeatureLabelFlipCount).toBe(0);
    expect(R127_SUMMARY.counterfactualLabelAuthorizedCount).toBe(0);

    for (const row of R127_PERTURBATION_CASES.filter(
      (candidate) => candidate.baselineSourceLabel !== null,
    )) {
      expect(row.perturbedSourceLabel).toBeNull();
      expect(row.counterfactualLabelAuthorized).toBe(false);
      expect(row.exactSingleFeatureLabelFlipObserved).toBe(false);
    }
  });

  it('locks season-only deterministic shortcuts closed', () => {
    const deShi = R127_PERTURBATION_CASES.find(
      (row) => row.caseId === 'R127-C01-DE-SHI-NOT-WANG',
    );
    const shiShi = R127_PERTURBATION_CASES.find(
      (row) => row.caseId === 'R127-C02-SHI-SHI-NOT-RUO',
    );

    expect(deShi).toMatchObject({
      axis: 'SEASON_STATUS',
      baselineSourceLabel: 'NOT_WANG',
      disposition: 'ANTI_DETERMINISTIC',
      counterfactualLabelAuthorized: false,
    });
    expect(shiShi).toMatchObject({
      axis: 'SEASON_STATUS',
      baselineSourceLabel: 'NOT_RUO',
      disposition: 'ANTI_DETERMINISTIC',
      counterfactualLabelAuthorized: false,
    });
  });

  it('keeps exact rootless weak seeds from auto-flipping when a root is synthetically added', () => {
    for (const caseId of [
      'R127-C03-FOUR-XIN-ADD-ROOT-HOLD',
      'R127-C04-FOUR-BING-ADD-ROOT-HOLD',
    ]) {
      const row = R127_PERTURBATION_CASES.find(
        (candidate) => candidate.caseId === caseId,
      );
      expect(row).toMatchObject({
        axis: 'ROOT_PRESENCE',
        baselineSourceLabel: 'RUO',
        perturbedSourceLabel: null,
        disposition: 'COUNTERFACTUAL_HOLD',
        counterfactualLabelAuthorized: false,
      });
    }
  });

  it('preserves qualitative root ordering without converting it into label thresholds', () => {
    for (const caseId of [
      'R127-C05-ONE-BIJIAN-TO-MUKU-ROOT',
      'R127-C06-TWO-BIJIAN-TO-YUQI-ROOT',
      'R127-C07-THREE-BIJIAN-TO-CHANGSHENG-LU',
    ]) {
      const row = R127_PERTURBATION_CASES.find(
        (candidate) => candidate.caseId === caseId,
      );
      expect(row).toMatchObject({
        axis: 'ROOT_QUALITY',
        isolationQuality: 'SOURCE_COMPARATIVE_ORDERING',
        disposition: 'SEMANTIC_CHANGE_WITHOUT_LABEL',
        numericDeltaAuthorized: false,
        finalClassifierAuthorized: false,
      });
    }
  });

  it('keeps root position and Yuqi timing semantic but non-classifying', () => {
    const position = R127_PERTURBATION_CASES.find(
      (row) => row.caseId === 'R127-C08-ROOT-MOVES-INTO-MONTH',
    );
    const timing = R127_PERTURBATION_CASES.find(
      (row) => row.caseId === 'R127-C09-YUQI-TIME-WINDOW',
    );

    expect(position).toMatchObject({
      axis: 'ROOT_POSITION',
      featureSemanticChangeObserved: true,
      counterfactualLabelAuthorized: false,
    });
    expect(timing).toMatchObject({
      axis: 'YUQI_TEMPORAL_CONTEXT',
      featureSemanticChangeObserved: true,
      numericDeltaAuthorized: false,
    });
  });

  it('preserves source-policy divergence for Muku and Changsheng polarity changes', () => {
    for (const caseId of [
      'R127-C10-MUKU-YANG-TO-YIN-POLICY',
      'R127-C11-CHANGSHENG-YANG-TO-YIN-POLICY',
    ]) {
      const row = R127_PERTURBATION_CASES.find(
        (candidate) => candidate.caseId === caseId,
      );
      expect(row).toMatchObject({
        isolationQuality: 'SOURCE_POLICY_PERTURBATION',
        disposition: 'SOURCE_POLICY_DIVERGENT',
        labelInvarianceAuthorized: false,
        counterfactualLabelAuthorized: false,
      });
    }
  });

  it('keeps hidden-stem role change separate from strength-label change', () => {
    const roleSwitch = R127_PERTURBATION_CASES.find(
      (row) => row.caseId === 'R127-C12-YIN-TRANSPARENCY-ROLE-SWITCH',
    );
    const storageOrder = R127_PERTURBATION_CASES.find(
      (row) => row.caseId === 'R127-C13-HIDDEN-STORAGE-ORDER-SWAP',
    );

    expect(roleSwitch).toMatchObject({
      axis: 'HIDDEN_TRANSPARENCY',
      featureSemanticChangeObserved: true,
      finalClassifierAuthorized: false,
    });
    expect(storageOrder).toMatchObject({
      featureSemanticChangeObserved: false,
      labelInvarianceAuthorized: true,
      numericDeltaAuthorized: false,
    });
  });

  it('refuses one-for-one peer/resource substitution', () => {
    for (const caseId of [
      'R127-C14-PEER-TO-RESOURCE-SWAP',
      'R127-C15-WEAK-BODY-RESOURCE-TO-PEER-SWAP',
    ]) {
      const row = R127_PERTURBATION_CASES.find(
        (candidate) => candidate.caseId === caseId,
      );
      expect(row).toMatchObject({
        axis: 'SUPPORT_FAMILY',
        disposition: 'NON_EQUIVALENT_SWAP',
        labelInvarianceAuthorized: false,
        scalarScoreAuthorized: false,
      });
    }
  });

  it('keeps Tonggen removal and resource multiplicity from becoming thresholds', () => {
    const removeRoot = R127_PERTURBATION_CASES.find(
      (row) => row.caseId === 'R127-C16-MIXED-BIYIN-REMOVE-TONGGEN',
    );
    const multiplicity = R127_PERTURBATION_CASES.find(
      (row) => row.caseId === 'R127-C17-RESOURCE-MULTIPLICITY-INCREASE',
    );

    expect(removeRoot).toMatchObject({
      baselineSourceLabel: 'NOT_RUO',
      perturbedSourceLabel: null,
      counterfactualLabelAuthorized: false,
    });
    expect(multiplicity).toMatchObject({
      axis: 'SUPPORT_MULTIPLICITY',
      disposition: 'ANTI_DETERMINISTIC',
      numericDeltaAuthorized: false,
    });
  });

  it('treats local relation-chain perturbations as semantic reconfiguration, not final label flips', () => {
    for (const caseId of [
      'R127-C18-ADD-OUTPUT-TO-STRONG-BODY-RESOURCE',
      'R127-C19-ADD-FOOD-TO-KILL',
      'R127-C20-ADD-RESOURCE-TO-FOOD-CONTROLS-KILL',
      'R127-C21-ADD-WEALTH-TO-CONTAMINATED-CHAIN',
      'R127-C24-WEALTH-WEAK-ADD-RESOURCE-REMEDY',
    ]) {
      const row = R127_PERTURBATION_CASES.find(
        (candidate) => candidate.caseId === caseId,
      );
      expect(row).toMatchObject({
        disposition: 'LOCAL_CHAIN_RECONFIGURATION',
        exactSingleFeatureLabelFlipObserved: false,
        counterfactualLabelAuthorized: false,
        finalClassifierAuthorized: false,
      });
    }
  });

  it('refuses equal challenging-family swaps', () => {
    for (const caseId of [
      'R127-C22-OUTPUT-TO-WEALTH-RELATION-SWAP',
      'R127-C23-WEALTH-TO-OFFICER-RELATION-SWAP',
    ]) {
      const row = R127_PERTURBATION_CASES.find(
        (candidate) => candidate.caseId === caseId,
      );
      expect(row).toMatchObject({
        axis: 'CHALLENGING_RELATION_FAMILY',
        disposition: 'NON_EQUIVALENT_SWAP',
        numericDeltaAuthorized: false,
        scalarScoreAuthorized: false,
      });
    }
  });

  it('covers every required perturbation family', () => {
    const axes = new Set(R127_PERTURBATION_CASES.map((row) => row.axis));

    expect(axes).toEqual(
      expect.objectContaining({
        size: expect.any(Number),
      }),
    );
    expect(axes.has('SEASON_STATUS')).toBe(true);
    expect(axes.has('ROOT_PRESENCE')).toBe(true);
    expect(axes.has('ROOT_QUALITY')).toBe(true);
    expect(axes.has('ROOT_POSITION')).toBe(true);
    expect(axes.has('YUQI_TEMPORAL_CONTEXT')).toBe(true);
    expect(axes.has('STEM_POLARITY_SOURCE_POLICY')).toBe(true);
    expect(axes.has('HIDDEN_TRANSPARENCY')).toBe(true);
    expect(axes.has('SUPPORT_FAMILY')).toBe(true);
    expect(axes.has('OUTPUT_PRESENCE')).toBe(true);
    expect(axes.has('RELATION_CHAIN_MEDIATOR')).toBe(true);
    expect(axes.has('CHALLENGING_RELATION_FAMILY')).toBe(true);
  });

  it('never authorizes numeric feature deltas or scalar scores', () => {
    expect(R127_SUMMARY.numericDeltaAuthorizedCount).toBe(0);
    expect(R127_SUMMARY.scalarScoreAuthorizedCount).toBe(0);
    expect(
      R127_PERTURBATION_CASES.every(
        (row) =>
          row.numericDeltaAuthorized === false &&
          row.scalarScoreAuthorized === false &&
          row.finalClassifierAuthorized === false,
      ),
    ).toBe(true);
  });

  it('rejects one-feature classifier shortcuts', () => {
    expect(R127_REJECTED_DERIVATIONS).toContain(
      'ONE_FEATURE_CHANGED_EQUALS_OPPOSITE_LABEL',
    );
    expect(R127_REJECTED_DERIVATIONS).toContain(
      'SOURCE_LABEL_ON_ONE_SIDE_EQUALS_COUNTERFACTUAL_LABEL',
    );
    expect(R127_REJECTED_DERIVATIONS).toContain(
      'ADD_ONE_ROOT_EQUALS_QIANG',
    );
    expect(R127_REJECTED_DERIVATIONS).toContain(
      'SYNTHETIC_COUNTERFACTUAL_INHERITS_NEARBY_SOURCE_LABEL',
    );
  });

  it('preserves the research-only authority boundary', () => {
    expect(R127_AUTHORITY).toEqual({
      status: 'RESEARCH_SINGLE_FEATURE_STRENGTH_LABEL_INSTABILITY_AUDIT_COMPLETE',
      researchOnly: true,
      directSourceLabelAnchorsObserved: true,
      singleFeatureSemanticSensitivityObserved: true,
      sourcePolicySensitivityObserved: true,
      localChainReconfigurationObserved: true,
      exactSingleFeatureOppositeLabelPairEstablished: false,
      exactSingleFeatureLabelFlipEstablished: false,
      syntheticCounterfactualLabelsAuthorized: false,
      labelInvarianceAcrossPerturbationsAuthorized: false,
      numericFeatureDeltaAuthorized: false,
      scalarStrengthScoreAuthorized: false,
      universalFeatureThresholdAuthorized: false,
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
