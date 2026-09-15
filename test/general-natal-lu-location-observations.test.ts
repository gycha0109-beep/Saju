import { describe, expect, test } from 'vitest';
import * as luLocationModule from '../src/research/general-natal-lu-location-observations.js';
import {
  GENERAL_NATAL_EARTH_LU_ATTACHMENT_BOUNDARY,
  GENERAL_NATAL_FOUR_ELEMENT_DOCTRINAL_LU_LOCATION_MAPPING,
  GENERAL_NATAL_FOUR_ELEMENT_LU_LOCATION_EVIDENCE,
  GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_AUTHORITY,
  GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_DEFINITION_HASH,
  GENERAL_NATAL_LU_LOCATION_SOURCE_OBSERVATIONS,
} from '../src/research/general-natal-lu-location-observations.js';
import { GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_AUTHORITY } from '../src/research/general-natal-root-term-binding-authority.js';

describe('General Natal selected-source Lu-location observations', () => {
  test('pins the four-element doctrinal Lu-location observation registry', () => {
    expect(GENERAL_NATAL_FOUR_ELEMENT_DOCTRINAL_LU_LOCATION_MAPPING).toEqual({
      목: '인',
      화: '사',
      금: '신',
      수: '해',
    });

    expect(GENERAL_NATAL_FOUR_ELEMENT_LU_LOCATION_EVIDENCE.목.branch).toBe('인');
    expect(GENERAL_NATAL_FOUR_ELEMENT_LU_LOCATION_EVIDENCE.화.branch).toBe('사');
    expect(GENERAL_NATAL_FOUR_ELEMENT_LU_LOCATION_EVIDENCE.금.branch).toBe('신');
    expect(GENERAL_NATAL_FOUR_ELEMENT_LU_LOCATION_EVIDENCE.수.branch).toBe('해');
  });

  test('records the direct source anchors and directed analogy without promoting them to a stem matcher', () => {
    const authority = GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_AUTHORITY;

    expect(authority.decision).toBe('AUTHORIZED_OBSERVATION_ONLY');
    expect(authority.directSourceLuHeavyRootSemanticObserved).toBe(true);
    expect(authority.directSourceLuLinguanTermEquivalenceObserved).toBe(true);
    expect(authority.directSourceFourLuLocationScopeObserved).toBe(true);
    expect(authority.directSourceFireLuLocationObserved).toBe(true);
    expect(authority.directSourceWaterLuLocationObserved).toBe(true);
    expect(authority.directSourceMetalWoodAnalogyObserved).toBe(true);
    expect(authority.fourElementDoctrinalLuLocationRegistryAuthorizedObservationOnly).toBe(true);
    expect(GENERAL_NATAL_LU_LOCATION_SOURCE_OBSERVATIONS).toHaveLength(6);
    expect(GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_DEFINITION_HASH).toMatch(/^[0-9a-f]{64}$/);
  });

  test('preserves the Earth multi-attachment boundary instead of inventing one fixed Lu branch', () => {
    expect(GENERAL_NATAL_EARTH_LU_ATTACHMENT_BOUNDARY).toEqual({
      fireAttachedLu: {
        branch: '사',
        sourceAnchor: '附火而生，生於寅，祿於巳',
      },
      waterAttachedLu: {
        branch: '해',
        sourceAnchor: '附水而生，生於申，祿於亥',
      },
      singleFixedLuLocationResolved: false,
      canonicalElementAndBranchSufficientToSelectAttachment: false,
      attachmentSelectionRuleAuthorized: false,
    });

    const authority = GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_AUTHORITY;
    expect(authority.directSourceEarthMultiAttachmentBoundaryObserved).toBe(true);
    expect(authority.earthSingleLuLocationResolved).toBe(false);
    expect(authority.earthAttachmentSelectionRuleAuthorized).toBe(false);
  });

  test('preserves #559 source-internal Yin-Lu ambiguity and exports no stem/day-master evaluator', () => {
    const authority = GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_AUTHORITY;

    expect(GENERAL_NATAL_LU_LINGUAN_TERM_BINDING_AUTHORITY.sourceInternalYinLuInterpretation).toBe(
      'AMBIGUOUS',
    );
    expect(authority.sourceInternalYinLuInterpretation).toBe('AMBIGUOUS');
    expect(authority.sourceInternalYinLuAmbiguityPreserved).toBe(true);
    expect(authority.stemLevelLuBranchMatcherAuthorized).toBe(false);
    expect(authority.luHeavyRootStemMatcherAuthorized).toBe(false);
    expect(Object.keys(luLocationModule).some((key) => key.startsWith('evaluate'))).toBe(false);
  });

  test('keeps cross-tradition mapping, weighting, strength, Gyeokguk, and production escalation closed', () => {
    const authority = GENERAL_NATAL_LU_LOCATION_OBSERVATIONS_AUTHORITY;

    expect(authority.foreignTwelveGrowthMappingConsumedAsLuInput).toBe(false);
    expect(authority.crossTraditionCompositionAuthorized).toBe(false);
    expect(authority.chartFactsConsumed).toBe(false);
    expect(authority.generalizedRootWeightClassifierAuthorized).toBe(false);
    expect(authority.numericRootWeightAuthorized).toBe(false);
    expect(authority.ordinaryStrengthClassificationAuthorized).toBe(false);
    expect(authority.candidateDerivationAuthorized).toBe(false);
    expect(authority.establishmentPredicateAuthorized).toBe(false);
    expect(authority.candidateFactsEmitted).toBe(false);
    expect(authority.establishmentFactsEmitted).toBe(false);
    expect(authority.productionFactEmissionAuthorized).toBe(false);
  });
});
