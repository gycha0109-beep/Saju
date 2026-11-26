# SA-6W Official Reading detailed representative corpus audit v1

Issue: #2321

Watchtower-Track: saju-bridge

## Purpose

SA-6W audits the already-activated user-facing `detailed` Official Reading presentation across the five supported natal domains. It does not add semantic authority or new interpretation material.

The audit extends SA-6V from one representative fixture per domain to a deterministic 15-case corpus:

- `general:natal`
- `career:natal`
- `wealth:natal`
- `relationship:natal:general`
- `business:natal`
- three all-five-family Ten-God placements per domain

## Authority boundary

This audit may measure and test presentation. It does not authorize:

- new interpretation conclusions or advice
- numeric scores, probabilities, rankings, or timing predictions
- LLM-generated semantic phrasing
- deletion or merging of semantic units, scenarios, conflicts, limitations, evidence, or provenance
- activation of currently inactive research claims
- arbitrary user-facing character budgets

Standard and detailed output must retain the same semantic hash, plan hash, section structure, explainability, and disclosures.

## Approved detailed role surface

The current approved profile registry contains:

| Domain | clarification | condition | boundary | rationale | structural_evidence | scenario_note | tension_note |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| general:natal | 20 | 5 | 20 | 0 | 0 | 0 | 0 |
| career:natal | 20 | 0 | 20 | 0 | 0 | 0 | 0 |
| wealth:natal | 11 | 0 | 11 | 0 | 0 | 0 | 0 |
| relationship:natal:general | 11 | 0 | 11 | 0 | 0 | 0 | 0 |
| business:natal | 11 | 0 | 11 | 0 | 0 | 0 | 0 |

The five `general:natal` condition materials belong to the approved month-branch structural profiles. The currently activated product registry used by the Official Reading corpus does not emit those structural claims, so no `condition` material is realized in these user-facing samples. SA-6W does not activate that separate semantic path.

Absence of `rationale`, `structural_evidence`, `scenario_note`, and `tension_note` is therefore recorded as current approved-material state, not treated as a presentation defect to be filled synthetically.

## Corpus findings

All 15 product-path samples resolve exact `detailed` output and preserve standard/detailed semantic invariants.

Observed detailed/standard text ratios:

- general: 2.341, 2.378, 2.382
- career: 1.708, 1.735, 1.738
- wealth: 1.739, 1.739, 1.739
- relationship: 1.723, 1.723, 1.723
- business: 1.660, 1.674, 1.684

No threshold is inferred from these values. They are measurements only.

Every sample contains one exact duplicate role-text group before rendering: the domain-wide `boundary` text shared by multiple semantic units. The SA-6V deterministic boundary compaction policy renders that repeated boundary exactly once in every sample.

No repeated non-boundary approved role text was found.

Runtime role realization across this corpus is limited to `clarification` and `boundary`. No inactive or unapproved role is synthesized by the renderer.

## Decision

SA-6W found no additional user-facing presentation defect that justifies a renderer change.

Accordingly:

- keep the SA-6V boundary compaction unchanged
- add no new detailed role material
- add no semantic activation
- retain the expanded corpus as regression coverage
- treat any future role expansion as a separate authority/material task, not as a formatting fix

## Validation

The representative corpus test asserts:

- deterministic repeated rendering
- exact detailed preference resolution
- same standard/detailed section IDs
- same explainability and disclosures
- same source semantic hash and source plan hash
- no realized role without approved domain material
- all exact duplicate detailed role text is boundary-only
- each repeated boundary renders exactly once

Initial affected CI result:

- lint: PASS
- typecheck: PASS
- build: PASS
- representative corpus: 20 tests PASS
- affected/static suite: 19 files / 150 tests PASS
- CI Verify: PASS

Production Calculation Container, PIE, and final integration CI remain required on the submitted head.
