# FR300-R2C-DAR — AST Authoritative DUA Review & Access Readiness

Watchtower-Track: face-engine

## Decision

The authoritative AST-Face OSF DUA could not be retrieved or reviewed through the current non-authenticated public inspection path.

Therefore this stage does **not** adjudicate authoritative commercial product R&D compatibility.

Canonical disposition:

```text
authoritative_dua_unavailable_in_current_public_path_request_packet_prepared
```

## Official access authority

The official AST repository states that:
- the OSF-hosted DUA is the authoritative version;
- the GitHub PDF is a convenience mirror;
- an OSF account is required for permission assignment;
- the requester must download, complete, sign, and email the DUA;
- access is granted by adding the requester as a read-only contributor after identity verification and DUA acceptance.

The Scientific Data article independently confirms that raw scans and identifiable RGB are controlled-access resources requiring a DUA.

## Current authoritative-document state

Attempted public, non-authenticated inspection did not yield authoritative OSF DUA bytes/text.

Therefore:

```text
authoritativeDocumentReviewed = false
byteIdentityVerified = false
semanticEquivalenceVerified = false
githubMirrorMaySubstituteAuthoritativeDua = false
```

The previously inspected GitHub mirror remains useful only as a non-authoritative preview.

## Intended use frozen before rights review

The exact use case is frozen as:

```text
internal commercial product R&D validation

ordinary smartphone RGB neutral facial geometry estimate
vs
independent 3D reference geometry
```

Explicitly excluded:
- identity recognition;
- biometric verification;
- surveillance;
- tracking;
- demographic profiling;
- law-enforcement use;
- raw artifact redistribution.

## Authoritative rights adjudication

Because the authoritative document was not reviewed, the following remain unadjudicated:

- internal research use;
- industrial R&D;
- commercial product validation;
- derived metric retention;
- non-identifying aggregate publication;
- raw redistribution;
- secure-storage obligations;
- deletion lifecycle;
- biometric-identity restriction compatibility.

No mirror clause is promoted to authoritative permission.

## Technical readiness inherited from R2B-PAR

AST remains technically promising:

```text
metric authority = M1_device_class_metric_capable
pairing authority = P2_same_neutral_acquisition_condition
controlled intake may resolve remaining technical authority = true
```

This does not establish FR299 metric or correspondence authority.

## Controlled-access request packet

A request packet is prepared but not sent.

Requested pilot scope:
- neutral raw 3D;
- corresponding frontal RGB;
- subject/capture manifest or equivalent;
- metric-scale/export-unit metadata.

Optional:
- left/right RGB;
- scanner↔RGB extrinsics.

Security commitments:
- no redistribution;
- isolated storage;
- no raw artifacts in Git or Git LFS;
- deletion according to the authoritative DUA.

Derived outputs, if later authorized:
- neutral geometry scalar;
- registration receipt;
- aggregate benchmark statistics.

## Rights clarification packet

Three bounded questions are prepared:

1. Does industrial R&D include internal validation during commercial software product development?
2. May non-identifying derived geometry measurements and aggregate benchmark statistics be retained?
3. Does the biometric-identity restriction exclude non-identifying geometry validation from the prohibited identity-use category?

The clarification packet is not authorized or sent in this stage.

## Access readiness

```text
technicallyPromising = true
authoritativeRightsCompatible = false
controlledAccessScientificallyJustified = false
controlledAccessOperationallyAuthorized = false
```

The blocker is not technical promise; it is authoritative rights authority.

## Operational boundary

This stage performs no:
- OSF account creation;
- DUA signature;
- DUA submission;
- controlled-access request;
- clarification email;
- external contact;
- controlled participant artifact download/inspection;
- paid spend.

## Product boundary

```text
FR299 = 0
FR300-R2 = 0
Product = 18/29
Production = inactive
Commerce = inactive
```

## Next action

The next stage requires an explicitly authorized authenticated OSF/controlled-access action capable of retrieving the authoritative DUA, after which rights compatibility can be adjudicated before any raw subject artifact is used.

Watchtower-Track: face-engine
