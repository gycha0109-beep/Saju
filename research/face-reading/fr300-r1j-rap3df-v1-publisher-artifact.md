# FR300-R1J — RAP3DF V1 exact publisher artifact acquisition

Watchtower-Track: face-engine

## Purpose

FR300-R1I established a fail-closed byte contract for the V1 depth representation but intentionally contained no real volunteer bytes.

FR300-R1J performs one bounded publisher-side acquisition so the track can determine whether a real Mendeley V1 depth artifact satisfies the article-bound 119 × 149 × 8-byte candidate shape.

## Acquisition boundary

The acquisition runner:

- queries only the Mendeley anonymous public API for dataset `kpdkpcs8zb`, version 3;
- scans folder metadata without printing participant folder names;
- selects only the exact frontal depth stem `k1_box_xyz_depth.raw` or `k1_box_xyz_depth.data`;
- downloads at most one selected artifact;
- rejects artifacts above 1 MiB;
- accepts only a publisher `downloads.mendeley.com` download URL;
- verifies publisher SHA-256 and size against the downloaded bytes;
- passes the bytes directly into FR300-R1I;
- deletes the bytes with the ephemeral GitHub runner;
- retains only a sanitized JSON evidence receipt.

No face image or depth bytes are committed to Git or uploaded as a workflow artifact.

## Selection rule

Folder traversal is deterministic by opaque folder id, beginning with the publisher `root` folder. The first folder exposing the exact frontal depth filename is selected.

This rule is intended only to obtain one representative publisher-authenticated artifact. It does not assert that all 267 V1 samples have identical byte structure.

## Fail-closed authority

A successful byte authentication can establish only:

- exact publisher provenance for the selected file;
- exact selected-file byte length and SHA-256;
- the FR300-R1I dual-endian descriptive statistics;
- whether the selected file matches the article-bound 141,848-byte candidate shape.

It does not establish:

- little- or big-endian authority;
- millimeter, centimeter or meter authority;
- canonical RGB/depth registration;
- participant commercial-product permission;
- a real FR299 bundle;
- FR300-R2;
- production or commerce authority.

Numeric plausibility is never used to choose byte order or physical units.

## Execution artifact

The PR workflow emits:

`.fr300-r1j-evidence/rap3df-v1-publisher-artifact.json`

Only this sanitized JSON is uploaded as a short-retention workflow artifact.

If the publisher API cannot be reached, metadata is ambiguous, a file is oversized, or publisher digest/size verification fails, the workflow fails closed rather than manufacturing evidence.

Product materialization remains 18/29.

Watchtower-Track: face-engine

## First real publisher execution

The bounded acquisition succeeded against Mendeley V3 publisher metadata.

Selected artifact:

- file UUID: `bd54dc2a-b810-4ac1-8f7c-7bcbf5b00085`;
- filename: `k1_box_xyz_depth.data`;
- publisher/local SHA-256: `bdaa756600ad3539b7a3d0de7725123bc94e11ed974c775cd11aa3a02b45feb3`;
- publisher/local byte size: `35,462`;
- digest equality: verified;
- size equality: verified;
- source provenance: `source_bound`.

This result directly contradicts the FR300-R1I article-bound 8-byte-float candidate shape:

```text
article-bound candidate:
119 × 149 × 8 = 141,848 bytes

authenticated publisher artifact:
35,462 bytes = 119 × 149 × 2
```

The equality to two bytes per article pixel is a structural observation only. It does **not** by itself authorize a uint16 interpretation, byte order, or physical unit.

FR300-R1I therefore correctly returns:

- `serializationStatus = blocked`;
- `endiannessStatus = blocked`;
- `physicalUnitStatus = blocked`;
- `metricAdjudicationStatus = blocked`;
- blocker `expected_float64_shape_mismatch`.

The float64 descriptive views are non-authoritative under this shape mismatch. In particular, the 35,462-byte artifact is not divisible by eight, so a float64 interpretation leaves six trailing bytes.

The next evidence task is FR300-R1K: reproduce the 35,462-byte structure across a bounded multi-file sample and adjudicate the publisher/article serialization discrepancy without guessing uint16, endianness or metric units.

Product materialization remains 18/29.

Watchtower-Track: face-engine

