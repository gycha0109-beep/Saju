import { describe, expect, it } from 'vitest';
import {
  FR266_REFERENCE_REF,
  PROVIDER_INDEPENDENT_NASAL_APEX_AUTHORITY_FR266,
  assertNeutralNasalApexVerticalReferenceFR266,
  assertProviderIndependentNasalApexAuthorityFR266,
  deriveNeutralNasalApexVerticalReferenceFR266,
  type ProviderIndependentNasalApexAnnotationFR266V1,
} from './provider-independent-nasal-apex-reference-fr266.js';

function annotation(
  overrides: Partial<ProviderIndependentNasalApexAnnotationFR266V1> = {},
): ProviderIndependentNasalApexAnnotationFR266V1 {
  return {
    schemaVersion: 'fr266-provider-independent-nasal-apex-annotation-v1',
    subjectId: 'subject-001',
    captureId: 'capture-001',
    annotatorId: 'annotator-001',
    coordinateFrame: 'canonical_aligned_right_handed_metric_3d',
    unit: 'centimeter',
    point: { x: 0.1, y: 1.25, z: 7.5 },
    annotationDefinition:
      'most_prominent_midline_nasal_apex_point_in_canonical_aligned_metric_3d',
    providerOutputVisibleDuringAnnotation: false,
    providerIndicesVisibleDuringAnnotation: false,
    traditionalLabelVisibleDuringAnnotation: false,
    annotationFrozenBeforeProviderScoring: true,
    ...overrides,
  };
}

describe('FR266 provider-independent nasal apex reference', () => {
  it('keeps literature support separate from traditional Zhuntou equivalence', () => {
    expect(() =>
      assertProviderIndependentNasalApexAuthorityFR266(
        PROVIDER_INDEPENDENT_NASAL_APEX_AUTHORITY_FR266,
      )
    ).not.toThrow();

    expect(
      PROVIDER_INDEPENDENT_NASAL_APEX_AUTHORITY_FR266.evidence.length,
    ).toBeGreaterThanOrEqual(3);
    expect(
      PROVIDER_INDEPENDENT_NASAL_APEX_AUTHORITY_FR266.evidence.every(
        (entry) =>
          entry.supportsProviderIndependentNasalApexAnnotation === true &&
          entry.supportsTraditionalZhuntouEquivalence === false,
      ),
    ).toBe(true);
  });

  it('projects the frozen independent 3D annotation into the FR265 metric XY frame', () => {
    const result = deriveNeutralNasalApexVerticalReferenceFR266(annotation());

    expect(result.referenceRef).toBe(FR266_REFERENCE_REF);
    expect(result.value).toBe(1.25);
    expect(result.unit).toBe('centimeter');
    expect(result.coordinateFrame).toBe(
      'canonical_aligned_right_handed_metric_xy',
    );
  });

  it('is deterministic for the same frozen annotation', () => {
    const first = deriveNeutralNasalApexVerticalReferenceFR266(annotation());
    const second = deriveNeutralNasalApexVerticalReferenceFR266(annotation());
    expect(second).toEqual(first);
  });

  it('rejects provider-visible or traditional-label-visible annotations', () => {
    expect(() =>
      deriveNeutralNasalApexVerticalReferenceFR266(
        annotation({ providerOutputVisibleDuringAnnotation: true as false }),
      )
    ).toThrow(/annotation protocol boundary drift/);

    expect(() =>
      deriveNeutralNasalApexVerticalReferenceFR266(
        annotation({ traditionalLabelVisibleDuringAnnotation: true as false }),
      )
    ).toThrow(/annotation protocol boundary drift/);
  });

  it('rejects annotations that were not frozen before provider scoring', () => {
    expect(() =>
      deriveNeutralNasalApexVerticalReferenceFR266(
        annotation({ annotationFrozenBeforeProviderScoring: false as true }),
      )
    ).toThrow(/annotation protocol boundary drift/);
  });

  it('rejects non-finite geometry', () => {
    expect(() =>
      deriveNeutralNasalApexVerticalReferenceFR266(
        annotation({ point: { x: 0, y: Number.NaN, z: 1 } }),
      )
    ).toThrow(/finite x\/y\/z/);
  });

  it('keeps automation, provider mapping, Zhuntou and semantic authority closed', () => {
    const result = deriveNeutralNasalApexVerticalReferenceFR266(annotation());
    expect(result.authorityBoundary).toEqual({
      neutralResearchReferenceOnly: true,
      automatedExtractionIssued: false,
      providerIndexIssued: false,
      providerIndexSemanticBindingIssued: false,
      anthropometricPronasaleIdentityPromotedToProduct: false,
      traditionalZhuntouEquivalenceIssued: false,
      threeDivisionsSpanIssued: false,
      thresholdIssued: false,
      calibrationIssued: false,
      classifierIssued: false,
      F1ClaimIssued: false,
      F6ClaimIssued: false,
      fortuneClaimIssued: false,
      productionActivated: false,
      commerceActivated: false,
    });
  });

  it('rejects forged Zhuntou authority widening', () => {
    const result = deriveNeutralNasalApexVerticalReferenceFR266(annotation());
    expect(() =>
      assertNeutralNasalApexVerticalReferenceFR266({
        ...result,
        authorityBoundary: {
          ...result.authorityBoundary,
          traditionalZhuntouEquivalenceIssued: true,
        },
      } as never),
    ).toThrow(/authority widened/);
  });
});
