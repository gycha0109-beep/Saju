# 명하 얼굴 전체 관측 항목 대응표 — 구현 기준 v0.1

> 기준일: 2026-11-05 · 상태: **기술 명세/관측 요구 대응**, 실측 검증이나 제품 승인 아님  
> 상위 로드맵: [얼굴 전체 관측·형태 판정·종합 판독](whole-face-observation-reading-roadmap-20261105.md)  
> 시행 기술 명세: [관측·연계 계약](whole-face-observation-technical-spec-20261105.md)  
> 기준 소스: `packages/face-reading/src/rgb-selfie-product-column-map-fr284.ts`, `rgb-selfie-product-column-map-fr293.ts`, `rgb-selfie-feature-authority-matrix-fr282.ts` (`main` 현재 내용 대조)

## 1. 상태의 의미

- **정규 계산기 구현(18개)**: FR293의 `canonical_extractor_materialized`. 필요한 사진 좌표·가시 윤곽 또는 관측 입력을 **실제로 구할 수 있다는 의미가 아님**. 인간 정확도, 모델 오류율, 전통 의미 연결은 별도 검증.
- **근거·관측 미완료(11개)**: FR294에 동결된 5개 이미지 외형, 4개 상대 3D, 귀 가시성/모델 1개, 현행 불가 1개.
- 아래 **추가 요구**는 새로 승인한 FR282 키가 아니다. 기존 정규 키만으로 충분히 관측할 수 있는지 검토하기 위한 **갭 목록**이다.
- `calculation_available`, `photo_extraction_verified`, `traditional_binding_admitted`, `product_authorized`는 각각 독립적인 판단이다.

## 2. 정규 29개 항목 — 소스에서 1:1 대응

| 번호 | 부위 | 정규 featureKey | 현재 계산 상태 | 기대 출력 형태 | 다음 사진 측정 검토 |
|---:|---|---|---|---|---|
| 1 | 이마 | `forehead.visible_width_shape` | 근거·관측 미완료 | `segmentation_geometry` | 정밀 이미지 분할 / 가림 판정 |
| 2 | 이마 | `forehead.visible_hairline_boundary` | 근거·관측 미완료 | `contour_geometry` | 모근선 정답 / 가림 / 경계 |
| 3 | 이마 | `forehead.relative_surface_curvature` | 근거·관측 미완료 | `relative_3d_shape` | RGB 상대 3D / 독립 참조 |
| 4 | 눈썹 | `eyebrow.span_arch_tail_orientation` | 정규 계산기 구현 | `composite_continuous_axes` | 랜드마크 + 가시 눈썹 곡선 |
| 5 | 눈썹 | `eyebrow.visible_hair_density_texture` | 근거·관측 미완료 | `appearance_descriptor` | 고해상도 눈썹 외형 모델 |
| 6 | 눈 | `eye.width_height_ratio` | 정규 계산기 구현 | `scalar_ratio` | 양안 랜드마크 |
| 7 | 눈 | `eye.inter_eye_spacing_ratio` | 정규 계산기 구현 | `scalar_ratio` | 양안 랜드마크 |
| 8 | 눈 | `eye.outer_corner_tilt` | 정규 계산기 구현 | `scalar_degree` | 눈 경계 역할 검증 |
| 9 | 눈 | `eye.bilateral_shape_asymmetry` | 정규 계산기 구현 | `composite_continuous_axes` | 양안 대칭축 |
| 10 | 눈 | `eye.eyelid_crease_or_hooded_category` | 근거·관측 미완료 | `categorical_observation` | 눈꺼풀 외형 모델 |
| 11 | 코 | `nose.bridge_centerline_deviation` | 정규 계산기 구현 | `scalar_ratio` | 코 윤곽/중심선 |
| 12 | 코 | `nose.tip_contour_circularity` | 정규 계산기 구현 | `scalar_ratio` | 코끝 윤곽 |
| 13 | 코 | `nose.alar_width_and_nostril_geometry` | 정규 계산기 구현 | `composite_geometry` | 콧볼·비공 실제 경계 |
| 14 | 코 | `nose.tip_bridge_relative_projection` | 근거·관측 미완료 | `relative_3d_shape` | RGB 상대 3D / 독립 참조 |
| 15 | 입·인중 | `mouth.width_and_relative_size` | 정규 계산기 구현 | `composite_continuous_axes` | 입 경계·비율 |
| 16 | 입·인중 | `mouth.corner_orientation` | 정규 계산기 구현 | `scalar_ratio` | 입꼬리 경계·각도 |
| 17 | 입·인중 | `mouth.outline_angularity` | 정규 계산기 구현 | `scalar_degree` | 입 외곽 윤곽 |
| 18 | 입·인중 | `mouth.visible_lip_fullness` | 정규 계산기 구현 | `composite_geometry` | 위·아래 입술 경계 |
| 19 | 입·인중 | `mouth.philtrum_length_width` | 정규 계산기 구현 | `composite_continuous_axes` | 인중의 실제 보이는 골·폭 |
| 20 | 입·인중 | `mouth.visible_lip_color` | 근거·관측 미완료 | `appearance_descriptor` | 조명 통제된 색상 / 정적 v1 제외 |
| 21 | 귀 | `ear.visible_boundary_height_shape` | 근거·관측 미완료 | `visibility_descriptor` | 귀별 가시성 + 귀 전용 분할 |
| 22 | 귀 | `ear.thickness_attachment_canal_boundary` | 근거·관측 미완료 | `unavailable` | 현행 RGB 근거 없음 — 보류 |
| 23 | 광대·중안면 | `cheek_midface.visible_width_ratio` | 정규 계산기 구현 | `scalar_ratio` | 중안면 정면 비율 |
| 24 | 광대·중안면 | `cheek_midface.visible_contour_prominence` | 정규 계산기 구현 | `scalar_ratio` | 보이는 윤곽 변곡 |
| 25 | 광대·중안면 | `cheek_midface.relative_3d_prominence` | 근거·관측 미완료 | `relative_3d_shape` | RGB 상대 3D / 독립 참조 |
| 26 | 턱·하관 | `chin_lower_face.visible_width_ratio` | 정규 계산기 구현 | `scalar_ratio` | 하관 너비 / 기준축 |
| 27 | 턱·하관 | `chin_lower_face.visible_contour` | 정규 계산기 구현 | `contour_geometry` | 하관/턱끝 가시 윤곽 |
| 28 | 턱·하관 | `chin_lower_face.chin_height_width_center_deviation` | 정규 계산기 구현 | `composite_continuous_axes` | 턱끝 중심/너비/높이 |
| 29 | 턱·하관 | `chin_lower_face.relative_projection` | 근거·관측 미완료 | `relative_3d_shape` | RGB 상대 3D / 독립 참조 |

