import { describe, expect, it } from 'vitest';
import {
  R129_AUTHORITY,
  R129_NONNUMERIC_STRENGTH_EXPLANATION_PRIMITIVES_VERSION,
  R129_PRIMITIVE_RELATIONS,
  R129_REJECTED_EXPLANATION_SHORTCUTS,
  R129_STRENGTH_EXPLANATION_PRIMITIVES,
  R129_SUMMARY,
  R129_VIRTUAL_RELATION_TARGETS,
} from '../src/research/general-natal-nonnumeric-strength-explanation-primitives.js';

describe('R129 nonnumeric strength explanation primitive inventory', () => {
  it('publishes the intended primitive inventory and relation graph', () => {
    expect(R129_NONNUMERIC_STRENGTH_EXPLANATION_PRIMITIVES_VERSION).toBe(
      '0.1.0-research',
    );
    expect(R129_STRENGTH_EXPLANATION_PRIMITIVES).toHaveLength(55);
    expect(R129_SUMMARY.primitiveCount).toBe(55);
    expect(R129_SUMMARY.familyCount).toBe(9);
    expect(R129_PRIMITIVE_RELATIONS.length).toBeGreaterThanOrEqual(20);
    expect(R129_SUMMARY.relationCount).toBe(R129_PRIMITIVE_RELATIONS.length);
    expect(
      new Set(
        R129_STRENGTH_EXPLANATION_PRIMITIVES.map((row) => row.primitiveId),
      ).size,
    ).toBe(55);
  });

  it('keeps every primitive source-bounded and explanatory', () => {
    for (const row of R129_STRENGTH_EXPLANATION_PRIMITIVES) {
      expect(row.triggerFacts.length).toBeGreaterThan(0);
      expect(row.sourceDerivedMeaning.length).toBeGreaterThan(0);
      expect(row.semanticClaim.length).toBeGreaterThan(0);
      expect(row.researchGloss.length).toBeGreaterThan(0);
      expect(row.safeExplanationPattern.length).toBeGreaterThan(0);
      expect(row.sourceRefs.length).toBeGreaterThan(0);
      expect(row.doesNotEstablish.length).toBeGreaterThan(0);
      expect(row.prohibitedExtensions.length).toBeGreaterThan(0);
      expect(row.authorizesExplanation).toBe(true);
    }
  });

  it('meets portability and uncertainty coverage targets', () => {
    expect(R129_SUMMARY.crossSurfaceBoundedCount).toBeGreaterThanOrEqual(8);
    expect(R129_SUMMARY.sourceOrMethodologyScopedCount).toBeGreaterThanOrEqual(
      6,
    );
    expect(R129_SUMMARY.policySensitiveOrUnresolvedCount).toBeGreaterThanOrEqual(
      5,
    );
    expect(
      R129_SUMMARY.antiDeterminismOrUncertaintyCount,
    ).toBeGreaterThanOrEqual(8);
  });

  it('keeps season primitives contextual rather than classifying', () => {
    const favorable = R129_STRENGTH_EXPLANATION_PRIMITIVES.find(
      (row) => row.primitiveId === 'SEASON_CONTEXT_FAVORABLE',
    );
    const unfavorable = R129_STRENGTH_EXPLANATION_PRIMITIVES.find(
      (row) => row.primitiveId === 'SEASON_CONTEXT_UNFAVORABLE',
    );
    const boundary = R129_STRENGTH_EXPLANATION_PRIMITIVES.find(
      (row) => row.primitiveId === 'SEASON_ALONE_NOT_DECISIVE',
    );

    expect(favorable?.doesNotEstablish).toContain('旺');
    expect(unfavorable?.doesNotEstablish).toContain('弱');
    expect(boundary).toMatchObject({
      portability: 'CROSS_SURFACE_BOUNDED',
      explanationRole: 'QUALIFIER',
      authorizesFinalStrength: false,
    });
  });

  it('separates month importance from exclusive authority and scoped root priority', () => {
    const importance = R129_STRENGTH_EXPLANATION_PRIMITIVES.find(
      (row) => row.primitiveId === 'MONTH_CONTEXT_IMPORTANT_BOUNDED',
    );
    const antiExclusive = R129_STRENGTH_EXPLANATION_PRIMITIVES.find(
      (row) => row.primitiveId === 'MONTH_CONTEXT_NOT_EXCLUSIVE',
    );
    const rootPriority = R129_STRENGTH_EXPLANATION_PRIMITIVES.find(
      (row) => row.primitiveId === 'MONTH_ROOT_PRIORITY_WITHIN_TONGGEN',
    );

    expect(importance?.portability).toBe('CROSS_SURFACE_BOUNDED');
    expect(antiExclusive?.explanationRole).toBe('QUALIFIER');
    expect(rootPriority).toMatchObject({
      portability: 'SOURCE_SCOPED',
      evidenceState: 'SOURCE_SCOPED',
    });
  });

  it('keeps positive root evidence distinct from a complete global root resolver', () => {
    const positive = R129_STRENGTH_EXPLANATION_PRIMITIVES.find(
      (row) => row.primitiveId === 'ROOT_SUPPORT_PRESENT_BOUNDED',
    );
    const unresolved = R129_STRENGTH_EXPLANATION_PRIMITIVES.find(
      (row) =>
        row.primitiveId === 'ROOT_STATUS_UNRESOLVED_OUTSIDE_GOVERNED_SCOPE',
    );

    expect(positive).toMatchObject({
      explanationRole: 'SUPPORT',
      authorizesFinalStrength: false,
    });
    expect(unresolved).toMatchObject({
      explanationRole: 'UNCERTAINTY',
      portability: 'UNRESOLVED',
      admission: 'ADMIT_POLICY_BOUNDARY_PRIMITIVE',
    });
  });

  it('keeps root quality qualitative and non-numeric', () => {
    for (const primitiveId of [
      'ROOT_QUALITY_MATTERS',
      'HEAVY_ROOT_CLASS_BOUNDED',
      'LIGHT_ROOT_CLASS_BOUNDED',
      'VISIBLE_SUPPORT_NOT_EQUIVALENT_ROOT',
      'ROOT_QUALITY_NOT_NUMERIC_WEIGHT',
    ]) {
      const row = R129_STRENGTH_EXPLANATION_PRIMITIVES.find(
        (candidate) => candidate.primitiveId === primitiveId,
      );
      expect(row?.authorizesNumericWeight).toBe(false);
      expect(row?.authorizesAggregation).toBe(false);
    }
  });

  it('exposes Yuqi, Muku, and Changsheng policy boundaries without selecting winners', () => {
    for (const primitiveId of [
      'YUQI_TEMPORAL_WEIGHT_NOT_AUTHORIZED',
      'MUKU_YIN_POLICY_DIVERGENT',
      'EARTH_MUKU_UNRESOLVED',
      'YIN_CHANGSHENG_POLICY_DIVERGENT',
      'TWELVE_GROWTH_STAGE_NOT_AUTOMATIC_ROOT_CLASS',
    ]) {
      const row = R129_STRENGTH_EXPLANATION_PRIMITIVES.find(
        (candidate) => candidate.primitiveId === primitiveId,
      );
      expect(row?.explanationRole).toMatch(/UNCERTAINTY|POLICY_BOUNDARY/);
      expect(row?.authorizesFinalStrength).toBe(false);
    }
  });

  it('keeps hidden-stem storage, role, and strength semantics separate', () => {
    const storage = R129_STRENGTH_EXPLANATION_PRIMITIVES.find(
      (row) => row.primitiveId === 'HIDDEN_STEM_MEMBERSHIP_NOT_DEPTH',
    );
    const role = R129_STRENGTH_EXPLANATION_PRIMITIVES.find(
      (row) => row.primitiveId === 'HIDDEN_TRANSPARENCY_CAN_CHANGE_ROLE',
    );
    const boundary = R129_STRENGTH_EXPLANATION_PRIMITIVES.find(
      (row) => row.primitiveId === 'HIDDEN_ROLE_NOT_STRENGTH_LABEL',
    );

    expect(storage?.prohibitedExtensions).toContain(
      'ARRAY_POSITION_EQUALS_HIDDEN_DEPTH',
    );
    expect(role?.portability).toBe('SOURCE_SCOPED');
    expect(boundary?.doesNotEstablish).toEqual(
      expect.arrayContaining(['強', '弱', '旺', '衰']),
    );
  });

  it('keeps peer and resource as distinct support mechanisms', () => {
    const peer = R129_STRENGTH_EXPLANATION_PRIMITIVES.find(
      (row) => row.primitiveId === 'PEER_SUPPORT_PRESENT',
    );
    const resource = R129_STRENGTH_EXPLANATION_PRIMITIVES.find(
      (row) => row.primitiveId === 'RESOURCE_SUPPORT_PRESENT',
    );
    const discriminant = R129_STRENGTH_EXPLANATION_PRIMITIVES.find(
      (row) => row.primitiveId === 'PEER_RESOURCE_MECHANISM_DISTINCT',
    );

    expect(peer?.mustNotBeCollapsedWith).toContain('RESOURCE_SUPPORT_PRESENT');
    expect(resource?.mustNotBeCollapsedWith).toContain('PEER_SUPPORT_PRESENT');
    expect(discriminant).toMatchObject({
      portability: 'CROSS_SURFACE_BOUNDED',
      authorizesAggregation: false,
    });
  });

  it('allows qualitative support accumulation while refusing thresholds and final labels', () => {
    const accumulation = R129_STRENGTH_EXPLANATION_PRIMITIVES.find(
      (row) => row.primitiveId === 'SUPPORT_ACCUMULATION_QUALITATIVE',
    );
    const threshold = R129_STRENGTH_EXPLANATION_PRIMITIVES.find(
      (row) => row.primitiveId === 'SUPPORT_THRESHOLD_NOT_ESTABLISHED',
    );
    const finalBoundary = R129_STRENGTH_EXPLANATION_PRIMITIVES.find(
      (row) =>
        row.primitiveId === 'SUPPORT_FAMILY_PRESENCE_NOT_FINAL_STRENGTH',
    );

    expect(accumulation?.authorizesAggregation).toBe(false);
    expect(threshold?.explanationRole).toBe('UNCERTAINTY');
    expect(finalBoundary?.authorizesFinalStrength).toBe(false);
  });

  it('keeps output, wealth, and control as distinct non-scalar relation families', () => {
    for (const primitiveId of [
      'OUTPUT_RELATION_PRESENT',
      'WEALTH_RELATION_PRESENT',
      'CONTROL_RELATION_PRESENT',
    ]) {
      const row = R129_STRENGTH_EXPLANATION_PRIMITIVES.find(
        (candidate) => candidate.primitiveId === primitiveId,
      );
      expect(row?.family).toBe('CHALLENGE_RELATION');
      expect(row?.authorizesNumericWeight).toBe(false);
      expect(row?.authorizesFinalStrength).toBe(false);
    }

    const boundary = R129_STRENGTH_EXPLANATION_PRIMITIVES.find(
      (row) =>
        row.primitiveId === 'CHALLENGING_RELATION_NOT_NEGATIVE_POINT',
    );
    expect(boundary?.explanationRole).toBe('UNCERTAINTY');
  });

  it('keeps useful leakage and capacity/control context explicit', () => {
    const usefulOutput = R129_STRENGTH_EXPLANATION_PRIMITIVES.find(
      (row) =>
        row.primitiveId === 'OUTPUT_CAN_BE_USEFUL_OVER_SUPPORTED_CONTEXT',
    );
    const wealthCapacity = R129_STRENGTH_EXPLANATION_PRIMITIVES.find(
      (row) => row.primitiveId === 'WEALTH_CAPACITY_DEPENDENT',
    );
    const controlContext = R129_STRENGTH_EXPLANATION_PRIMITIVES.find(
      (row) => row.primitiveId === 'CONTROL_EFFECT_CONTEXT_DEPENDENT',
    );

    expect(usefulOutput?.portability).toBe('SOURCE_SCOPED');
    expect(wealthCapacity?.explanationRole).toBe('QUALIFIER');
    expect(controlContext?.explanationRole).toBe('QUALIFIER');
  });

  it('keeps local relation chains explanatory but non-executive', () => {
    for (const primitiveId of [
      'RELATION_CHAIN_PRESENT',
      'SAME_ACTOR_MULTIPLE_ROLES',
      'OUTPUT_GENERATES_WEALTH',
      'OUTPUT_CONTROLS_KILL',
      'WEALTH_GENERATES_CONTROL',
      'LOCAL_CHAIN_ORDER_MATTERS',
      'LOCAL_ORDER_NOT_GLOBAL_PRECEDENCE',
    ]) {
      const row = R129_STRENGTH_EXPLANATION_PRIMITIVES.find(
        (candidate) => candidate.primitiveId === primitiveId,
      );
      expect(row?.family).toBe('RELATION_CHAIN');
      expect(row?.authorizesAggregation).toBe(false);
      expect(row?.authorizesFinalStrength).toBe(false);
    }
  });

  it('makes primitive relations internally valid or explicitly virtual', () => {
    const primitiveIds = new Set(
      R129_STRENGTH_EXPLANATION_PRIMITIVES.map((row) => row.primitiveId),
    );
    const virtualTargets = new Set(R129_VIRTUAL_RELATION_TARGETS);

    for (const relation of R129_PRIMITIVE_RELATIONS) {
      expect(primitiveIds.has(relation.fromPrimitiveId)).toBe(true);
      expect(
        primitiveIds.has(relation.toPrimitiveId) ||
          virtualTargets.has(
            relation.toPrimitiveId as (typeof R129_VIRTUAL_RELATION_TARGETS)[number],
          ),
      ).toBe(true);
      expect(relation.researchMeaning.length).toBeGreaterThan(0);
    }
  });

  it('contains explicit does-not-imply, scope, contrast, and policy relations', () => {
    const relationTypes = new Set(
      R129_PRIMITIVE_RELATIONS.map((row) => row.relation),
    );

    expect(relationTypes.has('DOES_NOT_IMPLY')).toBe(true);
    expect(relationTypes.has('SCOPE_LIMITS')).toBe(true);
    expect(relationTypes.has('CONTRASTS_WITH')).toBe(true);
    expect(relationTypes.has('POLICY_FORKS')).toBe(true);
    expect(relationTypes.has('QUALIFIES')).toBe(true);
    expect(relationTypes.has('CAN_COEXIST_WITH')).toBe(true);
  });

  it('never authorizes scoring, aggregation, final labels, claims, or product copy', () => {
    expect(R129_SUMMARY.numericWeightAuthorizedCount).toBe(0);
    expect(R129_SUMMARY.aggregationAuthorizedCount).toBe(0);
    expect(R129_SUMMARY.finalStrengthAuthorizedCount).toBe(0);
    expect(R129_SUMMARY.interpretationClaimAuthorizedCount).toBe(0);
    expect(R129_SUMMARY.productionCopyAuthorizedCount).toBe(0);

    expect(
      R129_STRENGTH_EXPLANATION_PRIMITIVES.every(
        (row) =>
          row.authorizesNumericWeight === false &&
          row.authorizesAggregation === false &&
          row.authorizesFinalStrength === false &&
          row.authorizesInterpretationClaim === false &&
          row.authorizesProductionCopy === false,
      ),
    ).toBe(true);
  });

  it('rejects hidden-classifier explanation shortcuts', () => {
    for (const shortcut of [
      'DE_SHI_THEREFORE_STRONG',
      'SHI_SHI_THEREFORE_WEAK',
      'ONE_ROOT_THEREFORE_STRONG',
      'OUTPUT_THEREFORE_WEAKER',
      'ROOT_QUALITY_THEREFORE_NUMERIC_WEIGHT',
      'SUPPORT_ACCUMULATION_THEREFORE_SUPPORT_SCORE',
      'LOCAL_CHAIN_ORDER_THEREFORE_GLOBAL_PRECEDENCE',
      'EXPLANATION_PRIMITIVE_THEREFORE_FINAL_LABEL',
    ]) {
      expect(R129_REJECTED_EXPLANATION_SHORTCUTS).toContain(shortcut);
    }
  });

  it('preserves the research-only authority boundary', () => {
    expect(R129_AUTHORITY).toEqual({
      status:
        'RESEARCH_NONNUMERIC_STRENGTH_EXPLANATION_PRIMITIVE_INVENTORY_COMPLETE',
      researchOnly: true,
      explanationVocabularyEstablishedBounded: true,
      seasonExplanationPrimitivesAvailable: true,
      rootPresenceQualityPrimitivesAvailable: true,
      peerResourceDistinctSupportPrimitivesAvailable: true,
      outputWealthControlDistinctPrimitivesAvailable: true,
      localRelationChainPrimitivesAvailable: true,
      sourcePolicyBoundaryPrimitivesAvailable: true,
      uncertaintyAntiDeterminismPrimitivesAvailable: true,
      numericStrengthModelAuthorized: false,
      primitiveAggregationRuleAuthorized: false,
      finalQiangRuoClassifierAuthorized: false,
      finalWangShuaiClassifierAuthorized: false,
      userFacingReadingCopyAuthorized: false,
      interpretationClaimEmissionAuthorized: false,
      automaticAuthorityAdmissionAuthorized: false,
      automaticEngineAdmissionAuthorized: false,
      previewPromotionAuthorized: false,
      productionAuthorityPromoted: false,
    });
  });
});
