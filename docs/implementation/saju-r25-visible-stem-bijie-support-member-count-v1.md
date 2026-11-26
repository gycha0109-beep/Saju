# SAJU-R25 bounded visible-stem 比劫 support-member count v1

Issue: #2294

Watchtower-Track: saju

## Current source of truth and scope

Audited on 2026-10-07 against fetched `origin/main`
`93555d4` (not the stale local CI-optimization checkout).
R24 #2283 is merged at `b80e8aeda0109eed39f17432c7f5addbd183fe65`.
No existing open R25 issue or PR was found before #2294 was created.

The [R24 readiness audit](saju-r24-visible-bijie-support-member-count-readiness-reaudit-v1.md)
and current R23 implementation agree: the smallest authorized next decision is
`VISIBLE_STEM_BIJIE_SUPPORT_MEMBER_COUNT` over fixed visible year/month/hour stems.
Branch/hidden scope, whole-chart collection and downstream settlement remain open.

R25 implements this explicit arithmetic authority. It does not change the
[R23 union authority](saju-r23-visible-stem-bijie-support-union-v1.md), whose own
count authorization remains false. R23 still governs only membership/support;
R25 is the separately authorized consumer for bounded cardinality, as required by
R24. No classical source is newly interpreted or promoted by this arithmetic.

## Implementation and authority

```text
CanonicalSajuSnapshot.derivedFacts.tenGods
 -> existing R23 support union evaluator
    -> existing R21 / R15 support + R19 category parity
 -> R25 count evaluator (accepts the governed R23 result, not Ten-God facts)
 -> snapshot-bound R25 ResearchEvidence
 -> existing ResearchEvidenceRuntimeRegistry validation / deterministic replay
 -> existing RuleRegistry / runInterpretation
 -> exactly one non-narrative research-only T2 structural count claim
```

The count evaluator accepts only a resolved R23 result with verified three-way
parity and fixed slot/source identity. It performs exactly:

```text
count = number of year/month/hour R23 slots
        where supportConstituentObserved === true
value domain = 0 | 1 | 2 | 3
```

It never inspects `canonicalTenGod` or reclassifies membership. The evidence
adapter obtains membership only through the existing R23 evaluator and binds
the R23 result hash, upstream authority hashes, R25 authority definition hash,
snapshot ID/hash and explicit scope. Validation reproduces the complete payload
from the bound snapshot; rehashing a forged envelope is insufficient.

Four mutually exclusive declarative rules implement the engine's existing
literal-output pattern. A resolved zero emits one bounded count claim, just as
one/two/three do. Missing or unresolved evidence cannot emit a zero claim.
Malformed/tampered evidence fails before rule execution with the existing
`ResearchEvidenceExecutionError`. No new engine execution path is added.

The claim schema permits only 0/1/2/3 and rejects additional properties.
`exclusiveValue=true`, `scenarioSensitive=true`, `materialForNarrative=false`.
Unmaterialized snapshot scenarios are unavailable; no scenario is silently
collapsed. Production pack selection is rejected by the existing registry.

## Boundaries

R25 creates only bounded visible-stem support-member cardinality. It creates no
individual 比肩/劫財 count, whole-chart/global count, complete 比劫 collection,
branch/hidden scan, support composition, weight/score, 黨眾/助寡, 旺衰/強弱,
numeric strength, 格局, Narrative materiality or Production authority.

Day self is excluded. Branch and hidden-stem contents or availability cannot
change the count. Their excluded scope must not be interpreted as negative
membership. Research evidence, Engine authority and Production authorization
remain separate. A count is not a strength score or a classifier threshold.

## Validation

Local environment: Windows PowerShell, Node `24.14.0`, pinned lockfile installed
with `npm ci --ignore-scripts`; no dependency/configuration changes.

Passed:

- R25 vertical slice: 23 tests, including count 0/1/2/3, mixed 比肩/劫財,
  all 27 three-slot member/non-member combinations, day self exclusion,
  branch/hidden independence (including unavailable hidden data), unresolved and
  ambiguous input, missing visible input, invalid day self, actual injected
  R23 cross-surface parity failure, missing parity/slot identity, scenarios,
  recomputed-hash count tampering, every forbidden authority promotion,
  extra fields, upstream binding tampering, deterministic evidence/registry/
  interpretation reproduction, snapshot mismatch and Production pack rejection.
- R23/R24 direct regression plus R25: 3 files / 42 tests passed.
- `npm run typecheck` and `npm run build` passed.
- ESLint on the three new modules and their vertical-slice test passed.
- Prettier on changed TypeScript files and `git diff --check` passed.

Reproduction:

```powershell
npm ci --ignore-scripts
npx vitest run test/shared-natal-visible-stem-bijie-support-member-count-vertical-slice.test.ts test/shared-natal-visible-stem-bijie-support-union-vertical-slice.test.ts test/saju-r24-visible-bijie-support-member-count-readiness-reaudit.test.ts
npm run typecheck
npm run build
npx eslint src/research/general-natal-visible-stem-bijie-support-member-count-authority.ts src/research/shared-natal-visible-stem-bijie-support-member-count-research-evidence-adapter.ts src/research/shared-natal-visible-stem-bijie-support-member-count-structural-claim.ts test/shared-natal-visible-stem-bijie-support-member-count-vertical-slice.test.ts
```

Initial local test authoring found fixture type mistakes and assertions that
expected an empty result for forged evidence; the existing engine correctly
throws `ResearchEvidenceExecutionError`. Expected: forged evidence rejected
before claims. Observed: that exception, while the initial assertion failed.
Failure stage: test assertion/typecheck. Classification: test authoring mismatch.
Fixed the fixtures/assertions without changing engine failure semantics; the
reproduction commands above then passed.

Local verification is complete. Required hosted gates on the submitted head
remain pending until recorded in the PR: `CI Verify`, `Production Container
Verify`, `pie / PIE prospective evidence`, `CI Integration Verify`.
Repository ruleset #23850426 requires all four with GitHub Actions App ID 15368;
strict up-to-date policy is false. Other tracks advancing main do not alone
justify a rebase.

## Next audit and completion state

R25 is not completion of Saju Refresh or a Production promotion. The next audit
must use the then-current code/authority and choose the smallest product-required
gap. If branch/hidden participation is necessary, perform a separate scope audit
before introducing coverage. Do not derive composition/黨眾/強弱 from this count.

Current product-track overlap: open #2293 is `saju-bridge` detailed Official
Reading activation for five approved natal domains. It does not authorize R25
for Narrative or settle the Refresh support chain. Avoid duplicating that work.
The future product path remains `ReadingIntent -> Profile -> Claims -> Evidence
-> Narrative`; no Product DB authority copy or separate natal-analysis truth is
introduced here.

After opening the PR or starting any new CI run, stop that execution. In the next
execution, inspect the current head's required checks once as a batch. When
ordinary CI is green, request integration via the existing
`scripts/ci/request-integration.mjs`, then stop. Squash merge only after ordinary
and integration gates are green and mergeable is true; no normal merge or bypass.

## Architecture Check

- Docs updated: yes.
- Ghost-code risk: passed. The new authority is consumed by its evidence adapter;
  the adapter is consumed by the registered research-only methodology/rules and
  exercised through the real interpretation engine. No orphan production path.
- One new bounded semantic decision, R25; four literal rules are implementation
  of that decision, not four R stages. No alternate source of truth, normalization,
  fallback, DB contract, public export or runtime route change. Research-only
  modules intentionally remain outside product/Production selection.
