import { METHOD_VERSION, METRIC_DEFINITIONS } from './frontal-metrics.mjs';
import { validateParsingSummary } from './parsing-contract.mjs';

export const COVERAGE_VERSION = 'local-whole-face-coverage@0.1.0';

const VALID_METRICS = new Set(METRIC_DEFINITIONS.map((entry) => entry.id));

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

// Only aggregates validated, locally saved candidate summaries. Never emit
// capture refs, filenames, raw contours, masks, identity, or original scores.
export function summarizeWholeFaceCoverage(columns, captures) {
  if (
    !Array.isArray(columns) ||
    columns.length !== 29 ||
    new Set(columns.map((x) => x.featureKey)).size !== 29 ||
    !Array.isArray(captures)
  )
    throw Error('COVERAGE_SCHEMA_DRIFT');

  for (const feature of Object.keys(CANDIDATE_SOURCES))
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

  const features = columns.map((column) => {
    const calculationAvailable = column.implementationState === 'canonical_extractor_materialized';
    const deferred = column.implementationState === 'deferred_unavailable';
    const candidateCount = counts.get(column.featureKey);
    return Object.freeze({
      featureKey: column.featureKey,
      regionKey: column.regionKey,
      canonicalCalculatorMaterialized: calculationAvailable,
      candidatePhotoCount: candidateCount,
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
    actualHumanAccuracyVerified: false,
    traditionalBindingApplied: false,
    productionAuthorized: false,
    rawSourcePersistedOrEmitted: false,
    features: Object.freeze(features),
  });
}

export const SOURCE_TRACE_VERSION = 'local-whole-face-source-trace@0.1.0';

// A source-derived execution inventory, not another canonical feature registry.
// The authoritative keys and calculator state come from FR293; observation
// readiness and camera limitations come from FR282. Local photo evidence is
// limited to the independently validated engineering proxies above.
export function traceWholeFaceSourceGaps(columns, authorityEntries, captures) {
  const report = summarizeWholeFaceCoverage(columns, captures);
  if (
    !Array.isArray(authorityEntries) ||
    authorityEntries.length !== report.canonicalFeatureCount ||
    new Set(authorityEntries.map((entry) => entry.featureKey)).size !==
      report.canonicalFeatureCount
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
      localEngineeringProxySources: Object.freeze([...(CANDIDATE_SOURCES[column.featureKey] || [])]),
      localPhotoProxyCount: coverage.candidatePhotoCount,
      photoEvidenceState,
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
    sourcePredicateMappingsAdmitted: 0,
    privacy: 'repository_source_paths_and_aggregate_counts_only',
    features: Object.freeze(features),
  });
}
