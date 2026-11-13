import { METHOD_VERSION, METRIC_DEFINITIONS } from './frontal-metrics.mjs';
import { validateParsingSummary } from './parsing-contract.mjs';
import { EYE_FOLD_REVIEW_STATES } from './eye-fold-review.mjs';

export const COVERAGE_VERSION = 'local-whole-face-coverage@0.2.0';

const VALID_METRICS = new Set(METRIC_DEFINITIONS.map((entry) => entry.id));
const HUMAN_REVIEW_FEATURES = Object.freeze(['eye.eyelid_crease_or_hooded_category']);

// These are image-plane / model-boundary proxies, not the canonical FR293
// feature or a traditional named-form verdict. Keep the map deliberately narrow.
const CANDIDATE_SOURCES = Object.freeze({
  'eye.width_height_ratio': ['metric:eye_aperture_ratio', 'metric:eye_span_ratio'],
  'eye.inter_eye_spacing_ratio': ['metric:eye_spacing_ratio'],
  'eye.outer_corner_tilt': ['eye:model_endpoints'],
  'eye.bilateral_shape_asymmetry': ['metric:eye_span_difference', 'metric:eye_aperture_difference'],
  'eyebrow.span_arch_tail_orientation': ['morphology:browSpan'],
  'mouth.width_and_relative_size': ['metric:mouth_span_ratio'],
  'mouth.visible_lip_fullness': ['morphology:lipBalance'],
  'nose.alar_width_and_nostril_geometry': ['morphology:noseExtent'],
  'chin_lower_face.visible_width_ratio': ['metric:lower_oval_band_ratio'],
  'ear.visible_boundary_height_shape': ['ear:visible_model_candidate'],
});

function availableSource(capture, parsing, source) {
  if (source.startsWith('metric:')) {
    if (capture.viewRole !== 'frontal') return false;
    const id = source.slice('metric:'.length);
    if (!VALID_METRICS.has(id)) throw Error('COVERAGE_UNKNOWN_METRIC');
    return (capture.metrics || []).some(
      (metric) =>
        metric.metricKey === 'engineering.frontal.' + id &&
        metric.captureRef === capture.captureRef &&
        metric.viewRole === 'frontal' &&
        metric.methodVersion === METHOD_VERSION &&
        metric.candidateOnly === true &&
        metric.status === 'available' &&
        metric.unit === 'ratio' &&
        Number.isFinite(metric.value) &&
        metric.value >= 0,
    );
  }
  if (!parsing || parsing.status !== 'completed') return false;
  if (source === 'eye:model_endpoints')
    return capture.viewRole === 'frontal' && parsing.eyeDirection?.status === 'available';
  if (source === 'morphology:browSpan')
    return capture.viewRole === 'frontal' && parsing.morphology?.browSpan?.status === 'available';
  if (source === 'morphology:lipBalance')
    return capture.viewRole === 'frontal' && parsing.morphology?.lipBalance?.status === 'available';
  if (source === 'morphology:noseExtent')
    return capture.viewRole === 'frontal' && parsing.morphology?.noseExtent?.status === 'available';
  if (source === 'ear:visible_model_candidate') {
    const profileValue =
      capture.viewRole === 'profile' &&
      parsing.profile?.status === 'completed' &&
      parsing.profile.metrics?.some(
        (metric) =>
          metric.id === 'ear_height_to_face_height' &&
          metric.status === 'available' &&
          Number.isFinite(metric.value) &&
          metric.value > 0,
      );
    return profileValue || parsing.earRefinement?.status === 'applied';
  }
  throw Error('COVERAGE_UNKNOWN_SOURCE');
}

