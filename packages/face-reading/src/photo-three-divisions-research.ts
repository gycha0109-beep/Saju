import { FaceLandmarker } from '@mediapipe/tasks-vision';
import type { MediaPipeFaceLandmarkerResultFR25V1 } from './mediapipe-eye-landmark-adapter-fr25.js';
import { extractMediaPipeEphemeralScreenGeometry } from './mediapipe-ephemeral-screen-geometry-extractor.js';
import { inspectMediaPipeEyebrowComponentVerticalSignalFR42 } from './mediapipe-eyebrow-component-geometric-role-probe-fr42.js';
import { deriveMediaPipeFaceOvalImageInferiorExtremumFR45 } from './mediapipe-face-oval-inferior-extremum-fr45.js';
import {
  FACE_AUTHORITY_MAYI_THREE_DIVISIONS_REVIEWED_REGISTRY,
  getReviewedMayiThreeDivisionsMethodology,
} from './mayi-three-divisions-reviewed-methodology.js';
import { FACE_THREE_DIVISION_RULES_V0 } from './research-pack-v0.js';
import { evaluateThreeDivisionRelativeOrder } from './three-divisions.js';
import { FaceAuthorityValidationError } from './validation.js';
import {
  MAYI_SANTING_INTERPRETATION_CANDIDATE_SOURCE,
  pendingMayiCandidateEvaluations,
} from './mayi-three-divisions-rule-candidates.js';
import type { consumePhotoMetricEvidence } from './photo-metric-evidence.js';

/** Private, per-invocation output of observe_local_photo.py; not a governed artifact. */
export interface FacePhotoObservation extends MediaPipeFaceLandmarkerResultFR25V1 {
  readonly schemaVersion: 'face-photo-observation-v1';
  readonly provider: 'mediapipe-python';
  readonly providerVersion: '0.10.35';
  readonly width: number;
  readonly height: number;
  readonly hairline: null | {
    readonly methodId: 'adaptive_skin_edge_texture_continuity';
    readonly methodVersion: '0.4.0';
    readonly state:
      | 'visible_interface_candidate'
      | 'partially_visible_or_occluded'
      | 'no_visible_hairline_candidate'
      | 'unavailable';
    readonly candidateBoundaryExposed: boolean;
    readonly boundaryPoints: readonly (readonly [number, number])[];
    readonly humanReviewed: false;
  };
}

/** Explicit caller labels of visible image lines, never a metric/FR319 binding. */
export interface FacePhotoImageReferenceLabels {
  readonly assertionAuthority: 'human_label_assertion';
  readonly visibleOnly: true;
  readonly hairlineY: number | null;
  readonly browY: number | null;
  readonly nasalApexY: number | null;
  readonly lowerFaceY: number | null;
}

function fail(): never {
  throw new FaceAuthorityValidationError('Photo research observation or image labels invalid.');
}

function imageLabelDiagnostics(labels: FacePhotoImageReferenceLabels | undefined, height: number) {
  const empty = { upper: null, middle: null, lower: null };
  if (labels === undefined)
    return {
      status: 'human_image_labels_not_supplied',
      unit: 'image_pixel',
      lengths: empty,
      relativeOrder: null,
    } as const;
  if (labels.assertionAuthority !== 'human_label_assertion' || labels.visibleOnly !== true) fail();
  const y = [labels.hairlineY, labels.browY, labels.nasalApexY, labels.lowerFaceY];
  for (const value of y)
    if (value !== null && (!Number.isFinite(value) || value < 0 || value > height)) fail();
  const gap = (a: number | null, b: number | null) => {
    if (a === null || b === null) return null;
    if (!(b > a)) fail();
    return b - a;
  };
  const lengths = { upper: gap(y[0]!, y[1]!), middle: gap(y[1]!, y[2]!), lower: gap(y[2]!, y[3]!) };
  const relativeOrder =
    lengths.upper !== null && lengths.middle !== null && lengths.lower !== null
      ? evaluateThreeDivisionRelativeOrder({
          upper: lengths.upper,
          middle: lengths.middle,
          lower: lengths.lower,
        })
      : null;
  return {
    status: 'caller_label_image_diagnostics_only',
    unit: 'image_pixel',
    lengths,
    relativeOrder,
  } as const;
}

/** Actual image observations -> existing geometric probes -> source-specific admission report.
 * No provider indices are relabelled as traditional anatomy, and no image gap is
 * relabelled as a canonical metric span. The raw provider payload is not returned.
 */
