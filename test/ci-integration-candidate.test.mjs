import { describe, expect, it } from 'vitest';
import { validateCandidate } from '../scripts/ci/integration-candidate.mjs';

const head = '1111111111111111111111111111111111111111';
const submittedBase = '2222222222222222222222222222222222222222';
const currentBase = '3333333333333333333333333333333333333333';

function candidate() {
  return {
    pr: '1954',
    head,
    base: submittedBase,
  };
}

function current(overrides = {}) {
  return {
    state: 'open',
    draft: false,
    mergeable: true,
    mergeable_state: 'behind',
    defaultBranch: 'main',
    defaultSha: currentBase,
    head: {
      sha: head,
      repo: { full_name: 'gycha0109-beep/Saju' },
    },
    base: {
      ref: 'main',
      repo: { full_name: 'gycha0109-beep/Saju' },
    },
    ...overrides,
  };
}

describe('CI integration candidate base drift guard', () => {
  it('allows a default-branch SHA drift when GitHub reports the PR mergeable', () => {
    expect(() => validateCandidate(candidate(), current())).not.toThrow();
  });

  it('does not treat mergeable_state=behind as a conflict', () => {
    expect(() => validateCandidate(candidate(), current({
      mergeable: true,
      mergeable_state: 'behind',
    }))).not.toThrow();
  });

  it('rejects an actual merge conflict', () => {
    expect(() => validateCandidate(candidate(), current({
      mergeable: false,
      mergeable_state: 'dirty',
    }))).toThrow('actual merge conflict');
  });

  it('fails closed while GitHub mergeability is unresolved', () => {
    expect(() => validateCandidate(candidate(), current({
      mergeable: null,
      mergeable_state: 'unknown',
    }))).toThrow('mergeability is unresolved');
  });

  it('still rejects a moved PR head', () => {
    expect(() => validateCandidate(candidate(), current({
      head: {
        sha: '4444444444444444444444444444444444444444',
        repo: { full_name: 'gycha0109-beep/Saju' },
      },
    }))).toThrow('PR head changed');
  });
});