function summarizeHumanReviewEvidence(columns, captures, humanReviews) {
  if (!Array.isArray(humanReviews)) throw Error('COVERAGE_HUMAN_REVIEW_INVALID');
  const captureByRef = new Map(captures.map((capture) => [capture.captureRef, capture]));
  const counts = new Map(
    columns.map((column) => [
      column.featureKey,
      {
        photoCount: 0,
        imageLeft: Object.fromEntries(EYE_FOLD_REVIEW_STATES.map((state) => [state, 0])),
        imageRight: Object.fromEntries(EYE_FOLD_REVIEW_STATES.map((state) => [state, 0])),
      },
    ]),
  );
  const seen = new Set();
  for (const review of humanReviews) {
    const keys = [
      'captureRef',
      'imageLeft',
      'imageRight',
      'humanReviewed',
      'independentAccuracyValidated',
      'modelTrainingAuthorized',
    ];
    const capture = captureByRef.get(review?.captureRef);
    if (
      !review ||
      typeof review !== 'object' ||
      Array.isArray(review) ||
      Object.keys(review).length !== keys.length ||
      keys.some((key) => !Object.hasOwn(review, key)) ||
      typeof review.captureRef !== 'string' ||
      seen.has(review.captureRef) ||
      !capture ||
      capture.viewRole !== 'frontal' ||
      !EYE_FOLD_REVIEW_STATES.includes(review.imageLeft) ||
      !EYE_FOLD_REVIEW_STATES.includes(review.imageRight) ||
      review.humanReviewed !== true ||
      review.independentAccuracyValidated !== false ||
      review.modelTrainingAuthorized !== false
    )
      throw Error('COVERAGE_HUMAN_REVIEW_INVALID');
    seen.add(review.captureRef);
    const featureCounts = counts.get('eye.eyelid_crease_or_hooded_category');
    if (!featureCounts) throw Error('COVERAGE_HUMAN_REVIEW_FEATURE_DRIFT');
    featureCounts.photoCount++;
    featureCounts.imageLeft[review.imageLeft]++;
    featureCounts.imageRight[review.imageRight]++;
  }
  return counts;
}