**수량 교차 검증:** 29개 전체 / FR293 계산기 구현 18개 / FR294 관측 근거 미해결 11개. 기존 수량을 수정하는 명세가 아니다.

## 3. 사용자가 요구한 세부 관상 정보와 추가 갭

| 필수 관측 세부 정보 | 현재 연결 가능한 키/근거 | 검토할 기술 경로 | 현재 주의·누락 |
|---|---|---|---|
| 미간 실제 눈썹 사이 거리 | `eyebrow.span_arch_tail_orientation / eye.inter_eye_spacing_ratio` | 정면 2D | 서로 다른 눈썹 안쪽 시작점 확인; 눈 사이 거리로 대체 금지 |
| 미간의 상대적 입체 깊이 | `forehead.relative_surface_curvature` | RGB 상대 3D | 전통 용어·해부 기준 미고정; 독립 참조 전까지 후보 |
| 눈썹 실제 털 폭/굵기 | `eyebrow.visible_hair_density_texture` | 고해상도 분할/질감 | 관측값 정의 필요; 곡선 가로 폭은 털 두께가 아님 |
| 눈썹산 높이·좌우 비대칭 | `eyebrow.span_arch_tail_orientation` | 정면 2D 곡선 | 두 눈썹 실제 안팎 역할·경계 검토 |
| 눈꺼풀 주름/덮임 형태 | `eye.eyelid_crease_or_hooded_category` | 정면 이미지 분할 | 표정·조명·속눈썹 가림 검토 |
| 안구 돌출·함몰 | `eye.width_height_ratio (불충분)` | 사선/측면+상대3D 신규 후보 | 눈 가로세로 비율과 돌출은 무관; 확장 관측 필요 |
| 코뿌리 실제 높이 | `nose.tip_bridge_relative_projection (부분)` | 상대3D | 물리 높이로 표시 금지 |
| 콧볼 펼쳐짐·콧구멍 둘레 | `nose.alar_width_and_nostril_geometry` | 정면/사선 경계 | 보이지 않는 비공 내부 윤곽 추정 금지 |
| 광대 전방 돌출 | `cheek_midface.relative_3d_prominence` | 상대3D + 독립 참조 | 정면 너비와 분리 |
| 볼 꺼짐·깊이·살집 | `cheek_midface.relative_3d_prominence (불충분)` | 상대3D / 여러 시점 | 광대 아래 볼 부위 별도 관측·정의 필요 |
| 턱의 각짐·둥글기 | `chin_lower_face.visible_contour` | 2D 윤곽 | 골격 진단과 분리 |
| 턱끝 전방 돌출 | `chin_lower_face.relative_projection` | 상대3D | 모델 Z를 실측 mm로 대체 금지 |
| 귓바퀴/귓불 세부 형상 | `ear.visible_boundary_height_shape` | 귀 전용 분할 / 측면 | 가시성 게이트 필요; 일반 얼굴 메시 외부 귀 미포함 |
| 귀의 펼쳐짐·부착 각도 | `ear.thickness_attachment_canal_boundary (불충분)` | 사선/측면 + 독립 기하 | 새 요구 관측; 현행 미지원 유지 |
| 헤어라인 M형·좌우 후퇴 | `forehead.visible_hairline_boundary` | 모근 경계+가림 라벨 | 헤어 끝/앞머리 끝과 혼동 금지 |
| 관자놀이 곡면·이마 볼록함 | `forehead.relative_surface_curvature` | 정면+사선/3D | 가시 영역과 가린 면 분리 |
| 삼정의 세로 기준점 | `forehead.visible_hairline_boundary 등 + FRB005` | 공통 좌표/부위 가시성 | 전통 기준점 7개와 사진 관측 정확히 결속; 미승인 스팬 실행 금지 |
| 오관·십이궁·부위 간 균형 | `FR258/FR311/FRB/T5/T6` | methodology-specific map | 전통별 원본·위치·해석 권한 고정; 임의 혼용 금지 |

