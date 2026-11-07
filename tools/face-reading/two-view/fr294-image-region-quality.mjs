// Private local research view: parser segmentation is NOT face anatomy, image
// visibility admission, an appearance/colour measurement, or independent truth.
import { PARSING_VERSION } from './parsing-contract.mjs';

export const FR294_REGION_QUALITY_VERSION = 'local-fr294-parsing-region-quality@0.1.0';
const MATRIX = Object.freeze([
  { key: 'forehead.visible_width_shape', region: 'skin', channel: 'non_specific_skin_class' },
  {
    key: 'forehead.visible_hairline_boundary',
    region: 'skin',
    channel: 'hair_skin_contact_not_forehead',
  },
  {
    key: 'eyebrow.visible_hair_density_texture',
    region: 'brows',
    channel: 'brow_class_not_hair_density',
  },
  { key: 'eye.eyelid_crease_or_hooded_category', region: 'eyes', channel: 'eye_class_not_crease' },
  { key: 'mouth.visible_lip_color', region: 'lips', channel: 'lip_class_not_colour' },
  {
    key: 'ear.visible_boundary_height_shape',
    region: 'ears',
    channel: 'ear_class_not_boundary_shape',
  },
]);
const STATES = Object.freeze([
  'screened_region_proxy',
  'unscreened_region_proxy',
  'unspecific_region_proxy',
  'no_region_proxy',
  'profile_not_frontal_evidence',
  'parsing_unavailable',
]);
const REGION_CLASSES = Object.freeze({
  skin: [1],
  brows: [2, 3],
  eyes: [4, 5],
  lips: [12, 13],
  ears: [7, 8],
});
const plain = (x) => x !== null && typeof x === 'object' && !Array.isArray(x);
function fail() {
  throw Error('FR294_REGION_QUALITY_INVALID');
}
const count = (x, indices) => indices.reduce((n, i) => n + x[i], 0);

