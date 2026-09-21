# FR240 — Participant Consent and One-Person Dry-Run Admission

Status: consent/admission protocol implemented; real participant execution still blocked  
Contract: `FR240-PARTICIPANT-CONSENT-AND-ONE-PERSON-DRY-RUN-ADMISSION-v1`  
Tracking: #1222

## Purpose

FR237 froze the first repeatability study design. FR238 implemented research live-capture/session mechanics while blocking real participant execution. FR239 issued the finite retention and privacy policy.

FR240 closes the next pre-collection policy gap: explicit participant-consent requirements plus a tightly bounded one-person dry-run admission artifact.

It does **not** modify FR238 to accept real participant captures. A later runtime extension is still required before any actual dry-run capture can execute.

## Exact predecessor binding

FR240 requires:

- an active FR238 research live-capture runtime;
- an active FR239 retention/privacy policy;
- the FR239 policy to bind the exact same FR238 runtime ref/digest;
- real participant session issuance and real capture admission to remain disabled in FR238.

A JSON-shaped reconstruction of any active artifact is not accepted as authority.

## Required participant consent

Before a one-person dry-run admission can be issued, all of the following confirmations must be explicitly true:

- study notice read;
- voluntary participation confirmed;
- live-camera capture consent;
- transient raw-capture processing consent;
- sanitized review-image retention consent;
- pseudonymous metric-storage consent;
- acknowledgement that training reuse is forbidden;
- acknowledgement that Production reuse is forbidden;
- acknowledgement that biometric identity matching is not performed;
- withdrawal procedure acknowledged.

A false or missing confirmation fails closed.

## Consent record privacy

The FR240 receipt stores only protocol-local opaque refs and the explicit confirmation record.

It does not store:

- real participant name;
- participant email;
- signature image;
- face embedding;
- identity template.

The participant ref must use the protocol-local `participant:fr240:...` namespace. The operator ref uses `operator:fr240:...`.

This is a pseudonymous protocol handle, not independently verified identity.

## One-person dry-run scope

An issued FR240 admission is restricted to:

- purpose: `one_person_research_dry_run`;
- exactly one participant;
- `selection` partition only;
- maximum two sessions;
- maximum two accepted captures per session;
- live camera only;
- empirical-evidence eligibility: false;
- confirmatory-evidence eligibility: false.

Therefore the first dry run is a system/mechanics validation exercise. It cannot be counted as evidence that the metric is repeatable.

## Execution boundary

FR240 can issue the policy-level admission, but current FR238 execution remains:

- real participant session issuance disabled;
- real capture admission disabled.

The next implementation must explicitly consume an active FR240 admission before it can open a real one-person dry-run session.

## Authority boundary

FR240 does not establish:

- independently verified participant consent;
- independently verified participant identity;
- legal sufficiency of consent;
- actual participant collection;
- independent capture freshness;
- independent same-participant verification;
- validated capture quality;
- empirical repeatability or sufficiency;
- interpretation validity;
- threshold or calibration authority;
- traditional face-reading binding;
- Production or Commerce authority.

## CI meaning

FR240 uses the repository shared CI only. No FR240-specific GitHub Actions workflow is created.

Synthetic tests prove:

- predecessor binding;
- all-true consent fail-closed mechanics;
- one-person dry-run scope;
- active-runtime guards;
- authority-boundary preservation.

Synthetic CI does not prove that a real participant gave informed consent.

## Next frontier

`extend_fr238_runtime_to_consume_fr240_one_person_dry_run_admission_without_empirical_promotion`

That later runtime may permit the first controlled one-person dry-run only when an active FR240 admission is supplied.
