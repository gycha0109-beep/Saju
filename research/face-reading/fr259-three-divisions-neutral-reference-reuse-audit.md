# FR259 — Three Divisions Neutral-Reference Reuse Audit

Watchtower-Track: face-research

## 1. Purpose

FR259 re-audits the seven 麻衣 三停 neutral vertical-reference requirements after the newer neutral observable work in FR208–FR216.

The question is deliberately narrow:

> Does any newer governed neutral observable actually satisfy, or materially narrow, one of the old FR34/FR36 blockers without inventing traditional equivalence?

FR259 does not select a 三停 source variant and does not issue a 三停 metric, threshold, calibration, F1 claim, F6 claim, Production authority, or Commerce authority.

## 2. Upstream state preserved

FR33 still preserves two scan-checked boundary variants with no selected winner.

FR34 still requires seven traditional-anchor-context neutral vertical references:

- hairline
- brow
- yintang
- shangen
- zhuntou
- renzhong
- dige

FR35 still defines three missing neutral surface contracts in `canonical_image_normalized_2d`:

- hairline boundary
- philtrum region
- chin-inferior contour

FR36 still defines seven vertical-reference contracts with no reviewed extraction algorithm.

## 3. Post-FR208 reuse result

### Hairline

No governed post-FR208 hairline surface exists.

Result:

`no_current_reuse_candidate`

### Brow

FR208 defines neutral eyebrow measurement formulas, but FR209 still keeps the governed eyebrow adapter unavailable because the neutral brow curve itself is not authorized.

Result:

`existing_neutral_dependency_still_blocked`

### Yintang context

No governed interbrow/brow-midline successor exists that can replace the blocked FR17 dependency.

Result:

`existing_neutral_dependency_still_blocked`

### Shangen context

Existing nose geometry measures shape properties. A bridge-straightness metric is not a nasal-root vertical point.

Result:

`existing_neutral_dependency_still_blocked`

### Zhuntou context

Nose-tip circularity is a shape metric, not a nose-tip vertical reference.

Result:

`existing_neutral_dependency_still_blocked`

### Renzhong context

No governed philtrum-region or philtrum-midline successor exists.

Result:

`no_current_reuse_candidate`

### Dige context

FR216 materially changes the neutral-observable situation.

It provides a governed:

`canonical visible soft-tissue lower-face contour`

But the following remain false:

- it is not an anatomical chin boundary;
- it is not 地閣;
- it does not issue a traditional binding;
- it uses `canonical_aligned_right_handed_metric_xy` in centimeters;
- FR35 expects `canonical_image_normalized_2d`;
- therefore it does not directly satisfy the FR35 slot or FR36 derivation.

Result:

`bounded_successor_candidate_not_equivalent`

## 4. Selected smallest next primitive

FR259 selects only the following candidate for the next research phase:

`candidate.neutral.face.visible_lower_face_inferior_vertical_reference.fr259`

Its role is strictly:

`product_neutral_visible_lower_face_inferior_reference_only`

The candidate may be reviewed as a deterministic reference derived from the already governed FR216 contour.

It must not be named or interpreted as:

- anatomical chin;
- 地閣;
- mandibular boundary;
- 三停 lower boundary;
- a production physiognomy metric.

## 5. Explicitly rejected shortcuts

FR259 rejects:

1. FR216 visible lower-face contour = 地閣.
2. FR216 metric XY = direct replacement for FR35 normalized-image slot.
3. FR209 unavailable eyebrow surface = valid brow vertical reference.
4. Nose shape metric = 山根/準頭 vertical point.
5. Choosing the FR33 source variant merely because it fits currently available geometry.

## 6. Why this is the next step

The lower-face path is the only one of the seven FR36 contexts where a newer governed contour artifact materially reduces the neutral-observable gap.

That makes it the smallest non-duplicative next research target.

The next phase must review whether a product-neutral inferior vertical reference can be derived from FR216 while keeping:

- traditional equivalence false;
- FR35 frame equivalence false unless separately proved;
- source-variant selection unresolved;
- calibration and semantic claims unissued.

## 7. Next frontier

`review_product_neutral_visible_lower_face_inferior_vertical_reference_from_fr216_without_dige_equivalence_or_fr35_frame_collapse`
