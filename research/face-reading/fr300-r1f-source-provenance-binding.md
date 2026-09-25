# FR300-R1F — RAP3DF V2 source provenance binding

Watchtower-Track: face-engine

## 1. Decision

FR300-R1E can derive a digest and statistics from actual supplied bytes, but it intentionally states:

`bytesAreRealRap3dfEvidenceByConstruction = false`.

FR300-R1F closes that engineering gap without fabricating a real dataset acquisition.

A byte artifact becomes **source-bound RAP3DF V2 evidence** only when its byte-derived SHA-256 and byte length agree with a captured official Mendeley Data public-file metadata receipt pinned to RAP3DF V2 version 4.

Source binding and metric-scale authority remain separate decisions.

## 2. Verified public interfaces

RAP3DF V2 official dataset page:

`https://data.mendeley.com/datasets/kpdkpcs8zb`

Pinned dataset authority:

`doi:10.17632/kpdkpcs8zb.4`

Digital Commons Data / Mendeley Data API documentation:

`https://data.mendeley.com/api/docs/`

The current API documentation describes public dataset file metadata with fields including:

- file id;
- filename;
- size;
- `content_details.sha256_hash`;
- download/view URLs.

The documentation also states that API traffic moved from `api.mendeley.com` to `https://api.data.mendeley.com` from 1 October 2024.

FR300-R1F therefore pins public-file metadata evidence to the current `api.data.mendeley.com` host.

## 3. Provenance binding inputs

The contract consumes:

1. an FR300-R1E byte-intake receipt;
2. a captured public-file metadata receipt.

The metadata receipt must identify:

- RAP3DF V2 dataset ref;
- dataset version 4;
- official dataset-page evidence;
- official public-file metadata evidence;
- actual metadata fetch having occurred;
- public file UUID;
- filename `depth_.data`;
- public metadata SHA-256;
- public metadata byte size.

## 4. Digest and size binding

FR300-R1E computes the artifact SHA-256 directly from supplied bytes.

FR300-R1F accepts the public metadata hash in either:

- 64 lowercase hexadecimal characters; or
- `sha256:<64 lowercase hexadecimal characters>`.

It normalizes the value and requires exact equality with the byte-derived FR300-R1E digest.

The public metadata size must also equal the actual byte length observed by FR300-R1E.

A digest or size mismatch blocks provenance.

## 5. URL strings are not fetch evidence

An official-looking URL is not enough.

The source metadata receipt contains an explicit `metadataActuallyFetched` field. If false, source binding is blocked even when the supplied URL uses the correct Mendeley API host.

This is a contract boundary for the future acquisition runner: it must set the field from an actual successful fetch, not from a prewritten URL.

## 6. Provenance and metric evidence are independent

Possible states are:

### `blocked`

The artifact is not source-bound because one or more provenance checks failed.

### `source_bound_metric_evidence_blocked`

The byte digest and size match captured official metadata, but FR300-R1E still lacks serialization/unit/native-depth evidence.

This is valid progress. It does not become metric authority.

### `source_bound_ready_for_metric_scale_adjudication`

The artifact is source-bound and the predecessor FR300-R1E inspection independently reached metric-scale adjudication readiness.

This still does not itself issue metric scale.

## 7. Fail-closed blockers

FR300-R1F blocks on:

- predecessor contract mismatch;
- metadata not actually fetched;
- dataset DOI mismatch;
- dataset version mismatch;
- unofficial dataset-page evidence host/path;
- unofficial public-file metadata evidence host/path;
- invalid public file UUID;
- filename other than `depth_.data`;
- invalid public SHA-256;
- digest mismatch;
- invalid public byte size;
- byte-size mismatch.

## 8. Current execution state

The implementation and tests do not claim a real acquisition:

```text
realRap3dfV2BytesRetrievedInCurrentExecution = false
realRap3dfV2PublicFileMetadataCaptured = false
realRap3dfV2SourceBindingIssued = false
realRap3dfV2MetricScaleIssued = false
realRap3dfV2CanonicalRegistrationIssued = false
realFR299BundleIssued = false
```

Synthetic fixtures prove contract behavior only.

## 9. Authority boundary

A successful FR300-R1F source binding does **not** prove:

- RAP3DF V2 serialization semantics;
- RAP3DF V2 physical value units;
- participant personality/privacy clearance;
- participant consent scope;
- canonical registration;
- FR266 or FR297 real annotation;
- FR298 real scalar;
- FR299 real bundle;
- RGB benchmark candidate;
- threshold;
- traditional binding;
- Production activation;
- Commerce activation.

Mendeley public-file metadata is provenance evidence, not serialization or unit evidence.

The V1 Data in Brief article is not promoted to V2 encoding authority.

Product materialization remains 18/29.

## 10. Next empirical frontier

The engineering path for a real sample is now:

```text
actual depth_.data bytes
  -> FR300-R1E byte-derived digest/statistics
  -> captured official Mendeley public-file metadata
  -> FR300-R1F digest/size provenance binding
  -> V2-specific serialization + unit adjudication
  -> FR300-R2 external canonical registration
```

FR300-R2 must remain blocked until a real source-bound artifact reaches the preceding evidence gates.

Watchtower-Track: face-engine

## FR300-R1F1 — anonymous public API route admission

The provenance validator now admits two exact HTTPS publisher route families for RAP3DF V2 file metadata:

- `api.data.mendeley.com/datasets/kpdkpcs8zb/files...`
- `data.mendeley.com/public-api/datasets/kpdkpcs8zb/files?...&version=4`

The anonymous route is not treated as weaker evidence merely because it is hosted below `data.mendeley.com`; it still requires `metadataActuallyFetched=true`, a valid file UUID, exact byte-derived SHA-256 equality and exact size equality.

Near-match hosts, a different dataset id, a non-V4 public-api query, HTTP, or a URL string without actual fetch evidence remain blocked.

This route admission does not change serialization, value-unit, participant-consent, canonical-registration, FR299, product, production or commerce authority.

Watchtower-Track: face-engine