// Only aggregates validated candidate summaries and local human review labels.
// Never emit capture refs, filenames, raw contours, masks, identity or scores.
export function summarizeWholeFaceCoverage(columns, captures, humanReviews = []) {
  if (
    !Array.isArray(columns) ||
    columns.length !== 29 ||
    new Set(columns.map((x) => x.featureKey)).size !== 29 ||
    !Array.isArray(captures)
  )
    throw Error('COVERAGE_SCHEMA_DRIFT');

  for (const feature of [...Object.keys(CANDIDATE_SOURCES), ...HUMAN_REVIEW_FEATURES])
    if (!columns.some((column) => column.featureKey === feature))
      throw Error('COVERAGE_SOURCE_KEY_DRIFT');

  const counts = new Map(columns.map((column) => [column.featureKey, 0]));
  const seen = new Set();
  for (const capture of captures) {
    if (
      typeof capture?.captureRef !== 'string' ||
      !/^[a-zA-Z0-9_-]{1,80}$/.test(capture.captureRef) ||
      seen.has(capture.captureRef) ||
      !['frontal', 'profile'].includes(capture.viewRole) ||
      !Array.isArray(capture.metrics)
    )
      throw Error('COVERAGE_CAPTURE_INVALID');
    seen.add(capture.captureRef);
    const parsing = capture.parsing
      ? validateParsingSummary(capture.parsing, {
          allowLegacy: true,
          viewRole: capture.viewRole,
        })
      : null;
    for (const [feature, sources] of Object.entries(CANDIDATE_SOURCES))
      if (sources.every((source) => availableSource(capture, parsing, source)))
        counts.set(feature, counts.get(feature) + 1);
  }

  const humanReviewCounts = summarizeHumanReviewEvidence(columns, captures, humanReviews);
  const features = columns.map((column) => {
    const calculationAvailable = column.implementationState === 'canonical_extractor_materialized';
    const deferred = column.implementationState === 'deferred_unavailable';
    const candidateCount = counts.get(column.featureKey);
    const humanReview = humanReviewCounts.get(column.featureKey);
    return Object.freeze({
      featureKey: column.featureKey,
      regionKey: column.regionKey,
      canonicalCalculatorMaterialized: calculationAvailable,
      candidatePhotoCount: candidateCount,
      humanReviewPhotoCount: humanReview.photoCount,
      humanReviewState: humanReview.photoCount > 0 ? 'single_reviewer_unverified' : 'not_started',
      humanReviewLabelCounts: Object.freeze({
        imageLeft: Object.freeze(humanReview.imageLeft),
        imageRight: Object.freeze(humanReview.imageRight),
      }),
      humanReviewAccuracyValidated: false,
      localEvidenceState: deferred
        ? 'unavailable_by_current_authority'
        : candidateCount > 0
          ? 'partial_engineering_proxy_only'
          : 'no_local_photo_evidence',
      requiredExtractor: column.requiredExtractor,
      qualityDependency: column.qualityDependency,
      canonicalPhotoMeasurementVerified: false,
      accuracyValidated: false,
      traditionalBindingApplied: false,
      productInterpretationAuthorized: false,
    });
  });

  return Object.freeze({
    schemaVersion: COVERAGE_VERSION,
    lifecycle: 'local_research_only',
    totalCaptureCount: captures.length,
    frontalCaptureCount: captures.filter((capture) => capture.viewRole === 'frontal').length,
    profileCaptureCount: captures.filter((capture) => capture.viewRole === 'profile').length,
    canonicalFeatureCount: features.length,
    canonicalCalculatorMaterializedCount: features.filter((x) => x.canonicalCalculatorMaterialized)
      .length,
    unresolvedCanonicalCount: features.filter((x) => !x.canonicalCalculatorMaterialized).length,
    featuresWithLocalPhotoProxy: features.filter((x) => x.candidatePhotoCount > 0).length,
    humanReviewedCaptureCount: humanReviews.length,
    humanReviewFeatureCount: features.filter((x) => x.humanReviewPhotoCount > 0).length,
    humanReviewAccuracyValidated: false,
    actualHumanAccuracyVerified: false,
    traditionalBindingApplied: false,
    productionAuthorized: false,
    rawSourcePersistedOrEmitted: false,
    features: Object.freeze(features),
  });
}

export const SOURCE_TRACE_VERSION = 'local-whole-face-source-trace@0.2.0';

