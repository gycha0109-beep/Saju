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
5. **Unknown은 unknown으로 보존**
   - 출생시간을 모르면 임의의 12:00 등으로 대체하지 않는다.
6. **Calculation policy를 결과와 함께 기록**
   - day boundary, 진태양시, DST 등 결과를 바꿀 수 있는 정책을 snapshot에 연결한다.
7. **Provenance 보존**
   - engine/version/dataset/policy/schema를 추적 가능하게 한다.

---

## 2. Top-level 구조

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

## 3. 식별자 및 버전

```ts
interface CanonicalSajuSnapshot {
  snapshotId: string;
  schemaVersion: string;
  calculationHash: string;
  createdAt: string;
  // ...
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

다음과 같은 계산 결정 요소를 canonical serialization한 뒤 생성하는 hash.

```text
normalized input
+ calculation policy
+ calculation engine identity/version
+ canonical schema version
```

동일 계산의 deduplication 및 재현성 검사에 사용한다.

---

## 4. Birth Input

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

### 주의

`sexForTraditionalCalculation`은 사용자 정체성을 일반화하기 위한 필드가 아니다.

전통 대운 순행/역행 계산 등 특정 규칙이 남/녀 값을 요구할 때 사용하는 **계산 입력값**으로 한정한다. 제품 UX에서 어떻게 받을지는 별도 결정한다.

---

## 5. Calculation Policy Snapshot

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
  unknownBirthTimePolicy: 'preserve-unknown';
}
```

정책의 상세 의미는 `03-calculation-policy.md`에서 정의한다.

---

## 6. Normalized Calculation Input

```ts
interface NormalizedBirthInput {
  solarDate?: {
    year: number;
    month: number;
    day: number;
  };
  lunarDate?: {
    year: number;
    month: number;
    day: number;
    isLeapMonth: boolean;
  };
  clockTime?: {
    hour: number;
    minute: number;
  };
  correctedSolarTime?: {
    localDate: string;
    localTime: string;
    offsetMinutesFromInput: number;
  };
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

## 7. Pillar Model

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
  year: PillarFact;
  month: PillarFact;
  day: PillarFact;
  hour: PillarFact | null;
}
```

`hour = null`은 출생시간 미상 등으로 계산 불가능함을 뜻한다.

단순히 값이 없다는 것만으로는 원인을 알 수 없으므로 `completeness`에서 원인을 별도 기록한다.

---

## 8. Derived Deterministic Facts

초기 canonical v1에서는 계산 authority가 충분히 검증된 deterministic 값만 포함한다.

```ts
interface DerivedFacts {
  dayMaster: StemFact;
  tenGods?: TenGodChart;
  voidBranches?: EarthlyBranch[];
  fiveElementCounts?: Record<FiveElement, number>;
}
```

### Ten Gods

십신은 label만 저장하지 않고 어떤 target을 대상으로 계산했는지 구조적으로 보존한다.

```ts
type TenGod =
  | '비견' | '겁재'
  | '식신' | '상관'
  | '편재' | '정재'
  | '편관' | '정관'
  | '편인' | '정인'
  | '일간';

interface TenGodTarget {
  stem?: TenGod;
  branch?: TenGod;
}

interface TenGodChart {
  year: TenGodTarget;
  month: TenGodTarget;
  day: TenGodTarget;
  hour?: TenGodTarget;
}
```

### v1에서 제외할 후보

다음 항목은 계산법/유파 검증이 끝나기 전 canonical fact에 포함하지 않는다.

- 신강/신약
- 용신/희신/기신
- 격국
- 신살 의미
- 합/충/형/파/해의 해석 의미
- 직업/재물/성격 점수
- 운세 점수

필요하면 별도 deterministic sub-engine으로 검증된 뒤 schema 확장 여부를 결정한다.

---

## 9. Solar Term Context

경계 시각 주변의 계산을 검증하기 위해 절기 맥락을 저장할 수 있다.

```ts
interface SolarTermContext {
  previous?: SolarTermFact;
  next?: SolarTermFact;
  lichun?: SolarTermFact;
  boundaryDistanceMinutes?: number;
}

interface SolarTermFact {
  name: string;
  index: number;
  instantUtc: string;
  localDateTime: string;
}
```

