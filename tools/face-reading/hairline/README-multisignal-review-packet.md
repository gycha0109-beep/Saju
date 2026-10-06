# Multi-signal hairline human-review packet

This packet connects the local/private multi-signal v3.2 candidate output to the governed FR308 → FR310 → FR312 validation path.

It does **not** convert engineering preview states into human judgments and it does **not** issue authority.

## Flow

```text
multi-signal local runner
→ private candidate.json / overlay.jpg
→ prepare private worksheet
→ human inspects actual local evidence
→ human fills review + routing fields
→ compile deidentified FR308/FR310/FR312 input
→ governed FR308 → FR312 local executor
```

The registered candidate identity is fixed to:

```text
provider:
  candidate.hairline.multisignal_visible_interface.fr306
revision:
  0.3.0
runner contract:
  MULTISIGNAL-VISIBLE-HAIRLINE-LOCAL-CANDIDATE-v1
```

The compiler verifies this identity against the FR306 runtime-candidate registry before preparing or compiling a worksheet.

## Build and self-check

```bash
npm run face:build
npm run face:verify:hairline-multisignal-review-packet
```

The self-check verifies:

- the v3.2 provider is an exact registered FR306 empirical candidate;
- four FR308 findings can be compiled;
- twelve FR312 captures can be compiled;
- no private path or digest leaks into the compiled input;
- no human judgment is automatically generated;
- no authority is promoted.

## Step 1 — run the v3.2 candidate locally

Use the existing multi-signal runner:

```bash
npm run face:run:hairline-multisignal-candidate -- \
  --manifest .cache/face-reading/hairline-multisignal/private-manifest.json \
  --output .cache/face-reading/hairline-multisignal/run
```

Actual image execution requires the local runtime dependencies documented in:

```text
tools/face-reading/hairline/README-multisignal-visible-hairline-candidate.md
```

The runner's detailed files are private local evidence.

Do not commit:

- source images;
- source filenames;
- source-image digests;
- face ROI;
- raw boundary points;
- raw signal arrays;
- QA overlays.

## Step 2 — prepare the private worksheet

```bash
npm run face:review:hairline-multisignal -- \
  --prepare \
  --summary .cache/face-reading/hairline-multisignal/run/private-summary.json \
  --worksheet .cache/face-reading/hairline-multisignal/review-worksheet.json
```

The worksheet retains only the private paths needed by the reviewer and must remain local.

Preparation verifies the candidate files but does not decide whether any boundary is correct.

## Step 3 — human review

For every record used by FR308 or FR312, inspect the source image and local overlay.

The engineering preview state and numeric signals are review aids only.

For revision 0.3.0, `candidateBoundaryExposed=false` is expected for partial/occluded, unavailable, and no-visible-hairline states. The private diagnostic path is not a candidate boundary and must not be scored as one.

They must **not** automatically determine:

- whether the visible hair/skin interface is correct;
- whether gross mislocalization occurred;
- whether a hidden segment was invented;
- whether a cropped segment was invented;
- whether the result supports further evaluation;
- whether a capture is independent;
- whether a session label is valid.

Fill:

```json
{
  "review": {
    "reviewCompleted": true,
    "visibleHairCandidateObserved": true,
    "foreheadSkinCandidateObserved": true,
    "diagnosticHairlineCandidateObserved": true,
    "grossMislocalizationObserved": false,
    "hiddenCompletionObserved": false,
    "outOfFrameCompletionObserved": false,
    "visibleInterfaceCandidateObserved": true,
    "candidateFailureMode": "useful_candidate",
    "directPromptAuthoritativeHallucinationRisk": false,
    "disposition": "supports_further_evaluation"
  }
}
```

These values are examples of **field shape only**.

They are not recommended answers.

### Compatibility fields

The current FR308/FR312 governed schemas were originally designed around the Florence prompt family and therefore still contain:

- `visibleHairCandidateObserved`
- `foreheadSkinCandidateObserved`
- `diagnosticHairlineCandidateObserved`
- `directPromptFailureMode`

