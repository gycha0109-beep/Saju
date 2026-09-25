import { describe, expect, it } from 'vitest';
import { FR293_PRODUCT_COLUMN_MAP } from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R1Q_CANDIDATES,
  FR300_R1Q_CURRENT_GATE,
  assertFR300R1QCommercialMetric3DRefreshContract,
} from './independent-3d-commercial-candidate-refresh-fr300-r1q.js';

describe('FR300-R1Q commercial-compatible metric 3D refresh', () => {
  it('expands the screened inventory to twenty candidates without auto-promoting any candidate', () => {
    expect(FR300_R1Q_CANDIDATES).toHaveLength(20);
    expect(
      FR300_R1Q_CANDIDATES.filter(
        (candidate) => candidate.fr299Eligible,
      ),
    ).toHaveLength(0);
    expect(
      FR300_R1Q_CANDIDATES.filter(
        (candidate) => candidate.fr300R2Eligible,
      ),
    ).toHaveLength(0);
  });

  it('keeps both RAP3DF releases terminally rejected from the metric path', () => {
    for (const id of ['rap3df_v1', 'rap3df_v2']) {
      const candidate = FR300_R1Q_CANDIDATES.find(
        (item) => item.id === id,
      );
      expect(candidate).toMatchObject({
        geometryState: 'metric_blocked',
        disposition: 'terminal_reject',
        fr299Eligible: false,
        fr300R2Eligible: false,
      });
    }
  });

  it('uses rights-first cheap rejection for explicit noncommercial or research-only datasets', () => {
    const blocked = FR300_R1Q_CANDIDATES.filter(
      (candidate) =>
        candidate.rightsState === 'noncommercial_blocked' ||
        candidate.rightsState === 'research_only_blocked',
    );
    expect(blocked.length).toBeGreaterThanOrEqual(8);
    expect(
      blocked.every(
        (candidate) => candidate.disposition === 'terminal_reject',
      ),
    ).toBe(true);
  });

  it('shortlists only commercial-path candidates for the next qualification pass', () => {
    expect(FR300_R1Q_CURRENT_GATE.qualifyNext).toEqual([
      'bfm2009_example_scans',
      'nexdata_vietnam_200_3d_liveness',
      'nexdata_40_3d_2d_liveness',
    ]);

    for (const id of FR300_R1Q_CURRENT_GATE.qualifyNext) {
      const candidate = FR300_R1Q_CANDIDATES.find(
        (item) => item.id === id,
      );
      expect([
        'commercial_verified',
        'commercial_license_path',
      ]).toContain(candidate?.rightsState);
      expect(candidate?.fr299Eligible).toBe(false);
    }
  });

  it('separates dataset commercial rights from participant product-development scope', () => {
    const nexdata = FR300_R1Q_CANDIDATES.find(
      (candidate) =>
        candidate.id === 'nexdata_vietnam_200_3d_liveness',
    );
    expect(nexdata?.rightsState).toBe('commercial_verified');
    expect(nexdata?.participantScope).toBe('unresolved');
    expect(nexdata?.fr299Eligible).toBe(false);
  });

  it('supersedes stale RAP3DF priorities without rewriting FR300-R1H history', () => {
    expect(FR300_R1Q_CURRENT_GATE.staleR1HPrioritiesSuperseded).toBe(
      true,
    );
    expect(
      FR300_R1Q_CURRENT_GATE.nextEvidencePriority,
    ).not.toContain('rap3df_v1_exact_metric_artifact_qualification');
    expect(
      FR300_R1Q_CURRENT_GATE.nextEvidencePriority,
    ).not.toContain('rap3df_v2_exact_mendeley_v4_artifact_resolution');
  });

  it('passes the frozen R1Q contract and preserves 18/29 materialization', () => {
    expect(() =>
      assertFR300R1QCommercialMetric3DRefreshContract(),
    ).not.toThrow();
    expect(
      FR293_PRODUCT_COLUMN_MAP.filter(
        (candidate) =>
          candidate.implementationState ===
            'canonical_extractor_materialized',
      ),
    ).toHaveLength(18);
  });
});
