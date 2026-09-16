# FR192 — Face Reading Master Region / Coverage Skeleton

## Status

```text
FR192
Issue #723
baseline main = 191047aab14e79ecfcb1fe55299ef06b2e1eade1
supersedes candidate PR #724
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

The repository already contains deep vertical lineages plus scattered traditional systems, but no single governed artifact shows whole-face coverage and gaps.

## 2. Layer separation

FR192 records two independent layers:

```text
physical_observable
traditional_methodology
```

It explicitly does not assert:

```text
physical region == traditional region
traditional region == interpretation
one source lineage == another source lineage
```

Traditional interpretation remains downstream of source, methodology, metric, calibration, and rule authority.

## 3. Physical / observable inventory

| Component | FR192 state | Existing evidence / gap |
|---|---|---|
| whole face | `existing_governed` | FR15 neutral observation envelope + FR191 capture contract |
| forehead | `coverage_target_unverified` | no independent general physical forehead observation / geometry authority located in the fresh audit |
| eyebrow | `existing_governed` | FR15 bilateral brow slots + FR39/FR41 eyebrow evidence lineage |
| eye / eye-pair | `existing_governed` | FR15 bilateral eye slots + FR24/FR25 Eye-Pair bridge/adapter |
| nose | `existing_governed` | FR15 neutral nose region + `nose-geometry.ts`; neutral metrics do not themselves classify traditional states |
| mouth | `existing_governed` | FR80 neutral mouth contour metric + FR82 neutral relative-size metric + FR97 reviewed role-free neutral lip metric definition |
| ear | `coverage_target_unverified` | 五官 research references ear, but no independent governed physical ear geometry/observation authority was located |
| cheek / mid-face | `coverage_target_unverified` | 六府 research references cheekbone regions, but no independent governed cheek/mid-face geometry authority was located |
| chin / lower-face | `existing_governed` | FR46/FR50/FR54 neutral chin/lower-face geometry/research lineage |

`existing_governed` means only that repository authority exists for the physical/observable layer. It does not imply production-authorized traditional semantics, organ-specific capture sufficiency, or a complete method pack.

### Mouth correction after superseded PR #724

PR #724 incorrectly marked mouth/lips as `coverage_target_unverified`. Fresh inventory recovered the existing FR61–FR98 mouth/lip geometry lineage. Representative governed endpoints are:

```text
FR80 neutral.mouth.contour_set.bounding_box_aspect_ratio@0.1.0
FR82 neutral.mouth.contour_set.horizontal_span_to_full_mesh_horizontal_span_ratio@0.1.0
FR97 neutral.mouth.contour_set.symmetric_arclength_mean_nearest_set_distance@0.1.0
```

FR132 explicitly treats these as neutral candidate measurements only. In particular:

```text
FR80 does not prove traditional 方
FR82 does not prove traditional 大
FR82 denominator has no anatomical face-width role
FR97 is not automatically lip thickness
```

Therefore mouth physical coverage is governed, while traditional 五官 interpretation remains research-only / unresolved.

### Why square-broad 方 does not cover cheek / mid-face

FR132–FR157 `square-broad-fang` is the 出納官 mouth criterion `方大`, not a square/broad whole-face or cheek construct. That lineage cannot be reused as cheek/mid-face authority.

## 4. Traditional methodology / region-system inventory

| System | FR192 state | Current boundary |
|---|---|---|
| 三停 | `existing_research_only` | Mayi scan-checked boundary variants exist; variant selection, neutral-anchor completion, calibration and Production mapping remain unresolved |
| 五官 | `existing_research_only` | Shenxiang and Liuzhuang lineages preserved separately; current material is research |
| 六府 | `existing_research_only` | Shenxiang/Liuzhuang mappings differ; repository conflict authority forbids auto-merging them |
| 十二宮 | `existing_research_only` | lineage-specific locator maps exist with research-only mapping authority; not promoted to canonical Production geometry |
| 十三部位 계열 | `coverage_target_unverified` | no repository authority located in the fresh FR192 audit |
| 百歲流年 계열 | `deferred` | explicitly outside FR192/Product-v1 mapping authority |

## 5. FR191 remains the capture authority

FR192 provenance-pins FR191 rather than runtime-importing it:

```text
required views = frontal + profile
profile = side_agnostic_profile
```

FR192 does not claim those two images are sufficient for all downstream components or methods and does not add left/right profiles or oblique captures.

## 6. Fail-closed inventory rules

The contract pins the accepted coverage state and provenance for every FR192 entry. Merely adding an arbitrary reference cannot convert an unverified target into `existing_governed` or `existing_research_only`.

This prevents an inventory record from becoming an authority-escalation shortcut.

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

The repository gains a governed whole-face coverage index that can answer:

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

The next vertical slice must be selected from an explicit coverage gap and its own method needs. Eye-Pair or mouth methods are not automatically copied to nose, ear, forehead, cheek, or lower-face work.
