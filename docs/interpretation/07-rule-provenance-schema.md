# 07. Rule & Provenance Schema

## 1. 목적

명화의 해석 규칙을 단순한 조건문 모음이 아니라 **검증·추적·버전관리 가능한 지식 단위**로 정의한다.

핵심 목표:

1. 어떤 규칙이 왜 존재하는지 추적 가능해야 한다.
2. 어느 문헌/유파/방법론을 따르는지 구분해야 한다.
3. 서로 다른 규칙이 충돌해도 정보를 잃지 않아야 한다.
4. Rule Engine 결과가 LLM에 전달될 때 provenance가 유지되어야 한다.
5. heuristic과 문헌 기반 규칙을 같은 권위로 취급하지 않아야 한다.

---

## 2. 핵심 Entity

```text
SourceReference
MethodologyDefinition
InterpretationPack
RuleDefinition
RuleEvaluation
InterpretationClaim
ClaimRelation
NarrativeEvidenceBundle
```

관계:

```text
SourceReference
      ↑
      │
MethodologyDefinition
      ↑
      │
InterpretationPack
      │
      ├──── RuleDefinition ──── SourceReference
      │             │
      │             ▼
Canonical Facts -> RuleEvaluation
                      │
                      ▼
             InterpretationClaim
                      │
                ClaimRelation
                      │
                      ▼
            NarrativeEvidenceBundle
                      │
                      ▼
                     LLM
```

---

## 3. SourceReference

### 3.1 목적

규칙의 근거가 어디에서 왔는지 기록한다.

### 3.2 Schema 초안

```ts
interface SourceReference {
  sourceId: string;
  sourceType:
    | 'classical_text'
    | 'modern_book'
    | 'paper'
    | 'article'
    | 'web'
    | 'repository'
    | 'dataset'
    | 'practitioner_note'
    | 'internal_research';

  title: string;
  author?: string;
  editor?: string;
  publisher?: string;
  edition?: string;
  publicationYear?: number;
  language?: string;

  locator?: {
    volume?: string;
    chapter?: string;
    section?: string;
    page?: string;
    anchor?: string;
  };

  url?: string;
  accessedAt?: string;

  provenanceTier:
    | 'primary'
    | 'scholarly_secondary'
    | 'practitioner_secondary'
    | 'cross_reference'
    | 'heuristic'
    | 'internal';

  rights?: {
    license?: string;
    copyrightStatus?: 'public_domain' | 'copyrighted' | 'open_license' | 'unknown';
    reusePolicy?: 'metadata_only' | 'paraphrase_only' | 'quoted_with_limit' | 'code_reuse_allowed';
  };

  notes?: string;
}
```

### 3.3 원칙

- URL만 저장하고 출처가 있다고 간주하지 않는다.
- 책은 판본·페이지/장절을 가능한 범위에서 남긴다.
- 코드 저장소는 commit/tag 또는 package version을 함께 기록할 수 있어야 한다.
- 저작권이 있는 현대 서적의 문장을 Rule text로 대량 복제하지 않는다.
- 규칙은 가능한 한 **우리 표현으로 구조화**하고 출처는 citation metadata로 연결한다.

---

## 4. MethodologyDefinition

### 목적

`신강/신약`, `격국`, `용신` 같은 개념을 하나의 절대 알고리즘으로 취급하지 않고, 계산 절차와 가정을 명시한다.

```ts
interface MethodologyDefinition {
  methodologyId: string;
  version: string;

  family:
    | 'structural_balance'
    | 'day_master_strength'
    | 'gyeokguk'
    | 'yongshin'
    | 'ten_gods'
    | 'stem_branch_interaction'
    | 'shinsal'
    | 'domain_synthesis'
    | 'time_dynamics'
    | 'compatibility';

  name: string;
  description: string;

  assumptions: string[];
  requiredFactTypes: string[];
  optionalFactTypes?: string[];

  sourceIds: string[];

  status: 'research' | 'reviewed' | 'active' | 'deprecated';
  supersedes?: string;
}
```

