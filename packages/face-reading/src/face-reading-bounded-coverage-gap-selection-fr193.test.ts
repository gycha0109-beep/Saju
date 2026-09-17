import { describe, expect, it } from 'vitest';
import {
  FACE_READING_BOUNDED_COVERAGE_GAP_SELECTION_FR193,
  FR193_COVERAGE_GAP_CANDIDATES,
  assertFaceReadingBoundedCoverageGapSelectionFR193,
  assertIssuedFaceReadingBoundedCoverageGapSelectionFR193,
  issueFaceReadingBoundedCoverageGapSelectionFR193,
} from './face-reading-bounded-coverage-gap-selection-fr193.js';

describe('FR193 bounded coverage-gap selection', () => {
  it('pins exactly the three FR192 unverified physical candidates without promoting coverage', () => {
    const issued = issueFaceReadingBoundedCoverageGapSelectionFR193();
    expect(() => assertIssuedFaceReadingBoundedCoverageGapSelectionFR193(issued)).not.toThrow();
    expect(issued.candidates).toBe(FR193_COVERAGE_GAP_CANDIDATES);
    expect(issued.candidates.map((entry) => entry.componentKey)).toEqual(['forehead', 'ear', 'cheek_mid_face']);
    expect(issued.candidates.every((entry) => entry.fr192CoverageState === 'coverage_target_unverified')).toBe(true);
    expect(issued.candidates.every((entry) => entry.coveragePromoted === false)).toBe(true);
    expect(issued.candidates.every((entry) => entry.existingNeutralAuthorityRefs.length === 0)).toBe(true);
  });

  it('selects cheek/mid-face only as the bounded research frontier', () => {
    const issued = issueFaceReadingBoundedCoverageGapSelectionFR193();
    expect(issued.candidates.map((entry) => [entry.componentKey, entry.decision])).toEqual([
      ['forehead', 'blocked_pending_candidate_specific_prerequisite'],
      ['ear', 'blocked_pending_candidate_specific_prerequisite'],
      ['cheek_mid_face', 'selected_bounded_research_frontier'],
    ]);
    expect(issued.selection).toMatchObject({
      mode: 'bounded_research_frontier',
      selectedPhysicalCandidate: 'cheek_mid_face',
      selectedCandidateCoverageStateRemains: 'coverage_target_unverified',
      selectionPromotesCoverage: false,
      providerIndicesMayBeAssigned: false,
      componentGeometryMayBeIssued: false,
    });
    expect(issued.nextFrontier).toBe(
      'establish_cheek_mid_face_neutral_target_model_and_pinned_provider_surface_feasibility_without_assigning_provider_indices',
    );
  });

  it('pins the repository provider version without turning surface topology into component authority', () => {
    const issued = issueFaceReadingBoundedCoverageGapSelectionFR193();
    expect(issued.providerPin).toEqual({
      packageName: '@mediapipe/tasks-vision',
      packageVersion: '0.10.35',
      packageUpgradeAuthorized: false,
    });
    expect(issued.providerEvidenceBoundary).toEqual({
      publishedFacialSurfaceMeshMayBeInvestigated: true,
      publishedFaceOvalTopologyMayBeInvestigated: true,
      facialSurfaceMeshEqualsCheekAuthority: false,
      faceOvalEqualsForeheadHairlineAuthority: false,
      providerTopologyEqualsEarAuthority: false,
      providerIndicesMayBeAssignedToCheek: false,
    });
  });

  it('rejects candidate promotion, arbitrary neutral refs, and blocker drift', () => {
    const issued = issueFaceReadingBoundedCoverageGapSelectionFR193();
    const promoted = issued.candidates.map((entry) => entry.componentKey === 'cheek_mid_face'
      ? { ...entry, coveragePromoted: true }
      : entry);
    expect(() => assertFaceReadingBoundedCoverageGapSelectionFR193({ ...issued, candidates: promoted } as never))
      .toThrow(/fr193_coverage_promotion:cheek_mid_face/);

    const inventedRef = issued.candidates.map((entry) => entry.componentKey === 'cheek_mid_face'
      ? { ...entry, existingNeutralAuthorityRefs: ['invented://cheek-authority'] }
      : entry);
    expect(() => assertFaceReadingBoundedCoverageGapSelectionFR193({ ...issued, candidates: inventedRef } as never))
      .toThrow(/fr193_neutral_authority_ref_drift:cheek_mid_face/);

    const blockerDrift = issued.candidates.map((entry) => entry.componentKey === 'forehead'
      ? { ...entry, blockers: ['invented_blocker'] }
      : entry);
    expect(() => assertFaceReadingBoundedCoverageGapSelectionFR193({ ...issued, candidates: blockerDrift } as never))
      .toThrow(/fr193_blocker_drift:forehead/);
  });

  it('rejects generic outline, provider, and traditional layer collapse', () => {
    const issued = issueFaceReadingBoundedCoverageGapSelectionFR193();
    expect(() => assertFaceReadingBoundedCoverageGapSelectionFR193({
      ...issued,
      providerEvidenceBoundary: { ...issued.providerEvidenceBoundary, facialSurfaceMeshEqualsCheekAuthority: true },
    } as never)).toThrow(/fr193_provider_authority_widening/);
    expect(() => assertFaceReadingBoundedCoverageGapSelectionFR193({
      ...issued,
      providerEvidenceBoundary: { ...issued.providerEvidenceBoundary, faceOvalEqualsForeheadHairlineAuthority: true },
    } as never)).toThrow(/fr193_provider_authority_widening/);
    expect(() => assertFaceReadingBoundedCoverageGapSelectionFR193({
      ...issued,
      layerSeparation: { ...issued.layerSeparation, traditionalMethodologyEqualsNeutralPhysicalGeometry: true },
    } as never)).toThrow(/fr193_layer_collapse/);
  });

  it('rejects package drift, selection drift, and authority widening', () => {
    const issued = issueFaceReadingBoundedCoverageGapSelectionFR193();
    expect(() => assertFaceReadingBoundedCoverageGapSelectionFR193({
      ...issued,
      providerPin: { ...issued.providerPin, packageVersion: '1.0.1' },
    } as never)).toThrow(/fr193_provider_pin_drift/);
    expect(() => assertFaceReadingBoundedCoverageGapSelectionFR193({
      ...issued,
      selection: { ...issued.selection, selectedPhysicalCandidate: 'forehead' },
    } as never)).toThrow(/fr193_selection_drift/);
    expect(() => assertFaceReadingBoundedCoverageGapSelectionFR193({
      ...issued,
      authorityBoundary: { ...issued.authorityBoundary, selectionIssuesProviderLandmarkBindingAuthority: true },
    } as never)).toThrow(/fr193_authority_widening/);
  });

  it('rejects an unissued structural copy', () => {
    expect(() => assertIssuedFaceReadingBoundedCoverageGapSelectionFR193({
      ...FACE_READING_BOUNDED_COVERAGE_GAP_SELECTION_FR193,
    })).toThrow(/fr193_unissued_bounded_coverage_gap_selection/);
  });
});
