# FR312G8 — Exact-Axis Evidence Feasibility & Gap Resolution

Issue #2406 · Track: `face-research` · Review date: 2026-10-08 · Upstream: FR312G7 (#2405), FR312G6, FR312G4, FR312F

**Decision: HALT NUMERIC SIZING. 0/8 exact axes have approved external numeric evidence.** This is a completed feasibility decision on publicly verifiable material, **not** a finding that any source is forever unusable. All source-data licensing, independent participant records, accepted-capture equivalence, per-axis variance, and unavailable/withdrawal sensitivity remain unverified. No external face data were downloaded or processed, and no dataset owner was contacted.

## 1. What was actually verified

FR312G7 catalogued seven official sources. FR312G8 separately verified that a source being cited is **not** evidence that the dataset is currently obtainable, commercially reusable, exact-axis compatible or statistically sufficient.

| ID | Verified public route | Current feasibility finding | Next action, only after owner/rights review |
|---|---|---|---|
| S01 — [CMU Multi-PIE](https://www.cs.cmu.edu/afs/cs/project/PIE/MultiPie/Multi-Pie/Home.html) | Official CMU page links to Flintbox project 4742; that link currently redirects to a generic Wellspring search portal | **Distribution channel not verified operational**. 337 people and up to 4 sessions prove only a historical longitudinal collection, not current license, permitted remeasurement, or FR312F two-session/two-fresh-capture alignment | Ask official CMU dataset/rightsholder for current delivery path, dataset version, commercial research/derivative-statistics terms, explicit participant-session metadata; do not assume CMU's unrelated software licensing terms apply |
| S02 — [NIST FRGC](https://www.nist.gov/programs-projects/face-recognition-grand-challenge-frgc) | Official archive says organization-authorized legal signatory must execute data and software licenses; archived instructions currently do not yield an independently verified public download | **Signed organizational agreement required**. 4,003 *subject sessions* in the validation set are not 4,003 independent participants. Session collection has multiple expressions, which does not prove FR312F neutral capture comparability | Obtain applicable license/version and a lawful access/participant-ID/dated-session inventory through authorized institutional request; check allowed commercial derivative statistics and privacy conditions |
| S03 — [FaceScape](https://nju-3dv.github.io/projects/FaceScape/) | Official site links license request and restricts use to internal non-commercial research/evaluation/testing | **Current terms prohibit product-commercial use**. 20 expressions per identity ≠ two longitudinal sessions; 847 model identities ≠ FR312G independent repeated-session precision evidence | Exclude from commercial-product raw-data processing absent separately written commercial permission and independent metric equivalence; no application or data download performed |
| S04 — [Staller et al. 2022](https://pubmed.ncbi.nlm.nih.gov/35622942/) | Published 3D photogrammetry/anthropometry repeatability analysis | **Methodological reference only**, no confirmed licensed individual rows or exact 2D mouth/philtrum ratio definitions | Author/data-steward permission and axis reproduction review would be needed; published ICC is not transferable as FR312G variance |
| S05 — [Wong et al. 2008](https://pubmed.ncbi.nlm.nih.gov/18452351/) | Published 3D/direct linear craniofacial distance repeatability analysis | **Methodological reference only**, no demonstrated FR312F capture structure, raw per-axis data, or rights | Author/data-steward permission and fresh protocol-compatible metric reconstruction would be needed |
| S06 — [Koo & Li 2016](https://pmc.ncbi.nlm.nih.gov/articles/PMC4913118/) | ICC methodology paper | **Statistics reference**, no empirical ratio observations | May guide selection/reporting of a preregistered ICC model, not precision inputs |
| S07 — [Bland & Altman 1986](https://pubmed.ncbi.nlm.nih.gov/2868172/) | Measurement agreement methods paper | **Statistics reference**, no facial dataset | May guide agreement summaries, not participant count/variance |

Official access details checked on 2026-10-08, and must be re-checked before contacting rightsholders. No inferred terms, participant counts, data grants or sample sizes were filled in.

## 2. Eight exact metric axes: feasibility decisions

All version suffixes are `@0.1.0`; source IDs and exact versioned keys are bound at runtime to FR312G7 and FR312G.

| Family | Axis-specific reproduction requirement | Definition-equivalence proof | Approved external variance, clustered repeated observations, missingness, commercial-compatible rights | Verdict |
|---|---|---|---|---|
| FR291 / philtrum | Visible groove longitudinal axis over mouth width | Not established | All missing | HOLD |
| FR291 / philtrum | Visible corridor width over mouth width | Not established | All missing | HOLD |
| FR80 / mouth contour | Unordered pose-normalized lip contour *union* bounding-box x/y aspect | Not established | All missing | HOLD |
| FR82 / mouth relative size | FR79 aligned 2D lip horizontal x-span / FR77 468-point canonical 3D full-mesh x-span using shared metric-x projection | Not established | All missing | HOLD |
| FR212 / corner orientation | Signed mean mouth-corner elevation over mouth width; neutral expression capture | Not established | All missing | HOLD |
| FR293 / upper visible lip | Upper *visible* band vertical span over mouth width | Not established | All missing | HOLD |
| FR293 / lower visible lip | Lower *visible* band vertical span over mouth width | Not established | All missing | HOLD |
| FR293 / combined visible lip | Combined upper/lower *visible* band area divided by **squared mouth width** | Not established | All missing | HOLD |

No anatomical absolute distance, recognition metric, general facial landmark ICC, 3D volumetric lip thickness or expression frame count is permitted as an exact-axis surrogate.

## 3. Source acquisition decision tree (no automatic permission)

1. **Rights and source identity first.** Confirm owner, distribution version, contractual commercial development/derivative analysis rights, consent and privacy/retention limits. Without this, do not obtain/process facial files.
2. **Protocol reproduction next.** Independently compare the original raw modality, coordinate alignment, two temporally distinct sessions, two fresh *accepted* captures per session and unavailable cases to FR312F/FR312G.
3. **Axis definition and participant clustering.** Require the complete eight-axis metric algorithm where applicable, source-to-FR312G equivalence evidence, participant-level repeated-measures identifiers and no session/image inflation of effective N.
4. **Statistical evidence and withdrawal.** A provenance-bound per-axis ratio variance, uncertainty based on independent participants, missingness/unavailable reason distribution, attrition and withdrawal sensitivity must be reproducible or independently reviewable.
5. **Independent numeric governance.** Only after actual evidence is obtained under lawful permission can a **separate FR312G6** precision/partition review consider numeric inputs. The present FR312G8 audit authorizes none of them.

### Blocked vs future work

- **Source feasibility completed:** seven source routes checked, seven decisions recorded, eight precise metric gaps resolved into explicit reasons. Repeating the same documentation checks cannot fix a data-license or variance deficit.
- **Action that requires external owner responses:** CMU/FRGC rightsholder contact, FaceScape separate commercial licensing inquiry (if justified), Staller/Wong participant-row/data rights inquiry. No messages, contracts, data acquisitions or consents were sent/obtained by this task.
- **If no source can deliver authorized exact-axis repeat-capture data:** mark external numeric admission blocked and evaluate a **separately approved** prospective empirical protocol, not fabricated sample-size estimates or perpetual approval-document generation.

## 4. Invariants and verification

Code:
- `packages/face-reading/src/traditional-neutral-metric-source-feasibility-fr312g8.ts`
- `packages/face-reading/src/traditional-neutral-metric-source-feasibility-fr312g8.test.ts`

The structured verdict explicitly holds `verifiedExactAxisNumericEvidenceCount=0`, `dataRightsVerifiedSources=0`, `reviewableExternalNumericCandidates=0`; all acquisition, recruitment, sampling, collection, reliability execution, FR312H, traditional meaning and product interpretation authorizations **false**. FR312G6 participant count and partition ratios remain **null**. A test passing or this document being merged does **not** grant regulatory, contract or scientific sufficiency.

### Exit conditions

- **A — Evidence:** 7/7 historical sources have a concrete access/rights feasibility decision; 8/8 exact axes have explicit missing proof and follow-up. Document and code completed.
- **B — Authority:** false/null FR312G6 and FR312G8 authority remains guarded; no unauthorized images/records downloaded.
- **C — CI/Merge:** TypeScript/typecheck, focused regression, standard face-reading and Integration CI PASS; squash merge; close #2406 only after confirmation. (Pending at document creation.)

Watchtower-Track: face-research
