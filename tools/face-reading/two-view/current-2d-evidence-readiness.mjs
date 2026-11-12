import { PARSING_VERSION } from './parsing-contract.mjs';
import { measureManualEyelidLineOffsets } from './eyelid-manual-line-offsets.mjs';

export const CURRENT_2D_EVIDENCE_VERSION = 'engineering.current-2d-evidence-readiness@0.1.0';

// The six FR294 image/appearance and ear-visibility hard gaps. This is NOT
// another canonical feature registry and never changes FR282/FR293 authority.
const definitions = Object.freeze([
  ['forehead.visible_width_shape', '보이는 이마 피부', 'VISIBLE_FOREHEAD_SKIN_GT_REQUIRED'],
  ['forehead.visible_hairline_boundary', '모발·피부 접경', 'INDEPENDENT_FOLLICLE_LINE_GT_REQUIRED'],
  ['eyebrow.visible_hair_density_texture', '눈썹 화소 질감', 'INDEPENDENT_HAIR_FIBRE_GT_REQUIRED'],
  [
    'eye.eyelid_crease_or_hooded_category',
    '눈꺼풀 사람 표시선',
    'INDEPENDENT_EYELID_TYPE_GT_REQUIRED',
  ],
  ['mouth.visible_lip_color', '위·아래 입술 색 채널', 'CONTROLLED_LIP_COLOR_GT_REQUIRED'],
  ['ear.visible_boundary_height_shape', '귀 모델·사람 외곽', 'INDEPENDENT_VISIBLE_EAR_GT_REQUIRED'],
]);

const invalid = (reason) => Object.freeze({ state: 'unavailable', reason });
const pending = (reason) => Object.freeze({ state: 'not_evaluated', reason });
const candidate = (status, availableReason, partialReason) =>
  Object.freeze({
    state: status === 'available' ? 'candidate_only' : 'partial',
    reason: status === 'available' ? availableReason : partialReason,
  });

function checked(value, version, falseFlags) {
  if (value == null || value.status === 'loading') return pending('CURRENT_PREVIEW_NOT_AVAILABLE');
  if (
    value.methodVersion !== version ||
    value.candidateOnly !== true ||
    value.independentAccuracyValidated !== false ||
    value.canonicalF0Admitted !== false ||
    value.traditionalBindingAuthorized !== false ||
    value.productInterpretationAuthorized !== false ||
    falseFlags.some((key) => value[key] !== false)
  )
    return invalid('CANDIDATE_AUTHORITY_OR_VERSION_INVALID');
  if (!['available', 'partial', 'unavailable'].includes(value.status))
    return invalid('CANDIDATE_STATUS_INVALID');
  if (value.status === 'unavailable') return invalid('CANDIDATE_MEASUREMENT_WITHHELD');
  return candidate(value.status, 'CURRENT_IMAGE_PROXY_ONLY', 'PARTIAL_IMAGE_PROXY_ONLY');
}

