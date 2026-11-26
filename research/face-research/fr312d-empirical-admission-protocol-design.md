# FR312D — 실증 입장심사 및 형태 전용 검증 프로토콜 재설계

## 1. 목적

FR311Z에서 확장 정적 관상 연구 46/46이 모두 연구 결론을 갖게 되었다.

이제 다음 단계는 곧바로 threshold를 만들거나 자동 관상 판정을 시작하는 것이 아니다.

FR312D의 목적은:

1. 기존 FR312C의 68개 직접 형태 규칙
2. FR311Z의 확장 정적 연구 대상 46개

를 합친 **114개 전체를 동일한 admission gate에서 다시 심사**하고,
실제 실증 프로토콜을 설계할 수 있는 항목과 아직 선행조건이 필요한 항목을 분리하는 것이다.

---

## 2. 가장 중요한 구분

### 연구 완료 ≠ 실증 가능

FR311Z의:

```text
researchComplete = true
```

는 다음을 뜻하지 않는다.

```text
extractor ready
region map ready
capture ready
empirical validation ready
traditional equivalence proved
```

따라서 expanded-static 46개는 전부 다시 empirical admission을 거친다.

---

## 3. 전체 admission universe

| 구분 | 건수 |
|---|---:|
| 기존 FR312C single-region morphology shortlist | 68 |
| FR311Z expanded static targets | 46 |
| 합계 | **114** |

두 집합의 target id는 중복되지 않는다.

---

## 4. 현재 admission 결과

### 4.1 Legacy FR312C — 68

| 상태 | 건수 |
|---|---:|
| morphology-only pilot design candidate | **10** |
| multi-feature construct definition 필요 | 18 |
| additional extractor 필요 | 21 |
| source observation definition/mismatch 해결 필요 | 16 |
| manual-only | 3 |
| 합계 | 68 |

### 4.2 Expanded static — 46

| 상태 | 건수 |
|---|---:|
| 등록 neutral surface 미 materialized | 3 |
| additional/new extractor 필요 | 15 |
| V1 static geometry 범위 밖 component 포함 | 1 |
| ordinary RGB skeletal proxy 거부 | 3 |
| lineage region map operationalization 필요 | 17 |
| capture scope 미완료 | 4 |
| manual-only final | 1 |
| semantic-only final | 2 |
| 즉시 pilot candidate | **0** |
| 합계 | 46 |

따라서 현재 114개 중 **pilot design candidate는 10개**다.

이 숫자는 입/인중을 우선시해서 정한 것이 아니다.

현재 다음 조건을 동시에 충족하는 항목이 그 10개뿐이기 때문이다.

- source morphology가 비교 가능한 연속 neutral axis를 가짐
- current comparator가 materialized
- additional extractor가 필요하지 않음
- source-side observation definition이 실험 설계를 할 수 있을 정도로 정리됨
- named/symbolic morphology classifier가 아님

---

## 5. 현재 10개 pilot design candidate

### 인중

1. `fr311i.philtrum.thin_narrow`
   - comparator: `mouth.philtrum_length_width`

### 입 크기/방향

2. `fr311i.mouth.small_short`
   - comparator: `mouth.width_and_relative_size`

3. `fr311i.mouth.corners_droop_bad_speech`
   - comparator: `mouth.corner_orientation`

### 입술 두께

4. `fr311i.lip.upper_thin`
5. `fr311i.lip.lower_thin`
6. `fr311i.lip.both_thick`
7. `fr311i.lip.both_thin`
8. `fr311i.lip.upper_thick_short_life`
9. `fr311i.lip.lower_thin_gluttony`
10. `fr311i.lip.thick_quiet_thin_litigious`

- comparator: `mouth.visible_lip_fullness`

---

## 6. “형태 전용”의 의미

일부 rule id에는 다음과 같은 전통 의미가 같이 붙어 있다.

- bad speech
- short life
- gluttony
- litigious

FR312D는 **그 의미를 검증하지 않는다.**

실험 대상은 오직:

```text
traditional morphology predicate
↔
neutral observable metric
```

이다.

예를 들어:

```text
上脣厚
↔
visible upper lip-band fullness axis
```

같은 형태 대응 가능성만 연구할 수 있다.

다음은 연구 대상이 아니다.

```text
上脣厚
→
short life
```

---

## 7. annotation contract

pilot annotator에게 보여줄 수 있는 것은:

- source에서 분리된 morphology predicate
- 직접 관찰 가능한 이미지

뿐이다.

annotator에게 보여주면 안 되는 것:

- neutral metric 수치
- model/extractor output
- 전통 운세/성격/수명/도덕성 의미
- product interpretation
- 기존 classifier 결과

즉:

```text
annotator
  sees: image + morphology-only predicate
  does not see: metric + semantic claim + product output
```

이 구조를 유지해야 circular validation을 피할 수 있다.

---

## 8. 데이터 분할 구조

