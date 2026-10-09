import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_SURFACE_FEASIBILITY_FR99,
  NEUTRAL_EAR_SURFACE_FEASIBILITY_READINESS_FR99,
} from './neutral-ear-surface-feasibility-fr99.js';

describe('FR99 neutral ear surface feasibility', () => {
  it('pins the active MediaPipe release and records no direct ear topology', () => {
    expect(NEUTRAL_EAR_SURFACE_FEASIBILITY_FR99.providerPin.packageName).toBe('@mediapipe/tasks-vision');
    expect(NEUTRAL_EAR_SURFACE_FEASIBILITY_FR99.providerPin.packageVersion).toBe('0.10.35');
    expect(NEUTRAL_EAR_SURFACE_FEASIBILITY_FR99.providerPin.releaseTag).toBe('v0.10.35');
    expect(NEUTRAL_EAR_SURFACE_FEASIBILITY_FR99.publishedTopologyAudit.earSpecificNamedTopologyPresent).toBe(false);
    expect(NEUTRAL_EAR_SURFACE_FEASIBILITY_FR99.publishedTopologyAudit.namedTopologyRefs.some((ref) => /EAR/u.test(ref))).toBe(false);
  });

  it('does not repurpose generic provider surfaces as ear authority', () => {
    expect(NEUTRAL_EAR_SURFACE_FEASIBILITY_FR99.publishedTopologyAudit.faceOvalPresent).toBe(true);
    expect(NEUTRAL_EAR_SURFACE_FEASIBILITY_FR99.publishedTopologyAudit.contoursPresent).toBe(true);
    expect(NEUTRAL_EAR_SURFACE_FEASIBILITY_FR99.publishedTopologyAudit.tessellationPresent).toBe(true);
    expect(NEUTRAL_EAR_SURFACE_FEASIBILITY_FR99.publishedTopologyAudit.arbitraryFaceOvalSubgraphMayBeCalledEar).toBe(false);
    expect(NEUTRAL_EAR_SURFACE_FEASIBILITY_FR99.publishedTopologyAudit.arbitraryContoursSubgraphMayBeCalledEar).toBe(false);
    expect(NEUTRAL_EAR_SURFACE_FEASIBILITY_FR99.publishedTopologyAudit.arbitraryTessellationSubgraphMayBeCalledEar).toBe(false);
  });

  it('keeps the current neutral contract and Production fail-closed', () => {
    expect(NEUTRAL_EAR_SURFACE_FEASIBILITY_FR99.observedNeutralContract.earConsumerSlotPresent).toBe(false);
    expect(NEUTRAL_EAR_SURFACE_FEASIBILITY_FR99.observedNeutralContract.earCapabilityPresent).toBe(false);
    expect(NEUTRAL_EAR_SURFACE_FEASIBILITY_FR99.neutralEarSurfaceCandidateIssued).toBe(false);
    expect(NEUTRAL_EAR_SURFACE_FEASIBILITY_FR99.providerLandmarkRefsIssued).toHaveLength(0);
    expect(NEUTRAL_EAR_SURFACE_FEASIBILITY_FR99.traditionalSemanticAuthority).toBe(false);
    expect(NEUTRAL_EAR_SURFACE_FEASIBILITY_FR99.productionNeutralObservationAuthorized).toBe(false);
    expect(NEUTRAL_EAR_SURFACE_FEASIBILITY_FR99.productionAuthorization).toBe(false);
    expect(NEUTRAL_EAR_SURFACE_FEASIBILITY_READINESS_FR99.neutralEarSurfaceCandidateReady).toBe(false);
    expect(NEUTRAL_EAR_SURFACE_FEASIBILITY_READINESS_FR99.traditionalBindingAuthorized).toBe(false);
  });

  it('does not overclaim impossibility from missing named topology', () => {
    expect(NEUTRAL_EAR_SURFACE_FEASIBILITY_FR99.publishedTopologyAudit.namedTopologyAbsenceMeansEarExtractionImpossible).toBe(false);
    expect(NEUTRAL_EAR_SURFACE_FEASIBILITY_FR99.requiredNextEvidence.length).toBeGreaterThan(0);
  });
});
