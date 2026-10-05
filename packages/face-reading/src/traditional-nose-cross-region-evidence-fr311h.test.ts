import { describe, expect, it } from 'vitest';
import {
  FR311H_CROSS_REGION_SUMMARY,
  NOSE_DIRECT_CROSS_REGION_RELATIONS_FR311H,
  NOSE_NAMED_FORM_CROSS_REGION_CONTEXTS_FR311H,
  assertNoseCrossRegionEvidenceFR311H,
  resolveNoseCrossRegionEvidenceFR311H,
} from './traditional-nose-cross-region-evidence-fr311h.js';
import {
  queryFaceEvidenceFR311G,
} from './traditional-face-evidence-query-fr311g.js';
import {
  buildTraditionalFaceReadingOutputFR311G,
} from './traditional-face-reading-output-fr311g.js';

describe('FR311H nose cross-region evidence', () => {
  it('registers three direct relations and keeps twelve source-local context records separated', () => {
    expect(() => assertNoseCrossRegionEvidenceFR311H()).not.toThrow();
    expect(FR311H_CROSS_REGION_SUMMARY).toEqual({
      directCrossRegionRelations: 3,
      namedFormContexts: 8,
      descriptiveCompanions: 4,
      totalContextRecords: 12,
    });
    expect(NOSE_DIRECT_CROSS_REGION_RELATIONS_FR311H).toHaveLength(3);
    expect(NOSE_NAMED_FORM_CROSS_REGION_CONTEXTS_FR311H).toHaveLength(12);
  });

  it('maps explicit shangen-forehead relation to the existing FR311F status rule', () => {
    const result = queryFaceEvidenceFR311G({
      lensKey: 'career',
      relationKeys: ['nose_forehead.shangen_bridge_connected_level_with_forehead'],
    });

    expect(result.status).toBe('direct_source_relation');
    expect(result.directRuleIds).toContain('fr311f.shangen.to_forehead');
    expect(result.favorableEvidenceIds).toContain(
      'fr311g.direct.fr311f.shangen.to_forehead',
    );

    const output = buildTraditionalFaceReadingOutputFR311G({
      lensKey: 'career',
      relationKeys: ['nose_forehead.shangen_bridge_connected_level_with_forehead'],
    });
    expect(output.outputStatus).toBe('direct_relation');
    expect(output.evidenceSections.favorable.some(
      (item) => item.sourceExpression.includes('山根連額'),
    )).toBe(true);
  });

  it('does not infer a direct nose relation from a named form alone', () => {
    const result = queryFaceEvidenceFR311G({
      lensKey: 'career',
      formKeys: ['nose.named.fuxi'],
    });

    expect(result.status).toBe('evidence_only');
    expect(result.directRuleIds).not.toContain('fr311f.shangen.to_forehead');
    expect(result.directRuleIds).not.toContain('fr311f.nose.reaches_tianting');
  });

  it('makes the existing reputation direct rule reachable through the career lens', () => {
    const byRelation = queryFaceEvidenceFR311G({
      lensKey: 'career',
      relationKeys: ['nose_forehead.nose_rises_to_tianting'],
    });
    expect(byRelation.status).toBe('direct_source_relation');
    expect(byRelation.directRuleIds).toEqual(['fr311f.nose.reaches_tianting']);

    const byRuleId = queryFaceEvidenceFR311G({
      lensKey: 'career',
      traditionalRuleIds: ['fr311f.nose.reaches_tianting'],
    });
    expect(byRuleId.status).toBe('evidence_only');
    expect(byRuleId.directRuleIds).toEqual(['fr311f.nose.reaches_tianting']);
  });

  it('keeps the direct yintang relation explicit and spouse-scoped', () => {
    const result = buildTraditionalFaceReadingOutputFR311G({
      lensKey: 'spouse',
      relationKeys: ['nose_yintang.bridge_round_penetrates_yintang'],
    });

    expect(result.outputStatus).toBe('direct_relation');
    expect(result.evidenceSections.favorable.some(
      (item) =>
        item.sourceExpression === '鼻梁圓而貫印堂者，此人主美貌之妻' &&
        item.relationTarget === 'spouse',
    )).toBe(true);

    const wealth = queryFaceEvidenceFR311G({
      lensKey: 'wealth',
      relationKeys: ['nose_yintang.bridge_round_penetrates_yintang'],
    });
    expect(wealth.status).toBe('no_evidence');
    expect(wealth.directRuleIds).toEqual([]);
  });

  it('requires both the named form and source-local feature key for context matching', () => {
    const missingForm = resolveNoseCrossRegionEvidenceFR311H({
      crossRegionFeatureKeys: ['source_local.solitary_peak.cheekbones_low_small'],
    });
    expect(missingForm.status).toBe('unsupported');

    const matched = resolveNoseCrossRegionEvidenceFR311H({
      formKeys: ['nose.named.solitary_peak'],
      crossRegionFeatureKeys: ['source_local.solitary_peak.cheekbones_low_small'],
    });
    expect(matched.status).toBe('named_form_context');
    expect(matched.matchedContextIds).toEqual([
      'fr311h.context.solitary_peak.cheekbones_low_small',
    ]);
    expect(matched.semanticCombinationAuthorized).toBe(false);
    expect(matched.relationInferenceAuthorized).toBe(false);
  });

  it('exposes context without turning an unrelated lens into semantic evidence', () => {
    const result = queryFaceEvidenceFR311G({
      lensKey: 'wealth',
      formKeys: ['nose.named.hawk_beak'],
      crossRegionFeatureKeys: ['source_local.hawk_beak.lip_edge'],
    });

    expect(result.status).toBe('no_evidence');
    expect(result.namedFormContextIds).toEqual([
      'fr311h.context.hawk_beak.lip_edge',
    ]);
    expect(result.directRuleIds).toEqual([]);

    const output = buildTraditionalFaceReadingOutputFR311G({
      lensKey: 'wealth',
      formKeys: ['nose.named.hawk_beak'],
      crossRegionFeatureKeys: ['source_local.hawk_beak.lip_edge'],
    });
    expect(output.outputStatus).toBe('no_direct_evidence');
    expect(output.evidenceSections.contextOnly).toHaveLength(1);
    expect(output.evidenceSections.favorable).toEqual([]);
    expect(output.evidenceSections.challenging).toEqual([]);
    expect(output.limitations.some((item) => item.includes('직접 근거가 없'))).toBe(true);
  });

  it('preserves Fuxi yintang wording as context while keeping its career claim separate', () => {
    const output = buildTraditionalFaceReadingOutputFR311G({
      lensKey: 'career',
      formKeys: ['nose.named.fuxi'],
      crossRegionFeatureKeys: ['source_local.fuxi.shangen_to_yintang'],
    });

    expect(output.outputStatus).toBe('named_form_context');
    expect(output.evidenceSections.favorable.some(
      (item) => item.sourceExpression === '位立至三公',
    )).toBe(true);
    expect(output.evidenceSections.contextOnly.some(
      (item) => item.sourceExpression === '山根直上印堂隆',
    )).toBe(true);
  });

  it('keeps ambiguous companion phrases non-generalizable', () => {
    const uncertain = NOSE_NAMED_FORM_CROSS_REGION_CONTEXTS_FR311H.filter(
      (item) => item.verificationState === 'gujin634_phrase_boundary_uncertain',
    );
    expect(uncertain.map((item) => item.contextId)).toEqual([
      'fr311h.context.crucian_carp.eye_white_exposed',
      'fr311h.context.indented.nose_face_relation',
    ]);
    expect(uncertain.every((item) =>
      item.generalizationAuthorized === false &&
      item.semanticCombinationAuthorized === false &&
      item.neutralGeometryBindingAuthorized === false
    )).toBe(true);
  });

  it('does not auto-bind source-local context to neutral geometry or named-form classification', () => {
    expect(NOSE_NAMED_FORM_CROSS_REGION_CONTEXTS_FR311H.every((item) =>
      item.neutralGeometryBindingAuthorized === false &&
      item.namedFormClassifierAuthorized === false &&
      item.productInterpretationAuthorized === false
    )).toBe(true);
    expect(NOSE_DIRECT_CROSS_REGION_RELATIONS_FR311H.every((item) =>
      item.relationInferenceAuthorized === false &&
      item.neutralGeometryBindingAuthorized === false &&
      item.namedFormClassifierAuthorized === false &&
      item.productInterpretationAuthorized === false
    )).toBe(true);
  });
});