FR312D는 다음 세 partition을 **필수 구조**로만 정의한다.

1. development
2. calibration
3. holdout

그러나 이 단계에서는:

- 비율
- 표본 수
- 참여자 모집 규칙
- threshold
- acceptance cutoff

를 정하지 않는다.

이 값들은 별도 설계와 검토가 필요하다.

특히 holdout은 threshold 발견 과정에서 사용하면 안 된다.

---

## 9. 필수 평가 축

실제 pilot protocol은 최소 다음을 평가해야 한다.

### A. morphology label repeatability

같은 이미지에 대해 동일 annotator가 반복 판정했을 때의 안정성.

### B. inter-rater agreement

서로 독립적인 annotator 간 형태 판정 일치성.

### C. repeat-capture metric stability

동일 인물의 반복 촬영에서 neutral metric이 얼마나 안정적인지.

### D. capture-condition robustness

허용된 범위 내의:

- pose
- expression
- framing
- illumination

변화에 대한 측정 안정성.

### E. held-out metric ↔ morphology-label relation

개발/보정에 사용하지 않은 holdout에서
neutral metric과 morphology-only label 사이의 관계가 유지되는지.

### F. FP/FN review

숫자 하나만 보지 않고 false positive / false negative 이미지 자체를 수동 검토한다.

---

## 10. threshold 연구와 production threshold 분리

향후 threshold 연구가 시작되더라도:

```text
research threshold candidate
!= production threshold
```

이다.

FR312D에서는 둘 다 아직 승인하지 않는다.

향후 threshold 후보를 만들었다 하더라도 별도 promotion review를 통과하기 전에는:

- automatic binding
- product output
- ranking
- score
- named-form classification

에 사용할 수 없다.

---

## 11. expanded static 46개 unblock path

### A. neutral surface 계열 — 22

먼저 해결해야 할 것:

- 등록됐지만 아직 구현되지 않은 neutral surface materialization
- FR311W 신규 neutral surface extractor 설계
- source ↔ visible construct 경계 검증

특히 다음은 일반 RGB에서 계속 금지:

- 顴骨을 visible cheek soft tissue로 대리
- 頤骨/頷骨을 visible lower-face contour로 대리

### B. region map 계열 — 17

필요한 것은:

```text
source map
→
governed neutral geometry operationalization study
```

이다.

단:

- invented polygon 금지
- provider landmark direct alias 금지
- 631/632 lineage merge 금지

### C. capture 계열 — 4

四學堂 / 八學堂 / 十觀 / 三柱는
current V1 static frontal face input만으로 완결되지 않는다.

따라서 별도 capture capability가 실제로 만들어지기 전까지 empirical admission 불가.

### D. terminal states — 3

- 五行形相: manual-only final
- 五法: semantic-only final
- 三主: semantic-only final

이 셋은 자동 실증 queue에 넣지 않는다.

---

## 12. 다음 작업 순서

FR312D 이후에는 다음 순서가 안전하다.

### FR312E — morphology-only annotation specification

10개 pilot candidate마다:

- source morphology predicate를 semantic claim에서 분리
- positive / negative / ambiguous annotation instruction 작성
- occlusion / expression / pose exclusion 정의
- annotator blind contract 고정

**아직 데이터 수집 없음.**

### FR312F — pilot dataset & capture protocol design

- admissible capture
- repeat capture
- annotation workflow
- data partition
- leakage 방지
- dataset audit

을 설계한다.

**이 단계에서 표본 수와 partition 비율을 근거와 함께 처음 검토한다.**

### FR312G — neutral metric reliability study

traditional label과 연결하기 전에 neutral metric 자체의:

- repeatability
- capture robustness
- missingness
- failure modes

를 검증한다.

neutral metric이 불안정하면 traditional equivalence 실험으로 넘어가지 않는다.

### FR312H — morphology equivalence pilot

그 후 처음으로:

```text
manual morphology label
vs
neutral metric
```

관계를 평가한다.

### FR312I — threshold candidate review

필요한 항목에 대해서만 threshold 후보를 연구한다.

여전히 production authorization은 별도다.

---

## 13. 현재 권한 상태

FR312D 종료 시에도 전부 false/0:

- empirical execution
- semantic claim validation
- threshold discovery
- threshold value
- population norm
- automatic traditional binding
- provider landmark direct binding
- score
- rank
- product interpretation
- modern personality fact
- health diagnosis
- lifespan/mortality prediction
- intelligence/ability/sexuality inference
- morality/criminality inference

---

## 14. 종료 조건

FR312D는 다음을 만족하면 닫는다.

- 114/114 admission status 존재
- duplicate 0
- pilot design candidate 10
- expanded static immediate pilot candidate 0
- 모든 blocked target에 explicit reason 존재
- semantic claim validation 0
- empirical execution 0
- threshold 0
- population norm 0
- product interpretation 0
- FR311Z closure가 깨지면 FR312D test도 실패