이 목록에 직접 연결할 수 없는 항목은 **`extension_candidate`**로 명시한다. 임의로 기존 키의 의미를 넓히거나 새 정규 키·분류기·관상 임계값을 발행하지 않는다.

## 4. 전통 관상 연결 방식 — 별도의 검증 행

각 형태 조건을 실제로 연결할 때는 아래 8가지 식별자를 분리하여 관리한다.

1. `traditionalSourceRef`: 특정 고전의 원문·권·구절 및 검증 상태
2. `methodologyRef`: 어느 전통의 삼정·오관·십이궁 지도인지
3. `morphologyPredicateId`: 원문에서 도출한 **외형 조건**, 역사적 의미와 분리
4. `requiredFeatureKeys`: 필요한 중립 관측 목록
5. `viewAndVisibilityRequirements`: 정면·사선·측면 및 보여야 하는 부위
6. `metricAndHumanReference`: 검증된 수치 정의·사람 판정 프로토콜
7. `mappingAdmission`: `unissued` / `under_review` / `admitted`
8. `interpretationScope`: 허용된 전통 주장만 소비하는 범위

**현재 전 항목에 자동으로 특정 전통 형태를 부여하는 것은 불허.** FR311의 역사적 형태 명칭·문장과 사진 기반 중립 수치의 사이에는 검증되지 않은 대응 공백이 있다. FR312E의 형태 단독 라벨 검토에서 출처 의미를 라벨러에게 숨기는 규칙을 보존한다.

## 5. 단계별 사용처

- **1단계:** 이 표와 실제 코드·출처·입력 가능성을 항목 단위로 대조, 누락을 재현 가능하게 기록.
- **2단계:** #2453 현행 로컬 검토 흐름으로 연결 가능한 값과 계산기만 있는 값을 분리.
- **3단계:** 실제 얼굴 분할·질감 관측 모델별로 부위 경계 및 형태 오류를 검사.
- **4단계:** 상대 3D는 FR295/FR299 독립 참조를 통과할 때만 수치 후보 승인 검토.
- **5~6단계:** 전통 조건·해석 허용 여부를 분리하여 연결, 결론 범위 확대 금지.
- **7단계:** 독립 사람 정답 및 반복 촬영 증거로 검증.

## 6. 데이터 관리

원본 얼굴 사진, 귀·눈썹 등의 세부 좌표, 원본 segmentation masks, 재구성 가능한 생체 자료와 모델 출력은 비공개 로컬 자료다. 공개 PR에는 코드·명세·합성 자료·안전한 집계만 기록한다. 사진을 다른 실명/사주 명식과 결합하지 않는다.

Watchtower-Track: face-observation-engine


## 부록 A. 기존 FR284 관측 입력 경로와 원래 필요 extractor

아래는 **FR284가 기록했던 입력 소스/필요 extractor를 정확히 전사한 기술 탐색 목록**이다. FR285~FR293에서 정규 계산기가 추가로 구현된 항목은 이미 해결된 계산 로직이 있으므로, 이 부록의 과거 `requiredExtractor`를 *현재 미구현 상태*로 단정하지 않는다. **사진에서 실제 윤곽·좌표를 확보할 필요가 있는지**를 확인하는 출발점으로만 사용한다.

