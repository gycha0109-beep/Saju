import { describe, expect, it } from 'vitest';
import {
  EYEBROW_NAMED_FORM_SEMANTICS_FR311A,
  FR311A_AUTHORITY_BOUNDARY,
  assertEyebrowNamedFormSemanticsFR311A,
  queryInbokRelationalEvidenceFR311A,
} from './traditional-eyebrow-named-form-semantics-fr311a.js';

describe('FR311A 24 eyebrow named-form semantics', () => {
  it('covers exactly all 24 eyebrow named forms from FR311', () => {
    expect(() => assertEyebrowNamedFormSemanticsFR311A()).not.toThrow();
    expect(EYEBROW_NAMED_FORM_SEMANTICS_FR311A).toHaveLength(24);
    expect(new Set(EYEBROW_NAMED_FORM_SEMANTICS_FR311A.map((entry) => entry.formKey)).size).toBe(24);
    expect(EYEBROW_NAMED_FORM_SEMANTICS_FR311A.map((entry) => entry.traditionalLabel)).toEqual([
      '鬼眉',
      '疏散眉',
      '黃薄眉',
      '掃箒眉',
      '尖刀眉',
      '八字眉',
      '羅漢眉',
      '龍眉',
      '柳葉眉',
      '劍眉',
      '獅子眉',
      '前清後疏眉',
      '輕清眉',
      '短促秀眉',
      '旋螺眉',
      '一字眉',
      '臥蠶眉',
      '新月眉',
      '虎眉',
      '小掃箒眉',
      '大短促眉',
      '清秀眉',
      '間斷眉',
      '交加眉',
    ]);
  });

  it('decomposes source text into descriptors and topic-level claims without granting automatic morphology binding', () => {
    for (const entry of EYEBROW_NAMED_FORM_SEMANTICS_FR311A) {
      expect(entry.sourceText.length).toBeGreaterThan(0);
      expect(entry.descriptors.length).toBeGreaterThan(0);
      expect(entry.claims.length).toBeGreaterThan(0);
      expect(entry.namedFormToNeutralClassifierAuthorized).toBe(false);
      expect(entry.nlc1925DirectScanAdjudicated).toBe(false);

      for (const descriptor of entry.descriptors) {
        expect(descriptor.neutralMorphologyBindingAuthorized).toBe(false);
      }

      for (const claim of entry.claims) {
        expect(claim.historicalTraditionalDoctrineOnly).toBe(true);
        expect(claim.modernScientificFactAuthorized).toBe(false);
        expect(claim.productInterpretationAuthorized).toBe(false);
      }
    }
  });

  it('preserves life-stage meaning instead of flattening the clear-front-sparse-back form', () => {
    const form = EYEBROW_NAMED_FORM_SEMANTICS_FR311A.find(
      (entry) => entry.formKey === 'eyebrow.named.clear_front_sparse_back',
    );
    expect(form).toBeDefined();

    expect(form?.claims.some((claim) =>
      claim.topicKey === 'wealth' &&
      claim.lifeStage === 'early' &&
      claim.polarity === 'neutral')).toBe(true);

    expect(form?.claims.some((claim) =>
      claim.topicKey === 'career_reputation' &&
      claim.lifeStage === 'middle' &&
      claim.polarity === 'favorable')).toBe(true);

    expect(form?.claims.some((claim) =>
      claim.topicKey === 'status' &&
      claim.lifeStage === 'late' &&
      claim.polarity === 'favorable')).toBe(true);
  });

  it('preserves relational evidence for willow-leaf brow without inventing an inbok score', () => {
    const form = EYEBROW_NAMED_FORM_SEMANTICS_FR311A.find(
      (entry) => entry.formKey === 'eyebrow.named.willow_leaf',
    );
    expect(form).toBeDefined();

    expect(form?.claims.some((claim) =>
      claim.topicKey === 'kinship' &&
      claim.relationTarget === 'kin' &&
      claim.polarity === 'challenging')).toBe(true);

    expect(form?.claims.some((claim) =>
      claim.topicKey === 'friendship' &&
      claim.relationTarget === 'friends' &&
      claim.polarity === 'favorable')).toBe(true);

    expect(form?.claims.some((claim) =>
      claim.topicKey === 'patron_support' &&
      claim.relationTarget === 'patron' &&
      claim.polarity === 'favorable')).toBe(true);

    const lens = queryInbokRelationalEvidenceFR311A('eyebrow.named.willow_leaf');
    expect(lens.status).toBe('direct_relational_evidence_found');
    expect(lens.claimIds.length).toBeGreaterThanOrEqual(3);
    expect(lens.aggregateJudgementAuthorized).toBe(false);
    expect(lens.scoreAuthorized).toBe(false);
  });

  it('keeps one-character brow morphology, early career, longevity, and spouse claims separate', () => {
    const form = EYEBROW_NAMED_FORM_SEMANTICS_FR311A.find(
      (entry) => entry.formKey === 'eyebrow.named.one_character',
    );
    expect(form).toBeDefined();

    expect(form?.descriptors.some((descriptor) => descriptor.sourceFragment === '毫清')).toBe(true);
    expect(form?.claims.some((claim) =>
      claim.topicKey === 'longevity' &&
      claim.polarity === 'favorable')).toBe(true);
    expect(form?.claims.some((claim) =>
      claim.topicKey === 'career_reputation' &&
      claim.lifeStage === 'early')).toBe(true);
    expect(form?.claims.some((claim) =>
      claim.topicKey === 'spouse_relationship' &&
      claim.relationTarget === 'spouse')).toBe(true);
  });

  it('preserves parent ordering in interrupted brow rather than collapsing it to generic family risk', () => {
    const form = EYEBROW_NAMED_FORM_SEMANTICS_FR311A.find(
      (entry) => entry.formKey === 'eyebrow.named.interrupted',
    );
    expect(form).toBeDefined();

    expect(form?.claims.some((claim) =>
      claim.topicKey === 'parents' &&
      claim.relationTarget === 'mother' &&
      claim.lifeStage === 'earlier')).toBe(true);
    expect(form?.claims.some((claim) =>
      claim.topicKey === 'parents' &&
      claim.relationTarget === 'father' &&
      claim.lifeStage === 'later')).toBe(true);
  });

  it('does not convert non-relational meaning into inbok evidence', () => {
    const lens = queryInbokRelationalEvidenceFR311A('eyebrow.named.spiral');
    expect(lens.status).toBe('no_direct_relational_evidence');
    expect(lens.claimIds).toEqual([]);
    expect(lens.aggregateJudgementAuthorized).toBe(false);
    expect(lens.scoreAuthorized).toBe(false);
  });

  it('keeps all stronger authority closed', () => {
    expect(FR311A_AUTHORITY_BOUNDARY).toEqual({
      treatsInbokAsPrimarySourceConcept: false,
      aggregatesRelationalClaimsIntoScore: false,
      namedFormToNeutralClassifierAuthorized: false,
      metricThresholdAuthorized: false,
      providerGeometryBindingAuthorized: false,
      modernPsychologyOrMedicalFactAuthorized: false,
      productInterpretationAuthorized: false,
      nlc1925DirectScanAdjudicationClaimed: false,
    });
  });
});
