import { describe, expect, it } from 'vitest';
import {
  EAR_CROSS_REGION_AUDIT_FR311M,
  EAR_DIRECT_CROSS_REGION_EVIDENCE_FR311M,
} from './traditional-ear-cross-region-evidence-fr311m.js';
import {
  queryFaceEvidenceFR311J,
} from './traditional-face-evidence-query-fr311j.js';
import {
  FR311N_QUERY_AUTHORITY_BOUNDARY,
  FR311N_QUERY_SUMMARY,
  assertFaceEvidenceQueryFR311N,
  queryFaceEvidenceFR311N,
} from './traditional-face-evidence-query-fr311n.js';
import {
  FR311N_OUTPUT_AUTHORITY_BOUNDARY,
  assertTraditionalFaceReadingOutputFR311N,
  buildTraditionalFaceReadingOutputFR311N,
} from './traditional-face-reading-output-fr311n.js';

describe('FR311N face-wide ear cross-region integration', () => {
  it('inherits all 21 FR311J lenses and integrates only FR311M-owned direct evidence', () => {
    expect(FR311N_QUERY_SUMMARY).toMatchObject({
      inheritedLensCount: 21,
      earDirectEvidenceRecords: 22,
      reusedFR311KEvidenceRecords: 4,
      exactRelationKeyRequired: true,
      exactCombinationKeyRequired: true,
    });
    expect(
      EAR_DIRECT_CROSS_REGION_EVIDENCE_FR311M.filter(
        (item) => item.evidenceOwner === 'fr311m',
      ).length,
    ).toBe(22);
  });

  it('returns an ear relation only when the exact relation key and lens topic both match', () => {
    const exact = queryFaceEvidenceFR311N({
      lensKey: 'livelihood',
      relationKeys: ['ear_eye.ear_higher_than_eye'],
    });
    expect(exact.status).toBe('direct_source_relation');
    expect(exact.earCrossRegionEvidenceIds).toEqual([
      'fr311m.relation.ear_higher_than_eye.634',
    ]);
    expect(exact.earRelationKeys).toEqual(['ear_eye.ear_higher_than_eye']);

    const wrongLens = queryFaceEvidenceFR311N({
      lensKey: 'wealth',
      relationKeys: ['ear_eye.ear_higher_than_eye'],
    });
    expect(wrongLens.earCrossRegionEvidenceIds).toEqual([]);
    expect(wrongLens.earRelationKeys).toEqual([]);
  });

  it('returns every approved witness under one exact ear relation key', () => {
    const result = queryFaceEvidenceFR311N({
      lensKey: 'longevity',
      relationKeys: ['cheekbone_ear.cheekbone_connects_into_ear'],
    });
    expect(result.status).toBe('direct_source_relation');
    expect(result.earCrossRegionEvidenceIds).toEqual([
      'fr311m.relation.cheekbone_into_ear.631',
      'fr311m.relation.cheekbone_into_ear.633',
    ]);
  });

  it('returns direct ear combinations without synthesizing them from independent features', () => {
    const exact = queryFaceEvidenceFR311N({
      lensKey: 'traditional_auspice',
      combinationKeys: ['ear_official.complete_above_brow_bundle'],
    });
    expect(exact.status).toBe('direct_source_combination');
    expect(exact.earCrossRegionEvidenceIds).toEqual([
      'fr311m.combo.ear_official_above_brow.631',
      'fr311m.combo.ear_official_above_brow.632',
    ]);
    expect(exact.earCombinationKeys).toEqual([
      'ear_official.complete_above_brow_bundle',
    ]);

    const noKey = queryFaceEvidenceFR311N({
      lensKey: 'traditional_auspice',
    });
    expect(noKey.earCrossRegionEvidenceIds).toEqual([]);
    expect(noKey.earCombinationKeys).toEqual([]);
  });

  it('keeps FR311K-owned reuse evidence on the existing FR311J path and de-duplicates ids', () => {
    const relation = queryFaceEvidenceFR311N({
      lensKey: 'wealth',
      relationKeys: [
        'ear_mouth.earlobe_toward_mouth',
        'ear_mouth.earlobe_toward_mouth',
      ],
    });
    expect(relation.crossRegionEvidenceIds).toEqual([
      'fr311k.relation.earlobe_toward_mouth',
      'fr311m.relation.earlobe_toward_mouth.634a',
    ]);
    expect(new Set(relation.crossRegionEvidenceIds).size).toBe(
      relation.crossRegionEvidenceIds.length,
    );

    const reusedCombination = queryFaceEvidenceFR311N({
      lensKey: 'wealth',
      combinationKeys: ['whole_face.shape_surplus_with_red_lip_white_teeth'],
    });
    expect(reusedCombination.earCrossRegionEvidenceIds).toEqual([]);
    expect(reusedCombination.crossRegionEvidenceIds).toEqual([
      'fr311k.combination.shape_surplus_lip_teeth_whole_face',
    ]);
  });

  it('does not promote named-form, descriptive, uncertain or excluded audit candidates', () => {
    const nonDirectIds = EAR_CROSS_REGION_AUDIT_FR311M
      .filter(
        (item) =>
          item.adjudication !== 'direct_cross_region_relation' &&
          item.adjudication !== 'direct_cross_region_combination',
      )
      .map((item) => item.candidateId);

    const result = queryFaceEvidenceFR311N({
      lensKey: 'traditional_auspice',
      relationKeys: nonDirectIds,
      combinationKeys: nonDirectIds,
    });

    expect(result.earCrossRegionEvidenceIds).toEqual([]);
  });

  it('preserves FR311J behavior when no FR311M exact key matches', () => {
    const query = {
      lensKey: 'wealth' as const,
      combinationKeys: ['whole_face.eye_mouth_lip_rich_intelligent'],
    };
    const base = queryFaceEvidenceFR311J(query);
    const integrated = queryFaceEvidenceFR311N(query);

    expect(integrated.status).toBe(base.status);
    expect(integrated.namedEvidenceIds).toEqual(base.namedEvidenceIds);
    expect(integrated.directRuleIds).toEqual(base.directRuleIds);
    expect(integrated.combinationRuleIds).toEqual(base.combinationRuleIds);
    expect(integrated.namedFormContextIds).toEqual(base.namedFormContextIds);
    expect(integrated.earCrossRegionEvidenceIds).toEqual([]);
    expect(integrated.crossRegionEvidenceIds).toEqual(base.crossRegionEvidenceIds);
  });

  it('preserves conflicting direct ear evidence without priority, voting or cancellation', () => {
    const result = queryFaceEvidenceFR311N({
      lensKey: 'traditional_auspice',
      relationKeys: ['cheek_ear.cheek_visible_behind_ear'],
      combinationKeys: ['ear_official.complete_above_brow_bundle'],
    });

    expect(result.status).toBe('source_conflict');
    expect(result.challengingEvidenceIds).toContain(
      'fr311m.relation.ear_behind_heavy_cheek.631',
    );
    expect(result.favorableEvidenceIds).toContain(
      'fr311m.combo.ear_official_above_brow.631',
    );
    expect(result.sourcePriorityAuthorized).toBe(false);
    expect(result.sourceCountWeightingAuthorized).toBe(false);
    expect(result.reinforcementAuthorized).toBe(false);
    expect(result.cancellationAuthorized).toBe(false);
  });

  it('renders FR311M evidence in the face-wide output with source text and doctrine boundaries', () => {
    const output = buildTraditionalFaceReadingOutputFR311N({
      lensKey: 'career',
      relationKeys: ['ear_face.ear_whiter_than_face'],
    });

    expect(output.contractVersion).toBe('fr311n-v1');
    expect(output.outputStatus).toBe('direct_relation');
    expect(output.combinationAssessment.earDirectCrossRegionEvidenceIds).toEqual([
      'fr311m.relation.ear_whiter_than_face.634',
    ]);
    expect(output.evidenceSections.favorable).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          evidenceId: 'fr311m.relation.ear_whiter_than_face.634',
          kind: 'cross_region_direct',
          region: 'cross_region',
          sourceExpression: '耳白於面，名聞四方',
          historicalTraditionalDoctrineOnly: true,
          modernScientificFactAuthorized: false,
          productPredictionAuthorized: false,
        }),
      ]),
    );
    expect(output.scoreAuthorized).toBe(false);
    expect(output.relationInferenceAuthorized).toBe(false);
    expect(output.combinationInferenceAuthorized).toBe(false);
    expect(output.healthDiagnosisAuthorized).toBe(false);
    expect(output.lifespanPredictionAuthorized).toBe(false);
  });

  it('keeps every query/output authority boundary closed', () => {
    assertFaceEvidenceQueryFR311N();
    assertTraditionalFaceReadingOutputFR311N();

    for (const [key, flag] of Object.entries(FR311N_QUERY_AUTHORITY_BOUNDARY)) {
      expect(flag, key).toBe(false);
    }
    for (const [key, flag] of Object.entries(FR311N_OUTPUT_AUTHORITY_BOUNDARY)) {
      expect(flag, key).toBe(false);
    }
  });
});
