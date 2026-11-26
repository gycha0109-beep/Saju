# 12. MVP Scope & Implementation Plan

## 1. 목적

명화의 설계 S1~S11을 실제 코드로 옮길 때 **어디까지를 첫 구현 단위로 만들고, 어떤 순서와 gate를 통과해야 다음 단계로 갈지** 정의한다.

현재 최종 제품 형태(웹/프로그램/템플릿)는 미정이므로 이 문서의 MVP는 **Product MVP가 아니라 Engine MVP**다.

---

## 2. Engine MVP 정의

명화 Engine MVP의 성공 조건:

```text
하나의 출생 입력
  -> 검증
  -> 만세력 계산
  -> Canonical Snapshot
  -> 최소 Derived Facts
  -> versioned Rule Pack 실행
  -> RuleEvaluation / Claim Graph
  -> NarrativeEvidenceBundle
  -> validated narrative 또는 deterministic fallback
```

을 **재현 가능하게** 수행할 수 있어야 한다.

제품 UI, 회원, 결제는 이 성공 조건에 포함하지 않는다.

---

## 3. MVP에서 반드시 구현할 것

### M0 — Repository / Tooling Foundation

- TypeScript project
- strict type checking
- test runner
- lint / format
- CI
- deterministic fixture execution

### M1 — Contracts

- BirthInput
- CalculationPolicy
- CanonicalSajuSnapshot
- ambiguity/scenario types
- Rule/Claim contracts
- Narrative contracts

### M2 — Calculation Adapter

- `manseryeok` pinned dependency
- input mapping
- output mapping
- error translation
- dependency metadata
- no upstream type leakage

### M3 — Calculation Verification

- upstream baseline fixtures
- 명화-owned regression fixtures
- boundary fixtures
- lunar/leap-month fixtures
- invalid-input fixtures

### M4 — Unknown Birth Time Planner

- no fake default time
- candidate scenario generation
- scenario deduplication
- ambiguity propagation

### M5 — Derived Fact Foundation

초기 최소:

- pillar element/yin-yang exposure
- ten-god structural mapping
- raw element distribution
- branch/stem structural relation representation where authority is sufficiently deterministic

복잡한 명리 해석은 여기 넣지 않는다.

### M6 — Rule Registry Runtime

- versioned RuleDefinition loader
- MethodologyDefinition loader
- InterpretationPack resolver
- declarative RuleExpression evaluator
- dependency graph / cycle detection
- RuleEvaluation audit

### M7 — Claim Runtime

- InterpretationClaim emission
- ClaimRelation
- compatible dedup/grouping
- completeness gate
- ambiguity invariant evaluation

### M8 — Minimal Research Pack

production 사주풀이 완성본이 아니라 엔진 검증용 작은 pack.

요구:

- 명확한 provenance
- 몇 개의 T1/T2 수준 Rule
- ambiguity fixture
- conflict fixture
- no unsupported life prediction

목적은 Runtime 검증이다.

### M9 — Narrative Contract Runtime

- NarrativeEvidenceBundle builder
- structured NarrativeDraft schema
- grounding validator
- deterministic fallback renderer

LLM provider 연동은 이 단계 후반 또는 별도 M9b로 분리할 수 있다.

### M10 — Developer Harness

제품 UI가 아니라 엔진 검증용 interface.

가능한 형태:

```text
CLI
fixture runner
minimal local debug page
```

최종 사용자 제품으로 취급하지 않는다.

---

## 4. MVP에서 제외할 것

초기 Engine MVP에서 강제로 만들지 않는다.

```text
회원가입
결제
구독
관리자 CRM
실사용자 웹사이트
모바일 앱
상담 채팅 UI
PDF 디자인 완성본
궁합 완성판
일일/월간 운세 완성판
수십~수백 개 신살
모든 유파
다국어
추천/바이럴 기능
```

이 기능들은 Core가 검증된 뒤 Product Track에서 결정한다.

---

## 5. 기술 방향

### 5.1 Language

초기 Core는 TypeScript를 우선한다.

이유:

- 우선 계산 후보 `manseryeok`이 TypeScript/JavaScript package
- adapter friction이 낮음
- schema/domain contract를 코드 타입으로 관리하기 쉬움
- 웹/서버/CLI/데스크톱 등 향후 전달 채널과 연결이 쉬움

### 5.2 Runtime baseline

2026-08-19 조사 기준 production runtime은 Node.js의 LTS line을 사용한다.

