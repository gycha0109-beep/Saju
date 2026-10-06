# FR307 human review packet → FR308/FR312 deidentified compiler

This tool closes the manual JSON-shaping gap between the private FR307 Florence evidence runner and the governed FR308/FR310/FR312 validation executor.

It does **not** automate the human judgment.

## Flow

```text
FR307 local/private candidate evidence
→ prepare private review worksheet
→ human inspects local image / overlay / polygon evidence
→ human fills explicit review fields
→ compile
→ deidentified FR308/FR310/FR312 input
→ FR308→FR312 governed executor
```

## Authority boundary

The tool never decides automatically:

- whether a candidate polygon is a valid hairline;
- whether gross mislocalization occurred;
- whether hidden completion occurred;
- whether out-of-frame completion occurred;
- whether hallucination risk exists;
- the FR308 disposition;
- the FR312 disposition;
- whether a capture is independent;
- whether a capture was derived from another capture;
- the session label;
- subject coverage;
- whether human review is complete.

Demographic attributes must not be collected or inferred.

## Step 1 — Run FR307 locally

Run the pinned Florence runner for the required capture cases.

Example:

```bash
python tools/face-reading/hairline/run_florence2_hairline_empirical.py \
  --input /local/private/captures/clear \
  --capture-case clear_unobstructed_central_hairline \
  --qa-overlay \
  --output-dir .cache/face-reading/hairline-fr307/clear
```

Repeat for the capture cases needed by FR308 and FR312.

### FR308 required cases

Exactly one reviewed capture must ultimately be selected for each:

1. `clear_unobstructed_central_hairline`
2. `partial_bangs_occlusion`
3. `heavy_bangs_hairline_substantially_hidden`
4. `cropped_upper_forehead`

### FR312 expanded conditions

At least two independent reviewed captures are required for each:

1. `m_shaped_or_widows_peak_visible_contour`
2. `side_recession_or_asymmetric_visible_hairline`
3. `upper_hairline_visibility_loss`
4. `dark_hair_dark_background`
5. `light_hair_or_low_local_contrast`
6. `ordinary_indoor_illumination_variation`

For `upper_hairline_visibility_loss`, the local FR307 source capture may be any genuinely independent capture from:

- `headwear_occlusion_if_available`
- `cropped_upper_forehead`
- `heavy_bangs_hairline_substantially_hidden`

These are alternative causes of the same missing-visibility failure mode, not three separate mandatory photo families.

The FR312 contract also requires at least 12 total captures and at least 3 opaque sessions.

## Step 2 — Prepare the private review worksheet

Pass one or more FR307 `index.json` files:

```bash
npm run face:review:fr307 -- \
  --prepare \
  --index .cache/face-reading/hairline-fr307/clear/index.json \
  --index .cache/face-reading/hairline-fr307/partial/index.json \
  --index .cache/face-reading/hairline-fr307/hidden/index.json \
  --index .cache/face-reading/hairline-fr307/crop/index.json \
  --index .cache/face-reading/hairline-fr307/expanded-a/index.json \
  --index .cache/face-reading/hairline-fr307/expanded-b/index.json \
  --worksheet .cache/face-reading/hairline-review/review-worksheet.json
```

The worksheet is intentionally **private local material**.

It may contain:

- source-image digest;
- original filename;
- local case-summary path;
- local prompt-record paths;
- local overlay paths;
- candidate counts and descriptive FR307 state.

Therefore:

- keep it under `.cache/face-reading/`;
- do not commit it;
- do not paste it into issues or PRs;
- do not treat it as a repository-safe receipt.

## Step 3 — Human review

For each record, inspect the actual local evidence and set:

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
    "directPromptFailureMode": "useful_candidate",
    "directPromptAuthoritativeHallucinationRisk": false,
    "disposition": "supports_further_evaluation"
  }
}
```

These values are examples of shape only.

They are not recommended answers.

The reviewer must set them from the actual local evidence.

### FR308 selection

For exactly one reviewed record in each FR308 required case:

```json
{
  "routing": {
    "selectedForFR308": true
  }
}
```

All other records remain false.

### FR312 inclusion

For each expanded-validation capture that should count:

```json
{
  "routing": {
    "includeInFR312": true,
    "opaqueSessionLabel": "session-operator-defined-01",
    "independentCaptureAttested": true,
    "derivedFromAnotherCapture": false
  }
}
```

The session label must be operator-assigned and opaque.

Do not put:

- a subject name;
- email;
- filename;
- image digest;
- account ID;
- device serial;
- location;
- other personal identifier

into the session label.

The tool deliberately does not generate session labels.

### FR310 human-review attestation

After reviewing the selected FR308 evidence:

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

Set blocked/risk cases explicitly when applicable.

The compiler will not infer them.

### FR312 review attestation

After reviewing the expanded captures:

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

Allowed subject coverage values:

- `single_subject`
- `multiple_subjects`
- `unknown`

This is a human attestation, not an inference.

## Step 4 — Compile to deidentified validation input

```bash
npm run face:review:fr307 -- \
  --compile \
  --worksheet .cache/face-reading/hairline-review/review-worksheet.json \
  --output .cache/face-reading/fr308-fr312-local/private-input.json
```

The compiler fails closed unless:

- exactly four FR308 captures are selected;
- all four required FR308 cases are present exactly once;
- every selected record has explicit completed human review;
- FR310 human review is explicitly completed;
- privacy review is explicitly confirmed;
- FR312 has at least 12 included captures;
- every FR312 expanded condition has at least two included independent captures;
- at least three opaque session labels exist;
- every FR312 included capture has independence/derivation attestations;
- demographics collection remains false.

## Deidentification boundary

The compiled output strips the worksheet-only private source material.

It does not serialize:

- source-image digest;
- filename;
- private case-summary path;
- prompt-record path;
- overlay path;
- raw polygon;
- generated model text;
- private image;
- subject identifier.

The compiler also rejects digest-shaped private output.

The FR312 contract still contains opaque session labels because they are required for session counting. These must already be non-identifying operator-assigned labels.

## Step 5 — Run governed FR308→FR312 validation

```bash
npm run face:run:fr308-fr312-local -- \
  --input .cache/face-reading/fr308-fr312-local/private-input.json
```

If FR312 is eligible, the governed receipt is written to:

```text
.cache/face-reading/fr308-fr312-local/fr312-expanded-validation-receipt.json
```

## Step 6 — Hand FR312 receipt to FR313→FR319

```bash
npm run face:run:fr313-fr319-local -- \
  --input .cache/face-reading/fr313-fr319-local/private-input.json \
  --fr312-receipt .cache/face-reading/fr308-fr312-local/fr312-expanded-validation-receipt.json
```

FR313 still requires separate representative ordinary-RGB coverage and model-behavior review.

This review-packet tool does not satisfy or synthesize those FR313 requirements.

## Self-check

```bash
npm run face:verify:fr307-review-packet
```

The self-check uses synthetic local worksheet data only.

It verifies:

- four FR308 findings compile;
- twelve FR312 findings compile;
- private filename/path/digest material does not leak into compiled output;
- no human judgment is automatically generated.

## Repository authority

Successful compile does not mean:

- FR308 passed;
- FR310 passed;
- FR312 passed;
- FR313 admission exists;
- neutral hairline reference is available;
- 7/7 common frame exists;
- traditional binding exists;
- Three-Divisions span execution is ready;
- Product, Production, or Commerce is authorized.

Only the downstream governed contract functions can issue their respective receipts.
