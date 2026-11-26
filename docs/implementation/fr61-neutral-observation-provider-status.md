# FR61 — Production-Neutral Observation Provider Checkpoint

Date: 2026-09-02

## Terminal

```text
FR61_PROVIDER_CANDIDATE = STRICT CLOSED
FR15_PRODUCTION_NEUTRAL_OBSERVATION_ISSUANCE = BLOCKED
PRODUCTION_FACE_READING = NOT AUTHORIZED
NEXT_STAGE_PHOTO_TO_GEOMETRY = NOT STARTED
```

FR61은 MyeongHa에서 Saju로 이관된 Face Reading package 위에서 실제 MediaPipe runtime을 실행하고, provider landmark 결과를 source-neutral한 2D candidate frame으로 제한하는 첫 post-migration implementation checkpoint다.

FR61 완료는 provider runtime execution과 candidate observation plumbing이 구현·검증됐다는 뜻이다. FR15 neutral observation 발행, morphology, 전통 관상 methodology, claims, narrative 또는 production Face Reading이 승인됐다는 뜻이 아니다.

---

## 1. Closed baseline

FR61 closeout 기준은 다음과 같다.

```text
Repository:          gycha0109-beep/Saju
Merged PR:           #160
Merged main commit:  5e15788878edc13645d75634fb3cf7d309919cbf
FR61 PR head:        d65c2784fed9907ef29e5792d3add2f9bd4b0f81
Frozen source repo:  gycha0109-beep/MyeongHa
Frozen source commit:09fdc7839f2452bcc8022ba368b03d72b23f31dc
Package:             @myeongha/face-reading@0.0.0
MediaPipe runtime:   @mediapipe/tasks-vision@0.10.35
```

Migration manifest remains:

```text
docs/migrations/face-reading-from-myeongha.manifest.json
```

The frozen migration package byte set is not rewritten by FR61. FR61 is an additive post-migration implementation.

---

## 2. Implemented flow

Current executable boundary is:

```text
opaque in-memory image
  -> FR26 MediaPipe FaceLandmarker runtime
  -> exactly-one-face validation
  -> provider landmark x/y/z/visibility finite validation
  -> z / visibility discard
  -> normalized 2D provider-ordered candidate frame
  -> FR14 / FR22 / FR26 publication-gate assessment
  -> STOP
```

Implementation:

```text
packages/face-reading/src/production-neutral-observation-provider-fr61.ts
```

The resulting FR61 frame is explicitly marked:

```text
authorityState = provider_observation_candidate_only
providerOrderingAuthority = internal_provider_order_only_not_fr15_output
productionNeutralObservationIssued = false
anatomicalLateralityResolved = false
traditionalSemanticAuthority = false
```

This is a bounded provider observation candidate, not a neutral observation artifact and not a Face Reading semantic result.

---

## 3. What FR61 closes

FR61 closes the following code-path responsibilities.

### Runtime execution

- Reuses the existing FR26 MediaPipe FaceLandmarker runtime factory.
- Supports dependency injection for deterministic verification.
- Requires exactly one detected face.
- Always closes the runtime through `finally`, including validation failure paths.

### Provider result sanitization

Each landmark is validated before any projection:

```text
x          finite and within [0,1]
y          finite and within [0,1]
z          finite, then discarded
visibility finite when present, then discarded
```

Unexpected landmark fields are rejected instead of widening the observation contract implicitly.

The retained frame contains only:

```text
{x, y}
```

in provider order.

### Provenance boundary

FR61 requires:

```text
providerRunRef
canonicalAssetDigest = sha256:<64 lowercase hex>
opaque in-memory image
```

Invalid provenance is rejected before runtime creation.

### Fail-close publication decision

FR61 combines current readiness from:

```text
FR14 neutral provider binding readiness
FR22 observation provider activation readiness
FR26 MediaPipe runtime readiness
```

into a machine-checkable publication gate.

Under the current authority state:

```text
providerObservationCandidateReady = true
productionNeutralObservationAllowed = false
providerActivationAllowed = false
```

FR61 v0.1 is intentionally candidate-only. If its current code ever observes production issuance or provider activation as allowed, it throws instead of silently widening authority.

---

## 4. What FR61 does not close

FR61 does **not** implement or authorize any of the following:

