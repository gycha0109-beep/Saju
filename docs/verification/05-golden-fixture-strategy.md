# 05. Golden Fixture / Verification Strategy

## 목적

명화의 결정론적 계산 결과를 실서비스 수준으로 검증하기 위한 fixture, cross-validation, regression gate를 정의한다.

외부 라이브러리의 테스트가 많다는 이유만으로 명화의 정확성을 위임하지 않는다.

---

## 1. 검증 원칙

### 1.1 계산 정확도와 해석 정확도를 분리

이 문서는 **Calculation Layer**만 다룬다.

검증 대상:

- 음양력 변환
- 연주
- 월주
- 일주
- 시주
- 절기
- 진태양시 보정
- 과거 시간대/DST
- 십신
- 공망
- 대운 계산

여기서 통과했다고 해서 재물운, 결혼운, 미래 사건 예측이 과학적으로 정확하다는 뜻은 아니다.

### 1.2 외부 엔진 일치 = 정답이 아님

두 라이브러리가 같은 값을 낸다는 것은 유용한 신호지만 독립된 authority가 아니다.

특히 한 라이브러리의 데이터가 다른 라이브러리에서 생성되었다면 cross-validation이 독립 검증이 아닐 수 있다.

### 1.3 fixture에는 provenance가 있어야 함

expected value마다 가능한 범위에서 다음을 기록한다.

```text
fixtureId
category
input
calculationPolicy
expected
source
sourceType
sourceLocation
retrievedAt
notes
reviewStatus
```

---

## 2. 현재 `manseryeok` 테스트에서 확인한 점

### Golden test

현재 upstream에는 여러 연도의 사주팔자 expected 값을 둔 `golden.test.ts`가 있다.

주석은 KASI 표준값이라고 설명하고, 보정 없는 KST + 자정 일 경계를 사용한다.

이 fixture는 upstream 품질 신호로는 유용하다.

그러나 명화에서는 **원 출처를 직접 추적하지 않은 값을 그대로 “KASI authoritative fixture”로 승격하지 않는다.**

명화 repository에 가져올 경우 출처를 다시 확인하거나 `UPSTREAM_REGRESSION` 등급으로 분리한다.

### 6tail cross-validation

upstream은 `lunar-javascript`와 대량 교차검증을 수행하며:

- 자시 제외 grid에서 98% 이상 일치
- 일주/시주 non-boundary mismatch 없음 요구
- 1800~2300 절기 24개 전수에서 1분 이내 일치 요구

를 테스트한다.

다만 upstream 주석 자체가 절입표가 6tail 값으로 생성되었다고 설명하므로 해당 절기 비교는 **완전히 독립된 authority 검증이 아니다.**

명화에서는 이 점을 provenance에 기록한다.

---

## 3. Source Tier

### Tier A — Primary / Authoritative

가능하면 원 데이터 또는 공식 reference.

예:

- 한국천문연구원(KASI) 공개 역법/음양력 자료
- IANA timezone database
- 공식 역사 시간대 자료

용도:

- calendar conversion
- solar term instant
- historical timezone/DST

### Tier B — Independent Reference

독립적으로 구현되었고 방법론을 확인할 수 있는 신뢰도 높은 reference.

조건:

- 계산 정책이 명확해야 함
- 시간대/자시/진태양시 조건을 맞출 수 있어야 함
- 결과를 수동으로 재현 가능한 근거가 있어야 함

### Tier C — Cross-engine Concordance

다른 계산 엔진과의 비교.

용도:

- 대량 mismatch 탐지
- regression signal

정답 authority로 단독 사용하지 않는다.

### Tier D — Upstream Regression

의존 라이브러리 자체의 golden test 또는 bug regression case.

용도:

- dependency upgrade 시 behavior drift 탐지

### Tier E — Internal Regression

명화에서 발견한 버그/경계 케이스.

모든 production bug는 재현 fixture를 추가한 뒤 수정한다.

---

## 4. Fixture Schema

예시:

