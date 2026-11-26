# FR238 — Research Live-Capture Session Runtime

Status: mechanics implemented; real participant collection blocked  
Contract: `FR238-RESEARCH-LIVE-CAPTURE-SESSION-RUNTIME-v1`  
Tracking: #1208

## Purpose

FR237 froze the first real-person repeatability protocol. FR238 implements the next mechanics boundary: a research-only live-capture/session runtime surface that can issue synthetic session and capture challenges while remaining fail-closed for real participant collection.

No participant evidence is bundled or admitted by this stage.

## FR237 binding

FR238 requires an active-runtime FR237 preregistration artifact and binds its runtime ref/digest to that exact protocol.

The frozen design remains:

- one primary endpoint: `neutral.eye.outer_corner_tilt.mean_degrees@0.1.0`;
- 2 sessions per participant;
- 2 accepted captures per session;
- participant-level selection/holdout ownership;
- quality decision before metric inspection;
- live capture only.

## Session mechanics

The runtime freezes:

- session ordinal 1 or 2;
- partition `selection` or `holdout`;
- server-generated 192-bit session nonce;
- exact server timestamp;
- temporally separated sessions required by the upstream protocol;
- participant-level partition ownership.

FR238 can issue only `synthetic:fr238:...` mechanics sessions. A normal participant ref is rejected.

## Capture challenge mechanics

For each mechanics-only session, FR238 can issue capture ordinal 1 or 2 with:

- a fresh server-generated 192-bit capture nonce;
- exact server timestamp;
- required source `live_camera`;
- gallery upload forbidden;
- quality-before-metric ordering;
- `empiricalEvidenceEligible=false`.

FR238 does not yet admit image bytes or participant-derived metric evidence.

## Privacy / identity boundary

FR238 does not produce:

- face embeddings;
- identity templates;
- biometric identity matches;
- persisted raw media.

Future real collection must use pseudonymous participant refs, but real participant session issuance remains disabled here.

## Execution gate

Current state:

- mechanics-only synthetic session issuance: enabled;
- real participant session issuance: disabled;
- real capture admission: disabled;
- finite review-image retention policy: still required before real collection.

Thus a working nonce/session contract is not collection authorization.

## Authority boundary

FR238 does not establish:

- real participant collection;
- independent freshness verification;
- independent same-participant identity;
- validated capture quality;
- empirical repeatability or sufficiency;
- interpretation validity;
- threshold/calibration/classifier authority;
- traditional semantic authority;
- Production or Commerce authority.

## CI meaning

CI uses only synthetic refs and mechanics-only challenges. It proves active-runtime binding, random challenge shape, fail-closed participant refs, and authority-boundary preservation.

It proves no real-world empirical fact.

## Next frontier

`issue_finite_review_image_retention_and_precollection_privacy_policy`

Only after that policy and the remaining pre-collection controls are active may a later stage consider real participant session/capture admission.
