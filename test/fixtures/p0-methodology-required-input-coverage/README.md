# P0 — Methodology Required-Input Coverage Validation

Status: infrastructure / governance only  
Production semantic impact: NONE

## Baseline

- upstream main: `a32bc29e5e7d9d68a9d17c1d92ff07139d4af955`
- closes the B46 architecture trigger `METHODOLOGY_REQUIRED_INPUT_COVERAGE_VALIDATION_TRIGGER`

## Invariant

For every methodology selected by an `InterpretationPack`, each explicit `inputContract` entry whose mode is `required` must be consumed by at least one rule selected by that pack under the exact same methodology id and version.

```text
methodology.inputContract.required inputs
⊆
selected rules for that exact methodology
```

This is a rule-set coverage invariant, not a per-rule invariant.

## Scope

Validated contract kinds:

- canonical / derived fact path patterns, including `*` and terminal `**`
- interpretation claim types
- research evidence type, optional evidence version, and optional definition ref

Coverage is calculated after pack rule-set enablement and `disabledRuleIds` filtering. A disabled rule or a rule belonging to another methodology cannot satisfy the requirement.

`RuleInputRequirement.required` remains a separate runtime missing-input behavior. A rule may consume a methodology-required dimension as a runtime-optional input; that still counts as the methodology being represented in the active rule set.

## Compatibility

The validation does not reinterpret legacy `requiredFactTypes`. It applies only to explicit `MethodologyDefinition.inputContract.*.mode === 'required'` declarations.

The current general research methodology catalog and Career T5 personalized methodologies do not use explicit required input-contract entries, so existing packs are not made invalid merely by this infrastructure closure.

## Non-effects

This change creates no:

- Saju semantic rule
- T5 / T6 / T8 authority
- ClaimType
- MethodologyDefinition
- personalized pack
- numeric weighting
- narrative content
- Preview change
- production interpretation promotion
