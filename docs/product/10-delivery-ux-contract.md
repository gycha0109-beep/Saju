# 10. Product Delivery / UX Contract

## 1. 목적

명화의 최종 제공 형태가 아직 **웹사이트 / 설치형 프로그램 / 운영자용 프로그램 / PDF·리포트 템플릿 기반 상품** 중 어느 쪽인지 확정되지 않은 상태에서, 엔진과 사용자 경험의 공통 계약을 먼저 정의한다.

이 문서는 특정 프론트엔드 프레임워크나 화면 디자인을 선택하지 않는다.

핵심 목표:

1. 명화 Core가 전달 채널에 종속되지 않도록 한다.
2. 어떤 채널에서도 동일 Calculation / Interpretation 결과를 사용한다.
3. 출생시간 미상, 계산 ambiguity, 방법론 차이를 UI가 숨기지 않도록 한다.
4. 사용자용 Reading과 내부 audit 데이터를 분리한다.
5. 웹/프로그램/PDF로 바뀌어도 엔진을 다시 만들지 않도록 한다.

---

## 2. 제품 경계

```text
Myeonghwa Core
  ├─ Calculation
  ├─ Canonical Snapshot
  ├─ Interpretation
  ├─ Claim Graph
  └─ Narrative
        │
        ▼
ReadingArtifact
        │
        ├─ Web Adapter
        ├─ App Adapter
        ├─ Operator Adapter
        ├─ PDF/Print Adapter
        └─ Template Export Adapter
```

Delivery Layer는 Core 결과를 표현할 뿐 계산/해석을 다시 수행하지 않는다.

---

## 3. ReadingArtifact

채널 공통 출력 계약이다.

```ts
interface ReadingArtifact {
  readingId: string;
  schemaVersion: string;

  brand: {
    brandId: 'myeonghwa';
    displayName: '명화';
  };

  subject: ReadingSubjectSummary;

  calculationSummary: CalculationSummaryView;
  sections: ReadingSectionView[];

  disclosures: ReadingDisclosureView[];
  explainability: ExplainabilityIndex;

  provenance: {
    snapshotId: string;
    interpretationRunId: string;
    narrativeRunId?: string;
    readingVersion: string;
  };

  generatedAt: string;
}
```

### 중요

`ReadingArtifact`는 DB entity 그대로가 아니다.

- 사용자에게 필요한 결과만 포함
- 내부 RuleExpression 전체 노출 불필요
- 개인 식별정보 최소화
- 채널에 독립적인 semantic view model

---

## 4. ReadingSubjectSummary

```ts
interface ReadingSubjectSummary {
  displayLabel?: string;

  birthInputDisplay: {
    calendarType: 'solar' | 'lunar';
    date: string;
    time?: string;
    timeKnown: boolean;
    leapMonth?: boolean;
    birthplaceLabel?: string;
  };

  calculationState:
    | 'resolved'
    | 'partially_ambiguous'
    | 'insufficient_input';
}
```

실명은 Reading 생성에 필수 필드가 아니다.

---

## 5. Calculation Summary View

사용자에게 계산 결과와 해석 결과를 섞어 보여주지 않는다.

```ts
interface CalculationSummaryView {
  pillars: {
    year: DisplayFact;
    month: DisplayFact;
    day: DisplayFact;
    hour: DisplayFact;
  };

  calendar?: DisplayFact[];
  fiveElements?: DisplayFact[];
  tenGods?: DisplayFact[];
  luckPillars?: DisplayFact[];

  ambiguity?: CalculationAmbiguityView[];
}
```

### UI 의미

사용자는 최소한:

```text
내 사주 원국 / 만세력 값
```

과

```text
그 값을 바탕으로 한 해석
```

을 구분할 수 있어야 한다.

---

## 6. Reading Section

```ts
interface ReadingSectionView {
  sectionId: string;

  sectionType:
    | 'overview'
    | 'structure'
    | 'personality'
    | 'career'
    | 'wealth'
    | 'relationship'
    | 'health_tendency'
    | 'timing'
    | 'compatibility'
    | 'custom';

  title: string;
  blocks: ReadingBlockView[];

  state:
    | 'complete'
    | 'partial'
    | 'unavailable';

  disclosureRefs?: string[];
  explainabilityRefs?: string[];
}
```

