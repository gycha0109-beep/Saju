# P5 Benchmark C — Unique Consumed Fingerprints

This fixture implements Architecture v1.3 Benchmark C without adding interpretation authority.

## Corpus provenance

The benchmark uses deterministic synthetic `BirthInput` values generated inside the test and sends them through the actual Calculation Engine.

It does not use user-derived birth data and does not mutate a Canonical Snapshot into an internally inconsistent pseudo-E2E chart.

The candidate stream varies:

- solar date
- known time slot

It keeps `sexForTraditionalCalculation = unspecified` because sex is not being used as a Career-personalization discriminator in this benchmark.

## Collection rule

The test scans valid engine cases and keeps the first 100 distinct normalized `ConsumedInputFingerprint` observations.

Duplicate fingerprints do not count toward the target.

Fingerprint uniqueness is therefore not created by:

- birth date text
- snapshot ID
- calculation hash
- request ID
- timestamp
- case ID
- scenario label

Those transport or irrelevant dimensions are already excluded by the consumed-input fingerprint contract.

## Many-to-one classification

Every mapping of:

`different consumed fingerprint -> same interpretation signature`

is classified through the existing governed convergence classifier.

The Benchmark C report fails if:

- fewer than 100 unique consumed fingerprints are collected, or
- any convergence group is classified as `unexplained_collision`.

It does not require 100 distinct interpretation signatures. Legitimate many-to-one semantic convergence is allowed.

## Boundary

- verification only
- no Saju rule changes
- no claim semantic changes
- no methodology/source/pack changes
- no Career MUR activation
- no ranking or weighting
- no production reading/runtime/export wiring
- no forced uniqueness target for interpretation prose or semantic signatures
