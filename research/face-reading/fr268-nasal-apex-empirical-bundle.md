# FR268 — Privacy-Minimized Nasal Apex Empirical Bundle

Watchtower-Track: face-research

## Purpose

FR266 supplies an independent frozen nasal-apex reference.

FR267 supplies six automated geometry-only candidate hypotheses and their errors against that reference.

FR268 defines how those results can be collected across subjects and sessions without retaining face geometry.

## Persisted study data

For each study-local observation FR268 retains only:

- study-local subject ordinal;
- study-local session ordinal;
- observation ordinal;
- candidate method ID;
- 3D Euclidean error in centimeters;
- absolute vertical-Y error in centimeters.

FR268 does not persist:

- source subject IDs;
- source capture IDs;
- annotator IDs;
- FR266 annotation coordinates;
- FR267 candidate coordinates;
- raw media;
- raw landmarks;
- full metric geometry;
- provider indices;
- embeddings or identity templates.

## Existing FR251 / FR257 capture lane

FR268 does not create another camera workflow.

Future live studies may reuse the existing FR251/FR257 capture mechanics and ephemeral same-frame metric geometry.

Historical FR251/FR255 exports cannot be retroactively upgraded into FR267 candidate-error evidence because those exports intentionally did not persist raw metric geometry, and they contain no frozen FR266 independent annotation.

Therefore old captures stay old evidence; no reconstruction is invented.

## Aggregation

FR268 computes descriptive summaries per FR267 candidate method:

- observation count;
- subject count;
- subject-session count;
- mean / median / min / max 3D error;
- mean / median / min / max vertical-Y error.

These summaries remain descriptive only.

## Explicit non-decisions

FR268 does not choose:

- a winning candidate;
- an acceptance threshold;
- a minimum subject count;
- a minimum session count;
- a repeatability pass/fail rule;
- a neutral nasal-apex admission;
- a traditional 準頭 admission.

Those decisions require actual empirical observations.

## Next frontier

`acquire_real_fr266_fr267_observations_through_existing_capture_mechanics_then_review_descriptive_candidate_error_distributions`

The next step is actual data acquisition through the existing capture mechanics, not another schema or camera implementation.
