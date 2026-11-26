# 02. Canonical Saju Schema

## 목적

외부 만세력 라이브러리의 반환 객체와 독립된 **명화 내부 표준 데이터 모델**을 정의한다.

Canonical Saju Snapshot은 “이 입력과 이 계산 정책에서 어떤 계산 결과가 나왔는가”를 재현하기 위한 immutable snapshot이다.

해석 문장이나 길흉 판단을 담지 않는다.

---

## 1. 설계 원칙

1. **Immutable snapshot**
   - 계산 완료 후 수정하지 않는다.
   - 입력 또는 정책이 달라지면 새 snapshot을 생성한다.
2. **Versioned schema**
   - `schemaVersion`을 명시한다.
3. **Engine-independent**
   - 외부 라이브러리의 class, method, convenience string을 그대로 저장하지 않는다.
4. **Raw input과 normalized input 분리**
   - 사용자가 넣은 값과 실제 계산에 사용한 값을 구분한다.
5. **Unknown을 임의값으로 채우지 않는다.**
   - 출생시간 미상은 12:00 같은 가짜 시간으로 대체하지 않는다.
6. **Ambiguity를 first-class state로 표현한다.**
   - 시간 미상 때문에 경계에서 둘 이상의 pillar가 가능하면 하나를 임의 선택하지 않는다.
7. **Calculation policy를 결과와 함께 기록**
   - day boundary, 진태양시, DST 등 결과를 바꿀 수 있는 정책을 snapshot에 연결한다.
8. **Provenance 보존**
   - engine/version/dataset/policy/schema를 추적 가능하게 한다.

---

## 2. 중요한 수정 — 출생시간 미상은 `hour = null`만의 문제가 아니다

초기 단순 모델은 “시간이 없으면 시주만 null”로 볼 수 있었지만 실제 계산 경계를 고려하면 충분하지 않다.

출생시간을 모르는 날짜가 다음과 겹치면 다른 pillar도 복수 후보가 될 수 있다.

- 입춘 절입 당일 → 연주 후보가 달라질 수 있음
- 월주를 바꾸는 절(節) 절입 당일 → 월주 후보가 달라질 수 있음
- 23시 자시 경계 + `jasi`/`splitJasi` 관법 → 일주/시주 판정이 달라질 수 있음
- 진태양시 보정으로 날짜/시진 경계를 넘는 경우

따라서 canonical schema는 각 fact에 대해 다음 상태를 표현할 수 있어야 한다.

```text
resolved     하나의 값으로 결정됨
ambiguous    둘 이상의 값이 가능함
unavailable  입력 부족/지원 불가로 값을 만들 수 없음
```

---

## 3. Top-level 구조

```text
CanonicalSajuSnapshot
├─ snapshotId
├─ schemaVersion
├─ calculationHash
├─ createdAt
├─ input
├─ policy
├─ normalized
├─ pillars
├─ derivedFacts
├─ solarTermContext
├─ luckCycle
├─ completeness
└─ provenance
```

---

## 4. 식별자 및 버전

```ts
interface CanonicalSajuSnapshot {
  snapshotId: string;
  schemaVersion: string;
  calculationHash: string;
  createdAt: string;
  input: BirthInput;
  policy: CalculationPolicySnapshot;
  normalized: NormalizedBirthInput;
  pillars: FourPillarsFact;
  derivedFacts: DerivedFacts;
  solarTermContext?: SolarTermContext;
  luckCycle: FactState<LuckCycleFact>;
  completeness: Completeness;
  provenance: CalculationProvenance;
}
```

### snapshotId

단일 계산 결과 인스턴스의 식별자.

### schemaVersion

명화 canonical schema 버전.

초기값 예:

```text
saju-canonical-v1
```

### calculationHash

다음 요소를 canonical serialization한 뒤 생성하는 hash.

```text
input
+ calculation policy
+ calculation engine identity/version
+ adapter version
+ canonical schema version
```

동일 계산의 deduplication 및 재현성 검사에 사용한다.

---

## 5. Birth Input

