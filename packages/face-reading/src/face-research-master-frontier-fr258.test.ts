import { describe, expect, it } from 'vitest';
import {
  FACE_RESEARCH_MASTER_FRONTIER_FR258,
  FR258_FACE_RESEARCH_FRONTIER_SLICES,
  assertFaceResearchMasterFrontierFR258,
  assertIssuedFaceResearchMasterFrontierFR258,
  issueFaceResearchMasterFrontierFR258,
} from './face-research-master-frontier-fr258.js';

describe('FR258 face-research master frontier', () => {
  it('materializes the seven-axis audit and preserves active parallel lanes', () => {
    const issued = issueFaceResearchMasterFrontierFR258();
    expect(() => assertIssuedFaceResearchMasterFrontierFR258(issued)).not.toThrow();
    expect(issued.auditAxes).toEqual([
      'source_authority',
      'concept_authority',
      'neutral_observable',
      'metric',
      'empirical_evidence',
      'metric_concept_mapping',
      'semantic_claim',
    ]);
    expect(issued.parallelActiveSlices).toEqual([
      'five_officers_intake_fang_da',
      'five_officers_inspection_xi_chang',
    ]);
    expect(issued.slices).toBe(FR258_FACE_RESEARCH_FRONTIER_SLICES);
  });

  it('keeps Fang/Da and Xi/Chang active without claiming semantic admission', () => {
    const issued = issueFaceResearchMasterFrontierFR258();
    const byKey = new Map(issued.slices.map((entry) => [entry.sliceKey, entry] as const));

    const fang = byKey.get('five_officers_intake_fang_da')!;
    expect(fang.lane).toBe('active_empirical_lane_do_not_duplicate');
    expect(fang.axes.metric.state).toBe('established_research_authority');
    expect(fang.axes.empirical_evidence.state).toBe('blocked_pending_evidence');
    expect(fang.axes.metric_concept_mapping.state).toBe('blocked_pending_evidence');
    expect(fang.axes.semantic_claim.state).toBe('blocked_pending_evidence');
    expect(fang.handoffReady).toBe(false);

    const xiChang = byKey.get('five_officers_inspection_xi_chang')!;
    expect(xiChang.lane).toBe('active_precollection_lane_do_not_duplicate');
    expect(xiChang.axes.metric.state).toBe('established_research_authority');
    expect(xiChang.axes.empirical_evidence.state).toBe('blocked_pending_evidence');
    expect(xiChang.axes.metric_concept_mapping.state).toBe('blocked_pending_evidence');
    expect(xiChang.handoffReady).toBe(false);
  });

  it('selects Three Divisions as the non-overlapping next research frontier', () => {
    const issued = issueFaceResearchMasterFrontierFR258();
    expect(issued.recommendedNextFrontier.sliceKey).toBe('three_divisions_mayi');

    const threeDivisions = issued.slices.find(
      (entry) => entry.sliceKey === 'three_divisions_mayi',
    )!;
    expect(threeDivisions.lane).toBe('selected_non_overlapping_next_frontier');
    expect(threeDivisions.axes.source_authority.state).toBe('partial_research_authority');
    expect(threeDivisions.axes.neutral_observable.state).toBe('partial_research_authority');
    expect(threeDivisions.axes.metric.state).toBe('blocked_pending_evidence');
    expect(threeDivisions.axes.empirical_evidence.state).toBe('missing_governed_authority');
    expect(threeDivisions.handoffReady).toBe(false);
  });

  it('keeps later systems queued or deferred rather than inventing readiness', () => {
    const issued = issueFaceResearchMasterFrontierFR258();
    const byKey = new Map(issued.slices.map((entry) => [entry.sliceKey, entry] as const));

    expect(byKey.get('six_fus_lineage_maps')?.lane).toBe('queued_research_frontier');
    expect(byKey.get('six_fus_lineage_maps')?.axes.metric.state).toBe(
      'missing_governed_authority',
    );
    expect(byKey.get('twelve_palaces')?.axes.semantic_claim.state).toBe(
      'missing_governed_authority',
    );
    expect(byKey.get('thirteen_positions_family')?.axes.concept_authority.state).toBe(
      'missing_governed_authority',
    );

    const hundredYear = byKey.get('hundred_year_age_map')!;
    expect(hundredYear.lane).toBe('deferred');
    expect(Object.values(hundredYear.axes).every((axis) => axis.state === 'deferred')).toBe(true);
  });

  it('rejects authority widening and active-lane duplication', () => {
    const issued = issueFaceResearchMasterFrontierFR258();

    expect(() => assertFaceResearchMasterFrontierFR258({
      ...issued,
      authorityBoundary: {
        ...issued.authorityBoundary,
        metricBindingPromoted: true,
      },
    } as never)).toThrow(/authority boundary widened/);

    expect(() => assertFaceResearchMasterFrontierFR258({
      ...issued,
      recommendedNextFrontier: {
        ...issued.recommendedNextFrontier,
        sliceKey: 'five_officers_intake_fang_da',
      },
    } as never)).toThrow();
  });

  it('rejects copied-but-unissued master-frontier objects', () => {
    const issued = issueFaceResearchMasterFrontierFR258();
    expect(() => assertIssuedFaceResearchMasterFrontierFR258({
      ...issued,
    })).toThrow(/unissued master frontier/);

    expect(FACE_RESEARCH_MASTER_FRONTIER_FR258.watchtowerTrack).toBe('face-research');
  });
});
