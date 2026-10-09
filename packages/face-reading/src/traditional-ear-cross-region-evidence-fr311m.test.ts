import { describe, expect, it } from 'vitest';
import {
  EAR_CROSS_REGION_AUDIT_FR311M,
  EAR_CROSS_REGION_SUMMARY_FR311M,
  EAR_DIRECT_CROSS_REGION_EVIDENCE_FR311M,
  resolveEarCrossRegionEvidenceFR311M,
} from './traditional-ear-cross-region-evidence-fr311m.js';
import {
  MOUTH_PHILTRUM_DIRECT_CROSS_REGION_EVIDENCE_FR311K,
} from './traditional-mouth-philtrum-cross-region-evidence-fr311k.js';

describe('FR311M ear cross-region direct relation and combination audit', () => {
  it('audits the approved 631-634 corpus in both directions with explicit adjudication counts', () => {
    expect(EAR_CROSS_REGION_SUMMARY_FR311M).toMatchObject({
      candidateCount: 48,
      directRelationCandidates: 15,
      directCombinationCandidates: 11,
      namedFormContexts: 12,
      descriptiveCompanions: 4,
      uncertainCandidates: 4,
      excludedCandidates: 2,
      directEvidenceRecords: 26,
      uniqueRelationKeys: 11,
      uniqueCombinationKeys: 10,
    });

    expect(new Set(EAR_CROSS_REGION_AUDIT_FR311M.map((item) => item.sourceVolume))).toEqual(
      new Set([631, 632, 633, 634]),
    );
  });

  it('keeps every non-direct candidate non-generalizable', () => {
    const nonDirect = EAR_CROSS_REGION_AUDIT_FR311M.filter(
      (item) =>
        item.adjudication !== 'direct_cross_region_relation' &&
        item.adjudication !== 'direct_cross_region_combination',
    );
    expect(nonDirect.length).toBe(22);
    expect(nonDirect.every((item) => item.generalizationAuthorized === false)).toBe(true);
    expect(
      nonDirect.some((item) => item.candidateId === 'fr311m.audit.634.fire_ear_shangen_wochan'),
    ).toBe(true);
  });

  it('keeps named-form ear/eye/brow/shangen contexts out of direct evidence', () => {
    const namedIds = new Set(
      EAR_CROSS_REGION_AUDIT_FR311M
        .filter((item) => item.adjudication === 'named_form_context')
        .map((item) => item.candidateId),
    );
    expect(namedIds.size).toBe(12);
    expect(
      EAR_DIRECT_CROSS_REGION_EVIDENCE_FR311M.some((item) => namedIds.has(item.candidateId)),
    ).toBe(false);
  });

  it('does not promote punctuation-dependent ear/brow and eye/ear phrases', () => {
    for (const candidateId of [
      'fr311m.audit.634.one_inch_above_brow_uncertain',
      'fr311m.audit.634.eye_can_see_ear_uncertain',
      'fr311m.audit.633.calling_phoenix_eye_ear_phrase',
      'fr311m.audit.633.noble_ear_face_forehead_boundary',
    ]) {
      const candidate = EAR_CROSS_REGION_AUDIT_FR311M.find((item) => item.candidateId === candidateId);
      expect(candidate?.adjudication).toBe('phrase_boundary_uncertain');
      expect(candidate?.generalizationAuthorized).toBe(false);
      expect(
        EAR_DIRECT_CROSS_REGION_EVIDENCE_FR311M.some((item) => item.candidateId === candidateId),
      ).toBe(false);
    }
  });

  it('uses the explicit 632 wording rather than upgrading the uncertain 634 brow phrase', () => {
    const result = resolveEarCrossRegionEvidenceFR311M({
      relationKey: 'ear_eyebrow.ear_higher_than_brow',
      topicKeys: ['learning_talent'],
    });
    expect(result.status).toBe('direct_source_relation');
    expect(result.evidence.map((item) => item.candidateId)).toEqual([
      'fr311m.audit.632.ear_higher_than_brow',
    ]);
  });

  it('requires an exact relation key and never infers from independent features', () => {
    const missing = resolveEarCrossRegionEvidenceFR311M({
      topicKeys: ['wealth'],
    });
    expect(missing.status).toBe('unsupported');
    expect(missing.evidence).toEqual([]);

    const exact = resolveEarCrossRegionEvidenceFR311M({
      relationKey: 'ear_mouth.earlobe_toward_mouth',
      topicKeys: ['wealth'],
    });
    expect(exact.status).toBe('direct_source_relation');
    expect(exact.evidence.map((item) => item.evidenceId)).toEqual([
      'fr311m.relation.earlobe_toward_mouth.634a',
      'fr311k.relation.earlobe_toward_mouth',
    ]);
  });

  it('filters shared relation provenance by exact topic without source priority or reinforcement', () => {
    const longevity = resolveEarCrossRegionEvidenceFR311M({
      relationKey: 'ear_mouth.earlobe_toward_mouth',
      topicKeys: ['longevity'],
    });
    const status = resolveEarCrossRegionEvidenceFR311M({
      relationKey: 'ear_mouth.earlobe_toward_mouth',
      topicKeys: ['status'],
    });

    expect(longevity.evidence.map((item) => item.evidenceId)).toEqual([
      'fr311m.relation.earlobe_toward_mouth.634a',
    ]);
    expect(status.evidence.map((item) => item.evidenceId)).toEqual([
      'fr311k.relation.earlobe_toward_mouth',
    ]);
    expect(longevity.sourcePriorityAuthorized).toBe(false);
    expect(longevity.sourceCountWeightingAuthorized).toBe(false);
    expect(longevity.reinforcementAuthorized).toBe(false);
  });

  it('requires an exact combination key', () => {
    const exact = resolveEarCrossRegionEvidenceFR311M({
      combinationKey: 'ear_official.complete_above_brow_bundle',
      topicKeys: ['traditional_auspice'],
    });
    expect(exact.status).toBe('direct_source_combination');
    expect(exact.evidence.map((item) => item.candidateId)).toEqual([
      'fr311m.audit.631.ear_official_high_brow_bundle',
      'fr311m.audit.632.ear_official_above_brow_bundle',
    ]);

    const invented = resolveEarCrossRegionEvidenceFR311M({
      combinationKey: 'ear_brow.independent_features_auto_combo',
    });
    expect(invented.status).toBe('unsupported');
  });

  it('reuses FR311K evidence ids instead of minting duplicate evidence for the same source claim', () => {
    const fr311kIds = new Set(
      MOUTH_PHILTRUM_DIRECT_CROSS_REGION_EVIDENCE_FR311K.map((item) => item.evidenceId),
    );
    expect(EAR_CROSS_REGION_SUMMARY_FR311M.reusedFR311KEvidenceRefs).toEqual([
      'fr311k.combination.shape_surplus_lip_teeth_whole_face',
      'fr311k.combination.five_officials_late_fortune',
      'fr311k.combination.middle_noble',
      'fr311k.relation.earlobe_toward_mouth',
    ]);
    expect(
      EAR_CROSS_REGION_SUMMARY_FR311M.reusedFR311KEvidenceRefs.every((id) => fr311kIds.has(id)),
    ).toBe(true);

    const reusedMouth = EAR_DIRECT_CROSS_REGION_EVIDENCE_FR311M.filter(
      (item) => item.relationKey === 'ear_mouth.earlobe_toward_mouth',
    );
    expect(new Set(reusedMouth.map((item) => item.relationKey)).size).toBe(1);
  });

  it('preserves both cheekbone-to-ear source witnesses under one exact relation key', () => {
    const result = resolveEarCrossRegionEvidenceFR311M({
      relationKey: 'cheekbone_ear.cheekbone_connects_into_ear',
      topicKeys: ['longevity'],
    });
    expect(result.status).toBe('direct_source_relation');
    expect(result.evidence.map((item) => item.candidateId)).toEqual([
      'fr311m.audit.631.cheekbone_into_ear_longevity',
      'fr311m.audit.633.cheekbone_through_ear_longevity',
    ]);
  });

  it('does not accept both a relation key and a combination key in one resolver call', () => {
    const result = resolveEarCrossRegionEvidenceFR311M({
      relationKey: 'ear_eye.ear_higher_than_eye',
      combinationKey: 'ear_star.goldwood_above_brow_eye_bundle',
    });
    expect(result.status).toBe('unsupported');
    expect(result.evidence).toEqual([]);
  });

  it('keeps all safety, prediction, geometry, scoring, priority and product permissions closed', () => {
    for (const candidate of EAR_CROSS_REGION_AUDIT_FR311M) {
      expect(candidate.relationInferenceAuthorized).toBe(false);
      expect(candidate.combinationInferenceAuthorized).toBe(false);
      expect(candidate.neutralGeometryBindingAuthorized).toBe(false);
      expect(candidate.namedFormClassifierAuthorized).toBe(false);
      expect(candidate.modernScientificFactAuthorized).toBe(false);
      expect(candidate.healthDiagnosisAuthorized).toBe(false);
      expect(candidate.lifespanPredictionAuthorized).toBe(false);
      expect(candidate.fertilityPredictionAuthorized).toBe(false);
      expect(candidate.childSexPredictionAuthorized).toBe(false);
      expect(candidate.personalityFactAuthorized).toBe(false);
      expect(candidate.criminalityInferenceAuthorized).toBe(false);
      expect(candidate.productInterpretationAuthorized).toBe(false);
    }

    for (const evidence of EAR_DIRECT_CROSS_REGION_EVIDENCE_FR311M) {
      expect(evidence.relationInferenceAuthorized).toBe(false);
      expect(evidence.combinationInferenceAuthorized).toBe(false);
      expect(evidence.reinforcementAuthorized).toBe(false);
      expect(evidence.cancellationAuthorized).toBe(false);
      expect(evidence.neutralGeometryBindingAuthorized).toBe(false);
      expect(evidence.modernScientificFactAuthorized).toBe(false);
      expect(evidence.healthDiagnosisAuthorized).toBe(false);
      expect(evidence.lifespanPredictionAuthorized).toBe(false);
      expect(evidence.fertilityPredictionAuthorized).toBe(false);
      expect(evidence.childSexPredictionAuthorized).toBe(false);
      expect(evidence.personalityFactAuthorized).toBe(false);
      expect(evidence.criminalityInferenceAuthorized).toBe(false);
      expect(evidence.productInterpretationAuthorized).toBe(false);
    }

    expect(EAR_CROSS_REGION_SUMMARY_FR311M.relationInferenceAuthorized).toBe(false);
    expect(EAR_CROSS_REGION_SUMMARY_FR311M.combinationInferenceAuthorized).toBe(false);
    expect(EAR_CROSS_REGION_SUMMARY_FR311M.sourcePriorityAuthorized).toBe(false);
    expect(EAR_CROSS_REGION_SUMMARY_FR311M.sourceCountWeightingAuthorized).toBe(false);
  });
});