```ts
interface BirthInput {
  calendarType: 'solar' | 'lunar';
  date: {
    year: number;
    month: number;
    day: number;
  };
  time: BirthTime;
  isLeapMonth?: boolean;
  sexForTraditionalCalculation?: 'male' | 'female' | 'unspecified';
  birthplace?: Birthplace;
}

type BirthTime =
  | {
      known: true;
      hour: number;
      minute: number;
    }
  | {
      known: false;
    };

interface Birthplace {
  label?: string;
  countryCode?: string;
  latitude?: number;
  longitude?: number;
  timeZone?: string;
}
```

### `sexForTraditionalCalculation`

사용자 정체성을 일반화하기 위한 필드가 아니다.

전통 대운 순행/역행 계산 등 특정 계산 규칙이 남/녀 값을 요구할 때 사용하는 **계산 입력값**으로 한정한다.

제품 UX에서 어떤 표현으로 입력받을지는 별도 결정한다.

---

## 6. Fact State

Canonical fact는 단순 nullable value보다 명시적 상태를 사용한다.

```ts
type FactState<T> =
  | {
      status: 'resolved';
      value: T;
    }
  | {
      status: 'ambiguous';
      candidates: T[];
      reason: AmbiguityReason;
    }
  | {
      status: 'unavailable';
      reason: UnavailableReason;
    };

type AmbiguityReason =
  | 'birth-time-unknown-solar-term-boundary'
  | 'birth-time-unknown-lichun-boundary'
  | 'birth-time-unknown-day-boundary'
  | 'birth-time-unknown-true-solar-boundary'
  | 'multiple-supported-methods';

type UnavailableReason =
  | 'birth-time-unknown'
  | 'required-input-missing'
  | 'outside-supported-range'
  | 'engine-unsupported'
  | 'policy-disabled'
  | 'cannot-resolve-safely';
```

### 원칙

`ambiguous`는 계산 실패가 아니다.

현재 입력만으로 하나의 값을 정직하게 확정할 수 없다는 계산 결과다.

---

## 7. Calculation Policy Snapshot

Canonical Snapshot은 실제 적용된 계산 정책을 함께 보존한다.

```ts
interface CalculationPolicySnapshot {
  policyId: string;
  policyVersion: string;
  dayBoundary: 'midnight' | 'jasi' | 'splitJasi';
  trueSolarTime: {
    enabled: boolean;
    longitudeSource: 'birthplace' | 'manual' | 'default' | 'not-applicable';
    longitude?: number;
    applyEquationOfTime: boolean;
    applyHistoricalDst: boolean;
  };
  timeZonePolicy: {
    source: 'birthplace' | 'manual' | 'service-default';
    timeZone: string;
  };
  unknownBirthTimePolicy: 'preserve-unknown-and-enumerate-boundaries';
}
```

정책의 상세 의미는 `03-calculation-policy.md`에서 정의한다.

---

## 8. Normalized Calculation Input

```ts
interface NormalizedBirthInput {
  solarDate: FactState<{
    year: number;
    month: number;
    day: number;
  }>;
  lunarDate?: FactState<{
    year: number;
    month: number;
    day: number;
    isLeapMonth: boolean;
  }>;
  clockTime: FactState<{
    hour: number;
    minute: number;
  }>;
  correctedSolarTime?: FactState<{
    localDate: string;
    localTime: string;
    offsetMinutesFromInput: number;
  }>;
  timeZone: string;
  appliedCorrections: AppliedCorrection[];
}

interface AppliedCorrection {
  type:
    | 'lunar-to-solar'
    | 'longitude'
    | 'equation-of-time'
    | 'historical-standard-time'
    | 'historical-dst'
    | 'day-boundary';
  applied: boolean;
  details?: Record<string, string | number | boolean>;
}
```

중요한 점은 “보정을 했다”만 저장하는 것이 아니라 **무슨 보정이 실제 적용되었는지** 남기는 것이다.

---

## 9. Pillar Model

```ts
type HeavenlyStem =
  | '갑' | '을' | '병' | '정' | '무'
  | '기' | '경' | '신' | '임' | '계';

type EarthlyBranch =
  | '자' | '축' | '인' | '묘' | '진' | '사'
  | '오' | '미' | '신' | '유' | '술' | '해';

type FiveElement = '목' | '화' | '토' | '금' | '수';
type YinYang = '양' | '음';

interface StemFact {
  value: HeavenlyStem;
  hanja: string;
  element: FiveElement;
  yinYang: YinYang;
}

interface BranchFact {
  value: EarthlyBranch;
  hanja: string;
  element: FiveElement;
  yinYang: YinYang;
}

interface PillarFact {
  stem: StemFact;
  branch: BranchFact;
}

interface FourPillarsFact {
  year: FactState<PillarFact>;
  month: FactState<PillarFact>;
  day: FactState<PillarFact>;
  hour: FactState<PillarFact>;
}
```

