# P0-NATAL N3 — Matching rules vs. repeated consumer interpretations

Date: 2026-10-15
State: implemented on stacked feature branch; CI/merge pending.
Base: P0-NATAL N0–N2 source-bound exploratory Preview (PR #2527).

## Product problem verified by an actual 35-case run

On the exact N0 sample corpus, last CI Quality before N3 observed:

- 35 real Preview HTTP cases; 33 `delivered`, 2 `partial_evidence` (unknown-hour).
- 32 distinct *displayed* chart-fact fingerprints and 27 distinct interpretation-body fingerprints.
- 6 pairs of `different_facts_same_interpretation` were flagged for investigation.
- N1/N2 HTML generated five delivered natal domains for a real date/time input.

These measurements **do not** yet prove personality/fortune truth, actual consumer value, or that all six collisions are bugs. The duplicated same-input fixture is an intentional control and must not be counted as false personalization.

## Implemented N3 slice

`src/preview/natal-rule-differentiation.ts` + the existing `scripts/natal-personalization-audit.mjs` now execute the *actual canonical chart engine* and the *actual research-lifecycle integrated General Natal rule registry* for **all 35 matching birth inputs**. The audit exports:

- `natal-baseline.json`: delivered ProductReadingResponse text/facts, states and repeated-copy contrasts.
- `natal-baseline.rules.json`: emitted claim types, exact matching rule IDs, stable rule signatures, stable normalized claim semantic signatures, repeated text clusters, and pairwise classifications.
- Distinguishes **SAME_COPY_DIFFERENT_RULES** (presentation bottleneck candidate) vs **SAME_COPY_SAME_RULES_DIFFERENT_CHART** (rule coverage / chosen interpretive abstraction candidate), as well as copy differences under identical matched rule sets (possible presentation-only variation).
- Run timestamps, evaluation IDs, claim IDs and snapshot IDs are excluded from semantic signatures; independent snapshot identity is still checked for each run.
- Full sample correspondence required; duplicate or missing rule observations cause failure, not silent partial analysis.

`src/preview/natal-activated-theme-preview.ts` + `scripts/natal-personalized-preview.mjs` add **actual activated T5 theme source excerpts** to the internal HTML, based exclusively on emitted integrated-registry claims. This is meaningful chart-conditional theme inclusion (no forced variation): themes differ only when rules match differently. Exact source references and rule IDs remain inspectable.

## Strict authority and output boundary

- General natal integrated registry and theme claims remain `0.1.0-research`. Matching a T5 family is not an admitted statement that a person *is* a certain way or will *get* a particular outcome.
- No random personalized prose, LLM-based invented attribution, chart weighting, final Strength/旺衰, 格局, 用神, income, profession or future-event prediction.
- `mayPublish=false`, `maySell=false`, `mayUseAsOfficialMeaning=false`; no change to `/api/readings`, persisted records, external consumers or Product/Production gates.
- A repeated sentence may be appropriate for genuinely different charts. Classification produces review queues, not forced differentiation.
- Rule signature differences are **not necessarily** the source of differences in consumer text: direct claim→consumer paragraph provenance is still not exposed in the existing ProductReadingResponse.

## Validation

```bash
npm run preview:natal:audit -- natal-baseline.json
npm run preview:natal:demo -- 1996-01-09 09:30 natal-preview.html
npm run typecheck
npm run lint
npm run test
npm run build
```

CI Quality must generate both JSON files, agree on the repeated-copy collision count between the N0 and N3 reports, and produce an HTML page from actual Preview HTTP responses with chart-activated research themes.

## Next substantive interpretation work

Use N3 diagnostics to prioritize precise coverage gaps:

1. **Same consumer text but different research matched rules**: inspect the claim→approved semantic unit→Official Reading plan→renderer selection chain, look for dropped qualifying material. Extend only from properly reviewed material, never by copying research claims into Production.
2. **Same matched rule set across materially distinct charts**: design *new* source-qualified compound constraints (position, phase, additional existing facts and contradictory conditions). Research/Bridge handles authority of genuinely new meaning.
3. **Same matched rule set but different text**: ensure chart facts/supporting context rather than incidental tokens/IDs caused the difference.
4. Assess representative full consumer reports, not just unique text counts. N3 telemetry is a prerequisite for expanding deep integrated natal interpretation, **not completion of that final objective**.
