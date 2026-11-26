# R094 — counterexample registry linked to governed rules

Date: 2026-09-22  
Issue: #1046  
Status: COUNTEREXAMPLE REGISTRY CONTRACT DEFINED / NO AUTOMATIC RULE INVALIDATION

## Purpose

Make counterexamples first-class research evidence linked to exact governed targets.

A counterexample is not merely prose saying "this rule has an exception." It must preserve:
- the exact challenged target;
- the challenging evidence;
- what the target would have produced;
- what contradictory behavior was observed or source-supported;
- how applicability/scope was adjudicated;
- the full revision history.

R094 is research-only.

## Counterexample classes

- `SOURCE_CONTRADICTION`
- `SOURCE_EXCEPTION`
- `CALCULATION_EDGE_CASE`
- `IMPLEMENTATION_REGRESSION`
- `CROSS_SCHOOL_DIVERGENCE`
- `TEMPORAL_CONTEXT_REVERSAL`
- `DOMAIN_PROJECTION_FAILURE`
- `UNKNOWN_OR_UNRESOLVED`

The class identifies the kind of challenge. It does not itself invalidate a rule.

## Exact target identity

Do not collapse rule/methodology/version/content hash into one opaque field.

Required target fields:
- `targetKind`: RULE_VERSION or METHODOLOGY_VERSION;
- `targetId`;
- `targetVersion`;
- `targetContentHash`;
- `targetScopeRef`.

This prevents a counterexample recorded against one rule version from silently attaching to a later changed rule.

## Challenge evidence

Every counterexample must identify the challenge source explicitly.

Challenge kinds:
- `INPUT_VECTOR`
- `SOURCE_PROPOSITION`
- `REPRODUCED_RUNTIME_RESULT`

Required evidence:
- challenge ref;
- provenance refs;
- exact input/source scope;
- expected behavior under the challenged target;
- observed or source-supported contradictory behavior.

Source-provided propositions do not become reproduced runtime cases, and reproduced runtime cases do not become source contradictions without source evidence.

## Evidence state and adjudication outcome are separate

The stale one-dimensional state list is insufficient because a counterexample may be both `SOURCE_VERIFIED` and `RULE_NARROWED`.

### Evidence state

- `UNVERIFIED`
- `REPRODUCED`
- `SOURCE_VERIFIED`
- `INCONCLUSIVE`

### Adjudication outcome

- `OPEN`
- `RULE_NARROWED`
- `RULE_SUPERSEDED`
- `NOT_APPLICABLE`
- `NO_RULE_CHANGE`
- `INCONCLUSIVE`

These are orthogonal.

Examples:
- evidence=`SOURCE_VERIFIED`, outcome=`RULE_NARROWED`
- evidence=`REPRODUCED`, outcome=`NOT_APPLICABLE`
- evidence=`INCONCLUSIVE`, outcome=`OPEN`

## Scope impact

Every adjudication records scope impact explicitly.

Scope impact states:
- `NONE`
- `NARROWER_APPLICABILITY`
- `SUPERSEDED_TARGET`
- `IMPLEMENTATION_ONLY`
- `UNRESOLVED`

A counterexample does not automatically falsify every scope of a broader rule.

## Immutable evidence, append-only adjudication

The original counterexample evidence identity is immutable once registered:
- counterexample ID;
- target identity;
- challenge identity;
- original expected/contradictory behavior;
- original provenance refs.

Adjudication is append-only history.

Rule revision must not:
- delete the counterexample;
- rewrite it to point only at the successor;
- erase the superseded target identity.

If a rule is superseded, preserve:
- old target ref;
- successor target ref;
- supersession/adjudication event ref.

## Relationship to R093 provenance graph

R094 may reference R093 provenance nodes/edges for evidence lineage.

R094 does not duplicate the provenance graph and does not infer support/contradiction transitively.

A counterexample registry entry may point to exact R093 evidence refs, but graph connectivity alone does not adjudicate the counterexample.

## Governance

- counterexample count is descriptive only;
- counterexample count is not a confidence score;
- no majority-count falsification;
- no automatic rule invalidation;
- no automatic rule narrowing;
- no Production behavior change from registry membership;
- any production change requires the existing governed promotion path.

## Rejected shortcuts

- `COUNTEREXAMPLE_AUTO_INVALIDATES_RULE`
- `TARGET_VERSION_OR_HASH_OMITTED`
- `RULE_REVISION_REWRITES_COUNTEREXAMPLE_HISTORY`
- `COUNTEREXAMPLE_COUNT_EQUALS_CONFIDENCE`
- `SOURCE_PROPOSITION_EQUALS_REPRODUCED_RUNTIME_CASE`
- `REPRODUCED_RUNTIME_CASE_EQUALS_SOURCE_CONTRADICTION`
- `R093_GRAPH_CONNECTIVITY_AUTO_ADJUDICATES_COUNTEREXAMPLE`
- `PRODUCTION_CHANGES_FROM_COUNTEREXAMPLE_REGISTRY_DIRECTLY`

## Authority boundary

R094 defines a research evidence registry contract only.

It does not promote research evidence, alter Production behavior, or grant rule/methodology authority.
