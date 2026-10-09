import {
  qualifyFR300Dataset,
  type FR300DatasetQualificationEvidence,
} from './real-independent-3d-nose-reference-pilot-fr300.js';

export const FR312G15_AIHUB71539_OFFICIAL_PAGE =
  'https://www.aihub.or.kr/aihubdata/data/view.do?currMenu=115&dataSetSn=71539&topMenu=100' as const;

/**
 * Source-page evidence, not a dataset permission receipt or original-file audit.
 *
 * The official page documents camera/handheld 3D face scanning and JPG/raw
 * images, but does not supply an inspected same-capture JPG/OBJ pair, an
 * independent physical-unit calibration, a validated registration, or an
 * explicit permission for the proposed measurement benchmark.
 *
 * Keep any positive claim that requires those witnesses FALSE, never infer
 * rights or metric scale from file extensions or public file counts.
 */
export const FR312G15_AIHUB71539_FR300_EVIDENCE: FR300DatasetQualificationEvidence =
  Object.freeze({
    schemaVersion: 'fr300-dataset-qualification-evidence-v1',
    datasetRef: 'aihub:71539:release-1.1',
    officialSourceRef: FR312G15_AIHUB71539_OFFICIAL_PAGE,
    sourceOwnerRef: 'dataset:aihub:71539',
    sourceDescriptionEvidenceRef: FR312G15_AIHUB71539_OFFICIAL_PAGE,
    licenseEvidenceRef: null,
    containsRealRgb: true,
    containsIndependent3DGroundTruth: false,
    rgb3DPairingDocumented: false,
    metricScaleDocumented: false,
    source3DRegistrationDocumented: false,
    source3DRegistrationFrameRef: null,
    sparseLandmarksGeneratedByImageModel: false,
    commercialProductDevelopmentStatus: 'unresolved',
    localRawDataProcessingStatus: 'unresolved',
    rawDataRedistributionStatus: 'unresolved',
    derivedReferenceMetadataPublicationStatus: 'unresolved',
    personalityPrivacyUseStatus: 'unresolved',
    participantConsentScopeStatus: 'unresolved',
  });

/** Actual existing FR300 qualification gate; no duplicate readiness system. */
export const FR312G15_AIHUB71539_FR300_QUALIFICATION =
  qualifyFR300Dataset(FR312G15_AIHUB71539_FR300_EVIDENCE);

export type FR312G15PublishedLabelIssue =
  | 'not_object'
  | 'category_invalid'
  | 'annotation_missing'
  | 'annotation_id_invalid'
  | 'landmark_count_invalid'
  | 'landmark_list_invalid'
  | 'landmark_id_invalid_or_duplicate'
  | 'landmark_coordinates_invalid';

export interface FR312G15PublishedLabelProbe {
  readonly schemaVersion: 'fr312g15-aihub71539-published-label-shape-v1';
  readonly datasetRef: 'aihub:71539:release-1.1';
  readonly evidenceLevel: 'synthetic_documented_annotation_only';
  readonly documentaryLabelShapeConsistent: boolean;
  readonly issues: readonly FR312G15PublishedLabelIssue[];
  readonly sourceBinaryInspected: false;
  readonly sourceSchemaVerifiedOnOriginalRelease: false;
  readonly neutralExpressionProven: false;
  readonly exactRgb3DPairProven: false;
  readonly canonical468CorrespondenceProven: false;
  readonly physicalMetricScaleProven: false;
  readonly fr299ReferenceMaterialized: false;
  readonly fr312gRepeatabilityEvidenceAdmitted: false;
}

function object(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function validAnnotationId(value: unknown): boolean {
  if (typeof value === 'string') {
    return value.length > 0 && value.length <= 128 &&
      /^[A-Za-z0-9][A-Za-z0-9_.-]*$/u.test(value);
  }
  return typeof value === 'number' && Number.isSafeInteger(value) && value >= 0;
}

/**
 * Validates ONLY the top-level category/annotation/landmarks arrangement
 * visibly illustrated on the official dataset page. In particular, the
 * published sample annotation.id is a STRING, despite a separate catalogue
 * table describing IDs as Number. Neither is a biometric identity key here.
 *
 * The mesh/actors/Camera catalogue entries are NOT presumed to occur in
 * this same JSON object (the FR312G14 single-record probe was hypothetical).
 * The result carries no image, ID, coordinate, geometry or filename.
 */
export function probeAihub71539PublishedLabelShapeFR312G15(
  input: unknown,
): FR312G15PublishedLabelProbe {
  const issues: FR312G15PublishedLabelIssue[] = [];
  const root = object(input);

  if (root === null) issues.push('not_object');

  const category = object(root?.category);
  if (category?.type !== 'Face' || category.type_id !== 2) {
    issues.push('category_invalid');
  }

  const annotation = object(root?.annotation);
  if (annotation === null) issues.push('annotation_missing');
  if (!validAnnotationId(annotation?.id)) issues.push('annotation_id_invalid');
  if (annotation?.num_landmarks !== 68) {
    issues.push('landmark_count_invalid');
  }

  const landmarks = root?.landmarks;
  if (!Array.isArray(landmarks) || landmarks.length !== 68) {
    issues.push('landmark_list_invalid');
  } else {
    const ids = new Set<number>();
    let invalidId = false;
    let invalidCoordinate = false;
    for (const pointValue of landmarks as unknown[]) {
      const point = object(pointValue);
      const id = point?.id;
      if (
        typeof id !== 'number' || !Number.isSafeInteger(id) ||
        id < 0 || id >= 68 || ids.has(id)
      ) {
        invalidId = true;
      } else {
        ids.add(id);
      }
      for (const axis of ['x', 'y', 'z'] as const) {
        const coordinate = point?.[axis];
        if (typeof coordinate !== 'number' || !Number.isFinite(coordinate)) {
          invalidCoordinate = true;
        }
      }
    }
    if (invalidId || ids.size !== 68) {
      issues.push('landmark_id_invalid_or_duplicate');
    }
    if (invalidCoordinate) {
      issues.push('landmark_coordinates_invalid');
    }
  }

  return {
    schemaVersion: 'fr312g15-aihub71539-published-label-shape-v1',
    datasetRef: 'aihub:71539:release-1.1',
    evidenceLevel: 'synthetic_documented_annotation_only',
    documentaryLabelShapeConsistent: issues.length === 0,
    issues,
    sourceBinaryInspected: false,
    sourceSchemaVerifiedOnOriginalRelease: false,
    neutralExpressionProven: false,
    exactRgb3DPairProven: false,
    canonical468CorrespondenceProven: false,
    physicalMetricScaleProven: false,
    fr299ReferenceMaterialized: false,
    fr312gRepeatabilityEvidenceAdmitted: false,
  };
}
