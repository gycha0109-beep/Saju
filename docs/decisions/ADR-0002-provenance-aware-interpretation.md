# ADR-0002 — Provenance-Aware Interpretation Rules

- Status: Accepted for design foundation
- Date: 2026-08-19

## Context

명화는 결정론적 만세력 계산과 명리 해석을 분리한다.

해석 영역에서는 신강/신약, 격국, 용신, 십신 해석, 신살, 재물·직업·관계·시기 등 다양한 규칙이 사용될 수 있으나 다음 문제가 존재한다.

1. 동일 개념도 유파·방법론에 따라 판정 절차가 다를 수 있다.
2. 인터넷 코드나 현대 설명문에 출처 없는 heuristic이 포함될 수 있다.
3. 서로 다른 방법론이 동일 명식에 대해 상충 결과를 만들 수 있다.
4. LLM에 생년월일만 전달하면 계산·규칙·서술이 뒤섞여 재현성과 설명 가능성을 잃는다.
5. 사용자에게 제공한 과거 풀이가 규칙 변경 이후 재현되지 않을 수 있다.

## Decision

명화의 Interpretation Layer는 **versioned, provenance-aware Rule Registry**를 사용한다.

각 RuleDefinition은 최소 다음 정보를 갖는다.

- stable rule ID
- version
- taxonomy category
- methodology reference
- required inputs
- declarative condition 또는 검증된 derived-fact dependency
- structured claim output
- source references
- quality metadata
- lifecycle status
- conflicts/requires/supersedes 관계

Rule 실행은 `RuleEvaluation` trace를 남기며 결과는 자연어 문자열이 아닌 `InterpretationClaim`으로 저장한다.

상충하는 Claim은 삭제하거나 평균내지 않고 `ClaimRelation`으로 관계를 보존한다.

LLM은 Canonical Facts, Interpretation Claims, Claim Relations를 선별한 `NarrativeEvidenceBundle`만 소비한다.

LLM은:

- 사주를 재계산하지 않는다.
- 새로운 명리 Rule을 즉석에서 만들지 않는다.
- 상충 방법론을 임의로 하나로 합치지 않는다.
- material ambiguity를 숨기지 않는다.

## Quality Decision

명화는 Rule의 품질을 하나의 숫자 confidence로 표현하지 않는다.

다음 dimension을 분리한다.

- provenance quality
- test coverage
- methodology stability / contestedness
- reviewer status

실제 미래 예측 정확도를 검증하지 않은 상태에서 `정확도 95%` 같은 숫자를 부여하지 않는다.

## Heuristic Decision

Heuristic은 연구/실험 목적으로 존재할 수 있으나 다음 metadata를 명시한다.

```text
provenanceQuality = heuristic
methodologyStability = experimental
```

Production InterpretationPack 포함은 별도의 검토를 요구한다.

## Conflict Decision

다음은 오류가 아니다.

```text
Method Pack A -> Claim X
Method Pack B -> Claim Y
X contradicts Y
```

명화는 방법론별 결과를 보존하고 필요하면 사용자에게 차이를 설명한다.

결정론적 Calculation Fact 자체가 동일 정책에서 충돌하는 경우와 구분한다.

## Consequences

### Positive

- 특정 오픈소스 해석 코드에 종속되지 않는다.
- 왜 특정 해석이 나왔는지 역추적할 수 있다.
- 유파 비교 기능을 구조적으로 지원할 수 있다.
- 규칙 변경 후에도 과거 Reading을 재현할 수 있다.
- LLM hallucination 범위를 크게 줄일 수 있다.
- 출처가 약한 Rule을 production에서 분리할 수 있다.

### Cost

- 단순 `if -> string` 방식보다 초기 설계와 데이터 구축 비용이 크다.
- 문헌 조사와 citation 관리가 필요하다.
- Rule version 및 InterpretationPack migration 관리가 필요하다.
- domain expert review가 병목이 될 수 있다.

## Rejected Alternatives

### 1. LLM-only Saju Interpretation

생년월일과 계산 결과를 LLM에 전달하고 자유롭게 풀이하게 하는 방식.

거부 이유:

- 사용 규칙을 추적할 수 없다.
- 동일 입력 재현성이 낮다.
- 계산 사실과 해석 추론이 섞인다.
- 존재하지 않는 규칙/신살을 생성할 위험이 있다.

### 2. One Global Interpretation Algorithm

신강, 격국, 용신을 각각 하나의 전역 결과로 고정하는 방식.

거부 이유:

- 방법론 차이를 표현할 수 없다.
- 향후 유파 비교 또는 정책 변경 시 schema migration이 커진다.

### 3. Static Copy Library

조건마다 미리 작성한 장문의 풀이 문구를 직접 반환하는 방식.

거부 이유:

- 규칙과 문구가 강하게 결합된다.
- 여러 조건이 동시에 적용될 때 중복/모순 제어가 어렵다.
- 근거 추적이 약하다.

### 4. Fortune Score as Universal Output

재물운, 궁합, 오늘의 운세 등을 0~100 단일 점수로 환산하는 방식.

거부 이유:

- pseudo-precision을 만든다.
- 해석의 근거와 다차원성을 숨긴다.
- 점수 자체의 검증 의미가 불분명하다.

## Follow-up

- S8에서 Rule Registry, DerivedFactProvider, Evaluation Pipeline, Claim Store의 실행 구조를 설계한다.
- S9에서 NarrativeEvidenceBundle과 LLM contract를 구체화한다.
- Production Rule 활성화 전 source/provenance 및 fixture gate를 적용한다.
