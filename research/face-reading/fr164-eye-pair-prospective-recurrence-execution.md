# FR164 — Eye-pair prospective recurrence execution

## Decision

FR163 froze a prospective cross-session recurrence protocol before future coached sessions were collected. Two post-FR163 governed FR161 sessions have now been executed locally. FR164 closes the implementation gap between that protocol and an executable governed comparison surface.

The runtime is intentionally narrow:

```text
issued FR161 Session 1
+ issued FR161 Session 2
+ caller attestations required by FR163
→ compare only the two FR159 preregistered primary metric session summaries
→ return descriptive recurrence statistics
→ do not issue independence, repeatability, quality, identity, threshold, or traditional-semantic authority
```

No participant-derived measurements are committed by FR164. The public repository contains only the generic executor, synthetic tests, and authority/privacy constraints.

## Issued-session provenance

FR164 must not accept a structural lookalike of an FR161 result. FR161 therefore marks successful real-capture series results in a runtime-local `WeakSet`, and FR164 requires that issued provenance before reading the session summary.

The FR161 assertion also requires the embedded FR160 dataset to remain an issued FR160 dataset. This preserves the governed chain:

```text
FR77 → FR158 → FR159 → FR160 → FR161 → FR164
```

This is runtime provenance, not biometric identity provenance.

## Session admission

FR164 v1 accepts exactly two session inputs. Each session must:

- be an issued FR161 real-capture series;
- contain at least two source-byte-distinct captures;
- retain 478 provider landmarks and 468 governed metric landmarks at the FR161 execution boundary;
- expose the canonical aligned right-handed metric-3D coordinate frame;
- expose exactly the two FR159 preregistered primary metrics in one FR160 series-condition summary;
- retain all FR161 no-threshold, no-identity, no-repeatability-adjudication, and privacy boundaries.

The cross-session request additionally requires caller attestations that:

- the captures were collected after FR163;
- the sessions are grouped as the same participant series for this study-local comparison;
- the FR162/FR163 capture setup guidance was followed as far as the caller can attest.

`sameCaptureSetupAttested = true` does **not** require the same physical room or geolocation. It means the operational coaching conditions were kept comparable as far as the caller can attest: frontal neutral pose, camera near eye level, no intentionally extreme near/far framing, no intentionally high/low camera angle, and reasonably consistent framing.

## Independence boundary

FR163 explicitly does not provide an external witness trust root for eye-pair session independence. FR164 therefore requires:

```text
sessionSeparationIndependentProof = false
```

Distinct session refs, byte-distinct captures, caller statements, timestamps, or same-participant grouping are not promoted into independently verified session separation.

Accordingly:

```text
independentMultiSessionEvidenceAdmitted = false
multiSessionIndependenceVerified        = false
identityMatchingPerformed               = false
```

## Descriptive statistics

For each session, FR164 projects the already-governed FR160 descriptive summary:

```text
count
min
max
mean
range
range / mean
```

For the two ordered session means `[m1, m2]`, FR164 materializes only FR163-authorized descriptive comparison statistics:

```text
count                  = 2
min                    = min(m1, m2)
max                    = max(m1, m2)
mean                   = (m1 + m2) / 2
range                  = max - min
range / mean           = range / mean
absolute mean difference = abs(m2 - m1)
relative mean shift      = (m2 - m1) / m1
```

The relative shift is explicitly ordered from the first supplied session to the second supplied session. It is a descriptive convenience only. It is not a repeatability score, acceptance threshold, quality score, calibration, or inferential validation statistic.

The runtime handles only the two FR159 preregistered metrics:

```text
neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0
neutral.eye_pair.metric_3d.mean_cycle_perimeter_to_full_mesh_x_span_ratio@0.1.0
```

Coordinate frame remains:

```text
canonical_aligned_right_handed_metric_3d
```

## Authority boundary

FR164 may state only that prospective cross-session descriptive execution occurred. It must not state or derive:

- repeatability PASS/FAIL;
- capture-sensitivity PASS/FAIL;
- empirical repeatability established;
- capture quality validated;
- correlation or redundancy conclusions;
- numeric acceptance thresholds;
- product capture-quality gates;
- identity matching or same/different-person classification;
- biometric templates;
- traditional face-reading meaning.

## Privacy boundary

FR164 persists none of the following:

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

The executor returns descriptive numeric values ephemerally to its caller. Returning an in-memory result is not authorization to store participant-derived values in public repository evidence.

## Next frontier

Additional post-FR163 governed sessions may extend the descriptive recurrence series, but any future executor that supports more than the current two-session comparison must preserve the same authority and privacy constraints unless an independently reviewed protocol explicitly widens them.
