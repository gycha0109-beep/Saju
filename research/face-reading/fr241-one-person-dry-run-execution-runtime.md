# FR241 — One-Person Dry-Run Execution Runtime

Status: one-person session/challenge issuance enabled; raw participant media ingress still blocked  
Contract: `FR241-ONE-PERSON-DRY-RUN-EXECUTION-RUNTIME-v1`  
Tracking: #1228  
Watchtower-Track: `face-research`

## Purpose

FR240 froze participant consent requirements and issued a one-person dry-run admission while deliberately leaving the FR238 runtime unable to execute a real-participant path.

FR241 is the narrow runtime extension that consumes that admission.

It enables:

- one admitted pseudonymous participant;
- selection partition only;
- session 1 then session 2;
- capture challenge 1 then capture challenge 2 per session;
- fresh server-generated session and capture nonces;
- live-camera-only capture challenges.

It still does **not** ingest participant image bytes.

## Exact predecessor chain

FR241 requires all of the following active-runtime artifacts:

1. FR238 research live-capture runtime;
2. FR240 participant consent protocol;
3. FR240 one-person dry-run admission.

The FR240 protocol must bind the exact FR238 runtime ref/digest.

The FR240 admission must bind the exact FR240 protocol ref/digest.

JSON-shaped reconstructed artifacts do not count as active authority.

## Runtime scope

The runtime is fixed to:

- purpose: `one_person_research_dry_run`;
- participant count: 1;
- partition: `selection`;
- maximum sessions: 2;
- maximum accepted captures per session: 2;
- live camera only;
- empirical evidence eligibility: false;
- confirmatory evidence eligibility: false.

## Session issuance

FR241 may issue a real-participant research session only for the exact participant/operator refs carried by the admitted FR240 artifact.

Rules:

- session ordinal 1 or 2 only;
- session 2 cannot be issued before session 1;
- the same session ordinal cannot be issued twice for the same admission;
- every session receives a fresh 192-bit server nonce;
- every session receives an exact UTC server timestamp;
- temporal separation is still **not independently verified** merely because session 1 and session 2 exist.

## Capture challenge issuance

Within an active FR241 session:

- capture ordinal 1 or 2 only;
- capture 2 cannot be issued before capture 1;
- duplicate capture ordinals are rejected;
- every challenge receives a fresh 192-bit capture nonce;
- required source is `live_camera`;
- gallery upload is forbidden;
- retrospective capture reuse is forbidden;
- quality decision must precede metric inspection.

## Deliberately blocked capabilities

FR241 does not enable:

- raw participant image-byte ingress;
- capture-quality execution;
- primary metric extraction;
- review-image persistence;
- deletion-event execution.

Therefore issuing a live-camera challenge is **not** the same as collecting a participant image.

## Authority boundary

FR241 establishes only that an active FR240 admission was mechanically consumed.

It does not establish:

- independently verified consent;
- independently verified participant identity;
- legal sufficiency of consent;
- actual participant capture;
- independent capture freshness;
- independent same-participant verification;
- validated capture quality;
- participant-derived primary metric;
- empirical repeatability or sufficiency;
- interpretation validity;
- threshold/calibration/classifier authority;
- traditional face-reading binding;
- Production or Commerce authority.

## CI

FR241 uses the shared repository CI only.

No FR241-specific GitHub Actions workflow is created.

Synthetic CI verifies runtime binding, ordering, nonce shape, duplicate rejection, and authority-boundary preservation only.

## Next frontier

`implement_ephemeral_live_camera_frame_intake_for_fr241_challenges_before_first_dry_run_execution`

The next stage must consume an active FR241 challenge, accept only ephemeral live-camera bytes, apply the FR239 retention/privacy rules, and still avoid empirical promotion until a governed real dry-run is actually executed and reviewed.