초기 MVP에서 모든 section을 활성화한다는 의미는 아니다.

---

## 7. Reading Block 유형

채널에 관계없이 의미 구조를 보존한다.

```ts
type ReadingBlockView =
  | ParagraphBlock
  | KeyPointBlock
  | ComparisonBlock
  | AmbiguityBlock
  | TimelineBlock
  | FactTableBlock
  | SourceHintBlock;
```

### 예

웹에서는 카드로,
PDF에서는 박스로,
프로그램에서는 panel로,
텍스트 템플릿에서는 heading + paragraph로 렌더링할 수 있다.

---

## 8. 출생 입력 UX

Delivery Channel이 달라도 입력 의미는 동일해야 한다.

최소 입력 후보:

```text
생년월일
양력 / 음력
윤달 여부 (음력 시)
출생시간
출생시간 모름
성별 (대운 등 정책상 필요한 경우)
출생지 (계산 정책상 필요한 경우)
```

### 절대 금지

출생시간을 모르는 사용자를 막기 위해:

```text
12:00을 넣어주세요
```

같은 UX를 기본 정책으로 사용하지 않는다.

---

## 9. Unknown Time UX

출생시간 미상은 에러가 아니라 정상 입력 상태다.

### 사용자 입력

```text
[ ] 출생시간을 알고 있습니다
[x] 출생시간을 모릅니다
```

### 이후 결과

#### Case A — 시간과 무관한 결과

정상 표시.

#### Case B — 일부 결과만 달라짐

```text
출생시간이 없어 이 항목은 두 가지 가능성이 있습니다.
```

#### Case C — 해당 해석 불가능

```text
이 항목은 출생시간이 필요한 해석이라 현재 결과에서는 제외되었습니다.
```

가짜 값을 채우는 것보다 결과가 일부 비어 있는 것이 낫다.

---

## 10. Ambiguity UX

내부 `ambiguous`를 사용자에게 그대로 JSON 용어로 노출할 필요는 없다.

사용자 표현 후보:

```text
계산 경계에 걸려 두 가지 명식 가능성이 있습니다.

공통으로 유지되는 해석
- ...

시나리오에 따라 달라지는 부분
- 경우 A: ...
- 경우 B: ...
```

### 원칙

공통 부분을 우선 보여주되, 중요한 차이를 숨기지 않는다.

---

## 11. Calculation Policy Disclosure

일반 사용자가 모든 천문/명리 설정을 직접 선택하게 만들 필요는 없다.

그러나 결과를 바꿀 수 있는 정책은 내부에 반드시 기록한다.

사용자-facing에서는 필요 시:

```text
계산 기준 보기
```

으로 확인 가능하도록 한다.

예:

- 양/음력 변환 기준
- 출생지 시간 보정 여부
- 진태양시 여부
- 자시 일 경계 방식
- 대운 시작 계산 방식

기본 화면을 설정 메뉴로 과도하게 복잡하게 만들지는 않는다.

---

## 12. Explainability UX — "왜 이렇게 나왔나요?"

명화의 차별화 후보 중 하나다.

각 중요 해석은 다음 drill-down을 지원할 수 있어야 한다.

```text
해석
  ↓
왜 이렇게 나왔나요?
  ↓
적용된 명식 요소
  ↓
해석 방법론
  ↓
규칙 요약
  ↓
참고 근거
```

### 사용자용 표현

Rule ID, evaluation hash 같은 내부 기술 값은 기본 화면에 노출하지 않는다.

필요 시 advanced/debug mode에서만 제공한다.

---

## 13. Method Comparison UX

유파/방법론 차이를 제품 가치로 사용할 수 있다.

예:

```text
용신 해석

억부 관점
→ 水

조후 관점
→ 木

왜 다른가?
→ 두 관점이 중요하게 보는 기준이 다릅니다.
```

### 기본 원칙

모든 사용자에게 처음부터 복잡한 유파 비교를 강요하지 않는다.

Possible UX:

```text
기본 풀이
[다른 해석 관점 보기]
```

---

