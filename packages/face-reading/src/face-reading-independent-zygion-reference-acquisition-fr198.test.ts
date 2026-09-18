import { describe, expect, it } from 'vitest';
import {
  FACE_READING_INDEPENDENT_ZYGION_REFERENCE_ACQUISITION_FR198,
  assertFaceReadingIndependentZygionReferenceAcquisitionFR198,
  type FaceReadingIndependentZygionReferenceAcquisitionFR198,
} from './face-reading-independent-zygion-reference-acquisition-fr198.js';

function cloneEvidence(): FaceReadingIndependentZygionReferenceAcquisitionFR198 {
  return structuredClone(
    FACE_READING_INDEPENDENT_ZYGION_REFERENCE_ACQUISITION_FR198,
  ) as FaceReadingIndependentZygionReferenceAcquisitionFR198;
}

describe('FR198 independent zygion reference acquisition', () => {
  it('consumes the exact FR197 frontier', () => {
    const evidence = assertFaceReadingIndependentZygionReferenceAcquisitionFR198(
      FACE_READING_INDEPENDENT_ZYGION_REFERENCE_ACQUISITION_FR198,
    );
    expect(evidence.upstreamFR197).toEqual({
      contractVersion: 'FR197-PROVIDER-ZYGION-VALIDATION-PROTOCOL-v1',
      authorityState:
        'independent_zygion_validation_protocol_defined_execution_evidence_absent',
      nextRequiredGate:
        'source_governed_or_independent_reference_correspondence_evidence',
    });
  });

  it('records 234/454 only as official face-oval topology candidates', () => {
    const provider =
      FACE_READING_INDEPENDENT_ZYGION_REFERENCE_ACQUISITION_FR198.providerCandidate;
    expect(provider.providerIndices).toEqual([234, 454]);
    expect(provider.officialTopologyClassification).toBe(
      'FACE_LANDMARKS_FACE_OVAL',
    );
    expect(provider.directZygionSemanticMappingEstablished).toBe(false);
    expect(provider.providerIndexAdmissionAuthorized).toBe(false);
  });

  it('keeps the NIOSH lane controlled-access and unacquired', () => {
    const niosh =
      FACE_READING_INDEPENDENT_ZYGION_REFERENCE_ACQUISITION_FR198.evidenceCandidates.find(
        (candidate) =>
          candidate.candidateId
            === 'NIOSH-NPPTL-2003-3D-ANTHROPOMETRIC-SURVEY',
      );
    expect(niosh).toMatchObject({
      evidenceState: 'CONTROLLED_ACCESS_NOT_ACQUIRED',
      preferredAcquisitionLane: true,
      bilateralZygionExplicitlyDefined: true,
      sameSampleSurfaceAndZygionCoordinatesReported: true,
      sameSampleExecutableAssetAcquired: false,
      sufficientForEndpointCoordinateCorrespondence: false,
    });
  });

  it('does not treat FaceBase caliper zy-zy width as endpoint coordinates', () => {
    const faceBase =
      FACE_READING_INDEPENDENT_ZYGION_REFERENCE_ACQUISITION_FR198.evidenceCandidates.find(
        (candidate) =>
          candidate.candidateId === 'FACEBASE-3D-FACIAL-NORMS-ZY-ZY-CALIPER',
      );
    expect(faceBase).toMatchObject({
      evidenceState: 'INSUFFICIENT_FOR_ENDPOINT_COORDINATE_CORRESPONDENCE',
      bilateralZygionExplicitlyDefined: true,
      sameSampleSurfaceAndZygionCoordinatesReported: false,
      sufficientForEndpointCoordinateCorrespondence: false,
    });
  });

  it('keeps published Djordjevic zygion methodology distinct from acquired assets', () => {
    const source =
      FACE_READING_INDEPENDENT_ZYGION_REFERENCE_ACQUISITION_FR198.evidenceCandidates.find(
        (candidate) =>
          candidate.candidateId === 'DJORDJEVIC-2016-3D-TWIN-LANDMARK-STUDY',
      );
    expect(source).toMatchObject({
      evidenceState: 'PUBLIC_METHOD_ONLY_NO_EXECUTABLE_SAME_SAMPLE_ASSET',
      bilateralZygionExplicitlyDefined: true,
      sameSampleExecutableAssetAcquired: false,
      sufficientForEndpointCoordinateCorrespondence: false,
    });
  });

  it('rejects direct zygion semantic promotion without evidence', () => {
    const drift = cloneEvidence() as unknown as {
      providerCandidate: {
        directZygionSemanticMappingEstablished: boolean;
      };
    };
    drift.providerCandidate.directZygionSemanticMappingEstablished = true;
    expect(() =>
      assertFaceReadingIndependentZygionReferenceAcquisitionFR198(
        drift as unknown as FaceReadingIndependentZygionReferenceAcquisitionFR198,
      ),
    ).toThrow('fr198_direct_mapping_promotion_without_evidence');
  });

  it('rejects marking controlled-access NIOSH evidence as acquired', () => {
    const drift = cloneEvidence() as unknown as {
      evidenceCandidates: Array<{
        candidateId: string;
        sameSampleExecutableAssetAcquired: boolean;
      }>;
    };
    const niosh = drift.evidenceCandidates.find(
      (candidate) =>
        candidate.candidateId === 'NIOSH-NPPTL-2003-3D-ANTHROPOMETRIC-SURVEY',
    );
    if (!niosh) throw new Error('test_fixture_missing_niosh');
    niosh.sameSampleExecutableAssetAcquired = true;
    expect(() =>
      assertFaceReadingIndependentZygionReferenceAcquisitionFR198(
        drift as unknown as FaceReadingIndependentZygionReferenceAcquisitionFR198,
      ),
    ).toThrow('fr198_niosh_controlled_access_state_drift');
  });

  it('rejects scalar width promotion to endpoint-coordinate correspondence', () => {
    const drift = cloneEvidence() as unknown as {
      evidenceCandidates: Array<{
        candidateId: string;
        sufficientForEndpointCoordinateCorrespondence: boolean;
      }>;
    };
    const faceBase = drift.evidenceCandidates.find(
      (candidate) =>
        candidate.candidateId === 'FACEBASE-3D-FACIAL-NORMS-ZY-ZY-CALIPER',
    );
    if (!faceBase) throw new Error('test_fixture_missing_facebase');
    faceBase.sufficientForEndpointCoordinateCorrespondence = true;
    expect(() =>
      assertFaceReadingIndependentZygionReferenceAcquisitionFR198(
        drift as unknown as FaceReadingIndependentZygionReferenceAcquisitionFR198,
      ),
    ).toThrow('fr198_scalar_width_promoted_to_endpoint_evidence');
  });

  it('does not create user or product-operator validation burden', () => {
    expect(
      Object.values(
        FACE_READING_INDEPENDENT_ZYGION_REFERENCE_ACQUISITION_FR198
          .operatorBurdenPolicy,
      ).every((flag) => flag === false),
    ).toBe(true);
  });

  it('keeps provider admission and all downstream authority fail-closed', () => {
    expect(
      Object.values(
        FACE_READING_INDEPENDENT_ZYGION_REFERENCE_ACQUISITION_FR198
          .authorityBoundary,
      ).every((flag) => flag === false),
    ).toBe(true);
    expect(
      FACE_READING_INDEPENDENT_ZYGION_REFERENCE_ACQUISITION_FR198.readiness
        .providerIndexAdmissionReady,
    ).toBe(false);
  });

  it('moves only to same-sample independent reference acquisition', () => {
    expect(
      FACE_READING_INDEPENDENT_ZYGION_REFERENCE_ACQUISITION_FR198.readiness
        .nextRequiredGate,
    ).toBe('obtain_independently_labelled_same_sample_reference_asset');
    expect(
      FACE_READING_INDEPENDENT_ZYGION_REFERENCE_ACQUISITION_FR198.nextFrontier,
    ).toBe(
      'obtain_independently_labelled_same_sample_reference_asset_without_user_recapture_then_execute_fr197_correspondence',
    );
  });
});