```ts
interface CalculationFixture {
  id: string;
  title: string;
  category: FixtureCategory;
  sourceTier: 'A' | 'B' | 'C' | 'D' | 'E';

  input: BirthInput;
  policy: CalculationPolicySnapshot;

  expected: {
    solarDate?: unknown;
    lunarDate?: unknown;
    pillars?: unknown;
    solarTerm?: unknown;
    corrections?: unknown;
    tenGods?: unknown;
    voidBranches?: unknown;
    luckCycle?: unknown;
  };

  provenance: {
    sourceName: string;
    sourceUrl?: string;
    sourceLocation?: string;
    retrievedAt?: string;
    methodology?: string;
    independentFromEngineUnderTest: boolean | 'unknown';
  };

  review: {
    status: 'draft' | 'verified' | 'disputed' | 'deprecated';
    reviewedBy?: string[];
    notes?: string;
  };
}
```

---

## 5. 필수 Fixture Category

### G1. Ordinary Four Pillars

경계에서 충분히 떨어진 일반 날짜/시간.

목적:

- 60갑자 기본 계산
- 연/월/일/시주 기본 regression

분포:

- 여러 세기
- 계절별
- 12시진 전체
- 10천간/12지지가 넓게 등장하도록 구성

---

### G2. Lichun Boundary

입춘 직전/직후.

최소:

```text
T - 2분
T - 1분
T
T + 1분
T + 2분
```

목적:

- 연주 전환
- timezone 변환
- 절입 exact instant 처리

가능하면 여러 연도 반복.

---

### G3. Monthly Jie Boundary

월주를 바꾸는 절입 직전/직후.

24절기 전체가 아니라 **월주 경계를 결정하는 절(節)** 중심으로 fixture를 둔다.

각 경계:

```text
T - 1분
T
T + 1분
```

---

### G4. Day Boundary

`midnight`, `jasi`, `splitJasi` 각각 검증.

필수 시각:

```text
22:59
23:00
23:01
23:59
00:00
00:01
00:59
01:00
```

목적:

- 일주 전환
- 시주 천간 기준
- 날짜 rollover

---

### G5. Lunar Conversion

- 평달
- 윤달
- 윤달 직전/직후
- 월 말
- 연 말/연 초
- supported range 양 끝 근처

양력→음력→양력 round-trip도 검증한다.

Property:

```text
solarToLunar(x) -> y
lunarToSolar(y) -> x
```

지원 범위 내 유효 날짜에서 성립해야 한다.

---

### G6. True Solar Time

경도 보정으로 시진이 실제로 바뀌는 사례를 포함한다.

세트:

1. correction OFF
2. longitude only
3. longitude + EoT
4. longitude + EoT + historical DST

목적:

각 correction contribution을 분리해서 검증.

---

### G7. Historical Korean Time

과거 표준시 변경과 DST 경계 사례.

검증 항목:

- UTC offset
- wall time → instant 변환
- 보정 전/후 시주 영향

IANA timezone data와 역사 자료를 provenance로 연결한다.

---

### G8. Ten Gods

십신은 10천간 day master × target stem 조합을 최소 전수 검증한다.

가능하면 branch mapping도 별도 table test.

이 영역은 deterministic lookup 성격이 강하므로 exhaustive test가 적절하다.

---

### G9. Void Branches

60갑자 전체에 대해 공망 mapping을 전수 검증할 수 있는지 검토한다.

가능하면 exhaustive fixture/table test로 만든다.

---

### G10. Luck Pillars

분리 검증:

1. 순행/역행 방향
2. 첫 대운 시작점
3. 대운 pillar sequence

성별 × 연간 음양 조합을 모두 포함한다.

대운 시작점은 유파 차이가 있으므로 expected 값에 methodology id를 반드시 붙인다.

---

### G11. Unknown Birth Time

명화 자체 기능이므로 upstream 테스트에 의존할 수 없다.

케이스:

1. 일반 날짜 → 연/월/일 resolved + hour unavailable
2. 입춘 당일 → year ambiguous 가능
3. 월 절입 당일 → month ambiguous 가능
4. `jasi`/`splitJasi`에서 day ambiguity 가능
5. true solar correction으로 경계가 이동하는 날짜

