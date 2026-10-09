import { describe, expect, it } from 'vitest';
import {
  CROSS_REGION_RELATIONS_FR311E,
  DIRECT_CROSS_REGION_EVIDENCE_FR311E,
  FR311E_AUTHORITY_BOUNDARY,
  TRANSCRIPTION_CANDIDATES_FR311E,
  assertDirectCrossRegionEvidenceFR311E,
} from './traditional-eyebrow-eye-cross-region-evidence-fr311e.js';
import {
  resolveTraditionalCombinationFR311C,
} from './traditional-eyebrow-eye-combination-resolver-fr311c.js';
import {
  queryIntegratedTraditionalEvidenceFR311C,
} from './traditional-eyebrow-eye-evidence-query-fr311c.js';
import {
  buildTraditionalReadingOutputFR311D,
} from './traditional-reading-output-contract-fr311d.js';

describe('FR311E direct eyebrow-eye combinations and cross-region relations', () => {
  it('registers governed cross-region relations and keeps automatic inference closed', () => {
    expect(() => assertDirectCrossRegionEvidenceFR311E()).not.toThrow();
    expect(CROSS_REGION_RELATIONS_FR311E.map((item) => item.relationKey)).toEqual([
      'brow_eye.brow_extends_beyond_eye',
      'brow_eye.brow_shorter_than_eye',
      'brow_eye.brow_does_not_cover_eye',
      'brow_eye.brow_presses_eye',
      'brow_eye.brow_tail_drops_to_eye',
    ]);

    for (const relation of CROSS_REGION_RELATIONS_FR311E) {
      expect(relation.independentMorphologyInferenceAuthorized).toBe(false);
      expect(relation.metricThresholdAuthorized).toBe(false);
    }
  });

  it('preserves the existing scan-checked short-eye plus long-brow rule', () => {
    const rule = DIRECT_CROSS_REGION_EVIDENCE_FR311E.find(
      (item) => item.ruleId === 'fr311.combo.eye_short_brow_long',
    );

    expect(rule?.evidenceType).toBe('direct_morphology_combination');
    expect(rule?.sourceExpression).toBe('目短眉長，愈益田莊');
    expect(rule?.verificationState).toBe('existing_scan_checked_repository_lineage');
    expect(rule?.nlc1925DirectScanAdjudicated).toBe(true);

    const resolved = resolveTraditionalCombinationFR311C({
      morphologyTermKeys: ['eye.short', 'brow.long'],
      allowedTopicKeys: ['wealth'],
    });
    expect(resolved.status).toBe('direct_source_combination');
    expect(resolved.matchedDirectRuleIds).toEqual(['fr311.combo.eye_short_brow_long']);
  });

  it('promotes dragon-brow plus phoenix-eye only as a direct named-form combination', () => {
    const resolved = resolveTraditionalCombinationFR311C({
      formKeys: ['eyebrow.named.dragon', 'eye.named.phoenix'],
      allowedTopicKeys: ['status', 'career_reputation'],
    });

    expect(resolved.status).toBe('direct_source_combination');
    expect(resolved.matchedDirectRuleIds).toEqual([
      'fr311e.combo.dragon_brow_phoenix_eye',
    ]);

    const output = buildTraditionalReadingOutputFR311D({
      lensKey: 'career',
      formKeys: ['eyebrow.named.dragon', 'eye.named.phoenix'],
    });
    expect(output.outputStatus).toBe('direct_combination');
    expect(output.evidenceSections.directRules.some(
      (item) => item.sourceExpression === '龍眉鳳眼人中貴',
    )).toBe(true);
  });

  it('resolves brow-shorter-than-eye only when the relation is explicitly supplied', () => {
    const relation = resolveTraditionalCombinationFR311C({
      relationKeys: ['brow_eye.brow_shorter_than_eye'],
      allowedTopicKeys: ['temperament'],
    });
    expect(relation.status).toBe('direct_source_relation');
    expect(relation.matchedDirectRuleIds).toEqual([
      'fr311e.relation.brow_shorter_than_eye.temperament',
    ]);
    expect(relation.relationInferenceAuthorized).toBe(false);

    const independent = resolveTraditionalCombinationFR311C({
      morphologyTermKeys: ['brow.short', 'eye.long'],
      allowedTopicKeys: ['temperament'],
    });
    expect(independent.status).not.toBe('direct_source_relation');
    expect(independent.relationInferenceAuthorized).toBe(false);
  });

  it('renders direct relative-position evidence through the reading output contract', () => {
    const output = buildTraditionalReadingOutputFR311D({
      lensKey: 'temperament',
      relationKeys: ['brow_eye.brow_shorter_than_eye'],
    });

    expect(output.outputStatus).toBe('direct_relation');
    expect(output.combinationAssessment.sourceStatus).toBe('direct_source_relation');
    expect(output.combinationAssessment.relationKeys).toEqual([
      'brow_eye.brow_shorter_than_eye',
    ]);
    expect(output.evidenceSections.directRules.some(
      (item) => item.sourceExpression === '眉短於目，心性孤獨',
    )).toBe(true);
  });

  it('does not let a wealth combination become direct evidence for a spouse query', () => {
    const result = queryIntegratedTraditionalEvidenceFR311C({
      lensKey: 'spouse',
      morphologyTermKeys: ['eye.short', 'brow.long'],
    });

    expect(result.status).not.toBe('direct_source_combination');
    expect(result.combinationRuleIds).toEqual([]);
  });

  it('keeps ambiguous Xiangmei transcription fragments as non-promoted candidates', () => {
    expect(TRANSCRIPTION_CANDIDATES_FR311E).toHaveLength(4);
    for (const candidate of TRANSCRIPTION_CANDIDATES_FR311E) {
      expect(candidate.promotionAuthorized).toBe(false);
      expect(candidate.requiresDirectScanAdjudication).toBe(true);
    }
  });

  it('keeps all stronger authority closed', () => {
    expect(FR311E_AUTHORITY_BOUNDARY).toEqual({
      independentMorphologyToRelationInferenceAuthorized: false,
      metricThresholdAuthorized: false,
      namedFormClassifierAuthorized: false,
      candidatePromotionWithoutScanAuthorized: false,
      unsupportedCombinationSynthesisAuthorized: false,
      reinforcementInferenceAuthorized: false,
      cancellationInferenceAuthorized: false,
      modernPsychologyOrMedicalFactAuthorized: false,
      productInterpretationAuthorized: false,
    });
  });
});
