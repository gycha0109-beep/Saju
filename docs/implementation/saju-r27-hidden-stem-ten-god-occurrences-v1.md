# SAJU-R27 snapshot-bound hidden-stem Ten-God occurrences v1

Issue: #2315

Watchtower-Track: saju

## Baseline and required gap

R26 #2305 separately audited branch/hidden scope and is squash merged at
`0c07d7bd5c43a7beb2177898894a2aea32f5a405`. Its submitted head passed all four
required gates. Its merge-SHA Container passed, while its main CI was cancelled
after a subsequent main push; that cancelled execution is not recorded as PASS.
The descendant `d42e1cf52e1456bf5b72d0be9a40aaa9fb95b90e`, which includes R26,
passed [main CI](https://github.com/gycha0109-beep/Saju/actions/runs/37582537428)
and [Container](https://github.com/gycha0109-beep/Saju/actions/runs/37582537373).

R27 starts from fetched main `87c517d6174dcf3d0581c63d3ecab3c17fbc4e36`.
The later change is confined to FR311X face research. Current calculation
contracts expose canonical hidden membership and representative branch Ten-Gods,
but no snapshot-bound Ten-God relation for each hidden occurrence. R26 identifies
this missing contract before any hidden support decision can be made.

R27 closes that structural mapping gap in one step. Without it a downstream
collection would have to guess hidden relations or silently reuse the incomplete
representative branch field. Neither is permissible for the eventual product
structural chain. Mapping availability does not settle support methodology.

## Contract and source bindings

`SNAPSHOT_BOUND_HIDDEN_STEM_TEN_GOD_OCCURRENCES` derives a research projection from
the existing `CanonicalSajuSnapshot`; it does not add a canonical schema field or
an alternative natal analysis source.

| Input                                   | Check                                                                           | Output / limit                                                |
| --------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| Snapshot ID and calculation hash        | Both present; evidence binds both exactly                                       | Reproduced identity, not a new calculation hash               |
| `derivedFacts.dayMaster` and day pillar | Both resolved; full stem-fact parity and valid stem value                       | Existing pinned mapper receives the canonical day-master stem |
| Four source pillars                     | Each resolved with a recognized branch                                          | Original pillar-slot provenance                               |
| Four `derivedFacts.hiddenStems` states  | Each resolved, no duplicates, exact existing canonical membership/storage order | Every occurrence retained by `(slot, stem)`                   |
| Existing `manseryeok@2.0.0#getTenGod`   | Reused directly                                                                 | Deterministic relation only; no new Ten-God algorithm         |
| Scenarios                               | Nonempty/unmaterialized scenario set rejected                                   | No cross-scenario merging or guessed universal projection     |

Authority binds R26's definition hash, the existing hidden-membership
version/content hash/source, and the pinned calculation mapper identity.
The existing exhaustive structural lookup test checks all 100 stem relations
against independent element/polarity expectations.

All four branch slots, including day branch, participate. Visible day self is
absent. The same stem in different slots remains distinct. Representative branch
Ten-Gods are neither substituted nor added; R23/R25 are not called or widened.
Storage order is checked for canonical parity and deterministic replay only; no
index/rank/weight is emitted. Different storage order fails closed rather than
adding a normalization path.

Any missing, unavailable, ambiguous or inconsistent required input returns
`unavailable` with a reason and **no projection**, not a partial/empty collection
or a negative support fact. Source mismatch is detected before the mapper runs.

## Evidence and semantic boundary

The research evidence adapter uses the existing envelope definition, runtime
adapter contract and snapshot ID/hash validation. Its validator regenerates the
complete projection from the bound snapshot and compares the complete payload
hash. Rehashing a forged relation, slot identity, source ref, omitted member,
extra count or widened authority cannot make it valid.

The mapping contract authorizes only structural projection. Its boundary fields
explicitly deny hidden support, Tonggen, complete support collection, count or
weight, strength classification, interpretation-claim emission, Narrative and
Production authority. This step intentionally adds no interpretation rule,
T2 support claim, interpretation pack or default registry activation. A mapping
relation alone cannot admit such a claim.

Research evidence remains distinct from Engine semantic authority. A subsequent
hidden support decision must audit its own methodology; R23's visible support
authority cannot be reused for hidden members. Projection is not a complete 比劫
support collection and cannot settle 黨眾/助寡, 強弱/旺衰 or 格局.

## Product reach and overlap

The existing `ReadingIntent -> Profile -> Claims -> Evidence -> Narrative` path
is unchanged. This prerequisite is research-only and is not exposed as a product
semantic result, copied to Product DB, or delegated to an LLM. Product consumption
and full-chain smoke remain incomplete; R27 is not a Production-ready declaration.

Merged R200 #2303 / [ADR-0018](../decisions/ADR-0018-temporal-root-support-qualifier-v1.md)
admits temporal annual/Dayun root observations as qualifier-only context. It does
not grant hidden natal support or settlement authority and is not modified here.
Open #2307 detailed Official Reading quality work is also separate.

Scope was limited to R26/R25, the direct canonical contracts/calculation substrate,
existing evidence contracts, their tests and R200's overlapping authority boundary.
No new classical source interpretation or external acquisition was required.

## Validation and completion

- R27: 21 tests, including actual canonical calculation, explicit 甲–辰/亥
  relations, repeated stems across slots, day-branch inclusion, no representative
  duplication, missing/ambiguous input and per-slot membership/source parity.
- Adversarial replay checks reject rehashed forged payloads and Production
  promotion; deterministic envelope and authority hashes reproduce exactly.
- R27 + R26 + R25 + exhaustive structural lookup: **4 files / 54 tests passed**.
- Typecheck/build and final static checks are recorded on the submitted PR.
- Hosted CI Verify, Production Container Verify, PIE and Integration remain
  required on the submitted head; they are not inferred from local validation.

```powershell
npx vitest run test/snapshot-bound-hidden-stem-ten-god-occurrences.test.ts test/saju-r26-bijie-branch-hidden-scope-audit.test.ts test/shared-natal-visible-stem-bijie-support-member-count-vertical-slice.test.ts test/structural-lookup-exhaustive.test.ts
npm run typecheck
npm run build
npx eslint src/research/snapshot-bound-hidden-stem-ten-god-occurrences.ts src/research/shared-natal-hidden-stem-ten-god-occurrence-research-evidence-adapter.ts test/snapshot-bound-hidden-stem-ten-god-occurrences.test.ts
```

A/B/C are not complete. The next audit must determine the smallest product-required
gap in hidden support admission/complete collection and its actual methodology;
it must not invent a count, score or downstream classifier from this projection.

## Architecture Check

- Docs updated: yes.
- Ghost-code risk: passed. The explicit research projection/evidence contract is
  consumed by direct fixture/replay tests and records the R26 prerequisite; no
  product activation or semantic consumer is claimed.
- No canonical schema/public API/export, DB, normalization, fallback, production
  route or LLM authority change. Existing calculation and envelope contracts are
  reused; this is one structural mapping decision, not a parallel truth source.
