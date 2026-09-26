import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_REFERENCE_TARGET_FR100,
  NEUTRAL_EAR_REFERENCE_TARGET_READINESS_FR100,
} from './neutral-ear-reference-target-fr100.js';

describe('FR100 neutral external-ear reference target', () => {
  it('pins the existing shared GNM ear reference provenance', () => {
    expect(NEUTRAL_EAR_REFERENCE_TARGET_FR100.sourceAsset.assetId).toBe(
      'google-gnm-head-v3.0-fe31d4e',
    );
    expect(NEUTRAL_EAR_REFERENCE_TARGET_FR100.sourceAsset.upstreamCommit).toBe(
      'fe31d4eb089f591a2e0c8ff0c38203b7b1fb1690',
    );
    expect(NEUTRAL_EAR_REFERENCE_TARGET_FR100.sourceAsset.gitBlobSha).toBe(
      'ae49903ad7d50ce1d64e464a0407441f2781873c',
    );
    expect(NEUTRAL_EAR_REFERENCE_TARGET_FR100.sourceAsset.license).toBe(
      'Apache-2.0',
    );
  });

  it('derives bilateral reference targets only from provider groups', () => {
    expect(
      NEUTRAL_EAR_REFERENCE_TARGET_FR100.providerRegionDefinition.aggregateGroup,
    ).toBe('ears');
    expect(
      NEUTRAL_EAR_REFERENCE_TARGET_FR100.providerRegionDefinition.sideGroups,
    ).toEqual(['left', 'right']);
    expect(
      NEUTRAL_EAR_REFERENCE_TARGET_FR100.providerRegionDefinition.leftEarDerivation,
    ).toBe('ears ∩ left');
    expect(
      NEUTRAL_EAR_REFERENCE_TARGET_FR100.providerRegionDefinition.rightEarDerivation,
    ).toBe('ears ∩ right');
  });

  it('does not pretend the provider-derived target is provider-independent', () => {
    expect(
      NEUTRAL_EAR_REFERENCE_TARGET_FR100.targetSemantics.providerDerived,
    ).toBe(true);
    expect(
      NEUTRAL_EAR_REFERENCE_TARGET_FR100.targetSemantics.providerIndependent,
    ).toBe(false);
    expect(
      NEUTRAL_EAR_REFERENCE_TARGET_READINESS_FR100.providerIndependentTargetClaimed,
    ).toBe(false);
  });

  it('keeps MediaPipe468 and runtime subject observation unsupported', () => {
    expect(
      NEUTRAL_EAR_REFERENCE_TARGET_FR100.runtimeBoundary.mediaPipe468EarSupported,
    ).toBe(false);
    expect(
      NEUTRAL_EAR_REFERENCE_TARGET_FR100.runtimeBoundary.mediaPipe468EarIndices,
    ).toHaveLength(0);
    expect(
      NEUTRAL_EAR_REFERENCE_TARGET_FR100.runtimeBoundary.subjectPhotoEarObservationAvailable,
    ).toBe(false);
    expect(
      NEUTRAL_EAR_REFERENCE_TARGET_FR100.runtimeBoundary.segmentationOrExtractionImplemented,
    ).toBe(false);
  });

  it('admits only the neutral reference target and keeps semantics/Production closed', () => {
    expect(
      NEUTRAL_EAR_REFERENCE_TARGET_FR100.neutralReferenceTargetAuthorized,
    ).toBe(true);
    expect(
      NEUTRAL_EAR_REFERENCE_TARGET_FR100.neutralRuntimeObservationAuthorized,
    ).toBe(false);
    expect(
      NEUTRAL_EAR_REFERENCE_TARGET_FR100.traditionalBindingAuthorized,
    ).toBe(false);
    expect(NEUTRAL_EAR_REFERENCE_TARGET_FR100.productionAuthorization).toBe(
      false,
    );
    expect(
      NEUTRAL_EAR_REFERENCE_TARGET_READINESS_FR100.nextGate,
    ).toBe('runtime_subject_photo_external_ear_extraction_or_segmentation_candidate');
  });
});
