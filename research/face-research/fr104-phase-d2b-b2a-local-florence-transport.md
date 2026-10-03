# FR104 Phase D2B-B2A — Repository-Native Local Florence Transport

Watchtower-Track: face-observation-engine

## Scope

This phase implements the previously missing repository-native local transport between the exact FR104 RGBA consumer-byte boundary and the existing local Florence-2 Python research runtime.

It does not yet compose Florence candidate geometry with same-frame FaceLandmarker geometry.

It does not authorize anatomical laterality, a validated external-ear observation, traditional interpretation, or production use.

## Baseline

```text
main@91152eed2a1988dcdc3fac6f80a3142ae19c18b5
```

The prior B1 phase already established:

```text
exact Mesh6H frame
-> exact ephemeral RGBA origin
-> Florence host-port boundary
-> FaceLandmarker runtime boundary
```

but intentionally retained:

```text
florence_repository_native_live_host_transport_not_implemented
```

because the Florence candidate runtime existed only as the local Python empirical runner.

## 1. In-memory Python host mode

The existing runner:

```text
tools/face-reading/ear/run_florence2_ear_empirical.py
```

now supports:

```text
--stdio-rgba-host-once
```

Protocol:

```text
stdin:
  one UTF-8 JSON header line
  + exact RGBA8 bytes

stdout:
  one bounded JSON result
```

The request header pins:

- schema version;
- provider run ref;
- width;
- height;
- exact byte length;
- pixel format = rgba8.

The byte length must satisfy:

```text
byteLength = width * height * 4
```

The runner creates the image in memory and runs the frozen FR103 dual-side Florence prompt path.

It does not write the image to a file.

## 2. Bounded response

The local host response contains only:

- provider run ref;
- left prompt status;
- right prompt status;
- candidate counts.

It does not return:

- raw model text;
- raw parsed provider output;
- raw candidate polygons;
- source-image digest;
- anatomical side.

Required authority remains false.

## 3. Local HTTP endpoint

The existing MESH6J local/private-LAN server now exposes:

```text
POST /runtime/fr104/florence
```

Request body:

```text
application/octet-stream
exact RGBA8 bytes
```

No multipart encoding, base64 encoding, temporary image file, or repository artifact is used.

Protocol metadata is carried in explicit FR104 headers.

The server verifies exact body length before spawning the Python host and zeroes the server-owned request buffer after the child invocation completes.

The endpoint remains subject to the existing localhost/private-LAN server boundary.

## 4. Browser/package transport

New module:

```text
neutral-ear-florence-local-http-transport-fr104.ts
```

It:

1. sends the exact RGBA8 consumer copy to the local endpoint;
2. requires no-store same-origin transport;
3. rejects malformed or authority-widening host responses;
4. exposes a repository-native local binding that creates the existing Florence byte adapter.

The issued local binding is WeakSet-tracked.

The B1 live provider runtime clears the transport blocker only when the exact Florence adapter was created from this issued local binding.

A generic caller-supplied Florence adapter remains blocked.

## 5. Runtime configuration

`/runtime/config.json` now advertises the local FR104 Florence endpoint and preserves:

```text
filePersistenceUsed = false
responseIncludesRawProviderOutput = false
responseIncludesRawCandidatePolygons = false
anatomicalLateralityAuthorized = false
productionAuthorization = false
```

## 6. Performance boundary

The current local host is deliberately simple:

```text
one HTTP request
-> one Python process
-> one Florence model load
-> one dual-side inference
-> process exit
```

This is sufficient to establish the transport and privacy boundary but is not an optimized interactive serving architecture.

Persistent model hosting may be added later without changing the authority model.

Performance is not used as evidence for anatomical, empirical, or production promotion.

## 7. Blocker transition

Cleared at the repository capability level:

```text
florence_repository_native_live_host_transport_not_implemented
```

Still open:

```text
provider_outputs_not_yet_composed_into_fr104_candidate_orchestration
fr21b_front_rear_deterministic_asymmetric_calibration_not_executed
subject_relative_source_pixel_mirror_provenance_not_verified
verified_controlled_capture_profile_not_available
runtime_anatomical_side_mapping_not_admitted
```

A B1 runtime instance using a generic external Florence adapter still retains the transport blocker. Only the issued repository-native local binding clears it.

## 8. Authority state

Still required:

```text
subjectRelativeMirrorProvenanceAuthorized = false
anatomicalLateralityAuthorized = false
validatedExternalEarObservationAuthorized = false
traditionalBindingAuthorized = false
productionAuthorization = false
```

## Next gate

D2B-B2B must compose, entirely ephemerally:

```text
Florence candidate polygon
+
same exact-frame FaceLandmarker screen geometry
+
FR104 descriptive candidate orchestration
```

Raw provider outputs must remain unavailable outside that composition boundary.

Prompt side, image-space X sign, and provider labels must remain non-anatomical.
