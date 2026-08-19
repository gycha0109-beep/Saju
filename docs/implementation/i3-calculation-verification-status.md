# I3 — Calculation Verification Status

- Date: 2026-08-19
- Branch: `agent/architecture-foundation`
- Status: **ACTIVE / PARTIAL AUTHORITY CLOSED**

## 1. 목적

I2에서 구현한 `manseryeok` adapter와 명화 public Calculation Engine을 단순 upstream regression을 넘어 **출처 계층이 명시된 fixture corpus**로 검증한다.

핵심 원칙:

```text
upstream test exists
!=
independent authority exists
```

따라서 fixture마다 source tier와 authority class를 저장한다.

---

## 2. Source Tier

현재 실무 분류:

```text
Tier A
  공식 발표 또는 해당 데이터 영역의 primary software reference

Tier B
  독립 또는 1차 기관 reference이지만 공식 발표/정본보다 한 단계 낮은 자료

Tier C
  독립 엔진 간 concordance

Tier D
  upstream dependency regression

Tier E
  명화 내부 regression
```

`Tier A`라고 해서 모든 영역에서 법적·과학적 최종 authority라는 뜻은 아니다. `authorityClass`를 같이 본다.

---

## 3. 현재 Source Registry

### A. 2024 월력요항 발표 — Tier A / official announcement

Source:

`https://www.kasi.re.kr/kor/publication/post/newsMaterial/29633?cPage=7`

확인:

- 한국천문연구원이 과학기술정보통신부의 `2024년도 월력요항 발표`를 게시
- 월력요항을 달력 제작 기준이 되는 공식 발표 자료로 설명
- 본문에서 `설날(음 1월 1일) = 2024-02-10`을 명시

현재 fixture:

```text
CAL-LUNAR-KASI-2024-NEW-YEAR
```

검증 대상:

```text
lunar 2024-01-01
-> solar 2024-02-10
```

판정:

```text
Tier A VERIFIED
```

---

### B. KASI 2024 달력자료 — Tier B / primary institution reference

Source:

`https://astro.kasi.re.kr/life/post/calendardata`

확인:

```text
2024 입춘 = 2월 4일 17:27
```

그러나 해당 페이지 자체가 다음을 명시한다.

```text
이 자료는 공식 발표 자료가 아님
공식 발표 자료는 월력요항 확인
```

따라서 KASI domain의 페이지라고 해서 자동으로 Tier A로 승격하지 않는다.

현재 fixture:

```text
CAL-TERM-KASI-2024-LICHUN
```

판정:

```text
Tier B PROVISIONAL
```

승격 조건:

- 2024 월력요항 관보 원문 또는 공식 월력요항 첨부 본문에서 17:27 직접 확인

---

### C. IANA tzdb 2026c — Tier A / primary software reference

Source:

`https://data.iana.org/time-zones/tzdb-2026c/asia`

확인된 Asia/Seoul 자료:

```text
1954-03-21 이후 base standard offset +08:30
1961-08-10 이후 +09:00

ROK 1955 DST:
  May 5 00:00 +1h
  Sep 8 24:00 end

ROK 1987-1988 DST:
  May Sun>=8 02:00 +1h
  Oct Sun>=8 03:00 end
```

현재 fixture:

```text
CAL-TZ-IANA-1955-STANDARD-OFFSET
CAL-TZ-IANA-1988-DST
```

판정:

```text
Tier A VERIFIED as primary software timezone reference
```

주의:

IANA source file도 역사 데이터가 완전한 법적 authority라고 주장하지 않는다. 따라서 더 강한 역사 검증이 필요할 경우 대한민국 관보/법령/국가기록원 자료로 보강한다.

---

### D. manseryeok upstream test — Tier D

Source examples:

```text
https://github.com/yhj1024/manseryeok/blob/main/src/golden.test.ts
https://github.com/yhj1024/manseryeok/blob/main/src/index.test.ts
```

현재 사용:

- 1992-10-24 05:30 golden
- lunar goldens
- jasi variants
- true-solar regression
- supported range

판정:

```text
Tier D only
```

upstream가 주석으로 `KASI 기준`이라고 주장해도 명화가 원자료를 독립 확인하기 전에는 Tier A가 아니다.

---

## 4. Fixture Code

```text
test/fixtures/calculation-fixtures.ts
```

Source metadata:

```ts
sourceId
sourceTier
authorityClass
organization
url
retrievedAt
independentFromManseryeok
notes
```

Fixture metadata:

```ts
fixtureId
category
input
expected
provenance.sourceIds
provenance.reviewStatus
```

`test/calculation-fixture-provenance.test.ts`가 다음을 강제한다.

- 모든 sourceRef resolve
- official KASI fixture가 Tier A임
- KASI 달력자료 입춘 fixture는 아직 provisional Tier B임
- IANA fixture는 upstream와 독립된 primary software reference임
- upstream golden은 절대 Tier A로 위장할 수 없음

실제 fixture 실행:

```text
test/calculation-authoritative-fixtures.test.ts
```

---

## 5. 현재 검증 Matrix

| 영역 | fixture 수준 | 상태 |
|---|---|---|
| 일반 4주 | Tier D upstream + 내부 regression | PASS |
| 음력 기본 변환 | Tier A 일부 확보 | PASS |
| 윤달 | Tier D upstream / KASI reference | PASS |
| 입춘 시각 | Tier B KASI reference | PASS / promotion pending |
| 자시 3관법 | Tier D + policy regression | PASS |
| 진태양시 | Tier D + internal boundary regression | PASS |
| 1955 역사 표준시 | Tier A IANA component + internal derived regression | PASS |
| 1988 DST | Tier A IANA component + internal derived regression | PASS |
| unknown birth time | internal exhaustive scenario regression | PASS |
| 양력 지원 범위 | upstream contract regression | PASS |
| invalid date | contract regression | PASS |

---

## 6. Tier A의 의미를 과장하지 않는다

예:

```text
IANA가 1988 DST를 증명
```

한다고 해서 바로:

```text
1988-08-15 09:50의 사주 시주 = 진
```

전체가 IANA 하나로 직접 증명되는 것은 아니다.

실제 derived fixture는:

```text
IANA civil time rule
+
manseryeok true-solar calculation
+
명화 adapter mapping
```

을 결합한다.

따라서 provenance는 component-level로 이해한다.

---

## 7. 아직 남은 I3 Gap

### P0

1. 2024 공식 월력요항/관보 원문에서 입춘 17:27 직접 확인
2. 복수 연도의 공식 KASI lunar conversion fixture 확보
3. 입춘 외 월 절입 공식 fixture 확보
4. historical Korean time source를 IANA 외 대한민국 원자료로 최소 일부 교차확인

### P1

5. 윤달 Tier A fixture 확장
6. 1908/1912/1954/1961 time-zone change 경계 fixture
7. 다수 년도 solar-term sampling
8. 대운 시작점 authority 연구

---

## 8. 현재 판정

```text
I2 Calculation Adapter = IMPLEMENTED / GREEN
I3 Calculation Verification = ACTIVE

Tier A component evidence = AVAILABLE
Full calculation authority corpus = NOT YET COMPLETE
```

현재 상태에서 엔진 계산 구현을 계속 확장하는 것은 가능하다.

하지만 다음과 같은 제품 claim은 아직 금지한다.

```text
100% 정확
공식 KASI 인증 만세력
과학적으로 검증된 미래예측
```

I3는 전체 개발을 멈추는 blocker가 아니라, 계산 authority를 단계적으로 강화하는 병렬 validation track이다.
