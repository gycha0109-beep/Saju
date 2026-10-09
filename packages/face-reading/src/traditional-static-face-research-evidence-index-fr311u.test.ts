import { describe, expect, it } from 'vitest';
import {
  FR311U_STATIC_RESEARCH_INDEX_AUTHORITY_BOUNDARY,
  FR311U_STATIC_RESEARCH_INDEX_SUMMARY,
  STATIC_FACE_RESEARCH_EVIDENCE_INDEX_FR311U,
  assertStaticFaceResearchEvidenceIndexFR311U,
} from './traditional-static-face-research-evidence-index-fr311u.js';

describe('FR311U full static face-research evidence index', () => {
  it('adds missing-region and methodology research without replacing the legacy authority baseline', () => {
    assertStaticFaceResearchEvidenceIndexFR311U();

    expect(FR311U_STATIC_RESEARCH_INDEX_SUMMARY).toMatchObject({
      legacyCanonicalEvidenceBaseline: 621,
      addedMissingRegionDirectRules: 30,
      addedStaticMethodologyDefinitions: 16,
      staticCoreResearchMissing: 0,
      empiricalValidationStarted: false,
      automaticTraditionalBindingsAuthorized: 0,
      productInterpretationsAuthorized: 0,
    });

    expect(
      FR311U_STATIC_RESEARCH_INDEX_SUMMARY.indexedResearchEntries,
    ).toBe(STATIC_FACE_RESEARCH_EVIDENCE_INDEX_FR311U.length);
  });

  it('keeps every indexed research entry source-backed and unpromoted', () => {
    for (const item of STATIC_FACE_RESEARCH_EVIDENCE_INDEX_FR311U) {
      expect(item.sourceRefs.length, item.indexId).toBeGreaterThan(0);
      expect(item.historicalTraditionalDoctrineOnly, item.indexId).toBe(true);
      expect(item.empiricalValidationStarted, item.indexId).toBe(false);
      expect(item.automaticTraditionalBindingAuthorized, item.indexId)
        .toBe(false);
      expect(item.productInterpretationAuthorized, item.indexId).toBe(false);
    }
  });

  it('does not feed the expanded research index into FR312 automatically', () => {
    expect(FR311U_STATIC_RESEARCH_INDEX_AUTHORITY_BOUNDARY)
      .toMatchObject({
        replacesLegacyFR311PAuthority: false,
        feedsFR312Automatically: false,
        empiricalValidationAuthorized: false,
        automaticTraditionalBindingAuthorized: false,
        providerLandmarkDirectBindingAuthorized: false,
        metricThresholdAuthorized: false,
        populationNormAuthorized: false,
        crossLineageCanonicalMapAuthorized: false,
        namedFormClassifierAuthorized: false,
        aggregateScoreAuthorized: false,
        productInterpretationAuthorized: false,
      });
  });
});
