# R090 — human-expert blind-review protocol

Date: 2026-09-20  
Issue: #1039  
Status: BLIND-REVIEW PROTOCOL READY / REVIEWER EXECUTION PENDING

## Purpose

Evaluate bounded structural claims without priming reviewers with the engine's preferred answer or the source commentary conclusion.

## Stage A — blind structural judgment

Packet contains normalized calculation facts and the bounded question only.

Hide unless essential:
- person identity;
- historical outcome narrative;
- engine answer;
- rule ID;
- source conclusion.

Reviewer response:
`SUPPORTED | REJECTED | INDETERMINATE | OUT_OF_SCOPE`

Collect free-text rationale and source/rule citation when available.

## Stage B — source-grounding review

After Stage A is locked, reveal:
- exact source excerpt;
- edition/source identity;
- provenance;
- research claim derived from it.

Reviewer records whether the research claim is a faithful bounded reading of the source, separately from whether their own school adopts that rule.

## Metadata

Record lineage/school, practice duration band, languages/readability, and calculation convention. These are descriptive strata, **not voting weights**.

## Adjudication

- preserve reviewer disagreement;
- preserve abstention;
- separate calculation disagreement from interpretation disagreement;
- no majority vote automatically becomes truth;
- no single seniority label overrides source provenance.

## Execution boundary

`reviewerExecutionPending = true` until reviewers are recruited and packets are pre-registered.

No Production promotion from protocol existence alone.