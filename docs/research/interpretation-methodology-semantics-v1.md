# Interpretation Methodology Semantics v1

- Status: Research baseline
- Date: 2026-08-19
- Production authority: **NOT AUTHORIZED**

## 1. 목적

명화 Interpretation Engine에서 같은 한자 용어가 서로 다른 방법론을 뜻하는 문제를 먼저 제거한다.

특히 `用神`을 하나의 전역 필드로 저장하거나, 서로 다른 책/주석/현대 관법의 결과를 하나의 정답처럼 합치지 않는다.

```text
same label
!=
same methodology
```

해석 rule을 작성하기 전에 반드시 다음을 구분한다.

```text
무엇을 판정하는 방법인가?
어떤 입력을 우선하는가?
무엇을 결과로 내는가?
다른 방법론과 충돌 가능한가?
출처는 원문인가, 후대 주석인가?
```

---

## 2. Source semantics

### 2.1 《子平真詮》 / 《子平真詮評注》

Reference:

- Chinese Text Project transcription: https://ctext.org/wiki.pl?chapter=974137&if=gb

원문/주석층을 섞지 않는다.

원문 계열의 핵심 구조는 `月令`을 중심으로 재관·관·인·식·살·상·겁·인 등의 격과 성패/구응을 본다는 것이다.

평주에는 `用神`이라는 말을 더 넓게 정리하며 다음과 같은 방법을 병렬적으로 설명하는 대목이 있다.

```text
扶抑
病藥
調候
專旺
通關
```

따라서 이 자료를 읽을 때도 다음 두 의미를 같은 필드로 합치면 안 된다.

```text
A. 月令 / 格局 구조에서의 用神
B. 후대 평주에서 정리된 扶抑·調候·通關 등 취용 방법
```

### 2.2 《滴天髓》 / 《滴天髓闡微》

References:

- https://zh.wikisource.org/zh-hant/%E6%BB%B4%E5%A4%A9%E9%AB%93
- https://zh.wikisource.org/zh-hant/%E6%BB%B4%E5%A4%A9%E9%AB%93%E9%97%A1%E5%BE%AE

월령의 중요성을 인정하면서도 전체 강약을 `得令/失令` 하나로 환원하는 것은 경계한다.

任氏 주석의 `衰旺` 논의는 다음을 함께 보라고 설명한다.

```text
月令
通根
年日時間의 증감
천간의 도움/억제
전체 기세
```

따라서 명화에서:

```text
month branch supports day element
=> strong
```

같은 단일 규칙은 금지한다.

I7의 seasonal-support signal이 최종 강약을 확정하지 않고 scope guard를 내는 이유도 이 원칙과 일치한다.

`源流 / 通隔` 계열은 또 다른 문제를 다룬다. 이것은 단순한 일간 강약 값이 아니라 전체 오행 기세의 흐름과 막힘/통관을 보는 관점이므로 별도 methodology family로 둔다.

### 2.3 《窮通寶鑑》

Reference:

- https://zh.wikisource.org/zh-hant/%E7%A9%B7%E9%80%9A%E5%AE%9D%E9%89%B4

월별·일간별로 한난조습과 계절 조건에 따라 필요한 천간/오행 조합을 논한다.

예를 들어 겨울 갑목을 다루는 방식은 단순 `일간이 약하므로 생조` 같은 한 줄 공식과 구조가 다르다.

따라서 이 계열은:

```text
扶抑 strength balancing
```

과 별개의:

```text
調候 climate-balancing
```

methodology로 관리한다.

### 2.4 《淵海子平》

Reference:

- https://zh.wikisource.org/wiki/%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3%E5%A4%A7%E5%85%A8

일간을 주체로 두면서 월령을 提綱으로 보고, 사주 전체의 생극·왕쇠·격국을 함께 살피도록 한다.

이 역시 `월령 하나 = 최종 결과`라는 단순화 근거로 사용하지 않는다.

---

## 3. Myeonghwa methodology namespace

초기 연구 namespace를 다음처럼 나눈다.

```text
M-GEJU-MONTH-ORDER
  월령 / 격국 구조 및 성패·구응

M-STRENGTH-FUYI
  일간 강약과 扶抑 관계

M-CLIMATE-TIAOHOU
  한난조습 / 계절 조후

M-FLOW-TONGGUAN
  대립 오행 사이의 통관 / 기세 흐름

M-SPECIAL-FOLLOW
  專旺 / 從 / 化 같은 특수 기세
```

이 namespace는 최종 production school 이름이 아니다.

목적은 서로 다른 질문을 같은 `yongshin` 필드에 넣지 않는 것이다.

---

## 4. 금지되는 global fields

다음 모델은 사용하지 않는다.

```ts
{
  yongshin: '수',
  dayMasterStrength: 82,
  goodElements: ['수', '목'],
  badElements: ['화', '토']
}
```

이유:

1. 어느 방법론의 `用神`인지 알 수 없다.
2. 방법론 사이의 상충을 보존할 수 없다.
3. 82 같은 수치에 검증 가능한 확률 의미가 없다.
4. 하나의 원소 선호를 인생 전 영역으로 과도하게 일반화하기 쉽다.

