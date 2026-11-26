# FR312G9 — Synthetic-Only Repeatability Calculator

Issue #2412. Repository: Saju. Track: face-research. Upstream FR312F, FR312G, FR312G6, FR312G7, FR312G8.

## 1. Engineering result

FR312G8 determined **0/8** exact neutral-ratio axes have lawfully admitted external repeated-measurement evidence. FR312G9 makes progress on the *computation layer only*: a pure in-memory function exercises the frozen eight exact metric references and the participant/session/capture hierarchy using explicitly synthetic scalar numbers. It **does not** obtain a usable dataset, variance prior, valid participant count, FR312G6 numeric approval, biometric permission, reliability pass/fail decision or FR312H entry.

Implementation:
- `packages/face-reading/src/traditional-neutral-metric-synthetic-repeatability-fr312g9.ts`
- `packages/face-reading/src/traditional-neutral-metric-synthetic-repeatability-fr312g9.test.ts`

## 2. Input design and invariants

- Only `syntheticFixtureOnly: true` scalar observations. Participant identifiers must follow the `synth-*` test-only namespace; no image, face landmarks, real identity, annotations, URLs or extra keys.
- Exactly eight upstream `metricRef` values, versioned in FR312G; no dynamically fabricated axes. The sign constraint is inherited from the specific neutral axis (FR212 mouth corner orientation can be signed).
- Exactly four capture slots for every metric axis of every hypothetical participant: session A/B × capture 1/2. Explicit admitted/fresh capture and development partition flags only. Duplicate or missing slot rejects the fixture. Session A/B labels in a fixture **do not establish actual time-separated sessions**.
- Value available iff `availability === 'available'` and ratioValue is finite. Unavailable has `ratioValue: null` and a strictly limited reason token. No zero substitution, imputation, fallback, or invented pair.
- Per-axis descriptive counts and missingness rate. For each hypothetical participant, two within-session absolute pair differences, an absolute difference of session means **only when both captures in both sessions have available numeric values**, and a range across available ratios when at least two values exist. This conservative calculation policy prevents partial sessions being passed off as full two-capture comparisons.
- No pooling of the eight axes into an aggregate score. No independence granted to repeated observations. Participant summary vectors are descriptive only; `syntheticParticipantCount` is a test-fixture count, not estimated empirical N.
- Unknown fields, non-synthetic participant references, holdout/calibration, rejected/historical images, invalid signedness, duplicate slots and unavailable-as-zero fail closed.

## 3. Synthetic fixture examples

The tests use only generated scalar ratios, two imaginary participants `synth-p1` and `synth-p2` and the registered axis refs. In a fully available `synth-p1` axis, session A [0.2,0.4], session B [0.6,0.8] gives absolute within-session pair differences [0.2,0.2], absolute difference of session means 0.4 and range 0.6. These numbers are **illustrative mathematical test inputs and results only**. They are not human measurements, study variance, reliability estimates, calibrated thresholds, or priors.

A missing B2 ratio is recorded with a reason, has a null B-session pair comparison and null between-session comparison. It does not become 0, and the other imaginary participant's summaries are unaffected.

## 4. Authority and scope

The calculator has no interface for images or external records and no API to create datasets or enroll participants. It calls the FR312G and FR312G8 contract checks before processing. FR312G6 numeric quantities stay null; 0/8 usable external evidence remains true. Output permission flags are all false, including actual collection, numeric participant count, reliability acceptance, FR312H, traditional meaning and product interpretation.

**Next real blocker:** an appropriately licensed data source or a separately approved prospective capture study. Synthetic outputs must never be submitted as FR312G6 evidence or used in production interpretations. A future governed empirical evaluator requires *separate review*; replacing the synthetic-only gate here is outside FR312G9.

## 5. Exit conditions

- A — Calculator computes per-axis per-participant within/between/range and missingness without data files; synthetic tests cover normal/partial observations.
- B — Guard forbids unapproved data, identifiers, hidden annotations, extra keys, partition leaks, bogus numeric evidence and downstream authority.
- C — Standard CI, Face Reading CI, Integration CI green, squash merge, Issue #2412 closed and main SHA verified.

Watchtower-Track: face-research
