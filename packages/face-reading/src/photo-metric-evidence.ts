import {
  materializeRealLocalHairlineMetricReferenceFR318,
  type FR318MaterializationInput,
} from './hairline-real-local-metric-receipt-fr318.js';
import {
  assembleExactCaptureSevenReferenceCommonFrameBundleFR319,
  type FR319BundleInput,
} from './seven-reference-common-frame-bundle-fr319.js';
import { FaceAuthorityValidationError } from './validation.js';

/** Exact JSON format already consumed by run-fr318-fr319-local-evidence.mjs. */
export interface PhotoMetricEvidenceInput {
  readonly schemaVersion: 'fr318-fr319-local-private-execution-input-v1';
  readonly fr318: FR318MaterializationInput;
  readonly fr319:
    | (Omit<FR319BundleInput, 'schemaVersion' | 'hairline'> & {
        readonly schemaVersion: 'fr318-fr319-local-fr319-stage-input-v1';
      })
    | null;
}

function fail(): never {
  throw new FaceAuthorityValidationError(
    'Photo metric evidence is not bound to the selected image.',
  );
}

/** Re-executes existing materializers rather than trusting a supplied success receipt. */
export function consumePhotoMetricEvidence(
  input: PhotoMetricEvidenceInput,
  actualImageDigest: string,
) {
  if (
    input.schemaVersion !== 'fr318-fr319-local-private-execution-input-v1' ||
    !/^sha256:[a-f0-9]{64}$/u.test(actualImageDigest)
  )
    fail();
  const registration = input.fr318.registrationInput;
  if (
    registration.evidence.rgbCaptureDigest !== actualImageDigest ||
    registration.evidence.metricSupportSourceImageDigest !== actualImageDigest
  )
    fail();
  if (
    registration.hairlineMaterialization.status === 'available' &&
    registration.hairlineMaterialization.runtimeOnlyObservation.sourceImageDigest !==
      actualImageDigest
  )
    fail();
  const hairline = materializeRealLocalHairlineMetricReferenceFR318(input.fr318);
  if (hairline.status !== 'available')
    return {
      status: 'blocked_at_fr318',
      references: [],
      blockedReasons: [hairline.reason],
      fr318Receipt: hairline.repoSafeReceipt,
      measurementAuthorized: false,
    } as const;
  if (input.fr319 === null)
    return {
      status: 'fr318_available_fr319_missing',
      references: [],
      blockedReasons: ['fr319_common_frame_input_missing'],
      fr318Receipt: hairline.repoSafeReceipt,
      measurementAuthorized: false,
    } as const;
  if (input.fr319.schemaVersion !== 'fr318-fr319-local-fr319-stage-input-v1') fail();
  for (const binding of Object.values(input.fr319.exactCaptureProvenance.bindings))
    if (binding.sourceCaptureDigest !== actualImageDigest) fail();
  const { schemaVersion: stageVersion, ...stage } = input.fr319;
  void stageVersion;
  const bundle = assembleExactCaptureSevenReferenceCommonFrameBundleFR319({
    schemaVersion: 'fr319-seven-reference-common-frame-bundle-input-v1',
    ...stage,
    hairline,
  });
  if (bundle.status !== 'available')
    return {
      status: 'blocked_at_fr319',
      references: [],
      blockedReasons: [bundle.reason],
      fr318Receipt: hairline.repoSafeReceipt,
      fr319Receipt: bundle.repoSafeReceipt,
      measurementAuthorized: false,
    } as const;
  return {
    status: 'common_frame_references_available',
    references: bundle.runtimeOnlyBundle.references,
    fr318Receipt: hairline.repoSafeReceipt,
    fr319Receipt: bundle.repoSafeReceipt,
    // These actual upstream flags are false. No caller boolean overrides them.
    measurementAuthorized: bundle.runtimeOnlyBundle.threeDivisionsSpanExecutionReady,
    blockedReasons: [
      'fr319_cross_reference_subtraction_not_authorized',
      'mayi_0.3.0_traditional_span_operationalization_not_issued',
    ],
  } as const;
}