| 정규 키 | FR284 초기 필요 extractor | FR284 기록 소스 경로 |
|---|---|---|
| `forehead.visible_width_shape` | `visible_forehead_segmentation_geometry` | `packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts` |
| `forehead.visible_hairline_boundary` | `visible_hairline_boundary_segmentation` | `packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts` |
| `forehead.relative_surface_curvature` | `provider_neutral_rgb_relative_3d_forehead_shape` | 없음 (독립 관측기 필요) |
| `eyebrow.span_arch_tail_orientation` | `canonical_eyebrow_geometry_binding` | `packages/face-reading/src/cross-face-neutral-observable-primitives-fr208.ts`, `packages/face-reading/src/mediapipe-published-eyebrow-component-decomposition-fr39.ts` |
| `eyebrow.visible_hair_density_texture` | `visible_eyebrow_hair_appearance_model` | `packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts` |
| `eye.width_height_ratio` | `canonical_eye_pair_morphology_fr284` | `packages/face-reading/src/eye-neutral-axis-bundle-fr210.ts`, `packages/face-reading/src/eye-pair-geometric-y-span-runtime-fr178.ts` |
| `eye.inter_eye_spacing_ratio` | `canonical_eye_pair_morphology_fr284` | `packages/face-reading/src/eye-neutral-axis-bundle-fr210.ts` |
| `eye.outer_corner_tilt` | `canonical_eye_pair_morphology_fr284` | `packages/face-reading/src/cross-face-neutral-observable-primitives-fr208.ts`, `packages/face-reading/src/eye-neutral-axis-bundle-fr210.ts`, `packages/face-reading/src/observable-morphology-fr76-eye-chord-propagation-fr283.ts` |
| `eye.bilateral_shape_asymmetry` | `canonical_eye_pair_morphology_fr284` | `packages/face-reading/src/eye-asymmetry-surface-fr215.ts` |
| `eye.eyelid_crease_or_hooded_category` | `eyelid_visible_appearance_model` | `packages/face-reading/src/face-reading-observable-morphology-measurement-boundary-fr206.ts` |
| `nose.bridge_centerline_deviation` | `canonical_nose_geometry_binding` | `packages/face-reading/src/nose-geometry.ts` |
| `nose.tip_contour_circularity` | `canonical_nose_geometry_binding` | `packages/face-reading/src/nose-geometry.ts` |
| `nose.alar_width_and_nostril_geometry` | `visible_alar_and_nostril_contour_geometry` | `packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts` |
| `nose.tip_bridge_relative_projection` | `provider_neutral_rgb_relative_3d_nose_projection` | `packages/face-reading/src/nasal-apex-geometry-candidate-study-fr267.ts`, `packages/face-reading/src/nasal-apex-empirical-bundle-fr268.ts` |
| `mouth.width_and_relative_size` | `canonical_mouth_geometry_binding` | `packages/face-reading/src/neutral-mouth-contour-metric-fr80.ts`, `packages/face-reading/src/neutral-mouth-relative-size-metric-fr82.ts` |
| `mouth.corner_orientation` | `canonical_mouth_geometry_binding` | `packages/face-reading/src/visible-mouth-corner-orientation-fr212.ts` |
| `mouth.outline_angularity` | `canonical_mouth_geometry_binding` | `packages/face-reading/src/role-free-mouth-outline-angularity-fr214.ts` |
| `mouth.visible_lip_fullness` | `governed_visible_upper_lower_lip_fullness_geometry` | `packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts` |
| `mouth.philtrum_length_width` | `canonical_visible_philtrum_geometry` | 없음 (독립 관측기 필요) |
| `mouth.visible_lip_color` | `controlled_visible_lip_color_observation` | `packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts` |
| `ear.visible_boundary_height_shape` | `visible_ear_admission_and_shape_model` | `packages/face-reading/src/face-reading-product-capture-view-contract-fr191.ts`, `packages/face-geometry/README.md` |
| `ear.thickness_attachment_canal_boundary` | `none_current_rgb_selfie_authority_unavailable` | `packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts` |
| `cheek_midface.visible_width_ratio` | `canonical_midface_geometry_binding` | `packages/face-reading/src/visible-midface-band-fr211.ts` |
| `cheek_midface.visible_contour_prominence` | `canonical_midface_geometry_binding` | `packages/face-reading/src/visible-cheek-contour-prominence-fr217.ts` |
| `cheek_midface.relative_3d_prominence` | `provider_neutral_rgb_relative_3d_cheek_prominence` | 없음 (독립 관측기 필요) |
| `chin_lower_face.visible_width_ratio` | `canonical_lower_face_geometry_binding` | `packages/face-reading/src/visible-lower-face-width-fr213.ts` |
| `chin_lower_face.visible_contour` | `canonical_lower_face_geometry_binding` | `packages/face-reading/src/canonical-visible-lower-face-contour-fr216.ts` |
| `chin_lower_face.chin_height_width_center_deviation` | `canonical_chin_dimension_and_centering_geometry` | `packages/face-reading/src/canonical-visible-lower-face-contour-fr216.ts`, `packages/face-reading/src/central-chin-reference-trace-protocol-fr54.ts` |
| `chin_lower_face.relative_projection` | `provider_neutral_rgb_relative_3d_chin_projection` | 없음 (독립 관측기 필요) |

