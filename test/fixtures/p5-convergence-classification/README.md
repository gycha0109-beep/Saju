# P5 Governed Convergence Classification

Architecture v1.3 allows many-to-one semantic convergence, but does not allow cosmetic uniqueness or unexplained collisions to be silently accepted.

## Machine-verifiable intentional convergence

This first implementation classifies a many-to-one mapping as `intentional_convergence` only when:

1. at least two distinct `ConsumedInputFingerprint`s map to the same `InterpretationSignature`, and
2. every observation has the exact same non-empty normalized set of producing T8 rule refs.

This is a deliberately conservative implementation of the architecture's `same T8 synthesis rule` basis.

## Default

If the exact producing T8 rule-set basis is not established, classification is:

`unexplained_collision`

The verifier does not infer intent from similar prose, rule names, tags, or methodology labels.

## Explicit rationale

Architecture v1.3 also permits explicit documented convergence in existing `RuleDefinition` / `MethodologyDefinition` rationale. This implementation does not attempt to machine-interpret prose rationale. Such a collision therefore remains unexplained until a separately governed machine-verifiable binding is introduced or reviewed.

No new convergence-policy registry is introduced here.

## Actual Career fixture

Two synthetic Ten-God layouts preserve the same visible-stem and branch subtype sets while changing their positions. The current Career candidate consumes the full resolved Ten-God chart, so the consumed fingerprints differ. Its exact T8 subtype/channel rules do not encode the within-channel positions, so the interpretation signatures and producing T8 rule sets remain the same. This is classified as intentional convergence by the existing-rule basis.

## Boundary

- verification-only
- no Saju semantic authority changes
- no Career MUR activation
- no production wiring
- no score/rank/weight logic
- no automatic prose-rationale interpretation
