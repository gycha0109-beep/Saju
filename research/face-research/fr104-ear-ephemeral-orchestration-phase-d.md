# FR104 Phase D — Ephemeral candidate orchestration and orientation/mirror provenance

Issue: #1810

## Purpose

Phase D joins one Florence candidate and one FR257-derived face envelope into a single ephemeral descriptive bundle.

It also separates orientation and mirror provenance from image-space geometry so that screen-side evidence cannot silently become anatomical laterality.

## Input chain

```text
Florence candidate polygon
→ FR104 role-free shape evidence
→ FR257 ephemeral same-frame geometry
→ FR104 face-envelope adapter
→ FR104 face-relative evidence
→ explicit orientation / mirror provenance
→ bounded descriptive candidate bundle
```

## Same-frame status

The current binding remains:

`caller_attested_ephemeral_not_independently_verified`

Exact frame dimensions are required, but matching dimensions are not identity proof.

No image digest is introduced to strengthen this binding because the current privacy boundary forbids persisting private image-linked digests.

## Orientation provenance

Phase D records, separately:

- whether candidate and face geometry are attested to use the same decoded pixel orientation;
- EXIF-orientation handling state;
- evidence source for that EXIF state;
- front-camera mirror state;
- evidence source for the mirror state.

All of these remain not independently verified in Phase D.

A prior field such as `frontCameraMirrored: false` may therefore be recorded as provenance input, but it is not automatically treated as verified anatomical-side evidence.

## Laterality

Phase D always emits:

`anatomicalSide = unknown`

Blockers are explicit.

Unknown EXIF provenance adds:

`exif_orientation_provenance_unresolved`

Unknown mirror provenance adds:

`front_camera_mirror_provenance_unresolved`

Even when values are declared, laterality remains blocked by:

- same decoded pixel frame not independently verified;
- anatomical mapping not implemented.

The image-space horizontal sign is retained only as descriptive geometry and may not be called anatomical left/right.

## Output privacy

The orchestration result contains only bounded descriptive scalars and provenance flags.

It does not return or persist:

- source image;
- source image digest;
- raw Florence polygon;
- raw screen landmarks;
- raw metric landmarks;
- pose transform matrix.

## Authority boundary

Still not authorized:

- pair-overlap acceptance;
- shape cutoff;
- lateral-zone cutoff;
- plausibility classification;
- anatomical laterality;
- validated neutral runtime ear observation;
- traditional binding;
- Production.

## Next gate

A later phase may study a reviewed mapping from verified pixel-orientation / mirror provenance plus governed face geometry to anatomical side.

That mapping must be independently specified and tested. Florence prompt labels and image-space sign are not substitutes.

Watchtower-Track: face-observation-engine
