# FR312G13 — AI-Hub 71539 / 71785 / 71787 versus FR299 and FR312F/G: concrete breakthrough assessment

Issue #2430 · Date 2026-10-08 KST · Track: `face-research`
Status: **source-schema feasibility established; permission, actual data, physical geometry correspondence and empirical reliability NOT yet established**.
Applicant: Korean independent individual, no business registration.
Non-overlap: No AST reanalysis, no RAP3DF retry, no MINDS-Libras/UL-DD owner reassignment, no edits to FR299/FR312F/G. Public official pages and repository code only. No human images, biometric files, participant records, dataset registration, purchases or emails created by FR312G13.

## 1. Official primary sources and authentic dataset schemas

- AI-Hub **general NIA dataset use policy**: https://www.aihub.or.kr/intrcn/guid/usagepolicy.do?currMenu=151&topMenu=105
- 71539 **한국인 얼굴 3D 스캐닝 데이터**: https://www.aihub.or.kr/aihubdata/data/view.do?currMenu=115&dataSetSn=71539&topMenu=100
- 71785 **안면 랜드마크 데이터**: https://www.aihub.or.kr/aihubdata/data/view.do?currMenu=115&dataSetSn=71785&topMenu=100
- 71787 **시나리오 기반 표정 3D 데이터**: https://www.aihub.or.kr/aihubdata/data/view.do?currMenu=115&dataSetSn=71787&topMenu=100

| Dataset | Official independent person / item count | Captures and source linkage | Existing MyeongHa technical fit | Primary non-assumptions |
|---|---|---|---|---|
| **71539**, first for **FR299** | **530 actual subjects** (265 men + 265 women), **13,780** 3D scans = 530 × 26 expressions; **551,200** raw 2D images | OBJ, textures, JPG/raw original pictures, 68 xyz landmark schema with `num_landmarks:68`, `mesh.actor_id`, `mesh.expression_id`, `mesh.obj_file_name`, `mesh.map_file_name`, `actors.id`, `Camera.filename`, expressions `0 = neutral`; vendor source lists `licenses.name/url` field but **no verified licence content** | Strongest *candidate structure* for **2D/3D same-acquisition pairing**, independent nose-tip/bridge FR299 reference, image-to-mesh geometry/camera alignment; mouth 3D geometry comparison **after exact method review** | 551,200 / 13,780 = **40 raw images per 3D scan as arithmetic ratio**, not 40 independent recaptures, not proven camera-calibrated/same instant per individual image. One neutral expression **does not prove temporal repeats**. JSON x/y/z sample has **no verified centimeter/millimeter unit**, camera export contents uninspected. The 68 points **are not** MediaPipe 468 |
| **71785**, first for **FR312G limited neutral/light sensitivity** | **2,500 independent model IDs**; **52,500** PNG + OBJ pairs; exactly **7 expressions × 3 illuminations** per ID in release construction; official **7,500 Neutral** = 3 lighting conditions × 2,500 people as count inference | `filename`, `gender`, `id`, `age`, `expression` (including `Neutral`), `light` (`highlight`, `middlelight`, `lowlight`); `3Dlandmark` array holds OBJ-style `v x y z` **vertex strings**; `Face` array holds `f a b c` triangle indices | Promising **per-person neutral cross-illumination robustness** (same 3D geometry and different lighting), paired PNG/OBJ inspection, mouth corner/image sensitivity research | 3 different light labels ≠ 3 independently accepted fresh captures and **not** two temporally separate sessions. `3Dlandmark` is described as vertices, **not an anatomical 468-point homologous semantic map**. Normalization/unit/camera intrinsics unknown. Do not promote as prospective FR312F |
| **71787**, secondary expression sensitivity | **2,500 independent actors**, **127,500** 3D meshes = 2,500 × 51 expression scenarios; official current data v1.3 (2025-04-07) | OBJ + MTL + JPG textures, JSON `id`, `expression`, `expressionscenario`, `AU`, `filename`; document sample `F0056_A1_03-05_03.json` includes camera number in its naming rule; **51 named emotional/social scenarios** | Excellent **expression perturbation/shape-confounding diagnostic** candidate, but *not* official neutral reliability measurement input | An expression-continuum model and 51 scenario mesh variants do not mean independent face recaptures or a validated neutral subset; textures are not by themselves independent RGB selfie captures. No physical-scale evidence in public page. Public example says `id` 0001–2000 while a separate section says 2,500 actual models—**source documentation discrepancy**, not automatic invalid dataset |

The public metadata gives image/mesh *counts and schema*, not full binary file inventory, per-file hashes, participant consent forms, photographic synchronization, camera calibration or an executed use permission. **No direct download availability has been verified behind the account/approval gate**.

