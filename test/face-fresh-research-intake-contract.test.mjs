import { describe, expect, it } from 'vitest';
import {
  FRESH_RESEARCH_INTAKE_VERSION,
  validateFreshResearchIntake,
} from '../tools/face-reading/two-view/fresh-research-intake-contract.mjs';

const marker = () => ({
  schemaVersion: FRESH_RESEARCH_INTAKE_VERSION,
  researchOnly: true,
  poseIndependentlyVerified: false,
  current2dExtractorsExecuted: false,
  viewRoleRouting: 'provisional_frontal_for_research_only',
  photoCount: 2,
});
const photos = () => [
  { recordId: 'capture-9000', sourcePath: 'private-source-1.jpg', viewRole: 'frontal' },
  { recordId: 'capture-9001', sourcePath: 'private-source-2.jpg', viewRole: 'frontal' },
];

describe('fresh /two-view research-only intake contract', () => {
  it('accepts provisional routing without upgrading pose or accuracy evidence', () => {
    expect(validateFreshResearchIntake(marker(), [], photos())).toBe(true);
  });
  it('rejects unverified feature claims, production-like and incomplete marker shapes', () => {
    for (const invalid of [
      { researchOnly: false },
      { poseIndependentlyVerified: true },
      { current2dExtractorsExecuted: true },
      { viewRoleRouting: 'frontal_pose_verified' },
      { photoCount: 3 },
      { schemaVersion: 'unrecognized' },
      { madeUpAuthority: true },
    ]) {
      expect(() => validateFreshResearchIntake({ ...marker(), ...invalid }, [], photos())).toThrow(
        'FRESH_RESEARCH_INTAKE_INVALID',
      );
    }
  });
  it('cannot replace the historical render inventory or silently mix profile samples', () => {
    expect(() => validateFreshResearchIntake(marker(), photos(), photos())).toThrow();
    expect(() => validateFreshResearchIntake(marker(), [], [])).toThrow();
    expect(() =>
      validateFreshResearchIntake(
        marker(),
        [],
        [{ ...photos()[0], viewRole: 'profile' }, photos()[1]],
      ),
    ).toThrow();
  });
});
