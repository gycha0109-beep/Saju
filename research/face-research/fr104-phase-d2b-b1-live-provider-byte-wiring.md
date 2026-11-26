# FR104 Phase D2B-B1 — Live Provider Byte Invocation Wiring

Watchtower-Track: face-observation-engine

## Scope

This phase wires the existing D2B exact captured-frame byte provenance bridge into a single FR104 provider-invocation choke point.

The phase is intentionally limited to byte-origin provenance and provider invocation mechanics.

It does not authorize:

- subject-relative mirror provenance;
- anatomical laterality;
- validated external-ear observation;
- traditional physiognomy binding;
- production use.

## Repository baseline

Branch start:

```text
main@ac89844e9730ea546d98eef2a15a3b3c19da3b5a
```

D2B-A already provided:

```text
exact issued Mesh6H frame object
-> ephemeral byte materialization
-> Florence byte boundary
-> FaceLandmarker byte boundary
-> exact frame/profile byte binding
```

The remaining generic runtime blocker was:

```text
runtime_byte_bridge_not_yet_integrated_into_fr104_ear_provider_invocation
```

## Audit result before implementation

The repository has a native TypeScript MediaPipe FaceLandmarker runtime:

```text
packages/face-reading/src/mediapipe-face-landmarker-runtime-fr26.ts
```

The FR104 Florence external-ear candidate runtime is still a local Python empirical runner:

```text
tools/face-reading/ear/run_florence2_ear_empirical.py
```

There is no repository-native browser/TypeScript live Florence transport today.

Therefore this phase must not claim a native Florence runtime that does not exist.

## 1. Provider byte adapters

New module:

```text
neutral-ear-provider-byte-adapters-fr104.ts
```

### Florence

The Florence adapter accepts exact RGBA8 bytes and invokes an explicit external host port.

Boundary:

```text
repositoryNativeFlorenceRuntimeImplemented = false
externalHostInvokerRequired = true
additionalHorizontalMirrorApplied = false
additionalRotationApplied = false
promptSideUsedAsAnatomicalSide = false
```

The adapter returns only a bounded candidate summary:

- left/right prompt status;
- candidate counts;
- no raw provider response;
- no raw polygon bundle;
- no anatomical-side authority.

The external host cannot mutate the provided consumer-byte copy.

### FaceLandmarker

The FaceLandmarker adapter accepts the same RGBA8 byte origin and constructs an in-memory image source without mirror or rotation.

It invokes the existing FR26 runtime factory.

Returned information is limited to:

```text
providerRunRef
faceCount
```

Raw landmarks and the raw provider response are not returned by the adapter.

## 2. Exact RGBA contract

The live provider path requires:

```text
byteLength == width * height * 4
```

The bytes are interpreted only as the B1 RGBA8 consumer boundary.

This phase does not redefine FR19 orientation authority and does not infer mirror state from RGBA layout.

## 3. Live provider invocation choke point

New module:

```text
neutral-ear-live-provider-byte-runtime-fr104.ts
```

Flow:

```text
exact issued Mesh6H frame
  -> D2B ephemeral byte session
  -> Florence issued byte adapter
  -> FaceLandmarker issued byte adapter
  -> exact dual-consumer byte evidence
  -> controlled-capture runtime byte/profile binding
```

Structurally copied provider adapters are rejected.

The runtime result is object-identity bound to:

- exact Mesh6H handle;
- exact Mesh6H frame;
- exact Florence adapter;
- exact FaceLandmarker adapter.

Direct raw-frame provider invocation is not part of this controlled path.

## 4. Failure cleanup

The D2B byte session now exposes an explicit abort path.

If either provider invocation fails:

```text
consumer copy -> zeroed
source byte copy -> zeroed
source digest -> zeroed
consumer digests -> zeroed
session -> finalized/closed
```

This closes the prior failure-path lifetime gap where source bytes could otherwise remain in the session closure until garbage collection.

## 5. Blocker transition

The old generic blocker:

```text
runtime_byte_bridge_not_yet_integrated_into_fr104_ear_provider_invocation
```

is removed.

It is replaced by narrower factual blockers:

```text
florence_repository_native_live_host_transport_not_implemented
provider_outputs_not_yet_composed_into_fr104_candidate_orchestration
```

The FR21b empirical blocker remains:

```text
fr21b_front_rear_deterministic_asymmetric_calibration_not_executed
```

## 6. Authority remains closed

Even after both provider invocation boundaries run from the same materialized RGBA origin:

```text
providerOutputCandidateCompositionAuthorized = false
subjectRelativeMirrorProvenanceAuthorized = false
anatomicalLateralityAuthorized = false
validatedExternalEarObservationAuthorized = false
traditionalBindingAuthorized = false
productionAuthorization = false
```

Provider invocation provenance is not ear validity or laterality authority.

## 7. CI

The Face Reading CI now runs dedicated FR104 checks for:

- exact captured-frame consumer-byte provenance;
- controlled-capture runtime byte binding;
- provider byte adapters and live invocation gate.

## Exit conditions

### A — provider byte choke point

Satisfied when the exact Mesh6H materialized RGBA origin is forced through both issued provider adapters and dual-consumer equality evidence finalizes.

### B — failure cleanup

Satisfied when provider failure explicitly zeroes bridge-owned ephemeral bytes and digest state.

### C — authority

Must remain closed until later gates.

## Next gate

The next implementation must not pretend the external Florence host port is a repository-native runtime.

It should either:

1. implement a bounded repository-native local Florence transport that consumes the exact RGBA payload without file persistence, or
2. keep that transport external and preserve the blocker.

After that, provider outputs may be composed into the FR104 candidate-orchestration path.

FR21b deterministic asymmetric front/rear calibration remains a separate empirical gate.
