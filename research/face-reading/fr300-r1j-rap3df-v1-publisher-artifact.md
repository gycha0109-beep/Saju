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
