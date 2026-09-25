# FR300-R1M — RAP3DF V1 matched creator-render byte-order adjudication

Watchtower-Track: face-engine

## Purpose

FR300-R1L binds the released V1 depth scalar container to the creator's historical `uint16_t` writer/reader path, but that writer emits host-native memory and therefore does not name little- or big-endian explicitly.

FR300-R1M attempts to resolve byte order without numeric plausibility by authenticating a matched publisher pair from one exact V1 folder:

- `k1_box_xyz_depth.data`
- `k1_box_xyz_depth_view.bmp`

## Creator render relationship

The creator's historical V1 path builds the depth-view input pixel from the same stored scalar:

```text
pixelVec = [depth & 0xff, depth >> 8, 0]
```

and `WriteBMPFile` swaps those channels into raw 24-bit bitmap input:

```text
pixels[i+2] = pixelVec[i+0]
pixels[i+1] = pixelVec[i+1]
pixels[i+0] = pixelVec[i+2]
```

For the saved BMP's BGR pixel storage, the expected relation is therefore:

```text
B = 0
G = high byte of creator uint16 scalar
R = low byte of creator uint16 scalar
```

The workflow parses BMP row orientation and row padding explicitly, then evaluates both raw-byte-order hypotheses against every pixel.

## Admission rule

An endian may be selected only if exactly one hypothesis reproduces the authenticated creator render relationship across the complete image and has at least one informative nonzero pixel.

Numeric magnitude, range plausibility, or expected human depth values are not used.

## Privacy and retention

Raw depth and BMP volunteer bytes exist only on the ephemeral GitHub runner. Only publisher UUID/digest/size receipts, BMP structural metadata, aggregate match counts, and the byte-order adjudication are retained.

## Remaining boundary

Even a successful byte-order result does not restore physical metric semantics. FR300-R1L identified that the historical collection path stores `context->depth2->data[i+2]` into the `uint16_t` container. Physical-unit and native-Kinect-distance equivalence therefore remain separate questions.

FR299, FR300-R2, production, commerce, and the next product column remain blocked. Product materialization remains 18/29.

Watchtower-Track: face-engine


## First matched-pair execution

The first publisher-authenticated execution resolved byte order uniquely.

Matched pair:

- raw depth: `k1_box_xyz_depth.data`, 35,462 bytes;
- creator depth view: `k1_box_xyz_depth_view.bmp`, 53,694 bytes;
- both publisher/local SHA-256 and size checks passed;
- BMP: 119 × 149, 24-bit, uncompressed, 360-byte row stride, bottom-up storage.

Render-relation result:

```text
little-endian:
  complete pixels matched       17,731 / 17,731
  informative pixels matched     8,574 / 8,574

big-endian:
  complete pixels matched        9,157 / 17,731
  informative pixels matched         0 / 8,574
```

The 9,157 big-endian complete matches are zero-valued/background pixels and therefore carry no byte-order information. Across every informative nonzero pixel, only little-endian reproduces the creator's authenticated depth-view relationship.

FR300-R1M therefore admits:

- released V1 scalar container: `uint16_t`;
- released V1 byte order: **little-endian**;
- byte-order authority: `matched_creator_render_relationship`;
- numeric plausibility used for selection: false.

Physical metric semantics remain blocked. The collection source still requires separate adjudication of `context->depth2->data[i+2]`; resolving little-endian does not make that stored byte-derived scalar a millimeter/centimeter/meter distance.

The frozen receipt is `research/face-reading/evidence/fr300-r1m-rap3df-v1-render-endian.json`.

FR299, FR300-R2, production, commerce, and the next product column remain blocked. Product materialization remains 18/29.

Watchtower-Track: face-engine
