# I3 — Calculation Verification Status

- Date: 2026-08-19
- Branch: `agent/architecture-foundation`
- I3A Calculation Release Baseline: **STRICT CLOSED**
- I3B Authority Corpus Expansion: **ACTIVE / NON-BLOCKING**

## 1. 목적

I2의 `manseryeok` adapter와 명화 public Calculation Engine을 단순 upstream regression이 아니라 **출처 계층, 독립 기관 자료, primary legal/software references, boundary tests, exhaustive invariants**로 검증한다.

핵심 원칙:

```text
upstream test exists
!=
independent authority exists
```

그리고:

```text
검증 가능한 release baseline
!=
역사/천문 모든 연도의 완전한 authority corpus
```

따라서 I3를 다음 두 트랙으로 분리한다.

```text
I3A  Calculation Release Baseline
     현재 Engine MVP 계산 경로를 release-gate 수준으로 검증

I3B  Authority Corpus Expansion
     더 많은 공식 관보/월력요항/역사자료/대운 근거를 지속 축적
```

I3B가 끝없이 확장될 수 있다는 이유로 이미 검증된 I3A를 계속 `IN PROGRESS`로 두지 않는다.

---

## 2. Source Tier

```text
Tier A
  공식 발표 / primary legal reference / 해당 영역의 primary software reference

Tier B
  독립 기관 reference이지만 공식 발표/정본보다 한 단계 낮은 자료

Tier C
  독립 엔진 간 concordance

Tier D
  upstream dependency regression

Tier E
  명화 내부 regression
```

`Tier A`도 source가 직접 증명하는 범위만 authority로 인정한다.

예:

```text
법령이 표준자오선 전환을 증명
!=
법령 하나가 최종 사주 시주를 직접 증명
```

---

## 3. I3A에서 확보한 독립 authority

### 3.1 KASI 공식 월력요항 — 음력/양력 변환 Tier A

2021~2026 공식 월력요항 발표를 source registry에 등록했다.

각 연도에서:

```text
음력 1월 1일  -> 설날 양력 날짜
음력 8월 15일 -> 추석 양력 날짜
```

을 사용한다.

총:

```text
6개 연도 × 2 anchors = 12 Tier A fixtures
```

fixture IDs:

```text
CAL-LUNAR-KASI-2021-NEW-YEAR
CAL-LUNAR-KASI-2021-CHUSEOK
...
CAL-LUNAR-KASI-2026-NEW-YEAR
CAL-LUNAR-KASI-2026-CHUSEOK
```

이 12개 expected 값은 engine output에 맞춰 수정하지 않았으며 CI에서 그대로 PASS했다.

---

### 3.2 KASI 달력자료 — 절기 Tier B

KASI 달력자료는 스스로:

```text
공식 발표 자료가 아님
공식 발표는 월력요항 확인
```

이라고 명시하므로 Tier A로 승격하지 않는다.

대신 독립 기관 reference로 다음을 검증한다.

#### 입춘 6개 연도

```text
2021~2026 입춘 정확 시각
T-1 minute
T+1 minute
연주/월주 경계 변화
```

#### 2024 월 절입 12개

```text
소한
입춘
경칩
청명
입하
망종
소서
입추
백로
한로
입동
대설
```

각 절입에서:

```text
T-1 minute -> 이전 월주
T+1 minute -> 다음 월주
```

변화를 검증한다.

판정:

```text
Tier B VERIFIED
official-source promotion remains I3B
```

---

### 3.3 윤달 독립 기관 fixtures — Tier B

KASI 달력자료를 이용해:

```text
2023 윤2월 1일 -> 2023-03-22
2025 윤6월 1일 -> 2025-07-25
```

을 검증한다.

기존 upstream-only 윤달 regression보다 독립성을 강화했지만, 공식 월력요항 본문 직접 확인 전까지 Tier B를 유지한다.

---

### 3.4 일주 cycle phase — KASI 기관 anchor

KASI 월별 음양력 서비스의 **일진(日辰)**만 사용하여:

```text
2026-06-01 -> 병오일
2026-06-15 -> 경신일
2026-06-30 -> 을해일
```