이 모델에서는 시간 미상이라도 날짜가 절입/입춘 경계에서 충분히 멀다면 연주·월주·일주는 `resolved`이고 시주만 `unavailable`일 수 있다.

반대로 경계일이면 해당 pillar가 `ambiguous`가 될 수 있다.

---

## 10. Unknown Birth Time Resolution Strategy

외부 엔진의 임의 시각 하나만 호출해 결과를 fact로 저장하지 않는다.

시간 미상에서는 정책상 필요한 candidate time window를 탐색해 **하루 동안 결과가 변하는지** 검사한다.

개념적 절차:

```text
birth date + no time
  -> relevant boundary instants 조회
  -> policy 기준 가능한 시간 구간 분할
  -> 각 구간 대표 instant 계산
  -> pillar별 unique result 집합 생성
  -> 1개면 resolved
  -> 2개 이상이면 ambiguous(candidates)
  -> 시간 자체가 필요한 시주는 unavailable 또는 candidate-set 정책에 따라 별도 처리
```

### v1 권장

시주는 시간 미상일 때 12개 후보를 canonical `hour`에 모두 넣지 않는다.

기본값:

```text
hour.status = unavailable
reason = birth-time-unknown
```

다만 연/월/일주는 하루 내 가능한 값 집합을 계산해 resolved/ambiguous 여부를 정확히 표시한다.

향후 “출생시간 추정/12시진 비교” 기능은 별도 domain feature로 분리한다.

---

## 11. Derived Deterministic Facts

Derived Fact도 의존하는 pillar가 ambiguous/unavailable이면 상태를 전파해야 한다.

```ts
interface DerivedFacts {
  dayMaster: FactState<StemFact>;
  tenGods: FactState<TenGodChart>;
  voidBranches: FactState<EarthlyBranch[]>;
  fiveElementCounts?: FactState<Record<FiveElement, number>>;
}
```

예:

- day pillar ambiguous → dayMaster ambiguous
- dayMaster ambiguous → 십신도 단일 chart로 확정 불가
- hour pillar unavailable → hour target을 포함한 full ten-god chart는 unavailable 또는 partial representation 필요

### Partial Derived Facts

v1 구현 전에 다음 두 선택지 중 하나를 결정한다.

A. derived fact 전체를 `FactState`로 묶고 일부 누락이면 unavailable 처리

B. pillar별/target별 `FactState`를 허용해 partial result 제공

사용자 가치상 B가 더 유용할 수 있지만 schema 복잡도가 증가한다.

---

## 12. v1에서 제외할 해석 항목

다음은 canonical calculation fact가 아니다.

- 신강/신약
- 용신/희신/기신
- 격국
- 신살의 의미
- 합/충/형/파/해의 해석 의미
- 직업/재물/성격 점수
- 운세 점수
- 길흉 판단

필요하면 별도 deterministic relation engine으로 검증된 관계 fact와 **그 관계의 의미 해석**을 다시 분리한다.

---

## 13. Solar Term Context

경계 시각 주변 계산과 unknown-time ambiguity를 설명하기 위해 절기 맥락을 저장한다.

```ts
interface SolarTermContext {
  previous?: SolarTermFact;
  next?: SolarTermFact;
  lichun?: SolarTermFact;
  boundariesOnBirthDate?: SolarTermFact[];
}

interface SolarTermFact {
  name: string;
  index: number;
  instantUtc: string;
  localDateTime: string;
}
```

이 정보는 입춘/월주 절입 golden fixture 분석과 unknown-time candidate 계산에 사용한다.

---

## 14. Luck Cycle

대운은 성별 입력과 특정 계산 알고리즘을 요구한다.

```ts
interface LuckCycleFact {
  direction: 'forward' | 'backward';
  start: {
    age: number;
    years?: number;
    months?: number;
    days?: number;
  };
  pillars: LuckPillarFact[];
}

interface LuckPillarFact {
  age: number;
  pillar: PillarFact;
}
```

