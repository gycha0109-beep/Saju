# FR161 — Eye-pair prospective ephemeral real-capture series

## Decision

FR158 defined role-invariant eye-pair metric-3D candidates, FR159 preregistered exactly two primary metrics, and FR160 materialized admitted prospective metric observations. The remaining execution gap was concrete: FR160 accepted an already-issued FR158 runtime but did not provide a browser-local real-image intake path for a fresh repeated capture series.

FR161 closes that execution gap without widening empirical, biometric, threshold, or traditional-semantic authority.

```text
local image Blob series
→ MediaPipe Face Landmarker 0.10.35 / FR26
→ governed metric geometry / FR77
→ role-invariant eye-pair metric runtime / FR158
→ prospective manifest / FR159
→ acquisition record + descriptive dataset / FR160
```

No raw image, provider payload, raw landmark set, full metric geometry, source digest, embedding, or identity template is persisted by FR161.

## Why two real captures instead of a copied image

The repeated-capture question is not whether the same pixels reproduce the same result. A byte-for-byte copy contains no new acquisition variation.

FR161 therefore computes a transient SHA-256 digest for each source Blob and rejects an exact duplicate **before provider execution**. The digest is not returned or persisted.

Two independently taken images under intentionally similar conditions can still differ through capture/repositioning and provider-estimation effects. That observed variation is the descriptive object of the first same-condition series.

The reverse implication is deliberately forbidden:

```text
byte-distinct images
!= independently proven capture events
!= validated capture quality
!= repeatability pass
```

Freshness and same-participant status remain explicit caller attestations only. FR161 performs no identity matching.

## Prospective intake boundary

One FR161 series requires:

- at least two non-empty in-memory image Blobs;
- one protocol-local `prospectiveCollectionRef`;
- one protocol-local `captureSeriesRef`;
- one `captureConditionRef`;
- unique `captureRef`, `providerRunRef`, and positive `captureSequenceIndex` values;
- `postPreregistrationFreshCaptureAttested = true`;
- `sameParticipantSeriesAttested = true`;
- the release-exact FR76 parity object and geometry metadata needed by FR77.

FR159 manifests issued by the bridge always keep:

```text
usedForCandidateSelection = false
developmentCaptureReuse   = false
identityMatchingPerformed = false
```

## Metric boundary

FR158 still computes its governed research candidate runtime, but the FR160 prospective record copies only the two FR159-preregistered primary metrics:

1. `neutral.eye_pair.metric_3d.mean_cycle_x_span_to_full_mesh_x_span_ratio@0.1.0`
2. `neutral.eye_pair.metric_3d.mean_cycle_perimeter_to_full_mesh_x_span_ratio@0.1.0`

Coordinate frame remains:

```text
canonical_aligned_right_handed_metric_3d
```

FR160 descriptive summaries remain limited to:

```text
count / min / max / mean / range
```

No pass/fail repeatability threshold is introduced.

## Authority boundary

FR161 explicitly does **not** establish:

- empirical repeatability;
- capture-quality validity;
- a capture-quality measurement construct;
- a numeric repeatability acceptance threshold;
- a numeric capture-quality threshold;
- same/different-person classification;
- identity matching or a biometric template;
- calibration;
- construct validity;
- traditional criterion binding or semantic authority.

A real two-capture execution can create actual prospective observations, but descriptive range alone does not turn those observations into a validated repeatability verdict.

## Privacy boundary

The real-image path is browser-local and ephemeral:

```text
raw image persisted                    = false
browser-decoded image persisted        = false
raw provider response persisted        = false
raw landmark set persisted             = false
derived full-face metric geometry      = false
source digest persisted or returned    = false
face embedding persisted               = false
identity template persisted            = false
```

The transient digest exists solely to reject an exact byte clone and is discarded after the run.

## Definition-time evidence boundary

No user image and no real face-derived metric value is committed with FR161. Unit tests may exercise protocol mechanics and duplicate-source rejection, but such fixtures are not prospective empirical evidence.

## Next frontier

```text
execute distinct fresh post-preregistration capture series
→ materialize FR160 descriptive observations
→ describe within-series same-condition variation
→ add separately preregistered capture-condition variation when warranted
→ examine recurrence across independent series
```

Until an external evaluation criterion is justified, remain descriptive-only. Do not derive an identity classifier, biometric score, arbitrary threshold, or traditional face-reading meaning from these measurements.
