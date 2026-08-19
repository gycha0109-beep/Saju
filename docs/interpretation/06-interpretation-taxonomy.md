# 06. Interpretation Taxonomy

## 1. 목적

명화의 해석 엔진이 다루는 명리 개념을 하나의 거대한 `사주풀이` 함수로 만들지 않고, **계산 사실(Fact) → 방법론적 해석(Interpretation) → 사용자용 서술(Narrative)** 사이의 경계를 보존한 채 독립적으로 검증·교체·조합할 수 있도록 분류한다.

이 문서는 개별 명리 규칙의 정답을 선언하지 않는다. 어떤 해석 영역이 존재하고, 어느 영역이 계산 사실에 가까우며, 어느 지점부터 유파·방법론 선택이 필요한지를 정의한다.

---

## 2. 최상위 원칙

### 2.1 Deterministic Fact와 Interpretation을 다시 계산하지 않는다

Interpretation Layer는 Canonical Saju Snapshot을 입력으로 사용한다.

다음 값은 Calculation Layer가 이미 확정하거나 ambiguity를 보존한다.

- 연주·월주·일주·시주
- 천간·지지
- 기본 음양·오행 대응
- 십신 관계 자체
- 공망
- 대운 순행/역행 및 시퀀스처럼 채택된 Calculation Policy로 결정되는 값
- 절기 및 경계 정보

Interpretation Rule은 이 값을 임의 변경하거나 LLM에게 다시 계산시키지 않는다.

### 2.2 방법론이 필요한 순간부터 Method Pack을 명시한다

예:

- 오행을 단순 개수로 볼 것인가
- 월령·통근·투간·지장간을 어떤 비중으로 볼 것인가
- 신강/신약을 어떤 절차로 판정할 것인가
- 용신을 억부·조후·통관 등 어떤 관점으로 볼 것인가

이러한 선택은 `default truth`가 아니라 `MethodologyDefinition` 및 `InterpretationPack`에 속한다.

### 2.3 Conflict는 정상 상태다

서로 다른 정당한 방법론이 다른 결과를 만들 수 있다.

```text
method A -> 용신 후보 水
method B -> 용신 후보 木
```

명화는 한쪽을 몰래 덮어쓰지 않는다.

---

## 3. Taxonomy 개요

```text
T0  Structural Derived Facts
T1  Structural Balance Analysis
T2  Day Master Strength
T3  Pattern / Gyeokguk
T4  Yongshin / Supporting Element Methodologies
T5  Ten-God Interpretation
T6  Stem / Branch Interaction Interpretation
T7  Shinsal Interpretation
T8  Natal Domain Synthesis
T9  Time-Dynamic Interpretation
T10 Compatibility Interpretation
T11 Question-Specific Synthesis
```

`T0`는 해석 엔진이 소비하는 구조적 파생 사실과 해석 사이의 접점이다. 가능하면 Calculation/Derived-Fact 모듈에서 생산한다. `T1` 이후는 방법론적 해석 영역이다.

---

## 4. T0 — Structural Derived Facts

### 목적

해석에 자주 사용되지만 자연어 의미를 아직 부여하지 않은 구조 데이터를 제공한다.

후보:

- 오행 원시 분포
- 천간/지지별 음양 분포
- 십신 위치 및 분포
- 지장간 구성
- 천간 관계 후보
- 지지 관계 후보
- 월지/월령 관련 구조 사실
- 통근/투간 판정에 필요한 원시 조건
- 대운/세운 간지 시퀀스

### 중요

`오행 3개이므로 강하다`, `재성이 많아서 돈복이 좋다` 같은 문장은 T0가 아니다.

T0는 가능한 한 다음 형태를 유지한다.

```text
fact = EARTHLY_BRANCH_RELATION
members = [子, 午]
relation = CLASH
```

그 관계가 실제 삶에서 무엇을 의미하는지는 이후 Rule이 담당한다.

---

## 5. T1 — Structural Balance Analysis

### 목적

명식 내부의 계절성, 생극제화, 지지/천간 구조 등 전체적인 균형을 특정 방법론으로 평가한다.

후보 subcategory:

- `seasonal_context`
- `element_balance`
- `support_control_balance`
- `rooting`
- `exposure`
- `hidden_stem_weighting`
- `branch_relation_effect`

### 주의

단순 오행 개수는 분석 방법 전체를 대표하지 않는다. 예를 들어 `8글자에서 목이 3개이므로 목이 강함` 같은 heuristic은 별도 실험 규칙으로 표시해야 하며 전통적 authority인 것처럼 취급하지 않는다.

---

## 6. T2 — Day Master Strength

### 목적

일간의 강약 또는 세력 상태를 판정한다.

가능한 출력은 처음부터 이분법으로 고정하지 않는다.

```text
very_weak
weak
balanced
strong
very_strong
special_structure_candidate
undetermined
```

실제 enum은 연구 후 확정한다.

### 필요한 입력 후보

- 월령/계절성
- 통근
- 생조 세력
- 극설모 세력
- 천간 투출
- 지장간
- 합충 등 관계 변화

