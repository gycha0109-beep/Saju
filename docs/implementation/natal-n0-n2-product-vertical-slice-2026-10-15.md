# P0-NATAL N0–N2: 명식 기반 개인화 해석 수직 슬라이스

Status: **implemented on feature PR, validation pending** (2026-10-15)
Track: `saju`
Scope: **internal exploratory consumer preview only**; no new traditional interpretation admission, Production/GA, persistence, or commerce.

## User-facing goal and gap

Goal: *actual birth date/time → governed canonical chart → chart-specific observations and admitted bounded natal excerpts → one understandable individualized report*.

The existing Host/Official Preview flows can deliver General, Career, Wealth, Business and Relationship natal sections, but single-fixture `delivered` and CI success do not establish **meaningful differentiation between real people**. Research structural discoveries also do not justify extrapolated `身强身弱/格局/用神` claims.

## Architecture: reuse the real product pipeline

```text
birth date/time (solar/lunar / unknown hour handled by existing Host)
   ├── existing production-authorized calculation policy
   │       └── CanonicalSajuSnapshot (snapshotId, pillar/derived fact source paths)
   │            └── N1 buildNatalStructuralEvidence(snapshot)
   │                  ├── four pillar statuses/labels
   │                  ├── day master + five element counts
   │                  ├── resolved visible/branch Ten Gods; hidden stem observations
   │                  └── structural relations (match-only, not causal/transformational)
   │
   └── existing Preview-only HTTP requests for natal domains
             ├── General, Career, Wealth, Business, Relationship
             └── original ProductReadingResponse / authorized preview copy
                    ↓
          N2 buildNatalSynthesisPreview(evidence, responses)
             ├── fail-closed cross-check of response pillar labels
             ├── calculated statements with explicit sourcePaths
             ├── co-observations with 'effect not established' disclosure
             └── verbatim first meaningful excerpt per actually delivered domain
                    ↓
              internal HTML + JSON audit, no external publish
```

Implementation files:

- `src/preview/natal-personalization-baseline.ts`: fact-text fingerprints, per-case delivery status and suspect pair contrasts.
- `src/preview/natal-structural-evidence.ts`: **N1** explicit chart fact projection and unknown-hour preservation.
- `src/preview/natal-synthesis-preview.ts`: **N2** factual context + *existing admitted Preview* texts, with source binding, no independent fortune inference.
- `scripts/natal-personalization-audit.mjs`: 35 actual Preview HTTP requests (32 = 8 dates × 4 times, 2 unknown, 1 duplicate), JSON review set.
- `scripts/natal-personalized-preview.mjs`: 5 actual Preview HTTP domains from the same birth + independent governed same-policy chart calculation, fail-closed label identity check, escaped responsive HTML output.
- Focused `test/natal-personalization-baseline.test.ts` and `test/natal-structural-synthesis-preview.test.ts`.

## Rules

1. **Identity**: N2 rejects any mismatched resolved four-pillar label. Identical birth/policy must keep identical pillars and calculation observations; createdAt/snapshot IDs may differ per request and must not be blindly equated.
2. **Observed vs inferred**: a structural combination/clash is `structuralMatchOnly`, `transformationEstablished=false`. Five-element *counts* are not strength percentages, and Ten-God presence is not dominance, occupation or life-event prediction.
3. **Meaning**: the consumer excerpts are **exactly** the existing Preview response text; no synthesized T8/T9 claims are generated. A domain without a delivered reading is marked absent, never interpolated.
4. **Unknown hour**: hour is not invented. Existing Host can suppress an entire reading; N1 still distinguishes unavailable structural paths. A missing hour is not a valid reason to substitute a different person's chart.
5. **Authority**: all outputs are `internal_exploration` or `internal_structural_observation`, `mayPublish=false` and `maySell=false`. This is not an expansion of Official/Production authority.
6. **Safety and epistemics**: textual distinction does not prove valid traditional interpretation or empirical prediction. Do not assert guaranteed personality, medical, financial or life outcomes.

## Acceptance evidence

- CI Quality: lint + typecheck + build; sample CLI smoke should generate a JSON corpus and HTML via real Preview HTTP, with 35 cases and same input duplicate control.
- Focused Vitest: multiple real birth inputs and unknown hour; policy identity; source-path traceability; actual HTTP consumer excerpt; mismatch rejection; no authority changes.
- Full CI and exact-SHA Integration must pass before squash merge. Reconfirm current main; post-merge verify again.
- **N0–N2 limited deliverable**: concrete audited personalization path and an inspectable product report, *not* a completed traditional holistic interpretation engine. N3/N4 need deeper source-admitted rules and independently scored sample quality.

## Research track handoff, not full implementation blocker

For conclusions that require unproven interactions (final Strength/旺衰, 格局, 用神, transformations), request the exact condition, test, exception, source locators and Bridge disposition from the Research track; do not turn them into deterministic facts now. Continue N3/consumer quality within existing bounded semantics.

Next actual product milestone: make the source-bound N2 observations materially useful to users; compare 30+ genuinely different charts and assess why each domain reading differs or repeats. Until this is shown, P0-NATAL remains **INCOMPLETE**.
