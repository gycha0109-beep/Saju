# FR312 — Expanded visible-hairline validation

Status: protocol/adjudicator implemented, no real expanded bundle executed

Watchtower-Track: face-observation-engine

## Purpose

FR312 follows FR310 only after the bounded four-case evidence is eligible for expanded validation.

Because FR311 is already occupied by a separate face-research track, this face-observation-engine phase uses FR312.

The phase evaluates the remaining six hairline failure-mode conditions and engineering repeatability.

It does not issue FR305 model admission.

## Required cases

Each of the following requires at least two independent local captures:

1. `m_shaped_or_widows_peak_visible_contour`
2. `side_recession_or_asymmetric_visible_hairline`
3. `upper_hairline_visibility_loss`
4. `dark_hair_dark_background`
5. `light_hair_or_low_local_contrast`
6. `ordinary_indoor_illumination_variation`

Minimum engineering bundle:

- 2 independent captures per case;
- 12 total captures;
- at least 3 opaque capture-session labels.

The `upper_hairline_visibility_loss` condition may be supplied by a real independent capture where the upper hairline is unavailable because of headwear, framing/cropping, or substantial hair occlusion. These causes are not separate mandatory case families.\n\nA resized, cropped, recolored or copied derivative of another capture does not count as an independent capture.

## Local/private evidence

Raw evidence remains local.

Repository intake may contain only deidentified capture outcomes with:

- case label;
- capture ordinal;
- opaque session label;
- independent-capture attestation;
- descriptive candidate/failure booleans;
- disposition.

Repository intake must not contain:

- source image;
- QA overlay;
- raw polygon coordinates;
- source-image digest;
- filename;
- subject identifier;
- demographic attributes.

FR312 does not collect or infer age, sex, race, ethnicity or other demographic properties.

## Fail-closed behavior

Any expanded capture hard-rejects the current candidate when it shows:

- gross mislocalization;
- hidden hairline completion;
- out-of-frame completion;
- direct-prompt hallucination that creates authoritative-boundary interpretation risk;
- explicit rejection of current candidate behavior.

The next action is evaluation of the FR306 fallback candidate.

## Repeatability

Repeat the FR312 bundle without prompt/threshold retuning when:

- fewer than 12 captures exist;
- a required case has fewer than two independent captures;
- fewer than three opaque sessions are represented;
- human review is incomplete;
- capture independence is not attested;
- a derived capture is counted as independent;
- privacy/deidentification boundary is not satisfied;
- any required case contains unavailable or inconclusive repeated behavior.

A clean engineering bundle requires all expanded capture outcomes to support further evaluation.

## Model-admission review eligibility

A clean FR312 bundle may produce:

`eligible_for_model_admission_review`

This is only permission to design/run a later admission review.

It does not:

- issue an FR305 admission receipt;
- admit the Florence-2 runtime provider;
- authorize a neutral runtime hairline observation;
- bind 髮際;
- enable Three-Divisions spans;
- materialize a Product column;
- activate Production or Commerce.

## Representative ordinary-RGB boundary

FR312 deliberately does not define an arbitrary demographic sample-size threshold.

A single-subject engineering bundle may pass the mechanical failure-mode/repeatability gate, but:

`representativeOrdinaryRgbReady = false`

always remains true for the FR312 receipt.

Even multiple-subject coverage does not automatically become representative authority in this phase.

A later FR313 model-admission review must explicitly resolve the representative-coverage gap before any FR305 model-admission receipt can exist.

## Current repository gate

Before any real FR312 expanded bundle exists:

- expanded validation protocol implemented: true;
- expanded validation executed: false;
- representative ordinary RGB ready: false;
- model-admission review eligible: false;
- admitted hairline providers: 0;
- FR305 admission receipt: false;
- #1521: 6 / 7;
- Product: 18 / 29;
- traditional bindings: 0;
- Production / Commerce: false.
