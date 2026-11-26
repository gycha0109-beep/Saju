# FR237 — Observable Morphology Real-Person Repeatability Study Preregistration

Status: protocol frozen; participant collection not authorized  
Contract: `FR237-OBSERVABLE-MORPHOLOGY-REPEATABILITY-STUDY-PREREGISTRATION-v1`  
Tracking: #1203

## Purpose

FR224 showed that the repository can structurally assemble human-review correspondence and declared repeat-capture descriptives, while correctly retaining the real empirical blockers.

FR237 freezes the first real-person repeatability study design before any participant collection. It does not collect evidence and does not claim repeatability.

## Primary endpoint

The first end-to-end empirical endpoint is exactly:

`neutral.eye.outer_corner_tilt.mean_degrees@0.1.0`

Unit: degrees.

Only one primary endpoint is admitted in FR237. Expanding to nose, mouth, face shape, or additional eye metrics requires later reviewed progression.

## Participant and capture design

Per participant:

- 2 temporally separated sessions;
- 2 accepted captures per session;
- minimum 4 accepted captures total;
- participant-level assignment to either `selection` or `holdout`;
- participant leakage forbidden;
- capture-family leakage forbidden.

The holdout partition remains untouched until the engine and analysis surface are frozen.

## Acquisition freeze

Future collection must use live capture only.

Required mechanics:

- fresh session nonce;
- fresh capture nonce;
- server timestamp;
- gallery upload ineligible;
- retrospective development captures ineligible;
- operator/participant grouping confirmation required;
- no biometric identity matching requirement.

These mechanics can reduce replay/reuse risk but do not independently prove real-world freshness or same-participant identity.

## Capture quality

Quality acceptance must occur before the primary metric value is inspected.

Required neutral checks:

- single face;
- frontal pose;
- sharpness;
- bilateral eye-region visibility;
- bilateral eye-landmark coverage;
- major eye-region occlusion.

Every rejected capture requires a reason and is ineligible for primary analysis.

## Privacy and retention

The measurement dataset uses pseudonymous participant refs.

It does not require:

- real names;
- face embeddings;
- identity templates.

A finite review-image retention period must be issued before actual participant collection. FR237 intentionally does not invent that period. Therefore collection remains blocked.

## Analysis boundary

Selection data may later inform engine revision. Holdout data may not.

FR237 intentionally does not issue:

- a numeric repeatability PASS/FAIL threshold;
- confirmatory sample size;
- calibration;
- transition zone;
- classifier;
- traditional face-reading binding.

Confirmatory sample size must be frozen before confirmatory collection, after an explicitly governed planning step rather than by post-hoc choice.

## Authority boundary

FR237 does not establish:

- actual participant collection;
- independently verified fresh capture;
- independently verified same-participant identity;
- validated capture quality;
- empirical repeatability;
- repeat-capture stability;
- empirical sufficiency;
- interpretation validity;
- scientific validity of physiognomy;
- threshold/calibration/classifier authority;
- traditional semantic authority;
- Production or Commerce authority.

## CI meaning

CI proves only that the preregistration contract is mechanically frozen and fail-closed. Synthetic tests cannot establish real-person empirical facts.

## Next frontier

Implement the research-only live capture/session runtime:

`implement_research_live_capture_session_runtime_without_collecting_participant_data`

That runtime must preserve FR237's collection block until the finite retention policy and remaining pre-collection controls are issued.