Top-level에서는 다음과 같이 감싼다.

```ts
luckCycle: FactState<LuckCycleFact>
```

대운 시작 나이 계산은 유파 차이가 발생할 수 있으므로 단일 숫자를 보편적 truth처럼 취급하지 않는다.

해당 알고리즘의 policy와 provenance를 반드시 함께 기록한다.

---

## 15. Completeness

```ts
interface Completeness {
  birthTimeKnown: boolean;
  fullyResolved: boolean;
  resolvedPaths: string[];
  ambiguousPaths: string[];
  unavailablePaths: string[];
}
```

Interpretation Rule은 `requiredFacts`를 선언한다.

규칙 실행 조건:

```text
모든 required fact가 resolved -> 실행 가능
ambiguous 포함 -> 기본적으로 실행하지 않음 또는 candidate-aware rule만 허용
unavailable 포함 -> 실행하지 않음
```

LLM은 unavailable/ambiguous fact를 추측으로 메우지 않는다.

---

## 16. Provenance

```ts
interface CalculationProvenance {
  engine: {
    name: string;
    version: string;
    sourceRepository?: string;
  };
  adapter: {
    name: string;
    version: string;
  };
  policy: {
    id: string;
    version: string;
  };
  schema: {
    id: string;
    version: string;
  };
  datasets?: DatasetReference[];
}

interface DatasetReference {
  name: string;
  version?: string;
  source?: string;
  notes?: string;
}
```

---

## 17. Example — Known Time

shape 예시일 뿐 correctness fixture가 아니다.

```json
{
  "snapshotId": "saju_01...",
  "schemaVersion": "saju-canonical-v1",
  "input": {
    "calendarType": "solar",
    "date": { "year": 1992, "month": 10, "day": 24 },
    "time": { "known": true, "hour": 5, "minute": 30 }
  },
  "pillars": {
    "year": { "status": "resolved", "value": {} },
    "month": { "status": "resolved", "value": {} },
    "day": { "status": "resolved", "value": {} },
    "hour": { "status": "resolved", "value": {} }
  },
  "completeness": {
    "birthTimeKnown": true,
    "fullyResolved": true,
    "resolvedPaths": ["pillars.year", "pillars.month", "pillars.day", "pillars.hour"],
    "ambiguousPaths": [],
    "unavailablePaths": []
  }
}
```

---

## 18. Example — Unknown Time on a Non-boundary Date

```json
{
  "input": {
    "calendarType": "solar",
    "date": { "year": 1992, "month": 10, "day": 24 },
    "time": { "known": false }
  },
  "pillars": {
    "year": { "status": "resolved", "value": {} },
    "month": { "status": "resolved", "value": {} },
    "day": { "status": "resolved", "value": {} },
    "hour": {
      "status": "unavailable",
      "reason": "birth-time-unknown"
    }
  }
}
```

---

## 19. Example — Unknown Time on a Boundary Date

```json
{
  "pillars": {
    "year": {
      "status": "ambiguous",
      "candidates": [{}, {}],
      "reason": "birth-time-unknown-lichun-boundary"
    },
    "month": {
      "status": "ambiguous",
      "candidates": [{}, {}],
      "reason": "birth-time-unknown-solar-term-boundary"
    },
    "day": { "status": "resolved", "value": {} },
    "hour": {
      "status": "unavailable",
      "reason": "birth-time-unknown"
    }
  }
}
```

---

## 20. Open Questions

1. 지장간을 canonical fact v1에 포함할지
2. 오행 count를 단순 개수 fact로 제공할지
3. 대운 시작점 계산을 외부 엔진 값 그대로 사용할지 별도 구현할지
4. 출생지 좌표를 필수로 할지
5. 해외 출생자의 역사적 timezone 처리를 어느 수준까지 지원할지
6. unknown birth time에서 derived fact의 partial schema를 얼마나 허용할지
7. 합/충/형/파/해를 deterministic relation fact로 분리할지
8. ambiguity candidate 생성 시 하루를 brute-force minute scan할지 경계 기반 partition을 사용할지
9. true solar time + 해외 timezone 조합에서 unknown-time ambiguity 탐색 범위

이 항목들은 구현 전에 별도 검증한다.
