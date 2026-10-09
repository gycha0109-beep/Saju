# FR300-R1E — RAP3DF V2 real raw-depth byte intake

Watchtower-Track: face-engine

## 1. Purpose

FR300-R1 established the evidence boundary for RAP3DF V2, but its raw-depth inspection function still receives digest and decoded statistics as caller-supplied fields.

FR300-R1E removes that manual trust surface for future locally supplied bytes.

It adds an executable byte intake that derives the SHA-256 digest and numeric statistics directly from the supplied `Uint8Array`, then delegates the governed decision to the existing FR300-R1 inspection contract.

FR300-R1E does not claim that the current repository execution retrieved RAP3DF V2 bytes.

## 2. Public source recheck

The public Mendeley Data record for RAP3DF V2 version 4 remains:

- DOI `10.17632/kpdkpcs8zb.4`;
- 80 volunteers;
- approximately 1600 samples;
- visible, IR and depth images;
- `depth_.data` described as Kinect One raw data;
- `database.json` describing face directions;
- CC BY 4.0.

Official source:

`https://data.mendeley.com/datasets/kpdkpcs8zb`

The public record does not itself establish the exact byte serialization or physical value-unit binding of the V2 `depth_.data` artifact.

No real dataset bytes were retrievable in this execution.

## 3. Intake contract

`inspectFR300R1ERawDepthBytes` accepts:

- an opaque artifact reference;
- the actual supplied `Uint8Array`;
- width and height;
- declared bytes per value;
- explicitly declared numeric encoding;
- dataset-specific serialization evidence;
- dataset-specific value-unit evidence;
- an explicit binding decision for native Kinect depth-distance millimeters.

The function computes SHA-256 internally.

The caller cannot supply the digest, value count, finite count, minimum or maximum.

## 4. Supported decoding

The byte intake can decode only explicitly declared:

- `uint16_le`;
- `float32_le`;
- `float64_le`.

`unknown` remains blocked.

FR300-R1E does not inspect a byte pattern and guess an encoding.

It also does not infer a physical unit from a plausible numeric range.

## 5. Structural fail-closed behavior

The intake records an explicit blocker when:

- the declared encoding disagrees with the declared bytes per value;
- the byte buffer contains a partial trailing value.

The downstream FR300-R1 inspection continues to reject:

- byte length that does not match width × height × bytes per value;
- unknown encoding;
- incomplete finite-value coverage;
- missing dataset serialization evidence;
- missing dataset value-unit evidence;
- missing native Kinect depth semantic binding.

## 6. Synthetic tests are not RAP3DF evidence

Unit tests construct tiny synthetic buffers to prove:

- SHA-256 is computed from bytes;
- little-endian decoding works;
- finite statistics are derived rather than caller-authored;
- mismatched width/encoding fails closed;
- trailing partial values fail closed;
- unknown encoding remains blocked.

Those fixtures are not RAP3DF samples and issue no real-data authority.

## 7. Current execution state

FR300-R1E freezes:

```text
realRap3dfV2BytesRetrievedInCurrentExecution = false
realRap3dfV2DigestIssued = false
realRap3dfV2MetricScaleIssued = false
realRap3dfV2CanonicalRegistrationIssued = false
realFR299BundleIssued = false
```

## 8. Authority boundary

FR300-R1E issues no:

- proof that arbitrary supplied bytes are genuine RAP3DF bytes;
- numeric-encoding inference;
- physical-unit inference from value ranges;
- RAP3DF V2 metric-scale authority;
- participant personality/privacy clearance;
- participant consent-scope clearance;
- external 3D to canonical registration;
- real FR266/FR297 annotation;
- real FR299 bundle;
- RGB candidate;
- benchmark winner;
- threshold;
- traditional binding;
- product materialization;
- Production activation;
- Commerce activation.

Product materialization remains 18/29.

## 9. Next evidence step

The next empirical action is no longer to hand-author a digest or statistics.

A real locally supplied RAP3DF V2 `depth_.data` artifact can be passed through FR300-R1E. The resulting receipt must then be paired with V2-specific serialization and value-unit evidence.

Only after that evidence is separately adjudicated may the track proceed toward FR300-R2 external canonical registration.

Watchtower-Track: face-engine
