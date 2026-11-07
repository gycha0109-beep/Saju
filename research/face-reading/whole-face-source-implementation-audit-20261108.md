# 명하 관상 전체 요구·구현·출처 통합 검증표

> 2026-11-08 · 관상 엔진 로드맵 1단계 · 연구용 검증 기록, 제품 승인 아님
> 기준: FR282/FR293/FR294, 기존 FR311 지역별 source catalogue, whole-face-feature-mapping-20261105.md

## 1. 현재 소스 기준

- 정규 29개, 정규 계산기 18개, 근거 미해결 11개.
- 추가 세부 요구 18개는 신규 정규 키로 승인되지 않음.
- 기존 코드/문헌 source 경로의 파일 누락 참조 0건(실제 사진 추출 여부와 별도).
- 전통 형태 조건 연결 승인 0건, 정규 사진 정확도 검증 0건. 사진·개별 생체 좌표 사용 안 함.

## 2. 정규 29개 — 현행 코드·추출·관측·출처

| 번호 | 부위/정규 featureKey | 계산기 | 촬영/가시성/사진 검증 요구 | 현재 코드·원천 참조 | 전통 출처 상태 |
| ---: | --- | --- | --- | --- | --- |
| 1 | 이마 `forehead.visible_width_shape` | 미구현/별도 근거 필요 | frontal_visible_rgb_region; segmentation_and_visibility; 정밀 이미지 분할 / 가림 판정; validate a governed visible forehead skin-region segmentation against representative ordinary RGB selfies before issuing width/shape axes | `packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts` | 지역별 문헌 후보 없음; 형태 조건 F1 미승인 |
| 2 | 이마 `forehead.visible_hairline_boundary` | 미구현/별도 근거 필요 | frontal_visible_rgb_region; segmentation_and_visibility; 모근선 정답 / 가림 / 경계; validate a governed visible hair/skin boundary segmentation with visibility and occlusion handling | `packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts` | 지역별 문헌 후보 없음; 형태 조건 F1 미승인 |
| 3 | 이마 `forehead.relative_surface_curvature` | 미구현/별도 근거 필요 | rgb_with_independent_relative_3d_reference; rgb_relative_3d_provider_validation; RGB 상대 3D / 독립 참조; benchmark provider-neutral monocular RGB relative-shape outputs on the same governed captures before any curvature axis is admitted | 구현 출처 경로 미지정 | 지역별 문헌 후보 없음; 형태 조건 F1 미승인 |
| 4 | 눈썹 `eyebrow.span_arch_tail_orientation` | 계산기 있음; 사진 추출 검증 없음 | frontal_visible_rgb_region; canonical_metric_geometry; 랜드마크 + 가시 눈썹 곡선 | `packages/face-reading/src/visible-eyebrow-pair-geometry-fr292.ts`, `packages/face-reading/src/cross-face-neutral-observable-primitives-fr208.ts`, `packages/face-reading/src/mediapipe-published-eyebrow-component-decomposition-fr39.ts` | 지역별 문헌 후보 1건; 형태 조건 F1 미승인 |
| 5 | 눈썹 `eyebrow.visible_hair_density_texture` | 미구현/별도 근거 필요 | frontal_visible_rgb_region; appearance_image_quality; 고해상도 눈썹 외형 모델; validate an appearance model on explicitly visible eyebrow-hair regions under controlled image-quality conditions | `packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts` | 지역별 문헌 후보 1건; 형태 조건 F1 미승인 |
| 6 | 눈 `eye.width_height_ratio` | 계산기 있음; 사진 추출 검증 없음 | frontal_visible_rgb_region; canonical_metric_geometry; 양안 랜드마크 | `packages/face-reading/src/eye-neutral-axis-bundle-fr210.ts`, `packages/face-reading/src/eye-pair-geometric-y-span-runtime-fr178.ts` | 지역별 문헌 후보 2건; 형태 조건 F1 미승인 |
| 7 | 눈 `eye.inter_eye_spacing_ratio` | 계산기 있음; 사진 추출 검증 없음 | frontal_visible_rgb_region; canonical_metric_geometry; 양안 랜드마크 | `packages/face-reading/src/eye-neutral-axis-bundle-fr210.ts` | 지역별 문헌 후보 2건; 형태 조건 F1 미승인 |
| 8 | 눈 `eye.outer_corner_tilt` | 계산기 있음; 사진 추출 검증 없음 | frontal_visible_rgb_region; canonical_metric_geometry_and_fr283_viewpoint_context; 눈 경계 역할 검증 | `packages/face-reading/src/cross-face-neutral-observable-primitives-fr208.ts`, `packages/face-reading/src/eye-neutral-axis-bundle-fr210.ts`, `packages/face-reading/src/observable-morphology-fr76-eye-chord-propagation-fr283.ts`, `packages/face-reading/src/observable-morphology-validation-fr218.ts` | 지역별 문헌 후보 2건; 형태 조건 F1 미승인 |
| 9 | 눈 `eye.bilateral_shape_asymmetry` | 계산기 있음; 사진 추출 검증 없음 | frontal_visible_rgb_region; canonical_metric_geometry; 양안 대칭축 | `packages/face-reading/src/eye-asymmetry-surface-fr215.ts` | 지역별 문헌 후보 2건; 형태 조건 F1 미승인 |
| 10 | 눈 `eye.eyelid_crease_or_hooded_category` | 미구현/별도 근거 필요 | frontal_visible_rgb_region; appearance_image_quality; 눈꺼풀 외형 모델; validate an image-visible crease/hooded observation model with an explicit unavailable path for insufficient visibility | `packages/face-reading/src/face-reading-observable-morphology-measurement-boundary-fr206.ts` | 지역별 문헌 후보 2건; 형태 조건 F1 미승인 |
| 11 | 코 `nose.bridge_centerline_deviation` | 계산기 있음; 사진 추출 검증 없음 | frontal_visible_rgb_region; governed_contour_geometry; 코 윤곽/중심선 | `packages/face-reading/src/nose-geometry.ts` | 지역별 문헌 후보 1건; 형태 조건 F1 미승인 |
| 12 | 코 `nose.tip_contour_circularity` | 계산기 있음; 사진 추출 검증 없음 | frontal_visible_rgb_region; governed_contour_geometry; 코끝 윤곽 | `packages/face-reading/src/nose-geometry.ts` | 지역별 문헌 후보 1건; 형태 조건 F1 미승인 |
| 13 | 코 `nose.alar_width_and_nostril_geometry` | 계산기 있음; 사진 추출 검증 없음 | frontal_visible_rgb_region; segmentation_and_visibility; 콧볼·비공 실제 경계 | `packages/face-reading/src/visible-alar-nostril-geometry-fr290.ts`, `packages/face-reading/src/nose-geometry.ts`, `packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts` | 지역별 문헌 후보 1건; 형태 조건 F1 미승인 |
| 14 | 코 `nose.tip_bridge_relative_projection` | 미구현/별도 근거 필요 | rgb_with_independent_relative_3d_reference; rgb_relative_3d_provider_validation; RGB 상대 3D / 독립 참조; benchmark same-selfie provider-neutral relative nasal projection against a frozen independent reference protocol without claiming metric depth | `packages/face-reading/src/nasal-apex-geometry-candidate-study-fr267.ts`, `packages/face-reading/src/nasal-apex-empirical-bundle-fr268.ts` | 지역별 문헌 후보 1건; 형태 조건 F1 미승인 |
| 15 | 입·인중 `mouth.width_and_relative_size` | 계산기 있음; 사진 추출 검증 없음 | frontal_visible_rgb_region; governed_contour_geometry; 입 경계·비율 | `packages/face-reading/src/neutral-mouth-contour-metric-fr80.ts`, `packages/face-reading/src/neutral-mouth-relative-size-metric-fr82.ts` | 지역별 문헌 후보 1건; 형태 조건 F1 미승인 |
| 16 | 입·인중 `mouth.corner_orientation` | 계산기 있음; 사진 추출 검증 없음 | frontal_visible_rgb_region; governed_contour_geometry; 입꼬리 경계·각도 | `packages/face-reading/src/visible-mouth-corner-orientation-fr212.ts` | 지역별 문헌 후보 1건; 형태 조건 F1 미승인 |
| 17 | 입·인중 `mouth.outline_angularity` | 계산기 있음; 사진 추출 검증 없음 | frontal_visible_rgb_region; governed_contour_geometry; 입 외곽 윤곽 | `packages/face-reading/src/role-free-mouth-outline-angularity-fr214.ts` | 지역별 문헌 후보 1건; 형태 조건 F1 미승인 |
| 18 | 입·인중 `mouth.visible_lip_fullness` | 계산기 있음; 사진 추출 검증 없음 | frontal_visible_rgb_region; governed_contour_geometry; 위·아래 입술 경계 | `packages/face-reading/src/visible-lip-band-fullness-fr293.ts`, `packages/face-reading/src/visible-philtrum-geometry-fr291.ts`, `packages/face-reading/src/face-reading-observable-morphology-measurement-boundary-fr206.ts`, `packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts` | 지역별 문헌 후보 1건; 형태 조건 F1 미승인 |
| 19 | 입·인중 `mouth.philtrum_length_width` | 계산기 있음; 사진 추출 검증 없음 | frontal_visible_rgb_region; segmentation_and_visibility; 인중의 실제 보이는 골·폭 | `packages/face-reading/src/visible-philtrum-geometry-fr291.ts`, `packages/face-reading/src/pose-normalized-lips-geometry-fr79.ts`, `packages/face-reading/src/face-reading-observable-morphology-measurement-boundary-fr206.ts` | 지역별 문헌 후보 1건; 형태 조건 F1 미승인 |
| 20 | 입·인중 `mouth.visible_lip_color` | 미구현/별도 근거 필요 | frontal_visible_rgb_region; appearance_image_quality; 조명 통제된 색상 / 정적 v1 제외; validate controlled visible-lip color observation with illumination/color-quality admission before issuing neutral color axes | `packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts` | 지역별 문헌 후보 1건; 형태 조건 F1 미승인 |
| 21 | 귀 `ear.visible_boundary_height_shape` | 미구현/별도 근거 필요 | view_and_visible_region_required; visibility_gate; 귀별 가시성 + 귀 전용 분할; issue and validate an ear-specific visibility admission gate first, then validate a visible external-pinna segmentation/model on admitted captures | `packages/face-reading/src/face-reading-product-capture-view-contract-fr191.ts`, `packages/face-geometry/README.md` | 지역별 문헌 후보 1건; 형태 조건 F1 미승인 |
| 22 | 귀 `ear.thickness_attachment_canal_boundary` | 미구현/별도 근거 필요 | not_supported_by_current_rgb_authority; currently_unavailable; 현행 RGB 근거 없음 — 보류; retain explicit unavailable status until a separate ordinary-RGB observation authority establishes reliable visible constructs | `packages/face-reading/src/face-reading-whole-face-minimum-measurement-inventory-fr207.ts` | 지역별 문헌 후보 1건; 형태 조건 F1 미승인 |
| 23 | 광대·중안면 `cheek_midface.visible_width_ratio` | 계산기 있음; 사진 추출 검증 없음 | frontal_visible_rgb_region; canonical_metric_geometry; 중안면 정면 비율 | `packages/face-reading/src/visible-midface-band-fr211.ts` | 지역별 문헌 후보 없음; 형태 조건 F1 미승인 |
| 24 | 광대·중안면 `cheek_midface.visible_contour_prominence` | 계산기 있음; 사진 추출 검증 없음 | frontal_visible_rgb_region; canonical_metric_geometry; 보이는 윤곽 변곡 | `packages/face-reading/src/visible-cheek-contour-prominence-fr217.ts` | 지역별 문헌 후보 없음; 형태 조건 F1 미승인 |
| 25 | 광대·중안면 `cheek_midface.relative_3d_prominence` | 미구현/별도 근거 필요 | rgb_with_independent_relative_3d_reference; rgb_relative_3d_provider_validation; RGB 상대 3D / 독립 참조; benchmark provider-neutral monocular RGB relative cheek prominence on the same governed captures before product admission | 구현 출처 경로 미지정 | 지역별 문헌 후보 없음; 형태 조건 F1 미승인 |
| 26 | 턱·하관 `chin_lower_face.visible_width_ratio` | 계산기 있음; 사진 추출 검증 없음 | frontal_visible_rgb_region; canonical_metric_geometry; 하관 너비 / 기준축 | `packages/face-reading/src/visible-lower-face-width-fr213.ts` | 지역별 문헌 후보 없음; 형태 조건 F1 미승인 |
| 27 | 턱·하관 `chin_lower_face.visible_contour` | 계산기 있음; 사진 추출 검증 없음 | frontal_visible_rgb_region; governed_contour_geometry; 하관/턱끝 가시 윤곽 | `packages/face-reading/src/canonical-visible-lower-face-contour-fr216.ts` | 지역별 문헌 후보 없음; 형태 조건 F1 미승인 |
| 28 | 턱·하관 `chin_lower_face.chin_height_width_center_deviation` | 계산기 있음; 사진 추출 검증 없음 | frontal_visible_rgb_region; governed_contour_geometry; 턱끝 중심/너비/높이 | `packages/face-reading/src/visible-lower-face-width-fr213.ts`, `packages/face-reading/src/canonical-visible-lower-face-contour-fr216.ts`, `packages/face-reading/src/central-chin-reference-trace-protocol-fr54.ts` | 지역별 문헌 후보 없음; 형태 조건 F1 미승인 |
| 29 | 턱·하관 `chin_lower_face.relative_projection` | 미구현/별도 근거 필요 | rgb_with_independent_relative_3d_reference; rgb_relative_3d_provider_validation; RGB 상대 3D / 독립 참조; benchmark provider-neutral monocular RGB relative lower-face projection on governed same-capture observations | 구현 출처 경로 미지정 | 지역별 문헌 후보 없음; 형태 조건 F1 미승인 |

