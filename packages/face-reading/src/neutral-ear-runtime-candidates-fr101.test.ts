import { describe, expect, it } from 'vitest';
import {
  NEUTRAL_EAR_RUNTIME_CANDIDATE_AUTHORITY_FR101,
  NEUTRAL_EAR_RUNTIME_CANDIDATES_FR101,
  NEUTRAL_EAR_RUNTIME_EMPIRICAL_PROTOCOL_FR101,
} from './neutral-ear-runtime-candidates-fr101.js';

describe('FR101 runtime external-ear candidate selection', () => {
  it('pins Florence-2 as the first empirical candidate without admitting runtime authority', () => {
    const candidate = NEUTRAL_EAR_RUNTIME_CANDIDATES_FR101.find(
      (entry) =>
        entry.candidateId ===
        'candidate.ear.florence2_base.referring_segmentation.fr101',
    );
    expect(candidate?.state).toBe('primary_empirical_candidate');
    expect(candidate?.components[0]?.artifact).toBe('microsoft/Florence-2-base');
    expect(candidate?.components[0]?.revision).toBe(
      '5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac',
    );
    expect(candidate?.components[0]?.declaredLicense).toBe('MIT');
    expect(candidate?.runtimeObservationAuthorized).toBe(false);
  });

  it('pins Grounding DINO plus SAM2 as the refinement fallback', () => {
    const candidate = NEUTRAL_EAR_RUNTIME_CANDIDATES_FR101.find(
      (entry) =>
        entry.candidateId === 'candidate.ear.grounding_dino_sam2.fr101',
    );
    expect(candidate?.state).toBe('fallback_empirical_candidate');
    expect(candidate?.components.map((component) => component.artifact)).toEqual([
      'IDEA-Research/grounding-dino-base',
      'facebook/sam2.1-hiera-small',
    ]);
    expect(candidate?.components.every((component) => component.declaredLicense === 'Apache-2.0')).toBe(true);
    expect(candidate?.runtimeObservationAuthorized).toBe(false);
  });

  it('keeps CelebAMask-HQ out of the product dependency path', () => {
    const comparator = NEUTRAL_EAR_RUNTIME_CANDIDATES_FR101.find(
      (entry) =>
        entry.candidateId ===
        'comparator.ear.celebamask_hq.face_parsing.fr101',
    );
    expect(comparator?.state).toBe('research_comparator_only');
    expect(comparator?.components[0]?.declaredLicense).toContain(
      'non-commercial',
    );
    expect(comparator?.productionAuthorization).toBe(false);
  });

  it('requires side-separated empirical captures before authority changes', () => {
    expect(
      NEUTRAL_EAR_RUNTIME_EMPIRICAL_PROTOCOL_FR101.operatorCaptureRequestReady,
    ).toBe(true);
    expect(
      NEUTRAL_EAR_RUNTIME_EMPIRICAL_PROTOCOL_FR101.perSidePromptPolicy,
    ).toContain('invoke left and right as separate targets');
    expect(
      NEUTRAL_EAR_RUNTIME_CANDIDATE_AUTHORITY_FR101.admittedRuntimeProviders,
    ).toBe(0);
    expect(
      NEUTRAL_EAR_RUNTIME_CANDIDATE_AUTHORITY_FR101.admittedEarObservations,
    ).toBe(0);
    expect(
      NEUTRAL_EAR_RUNTIME_CANDIDATE_AUTHORITY_FR101.productionAuthorization,
    ).toBe(false);
  });
});
