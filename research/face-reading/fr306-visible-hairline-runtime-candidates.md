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


## Post-freeze empirical update

The original FR306 freeze remains historical context for the Florence-2 primary lane, Grounding-DINO + SAM2 fallback lane, and the excluded non-commercial face-parsing path.

Subsequent real local bounded work produced the following governed engineering outcome:

- Florence-2 primary reached FR310 and was rejected on critical occlusion behavior.
- Grounding-DINO + SAM2.1 fallback was executed locally but failed the critical partial-bangs grounding condition; segmentation refinement could not repair the wrong grounding.
- A repository-controlled deterministic multi-signal candidate was then implemented and calibrated locally:
  - provider ID: `candidate.hairline.multisignal_visible_interface.fr306`
  - exact revision: `0.2.0`
  - runner contract: `MULTISIGNAL-VISIBLE-HAIRLINE-LOCAL-CANDIDATE-v1`
  - method: adaptive skin transition + luminance/chroma edge + texture + horizontal continuity + explicit occlusion/truncation/no-visible-hairline handling.

The 18-capture local engineering run is recorded only as deidentified aggregate evidence. It does not constitute FR310 or FR312 approval.

The candidate registry therefore includes this v3.1 implementation as an additional empirical candidate, while preserving all authority boundaries:

- FR305 admission issued: false
- admitted runtime providers: 0
- repository neutral-reference readiness: 6/7
- real FR318 hairline metric reference: false
- real FR319 seven-reference bundle: false
- traditional binding: 0
- Three-Divisions execution: false
- Product / Production / Commerce: false

Validation identity is now required to remain exact across FR308, FR310, FR312 and FR313. Candidate swapping between stages is rejected.

Actual v3.1 evidence must pass the private human-review packet before it can enter governed FR308 → FR312 execution. Preview state and numeric signal values are not accepted as automatic human judgments.

Watchtower-Track: face-observation-engine


## v3.2 fail-closed boundary exposure update

Governed FR308/FR310 review of revision 0.2.0 rejected the candidate because partial-bangs and substantially-hidden captures exposed an internal diagnostic path as if it were a hairline boundary.

The 0.3.0 revision keeps the same multi-signal preview classifier and changes only candidate-boundary exposure:

- `visible_interface_candidate`: candidate boundary may be exposed;
- `partially_visible_or_occluded`: candidate boundary suppressed;
- `unavailable`: candidate boundary suppressed;
- `no_visible_hairline_candidate`: candidate boundary suppressed;
- dynamic-programming path remains local/private diagnostic evidence only.

This change does not itself establish FR310 eligibility. The same bounded cases require fresh human review and governed adjudication.

Authority remains closed:
- FR305 admission: false
- neutral reference capability: 6/7
- real FR318: false
- real FR319: false
- traditional binding: 0
- Three-Divisions execution: false
- Product / Production / Commerce: false

Watchtower-Track: face-observation-engine


## v3.3 post-FR312 exposure guards

Real expanded FR312 validation of revision `0.3.0` was hard-rejected. The deidentified failure pattern was not hidden completion; it was inappropriate exposure of a raw visible-interface path in two conditions:

- low-local-contrast/light-hair: candidate localized inside/above the actual visible skin-hair interface;
- asymmetric/fringe: candidate followed a lower fringe/hair edge.

Revision `0.4.0` therefore keeps the existing multi-signal extractor but adds conservative post-classifier exposure guards for ambiguous material direction and low fringe-edge risk. Guarded raw-visible states are downgraded to `partially_visible_or_occluded`, which suppresses external boundary exposure.

This is engineering candidate revision only. The observed FR312 bundle becomes regression evidence and cannot be reused as an untouched independent holdout. FR305 admission, FR313, real FR318/FR319, traditional binding, Three-Divisions execution, Product, Production and Commerce remain unauthorized.
