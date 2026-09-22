# FR242 — Ephemeral Live-Camera Frame Intake

Status: mechanics implemented; no real participant dry-run executed  
Contract: `FR242-EPHEMERAL-LIVE-CAMERA-FRAME-INTAKE-v1`  
Tracking: #1234  
Watchtower-Track: `face-research`

## Purpose

FR241 can issue a real-participant research session and live-camera challenge after consuming an active FR240 admission, but it intentionally cannot accept image bytes.

FR242 adds the narrow next runtime boundary: an active FR241 challenge may accept a JPEG frame into an ephemeral working buffer, run the frozen capture-quality gate, and only then call the frozen primary-metric extractor.

This is still a mechanics layer. No real participant dry-run has been executed by this artifact.

## Exact predecessor binding

FR242 requires:

- an active FR241 one-person dry-run runtime;
- an active FR239 retention/privacy policy;
- the FR239 policy and FR241 runtime to bind the same exact FR238 runtime.

The intake runtime does not inherit FR173 witness, signer, C2PA, or external-authority semantics.

It reuses only the existing MyeongHa operational media ceiling:

`32 MiB / 33,554,432 bytes`.

## Accepted envelope

An intake attempt must be:

- source: `live_camera`;
- media type: `image/jpeg`;
- transport: `raw-binary`;
- non-empty;
- at or below 32 MiB;
- declared length, when present, equal to observed bytes;
- bounded by JPEG SOI/EOI markers.

This boundary is an intake sanity check, not proof that the image is a genuine fresh camera capture.

## Frozen quality ordering

The exact FR237 quality concepts remain:

1. single face;
2. frontal pose;
3. sharpness;
4. bilateral eye-region visibility;
5. bilateral eye-landmark coverage;
6. no major eye-region occlusion.

The quality evaluator runs before the primary metric extractor.

If any check fails:

- the frame is rejected;
- a rejection reason is emitted;
- the metric extractor is not invoked.

A frame must never be rejected because the metric value looks undesirable.

## Frozen metric

Only this primary endpoint may be emitted after all quality checks pass:

`neutral.eye.outer_corner_tilt.mean_degrees@0.1.0`

Unit: `degree`.

Any extractor output with another metric ref, another unit, or a non-finite value fails closed.

## Ephemeral memory/privacy boundary

FR242 creates a private working copy of the supplied bytes.

After processing, including exceptional paths, that working buffer is overwritten with zero bytes.

FR242 does not persist or emit:

- raw JPEG bytes;
- raw-image digest;
- face embedding;
- identity template;
- review image.

The caller-owned input object is not used as a persistence artifact.

FR239 remains the governing privacy/retention policy for any future real execution.

## Evidence boundary

Even when the synthetic runtime returns `accepted_for_dry_run_mechanics_only`:

- `empiricalEvidenceEligible = false`;
- `confirmatoryEvidenceEligible = false`.

FR242 does not establish:

- independent capture freshness;
- same-participant identity;
- validated real-world capture quality;
- empirical repeatability;
- empirical sufficiency;
- interpretation validity;
- threshold/calibration authority;
- traditional face-reading binding;
- Production or Commerce authority.

## CI meaning

FR242 uses shared repository CI only. No FR242-specific workflow is added.

Synthetic tests verify:

- exact predecessor binding;
- quality-before-metric ordering;
- fail-closed rejection;
- frozen metric enforcement;
- working-buffer zeroization;
- no empirical promotion.

They do not prove that a real participant was captured.

## Next frontier

`execute_first_governed_one_person_dry_run_with_real_consent_and_live_camera_input_then_review_mechanics_only_results`

That next stage requires actual user/participant action and cannot be satisfied by synthetic CI fixtures.
