# FR226 — Exact Witness Scope Coverage

Status: implementation candidate  
Contract: `FR226-WITNESS-SCOPE-COVERAGE-v1`

## Purpose

FR225 proves that persisted witness records have not been silently altered. It does not prove that the witness claims belong to the exact empirical study scopes assembled by FR222–FR224.

FR226 closes that correspondence gap.

It maps verified FR225 witness claims back to the exact reviewer cohort, repeat-family capture admissions, and repeat-family keys represented by the active FR222/FR223/FR224 study artifacts.

This remains **declared witness coverage**, not independent fact verification.

## Required active-runtime inputs

FR226 requires:

- FR222 candidate/annotation correspondence;
- FR223 declared repeat-capture family descriptives;
- FR224 empirical-study readiness gate;
- FR225 verified persisted witness evidence.

JSON-shaped clones cannot substitute for active-runtime verification.

## Exact source coherence

FR226 requires the supplied FR224 gate to reference the exact supplied:

- FR222 correspondence ref + digest;
- FR223 repeat-family evidence ref + digest.

FR226 also requires the FR225 witness evidence to be bound to the exact supplied:

- FR224 gate ref;
- FR224 gate digest.

## Canonical witness scopes

FR226 interprets witness scopes only through their claim type.

### Reviewer claims

Both:

- `reviewer_cohort_human_status_observed`;
- `reviewer_cohort_independence_observed`;

must use the exact FR220 annotation evidence ref carried by FR222 as their `scopeRef`.

### Capture freshness claims

`capture_freshness_observed` must use an exact FR223 repeated-family `captureAdmissionRef`.

A claim for a capture outside the repeated-family study scope is rejected.

### Same-participant claims

`capture_family_same_participant_observed` must use an exact FR223 repeated-family `captureFamilyKey`.

A claim for an unrelated family is rejected.

## Coverage output

FR226 reports:

- reviewer human-status witness presence/count;
- reviewer independence witness presence/count;
- expected and witnessed repeated-family capture admissions;
- expected and witnessed repeated families;
- selection-specific counts;
- holdout-specific counts;
- uncovered capture-admission refs;
- uncovered capture-family keys.

The two possible states are:

- `DECLARED_WITNESS_SCOPE_COVERAGE_COMPLETE_AUTHORITY_BLOCKED`;
- `DECLARED_WITNESS_SCOPE_COVERAGE_INCOMPLETE_AUTHORITY_BLOCKED`.

“Complete” means only that every expected study scope has at least one matching persisted witness statement.

## What complete coverage does not mean

Complete declared witness coverage does **not** establish:

- verifier identity;
- verifier independence;
- authenticity of external evidence;
- truth of the witness statement;
- reviewer human status;
- reviewer independence;
- capture freshness;
- same-participant identity;
- capture quality;
- metric repeatability;
- empirical sufficiency.

No minimum verifier count is invented.

Multiple witness records may exist for one scope, but FR226 does not convert witness count into confidence or authority.

## Selection / holdout

FR226 preserves FR223 selection/holdout partition boundaries in its coverage counts.

It does not use holdout evidence for rule selection and does not authorize a threshold, classifier, or transition zone.

## Authority boundary

The following remain false:

- verifier identity independently verified;
- verifier independence independently verified;
- external evidence inspected by runtime;
- witness claim cryptographically authenticated;
- declared witness coverage means underlying facts established;
- reviewer human status independently verified;
- reviewer independence independently verified;
- capture freshness independently verified;
- same-participant identity independently verified;
- capture quality validated;
- empirical repeatability established;
- repeat-capture stability established;
- empirical sufficiency established;
- calibration authorized;
- transition zone issued;
- threshold issued;
- classifier issued;
- traditional binding issued;
- production activated;
- commerce activated.

## CI meaning

Synthetic CI proves only:

- exact FR222/FR223/FR224/FR225 source binding;
- exact witness-scope matching;
- selection/holdout coverage accounting;
- uncovered-scope reporting;
- out-of-study scope rejection;
- active-runtime authority guards.

Synthetic witnesses are not empirical evidence.

## Next frontier

After FR226, the software can distinguish:

1. persisted witness integrity;
2. exact declared witness coverage;
3. independently established empirical facts.

Only the first two exist.

Further progress requires a separately governed authentication/inspection mechanism for verifier identity and external evidence before any FR226 coverage can be upgraded into an independently verified fact state. Calibration remains blocked until that and real repeatability evidence are established.
