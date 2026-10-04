import { describe, expect, it } from 'vitest';
import {
  FR311D_AUTHORITY_BOUNDARY,
  assertTraditionalReadingOutputContractFR311D,
  buildTraditionalReadingOutputFR311D,
} from './traditional-reading-output-contract-fr311d.js';

describe('FR311D evidence-grounded reading output contract', () => {
  it('keeps willow-leaf brow plus calling-phoenix eye inbok evidence as an explicit conflict', () => {
    const output = buildTraditionalReadingOutputFR311D({
      lensKey: 'inbok',
      formKeys: ['eyebrow.named.willow_leaf', 'eye.named.calling_phoenix'],
    });

    expect(output.outputStatus).toBe('conflict');
    expect(output.evidenceSections.favorable.length).toBeGreaterThanOrEqual(3);
    expect(output.evidenceSections.challenging.length).toBeGreaterThanOrEqual(1);
    expect(output.headline).toContain('서로 다른 방향');
    expect(output.scoreAuthorized).toBe(false);
    expect(output.aggregateGoodBadJudgementAuthorized).toBe(false);
    expect(output.limitations.some((item) => item.includes('어느 한쪽을 우선하지 않는다'))).toBe(true);
  });

  it('renders short-eye plus long-brow wealth as a direct source combination only', () => {
    const output = buildTraditionalReadingOutputFR311D({
      lensKey: 'wealth',
      morphologyTermKeys: ['eye.short', 'brow.long'],
    });

    expect(output.outputStatus).toBe('direct_combination');
    expect(output.combinationAssessment.sourceStatus).toBe('direct_source_combination');
    expect(output.combinationAssessment.directCombinationRuleIds).toEqual([
      'fr311.combo.eye_short_brow_long',
    ]);
    expect(output.evidenceSections.directRules.some(
      (item) => item.sourceExpression === '目短眉長，愈益田莊',
    )).toBe(true);
    expect(output.combinationAssessment.reinforcementAuthorized).toBe(false);
    expect(output.combinationAssessment.cancellationAuthorized).toBe(false);
  });

  it('renders flat brows plus downturned eyes as parallel evidence rather than invented combination meaning', () => {
    const output = buildTraditionalReadingOutputFR311D({
      lensKey: 'inbok',
      morphologyTermKeys: ['brow.flat', 'eye.tail_down'],
    });

    expect(output.outputStatus).toBe('parallel_evidence');
    expect(output.combinationAssessment.sourceStatus).toBe('parallel_evidence_only');
    expect(output.combinationAssessment.directCombinationRuleIds).toEqual([]);
    expect(output.headline).toContain('직접 조합 의미는 확인되지 않는다');
    expect(output.unsupportedSynthesisAuthorized).toBe(false);
  });

  it('keeps named-form context distinct from an independent combination formula', () => {
    const output = buildTraditionalReadingOutputFR311D({
      lensKey: 'career',
      formKeys: ['eyebrow.named.new_moon'],
      morphologyTermKeys: ['eye.refined'],
    });

    expect(output.outputStatus).toBe('named_form_context');
    expect(output.combinationAssessment.sourceStatus).toBe('named_form_context');
    expect(output.evidenceSections.contextOnly.some(
      (item) => item.sourceExpression.includes('眉清目秀'),
    )).toBe(true);
    expect(output.evidenceSections.contextOnly.every(
      (item) => item.combinationSemanticAuthorized === false,
    )).toBe(true);
  });

  it('does not fill dragon-eye inbok gaps with wealth or status evidence', () => {
    const output = buildTraditionalReadingOutputFR311D({
      lensKey: 'inbok',
      formKeys: ['eye.named.dragon'],
    });

    expect(output.outputStatus).toBe('no_direct_evidence');
    expect(output.evidenceSections.favorable).toEqual([]);
    expect(output.evidenceSections.challenging).toEqual([]);
    expect(output.evidenceSections.mixedOrConditional).toEqual([]);
    expect(output.evidenceSections.uncertain).toEqual([]);
    expect(output.limitations.some((item) => item.includes('빈칸을 채우지 않는다'))).toBe(true);
  });

  it('separates uncertain transcription evidence from clear evidence', () => {
    const output = buildTraditionalReadingOutputFR311D({
      lensKey: 'wealth',
      formKeys: ['eye.named.yin_yang'],
    });

    expect(output.outputStatus).toBe('evidence');
    expect(output.evidenceSections.uncertain.length).toBeGreaterThan(0);
    expect(output.evidenceSections.uncertain.every(
      (item) => item.certainty === 'phrase_uncertain',
    )).toBe(true);
    expect(output.limitations.some((item) => item.includes('전사 문구가 불확실'))).toBe(true);
  });

  it('always carries the traditional-doctrine notice and keeps strong authority closed', () => {
    expect(() => assertTraditionalReadingOutputContractFR311D()).not.toThrow();

    const output = buildTraditionalReadingOutputFR311D({
      lensKey: 'spouse',
      formKeys: ['eye.named.mandarin_duck'],
    });

    expect(output.doctrineNotice).toContain('전통 관상 문헌');
    expect(output.doctrineNotice).toContain('현대 과학');
    expect(output.scoreAuthorized).toBe(false);
    expect(output.aggregateGoodBadJudgementAuthorized).toBe(false);
    expect(output.unsupportedSynthesisAuthorized).toBe(false);
    expect(output.sourcePriorityInferenceAuthorized).toBe(false);
    expect(output.productPredictionAuthorized).toBe(false);

    expect(FR311D_AUTHORITY_BOUNDARY).toEqual({
      scoreAuthorized: false,
      aggregateGoodBadJudgementAuthorized: false,
      unsupportedSynthesisAuthorized: false,
      sourcePriorityInferenceAuthorized: false,
      reinforcementInferenceAuthorized: false,
      cancellationInferenceAuthorized: false,
      namedFormClassifierAuthorized: false,
      modernPsychologyOrMedicalFactAuthorized: false,
      productPredictionAuthorized: false,
    });
  });
});
