# SAJU-R26 separate 比劫 branch/hidden scope audit v1

Issue: #2304

Watchtower-Track: saju

## Current baseline and purpose

Audited 2026-10-07 against fetched `main` `4b25a5d`.
R25 #2299 is squash merged at `0d91e6e03b44a112a5a49bce6c86cf008580ad54`.
Its submitted head passed the four required gates, including Integration
[37574770573](https://github.com/gycha0109-beep/Saju/actions/runs/37574770573).
Its merge SHA then passed main
[CI](https://github.com/gycha0109-beep/Saju/actions/runs/37576148269) and
[Production Container](https://github.com/gycha0109-beep/Saju/actions/runs/37576148404).

R25 closed fixed visible year/month/hour support-member cardinality, not complete
比劫 support coverage. The user requires a separate scope audit before admitting
branch/hidden participants. R26 is that one scope decision, following the
repository's R14/R24 audit-artifact pattern; it executes no new chart classifier.

This decision is required to prevent incomplete support collection and duplicated
branch/hidden representations from entering the eventual product structural
synthesis. It is not an optional additional traditional theory or a new count.

## Findings from current code

| Surface                                    | Actual representation                         | Coverage / authority limit                                                                              |
| ------------------------------------------ | --------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| R23 / R25                                  | Three governed visible stem slots             | Membership/support and bounded count remain visible-only                                                |
| `TenGodChartFact.*.branch`                 | One optional Ten-God fact per branch          | Pinned upstream `getBranchTenGod` maps one `BRANCH_MAIN_STEM`; not an enumeration of all hidden members |
| `DerivedFacts.hiddenStems`                 | Per-slot `FactState<readonly HeavenlyStem[]>` | Existing canonical membership only; no per-occurrence Ten-God projection in this contract               |
| `getTenGod(dayMaster, targetStem)`         | Existing pinned deterministic calculation     | Available for structural mapping; does not grant support / usable-role semantics                        |
| R12 / R9 single-fact binding               | Explicit year/month/hour `.stem` source refs  | Cannot bind branch or hidden facts; do not silently widen it                                            |
| R123                                       | Qualitative hidden evidence comparison        | Explicitly rejects storage-order semantic rank and universal hidden-role selection                      |
| R060                                       | Distinct hidden interaction mechanisms        | No generic activation / hidden exposure resolver                                                        |
| Existing bounded Tonggen support authority | Consumes governed bounded Tonggen results     | Explicitly excludes raw hidden-stem consumption; hidden membership cannot substitute for Tonggen        |

The audited files are `src/contracts/calculation.ts`,
`src/calculation/hidden-stems.ts`, `src/calculation/manseryeok-adapter.ts`, the pinned
`manseryeok` Ten-God implementation/types, R23/R25, the supplied-single-fact binding,
R060/R123 and the Tonggen support authority. Scope expanded to these direct
dependencies because the branch representation, hidden membership and usable
support are different contracts. No new classical source interpretation is made.

Concrete discriminating cases from the pinned calculation substrate:

- For 甲 with 辰: the branch fact is `편재`; the canonical hidden members
  `[을, 무, 계]` map to `[겁재, 편재, 정인]`. The branch fact therefore cannot
  prove absence of a hidden 比劫 member.
- For 甲 with 亥: canonical storage starts with `갑` (`비견`), while the branch
  fact is `편인`. Index zero is not the branch representative or a strength rank.

These examples establish representation differences only. Neither proves that
a hidden member is activated, usable support, a root, or a strength contribution.

## Scope decision

Keep R23/R25 unchanged. Any future hidden occurrence collection must have its own
explicit scope, covering year/month/**day**/hour branch membership. Excluding the
visible day self does not exclude the day branch.

Each occurrence is identified by `(pillar slot, hidden stem value)`. Preserve the
same stem in different slots; reject duplicate membership within one slot.
Canonical array index may locate stored data but carries no semantic priority.
Do not add the representative branch Ten-God as another member alongside its
hidden stems: that is a second representation, not an additional occurrence.

This proposed occurrence universe is not a complete **support** collection.
Hidden membership, manifestation, usable support and governed Tonggen remain
distinct. No hidden count, member weight or role-selection rule is admitted.

## Smallest next prerequisite

`SNAPSHOT_BOUND_HIDDEN_STEM_TEN_GOD_OCCURRENCES`

Ready for an explicit structural mapping contract using existing canonical
membership and the pinned `getTenGod` calculation. Implementation must include
snapshot-bound evidence and deterministic replay in the same step:

- Bind snapshot ID/hash and canonical day master; verify day-master/day-pillar parity.
- Verify each slot's hidden membership against its resolved source pillar and
  the existing canonical table; reject mismatches, duplicates and missing data.
- Preserve slot/stem identity and every canonical member without ranking it.
- Fail closed for unresolved/ambiguous inputs and unmaterialized scenarios.
- Reuse the existing calculation mapper, not a new Ten-God algorithm or a branch
  representative. Do not recalculate or widen R23 visible membership.

Missing hidden data means unavailable, not empty/negative. Projection can make
hidden Ten-God relations available; it cannot reuse R23's visible support authority
for hidden occurrences. Any subsequent hidden support/complete-collection decision
must state its own methodology and scope. No cardinality shortcut to 黨眾/助寡 or
強弱/旺衰 is allowed. R26 itself authorizes neither the projection implementation
nor interpretation claims; the next step must materialize its explicit contract.

## Product and completion audit

Current main includes #2297's enabled detailed Official Reading presentation.
That activation retains existing approved semantic units; it does not consume
R25/R26 or create shared support/strength authority. The current product facade
still calls `requestProductReading -> executeProductReading -> delivery -> response`;
the semantic path remains `ReadingIntent -> Profile -> Claims -> Evidence -> Narrative`
with the existing Official Reading authority boundary.

Open #2303 / R200 is temporal annual/Dayun root-support **qualifier-only** context
under `saju-research`. It is not this natal hidden occurrence/support collection;
R26 does not modify or duplicate its producer.

A/B/C completion is not met: this Refresh chain still lacks admitted complete
support/structural synthesis and product consumption of those results. The future
projection is necessary input work, not Production readiness. Actual product smoke
for the completed structural chain has not been run or claimed here.

## Validation and status

- R26 audit: 8 tests, including actual branch/hidden counterexamples, slot scope,
  current binding exclusion, authority constraints and reproducible definition hash.
- Direct regression: R26 + R25 vertical slice + existing exhaustive structural
  lookups (including all 100 day-master/target-stem Ten-God relations):
  **3 files / 33 tests passed** on Node 24.14.0 / Vitest 4.1.10.
- Typecheck, build, changed-file ESLint/Prettier and staged whitespace checks pass.
- Hosted four required gates remain pending on the submitted R26 head.

```powershell
npx vitest run test/saju-r26-bijie-branch-hidden-scope-audit.test.ts test/shared-natal-visible-stem-bijie-support-member-count-vertical-slice.test.ts test/structural-lookup-exhaustive.test.ts
npm run typecheck
npm run build
npx eslint src/research/saju-r26-bijie-branch-hidden-scope-audit.ts test/saju-r26-bijie-branch-hidden-scope-audit.test.ts
```

## Architecture Check

- Docs updated: yes.
- Ghost-code risk: passed. This is an explicit research scope-audit artifact,
  consumed by its direct contract tests and next-prerequisite record; it is
  intentionally not a product runtime implementation or a new semantic source.
- One scope decision; no new classifier, normalization, fallback, Product DB copy,
  public API/schema/export, production route or LLM semantic authority. Source
  hashes bind existing authority boundaries instead of replacing them.