export function analyzePhotoThreeDivisionsResearch(
  observation: FacePhotoObservation,
  labels?: FacePhotoImageReferenceLabels,
  metricEvidence?: ReturnType<typeof consumePhotoMetricEvidence>,
) {
  if (
    observation.schemaVersion !== 'face-photo-observation-v1' ||
    observation.provider !== 'mediapipe-python' ||
    observation.providerVersion !== '0.10.35'
  )
    fail();
  for (const size of [observation.width, observation.height])
    if (!Number.isSafeInteger(size) || size < 1 || size > 16000) fail();
  if (!Array.isArray(observation.faceLandmarks) || observation.faceLandmarks.length > 2) fail();
  const faceCount = observation.faceLandmarks.length;
  let providerMeasurements = null;
  let hairline = null;
  if (faceCount === 1) {
    const geometry = extractMediaPipeEphemeralScreenGeometry({
      faceLandmarks: observation.faceLandmarks,
      faceBlendshapes: observation.faceBlendshapes,
      facialTransformationMatrixes: observation.facialTransformationMatrixes,
    });
    const brow = inspectMediaPipeEyebrowComponentVerticalSignalFR42(FaceLandmarker, geometry);
    const inferior = deriveMediaPipeFaceOvalImageInferiorExtremumFR45(FaceLandmarker, geometry);
    providerMeasurements = {
      frame: 'normalized_image_top_left_origin',
      eyebrowProviderComponents: [brow.left, brow.right].map((side) => ({
        topologySymbol: side.topologySymbol,
        components: side.measurements.map((component) => ({
          meanNormalizedY: component.meanNormalizedY,
          meanPixelY: component.meanNormalizedY * observation.height,
        })),
      })),
      faceOvalInferior: {
        status: inferior.state,
        normalizedY: inferior.maxY,
        pixelY: inferior.maxY * observation.height,
        traditionalDigeEquivalenceAuthorized: false,
      },
    };
    const h = observation.hairline;
    if (
      h === null ||
      h.methodId !== 'adaptive_skin_edge_texture_continuity' ||
      h.methodVersion !== '0.4.0' ||
      h.humanReviewed !== false
    )
      fail();
    if (
      ![
        'visible_interface_candidate',
        'partially_visible_or_occluded',
        'no_visible_hairline_candidate',
        'unavailable',
      ].includes(h.state)
    )
      fail();
    if (h.candidateBoundaryExposed !== (h.state === 'visible_interface_candidate')) fail();
    if (!Array.isArray(h.boundaryPoints) || h.boundaryPoints.length > 16000) fail();
    if (h.candidateBoundaryExposed !== h.boundaryPoints.length >= 2) fail();
    for (const point of h.boundaryPoints) {
      if (
        !Array.isArray(point) ||
        point.length !== 2 ||
        !Number.isFinite(point[0]) ||
        !Number.isFinite(point[1]) ||
        point[0] < 0 ||
        point[0] > observation.width ||
        point[1] < 0 ||
        point[1] > observation.height
      )
        fail();
    }
    const ys = h.boundaryPoints.map((point) => point[1]);
    hairline = {
      methodId: h.methodId,
      methodVersion: h.methodVersion,
      state: h.state,
      candidatePointCount: ys.length,
      imagePixelYRange: ys.length ? [Math.min(...ys), Math.max(...ys)] : null,
      humanReviewed: false,
      admittedMetricReference: false,
    };
  }
  const method = getReviewedMayiThreeDivisionsMethodology();
  const methodologyRef = `${method.methodologyId}@${method.version}`;
  const observationBlockers =
    faceCount === 1 ? [] : [faceCount === 0 ? 'no_face_detected' : 'multiple_faces_detected'];
  const blockedReasons = [
    ...observationBlockers,
    'fr313_representative_hairline_human_review_missing',
    'fr314_admitted_local_hairline_observation_missing',
    'fr316_exact_capture_m3_registration_missing',
    'fr318_metric_hairline_reference_missing',
    'fr319_governed_seven_reference_common_frame_bundle_missing',
    'mayi_0.3.0_metric_operationalization_and_binding_not_issued',
    'mayi_qualitative_rule_conditions_and_personal_execution_not_admitted',
  ];
  return {
    status: 'research_only',
    stages: {
      A: {
        complete: faceCount === 1,
        status: faceCount === 1 ? 'observation_completed' : 'observation_unavailable',
      },
      B: { complete: false, status: 'approved_three_divisions_measurement_withheld' },
      C: { complete: false, status: 'personal_traditional_interpretation_withheld' },
    },
    imageObservation: {
      status: faceCount === 1 ? 'processed' : 'unavailable',
      faceCount,
      width: observation.width,
      height: observation.height,
      provider: observation.provider,
      providerVersion: observation.providerVersion,
      landmarkCount: faceCount === 1 ? 478 : 0,
      singleFrozenImageUsedByBothExtractors: faceCount === 1,
    },
    providerMeasurements,
    hairline,
    metricEvidence: faceCount === 1 ? (metricEvidence ?? null) : null,
    anchors: [
      {
        key: 'hairline',
        observedCandidate: hairline?.candidatePointCount ? true : false,
        neutralCommonFrameReferenceAvailable:
          faceCount === 1 && metricEvidence?.status === 'common_frame_references_available',
        governedReferenceAvailable: false,
        reason: 'visible_candidate_is_not_fr313_fr318_admission',
      },
      {
        key: 'brow',
        observedCandidate: providerMeasurements !== null,
        neutralCommonFrameReferenceAvailable:
          faceCount === 1 && metricEvidence?.status === 'common_frame_references_available',
        governedReferenceAvailable: false,
        reason: 'provider_components_are_not_explicit_visible_brow_geometry_fr292',
      },
      {
        key: 'nasal_apex',
        observedCandidate: false,
        neutralCommonFrameReferenceAvailable:
          faceCount === 1 && metricEvidence?.status === 'common_frame_references_available',
        governedReferenceAvailable: false,
        reason: 'provider_independent_nasal_apex_reference_fr266_not_supplied',
      },
      {
        key: 'lower_face_inferior',
        observedCandidate: providerMeasurements !== null,
        neutralCommonFrameReferenceAvailable:
          faceCount === 1 && metricEvidence?.status === 'common_frame_references_available',
        governedReferenceAvailable: false,
        reason: 'face_oval_extremum_is_not_governed_lower_face_contour_fr301',
      },
    ],
    imageLabelDiagnostics:
      faceCount === 1 ? imageLabelDiagnostics(labels, observation.height) : null,
    methodology: {
      ref: methodologyRef,
      reviewStatus: method.reviewStatus,
      sourceRefs: [...method.sourceRefs],
      definitions: { upper: '髮際→眉', middle: '眉→準頭', lower: '準頭→地閣' },
    },
    threeDivisions: {
      status: 'withheld',
      coordinateFrame: 'canonical_aligned_right_handed_metric_xy',
      unit: 'centimeter',
      lengths: { upper: null, middle: null, lower: null },
      normalizedShares: null,
      blockedReasons:
        faceCount === 1 && metricEvidence
          ? [
              ...metricEvidence.blockedReasons,
              'mayi_qualitative_rule_conditions_and_personal_execution_not_admitted',
            ]
          : blockedReasons,
    },
    rules: FACE_THREE_DIVISION_RULES_V0.map((rule) => ({
      ruleRef: `${rule.ruleId}@${rule.version}`,
      methodologyRef: rule.methodologyRef,
      status: 'not_executed',
      reason:
        rule.methodologyRef === methodologyRef
          ? 'governed_metric_inputs_unavailable'
          : 'methodology_mismatch',
      sourceRefs: [...rule.sourceRefs],
    })),
    mayiCandidates: pendingMayiCandidateEvaluations(),
    sources: [
      ...new Set([
        ...method.sourceRefs,
        ...FACE_THREE_DIVISION_RULES_V0.flatMap((rule) => [...rule.sourceRefs]),
      ]),
    ]
      .map((ref) => {
        const source = FACE_AUTHORITY_MAYI_THREE_DIVISIONS_REVIEWED_REGISTRY.passages.find(
          (passage) => passage.passageId === ref,
        );
        if (source === undefined) fail();
        return {
          ref,
          witnessId: source.witnessId,
          verificationStatus: source.verificationStatus,
          originalText: source.originalText,
        };
      })
      .concat(
        [MAYI_SANTING_INTERPRETATION_CANDIDATE_SOURCE].map((source) => ({
          ref: source.passageId,
          witnessId: source.witnessId,
          verificationStatus: source.verificationStatus,
          originalText: source.originalText,
        })),
      ),
    semantic: {
      status: 'withheld',
      claims: [],
      reason: 'no_admitted_exact_methodology_rule_inputs',
      traditionalInterpretationIsScientificPersonalAssessment: false,
    },
    authorityBoundary: {
      imageGapsAreGovernedThreeDivisions: false,
      metricScaleIssued: false,
      traditionalBindingIssued: false,
      productionExecutionAuthorized: false,
      characterPublicationAuthorized: false,
    },
  } as const;
}
