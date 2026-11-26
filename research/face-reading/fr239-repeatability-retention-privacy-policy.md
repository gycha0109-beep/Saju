# FR239 — Repeatability Pre-Collection Retention and Privacy Policy

Status: finite retention/privacy policy issued; participant collection still blocked  
Contract: `FR239-REPEATABILITY-PRECOLLECTION-RETENTION-PRIVACY-POLICY-v1`  
Tracking: #1210

## Purpose

FR238 implemented research live-capture/session mechanics but intentionally kept real collection disabled because FR237 required a finite review-image retention policy before collection.

FR239 closes that retention/privacy-policy blocker. It does not itself authorize participant collection.

## Raw capture policy

Raw capture bytes are `ephemeral_processing_only`.

They must be deleted after the governed capture-quality and metric-extraction step has produced the allowed research artifacts.

Raw captures are not authorized for:

- training reuse;
- Production reuse;
- identity matching;
- face embeddings;
- identity templates.

## Sanitized review-image policy

A sanitized research review image may be retained only for capture-quality review/audit.

Maximum retention: **30 calendar days**.

Deletion occurs earlier when quality review and audit are complete.

Before retention:

- embedded metadata must be sanitized;
- access is limited to assigned research operators and auditors;
- general product access is forbidden;
- training reuse is forbidden.

The 30-day value is a project research-retention policy, not a claim of statutory compliance or an externally mandated period.

## Measurement dataset identity boundary

Future measurement evidence must use pseudonymous participant refs.

The measurement dataset does not admit real names, face embeddings, identity templates, or biometric identity-match results.

## Deletion evidence

A future collection runtime must record a deletion event containing:

- deleted artifact ref;
- deletion reason;
- deletion event record.

The deletion record must not contain the deleted raw image bytes.

Policy issuance is not proof that deletion occurred.

## Pre-collection gate

FR239 resolves:

- finite retention policy issued;
- privacy policy issued.

Still unresolved:

- participant consent protocol;
- real participant collection admission.

Therefore real participant collection remains blocked.

## Authority boundary

FR239 does not establish participant collection, freshness, same-participant identity, validated capture quality, empirical repeatability/sufficiency, interpretation validity, calibration, traditional binding, Production, or Commerce authority.

## Next frontier

`issue_participant_consent_and_real_collection_admission_gate_before_dry_run`

Only a later active-runtime gate may authorize the first controlled one-person dry run.