## 2. AI-Hub rights / domestic independent developer (actual primary policy)

NIA general **AI 허브 개방 데이터** policy:
1. Explicitly allows **commercial and noncommercial R&D** for AI technology/products/services, *but* also states **AI data is only to be used for AI learning-model training**. Accordingly, an FR299 *independent measurement benchmark*, FR312G observational statistics and reuse of derived ratio statistics in a commercial product are **not automatically authorized merely by a permitted commercial R&D purpose**. Confirm these exact activities in writing in the application/use consultation. Clarify if offline evaluation of the training model on controlled data is permitted within that learning mandate.
2. A download application requires applicant identity verification, applicant information and purpose; the generic rule does not state that an incorporated business is required for a Korean resident individual. **Eligibility to apply ≠ approval**. Dataset pages warn *Korean nationals only* for application.
3. Must credit the government/NIA program including derivative works; may not distribute/transfer/let unrelated third parties access original images/records without authorization.
4. **Overseas transfer needs a separate agreement**. Foreign-region hosted LLMs/cloud data-processing APIs must not receive face data or derived participant trace records without explicit authority.
5. Dataset sales/commercial exploitation of **the dataset itself** require separate provider negotiation; this is separate from generally permitted commercial model R&D.
6. If personal information is found in a dataset, NIA directs user to report it and delete the downloaded dataset; individuals cannot be re-identified. Public AI-Hub dataset's anonymized ID is not transferable biometric-consent grant. Source-specific legal/consent requirements still govern.

**Decision:** Request domestic **local-only, no-redistribution, narrowly framed model training and permitted technical evaluation scope**; ask whether derived non-identifying aggregate neutral geometry statistics are allowed, and whether commercial product model improvement is included. Do **not** state unconditional commercial face biometric reuse is approved. Do **not** upload any real face materials to cloud/foreign provider without separate permission.

## 3. FR299 independent 3D nose reference — precise new candidate fit

Existing source: `packages/face-reading/src/independent-3d-nose-reference-bundle-fr299.ts`.

FR299 requires:
- exact independent 3D **source artifactual SHA256 and proven physical unit**, not just OBJ extension;
- **provider-independent validated transform** from source coordinate frame into `canonical_aligned_right_handed_metric_3d` with target centimeters, frozen before RGB candidate comparison;
- same-capture or separately validated 2D-to-3D correspondence with independent registration receipt;
- source-frozen nose tip and bridge root annotations, then compare derived ratio; no reference invented by MediaPipe 468 or RGB candidate outputs;
- lawful receipt and real artifact provenance; no face images persisted in final scalar bundle.

**71539 best match at documentary level:** capture-specific 2D original and OBJ, named camera file, actor/mesh/expressions link, nose geometry possible. The 68 3D landmark set might aid correspondence but **68 != MediaPipe468** and tip/bridge root semantic homologues must be independently verified. Need actual selected **single person's expression=0 neutral** 2D JPG, OBJ, landmark JSON and calibration/camera metadata *after lawful acquisition*, plus digest and scale witnesses.

**71785 secondary:** pairs PNG/OBJ and independent 3D vertices, but the public schema does not show a camera matrix. Direct use of OBJ *vertex coordinates* as verified metric scale is forbidden; image-to-mesh registration needs independent evidence.

**71787 lowest FR299 priority:** JPG may be a texture map, not independently sensor-captured frontal RGB input. AU/scenario expression features confound neutral reference. No qualifying correspondence proof yet.

No new FR299 reference or product nose column is approved by this report.

## 4. FR312F/G mouth neutral 8 axes — exact scope split

Existing `packages/face-reading/src/traditional-morphology-pilot-dataset-capture-protocol-fr312f.ts`:
- **participant unit**; two temporally distinct sessions per participant; **two independent accepted fresh neutral frontal captures per session** (4 total), not mere multiple images/lighting/expression crops. Quality admitted before metric or labels. Split by participant into development/calibration/holdout. FR312G descriptive repeatability requires within-session paired abs differences, between-session abs differences of means, participant range and unavailable reasons.
- FR312G6 has **null** participant count and split ratios; no numeric threshold/data admission or actual collection authority.

