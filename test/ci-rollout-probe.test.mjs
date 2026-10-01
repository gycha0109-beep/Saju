import { expect, it } from 'vitest';
import { assertStagedPolicy } from '../scripts/ci/integration-candidate.mjs';
it('keeps staged admission closed without strict Actions evidence', () => {
  expect(() => assertStagedPolicy([])).toThrow('Staged CI requires');
});