### 핵심

같은 `family = yongshin` 안에도 여러 MethodologyDefinition이 공존할 수 있다.

---

## 5. InterpretationPack

### 5.1 목적

실제 한 번의 풀이에서 **어떤 방법론과 어떤 규칙 세트를 사용할지** 재현 가능하게 고정한다.

```ts
interface InterpretationPack {
  packId: string;
  version: string;
  name: string;

  methodologyRefs: Array<{
    methodologyId: string;
    version: string;
  }>;

  enabledRuleSets: string[];
  disabledRuleIds?: string[];

  conflictPolicy: 'preserve_all' | 'prefer_declared_methodology';
  ambiguityPolicy: 'propagate' | 'skip_requires_resolved';

  status: 'research' | 'staging' | 'production' | 'deprecated';
}
```

### 금지

`production=true`라는 이유만으로 어떤 유파를 객관적 진실로 표현하지 않는다.

Pack은 **서비스가 채택한 해석 정책**이다.

---

## 6. RuleDefinition

### 6.1 기본 Schema

```ts
interface RuleDefinition {
  ruleId: string;
  version: string;

  taxonomy: {
    tier: 'T1' | 'T2' | 'T3' | 'T4' | 'T5' | 'T6' | 'T7' | 'T8' | 'T9' | 'T10' | 'T11';
    category: string;
    subcategory?: string;
  };

  methodologyRef: {
    methodologyId: string;
    version: string;
  };

  title: string;
  description: string;

  inputs: RuleInputRequirement[];
  condition: RuleExpression;
  output: RuleOutputTemplate;

  sourceRefs: RuleSourceLink[];

  quality: RuleQualityMetadata;

  status: 'research' | 'reviewed' | 'active' | 'deprecated' | 'rejected';

  relations?: {
    conflictsWith?: string[];
    requires?: string[];
    supersedes?: string[];
    mutuallyExclusiveWith?: string[];
  };
}
```

---

## 7. RuleInputRequirement

Rule은 필요한 Fact/Claim을 명시해야 한다.

```ts
interface RuleInputRequirement {
  key: string;
  source: 'canonical_fact' | 'derived_fact' | 'interpretation_claim';
  pathOrClaimType: string;

  acceptedStates?: Array<'resolved' | 'ambiguous' | 'unavailable'>;
  required: boolean;
}
```

예:

```text
RULE-STRENGTH-001
requires:
  - monthBranch: resolved
  - dayMaster: resolved
  - hiddenStemStructure: resolved | ambiguous
```

### 원칙

Rule이 `resolved`를 요구하는데 입력이 `ambiguous`라면 억지로 실행하지 않는다.

결과는:

```text
SKIPPED_INPUT_AMBIGUOUS
```

처럼 추적한다.

---

## 8. RuleExpression

첫 구현은 범용 스크립트 실행보다 **제한된 선언형 표현식**을 우선한다.

예:

```ts
type RuleExpression =
  | { op: 'eq'; left: Operand; right: Operand }
  | { op: 'in'; value: Operand; set: unknown[] }
  | { op: 'gt' | 'gte' | 'lt' | 'lte'; left: Operand; right: Operand }
  | { op: 'and'; expressions: RuleExpression[] }
  | { op: 'or'; expressions: RuleExpression[] }
  | { op: 'not'; expression: RuleExpression }
  | { op: 'exists'; value: Operand };
```

### 이유

- 규칙 내용을 diff로 검토하기 쉽다.
- 테스트 fixture 생성이 쉽다.
- 임의 코드 실행 위험을 줄인다.
- provenance와 조건을 함께 표시하기 쉽다.

복잡한 계산이 필요한 경우에는 검증된 `DerivedFactProvider`를 별도 코드로 두고 Rule은 그 결과를 소비한다.

---

## 9. RuleOutputTemplate

Rule의 출력은 자연어 문장이 아니라 구조화된 claim이다.

