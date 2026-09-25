import { describe, expect, it } from 'vitest';
import { FR293_PRODUCT_COLUMN_MAP } from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R1R_ZC_CANDIDATES,
  FR300_R1R_ZC_COST_POLICY,
  FR300_R1R_ZC_CURRENT_GATE,
  assertFR300R1RZCZeroCostMetric3DContract,
} from './zero-cost-metric-3d-qualification-fr300-r1r-zc.js';

describe('FR300-R1R-ZC zero-cost-first metric 3D qualification', () => {
  it('forbids paid acquisition without separate explicit authority', () => {
    expect(FR300_R1R_ZC_COST_POLICY.policy).toBe('zero_cost_first');
    expect(FR300_R1R_ZC_COST_POLICY.paidSpendAuthorized).toBe(false);
    expect(
      FR300_R1R_ZC_COST_POLICY.paidPurchaseRequiresSeparateExplicitAuthority,
    ).toBe(true);
    expect(FR300_R1R_ZC_CURRENT_GATE.authority.paidAcquisitionAuthorized).toBe(
      false,
    );
  });

  it('puts the source-bound zero-cost MINDS-Libras candidate first', () => {
    const minds = FR300_R1R_ZC_CANDIDATES.find(
      (candidate) => candidate.id === 'minds_libras_rgbd',
    );
    expect(minds).toMatchObject({
      costState: 'zero_cost_public',
      rightsState: 'commercial_compatible_license_verified',
      metricState: 'metric_face_geometry_source_bound',
      paired2D: 'source_bound',
      participantState: 'commercial_product_development_unresolved',
      disposition: 'qualify_zero_cost_next',
      fr299Eligible: false,
      fr300R2Eligible: false,
    });
    expect(FR300_R1R_ZC_CURRENT_GATE.zeroCostQualificationQueue).toEqual([
      'minds_libras_rgbd',
    ]);
  });

  it('does not mistake UL-DD stereo MP4 release for metric depth ground truth', () => {
    const ulDd = FR300_R1R_ZC_CANDIDATES.find(
      (candidate) => candidate.id === 'ul_dd_zed2',
    );
    expect(ulDd).toMatchObject({
      costState: 'zero_cost_on_request',
      rightsState: 'commercial_r_and_d_verified',
      metricState: 'metric_survivability_unresolved',
      disposition: 'hold_zero_cost_technical',
      fr299Eligible: false,
    });
  });

  it('keeps AST-Face fail-closed on commercial product scope and metric contract', () => {
    const ast = FR300_R1R_ZC_CANDIDATES.find(
      (candidate) => candidate.id === 'ast_face_public_and_controlled',
    );
    expect(ast).toMatchObject({
      costState: 'zero_cost_on_request',
      rightsState: 'commercial_product_scope_unresolved',
      metricState: 'metric_contract_unresolved',
      disposition: 'hold_zero_cost_rights',
      fr299Eligible: false,
    });
  });

  it('defers the former paid/commercial-license shortlist', () => {
    expect(FR300_R1R_ZC_COST_POLICY.paidCandidatesDeferred).toEqual([
      'bfm2009_example_scans',
      'nexdata_vietnam_200_3d_liveness',
      'nexdata_40_3d_2d_liveness',
    ]);
    const paid = new Set<string>(
      FR300_R1R_ZC_COST_POLICY.paidCandidatesDeferred,
    );
    expect(
      FR300_R1R_ZC_CURRENT_GATE.zeroCostQualificationQueue.some((id) =>
        paid.has(id),
      ),
    ).toBe(false);
  });

  it('keeps FR299, FR300-R2 and product materialization fail-closed', () => {
    expect(FR300_R1R_ZC_CURRENT_GATE.fr299EligibleCandidateCount).toBe(0);
    expect(FR300_R1R_ZC_CURRENT_GATE.fr300R2EligibleCandidateCount).toBe(0);
    expect(
      FR293_PRODUCT_COLUMN_MAP.filter(
        (candidate) =>
          candidate.implementationState === 'canonical_extractor_materialized',
      ),
    ).toHaveLength(18);
    expect(() => assertFR300R1RZCZeroCostMetric3DContract()).not.toThrow();
  });
});
