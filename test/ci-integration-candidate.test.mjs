import { describe, expect, it } from 'vitest';
import { assertSubmissionEvent, assertPrerequisites, assertStagedPolicy, validateCandidate } from '../scripts/ci/integration-candidate.mjs';

const candidate = { pr: '42', head: 'a'.repeat(40), base: 'b'.repeat(40) };
const current = () => ({
  state: 'open', draft: false,
  mergeable: true, mergeable_state: 'clean',
  head: { sha: candidate.head, repo: { full_name: 'owner/repo' } },
  base: { ref: 'main', repo: { full_name: 'owner/repo' } },
  defaultBranch: 'main', defaultSha: candidate.base,
});
const check = (id = 1, name = 'CI Verify', conclusion = 'success', app = 15368) => ({
  id, name, conclusion, status: 'completed', app: { id: app },
});

describe('pinned integration admission and required evidence', () => {
  it('accepts the exact open PR against the current default branch', () => {
    expect(() => validateCandidate(candidate, current())).not.toThrow();
  });
  it.each(['../42', '42;echo', '', '0'])('rejects invalid PR input %s', pr => {
    expect(() => validateCandidate({ ...candidate, pr }, current())).toThrow('Invalid pinned');
  });
  it('rejects stale PR heads', () => {
    const changed = current(); changed.head.sha = 'c'.repeat(40);
    expect(() => validateCandidate(candidate, changed)).toThrow('PR head changed');
  });
  it('allows advancing main when GitHub still reports the PR mergeable', () => {
    const changed = current();
    changed.defaultSha = 'c'.repeat(40);
    changed.mergeable_state = 'behind';
    expect(() => validateCandidate(candidate, changed)).not.toThrow();
  });
  it('rejects an actual merge conflict instead of treating behind as a conflict', () => {
    const behind = current();
    behind.defaultSha = 'c'.repeat(40);
    behind.mergeable_state = 'behind';
    expect(() => validateCandidate(candidate, behind)).not.toThrow();

    const conflict = current();
    conflict.defaultSha = 'c'.repeat(40);
    conflict.mergeable = false;
    conflict.mergeable_state = 'dirty';
    expect(() => validateCandidate(candidate, conflict)).toThrow('actual merge conflict');
  });
  it('fails closed while GitHub mergeability is unresolved', () => {
    const unresolved = current();
    unresolved.defaultSha = 'c'.repeat(40);
    unresolved.mergeable = null;
    unresolved.mergeable_state = 'unknown';
    expect(() => validateCandidate(candidate, unresolved)).toThrow('mergeability is unresolved');
  });
  it('rejects forks, closed PRs, drafts, and another base', () => {
    const fork = current(); fork.head.repo.full_name = 'other/repo';
    expect(() => validateCandidate(candidate, fork)).toThrow('Cross-repository');
    expect(() => validateCandidate(candidate, { ...current(), state: 'closed' })).toThrow('open');
    expect(() => validateCandidate(candidate, { ...current(), draft: true })).toThrow('ready');
    const other = current(); other.base.ref = 'release';
    expect(() => validateCandidate(candidate, other)).toThrow('default branch');
  });
  it('requires an Actions-bound integration requirement under either strict or non-strict policy', () => {
    expect(() => assertStagedPolicy([])).toThrow('Staged CI requires');
    const rules = (app, strict = true) => [{ type: 'required_status_checks', parameters: {
      strict_required_status_checks_policy: strict,
      required_status_checks: [{ context: 'CI Integration Verify', integration_id: app }],
    } }];
    expect(() => assertStagedPolicy(rules(7))).toThrow();
    expect(() => assertStagedPolicy(rules(15368, true))).not.toThrow();
    expect(() => assertStagedPolicy(rules(15368, false))).not.toThrow();
  });
  it('requires every selected check and ignores only the integration check being requested', () => {
    const required = [{ context: 'CI Verify', integration_id: 15368 }, { context: 'CI Integration Verify', integration_id: 15368 }];
    expect(() => assertPrerequisites(required, [check()], [])).not.toThrow();
    expect(() => assertPrerequisites(required, [], [])).toThrow('missing');
  });
  it.each(['failure', 'cancelled', 'skipped'])('rejects %s required evidence', conclusion => {
    expect(() => assertPrerequisites([{ context: 'CI Verify', integration_id: 15368 }], [check(1, 'CI Verify', conclusion)], [])).toThrow('not successful');
  });
  it('rejects queued checks and newer failures even when an old attempt passed', () => {
    const required = [{ context: 'CI Verify', integration_id: 15368 }];
    expect(() => assertPrerequisites(required, [{ ...check(), status: 'queued' }], [])).toThrow();
    expect(() => assertPrerequisites(required, [check(1), check(2, 'CI Verify', 'failure')], [])).toThrow();
  });
  it('rejects evidence from another app and spoofed same-name commit statuses', () => {
    expect(() => assertPrerequisites([{ context: 'CI Verify', integration_id: 15368 }],
      [check(1, 'CI Verify', 'success', 7)], [{ context: 'CI Verify', state: 'success' }])).toThrow('missing');
  });
});

describe('eligible PR submission evidence', () => {
  const event = () => ({ action: 'labeled', label: { name: 'ci-integration-ready' }, number: 42,
    pull_request: { head: { sha: candidate.head }, base: { sha: candidate.base } } });
  it('accepts the dedicated label with the pinned PR event', () => {
    expect(() => assertSubmissionEvent(event(), candidate)).not.toThrow();
  });
  it.each(['synchronize', 'opened', 'unlabeled'])('rejects unrelated action %s', action => {
    expect(() => assertSubmissionEvent({ ...event(), action }, candidate)).toThrow('dedicated');
  });
  it('rejects an unrelated label instead of a skipped required gate', () => {
    expect(() => assertSubmissionEvent({ ...event(), label: { name: 'ops' } }, candidate)).toThrow('dedicated');
  });
  it('does not borrow a different PR or newer head/base', () => {
    expect(() => assertSubmissionEvent({ ...event(), number: 43 }, candidate)).toThrow('immutable');
    expect(() => assertSubmissionEvent(event(), { ...candidate, head: 'c'.repeat(40) })).toThrow('immutable');
    expect(() => assertSubmissionEvent(event(), { ...candidate, base: 'c'.repeat(40) })).toThrow('immutable');
  });
});