// A source-derived execution inventory, not another canonical feature registry.
// The authoritative keys and calculator state come from FR293; observation
// readiness and camera limitations come from FR282. Engineering proxies and
// single-reviewer labels are separate, unverified evidence classes.
export function traceWholeFaceSourceGaps(columns, authorityEntries, captures, humanReviews = []) {
  const report = summarizeWholeFaceCoverage(columns, captures, humanReviews);
  if (
    !Array.isArray(authorityEntries) ||
    authorityEntries.length !== report.canonicalFeatureCount ||
    new Set(authorityEntries.map((entry) => entry.featureKey)).size !== report.canonicalFeatureCount
  )
    throw Error('COVERAGE_AUTHORITY_DRIFT');
  const authorityByKey = new Map(authorityEntries.map((entry) => [entry.featureKey, entry]));
  const features = report.features.map((coverage, index) => {
    const column = columns[index];
    const authority = authorityByKey.get(column.featureKey);
    if (
      !authority ||
      authority.regionKey !== column.regionKey ||
      authority.traditionalBindingIssued !== false ||
      authority.specialDepthHardwareRequired !== false ||
      authority.metric3DRequired !== false ||
      !Array.isArray(authority.reusableRefs) ||
      !Array.isArray(column.sourcePrimitives) ||
      typeof authority.note !== 'string' ||
      typeof authority.observationClass !== 'string' ||
      typeof authority.readiness !== 'string'
    )
      throw Error('COVERAGE_AUTHORITY_DRIFT');
    const sourcePaths = [...new Set([...column.sourcePrimitives, ...authority.reusableRefs])];
    if (
      sourcePaths.some(
        (path) => typeof path !== 'string' || !/^(packages|research)\/[a-zA-Z0-9/_.-]+$/.test(path),
      )
    )
      throw Error('COVERAGE_SOURCE_PATH_INVALID');
    const unavailable = column.implementationState === 'deferred_unavailable';
    const photoEvidenceState = unavailable
      ? 'unavailable'
      : coverage.candidatePhotoCount > 0
        ? 'candidate_only'
        : coverage.canonicalCalculatorMaterialized
          ? 'calculation_only'
          : 'not_observed';
    const nextMissingEvidence = unavailable
      ? 'current_rgb_authority_unavailable'
      : coverage.humanReviewPhotoCount > 0
        ? 'independent_second_reviewer_and_repeat_capture_validation'
        : coverage.candidatePhotoCount > 0
          ? 'canonical_input_binding_and_independent_human_reference'
          : coverage.canonicalCalculatorMaterialized
            ? 'actual_photo_extraction_and_independent_human_reference'
            : 'missing_image_extractor_and_independent_human_reference';
    return Object.freeze({
      featureKey: column.featureKey,
      regionKey: column.regionKey,
      requiredObservation: authority.note,
      observationClass: authority.observationClass,
      captureRequirement:
        authority.observationClass === 'unavailable'
          ? 'not_supported_by_current_rgb_authority'
          : authority.observationClass === 'rgb_relative_3d_shape'
            ? 'rgb_with_independent_relative_3d_reference'
            : authority.observationClass === 'visibility_dependent'
              ? 'view_and_visible_region_required'
              : 'frontal_visible_rgb_region',
      visibilityAndQualityRequirement: column.qualityDependency,
      calculatorState: column.implementationState,
      canonicalCalculatorMaterialized: coverage.canonicalCalculatorMaterialized,
      implementationSourcePaths: Object.freeze(sourcePaths),
      requiredExtractor: column.requiredExtractor,
      localEngineeringProxySources: Object.freeze([
        ...(CANDIDATE_SOURCES[column.featureKey] || []),
      ]),
      localPhotoProxyCount: coverage.candidatePhotoCount,
      photoEvidenceState,
      localHumanReviewCount: coverage.humanReviewPhotoCount,
      humanReviewState: coverage.humanReviewState,
      humanReviewLabelCounts: coverage.humanReviewLabelCounts,
      humanReviewAccuracyValidated: false,
      canonicalPhotoMeasurementVerified: false,
      traditionalSourcePredicateMapped: false,
      traditionalBindingIssued: false,
      interpretationAuthorized: false,
      independentAccuracyState: 'not_evaluated',
      nextMissingEvidence,
    });
  });
  return Object.freeze({
    schemaVersion: SOURCE_TRACE_VERSION,
    canonicalFeatureCount: features.length,
    calculatedOnlyOrUnverifiedCount: features.filter(
      (feature) => feature.canonicalCalculatorMaterialized,
    ).length,
    featuresWithLocalEngineeringProxy: features.filter(
      (feature) => feature.photoEvidenceState === 'candidate_only',
    ).length,
    humanReviewedCaptureCount: report.humanReviewedCaptureCount,
    humanReviewFeatureCount: report.humanReviewFeatureCount,
    humanReviewAccuracyValidated: false,
    sourcePredicateMappingsAdmitted: 0,
    privacy: 'repository_source_paths_and_aggregate_counts_only',
    features: Object.freeze(features),
  });
}

const EXTENSION_REQUIREMENTS_HEADING = '## 3. 사용자가 요구한 세부 관상 정보와 추가 갭';
const EXTENSION_DECISIONS_HEADING =
  '## 부록 C. 딥리서치 반영 — 추가 세부 요구 18개의 직접 작업 선택';