export function summarizeCurrent2dPhotoEvidence({
  viewRole,
  parsing,
  previous = false,
  foreheadSkinCandidate,
  browPixelTextureCandidate,
  lipPixelColorCandidate,
  earMaskCandidate,
  earRimCurveComparison,
  currentEarRevision,
  eyelidReview,
} = {}) {
  const states = new Map();
  if (previous) {
    for (const [key] of definitions) states.set(key, pending('PREVIOUS_ANALYSIS_NOT_CURRENT'));
  } else if (viewRole !== 'frontal') {
    for (const [key] of definitions) states.set(key, invalid('FRONTAL_CAPTURE_REQUIRED'));
  } else if (parsing?.status !== 'completed' || parsing.methodVersion !== PARSING_VERSION) {
    for (const [key] of definitions) states.set(key, pending('CURRENT_MODEL_ANALYSIS_MISSING'));
  } else {
    let forehead = checked(foreheadSkinCandidate, 'engineering.visible-forehead-skin-band@0.1.0', [
      'anatomicalForeheadBoundaryValidated',
      'anatomicalHairlineAuthorized',
    ]);
    if (
      forehead.state === 'not_evaluated' &&
      parsing.instanceRefinement?.status === 'unavailable' &&
      parsing.instanceRefinement.reason === 'MODEL_UNAVAILABLE' &&
      parsing.regionScreening?.regions?.brows?.status === 'unchecked' &&
      parsing.regionScreening?.regions?.lips?.status === 'unchecked'
    )
      forehead = invalid('MODEL_FACE_ANCHOR_UNAVAILABLE');
    states.set('forehead.visible_width_shape', forehead);
    if (!['candidate_only', 'partial'].includes(forehead.state)) {
      states.set('forehead.visible_hairline_boundary', forehead);
    } else {
      const contacts = foreheadSkinCandidate?.modelContacts;
      const visible = Array.isArray(contacts)
        ? contacts.filter((point) => point.status === 'available').length
        : 0;
      states.set(
        'forehead.visible_hairline_boundary',
        visible === 0
          ? invalid('NO_VISIBLE_MODEL_HAIR_SKIN_CONTACT')
          : candidate(
              visible === 3 && forehead.state === 'candidate_only' ? 'available' : 'partial',
              'MODEL_CONTACT_NOT_FOLLICLE_LINE',
              'PARTIAL_MODEL_CONTACT_NOT_FOLLICLE_LINE',
            ),
      );
    }

    let brow = checked(browPixelTextureCandidate, 'engineering.visible-brow-pixel-texture@0.1.0', [
      'individualHairFibresIdentified',
      'hairDensityMeasured',
    ]);
    if (
      brow.state === 'not_evaluated' &&
      ['suppressed', 'unchecked'].includes(parsing.regionScreening?.regions?.brows?.status)
    )
      brow = invalid('BROW_REGION_NOT_SCREENED');
    states.set('eyebrow.visible_hair_density_texture', brow);

    const eyelid = eyelidReview ? measureManualEyelidLineOffsets(eyelidReview) : null;
    if (!eyelid)
      states.set(
        'eye.eyelid_crease_or_hooded_category',
        invalid('HUMAN_EYELID_LINE_REVIEW_REQUIRED'),
      );
    else if (
      eyelid.candidateOnly !== true ||
      eyelid.independentAccuracyValidated !== false ||
      eyelid.canonicalF0Admitted !== false ||
      eyelid.traditionalBindingAuthorized !== false
    )
      states.set('eye.eyelid_crease_or_hooded_category', invalid('HUMAN_EYELID_AUTHORITY_INVALID'));
    else if (eyelid.status === 'unavailable')
      states.set(
        'eye.eyelid_crease_or_hooded_category',
        invalid('COMPARABLE_EYELID_LINES_MISSING'),
      );
    else
      states.set(
        'eye.eyelid_crease_or_hooded_category',
        candidate(
          eyelid.status,
          'MANUAL_OFFSETS_NOT_EYELID_TYPE',
          'PARTIAL_MANUAL_OFFSETS_NOT_EYELID_TYPE',
        ),
      );

    let lip = checked(lipPixelColorCandidate, 'engineering.visible-lip-pixel-color@0.1.0', [
      'colorCalibrated',
      'whiteBalanceVerified',
      'illuminationControlled',
      'makeupExcluded',
      'trueAnatomicalLipColorValidated',
    ]);
    if (
      lip.state === 'not_evaluated' &&
      (['suppressed', 'unchecked'].includes(parsing.regionScreening?.regions?.lips?.status) ||
        parsing.morphology?.lipBalance?.status === 'unavailable')
    )
      lip = invalid('LIP_GEOMETRY_OR_REGION_UNAVAILABLE');
    states.set('mouth.visible_lip_color', lip);

    const ear =
      earRimCurveComparison?.revision === currentEarRevision &&
      currentEarRevision != null &&
      earRimCurveComparison?.status === 'completed'
        ? earRimCurveComparison.value
        : null;
    if (ear) {
      states.set(
        'ear.visible_boundary_height_shape',
        checked(ear, 'engineering.ear-rim-class-boundary-curve@0.1.0', [
          'anatomicalOuterRimValidated',
          'drawingCoverageCertified',
        ]),
      );
    } else {
      const modelEar = earMaskCandidate;
      if (modelEar == null || modelEar.status === 'loading')
        states.set(
          'ear.visible_boundary_height_shape',
          pending('CURRENT_EAR_REGION_NOT_AVAILABLE'),
        );
      else if (
        modelEar.candidateOnly !== true ||
        modelEar.independentAccuracyValidated !== false ||
        modelEar.anatomicalLateralityAssigned !== false
      )
        states.set('ear.visible_boundary_height_shape', invalid('EAR_MODEL_AUTHORITY_INVALID'));
      else if (!['available', 'partial'].includes(modelEar.status))
        states.set('ear.visible_boundary_height_shape', invalid('EAR_MODEL_REGION_UNAVAILABLE'));
      else
        states.set(
          'ear.visible_boundary_height_shape',
          candidate('partial', 'WHOLE_EAR_CLASS_ONLY', 'WHOLE_EAR_CLASS_NO_HUMAN_CURVE'),
        );
    }
  }

  const features = definitions.map(([featureKey, label, nextEvidence]) => {
    const { state, reason } = states.get(featureKey);
    return Object.freeze({
      featureKey,
      label,
      state,
      reason,
      nextEvidence,
      independentAccuracyValidated: false,
      canonicalF0Admitted: false,
      traditionalBindingAuthorized: false,
      productInterpretationAuthorized: false,
    });
  });
  return Object.freeze({
    methodVersion: CURRENT_2D_EVIDENCE_VERSION,
    status: 'research_only',
    featureCount: features.length,
    empiricalValidationCompleted: false,
    canonicalFeatureCountUnchanged: 29,
    unresolvedHardGapsUnchanged: 11,
    rawSourcePersistedOrEmitted: false,
    features: Object.freeze(features),
  });
}

