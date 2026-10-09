import { describe, expect, it } from 'vitest';
import {
  FACE_DIRECT_RULE_EVIDENCE_FR311J,
  FACE_NAMED_FORM_EVIDENCE_FR311J,
  FR311J_INDEX_AUTHORITY_BOUNDARY,
  FR311J_INDEX_SUMMARY,
  MOUTH_NAMED_FORM_CONTEXTS_FR311J,
  assertFaceEvidenceIndexFR311J,
} from './traditional-face-evidence-index-fr311j.js';
import {
  FACE_EVIDENCE_LENSES_FR311J,
  FR311J_QUERY_AUTHORITY_BOUNDARY,
  assertFaceEvidenceLensesFR311J,
  queryFaceEvidenceFR311J,
} from './traditional-face-evidence-query-fr311j.js';
import {
  FR311J_OUTPUT_AUTHORITY_BOUNDARY,
  assertTraditionalFaceReadingOutputFR311J,
  buildTraditionalFaceReadingOutputFR311J,
} from './traditional-face-reading-output-fr311j.js';

describe('FR311J mouth and philtrum face-wide evidence integration', () => {
  it('integrates the expected named-form and claim scale without mutating FR311G', () => {
    expect(() => assertFaceEvidenceIndexFR311J()).not.toThrow();
    expect(FR311J_INDEX_SUMMARY).toMatchObject({
      inheritedNamedForms: 87,
      mouthNamedForms: 16,
      namedFormsTotal: 103,
      inheritedNamedClaims: 257,
      mouthNamedClaims: 45,
      namedClaimsTotal: 302,
      mouthPhiltrumDirectRules: 127,
    });
  });

  it('adds exactly five explicit lenses on top of the existing sixteen', () => {
    expect(() => assertFaceEvidenceLensesFR311J()).not.toThrow();
    expect(FACE_EVIDENCE_LENSES_FR311J).toHaveLength(21);
    expect(FACE_EVIDENCE_LENSES_FR311J.slice(-5).map((item) => item.lensKey)).toEqual([
      'learning_talent',
      'speech_conduct',
      'parents',
      'life_course',
      'traditional_auspice',
    ]);
  });

  it('maps FR311I livelihood explicitly into the existing livelihood lens', () => {
    const result = queryFaceEvidenceFR311J({
      lensKey: 'livelihood',
      formKeys: ['mouth.named.monkey'],
    });
    const items = FACE_NAMED_FORM_EVIDENCE_FR311J.filter(
      (item) => result.namedEvidenceIds.includes(item.evidenceId),
    );
    expect(items.some((item) => item.sourceFragment === '平生衣祿皆榮足')).toBe(true);
  });

  it('keeps learning talent distinct from career even when the same form also has a status claim', () => {
    const learning = queryFaceEvidenceFR311J({
      lensKey: 'learning_talent',
      formKeys: ['mouth.named.cherry'],
    });
    const career = queryFaceEvidenceFR311J({
      lensKey: 'career',
      formKeys: ['mouth.named.cherry'],
    });
    const learningId = 'fr311j.named.fr311i.mouth.named.cherry.claim.2';

    expect(learning.namedEvidenceIds).toContain(learningId);
    expect(career.namedEvidenceIds).not.toContain(learningId);
  });

  it('keeps uncertain speech evidence separate from directional conflict evidence', () => {
    const result = queryFaceEvidenceFR311J({
      lensKey: 'speech_conduct',
      traditionalRuleIds: ['fr311i.mouth.lip_moves_before_speech'],
    });
    const evidenceId = 'fr311j.direct.fr311i.mouth.lip_moves_before_speech';

    expect(result.directRuleIds).toContain('fr311i.mouth.lip_moves_before_speech');
    expect(result.uncertainEvidenceIds).toContain(evidenceId);
    expect(result.challengingEvidenceIds).not.toContain(evidenceId);
    expect(result.status).toBe('evidence_only');
  });

  it('exposes parent rules only through the explicit parents lens', () => {
    const parents = queryFaceEvidenceFR311J({
      lensKey: 'parents',
      traditionalRuleIds: ['fr311i.lip.upper_long'],
    });
    const wealth = queryFaceEvidenceFR311J({
      lensKey: 'wealth',
      traditionalRuleIds: ['fr311i.lip.upper_long'],
    });

    expect(parents.directRuleIds).toEqual(['fr311i.lip.upper_long']);
    expect(parents.challengingEvidenceIds).toContain('fr311j.direct.fr311i.lip.upper_long');
    expect(wealth.directRuleIds).toEqual([]);
  });

  it('keeps life-course rules in the dedicated life-course lens', () => {
    const result = queryFaceEvidenceFR311J({
      lensKey: 'life_course',
      traditionalRuleIds: ['fr311i.philtrum.flat_long'],
    });

    expect(result.directRuleIds).toEqual(['fr311i.philtrum.flat_long']);
    expect(result.favorableEvidenceIds).toContain('fr311j.direct.fr311i.philtrum.flat_long');
  });

  it('keeps traditional auspice as its own source-level lens', () => {
    const result = queryFaceEvidenceFR311J({
      lensKey: 'traditional_auspice',
      traditionalRuleIds: ['fr311i.philtrum.preferred_form'],
    });

    expect(result.directRuleIds).toEqual(['fr311i.philtrum.preferred_form']);
  });

  it('does not split wealth_status into wealth or career implicitly', () => {
    const wealth = queryFaceEvidenceFR311J({
      lensKey: 'wealth',
      formKeys: ['mouth.named.catfish'],
    });
    const career = queryFaceEvidenceFR311J({
      lensKey: 'career',
      formKeys: ['mouth.named.catfish'],
    });
    const wealthStatusId = 'fr311j.named.fr311i.mouth.named.catfish.claim.1';

    expect(wealth.namedEvidenceIds).not.toContain(wealthStatusId);
    expect(career.namedEvidenceIds).not.toContain(wealthStatusId);
  });

  it('requires the exact mouth context descriptor and never promotes it into a children meaning', () => {
    const withoutContext = queryFaceEvidenceFR311J({
      lensKey: 'children',
      formKeys: ['mouth.named.monkey'],
    });
    const withContext = queryFaceEvidenceFR311J({
      lensKey: 'children',
      formKeys: ['mouth.named.monkey'],
      mouthContextDescriptorIds: ['fr311i.mouth.named.monkey.descriptor.2'],
    });

    expect(withoutContext.namedFormContextIds).toEqual([]);
    expect(withContext.namedFormContextIds).toEqual([
      'fr311j.context.fr311i.mouth.named.monkey.descriptor.2',
    ]);
    expect(withContext.status).toBe('no_evidence');
    expect(withContext.namedEvidenceIds).toEqual([]);
    expect(withContext.directRuleIds).toEqual([]);
  });

  it('can show exact named-form context beside a direct claim without making a combination rule', () => {
    const result = queryFaceEvidenceFR311J({
      lensKey: 'learning_talent',
      formKeys: ['mouth.named.cherry'],
      mouthContextDescriptorIds: ['fr311i.mouth.named.cherry.descriptor.3'],
    });

    expect(result.status).toBe('named_form_context');
    expect(result.combinationRuleIds).toEqual([]);
    expect(result.namedFormContextIds).toEqual([
      'fr311j.context.fr311i.mouth.named.cherry.descriptor.3',
    ]);
  });

  it('detects conflict only from clear direct evidence, not phrase-uncertain evidence', () => {
    const clearConflict = queryFaceEvidenceFR311J({
      lensKey: 'longevity',
      traditionalRuleIds: [
        'fr311i.philtrum.deep_long',
        'fr311i.philtrum.shallow_short',
      ],
    });
    const uncertainChallenge = queryFaceEvidenceFR311J({
      lensKey: 'longevity',
      traditionalRuleIds: [
        'fr311i.philtrum.deep_long',
        'fr311i.mouth.lip_lines_blue_thin_hunger',
      ],
    });

    expect(clearConflict.status).toBe('source_conflict');
    expect(uncertainChallenge.status).toBe('evidence_only');
    expect(uncertainChallenge.uncertainEvidenceIds).toContain(
      'fr311j.direct.fr311i.mouth.lip_lines_blue_thin_hunger',
    );
  });

  it('carries source uncertainty into the output uncertain section', () => {
    const output = buildTraditionalFaceReadingOutputFR311J({
      lensKey: 'speech_conduct',
      traditionalRuleIds: ['fr311i.mouth.lip_moves_before_speech'],
    });

    expect(output.evidenceSections.uncertain.map((item) => item.evidenceId)).toContain(
      'fr311j.direct.fr311i.mouth.lip_moves_before_speech',
    );
    expect(output.evidenceSections.challenging).toHaveLength(0);
  });

  it('keeps the legacy nose topic-leakage boundary intact', () => {
    const result = queryFaceEvidenceFR311J({
      lensKey: 'inbok',
      formKeys: ['nose.named.dragon'],
    });

    expect(result.status).toBe('no_evidence');
  });

  it('keeps every modern-fact, prediction, classifier, geometry and synthesis permission closed', () => {
    expect(() => assertTraditionalFaceReadingOutputFR311J()).not.toThrow();

    for (const boundary of [
      FR311J_INDEX_AUTHORITY_BOUNDARY,
      FR311J_QUERY_AUTHORITY_BOUNDARY,
      FR311J_OUTPUT_AUTHORITY_BOUNDARY,
    ]) {
      for (const value of Object.values(boundary)) {
        expect(value).toBe(false);
      }
    }

    for (const item of FACE_NAMED_FORM_EVIDENCE_FR311J) {
      expect(item.healthDiagnosisAuthorized).toBe(false);
      expect(item.lifespanPredictionAuthorized).toBe(false);
      expect(item.fertilityPredictionAuthorized).toBe(false);
      expect(item.childSexPredictionAuthorized).toBe(false);
      expect(item.personalityFactAuthorized).toBe(false);
      expect(item.criminalityInferenceAuthorized).toBe(false);
      expect(item.productInterpretationAuthorized).toBe(false);
    }

    for (const item of FACE_DIRECT_RULE_EVIDENCE_FR311J) {
      expect(item.healthDiagnosisAuthorized).toBe(false);
      expect(item.lifespanPredictionAuthorized).toBe(false);
      expect(item.fertilityPredictionAuthorized).toBe(false);
      expect(item.childSexPredictionAuthorized).toBe(false);
      expect(item.personalityFactAuthorized).toBe(false);
      expect(item.criminalityInferenceAuthorized).toBe(false);
      expect(item.productInterpretationAuthorized).toBe(false);
    }

    expect(MOUTH_NAMED_FORM_CONTEXTS_FR311J.every(
      (item) =>
        item.semanticCombinationAuthorized === false &&
        item.relationInferenceAuthorized === false &&
        item.neutralGeometryBindingAuthorized === false,
    )).toBe(true);
  });
});
