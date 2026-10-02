import { expect, it } from 'vitest';
import { resolveTestPlan } from '../scripts/ci/pr-test-plan.mjs';
it('keeps integration full while ordinary leaf PR feedback can be selected', () => {
  expect(resolveTestPlan(['test/leaf.test.ts'], { staged: true }).full).toBe(false);
  expect(resolveTestPlan(['test/leaf.test.ts'], { staged: true, candidateHead: 'a'.repeat(40) }).full).toBe(true);
});
