# FR194 — Cheek/Mid-Face Neutral Target Model + Pinned Provider Surface Feasibility

Status: research-only governance authority

Issue: #761

Baseline:

```text
main = 09fe9d15d74d53014c605478bb46f2534a059b32
FR193 = packages/face-reading/src/face-reading-bounded-coverage-gap-selection-fr193.ts
provider = @mediapipe/tasks-vision 0.10.35
```

## 1. Purpose

FR193 selected `cheek_mid_face` only as the next bounded research frontier and explicitly kept coverage, geometry, provider mapping, metrics, capture sufficiency, traditional semantics, Production, and Commerce unauthorized.

FR194 answers only two questions:

1. Is there enough neutral anatomical / morphometric evidence to define a bounded cheek/mid-face research target without inventing traditional geometry?
2. Does the exact pinned MediaPipe release expose a facial surface topology that can be investigated for later correspondence work without assigning provider indices now?

The answer is:

```text
neutral target model: supported at landmark/surface-description level
pinned provider surface feasibility: supported
provider-to-neutral correspondence: blocked
closed cheek boundary / executable geometry: blocked
```

Authority state:

```text
neutral_target_model_supported_provider_surface_feasible_mapping_blocked
```

## 2. Upstream authority

FR193 remains authoritative for frontier selection:

```text
selectedPhysicalCandidate = cheek_mid_face
requiredNextEvidence = neutral_anatomical_target_model_and_pinned_provider_surface_feasibility
providerIndicesMayBeAssigned = false
componentGeometryMayBeIssued = false
```

FR194 does not promote the FR192/FR193 master coverage state. `cheek_mid_face` remains:

```text
coverage_target_unverified
```

## 3. Neutral anatomical / morphometric evidence

### 3.1 Anas et al. 2019

Source:

- *A comparison between 2D and 3D methods of quantifying facial morphology*
- DOI: `10.1016/j.heliyon.2019.e01880`
- PMCID: `PMC6579906`

Reviewed support:

- bilateral `zygion` is defined as the most lateral point on the cheek;
- this supports zygion as a neutral cheek-side anatomical anchor concept.

Not supplied:

- no closed cheek polygon;
- no cheek mask;
- no MediaPipe mapping;
- no provider index authority;
- no MyeongHa metric or threshold.

The paper also reports that 2D and 3D measurements are not interchangeable. FR194 therefore imports no numeric calibration from this source.

### 3.2 Ibrahim et al. 2016

Source:

- *Combined soft and skeletal tissue modelling of normal and dysmorphic midface postnatal development*
- DOI: `10.1016/j.jcms.2016.08.020`
- PMCID: `PMC5682025`

Reviewed support:

- soft-tissue zygion is defined;
- extracted midface soft-tissue surfaces are analyzed with dense surface correspondence;
- this supports treating midface as a neutral soft-tissue surface research target.

Not supplied:

- no MediaPipe semantic component;
- no provider-index equivalence;
- no universal adult/population calibration;
- no MyeongHa runtime geometry.

### 3.3 Cappella et al. 2024

Source:

- *Comparison of Different 3D Surface Registration-Based Methods to Assess Facial Asymmetry*
- DOI: `10.3390/diagnostics14222573`
- PMCID: `PMC11593128`

Reviewed support:

- explicit anatomical landmarks are used to select 3D facial surfaces;
- one method defines a middle-third surface using landmarks including canthal, alar, zygion, cheilion/stomion-related points;
- this supports the general feasibility of landmark-selected facial surface ROIs.

Critical limitation:

- the study compares multiple ROI methods and reports they are not fully interchangeable;
- the middle-third ROI is broader than the MyeongHa `cheek_mid_face` research target;
- therefore FR194 does **not** copy that ROI as a universal cheek boundary.

## 4. Neutral target model admitted by FR194

FR194 admits only this research target description:

```text
layer          = physical_observable
component      = cheek_mid_face
laterality     = bilateral
representation = bilateral_lateral_midface_soft_tissue_surface
```

Supported concepts:

```text
bilateral zygion cheek anchor concept = true
midface soft-tissue surface study = true
landmark-selected surface ROI methodology = true
```

Still false:

```text
closed boundary defined = false
polygon defined = false
centroid algorithm defined = false
metric defined = false
```

This is a target model, not executable geometry.

## 5. Pinned provider surface feasibility

Repository dependency:

```text
@mediapipe/tasks-vision = 0.10.35
```

Exact upstream source pin:

```text
repository = google-ai-edge/mediapipe
tag        = v0.10.35
path       = mediapipe/tasks/web/vision/face_landmarker/face_landmarks_connections.ts
```

Published symbols inspected by FR194:

```text
FACE_LANDMARKS_TESSELATION
FACE_LANDMARKS_FACE_OVAL
```

FR194 may verify only structural availability:

- connection arrays exist;
- they are non-empty;
- connection endpoints are valid non-negative provider indices;
- tessellation is structurally broader than face oval;
- observed provider indices remain within the Face Landmarker index domain used by the pinned release.

FR194 does not attach anatomical cheek semantics to any provider vertex or edge.

## 6. Admission gates

```text
external_neutral_target_model                = satisfied
pinned_provider_surface_feasibility          = satisfied
provider_to_neutral_zygion_correspondence    = blocked
cheek_boundary_correspondence                = blocked
controlled_capture_sufficiency               = blocked
deterministic_cheek_geometry                 = blocked
```

The first blocked gate is provider-to-neutral zygion correspondence.

## 7. Authority firewall

All of the following remain forbidden:

```text
literature zygion -> provider index equivalence
literature middle-third ROI -> universal cheek boundary
provider tessellation -> cheek geometry
provider face oval -> cheek boundary
provider index assignment
provider cheek subgraph selection
六府 -> neutral cheek geometry
new capture sufficiency authority
metric authority
threshold authority
calibration authority
classifier authority
Production activation
Commerce activation
```

The layer invariant remains:

```text
physical_observable != traditional_methodology != traditional_interpretation
```

## 8. Why 六府 is not used

Existing 五官/六府 work is traditional methodology research authority. It is not a neutral anatomical surface definition.

FR194 therefore does not use 六府 names, boundaries, or traditional interpretation to construct physical cheek/mid-face geometry.

## 9. Runtime inspection boundary

`inspectMediaPipeCheekMidFaceSurfaceFeasibilityFR194()` is a provider-surface structure inspector only.

It may report:

```text
tessellation edge count
unique tessellation vertex count
face-oval edge count
unique face-oval vertex count
maximum observed provider index
```

It always reports:

```text
semanticCheekMappingObserved = false
```

No returned count or index may be promoted into anatomical cheek semantics by FR194.

## 10. Next frontier

```text
establish_provider_to_neutral_cheek_anchor_correspondence_evidence_before_any_provider_index_selection
```

The next track must establish source-governed correspondence evidence before assigning even one provider index to zygion or to any cheek boundary role.

## 11. Non-scope

```text
cheek provider indices
cheek polygon / mask
provider subgraph selection
zygion-provider equivalence
closed cheek boundary
cheek centroid
cheek metric / threshold / classifier
new capture requirements
traditional 六府 projection
Production / Commerce activation
MediaPipe package upgrade
```
