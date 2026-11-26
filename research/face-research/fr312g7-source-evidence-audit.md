# FR312G7 — External Source Evidence Audit (2026-10-08)

Issue: #2404. Track: face-research. Upstream authority: FR312G, FR312G4, FR312G5, FR312G6.

**Verdict: insufficient_evidence.** Catalogue evidence does not approve participant count, numeric allocation, data collection, FR312G execution, FR312H, traditional semantics, or product interpretation.

## 1. Scope and method

Verified official dataset/paper pages and public articles or abstracts, not unlicensed data files. No images, biometric identifiers, raw landmark dumps, or participant records were acquired. Comparison is to FR312G's four comparator families and eight precisely named ratio axes, not to loosely related anatomical distances. One participant (not session or image) is the independent statistical unit. The target FR312F repeated design uses two temporally distinct sessions with two accepted fresh captures each; Development-only reliability, unavailable cases, and camera/expression sensitivity must all be addressed. Calibration/Holdout remain blocked.

Machine-readable catalogue, matrix, and negative-authorization guard:
- packages/face-reading/src/traditional-neutral-metric-source-evidence-audit-fr312g7.ts
- Regression: matching .test.ts

Source data-use rights, metric definition equality, participant-level repeat structure, and permitted statistical inference are distinct review dimensions. Merely finding an official dataset does not grant research use, image access, or numeric approval.

## 2. Source evidence catalogue (verified public documentation, no image downloads)

