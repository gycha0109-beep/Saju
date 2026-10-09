import { describe, expect, it } from 'vitest';
import {
  FACE_DIRECT_RULE_EVIDENCE_FR311G,
  FACE_NAMED_FORM_EVIDENCE_FR311G,
  FR311G_INDEX_SUMMARY,
  assertFaceEvidenceIndexFR311G,
} from './traditional-face-evidence-index-fr311g.js';
import {
  FACE_EVIDENCE_LENSES_FR311G,
  assertFaceEvidenceLensesFR311G,
  queryFaceEvidenceFR311G,
} from './traditional-face-evidence-query-fr311g.js';
import {
  FR311G_OUTPUT_AUTHORITY_BOUNDARY,
  assertTraditionalFaceReadingOutputFR311G,
  buildTraditionalFaceReadingOutputFR311G,
} from './traditional-face-reading-output-fr311g.js';
import {
  NOSE_DIRECT_RULES_FR311F,
} from './traditional-nose-semantics-fr311f.js';

describe('FR311G face-wide evidence query and reading output', () => {
  it('integrates 87 named forms and 257 named-form claims', () => {
    expect(() => assertFaceEvidenceIndexFR311G()).not.toThrow();
    expect(FR311G_INDEX_SUMMARY).toMatchObject({
      eyebrowEyeNamedForms: 63,
      noseNamedForms: 24,
      namedFormsTotal: 87,
      eyebrowEyeNamedClaims: 203,
      noseNamedClaims: 54,
      namedClaimsTotal: 257,
      noseDirectRules: 20,
    });
    expect(FACE_NAMED_FORM_EVIDENCE_FR311G).toHaveLength(257);
    expect(FACE_DIRECT_RULE_EVIDENCE_FR311G.filter(
      (item) => item.sourceKind === 'nose_direct_rule',
    )).toHaveLength(20);
  });

  it('adds the seven nose-relevant lenses without losing the existing nine', () => {
    expect(() => assertFaceEvidenceLensesFR311G()).not.toThrow();
    expect(FACE_EVIDENCE_LENSES_FR311G).toHaveLength(16);
    expect(FACE_EVIDENCE_LENSES_FR311G.map((item) => item.lensKey)).toEqual(
      expect.arrayContaining([
        'temperament',
        'inbok',
        'interpersonal_relations',
        'wealth',
        'spouse',
        'siblings',
        'patron',
        'career',
        'children',
        'longevity',
        'traditional_health',
        'legal_penalty',
        'household',
        'inheritance',
        'livelihood',
        'integrity_conduct',
      ]),
    );
  });

  it('returns garlic-nose sibling evidence without leaking temperament or household claims', () => {
    const result = queryFaceEvidenceFR311G({
      lensKey: 'siblings',
      formKeys: ['nose.named.garlic'],
    });
    expect(result.status).toBe('evidence_only');
    expect(result.namedEvidenceIds).toHaveLength(1);

    const claim = FACE_NAMED_FORM_EVIDENCE_FR311G.find(
      (item) => item.evidenceId === result.namedEvidenceIds[0],
    );
    expect(claim?.sourceFragment).toBe('弟兄情欠');
    expect(claim?.topicKey).toBe('siblings');
    expect(claim?.polarity).toBe('challenging');
  });

  it('keeps monkey-nose wealth and integrity evidence in separate topic lenses', () => {
    const wealth = queryFaceEvidenceFR311G({
      lensKey: 'wealth',
      formKeys: ['nose.named.monkey'],
    });
    const integrity = queryFaceEvidenceFR311G({
      lensKey: 'integrity_conduct',
      formKeys: ['nose.named.monkey'],
    });

    expect(wealth.namedEvidenceIds).toHaveLength(1);
    expect(integrity.namedEvidenceIds).toHaveLength(1);

    const wealthClaim = FACE_NAMED_FORM_EVIDENCE_FR311G.find(
      (item) => item.evidenceId === wealth.namedEvidenceIds[0],
    );
    const integrityClaim = FACE_NAMED_FORM_EVIDENCE_FR311G.find(
      (item) => item.evidenceId === integrity.namedEvidenceIds[0],
    );

    expect(wealthClaim?.sourceFragment).toBe('富貴');
    expect(wealthClaim?.polarity).toBe('favorable');
    expect(integrityClaim?.sourceFragment).toBe('恐奸情');
    expect(integrityClaim?.polarity).toBe('challenging');
  });

  it('does not turn dragon-nose status evidence into inbok evidence', () => {
    const result = queryFaceEvidenceFR311G({
      lensKey: 'inbok',
      formKeys: ['nose.named.dragon'],
    });

    expect(result.status).toBe('no_evidence');
    expect(result.namedEvidenceIds).toEqual([]);
    expect(result.directRuleIds).toEqual([]);
  });

  it('returns Fuxi-nose status evidence through the career lens', () => {
    const result = buildTraditionalFaceReadingOutputFR311G({
      lensKey: 'career',
      formKeys: ['nose.named.fuxi'],
    });

    expect(result.outputStatus).toBe('evidence');
    expect(result.evidenceSections.favorable.some(
      (item) => item.sourceExpression === '位立至三公',
    )).toBe(true);
  });

  it('queries direct nose rules only when their ids are explicitly supplied', () => {
    const absent = queryFaceEvidenceFR311G({
      lensKey: 'longevity',
    });
    expect(absent.status).toBe('no_evidence');

    const selected = queryFaceEvidenceFR311G({
      lensKey: 'longevity',
      traditionalRuleIds: ['fr311f.shangen.not_sunken'],
    });
    expect(selected.status).toBe('evidence_only');
    expect(selected.directRuleIds).toEqual(['fr311f.shangen.not_sunken']);
    expect(selected.favorableEvidenceIds).toContain(
      'fr311g.direct.fr311f.shangen.not_sunken',
    );
    expect(selected.traditionalRuleInferenceAuthorized).toBe(false);
  });

  it('preserves favorable versus challenging metadata for direct nose rules', () => {
    const favorable = NOSE_DIRECT_RULES_FR311F.find(
      (item) => item.ruleId === 'fr311f.shangen.not_sunken',
    );
    const challenging = NOSE_DIRECT_RULES_FR311F.find(
      (item) => item.ruleId === 'fr311f.bridge.no_bone',
    );

    expect(favorable?.polarity).toBe('favorable');
    expect(favorable?.lifeStage).toBe('whole_life');
    expect(challenging?.polarity).toBe('challenging');
    expect(challenging?.lifeStage).toBe('whole_life');
  });

  it('reports a source conflict when opposing longevity rules are selected together', () => {
    const result = buildTraditionalFaceReadingOutputFR311G({
      lensKey: 'longevity',
      traditionalRuleIds: [
        'fr311f.shangen.not_sunken',
        'fr311f.bridge.no_bone',
      ],
    });

    expect(result.outputStatus).toBe('conflict');
    expect(result.evidenceSections.favorable.some(
      (item) => item.sourceExpression === '山根不陷，主壽',
    )).toBe(true);
    expect(result.evidenceSections.challenging.some(
      (item) => item.sourceExpression === '鼻梁無骨，必夭壽沒',
    )).toBe(true);
    expect(result.limitations.some((item) => item.includes('의료 판단'))).toBe(true);
  });

  it('returns the direct spouse rule with its relation target', () => {
    const result = buildTraditionalFaceReadingOutputFR311G({
      lensKey: 'spouse',
      traditionalRuleIds: ['fr311f.bridge.round_to_yintang'],
    });

    expect(result.outputStatus).toBe('evidence');
    expect(result.evidenceSections.favorable.some(
      (item) =>
        item.sourceExpression === '鼻梁圓而貫印堂者，此人主美貌之妻' &&
        item.relationTarget === 'spouse',
    )).toBe(true);
  });

  it('preserves mixed and conditional lion-nose wealth evidence', () => {
    const result = buildTraditionalFaceReadingOutputFR311G({
      lensKey: 'wealth',
      formKeys: ['nose.named.lion'],
    });

    expect(result.outputStatus).toBe('evidence');
    expect(result.evidenceSections.mixedOrConditional).toHaveLength(2);
    expect(result.evidenceSections.favorable).toEqual([]);
    expect(result.evidenceSections.challenging).toEqual([]);
  });

  it('returns challenging solitary-peak wealth evidence but no hawk-beak wealth evidence', () => {
    const solitary = buildTraditionalFaceReadingOutputFR311G({
      lensKey: 'wealth',
      formKeys: ['nose.named.solitary_peak'],
    });
    const hawk = buildTraditionalFaceReadingOutputFR311G({
      lensKey: 'wealth',
      formKeys: ['nose.named.hawk_beak'],
    });

    expect(solitary.outputStatus).toBe('evidence');
    expect(solitary.evidenceSections.challenging.some(
      (item) => item.sourceExpression === '無財積',
    )).toBe(true);

    expect(hawk.outputStatus).toBe('no_direct_evidence');
    expect(hawk.evidenceSections.favorable).toEqual([]);
    expect(hawk.evidenceSections.challenging).toEqual([]);
  });

  it('keeps existing eye and eyebrow evidence working in the face-wide engine', () => {
    const patron = buildTraditionalFaceReadingOutputFR311G({
      lensKey: 'patron',
      formKeys: ['eye.named.calling_phoenix'],
    });
    expect(patron.outputStatus).toBe('evidence');
    expect(patron.evidenceSections.favorable.length).toBeGreaterThan(0);

    const wealthCombination = buildTraditionalFaceReadingOutputFR311G({
      lensKey: 'wealth',
      morphologyTermKeys: ['eye.short', 'brow.long'],
    });
    expect(wealthCombination.outputStatus).toBe('direct_combination');
    expect(wealthCombination.combinationAssessment.directCombinationRuleIds).toEqual([
      'fr311.combo.eye_short_brow_long',
    ]);
  });

  it('keeps health and lifespan claims explicitly non-medical and non-predictive', () => {
    expect(() => assertTraditionalFaceReadingOutputFR311G()).not.toThrow();

    const health = buildTraditionalFaceReadingOutputFR311G({
      lensKey: 'traditional_health',
      formKeys: ['nose.named.indented'],
    });

    expect(health.doctrineNotice).toContain('건강 진단');
    expect(health.doctrineNotice).toContain('수명 예측');
    expect(health.limitations.some((item) => item.includes('의료 판단'))).toBe(true);

    expect(FR311G_OUTPUT_AUTHORITY_BOUNDARY).toEqual({
      scoreAuthorized: false,
      aggregateGoodBadJudgementAuthorized: false,
      unsupportedSynthesisAuthorized: false,
      sourcePriorityInferenceAuthorized: false,
      traditionalRuleInferenceAuthorized: false,
      namedFormClassifierAuthorized: false,
      traditionalRegionToNeutralGeometryBindingAuthorized: false,
      modernPsychologyOrMedicalFactAuthorized: false,
      healthDiagnosisAuthorized: false,
      lifespanPredictionAuthorized: false,
      productPredictionAuthorized: false,
    });
  });
});
