# R099 — regression contract blocking silent research → Production changes

Date: 2026-09-20  
Issue: #1053  
Status: REGRESSION INVARIANTS DEFINED

## Invariant families

1. RESEARCH_IMPORT_ISOLATION
2. REGISTRY_STATUS_ISOLATION
3. CONTENT_HASH_STABILITY
4. CALCULATION_OUTPUT_STABILITY
5. INTERPRETATION_OUTPUT_STABILITY
6. UNKNOWN_FAIL_CLOSED
7. PREVIEW_SHADOW_SEPARATION
8. COMMERCE_ENTITLEMENT_SEPARATION
9. AUTHORITY_DIFF_REQUIRED
10. SUPERSESSION_TRACEABILITY

## Failure condition

The suite must fail on **silent authority drift**: a research-only change that alters governed Production behavior, enabled pack membership, content-addressed authority, calculation output, interpretation output, or commerce/entitlement behavior without an explicit authorized lifecycle change.

## Intended Production change

An intentional change is not exempt merely because tests were updated. It must include:
- explicit authority/lifecycle diff;
- old/new content-addressed version lineage;
- governed promotion evidence;
- affected fixture/output delta declared.

## Existing execution surfaces

R099 is designed to be enforceable through the repository's CI, Production Calculation Container, and PIE/shadow boundaries. This artifact defines invariants only; it does not silently modify those workflows.

## Rejected shortcuts

- UPDATED_SNAPSHOT_EQUALS_AUTHORIZED_CHANGE
- RESEARCH_STATUS_RULE_IN_PRODUCTION_PACK
- SHADOW_WRITE_PROMOTES_AUTHORITY
- UNKNOWN_RESEARCH_VALUE_DEFAULTED_IN_PRODUCTION
- COMMERCE_CHANGE_HIDDEN_IN_RESEARCH_DIFF

No Production behavior change in R099 itself.