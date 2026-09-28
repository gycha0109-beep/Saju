# FR104 Phase B — Role-free candidate shape and face-relative evidence

Issue: #1810

## Purpose

Phase A froze the existing geometry reuse boundary. Phase B adds **descriptive evidence only** for two failure families exposed by FR103:

1. a non-zero near-line / occluder-edge polygon that passes exact-degeneracy rejection;
2. a non-degenerate candidate located near the central face despite no visible ear.

No empirical acceptance threshold is introduced.

## Candidate shape evidence

The new contract operates in `canonical_image_normalized_2d` and records:

- candidate bbox;
- point-mean centroid, matching the existing FR103 runner convention;
- polygon area;
- perimeter;
- bbox short-side / long-side ratio;
- polygon area / bbox area ratio;
- `4π × area / perimeter²` as a role-free compactness descriptor.

These are continuous descriptors only.

They do not mean:

- ear / not-ear;
- visible / unusable;
- accepted / rejected;
- anatomical left / right.

Exact zero-width, zero-height, or zero-area geometry still fails closed before descriptive evidence is issued.

## Face-relative evidence contract

The face-relative contract consumes an explicit normalized face envelope only when the caller supplies the provenance state:

`governed_same_frame_face_geometry_adapter_required`

and the current same-frame binding state:

`caller_attested_ephemeral_not_independently_verified`.

It records:

- signed candidate-centroid X offset from the face-box center, normalized by face width;
- absolute X offset;
- Y offset normalized by face height;
- candidate bbox width / face width;
- candidate bbox height / face height;
- candidate polygon area / face-box area;
- image-space horizontal sign.

The image-space sign is explicitly **not anatomical laterality**.

No central/lateral classification is emitted and no lateral-zone cutoff exists.

## Why the adapter is still required

FR257 already has ephemeral same-frame screen landmarks plus governed pose evidence, but its published scalar output retains only face-box width / height / area rather than the face-box bounds needed for candidate-relative coordinates.

Phase B therefore does not silently manufacture a new persisted face-box authority.

The next implementation gate is a dedicated ephemeral adapter that derives the normalized face envelope from the existing governed same-frame geometry path and binds it to the Florence candidate without persisting raw landmarks or raw user polygons.

## Authority boundary

Phase B authorizes only descriptive research evidence.

Still false / unresolved:

- automatic shape rejection threshold;
- automatic lateral-zone threshold;
- plausibility classification;
- anatomical laterality;
- validated neutral ear observation;
- traditional binding;
- Production.

No user image, overlay, private image digest, or user-derived polygon fixture is committed.

Watchtower-Track: face-observation-engine
