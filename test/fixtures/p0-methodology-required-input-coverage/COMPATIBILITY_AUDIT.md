# Compatibility audit

Audited baseline: `a32bc29e5e7d9d68a9d17c1d92ff07139d4af955`

## Existing explicit input contracts

The current Career personalized T5 substrate declares precise `inputContract` entries with `mode: allowed`; it does not rely on `mode: required` behaving as an alias for allowed.

The general research methodology catalog currently declares `requiredFactTypes` and does not declare explicit `inputContract` required entries. This P0 validation does not reinterpret `requiredFactTypes`.

The research-evidence boundary test fixture already exposes methodology-level `allowed | required | forbidden` independently of `RuleInputRequirement.required`, confirming the two concepts are distinct.

## Adoption rule

A future methodology may opt into fail-closed active-rule-set coverage by declaring `mode: required`. Once declared, removing/disable-filtering all exact-methodology consumers makes registry construction invalid with `METHODOLOGY_REQUIRED_INPUT_NOT_COVERED`.
