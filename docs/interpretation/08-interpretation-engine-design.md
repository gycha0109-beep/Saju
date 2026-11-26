# 08. Interpretation Engine Design

## 1. 목적

명화의 `Interpretation Engine`이 `Canonical Saju Snapshot`과 `InterpretationPack`을 입력받아 **재현 가능한 RuleEvaluation, InterpretationClaim, ClaimRelation, NarrativeEvidenceBundle**을 생성하는 런타임 구조를 정의한다.

핵심 목표는 다음과 같다.

1. 동일 입력 + 동일 버전 조합이면 동일한 해석 claim graph가 생성되어야 한다.
2. LLM 없이도 Interpretation 결과가 완결된 구조 데이터로 존재해야 한다.
3. Rule dependency와 실행 순서를 명시적으로 검증해야 한다.
4. ambiguous / unavailable fact를 임의 보정하지 않아야 한다.
5. 서로 다른 방법론의 충돌을 정보 손실 없이 보존해야 한다.
6. 부분 실패가 조용히 정상 결과처럼 보이지 않아야 한다.
7. 사용자 문장 하나를 최종적으로 source까지 역추적할 수 있어야 한다.

---

## 2. 전체 Runtime Pipeline

```text
Canonical Saju Snapshot
        │
        ▼
Derived Fact Providers (T0)
        │
        ▼
Interpretation Execution Request
        │
        ▼
Pack Resolver
        │
        ▼
Registry Snapshot Resolver
        │
        ▼
Execution Plan Builder
        │
        ├─ validate versions
        ├─ select rules
        ├─ resolve dependencies
        ├─ reject cycles
        └─ build stage DAG
        │
        ▼
Rule Evaluator
        │
        ├─ input state check
        ├─ ambiguity handling
        ├─ condition evaluation
        └─ RuleEvaluation log
        │
        ▼
Claim Emitter
        │
        ▼
Claim Graph Builder
        │
        ├─ explicit relations
        ├─ dependency relations
        ├─ compatible deduplication
        └─ material conflict preservation
        │
        ▼
Completeness / Integrity Gate
        │
        ▼
Evidence Selector
        │
        ▼
NarrativeEvidenceBundle
        │
        ▼
LLM Narrative Layer
```

Interpretation Engine 경계는 `NarrativeEvidenceBundle` 생성까지다.

LLM 응답 생성은 S9의 별도 계층이다.

---

## 3. Determinism Contract

Interpretation Engine 자체는 deterministic 해야 한다.

다음 값이 동일하면 claim graph도 동일해야 한다.

```text
canonicalSnapshotHash
+ derivedFactSetVersion
+ interpretationPackId/version
+ ruleRegistrySnapshotId
+ methodology versions
+ interpretationEngineVersion
+ compositionPolicyVersion
```

다음 요소는 Interpretation Engine 내부에 들어오지 않는다.

- LLM sampling
- temperature
- 사용자와의 이전 자연어 대화
- 현재 날짜를 암묵적으로 읽는 동작
- 외부 웹 검색 결과
- 실행 시점에 따라 바뀌는 remote rule

시간 흐름(T9)을 분석할 경우에도 대상 시점은 명시적 입력이어야 한다.

```ts
interface InterpretationExecutionRequest {
  requestId: string;
  snapshotId: string;

  packRef: {
    packId: string;
    version: string;
  };

  purpose:
    | 'full_reading'
    | 'section_reading'
    | 'question_support'
    | 'method_comparison';

  targetTaxonomy?: string[];
  targetDate?: string;

  executionPolicyVersion: string;
}
```

---

## 4. Registry Snapshot

Runtime에서 `active` 상태의 최신 Rule을 그때그때 조회해서 사용하지 않는다.

한 번의 Reading에는 immutable한 Registry Snapshot을 사용한다.

```ts
interface RuleRegistrySnapshot {
  registrySnapshotId: string;
  createdAt: string;

  rules: Array<{
    ruleId: string;
    version: string;
    contentHash: string;
  }>;

  methodologies: Array<{
    methodologyId: string;
    version: string;
    contentHash: string;
  }>;

  packRef: {
    packId: string;
    version: string;
    contentHash: string;
  };
}
```

### 이유

`RULE-A`의 active version이 1.2에서 1.3으로 바뀌었다고 과거 Reading 재실행 결과가 조용히 달라지면 안 된다.

---

## 5. Derived Fact Stage (T0)

복잡한 구조 계산은 Rule DSL 안에 밀어넣지 않는다.

예:

