# SA-6X Detailed Official Reading product completion freeze v1

Issue: #2328

Watchtower-Track: saju-bridge

## Decision

The currently supported user-facing `detailed` Official Reading scope is complete and may be treated as a frozen product capability for the following five natal domains only:

- `general:natal`
- `career:natal`
- `wealth:natal`
- `relationship:natal:general`
- `business:natal`

This completion statement is deliberately narrower than “all Official Reading domains support detailed output.” Annual, monthly, spouse-specific relationship, and any other unlisted scope remain outside the completion declaration.

## Completion boundary

The completed capability is presentation-only.

Detailed output must continue to reuse the same canonical semantics, plan, evidence, explainability, disclosures, scenarios, conflicts, conditions, limitations, and provenance as standard output. Detailed presentation is not allowed to:

- invent new conclusions or advice
- introduce probabilities, scores, rankings, or future timing
- select a scenario winner or erase a conflict
- delete or merge semantic units to improve prose
- reduce evidence or provenance
- delegate semantic phrasing authority to an LLM
- activate unrelated research claims

## Frozen acceptance contract

The SA-6X regression contract freezes these conditions:

1. The detailed registry version remains `myeonghwa-official-reading-approved-detailed-registry-v3`.
2. The supported-domain list is exactly the five domains named above.
3. The approved source-profile counts remain:
   - general: 20
   - career: 20
   - wealth: 11
   - relationship general: 11
   - business: 11
4. Product activation remains `enabled`.
5. Detailed availability remains material-conditional.
6. Missing material falls back to standard with `missing_expansion_material`.
7. Rollback/pre-activation state falls back to standard with `detailed_not_activated`.
8. The role vocabulary remains capable of seven roles, while the currently approved material surface contains only:
   - `clarification`
   - `condition`
   - `boundary`
9. No `rationale`, `structural_evidence`, `scenario_note`, or `tension_note` text is synthesized merely to make the feature appear more complete.

Any future change to those frozen conditions is an explicit product/authority expansion, not an SA-6X cleanup.

## Evidence carried forward

The completion decision relies on the existing governed test chain rather than adding new semantic machinery.

### Domain readiness

The detailed domain coverage suite already verifies that the five supported domains are fully ready for governed public detailed rendering, while unsupported domains remain outside authority.

### Product execution

The product-host suite verifies that approved detailed output is delivered through both the product response and HTTP endpoint and that the Narrative model adapter receives zero calls for governed detailed execution.

### User-facing quality

SA-6V removed the confirmed repeated domain-boundary presentation defect without changing semantic material.

SA-6W then expanded the audit to 15 product-path samples across the five domains. All samples preserved semantic/plan/explainability/disclosure invariants. No additional renderer defect was found. The only repeated exact role text was the governed domain-wide boundary, which renders once under the SA-6V compaction policy.

Observed SA-6W detailed/standard ratios were retained as measurements only; no arbitrary length threshold was adopted.

## Completion criteria

SA-6X is complete only when all of the following hold on the submitted head:

- A. frozen completion-contract test passes
- B. existing detailed domain readiness/coverage tests pass
- C. existing product-host detailed delivery and zero-model-call tests pass
- D. existing SA-6V/SA-6W quality tests pass
- E. lint, typecheck, build, Production Calculation Container, PIE, ordinary 16-shard regression, and CI Verify pass
- F. integration candidate full 16-shard regression and CI Integration Verify pass

If any criterion fails, the completion declaration is invalid and the PR must not merge.

## Post-SA-6X change policy

After SA-6X, the five-domain detailed capability is considered baseline product behavior.

Future work must open a separate track when it changes one of these dimensions:

- adding a new domain or temporal scope
- adding spouse-specific detailed authority
- adding a new detailed material role
- activating currently inactive structural/research semantics
- changing approved detailed copy or source-profile baselines
- changing renderer placement/compaction policy
- changing the fail-closed fallback contract

Such work must not silently reopen SA-6X or reinterpret this completion declaration as authority for the new scope.
