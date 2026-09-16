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
  it('covers the required physical map and records the corrected neutral mouth authority', () => {
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
    expect(byKey.get('mouth')?.coverageState).toBe('existing_governed');
    expect(byKey.get('mouth')?.authorityRefs).toEqual([
      'packages/face-reading/src/neutral-mouth-contour-metric-fr80.ts',
      'packages/face-reading/src/neutral-mouth-relative-size-metric-fr82.ts',
      'packages/face-reading/src/role-free-arclength-mean-neutral-metric-definition-review-fr97.ts',
    ]);
    expect(byKey.get('chin_lower_face')?.coverageState).toBe('existing_governed');
    expect(byKey.get('forehead')?.coverageState).toBe('coverage_target_unverified');
    expect(byKey.get('ear')?.coverageState).toBe('coverage_target_unverified');
    expect(byKey.get('cheek_mid_face')?.coverageState).toBe('coverage_target_unverified');
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

  it('pins FR191 capture provenance without widening capture sufficiency', () => {
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

  it('rejects layer collapse and attempts to promote an unverified physical target', () => {
    const issued = issueFaceReadingMasterRegionCoverageSkeletonFR192();
    expect(() => assertFaceReadingMasterRegionCoverageSkeletonFR192({
      ...issued,
      layerSeparation: { ...issued.layerSeparation, physicalObservableEqualsTraditionalRegion: true },
    } as never)).toThrow();

    const widened = issued.physicalObservableCoverage.map((entry) => entry.componentKey === 'ear'
      ? { ...entry, coverageState: 'existing_governed' as const, authorityRefs: ['invented://ear-authority'] }
      : entry);
    expect(() => assertFaceReadingMasterRegionCoverageSkeletonFR192({
      ...issued,
      physicalObservableCoverage: widened,
    } as never)).toThrow(/fr192_physical_coverage_state_drift:ear|fr192_physical_authority_ref_drift:ear/);
  });

  it('rejects methodology invention and semantic or Production widening', () => {
    const issued = issueFaceReadingMasterRegionCoverageSkeletonFR192();
    const widenedTraditional = issued.traditionalMethodologyCoverage.map((entry) => entry.systemKey === 'thirteen_positions_family'
      ? { ...entry, coverageState: 'existing_research_only' as const, authorityRefs: ['invented://authority'], methodologyRefs: ['method.invented@1.0.0'], lineageKeys: ['invented'] }
      : entry);
    expect(() => assertFaceReadingMasterRegionCoverageSkeletonFR192({
      ...issued,
      traditionalMethodologyCoverage: widenedTraditional,
    } as never)).toThrow();

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
    })).toThrow(/fr192_unissued_master_region_coverage_skeleton/);
  });
});
