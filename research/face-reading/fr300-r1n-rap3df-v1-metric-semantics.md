# FR300-R1N — RAP3DF V1 stored metric semantics adjudication

Watchtower-Track: face-engine

## Decision

RAP3DF V1 is now **rejected as a metric reference** for FR299 / FR300-R2.

This is not because its numeric range looks implausible. It is because the first-party collection source does not serialize the Kinect depth float as a numeric depth value.

## Creator path

Pinned creator source immediately before the reported collection window:

- repository: `Piemontez/rap3df-database`;
- commit: `8049e3f576003ae7b190f99f2b855f0f70beb22e`;
- `main.cpp` blob: `d0843d0029e946ae65182a5788014c180dd5e2a5`.

The V1 extraction path performs:

```cpp
uint16_t depth = context->depth2->data[i+2];
```

and later stores that value in `context->depthInBoxXYZ`, which FR300-R1L proved is serialized as a raw `uint16_t`.

The important point is the static type of `Frame::data`: it is an `unsigned char*`. Therefore `data[i+2]` selects one byte from frame storage. It is not a typed dereference of the depth float and it is not a numeric float-to-`uint16_t` conversion.

## Historical upstream witness

The nearest libfreenect2 commit before the reported collection start is:

`93769abc75654888a6848e2520c50f1f952ce72e` — 2017-09-16.

Its `include/libfreenect2/frame_listener.hpp` blob `1b0bda1341cf1584bc8a3a064102e2f6d09fbf70` defines:

- `Frame::Depth`: 512 × 424 **float**, unit **millimeter**;
- float format: **4 bytes per pixel**;
- `Frame::data`: `unsigned char*`.

Its registration implementation also treats depth storage as `float*` and divides the depth value by 1000 when converting millimeters to meters for XYZ geometry.

The creator project does not pin an exact libfreenect2 revision, so FR300-R1N does not claim that this upstream commit is the exact binary dependency used on every collection day. It is a temporally appropriate upstream API witness.

## Why the released scalar has no metric unit

A millimeter unit belongs to the **logical float value** represented by four bytes.

The creator path does not read that float. It indexes the byte buffer and selects one representation byte:

```text
4-byte logical depth float in millimeters
        ↓
unsigned-char storage
        ↓
data[i+2]
        ↓
one byte only
        ↓
zero-extended into uint16_t
        ↓
written as 2-byte little-endian scalar
```

FR300-R1M proved the final released `uint16_t` byte order is little-endian from the matched creator-render relationship. That does not restore the discarded float bytes or their numeric value.

Therefore assigning `millimeter`, `centimeter`, or `meter` to the released scalar would be a category error. The released value is a byte-derived representation artifact, not an authoritative physical distance scalar.

## Disposition

Admitted:

- publisher provenance;
- 119 × 149 shape;
- `uint16_t` released container;
- little-endian released byte order;
- non-metric structural/render research use.

Rejected for the metric path:

- physical depth unit;
- native Kinect depth equivalence;
- metric nose-distance reference;
- real FR299 eligibility;
- FR300-R2 eligibility.

RAP3DF V1 should therefore leave the FR300 metric-reference candidate path. The next FR300 research step should pivot to another independent 3D source whose released geometry preserves explicit metric semantics.

Product materialization remains 18/29.

Watchtower-Track: face-engine
