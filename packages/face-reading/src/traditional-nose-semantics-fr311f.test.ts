import { describe, expect, it } from 'vitest';
import {
  FR311F_SOURCE_BOUNDARY,
  NOSE_DIRECT_RULES_FR311F,
  NOSE_NAMED_FORM_SEMANTICS_FR311F,
  NOSE_TRADITIONAL_REGIONS_FR311F,
  assertNoseTraditionalSemanticsFR311F,
} from './traditional-nose-semantics-fr311f.js';

describe('FR311F traditional nose semantics', () => {
  it('covers the governed nose region vocabulary and 24 named forms', () => {
    expect(() => assertNoseTraditionalSemanticsFR311F()).not.toThrow();
    expect(NOSE_TRADITIONAL_REGIONS_FR311F).toHaveLength(9);
    expect(NOSE_NAMED_FORM_SEMANTICS_FR311F).toHaveLength(24);
    expect(NOSE_DIRECT_RULES_FR311F).toHaveLength(20);

    expect(NOSE_NAMED_FORM_SEMANTICS_FR311F.map((item) => item.traditionalLabel)).toEqual([
      '龍鼻','虎鼻','胡羊鼻','獅鼻','懸膽鼻','伏犀鼻','牛鼻','截筒鼻',
      '蒜鼻','盛囊鼻','猴鼻','鷹嘴鼻','狗鼻','鯽魚鼻','三彎三曲鼻','劍鋒鼻',
      '偏凹鼻','孤峰鼻','露脊鼻','露竈鼻','獐鼻','猩鼻','鹿鼻','猿鼻',
    ]);
  });

  it('keeps traditional region names separate from neutral geometry authority', () => {
    expect(NOSE_TRADITIONAL_REGIONS_FR311F.map((item) => item.traditionalLabel)).toEqual([
      '山根','鼻梁','年上','壽上','準頭','蘭臺','廷尉','鼻孔','竈門',
    ]);
    for (const region of NOSE_TRADITIONAL_REGIONS_FR311F) {
      expect(region.neutralGeometryBindingAuthorized).toBe(false);
    }
    expect(FR311F_SOURCE_BOUNDARY.pronasaleEqualsZhuntouAuthorized).toBe(false);
    expect(FR311F_SOURCE_BOUNDARY.providerLandmarkBindingAuthorized).toBe(false);
    expect(FR311F_SOURCE_BOUNDARY.metricThresholdAuthorized).toBe(false);
  });

  it('preserves direct Shangen and nose rules without modern fact promotion', () => {
    const notSunken = NOSE_DIRECT_RULES_FR311F.find(
      (item) => item.ruleId === 'fr311f.shangen.not_sunken',
    );
    const pointedTip = NOSE_DIRECT_RULES_FR311F.find(
      (item) => item.ruleId === 'fr311f.tip.pointed_thin',
    );
    const bridgeSpouse = NOSE_DIRECT_RULES_FR311F.find(
      (item) => item.ruleId === 'fr311f.bridge.round_to_yintang',
    );

    expect(notSunken?.sourceExpression).toBe('山根不陷，主壽');
    expect(notSunken?.topicKeys).toContain('longevity');

    expect(pointedTip?.sourceExpression).toBe('準頭尖細好為奸計');
    expect(pointedTip?.topicKeys).toContain('integrity_trust');

    expect(bridgeSpouse?.topicKeys).toContain('spouse_relationship');

    for (const rule of NOSE_DIRECT_RULES_FR311F) {
      expect(rule.historicalTraditionalDoctrineOnly).toBe(true);
      expect(rule.modernScientificFactAuthorized).toBe(false);
      expect(rule.productInterpretationAuthorized).toBe(false);
    }
  });

  it('keeps named-form morphology and outcome claims separate', () => {
    const fuxi = NOSE_NAMED_FORM_SEMANTICS_FR311F.find(
      (item) => item.formKey === 'nose.named.fuxi',
    );
    expect(fuxi).toBeDefined();
    expect(fuxi?.descriptors.some(
      (item) => item.sourceFragment === '山根直上印堂隆',
    )).toBe(true);
    expect(fuxi?.claims.some(
      (item) => item.topicKey === 'status' && item.sourceFragment === '位立至三公',
    )).toBe(true);

    for (const descriptor of fuxi?.descriptors ?? []) {
      expect(descriptor.neutralGeometryBindingAuthorized).toBe(false);
    }
  });

  it('preserves mixed and conditional semantics rather than flattening named forms', () => {
    const lion = NOSE_NAMED_FORM_SEMANTICS_FR311F.find(
      (item) => item.formKey === 'nose.named.lion',
    );
    const monkey = NOSE_NAMED_FORM_SEMANTICS_FR311F.find(
      (item) => item.formKey === 'nose.named.monkey',
    );

    expect(lion?.claims.some((item) => item.polarity === 'conditional')).toBe(true);
    expect(lion?.claims.some((item) => item.polarity === 'mixed')).toBe(true);

    expect(monkey?.claims.some(
      (item) => item.topicKey === 'wealth' && item.polarity === 'favorable',
    )).toBe(true);
    expect(monkey?.claims.some(
      (item) => item.topicKey === 'integrity_trust' && item.polarity === 'challenging',
    )).toBe(true);
  });

  it('keeps context outside the nose separate inside named-form descriptions', () => {
    const solitary = NOSE_NAMED_FORM_SEMANTICS_FR311F.find(
      (item) => item.formKey === 'nose.named.solitary_peak',
    );
    const orangutan = NOSE_NAMED_FORM_SEMANTICS_FR311F.find(
      (item) => item.formKey === 'nose.named.orangutan',
    );

    expect(solitary?.descriptors.some(
      (item) => item.region === 'context' && item.sourceFragment === '兩顴低小',
    )).toBe(true);

    expect(orangutan?.descriptors.some(
      (item) => item.region === 'context' && item.sourceFragment === '眉眼相挨',
    )).toBe(true);
  });

  it('does not claim direct 1925 scan adjudication for newly structured named forms', () => {
    for (const form of NOSE_NAMED_FORM_SEMANTICS_FR311F) {
      expect(form.verificationState).toBe('gujin634_transcription_reviewed');
      expect(form.nlc1925DirectScanAdjudicated).toBe(false);
      expect(form.namedFormToNeutralClassifierAuthorized).toBe(false);
    }
  });
});
