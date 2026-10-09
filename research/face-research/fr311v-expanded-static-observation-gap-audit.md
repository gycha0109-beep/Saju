# FR311V — 확장 정적 연구 ↔ 중립 관찰축 전수 공백 감사

## 목적

FR311R-U에서 V1 정적 관상 원전 연구 범위를 먼저 닫았다.

FR311V의 목적은 그 연구 결과를 곧바로 사진 판정이나 임계값 연구로 보내는 것이 아니라, **현재 neutral observation/extractor surface가 각 전통 조건을 어디까지 연구할 수 있는지 전수 분류**하는 것이다.

이 단계는 empirical validation이 아니다.

## 입력 기준선

- FR311R 누락 지역 직접 규칙: 30
- FR311S 정적 구조 방법론: 16
- 감사 대상 합계: 46
- FR282 중립 관찰 feature: 29
- FR293 구현 완료 feature: 18
- FR293 미구현/권한 gap feature: 11

기존 FR312A/B/C는 legacy FR311P 621 evidence를 대상으로 한 선행 감사로 유지한다.

FR311V는 FR312A를 대체하지 않으며, 새 연구 46개를 기존 FR312로 자동 투입하지 않는다.

## 최종 분류

| 분류 | 건수 |
|---|---:|
| 현재 구현 측정값만으로 바로 비교 후보 | 0 |
| 관찰 개념은 있으나 extractor/권한 공백 | 6 |
| 다중 feature 구성 정의 필요 | 13 |
| source ↔ visible observation 정의 부족 | 3 |
| 전통 지역 지도/구조 operationalization 필요 | 17 |
| 촬영 상태·가시성 제한 | 4 |
| 수동 traditional key만 허용 | 1 |
| 의미 계층 전용, observation binding 없음 | 2 |
| product binding prohibited | 0 |
| 합계 | 46 |

다음 연구 lane으로 다시 묶으면:

| 연구 lane | 건수 |
|---|---:|
| 중립 관찰 구성 연구 | 22 |
| 전통 지역 지도 연구 | 17 |
| 촬영 프로토콜 연구 | 4 |
| 수동 입력 유지 | 1 |
| 의미 계층 전용 | 2 |
| 금지 | 0 |

## 핵심 판정

### 1. 직접 실증 후보는 0

새로 추가된 이마·광대·턱/하관 연구 중 일부는 현재 구현된 중립 측정값을 후보로 가질 수 있다.

그러나:

```text
same region
!= same construct
```

이며,

```text
materialized neutral metric
!= traditional morphology equivalence
```

이다.

따라서 FR311V에서는 `current_materialized_neutral_observation_candidate`를 0으로 유지한다.

### 2. 구현된 중립 측정값을 일부 후보로 가진 대상은 10건

예:

- 광대 visible width / contour prominence
- 하관 visible width / contour
- chin height-width-center deviation

등은 이미 구현되어 있다.

하지만 전통 문구가 `顴骨`, `頤骨`, `頷骨`처럼 **뼈 자체**를 말하는 경우가 있으므로 사진에서 보이는 연조직 윤곽을 그대로 뼈 구조로 재명명하지 않는다.

즉:

```text
visible lower-face width
!= 頷骨闊
```

```text
visible cheek contour prominence
!= 顴骨露
```

이다.

### 3. 이마는 현재 extractor 공백이 큼

현재 FR282의 이마 surface:

- forehead.visible_width_shape
- forehead.visible_hairline_boundary
- forehead.relative_surface_curvature

세 항목은 현재 FR293 materialized set에 들어 있지 않다.

따라서:

- 額小而狹
- 髮際參差
- 額方峻起
- 隆然而起 / 聳然而闊

등은 source morphology가 비교적 직접적이어도 바로 실증으로 보내지 않는다.

먼저 neutral extractor 또는 relative-shape benchmark가 필요하다.

### 4. 광대는 soft-tissue / bone 경계를 유지

