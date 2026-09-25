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
