# P5 Consumed Input Fingerprint Verification

This fixture documents the verification-only boundary for `src/verification/consumed-input-fingerprint.ts`.

## Scope

- Derive audit traces only from selected active T8 domain claims and their matched producing `RuleEvaluation`s.
- Rebind each recorded input to the exact selected `RuleDefinition` input declaration.
- Preserve audit transport references in `ConsumedInputTraceEntry`.
- Hash only normalized semantic input material in `ConsumedInputFingerprintMaterial`.
- Keep scenario labels outside the fingerprint hash.
- Suppress empty domain interpretation signatures when no selected active T8 semantics are visible.

## Fingerprint exclusions

The fingerprint material must not depend on:

- snapshot ID
- request ID
- calculation hash
- evaluation ID
- claim ID
- timestamps
- scenario label alone
- research envelope ID alone

## Authority boundary

This lane does not:

- add or change Saju rules
- add or change claim semantics
- activate Career MUR
- resolve conflicts or rank claims
- promote research authority
- wire verification output into production reading/runtime behavior

The helper is audit/verification-only and must never feed fingerprints back into interpretation rules.