## 14. Confidence Meter 금지

다음 UI는 기본 설계에서 제외한다.

```text
사주 정확도 94%
재물운 87점
궁합 성공률 92%
```

실제 예측 정확성을 의미하지 않는 숫자를 authority처럼 보이게 만들기 때문이다.

대신 필요하면 다음을 표현한다.

```text
계산 상태: 확정 / 일부 불확실
해석 근거: 검토된 방법론 / 실험적 방법론
출생정보 완전성: 시간 포함 / 시간 미상
```

이 역시 소비자용 표현은 향후 UX 테스트 후 결정한다.

---

## 15. Reading 상태

사용자 결과 화면은 단순 `success/error`보다 세분화한다.

```ts
type ReadingStatus =
  | 'ready'
  | 'ready_with_ambiguity'
  | 'partial'
  | 'cannot_calculate'
  | 'cannot_interpret'
  | 'narrative_fallback';
```

### 예

Calculation은 성공했지만 LLM이 실패하면:

```text
narrative_fallback
```

으로 deterministic template Reading을 제공할 수 있다.

---

## 16. Delivery Capability Profile

모든 채널이 동일 기능을 제공할 필요는 없다.

```ts
interface DeliveryCapabilityProfile {
  profileId: string;

  capabilities: {
    interactiveInput: boolean;
    interactiveQuestions: boolean;
    explainabilityDrilldown: boolean;
    methodologyComparison: boolean;
    persistentHistory: boolean;
    exportPdf: boolean;
    printOptimized: boolean;
    operatorWorkflow: boolean;
  };
}
```

이 구조로 제품 형태를 나중에 결정할 수 있다.

---

## 17. Channel 후보 비교

현재 결정이 아니라 설계용 비교다.

### A. Consumer Web

장점:

- 접근성 높음
- 결제/회원/재방문 연결 쉬움
- 상담형 Q&A 확장 쉬움
- 업데이트 즉시 반영

필요 capability:

```text
interactiveInput = true
interactiveQuestions = optional/true
persistentHistory = optional
```

### B. Standalone Program

장점:

- 운영자/상담자용 도구에 적합
- 로컬 workflow 가능
- 특정 고객 PC 환경 중심 운영 가능

주의:

- 배포/업데이트 관리 필요
- consumer acquisition에는 웹보다 불리할 수 있음

### C. Operator Tool + Report

운영자가 입력하고 결과 PDF/인쇄물을 고객에게 전달하는 모델.

```text
operatorWorkflow = true
exportPdf = true
```

### D. Template / Report Generator

정적 상품 또는 제작 대행 형태.

```text
interactiveInput = false or limited
printOptimized = true
```

Core는 모두 동일하게 사용할 수 있어야 한다.

---

## 18. Operator Workflow

아버지가 직접 운영하는 형태가 될 가능성을 고려하되 확정하지 않는다.

운영자 모드가 있다면 사용자-facing 결과와 분리한다.

운영자 기능 후보:

```text
새 Reading 생성
입력 검토
Calculation Policy 확인
ambiguity 확인
Rule/Claim debug
Narrative 재생성
PDF/출력
과거 Reading 검색
```

### 금지

운영자가 UI에서 Canonical Fact를 임의 수정하여 결과를 맞추는 기능을 기본 제공하지 않는다.

필요한 correction은 원 입력을 수정하고 재계산한다.

---

## 19. Reading Version UX

Rule/엔진 업데이트로 새 Reading이 달라질 수 있다.

과거 Reading을 조용히 덮어쓰지 않는다.

```text
Reading v1
생성: 2026-08-19

새 분석 기준으로 다시 보기
→ Reading v2 생성
```

과거 버전은 보존 정책에 따라 조회 가능해야 한다.

---

## 20. Narrative Fallback UX

LLM 장애가 생겨도 Calculation/Interpretation 결과가 있다면 사용자에게:

```text
분석 결과를 간단한 형식으로 표시합니다.
```

와 같은 fallback이 가능하다.

LLM 실패를 숨기기 위해 근거 없는 cached prose를 다른 사용자에게 재사용하지 않는다.

---

## 21. Sensitive Domain UX

