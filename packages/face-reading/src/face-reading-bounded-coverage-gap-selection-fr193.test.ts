import { describe, expect, it } from 'vitest';
import {
  FACE_READING_BOUNDED_COVERAGE_GAP_SELECTION_FR193,
  FR193_COVERAGE_GAP_CANDIDATES,
  assertFaceReadingBoundedCoverageGapSelectionFR193,
  assertIssuedFaceReadingBoundedCoverageGapSelectionFR193,
  issueFaceReadingBoundedCoverageGapSelectionFR193,
} from './face-reading-bounded-coverage-gap-selection-fr193.js';

describe('FR193 bounded coverage-gap selection', () => {
  it('pins exactly the three FR192 unverified physical candidates', () => {
    const issued = issueFaceReadingBoundedCoverageGapSelectionFR193();
    expect(() => assertIssuedFaceReadingBoundedCoverageGapSelectionFR193(issued)).not.toThrow();
    expect(issued.candidates).toBe(FR193_COVERAGE_GAP_CANDIDATES);
    expect(issued.candidates.map((entry) => entry.componentKey)).toEqual([
      'forehead',
      'ear',
      'cheek_mid_face',
    ]);
    expect(issued.candidates.every((entry) => entry.fr192CoverageState === 'coverage_target_unverified')).toBe(true);
    expect(issued.candidates.every((entry) => entry.decision === 'blocked_pending_prerequisite')).toBe(true);
    expect(issued.candidates.every((entry) => entry.existingNeutralAuthorityRefs.length === 0)).toBe(true);
  });

  it('selects only the neutral-outline prerequisite and keeps ear independently blocked', () => {
    const issued = issueFaceReadingBoundedCoverageGapSelectionFR193();
    expect(issued.selection).toMatchObject({
      mode: 'prerequisite',
      selectedPhysicalCandidate: null,
      prerequisiteKey: 'establish_provider_independent_whole_face_neutral_outline_support_before_selecting_unverified_component_slice',
      unlockTargets: ['forehead', 'cheek_mid_face'],
      stillIndependentlyBlocked: ['ear'],
    });
    expect(issued.nextFrontier).toBe(
      'establish_provider_independent_whole_face_neutral_outline_support_without_promoting_component_or_traditional_semantics',
    );
  });

  it('pins FR192 provenance without runtime importing or widening FR192 authority', () => {
    const issued = issueFaceReadingBoundedCoverageGapSelectionFR193();
    expect(issued.upstreamCoverageAuthority).toEqual({
      moduleRef: 'packages/face-reading/src/face-reading-master-region-coverage-skeleton-fr192.ts',
      contractId: 'face_reading_master_region_coverage_skeleton_fr192',
      contractVersion: 'FR192-MASTER-REGION-COVERAGE-SKELETON-v1',
      requiredCandidateState: 'coverage_target_unverified',
      nextFrontier: 'select_bounded_whole_face_coverage_gap_from_master_skeleton_without_preselecting_a_vertical_slice',
    });
  });

  it('rejects invented neutral authority and direct candidate promotion', () => {
    const issued = issueFaceReadingBoundedCoverageGapSelectionFR193();
    const inventedAuthority = issued.candidates.map((entry) => entry.componentKey === 'ear'
      ? { ...entry, existingNeutralAuthorityRefs: ['invented://ear-provider-authority'] }
      : entry);
    expect(() => assertFaceReadingBoundedCoverageGapSelectionFR193({
      ...issued,
      candidates: inventedAuthority,
    } as never)).toThrow(/fr193_neutral_authority_ref_drift:ear/);

    expect(() => assertFaceReadingBoundedCoverageGapSelectionFR193({
      ...issued,
      selection: { ...issued.selection, selectedPhysicalCandidate: 'forehead' },
    } as never)).toThrow(/fr193_physical_candidate_selected_without_authority/);
  });

  it('rejects traditional methodology being converted into neutral physical authority', () => {
    const issued = issueFaceReadingBoundedCoverageGapSelectionFR193();
    for (const key of [
      'traditionalMethodologyEqualsNeutralPhysicalGeometry',
      'traditionalRegionEqualsInterpretation',
      'missingProviderSupportMayBeInferredFromTraditionalMaps',
    ] as const) {
      expect(() => assertFaceReadingBoundedCoverageGapSelectionFR193({
        ...issued,
        layerSeparation: { ...issued.layerSeparation, [key]: true },
      } as never)).toThrow(/fr193_layer_collapse/);
    }
  });

  it('rejects candidate omission, reordering, blocker drift, and authority widening', () => {
    const issued = issueFaceReadingBoundedCoverageGapSelectionFR193();
    expect(() => assertFaceReadingBoundedCoverageGapSelectionFR193({
      ...issued,
      candidates: [issued.candidates[1], issued.candidates[0], issued.candidates[2]],
    } as never)).toThrow(/fr193_candidate_order_or_membership_mismatch/);

    const blockerDrift = issued.candidates.map((entry) => entry.componentKey === 'cheek_mid_face'
      ? { ...entry, blockers: ['invented_blocker'] }
      : entry);
    expect(() => assertFaceReadingBoundedCoverageGapSelectionFR193({
      ...issued,
      candidates: blockerDrift,
    } as never)).toThrow(/fr193_blocker_drift:cheek_mid_face/);

    for (const key of [
      'selectionIssuesGeometryAuthority',
      'selectionIssuesCaptureSufficiencyAuthority',
      'selectionIssuesProviderLandmarkBindingAuthority',
      'selectionIssuesTraditionalSemanticAuthority',
      'selectionIssuesMetricAuthority',
      'selectionIssuesThresholdAuthority',
      'selectionIssuesCalibrationAuthority',
      'selectionIssuesClassifierAuthority',
      'participantOrExpertEvidenceCollectionAuthorized',
      'selectionIssuesProductionActivation',
      'selectionIssuesCommerceActivation',
    ] as const) {
      expect(() => assertFaceReadingBoundedCoverageGapSelectionFR193({
        ...issued,
        authorityBoundary: { ...issued.authorityBoundary, [key]: true },
      } as never)).toThrow(/fr193_authority_widening/);
    }
  });

  it('rejects an unissued structural copy', () => {
    expect(() => assertIssuedFaceReadingBoundedCoverageGapSelectionFR193({
      ...FACE_READING_BOUNDED_COVERAGE_GAP_SELECTION_FR193,
    })).toThrow(/fr193_unissued_bounded_coverage_gap_selection/);
  });
});
