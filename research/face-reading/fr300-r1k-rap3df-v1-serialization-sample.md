# FR300-R1K — RAP3DF V1 publisher serialization bounded sample

Watchtower-Track: face-engine

## Purpose

FR300-R1J authenticated one exact Mendeley V3 `k1_box_xyz_depth.data` artifact at 35,462 bytes. That equals 119 × 149 × 2, while the V1 article prose describes `data` values as 8-byte floating point.

FR300-R1K tests whether the 35,462-byte structure reproduces across a bounded set of distinct publisher folders before any attempt is made to explain the serialization discrepancy.

## Sampling contract

The runner:

- uses only Mendeley dataset `kpdkpcs8zb`, version 3;
- sorts opaque publisher folder ids deterministically;
- selects at most one exact `k1_box_xyz_depth.raw|data` file per folder;
- targets 12 distinct publisher folders and requires at least 8;
- downloads each selected artifact sequentially;
- rejects any selected file above 1 MiB;
- verifies publisher SHA-256 and byte size against local bytes;
- retains only compact receipts and aggregate structural observations;
- never commits or uploads volunteer depth bytes.

The raw artifacts exist only on the ephemeral GitHub runner.

## Structural observations allowed

The evidence may report:

- exact authenticated byte length;
- exact equality or variation across the sample;
- divisibility by the article pixel count 17,731;
- arithmetic bytes-per-article-pixel;
- remainder under the rejected float64 candidate shape.

These are structural observations, not serialization authority.

## Authority boundary

Even if every sampled artifact is exactly 35,462 bytes, FR300-R1K does not infer:

- uint16;
- signed or unsigned integer encoding;
- little- or big-endian byte order;
- millimeter, centimeter, meter, or another physical unit;
- RGB/depth canonical registration;
- participant commercial-product permission.

Those require independent first-party serialization/metric evidence.

FR300-R2, real FR299, production, commerce, and the next product column remain blocked. Product materialization remains 18/29.

## Evidence follow-up

After the bounded publisher sample is authenticated, the result should be frozen as compact repository evidence. A separate source audit must then seek first-party V1 writer/decoder/specification evidence that explains the released 2-byte-per-pixel structure, if that structure is reproduced.

Watchtower-Track: face-engine
