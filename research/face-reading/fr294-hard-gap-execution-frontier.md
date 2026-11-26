# FR294 — Remaining hard-gap execution frontier

Status: governance freeze

Watchtower-Track: face-engine

## Purpose

FR293 closes the last currently authorized `partial_gap` 2D morphology column.

The canonical FR282 surface is now:

```text
FR282 feature keys                 = 29
canonical extractors materialized  = 18
remaining gaps                     = 11
reusable_now gaps                   = 0
partial_gap gaps                    = 0
```

FR294 freezes the evidence route for those 11 remaining gaps.

It intentionally materializes no additional product column.

## Why the strategy changes here

FR284–FR293 could mostly advance by reusing governed geometry or by freezing the smallest missing observable primitive.

That lane is now exhausted.

The remaining columns require evidence that the repository does not currently possess:

1. an image/segmentation/appearance model;
2. a provider-neutral RGB relative-3D benchmark;
3. an ear-specific visibility gate followed by a visible-ear image model; or
4. new observation authority for a construct that is currently unavailable.

Adding another geometry wrapper would not satisfy these blockers.

## Lane A — New image model

Five gaps require a new image-visible model.

### forehead.visible_width_shape

Required next:

- governed visible forehead skin-region segmentation;
- representative ordinary RGB selfie validation;
- explicit occlusion/visibility handling.

Forbidden:

- MediaPipe face oval = hairline;
- whole-face width = forehead width;
- traditional forehead text = segmentation authority.

### forehead.visible_hairline_boundary

Required next:

- governed visible hair/skin boundary segmentation;
- visibility and occlusion handling.

Forbidden:

- face-oval top vertices = hairline;
- hidden hairline completion.

### eyebrow.visible_hair_density_texture

Required next:

- visible eyebrow-hair appearance model;
- image-quality admission.

Forbidden:

- geometry as a density proxy;
- landmark count as hair density;
- uncalibrated darkness as density.

### eye.eyelid_crease_or_hooded_category

Required next:

- image-visible crease/hooded observation model;
- explicit unavailable result for insufficient visibility.

Forbidden:

- eye aspect ratio = hooded category;
- generic eye landmarks = crease presence.

### mouth.visible_lip_color

Required next:

- controlled visible-lip color observation;
- illumination/color-quality admission.

Forbidden:

- uncalibrated RGB = traditional red-lips state;
- single-pixel color = visible lip color.

## Lane B — RGB relative-3D benchmark

Four gaps require a provider-neutral benchmark:

```text
forehead.relative_surface_curvature
nose.tip_bridge_relative_projection
cheek_midface.relative_3d_prominence
chin_lower_face.relative_projection
```

The target is relative shape from ordinary RGB.

FR294 does not require physical millimeter depth.

It also does not allow MediaPipe relative Z to be called ground truth.

A future benchmark must establish same-capture/provider-neutral evidence before any of these columns become canonical product outputs.

The existing FR267/FR268 nasal work remains research evidence only and cannot be promoted directly.

## Lane C — Ear visibility, then image model

`ear.visible_boundary_height_shape` has a two-stage blocker.

First:

- issue and validate an ear-specific visibility admission gate.

Then:

- validate an external-pinna visible-boundary model on admitted captures.

FR191 defines shared frontal/profile view roles but explicitly does not prove organ-specific sufficiency.

The MediaPipe 468 face mesh does not model the external pinna.

The GNM ear surface is an authoring/reference surface and is not a subject observation.

Therefore none of these are valid shortcuts:

- profile capture present = ear visible;
- lateral face landmarks = pinna boundary;
- GNM ear geometry = observed subject ear.

## Lane D — Remain unavailable

`ear.thickness_attachment_canal_boundary` remains unavailable.

Current ordinary RGB authority does not establish reliable observation of:

- ear thickness;
- ear-to-head attachment geometry;
- ear canal/gate boundary.

External pinna outline alone cannot authorize those constructs.

## Frozen counts

```text
new image model                    = 5
RGB relative-3D benchmark          = 4
ear visibility then image model    = 1
remain unavailable                 = 1
total                              = 11
```

The executable FR294 ledger is required to equal the exact non-materialized FR293 column set.

Any future materialization must first remove the corresponding evidence blocker rather than changing this count by assertion.

## Next execution order

The next face-engine work should start with the smallest blocker that can be independently validated:

1. ear visibility admission contract, if a real observable visibility signal is available;
2. otherwise select and validate one image-model lane;
3. in parallel, define the provider-neutral RGB relative-3D benchmark protocol;
4. leave ear internal/thickness constructs unavailable until new authority exists.

FR294 itself does not claim that any of these blockers are already satisfied.

Watchtower-Track: face-engine

## 2026-11-05 얼굴 전체 로드맵 연결 (실행 순서 조정만)

**[명하 얼굴 전체 관측 → 전통 형태 판정 → 종합 판독 실행 로드맵](whole-face-observation-reading-roadmap-20261105.md)**을 관상 전반의 실행 순서 기준으로 사용한다.

FR294는 **29개 중 미해결 11개**의 증거 분류와 권한 동결 기록이다. 위 통합 로드맵은 눈썹·미간·눈·코·광대·볼·입·턱·귀·이마 및 삼정/오관/십이궁의 항목별 관측 요구, 현재 정규 계산기와 실제 사진 자동 추출의 차이, 전통 형태 판정/종합 판독의 후속 연결을 정리한다. FR294의 숫자와 허용 범위를 수정하거나 신규 모델·전통 조건·측정 임계값을 승인하지 않는다.

즉, 헤어라인 증거 경로가 아직 막혀 있더라도 **독립적으로 검증 가능한 다른 부위의 관측 작업을 멈추지 않는다.** 진행 중인 로컬 항목 우선 검토([PR #2453](https://github.com/gycha0109-beep/Saju/pull/2453))와 기존 귀/3D/헤어라인 증거 작업을 재사용하고, 중복 엔진·별도 사주 로드맵 개편은 만들지 않는다.
