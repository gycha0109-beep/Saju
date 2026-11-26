# 04. Calculation Adapter Contract

## 목적

외부 계산 라이브러리와 명화 Core 사이의 경계를 정의한다.

초기 우선 후보는 `manseryeok` v2.0.0이지만, 명화의 domain model이 해당 패키지 API에 직접 종속되지 않게 한다.

---

## 1. Source Audit 요약

현재 `manseryeok` v2.0.0의 공개 `BirthInfo`는 다음 특징을 가진다.

- `year/month/day/hour/minute` 필수
- 음력 여부 및 윤달 옵션
- `trueSolarTime` 옵션
- `dayBoundary` 옵션
- `gender` 옵션

`calculateFourPillars()`는 입력 검증 후:

```text
음력 입력이면 양력 변환
-> resolveInstant(...)
-> computeFourPillars(...)
-> 십신
-> 공망
-> gender가 있으면 대운
```

순으로 처리한다.

즉 라이브러리의 주 entry point는 **구체적인 출생 시각이 있는 계산**을 전제로 한다.

명화는 이 제약을 외부로 노출하지 않는다.

---

## 2. Adapter의 책임

Adapter는 다음만 담당한다.

1. 명화의 concrete calculation request를 외부 engine input으로 변환
2. engine 호출
3. raw engine output을 engine-neutral raw result로 변환
4. engine error를 명화 error taxonomy로 변환
5. engine/version provenance 부착

Adapter가 담당하지 않는 것:

- 사용자 입력 UX
- 출생시간 미상 정책 결정
- Interpretation Rule 실행
- 자연어 설명
- DB 저장
- 제품 default 선택
- LLM 호출

---

## 3. 계층

```text
BirthInput
  -> Input Normalizer
  -> Calculation Planner
       ├─ known time: 1 concrete request
       └─ unknown time: boundary-aware candidate requests
  -> Calculation Adapter
  -> Raw Calculation Result(s)
  -> Canonical Assembler
  -> Canonical Saju Snapshot
```

### 중요한 결정

**Unknown birth time을 Adapter 내부에서 12:00로 보정하지 않는다.**

Adapter는 concrete time만 계산한다.

출생시간 미상 처리는 상위 `Calculation Planner`가 담당한다.

---

## 4. Adapter Interface

개념적 TypeScript contract:

```ts
interface CalculationAdapter {
  readonly identity: EngineIdentity;

  calculate(request: ConcreteCalculationRequest): Promise<EngineCalculationResult>;

  getSolarTerm(request: SolarTermRequest): Promise<EngineSolarTermResult>;

  convertCalendar(request: CalendarConversionRequest): Promise<CalendarConversionResult>;
}

interface EngineIdentity {
  engine: 'manseryeok';
  engineVersion: string;
  adapter: 'myeonghwa-manseryeok-adapter';
  adapterVersion: string;
}
```

동기 라이브러리를 사용하더라도 Core contract는 동기/비동기 구현 세부에 과도하게 종속되지 않게 할 수 있다. 실제 구현 시 동기 interface가 더 적절하면 그때 결정한다.

---

## 5. Concrete Calculation Request

```ts
interface ConcreteCalculationRequest {
  solarDateTime: {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
  };

  originalCalendarContext?: {
    calendarType: 'solar' | 'lunar';
    lunarDate?: {
      year: number;
      month: number;
      day: number;
      isLeapMonth: boolean;
    };
  };

  calculationOptions: {
    dayBoundary: 'midnight' | 'jasi' | 'splitJasi';
    trueSolarTime?: {
      longitude: number;
      applyEquationOfTime: boolean;
      applyHistoricalDst: boolean;
    };
    sexForTraditionalCalculation?: 'male' | 'female';
  };
}
```

### Calendar conversion 위치

명화에서는 `BirthInput` 정규화 과정과 engine 내부 음력 변환이 중복되지 않게 한다.

권장 방향:

```text
raw lunar input
-> adapter calendar conversion
-> normalized solar date
-> concrete calculation uses solar input
```

이렇게 하면 Canonical Snapshot에 실제 변환값을 명시적으로 기록할 수 있다.

단, 초기 구현에서는 `manseryeok.calculateFourPillars({isLunar:true})`와 별도 `lunarToSolar()` 경로가 완전히 동치인지 golden test로 확인한 뒤 최종 선택한다.

---

## 6. Engine-neutral Result

외부 라이브러리의 `FourPillarsDetail`을 그대로 반환하지 않는다.

```ts
interface EngineCalculationResult {
  pillars: {
    year: EnginePillar;
    month: EnginePillar;
    day: EnginePillar;
    hour: EnginePillar;
  };

  elements: {
    year: EngineElementPair;
    month: EngineElementPair;
    day: EngineElementPair;
    hour: EngineElementPair;
  };

  yinYang: {
    year: EngineYinYangPair;
    month: EngineYinYangPair;
    day: EngineYinYangPair;
    hour: EngineYinYangPair;
  };

  tenGods: EngineTenGodChart;
  voidBranches: string[];
  luckPillars?: EngineLuckCycle;

  provenance: EngineIdentity;
}
```

