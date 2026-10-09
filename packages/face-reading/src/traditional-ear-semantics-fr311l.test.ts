import { describe, expect, it } from 'vitest';
import {
  EAR_CROSS_REGION_CONTEXTS_FR311L,
  EAR_DIRECT_RULES_FR311L,
  EAR_NAMED_FORM_SEMANTICS_FR311L,
  EAR_TRADITIONAL_REGIONS_FR311L,
  FR311L_EAR_AUTHORITY_BOUNDARY,
  FR311L_EAR_SUMMARY,
  assertEarSemanticsFR311L,
} from './traditional-ear-semantics-fr311l.js';
import {
  MOUTH_PHILTRUM_DIRECT_CROSS_REGION_EVIDENCE_FR311K,
} from './traditional-mouth-philtrum-cross-region-evidence-fr311k.js';

describe('FR311L traditional ear semantics', () => {
  it('freezes the reviewed source-local corpus scale', () => {
    expect(() => assertEarSemanticsFR311L()).not.toThrow();
    expect(FR311L_EAR_SUMMARY).toEqual({
      traditionalRegions: 9,
      directRules: 57,
      crossRegionContexts: 5,
      namedForms: 16,
      namedFormDescriptors: 58,
      namedFormClaims: 46,
    });
  });

  it('covers all sixteen named ear forms from the source sequence', () => {
    expect(EAR_NAMED_FORM_SEMANTICS_FR311L.map((item) => item.traditionalLabel)).toEqual([
      '土耳',
      '棋子耳',
      '虎耳',
      '箭羽耳',
      '金耳',
      '木耳',
      '水耳',
      '火耳',
      '豬耳',
      '低反耳',
      '垂肩耳',
      '貼腦耳',
      '開花耳',
      '扇風耳',
      '鼠耳',
      '驢耳',
    ]);
  });

  it('keeps traditional ear subregions source-local and unbound to neutral geometry', () => {
    expect(EAR_TRADITIONAL_REGIONS_FR311L.map((item) => item.regionKey)).toEqual([
      'ear_whole',
      'lun',
      'kuo',
      'ear_gate',
      'earlobe',
      'ear_root',
      'mingmen',
      'tianlun',
      'lower_ear_bone',
    ]);
    expect(EAR_TRADITIONAL_REGIONS_FR311L.every(
      (item) => item.neutralGeometryBindingAuthorized === false,
    )).toBe(true);
  });

  it('keeps ear-to-eye, ear-to-brow and ear-to-mouth relations out of ear-only direct rules', () => {
    const expressions = EAR_DIRECT_RULES_FR311L.map((item) => item.sourceExpression);
    expect(expressions).not.toContain('耳高於目，合受他祿');
    expect(expressions).not.toContain('高，如眉一寸，永不踐貧困');
    expect(expressions).not.toContain('垂珠朝口者，主財壽');
    expect(expressions).not.toContain('下有垂珠肉色光，更來朝口富榮昌');

    expect(EAR_CROSS_REGION_CONTEXTS_FR311L.map((item) => item.contextId)).toEqual(
      expect.arrayContaining([
        'fr311l.context.ear_higher_than_eye',
        'fr311l.context.ear_one_inch_above_brow',
        'fr311l.context.earlobe_toward_mouth',
        'fr311l.context.earlobe_toward_mouth_xufu',
      ]),
    );
  });

  it('reuses the already admitted ear-to-mouth relation instead of minting a duplicate relation', () => {
    const existing = MOUTH_PHILTRUM_DIRECT_CROSS_REGION_EVIDENCE_FR311K.filter(
      (item) => item.relationKey === 'ear_mouth.earlobe_toward_mouth',
    );
    expect(existing).toHaveLength(1);
    expect(existing[0]?.evidenceId).toBe('fr311k.relation.earlobe_toward_mouth');

    const contexts = EAR_CROSS_REGION_CONTEXTS_FR311L.filter(
      (item) => item.participatingRegions.includes('mouth'),
    );
    expect(contexts).toHaveLength(2);
    expect(contexts.every((item) => item.semanticCombinationAuthorized === false)).toBe(true);
  });

  it('keeps named-form cross-region phrases as descriptors rather than independent claims', () => {
    const contexts = EAR_NAMED_FORM_SEMANTICS_FR311L.flatMap((form) =>
      form.descriptors.filter((item) => item.observationKind === 'cross_region_context'),
    );
    expect(contexts).toHaveLength(10);
    expect(contexts.every(
      (item) => item.region === 'context' && item.neutralGeometryBindingAuthorized === false,
    )).toBe(true);

    const arrow = EAR_NAMED_FORM_SEMANTICS_FR311L.find(
      (item) => item.formKey === 'ear.named.arrow_feather',
    );
    expect(arrow?.descriptors.some((item) => item.sourceFragment === '上節高眉寸有餘')).toBe(true);
    expect(arrow?.claims.some((item) => item.sourceFragment === '上節高眉寸有餘')).toBe(false);

    const fire = EAR_NAMED_FORM_SEMANTICS_FR311L.find(
      (item) => item.formKey === 'ear.named.fire',
    );
    expect(fire?.descriptors.some((item) => item.sourceFragment === '山根臥蠶若相應')).toBe(true);
    expect(fire?.claims.some((item) => item.sourceFragment === '山根臥蠶若相應')).toBe(false);
  });

  it('marks uncertain transcription or phrase boundaries explicitly', () => {
    const uncertainRules = EAR_DIRECT_RULES_FR311L.filter(
      (item) => item.certainty === 'phrase_uncertain',
    );
    expect(uncertainRules.map((item) => item.ruleId)).toEqual(expect.arrayContaining([
      'fr311l.ear.left_right_size_adversity',
      'fr311l.ear.upright_like_wood',
      'fr311l.ear.black_flying_spots_break_house',
      'fr311l.ear.gate_roomy_poverty_leaves',
      'fr311l.ear.beast_like_self_settled',
      'fr311l.ear.wood_star_literature_fame',
      'fr311l.ear.white_beyond_face_reputation',
      'fr311l.ear.front_mark_deaf_poor',
    ]));

    const uncertainNamedClaims = EAR_NAMED_FORM_SEMANTICS_FR311L.flatMap((form) =>
      form.claims.filter((item) => item.certainty === 'phrase_uncertain'),
    );
    expect(uncertainNamedClaims).toHaveLength(2);
  });

  it('preserves sensitive source claims only as historical doctrine', () => {
    const spouseDeath = EAR_DIRECT_RULES_FR311L.find(
      (item) => item.ruleId === 'fr311l.ear.paper_thin_spouse_death',
    );
    expect(spouseDeath?.topicKeys).toContain('spouse_relationship');
    expect(spouseDeath?.spouseDeathPredictionAuthorized).toBe(false);

    const hearing = EAR_DIRECT_RULES_FR311L.find(
      (item) => item.ruleId === 'fr311l.ear.front_mark_deaf_poor',
    );
    expect(hearing?.topicKeys).toContain('traditional_health');
    expect(hearing?.healthDiagnosisAuthorized).toBe(false);

    const wolf = EAR_DIRECT_RULES_FR311L.find(
      (item) => item.ruleId === 'fr311l.ear.upper_pointed_wolf_killing_mind',
    );
    expect(wolf?.criminalityFactAuthorized).toBe(false);
    expect(wolf?.personalityFactAuthorized).toBe(false);
    expect(wolf?.moralityFactAuthorized).toBe(false);
  });

  it('keeps every classifier, geometry, prediction and synthesis authority closed', () => {
    for (const value of Object.values(FR311L_EAR_AUTHORITY_BOUNDARY)) {
      expect(value).toBe(false);
    }

    for (const form of EAR_NAMED_FORM_SEMANTICS_FR311L) {
      expect(form.namedFormToNeutralClassifierAuthorized).toBe(false);
      for (const descriptor of form.descriptors) {
        expect(descriptor.neutralGeometryBindingAuthorized).toBe(false);
      }
      for (const claim of form.claims) {
        expect(claim.modernScientificFactAuthorized).toBe(false);
        expect(claim.healthDiagnosisAuthorized).toBe(false);
        expect(claim.lifespanPredictionAuthorized).toBe(false);
        expect(claim.spouseDeathPredictionAuthorized).toBe(false);
        expect(claim.familyDeathPredictionAuthorized).toBe(false);
        expect(claim.fertilityPredictionAuthorized).toBe(false);
        expect(claim.childSexPredictionAuthorized).toBe(false);
        expect(claim.personalityFactAuthorized).toBe(false);
        expect(claim.moralityFactAuthorized).toBe(false);
        expect(claim.criminalityFactAuthorized).toBe(false);
        expect(claim.productInterpretationAuthorized).toBe(false);
      }
    }
  });
});
