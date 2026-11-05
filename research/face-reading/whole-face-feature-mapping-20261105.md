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
