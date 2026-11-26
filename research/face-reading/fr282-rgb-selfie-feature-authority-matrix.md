# FR282 — Ordinary-smartphone RGB selfie feature authority matrix

Status: implementation

Watchtower-Track: face-research

## Product invariant

MyeongHa Face Reading is a normal-phone camera product.

The face observation path starts from an **ordinary smartphone RGB front-camera selfie at 25–30 cm**. The product must not require ARCore Raw Depth, Apple TrueDepth, ToF, calibrated external depth cameras, or any manufacturer-specific depth capability.

FR282 exists because previous independent-3D research drifted toward sensor characterization while the actual product question is different:

> Which face-reading-relevant observable features can be recovered repeatably from the same ordinary RGB selfie?

Physical millimeter depth is therefore **not presumed necessary**. Where front/back shape matters, the immediate product target is relative 3D morphology.

## Reference taxonomy

The visual taxonomy supplied for this research pass covers:

- eyes / eyebrows
- nose
- mouth / philtrum
- ears
- forehead
- chin / lower face

The existing whole-face engine additionally carries cheek / mid-face as its own neutral region. Traditional palace/fortune labels remain downstream interpretation and are not measurement labels.

## Current code audit

| Region | Reusable now | Main gap after audit | FR282 class |
| --- | --- | --- | --- |
| Forehead | none at product boundary | visible hairline + forehead boundary/shape | segmentation |
| Eyebrow | FR208 geometry definitions, provider brow topology research | product-visible brow span/arch/tail wiring; hair appearance | 2D + segmentation |
| Eye pair | FR210 axes, FR215 asymmetry, FR218/219 review path | eyelid crease/hooded appearance model | 2D + segmentation |
| Nose | bridge deviation, tip contour circularity | alar/nostril contour + relative tip/bridge projection | contour + relative 3D |
| Mouth/lips | FR80/82, FR212, FR214 | governed lip fullness + philtrum axes + appearance | 2D/contour |
| Ear | physical reference surface exists in GNM, not in MediaPipe468 photo mesh | visibility gate + ear image model | visibility-dependent |
| Cheek/mid-face | FR211 width, FR217 visible prominence | optional relative 3D prominence benchmark | 2D + relative 3D |
| Chin/lower face | FR213 width, FR216 contour | chin dimensions/center deviation + optional relative projection | 2D + relative 3D |

## Important correction

Existing FR77 MediaPipe-derived canonical metric geometry remains useful as a governed provider geometry surface, but FR282 does **not** treat its centimeter coordinate as independent physical anthropometric truth.

Likewise, future RGB 3D reconstruction models may be compared as providers, but no such provider may be called ground truth merely because it returns metric-looking coordinates.

## Benchmark providers for the next frontier

The same saved RGB selfie must be fed to the candidate providers without changing the input image between lanes.

Initial lanes:

1. MediaPipe Face Landmarker — current baseline landmark/mesh provider.
2. ML Kit Face Mesh — alternate mobile RGB mesh lane.
3. 3DDFA_V2 — face-specific 3DMM reconstruction lane.
4. MICA — metric-face reconstruction research lane.
5. RealDenseFace — dense correspondence / FLAME reconstruction lane.
6. Depth Pro — general monocular metric-depth auxiliary lane.
7. Metric3D v2 — general monocular metric-depth auxiliary lane.

This list is a benchmark set, not a product dependency decision. License, runtime, privacy, mobile/server placement, and reproducibility must be recorded separately.

## Benchmark outputs

Every provider comparison must be projected into provider-neutral features, not judged by visual mesh quality alone.

Priority feature comparisons:

- eye width/height and spacing
- eye outer-corner tilt and bilateral asymmetry
- brow span/arch/tail orientation
- nose bridge centerline
- nose alar width / nostril geometry
- nose tip/bridge **relative** projection
- mouth width, corner orientation, outline angularity
- lip fullness and philtrum geometry
- visible mid-face width / cheek contour prominence
- lower-face width / chin contour / chin center deviation
- visibility state for ear and hairline-dependent features

## 25–30 cm repeatability protocol

The eventual empirical benchmark uses the same person and ordinary front-camera RGB capture only:

- 25 cm × 3 captures
- 30 cm × 3 captures
- neutral expression
- face centered and sufficiently fills frame
- no special depth mode required

The primary question is not whether a provider reconstructs exact millimeters. It is whether the **derived face-reading feature remains stable for the same face across repeat captures and the 25–30 cm product range**.

## Decision rule

Feature authority is selected **per feature**, not by declaring one provider the universal winner.

Examples:

- 2D eye/mouth ratios may remain on landmark geometry.
- hairline/eyelid/ear visibility may require segmentation/classification.
- nose/chin relative projection may use a face-specific RGB 3D provider if repeatability is materially better.
- unsupported observations remain unavailable.

## Non-authorities

FR282 issues none of the following:

- traditional face-reading threshold
- fortune classification
- physical millimeter ground truth
- correction/calibration formula
- biometric identity
- medical/anatomical diagnosis
- production activation

## Next frontier

Implement a provider-neutral **same-RGB-input benchmark harness** and begin with outputs already available from MediaPipe plus one independent RGB reconstruction lane before expanding the full candidate set.

## 2026-11-05 전 부위 관상 관측 로드맵 연결

[얼굴 전체 관측·형태 판정·종합 판독 실행 로드맵](whole-face-observation-reading-roadmap-20261105.md)은 이 29개 정규 관측 키를 재사용하면서, **명시적 세부 관측 요구(눈썹 굵기·미간·볼 깊이·귀 펼쳐짐 등)**와 전통 형태 판정까지의 실제 증거 결손을 항목별로 관리한다.

이는 FR282의 일반 RGB 25–30cm 촬영 기준, 단일 모델 승자 금지, 중립 관측/전통 해석 분리, 물리 깊이 과장 금지, 29개 정규 키와 현재 허가 상태를 변경하지 않는다. 추가 시점은 선택적인 검증·관측 연구 후보이며 제품 필수 입력으로 승인된 것이 아니다.
