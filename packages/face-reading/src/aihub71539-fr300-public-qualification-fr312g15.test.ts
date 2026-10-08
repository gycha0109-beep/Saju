import { describe, expect, it } from 'vitest';
import {
  FR312G15_AIHUB71539_FR300_EVIDENCE,
  FR312G15_AIHUB71539_FR300_QUALIFICATION,
  probeAihub71539PublishedLabelShapeFR312G15,
} from './aihub71539-fr300-public-qualification-fr312g15.js';
import {
  qualifyFR300Dataset,
} from './real-independent-3d-nose-reference-pilot-fr300.js';
import {
  probeAihub71539PublicMetadataShapeFR312G14,
} from './aihub71539-public-metadata-probe-fr312g14.js';

function syntheticOfficialLabelExample() {
  return {
    category: { type: 'Face', type_id: 2 },
    annotation: { id: 'synthetic1001M_A', num_landmarks: 68 },
    landmarks: Array.from({ length: 68 }, (_, id) => ({
      id, name: id, x: id * 0.1, y: id * 0.2, z: id * -0.1,
    })),
  };
}

describe('FR312G15 AI-Hub 71539 existing FR300 gate and public label shape', () => {
  it('uses FR300 existing qualification instead of granting independent 3D or dataset rights', () => {
    const q = FR312G15_AIHUB71539_FR300_QUALIFICATION;
    expect(q.datasetRef).toBe('aihub:71539:release-1.1');
    expect(q.status).toBe('blocked');
    expect(q.blockers).toEqual(expect.arrayContaining([
      'license_evidence_missing',
      'independent_3d_ground_truth_not_documented',
      'rgb_3d_pairing_not_documented',
      'metric_scale_not_documented',
      'source_3d_registration_not_documented',
      'source_3d_registration_frame_missing',
      'commercial_product_development_rights_unresolved',
      'local_raw_data_processing_rights_unresolved',
      'derived_reference_metadata_publication_rights_unresolved',
      'personality_privacy_scope_unresolved',
      'participant_consent_scope_unresolved',
    ]));
    expect(q.rawDataRedistributionAllowed).toBe(false);
    expect(q.sourceRegistrationEquivalentToMyeongHaCanonical).toBe(false);
    expect(q.sparseImageModelLandmarksAllowedAsGroundTruth).toBe(false);
    expect(FR312G15_AIHUB71539_FR300_EVIDENCE.licenseEvidenceRef).toBeNull();
  });

  it('requires external proof even when the public catalogue documents a 3D scanner', () => {
    const q = qualifyFR300Dataset({
      ...FR312G15_AIHUB71539_FR300_EVIDENCE,
      containsIndependent3DGroundTruth: true,
    });
    expect(q.status).toBe('blocked');
    expect(q.blockers).toContain('metric_scale_not_documented');
    expect(q.blockers).toContain('rgb_3d_pairing_not_documented');
    expect(q.blockers).toContain('commercial_product_development_rights_unresolved');
  });

  it('accepts the exact stand-alone category/annotation/landmarks shape published on the official page', () => {
    const label = syntheticOfficialLabelExample();
    const result = probeAihub71539PublishedLabelShapeFR312G15(label);
    expect(result.documentaryLabelShapeConsistent).toBe(true);
    expect(result.issues).toEqual([]);
    expect(result.evidenceLevel).toBe('synthetic_documented_annotation_only');
    expect(result.sourceSchemaVerifiedOnOriginalRelease).toBe(false);
    expect(result.exactRgb3DPairProven).toBe(false);
    expect(result.fr299ReferenceMaterialized).toBe(false);
    expect(result.fr312gRepeatabilityEvidenceAdmitted).toBe(false);
    expect(JSON.stringify(result)).not.toContain('synthetic1001M_A');
    expect(JSON.stringify(result)).not.toContain('"landmarks"');
    // FR312G14 deliberately checks a *different*, hypothetical combined
    // mesh/actor/camera object; it is not the publicly illustrated label.
    expect(probeAihub71539PublicMetadataShapeFR312G14(label)
      .structuralFieldsConsistent).toBe(false);
  });

  it('rejects missing and duplicated landmark IDs, NaN geometry and wrong landmark count', () => {
    const duplicate = syntheticOfficialLabelExample();
    const last = duplicate.landmarks.at(-1);
    if (last === undefined) throw new Error('bad synthetic fixture');
    last.id = 0;
    expect(probeAihub71539PublishedLabelShapeFR312G15(duplicate).issues)
      .toContain('landmark_id_invalid_or_duplicate');

    const badCoordinate = syntheticOfficialLabelExample();
    const first = badCoordinate.landmarks.at(0);
    if (first === undefined) throw new Error('bad synthetic fixture');
    first.x = Number.NaN;
    expect(probeAihub71539PublishedLabelShapeFR312G15(badCoordinate).issues)
      .toContain('landmark_coordinates_invalid');

    const missing = syntheticOfficialLabelExample();
    missing.landmarks.pop();
    expect(probeAihub71539PublishedLabelShapeFR312G15(missing).issues)
      .toContain('landmark_list_invalid');

    const count = syntheticOfficialLabelExample();
    count.annotation.num_landmarks = 468;
    expect(probeAihub71539PublishedLabelShapeFR312G15(count).issues)
      .toContain('landmark_count_invalid');
  });

  it('accepts a catalogue numeric annotation ID but keeps published string sample valid', () => {
    const sample = syntheticOfficialLabelExample();
    sample.annotation.id = '1001M_A';
    expect(probeAihub71539PublishedLabelShapeFR312G15(sample)
      .documentaryLabelShapeConsistent).toBe(true);
    const numeric: unknown = { ...sample, annotation: { id: 101, num_landmarks: 68 } };
    expect(probeAihub71539PublishedLabelShapeFR312G15(numeric)
      .documentaryLabelShapeConsistent).toBe(true);
    expect(probeAihub71539PublishedLabelShapeFR312G15({
      ...sample, annotation: { id: '../escape', num_landmarks: 68 },
    }).issues).toContain('annotation_id_invalid');
  });

  it('ignores spoofed camera, rights and recapture claims in caller JSON', () => {
    const label = {
      ...syntheticOfficialLabelExample(),
      independentPhysical3DScaleVerified: true,
      permissionGranted: true,
      sameCaptureRgbAndMesh: true,
      sessions: ['A', 'B'],
      Camera: { intrinsicsVerified: true },
    };
    const result = probeAihub71539PublishedLabelShapeFR312G15(label);
    expect(result.documentaryLabelShapeConsistent).toBe(true);
    expect(result.neutralExpressionProven).toBe(false);
    expect(result.physicalMetricScaleProven).toBe(false);
    expect(result.exactRgb3DPairProven).toBe(false);
    expect(result.fr299ReferenceMaterialized).toBe(false);
    expect(result.fr312gRepeatabilityEvidenceAdmitted).toBe(false);
    expect(probeAihub71539PublishedLabelShapeFR312G15(null).issues)
      .toContain('not_object');
  });
});
