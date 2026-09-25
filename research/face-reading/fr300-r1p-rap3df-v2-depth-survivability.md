# FR300-R1P — RAP3DF V2 official depth metric survivability

Watchtower-Track: face-engine

## Purpose

FR300-R1O established an exact official Mendeley V4 content anchor: the publisher's `V2/database.json` has the same SHA-256 and byte size as the pinned creator V2 database.

FR300-R1P now asks whether official V4 depth artifacts themselves are byte-identical to creator-repository artifacts whose acquisition lineage is already known to collapse a four-byte libfreenect2 depth pixel to `data[i+2]` and widen that one byte into `uint16_t`.

## Why per-artifact identity is stronger than the old archive assumption

FR300-R1O did not find the previously inspected aggregate archive-container digest as a V2-root publisher file. It therefore did not pretend that the container itself was publisher-bound.

R1P instead uses the official dataset's own file metadata and the exact V4 `database.json` content anchor. For five creator-pinned frontal depth files it:

1. fetches the file bytes from the pinned creator commit;
2. verifies each creator Git blob identity locally;
3. computes SHA-256 over those creator bytes;
4. resolves the corresponding subject folder and filename in Mendeley V4 publisher metadata;
5. compares publisher SHA-256 and byte size to the creator receipt.

Official participant depth bytes are not downloaded by this workflow. Publisher metadata is sufficient for exact identity when its digest matches the independently hashed creator bytes.

## Pinned creator samples

The five samples are the same cross-subject artifacts already admitted by FR300-R1G:

- `P6HF7NR/depth_bgRm_VRO.data`
- `M8D6FNE/depth_bgRm_XQ2.data`
- `5SSCKOW/depth_bgRm_S5F.data`
- `FC6KAXU/depth_bgRm_2XS.data`
- `CPUR8VH/depth_bgRm_V5J.data`

Each creator artifact is expected to be 35,462 bytes, i.e. `119 × 149 × 2`.

## Admission rule

The strongest R1P state, `official_v4_creator_bytes_exactly_bound`, requires all five independent subject samples to satisfy:

```text
creator pinned Git blob identity
AND creator byte length = 35,462
AND publisher filename identity
AND publisher byte length = creator byte length
AND publisher SHA-256 = independently computed creator SHA-256
```

A filename-only, size-only, or numeric-range match is insufficient.

## Metric consequence

FR300-R1G already proves the creator acquisition lineage:

```text
libfreenect2 four-byte float depth surface
  -> context->_depth->data[i+2]
  -> one selected byte
  -> uint16_t widening
  -> 119 × 149 × 2 depth_data_with_bg artifact
```

If official V4 publisher artifacts are byte-identical to those creator artifacts, generic Kinect millimeter semantics cannot be transferred to the released scalar. The metric information was discarded before serialization.

In that case R1P freezes:

```text
creatorSingleByteProjectionLineageBound = true
metricDepthRecoverability = destroyed_by_single_byte_projection
metricReferenceDisposition = rejected_for_metric_reference
realFR299BundleEligible = false
fr300R2Eligible = false
```

## Rights and product boundary

This is a technical provenance adjudication only. It does not establish participant commercial-product consent.

No new product column is materialized. Global product materialization remains 18/29.

Watchtower-Track: face-engine