초기 bootstrap 후보:

```text
Node.js 24 LTS
```

Current line을 최신이라는 이유만으로 production baseline으로 선택하지 않는다.

### 5.3 TypeScript compiler

2026-08-19 기준 TypeScript 7.0이 stable release다.

초기 bootstrap에서는 TypeScript 7을 우선 검토하되, ESLint/test tooling 및 package compatibility smoke test를 통과한 뒤 pin한다.

`manseryeok` 자체의 빌드 compiler version과 명화의 compiler version을 같게 맞출 필요는 없다. 명화는 package의 public JS/type surface를 소비한다.

---

## 6. Repository 구조 후보

제품 형태가 미정이므로 app과 core를 분리할 수 있는 workspace 구조를 권장한다.

```text
Saju/
  packages/
    contracts/
    calculation/
    interpretation/
    narrative/
    reading/

  apps/
    dev-harness/

  fixtures/
    calculation/
    interpretation/
    narrative/

  rules/
    sources/
    methodologies/
    rule-definitions/
    packs/

  docs/
```

### 대안

초기 구현량이 너무 작으면 하나의 package 내부 module 구조로 시작할 수 있다.

그러나 외부 app이 붙기 전에 package boundary를 만들 수 있어야 한다.

---

## 7. Package 책임

### `contracts`

순수 schema/type.

다른 package의 runtime 구현에 의존하지 않는다.

### `calculation`

```text
input normalization
calculation policy
manseryeok adapter
scenario planning
canonical mapping
```

### `interpretation`

```text
derived facts
registry
plan builder
rule evaluator
claim graph
evidence selection
```

### `narrative`

```text
narrative policy
LLM adapter
structured draft
grounding validation
fallback
```

### `reading`

```text
ReadingArtifact assembler
channel-neutral view model
```

### `dev-harness`

엔진 실행/디버그/fixture 확인.

---

## 8. 구현 Phase

### I0 — Bootstrap

목표:

```text
repo builds
repo tests
repo lints
CI passes
```

아직 사주 기능 없음.

산출:

- package/workspace config
- tsconfig
- test config
- CI
- dependency pinning policy

### I1 — Domain Contracts

S2/S3/S7/S9 문서를 TypeScript contract로 옮긴다.

Gate:

```text
schema/type tests
no engine implementation
```

### I2 — Manseryeok Adapter

`calculateFourPillars`를 adapter 뒤에 연결한다.

Gate:

```text
known input -> expected canonical snapshot
error mapping
version metadata
```

### I3 — Calculation Verification

Golden/boundary regression suite 구축.

Gate:

```text
baseline fixtures pass
boundary fixtures pass
lunar fixtures pass
invalid input fail correctly
```

### I4 — Unknown Time / Scenario Planner

Gate:

```text
no fabricated time
boundary scenario generated
invariant facts detected
scenario limit behavior tested
```

### I5 — Interpretation Runtime Skeleton

Rule Registry + DAG + evaluator.

Gate:

```text
cycle detection
matched/not-matched
missing/ambiguous input
RuleEvaluation reproducibility
```

### I6 — Claim Graph

Gate:

```text
claims trace to evaluations
relations preserved
safe dedup
conflict fixture
completeness states
```

### I7 — Research Interpretation Pack

출처가 확보된 제한적인 Rule만 사용.

Gate:

```text
sourceRef exists
methodologyRef exists
fixture tests
no production wording claims
```

### I8 — Narrative Foundation

LLM 없이 먼저:

```text
EvidenceBundle
NarrativeDraft schema
validator
deterministic fallback
```

을 구현한다.

Gate:

```text
unsupported evidence ref rejected
ambiguity disclosure enforced
conflict disclosure enforced
```

### I9 — LLM Adapter

provider를 연결한다.

Gate:

```text
structured output
validation
one repair max
fallback works
hallucination fixtures
```

### I10 — Dev Harness E2E

한 입력을 끝까지 실행한다.

```text
input
 -> canonical
 -> claims
 -> narrative
 -> ReadingArtifact
```

이 시점이 Engine MVP completion candidate다.

---

## 9. Calculation Policy 미결정과 구현의 관계

현재 다음은 아직 방법론 확정이 필요하다.

```text
dayBoundary
trueSolarTime default
historical DST policy
luck-pillar start methodology
```

이 때문에 코드를 멈출 필요는 없다.

대신:

```text
Policy를 configuration으로 구현
```

하고 production default 확정은 별도 research decision으로 둔다.

즉 I1~I4에서는 여러 policy를 표현할 수 있는 구조와 fixture를 구현하고, 서비스 default는 나중에 고정한다.

---

## 10. Interpretation Rule Corpus 미완성과 구현의 관계

Rule Engine infrastructure와 실제 명리 knowledge corpus를 분리한다.

```text
Engine implementation
≠ Interpretation content completion
```

I5/I6는 synthetic test rules로도 충분히 검증할 수 있다.

I7부터 실제 source-backed Rule을 넣는다.

이를 통해 출처 조사가 늦는다고 Runtime architecture 구현을 멈추지 않는다.

---

## 11. Synthetic Test Rule 정책

테스트용 Rule은 production knowledge처럼 보이지 않게 한다.

예:

```text
RULE-TEST-EQ-0001
methodology = INTERNAL_TEST_ONLY
status = research/test-only
```

제품 Reading에 포함될 수 없어야 한다.

---

## 12. Production Gate 계층

### Gate A — Calculation

```text
canonical correctness
boundary correctness
input validation
version reproducibility
```

### Gate B — Interpretation Infrastructure

```text
DAG correctness
rule audit
ambiguity handling
claim graph integrity
```

### Gate C — Interpretation Content

```text
provenance
methodology review
fixtures
domain review
```

### Gate D — Narrative

```text
grounding
ambiguity/conflict disclosure
unsupported assertion control
fallback
```

### Gate E — Product

```text
UX
security
privacy
payment/operations if applicable
```

Gate를 섞지 않는다.

---

## 13. Definition of Done — Engine MVP

다음이 모두 충족되어야 한다.

```text
[ ] clean install에서 build 성공
[ ] CI에서 test/lint/typecheck 성공
[ ] manseryeok version pinned
[ ] canonical snapshot 생성
[ ] calculation policy metadata 저장
[ ] golden/boundary tests 존재
[ ] unknown time fake substitution 없음
[ ] ambiguity scenario fixture 존재
[ ] Rule Registry versioning 동작
[ ] DAG cycle rejection 동작
[ ] RuleEvaluation audit 생성
[ ] Claim graph 생성
[ ] material conflict 보존
[ ] EvidenceBundle 생성
[ ] Narrative validation 동작
[ ] deterministic fallback 동작
[ ] E2E fixture 재현 가능
```

LLM이 멋진 글을 잘 쓰는 것은 Engine MVP correctness의 정의가 아니다.

---

## 14. Engine MVP 이후 Product Decision

Engine MVP가 확보되면 제품 형태 비교를 실제로 수행한다.

```text
Track W — Consumer Web
Track O — Operator Tool + PDF
Track D — Desktop/Standalone
Track T — Template/Report Product
```

이 단계에서 시장/운영/결제/고객 acquisition 조건을 보고 하나 또는 복수 Track을 선택한다.

---

## 15. 당장 구현하지 않는 이유가 아닌 것

다음 미결정은 Core 구현을 막지 않는다.

```text
사이트 디자인 없음
결제 모델 없음
회원 구조 없음
제품 형태 미정
```

Core Engine은 이와 독립적이다.

반대로 다음은 실제 production 해석 content 출시를 막는다.

```text
출처 없는 Rule
검증 없는 계산 default
provenance 없는 해석
LLM-only 판단
```

---

## 16. 첫 구현 Target

다음 실제 코드 작업의 범위는 **I0 + I1**로 한다.

### I0

- Node LTS / TypeScript baseline pin
- workspace/package scaffold
- strict compiler configuration
- lint/typecheck/test/build commands
- GitHub Actions CI

### I1

- CalculationInput / Policy contract
- Canonical Snapshot contract
- common versioned refs
- Rule/Claim minimal contracts
- schema validation strategy

아직 `manseryeok`을 호출하지 않는다.

I0/I1이 green인 뒤 I2 Adapter로 넘어간다.

---

## 17. S12 결정 요약

명화는 이제 설계만 계속 확장하지 않는다.

다음 전환은:

```text
Architecture Foundation
        ↓
I0 Repository Bootstrap
        ↓
I1 Domain Contracts
        ↓
I2 Calculation Adapter
```

이다.

제품 형태가 미정이어도 Engine 구현은 시작할 수 있다.

실제 다음 작업부터는 구현 Phase I0/I1로 진입한다.
