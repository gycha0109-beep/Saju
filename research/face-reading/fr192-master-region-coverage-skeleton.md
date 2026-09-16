# FR192 — Face Reading Master Region / Coverage Skeleton

## Status

```text
FR192
Issue #723
baseline main = 191047aab14e79ecfcb1fe55299ef06b2e1eade1
```

This artifact inventories current Face Reading coverage before any additional vertical-slice expansion. It is a governance skeleton, not a new traditional interpretation or geometry authority.

## 1. Why FR192 exists

FR191 fixed the product capture roles to:

```text
frontal × 1
profile × 1 (side_agnostic_profile)
```

and set the next frontier to:

```text
inventory_and_define_governed_face_reading_master_region_coverage_skeleton_before_additional_vertical_slice_expansion
```

The repository already contains deep vertical lineages (notably Eye-Pair and chin/lower-face research) plus scattered traditional systems, but no single artifact shows whole-face coverage and gaps.

## 2. Layer separation

FR192 records two independent layers.

```text
physical_observable
traditional_methodology
```

It explicitly does **not** assert:

```text
physical region == traditional region
traditional region == interpretation
one source lineage == another source lineage
```

Traditional interpretation remains downstream of source/methodology/rule authority.

## 3. Physical / observable inventory

| Component | FR192 state | Existing evidence / gap |
|---|---|---|
| whole face | `existing_governed` | FR15 neutral observation envelope + FR191 capture contract |
| forehead | `coverage_target_unverified` | traditional anchor references exist, but no general physical forehead observation authority is promoted |
| eyebrow | `existing_governed` | FR15 bilateral brow slots + FR39/FR41 eyebrow evidence lineage |
| eye / eye-pair | `existing_governed` | FR15 bilateral eye slots + FR24/FR25 Eye-Pair bridge/adapter |
| nose | `existing_governed` | FR15 neutral nose region + `nose-geometry.ts`; neutral metrics do not themselves classify traditional states |
| mouth | `coverage_target_unverified` | 五官 research references mouth, but no general neutral mouth component authority in current coverage |
| ear | `coverage_target_unverified` | 五官 research references ear, but no general neutral ear component authority in current coverage |
| cheek / mid-face | `coverage_target_unverified` | 六府 research references cheekbones, but no general neutral cheek/mid-face component authority is promoted |
| chin / lower-face | `existing_governed` | FR46/FR50/FR54 lineage provides neutral chin/lower-face geometry/research authority |

`existing_governed` here means only that repository authority exists for the **physical/observable layer**. It does not imply production-authorized traditional semantics, organ-specific capture sufficiency, or a complete method pack.

## 4. Traditional methodology / region-system inventory

| System | FR192 state | Current boundary |
|---|---|---|
| 三停 | `existing_research_only` | Mayi scan-checked boundary variants exist; variant selection, neutral-anchor completion, calibration and production mapping remain unresolved |
| 五官 | `existing_research_only` | Shenxiang and Liuzhuang lineages preserved separately; current material is research |
| 六府 | `existing_research_only` | Shenxiang/Liuzhuang mappings differ; repository conflict authority forbids auto-merging them |
| 十二宮 | `existing_research_only` | lineage-specific locator maps exist with `mappingStatus: research`; not promoted to canonical production geometry |
| 十三部位 계열 | `coverage_target_unverified` | no repository authority located in the fresh FR192 audit |
| 百歲流年 계열 | `deferred` | explicitly outside FR192/product-v1 mapping authority |

## 5. Important recovered authority

### FR15 neutral observations

Current neutral consumer slots include:

```text
neutral.face.brow_midline
neutral.face.nose_region
neutral.face.left_brow_region
neutral.face.right_brow_region
neutral.face.left_eye_region
neutral.face.right_eye_region
```

These are observation authority only and explicitly block automatic traditional/fortune semantics.

### Nose geometry

`nose-geometry.ts` has neutral bridge/tip metrics. Its own contracts preserve:

```text
classificationApplied = false
calibrationApplied = false
```

unless separately authorized. FR192 therefore records nose physical coverage without turning it into a traditional nose diagnosis.

### 三停

FR33 preserves two scan-checked Mayi boundary variants and explicitly keeps selection unresolved. FR192 records the system as covered by research, not as one canonical region map.

### 五官 / 六府

Existing research preserves source-lineage differences. In particular, 六府 has an open mapping conflict and may not be collapsed into a hidden common coordinate system.

### 十二宮

Existing Shenxiang/Liuzhuang locator material is represented as research-only methodology / region-map authority. FR192 does not upgrade it.

## 6. FR191 remains the capture authority

FR192 provenance-pins FR191 rather than runtime-importing it.

```text
required views = frontal + profile
profile = side_agnostic_profile
```

FR192 does not claim those two images are sufficient for all downstream components or methods and does not add left/right profiles or oblique captures.

This also avoids recreating the FR19/FR188 circular module-initialization defect discovered during FR191.

## 7. Non-authority / non-scope

FR192 issues none of the following:

```text
traditional semantic rules
exact new region polygons
new provider landmark bindings
new metrics
new thresholds
new calibration
new classifiers
participant/expert evidence collection
traditional-region ↔ MediaPipe automatic mapping
百歲流年 age-point mapping
氣色 Production
Commerce/Product activation
additional mandatory capture views
```

## 8. Result

The repository now has a governed whole-face coverage index that can answer:

```text
what physical component is already represented?
what traditional system is already represented?
is that representation governed physical authority, research-only, missing, or deferred?
which existing artifact owns the authority?
```

The skeleton itself remains non-semantic.

## 9. Next frontier

```text
select_bounded_whole_face_coverage_gap_from_master_skeleton_without_preselecting_a_vertical_slice
```

The next vertical slice must therefore be selected from an explicit coverage gap and its own method needs. Eye-Pair methods are not automatically copied to nose, mouth, ear, forehead, or lower-face work.