export function traceFr294ImageRegionQuality(gaps, captures, parsingRecords) {
  if (
    !plain(gaps) ||
    gaps.schemaVersion !== 'local-fr294-per-photo-gap-bridge@0.1.0' ||
    gaps.canonicalObservationAdmitted !== false ||
    gaps.independentAccuracyValidated !== false ||
    gaps.canonicalHardGapCount !== 11 ||
    !plain(gaps.captures) ||
    !Array.isArray(captures) ||
    !Array.isArray(parsingRecords) ||
    captures.length !== gaps.captureCount ||
    parsingRecords.length !== captures.length
  )
    fail();
  const seen = new Set(),
    parsing = new Map();
  for (const row of parsingRecords) {
    if (
      !plain(row) ||
      typeof row.captureRef !== 'string' ||
      parsing.has(row.captureRef) ||
      !plain(row.parsing) ||
      row.parsing.methodVersion !== PARSING_VERSION ||
      row.parsing.candidateOnly !== true
    )
      fail();
    parsing.set(row.captureRef, row.parsing);
  }
  const aggregate = Object.fromEntries(
    MATRIX.map(({ key }) => [key, Object.fromEntries(STATES.map((x) => [x, 0]))]),
  );
  const output = {};
  for (const photo of captures) {
    const ref = photo?.captureRef,
      role = photo?.viewRole;
    if (
      typeof ref !== 'string' ||
      !/^capture-[a-zA-Z0-9_-]+$/u.test(ref) ||
      !['frontal', 'profile'].includes(role) ||
      seen.has(ref) ||
      !parsing.has(ref) ||
      !Array.isArray(gaps.captures[ref]) ||
      gaps.captures[ref].length !== 11
    )
      fail();
    seen.add(ref);
    const summary = parsing.get(ref);
    if (!['completed', 'failed', 'unavailable'].includes(summary.status)) fail();
    if (summary.status !== 'completed') {
      if (
        ![
          'PARSING_FAILED',
          'PARSING_TIMEOUT',
          'PARSING_MODEL_UNAVAILABLE',
          'NO_SINGLE_FACE',
          'MULTIPLE_FACES',
          'ANCHOR_DISAGREEMENT',
          'FACE_FRAME_INVALID',
        ].includes(summary.reason)
      )
        fail();
    } else {
      if (
        summary.accuracyValidated !== false ||
        summary.canonicalReceiptIssued !== false ||
        !Array.isArray(summary.counts) ||
        summary.counts.length !== 19 ||
        summary.counts.some((x) => !Number.isInteger(x) || x < 0) ||
        count(
          summary.counts,
          Array.from({ length: 19 }, (_, i) => i),
        ) !==
          512 * 512 ||
        !Number.isInteger(summary.interfacePixels) ||
        summary.interfacePixels < 0 ||
        summary.interfacePixels > summary.counts[1] ||
        !plain(summary.regionScreening?.regions) ||
        !['skin', 'nose', 'lips', 'brows', 'ears'].every((k) =>
          ['screened', 'unchecked', 'suppressed'].includes(
            summary.regionScreening.regions[k]?.status,
          ),
        )
      )
        fail();
    }
    const candidates = new Map(gaps.captures[ref].map((x) => [x.featureKey, x]));
    const entries = [];
    for (const { key, region, channel } of MATRIX) {
      const gap = candidates.get(key);
      if (
        !gap ||
        gap.canonicalMaterializationAllowedNow !== false ||
        !['new_image_model', 'ear_visibility_then_image_model'].includes(gap.lane) ||
        !['unavailable', 'candidate_only', 'partial', 'not_evaluated'].includes(gap.status)
      )
        fail();
      let quality = 'parsing_unavailable';
      if (summary.status === 'completed') {
        if (role === 'profile' && region !== 'ears') quality = 'profile_not_frontal_evidence';
        else {
          const hasClass = count(summary.counts, REGION_CLASSES[region]) > 0;
          const screen = region === 'eyes' ? null : summary.regionScreening.regions[region].status;
          // A class or contact can be present without proving the specific
          // visible anatomical feature that FR294 requires.
          if (region === 'skin') {
            const indicator =
              channel === 'hair_skin_contact_not_forehead' ? summary.interfacePixels > 0 : hasClass;
            quality = indicator ? 'unspecific_region_proxy' : 'no_region_proxy';
          } else if (region === 'eyes') {
            quality = hasClass ? 'unspecific_region_proxy' : 'no_region_proxy';
          } else if (!hasClass) {
            quality = 'no_region_proxy';
          } else if (screen === 'screened') {
            quality = 'screened_region_proxy';
          } else {
            quality = 'unscreened_region_proxy';
          }
        }
      }
      if (!STATES.includes(quality)) fail();
      aggregate[key][quality]++;
      entries.push(
        Object.freeze({
          featureKey: key,
          channel,
          modelRegionScreening: quality,
          anatomicalFeatureVisibilityVerified: false,
          independentHumanReferenceValidated: false,
          colorCalibrationValidated: false,
          canonicalF0Admitted: false,
          traditionalBindingAuthorized: false,
          productInterpretationAuthorized: false,
        }),
      );
    }
    output[ref] = Object.freeze(entries);
  }
  if (
    seen.size !== gaps.captureCount ||
    Object.values(aggregate).some(
      (status) => Object.values(status).reduce((sum, n) => sum + n, 0) !== gaps.captureCount,
    )
  )
    fail();
  return Object.freeze({
    schemaVersion: FR294_REGION_QUALITY_VERSION,
    captureCount: gaps.captureCount,
    mappedFeatureCount: MATRIX.length,
    modelRegionScreeningOnly: true,
    anatomicalFeatureVisibilityVerified: false,
    colorCalibrationValidated: false,
    independentAccuracyValidated: false,
    canonicalF0Admitted: false,
    productInterpretationAuthorized: false,
    aggregate: Object.freeze(aggregate),
    captures: Object.freeze(output),
  });
}
