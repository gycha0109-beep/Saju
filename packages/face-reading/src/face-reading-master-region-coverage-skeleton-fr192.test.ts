import { describe, expect, it } from 'vitest';
import {
  FACE_READING_MASTER_REGION_COVERAGE_SKELETON_FR192,
  FR192_PHYSICAL_OBSERVABLE_COVERAGE,
  FR192_TRADITIONAL_METHODOLOGY_COVERAGE,
  assertFaceReadingMasterRegionCoverageSkeletonFR192,
  assertIssuedFaceReadingMasterRegionCoverageSkeletonFR192,
  issueFaceReadingMasterRegionCoverageSkeletonFR192,
} from './face-reading-master-region-coverage-skeleton-fr192.js';

describe('FR192 master region / coverage skeleton', () => {
  it('covers the required whole-face physical component map without claiming missing authority', () => {
    const issued = issueFaceReadingMasterRegionCoverageSkeletonFR192();
    expect(() => assertIssuedFaceReadingMasterRegionCoverageSkeletonFR192(issued)).not.toThrow();

    expect(issued.physicalObservableCoverage).toBe(FR192_PHYSICAL_OBSERVABLE_COVERAGE);
    expect(issued.physicalObservableCoverage.map((entry) => entry.componentKey)).toEqual([
      'face',
      'forehead',
      'eyebrow',
      'eye_pair',
      'nose',
      'mouth',
      'ear',
      'cheek_mid_face',
      'chin_lower_face',
    ]);

    const byKey = new Map(issued.physicalObservableCoverage.map((entry) => [entry.componentKey, entry] as const));
    expect(byKey.get('eyebrow')?.coverageState).toBe('existing_governed');
    expect(byKey.get('eye_pair')?.coverageState).toBe('existing_governed');
    expect(byKey.get('nose')?.coverageState).toBe('existing_governed');
    expect(byKey.get('chin_lower_face')?.coverageState).toBe('existing_governed');
    expect(byKey.get('forehead')?.coverageState).toBe('coverage_target_unverified');
    expect(byKey.get('mouth')?.authorityRefs).toEqual([]);
    expect(byKey.get('ear')?.authorityRefs).toEqual([]);
    expect(byKey.get('cheek_mid_face')?.authorityRefs).toEqual([]);
  });

  it('keeps traditional systems separate and preserves lineage-specific research authority', () => {
    const issued = issueFaceReadingMasterRegionCoverageSkeletonFR192();
    expect(issued.traditionalMethodologyCoverage).toBe(FR192_TRADITIONAL_METHODOLOGY_COVERAGE);

    const byKey = new Map(issued.traditionalMethodologyCoverage.map((entry) => [entry.systemKey, entry] as const));
    expect(byKey.get('three_divisions')?.coverageState).toBe('existing_research_only');
    expect(byKey.get('five_officers')?.lineageKeys).toEqual(['shenxiang', 'liuzhuang']);
    expect(byKey.get('six_fus')?.lineageKeys).toEqual(['shenxiang', 'liuzhuang']);
    expect(byKey.get('twelve_palaces')?.methodologyRefs).toEqual([
      'method.shenxiang.twelve_palaces@0.1.0',
      'method.liuzhuang.twelve_palaces@0.1.0',
    ]);
    expect(byKey.get('thirteen_positions_family')?.coverageState).toBe('coverage_target_unverified');
    expect(byKey.get('hundred_year_age_map')?.coverageState).toBe('deferred');
  });

  it('pins FR191 capture provenance without importing or widening FR191 runtime authority', () => {
    const issued = issueFaceReadingMasterRegionCoverageSkeletonFR192();
    expect(issued.upstreamCaptureAuthority).toEqual({
      moduleRef: 'packages/face-reading/src/face-reading-product-capture-view-contract-fr191.ts',
      contractId: 'face_reading_product_capture_view_contract_fr191',
      contractVersion: 'FR191-FRONTAL-PROFILE-PRODUCT-CAPTURE-VIEW-CONTRACT-v1',
      requiredViewRoles: ['frontal', 'profile'],
      profileSideSemantics: 'side_agnostic_profile',
      declaresUniversalOrganCaptureSufficiency: false,
    });
    expect(issued.authorityBoundary.additionalMandatoryCaptureViewsAuthorized).toBe(false);
  });

  it('rejects layer collapse, invented authority, and coverage-state widening', () => {
    const issued = issueFaceReadingMasterRegionCoverageSkeletonFR192();

    expect(() => assertFaceReadingMasterRegionCoverageSkeletonFR192({
      ...issued,
      layerSeparation: {
        ...issued.layerSeparation,
        physicalObservableEqualsTraditionalRegion: true,
      },
    } as never)).toThrow();

    const mouthIndex = issued.physicalObservableCoverage.findIndex((entry) => entry.componentKey === 'mouth');
    const widenedPhysical = issued.physicalObservableCoverage.map((entry, index) => index === mouthIndex
      ? { ...entry, authorityRefs: ['invented://mouth-authority'] }
      : entry);
    expect(() => assertFaceReadingMasterRegionCoverageSkeletonFR192({
      ...issued,
      physicalObservableCoverage: widenedPhysical,
    } as never)).toThrow();

    const thirteenIndex = issued.traditionalMethodologyCoverage.findIndex((entry) => entry.systemKey === 'thirteen_positions_family');
    const widenedTraditional = issued.traditionalMethodologyCoverage.map((entry, index) => index === thirteenIndex
      ? { ...entry, methodologyRefs: ['method.invented@1.0.0'], lineageKeys: ['invented'] }
      : entry);
    expect(() => assertFaceReadingMasterRegionCoverageSkeletonFR192({
      ...issued,
      traditionalMethodologyCoverage: widenedTraditional,
    } as never)).toThrow();
  });

  it('rejects semantic, metric, calibration, classifier, automatic-binding, and Production widening', () => {
    const issued = issueFaceReadingMasterRegionCoverageSkeletonFR192();

    for (const key of [
      'skeletonIssuesGeometryAuthority',
      'skeletonIssuesCaptureSufficiencyAuthority',
      'skeletonIssuesMetricAuthority',
      'skeletonIssuesTraditionalSemanticAuthority',
      'skeletonIssuesThresholdAuthority',
      'skeletonIssuesCalibrationAuthority',
      'skeletonIssuesClassifierAuthority',
      'skeletonIssuesProductionActivation',
      'participantOrExpertEvidenceCollectionAuthorized',
      'automaticTraditionalRegionToProviderLandmarkBindingAuthorized',
      'additionalMandatoryCaptureViewsAuthorized',
    ] as const) {
      expect(() => assertFaceReadingMasterRegionCoverageSkeletonFR192({
        ...issued,
        authorityBoundary: { ...issued.authorityBoundary, [key]: true },
      } as never)).toThrow();
    }

    expect(() => assertIssuedFaceReadingMasterRegionCoverageSkeletonFR192({
      ...FACE_READING_MASTER_REGION_COVERAGE_SKELETON_FR192,
    })).toThrow();
  });
});