- 지장간 원시 구성
- 천간/지지 relation detection
- 월령 context
- 통근 후보
- 투간 여부
- 오행 raw distribution
- 십신 위치/분포
- 시간 흐름용 운 간지 lookup

이 값은 `DerivedFactProvider`가 생성한다.

```ts
interface DerivedFactProvider {
  providerId: string;
  version: string;
  requiredCanonicalPaths: string[];
  outputFactTypes: string[];
}
```

### 규칙

1. Provider도 versioned 한다.
2. 같은 입력에서 같은 결과가 나와야 한다.
3. Provider 결과도 provenance/audit ref를 가진다.
4. Provider가 명리적 의미 판단을 시작하면 T0가 아니라 Interpretation Rule로 이동한다.
5. 임의 스크립트/plugin을 runtime에 다운로드하여 실행하지 않는다.

---

## 6. Pack Resolver

`InterpretationPack`은 실제 실행 가능한 정확한 rule/methodology 집합으로 resolve되어야 한다.

### Pack Resolution 결과

```ts
interface ResolvedInterpretationPack {
  packId: string;
  version: string;

  methodologyRefs: VersionedMethodologyRef[];
  ruleRefs: VersionedRuleRef[];

  ambiguityPolicy: AmbiguityPolicy;
  conflictPolicy: ConflictPolicy;
  compositionPolicyRef: VersionedRef;

  requiredCapabilities: string[];
}
```

### Fail Closed 조건

- 존재하지 않는 Rule version
- deprecated/rejected Rule을 production pack이 요구
- methodology version 불일치
- source/provenance production gate 미충족 Rule
- dependency가 pack 밖에 있는데 대체 경로 없음

위 경우 production 실행은 시작하지 않는다.

---

## 7. Execution Plan Builder

Rule을 파일 순서나 등록 순서대로 실행하지 않는다.

RuleInputRequirement와 `relations.requires`를 이용해 DAG를 생성한다.

예:

```text
T0 raw structural facts
      │
      ├──────────────┐
      ▼              ▼
T1 balance       T5 ten-god interpretation
      │              │
      ▼              │
T2 strength           │
      │               │
      ├───────┐       │
      ▼       ▼       │
T3 gyeokguk  T4 yongshin
      │       │       │
      └───┬───┴───────┘
          ▼
     T8 synthesis
          │
          ▼
     T9/T10/T11
```

이 그림은 기본적인 dependency 예시일 뿐이며 모든 Methodology가 같은 방향을 강제받지 않는다.

### Cycle Detection

다음은 configuration error다.

```text
RULE-A requires CLAIM-B
RULE-B requires CLAIM-A
```

Cycle 발견 시:

```text
EXECUTION_PLAN_INVALID_CYCLE
```

로 전체 plan을 reject한다.

런타임에서 임의 순서를 정해 한쪽을 먼저 실행하지 않는다.

---

## 8. Stage Model

초기 Runtime은 다음 stage를 권장한다.

```text
STAGE-0  canonical validation
STAGE-1  derived facts
STAGE-2  atomic interpretation rules (T1~T7)
STAGE-3  claim relation resolution
STAGE-4  synthesis rules (T8)
STAGE-5  dynamic/compatibility/question rules (T9~T11)
STAGE-6  graph integrity / completeness gate
STAGE-7  evidence bundle selection
```

같은 stage 안에서 dependency가 없는 Rule은 순서와 무관하게 실행 가능해야 한다.

향후 병렬화를 하더라도 결과 순서가 claim 의미에 영향을 주면 안 된다.

---

## 9. Rule Evaluator

Rule Evaluator는 Rule 하나에 대해 다음 순서로 작동한다.

```text
1. Rule/version 존재 확인
2. status/policy 확인
3. input requirement resolve
4. input state 검사
5. ambiguity policy 적용
6. declarative condition 평가
7. output template materialize
8. RuleEvaluation 저장
9. ClaimEmitter 전달
```

### RuleEvaluation Status 확장

기존 S7 상태를 다음과 같이 구체화한다.

```ts
type RuleEvaluationStatus =
  | 'matched'
  | 'not_matched'
  | 'skipped_missing_input'
  | 'skipped_ambiguous_input'
  | 'skipped_dependency_unresolved'
  | 'skipped_disabled'
  | 'blocked_policy'
  | 'error';
```

`error`가 발생했는데 단순 `not_matched`로 바꾸지 않는다.

---

## 10. Ambiguity 처리

### 10.1 문제

출생시간 미상 또는 boundary 근처에서는 Fact가 다음처럼 존재할 수 있다.

```text
dayPillar:
  state = ambiguous
  candidates = [A, B]
```