| ID | Official source / version | Captures and observations | Rights and limitations | Verdict |
|---|---|---|---|---|
| S01 | [CMU Multi-PIE](https://www.cs.cmu.edu/afs/cs/project/PIE/MultiPie/Multi-Pie/Home.html), CMU official database, distribution version unknown | 337 individuals, up to four sessions, variable pose, lighting, expression, frontal 2D photographs | Dataset acquisition and current commercial/derivative permissions not verified; no matching eight-axis ratio variance | limited_support_only |
| S02 | [NIST FRGC](https://www.nist.gov/programs-projects/face-recognition-grand-challenge-frgc), official NIST archive (page updated 2025) | Validation has 4,003 subject sessions, each with controlled/uncontrolled 2D captures and a 3D capture | NIST requires signed data and software license by organizational authority; 4,003 sessions does not imply 4,003 independent people | limited_support_only |
| S03 | [FaceScape](https://nju-3dv.github.io/projects/FaceScape/), Zhu et al., IEEE TPAMI 2023, official 2026 access page | 847 identities × 20 expression 3D models; a 359-identity multi-view subset | Explicit **noncommercial internal research only**. License submission required, commercial product-related use and unauthorized redistribution/portrait publication prohibited. Not a two-temporally-distinct-session experiment | unsuitable for current raw-data admission |
| S04 | [Staller et al. 2022](https://pubmed.ncbi.nlm.nih.gov/35622942/), DOI: [10.2319/101321-770.1](https://doi.org/10.2319/101321-770.1) | 30 people, two 3D images per method, 17 soft-tissue landmarks and 16 anthropometric measures; ICC and repeated measurements | Published method/summary may inform design, but original human data rights and identical eight-axis ratio estimates unverified | limited_support_only |
| S05 | [Wong et al. 2008](https://pubmed.ncbi.nlm.nih.gov/18452351/), DOI: [10.1597/06-175](https://doi.org/10.1597/06-175) | 20 people, repeated direct/3D craniofacial linear distances, 3dMDface method | Repeatability study measures different distances, not FR312G axes; no underlying data permission | limited_support_only |
| S06 | [Koo and Li 2016](https://pmc.ncbi.nlm.nih.gov/articles/PMC4913118/), DOI: [10.1016/j.jcm.2016.02.012](https://doi.org/10.1016/j.jcm.2016.02.012) | Selection, form, type and confidence intervals for ICC reliability reporting; no facial observations | General statistical methods may be cited, cannot supply axis variance or impose thresholds | limited_support_only |
| S07 | [Bland and Altman 1986](https://pubmed.ncbi.nlm.nih.gov/2868172/), DOI: [10.1016/S0140-6736(86)90837-8](https://doi.org/10.1016/S0140-6736(86)90837-8) | Agreement and repeatability method comparison; no face data | General method reference only; not a participant-clustered variance prior | limited_support_only |

Further primary documentation:
- [CMU Multi-PIE capture content](https://www.cs.cmu.edu/afs/cs/project/PIE/MultiPie/Multi-Pie/Content.html) distinguishes multi-camera frames, session images, illumination conditions and expressions.
- [FaceScape official access/terms](https://nju-3dv.github.io/projects/FaceScape/) requires a signed agreement and states non-commercial use restrictions.
- [NIST FRGC](https://www.nist.gov/programs-projects/face-recognition-grand-challenge-frgc) requires licenses signed by authorized organizational representatives.

This is an audit of **source documentation** only, not proof that raw dataset access, participant consent portability, commercial use, privacy adequacy, or qualified authorizations exist.

## 3. Axis-by-axis evidence matrix

Source names below use S01–S07 as defined above. All metric IDs have version suffix @0.1.0. The complete exact identifiers are bound to FR312G and FR312G4 by the TypeScript guard.

| Exact FR312G metric key (without @0.1.0 suffix) | Candidate sources | Definition equivalence | Capture comparability | Exact-axis repeatability / variance / missingness | Rights | Numeric admission |
|---|---|---|---|---|---|---|
| neutral.mouth.visible_central_groove.axis_length_to_mouth_width_ratio | S01, S02, S04 | unknown | limited | unavailable / unavailable / unavailable | unknown/restricted | insufficient_evidence |
| neutral.mouth.visible_central_groove.corridor_width_to_mouth_width_ratio | S01, S05 | unknown | limited | unavailable / unavailable / unavailable | unknown/restricted | insufficient_evidence |
| neutral.mouth.contour_set.bounding_box_aspect_ratio | S01, S03, S04 | unknown | limited | unavailable / unavailable / unavailable | restricted | insufficient_evidence |
| neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio | S02, S03 | unknown | limited | unavailable / unavailable / unavailable | restricted | insufficient_evidence |
| neutral.mouth.corner_elevation.mean_to_mouth_width_ratio | S01, S03 | unknown | limited | unavailable / unavailable / unavailable | unknown/restricted | insufficient_evidence |
| neutral.mouth.visible_upper_lip_band.vertical_span_to_mouth_width_ratio | S03, S04, S05 | unknown | limited | unavailable / unavailable / unavailable | restricted | insufficient_evidence |
| neutral.mouth.visible_lower_lip_band.vertical_span_to_mouth_width_ratio | S03, S04, S05 | unknown | limited | unavailable / unavailable / unavailable | restricted | insufficient_evidence |
| neutral.mouth.visible_lip_bands.combined_area_to_mouth_width_squared_ratio | S03, S04 | unknown | limited | unavailable / unavailable / unavailable | restricted | insufficient_evidence |

S06/S07 are not included as axis-specific candidates because a statistical method paper is not a dataset of those axes. 'Unknown' is not equivalent to 'partial' or 'exact'. Every axis requires independent reproduction of its FR312G metric definition using duly licensed source material or separately governed prior measurements.

### Definition mismatch / missing equivalence proofs

- FR291 central visible groove 2 axes: visible axis length and corridor width each divided by a specific visible mouth-width reference. Do not treat this as an anatomical philtrum distance without identifying exactly matching endpoints.
- FR80: pose-normalized **unordered lips-contour union** bounding-box x-span / y-span, not absolute lip width/height or a 3D clinical distance.
- FR82: FR79 pose-normalized 2D lips x-span divided by FR77 **468 canonical-aligned metric 3D mesh** x-span in the shared canonical metric-x coordinate rule. Not a generic anatomical face width.
- FR212: signed mean mouth-corner elevation / mouth width; non-neutral expressions can shift this axis, so an expression label alone is not a matching neutral metric.
- FR293: upper/lower **visible** band vertical span / mouth width, plus **combined visible area / squared mouth width**. No outer/inner anatomical contour role, clinical lip thickness or volume is authorized.

For each axis, verify segmentation, denominator, coordinate normalization, accepted capture eligibility, orientation, repeat-family linkage and unavailable reason. External dataset summary counts, other clinical landmarks, correlations or ICC values cannot silently become estimates of these eight measurement ratios.

## 4. FR312G6 evidence sufficiency review

| FR312G6 required evidence | Finding | Decision |
|---|---|---|
| Per-axis exact-definition variance / availability | No verified source for these eight ratio estimands | insufficient_evidence |
| Within-session absolute pair differences | No authorized participant-paired, fresh-accepted 2D source values on these axes | insufficient_evidence |
| Between-session absolute session-mean differences | Multi-PIE temporal sessions exist, but exact accepted capture family / eight metric values absent | insufficient_evidence |
| Participant-clustered uncertainty | No permitted participant-level per-axis values or sufficient summary statistic | insufficient_evidence |
| Missingness/unavailable reason distribution | Dataset missing labels do not match FR312G per-axis unavailable reasons | insufficient_evidence |
| Capture sensitivity | Multi-PIE/FaceScape provide method-design reference, not approved axis effects | limited_support_only |
| Precision objective preregistration | Not issued | blocked |
| Development effective independent N | Not evidence-backed | null |
| Calibration/Holdout allocation and independent review | Not issued; partitions unreadable | null / blocked |
| Consent / privacy / commercial rights | External facial raw data permission not established | blocked |

No count may be inferred from the number of image files, the number of sessions, study sizes of 20/30 people, or a general ICC coefficient. Independent reviewer signoff is not present. The data should not be downloaded or reprocessed without a lawful rights and ethics review.

## 5. Verdict and actionable next step

**Overall: insufficient_evidence; 0/8 exact axis numeric evidence approved.**

- Published study design and statistical-method references are **limited support**, not eligible numeric inputs.
- Existing FR312G6 participantCount, perAxisPrecisionTarget, varianceAndMissingnessEvidence, partitionRatios and allocation decisions remain unset/null.
- New privacy, study collection, calibrated thresholds, statistical pass/fail, FR312H and product-use permissions remain **false**.
- This audit is explicitly **not** a new numeric approval packet.

Next action only if new lawful evidence becomes available: contact exact dataset owners/authors to verify **commercially compatible research use**, derivative statistical publication rights and specific repeated metrics; obtain independent measurement-equivalence review; then present eligible information to a **separate** FR312G6 numeric review before any sample-size approval. No participant recruitment or scraping is authorized by this plan.

## 6. Exit gates

A — Research Evidence: 7 directly checked sources, rights restrictions, and all 8 axis coverage gaps catalogued. **PASS (source audit only)**.

B — Authority & Integrity: numerical permission false, participant collection false, traditional and product semantic promotion false; FR312G6 binding and tests are required. **Contract defined; CI confirmation pending**.

C — Verification & Merge: typecheck, targeted regression, standard/Face Reading/integration CI, squash merge and #2404 closure must be verified by GitHub. **Not yet complete at document drafting**.

Watchtower-Track: face-research
