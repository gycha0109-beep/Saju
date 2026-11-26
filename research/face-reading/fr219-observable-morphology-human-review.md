# FR219 — Observable Morphology Blinded Human Review Execution

## Status

Research execution layer only.

FR219 operationalizes the FR218 observable-morphology validation contract so a real human reviewer can inspect blinded image artifacts and submit ordinal labels through a localhost-only surface.

It does **not** establish empirical sufficiency, repeat-capture stability, thresholds, classifiers, traditional Face Reading bindings, Production authority, or Commerce authority.

## 1. Position in the validation stack

```text
FR159 prospective capture attestation
→ FR218 neutral metric candidate + metric-space coverage
→ FR218 provider/metric-blind review item
→ FR219 localhost human review delivery
→ FR219 raw annotation ledger + evidence receipt
→ later repeat-capture + multi-reviewer empirical analysis
→ only later transition-zone / threshold review
→ only later traditional criterion binding review
```

FR219 exists to remove a software-execution gap. It does not remove the human-evidence requirement.

## 2. Reviewer-facing surface

The reviewer receives only:

- an opaque review-item reference;
- an opaque localhost image route;
- the FR218 human-observable question;
- the six FR218 ordinal label choices, including `not_assessable`.

The reviewer surface must not expose:

- continuous candidate metric values;
- candidate metric identity;
- provider identity;
- extractor/model identity;
- source image path or filename;
- asset digest;
- selection/holdout partition;
- metric-space coverage bin;
- candidate thresholds;
- traditional Face Reading meaning;
- fortune output;
- peer reviewer labels;
- reviewer storage key.

The reviewer HTML/JS performs no external network requests.

## 3. Local asset delivery

Each operator-provided review artifact must include:

```text
assetPath
assetDigest = sha256:<64 lowercase hex>
mediaType = image/png | image/jpeg | image/webp
embeddedMetadataSanitizedAttested = true
```

At startup, FR219 re-hashes the exact local bytes and rejects digest mismatch.

`embeddedMetadataSanitizedAttested=true` is an operator attestation, not an independently verified fact. The FR219 internal binding records:

```text
embeddedMetadataSanitizationIndependentlyVerified = false
```

This prevents an opaque URL from being incorrectly treated as proof that EXIF or other embedded metadata was removed.

## 4. Localhost transport boundary

The executable review server binds only:

```text
127.0.0.1
```

No LAN/public bind mode is supplied by FR219.

Reviewer endpoints:

```text
GET  /
GET  /review.mjs
GET  /api/manifest
GET  /asset/<opaque sha256-derived route>
POST /api/annotations
```

No endpoint returns the operator ledger or evidence receipt.

The evidence files remain local operator artifacts.

## 5. Annotation payload

Reviewer POST payload:

```json
{
  "reviewItemRef": "review-item:opaque",
  "label": "approximately_horizontal"
}
```

Unknown fields are rejected.

One reviewer session may submit at most one annotation for each review item. Re-submission returns HTTP 409.

The server assigns `recordedAt` itself.

## 6. Evidence persistence

The operator chooses a ledger path outside the repository.

FR219 writes:

```text
<ledger>.jsonl
<ledger>.jsonl.receipt.json
```

The JSONL file preserves raw reviewer labels without consensus collapse.

The receipt records separate states for:

```text
annotationRecordsPresent
declaredHumanAnnotationEvidencePresent
allReviewersHumanAttested
allReviewersIndependentAttested
reviewerHumanStatusIndependentlyVerified = false
reviewerIndependenceIndependentlyVerified = false
empiricalSufficiencyEstablished = false
repeatCaptureStabilityEstablished = false
thresholdIssued = false
classifierIssued = false
traditionalBindingIssued = false
productionActivated = false
commerceActivated = false
```

A reviewer self-attestation is never promoted to independent verification.

## 7. Real operator run

First compile Face Reading:

```bash
npm run face:build
```

Prepare a private session JSON outside the repository using the `FR219ReviewSessionInput` shape:

```json
{
  "sessionRef": "session:study1:r1",
  "reviewerKey": "reviewer:study1:r1",
  "reviewerHumanAttested": true,
  "reviewerIndependenceAttested": true,
  "items": [
    {
      "reviewItem": {
        "...": "FR218 blinded review item"
      },
      "assetPath": "/private/path/sanitized-item.png",
      "assetDigest": "sha256:<digest>",
      "mediaType": "image/png",
      "embeddedMetadataSanitizedAttested": true
    }
  ]
}
```

Then run:

```bash
FR219_SESSION_CONFIG=/outside-repo/session.json \
FR219_LEDGER_PATH=/outside-repo/evidence/reviewer-1.jsonl \
node scripts/fr219-observable-morphology-human-review-server.mjs
```

Default URL:

```text
http://127.0.0.1:4319/
```

A fresh ledger path is required for every reviewer session. Existing ledger/receipt files are rejected rather than silently resumed.

## 8. Automated smoke

CI runs:

```bash
npm run face:build
npx vitest run packages/face-reading/src/observable-morphology-human-review-fr219.test.ts
FR219_SMOKE=1 node scripts/fr219-observable-morphology-human-review-server.mjs
```

The smoke test performs actual localhost HTTP operations:

1. create a temporary metadata-sanitized image fixture;
2. materialize a blinded FR219 session;
3. verify reviewer HTML/client/manifest routes;
4. verify the public manifest contains no reviewer key, source path, asset digest, metric value, or provider identity;
5. GET the opaque asset route and verify exact bytes;
6. POST one ordinal annotation;
7. verify duplicate reviewer/item submission is rejected;
8. verify JSONL annotation persistence;
9. verify evidence-receipt persistence;
10. verify no empirical authority was widened.

Expected terminal status:

```text
FR219_LOCALHOST_BLINDED_HUMAN_REVIEW_SMOKE_PASS
```

## 9. What still requires real humans

Passing FR219 CI proves the review software works.

It does **not** provide:

- a second human reviewer;
- independent reviewer identity verification;
- independent reviewer qualification verification;
- real repeat-capture evidence;
- sample-size sufficiency;
- transition distribution;
- boundary calibration;
- threshold selection;
- traditional semantic validation.

Those remain later empirical work.

## 10. Merge gate

FR219 may merge as research infrastructure only when one synchronized latest-main PR head passes:

```text
Face Reading build
FR219 unit tests
FR219 localhost HTTP smoke
Face Reading CI
repository CI
Production Calculation Container
PIE Prospective Shadow
```

Human evidence is intentionally **not** a merge requirement for this software infrastructure layer. Human evidence is a requirement for any later empirical morphology claim.