**다음 구현 검증:** 구현자는 이 부록의 원래 source 경로와 FR293의 최종 materialized 항목을 비교하여, 이미 계산 가능한 값을 재구현하지 않고 `실제 사진→가시 관측→정규 값`에서 끊기는 정확한 단계만 표시한다.

## 부록 B. 딥리서치 반영 — 정규 29개별 모델·정답·채택 기준

> [기술·데이터 선정 명세](whole-face-model-data-decision-20261105.md)와 함께 사용한다. **기존 계산기 있음/없음과 사진 추출 검증됨/안 됨은 별개**이며 모든 후보의 인간 정답 정확도는 아직 `not_evaluated`. 아래 모델명은 **채택 승인 아닌 비교 후보**다. 인물·촬영·가중치·전통 의미의 권한 경계를 그대로 적용한다.

| 정규 featureKey | 먼저 재사용할 것 | 비교 또는 새 학습 필요한 것 | 실제 정답 입력 | 비교·가림 검증 |
|---|---|---|---|---|
| `forehead.visible_width_shape` | 기존 face geometry+파싱 후보 | BiSeNet↔FaceXFormer 피부/이마 보이는 경계 | 보이는 이마 mask/피부 상단·측면 | IoU·경계 오차·머리 가림/부분 보류 |
| `forehead.visible_hairline_boundary` | 헤어라인 연구 데이터/프리뷰 | 헤어-피부 접점 후보 비교; 필요시 별도 경계기 | 수동 실제 보이는 모근 polyline/가림 구간 | Chamfer·Hausdorff·숨은 경계 허위 완성 |
| `forehead.relative_surface_curvature` | FR295 프로토콜 | 3DDFA-V2 후보(독립 참조 전 제품 불가) | 동일 촬영/등록 독립 3D 이마 면 | 상대곡률 오차·시점/조명 안정성 |
| `eyebrow.span_arch_tail_orientation` | FR292 정규 계산+PR2453 눈썹 span | 실제 털 상하 경계 마스크 비교 | 내/외 눈썹 끝·중심 곡선, 부분가림 | 곡선 거리·각도 MAE·좌우 역할 |
| `eyebrow.visible_hair_density_texture` | PR2453 눈썹 class는 면적 후보만 | 전용 고해상 ROI/소형 Keras·torch 학습 필요 | 털 폭/피복/밀도 별도 라벨·화장/문신 보류 | 사람 합의·두께 MAE·density κ |
| `eye.width_height_ratio` | FR284~293 계산·MediaPipe | 눈 윤곽 parsing 비교만 | 실제 보이는 양안 윤곽/개안 상태 | 가로세로비 MAE·눈감김 제외 |
| `eye.inter_eye_spacing_ratio` | 기존 MediaPipe/FR284~293 | 내안각 실제 역할 검증 | 두 눈 안쪽 실제 눈구석(미간과 별개) | 정규 거리 오차·roll/yaw 민감도 |
| `eye.outer_corner_tilt` | FR283 관측 맥락+PR2453 방향 | 실제 canthus endpoint 확인 | 양안 실제 내/외 눈구석 점 | 각도 MAE·가림/극점 오분류 |
| `eye.bilateral_shape_asymmetry` | 기존 2D 눈 기하 | 좌우 가시 윤곽·포즈 보정 비교 | 좌우 눈 윤곽/중립 표정 | 비대칭값 오차·mirror/roll |
| `eye.eyelid_crease_or_hooded_category` | 기존 눈 ROI·분할은 불충분 | 전용 lid/fold ROI 분할 또는 Keras·torch 분류기 필요 | fold visibility/덮임/보류 교정 라벨 | macro-F1·사람 합의·가림 보류 |
| `nose.bridge_centerline_deviation` | 기존 FR287 중심선 계산 | 실제 코 중심선 경계 확인 | 코 축/코뿌리 visible 포인트 | 중심선 편차·pose 안정성 |
| `nose.tip_contour_circularity` | 기존 FR287 코끝 계산 | 코끝 실제 가시 윤곽 검증 | 코끝 폐곡선/가림 라벨 | 원형도 오차·윤곽 boundary F1 |
| `nose.alar_width_and_nostril_geometry` | FR290 계산+PR2453 nose mask 범위 | 비공/콧볼 **전용 분할·keypoints** 후보 | 콧볼/각 비공 보이는 경계·가림 | 정규 너비 MAE·비공 경계 F1 |
| `nose.tip_bridge_relative_projection` | FR298 기하축+FR295/299 | 3DDFA-V2 상대3D 후보 | 독립 RGB↔3D 동일 촬영·등록 | 무차원 projection 오류·repeatability |
| `mouth.width_and_relative_size` | 기존 FR285 입 비율 계산 | 실제 입외곽 mask 검증 | 중립 입 경계/입 양끝 | 정규 비율 오차·표정 |
| `mouth.corner_orientation` | FR212/285 계산 | 양쪽 실제 입꼬리 검증 | 양쪽 입꼬리·중립 표정 | 각도 MAE·입꼬리 가림 |
| `mouth.outline_angularity` | FR214/285 계산 | 실제 입술 윤곽 추출 개선 | 닫힌 입 외곽 경계·가림 | 경계 F1·각짐 MAE |
| `mouth.visible_lip_fullness` | FR293 계산+PR2453 center thickness | BiSeNet lip mask 범위 vs 정밀 윤곽 후보 | 위·아래 실제 입술 내부/외부 윤곽 | 두께 MAE·중첩/교차 판정 |
| `mouth.philtrum_length_width` | FR291 정규 계산 | 인중 기둥/골 전용 point 후보 | subnasale·입술상단·인중 기둥 | 길이/너비 NME·가림 |
| `mouth.visible_lip_color` | 기존 정규 계산 없음; F5 비활성 | 통제 조명 색상 모델 후보만 | 색 보정 기준·조명·화장 상태 | 본 v1에서 판독 미활성/측정 불가 |
| `ear.visible_boundary_height_shape` | PR2453 ear class는 후보 | 귀 가시성 게이트→귀 전용 parts segmenter | 각 귀 실제 귓바퀴/귓불/가림 | 귀 boundary F1·가림 오확정 |
| `ear.thickness_attachment_canal_boundary` | 현행 RGB 권한 없음 | 직접 대체 모델 선정 불가; 연구만 | 기존 RGB로 실제 검증 정답 없음 | unavailable 유지; 추정 금지 |
| `cheek_midface.visible_width_ratio` | FR211/286 중안면 비율 | 기존 윤곽 vs skin boundary | 볼/중안면 가시 경계 | 정규 너비 MAE·hair occlusion |
| `cheek_midface.visible_contour_prominence` | FR217/286 보이는 윤곽 | 기존 FR217 검증+프리뷰 | 광대·볼 외곽의 실제 가시 윤곽 | 2D contour 오차·yaw |
| `cheek_midface.relative_3d_prominence` | FR295/299 protocol | 3DDFA-V2 상대3D 후보 | 독립 3D 볼·광대 부위 참조 | 상대 돌출 오차·평면 폭 대체 금지 |
| `chin_lower_face.visible_width_ratio` | FR213/286 하관 비율 | 기존 landmark+face contour | 하관 폭 경계·수염 가림 | 정규 너비 오차·pose |
| `chin_lower_face.visible_contour` | FR216/286 하관 윤곽 | 파싱/랜드마크 위치 검증 | 턱 아래 가시 경계 | curve distance·수염/목 |
| `chin_lower_face.chin_height_width_center_deviation` | FR289 정규 계산 | 턱끝 중심 정의/실제 턱 윤곽 | 턱끝 가시 구간 및 중심 역할 | 정규 길이·너비·중심오차 |
| `chin_lower_face.relative_projection` | FR295/299 protocol | 3DDFA-V2 상대3D 후보 | 독립 3D 측면 턱끝 참조 | projection 오차·시점 반복 |

