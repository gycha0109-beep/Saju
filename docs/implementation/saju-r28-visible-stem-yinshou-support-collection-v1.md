# SAJU-R28 visible-stem 印綬 support collection v1

Issue: #2319

Watchtower-Track: saju

## Current baseline and required gap

Audited main: `b66fd67e02b4f2b20f7ddc13981572471acaf522` (R27).
Its main CI `37586779997` and Production Container `37586779998` succeeded.
R27 PR #2316 passed all four required gates before squash merge.
Open R201 #2318 concerns isolated temporal 六合 qualifiers; it does not supply
natal hidden support admission. The #2307 detailed Official Reading renderer
quality work is merged and does not supply missing support/strength methodology.

R25 closes bounded visible 比劫 cardinality, R26 audits branch/hidden scope, and
R27 binds hidden Ten-God occurrences. None admits raw hidden labels as support.
The existing visible 比肩 authority explicitly forbids `hidden_stem_to_support_constituent`;
the 通根 support bridge consumes only its governed bounded root evaluation and
does not permit raw hidden consumption. The root-completeness review still
records unresolved yin 長生/祿, Earth coverage and negative-absence settlement.
Consequently, R27 mapping cannot be appended to R23/R25 as hidden support or a
whole-chart count. Mapping alone is insufficient evidence for that decision.

The next already-supported, required coverage gap is 印綬: R9 accepts exactly
one caller-supplied visible fact and explicitly does not select a domain. Without
a governed domain, a later support composition either omits visible 印綬 or
performs an unauthorized scan. R28 closes **fixed visible coverage only** in one
decision, combining selection authority, collection, evidence and T2 materialization.
No separate selector/count/readiness R stage is introduced.

## Source meaning and new collection policy

Existing authorities retain responsibility for meaning:

- `general-natal-canonical-yin-yinshou-category-member-authority.ts` binds resolved
  정인/편인 to 正印/偏印 and the 印綬 source category.
- `general-natal-yinshou-dang-zhong-support-constituent-authority.ts` binds that
  governed positive member to bounded 印綬 support-constituent evidence.
- R9 supplies exact single-fact provenance and evidence reproduction.

The selected source transcriptions were reread on 2026-10-07:
[論十幹得時不旺失時不弱](https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm)
and [論印綬](https://www.ncc.com.tw/fate/paleo/bg/bg_034.htm).
The former names 比劫/印綬/通根 in support discussion while distinguishing root
from visible peers. The latter discusses 正/偏 variants of 印 together. This
supports the existing bounded category/constituent authorities; it does not
provide a cardinality threshold, strength score or universal hidden support rule.

R28's explicit engineering/methodology policy is to select **all year/month/hour
visible stem facts** in that fixed order, supply each separately to unchanged
R9, validate each R9 envelope, and preserve its complete governed payload under
the original slot. The day stem must be the canonical `일간` marker and is
excluded. The policy is newly authorized here, not inferred from R9's binder or
from source mention of 印綬. Upstream single-fact restrictions remain intact.
Slot identity conveys provenance, not positional influence or weight.

## Execution and fail-closed contract

`collectVisibleStemYinshouSupport(snapshot)` returns either unavailable or a
snapshot-ID/hash-bound projection with exactly `year`, `month`, `hour` observations.
The authority hash binds the existing membership, support, structural binder
and R9 evidence definition. It does not recompute Ten-Gods.

Each selected fact must be present, resolved, semantically valid and independently
replayable through R9. Missing/ambiguous/unavailable outer chart or selected fact,
invalid day self, missing snapshot binding, unmaterialized scenarios, upstream
semantic parity failure or substituted source makes the **entire** collection
unavailable. Earlier positives are not retained as a partial collection.

Resolved non-印 inputs remain bounded non-positive observations. A resolved
three-slot collection without positives is different from unavailable evidence.
Neither proves chart-wide 印綬 absence or 助寡.

The R28 evidence validator reproduces the entire projection, including all R9
payloads and constraints. Rehashing forged source/member/slot, omitted slots,
extra count or promoted authority does not bypass replay. The existing research
runtime rejects invalid evidence before executing claims.

The isolated registered research pack emits one positive T2 marker for each
governed 印綬 slot. Repeated members at different slots retain distinct values;
there is no count field or summary score. The six declarative rules are the
three slots times two existing canonical members, not six new semantic decisions.
All-non-positive or absent evidence emits no marker; missing claim is not negative.

## Boundaries and architecture check

No branch representative or hidden member is read. No R23/R25 recalculation or
extension, 印 count, whole-chart complete collection, weight, 比劫+印綬 or
通根 composition, 黨眾/助寡, 強弱/旺衰, 格局 or Production authority is added.
Claims are non-material for Narrative; Production pack promotion is rejected.

- Docs updated: yes, this decision and current blockers.
- Ghost-code risk: passed for the intended isolated research path; direct engine
  tests consume the registered pack and validate claim/evidence provenance.
  Actual product activation is deliberately still blocked, not claimed complete.
- No canonical schema, public API/export, Product DB, default registry, provider,
  auth or deployment change. No parallel semantic truth source or normalization.
- Existing product path remains `ReadingIntent → Profile → Claims → Evidence → Narrative`.
  R28 is not wired into that production path; B and the product smoke part of C
  remain unsatisfied. A still lacks governed complete root/support composition
  and the dependent classifiers. `SAJU_REFRESH_IMPLEMENTATION_COMPLETE` is not asserted.

## Validation

Runtime: Node 24.14.0, pinned Vitest 4.1.10 / manseryeok 2.0.0.

- Direct R28 fixture matrix covers real canonical replay, both labels in all
  slots, mixed/repeated members, every non-印 label, day self exclusion,
  branch/hidden non-dereference, unresolved/invalid inputs, upstream semantic
  and source parity failures including last-slot failure, rehashed forgeries,
  deterministic evidence/registry/engine reproduction and Production rejection.
- Regression scope is R9, R25 and R27, the directly consumed single-fact surface
  and adjacent boundaries. Full suite is delegated to required hosted CI and
  Integration; no hosted result is inferred from local tests.
- Local result: 4 files / 81 tests passed (R28 27 tests); typecheck, build and
  changed-file ESLint/Prettier passed. Hosted gates remain pending at submission.
- Commands: `npx vitest run test/shared-natal-visible-stem-yinshou-support-collection-vertical-slice.test.ts test/shared-natal-single-fact-yinshou-support-vertical-slice.test.ts test/shared-natal-visible-stem-bijie-support-member-count-vertical-slice.test.ts test/snapshot-bound-hidden-stem-ten-god-occurrences.test.ts`,
  `npm run typecheck`, `npm run build`, changed-file ESLint/Prettier and staged
  whitespace check. Final local results are recorded in the PR.
- Initial test draft used one ambiguous candidate and expected invalid evidence
  to return empty claims. Existing contracts require two candidates and throw
  `ResearchEvidenceExecutionError` before claim execution. Fixtures/assertions
  were corrected to those contracts; no engine behavior was changed.

After merge, re-audit the remaining root/hidden admission and support composition
methodology against current code and authority. Do not automatically make hidden
counts or 印 counts. No available primitive is itself a reason to add another R stage.
