# Compatibility Audit

Base: `79292b44f929855e2e31ded371d923deb5969252`

## Existing contracts reused

- `RuleEvaluation.inputRefs` remains unchanged.
- `InterpretationClaim.ruleRefs` remains unchanged.
- `ResolvedRuleRegistrySnapshot.rules` supplies the exact rule input declarations used to recover input keys.
- Existing methodology required-input coverage validation remains authoritative for contract completeness.

## Deliberately not changed

- no `RuleEvaluation` schema migration
- no interpretation-engine changes
- no reading profile/MUR activation
- no production export or runtime wiring
- no claim type, rule, methodology, pack, source, or narrative authority changes

## Fail-closed checks

Verification throws on:

- missing/non-active selected claims
- missing or non-matched producing evaluations
- rule/evaluation/scenario/emission mismatches
- missing producing rules
- non-T8 or cross-domain producing rules
- rule-input/inputRef cardinality mismatch
- source mismatch
- declared path/type mismatch

This keeps the helper diagnostic-only and prevents reconstruction by guesswork.