문자열 convenience fields(`yearString`, `toString()` 등)는 canonical authority로 사용하지 않는다.

필요하면 테스트에서 구조적 값과 문자열 값의 내부 일치 여부만 검증한다.

---

## 7. Mapping Rule

Adapter mapping은 explicit mapping으로 한다.

예:

```text
engine.year.heavenlyStem
  -> canonical PillarFact.stem.value

engine.yearElement.stem
  -> canonical PillarFact.stem.element
```

단순 object spread를 금지한다.

이유:

- 외부 필드 추가가 내부 schema에 자동 침투하는 것을 방지
- breaking change를 compile/test 단계에서 발견
- naming 차이를 명시적으로 관리

---

## 8. Defensive Consistency Checks

Adapter는 외부 engine 결과를 무조건 신뢰하고 통과시키지 않는다.

최소한 cheap invariant를 검증한다.

### Pillar domain

- 천간은 10간 중 하나
- 지지는 12지 중 하나

### Element consistency

예:

```text
갑 -> 목
을 -> 목
...
```

engine이 반환한 `yearElement.stem`이 stem mapping과 일치하는지 확인할 수 있다.

### Yin/Yang consistency

천간/지지의 정적 음양 mapping과 반환값 일치 확인.

### String consistency

편의 문자열을 사용한다면 구조적 pillar와 동일한지 확인.

### Ten God consistency

십신은 일간 기준이라는 invariant를 별도 deterministic table로 검산할 수 있다.

이 invariant들은 외부 엔진 전체 알고리즘을 재구현하는 것이 아니라 **adapter boundary corruption을 조기에 탐지**하기 위한 것이다.

---

## 9. Error Taxonomy

외부 엔진의 `RangeError`, `TypeError` message를 application layer까지 그대로 노출하지 않는다.

```ts
type CalculationError =
  | InvalidBirthDateError
  | InvalidLunarDateError
  | UnsupportedDateRangeError
  | InvalidLongitudeError
  | InvalidCalculationPolicyError
  | MissingRequiredInputError
  | EngineContractViolationError
  | EngineExecutionError;
```

### Error에는 최소 포함

```text
code
safeMessage
field/path
engine identity
original error class (internal only)
```

사용자에게 stack trace나 package 내부 오류 문구를 그대로 보여주지 않는다.

---

## 10. Unknown Birth Time Planner

`manseryeok`의 `BirthInfo`는 hour/minute 필수이므로 시간 미상 처리는 별도 planner가 필요하다.

### 잘못된 방식

```text
시간 모름
-> 12:00 입력
-> 결과를 확정값으로 저장
```

### 명화 방식

```text
시간 모름
-> 해당 날짜의 relevant boundary 확인
-> candidate time partition 생성
-> concrete request들을 adapter로 계산
-> pillar별 unique result 집합 비교
-> resolved / ambiguous / unavailable 결정
```

### Relevant boundaries

최소:

- 입춘
- 월주를 바꾸는 절입
- dayBoundary 23:00/00:00
- true solar time 적용 시 correction에 의해 생기는 local boundary

### brute-force fallback

경계 partition 로직의 correctness가 아직 충분히 검증되지 않은 초기 버전에서는 하루 1,440분을 전수 계산하는 reference implementation을 테스트 전용으로 둘 수 있다.

production 최적화 구현은 boundary partition 방식으로 가더라도 두 결과가 일치하는지 property test로 검증한다.

---

## 11. Engine Version Pinning

실서비스 dependency는 floating range로 두지 않는다.

권장:

```json
{
  "dependencies": {
    "manseryeok": "2.0.0"
  }
}
```

또는 package manager lockfile로 exact resolution을 강제한다.

업그레이드 절차:

```text
new engine version 발견
-> changelog/source review
-> isolated upgrade branch
-> full golden regression
-> diff report
-> intentional approval
-> adapter/provenance version 갱신 필요 여부 판단
```

동일 snapshot을 조용히 새 버전 엔진으로 덮어쓰지 않는다.

---

## 12. Dependency Escape Hatch

Adapter contract를 유지하면 향후 다음이 가능하다.

- manseryeok fork 사용
- 자체 deterministic core로 교체
- 두 엔진 병렬 계산
- 검증용 secondary engine 추가

그러나 **다수결로 정답을 결정하지 않는다.**

엔진 간 불일치는 investigation signal이다.

---

## 13. Acceptance Criteria

Adapter 구현을 시작할 수 있는 조건:

- [ ] Calculation Policy의 MVP default가 결정됨
- [ ] Canonical v1의 최소 field가 확정됨
- [ ] engine version exact pinning 정책 확정
- [ ] known-time golden fixture set 준비
- [ ] calendar conversion fixture 준비
- [ ] day-boundary fixture 준비
- [ ] true-solar-time fixture 준비
- [ ] error mapping table 정의
- [ ] unknown-time planner test strategy 확정

이 조건 전에는 production adapter 구현을 완료 상태로 간주하지 않는다.