```text
FR15 issued neutral observation bundle
FR14 consumer-slot geometry assignment
brow-midline point derivation
nose-region geometry
left/right brow curve publication
left/right eye region publication
anatomical left/right resolution
morphology classification
traditional physiognomy methodology evaluation
physiognomy claims
fortune claims
narrative rendering
production Face Reading E2E
```

FR61 output must not expose FR15 semantic consumer fields such as:

```text
observations
consumerSlot
anchorRef
```

It also must not expose downstream fields such as:

```text
morphology
claims
narrative
```

The provider landmark index/order remains internal provider provenance only.

---

## 5. FR14 neutral binding boundary remains blocked

Current FR14 binding profile remains:

```text
providerKey = visually_facelab
providerContractVersion = null
activationState = blocked
```

The six governed neutral consumer slots remain:

```text
brow_midline -> neutral.face.brow_midline      -> point
nose         -> neutral.face.nose_region       -> region
left_brow    -> neutral.face.left_brow_region  -> curve
right_brow   -> neutral.face.right_brow_region -> curve
left_eye     -> neutral.face.left_eye_region   -> region
right_eye    -> neutral.face.right_eye_region  -> region
```

FR14 currently requires neutral capabilities including:

```text
neutral_pose_quality
neutral_brow_regions
neutral_brow_midline_derivation
neutral_eye_regions
neutral_nose_region
```

FR61 does not claim these capabilities are production-authorized merely because MediaPipe landmarks exist.

---

## 6. FR15 neutral observation issuance remains blocked

FR15 defines the governed neutral observation contract:

```text
contractVersion = myeongha-neutral-observation-v1
coordinateFrame = canonical_image_normalized_2d
```

Allowed geometry classes are:

```text
point
curve
region
```

FR15 requires exactly one governed item for every FR14 neutral binding and requires the exact pinned FR14 provider contract version.

Because the current FR14 profile still has:

```text
providerContractVersion = null
activationState = blocked
```

FR61 candidate landmarks cannot be promoted directly into an issued FR15 artifact.

Even after future FR15 issuance becomes valid, its authority remains only:

```text
neutral_observation_only
```

and explicitly prohibits:

```text
traditional_anchor_equivalence
physiognomy_claim_generation
fortune_claim_generation
identity_matching
```

---

## 7. FR22 / FR26 production activation remains blocked

### FR22

The provider contract remains:

```text
contract.face.observation_provider.fr22@0.1.0
authorityState = consumer_contract_only
implementationRegistryState = no_verified_implementation
verifiedImplementationRefs = []
providerActivationAllowed = false
```

FR22 still requires an activation-grade runtime artifact digest and a reviewed verified implementation. It prohibits shortcuts including:

```text
provider output -> traditional semantic authority
provider landmark index -> neutral contract output
provider side label -> anatomical side
consumer lockfile -> implementation conformance
implementation conformance -> traditional semantic authority
unreviewed derivation -> provider slot
```

### FR26

FR26 currently reports:

```text
runtimeExecutionPathImplemented = true
researchEyeProjectionReady = true
productionProviderActivationReady = false
anatomicalLateralityReady = false
traditionalSemanticAuthorityGranted = false
```

The remaining FR26 blockers include:

1. The FR18 consumer lockfile attestation is not release-exact source equivalence for `@mediapipe/tasks-vision@0.10.35`.
2. The versioned MediaPipe WASM reference is pinned, but the loaded WASM bytes have not been independently hashed.
3. The `face_landmarker` float16/1 model reference is pinned, but the loaded model bytes have not been independently hashed.
4. MediaPipe Tasks metrics/privacy consent and production telemetry policy still require explicit product review before activation.
5. The FR22 verified implementation registry remains empty.
6. The FR23 reviewed provider conformance evidence registry remains empty.
7. Provider LEFT/RIGHT labels remain provider provenance only and do not resolve anatomical laterality.
8. FR26 still grants no traditional physiognomy semantics.

FR61 intentionally preserves all of these blockers.

---

## 8. Architecture alignment

The governing architecture boundary remains:

```text
Photo
  -> neutral observations
  -> governed geometry / morphology
  -> source-governed methodology rules
  -> structured claims
  -> governed synthesis
  -> narrative rendering
```

The prohibited shortcut remains:

```text
Photo -> VLM / LLM -> physiognomy meaning
```

The Shared Face Observation Core may own source-neutral observable structure such as quality, pose, landmarks, normalized geometry, contours, layout and geometry cues.

It may not create traditional physiognomy meaning, fortune meaning, archetype identity or narrative authority.

Traditional Face Reading semantic authority remains downstream in the Face Reading Engine and must be source/methodology governed.

---

## 9. Privacy and persistence boundary

FR61 preserves the current privacy posture:

```text
rawSourcePersisted = false
rawProviderResponsePersisted = false
providerDepthPersisted = false
biometricEmbeddingPersisted = false
```

No face embedding, identity template, same-person matching, celebrity identification or identity inference is introduced by FR61.

The image remains an opaque in-memory runtime input. FR61 does not add raw-image persistence.

---

## 10. Verification closeout

### PR #160

```text
PR head: d65c2784fed9907ef29e5792d3add2f9bd4b0f81
```

Required checks completed successfully:

```text
CI run                         33559369429  SUCCESS
Face Reading CI run            33559369827  SUCCESS
PIE Prospective Shadow run     33559370632  SUCCESS
```

Face Reading CI specifically verified:

```text
Saju existing-engine regression                 PASS
migrated package bytes and compiler contract    PASS
FR61 provider candidate boundary                PASS
frozen MyeongHa source baseline                 PASS
exact source Face tests against migrated pkg    PASS
```

### Merged main

```text
main commit: 5e15788878edc13645d75634fb3cf7d309919cbf
push CI run: 33559767746
result:      SUCCESS
```

Merged-main root verification included:

```text
lint                         PASS
TypeScript typecheck         PASS
Vitest test files            449 passed
Vitest tests                 3360 passed
FR61 tests                   12 passed
build                        PASS
research preview smoke       PASS
```

Therefore:

```text
FR61_PROVIDER_CANDIDATE = STRICT CLOSED
```

---

## 11. Current Face Reading implementation frontier

```text
MyeongHa -> Saju package migration                    CLOSED
current FaceLab / CV capability recheck               CLOSED
production-neutral observation provider candidate     CLOSED (FR61)
photo -> governed neutral geometry                    OPEN / NEXT
neutral geometry -> morphology                        NOT STARTED
morphology -> V1 methodology                          NOT STARTED
V1 methodology -> structured claims                   NOT STARTED
claims -> narrative                                   NOT STARTED
real Face Reading end-to-end vertical slice           NOT STARTED
```

The distinction between the first two observation stages is deliberate:

```text
FR61 = photo/runtime -> sanitized provider landmark candidate frame
NEXT = candidate frame -> governed FR14/FR15-compatible neutral geometry
```

The latter remains open.

---

## 12. Next-step execution rule

The next implementation stage is:

```text
photo -> geometry
```

That stage must:

1. Reuse the existing FR61 runtime/candidate frame rather than create a second CV authority path.
2. Materialize only geometry justified by the existing FR14/FR15 consumer contracts.
3. Preserve provider landmark indices as internal provenance; do not leak them into FR15 neutral output.
4. Preserve the current laterality fail-close boundary.
5. Preserve raw-image/raw-provider/embedding non-persistence.
6. Keep methodology and traditional semantics out of geometry plumbing.
7. Reuse existing Source / Methodology / Authority / evidence mechanisms rather than restart research from scratch.
8. Do not promote FR14, FR15, FR22 or FR26 authority by inference merely because runtime geometry is technically obtainable.

In particular, the next implementation must not mix:

```text
geometry plumbing
+
traditional physiognomy semantic changes
```

in one authority transition.

---

## 13. Final checkpoint

```text
Runtime execution                         CLOSED
Provider-result 2D sanitization           CLOSED
Candidate-frame provenance                CLOSED
Candidate publication gate                CLOSED
Production neutral observation issuance   BLOCKED
Production provider activation            BLOCKED
Anatomical laterality                     BLOCKED
Traditional physiognomy semantics         NOT GRANTED
Morphology                                 NOT STARTED
Claims                                     NOT STARTED
Narrative                                  NOT STARTED
Production Face Reading                    NOT AUTHORIZED
```

FR61 is therefore a completed **observation-provider candidate boundary**, not a completed Face Reading engine.