건강·재물·관계 해석은 표현 강도를 제한한다.

예:

### 피할 표현

```text
큰 병에 걸립니다.
사업하면 망합니다.
이 사람과 결혼하면 이혼합니다.
```

### 시스템이 지향하는 형태

```text
이 방법론에서는 해당 시기에 건강 관리와 생활 리듬을 더 신경 쓰는 흐름으로 해석합니다.
```

사용자 불안을 자극하는 문구를 engagement 장치로 쓰지 않는다.

---

## 22. Source / Provenance UX

사용자에게 보여줄 수 있는 수준을 세 단계로 나눈다.

```text
Level 0 — 숨김
Level 1 — 방법론/근거 요약
Level 2 — 상세 출처 보기
```

내부 provenance는 Level 0이어도 항상 보존된다.

향후 `왜 이렇게 나왔나요?` 기능에서 Level 1/2를 사용할 수 있다.

---

## 23. ReadingArtifact 생성 Pipeline

```text
Validated NarrativeDraft
+ Calculation display facts
+ Interpretation metadata
+ disclosures
+ explainability index
        ↓
ReadingAssembler
        ↓
ReadingArtifact
        ↓
Channel Adapter
```

Channel Adapter가 claim을 새로 생성하면 안 된다.

---

## 24. Channel Adapter Contract

```ts
interface DeliveryAdapter<TOutput> {
  profile: DeliveryCapabilityProfile;

  render(artifact: ReadingArtifact): Promise<TOutput>;
}
```

예:

```text
WebReadingAdapter
PdfReadingAdapter
PrintReadingAdapter
OperatorReadingAdapter
```

---

## 25. 템플릿의 의미 분리

`템플릿`이라는 단어가 두 가지 의미로 사용될 수 있다.

### A. Narrative template

LLM fallback 또는 구조화 문장 template.

Core 내부 기능.

### B. Product/report template

결과물을 특정 디자인/형식으로 만들어 판매/전달.

Delivery Layer 기능.

두 개념을 섞지 않는다.

---

## 26. 초기 공통 User Journey

채널과 무관한 semantic journey:

```text
1. 출생정보 입력/등록
2. 입력 검증
3. 계산 기준 적용
4. 만세력 계산
5. ambiguity 확인
6. 해석 실행
7. Narrative 생성/검증
8. ReadingArtifact 생성
9. 사용자에게 전달
10. 필요 시 근거/다른 관점 확인
```

웹에서는 한 세션에 이어질 수 있고, 운영자 프로그램에서는 여러 작업 단계로 나뉠 수 있다.

---

## 27. MVP UX Minimum

최종 채널과 무관하게 MVP가 최소 제공해야 할 semantic capability:

```text
M1 출생정보 입력
M2 unknown-time 지원
M3 계산 결과 표시
M4 핵심 해석 section 표시
M5 ambiguity/제한 disclosure
M6 Reading version 식별
M7 deterministic fallback 가능
```

다음은 초기 MVP에 필수라고 아직 결정하지 않는다.

```text
회원가입
결제
채팅 상담
궁합
일일운세
소셜 공유
다국어
상세 유파 비교 UI
```

---

## 28. 최종 Delivery 형태 결정 시 평가 항목

향후 웹/프로그램/템플릿을 결정할 때 최소 다음을 비교한다.

```text
누가 직접 입력하는가?
아버지가 운영자인가, 소비자가 직접 쓰는가?
결제는 어떻게 발생하는가?
재방문이 중요한가?
실시간 Q&A가 필요한가?
PDF/인쇄물이 핵심 상품인가?
고객 데이터 저장이 필요한가?
업데이트 빈도는?
배포/운영 난이도는?
초기 유입 경로는?
```

기술 스택보다 이 질문이 먼저다.

---

## 29. S10 결정 요약

현재는 웹사이트, 프로그램, 템플릿 중 하나를 선택하지 않는다.

대신:

```text
Myeonghwa Core
    ↓
ReadingArtifact
    ↓
Delivery Adapter
```

구조를 고정한다.

이렇게 하면 제품 형태를 나중에 결정해도 Calculation / Interpretation / LLM correctness 구조를 다시 설계할 필요가 없다.
