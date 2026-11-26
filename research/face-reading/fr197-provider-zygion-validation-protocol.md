# FR197 — Independent provider-to-neutral zygion validation protocol

Issue: #881

## Purpose

FR196 exhausted the reviewed external authority without finding source-governed or independently validated evidence that MediaPipe provider indices 234/454 are neutral anthropometric zygion.

FR197 therefore defines the next evidence protocol without promoting the candidate pair and without turning the product operator into a validation worker.

## Upstream state

```text
FR196 authorityState
= external_authority_exhausted_candidate_supported_direct_validation_required

provider candidate
= [234, 454]

provider index admission
= false
```

## Core independence invariant

Neutral zygion reference evidence must be independent from the provider candidate.

The following circular path is prohibited:

```text
choose 234/454 as likely lateral points
→ create or adjust "ground truth" around those provider outputs
→ use those labels to validate 234/454
```

Admissible future reference evidence is limited to:

1. a source-governed direct semantic mapping from a trustworthy provider/reference source; or
2. independently labelled neutral zygion coordinates created without access to the provider candidate assignment.

Provider output may not seed, adjust, filter, or select the neutral labels.

## Candidate preservation

The exact provider release remains pinned:

```text
@mediapipe/tasks-vision 0.10.35
source tag v0.10.35
candidate pair [234,454]
```

The pair remains unordered. Provider numbering does not establish anatomical laterality.

No provider index is admitted by FR197.

## Sample linkage

Future neutral reference and provider observations must refer to the same sample/capture to support correspondence analysis.

That linkage is not identity proof and does not require:

- identity matching;
- face embeddings;
- identity templates.

## Selection-bias controls

The protocol forbids:

- provider-candidate-selected samples;
- value-based rejection;
- deletion of inconvenient observations;
- retrospective relabelling to improve correspondence.

## No arbitrary validation quota

FR197 deliberately does not issue:

```text
minimum sample count
numeric acceptance threshold
confidence threshold
calibration coefficient
classifier
```

Those values cannot be invented merely to make the protocol executable.

Correspondence remains descriptive until independent evidence exists and a separate evidence-backed adjudication rule is preregistered.

## Operator burden

FR197 does not require:

- repeated user capture;
- a product-operator validation campaign;
- participant recruitment by the product operator;
- expert annotation collection by the product operator.

The next evidence may come from source-governed mapping or an independently produced reference dataset.

## Authority boundary

FR197 does not authorize:

- 234 = zygion;
- 454 = zygion;
- provider-side anatomical assignment;
- bizygomatic metric;
- cheek geometry;
- thresholds or calibration;
- capture sufficiency;
- traditional 六府 projection;
- Production;
- Commerce.

## Next frontier

```text
acquire_source_governed_or_independent_reference_correspondence_evidence_under_fr197_without_user_validation_burden
```

This next frontier is an evidence-acquisition problem, not another manual repeated-capture task for the product operator.
