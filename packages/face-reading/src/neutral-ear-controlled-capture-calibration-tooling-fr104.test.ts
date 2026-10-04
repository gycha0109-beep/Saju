import { describe, expect, it } from 'vitest';

import {
  CONTROLLED_CAPTURE_CALIBRATION_EVIDENCE_FR21B,
  CONTROLLED_CAPTURE_PROFILES_FR21B,
  validateControlledCaptureCalibrationEvidenceFR21B,
} from './controlled-capture-attestation-fr21b.js';
import {
  assertFr21bCalibrationRegistriesRemainUnadmittedFR104,
  buildNeutralEarFr21bCalibrationCandidateFR104,
} from './neutral-ear-controlled-capture-calibration-tooling-fr104.js';

function candidate(
  cameraFacing: 'front' | 'rear',
) {
  return buildNeutralEarFr21bCalibrationCandidateFR104({
    schemaVersion:
      'fr104-fr21b-c1-calibration-candidate-input-v1',
    evidenceRef: `fr104.calibration.${cameraFacing}.run1`,
    profileCandidateRef:
      `fr21b.profile.${cameraFacing}.candidate`,
    targetRef: 'fr104.calibration.marker.left.001',
    cameraFacing,
    knownMarkerAnatomicalSide: 'left',
    runOrdinal: 1,
    deviceContextRef: 'device.context.manual.001',
    browserContextRef: 'browser.context.manual.001',
    previewPresentationMirrorApplied: cameraFacing === 'front',
    stages: {
      preview: {
        markerImageSide: 'right',
        artifactEvidenceRef:
          `fr104:${cameraFacing}:run1:preview`,
      },
      raw_pixels: {
        markerImageSide: 'left',
        artifactEvidenceRef:
          `fr104:${cameraFacing}:run1:raw`,
      },
      encoded_pixels: {
        markerImageSide: 'left',
        artifactEvidenceRef:
          `fr104:${cameraFacing}:run1:encoded`,
      },
      canonical_pixels: {
        markerImageSide: 'left',
        artifactEvidenceRef:
          `fr104:${cameraFacing}:run1:canonical`,
      },
    },
    encodedExifOrientation: null,
    evidenceRefs: [
      `operator-session:${cameraFacing}:run1`,
      'fr19:capture-orientation-authority:0.1.0',
    ],
  });
}

describe('FR104 FR21b C1 controlled-capture calibration tooling', () => {
  it('builds a four-stage front-camera research candidate without admitting authority', () => {
    const result = candidate('front');

    expect(result.calibrationEvidence.cameraFacing).toBe('front');
    expect(
      result.calibrationEvidence.stages.map((stage) => stage.stage),
    ).toEqual([
      'preview',
      'raw_pixels',
      'encoded_pixels',
      'canonical_pixels',
    ]);
    expect(
      result.calibrationEvidence.markerAnatomicalSide,
    ).toBe('left');
    expect(
      result.calibrationEvidence.stages[0]?.markerImageSide,
    ).toBe('right');
    expect(result.calibrationEvidence.reviewState)
      .toBe('research_candidate');
    expect(
      result.canonicalizationBoundary
        .parallelCanonicalizationStackIntroduced,
    ).toBe(false);
    expect(
      result.canonicalizationBoundary.executionState,
    ).toBe(
      'not_executed_by_c1_tooling_operator_observation_required',
    );
    expect(
      result.authority.verifiedControlledCaptureProfileIssued,
    ).toBe(false);
    expect(
      result.authority.subjectRelativeMirrorProvenanceAuthorized,
    ).toBe(false);
    expect(result.authority.anatomicalLateralityAuthorized)
      .toBe(false);
    expect(result.authority.traditionalBindingAuthorized)
      .toBe(false);
    expect(result.authority.productionAuthorization).toBe(false);
    expect(
      result.privacy.rawCapturePersistedByTooling,
    ).toBe(false);
    expect(
      result.privacy.rawFrameBytesExportedByTooling,
    ).toBe(false);
    expect(
      result.privacy.sanitizedJsonOnlyExport,
    ).toBe(true);

    expect(() =>
      validateControlledCaptureCalibrationEvidenceFR21B(
        result.calibrationEvidence,
      ),
    ).not.toThrow();
  });

  it('supports rear-camera recording without inferring mirror policy from facing', () => {
    const result = candidate('rear');

    expect(result.calibrationEvidence.cameraFacing).toBe('rear');
    expect(
      result.operatorContext.previewPresentationMirrorApplied,
    ).toBe(false);
    expect(
      Object.hasOwn(
        result.calibrationEvidence,
        'subjectRelativeSourcePixelMirrorPolicy',
      ),
    ).toBe(false);
    expect(
      Object.hasOwn(
        result.calibrationEvidence,
        'finalAnatomicalLateralityAssertion',
      ),
    ).toBe(false);
  });

  it('rejects incomplete or malformed stage observations', () => {
    expect(() =>
      buildNeutralEarFr21bCalibrationCandidateFR104({
        schemaVersion:
          'fr104-fr21b-c1-calibration-candidate-input-v1',
        evidenceRef: 'fr104.calibration.front.bad',
        profileCandidateRef: 'fr21b.profile.front.candidate',
        targetRef: 'fr104.calibration.marker.left.001',
        cameraFacing: 'front',
        knownMarkerAnatomicalSide: 'left',
        runOrdinal: 1,
        deviceContextRef: 'device.context.manual.001',
        browserContextRef: 'browser.context.manual.001',
        previewPresentationMirrorApplied: true,
        stages: {
          preview: {
            markerImageSide: 'left',
            artifactEvidenceRef: 'preview',
          },
          raw_pixels: {
            markerImageSide: 'left',
            artifactEvidenceRef: 'raw',
          },
          encoded_pixels: {
            markerImageSide: 'left',
            artifactEvidenceRef: 'encoded',
          },
        } as never,
        encodedExifOrientation: null,
        evidenceRefs: ['operator-session:bad'],
      }),
    ).toThrow(/exactly preview\/raw_pixels\/encoded_pixels\/canonical_pixels/i);
  });

  it('keeps the FR21b registries empty until real evidence is reviewed and explicitly admitted', () => {
    expect(CONTROLLED_CAPTURE_PROFILES_FR21B).toEqual([]);
    expect(CONTROLLED_CAPTURE_CALIBRATION_EVIDENCE_FR21B)
      .toEqual([]);
    expect(() =>
      assertFr21bCalibrationRegistriesRemainUnadmittedFR104(),
    ).not.toThrow();
  });
});
