# FR104 Phase S — EXIF and explicit-transform reflection parity

Issue: #1810

## Purpose

FR104 needs a reflection-parity result, not a simplistic `horizontalMirrorApplied` boolean.

EXIF Orientation can itself encode a reflection. A frame with no explicit post-decode mirror is therefore not necessarily orientation-preserving relative to its intended display orientation.

## Source boundary

Current CIPA standards listing:

- `CIPA DC-008-Translation-2026`
- Exif Version 3.1
- published 2026-01-30
- https://www.cipa.jp/e/std/std-sec.html

The exact orientation-value reflection semantics used by this implementation are pinned to the directly readable CIPA witness:

- `CIPA DC-008-2012`
- Figure 12, relationship between coded image data and display orientation
- https://www.cipa.jp/std/documents/e/DC-008-2012_E.pdf

The project does not claim that the 2026 revision wording was independently byte-verified.

## Reflection classification

From the direct witness:

```text
1 preserving
2 reversing
3 preserving
4 reversing
5 reversing
6 preserving
7 reversing
8 preserving
```

Rotations are orientation-preserving.

Horizontal reversals are orientation-reversing.

## Two distinct parity questions

The runtime records both:

1. `encodedToDecodedAppliedParity`
   - what reflection parity was actually applied while producing the decoded receipt frame;

2. `decodedRelativeToIntendedDisplayParity`
   - whether the decoded receipt frame itself is reflected relative to the EXIF-defined intended display orientation.

Example: Orientation=2 with EXIF applied by the decoder means the decoder applied a reflection to the encoded bytes, but the resulting decoded frame is now orientation-preserving relative to intended display.

If Orientation=2 is preserved unapplied, the decoded frame remains reflection-reversing relative to intended display.

## Explicit transforms

Post-decode rotations of 0/90/180/270 do not change reflection parity.

An explicit horizontal mirror toggles it once.

The final value is:

```text
netReflectionParityRelativeToIntendedDisplay
  = orientation_preserving
  | orientation_reversing
  | unknown
```

If EXIF application is unknown, the result is `unknown`.

## Authority

This phase establishes transform parity only.

It does not resolve the Phase R side-semantic conflict and cannot authorize anatomical laterality.

Validated ear observation, traditional binding, and Production remain false.

Watchtower-Track: face-observation-engine