function readSourceMappingRows(document, heading, columns) {
  const start = document.indexOf(heading);
  if (start < 0 || document.indexOf(heading, start + heading.length) !== -1)
    throw Error('COVERAGE_EXTENSION_SOURCE_DRIFT');
  const next = document.indexOf('\n## ', start + heading.length);
  if (next < 0) throw Error('COVERAGE_EXTENSION_SOURCE_DRIFT');
  const section = document.slice(start + heading.length, next);
  const lines = section.split('\n').filter((line) => line.startsWith('|'));
  if (lines.length !== 20 || !/^\|[\s:|-]+\|$/.test(lines[1]))
    throw Error('COVERAGE_EXTENSION_SOURCE_DRIFT');
  return lines.slice(2).map((line) => {
    if (!line.endsWith('|')) throw Error('COVERAGE_EXTENSION_SOURCE_DRIFT');
    const cells = line
      .slice(1, -1)
      .split('|')
      .map((part) => part.trim());
    if (cells.length !== columns || cells.some((part) => !part))
      throw Error('COVERAGE_EXTENSION_SOURCE_DRIFT');
    return cells;
  });
}

// Reads the two already-approved specification tables; it does not mint 18
// extra canonical keys. No photograph, capture ID or person-derived data is read.
export function traceWholeFaceExtensionRequirements(sourceMarkdown, canonicalFeatureKeys) {
  if (
    typeof sourceMarkdown !== 'string' ||
    !Array.isArray(canonicalFeatureKeys) ||
    canonicalFeatureKeys.length !== 29 ||
    new Set(canonicalFeatureKeys).size !== 29
  )
    throw Error('COVERAGE_EXTENSION_SOURCE_DRIFT');
  const normalizedMarkdown = sourceMarkdown.replaceAll('\r\n', '\n');
  const requirements = readSourceMappingRows(normalizedMarkdown, EXTENSION_REQUIREMENTS_HEADING, 4);
  const decisions = readSourceMappingRows(normalizedMarkdown, EXTENSION_DECISIONS_HEADING, 3);
  const seen = new Set();
  const features = requirements.map(([name, related, initialRoute, gap], index) => {
    const [decisionName, technique, independentEvidence] = decisions[index];
    if (name !== decisionName || seen.has(name)) throw Error('COVERAGE_EXTENSION_SOURCE_DRIFT');
    seen.add(name);
    const relatedFeatureKeys = canonicalFeatureKeys.filter((key) => related.includes(key));
    return Object.freeze({
      requirement: name,
      existingCanonicalFeatureKeys: Object.freeze(relatedFeatureKeys),
      mappingReference: related,
      initialObservationRoute: initialRoute,
      missingObservationEvidence: gap,
      studyTechniqueFromSpecification: technique,
      requiredIndependentEvidence: independentEvidence,
      authorityState: 'extension_candidate_not_admitted',
      independentAccuracyState: 'not_evaluated',
      traditionalBindingIssued: false,
      productInterpretationAuthorized: false,
    });
  });
  return Object.freeze({
    schemaVersion: 'local-whole-face-extension-trace@0.1.0',
    extensionRequirementCount: features.length,
    canonicalKeyCountUnchanged: canonicalFeatureKeys.length,
    sourceDocument: 'research/face-reading/whole-face-feature-mapping-20261105.md',
    allExtensionsUnapproved: true,
    features: Object.freeze(features),
  });
}

export const PER_CAPTURE_READINESS_VERSION = 'local-whole-face-per-capture-readiness@0.1.0';