## 3. 추가 18개 세부 요구 — 정규 관측 키 확장 미승인

| 번호 | 실제 요구 | 기존 29개와 연결 | 연구용 구현 후보 | 아직 필요한 독립 근거 |
| ---: | --- | --- | --- | --- |
| 1 | 미간 실제 눈썹 사이 거리 | `eyebrow.span_arch_tail_orientation`, `eye.inter_eye_spacing_ratio` | `apparentInterBrowGapToMeanMaskXSpan` (보이는 눈썹 분할 마스크 사이 비율; 실제 눈썹 뿌리/미간 정답 아님) | 실제 눈썹 내측 경계 라벨/가림; 별도 신모델 우선 불필요 |
| 2 | 미간의 상대적 입체 깊이 | `forehead.relative_surface_curvature` | 해당 요구에 직접 대응하는 검증된 관측 후보 없음 | 독립 3D 미간 기준면·실측 reference 확보 전 unavailable |
| 3 | 눈썹 실제 털 폭/굵기 | `eyebrow.visible_hair_density_texture` | 해당 요구에 직접 대응하는 검증된 관측 후보 없음 | 털 실제 폭/마스크·화장/문신 보류 GT |
| 4 | 눈썹산 높이·좌우 비대칭 | `eyebrow.span_arch_tail_orientation` | 해당 요구에 직접 대응하는 검증된 관측 후보 없음 | 실제 내/외 끝·중심곡선·head-roll 교정 |
| 5 | 눈꺼풀 주름/덮임 형태 | `eye.eyelid_crease_or_hooded_category` | 해당 요구에 직접 대응하는 검증된 관측 후보 없음 | 주름 visible/hooded/partial/unknown 사람 합의 라벨 |
| 6 | 안구 돌출·함몰 | `eye.width_height_ratio` | 해당 요구에 직접 대응하는 검증된 관측 후보 없음 | 독립 3D 안구/안와 기준; 현재 확장 후보 |
| 7 | 코뿌리 실제 높이 | `nose.tip_bridge_relative_projection` | 해당 요구에 직접 대응하는 검증된 관측 후보 없음 | 콧대 root 높이 reference; mm 단정 금지 |
| 8 | 콧볼 펼쳐짐·콧구멍 둘레 | `nose.alar_width_and_nostril_geometry` | 해당 요구에 직접 대응하는 검증된 관측 후보 없음 | 보이는 alar/nostril 구분·부분 가림 라벨 |
| 9 | 광대 전방 돌출 | `cheek_midface.relative_3d_prominence` | 해당 요구에 직접 대응하는 검증된 관측 후보 없음 | 동일 사진 독립 3D zygoma 주변 참조 |
| 10 | 볼 꺼짐·깊이·살집 | `cheek_midface.relative_3d_prominence` | 해당 요구에 직접 대응하는 검증된 관측 후보 없음 | 광대와 다른 볼 표면·표정/체형 변수; 직접 GT |
| 11 | 턱의 각짐·둥글기 | `chin_lower_face.visible_contour` | 해당 요구에 직접 대응하는 검증된 관측 후보 없음 | 실제 가시 턱 contour와 수염/머리 가림 |
| 12 | 턱끝 전방 돌출 | `chin_lower_face.relative_projection` | 해당 요구에 직접 대응하는 검증된 관측 후보 없음 | 독립 측면/3D 턱끝 reference |
| 13 | 귓바퀴/귓불 세부 형상 | `ear.visible_boundary_height_shape` | 해당 요구에 직접 대응하는 검증된 관측 후보 없음 | 각 귀 helix/lobe visible labels·부분 가림 |
| 14 | 귀의 펼쳐짐·부착 각도 | `ear.thickness_attachment_canal_boundary` | 해당 요구에 직접 대응하는 검증된 관측 후보 없음 | ear bbox 대체 금지; 현재 unavailable |
| 15 | 헤어라인 M형·좌우 후퇴 | `forehead.visible_hairline_boundary` | 해당 요구에 직접 대응하는 검증된 관측 후보 없음 | 실제 보이는 hair-skin polyline/occlusion; 숨은 영역 추정 금지 |
| 16 | 관자놀이 곡면·이마 볼록함 | `forehead.relative_surface_curvature` | 해당 요구에 직접 대응하는 검증된 관측 후보 없음 | 독립 3D 이마/관자 부위 reference |
| 17 | 삼정의 세로 기준점 | `forehead.visible_hairline_boundary` | 해당 요구에 직접 대응하는 검증된 관측 후보 없음 | 모근 포함 동일 frame/출처 기준·span 미발행 |
| 18 | 오관·십이궁·부위 간 균형 | 정규 키 직접 연결 없음 | 해당 요구에 직접 대응하는 검증된 관측 후보 없음 | 각 전통의 완전한 조건·출처·중립 관측 검증; 새 classifier 발행 금지 |

## 4. 검증과 사용 한계

- 기존 계산기, 모델 후보, 실제 사진 추출, 사람 정답, 전통 문헌 형태 조건은 서로 다른 증거 단계입니다.
- 위 지역별 문헌 source catalogue는 특정 정규 featureKey의 형태 조건 predicate를 허용한 것이 아닙니다.
- 상대 3D/귀 두께·내부 경계는 기존 FR294 경계를 유지하며 RGB 모델 좌표를 실측 깊이로 승격하지 않습니다.
- 기존 로드맵의 단계 완료 판정에는 실제 사진·독립 정답·전통 조건 출처 확인이 추가로 필요합니다.

Watchtower-Track: face-observation-engine
