import { describe, expect, it } from 'vitest';
import { resolveTestPlan } from '../scripts/ci/pr-test-plan.mjs';

describe('conservative staged PR coverage', () => {
  it('keeps full regression until explicitly activated', () => {
    expect(resolveTestPlan(['src/research/leaf.ts']).full).toBe(true);
  });
  it('selects imported consumers for leaf research code only in staged PRs', () => {
    expect(resolveTestPlan(['src/research/leaf.ts'], { staged: true }).full).toBe(false);
    expect(resolveTestPlan(['test/leaf.test.ts'], { staged: true }).full).toBe(false);
  });
  it.each(['package-lock.json', '.github/workflows/ci.yml', 'scripts/ci/pr-test-plan.mjs',
    'src/index.ts', 'src/production/runtime.ts', 'src/product-host.ts', 'src/types.ts',
    'packages/face-reading/src/index.ts', 'docs/research/authority.md', 'research/evidence.json',
    'unknown/new-file.json'])('keeps the full gate for %s', path => {
    expect(resolveTestPlan([path], { staged: true }).full).toBe(true);
  });
  it('keeps main and integration candidates full even with the variable enabled', () => {
    expect(resolveTestPlan(['test/leaf.test.ts'], {
      staged: true, event: 'pull_request', candidateHead: 'a'.repeat(40),
    }).full).toBe(true);
    for (const event of ['push', 'workflow_dispatch', 'workflow_call']) {
      expect(resolveTestPlan(['src/research/leaf.ts'], { staged: true, event }).full).toBe(true);
    }
    expect(resolveTestPlan([], { staged: true }).full).toBe(true);
  });
});