**선택 우선순위:** 기존 MediaPipe/FR293 계산기와 PR #2453의 BiSeNet 후보 → 동일 사진에서 FaceXFormer(선택적) → 해당 부위 전용 관측기(학습 데이터 있을 때) → 독립 3D 참조가 있는 경우에만 3DDFA-V2 결과 검토. 모든 단계의 실패·가림은 부위별 `unavailable`로 보존한다.

## 부록 C. 딥리서치 반영 — 추가 세부 요구 18개의 직접 작업 선택

이 항목은 **FR282의 새 정규 키가 아니다**. 기존 29개 정규 항목으로 표현 가능 여부를 검토하며, 일부는 `extension_candidate`에 머물러야 한다. **아직 정답·학습 데이터와 상용권을 갖췄다고 주장하지 않는다.**

| 추가 관측 요구 | 적용할 기술 경로 | 필요한 증거 / 불허 대체 |
|---|---|---|
| 미간 실제 눈썹 사이 거리 | 기존 eyebrow parsing + FR292 기하 재사용 | 실제 눈썹 내측 경계 라벨/가림; 별도 신모델 우선 불필요 |
| 미간의 상대적 입체 깊이 | FR295/299 + 3DDFA-V2 연구 후보 | 독립 3D 미간 기준면·실측 reference 확보 전 unavailable |
| 눈썹 실제 털 폭/굵기 | BiSeNet 비교→별도 고해상도 ROI 분할 학습 후보 | 털 실제 폭/마스크·화장/문신 보류 GT |
| 눈썹산 높이·좌우 비대칭 | FR292 기하+eyebrow segmentation 재사용 | 실제 내/외 끝·중심곡선·head-roll 교정 |
| 눈꺼풀 주름/덮임 형태 | 전용 눈꺼풀 ROI 소형 모델 학습 후보 | 주름 visible/hooded/partial/unknown 사람 합의 라벨 |
| 안구 돌출·함몰 | 단안 3D 근거만으로 제품 발행 금지 | 독립 3D 안구/안와 기준; 현재 확장 후보 |
| 코뿌리 실제 높이 | FR298/299+3DDFA 연구 | 콧대 root 높이 reference; mm 단정 금지 |
| 콧볼 펼쳐짐·콧구멍 둘레 | FR290 재사용+nostril 전용 segmentation 후보 | 보이는 alar/nostril 구분·부분 가림 라벨 |
| 광대 전방 돌출 | FR295/299+3DDFA 연구 | 동일 사진 독립 3D zygoma 주변 참조 |
| 볼 꺼짐·깊이·살집 | cheek 상대3D 후보+전용 볼 형태 지표 연구 | 광대와 다른 볼 표면·표정/체형 변수; 직접 GT |
| 턱의 각짐·둥글기 | FR216/289 윤곽 계산 재사용 | 실제 가시 턱 contour와 수염/머리 가림 |
| 턱끝 전방 돌출 | FR295/299+3DDFA 연구 | 독립 측면/3D 턱끝 reference |
| 귓바퀴/귓불 세부 형상 | ear visibility gate→전용 귀 파트 모델 학습 후보 | 각 귀 helix/lobe visible labels·부분 가림 |
| 귀의 펼쳐짐·부착 각도 | 사선/측면·3D 독립 관측 연구 | ear bbox 대체 금지; 현재 unavailable |
| 헤어라인 M형·좌우 후퇴 | 기존 168장 전용·모근 실제 경계 모델 후보 | 실제 보이는 hair-skin polyline/occlusion; 숨은 영역 추정 금지 |
| 관자놀이 곡면·이마 볼록함 | FR295/299+3DDFA 연구 | 독립 3D 이마/관자 부위 reference |
| 삼정의 세로 기준점 | FRB005 기존 7개 neutral reference 계약 | 모근 포함 동일 frame/출처 기준·span 미발행 |
| 오관·십이궁·부위 간 균형 | FR258/FR311/FRB/T5/T6 기존 authority | 각 전통의 완전한 조건·출처·중립 관측 검증; 새 classifier 발행 금지 |

