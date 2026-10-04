# FR306 — Visible hairline runtime candidate selection

Status: empirical candidate freeze

Watchtower-Track: face-observation-engine

## Purpose

FR305 defines the admission contract for a visible hair/skin boundary model but intentionally admits no model.

FR306 selects concrete empirical candidates without changing that authority.

Current Three-Divisions observation-side readiness remains:

- neutral reference contracts ready: 6 / 7
- remaining blocker: visible hairline
- admitted hairline runtime providers: 0
- traditional bindings: 0
- Product materialization: 18 / 29

## Primary candidate

`microsoft/Florence-2-base`

Exact revision:

`5ca5edf5bd017b9919c05d08aebef5e4c7ac3bac`

Why first:

- the repository already pins this exact revision in FR101;
- the FR103 local runner already contains deterministic polygon parsing for Florence-2 referring-expression segmentation;
- the model card declares MIT;
- the processor exposes referring-expression segmentation polygon output.

FR306 does not assume that ear feasibility implies hairline feasibility.

The new prompt family is:

- `visible hair`
- `forehead skin`
- `visible hairline` — diagnostic only

The primary empirical question is whether the visible hair region and forehead-skin region can support a reliable visible shared-boundary candidate without completing hidden segments.

## Fallback

Reuse the already pinned FR101 pair:

- `IDEA-Research/grounding-dino-base@12bdfa3120f3e7ec7b434d90674b3396eccf88eb`
- `facebook/sam2.1-hiera-small@e07df6aa19f5c6545121551bf89957b7663ee715`

Grounding supplies candidate regions and SAM2 refines masks.

A refined mask cannot repair an incorrect grounding result, so this lane remains empirical only.

## Product-path exclusion

CelebAMask-HQ is useful evidence that skin/hair face-parsing labels are technically representable, but its official agreement restricts the dataset to non-commercial research and its repository software notice is likewise non-commercial/research-oriented.

FR306 therefore excludes CelebAMask-HQ and derivatives from the product dependency path unless rights are separately resolved.

## Validation cases

The future local runner must exercise:

- clear central hairline;
- M-shape / widow's peak;
- asymmetric recession;
- partial bangs;
- substantially hidden hairline;
- upper-forehead crop;
- headwear occlusion;
- dark-hair/dark-background;
- light-hair/low-contrast;
- ordinary indoor illumination variation.

The review target is only the image-visible hair/skin interface.

## Fail-closed rules

Do not:

- substitute MediaPipe face oval or top mesh;
- infer hidden hairline segments;
- call a generic hair mask a valid hairline observation;
- call a direct `visible hairline` prompt authoritative before empirical review;
- create a numeric acceptance threshold in this phase;
- issue an FR305 admission receipt;
- change #1521 to 7 / 7;
- bind 髮際;
- activate Production or Commerce.

## Privacy

Real operator images, overlays, raw polygons and private image digests remain local under a gitignored cache path.

Repository evidence is limited to aggregate, non-identifying failure-mode conclusions.

## Next

Build a local Florence-2 hairline empirical runner by reusing FR103 parser/runtime mechanics.

Normal CI must test deterministic parsing and authority boundaries with synthetic fixtures only and must not download the model.