모든 Rule을 무조건 skip하면 정보 손실이 과도하다.

반대로 임의 후보 하나를 고르면 거짓 확정이다.

### 10.2 세 가지 평가 방식

RuleInputRequirement에 ambiguity behavior를 추가한다.

```ts
type AmbiguityBehavior =
  | 'requires_resolved'
  | 'invariant_across_candidates'
  | 'scenario_preserving';
```

#### A. requires_resolved

후보가 하나로 확정되지 않으면 실행하지 않는다.

```text
status = skipped_ambiguous_input
```

#### B. invariant_across_candidates

모든 유효 후보 조합에서 Rule 결과가 동일할 때만 claim을 생성한다.

예:

```text
Candidate world A -> claim X
Candidate world B -> claim X

=> claim X는 안전하게 유지
```

반면:

```text
A -> X
B -> no match
```

이면 확정 claim으로 만들지 않는다.

#### C. scenario_preserving

결과가 달라도 제품 가치가 높고 방법론적으로 허용된 경우 scenario별 conditional claim을 생성한다.

```text
Scenario A -> claim X
Scenario B -> claim Y
```

이 경우 claim에 반드시 `scenarioRef`를 붙인다.

### 10.3 Candidate Explosion 방지

모든 ambiguous Fact를 Cartesian product로 무제한 확장하지 않는다.

초기 정책:

- Calculation Layer가 의미 있는 `CalculationScenario`를 먼저 deduplicate한다.
- Interpretation Layer는 이미 생성된 scenario set만 소비한다.
- production execution에는 `maxScenarioCount`를 둔다.
- 제한 초과 시 임의 샘플링하지 않고 `SCENARIO_LIMIT_EXCEEDED`로 중단/축소한다.

---

## 11. CalculationScenario Contract

```ts
interface CalculationScenario {
  scenarioId: string;
  snapshotId: string;

  factOverrides: Array<{
    path: string;
    candidateId: string;
    value: unknown;
  }>;

  reasonRefs: string[];
}
```

Scenario는 새로운 사주를 임의 생성하는 기능이 아니다.

Canonical Snapshot이 이미 보존한 합법적 후보들의 조합을 표현한다.

---

## 12. Claim Emission

Rule이 match되면 `RuleOutputTemplate`을 `InterpretationClaim`으로 materialize한다.

Claim에는 최소 다음을 연결한다.

```text
claimId
snapshotId
scenarioRef? 
methodologyRef
ruleRef/version
evaluationId
factRefs
upstreamClaimRefs
sourceRefs
packRef
```

자연어 설명문은 이 단계에서 만들지 않는다.

---

## 13. Claim Identity / Deduplication

같은 의미의 claim이 여러 Rule에서 나올 수 있다.

그러나 무조건 하나로 합치면 provenance가 사라진다.

### Safe Merge 후보 조건

다음이 모두 같을 때만 logical claim group으로 묶을 수 있다.

```text
claimType
subject
predicate
normalized value
scope/scenario
methodology family + compatible methodology policy
```

RuleEvaluation은 각각 보존한다.

예:

```text
CLAIM-GROUP-001
  supportedBy:
    EVAL-101 / RULE-A
    EVAL-208 / RULE-B
```

### Merge 금지

- methodology가 다르고 차이를 보여줘야 하는 경우
- scenario가 다른 경우
- 같은 단어라도 predicate semantics가 다른 경우

---

## 14. Claim Relation Resolver

Relation 생성 근거는 세 종류로 분리한다.

### 14.1 Explicit

RuleDefinition/MethodologyDefinition에 명시된 관계.

```text
conflictsWith
requires
mutuallyExclusiveWith
```

### 14.2 Structural

Synthesis Rule이 upstream claim을 소비한 경우:

```text
DERIVED_FROM
DEPENDS_ON
```

### 14.3 Comparable-output conflict

동일 scope에서 서로 배타적인 value를 주장하고, 해당 claim type이 `exclusiveValue=true`로 정의된 경우에만 자동 contradiction 후보가 된다.

예:

```text
DAY_MASTER_STRENGTH = STRONG
DAY_MASTER_STRENGTH = WEAK
```

### 금지

단순히 값이 다르다는 이유로 모든 방법론 claim을 자동 `contradicts`로 표시하지 않는다.

예를 들어 조후 용신과 억부 용신은 서로 다른 질문에 답하는 구조일 수도 있다.

---

## 15. ClaimType Registry

자동 relation과 evidence selection을 위해 claim type 자체도 schema를 가진다.

