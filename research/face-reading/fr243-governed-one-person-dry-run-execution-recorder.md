# FR243 — Governed One-Person Dry-Run Execution Recorder

Status: execution recorder implemented; first real participant dry run still requires participant action  
Contract: `FR243-GOVERNED-ONE-PERSON-DRY-RUN-EXECUTION-RECORDER-v1`  
Tracking: #1278  
Watchtower-Track: `face-research`

## Purpose

FR242 opened the narrow ephemeral JPEG intake needed for an active FR241 live-camera challenge, but its synthetic tests cannot establish that a real participant was present or that a live camera was actually used.

FR243 adds the execution-recording boundary for the first governed one-person dry run.

It deliberately distinguishes:

- operator-attested real execution; from
- independently verified real execution.

Only the first is representable here.

## Exact predecessor binding

FR243 requires:

- an active FR241 one-person dry-run runtime;
- an active FR242 ephemeral live-camera frame-intake runtime;
- the FR242 runtime to bind the exact same FR241 runtime, admission, and pseudonymous participant.

Reconstructed JSON-shaped runtimes do not count as active authority.

## Operator execution attestation

Before a challenge may be processed, the admitted operator must explicitly attest:

- the admitted participant is present;
- a live-camera capture was observed;
- consent was reconfirmed immediately before capture;
- the active challenge was presented before capture.

The attestation timestamp must not predate the challenge.

This is an operator statement. It is not independent proof of participant identity, consent sufficiency, capture freshness, or same-participant identity.

## Capture execution

FR243 does not implement a second media processor.

It delegates the supplied JPEG bytes to FR242, preserving:

- live-camera envelope restrictions;
- quality-before-metric ordering;
- fail-closed quality rejection;
- the single frozen primary metric;
- ephemeral working-buffer zeroization.

A successful FR243 record contains only sanitized mechanics output.

It never contains:

- raw JPEG bytes;
- raw-image digest;
- review image;
- face embedding;
- identity template.

## Four-slot mechanics review

The bounded dry-run review requires exactly:

- session 1 / capture 1;
- session 1 / capture 2;
- session 2 / capture 1;
- session 2 / capture 2.

Duplicate or missing slots fail closed.

Accepted metric values may be listed for mechanics review, but FR243 does not compute or issue a repeatability threshold, PASS/FAIL decision, classifier, calibration, or traditional interpretation.

A quality rejection remains a mechanics result. It does not authorize replacing the rejected slot with invented evidence.

## Evidence boundary

Even when all four slots are operator-attested and accepted:

- `empiricalEvidenceEligible = false`;
- `confirmatoryEvidenceEligible = false`;
- `empiricalRepeatabilityEstablished = false`;
- `interpretationValidityEstablished = false`.

FR243 does not independently establish:

- informed-consent validity;
- participant identity;
- capture freshness;
- same-participant identity;
- validated real-world capture quality;
- empirical sufficiency;
- traditional face-reading binding;
- Production authority;
- Commerce authority.

## CI meaning

FR243 uses shared repository CI only. No FR243-specific workflow is added.

Synthetic tests verify:

- exact runtime binding;
- operator-attestation fail-closed behavior;
- duplicate challenge rejection;
- FR242 delegation;
- sanitized record shape;
- exact four-slot review;
- non-promotion after four accepted synthetic slots.

Synthetic CI does not prove that a real participant was present.

## Real execution blocker

The first real dry run cannot be completed by repository CI or synthetic fixtures.

It requires an actual participant to reconfirm consent and provide live-camera input while the admitted operator observes the governed challenge.

## Next frontier

`execute_fr243_with_actual_participant_and_live_camera_then_review_operator_attested_mechanics_without_empirical_promotion`
