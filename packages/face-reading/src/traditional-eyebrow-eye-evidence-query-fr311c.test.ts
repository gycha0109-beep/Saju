import { describe, expect, it } from 'vitest';
import {
  FR311C_INDEX_SUMMARY,
  INTEGRATED_DIRECT_RULES_FR311C,
  INTEGRATED_NAMED_FORM_EVIDENCE_FR311C,
  assertIntegratedEvidenceIndexFR311C,
} from './traditional-eyebrow-eye-evidence-index-fr311c.js';
import {
  assertEvidenceLensesFR311C,
  queryEvidenceLensFR311C,
} from './traditional-face-topic-lenses-fr311c.js';
import {
  assertCombinationResolverFR311C,
  resolveTraditionalCombinationFR311C,
} from './traditional-eyebrow-eye-combination-resolver-fr311c.js';
import {
  queryIntegratedTraditionalEvidenceFR311C,
} from './traditional-eyebrow-eye-evidence-query-fr311c.js';

describe('FR311C integrated eyebrow-eye evidence index and resolver', () => {
  it('indexes exactly 24 eyebrow forms, 39 eye forms, and 203 named-form claims', () => {
    expect(() => assertIntegratedEvidenceIndexFR311C()).not.toThrow();
    expect(FR311C_INDEX_SUMMARY).toMatchObject({
      eyebrowNamedForms: 24,
      eyeNamedForms: 39,
      namedFormsTotal: 63,
      eyebrowClaims: 87,
      eyeClaims: 116,
      namedFormClaimsTotal: 203,
    });
    expect(INTEGRATED_NAMED_FORM_EVIDENCE_FR311C).toHaveLength(203);
    expect(INTEGRATED_DIRECT_RULES_FR311C.length).toBeGreaterThan(0);
  });

  it('finds the direct source combination for short eyes plus long eyebrows', () => {
    expect(() => assertCombinationResolverFR311C()).not.toThrow();

    const result = resolveTraditionalCombinationFR311C({
      morphologyTermKeys: ['eye.short', 'brow.long'],
    });

    expect(result.status).toBe('direct_source_combination');
    expect(result.matchedDirectRuleIds).toEqual(['fr311.combo.eye_short_brow_long']);
    expect(result.synthesisAuthorized).toBe(false);
    expect(result.reinforcementInferenceAuthorized).toBe(false);
    expect(result.cancellationInferenceAuthorized).toBe(false);
  });

  it('distinguishes named-form context from a general combination formula', () => {
    const newMoon = resolveTraditionalCombinationFR311C({
      formKeys: ['eyebrow.named.new_moon'],
      morphologyTermKeys: ['eye.refined'],
    });
    expect(newMoon.status).toBe('named_form_context');
    expect(newMoon.matchedContextIds).toEqual(['fr311c.context.new_moon.eye_refined']);

    const lionEye = resolveTraditionalCombinationFR311C({
      formKeys: ['eye.named.lion'],
      morphologyTermKeys: ['brow.coarse'],
    });
    expect(lionEye.status).toBe('named_form_context');
    expect(lionEye.matchedContextIds).toEqual(['fr311c.context.lion_eye.brow_coarse']);
  });

  it('returns parallel evidence rather than inventing a meaning for flat brows plus downturned eyes', () => {
    const result = resolveTraditionalCombinationFR311C({
      morphologyTermKeys: ['brow.flat', 'eye.tail_down'],
    });

    expect(result.status).toBe('parallel_evidence_only');
    expect(result.matchedDirectRuleIds).toEqual([]);
    expect(result.synthesisAuthorized).toBe(false);
  });

  it('returns unsupported when the requested combination lacks enough direct evidence', () => {
    const result = resolveTraditionalCombinationFR311C({
      morphologyTermKeys: ['brow.sparse', 'eye.deep'],
    });

    expect(result.status).toBe('unsupported');
    expect(result.matchedDirectRuleIds).toEqual([]);
    expect(result.matchedContextIds).toEqual([]);
  });

  it('treats willow-leaf brow inbok evidence as a source conflict rather than a score', () => {
    expect(() => assertEvidenceLensesFR311C()).not.toThrow();

    const result = queryEvidenceLensFR311C({
      lensKey: 'inbok',
      formKeys: ['eyebrow.named.willow_leaf'],
    });

    expect(result.conflictState).toBe('source_conflict');
    expect(result.favorableEvidenceIds.length).toBeGreaterThanOrEqual(2);
    expect(result.challengingEvidenceIds.length).toBeGreaterThanOrEqual(1);
    expect(result.aggregateJudgementAuthorized).toBe(false);
    expect(result.scoreAuthorized).toBe(false);
    expect(result.sourcePriorityAuthorized).toBe(false);
  });

  it('returns direct patron evidence for calling-phoenix eye', () => {
    const result = queryIntegratedTraditionalEvidenceFR311C({
      lensKey: 'patron',
      formKeys: ['eye.named.calling_phoenix'],
    });

    expect(result.status).toBe('evidence_only');
    expect(result.namedEvidenceIds.length).toBeGreaterThan(0);
    expect(result.scoreAuthorized).toBe(false);
    expect(result.synthesisAuthorized).toBe(false);
  });

  it('returns spouse evidence for mandarin-duck eye without merging sexuality claims into spouse evidence', () => {
    const result = queryEvidenceLensFR311C({
      lensKey: 'spouse',
      formKeys: ['eye.named.mandarin_duck'],
    });

    expect(result.namedEvidenceIds.length).toBe(1);
    expect(result.conflictState).toBe('single_direction_or_nonbinary');
  });

  it('does not convert dragon-eye status or wealth into inbok evidence', () => {
    const result = queryIntegratedTraditionalEvidenceFR311C({
      lensKey: 'inbok',
      formKeys: ['eye.named.dragon'],
    });

    expect(result.status).toBe('no_evidence');
    expect(result.namedEvidenceIds).toEqual([]);
    expect(result.directRuleIds).toEqual([]);
  });

  it('keeps uncertain transcription evidence visible but separate in the integrated index', () => {
    const shrimp = INTEGRATED_NAMED_FORM_EVIDENCE_FR311C.filter(
      (item) => item.formKey === 'eye.named.shrimp',
    );

    expect(shrimp.length).toBeGreaterThan(0);
    expect(shrimp.some((item) => item.certainty === 'phrase_uncertain')).toBe(true);
    expect(shrimp.some((item) => item.certainty === 'direct_clear')).toBe(true);
  });

  it('does not leak all named-form claims into morphology-only queries', () => {
    const result = queryIntegratedTraditionalEvidenceFR311C({
      lensKey: 'wealth',
      morphologyTermKeys: ['eye.short', 'brow.long'],
    });

    expect(result.status).toBe('direct_source_combination');
    expect(result.namedEvidenceIds).toEqual([]);
    expect(result.combinationRuleIds).toEqual(['fr311.combo.eye_short_brow_long']);
  });

  it('keeps morphology-only inbok queries limited to matching direct rules', () => {
    const result = queryIntegratedTraditionalEvidenceFR311C({
      lensKey: 'inbok',
      morphologyTermKeys: ['brow.flat', 'eye.tail_down'],
    });

    expect(result.status).toBe('parallel_evidence_only');
    expect(result.namedEvidenceIds).toEqual([]);
    expect(result.directRuleIds).toEqual(['fr311.eye.tail_down']);
  });

});
