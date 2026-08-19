# ADR-0005 — Calculation Policy Profiles & Sensitivity Before Production Default

- Status: Accepted
- Date: 2026-08-19
- Scope: calculation methodology / product-default boundary

## Context

명화 Calculation Engine은 다음 값을 모두 재현 가능하게 계산할 수 있다.

```text
dayBoundary = midnight | jasi | splitJasi
trueSolarTime = on | off
longitude
Equation of Time
historical standard time / DST
```

그러나 이 옵션이 존재한다는 사실과 특정 옵션이 모든 명리 관법에서 유일하게 옳다는 주장은 다르다.

특히 두 영역은 실제 명식 결과를 바꿀 수 있다.

1. 23:00–23:59 자시의 일주 귀속
2. 기록된 civil clock time을 지방 진태양시로 보정할지 여부

## Evidence boundary

### Day boundary

《唐會要》 권42의 역법 논의에는 `古歷分日，起於子半`이라는 기록이 있으며 자시의 중간, 즉 자정에서 날짜를 구분하는 역사적 역법 근거가 존재한다.

- https://zh.wikisource.org/zh-hans/%E5%94%90%E6%9C%83%E8%A6%81/%E5%8D%B7042

동시에 현대 사주 계산에서는 23:00–23:59를 다음 일주로 넘기는 관법과, 일주는 당일로 두되 시주 천간만 다음날 일간으로 계산하는 관법도 사용된다. pinned upstream `manseryeok 2.0.0`도 이 차이를 학파 차이로 명시하고 세 방식을 모두 지원한다.

- `midnight`: 당일 일주 / 당일 일간 기준 시주
- `jasi`: 다음날 일주 / 다음날 일간 기준 시주
- `splitJasi`: 당일 일주 / 다음날 일간 기준 시주

- https://github.com/yhj1024/manseryeok

따라서 historical calendar evidence 하나를 BaZi 전체의 유일한 정답으로 확대하지 않는다.

### Civil time vs apparent solar time

중국과학원 지리과학·자원연구소 자료는 각 경도에 고유 지방시가 있고 경도 1도당 약 4분 차이가 난다고 설명한다.

- https://igsnrr.cas.cn/cbkx/kpyd/dlzs/earth/202009/t20200910_5692488.html

NOAA Solar Calculator는 위치·시간대·날짜를 입력으로 equation of time과 solar noon/position을 계산한다. NOAA는 역사적 time-zone 값 자체는 별도 주의가 필요하다고 명시한다.

- https://gml.noaa.gov/grad/solcalc/

이는 civil time과 apparent solar time이 물리적으로 다른 좌표라는 근거다. 그러나 사주 시주가 반드시 apparent solar time을 사용해야 한다는 명리 방법론의 보편적 합의를 의미하지 않는다.

`manseryeok 2.0.0` 역시 true-solar correction을 **optional / default OFF**로 제공한다.

## Decision

### 1. 단일 production default를 아직 승인하지 않는다

정책 연구 단계에서 다음과 같이 선언한다.

```text
productionDefaultAuthorized = false
```

모든 built-in profile에 이 값을 강제한다.

### 2. Engineering reference를 production authority와 분리한다

비교 기준용 profile:

```text
civil-midnight-reference-v1

clock basis   = civil time
day boundary  = midnight
true solar    = off
role          = engineering_reference
```

이 profile을 선택한 이유:

- civil birth record를 임의 변환하지 않는 최소 변형 baseline
- 자정 날짜 경계에 역사적 역법 precedent가 존재
- pinned upstream의 기본 dayBoundary와도 일치
- 다른 관법과 차이를 비교하기 쉬움

그러나 **제품 기본값으로 승인했다는 뜻은 아니다.**

### 3. 동일 입력을 sensitivity profiles로 비교 가능하게 한다

v1 profile set:

```text
civil-midnight-reference-v1
civil-jasi-sensitivity-v1
civil-split-jasi-sensitivity-v1
solar-midnight-sensitivity-v1
solar-jasi-sensitivity-v1
solar-split-jasi-sensitivity-v1
```

각 계산 결과는 Canonical Snapshot으로 유지하고, 의미 결과가 달라지는 path를 계산한다.

초기 sensitivity path:

```text
pillars.year
pillars.month
pillars.day
pillars.hour
derivedFacts.dayMaster
derivedFacts.tenGods
derivedFacts.voidBranches
derivedFacts.fiveElementCounts
luckCycle
```

### 4. apparent-solar profile은 출생지 정보를 추정하지 않는다

Solar profile 요구사항:

```text
birthplace.longitude required
birthplace.timeZone == Asia/Seoul required
Equation of Time = on
historical correction = on
```

경도가 없으면 `127.5` 같은 서비스 임의값을 주입하지 않는다.

현재 Calculation Engine이 한국 `Asia/Seoul`만 검증했으므로 다른 time zone을 가진 출생지는 solar profile을 활성화하지 않는다.

### 5. historical correction은 support range를 존중한다

현재 명화 public engine 규칙:

```text
solar date < 1908-04-01
AND apparent-solar historical correction requested
=> UNSUPPORTED_POLICY
```

Sensitivity report는 이 rejection을 숨기거나 civil 결과로 대체하지 않는다.

### 6. 결과가 같으면 방법론 차이를 과장하지 않는다

여러 profile이 같은 semantic chart를 만들면:

```text
materiallySensitive = false
```

로 표시할 수 있다.

### 7. 결과가 달라지면 차이를 보존한다

예:

```text
23:30 birth
civil-midnight -> day A
civil-jasi     -> day B
```

또는:

```text
07:05 Seoul clock time
civil-time        -> hour branch A
apparent-solar    -> hour branch B
```

이면 `materiallySensitive=true`와 affected paths를 반환한다.

이 차이를 한 profile이 다른 profile보다 더 '정확하다'는 점수로 변환하지 않는다.

## Product implication

향후 production UX는 다음 중 하나를 별도 결정해야 한다.

```text
A. 특정 profile을 명화 기본 관법으로 선언
B. 사용자가 관법을 선택
C. 하나의 기본 profile + materially-sensitive case에서 alternative 공개
D. 경계 민감 케이스에서만 복수 명식 병렬 표시
```

현재 architecture 추천은 **C 또는 D를 지원할 수 있는 상태를 먼저 확보**하는 것이다.

즉 product default를 선택해도 sensitivity 정보가 사라지지 않는다.

## Explicit non-decision

ADR-0005는 다음을 결정하지 않는다.

```text
명화 production dayBoundary = midnight
명화 production dayBoundary = jasi
명화 production trueSolarTime = on
명화 production trueSolarTime = off
```

이는 실제 사용 UX와 명리 방법론 기준을 포함하는 후속 승인 대상이다.

## Consequences

장점:

- 학파 차이를 bug처럼 숨기지 않음
- 특정 방법론을 근거 없이 '정답'으로 마케팅하는 위험 감소
- 경계 민감 사용자에게 실제로 결과가 바뀌는지 검증 가능
- product default 변경 시 기존 snapshot 재현 가능
- 출생지 없는 사용자를 진태양시 가짜 기본값으로 계산하지 않음

비용:

- 최대 6개 calculation run이 필요
- 경계 민감 UX 설계가 필요
- production default 결정 자체를 대신해주지는 않음

현재 계산량은 작고 deterministic하므로 correctness/traceability를 위해 허용한다.