이 필드는 특히 입춘, 월주 절입 경계 golden fixture 분석에 유용하다.

---

## 10. Luck Cycle

대운은 성별 입력과 특정 계산 규칙을 요구한다.

```ts
interface LuckCycleFact {
  available: boolean;
  unavailableReason?:
    | 'sex-input-missing'
    | 'birth-time-missing'
    | 'engine-unsupported'
    | 'policy-restriction';
  direction?: 'forward' | 'backward';
  start?: {
    age: number;
    years?: number;
    months?: number;
    days?: number;
  };
  pillars?: LuckPillarFact[];
}

interface LuckPillarFact {
  age: number;
  pillar: PillarFact;
}
```

대운 시작 나이 계산은 유파 차이가 발생할 수 있으므로 단일 숫자를 절대적인 truth처럼 취급하지 않는다.

해당 알고리즘의 policy와 provenance를 반드시 함께 기록한다.

---

## 11. Completeness

```ts
interface Completeness {
  birthTimeKnown: boolean;
  fourPillarsComplete: boolean;
  missingFacts: MissingFact[];
}

interface MissingFact {
  path: string;
  reason:
    | 'birth-time-unknown'
    | 'required-input-missing'
    | 'outside-supported-range'
    | 'engine-unsupported'
    | 'policy-disabled';
}
```

출생시간 미상 사용자는 임의 시간으로 계산하지 않는다.

Interpretation Rule은 `requiredFacts`를 선언하고, 필요한 Fact가 없으면 해당 rule을 실행하지 않는다.

---

## 12. Provenance

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

## 13. Snapshot 예시

아래는 shape 예시일 뿐 실제 값의 correctness fixture가 아니다.

```json
{
  "snapshotId": "saju_01...",
  "schemaVersion": "saju-canonical-v1",
  "calculationHash": "sha256:...",
  "createdAt": "2026-08-19T00:00:00Z",
  "input": {
    "calendarType": "solar",
    "date": { "year": 1992, "month": 10, "day": 24 },
    "time": { "known": true, "hour": 5, "minute": 30 },
    "sexForTraditionalCalculation": "male",
    "birthplace": {
      "label": "Seoul",
      "countryCode": "KR",
      "longitude": 126.978,
      "timeZone": "Asia/Seoul"
    }
  },
  "policy": {
    "policyId": "myeonghwa-default",
    "policyVersion": "v1",
    "dayBoundary": "midnight",
    "trueSolarTime": {
      "enabled": false,
      "longitudeSource": "not-applicable",
      "applyEquationOfTime": false,
      "applyHistoricalDst": true
    },
    "timeZonePolicy": {
      "source": "birthplace",
      "timeZone": "Asia/Seoul"
    },
    "unknownBirthTimePolicy": "preserve-unknown"
  },
  "pillars": {
    "year": {},
    "month": {},
    "day": {},
    "hour": {}
  },
  "completeness": {
    "birthTimeKnown": true,
    "fourPillarsComplete": true,
    "missingFacts": []
  },
  "provenance": {
    "engine": {
      "name": "manseryeok",
      "version": "2.0.0",
      "sourceRepository": "https://github.com/yhj1024/manseryeok"
    },
    "adapter": {
      "name": "myeonghwa-manseryeok-adapter",
      "version": "0.1.0"
    },
    "policy": {
      "id": "myeonghwa-default",
      "version": "v1"
    },
    "schema": {
      "id": "saju-canonical",
      "version": "v1"
    }
  }
}
```

---

## 14. Open Questions

아래는 아직 확정하지 않는다.

1. 지장간을 canonical fact v1에 포함할지
2. 오행 count를 단순 개수로 제공할지, 별도 weighting 없이 fact로 인정할지
3. 대운 시작점 계산을 외부 엔진 값 그대로 사용할지 별도 구현할지
4. 출생지 좌표를 필수로 할지
5. 해외 출생자의 역사적 timezone 처리를 어느 수준까지 지원할지
6. unknown birth time에서 가능한 partial fact 범위
7. 합/충/형/파/해를 deterministic relation fact로 분리할지

이 항목들은 구현 전에 별도 검증한다.