export const CURRENT_2D_BATCH_EVIDENCE_VERSION = 'engineering.current-2d-session-coverage@0.1.0';
const EVIDENCE_STATES = Object.freeze([
  'candidate_only',
  'partial',
  'unavailable',
  'not_evaluated',
]);
const counts = () => Object.fromEntries(EVIDENCE_STATES.map((state) => [state, 0]));

// Aggregate the previews already held in browser memory. This is model/reviewer
// coverage, NOT real-photo measurement accuracy or independent repeatability.
// No capture identifiers, geometry, source paths or raw feature measurements
// are copied into the aggregate.
export function summarizeCurrent2dSessionCoverage(photoSummaries) {
  if (!Array.isArray(photoSummaries)) throw Error('CURRENT_2D_SESSION_INPUT_INVALID');
  const features = definitions.map(([featureKey, label]) => ({
    featureKey,
    label,
    ...counts(),
  }));
  const overall = counts();
  for (const summary of photoSummaries) {
    if (
      summary?.methodVersion !== CURRENT_2D_EVIDENCE_VERSION ||
      summary?.status !== 'research_only' ||
      summary?.featureCount !== definitions.length ||
      summary?.empiricalValidationCompleted !== false ||
      summary?.canonicalFeatureCountUnchanged !== 29 ||
      summary?.unresolvedHardGapsUnchanged !== 11 ||
      summary?.rawSourcePersistedOrEmitted !== false ||
      !Array.isArray(summary?.features) ||
      summary.features.length !== definitions.length
    )
      throw Error('CURRENT_2D_SESSION_SOURCE_INVALID');
    for (let i = 0; i < definitions.length; i++) {
      const row = summary.features[i];
      if (
        row?.featureKey !== definitions[i][0] ||
        !EVIDENCE_STATES.includes(row.state) ||
        row.independentAccuracyValidated !== false ||
        row.canonicalF0Admitted !== false ||
        row.traditionalBindingAuthorized !== false ||
        row.productInterpretationAuthorized !== false
      )
        throw Error('CURRENT_2D_SESSION_AUTHORITY_INVALID');
      features[i][row.state]++;
      overall[row.state]++;
    }
  }
  return Object.freeze({
    methodVersion: CURRENT_2D_BATCH_EVIDENCE_VERSION,
    status: 'unverified_local_preview_coverage_only',
    includedPhotoCount: photoSummaries.length,
    featureCount: definitions.length,
    totalPhotoFeatureEntries: photoSummaries.length * definitions.length,
    statusCounts: Object.freeze(overall),
    features: Object.freeze(features.map((row) => Object.freeze({ ...row }))),
    independentAccuracyValidated: false,
    independentRepeatabilityValidated: false,
    canonicalF0Admitted: false,
    traditionalBindingAuthorized: false,
    productInterpretationAuthorized: false,
    rawSourcePersistedOrEmitted: false,
  });
}

export const CURRENT_2D_REASON_DIAGNOSTIC_VERSION =
  'engineering.current-2d-reason-diagnostics@0.1.0';