```ts
interface RuleOutputTemplate {
  claimType: string;
  subject: string;
  predicate: string;
  value: unknown;

  polarity?: 'supportive' | 'challenging' | 'neutral' | 'mixed';
  strength?: 'minor' | 'moderate' | 'major';

  tags?: string[];
}
```

### 주의

`strength`는 실제 미래 예측의 확률이나 과학적 confidence가 아니다.

동일 Method Pack 내부에서 **해석상 강조도**를 표현하는 값일 뿐이다.

---

## 10. RuleSourceLink

하나의 Rule은 여러 출처에 연결될 수 있다.

```ts
interface RuleSourceLink {
  sourceId: string;
  supportType:
    | 'direct_basis'
    | 'interpretive_basis'
    | 'corroboration'
    | 'contrast'
    | 'implementation_reference';

  notes?: string;
}
```

예를 들어 `fortuneteller` 코드는:

```text
supportType = implementation_reference
```

로는 쓸 수 있지만, 명리 규칙 자체의 역사적/전통적 `direct_basis`로 자동 승격하지 않는다.

---

## 11. RuleQualityMetadata

### 목적

`confidence` 하나로 모든 품질을 뭉개지 않는다.

```ts
interface RuleQualityMetadata {
  provenanceQuality:
    | 'primary_supported'
    | 'multi_source_supported'
    | 'secondary_only'
    | 'single_practitioner'
    | 'heuristic'
    | 'unknown';

  testCoverage:
    | 'none'
    | 'examples'
    | 'unit'
    | 'fixture_matrix'
    | 'regression_suite';

  methodologyStability:
    | 'stable_within_method'
    | 'contested'
    | 'experimental';

  reviewerStatus:
    | 'unreviewed'
    | 'internal_reviewed'
    | 'domain_reviewed';
}
```

### 절대 하지 않을 것

```text
accuracy = 93%
```

처럼 실제 예측 정확도와 무관한 숫자를 붙이지 않는다.

---

## 12. RuleEvaluation

Rule을 실행한 흔적을 남긴다.

```ts
interface RuleEvaluation {
  evaluationId: string;

  ruleRef: {
    ruleId: string;
    version: string;
  };

  snapshotId: string;
  interpretationPackId: string;
  interpretationPackVersion: string;

  status:
    | 'matched'
    | 'not_matched'
    | 'skipped_missing_input'
    | 'skipped_ambiguous_input'
    | 'skipped_disabled'
    | 'error';

  inputRefs: Array<{
    sourceType: 'fact' | 'claim';
    idOrPath: string;
    observedValue?: unknown;
  }>;

  emittedClaimIds: string[];
  evaluatedAt: string;
}
```

### 목적

사용자가 나중에:

> 왜 이렇게 해석했나요?

라고 물으면 Narrative만 저장하는 것이 아니라 실제 적용 Rule까지 역추적할 수 있다.

---

## 13. InterpretationClaim

### 13.1 Schema

```ts
interface InterpretationClaim {
  claimId: string;
  schemaVersion: string;

  snapshotId: string;

  taxonomy: {
    tier: string;
    category: string;
    subcategory?: string;
  };

  claimType: string;
  subject: string;
  predicate: string;
  value: unknown;

  methodologyRef: {
    methodologyId: string;
    version: string;
  };

  ruleRefs: Array<{
    ruleId: string;
    version: string;
    evaluationId: string;
  }>;

  factRefs: string[];
  sourceRefs: string[];

  polarity?: 'supportive' | 'challenging' | 'neutral' | 'mixed';
  emphasis?: 'minor' | 'moderate' | 'major';

  state: 'active' | 'superseded' | 'retracted';
}
```

---

## 14. ClaimRelation

다른 결과를 억지로 합치지 않기 위한 핵심 모델이다.

```ts
interface ClaimRelation {
  fromClaimId: string;
  toClaimId: string;

  relation:
    | 'supports'
    | 'qualifies'
    | 'contradicts'
    | 'depends_on'
    | 'derived_from'
    | 'supersedes';

  reason?: string;
}
```

예:

