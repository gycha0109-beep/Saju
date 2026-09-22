# FR247 — Operator-attested dry-run capture-quality operationalization

Status: implementation candidate; mechanics-only quality gate for the first real FR243 dry run  
Contract: `FR247-OPERATOR-ATTESTED-DRY-RUN-CAPTURE-QUALITY-OPERATIONALIZATION-v1`  
Tracking: #1312  
Watchtower-Track: `face-research`

## Decision

FR245 correctly blocked the real dry run because FR237 names six required quality checks while the repository does not contain validated numeric acceptance thresholds for four of them.

FR148/FR151 explicitly prohibit promoting candidate image statistics into sharpness or occlusion thresholds. FR162 permits capture coaching but explicitly prohibits automatic product PASS/FAIL thresholds.

FR247 therefore does **not** invent numeric thresholds.

The first FR243 execution is mechanics-only and FR242 already keeps `captureQualityValidated=false`, `empiricalEvidenceEligible=false`, and `confirmatoryEvidenceEligible=false`. For that bounded purpose, FR247 issues an explicit operator-attested operational checklist plus two provider-mechanical checks.

This is sufficient to decide whether a frame may continue through the dry-run mechanics path. It is not sufficient to claim a validated capture-quality construct.

## Six checks

### Provider-mechanical

1. `single_face`
   - FR247 uses a dedicated MediaPipe FaceLandmarker quality runtime with `numFaces: 2`.
   - This differs deliberately from FR26's metric runtime, whose `numFaces: 1` cannot distinguish one face from two-or-more faces.
   - zero faces -> false;
   - one face -> true;
   - two returned faces -> false.
   - The model, WASM root, IMAGE running mode, and disabled blendshape/transformation outputs remain aligned with FR26.

2. `bilateral_eye_landmark_coverage`
   - exactly one face must be present;
   - every landmark index referenced by the pinned FR24 left/right eye topology witness must exist with finite x/y/z values.

Neither provider check means that the capture-quality construct has been validated.

### Operator-attested

3. `frontal_pose`
   - operator visibly observes a frontal neutral pose before the explicit capture trigger.

4. `sharpness`
   - operator visibly confirms that both eye contours are resolvable in the capture preview.
   - This is an operational observation, not a validated sharpness metric.

5. `bilateral_eye_region_visibility`
   - operator visibly confirms that both eye regions are fully visible.

6. `major_eye_region_occlusion`
   - operator visibly confirms that no major eye-region occlusion is present.

These four observations are deliberately categorical and threshold-free.

## Same-frame binding

The operator observation carries the exact `providerRunRef` and capture-trigger timestamp.

FR244 prepares the quality binding against the original in-memory frame and the exact encoded JPEG. FR247 later compares the FR242 working-copy bytes against that exact JPEG byte-for-byte before returning the six-field assessment.

No image digest or hash is computed.

The quality evaluator is single-use. FR244 disposes it in `finally`, including when the frame is rejected before primary-metric extraction.

## Why a dedicated max-two-face runtime is required

The existing FR26 metric runtime pins `numFaces: 1`.

A result length of one under that configuration proves only that at least one face was returned within a one-face cap. It cannot mechanically rule out a second face.

FR247 therefore does not reuse that result as a false single-face proof. A dedicated quality runtime pins `numFaces: 2`, which is enough for the binary dry-run question: exactly one face versus not exactly one face.

## Authority boundary

FR247 advances only:

- a governed dry-run operationalization exists;
- the two provider-mechanical checks are bound to the same frame;
- the four remaining checks are explicit operator observations;
- FR242 can reject a mechanics-only capture before metric inspection.

FR247 does not establish:

- independent quality verification;
- validated sharpness, pose, visibility, or occlusion constructs;
- numeric capture-quality thresholds;
- calibration;
- empirical repeatability;
- participant identity;
- independent freshness;
- interpretation validity;
- traditional face-reading validity;
- Production authority;
- Commerce authority.

The resulting FR242 status remains `accepted_for_dry_run_mechanics_only`, never empirical evidence.

## Next frontier

`execute_actual_fr243_four_capture_dry_run_with_real_participant_live_camera_and_operator_attested_quality_mechanics`

At that point actual participant action and actual live-camera input are required. Synthetic CI fixtures cannot substitute for that execution.
