import { describe, expect, it } from 'vitest';
import {
  EAR_DIRECT_RULE_EVIDENCE_FR311O,
  EAR_NAMED_FORM_CONTEXTS_FR311O,
  EAR_NAMED_FORM_EVIDENCE_FR311O,
  FR311O_INDEX_AUTHORITY_BOUNDARY,
  FR311O_INDEX_SUMMARY,
  assertFaceEarEvidenceIndexFR311O,
} from './traditional-face-ear-evidence-index-fr311o.js';
import {
  queryFaceEvidenceFR311N,
} from './traditional-face-evidence-query-fr311n.js';
import {
  FR311O_QUERY_AUTHORITY_BOUNDARY,
  assertFaceEvidenceQueryFR311O,
  queryFaceEvidenceFR311O,
} from './traditional-face-evidence-query-fr311o.js';
import {
  FR311O_OUTPUT_AUTHORITY_BOUNDARY,
  assertTraditionalFaceReadingOutputFR311O,
  buildTraditionalFaceReadingOutputFR311O,
} from './traditional-face-reading-output-fr311o.js';

describe('FR311O ear standalone face-wide integration', () => {
  it('integrates all FR311L standalone records without count drift', () => {
    expect(FR311O_INDEX_SUMMARY).toMatchObject({
      sourceDirectRules: 57,
      directRules: 57,
      sourceNamedForms: 16,
      namedForms: 16,
      sourceNamedClaims: 46,
      namedClaims: 46,
      namedFormContexts: 10,
    });
    expect(EAR_DIRECT_RULE_EVIDENCE_FR311O).toHaveLength(57);
    expect(EAR_NAMED_FORM_EVIDENCE_FR311O).toHaveLength(46);
    expect(EAR_NAMED_FORM_CONTEXTS_FR311O).toHaveLength(10);
  });

  it('requires an exact ear formKey and returns only lens-matching named claims', () => {
    const result = queryFaceEvidenceFR311O({
      lensKey: 'wealth',
      formKeys: ['ear.named.earth'],
    });

    expect(result.status).toBe('evidence_only');
    expect(result.earNamedEvidenceIds).toEqual([
      'fr311o.named.ear.named.earth.claim.1',
    ]);
    expect(result.favorableEvidenceIds).toContain(
      'fr311o.named.ear.named.earth.claim.1',
    );

    const missing = queryFaceEvidenceFR311O({
      lensKey: 'wealth',
      formKeys: ['ear.named.not_a_real_form'],
    });
    expect(missing.earNamedEvidenceIds).toEqual([]);
  });

  it('never classifies an ear named form from morphology selections', () => {
    const result = queryFaceEvidenceFR311O({
      lensKey: 'wealth',
      morphologyTermKeys: ['ear.thick', 'ear.round', 'ear.red'],
    });

    expect(result.earNamedEvidenceIds).toEqual([]);
    expect(result.namedFormClassifierAuthorized).toBe(false);
  });

  it('requires an exact traditionalRuleId and never selects an ear rule from observation features', () => {
    const exact = queryFaceEvidenceFR311O({
      lensKey: 'wealth',
      traditionalRuleIds: ['fr311l.ear.close_to_head_wealth'],
    });
    expect(exact.earDirectRuleIds).toEqual([
      'fr311l.ear.close_to_head_wealth',
    ]);
    expect(exact.favorableEvidenceIds).toContain(
      'fr311o.direct.fr311l.ear.close_to_head_wealth',
    );

    const noRuleId = queryFaceEvidenceFR311O({
      lensKey: 'wealth',
      morphologyTermKeys: ['ear.close_to_head'],
    });
    expect(noRuleId.earDirectRuleIds).toEqual([]);
    expect(noRuleId.directRuleInferenceAuthorized).toBe(false);
  });

  it('keeps phrase-uncertain ear rules separate from directional clear evidence', () => {
    const result = queryFaceEvidenceFR311O({
      lensKey: 'life_course',
      traditionalRuleIds: ['fr311l.ear.left_right_size_adversity'],
    });
    expect(result.earDirectRuleIds).toEqual([
      'fr311l.ear.left_right_size_adversity',
    ]);
    expect(result.uncertainEvidenceIds).toContain(
      'fr311o.direct.fr311l.ear.left_right_size_adversity',
    );
    expect(result.challengingEvidenceIds).not.toContain(
      'fr311o.direct.fr311l.ear.left_right_size_adversity',
    );
  });

  it('exposes named-form cross-region descriptors only as explicitly requested context', () => {
    const contextOnly = queryFaceEvidenceFR311O({
      lensKey: 'traditional_auspice',
      formKeys: ['ear.named.water'],
      earContextDescriptorIds: ['ear.named.water.descriptor.2'],
    });

    expect(contextOnly.earNamedFormContextIds).toEqual([
      'fr311o.context.ear.named.water.descriptor.2',
    ]);
    expect(contextOnly.relationKeys).toEqual([]);
    expect(contextOnly.combinationKeys).toEqual([]);
    expect(contextOnly.contextSemanticPromotionAuthorized).toBe(false);

    const notRequested = queryFaceEvidenceFR311O({
      lensKey: 'traditional_auspice',
      formKeys: ['ear.named.water'],
    });
    expect(notRequested.earNamedFormContextIds).toEqual([]);
  });

  it('does not convert FR311L named-form context into an FR311M/N cross-region key', () => {
    const result = queryFaceEvidenceFR311O({
      lensKey: 'livelihood',
      formKeys: ['ear.named.water'],
      earContextDescriptorIds: ['ear.named.water.descriptor.2'],
    });

    expect(result.earNamedFormContextIds).toEqual([
      'fr311o.context.ear.named.water.descriptor.2',
    ]);
    expect(result.earRelationKeys).toEqual([]);
    expect(result.earCrossRegionEvidenceIds).toEqual([]);
  });

  it('preserves FR311N cross-region ownership and behavior when no standalone ear evidence is selected', () => {
    const query = {
      lensKey: 'livelihood' as const,
      relationKeys: ['ear_eye.ear_higher_than_eye'],
    };
    const base = queryFaceEvidenceFR311N(query);
    const integrated = queryFaceEvidenceFR311O(query);

    expect(integrated.status).toBe(base.status);
    expect(integrated.crossRegionEvidenceIds).toEqual(base.crossRegionEvidenceIds);
    expect(integrated.earCrossRegionEvidenceIds).toEqual(base.earCrossRegionEvidenceIds);
    expect(integrated.earNamedEvidenceIds).toEqual([]);
    expect(integrated.earDirectRuleIds).toEqual([]);
    expect(integrated.earNamedFormContextIds).toEqual([]);
  });

  it('preserves favorable and challenging standalone evidence as a source conflict', () => {
    const result = queryFaceEvidenceFR311O({
      lensKey: 'wealth',
      formKeys: ['ear.named.earth'],
      traditionalRuleIds: ['fr311l.ear.red_black_poverty'],
    });

    expect(result.status).toBe('source_conflict');
    expect(result.favorableEvidenceIds).toContain(
      'fr311o.named.ear.named.earth.claim.1',
    );
    expect(result.challengingEvidenceIds).toContain(
      'fr311o.direct.fr311l.ear.red_black_poverty',
    );
    expect(result.sourcePriorityAuthorized).toBe(false);
    expect(result.sourceCountWeightingAuthorized).toBe(false);
    expect(result.reinforcementAuthorized).toBe(false);
    expect(result.cancellationAuthorized).toBe(false);
  });

  it('renders ear standalone named claims, direct rules and context without synthesis', () => {
    const output = buildTraditionalFaceReadingOutputFR311O({
      lensKey: 'wealth',
      formKeys: ['ear.named.earth'],
      traditionalRuleIds: ['fr311l.ear.close_to_head_wealth'],
    });

    expect(output.contractVersion).toBe('fr311o-v1');
    expect(output.outputStatus).toBe('evidence');
    expect(output.combinationAssessment.earStandaloneNamedEvidenceIds).toEqual([
      'fr311o.named.ear.named.earth.claim.1',
    ]);
    expect(output.combinationAssessment.earStandaloneDirectRuleIds).toEqual([
      'fr311l.ear.close_to_head_wealth',
    ]);
    expect(output.evidenceSections.favorable).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          evidenceId: 'fr311o.named.ear.named.earth.claim.1',
          region: 'ear',
          sourceExpression: '富貴',
          historicalTraditionalDoctrineOnly: true,
          modernScientificFactAuthorized: false,
        }),
        expect.objectContaining({
          evidenceId: 'fr311o.direct.fr311l.ear.close_to_head_wealth',
          region: 'ear',
          sourceExpression: '貼肉者富足',
          historicalTraditionalDoctrineOnly: true,
          modernScientificFactAuthorized: false,
        }),
      ]),
    );
    expect(output.scoreAuthorized).toBe(false);
    expect(output.unsupportedSynthesisAuthorized).toBe(false);
  });

  it('keeps spouse-death and related historical claims non-predictive in output', () => {
    const output = buildTraditionalFaceReadingOutputFR311O({
      lensKey: 'spouse',
      traditionalRuleIds: ['fr311l.ear.paper_thin_spouse_death'],
    });

    expect(output.evidenceSections.challenging).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          evidenceId: 'fr311o.direct.fr311l.ear.paper_thin_spouse_death',
          sourceExpression: '耳薄如紙，夫死無疑',
          historicalTraditionalDoctrineOnly: true,
        }),
      ]),
    );
    expect(output.spouseDeathPredictionAuthorized).toBe(false);
    expect(output.familyDeathPredictionAuthorized).toBe(false);
    expect(output.lifespanPredictionAuthorized).toBe(false);
    expect(output.healthDiagnosisAuthorized).toBe(false);
  });

  it('keeps every index/query/output authority boundary closed', () => {
    assertFaceEarEvidenceIndexFR311O();
    assertFaceEvidenceQueryFR311O();
    assertTraditionalFaceReadingOutputFR311O();

    for (const [key, flag] of Object.entries(FR311O_INDEX_AUTHORITY_BOUNDARY)) {
      expect(flag, key).toBe(false);
    }
    for (const [key, flag] of Object.entries(FR311O_QUERY_AUTHORITY_BOUNDARY)) {
      expect(flag, key).toBe(false);
    }
    for (const [key, flag] of Object.entries(FR311O_OUTPUT_AUTHORITY_BOUNDARY)) {
      expect(flag, key).toBe(false);
    }
  });
});