**기준:** 부위 형태를 정확히 관측하는지 비교하고, 실제 정답이 없으면 `not_evaluated`; 촬영에서 보이지 않으면 `unavailable`. 전통 형태를 사진 자동으로 매칭하기 전 F1 출처/인간 판정 검증은 별도다.

## 구현 기록 — 눈썹 마스크 가시 영역 두께 후보 (2026-11-05)

- 코드: `tools/face-reading/two-view/visible-brow-mask-envelope.mjs`, 로컬 미병합 사진 검토 화면 `review.mjs`의 별도 실험 영역.
- 입력: pinned ResNet18 19-class 모델의 **기존 RGBA 눈썹 분할 마스크**, 원본 이미지 가로/세로 크기. 별도 모델 설치·학습 없이 2개 연속 영역을 찾고 면적/주축 길이²로 **겉보기 눈썹 영역 띠 두께 비율**을 산출한다.
- 명확한 제외: **개별 눈썹 털 굵기, 개별 모발 수·밀도·모근, 실제 생리적 두께, 해부학적 좌우, 전통 형태 및 개인 판정**은 산출하지 않는다. `eyebrow.visible_hair_density_texture`를 대체하거나 FR293 정규 항목의 완료로 승격하지 않는다.
- 가시성/실패: 두 눈썹 분리 불가, 마스크 조각 발생, 서로 붙음, 테두리 절단, 불안정 축, 측면, 구버전 마스크는 **미측정**으로 처리. 출력은 브라우저 메모리에 머물고 기록 0.1~0.7 및 정식 관측/판독/제품 DB에는 쓰지 않는다.
- 검사: 합성 분할 마스크 단위 테스트 통과, 실사진/사람 정답 accuracy는 `not_evaluated`; 전체 관상 단계 3의 **독립 평가 대상 후보**다.

