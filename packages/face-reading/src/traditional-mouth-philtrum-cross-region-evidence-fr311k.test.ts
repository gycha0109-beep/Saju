import { describe, expect, it } from 'vitest';
import {
  FR311K_AUTHORITY_BOUNDARY,
  FR311K_CROSS_REGION_SUMMARY,
  MOUTH_PHILTRUM_CROSS_REGION_AUDIT_FR311K,
  MOUTH_PHILTRUM_DIRECT_CROSS_REGION_EVIDENCE_FR311K,
  assertMouthPhiltrumCrossRegionEvidenceFR311K,
  resolveMouthPhiltrumCrossRegionEvidenceFR311K,
} from './traditional-mouth-philtrum-cross-region-evidence-fr311k.js';
import {
  FR311J_QUERY_AUTHORITY_BOUNDARY,
  queryFaceEvidenceFR311J,
} from './traditional-face-evidence-query-fr311j.js';
import {
  FR311J_OUTPUT_AUTHORITY_BOUNDARY,
  buildTraditionalFaceReadingOutputFR311J,
} from './traditional-face-reading-output-fr311j.js';

describe('FR311K mouth/philtrum cross-region audit and integration', () => {
  it('audits the approved Shenxiang corpus volumes with explicit adjudication counts', () => {
    expect(() => assertMouthPhiltrumCrossRegionEvidenceFR311K()).not.toThrow();
    expect(FR311K_CROSS_REGION_SUMMARY).toMatchObject({
      corpusVolumes: [631, 632, 633, 634],
      auditCandidates: 35,
      directRelations: 7,
      directCombinations: 14,
      namedFormContexts: 9,
      descriptiveCompanions: 3,
      uncertain: 1,
      excluded: 1,
      directEvidenceRecords: 21,
      uniqueRelationKeys: 6,
      uniqueCombinationKeys: 13,
    });
  });

  it('keeps every non-direct audit candidate non-generalizable', () => {
    const nonDirect = MOUTH_PHILTRUM_CROSS_REGION_AUDIT_FR311K.filter(
      (item) =>
        item.adjudication !== 'direct_cross_region_relation' &&
        item.adjudication !== 'direct_cross_region_combination',
    );
    expect(nonDirect.length).toBeGreaterThan(0);
    expect(nonDirect.every((item) => item.generalizationAuthorized === false)).toBe(true);
  });

  it('keeps the ambiguous lip/beard phrase out of direct evidence', () => {
    const uncertain = MOUTH_PHILTRUM_CROSS_REGION_AUDIT_FR311K.find(
      (item) => item.candidateId === 'fr311k.audit.633.lip_no_beard_uncertain',
    );
    expect(uncertain?.adjudication).toBe('phrase_boundary_uncertain');
    expect(
      MOUTH_PHILTRUM_DIRECT_CROSS_REGION_EVIDENCE_FR311K.some(
        (item) => item.candidateId === uncertain?.candidateId,
      ),
    ).toBe(false);
  });

  it('does not promote monkey-mouth philtrum context into a direct rule', () => {
    const monkey = MOUTH_PHILTRUM_CROSS_REGION_AUDIT_FR311K.find(
      (item) => item.candidateId === 'fr311k.audit.634.monkey_mouth_philtrum',
    );
    expect(monkey?.adjudication).toBe('named_form_context');
    expect(monkey?.generalizationAuthorized).toBe(false);

    const query = queryFaceEvidenceFR311J({
      lensKey: 'longevity',
      formKeys: ['mouth.named.monkey'],
    });
    expect(query.crossRegionEvidenceIds).toEqual([]);
  });

  it('requires an exact relation key for the ear-to-mouth relation', () => {
    const missing = resolveMouthPhiltrumCrossRegionEvidenceFR311K({
      allowedTopicKeys: ['wealth'],
    });
    expect(missing.status).toBe('unsupported');

    const exact = resolveMouthPhiltrumCrossRegionEvidenceFR311K({
      relationKeys: ['ear_mouth.earlobe_toward_mouth'],
      allowedTopicKeys: ['wealth'],
    });
    expect(exact.status).toBe('direct_source_relation');
    expect(exact.matchedEvidenceIds).toEqual([
      'fr311k.relation.earlobe_toward_mouth',
    ]);
  });

  it('requires an exact combination key for the lip-and-teeth longevity formula', () => {
    const result = resolveMouthPhiltrumCrossRegionEvidenceFR311K({
      combinationKeys: ['lip_teeth.long_lip_short_teeth'],
      allowedTopicKeys: ['longevity'],
    });
    expect(result.status).toBe('direct_source_combination');
    expect(result.matchedEvidenceIds).toEqual([
      'fr311k.combination.long_lip_short_teeth',
    ]);
  });

  it('retains both relation and combination evidence when both exact keys are supplied', () => {
    const result = resolveMouthPhiltrumCrossRegionEvidenceFR311K({
      relationKeys: ['mouth_teeth.open_exposed'],
      combinationKeys: ['lip_teeth.long_lip_short_teeth'],
      allowedTopicKeys: ['longevity'],
    });
    expect(result.status).toBe('direct_source_combination');
    expect(result.matchedEvidenceIds).toEqual([
      'fr311k.combination.long_lip_short_teeth',
      'fr311k.relation.mouth_open_teeth_exposed_short_life',
    ]);
    expect(result.matchedRelationKeys).toEqual(['mouth_teeth.open_exposed']);
    expect(result.matchedCombinationKeys).toEqual(['lip_teeth.long_lip_short_teeth']);
  });

  it('integrates an exact relation into the face-wide wealth query', () => {
    const result = queryFaceEvidenceFR311J({
      lensKey: 'wealth',
      relationKeys: ['ear_mouth.earlobe_toward_mouth'],
    });
    expect(result.status).toBe('direct_source_relation');
    expect(result.crossRegionEvidenceIds).toEqual([
      'fr311k.relation.earlobe_toward_mouth',
    ]);
    expect(result.favorableEvidenceIds).toContain(
      'fr311k.relation.earlobe_toward_mouth',
    );
  });

  it('integrates an exact combination into the face-wide longevity query', () => {
    const result = queryFaceEvidenceFR311J({
      lensKey: 'longevity',
      combinationKeys: ['lip_teeth.long_lip_short_teeth'],
    });
    expect(result.status).toBe('direct_source_combination');
    expect(result.crossRegionEvidenceIds).toEqual([
      'fr311k.combination.long_lip_short_teeth',
    ]);
    expect(result.favorableEvidenceIds).toContain(
      'fr311k.combination.long_lip_short_teeth',
    );
  });

  it('detects source conflict across an explicit direct combination and relation', () => {
    const result = queryFaceEvidenceFR311J({
      lensKey: 'longevity',
      relationKeys: ['mouth_teeth.open_exposed'],
      combinationKeys: ['lip_teeth.long_lip_short_teeth'],
    });
    expect(result.status).toBe('source_conflict');
    expect(result.favorableEvidenceIds).toContain(
      'fr311k.combination.long_lip_short_teeth',
    );
    expect(result.challengingEvidenceIds).toContain(
      'fr311k.relation.mouth_open_teeth_exposed_short_life',
    );
  });

  it('does not infer an approved combination from independent feature or form inputs', () => {
    const result = queryFaceEvidenceFR311J({
      lensKey: 'longevity',
      formKeys: ['mouth.named.monkey'],
      morphologyTermKeys: ['lip.long', 'teeth.short'],
    });
    expect(result.crossRegionEvidenceIds).toEqual([]);
    expect(result.combinationKeys).toEqual([]);
  });

  it('filters the shared mouth-open-teeth relation by the requested topic lens', () => {
    const longevity = queryFaceEvidenceFR311J({
      lensKey: 'longevity',
      relationKeys: ['mouth_teeth.open_exposed'],
    });
    const conduct = queryFaceEvidenceFR311J({
      lensKey: 'integrity_conduct',
      relationKeys: ['mouth_teeth.open_exposed'],
    });

    expect(longevity.crossRegionEvidenceIds).toEqual([
      'fr311k.relation.mouth_open_teeth_exposed_short_life',
    ]);
    expect(conduct.crossRegionEvidenceIds).toEqual([
      'fr311k.relation.mouth_open_teeth_exposed_no_mechanism',
    ]);
  });

  it('surfaces direct cross-region evidence in the existing output contract', () => {
    const output = buildTraditionalFaceReadingOutputFR311J({
      lensKey: 'wealth',
      relationKeys: ['ear_mouth.earlobe_toward_mouth'],
    });

    expect(output.outputStatus).toBe('direct_relation');
    expect(output.evidenceSections.favorable.map((item) => item.evidenceId)).toContain(
      'fr311k.relation.earlobe_toward_mouth',
    );
    expect(output.combinationAssessment.directCrossRegionEvidenceIds).toEqual([
      'fr311k.relation.earlobe_toward_mouth',
    ]);
    expect(output.combinationAssessment.relationKeys).toContain(
      'ear_mouth.earlobe_toward_mouth',
    );
  });

  it('surfaces the exact combination key without authorizing combination inference', () => {
    const output = buildTraditionalFaceReadingOutputFR311J({
      lensKey: 'learning_talent',
      combinationKeys: ['lip_teeth.red_lip_white_teeth'],
    });

    expect(output.outputStatus).toBe('direct_combination');
    expect(output.combinationAssessment.combinationKeys).toEqual([
      'lip_teeth.red_lip_white_teeth',
    ]);
    expect(output.combinationAssessment.combinationInferenceAuthorized).toBe(false);
    expect(output.combinationInferenceAuthorized).toBe(false);
  });

  it('keeps all modern-fact, prediction, scoring, geometry and inference permissions closed', () => {
    for (const boundary of [
      FR311K_AUTHORITY_BOUNDARY,
      FR311J_QUERY_AUTHORITY_BOUNDARY,
      FR311J_OUTPUT_AUTHORITY_BOUNDARY,
    ]) {
      for (const value of Object.values(boundary)) {
        expect(value).toBe(false);
      }
    }

    for (const evidence of MOUTH_PHILTRUM_DIRECT_CROSS_REGION_EVIDENCE_FR311K) {
      expect(evidence.relationInferenceAuthorized).toBe(false);
      expect(evidence.combinationInferenceAuthorized).toBe(false);
      expect(evidence.reinforcementAuthorized).toBe(false);
      expect(evidence.cancellationAuthorized).toBe(false);
      expect(evidence.neutralGeometryBindingAuthorized).toBe(false);
      expect(evidence.healthDiagnosisAuthorized).toBe(false);
      expect(evidence.lifespanPredictionAuthorized).toBe(false);
      expect(evidence.fertilityPredictionAuthorized).toBe(false);
      expect(evidence.childSexPredictionAuthorized).toBe(false);
      expect(evidence.personalityFactAuthorized).toBe(false);
      expect(evidence.criminalityInferenceAuthorized).toBe(false);
      expect(evidence.productInterpretationAuthorized).toBe(false);
    }
  });
});
