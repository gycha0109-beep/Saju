import { describe, expect, it } from 'vitest';
import { FaceLandmarker } from '@mediapipe/tasks-vision';
import {
  FACE_READING_CHEEK_MID_FACE_NEUTRAL_TARGET_FEASIBILITY_FR194,
  assertFaceReadingCheekMidFaceNeutralTargetFeasibilityFR194,
  assertIssuedFaceReadingCheekMidFaceNeutralTargetFeasibilityFR194,
  inspectMediaPipeCheekMidFaceSurfaceFeasibilityFR194,
  issueFaceReadingCheekMidFaceNeutralTargetFeasibilityFR194,
  type FaceReadingCheekMidFaceNeutralTargetFeasibilityFR194,
} from './face-reading-cheek-mid-face-neutral-target-feasibility-fr194.js';

function cloneAuthority(): FaceReadingCheekMidFaceNeutralTargetFeasibilityFR194 {
  return structuredClone(FACE_READING_CHEEK_MID_FACE_NEUTRAL_TARGET_FEASIBILITY_FR194) as FaceReadingCheekMidFaceNeutralTargetFeasibilityFR194;
}

describe('FR194 cheek/mid-face neutral target + pinned provider feasibility', () => {
  it('pins exactly three reviewed neutral evidence records and preserves their authority limits', () => {
    const authority = assertFaceReadingCheekMidFaceNeutralTargetFeasibilityFR194(
      FACE_READING_CHEEK_MID_FACE_NEUTRAL_TARGET_FEASIBILITY_FR194,
    );
    expect(authority.evidence.map((entry) => entry.evidenceId)).toEqual([
      'evidence.fr194.anas_2019_2d_3d_facial_morphology',
      'evidence.fr194.ibrahim_2016_midface_dense_surface',
      'evidence.fr194.cappella_2024_middle_third_surface_roi',
    ]);
    expect(authority.evidence.every((entry) => entry.providerMappingSupplied === false)).toBe(true);
    expect(authority.evidence.every((entry) => entry.providerIndexAuthoritySupplied === false)).toBe(true);
    expect(authority.evidence.every((entry) => entry.universalCheekBoundarySupplied === false)).toBe(true);
  });

  it('establishes only a bilateral neutral target description while coverage and executable geometry remain blocked', () => {
    const target = FACE_READING_CHEEK_MID_FACE_NEUTRAL_TARGET_FEASIBILITY_FR194.neutralTargetModel;
    expect(target).toEqual({
      layer: 'physical_observable',
      componentKey: 'cheek_mid_face',
      laterality: 'bilateral',
      representation: 'bilateral_lateral_midface_soft_tissue_surface',
      zygionAnchorConceptSupported: true,
      midfaceSurfaceStudySupported: true,
      landmarkSelectedSurfaceRoiSupported: true,
      coverageStateRemains: 'coverage_target_unverified',
      closedBoundaryDefined: false,
      polygonDefined: false,
      centroidAlgorithmDefined: false,
      metricDefined: false,
    });
    expect(FACE_READING_CHEEK_MID_FACE_NEUTRAL_TARGET_FEASIBILITY_FR194.readiness.executableCheekGeometryReady).toBe(false);
  });

  it('pins the exact MediaPipe release/source and keeps semantic cheek mapping false', () => {
    const provider = FACE_READING_CHEEK_MID_FACE_NEUTRAL_TARGET_FEASIBILITY_FR194.providerSurfaceFeasibility;
    expect(provider.packageName).toBe('@mediapipe/tasks-vision');
    expect(provider.packageVersion).toBe('0.10.35');
    expect(provider.sourceTag).toBe('v0.10.35');
    expect(provider.tessellationSymbol).toBe('FACE_LANDMARKS_TESSELATION');
    expect(provider.faceOvalSymbol).toBe('FACE_LANDMARKS_FACE_OVAL');
    expect(provider.faceSurfaceStudyFeasible).toBe(true);
    expect(provider.semanticCheekSubgraphDefined).toBe(false);
    expect(provider.providerToZygionMappingDefined).toBe(false);
    expect(provider.providerIndexSelectionAuthorized).toBe(false);
  });

  it('observes structurally available release-pinned provider surfaces without assigning cheek semantics', () => {
    const inspection = inspectMediaPipeCheekMidFaceSurfaceFeasibilityFR194(FaceLandmarker as unknown as object);
    expect(inspection.tessellationStructurallyAvailable).toBe(true);
    expect(inspection.faceOvalStructurallyAvailable).toBe(true);
    expect(inspection.tessellationEdgeCount).toBeGreaterThan(inspection.faceOvalEdgeCount);
    expect(inspection.tessellationVertexCount).toBeGreaterThan(inspection.faceOvalVertexCount);
    expect(inspection.maxObservedProviderIndex).toBeLessThanOrEqual(477);
    expect(inspection.semanticCheekMappingObserved).toBe(false);
  });

  it('keeps the first two gates satisfied and every mapping/runtime gate blocked', () => {
    expect(FACE_READING_CHEEK_MID_FACE_NEUTRAL_TARGET_FEASIBILITY_FR194.admissionGates.map((gate) => [gate.gateId, gate.state])).toEqual([
      ['external_neutral_target_model', 'satisfied'],
      ['pinned_provider_surface_feasibility', 'satisfied'],
      ['provider_to_neutral_zygion_correspondence', 'blocked'],
      ['cheek_boundary_correspondence', 'blocked'],
      ['controlled_capture_sufficiency', 'blocked'],
      ['deterministic_cheek_geometry', 'blocked'],
    ]);
  });

  it('keeps every authority-widening flag fail-closed', () => {
    expect(Object.values(FACE_READING_CHEEK_MID_FACE_NEUTRAL_TARGET_FEASIBILITY_FR194.authorityBoundary).every((flag) => flag === false)).toBe(true);
  });

  it('rejects evidence promotion into a universal cheek boundary', () => {
    const drift = cloneAuthority() as unknown as {
      evidence: Array<{ universalCheekBoundarySupplied: boolean }>;
    };
    drift.evidence[0]!.universalCheekBoundarySupplied = true;
    expect(() => assertFaceReadingCheekMidFaceNeutralTargetFeasibilityFR194(drift as unknown as FaceReadingCheekMidFaceNeutralTargetFeasibilityFR194)).toThrow('fr194_evidence_authority_widening');
  });

  it('rejects provider index selection or provider-to-zygion promotion', () => {
    const drift = cloneAuthority() as unknown as {
      providerSurfaceFeasibility: {
        providerToZygionMappingDefined: boolean;
        providerIndexSelectionAuthorized: boolean;
      };
    };
    drift.providerSurfaceFeasibility.providerToZygionMappingDefined = true;
    drift.providerSurfaceFeasibility.providerIndexSelectionAuthorized = true;
    expect(() => assertFaceReadingCheekMidFaceNeutralTargetFeasibilityFR194(drift as unknown as FaceReadingCheekMidFaceNeutralTargetFeasibilityFR194)).toThrow('fr194_provider_feasibility_drift');
  });

  it('rejects a fabricated cheek polygon or centroid algorithm', () => {
    const drift = cloneAuthority() as unknown as {
      neutralTargetModel: { polygonDefined: boolean; centroidAlgorithmDefined: boolean };
    };
    drift.neutralTargetModel.polygonDefined = true;
    drift.neutralTargetModel.centroidAlgorithmDefined = true;
    expect(() => assertFaceReadingCheekMidFaceNeutralTargetFeasibilityFR194(drift as unknown as FaceReadingCheekMidFaceNeutralTargetFeasibilityFR194)).toThrow('fr194_neutral_target_model_drift');
  });

  it('rejects Production/Commerce/traditional authority widening', () => {
    const drift = cloneAuthority() as unknown as {
      authorityBoundary: {
        sixFusMayDefineNeutralCheekGeometry: boolean;
        productionActivationIssued: boolean;
        commerceActivationIssued: boolean;
      };
    };
    drift.authorityBoundary.sixFusMayDefineNeutralCheekGeometry = true;
    drift.authorityBoundary.productionActivationIssued = true;
    drift.authorityBoundary.commerceActivationIssued = true;
    expect(() => assertFaceReadingCheekMidFaceNeutralTargetFeasibilityFR194(drift as unknown as FaceReadingCheekMidFaceNeutralTargetFeasibilityFR194)).toThrow('fr194_authority_widening');
  });

  it('requires issued artifacts for issued-authority validation', () => {
    const issued = issueFaceReadingCheekMidFaceNeutralTargetFeasibilityFR194();
    expect(assertIssuedFaceReadingCheekMidFaceNeutralTargetFeasibilityFR194(issued)).toBe(issued);
    expect(() => assertIssuedFaceReadingCheekMidFaceNeutralTargetFeasibilityFR194(FACE_READING_CHEEK_MID_FACE_NEUTRAL_TARGET_FEASIBILITY_FR194)).toThrow('fr194_unissued_cheek_mid_face_neutral_target_feasibility');
  });

  it('pins the next frontier to correspondence evidence before any provider index selection', () => {
    expect(FACE_READING_CHEEK_MID_FACE_NEUTRAL_TARGET_FEASIBILITY_FR194.nextFrontier).toBe(
      'establish_provider_to_neutral_cheek_anchor_correspondence_evidence_before_any_provider_index_selection',
    );
  });
});
