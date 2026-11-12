import { PARSING_VERSION } from './parsing-contract.mjs';
import { measureManualEyelidLineOffsets } from './eyelid-manual-line-offsets.mjs';

export const CURRENT_2D_EVIDENCE_VERSION = 'engineering.current-2d-evidence-readiness@0.1.0';

// The six FR294 image/appearance and ear-visibility hard gaps. This is NOT
// another canonical feature registry and never changes FR282/FR293 authority.
const definitions = Object.freeze([
  ['forehead.visible_width_shape', '보이는 이마 피부', 'VISIBLE_FOREHEAD_SKIN_GT_REQUIRED'],
  ['forehead.visible_hairline_boundary', '모발·피부 접경', 'INDEPENDENT_FOLLICLE_LINE_GT_REQUIRED'],
  ['eyebrow.visible_hair_density_texture', '눈썹 화소 질감', 'INDEPENDENT_HAIR_FIBRE_GT_REQUIRED'],
  ['eye.eyelid_crease_or_hooded_category', '눈꺼풀 사람 표시선', 'INDEPENDENT_EYELID_TYPE_GT_REQUIRED'],
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
    const forehead = checked(
      foreheadSkinCandidate, 'engineering.visible-forehead-skin-band@0.1.0',
      ['anatomicalForeheadBoundaryValidated', 'anatomicalHairlineAuthorized'],
    );
    states.set('forehead.visible_width_shape', forehead);
    if (!['candidate_only', 'partial'].includes(forehead.state)) {
      states.set('forehead.visible_hairline_boundary', forehead);
    } else {
      const contacts = foreheadSkinCandidate?.modelContacts;
      const visible = Array.isArray(contacts)
        ? contacts.filter((point) => point.status === 'available').length : 0;
      states.set('forehead.visible_hairline_boundary',
        visible === 0 ? invalid('NO_VISIBLE_MODEL_HAIR_SKIN_CONTACT') :
        candidate(visible === 3 && forehead.state === 'candidate_only' ? 'available' : 'partial',
          'MODEL_CONTACT_NOT_FOLLICLE_LINE', 'PARTIAL_MODEL_CONTACT_NOT_FOLLICLE_LINE'));
    }

    states.set('eyebrow.visible_hair_density_texture',
      checked(browPixelTextureCandidate, 'engineering.visible-brow-pixel-texture@0.1.0',
        ['individualHairFibresIdentified', 'hairDensityMeasured']));

    const eyelid = eyelidReview ? measureManualEyelidLineOffsets(eyelidReview) : null;
    if (!eyelid) states.set('eye.eyelid_crease_or_hooded_category',
      invalid('HUMAN_EYELID_LINE_REVIEW_REQUIRED'));
    else if (eyelid.candidateOnly !== true || eyelid.independentAccuracyValidated !== false ||
      eyelid.canonicalF0Admitted !== false || eyelid.traditionalBindingAuthorized !== false)
      states.set('eye.eyelid_crease_or_hooded_category',
        invalid('HUMAN_EYELID_AUTHORITY_INVALID'));
    else if (eyelid.status === 'unavailable')
      states.set('eye.eyelid_crease_or_hooded_category',
        invalid('COMPARABLE_EYELID_LINES_MISSING'));
    else
      states.set('eye.eyelid_crease_or_hooded_category',
        candidate(eyelid.status, 'MANUAL_OFFSETS_NOT_EYELID_TYPE',
          'PARTIAL_MANUAL_OFFSETS_NOT_EYELID_TYPE'));

    states.set('mouth.visible_lip_color',
      checked(lipPixelColorCandidate, 'engineering.visible-lip-pixel-color@0.1.0',
        ['colorCalibrated', 'whiteBalanceVerified', 'illuminationControlled',
          'makeupExcluded', 'trueAnatomicalLipColorValidated']));

    const ear = earRimCurveComparison?.revision === currentEarRevision &&
      currentEarRevision != null && earRimCurveComparison?.status === 'completed'
        ? earRimCurveComparison.value : null;
    if (ear) {
      states.set('ear.visible_boundary_height_shape',
        checked(ear, 'engineering.ear-rim-class-boundary-curve@0.1.0',
          ['anatomicalOuterRimValidated', 'drawingCoverageCertified']));
    } else {
      const modelEar = earMaskCandidate;
      if (modelEar == null || modelEar.status === 'loading')
        states.set('ear.visible_boundary_height_shape', pending('CURRENT_EAR_REGION_NOT_AVAILABLE'));
      else if (modelEar.candidateOnly !== true ||
          modelEar.independentAccuracyValidated !== false ||
          modelEar.anatomicalLateralityAssigned !== false)
        states.set('ear.visible_boundary_height_shape', invalid('EAR_MODEL_AUTHORITY_INVALID'));
      else if (!['available', 'partial'].includes(modelEar.status))
        states.set('ear.visible_boundary_height_shape', invalid('EAR_MODEL_REGION_UNAVAILABLE'));
      else
        states.set('ear.visible_boundary_height_shape',
          candidate('partial', 'WHOLE_EAR_CLASS_ONLY', 'WHOLE_EAR_CLASS_NO_HUMAN_CURVE'));
    }
  }

  const features = definitions.map(([featureKey, label, nextEvidence]) => {
    const { state, reason } = states.get(featureKey);
    return Object.freeze({
      featureKey, label, state, reason, nextEvidence,
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