### 설계 규칙

- `DAY_MASTER_STRENGTH`는 Method Pack 별 별도 claim을 허용한다.
- 서로 다른 방법론 결과를 평균내지 않는다.
- 숫자 점수를 사용자에게 진실처럼 노출하지 않는다.
- 내부 계산에 weight가 필요하더라도 그 weight의 provenance가 필요하다.

---

## 7. T3 — Pattern / Gyeokguk

### 목적

격국 또는 명식 구조를 특정 체계에 따라 분류한다.

### 설계 요구

격국은 하나의 전역 enum으로 확정하지 않는다.

```text
methodology = GYEOKGUK/<method-id>
result = <pattern-id>
```

형태로 관리한다.

### 이유

- 격국 성립 조건과 우선순위가 문헌/유파에 따라 다를 수 있다.
- 특수격 처리 여부가 다를 수 있다.
- 격국과 신강/신약의 의존 방향이 방법론별로 다를 수 있다.

---

## 8. T4 — Yongshin / Supporting Element Methodologies

### 목적

용신·희신·기신 등 유용성 판단을 방법론별로 표현한다.

### 초기 연구 분류

다음은 **구현 확정 목록이 아니라 research taxonomy**다.

- 억부 관점
- 조후 관점
- 통관 관점
- 병약 관점
- 격국 중심 관점
- 기타 문헌/유파별 방법

### 출력 예시

```text
claimType = YONGSHIN_CANDIDATE
methodology = YONGSHIN/JOHU/<version>
element = WATER
role = PRIMARY
```

다른 방법론은 동시에 다른 결과를 낼 수 있다.

### 금지

```text
finalYongshin = WATER
```

처럼 provenance 없이 전역 단일값으로 덮어쓰지 않는다.

---

## 9. T5 — Ten-God Interpretation

십신 자체의 관계 계산과 십신의 의미 해석을 분리한다.

### Fact

```text
monthStem.tenGod = DIRECT_WEALTH
```

### Interpretation

- 위치별 의미
- 반복/부재 패턴
- 다른 십신과의 관계
- 강약/격국/용신 문맥에서의 의미 변화
- 직업·재물·관계 등 domain synthesis에 대한 기여

### 설계 원칙

`편재가 있으니 사업가`, `정관이 있으니 공무원` 같은 단일 조건 단정 규칙은 기본 pack에 넣지 않는다. 복합 조건과 제한 조건을 명시한다.

---

## 10. T6 — Stem / Branch Interaction Interpretation

구조적 관계 검출과 의미 해석을 나눈다.

### 구조 Fact 후보

- 합
- 충
- 형
- 파
- 해
- 기타 관계 체계

관계 체계 자체도 유파별 사용 범위를 metadata로 둘 수 있다.

### Interpretation 후보

- 어떤 기둥 사이에서 발생하는가
- 다른 구조로 인해 성립/해소되는가
- 특정 domain 해석에 실제로 사용할 것인가
- 대운/세운과 원국의 상호작용에서 활성화되는가

---

## 11. T7 — Shinsal Interpretation

신살은 독립 플러그인 성격으로 다룬다.

### 이유

- 종류가 매우 많다.
- 계산 방식과 채택 범위가 통일되어 있지 않다.
- 과도하게 사용하면 다른 구조 분석보다 신살 나열이 결과를 지배할 수 있다.

### 명화 정책 초안

- `ShinsalCatalog`를 별도 관리한다.
- 신살별 계산식, 출처, 적용 범위, 상충 자료를 기록한다.
- 기본 해석 엔진에 포함할 신살은 allowlist 방식으로 선정한다.
- 단일 신살만으로 중대한 사건을 단정하지 않는다.
- `신살 20개 발견` 같은 양적 나열을 제품 품질로 취급하지 않는다.

---

## 12. T8 — Natal Domain Synthesis

여기부터 사용자에게 익숙한 풀이 영역이 된다.

초기 domain 후보:

- `temperament` — 성향/기질
- `strengths` — 강점
- `challenges` — 주의 성향
- `aptitude` — 적성
- `career` — 직업/업무 환경
- `wealth` — 재물 관련 상징 해석
- `relationship` — 관계/연애 경향
- `family` — 가족 관계 상징 해석
- `learning` — 학습/표현 경향
- `movement` — 변화/이동 경향
- `wellbeing_symbolic` — 전통적 건강 상징

### 건강 관련 제한

`wellbeing_symbolic`은 의료 진단·질병 예측·치료 조언을 생성하지 않는다.

허용:

> 전통 명리 해석에서는 이 요소를 신체적 균형의 상징으로 보는 관점이 있습니다.

금지:

> 간 질환이 생깁니다.

실제 건강 질문은 의료 정보 체계와 분리한다.

### Domain Synthesis 규칙

Domain claim은 가능하면 여러 upstream claim을 근거로 한다.

```text
TenGod claim
+ Strength claim
+ Pattern claim
+ Interaction claim
-> Career interpretation candidate
```

