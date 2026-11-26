# FR104 Phase G — Ephemeral capture-transform provenance receipt

Issue: #1810

## Purpose

Phase E source audit identified two distinct missing evidence classes:

1. exact-runtime horizontal-mirror behavior for the pinned FaceLandmarker;
2. an independently generated capture-pipeline record of orientation / EXIF / rotation / horizontal-mirror transforms before both Florence and FaceLandmarker.

Phase F supplies the controlled mirror-pair execution surface.

Phase G defines the second surface without introducing an image digest or persisting raw media.

## Receipt model

The receipt is issued in memory after decode and before either consumer.

It records only:

- decoded frame width / height;
- EXIF orientation tag when available;
- whether EXIF orientation was applied by decode, preserved unapplied, absent, or unresolved;
- explicit post-decode rotation: 0 / 90 / 180 / 270;
- whether an explicit horizontal mirror was applied;
- resulting consumer-frame width / height.

Rotation and output dimensions are checked for internal consistency.

## Same-receipt consumer binding

The active runtime tracks issued receipt **object identity** in memory.

Both consumers must acknowledge the same issued object:

- `florence`;
- `face_landmarker`.

Each acknowledgement must state:

- observed frame dimensions equal the receipt;
- no additional pixel transform occurred after the receipt.

Two independently created but value-identical receipts cannot be combined.

This is stronger than a caller passing two matching dimension objects, but it is still not byte identity proof.

Therefore:

```text
same issued receipt object
!=
same pixel bytes independently verified
```

No image digest is introduced.

## Phase D provenance export

After both consumers acknowledge the same receipt, the bounded transform state can be converted into the existing Phase D orientation / mirror provenance contract.

Examples:

- EXIF absent -> `absent_or_not_required`;
- EXIF applied before receipt -> `present_transform_applied_before_both_pipelines`;
- explicit horizontal mirror true -> `mirrored`.

The evidence source becomes `capture_pipeline_attestation`, but `independentlyVerified` remains false.

## Privacy

The receipt contains and persists no:

- raw image bytes;
- image hash / digest;
- raw Florence polygon;
- raw FaceLandmarker landmarks;
- biometric embedding;
- identity template.

The receipt itself is intended as an ephemeral runtime capability.

## Remaining laterality blockers

Even with a complete transform chain, Phase G keeps:

- same pixel bytes not independently verified;
- controlled provider mirror-semantics empirical result not yet admitted;
- anatomical side mapping not reviewed.

Unknown EXIF application adds a fourth blocker.

## Authority boundary

Phase G does not authorize:

- anatomical laterality;
- ear validity;
- any numeric threshold;
- any pair-overlap acceptance;
- any traditional interpretation;
- Production.

## Next gate

1. execute the Phase F controlled mirror-pair harness and record scalar-only evidence;
2. review whether that one-fixture result is sufficient only for a bounded provider-behavior observation or whether additional controlled fixtures are required;
3. integrate this receipt into the actual shared preprocessing boundary before any anatomical-side mapping is proposed.

Watchtower-Track: face-observation-engine
