# FR104 Phase D2B-B2 — Florence Live Transport

Watchtower-Track: face-observation-engine

## Scope

This phase implements the repository-native transport path required to move the
FR104 Florence provider from file-oriented empirical execution toward the live
Mesh6H/B1 byte-origin runtime.

It does not compose Florence candidates with FaceLandmarker geometry yet.

It does not authorize anatomical laterality, validated external-ear observation,
traditional interpretation, or production use.

## Baseline

Branch start:

```text
main@e7fb79242c0229e65999c39abfdd10d545bc7b98
```

Predecessor:

- PR #2052
- merge SHA `91152eed2a1988dcdc3fac6f80a3142ae19c18b5`

B1 already established:

```text
exact issued Mesh6H frame
-> exact materialized RGBA origin
-> Florence host-port byte boundary
-> FaceLandmarker runtime byte boundary
```

The remaining Florence-specific blocker was:

```text
florence_repository_native_live_host_transport_not_implemented
```

## 1. Persistent Python Florence worker

New worker:

```text
tools/face-reading/ear/run_florence2_ear_live_worker.py
```

The worker imports and reuses the existing FR103 empirical runner model pins,
prompt execution, polygon normalization, and exact degeneracy rejection.

It does not create a second Florence interpretation policy.

The model is loaded once per worker process.

Transport framing:

```text
4-byte big-endian JSON-header length
JSON request header
exact RGBA8 bytes
```

Response framing:

```text
4-byte big-endian JSON-response length
sanitized JSON response
```

The request requires:

```text
pixelFormat = rgba8
byteLength = width * height * 4
maximum payload = 32 MiB
```

The worker does not require a temporary image file.

The live path constructs the in-memory PIL image from exact RGBA bytes.

## 2. Sanitized worker response

The worker does not return:

- generated model text;
- raw parsed Florence provider response;
- source-image digest;
- raw RGBA;
- provider-side anatomical authority.

It returns only ephemeral normalized candidate geometry after exact structural
degeneracy rejection.

Candidate points use:

```text
canonical_image_normalized_2d
```

The Florence prompt provenance remains explicit:

```text
left prompt != anatomical left
right prompt != anatomical right
```

No numeric acceptance threshold is introduced.

## 3. Node persistent worker bridge

New bridge:

```text
scripts/fr104-florence-live-worker-bridge.mjs
```

Responsibilities:

1. lazily start the Python worker;
2. keep the worker process alive across frame requests;
3. frame exact RGBA requests;
4. parse bounded worker responses;
5. reject malformed privacy/authority payloads;
6. fail pending requests if the worker crashes;
7. keep all media transport in memory.

The bridge itself persists no image bytes or image digest.

## 4. Existing MESH6J host extended

Existing server:

```text
scripts/mesh6j-manual-browser-capture-preview.mjs
```

gains one bounded endpoint:

```text
POST /runtime/fr104/florence
content-type: application/octet-stream
```

Required request headers:

```text
x-fr104-schema-version = fr104-florence-live-http-v1
x-fr104-provider-run-ref
x-fr104-width
x-fr104-height
```

All non-FR104 routes keep the prior GET-only behavior.

The live Florence endpoint is disabled by default.

It is enabled only when:

```text
FR104_FLORENCE_LIVE=1
```

Therefore CI/smoke does not download or execute Florence model weights.

## 5. Browser host transport

New module:

```text
packages/face-reading/src/neutral-ear-florence-live-host-transport-fr104.ts
```

The browser-side host invoker:

```text
exact B1 RGBA Uint8Array
-> same-origin POST
-> sanitized live worker response
-> B1 Florence summary
```

The public B1 result still returns only:

- prompt status;
- candidate count;
- no polygon bundle.

The actual normalized candidate geometry is stored behind an issued opaque
handle.

```text
NeutralEarFlorenceCandidateSetHandleFR104V1
```

The handle contains only:

- providerRunRef;
- frame dimensions;
- candidate counts.

It contains no candidate points.

Candidate geometry can be consumed only once through the issued handle.

Structurally forged handles are rejected.

A separate discard path clears pending candidate geometry when later
orchestration aborts before consumption.

## 6. Privacy boundary

B2 preserves:

```text
raw RGBA persistence = false
raw provider response persistence = false
generated Florence text return = false
source image digest computation = false
raw polygon bundle on public B1 result = false
raw polygon points on opaque handle = false
embedding/template generation = false
```

Candidate geometry exists only as ephemeral in-memory state needed for the next
FR104 composition gate.

## 7. Authority boundary

Still false:

```text
subjectRelativeMirrorProvenanceAuthorized
anatomicalLateralityAuthorized
validatedExternalEarObservationAuthorized
traditionalBindingAuthorized
productionAuthorization
```

B2 proves transport mechanics only.

It does not prove that a Florence candidate is an ear.

It does not infer subject-relative anatomical side from prompt names, image X,
camera facing, preview mirror, or provider labels.

## 8. Readiness transition

Cleared:

```text
florence_repository_native_live_host_transport_not_implemented
```

Still active:

```text
provider_outputs_not_yet_composed_into_fr104_candidate_orchestration
fr21b_front_rear_deterministic_asymmetric_calibration_not_executed
subject_relative_source_pixel_mirror_provenance_not_verified
verified_controlled_capture_profile_not_available
runtime_anatomical_side_mapping_not_admitted
```

## 9. CI

CI verifies without model download:

- Python live-worker protocol self-test;
- Node worker-framing self-test;
- TypeScript same-origin transport tests;
- MESH6J syntax and localhost/LAN smoke;
- existing Face Reading regression suite.

## Exit conditions

### A — transport

```text
exact RGBA8
-> repository same-origin endpoint
-> persistent Python Florence worker
-> sanitized response
```

implemented.

### B — no file fallback

No temporary image file is required by the live path.

### C — ephemeral provider geometry

Candidate polygons are hidden behind an issued one-time opaque handle and have
an explicit discard path.

### D — authority

All anatomical/traditional/production authority remains closed.

## Next gate

D2B-B3 must bind:

```text
issued B1 live runtime result
+ issued Florence candidate-set handle
+ same-runtime FaceLandmarker geometry handle
+ exact providerRunRef/frame identity
```

into the existing FR104 descriptive candidate orchestration.

No candidate selection threshold and no anatomical side assignment may be
introduced in B3.
