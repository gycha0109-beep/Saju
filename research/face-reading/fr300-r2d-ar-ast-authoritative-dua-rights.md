# FR300-R2D-AR — AST Authoritative DUA Rights Adjudication

Watchtower-Track: face-engine

## Decision

The user retrieved the AST-Face authoritative DUA from authenticated OSF and confirmed it as the authoritative file.

The retrieved PDF is byte-identical to the official GitHub convenience mirror.

Canonical identity:

```text
file = Data Usage Agreement (DUA) .pdf
bytes = 89,465
sha256 = dc675a134ee2a65d46271ec8851c9511a5787e7d531fc276ed8c8513f75335ab
git blob sha1 = 5ab05af1b97cf6f1728e6c4a363414e804a650d7
official GitHub mirror blob sha1 = 5ab05af1b97cf6f1728e6c4a363414e804a650d7
byte identity = verified
```

Therefore the previously inspected mirror text is now authoritative for this exact OSF DUA copy.

## Source-bound DUA scope

The controlled-access component includes:

- raw 3D facial scans before topology standardization;
- identifiable modalities for consenting participants;
- facial textures;
- synchronized multi-view RGB for n=52.

## Permitted use

The DUA explicitly permits:

```text
legitimate research and development
academic or industrial
strictly limited to internal analysis and evaluation
```

The DUA does not separately say "commercial product-development validation".

For MyeongHa, commercial product validation is therefore interpreted only as a **bounded internal industrial R&D analysis/evaluation activity**.

This does not authorize unrestricted commercial exploitation of the raw controlled data.

## Prohibited uses

Explicitly prohibited:

- participant re-identification;
- biometric identification;
- biometric verification;
- surveillance;
- profiling;
- tracking;
- matching against external datasets for identification;
- training or evaluating identity-recognition systems.

The benchmark use profile excludes all of these.

## Redistribution and identifiable derivatives

The controlled raw data may not be redistributed.

Access is limited to named signatories and explicitly authorized members of the same research group who are bound by the DUA.

Identifiable derivatives may not be shared or distributed.

Examples named by the DUA include:

- textures;
- RGB images;
- raw scans;
- face templates capable of reconstructing participant likeness.

## Security and deletion

The DUA requires:

- sufficient technical controls;
- sufficient administrative controls;
- secure storage/management;
- prompt deletion when controlled data are no longer needed;
- deletion on provider request;
- secure deletion of backups and copies.

MyeongHa therefore freezes:

```text
raw Git persistence = false
raw Git LFS persistence = false
third-party public cloud processing = false
raw product-runtime use = false
```

unless a later source-bound authorization changes the boundary.

## Outputs and derivatives

The DUA explicitly allows publication of:

- aggregated statistics;
- plots;
- qualitative results;

provided they:

- do not reveal identifiable facial information;
- do not enable reconstruction;
- do not enable re-identification.

The DUA does **not** explicitly grant external publication or long-term retention of individual subject-level derived scalars.

Therefore this stage does not invent that right.

Current implementation policy:

```text
per-subject scalar
→ compute inside controlled environment as needed for benchmark
→ do not publish to public repository

public repository
→ non-identifying aggregate benchmark outputs only
```

If a later FR299 implementation requires durable subject-level scalar retention outside the controlled environment, that narrower derivative-retention question must be separately source-bound or clarified.

## Citation and breach obligations

Publications, presentations, or derivative works using the controlled dataset must cite AST-Face.

Data breach, misuse, or unauthorized access must be reported immediately to the providers.

## Compatibility adjudication

For the frozen intended use:

```text
internal commercial product R&D validation
ordinary smartphone RGB neutral facial geometry estimate
vs independent 3D reference
```

with:

```text
no identity recognition
no biometric verification
no face matching
no surveillance
no tracking
no profiling
no raw redistribution
no raw product-runtime use
```

the DUA is adjudicated as:

```text
compatible_for_bounded_internal_industrial_r_and_d
```

This compatibility is conditional on compliance with the security, deletion, non-identification, non-redistribution, citation, and output restrictions.

## Access readiness

The prior rights blocker is closed.

```text
authoritative DUA retrieved = true
authoritative DUA reviewed = true
byte identity verified = true
rights compatibility issued = true
controlled access scientifically justified = true
access request execution authorized by user = true
```

The current remaining blocker is signer identity.

```text
signer name = not bound
affiliation/institution = not bound
email = not bound
signature = not bound
```

Therefore:

```text
duaSigned = false
duaSubmitted = false
controlledAccessRequested = false
```

## Current terminal state

```text
authoritative_rights_compatible_signature_identity_required
```

## Product boundary

```text
FR299 = 0
FR300-R2 = 0
Product = 18/29
paid spend = 0
production = inactive
commerce = inactive
```

## Next action

Bind the signatory identity fields:

- legal/full name;
- institution/affiliation;
- email;
- signature method.

Then fill the authoritative PDF, obtain/attach the signature, and submit the controlled-access request through the provider-prescribed route.

No controlled facial artifact may be downloaded before the access request is approved and the later intake stage is opened.

Watchtower-Track: face-engine