## 구현·출처 통합 대응표 갱신 (2026-11-08)

기존 **정규 29개 + 별도 세부 요구 18개**는 그대로 유지합니다.
구현된 정규 계산기 18개, 미해결 FR294 11개(5/4/1/1),
FR282 입력·가시성, FR293 코드·추출기 소스 참조,
FR311 지역별 출처 카탈로그와 세부 요구를 한 번에 대조하는
[코드 검증 대응표](whole-face-source-implementation-audit-20261108.md)를 생성했습니다.

검증 구현은 `tools/face-reading/two-view/whole-face-source-mapping-audit.mjs`,
회귀 검사는 `test/face-whole-face-source-mapping-audit.test.ts`입니다.
기존 FR293/FR282·FR294·FR311 소스를 읽어 행이 누락되거나
전통 판정 권한이 추가되면 검사에 실패하도록 합니다.
현재 소스 참조의 **파일 존재 여부만** 검증하며, 그 파일에서 사진 기반
입력이 실제 추출·검증되었는지까지 확인한 것은 아닙니다.

특히 `미간 실제 눈썹 사이 거리`에 대해 이미 구현한
`visible-brow-mask-envelope.mjs`의
`apparentInterBrowGapToMeanMaskXSpan`을 별도 연구 후보로만 연결했습니다.
이는 **보이는 모델 눈썹 마스크의 사이 간격 / 평균 마스크 가로 폭**으로,
실제 모근·눈썹 안쪽 경계에 대한 사람 정답이나 눈 사이 간격의 대체값이
아닙니다. 계산기와 사진 관측, FR311 문헌 후보와 검증된 전통 형태 조건,
상업용 관상 판독은 별도 승인 경계를 유지합니다.

새 정규 관측 키나 F0·F1 판정, 제품 임계값, 모델 학습은
발행하지 않았습니다. `ROADMAP_COMPLETE`가 아니며,
독립 사람 정답·상대 3D 기준 및 실제 출처 형태 조건 대응은 미완료입니다.

## 구현 기록 — 미간 모델 눈썹 마스크 간격과 사람 표시선 2D 간격 비교 (2026-11-08)

- 기존 모델 2D 눈썹 분할 후보 `apparentInterBrowGapToMeanMaskXSpan`과
  기존 한 사람 눈썹 중심선 표시의 **화면상 두 표시선 사이 간격/평균 가로폭**을
  같은 원본 이미지 좌표계에서 구분해 비교하는 로컬 연구 기능을 추가함.
- 구현: `tools/face-reading/two-view/brow-centerline-comparison.mjs` v0.2.0,
  기존 `review.mjs`의 사람 중심선 대조 화면. 기존 정규 29개나 추가 요구 18개
  및 정규 계산기 수량을 변경하지 않음.
- 유효 조건: 원본 검토 기록에 사진 좌·우 양쪽 모두 `marked`가 있고,
  각각 단일 연속 중심선이며 x 방향으로 단조롭고 두 선의 이미지상 가로 범위가
  서로 겹치지 않아야 함. 부분 표시·여러 조각·x 방향 되돌아가기·겹침·불완전
  분할 마스크는 수치를 낼 수 없으므로 보류.
- 한 사람이 그린 중심선의 **양 끝이 실제 눈썹 안쪽 모근/경계라는 보증은 없음**.
  따라서 비교 수치와 잔차는 단지 그림의 가로범위 차이이며, 해부학적 미간 거리나
  눈 사이 거리·제품 F0·정확도·독립 사람 정답으로 승격하지 않음.
- 실제 사진용 사람 표시 기록 0건이라 실사진 간격 **정답 비교 0건** 유지.
  합성 표시선과 마스크의 기하 계산·보류 경계만 테스트함.

## 2026-11-08 — 입술 분할 클래스와 사람 경계선의 2D 가로폭 비교 범위

기존 정규 29개/추가 세부 18개 요구에 **새 정규 키를 추가하지 않고**
연구용 모듈 `tools/face-reading/two-view/lip-model-human-width-comparison.mjs`
및 검토 화면에 위·아래 모델 입술 분할 클래스의 가로폭 비율과
사람이 표시한 상·하 입술 경계선의 x 가로폭 비율 비교를 추가했다.

정면 같은 사진의 유효한 모델 분할과 사람 상·하 경계선·입꼬리 표시
모두가 있어야만 표시한다. 두 비율은 **서로 다른 후보 증거**이며
실제 입술 두께/전통 입술형 정답·모델 정확도·사진별 정규 F0가 아니다.
실사진 사람 기록 0건으로 정확도 검증 미실행. `mouth.visible_lip_color`
FR294 하드갭은 여전히 색상 기준 미확보로 남는다.