```ts
interface ClaimTypeDefinition {
  claimType: string;
  valueSchemaRef: string;

  scope:
    | 'natal'
    | 'period'
    | 'compatibility'
    | 'question';

  exclusiveValue: boolean;
  scenarioSensitive: boolean;
  materialForNarrative: boolean;

  allowedTaxonomyTiers: string[];
}
```

이 Registry 역시 versioned 한다.

---

## 16. CompositionPolicy

서로 다른 Methodology Pack의 claim을 T8 이상에서 조합할지 명시한다.

```ts
interface CompositionPolicy {
  compositionPolicyId: string;
  version: string;

  allowedMethodologyCombinations: Array<{
    families: string[];
    mode: 'allowed' | 'comparison_only' | 'forbidden';
  }>;
}
```

### 이유

예를 들어 A 방식의 신강 claim과 B 방식의 용신 claim을 아무 검토 없이 결합해 직업 해석을 만들면 원래 어느 체계에도 없는 hybrid rule이 될 수 있다.

---

## 17. Core / Optional Rule Groups

Production Pack은 Rule을 단순 배열로만 관리하지 않는다.

```ts
interface RuleGroupRequirement {
  groupId: string;
  importance: 'core' | 'optional';
  requiredOutputTypes?: string[];
}
```

### Core group

해당 Methodology가 성립하기 위한 필수 해석 영역.

실패하면 Reading 전체 또는 해당 section을 `incomplete`로 표시한다.

### Optional group

부가 정보.

실패 시 나머지 결과는 유지할 수 있지만 failure metadata를 보존한다.

---

## 18. Completeness는 Confidence가 아니다

명화는 다음을 구분한다.

```text
methodology correctness/authority
≠ execution completeness
≠ prediction accuracy
```

`ExecutionCompleteness`는 단순히 **의도한 Rule Group이 기술적으로 실행되었는가**를 말한다.

예:

```ts
interface ExecutionCompleteness {
  state: 'complete' | 'partial' | 'failed';

  completedCoreGroups: string[];
  blockedCoreGroups: string[];
  skippedOptionalGroups: string[];

  reasons: string[];
}
```

이를 `87% 정확도` 같은 사용자 점수로 변환하지 않는다.

---

## 19. Failure Policy

### 19.1 Configuration Failure

다음은 실행 자체를 reject한다.

- DAG cycle
- 없는 version ref
- rejected Rule 포함
- invalid schema
- production provenance gate 위반

### 19.2 Core Runtime Failure

핵심 Methodology Rule Group에서 evaluator exception이 발생한 경우 해당 section을 정상 결과처럼 출력하지 않는다.

```text
executionCompleteness = partial | failed
```

### 19.3 Optional Failure

부가 신살 등 optional group failure는 다른 section을 막지 않을 수 있다.

그러나 audit log에는 남는다.

---

## 20. InterpretationRun

한 번의 Engine 실행 자체를 immutable record로 저장한다.

```ts
interface InterpretationRun {
  interpretationRunId: string;
  requestId: string;

  snapshotId: string;
  snapshotHash: string;

  registrySnapshotId: string;
  packRef: VersionedRef;
  compositionPolicyRef: VersionedRef;

  derivedFactSetVersion: string;
  interpretationEngineVersion: string;

  startedAt: string;
  completedAt?: string;

  status: 'completed' | 'partial' | 'failed';
  completeness: ExecutionCompleteness;

  evaluationIds: string[];
  claimIds: string[];
  claimRelationIds: string[];

  runHash: string;
}
```

`runHash`는 canonicalized inputs/version refs/result graph의 integrity fingerprint 용도다.

---

## 21. Caching

Caching은 correctness boundary를 침범하면 안 된다.

Cache key 최소 구성:

```text
snapshotHash
+ registrySnapshotId
+ packId/version
+ compositionPolicyVersion
+ derivedFactSetVersion
+ engineVersion
+ target taxonomy/purpose
+ targetDate if applicable
```

외부 라이브러리 version이나 Rule version이 달라졌는데 이전 cache를 반환하면 안 된다.

---

## 22. Evidence Selector

모든 claim을 LLM에 그대로 전달하지 않는다.

사용 목적에 따라 필요한 evidence subgraph를 선택한다.

예:

### full_reading

- core natal claims
- material conflicts
- material ambiguity
- domain synthesis claims

### section_reading / career

- career synthesis claims
- 그 claim의 ancestor claims
- 필요한 canonical facts
- 관련 conflict/qualification

### question_support

- 질문 intent에 대응하는 claim type
- dependency ancestor
- 반대/제한 claim

### method_comparison

- 비교 대상 methodology별 claim
- 동일/상이한 결과
- source summary