을 독립 anchor로 고정한다.

주의:

해당 페이지의 월간지는 음력 월 표기이므로 명화 사주 월주 authority로 사용하지 않는다.

---

## 4. 역사 한국 civil time 검증

### 4.1 1908 대한제국 관보

원자료:

```text
관보 제3994호
칙령 제5호
大韓國標準時에關한件
```

핵심:

```text
동경 127도 30분 평시를 대한국 표준시로 정함
시행일 1908-04-01
```

### 4.2 1954 대한민국 대통령령 제876호

```text
1954-03-21
표준자오선 -> 동경 127도 30분
```

### 4.3 1961 법률 제676호

```text
1961-08-10
표준자오선 -> 동경 135도
0시를 0시30분으로 이동
```

### 4.4 IANA tzdb 2026c cross-check

Asia/Seoul:

```text
LMT +08:27:52  before 1908-04-01
+08:30         from 1908-04-01
+09:00         from 1912-01-01
+08:30         from 1954-03-21
+09:00         from 1961-08-10
```

1954/1961 법정 전환은 대한민국 primary legal sources와 IANA를 함께 사용해 boundary-sensitive 시주 fixture로 검증한다.

---

## 5. 발견된 upstream historical gap과 remediation

검증 중 `manseryeok 2.0.0`의 역사 시간 table이 첫 epoch보다 앞선 날짜에:

```text
DEFAULT_OFFSET_MIN = +09:00
```

을 사용하는 것을 발견했다.

그러나:

- IANA는 1908-04-01 이전 Seoul을 LMT `+08:27:52`로 표현한다.
- 대한제국 국가 표준시 법정 시행은 1908-04-01부터다.
- 1908 이전 civil-time interpretation을 단순 `+09:00`으로 authoritative하다고 볼 근거가 없다.

따라서 명화는 silent fallback을 허용하지 않는다.

```text
trueSolarTime.enabled = true
AND
applyHistoricalDst = true
AND
solarDate < 1908-04-01

=> MyeonghwaCalculationError(UNSUPPORTED_POLICY)
```

중요:

```text
전체 계산 지원범위를 1908 이후로 줄인 것이 아님
```

historical civil-time correction을 요구하지 않는 계산은 기존 range를 유지한다.

음력 입력도 실제 양력 변환일 기준으로 guard한다.

---

## 6. Exhaustive / Property Gates

### 6.1 60갑자 일주 progression

61개 연속 양력일을 실행하여:

```text
매일 sexagenary index +1
첫 60일 모두 unique
61번째 = 첫날 반복
```

을 검증한다.

### 6.2 일반 grid structural invariant

```text
2021 / 2024 / 2026
× 12개월
= 36 samples
```

에서:

- stem/branch domain validity
- element/yin-yang domain validity
- canonical dayMaster = day pillar stem
- five-element count total = 8
- TenGod day stem = `일간`

을 검증한다.

### 6.3 십신 exhaustive

```text
10 day masters × 10 target stems = 100 relations
```

을 명화 테스트의 독립 오행/음양 관계식과 upstream public API 사이에서 전수 비교한다.

### 6.4 공망 exhaustive

60갑자 모든 일주에 대해 6개 旬의 공망 2지를 전수 검증한다.

### 6.5 Policy identity

같은 결과값이 우연히 나와도 계산 정책이 다르면:

```text
calculationHash
snapshotId
```

가 달라지는 것을 검증한다.

---

## 7. 기존 regression / boundary coverage

I3A release baseline은 기존 I2/I4 test corpus와 합쳐 다음을 포함한다.