For the non-prompt v3.2 candidate, the reviewer must explicitly fill these compatibility fields from the actual evidence.

The packet never fabricates them from preview signals.

`candidateFailureMode` is compiled into the existing `directPromptFailureMode` slot only to preserve the governed FR308 schema until a later schema revision is separately reviewed.

## Step 4 — FR308 routing

Exactly four reviewed records must be selected, one for each governed FR308 case:

```text
clear_unobstructed_central_hairline
partial_bangs_occlusion
heavy_bangs_hairline_substantially_hidden
cropped_upper_forehead
```

Example routing shape:

```json
{
  "routing": {
    "selectedForFR308": true,
    "fr308Case": "partial_bangs_occlusion"
  }
}
```

The packet does not choose the record or case automatically.

## Step 5 — FR312 routing

At least two independent reviewed captures are required for each:

```text
m_shaped_or_widows_peak_visible_contour
side_recession_or_asymmetric_visible_hairline
upper_hairline_visibility_loss
dark_hair_dark_background
light_hair_or_low_local_contrast
ordinary_indoor_illumination_variation
```

At least twelve total captures and at least three opaque sessions are required.

Example routing shape:

```json
{
  "routing": {
    "includeInFR312": true,
    "fr312Case": "light_hair_or_low_local_contrast",
    "opaqueSessionLabel": "session-local-03",
    "independentCaptureAttested": true,
    "derivedFromAnotherCapture": false
  }
}
```

Session labels must not contain a person's name, filename, digest, account identifier, device serial, location, or other identifying material.

No demographic attributes may be collected or inferred.

## Step 6 — review attestations

FR310:

```json
{
  "fr310HumanReview": {
    "completed": true,
    "privacyReviewConfirmed": true,
    "assessmentBlockedCases": [],
    "directPromptAuthoritativeMisinterpretationRiskCases": []
  }
}
```

FR312:

```json
{
  "fr312Review": {
    "humanReviewCompleted": true,
    "sessionLabelsOpaque": true,
    "subjectCoverage": "multiple_subjects",
    "demographicAttributesCollected": false
  }
}
```

These are human attestations.

The packet does not infer them.

## Step 7 — compile deidentified input

```bash
npm run face:review:hairline-multisignal -- \
  --compile \
  --worksheet .cache/face-reading/hairline-multisignal/review-worksheet.json \
  --output .cache/face-reading/fr308-fr312-local/multisignal-private-input.json
```

The compiled input includes the exact registered v3.2 candidate identity and strips:

- private candidate paths;
- overlay paths;
- source paths;
- source-image digests;
- raw boundary points;
- raw signal structures;
- filenames;
- subject/capture identifiers.

Opaque session labels remain because FR312 requires them for session counting.

The compiled file is still local validation input and should not be committed.

## Step 8 — execute governed FR308 → FR312

```bash
npm run face:run:fr308-fr312-local -- \
  --input .cache/face-reading/fr308-fr312-local/multisignal-private-input.json
```

The executor resolves the supplied candidate against FR306 again.

FR308, FR310 and FR312 each bind the exact provider identity and reject candidate swapping between stages.

Possible governed results remain:

```text
blocked_at_fr310
blocked_at_fr312
fr312_eligible_for_model_admission_review
```

A successful FR312 result is **not** FR305 admission.

FR313 still requires separately reviewed representative ordinary-RGB coverage and model-behavior evidence.

## Authority boundary

Neither the v3.2 local runner nor this review packet can authorize:

- FR305 admission;
- repository 7/7 promotion;
- a real FR314 observation;
- FR318 metric hairline materialization;
- FR319 seven-reference common-frame assembly;
- traditional hairline binding;
- Three-Divisions boundary/span execution;
- Product;
- Production;
- Commerce.

Current repository authority remains governed by the downstream receipts, not by the 18-capture engineering preview aggregate.

Watchtower-Track: face-observation-engine
