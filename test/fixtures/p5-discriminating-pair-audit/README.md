# P5 Discriminating Pair Audit

This fixture covers Architecture v1.3 Benchmark B without adding interpretation authority.

## Pair types

### Methodology-consumed change

A controlled pair changes the resolved Ten-God layout consumed by the current Career T8 research candidate.

Expected:

- `ConsumedInputFingerprint`: different
- `InterpretationSignature`: different

### Non-consumed control change

A controlled pair changes the synthetic birth date while preserving the exact Ten-God layout consumed by the Career T8 candidate.

Expected:

- `ConsumedInputFingerprint`: same
- `InterpretationSignature`: same

## Failure classes

The audit keeps separate failure codes for:

- expected consumed-input difference collapsed
- expected consumed-input stability broken
- expected interpretation difference collapsed
- expected interpretation stability broken

This prevents input extraction bugs, under-sensitive interpretation, and fake personalization from being merged into one generic failure.

## Boundary

- synthetic fixtures only
- no user-derived birth data
- verification-only
- no Career MUR activation
- no rule/methodology/source/pack changes
- no production wiring
- no uniqueness target is forced