// Research-only, photo-scoped continuation of the existing FR293 coverage calculation.
// Reuse the validated source matching above instead of inventing a second extractor.
// Keep capture-level references strictly inside the private local intake.
export function traceWholeFacePerCaptureReadiness(columns, captures, humanReviews = []) {
  const global = summarizeWholeFaceCoverage(columns, captures, humanReviews);
  const reviewByCapture = new Map(humanReviews.map((entry) => [entry.captureRef, entry]));
  const rows = captures.map((capture) => {
    // A single capture must pass the same validation as the global report.
    const review = reviewByCapture.get(capture.captureRef);
    const local = summarizeWholeFaceCoverage(columns, [capture], review ? [review] : []);
    const hasRunEvidence = capture.metrics.length > 0 || Boolean(capture.parsing);
    // A completed parser batch is not evidence that the landmark model found
    // a face. The existing frontal metric contract explicitly distinguishes
    // face_not_detected from a missing/unverified canonical extractor.
    const landmarkFaceNotDetected =
      capture.viewRole === 'frontal' &&
      capture.metrics.length === METRIC_DEFINITIONS.length &&
      new Set(capture.metrics.map((metric) => metric.metricKey)).size ===
        METRIC_DEFINITIONS.length &&
      capture.metrics.every(
        (metric) =>
          metric.captureRef === capture.captureRef &&
          metric.viewRole === 'frontal' &&
          metric.methodVersion === METHOD_VERSION &&
          metric.candidateOnly === true &&
          typeof metric.metricKey === 'string' &&
          metric.metricKey.startsWith('engineering.frontal.') &&
          VALID_METRICS.has(metric.metricKey.slice('engineering.frontal.'.length)) &&
          metric.status === 'unavailable' &&
          metric.reason === 'face_not_detected',
      );
    const features = local.features.map((feature) => {
      const deferred =
        columns.find((col) => col.featureKey === feature.featureKey)?.implementationState ===
        'deferred_unavailable';
      const candidate = feature.candidatePhotoCount > 0;
      const reviewerOnly = feature.humanReviewPhotoCount > 0;
      let state, reason;
      if (deferred) {
        state = 'unavailable';
        reason = 'CURRENT_RGB_AUTHORITY_UNAVAILABLE';
      } else if (!hasRunEvidence) {
        state = 'not_evaluated';
        reason = 'PHOTO_RUN_EVIDENCE_MISSING';
      } else if (candidate) {
        state = 'candidate_only';
        reason = 'ENGINEERING_PROXY_NOT_CANONICAL';
      } else if (reviewerOnly) {
        state = 'partial';
        reason = 'SINGLE_REVIEWER_NOT_INDEPENDENT_GROUND_TRUTH';
      } else if (capture.viewRole !== 'frontal') {
        state = 'unavailable';
        reason = 'FRONTAL_CAPTURE_REQUIRED';
      } else if (landmarkFaceNotDetected) {
        state = 'unavailable';
        reason = 'FACE_LANDMARK_DETECTION_FAILED';
      } else if (feature.canonicalCalculatorMaterialized) {
        state = 'calculation_only';
        reason = 'CANONICAL_CALCULATOR_WITHOUT_VERIFIED_PHOTO_INPUT';
      } else {
        state = 'unavailable';
        reason = 'NO_VERIFIED_IMAGE_EXTRACTOR';
      }
      return Object.freeze({
        featureKey: feature.featureKey,
        regionKey: feature.regionKey,
        state,
        reason,
        canonicalCalculatorMaterialized: feature.canonicalCalculatorMaterialized,
        engineeringProxyMatched: candidate,
        singleReviewerLabelPresent: reviewerOnly,
        independentHumanGroundTruthPresent: false,
        canonicalObservationAdmitted: false,
        traditionalBindingAuthorized: false,
        productInterpretationAuthorized: false,
      });
    });
    return Object.freeze({
      captureRef: capture.captureRef,
      viewRole: capture.viewRole,
      hasPersistedExecutionEvidence: hasRunEvidence,
      canonicalFeatureCount: features.length,
      features: Object.freeze(features),
    });
  });
  const states = [
    'not_evaluated',
    'calculation_only',
    'candidate_only',
    'partial',
    'observed',
    'unavailable',
  ];
  const tally = Object.fromEntries(states.map((state) => [state, 0]));
  for (const capture of rows) for (const feature of capture.features) tally[feature.state]++;
  if (
    rows.length !== global.totalCaptureCount ||
    tally.candidate_only !==
      global.features.reduce((total, feature) => total + feature.candidatePhotoCount, 0) ||
    tally.observed !== 0
  )
    throw Error('PER_CAPTURE_READINESS_SOURCE_MISMATCH');
  return Object.freeze({
    schemaVersion: PER_CAPTURE_READINESS_VERSION,
    lifecycle: 'private_local_research_only',
    photoCount: rows.length,
    canonicalFeatureCount: global.canonicalFeatureCount,
    canonicalCalculatorCount: global.canonicalCalculatorMaterializedCount,
    canonicalHardGapCount: global.unresolvedCanonicalCount,
    statusCounts: Object.freeze(tally),
    independentAccuracyValidated: false,
    admittedCanonicalMeasurements: 0,
    traditionalBindingAuthorized: false,
    productionAuthorized: false,
    containsRawBiometricMeasurements: false,
    captures: Object.freeze(rows),
  });
}

