# MESH5.1 — Weighted MediaPipe 468 Region Adapter

MESH5 proved that the shared GNM provider-region ontology can be projected onto the pinned MediaPipe v0.10.35 468-vertex canonical topology. Its hard one-region-per-vertex partition was intentionally simple for the first correspondence PoC, but it is too strong for morphology metrics because provider regions can overlap and boundary evidence is uncertain.

MESH5.1 adds a second authoring adapter rather than rewriting MESH5 history.

## Contract

```text
GNM provider region masks
  -> existing canonical-axis robust registration
  -> local GNM face-region neighborhood around each MediaPipe vertex
  -> distance-weighted provider-membership vote
  -> weighted MediaPipe memberships
     - core
     - border
     - ambiguous
     - unassigned
```

The adapter is explicitly **not** a hard partition:

- a MediaPipe vertex may retain multiple region memberships;
- GNM provider overlap is preserved instead of collapsed through render priority;
- projection-distance outliers may remain unassigned;
- external ears remain unsupported on the core MediaPipe 468 topology;
- bilateral names are expressed as canonical `negative_x` / `positive_x`, not anatomical left/right.

## Weighting

For every MediaPipe canonical vertex, the authoring tool inspects the nearest local GNM provider-region vertices after the same robust canonical-axis registration used by MESH5. Neighbor evidence is distance-weighted. When one GNM provider vertex belongs to multiple provider regions, its evidence is divided across those memberships instead of duplicated.

The resulting region weights are normalized per MediaPipe vertex. Only the strongest authoring memberships are retained in the exported adapter; full production calibration is deliberately deferred.

## Authoring classes

`core`
: one region has strong local support and a clear margin over the next candidate.

`border`
: a primary region exists but evidence is less dominant, which is expected near physical boundaries.

`ambiguous`
: local provider evidence is mixed enough that a single region should not be treated as authoritative.

`unassigned`
: the nearest projected GNM provider-region surface evidence is a robust distance outlier. The vertex keeps diagnostics but no accepted region membership.

The numerical thresholds used for these labels are **authoring QA thresholds only**. They are not morphology classifier thresholds, population norms, anatomical tolerances, or product scores.

## Runtime boundary

MESH5.1 still introduces no runtime GNM or Blender dependency. The generated adapter can later be compiled into a lightweight MediaPipe-index lookup for runtime consumers, but production activation requires morphology validation first.

Downstream interpretation remains separate:

```text
shared physical geometry
  -> validated morphology observables
     -> MyeongHa face-reading interpretation
     -> BEJEWELY / Visually Face Lab styling and visual analysis
```

## Ear boundary

GNM remains the shared full-head/ear reference surface. Core MediaPipe 468 has no external pinna surface, so MESH5.1 does not fabricate ear vertices. Ear morphology requires a separate observation path or multi-view/full-head detector.

## Validation targets

CI verifies:

- all 468 MediaPipe vertices retain diagnostic records;
- hard partitioning is disabled;
- overlapping memberships actually occur;
- unassigned vertices are permitted;
- all retained weights and indices are valid;
- ears remain unsupported;
- production metric authorization remains false;
- Blender creates weighted vertex groups plus front and three-quarter QA previews.
