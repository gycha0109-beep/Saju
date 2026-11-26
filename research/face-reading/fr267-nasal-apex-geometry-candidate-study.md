# FR267 — Nasal Apex Geometry Candidate Study

Watchtower-Track: face-research

## Purpose

FR266 established a frozen, provider-independent nasal-apex research annotation.

FR267 adds the next layer used elsewhere in MyeongHa research:

`independent reference → automated candidates → error measurement → later empirical selection`

FR267 does not select a candidate.

## Candidate generation

The input is canonical aligned metric 3D neutral geometry with provider indices omitted from the study surface.

FR267 emits six geometry-only hypotheses:

- full-face maximum Z;
- full-face minimum Z;
- central 10% X-band maximum Z;
- central 10% X-band minimum Z;
- central 20% X-band maximum Z;
- central 20% X-band minimum Z.

The central bands are defined only as fractions of the observed canonical X span.

They are not called a nose region.

## Why both Z directions are emitted

FR267 deliberately does not convert a coordinate-axis convention into anatomy.

Even though MediaPipe metric geometry is right-handed and canonical geometry is available, the candidate study does not assert:

`+Z == anatomical nasal anterior`

or:

`-Z == anatomical nasal anterior`

Both sign hypotheses are emitted and compared against the independent FR266 annotation.

The wrong family is expected to fail empirically.

## Evaluation

For the same subject and capture, every candidate is compared with the frozen FR266 3D annotation.

FR267 records:

- Euclidean 3D error in centimeters;
- absolute vertical Y error in centimeters;
- signed X/Y/Z errors for diagnosis.

FR267 does not set:

- a winner;
- an acceptance threshold;
- minimum subjects;
- minimum repeat sessions.

Those must come from empirical data rather than being invented before collection.

## Provider-index boundary

Candidate outputs contain coordinates and method IDs only.

They do not expose the source point ordinal and do not issue a provider-index semantic binding.

The method asks:

> does this geometry-only rule repeatedly land close to the independent nasal-apex annotation?

It does not ask:

> which MediaPipe landmark is 準頭?

## Traditional boundary

FR267 does not establish:

- anatomical nasal-apex admission for any automated candidate;
- pronasale == 準頭;
- a Three-Divisions lower span;
- a traditional claim.

Even a zero-error fixture does not promote a candidate. Fixture correctness only verifies the study runtime.

## Next frontier

`collect_multi_subject_multi_session_fr266_annotations_and_fr267_candidate_errors_before_any_nasal_apex_candidate_selection`

The next phase must collect real multi-subject / multi-session evidence and examine candidate error distributions and repeatability before selecting one automated neutral nasal-apex rule.
