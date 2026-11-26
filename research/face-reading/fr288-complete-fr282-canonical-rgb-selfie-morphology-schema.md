# FR288 — Complete FR282 canonical RGB selfie morphology schema

Status: implementation

Watchtower-Track: face-engine

## Purpose

FR288 closes the product-facing morphology schema over all 29 FR282 feature keys.

This is not a claim that all 29 extractors exist.

The goal is that downstream consumers no longer have to distinguish between:

- a feature that is absent because the payload contract forgot it;
- a feature that is deliberately unavailable because its extractor or observation authority does not yet exist.

After FR288 every FR282 key is present exactly once.

## State after FR287

FR287 already represents 22 / 29 FR282 columns.

Thirteen columns have canonical extractors materialized in the implementation map.

The remaining sixteen are extractor/authority gaps, nine of which were already represented by explicit unavailable entries inside previously materialized regional clusters.

Seven keys were still structurally absent from the payload.

## Seven newly represented fail-closed entries

### Forehead

- `forehead.visible_width_shape`
  - reason: `forehead_visible_shape_segmentation_not_materialized`
- `forehead.visible_hairline_boundary`
  - reason: `forehead_hairline_segmentation_not_materialized`
- `forehead.relative_surface_curvature`
  - reason: `forehead_relative_3d_provider_not_materialized`

### Eyebrow

- `eyebrow.span_arch_tail_orientation`
  - reason: `eyebrow_boundary_role_wiring_not_materialized`
- `eyebrow.visible_hair_density_texture`
  - reason: `eyebrow_appearance_model_not_materialized`

FR208 geometry definitions are not enough to promote the first eyebrow column because FR39-FR44 still do not authorize a product neutral brow curve/role binding.

### Ear

- `ear.visible_boundary_height_shape`
  - reason: `ear_visibility_shape_extractor_not_materialized`
  - quality dependency remains `visibility_gate`
- `ear.thickness_attachment_canal_boundary`
  - reason: `current_rgb_selfie_observation_authority_unavailable`
  - FR282 authority remains unavailable

## Product payload invariant

FR288 requires:

```text
FR282 feature keys            = 29
represented payload keys      = 29
structurally missing keys     = 0
canonical extractors materialized = 13
extractor / authority gaps    = 16
```

The payload continues to expose no:

- raw image;
- raw landmark array;
- provider landmark index;
- provider run ref;
- canonical asset digest;
- identity embedding/template;
- traditional interpretation;
- classification threshold;
- camera correction.

## What FR288 enables

The traditional interpretation layer can now consume one stable, complete morphology schema and branch on each feature's explicit availability rather than relying on missing object keys.

Future engine work changes individual columns from explicit unavailable to available when a governed extractor is implemented. It does not need to redesign the payload shape again.

## Next engine implementation frontier

The next work should increase the **13 actually materialized columns**, not add more schema.

The highest-value gaps remain:

- product-neutral eyebrow boundary/role wiring;
- forehead/hairline segmentation;
- visible ear admission + shape extraction;
- governed lip fullness / philtrum geometry;
- remaining relative RGB 3D shape columns.

These should be implemented one extractor family at a time without reopening generic camera-correction or hardware-depth research.