한 개의 단순 feature를 곧바로 인생 결론으로 변환하지 않는다.

---

## 13. T9 — Time-Dynamic Interpretation

### 계층

```text
Natal chart
  + Daeun
  + Year fortune (세운/연운)
  + Month fortune (월운)
  + optional finer periods
```

### 핵심 분리

기간의 간지 계산은 Calculation/Timeline Layer가 담당한다.

Interpretation Layer는:

```text
natal facts + period facts + methodology
```

를 입력받아 상호작용 claim을 만든다.

### 제품 원칙

- 미래 사건을 확정형으로 서술하지 않는다.
- `사고 발생`, `결혼 확정`, `사업 성공` 같은 deterministic event claim을 기본 Rule로 만들지 않는다.
- 시기 해석은 `전통적 해석상 강조되는 테마/긴장/기회` 수준을 기본 표현 단위로 한다.

---

## 14. T10 — Compatibility Interpretation

궁합은 `사람 A의 점수 + 사람 B의 점수`가 아니다.

### 입력

```text
CanonicalSnapshot A
CanonicalSnapshot B
InterpretationPack
```

### 후보 dimension

- 상호 보완 구조
- 긴장 구조
- 의사소통/표현 상징
- 관계에서 강조되는 십신/오행 패턴
- 시기 상호작용

### 금지

근거 없는 `궁합 87점`과 같은 pseudo-precision을 기본 모델로 사용하지 않는다.

필요하다면 제품용 요약 등급은 별도 UX policy로 계산하되, 내부 rule evidence와 분리한다.

---

## 15. T11 — Question-Specific Synthesis

사용자의 질문에 맞추어 이미 생성된 claim을 선택·조합한다.

예:

```text
"이직하기 좋은 시기인가요?"
```

처리:

```text
1. 관련 natal career claims 조회
2. 현재/향후 period claims 조회
3. 충돌 claim 포함
4. provenance 유지
5. LLM이 제한된 evidence로 자연어 응답
```

LLM이 새로운 명리 규칙을 즉석에서 생성하지 않는다.

---

## 16. Methodology Dependency Graph

모든 taxonomy 단계가 반드시 직렬인 것은 아니다.

권장 dependency 개념:

```text
T0 Structural Facts
  ├─> T1 Structural Balance
  │     └─> T2 Day Master Strength
  ├─> T5 Ten-God Interpretation
  ├─> T6 Interaction Interpretation
  └─> T7 Shinsal Interpretation

T1/T2 + T0
  └─> T3 Pattern/Gyeokguk

T1/T2/T3 + T0
  └─> T4 Yongshin Methodologies

T2/T3/T4/T5/T6/T7
  └─> T8 Natal Domain Synthesis

T8 + Period Facts
  └─> T9 Time-Dynamic Interpretation

Person A + Person B claims
  └─> T10 Compatibility

T8/T9/T10
  └─> T11 Question-Specific Synthesis
```

실제 Method Pack은 이 그래프의 일부만 선택할 수 있다.

---

## 17. 초기 구현 우선순위

### P0 — 기반

- T0 structural facts contract
- T1 최소 구조 분석
- T2 일간 강약 연구/규칙
- T5 십신 해석의 구조화
- provenance / conflict model

### P1 — 핵심 풀이

- T3 격국
- T4 용신 방법론 최소 1개 이상을 명시적 Method Pack으로 구현
- T6 관계 해석
- T8 성향/강점/직업/재물/관계 synthesis

### P2 — 확장

- T7 선별 신살
- T9 대운/연운
- T10 궁합

### P3 — 제품 확장

- 월운/일진 등 세분화
- 추가 유파 Method Pack
- 고급 상담형 Q&A

---

## 18. `fortuneteller`에서 참고할 것과 참고하지 않을 것

현재 공개 구현은 기능 분류 참고 자료로만 사용한다.

참고 가능한 영역:

- day-master-strength
- gyeokguk
- yongshin
- ten-gods
- shinsal
- branch relations
- hidden stems
- daeun/period analysis
- compatibility/career 등 domain synthesis 분류

그대로 채택하지 않는 것:

- heuristic 숫자 점수
- 출처가 불명확한 weight
- 정적 문구를 규칙 정확성처럼 취급하는 구조
- 서로 다른 방법론을 하나의 `final result`로 압축하는 방식
- 검증되지 않은 계산 코어

---

## 19. Exit Criteria

S6는 다음이 충족되면 완료로 본다.

- Fact와 Interpretation 경계가 명시됨
- 해석 영역이 독립 category로 분류됨
- 유파 차이를 Method Pack으로 표현할 수 있음
- 용신/격국 등을 전역 단일값으로 강제하지 않음
- 사용자 domain 풀이가 상위 synthesis임을 명시함
- 시간 운세와 궁합이 별도 계층으로 분리됨
- 건강/미래 사건에 대한 과도한 단정 제한이 포함됨

이 taxonomy의 구체적 실행 형식은 `07-rule-provenance-schema.md`에서 정의한다.