| Exact existing neutral comparator family / axes | 71539 | 71785 | 71787 |
|---|---|---|---|
| FR291 *visible* philtrum axis length and corridor width / mouth width (2) | 68 3D landmarks do not specify visible philtrum groove contour; needs validated original neutral image + independent visibility marking | `3Dlandmark` vertices without philtrum semantic contour; requires RGB visibility labels | 51 expressions and AU do not give neutral visible-groove geometry |
| FR80 pose-normalized lip contour union aspect ratio (1) | OBJ+texture promising for independent lip segmentation, but no published exact contour union or canonical pose transformation | Neutral face available for pilot annotation; no contour equivalence directly | Expression confounds; no neutral method equivalence |
| FR82 aligned lips span / **468 canonical-aligned metric 3D full mesh width** (1) | Independent mesh source may be 3D reference **only after independent registration**; 68 points not 468 | OBJ vertices != canonical 468 mesh, requires versioned geometric mapping and alignment proof | No canonical 468 mapping |
| FR212 *signed* mouth-corner elevation / width (1) | Neutral actor is useful potential; actor/mesh source correspondence must be checked | Neutral and 3 light labels allow **descriptive illumination stress test** if genuine independently captured image pair and semantic mouth corners confirmed | Action units can test sensitivity but no valid neutral repeated measurement |
| FR293 visible upper/lower lip-band vertical span and combined area / width² (3) | No verified lip-band visible segmentation labels in public JSON | No verified upper/lower **visible** lip-band masks or exact signed area | No visible-band equivalence; expression effects dominate |

**Across all eight axes: 0 accepted exact-axis external numeric repeatability evidence.** A pilot comparing three lighting conditions **cannot satisfy FR312F between-session statistics** and must not be folded into FR312G primary numerical reliability estimates. The data may support *separately labelled exploratory sensitivity/geometry algorithm research* if lawfully licensed for that activity. The datasets do **not** scientifically validate facial morphology implying fate, personality or life outcome.

## 5. Practical staged path and binary go/no-go

### Preflight 0: legal and delivery — no downloads yet
- Official AI-Hub download account/applicant route for 71539 and 71785; **an individual** may seek approval with real purpose, no invented company.
- Source owner/NIA reply must clarify (a) whether local-only **model training and corresponding measurement benchmarking** are within dataset's learning-only purpose; (b) permission to use/retain *aggregate non-identifying extracted ratio stats* for commercial product model validation; (c) no overseas cloud processing; (d) available original JPEG/OBJ/JSON/camera files versus raw retention-only; (e) separate participant/privacy conditions. Download approval alone is not a broad biometric product consent.
- Don't apply if applicant can't accept use purpose; no data or license acquired by this issue.

### Preflight 1: smallest lawful source-bound subset
Only **after** permission: one consent/use-authorized adult actor's neutral capture from 71539 or 71785 and the matching camera/2D/OBJ/JSON; locally inspect exact file names, signature SHA256, true binary lengths, OBJ scale and camera intrinsics/extrinsics; confirm mapping from person ID ↔ actual subject ↔ expression ↔ image/camera ↔ mesh. Avoid bulk downloads. **Never substitute calculated MB/shape from filenames for physical metric evidence.**

### Preflight 2: explicit technical fork
- **FR299 green only with independent physical scale + same-capture and registration + frozen independent tip/bridge landmarks + privacy authority**. Otherwise keep blocked.
- **FR312G sensitivity green only as separate exploratory protocol** if three true neutral captures under lights exist and consent/rights permit processing. FR312F 2 sessions × 2 accepted recaptures remain **not proven**: create separately governed prospective repeat-capture collection using explicit participants' consent and finite retention if desired; no auto-promotion from AI-Hub archive.
- If only projected textures/no canonical camera, stop independent 3D benchmark; switch to neutral 2D algorithms with an explicitly weaker evaluation claim.

### Preflight 3: limit commercialization
A commercial app that consumes user selfies must obtain its **own** legal basis, privacy/retention policy and appropriate technical validation. AI-Hub source rights do not transfer automatically to future users or product algorithms. Production and traditional inference gates remain unchanged.

## 6. Scope and consistency invariants

- **Already proven vs potential:** policy text and public schema verified; existence of user-accessible authenticated ZIP bytes, actual actor neutral matched 2D/OBJ pair, physical metric unit, same-capture binding and permission to compute commercial derived statistics **unverified**.
- 71539 independent actors = 530, not 13,780 or 551,200; 71785 independent actors = 2,500, not 52,500 or 7,500 neutral records; 71787 independent actors = 2,500, not 127,500.
- Subject-linked lighting is not longitudinal repeatability, and 40 images/scan may be simultaneous multiview captures.
- FR312G6 sample counts/partition ratios NULL, FR312G8 external numeric approved 0/8, FR312H / traditional meaning / commerce approval FALSE.
- Source owner contact and data collection / raw downloads are **not** part of FR312G13.

### Exit gates
A — three official schemas, NIA published usage policy and exact existing code contracts joined into cross-track feasibility table.
B — independent subjects, consent, units, 468 mapping, 2x2 sessions and all downstream research-authority gates remain distinguished and non-promoted.
C — PR source-document CI/integration and merge should be verified as separate repository events.

Watchtower-Track: face-research
