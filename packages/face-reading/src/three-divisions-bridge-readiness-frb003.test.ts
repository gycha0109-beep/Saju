import { describe, expect, it } from 'vitest';
import {
  FRB003_T2_CONCEPT_REGISTRY_REF,
  THREE_DIVISIONS_BRIDGE_READINESS_AUDIT_FRB003,
  assertThreeDivisionsBridgeReadinessAuditFRB003,
  buildThreeDivisionsBridgeReadinessAuditFRB003,
} from './three-divisions-bridge-readiness-frb003.js';

describe('FRB003 Three-Divisions bridge readiness', () => {
  it('keeps the four T2 source-qualified concepts separate', () => {
    const audit = buildThreeDivisionsBridgeReadinessAuditFRB003();

    expect(audit.traditionalRegistryRef)
      .toBe(FRB003_T2_CONCEPT_REGISTRY_REF);
    expect(audit.engineBaseline).toBe('FR286');
    expect(audit.conceptCount).toBe(4);
    expect(audit.concepts.map((entry) => entry.conceptKey)).toEqual([
      'trad.face.mayi_1925.santing.contiguous',
      'trad.face.shenxiang_gujin.santing.contiguous',
      'trad.face.shenyi_fu_gujin.santing.noncontiguous',
      'trad.face.liuzhuang.santing.candidate',
    ]);
    expect(audit.crossConceptPolicy).toEqual({
      geometryEqualityImpliesSemanticIdentity: false,
      universalThreeDivisionsFormulaIssued: false,
      globalSantingSancaiSanzhuAliasIssued: false,
      sourceVariantSelectedToFitEngineGeometry: false,
    });
  });

  it('records the exact source-qualified anchor sets without provider landmarks', () => {
    const [mayi, shenxiang, shenyi, liuzhuang] =
      THREE_DIVISIONS_BRIDGE_READINESS_AUDIT_FRB003.concepts;

    expect(mayi!.requiredAnchors).toEqual([
      'hairline', 'brow', 'zhuntou', 'dige',
    ]);
    expect(shenxiang!.requiredAnchors).toEqual([
      'hairline', 'brow', 'zhuntou', 'dige',
    ]);
    expect(shenyi!.requiredAnchors).toEqual([
      'hairline', 'yintang', 'shangen', 'zhuntou', 'renzhong', 'dige',
    ]);
    expect(liuzhuang!.requiredAnchors).toEqual([
      'hairline', 'shangen', 'zhuntou', 'renzhong', 'dige',
    ]);

    for (const concept of
      THREE_DIVISIONS_BRIDGE_READINESS_AUDIT_FRB003.concepts) {
      expect(concept.anchorReadiness.every(
        (entry) =>
          entry.providerLandmarkBindingAuthorized === false
          && entry.traditionalEquivalenceAuthorized === false,
      )).toBe(true);
    }
  });

  it('recognizes FR286 hairline and lower-face capability without inventing anchor equivalence', () => {
    const mayi =
      THREE_DIVISIONS_BRIDGE_READINESS_AUDIT_FRB003.concepts[0]!;

    expect(mayi.anchorReadiness.find(
      (entry) => entry.anchor === 'hairline',
    )).toMatchObject({
      readiness: 'feature_not_materialized',
      candidateFeatureKey: 'forehead.visible_hairline_boundary',
      candidateImplementationState: 'extractor_required',
      traditionalEquivalenceAuthorized: false,
    });

    expect(mayi.anchorReadiness.find(
      (entry) => entry.anchor === 'dige',
    )).toMatchObject({
      readiness: 'bounded_candidate_not_equivalent',
      candidateFeatureKey: 'chin_lower_face.visible_contour',
      candidateImplementationState: 'canonical_extractor_materialized',
      traditionalEquivalenceAuthorized: false,
    });
  });

  it('rejects convenient nose and eyebrow morphology as Three-Divisions vertical-anchor proxies', () => {
    const concepts =
      THREE_DIVISIONS_BRIDGE_READINESS_AUDIT_FRB003.concepts;
    const allAnchors = concepts.flatMap((entry) => entry.anchorReadiness);

    expect(allAnchors.find((entry) => entry.anchor === 'brow')
      ?.rejectedProxyFeatureKeys)
      .toContain('eyebrow.span_arch_tail_orientation');
    expect(allAnchors.find((entry) => entry.anchor === 'shangen')
      ?.rejectedProxyFeatureKeys)
      .toContain('nose.bridge_centerline_deviation');
    expect(allAnchors.find((entry) => entry.anchor === 'zhuntou')
      ?.rejectedProxyFeatureKeys)
      .toContain('nose.tip_contour_circularity');
    expect(allAnchors.find((entry) => entry.anchor === 'renzhong')
      ?.rejectedProxyFeatureKeys)
      .toContain('mouth.philtrum_length_width');
  });

  it('routes current blockers to the owning tracks instead of opening validation work', () => {
    const [mayi, shenxiang, shenyi, liuzhuang] =
      THREE_DIVISIONS_BRIDGE_READINESS_AUDIT_FRB003.concepts;

    expect(mayi!.gaps.some((gap) =>
      gap.owner === 'face-observation-engine')).toBe(true);
    expect(mayi!.gaps.some((gap) =>
      gap.owner === 'face-traditional-research'
      && gap.code === 'metric_contract_missing')).toBe(true);

    expect(shenxiang!.gaps.some((gap) =>
      gap.owner === 'face-traditional-research'
      && gap.code === 'direct_source_witness_gap')).toBe(true);
    expect(shenxiang!.gaps.some((gap) =>
      gap.owner === 'face-bridge'
      && gap.code === 'metric_binding_missing')).toBe(true);

    expect(shenyi!.gaps.some((gap) =>
      gap.owner === 'face-traditional-research'
      && gap.code === 'primary_lineage_witness_gap')).toBe(true);
    expect(shenyi!.gaps.some((gap) =>
      gap.owner === 'face-traditional-research'
      && gap.code === 'runtime_methodology_missing')).toBe(true);

    expect(liuzhuang!.gaps.some((gap) =>
      gap.owner === 'face-traditional-research'
      && gap.code === 'direct_source_witness_gap')).toBe(true);

    for (const concept of [mayi, shenxiang, shenyi, liuzhuang]) {
      expect(concept!.observationReadiness).toBe('blocked');
      expect(concept!.overallBridgeReadiness).toBe('blocked');
      expect(concept!.readyForRuleExecution).toBe(false);
    }
  });

  it('keeps threshold, balance tolerance, claim and production authority closed', () => {
    const audit = THREE_DIVISIONS_BRIDGE_READINESS_AUDIT_FRB003;

    expect(audit.coordinateFrameBoundary).toEqual({
      upstreamState:
        'research_successor_coordinate_frame_selected_projection_and_anchor_execution_blocked',
      bridgeProjectionIssued: false,
      crossFrameCollapseAllowed: false,
    });
    expect(Object.values(audit.authorityBoundary).every(
      (value) => value === false,
    )).toBe(true);

    expect(() =>
      assertThreeDivisionsBridgeReadinessAuditFRB003(audit))
      .not.toThrow();
  });
});