| 영역 | 검증 수준 | 상태 |
|---|---|---|
| 일반 4주 | Tier D golden + independent day anchors + invariants | PASS |
| 음력 기본 변환 | 2021~2026 Tier A 12 fixtures | PASS |
| 윤달 | Tier B independent + Tier D regression | PASS |
| 입춘 | Tier B 6-year minute boundary | PASS |
| 월 절입 | Tier B 2024 12-boundary matrix | PASS |
| 자시 3관법 | policy regression | PASS |
| 진태양시 | boundary regression | PASS |
| 1908 이전 역사 보정 | fail-closed remediation | PASS |
| 1954 표준시 전환 | Korean law + IANA derived boundary | PASS |
| 1961 표준시 전환 | Korean law + IANA derived boundary | PASS |
| 1988 DST | IANA component + derived boundary | PASS |
| unknown birth time | 1,440-minute enumeration / scenario tests | PASS |
| 60갑자 progression | exhaustive property | PASS |
| 십신 | 100 relations exhaustive | PASS |
| 공망 | 60 pillars exhaustive | PASS |
| invalid input | public error contract | PASS |
| supported solar range | upstream contract + Myeonghwa boundary | PASS |

---

## 8. Latest I3A Gate

```text
HEAD: 4ae4e084d227e8959a20313467803e803498c3bb

CI run: 285
run id: 32217659759
job id: 95962091692

npm ci        PASS
lint          PASS
TS6 typecheck PASS
Vitest        PASS
build         PASS

Test files     26 passed
Tests          174 passed
```

주요 신규 suites:

```text
calculation-authoritative-fixtures.test.ts  16 PASS
solar-term-boundary-corpus.test.ts          19 PASS
historical-time-authorities.test.ts          4 PASS
lunar-leap-institutional.test.ts             3 PASS
calculation-invariants.test.ts               3 PASS
structural-lookup-exhaustive.test.ts         2 PASS
institutional-day-ganji.test.ts              4 PASS
```

---

## 9. I3A Close 판정

```text
I3A_CALCULATION_RELEASE_BASELINE = STRICT CLOSED
```

이 판정이 의미하는 것:

- 현재 계산 engine path에 재현 가능한 release gate가 존재한다.
- upstream regression만으로 정확성을 주장하지 않는다.
- 핵심 lunar / solar-term / historical-time / structural boundaries가 독립 source 또는 exhaustive invariant와 연결되어 있다.
- 확인되지 않은 역사 구간은 fail-closed 처리한다.

이 판정이 의미하지 않는 것:

```text
모든 1800~2300 날짜를 공식 KASI 원문과 전수 대조했다
모든 역사적 civil time이 법적 원자료로 완전 복원됐다
모든 명리 유파가 동일한 계산 정책을 사용한다
미래예측 정확성이 검증됐다
```

---

## 10. I3B — Authority Expansion Open Items

I3A를 reopen하지 않고 별도 비차단 validation track으로 지속한다.

### Priority A

1. 공식 월력요항/전자관보 원문에서 복수 연도 절기 **시각** 직접 추출
2. 윤달 공식 발표/정본 fixture 추가
3. 1908/1912 전환 관련 primary historical source 추가 확보
4. historical DST 각 시행연도 primary-source sampling

### Priority B

5. 더 넓은 연도 solar-term sampling
6. 추가 독립 day-ganji anchors
7. cross-engine differential corpus 확대
8. 대운 시작점 계산 authority 별도 연구

공식 절기 원문을 찾지 못했다는 이유로 KASI 달력자료를 Tier A로 올리지 않는다.

---

## 11. Calculation Policy Default는 별도 결정

다음은 계산 구현 correctness 문제가 아니라 **명화가 어떤 방법론을 기본으로 제공할지**의 정책 문제다.

```text
dayBoundary default
trueSolarTime default
historical correction default
birthplace requirement
luck-pillar start exposure
```

따라서 I3A close와 분리한다.

```text
Calculation capability verified
!=
Production methodology default selected
```

이 결정은 별도 policy decision track에서 source/운영 UX와 함께 고정한다.

---

## 12. 금지되는 과장

I3A가 닫혔어도 다음 표현은 금지한다.

```text
100% 정확
KASI 인증 사주엔진
과학적으로 검증된 사주 예측
모든 유파에서 유일하게 올바른 계산
```

정확한 표현은:

```text
versioned deterministic calculation
source-tiered verification corpus
explicit calculation policy
boundary-aware ambiguity
fail-closed unsupported historical correction
```

이다.