// These reason codes are emitted only by summarizeCurrent2dPhotoEvidence above.
// They describe evidence availability, never anatomical measurement accuracy.
const REASON_CLASS = Object.freeze({
  PREVIOUS_ANALYSIS_NOT_CURRENT: ['not_evaluated', 'stale_or_missing_analysis'],
  CURRENT_MODEL_ANALYSIS_MISSING: ['not_evaluated', 'stale_or_missing_analysis'],
  CURRENT_PREVIEW_NOT_AVAILABLE: ['not_evaluated', 'preview_not_run_or_loading'],
  CURRENT_EAR_REGION_NOT_AVAILABLE: ['not_evaluated', 'preview_not_run_or_loading'],
  FRONTAL_CAPTURE_REQUIRED: ['unavailable', 'view_requirement'],
  CANDIDATE_AUTHORITY_OR_VERSION_INVALID: ['unavailable', 'candidate_contract_invalid'],
  CANDIDATE_STATUS_INVALID: ['unavailable', 'candidate_contract_invalid'],
  CANDIDATE_MEASUREMENT_WITHHELD: ['unavailable', 'model_or_visibility_blocked'],
  NO_VISIBLE_MODEL_HAIR_SKIN_CONTACT: ['unavailable', 'model_or_visibility_blocked'],
  MODEL_FACE_ANCHOR_UNAVAILABLE: ['unavailable', 'model_or_visibility_blocked'],
  BROW_REGION_NOT_SCREENED: ['unavailable', 'model_or_visibility_blocked'],
  LIP_GEOMETRY_OR_REGION_UNAVAILABLE: ['unavailable', 'model_or_visibility_blocked'],
  HUMAN_EYELID_LINE_REVIEW_REQUIRED: ['unavailable', 'manual_review_required'],
  HUMAN_EYELID_AUTHORITY_INVALID: ['unavailable', 'candidate_contract_invalid'],
  COMPARABLE_EYELID_LINES_MISSING: ['unavailable', 'manual_review_required'],
  EAR_MODEL_AUTHORITY_INVALID: ['unavailable', 'candidate_contract_invalid'],
  EAR_MODEL_REGION_UNAVAILABLE: ['unavailable', 'model_or_visibility_blocked'],
  CURRENT_IMAGE_PROXY_ONLY: ['candidate_only', 'proxy_requires_independent_reference'],
  PARTIAL_IMAGE_PROXY_ONLY: ['partial', 'proxy_requires_independent_reference'],
  MODEL_CONTACT_NOT_FOLLICLE_LINE: ['candidate_only', 'proxy_requires_independent_reference'],
  PARTIAL_MODEL_CONTACT_NOT_FOLLICLE_LINE: ['partial', 'proxy_requires_independent_reference'],
  MANUAL_OFFSETS_NOT_EYELID_TYPE: ['candidate_only', 'proxy_requires_independent_reference'],
  PARTIAL_MANUAL_OFFSETS_NOT_EYELID_TYPE: ['partial', 'proxy_requires_independent_reference'],
  WHOLE_EAR_CLASS_ONLY: ['candidate_only', 'proxy_requires_independent_reference'],
  WHOLE_EAR_CLASS_NO_HUMAN_CURVE: ['partial', 'proxy_requires_independent_reference'],
});

export function diagnoseCurrent2dSessionEvidence(photoSummaries) {
  const base = summarizeCurrent2dSessionCoverage(photoSummaries);
  const features = definitions.map(([featureKey, label, nextEvidence]) => ({
    featureKey,
    label,
    nextEvidence,
    statusCounts: counts(),
    causes: new Map(),
  }));
  const categories = new Map();
  for (const summary of photoSummaries) {
    for (const [index, row] of summary.features.entries()) {
      const reasonInfo = REASON_CLASS[row.reason];
      if (
        !reasonInfo ||
        reasonInfo[0] !== row.state ||
        row.label !== definitions[index][1] ||
        row.nextEvidence !== definitions[index][2]
      )
        throw Error('CURRENT_2D_DIAGNOSTIC_REASON_INVALID');
      const [state, category] = reasonInfo;
      const feature = features[index];
      feature.statusCounts[state]++;
      const reasonKey = state + ':' + row.reason;
      if (!feature.causes.has(reasonKey)) {
        feature.causes.set(reasonKey, {
          state,
          reason: row.reason,
          category,
          count: 0,
        });
      }
      feature.causes.get(reasonKey).count++;
      categories.set(category, (categories.get(category) || 0) + 1);
    }
  }
  return Object.freeze({
    schemaVersion: CURRENT_2D_REASON_DIAGNOSTIC_VERSION,
    status: 'research_only_unverified_reason_counts',
    includedPhotoCount: base.includedPhotoCount,
    totalPhotoFeatureEntries: base.totalPhotoFeatureEntries,
    statusCounts: base.statusCounts,
    categories: Object.freeze(
      [...categories]
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([category, count]) => Object.freeze({ category, count })),
    ),
    features: Object.freeze(
      features.map((f) =>
        Object.freeze({
          featureKey: f.featureKey,
          label: f.label,
          nextEvidence: f.nextEvidence,
          statusCounts: Object.freeze({ ...f.statusCounts }),
          causes: Object.freeze(
            [...f.causes.values()]
              .sort((a, b) => a.reason.localeCompare(b.reason))
              .map((v) => Object.freeze({ ...v })),
          ),
        }),
      ),
    ),
    separatePreviewMissingFromModelFailure: true,
    independentlyReviewedPose: false,
    independentHumanReferenceValidated: false,
    independentRepeatabilityValidated: false,
    canonicalF0Admitted: false,
    traditionalBindingAuthorized: false,
    productInterpretationAuthorized: false,
    rawSourcePersistedOrEmitted: false,
  });
}
