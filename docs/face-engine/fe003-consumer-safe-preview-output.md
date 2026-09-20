# FE003 — Consumer-safe preview output

## Scope

FE003 is an engine-output projection layer.

It consumes an FE002 runtime result and exposes only scalar neutral observables and availability receipts needed by a preview consumer. It does not perform new physiognomy research or validation.

## Output contract

The projection contains:

- provider run reference;
- canonical asset digest;
- deterministic flat scalar metric list;
- region availability;
- explicit data/authority boundary receipts.

Metric ordering is deterministic by region and metric reference.

## Data minimization

FE003 intentionally does not expose:

- raw landmarks;
- lower-face contour point arrays;
- lips contour point arrays;
- provider vertex indices;
- biometric embeddings.

FR216 lower-face contour therefore contributes only availability at this boundary. A scalar derived from that contour can be added only after an upstream metric is separately issued.

## Region mapping

- `eye_pair`: FR210 scalar axes + FR215 asymmetry axes;
- `cheek_mid_face`: FR211 width + FR217 visible contour prominence;
- `mouth_lips`: FR212 corner orientation + FR214 outline angularity;
- `chin_lower_face`: FR213 visible width; FR216 availability only.

Unavailable optional surfaces are not replaced by synthetic values.

## Authority

FE003 issues no:

- classification;
- score or rank;
- traditional interpretation;
- physiognomy claim;
- fortune claim;
- Production or Commerce activation.

The frozen package `index.ts` remains unchanged.
