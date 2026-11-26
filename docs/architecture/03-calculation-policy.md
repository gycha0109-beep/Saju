# 03. Calculation Policy Specification

## 목적

사주 계산 결과를 바꿀 수 있는 선택을 암묵적 default에 맡기지 않고 **명화의 버전된 Calculation Policy**로 명시한다.

같은 생년월일시라도 day boundary, 진태양시, 역사적 표준시/DST, 음력 윤달 처리 등의 선택에 따라 결과가 달라질 수 있다.

따라서 계산 결과는 반드시 “무슨 정책으로 계산했는가”와 함께 보존한다.

---

## 1. 정책과 엔진을 분리한다

```text
Calculation Engine
= 계산 기능을 제공하는 구현체

Calculation Policy
= 명화가 어떤 계산 관법/옵션을 선택했는지 정의한 계약
```

예를 들어 `manseryeok` v2.0.0이 `midnight`, `jasi`, `splitJasi`를 모두 지원한다고 해서 명화가 세 값을 아무 맥락 없이 사용해서는 안 된다.

명화는 자체 policy id/version을 정의하고 adapter가 이를 외부 엔진 옵션으로 변환한다.

---

## 2. 초기 Policy shape

```ts
interface CalculationPolicy {
  id: string;
  version: string;

  calendar: {
    invalidDate: 'reject';
    lunarLeapMonth: 'explicit';
  };

  dayBoundary: {
    mode: 'midnight' | 'jasi' | 'splitJasi';
  };

  trueSolarTime: {
    enabled: boolean;
    longitude: {
      source: 'birthplace' | 'manual' | 'service-default';
      defaultLongitude?: number;
    };
    equationOfTime: {
      enabled: boolean;
    };
    historicalDst: {
      enabled: boolean;
    };
  };

  timeZone: {
    source: 'birthplace' | 'manual' | 'service-default';
    defaultTimeZone?: string;
  };

  unknownBirthTime: {
    mode: 'preserve-unknown-and-enumerate-boundaries';
  };

  luckPillars: {
    enabled: boolean;
    requireSexInput: boolean;
    algorithmId: string;
    algorithmVersion: string;
  };
}
```

---

## 3. Calendar Policy

### invalidDate = reject

잘못된 날짜를 보정하거나 묵시적으로 다른 날짜로 이동하지 않는다.

예:

- 2025-02-30 → reject
- 음력에서 존재하지 않는 윤달 입력 → reject
- engine supported range 밖 → reject

오류는 사용자 입력 오류와 엔진 지원 범위 오류를 구분한다.

### lunarLeapMonth = explicit

음력 입력에서는 윤달 여부를 명시적으로 받는다.

윤달 여부를 자동 추측하지 않는다.

---

## 4. Day Boundary Policy

`manseryeok` v2.0.0은 다음 세 관법을 지원한다.

| mode | 23:00~23:59 일주 | 시주 천간 기준 |
|---|---|---|
| `midnight` | 당일 | 당일 일간 |
| `jasi` | 다음날 | 다음날 일간 |
| `splitJasi` | 당일 | 다음날 일간 |

### 현재 상태

**명화 기본값은 아직 확정하지 않는다.**

외부 라이브러리의 default가 `midnight`라고 해서 제품 방법론의 default로 자동 채택하지 않는다.

확정 전 필요한 검토:

1. 아버지가 채택하려는 명리 관법
2. 국내 주요 만세력/사주 서비스의 처리 방식
3. 문헌 근거
4. 경계 사례 golden fixture
5. 사용자에게 관법 선택을 노출할지 여부

확정되면 예:

```text
policyId: myeonghwa-standard
policyVersion: 1.0.0
dayBoundary.mode: ...
```

형태로 고정한다.

---

## 5. True Solar Time Policy

진태양시는 결과에 직접 영향을 줄 수 있으므로 단순 표시 옵션이 아니다.

구성 요소를 분리한다.

### 5.1 Longitude correction

출생지 경도를 기준으로 표준 자오선과의 시각 차이를 보정한다.

출생지를 사용할 경우 최소 다음을 추적한다.

- 입력된 장소 label
- longitude
- longitude source
- 좌표 데이터 provider/version(외부 geocoder를 쓰는 경우)

### 5.2 Equation of Time

균시차 적용 여부를 별도 flag로 보존한다.

### 5.3 Historical standard time / DST

과거 한국 표준시와 서머타임 등 역사적 시간 정책 적용 여부를 보존한다.

### 현재 상태

**진태양시 기본 적용 여부는 아직 확정하지 않는다.**

`manseryeok`의 라이브러리 default는 OFF이며, 옵션 활성화 시 경도 + 균시차 + 역사적 시간 보정을 사용할 수 있다.

명화의 product default는 별도 방법론 검토 후 결정한다.

---

## 6. Time Zone Policy

장기적으로 해외 출생자를 지원할 가능성이 있으므로 `Asia/Seoul`을 domain 상수로 박지 않는다.

