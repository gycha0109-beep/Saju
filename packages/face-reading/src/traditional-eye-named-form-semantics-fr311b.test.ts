import { describe, expect, it } from 'vitest';
import {
  EYE_NAMED_FORM_SEMANTICS_FR311B,
  FR311B_AUTHORITY_BOUNDARY,
  assertEyeNamedFormSemanticsFR311B,
  queryEyeRelationalEvidenceFR311B,
} from './traditional-eye-named-form-semantics-fr311b.js';

describe('FR311B 39 eye named-form semantics', () => {
  it('covers exactly all 39 eye named forms from FR311', () => {
    expect(() => assertEyeNamedFormSemanticsFR311B()).not.toThrow();
    expect(EYE_NAMED_FORM_SEMANTICS_FR311B).toHaveLength(39);
    expect(new Set(EYE_NAMED_FORM_SEMANTICS_FR311B.map((entry) => entry.formKey)).size).toBe(39);
    expect(EYE_NAMED_FORM_SEMANTICS_FR311B.map((entry) => entry.traditionalLabel)).toEqual([
      '龍眼','鳳眼','猴眼','象眼','龜眼','鵲眼','獅眼','虎眼','牛眼','孔雀眼',
      '鴛鴦眼','鳴鳳眼','睡鳳眼','瑞鳳眼','鴈眼','陰陽眼','鶴形眼','鵝眼','桃花眼','醉眼',
      '鶴眼','羊眼','魚眼','馬眼','豬眼','蛇眼','鴿眼','鸞眼','狼目','伏犀眼',
      '鷺鷥眼','猿眼','鹿眼','熊眼','蝦眼','蟹眼','燕眼','鷓鴣眼','貓眼',
    ]);
  });

  it('separates eye morphology from surrounding contextual conditions', () => {
    const fuxi = EYE_NAMED_FORM_SEMANTICS_FR311B.find((entry) => entry.formKey === 'eye.named.fuxi');
    expect(fuxi).toBeDefined();
    expect(fuxi?.descriptors.some((descriptor) =>
      descriptor.origin === 'eye' && descriptor.sourceFragment === '眼大')).toBe(true);
    expect(fuxi?.descriptors.some((descriptor) =>
      descriptor.origin === 'context' && descriptor.sourceFragment === '兩眉濃')).toBe(true);
    expect(fuxi?.descriptors.some((descriptor) =>
      descriptor.origin === 'context' && descriptor.sourceFragment === '耳內毫長')).toBe(true);

    for (const descriptor of fuxi?.descriptors ?? []) {
      expect(descriptor.neutralMorphologyBindingAuthorized).toBe(false);
    }
  });

  it('preserves direct spouse evidence for mandarin-duck eye without generating a relationship score', () => {
    const form = EYE_NAMED_FORM_SEMANTICS_FR311B.find(
      (entry) => entry.formKey === 'eye.named.mandarin_duck',
    );
    expect(form).toBeDefined();
    expect(form?.claims.some((claim) =>
      claim.topicKey === 'spouse_relationship' &&
      claim.relationTarget === 'spouse' &&
      claim.polarity === 'favorable')).toBe(true);

    const lens = queryEyeRelationalEvidenceFR311B('eye.named.mandarin_duck');
    expect(lens.status).toBe('direct_relational_evidence_found');
    expect(lens.claimIds.length).toBeGreaterThan(0);
    expect(lens.aggregateJudgementAuthorized).toBe(false);
    expect(lens.scoreAuthorized).toBe(false);
  });

  it('preserves patron evidence for calling-phoenix and cat eye', () => {
    const calling = EYE_NAMED_FORM_SEMANTICS_FR311B.find(
      (entry) => entry.formKey === 'eye.named.calling_phoenix',
    );
    const cat = EYE_NAMED_FORM_SEMANTICS_FR311B.find(
      (entry) => entry.formKey === 'eye.named.cat',
    );

    expect(calling?.claims.some((claim) =>
      claim.topicKey === 'patron_support' &&
      claim.relationTarget === 'patron' &&
      claim.lifeStage === 'middle')).toBe(true);

    expect(cat?.claims.some((claim) =>
      claim.topicKey === 'patron_support' &&
      claim.relationTarget === 'patron')).toBe(true);
  });

  it('preserves child and filial-support claims separately for crab eye', () => {
    const crab = EYE_NAMED_FORM_SEMANTICS_FR311B.find(
      (entry) => entry.formKey === 'eye.named.crab',
    );
    expect(crab).toBeDefined();

    expect(crab?.claims.some((claim) =>
      claim.topicKey === 'children_family' &&
      claim.relationTarget === 'children')).toBe(true);

    expect(crab?.claims.some((claim) =>
      claim.topicKey === 'filial_support' &&
      claim.relationTarget === 'parents')).toBe(true);
  });

  it('marks unstable transcriptions and uncertain claims instead of promoting them', () => {
    for (const formKey of ['eye.named.bear', 'eye.named.shrimp', 'eye.named.cat']) {
      const form = EYE_NAMED_FORM_SEMANTICS_FR311B.find((entry) => entry.formKey === formKey);
      expect(form?.transcriptionState).toBe('reviewed_with_uncertainty');
      expect(form?.claims.some((claim) => claim.certainty === 'phrase_uncertain')).toBe(true);
      expect(form?.nlc1925DirectScanAdjudicated).toBe(false);
    }
  });

  it('does not convert pure wealth or status claims into relationship evidence', () => {
    const dragon = queryEyeRelationalEvidenceFR311B('eye.named.dragon');
    expect(dragon.status).toBe('no_direct_relational_evidence');
    expect(dragon.claimIds).toEqual([]);

    const turtle = queryEyeRelationalEvidenceFR311B('eye.named.turtle');
    expect(turtle.status).toBe('direct_relational_evidence_found');
    expect(turtle.claimIds.length).toBeGreaterThan(0);
  });

  it('keeps historical-doctrine and product boundaries closed', () => {
    for (const entry of EYE_NAMED_FORM_SEMANTICS_FR311B) {
      expect(entry.namedFormToNeutralClassifierAuthorized).toBe(false);
      expect(entry.nlc1925DirectScanAdjudicated).toBe(false);
      for (const claim of entry.claims) {
        expect(claim.historicalTraditionalDoctrineOnly).toBe(true);
        expect(claim.modernScientificFactAuthorized).toBe(false);
        expect(claim.productInterpretationAuthorized).toBe(false);
      }
    }

    expect(FR311B_AUTHORITY_BOUNDARY).toEqual({
      treatsInbokAsPrimarySourceConcept: false,
      aggregatesRelationalClaimsIntoScore: false,
      namedFormToNeutralClassifierAuthorized: false,
      metricThresholdAuthorized: false,
      providerGeometryBindingAuthorized: false,
      modernPsychologyOrMedicalFactAuthorized: false,
      productInterpretationAuthorized: false,
      nlc1925DirectScanAdjudicationClaimed: false,
      uncertainTranscriptionPromotedToFact: false,
    });
  });
});
