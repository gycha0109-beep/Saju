import { describe, expect, it } from 'vitest';
import {
  EIGHT_STUDY_HALLS_FR311S,
  FIVE_ELEMENT_FORMS_FR311S,
  FIVE_MOUNTAINS_FR311S,
  FIVE_OFFICERS_FR311S,
  FIVE_STARS_SIX_LUMINARIES_FR311S,
  FIVE_METHODS_FR311S,
  FOUR_STUDY_HALLS_FR311S,
  FOUR_WATERWAYS_FR311S,
  FR311S_STATIC_STRUCTURE_AUTHORITY_BOUNDARY,
  FR311S_STATIC_STRUCTURE_SUMMARY,
  SIX_MINISTRIES_FR311S,
  STATIC_METHODOLOGIES_FR311S,
  TEN_OBSERVATIONS_FR311S,
  THIRTEEN_PARTS_FR311S,
  THREE_DIVISIONS_GUJIN631_FR311S,
  THREE_DIVISIONS_GUJIN632_FR311S,
  THREE_MASTERS_FR311S,
  THREE_PILLARS_FR311S,
  TWELVE_PALACE_SUPPLEMENT_FR311S,
  TWELVE_PALACES_FR311S,
  assertStaticStructureMethodologyFR311S,
} from './traditional-static-structure-methodology-fr311s.js';

describe('FR311S static traditional structure methodology', () => {
  it('reviews all selected V1 static methodology families without collapsing lineages', () => {
    assertStaticStructureMethodologyFR311S();

    expect(FR311S_STATIC_STRUCTURE_SUMMARY).toEqual({
      methodologyDefinitions: 16,
      lineageSpecificThreeDivisionDefinitions: 2,
      thirteenParts: 13,
      numberedTwelvePalaces: 12,
      supplementalPalaceTreatments: 1,
      fiveOfficers: 5,
      fiveMountains: 5,
      fourWaterways: 4,
      sixMinistryPairs: 3,
      fiveStarsSixLuminaries: 11,
      fourStudyHalls: 4,
      eightStudyHalls: 8,
      fiveElementForms: 5,
      tenObservations: 10,
      fiveMethods: 5,
      threeMasters: 3,
      threePillars: 3,
    });
  });

  it('keeps the two Three-Divisions source lineages separate', () => {
    expect(THREE_DIVISIONS_GUJIN631_FR311S.lineageId)
      .not.toBe(THREE_DIVISIONS_GUJIN632_FR311S.lineageId);

    expect(
      THREE_DIVISIONS_GUJIN631_FR311S.members
        .map((item) => item.sourceLocatorExpression),
    ).not.toEqual(
      THREE_DIVISIONS_GUJIN632_FR311S.members
        .map((item) => item.sourceLocatorExpression),
    );

    expect(THREE_DIVISIONS_GUJIN631_FR311S.productionRegionMapAuthorized)
      .toBe(false);
    expect(THREE_DIVISIONS_GUJIN632_FR311S.productionRegionMapAuthorized)
      .toBe(false);
  });

  it('preserves the exact numbered structure sizes', () => {
    expect(THIRTEEN_PARTS_FR311S.members).toHaveLength(13);
    expect(TWELVE_PALACES_FR311S.members).toHaveLength(12);
    expect(FIVE_OFFICERS_FR311S.members).toHaveLength(5);
    expect(FIVE_MOUNTAINS_FR311S.members).toHaveLength(5);
    expect(FOUR_WATERWAYS_FR311S.members).toHaveLength(4);
    expect(SIX_MINISTRIES_FR311S.members).toHaveLength(3);
    expect(FIVE_STARS_SIX_LUMINARIES_FR311S.members).toHaveLength(11);
    expect(FOUR_STUDY_HALLS_FR311S.members).toHaveLength(4);
    expect(EIGHT_STUDY_HALLS_FR311S.members).toHaveLength(8);
    expect(FIVE_ELEMENT_FORMS_FR311S.members).toHaveLength(5);
    expect(TEN_OBSERVATIONS_FR311S.members).toHaveLength(10);
    expect(FIVE_METHODS_FR311S.members).toHaveLength(5);
    expect(THREE_MASTERS_FR311S.members).toHaveLength(3);
    expect(THREE_PILLARS_FR311S.members).toHaveLength(3);
  });

  it('does not silently turn the parent-palace supplement into a thirteenth numbered palace', () => {
    expect(TWELVE_PALACE_SUPPLEMENT_FR311S.traditionalLabel).toBe('父母宮');
    expect(
      TWELVE_PALACE_SUPPLEMENT_FR311S.includedInNumberedTwelvePalaces,
    ).toBe(false);
  });

  it('keeps all structure maps research-only and non-geometric', () => {
    for (const definition of STATIC_METHODOLOGIES_FR311S) {
      expect(definition.lineagePinned, definition.methodologyId).toBe(true);
      expect(
        definition.canonicalCrossLineageMergeAuthorized,
        definition.methodologyId,
      ).toBe(false);
      expect(
        definition.neutralGeometryBindingAuthorized,
        definition.methodologyId,
      ).toBe(false);
      expect(
        definition.productionRegionMapAuthorized,
        definition.methodologyId,
      ).toBe(false);
      expect(definition.metricThresholdAuthorized, definition.methodologyId)
        .toBe(false);
      expect(definition.populationNormAuthorized, definition.methodologyId)
        .toBe(false);
      expect(
        definition.automaticTraditionalBindingAuthorized,
        definition.methodologyId,
      ).toBe(false);
      expect(definition.productInterpretationAuthorized, definition.methodologyId)
        .toBe(false);
    }
  });

  it('keeps every global authority gate closed', () => {
    for (const [key, value] of Object.entries(
      FR311S_STATIC_STRUCTURE_AUTHORITY_BOUNDARY,
    )) {
      expect(value, key).toBe(false);
    }
  });
});