시간대 source를 기록한다.

```text
birthplace
manual
service-default
```

초기 MVP가 한국 출생만 지원하더라도 policy에 명시한다.

예:

```text
timeZone.source = service-default
timeZone.defaultTimeZone = Asia/Seoul
supportedBirthCountries = KR
```

이렇게 해야 추후 범위 확장 시 과거 계산의 의미가 바뀌지 않는다.

---

## 7. Unknown Birth Time Policy

명화는 출생시간 미상을 임의 시간으로 채우지 않는다.

```text
unknownBirthTime.mode = preserve-unknown-and-enumerate-boundaries
```

### 왜 단순히 `시주 = null`이면 안 되는가

시간 미상 날짜가 다음 경계와 겹치면 시주 외 pillar도 하나로 확정되지 않을 수 있다.

- 입춘 절입 당일 → 연주 후보 복수 가능
- 월주를 바꾸는 절입 당일 → 월주 후보 복수 가능
- `jasi`/`splitJasi` 관법에서 23시 구간 → 일주 후보 복수 가능
- 진태양시 보정으로 날짜/시진 경계가 이동하는 경우

따라서 시간 미상 계산은 **가능한 시간대에서 결과가 바뀌는 경계를 탐색**해야 한다.

### 결과 정책

각 canonical fact는 다음 중 하나다.

```text
resolved
ambiguous
unavailable
```

예:

```text
일반 날짜 + 시간 미상
year  = resolved
month = resolved
day   = resolved
hour  = unavailable
```

반면 입춘 절입 당일이면:

```text
year = ambiguous [입춘 전 연주, 입춘 후 연주]
```

이 될 수 있다.

### 구현 기준

초기 reference 구현은 필요하면 1일 1,440분 전수 계산으로 결과 set을 만들 수 있다.

최적화 구현은 절입/자시/진태양시 경계를 기준으로 time interval을 나누되, golden/property test에서 reference 결과와 완전히 일치해야 한다.

### 시주 처리

시간 미상에서 시주 12개 후보를 기본 canonical result로 제공하지 않는다.

기본:

```text
hour.status = unavailable
reason = birth-time-unknown
```

향후 12시진 비교나 출생시간 추정 기능은 별도 feature로 분리한다.

---

## 8. Luck Pillar Policy

현재 우선 후보 엔진은 대운에 대해 다음 유형의 알고리즘을 제공한다.

- 성별 + 연간 음양 기반 순행/역행
- 인접 절기까지 거리 기반 대운 시작점

하지만 대운 시작 시점은 관법 차이가 존재할 수 있으므로 다음을 policy에 둔다.

```text
algorithmId
algorithmVersion
```

외부 엔진 함수 이름을 algorithm identity로 사용하지 않는다.

예:

```text
algorithmId: luck-cycle-nearest-jeol-3day-year
algorithmVersion: 1
```

정확한 명칭과 수식은 검증 단계에서 확정한다.

시간 미상에서는 대운 시작점 계산에 concrete instant가 필요한 경우 `ambiguous` 또는 `unavailable`로 처리해야 한다. 임의의 시각을 넣어 단일값을 만들지 않는다.

---

## 9. Policy 변경 규칙

### Patch

결과 의미를 바꾸지 않는 설명/metadata 변경.

### Minor

기존 결과를 유지하면서 새로운 선택 가능성을 추가.

### Major

동일 Birth Input의 Calculation Fact가 달라질 수 있는 변경.

예:

- `midnight` → `jasi`
- true solar time default OFF → ON
- 대운 시작점 알고리즘 변경
- 역사적 DST 해석 변경
- unknown-time ambiguity resolution 알고리즘의 의미 변경

이 경우 기존 snapshot을 덮어쓰지 않고 재계산 snapshot을 별도로 생성한다.

---

## 10. Recalculation Contract

과거 결과를 재현하려면 최소 다음 값이 필요하다.

```text
BirthInput
CalculationPolicy id/version
Calculation Engine name/version
Adapter version
Canonical Schema version
관련 dataset provenance
```

LLM model/version은 Calculation Fact 재현에 필요하지 않다.

---

## 11. 초기 미결정 항목

다음은 구현 전에 확정해야 한다.

1. 명화 표준 `dayBoundary`
2. 진태양시 기본 ON/OFF
3. 균시차 기본 ON/OFF
4. 역사적 DST/표준시 보정 범위
5. 한국 외 출생 초기 지원 여부
6. 대운 시작점 표준 알고리즘
7. 대운 나이 표시 방식(만 나이/전통 나이 표현 포함)
8. 출생시각의 초(second) 단위 지원 필요성
9. unknown-time derived fact의 partial 제공 범위
10. unknown-time candidate 탐색의 production 알고리즘

이 항목은 임의로 정하지 않고 자료·경쟁 서비스·문헌·golden fixture를 통해 결정한다.
