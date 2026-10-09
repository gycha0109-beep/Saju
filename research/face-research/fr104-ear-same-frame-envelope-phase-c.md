# FR104 Phase C — Ephemeral same-frame face-envelope adapter

Issue: #1810

## Purpose

Phase B defined descriptive candidate-shape and face-relative evidence but intentionally required a governed same-frame face-envelope adapter.

Phase C materializes that bounded adapter from the already-existing FR257 ephemeral geometry observation.

## Reused source

`FR257EphemeralGeometryObservation` already exposes, inside an ephemeral observer call:

- `providerRunRef`;
- 468 normalized screen landmarks;
- 468 metric landmarks;
- pose transform;
- frame width / height.

Phase C consumes only the normalized screen-landmark XY values required to derive a face-envelope bounding box.

It does not persist or return the landmark array.

## Same-frame boundary

The Florence candidate path and FR257 path do not yet share an independently verified source-identity receipt.

The adapter therefore requires:

- exact candidate-frame width / height equality with the FR257 frame;
- an explicit caller same-frame attestation.

The resulting binding remains:

`caller_attested_ephemeral_not_independently_verified`

Frame dimension equality is not promoted to proof of source identity.

## Output

The adapter returns only:

- provider run ref;
- frame dimensions;
- normalized face-envelope min/max bounds;
- bounded provenance and authority flags.

It does not return:

- raw screen landmarks;
- raw metric landmarks;
- pose matrix;
- raw candidate polygon;
- image digest.

## Orientation and mirror

This adapter does **not** resolve:

- EXIF orientation;
- decoded pixel-orientation provenance;
- front-camera mirror state;
- anatomical laterality.

The face envelope can support descriptive central-vs-lateral evidence in the current normalized image frame, but it cannot establish anatomical side.

## Authority boundary

Still unauthorized:

- calling the face envelope an ear zone;
- calling face-relative evidence an ear plausibility decision;
- numeric acceptance thresholds;
- anatomical laterality;
- validated neutral runtime ear observation;
- traditional binding;
- Production.

## Next gate

Bind one Florence candidate and one FR257-derived face envelope in a single ephemeral orchestration path, then add pose/orientation provenance without persisting raw geometry.

Watchtower-Track: face-observation-engine
