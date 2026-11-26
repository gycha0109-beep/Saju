# FR311W — 중립 관찰 구성 연구

## 목적

FR311V에서 `neutral_observation_construct_research`로 분류된 22개 항목의 중립 관찰 구성을 먼저 정의한다.

이 단계는 extractor 구현, threshold 적합, traditional binding 검증이 아니다.

## 입력 기준선

- FR311V 중립 관찰 구성 연구 대상: 22
- FR282 중립 feature: 29
- FR293 materialized feature: 18
- FR293 gap feature: 11

## 연구 결과

### 대상 22건의 resolution

| resolution | 건수 |
|---|---:|
| 등록 surface는 있으나 아직 materialized 아님 | 3 |
| 신규/보강 extractor 연구 필요 | 15 |
| 기존 geometry만으로 완료 | 0 |
| geometry 일부만 연구 가능, 나머지는 V1 정적 범위 밖 | 1 |
| 일반 RGB skeletal proxy 거부 | 3 |
| 합계 | 22 |

현재 empirical validation eligible = **0**.

## neutral construct catalog

총 28개 construct를 고정한다.

### 기존 등록 + 구현 완료

5개:

- cheek_midface.visible_width_ratio
- cheek_midface.visible_contour_prominence
- chin_lower_face.visible_width_ratio
- chin_lower_face.visible_contour
- chin_lower_face.chin_height_width_center_deviation

이들은 재사용 가능한 **중립 관찰값**일 뿐 traditional equivalence가 아니다.

### 기존 등록 + 미 materialized

5개:

- forehead.visible_width_shape
- forehead.visible_hairline_boundary
- forehead.relative_surface_curvature
- cheek_midface.relative_3d_prominence
- chin_lower_face.relative_projection

### 신규 neutral surface 정의

16개:

#### 이마

- neutral.forehead.visible_height_to_width_ratio
- neutral.forehead.visible_outline_rectilinearity
- neutral.forehead.visible_hairline_path_irregularity
- neutral.forehead.visible_hair_coverage_vertical_fraction
- neutral.forehead.visible_local_depression_profile

#### 얼굴 전체

- neutral.whole_face.visible_height_to_width_ratio
- neutral.whole_face.visible_outline_rectilinearity
- neutral.whole_face.upper_lower_taper_profile
- neutral.whole_face.visible_width_profile

#### 광대/중안면

- neutral.cheek_midface.visible_vertical_position_ratio
- neutral.cheek_midface.bilateral_orientation_difference
- neutral.cheek_midface.bilateral_prominence_balance

#### 턱/하관

- neutral.chin_lower_face.visible_height_to_width_ratio
- neutral.chin_lower_face.visible_contour_rectilinearity
- neutral.chin_lower_face.visible_taper_profile
- neutral.chin_lower_face.visible_fullness_area_ratio

어떤 신규 surface도 이 단계에서 extractor 구현 권한을 얻지 않는다.

## 핵심 경계

### 1. 이마

FR207/FR282 기준으로 이마는 아직 image model / relative-shape gap이 크다.

따라서:

- 小而狹
- 額方峻起
- 隆然而起
- 聳然而闊
- 髮際參差

등을 현재 mesh 상단이나 face oval로 대신하지 않는다.

특히 hairline은 현재 보이는 hair-skin boundary만 허용하며:

- hidden hairline completion
- face oval substitution
- face mesh top vertex substitution

을 금지한다.

### 2. 明而澤

`明而澤，方而長`에서:

- `方而長`은 정적 geometry 연구 가능
- `明而澤`은 V1 static geometry 범위 밖의 appearance component

로 분리한다.

따라서 uncalibrated luminance 값을 만들어 `明而澤`의 대리값으로 쓰지 않는다.

### 3. 전체 얼굴형

기존 FR282에는 whole-face dedicated feature가 없다.

따라서 다음을 신규 neutral surface로 정의했다.

- visible height/width ratio
- visible outline rectilinearity
- upper/lower taper profile
- continuous width profile

여기에는 `長面`, `方面`, `棗核形` 같은 traditional category 이름을 붙이지 않는다.

### 4. 광대

현재 구현된:

- visible mid-face width
- visible contour prominence

는 재사용 가능하다.

하지만:

```text
visible mid-face width
!= 顴骨 breadth
```

```text
visible contour prominence
!= 顴骨 projection
```

이다.

새로:

- vertical position ratio
- bilateral orientation difference
- bilateral prominence balance

를 중립 surface로 정의했지만, 이것도 skeletal equivalence가 아니다.

### 5. 턱/하관

현재 구현된:

- visible width
- visible contour
- chin height/width/center deviation

은 재사용 가능하다.

신규:

- visible height/width ratio
- contour rectilinearity
- taper profile
- fullness area ratio

를 정의한다.

하지만 `頤骨`, `頷骨`을 말하는 3개 규칙은 일반 RGB에서 **skeletal proxy를 만들지 않음**으로 결론 낸다.

즉:

```text
visible lower-face width
!= 頷骨闊
```

```text
visible lower-face contour
!= 頷骨尖
```

이다.

해당 3건:

- fr311r.lower_face.yi_bone.square_horizontal
- fr311r.lower_face.han_bone.broad
- fr311r.lower_face.han_bone.sharp

은 ordinary RGB skeletal proxy rejected 상태다.

## 자동 합성 금지

예를 들어:

```text
forehead width
+ forehead curvature
= 隆然而起且闊
```

같은 자동식을 만들지 않는다.

compound construct는 구성요소만 정의한다.

- weight 없음
- formula 없음
- threshold 없음
- classifier 없음

## 권한 상태

FR311W 종료 시:

- extractor implementation authorized: false
- source-to-visible equivalence established: false
- empirical validation authorized: false
- automatic traditional binding: false
- threshold: 0
- population norm: 0
- multi-feature automatic synthesis: false
- skeletal proxy from ordinary RGB: false
- product interpretation: false

## 다음 순서

FR311V에서 남은 연구 lane:

1. **전통 지역 지도 연구 17건**
2. **촬영 프로토콜 연구 4건**

이 두 묶음도 닫은 뒤에야 전체 정적 연구 공백이 실제로 끝난다.

그 후에도 바로 threshold 검증으로 가지 않고, 새 neutral surfaces 중 실제 extractor research가 필요한 항목을 observation-engine 쪽과 연결해 materialization 가능성을 판단한다.