export const WHOLE_FACE_READINESS_ROLLUP_VERSION =
  'local-whole-face-feature-readiness-rollup@0.1.0';

// Aggregate only the existing per-photo readiness decisions. No raw capture
// reference, photo data, model contour or human mark leaves this projection.
export function summarizeWholeFacePerFeatureReadiness(columns, captures, humanReviews = []) {
  const readiness = traceWholeFacePerCaptureReadiness(columns, captures, humanReviews);
  const states = Object.keys(readiness.statusCounts);
  const byFeature = new Map(
    columns.map((column) => [
      column.featureKey,
      {
        featureKey: column.featureKey,
        statusCounts: Object.fromEntries(states.map((state) => [state, 0])),
        reasonCounts: {},
      },
    ]),
  );
  for (const capture of readiness.captures) {
    for (const item of capture.features) {
      const feature = byFeature.get(item.featureKey);
      if (!feature || !Object.hasOwn(feature.statusCounts, item.state))
        throw Error('PER_CAPTURE_READINESS_SOURCE_MISMATCH');
      feature.statusCounts[item.state]++;
      feature.reasonCounts[item.reason] = (feature.reasonCounts[item.reason] || 0) + 1;
    }
  }
  const features = [...byFeature.values()].map((feature) => {
    if (Object.values(feature.statusCounts).reduce((sum, n) => sum + n, 0) !== readiness.photoCount)
      throw Error('PER_CAPTURE_READINESS_SOURCE_MISMATCH');
    return Object.freeze({
      featureKey: feature.featureKey,
      statusCounts: Object.freeze(feature.statusCounts),
      reasonCounts: Object.freeze(feature.reasonCounts),
    });
  });
  for (const state of states) {
    if (
      features.reduce((sum, feature) => sum + feature.statusCounts[state], 0) !==
      readiness.statusCounts[state]
    )
      throw Error('PER_CAPTURE_READINESS_SOURCE_MISMATCH');
  }
  return Object.freeze({
    schemaVersion: WHOLE_FACE_READINESS_ROLLUP_VERSION,
    lifecycle: 'local_research_only',
    photoCount: readiness.photoCount,
    canonicalFeatureCount: readiness.canonicalFeatureCount,
    canonicalCalculatorCount: readiness.canonicalCalculatorCount,
    canonicalHardGapCount: readiness.canonicalHardGapCount,
    statusCounts: readiness.statusCounts,
    independentAccuracyValidated: false,
    traditionalBindingAuthorized: false,
    productionAuthorized: false,
    sourcePhotoOrCaptureRefsEmitted: false,
    features: Object.freeze(features),
  });
}
