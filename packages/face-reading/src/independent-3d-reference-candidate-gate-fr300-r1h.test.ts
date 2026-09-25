import { describe, expect, it } from 'vitest';
import { FR293_PRODUCT_COLUMN_MAP } from './rgb-selfie-product-column-map-fr293.js';
import {
  FR300_R1H_CANDIDATES,
  FR300_R1H_CURRENT_GATE,
  summarizeFR300R1HCandidateGate,
} from './independent-3d-reference-candidate-gate-fr300-r1h.js';

describe('FR300-R1H independent 3D candidate gate', () => {
  it('keeps every current replacement candidate out of FR300-R2', () => {
    expect(FR300_R1H_CANDIDATES).toHaveLength(8);
    expect(
      FR300_R1H_CANDIDATES.filter(
        (candidate) => candidate.fr300R2Eligible,
      ),
    ).toHaveLength(0);

    expect(
      summarizeFR300R1HCandidateGate().fr300R2Status,
    ).toBe(
      'blocked_no_current_candidate_satisfies_technical_and_rights_gates',
    );
  });

  it('separates technically strong but non-commercial datasets from permissive-rights technical blockers', () => {
    expect(
      FR300_R1H_CURRENT_GATE
        .technicallyStrongButRightsBlocked,
    ).toEqual([
      'three_d_wide_faces',
      'florence_superface',
      'headspace',
      'facescape',
      'siat_3dfe',
    ]);

    expect(
      FR300_R1H_CURRENT_GATE
        .permissiveRightsButTechnicalOrConsentBlocked,
    ).toEqual(['rap3df_v2', 'rap3df_v1']);
  });

  it('does not infer dataset commercial permission from article open-access status', () => {
    for (const id of [
      'three_d_wide_faces',
      'florence_superface',
      'headspace',
      'facescape',
      'siat_3dfe',
    ] as const) {
      const candidate = FR300_R1H_CANDIDATES.find(
        (item) => item.id === id,
      );
      expect(candidate).toBeDefined();
      expect(candidate?.productDevelopmentPermission).toBe(
        'blocked',
      );
      expect(candidate?.fr300R2Eligible).toBe(false);
    }
  });

  it('keeps RAP3DF V2 blocked by FR300-R1G metric evidence', () => {
    const candidate = FR300_R1H_CANDIDATES.find(
      (item) => item.id === 'rap3df_v2',
    );

    expect(candidate?.rightsState).toBe('commercial_allowed');
    expect(candidate?.metricGeometry).toBe('blocked');
    expect(candidate?.technicalBlockers).toContain(
      'fr300_r1g_creator_pipeline_metric_conflict',
    );
    expect(candidate?.fr300R2Eligible).toBe(false);
  });

  it('keeps RAP3DF V1 as the first permissive-rights technical qualification target rather than auto-promoting it', () => {
    const candidate = FR300_R1H_CANDIDATES.find(
      (item) => item.id === 'rap3df_v1',
    );

    expect(candidate?.rightsState).toBe('commercial_allowed');
    expect(candidate?.metricGeometry).toBe('unresolved');
    expect(candidate?.fr300R2Eligible).toBe(false);
    expect(
      FR300_R1H_CURRENT_GATE.nextEvidencePriority[0],
    ).toBe('rap3df_v1_exact_metric_artifact_qualification');
  });

  it('preserves product materialization at 18/29', () => {
    expect(
      FR293_PRODUCT_COLUMN_MAP.filter(
        (candidate) =>
          candidate.implementationState ===
            'canonical_extractor_materialized',
      ),
    ).toHaveLength(18);
  });
});
