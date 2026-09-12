# FR165 — Eye-pair prospective multi-session recurrence extension

## Decision

FR164 implements the first governed post-FR163 cross-session recurrence execution, but its v1 surface is deliberately fixed to exactly two issued FR161 sessions. FR165 extends only that descriptive execution surface so that a future third or later post-FR163 governed session can be appended without widening authority.

The runtime is intentionally chained rather than free-form:

```text
issued FR164 two-session recurrence
+ one or more additional issued FR161 sessions
+ the same FR163 caller attestations
→ ordered multi-session descriptive series
→ FR163-authorized descriptive statistics only
→ no independence, repeatability, quality, identity, threshold, calibration,
  inferential, correlation/redundancy, classification, or traditional-semantic authority
```

FR165 commits no participant-derived measurements. The public repository contains only the generic extension runtime, synthetic tests, CI, and authority/privacy constraints.

## Provenance chain

FR165 requires runtime-issued provenance at both predecessor layers:

```text
FR77 → FR158 → FR159 → FR160 → FR161 → FR164 → FR165
```

The first two sessions are admitted only through an issued FR164 result. Every appended session must be an issued FR161 result. Runtime-local issuance remains provenance of governed execution, not biometric identity provenance.

A structural lookalike of either predecessor is not accepted.

## Session admission

FR165 v1 requires:

- one issued FR164 result containing exactly its governed two-session base;
- at least one additional issued FR161 real-capture session;
- therefore a total series length of at least three sessions;
- distinct protocol-local `sessionRef` values across the full ordered series;
- explicit caller attestation that all admitted captures are post-FR163;
- caller same-participant grouping attestation;
- caller attestation that the FR162/FR163 capture setup guidance was followed as far as the caller can attest;
- `sessionSeparationIndependentProof = false`.

Each appended FR161 session must retain:

```text
at least 2 byte-distinct source captures
478 provider landmarks at capture execution boundary
468 governed metric landmarks
canonical_aligned_right_handed_metric_3d
exactly the 2 FR159 preregistered primary metrics
no threshold / no identity / no repeatability adjudication
FR161 privacy boundary unchanged
```

`sameCaptureSetupAttested = true` still does not mean the same room or geolocation. It preserves only the operational coaching meaning already frozen by FR162/FR163.

## Independence boundary

FR165 does not repair the FR163 independence limitation. It explicitly preserves:

```text
independentMultiSessionEvidenceAdmitted = false
multiSessionIndependenceVerified        = false
identityMatchingPerformed               = false
sessionSeparationIndependentProof       = false
```

More sessions do not convert caller attestations, distinct refs, byte-distinct captures, timestamps, or ordered collection into independently verified session separation.

## Descriptive statistics

For every metric, FR165 materializes the ordered per-session projections already authorized by predecessor execution:

```text
count
min
max
mean
range
range / mean
```

Across the ordered session means `[m1, m2, ..., mn]`, FR165 emits only:

```text
count
min
max
mean
range
range / mean
```

For each adjacent ordered pair, it additionally emits:

```text
absolute mean difference
relative mean shift from the previous session
```

These are descriptive conveniences using statistic classes already listed by FR163. FR165 does **not** add standard deviation, variance, coefficient of variation, confidence intervals, p-values, correlation, regression, reliability coefficients, acceptance bands, or any other inferential/calibration statistic.

The only primary metrics remain:

```text
neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0
neutral.eye_pair.metric_3d.mean_cycle_perimeter_to_full_mesh_x_span_ratio@0.1.0
```

Coordinate frame remains:

```text
canonical_aligned_right_handed_metric_3d
```

## Authority boundary

FR165 may state only that an ordered prospective multi-session descriptive recurrence extension was executed. It must not state or derive:

- repeatability PASS/FAIL;
- capture-sensitivity PASS/FAIL;
- empirical repeatability established;
- capture quality validated;
- inferential significance;
- correlation or redundancy conclusions;
- numeric acceptance thresholds;
- product capture-quality gates;
- identity matching or same/different-person classification;
- biometric templates;
- traditional face-reading meaning.

Increasing the number of sessions does not widen any of those authorities.

## Privacy boundary

FR165 persists none of the following:

```text
raw images
raw provider responses
raw landmarks
full-face metric geometry
participant-derived numeric metric values
exact capture timestamps
geolocation
device identifiers
face embeddings
identity templates
```

The runtime returns descriptive numeric values ephemerally to its caller. Public repository evidence must not contain participant-derived numeric output.

## Empirical status

FR165 generic execution is implementable before a third session exists, but empirical FR165 execution is intentionally **BLOCKED** until at least one additional post-FR163 governed session is actually collected and can be processed in the same active runtime provenance chain.

The already executed two-session FR164 result does not authorize fabricating or replaying a synthetic third empirical session.

## Next frontier

When an additional post-FR163 governed session is available, execute it through FR161 and extend the same active runtime chain through FR164 and FR165. Continue descriptive accumulation only; do not promote independence, repeatability, quality, threshold, calibration, identity, inferential, or traditional-semantic authority without a separately reviewed protocol.