---

## 5. Required claim semantics

### 5.1 格局 / 月令 claim

예시 shape:

```text
claimType     GEJU_CANDIDATE
methodology   M-GEJU-MONTH-ORDER
value         正官格 candidate
scope         natal_structure
status        candidate | established | broken | transformed
```

`candidate`와 최종 `established`를 분리한다.

### 5.2 扶抑 claim

```text
claimType     DAY_MASTER_STRENGTH_CLASSIFICATION
methodology   M-STRENGTH-FUYI
value         strong | weak | balanced | indeterminate
inputs        month-order + roots + support/control + whole-chart factors
```

단일 월지 signal로 이 claim을 만들 수 없다.

### 5.3 調候 claim

```text
claimType     CLIMATE_BALANCE_NEED
methodology   M-CLIMATE-TIAOHOU
value         one or more climate-balancing element/stem needs
scope         seasonal_climate
```

이 결과를 `dayMasterStrength`로 변환하지 않는다.

### 5.4 通關 claim

```text
claimType     FLOW_MEDIATOR
methodology   M-FLOW-TONGGUAN
value         mediating element / relation
scope         elemental_flow
```

강약 claim과 독립적일 수 있다.

### 5.5 用神 claim

`YONGSHIN`이라는 단독 claim type을 금지한다.

대신 최소한 다음처럼 방법을 이름에 포함한다.

```text
GEJU_FUNCTIONAL_USE
FUYI_BALANCING_USE
TIAOHOU_CLIMATE_USE
TONGGUAN_MEDIATOR_USE
SPECIAL_PATTERN_USE
```

사용자-facing에서는 필요하면 모두 `용신`이라는 익숙한 말을 쓸 수 있지만 내부 authority identity는 절대로 합치지 않는다.

---

## 6. Conflict semantics

예:

```text
扶抑 관점  -> 水 필요
調候 관점  -> 火 필요
```

이면:

```text
CONFLICT = false by default
METHOD_DIFFERENCE = true
```

이다.

두 방법론은 같은 질문을 풀지 않을 수 있기 때문이다.

반대로 같은 methodology/version에서 동일 input에 서로 양립 불가능한 두 결과가 나온다면:

```text
CONFLICT = true
```

또는 rule-engine integrity 문제로 취급한다.

---

## 7. Composition rule

향후 synthesis는 다음 순서로 한다.

```text
Canonical facts
  ↓
Methodology-specific structural claims
  ↓
Within-method consistency validation
  ↓
Cross-method comparison
  ↓
Composition policy
  ↓
Narrative
```

금지:

```text
각 방법 결과를 점수화
→ 평균
→ '최종 용신'
```

허용 가능한 composition:

```text
관점 A에서는 X
관점 B에서는 Y
두 관점이 보는 문제는 Z만큼 다름
공통으로 성립하는 부분은 W
```

---

## 8. Source quality rule

고전 텍스트를 사용한다고 자동으로 production authority가 되는 것은 아니다.

각 rule은 다음을 분리한다.

```text
base work / original text
commentary / annotation
modern editorial synthesis
transcription host
critical-edition status
```

예:

`子平真詮評注`의 현대적 다섯 취용법 분류를 원문 `子平真詮` 자체의 단일 문장으로 오인하지 않는다.

Wikisource/CText는 접근 가능한 transcription source이며, 중요한 production rule은 가능하면 별도 판본/연구 검토를 추가한다.

---

## 9. Research implementation order

production 해석을 한 번에 만들지 않는다.

```text
R1  terminology / methodology registry
R2  deterministic structural prerequisites
R3  one methodology at a time
R4  positive + negative + ambiguous fixtures
R5  within-method conflict checks
R6  cross-method comparison
R7  domain review
R8  production authorization
```

초기 다음 후보는:

```text
A. M-STRENGTH-FUYI structural prerequisites
B. M-GEJU-MONTH-ORDER structural prerequisites
C. M-CLIMATE-TIAOHOU taxonomy
```

이며, 바로 재물·직업·연애 해석으로 넘어가지 않는다.

---

## 10. Production gate

어떤 methodology도 다음 조건을 모두 충족하기 전에는 production pack에 들어가지 않는다.

```text
[ ] methodology semantics explicit
[ ] source layers explicit
[ ] required facts enumerated
[ ] deterministic prerequisite extraction tested
[ ] rule provenance present
[ ] positive fixtures
[ ] negative fixtures
[ ] ambiguous fixtures
[ ] conflict behavior tested
[ ] no pseudo-confidence score
[ ] domain review complete
```

---

## 11. Current conclusion

명화에서 `용신`은 데이터베이스의 한 칸이 아니다.

```text
用神 = methodology-qualified interpretation claim
```

그리고:

```text
격국용신
扶抑용신
調候용신
通關용신
```

은 내부적으로 다른 authority identity를 가진다.

이 원칙이 지켜진 뒤에만 실제 규칙 corpus를 확대한다.
