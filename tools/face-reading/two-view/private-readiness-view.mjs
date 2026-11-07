export const LOCAL_READINESS_VIEW_VERSION = 'private-face-readiness-view@0.1.0';
const STATES = Object.freeze([
  'not_evaluated',
  'calculation_only',
  'candidate_only',
  'partial',
  'observed',
  'unavailable',
]);
const REASONS = Object.freeze([
  'CURRENT_RGB_AUTHORITY_UNAVAILABLE',
  'PHOTO_RUN_EVIDENCE_MISSING',
  'ENGINEERING_PROXY_NOT_CANONICAL',
  'SINGLE_REVIEWER_NOT_INDEPENDENT_GROUND_TRUTH',
  'FRONTAL_CAPTURE_REQUIRED',
  'CANONICAL_CALCULATOR_WITHOUT_VERIFIED_PHOTO_INPUT',
  'NO_VERIFIED_IMAGE_EXTRACTOR',
]);
const plain = (v) => v && typeof v === 'object' && !Array.isArray(v);
const exact = (v, fields) =>
  plain(v) &&
  Object.keys(v).length === fields.length &&
  fields.every((field) => Object.hasOwn(v, field));
function invalid() {
  throw Error('PRIVATE_READINESS_VIEW_INVALID');
}

export function projectPrivatePhotoReadiness(report, expectedCaptures, expectedKeys, versions) {
  const top = [
    'schemaVersion',
    'lifecycle',
    'photoCount',
    'canonicalFeatureCount',
    'canonicalCalculatorCount',
    'canonicalHardGapCount',
    'statusCounts',
    'independentAccuracyValidated',
    'admittedCanonicalMeasurements',
    'traditionalBindingAuthorized',
    'productionAuthorized',
    'containsRawBiometricMeasurements',
    'captures',
    'sources',
  ];
  const sourceKeys = [
    'metricMethodVersion',
    'parsingMethodVersion',
    'savedMetricsValidation',
    'savedParsingValidation',
    'uniqueOriginalImagesRehashed',
    'previousAggregateCrossChecked',
  ];
  const featureKeys = [
    'featureKey',
    'regionKey',
    'state',
    'reason',
    'canonicalCalculatorMaterialized',
    'engineeringProxyMatched',
    'singleReviewerLabelPresent',
    'independentHumanGroundTruthPresent',
    'canonicalObservationAdmitted',
    'traditionalBindingAuthorized',
    'productInterpretationAuthorized',
  ];
  if (
    !exact(report, top) ||
    report.schemaVersion !== 'local-whole-face-per-capture-readiness@0.1.0' ||
    report.lifecycle !== 'private_local_research_only' ||
    !Array.isArray(expectedCaptures) ||
    !Array.isArray(expectedKeys) ||
    expectedKeys.length !== 29 ||
    new Set(expectedKeys).size !== 29 ||
    report.photoCount !== expectedCaptures.length ||
    report.canonicalFeatureCount !== 29 ||
    report.canonicalCalculatorCount !== 18 ||
    report.canonicalHardGapCount !== 11 ||
    report.independentAccuracyValidated !== false ||
    report.admittedCanonicalMeasurements !== 0 ||
    report.traditionalBindingAuthorized !== false ||
    report.productionAuthorized !== false ||
    report.containsRawBiometricMeasurements !== false ||
    !exact(report.sources, sourceKeys) ||
    report.sources.metricMethodVersion !== versions.metric ||
    report.sources.parsingMethodVersion !== versions.parsing ||
    report.sources.uniqueOriginalImagesRehashed !== expectedCaptures.length ||
    report.sources.savedMetricsValidation !== true ||
    report.sources.savedParsingValidation !== true ||
    report.sources.previousAggregateCrossChecked !== true ||
    !exact(report.statusCounts, STATES) ||
    !Array.isArray(report.captures) ||
    report.captures.length !== expectedCaptures.length
  )
    invalid();
  const featureSet = new Set(expectedKeys);
  const counts = Object.fromEntries(STATES.map((s) => [s, 0]));
  const captures = {};
  for (let i = 0; i < expectedCaptures.length; i++) {
    const expected = expectedCaptures[i];
    const record = report.captures[i];
    if (
      !exact(record, [
        'captureRef',
        'viewRole',
        'hasPersistedExecutionEvidence',
        'canonicalFeatureCount',
        'features',
      ]) ||
      record.captureRef !== expected.captureRef ||
      record.viewRole !== expected.viewRole ||
      record.canonicalFeatureCount !== 29 ||
      typeof record.hasPersistedExecutionEvidence !== 'boolean' ||
      !Array.isArray(record.features) ||
      record.features.length !== 29 ||
      new Set(record.features.map((f) => f.featureKey)).size !== 29
    )
      invalid();
    const projected = [];
    for (const entry of record.features) {
      if (
        !exact(entry, featureKeys) ||
        !featureSet.has(entry.featureKey) ||
        typeof entry.regionKey !== 'string' ||
        !STATES.includes(entry.state) ||
        !REASONS.includes(entry.reason) ||
        typeof entry.canonicalCalculatorMaterialized !== 'boolean' ||
        typeof entry.engineeringProxyMatched !== 'boolean' ||
        typeof entry.singleReviewerLabelPresent !== 'boolean' ||
        entry.independentHumanGroundTruthPresent !== false ||
        entry.canonicalObservationAdmitted !== false ||
        entry.traditionalBindingAuthorized !== false ||
        entry.productInterpretationAuthorized !== false ||
        entry.state === 'observed' ||
        (entry.state === 'candidate_only') !== entry.engineeringProxyMatched
      )
        invalid();
      counts[entry.state]++;
      projected.push(
        Object.freeze({
          featureKey: entry.featureKey,
          state: entry.state,
          reason: entry.reason,
        }),
      );
    }
    captures[record.captureRef] = Object.freeze({
      viewRole: record.viewRole,
      hasPersistedExecutionEvidence: record.hasPersistedExecutionEvidence,
      features: Object.freeze(projected),
    });
  }
  if (STATES.some((state) => counts[state] !== report.statusCounts[state])) invalid();
  return Object.freeze({
    schemaVersion: LOCAL_READINESS_VIEW_VERSION,
    status: 'available',
    captureCount: report.photoCount,
    statusCounts: Object.freeze(counts),
    independentAccuracyValidated: false,
    canonicalPhotoMeasurementVerified: false,
    captures: Object.freeze(captures),
  });
}