```text
CLAIM-YS-JOHU-001 contradicts CLAIM-YS-EOKBU-003
```

이때 두 claim은 모두 보존한다.

---

## 15. Synthesis Rule

T8 이상의 domain claim은 단일 Fact보다 여러 claim을 입력으로 받는 경우가 많다.

예:

```text
RULE-CAREER-014

inputs:
  dayMasterStrength
  tenGodPattern
  gyeokgukClaim
  yongshinClaim

output:
  CAREER_ENVIRONMENT_PREFERENCE
```

### 원칙

- upstream claim이 어느 Method Pack에서 생성됐는지 추적한다.
- 서로 다른 Method Pack의 claim을 무분별하게 섞지 않는다.
- Pack cross-composition이 필요하면 별도 `CompositionPolicy`를 둔다.

---

## 16. NarrativeEvidenceBundle

LLM에는 전체 DB나 생년월일만 던지지 않는다.

```ts
interface NarrativeEvidenceBundle {
  requestId: string;
  purpose:
    | 'full_reading'
    | 'section_reading'
    | 'question_answer'
    | 'method_comparison';

  canonicalFacts: SelectedFact[];
  claims: InterpretationClaim[];
  claimRelations: ClaimRelation[];
  sourceSummaries?: SourceSummary[];

  narrativePolicyVersion: string;

  constraints: {
    mayRecalculate: false;
    mayInventRules: false;
    mustPreserveMethodDifferences: true;
    mustDiscloseMaterialAmbiguity: true;
  };
}
```

### 결과

LLM의 역할은 이 bundle 안의 evidence를 **선택·설명·비교·문장화**하는 것이다.

---

## 17. Rule ID Convention

초안:

```text
RULE-{CATEGORY}-{METHOD}-{NNNN}
```

예:

```text
RULE-STRENGTH-BASE-0001
RULE-GYEOKGUK-METHODA-0007
RULE-YONGSHIN-JOHU-0012
RULE-TENGOD-GENERAL-0041
RULE-CAREER-SYNTH-0020
```

Method 이름은 연구 확정 전 placeholder를 사용한다.

Version은 ID에 넣지 않고 별도 필드로 관리한다.

```text
ruleId  = RULE-YONGSHIN-JOHU-0012
version = 1.3.0
```

---

## 18. Rule Lifecycle

```text
research
   ↓
reviewed
   ↓
active
   ↓
deprecated
```

문제가 확인되면:

```text
rejected
```

가능.

### `research`

- 자료 조사 중
- production pack 사용 금지

### `reviewed`

- 출처와 조건 검토 완료
- 테스트 작성 가능

### `active`

- 특정 InterpretationPack에서 사용 가능

### `deprecated`

- 기존 Reading 재현을 위해 정의는 보존
- 신규 평가에는 사용하지 않음

### `rejected`

- 오류/출처 문제/방법론 문제 등으로 사용 금지
- 삭제하지 않고 rejection reason을 남긴다.

---

## 19. Versioning

Rule 수정은 세 종류로 구분한다.

### PATCH

- 설명 metadata 수정
- 계산 결과에 영향 없음

### MINOR

- 새로운 조건 지원
- 기존 Rule의 의미를 보존하면서 범위 확대

### MAJOR

- condition 변경
- output 의미 변경
- 기존 동일 입력에서 다른 claim이 나올 수 있음

Production Reading에는 반드시 Rule version과 Pack version을 저장한다.

---

## 20. Provenance Quality Gate

Production `active` Rule 최소 조건 초안:

```text
1. methodologyRef 존재
2. 최소 1개 sourceRef 존재
3. source locator가 가능한 범위에서 구체적임
4. heuristic이면 heuristic으로 명시
5. unit/fixture test 존재
6. ambiguous input 처리 정의
7. conflict relation 검토
8. 사용자-facing 과도한 단정 여부 검토
```

T8/T9처럼 인생 영역을 직접 서술하는 Rule에는 더 강한 gate를 적용한다.

---

## 21. Heuristic 정책

Heuristic 자체를 전면 금지하지 않는다.