### 원칙

Evidence Selector가 불편한 반대 claim을 숨겨 Narrative를 더 단정적으로 만들면 안 된다.

---

## 23. Materiality Policy

LLM에 반드시 전달해야 할 ambiguity/conflict를 정의한다.

```ts
interface NarrativeMaterialityPolicy {
  version: string;

  materialClaimTypes: string[];
  discloseAmbiguityFor: string[];
  discloseConflictsFor: string[];
}
```

예:

- 일주 ambiguity
- 신강/신약 방법론 충돌
- 용신 methodology 차이

등은 사용자 해석을 실질적으로 바꾼다면 숨기지 않는다.

---

## 24. NarrativeEvidenceBundle 생성 조건

Bundle은 다음 gate를 통과해야 한다.

```text
1. InterpretationRun integrity valid
2. selected claims all exist
3. every claim has rule/evaluation provenance
4. claim dependency closure valid
5. material conflicts included
6. material ambiguities included
7. no retracted claim included as active evidence
8. NarrativePolicy version fixed
```

조건 미충족 시 LLM을 호출하지 않는다.

---

## 25. Security / Execution Safety

초기 Rule Engine은 arbitrary JS/TS eval을 허용하지 않는다.

금지:

```text
eval(rule.code)
new Function(...)
remote script loading
LLM-generated executable rule at runtime
```

복잡한 계산은 review/test된 `DerivedFactProvider` 또는 명시적인 Engine operator로 구현한다.

---

## 26. Observability

개발/검증 환경에서는 다음을 확인할 수 있어야 한다.

```text
which pack?
which registry snapshot?
which rule executed?
why matched?
why skipped?
which facts were consumed?
which claims were emitted?
which conflicts were detected?
which claims reached the LLM bundle?
```

사용자용 UI와 내부 debug UI는 분리한다.

---

## 27. 테스트 전략

### 27.1 Plan tests

- dependency ordering
- cycle rejection
- missing rule rejection
- disabled rule behavior

### 27.2 Rule evaluator tests

- matched / not matched
- missing input
- unavailable input
- ambiguous input
- invalid expression

### 27.3 Ambiguity matrix

- all scenarios produce same claim
- scenarios produce different claims
- one scenario matches / one does not
- scenario count limit

### 27.4 Claim graph tests

- supports
- qualifies
- contradicts
- dependency closure
- safe deduplication
- methodology preservation

### 27.5 Completeness tests

- core group success
- core group error
- optional group error
- partial Reading state

### 27.6 Determinism tests

동일 immutable input으로 반복 실행 시 canonical claim graph serialization/hash가 같아야 한다.

---

## 28. 초기 구현 모듈 후보

최종 기술 스택과 무관한 논리 경계다.

```text
interpretation/
  registry/
    rule-registry
    methodology-registry
    claim-type-registry

  planning/
    pack-resolver
    dependency-graph
    execution-plan-builder

  derived/
    derived-fact-provider

  runtime/
    rule-evaluator
    ambiguity-resolver
    claim-emitter
    claim-relation-resolver
    completeness-gate

  evidence/
    evidence-selector
    materiality-policy
    bundle-builder

  audit/
    interpretation-run
    rule-evaluation-log
```

---

## 29. 초기 구현 순서

S8 이후 실제 구현 시에도 모든 T1~T11 Rule을 먼저 만들지 않는다.

권장 순서:

```text
1. Registry contracts
2. Execution plan builder
3. Minimal declarative RuleExpression evaluator
4. RuleEvaluation audit
5. Claim emitter
6. Claim graph / relation resolver
7. ambiguity invariant evaluator
8. completeness gate
9. evidence selector
10. fixture-driven E2E execution
```

그 뒤 실제 명리 Rule corpus를 단계적으로 넣는다.

---

## 30. S8 결정 요약

명화 Interpretation Engine은:

- LLM이 아니다.
- 하나의 거대한 `analyzeSaju()` 함수가 아니다.
- 파일 등록 순서에 의존하지 않는다.
- ambiguous 입력을 임의 확정하지 않는다.
- 방법론 차이를 평균내지 않는다.
- 부분 실패를 정상 결과처럼 숨기지 않는다.

핵심 흐름은 다음으로 고정한다.

```text
Versioned Evidence
  -> Versioned Rules
  -> Dependency-aware Evaluation
  -> Provenance-preserving Claims
  -> Conflict-aware Claim Graph
  -> Integrity / Completeness Gate
  -> Purpose-specific Evidence Bundle
```

이 구조를 S9 LLM Grounding Contract의 입력 경계로 사용한다.