검증 방법:

- reference brute-force minute scan
- optimized boundary partition 결과

둘의 결과 set이 완전히 일치해야 한다.

---

## 6. Property / Invariant Tests

Golden fixture만으로 충분하지 않다.

### P1. Domain invariant

모든 pillar:

- stem ∈ 10천간
- branch ∈ 12지지

### P2. Sexagenary progression

연속 날짜의 일주는 정상적인 60갑자 순환을 따라야 한다.

### P3. Calendar round-trip

지원 범위에서 가능한 날짜 sample에 대해 양력↔음력 왕복 일치.

### P4. Element mapping

동일 stem/branch는 항상 동일 오행.

### P5. Yin/Yang mapping

동일 stem/branch는 항상 동일 음양.

### P6. Adapter structural/string consistency

구조적 pillar와 upstream convenience string이 불일치하면 contract violation.

### P7. Unknown-time optimization equivalence

```text
boundary-partition(input)
== brute-force-minute-reference(input)
```

---

## 7. Random / Grid Cross-validation

대량 grid test는 유지한다.

예:

```text
year: supported range에서 일정 간격
month: 1~12
hour: 자시 포함 전 시각군
policy: 여러 dayBoundary
```

secondary engine과 비교하되 mismatch를 즉시 실패로만 처리하지 않고 분류한다.

```text
MATCH
EXPECTED_POLICY_DIFFERENCE
TIMEZONE_DIFFERENCE
BOUNDARY_DIFFERENCE
UNKNOWN_CAUSE
CONFIRMED_BUG
```

`UNKNOWN_CAUSE`는 release blocker 후보다.

---

## 8. Dependency Upgrade Gate

`manseryeok` 버전을 올릴 때 반드시 기존 fixture 전체를 새 버전으로 돌린다.

Diff report:

```text
fixture id
old result
new result
changed paths
upstream changelog relation
expected / unexpected
review decision
```

### 허용

의도된 bug fix이고 근거가 확인된 변화.

### 금지

“새 버전이니까 더 정확할 것”이라는 이유만으로 expected snapshot 일괄 갱신.

---

## 9. Release Gate

Calculation Core release 최소 조건:

```text
Tier A/B golden fixtures          PASS
Boundary fixtures                PASS
Unknown-time reference parity    PASS
Invariant/property tests         PASS
Cross-engine unknown mismatch    0
Regression corpus                PASS
Dependency exact version         LOCKED
Policy version                   RECORDED
Schema version                   RECORDED
```

테스트 개수 자체를 품질 지표로 사용하지 않는다.

---

## 10. Bug Handling Rule

production 또는 검증에서 계산 버그를 발견하면 순서:

```text
1. failing fixture 추가
2. source/provenance 기록
3. root cause 확인
4. 수정
5. fixture PASS
6. 전체 regression
7. 영향받은 기존 snapshot 식별 가능성 검토
```

먼저 코드를 고치고 나중에 테스트를 맞추는 방식은 피한다.

---

## 11. 초기 목표 Corpus

구현 시작 전 최소 설계 목표:

- ordinary four pillars: 20+
- lichun boundary: 5개 연도 이상 × 전후
- monthly jie boundaries: 12개월 대표 + 추가 historical cases
- day boundary: 3 policy × 핵심 시각
- lunar/leap month: 20+
- true solar time: 10+
- historical timezone/DST: 10+
- ten gods: exhaustive deterministic table
- void branches: exhaustive 가능성 검토
- luck pillars: 20+
- unknown birth time: 10+

숫자는 품질 목표가 아니라 **coverage 시작점**이다.

---

## 12. 다음 조사

1. KASI에서 직접 fixture를 구축할 수 있는 공개 데이터/API/문서 확인
2. 한국 역사 시간대/DST source 확정
3. day boundary 관법의 제품 기본값 결정에 필요한 문헌 조사
4. 대운 시작점 methodology 조사
5. 독립 secondary engine 후보 검토
6. fixture 파일 포맷(JSON/YAML/TS) 결정