다만 다음을 요구한다.

```text
provenanceQuality = heuristic
methodologyStability = experimental
```

그리고 production 기본 pack 포함 여부를 별도로 승인한다.

### 금지 예

```text
오행이 균형 -> 85점
불균형 -> 70점
```

이 숫자에 명리적 근거 또는 검증 의미가 없다면 UI 품질 점수처럼 사용하지 않는다.

---

## 22. 외부 코드 재사용 정책

### manseryeok

- Calculation Adapter 뒤에서 사용 후보
- MIT 라이선스 attribution 유지
- upstream type을 canonical schema로 직접 노출하지 않음

### fortuneteller

- 기능 목록/구조/테스트 아이디어 참고 가능
- 해석 Rule을 직접 복사하기 전에 개별 provenance 및 라이선스 상태 재검증
- repository 코드가 구현되어 있다는 사실을 명리 Rule의 authority로 간주하지 않음

---

## 23. 테스트 전략

각 Rule은 최소 다음 테스트 유형을 지원해야 한다.

### Positive Fixture

조건이 충족되면 expected claim이 나온다.

### Negative Fixture

조건이 일부 충족되지 않으면 claim이 나오지 않는다.

### Boundary Fixture

조건 임계점에서 예상대로 동작한다.

### Ambiguity Fixture

필수 Fact가 ambiguous일 때 정의된 skip/propagate 정책을 따른다.

### Conflict Fixture

서로 다른 Method Pack에서 상충 claim이 생성되어도 둘 다 보존된다.

### Version Fixture

Rule major version 변경 시 과거 Reading 재현이 가능하다.

---

## 24. 예시 — 구조만 보여주는 가상 Rule

아래는 명리 규칙 자체를 선언하는 예제가 아니라 schema 사용 예시다.

```yaml
ruleId: RULE-STRENGTH-DEMO-0001
version: 0.1.0
status: research

taxonomy:
  tier: T2
  category: day_master_strength

methodologyRef:
  methodologyId: DEMO-STRENGTH-METHOD
  version: 0.1.0

inputs:
  - key: monthContext
    source: derived_fact
    pathOrClaimType: structural.month_context
    acceptedStates: [resolved]
    required: true

condition:
  op: eq
  left: { ref: monthContext.supportsDayMaster }
  right: true

output:
  claimType: DAY_MASTER_STRENGTH_SIGNAL
  subject: DAY_MASTER
  predicate: RECEIVES_SEASONAL_SUPPORT
  value: true

sourceRefs:
  - sourceId: SRC-DEMO
    supportType: direct_basis

quality:
  provenanceQuality: unknown
  testCoverage: none
  methodologyStability: experimental
  reviewerStatus: unreviewed
```

Production에서는 quality gate를 통과하지 못하므로 활성화되지 않는다.

---

## 25. 저장 구조 후보

초기 repository 구조:

```text
knowledge/
  sources/
  methodologies/
  packs/
  rules/
    structural/
    strength/
    gyeokguk/
    yongshin/
    ten-gods/
    interactions/
    shinsal/
    domains/
    timing/
    compatibility/
```

실제 구현 언어/파일 형식(JSON/YAML/TS)은 Implementation Phase에서 결정한다.

중요한 것은 **데이터 계약이 코드보다 먼저 고정되는 것**이다.

---

## 26. Exit Criteria

S7 완료 조건:

- Rule이 방법론과 source provenance에 연결됨
- heuristic을 별도 품질 상태로 표현할 수 있음
- ambiguous input을 안전하게 처리할 수 있음
- Rule 실행 trace를 보존할 수 있음
- Claim이 Rule/Fact/Source까지 역추적 가능함
- 서로 충돌하는 Claim을 삭제하지 않고 관계로 표현할 수 있음
- LLM에 전달되는 evidence bundle이 정의됨
- 과거 Reading 재현을 위한 versioning이 정의됨

다음 단계는 이 schema를 실제 실행 구조로 연결하는 **S8 — Interpretation Engine Design**이다.
