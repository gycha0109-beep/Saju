# FR300-R1O — RAP3DF V2 exact official Mendeley V4 archive identity

Watchtower-Track: face-engine

## Purpose

FR300-R1N removes RAP3DF V1 from the metric-reference path because its released scalar does not preserve physical depth semantics.

FR300-R1O returns to FR300-R1H priority 2: determine whether the previously inspected RAP3DF V2 archive is byte-identical to an official Mendeley V4 publisher artifact.

## Prior archive receipt

Previously inspected V4 archive:

- byte size: `66,792,678`;
- SHA-256: `92a967bdacba4a7e5d387232f2d3308ad656022953c0139f615def2f607ccc5e`.

Those values are not treated as official identity until Mendeley V4 metadata independently binds the same size and digest.

## Acquisition boundary

The workflow queries only anonymous Mendeley public metadata for dataset `kpdkpcs8zb`, version 4. It scans opaque folder ids and records only compact publisher file identity metadata.

No volunteer image/depth bytes are downloaded by this task.

## Admission rule

Official archive identity is bound only if exactly one completed publisher file has both:

- size `66,792,678` bytes; and
- SHA-256 `92a967bdacba4a7e5d387232f2d3308ad656022953c0139f615def2f607ccc5e`.

A size-only or digest-only match is insufficient.

## Boundary

Even a successful exact archive identity match does not by itself repair the FR300-R1G creator-pipeline metric conflict and does not establish participant commercial-product consent.

FR299, FR300-R2, production, commerce, and the next product column remain blocked unless those independent gates are resolved.

Product materialization remains 18/29. The metadata gate is fail-closed: no unique digest+size match means no identity promotion.

Watchtower-Track: face-engine


## First execution correction

The first implementation attempted to locate the 66,792,678-byte convenience ZIP as a normal publisher file record. Mendeley V4 exposes a large folder tree instead, so scanning arbitrary folders for a ZIP hit exceeded the bounded request limit and correctly failed closed.

FR300-R1O was corrected to bind the **V4 content anchor** rather than pretending the generated download container must have a normal file record.

The corrected gate:

- finds the unique publisher `V2` root folder;
- reads only that root's file metadata;
- binds `database.json` against the independently pinned V4 identity:
  - size `273,343` bytes;
  - SHA-256 `1366f0496078a250b43bafffc3483d3f949c33afb32520a041d92d353598e3ea`;
- separately reports whether the convenience archive digest is represented as a V2-root publisher file.

This distinction matters: dataset-content identity and generated archive-container identity are not silently conflated.

Watchtower-Track: face-engine
