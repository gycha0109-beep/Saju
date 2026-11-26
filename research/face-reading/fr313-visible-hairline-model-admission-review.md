# FR313 — Visible-hairline model admission review

Status: admission review implemented, real representative-coverage evidence not yet reviewed

Watchtower-Track: face-observation-engine

## Purpose

FR313 is the first phase allowed to issue the exact FR305 hairline model-admission receipt.

It does so only after two separate evidence classes are satisfied:

1. FR312 expanded engineering validation;
2. a separate human-reviewed representative ordinary-RGB coverage assessment.

FR312 alone is insufficient because its engineering bundle deliberately keeps
`representativeOrdinaryRgbReady=false`.

## Representative ordinary-RGB review

The representative-coverage assessment must establish all of the following:

- the protocol was frozen before final evaluation;
- only ordinary RGB selfies were used;
- multiple independent subjects were represented;
- multiple independent sessions were represented;
- more than one device/camera context was represented;
- natural hair variation was represented;
- natural background variation was represented;
- natural illumination variation was represented;
- unobstructed visibility was represented;
- occluded visibility was represented;
- evidence was not synthetic-only;
- evidence was not derived-image-only;
- no demographic attributes were collected;
- no demographic inference was used;
- subject identities were not exposed;
- no raw or reconstructive evidence was exposed publicly;
- only non-identifying aggregate evidence references are exposed;
- human review explicitly concludes that the collected coverage is representative for the intended ordinary-RGB selfie scope.

FR313 intentionally does not define demographic quotas.

Names, ages, sex, race, ethnicity and similar personal or sensitive attributes are not part of the coverage contract.

## Model-behavior review

The exact Florence-2 model/revision must separately validate:

- visible hair/skin boundary behavior;
- visibility handling;
- occlusion handling;
- no hidden hairline completion;
- no face-oval substitution;
- no face-mesh top-vertex substitution.

A model-behavior failure rejects the current candidate even if representative coverage is otherwise sufficient.

## Outcomes

### blocked_representative_coverage_gap

Used when model behavior is acceptable but representative ordinary-RGB coverage is incomplete.

No FR305 receipt is issued.

### rejected_model_candidate

Used when the exact candidate fails the model-behavior gate.

The next action is evaluation of the FR306 fallback candidate.

### admitted_for_neutral_visible_hair_skin_boundary_runtime

Allowed only when both representative coverage and model behavior validate.

This result creates the exact `FR305HairlineModelAdmissionReceipt` with:

- exact model/revision;
- representative ordinary-RGB validation;
- visible-boundary validation;
- visibility/occlusion validation;
- hidden completion prohibited;
- face-oval/top-mesh substitutions prohibited;
- non-empty validation evidence references;
- runtime provider admitted;
- traditional binding false;
- Production false;
- Commerce false.

## What admission changes

An actually admitted FR313 result may move the neutral-reference capability frontier from 6/7 to 7/7.

It does not itself materialize a real per-image hairline observation.

A real observation must still be produced under FR305's exact model/revision and visible-segment-only contract.

## What admission does not change

Even at 7/7 neutral-reference capability:

- anatomical hairline ground truth is not issued;
- 髮際 traditional binding is not issued;
- Three-Divisions span execution remains blocked;
- cross-frame subtraction remains blocked;
- no traditional threshold/classifier/calibration is issued;
- Product remains 18/29;
- Production remains false;
- Commerce remains false.

The remaining span blocker is the mixed coordinate-frame problem across the seven references.

## Current repository gate

No real representative-coverage evidence has been admitted yet.

Therefore the current repository state remains:

- admission review implemented: true;
- admission review executed: false;
- representative coverage validated: false;
- FR305 admission receipt issued: false;
- admitted hairline runtime providers: 0;
- #1521 handoff-ready neutral references: 6 / 7;
- Product: 18 / 29;
- traditional bindings: 0;
- Three-Divisions span execution: false;
- Production / Commerce: false.
