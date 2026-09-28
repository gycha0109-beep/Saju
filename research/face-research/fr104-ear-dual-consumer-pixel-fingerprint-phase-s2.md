# FR104 Phase S-2 — ephemeral dual-consumer pixel fingerprint

Issue: #1810

## Purpose

The existing transform receipt proved that Florence and FaceLandmarker acknowledged the same issued receipt object and frame dimensions, but it did not independently verify that both consumers received the same pixel bytes.

Phase S-2 adds a one-shot ephemeral SHA-256 session.

## Protocol

Each consumer independently submits the exact canonical frame bytes immediately before inference:

```text
canonical frame bytes
  -> Florence fingerprint submission
  -> FaceLandmarker fingerprint submission
```

The session hashes each submission separately with SHA-256.

The digest values are retained only inside the one-shot session until comparison, then cleared.

The returned evidence contains only:

- algorithm = SHA-256
- both consumers submitted
- frameDigestEqual
- samePixelBytesIndependentlyVerified
- digestReturned = false
- digestPersisted = false
- digestRetainedAfterFinalize = false
- rawFrameBytesRetained = false

No digest value is returned.

## Integration

`finalizeNeutralEarDualConsumerTransformBindingFR104` now accepts optional fingerprint evidence.

If matching evidence is present:

```text
same_pixel_bytes_not_independently_verified
```

is removed from the laterality blocker set.

If the two fingerprints differ, that blocker remains.

The Phase D provenance export can now carry `sharedDecodedPixelFrame.independentlyVerified=true` when and only when the bounded fingerprint evidence matches.

## Authority boundary

Matching pixels do not authorize anatomical laterality.

Phase R found the exact provider side semantics conflicting or ambiguous, and anatomical mapping remains unimplemented.

Validated external-ear observation, traditional binding, and Production remain false.

Watchtower-Track: face-observation-engine