현재 구현된:

- cheek_midface.visible_width_ratio
- cheek_midface.visible_contour_prominence

는 사용 가능하다.

그러나 이는 visible mid-face soft-tissue morphology이지 skeletal bizygomatic breadth authority가 아니다.

따라서 `兩顴骨`, `頷骨` 등의 骨 표현은 별도 source-to-visible construct 연구 없이 자동 binding하지 않는다.

### 5. 턱/하관도 같은 원칙

현재 구현된:

- chin_lower_face.visible_width_ratio
- chin_lower_face.visible_contour
- chin_lower_face.chin_height_width_center_deviation

은 중립 관찰 후보가 될 수 있다.

그러나:

- 頤骨
- 頷骨
- 地閣
- 承漿
- 懸壁
- 燕頷

을 곧바로 해당 neutral feature와 동일시하지 않는다.

특히 地閣/承漿/懸壁/燕頷은 먼저 lineage-specific region map 연구가 필요하다.

### 6. 전체 얼굴형은 현재 neutral inventory 자체가 부족

현재 FR282에는 dedicated whole-face shape feature가 없다.

따라서:

- 面欲長而方
- 上下尖如棗核
- 額大面方
- 額闊面廣

등을 위한 whole-face visible planform/shape surface가 별도 연구 대상이다.

## 구조 방법론 감사

다음 구조는 전부 region-map research로 보낸다.

- 五官
- 五嶽
- 四瀆
- 六府
- 三停 — 631 lineage
- 三停/三才 — 632 lineage
- 十三部位
- 十二宮
- 五星六曜

원칙:

```text
traditional named region
!= provider landmark name
```

그리고 631/632 삼정 경계는 서로 다른 lineage로 유지한다.

### 촬영 범위 제한

다음 방법론은 정면 얼굴 사진만으로 전체 조건을 관찰할 수 없다.

- 四學堂
- 八學堂
- 十觀
- 三柱

이들은 치아, 혀, 머리 전체, 손발, 허리·등, 목소리 등을 포함할 수 있다.

따라서 별도 capture protocol 연구로 분리한다.

### 수동 유지

五行形相은 전체 형태에 대한 전통 category이므로 현재 자동 classifier를 만들지 않는다.

### 의미 계층 전용

- 五法
- 三主

는 자체적으로 photo morphology predicate를 제공하는 것이 아니라 해석 routing/life-stage semantics를 제공하므로 observation binding 대상으로 삼지 않는다.

## 권한 상태

FR311V 종료 시에도 모두 0이다.

- empirical validation started
- automatic traditional binding
- provider landmark direct binding
- metric threshold
- population norm
- cross-lineage canonical map
- multi-feature automatic synthesis
- named-form classifier
- product interpretation
- modern scientific fact promotion

## 다음 연구 순서

FR311V 결과상 mouth-only FR312D를 바로 재개하면 안 된다.

우선순위는 다음처럼 다시 나뉜다.

1. **중립 관찰 구성 연구 22건**
   - 이마 extractor
   - whole-face shape surface
   - skeletal-vs-visible construct boundary
   - multi-feature construct definition

2. **전통 지역 지도 연구 17건**
   - 三停
   - 五嶽
   - 六府
   - 十三部位
   - 十二宮
   - 세부 하관 지역

3. **촬영 프로토콜 연구 4건**
   - static face-only capture로 관찰 불가능한 체계 분리

이 세 연구 묶음이 닫힌 뒤에야 expanded empirical protocol 후보를 다시 선정한다.

## 종료 판정

- FR311R 30/30 감사: 완료
- FR311S 16/16 감사: 완료
- 누락/중복: 0
- FR282 29 유지
- FR293 18 materialized / 11 gap 유지
- 직접 empirical candidate: 0
- empirical validation started: false
- 자동 binding: 0
- threshold: 0
- population norm: 0
- product interpretation: 0
