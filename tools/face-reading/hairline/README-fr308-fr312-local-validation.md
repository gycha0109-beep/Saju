# FR308 → FR312 local deidentified validation executor

This runner connects the existing FR308, FR310, and FR312 contracts into one local-only engineering validation path.

It does not create evidence, perform human review, infer demographics, or promote model authority.

## Pipeline

```text
FR308 deidentified four-case findings
→ FR308 bounded bundle receipt
→ FR310 human-review adjudication
→ FR312 deidentified expanded validation
→ governed FR312 receipt for FR313 handoff
```

## Build and self-check

```bash
npm run face:build
npm run face:verify:fr308-fr312-local-executor
```

The self-check imports the governed FR308/310/312 executors and verifies that capture-level payloads and digest-shaped strings cannot be serialized to the repository-safe output.

It uses no real or synthetic evidence.

## Input location

Recommended:

```text
.cache/face-reading/fr308-fr312-local/private-input.json
```

Run:

```bash
npm run face:run:fr308-fr312-local -- \
  --input .cache/face-reading/fr308-fr312-local/private-input.json
```

Private/deidentified operator input is accepted only:

- outside the repository; or
- under the ignored `.cache/face-reading/` tree.

Do not force-add local validation input to Git.

## Top-level input

```json
{
  "schemaVersion": "fr308-fr312-local-deidentified-validation-input-v1",
  "fr308": {
    "caseFindings": [
      "... exactly four FR308DeidentifiedCaseFinding values ..."
    ]
  },
  "fr310": {
    "humanReview": {
      "...": "FR310HumanReviewAttestation"
    }
  },
  "fr312": {
    "humanReviewCompleted": true,
    "sessionLabelsOpaque": true,
    "demographicAttributesCollected": false,
    "subjectCoverage": "multiple_subjects",
    "captures": [
      "... FR312DeidentifiedCaptureFinding values ..."
    ]
  }
}
```

This is a structural map, not an evidence template.

Do not copy synthetic fixtures into a real run.

## FR308 boundary

The executor injects the pinned FR307 Florence model identity/revision and local-only contract identity automatically.

The operator supplies exactly four deidentified findings:

- clear unobstructed central hairline;
- partial bangs occlusion;
- substantially hidden hairline;
- cropped upper forehead.

Each finding must already omit:

- source image;
- overlay;
- raw polygon coordinates;
- source-image digest;
- filename or personal identifier.

FR308 only issues a bounded empirical-evidence receipt. It does not admit a runtime provider.

## FR310 boundary

The operator supplies the human-review attestation.

The runner does not generate or simulate that review.

If FR310 returns rejection or repeat-required, execution stops with:

```text
blocked_at_fr310
```

FR312 is executed only when FR310 is explicitly eligible for expanded validation.

## FR312 boundary

The operator supplies deidentified expanded-capture findings.

The existing FR312 contract still requires, at minimum:

- at least 12 captures;
- all six expanded cases represented;
- at least two independent captures per case;
- at least three opaque session labels;
- independent-capture attestation;
- no derived capture counted as independent;
- human review completed;
- no demographic attributes collected;
- no source image/overlay/raw polygon/digest/filename/subject identifier in findings;
- no gross mislocalization;
- no hidden completion;
- no out-of-frame completion;
- no authoritative hallucination risk;
- repeatability not inconclusive.

FR312 does not establish representative ordinary-RGB coverage by itself.

That remains a separate FR313 requirement.

## Outputs

Default aggregate summary:

```text
.cache/face-reading/fr308-fr312-local/repo-safe-receipt.json
```

When FR312 is eligible for model-admission review, the exact governed FR312 receipt is also written to:

```text
.cache/face-reading/fr308-fr312-local/fr312-expanded-validation-receipt.json
```

Both files are written with mode `0600` on platforms honoring POSIX file modes.

The summary contains only aggregate receipts, failure reasons, counts, and authority boundaries.

It never serializes:

- FR308 case findings;
- FR312 capture findings;
- opaque session labels;
- source images;
- overlays;
- raw polygons;
- source-image digests;
- filenames;
- subject identifiers;
- demographic attributes.

## Handoff to FR313 → FR319

The FR313 → FR319 runner can consume the governed FR312 receipt directly.

In the FR313 private input, omit `fr313.expandedValidation` or set it to `null`, then run:

```bash
npm run face:run:fr313-fr319-local -- \
  --input .cache/face-reading/fr313-fr319-local/private-input.json \
  --fr312-receipt .cache/face-reading/fr308-fr312-local/fr312-expanded-validation-receipt.json
```

The runner rejects ambiguous input if an embedded FR312 receipt and `--fr312-receipt` are both supplied.

The external receipt must already be:

- an FR312 expanded-validation receipt;
- `eligible_for_model_admission_review`;
- `modelAdmissionReviewEligible = true`.

The downstream FR313 contract revalidates the full receipt authority shape.

## Status

Success:

```text
fr312_eligible_for_model_admission_review
```

Governed blocking:

```text
blocked_at_fr310
blocked_at_fr312
```

A blocked result means the evidence must be repeated/reviewed according to the governed failure reasons. It must not be repaired by assumptions.

## Authority boundary

Even successful FR312 execution does not authorize:

- FR305 model admission;
- runtime hairline observation;
- repository 7/7 promotion;
- traditional semantics;
- Three-Divisions spans;
- Product;
- Production;
- Commerce.

The next governed step is FR313 representative coverage and model-behavior review using real evidence.
