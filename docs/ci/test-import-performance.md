# Full-regression test import cost

## Scope

Ordinary function tests should import the module that defines the function rather
than the complete `src/index.ts` export graph. In an isolated Vitest file, a root
import evaluates unrelated research and product modules again. This cost grows as
the public entrypoint gains exports, even when a test's assertions stay small.

This change narrows runtime imports in 44 existing test files. Type-only root
imports are left alone because they do not evaluate the root module at runtime.
Test bodies, assertions, fixtures, production code, public exports, dependency
versions and Vitest's file isolation are unchanged. No tests are removed.

These existing consumer tests deliberately continue to use the public entrypoint:

- `test/developer-harness-e2e.test.ts`
- `test/product-reading-integration.test.ts`
- `test/face-topic-product-api.test.ts`

The CI research-preview script also imports its three engine symbols from their
existing compiled defining modules rather than `dist/index.js`. Its HTTP routes,
five reading requests, safety/leak assertions and output are unchanged. This is
a direct CI smoke dependency, not a production entrypoint change.

## Before/after sample (2026-10-02)

Baseline: `73816a2c3374f7230c7969ca99e250f6a6a967b1`.
Runtime: Windows, Node 24.14.0, Vitest 4.1.10, four workers, default isolation.
The same eight files and 44 assertions passed before and after the import change.

| Measurement | Before | After |
| --- | ---: | ---: |
| Command wall time | 164.46 s | 78.68 s |
| Vitest run duration | 162.38 s | 77.99 s |
| Aggregate import time across workers | 568.11 s | 80.04 s |

The command wall-time reduction is approximately 52%. This is one local paired
sample, not a guarantee for the complete Linux matrix or simultaneous PR load.
Parallel phase totals must not be subtracted directly from command wall time.

On the same existing build, `MYEONGHWA_PREVIEW_SMOKE=1 node
scripts/research-ux-preview.mjs` passed before and after, decreasing from 75.04
seconds to 0.68 seconds. All non-import script statements matched the baseline.

Reproduce from this checkout without changing Vitest isolation or test selection:

```powershell
npm exec -- vitest run --maxWorkers=4 `
  test/production-composition-calculation-diagnostics.test.ts `
  test/official-reading-artifact.test.ts `
  test/relationship-spouse-t8-engine-producer.test.ts `
  test/i14-strength-evidence-matrix.test.ts `
  test/developer-harness-e2e.test.ts `
  test/calculation-policy-sensitivity.test.ts `
  test/derived-fact-versioning.test.ts `
  test/interpretation-planner.test.ts
```

## Verification and scheduling

The change must pass lint, typecheck, all changed tests, the three retained
public-entrypoint tests and the complete Linux CI matrix. The unchanged test
bodies were compared as TypeScript statements against the baseline, excluding
only import declarations and normalizing checkout line endings.

Local validation: lint and typecheck passed. All 44 changed files plus the three
retained public-entrypoint files passed: 47 files, 332 assertions, 96.96 seconds
reported by Vitest. The paired benchmark had exactly the same 44 assertion names
before and after. Complete Linux CI results belong to the PR's exact-head checks.

Full regression still includes all sixteen shards. Integration parallelism and
required checks remain unchanged. The first Linux matrix on PR #1971
(`36976418920`, head `55499eaee1979b41ab61a1255b802fb460fd1deb`) showed a different
cost distribution after narrowing imports. Its shard durations inform the revised
longest-first scheduling priority. The shard numbers, membership, assertions and
parallelism caps are unchanged. GitHub scheduling is not a guaranteed strict
priority queue, so measured end-to-end results remain necessary.

That preliminary run passed all sixteen shards and `CI Verify`, with an observed
workflow duration of 8 minutes 45 seconds. It still used the old smoke imports and
old shard order, and ordinary PR parallelism of eight. It must not be compared as
an equal-capacity measurement with the earlier four-slot integration's 20 minutes
2 seconds. Updated smoke imports and scheduling require a new exact-head run.

The existing integration document contains historical rollout status. Check the
live `CI_STAGED_VERIFICATION` variable and required-check policy before operating
that mode; this performance change does not alter either setting.

## Architecture Check

Docs updated: yes. Ghost-code risk: passed. Existing defining modules remain the
source of truth; no alternate runtime implementation, export surface, work track,
normalization path, test mode or dependency is introduced. Public-entrypoint
consumer coverage remains separate from ordinary function tests.
