# I13–I14 Strength Evidence Foundation Status

Status: **STRICT CLOSED — RESEARCH ONLY**

This closeout covers the structural evidence substrate used to research day-master strength. It does **not** authorize a production `신강/신약` classification, numeric strength score, or user-facing predictive claim.

## Closed scope

### I13 — Strength Evidence Foundation

Implemented evidence collection includes:

- visible-stem relationship evidence relative to the day master,
- hidden-stem same-element root evidence,
- hidden-stem resource/support evidence,
- position-preserving evidence identity,
- explicit `weight = not_assigned`,
- explicit `overallStrength = not_determined`.

The pack remains research-only. It does not emit a final strength classification.

### I14 — Scenario-preserving Strength Evidence Matrix

I7 seasonal/month-order signals and I13 structural evidence are composed into a scenario-specific matrix.

Hard guards are part of the contract:

```text
classificationAuthorized = false
numericScoringAuthorized = false
```

Unknown birth time and boundary-sensitive calculations remain scenario-preserving. Divergent scenarios are not merged into one synthetic conclusion.

The matrix also rejects:

- execution results from the wrong interpretation pack,
- unknown or forged scenario references,
- missing expected scenarios,
- evidence that cannot be bound back to the source interpretation run.

## Supporting runtime changes

The closeout also includes the prerequisites required for auditable strength evidence:

- Canonical schema `saju-canonical-v1.1`,
- derived fact set `myeonghwa-derived-facts-v1.1`,
- hidden-stem membership enrichment,
- scenario propagation for day-master and void-branch derived facts,
- scenario-bound `RuleEvaluation` audit records.

## Verification evidence

Code close gate:

```text
branch head: 5badbc3d8bf05ae0c8a1b4bcd73689e4a5acdc75
CI run:      #366
result:      SUCCESS

npm ci:        PASS
lint:          PASS
TS6 typecheck: PASS
Vitest:        40 files / 242 tests PASS
build:         PASS
```

The regression suite includes dedicated I13/I14 tests plus the full existing calculation, interpretation, narrative, registry-integrity, and authorization suites.

## Explicit non-authorizations

The following remain outside this closeout:

```text
production day-master strength classification
numeric strength score
production yongshin selection
production gyeokguk classification
career / wealth / relationship / health prediction
future-event prediction
```

The next strength step must begin with methodology review and source-backed classification rules. It must not reinterpret the research evidence matrix as an implicit production verdict.
