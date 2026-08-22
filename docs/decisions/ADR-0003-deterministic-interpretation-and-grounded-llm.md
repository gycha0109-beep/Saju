# ADR-0003 — Deterministic Interpretation Engine and Grounded LLM Boundary

- Status: Accepted
- Date: 2026-08-19

## Context

명화는 계산값, 명리 해석, 사용자용 자연어 표현을 서로 다른 correctness 영역으로 다뤄야 한다.

LLM에게 생년월일시와 일반적인 "사주 봐줘" 프롬프트만 전달하면 다음 문제가 발생한다.

- 계산 재현성 상실
- 존재하지 않는 명리 규칙 생성 가능성
- 유파 차이 은폐
- 출생시간/경계 ambiguity 임의 확정
- 결과의 출처 및 Rule 추적 불가
- 모델 교체 시 해석 자체가 변함

또한 Interpretation Rule을 등록 순서대로 실행하거나 하나의 거대한 함수로 구성하면 Rule dependency, provenance, conflict, 부분 실패를 정확하게 관리하기 어렵다.

## Decision

### 1. Interpretation Engine은 deterministic runtime으로 구성한다

동일한 다음 입력은 동일한 claim graph를 생성해야 한다.

```text
Canonical Snapshot
+ Derived Fact version
+ Interpretation Pack version
+ Registry Snapshot
+ Composition Policy
+ Interpretation Engine version
```

### 2. Rule 실행은 dependency-aware DAG로 계획한다

파일 순서나 등록 순서에 의존하지 않는다.

Cycle, missing version, invalid dependency는 configuration failure로 처리한다.

### 3. Ambiguity는 임의 확정하지 않는다

Rule별로 다음 중 하나를 사용한다.

```text
requires_resolved
invariant_across_candidates
scenario_preserving
```

후보 전체에서 동일한 결론만 안전한 확정 claim으로 유지한다.

### 4. Interpretation 결과는 Claim Graph로 존재한다

LLM 호출 전에 다음이 완성되어야 한다.

```text
RuleEvaluation
InterpretationClaim
ClaimRelation
ExecutionCompleteness
NarrativeEvidenceBundle
```

### 5. LLM은 Narrative Layer로만 사용한다

LLM은 다음을 수행할 수 있다.

- 설명
- 요약
- 비교
- 질문응답
- 자연어 문장화

다음은 수행할 수 없다.

- 사주팔자 재계산
- Canonical Fact 수정
- 새로운 명리 규칙 생성
- methodology conflict 임의 해결
- ambiguity 임의 확정
- 근거 없는 미래 사건 보장

### 6. LLM 출력은 구조화된 Draft를 먼저 생성한다

최종 HTML/Markdown을 바로 생성하지 않는다.

```text
NarrativeEvidenceBundle
 -> LLM
 -> NarrativeDraft
 -> Grounding Validation
 -> Policy Validation
 -> Renderer
```

### 7. 핵심 assertion은 evidence reference를 가져야 한다

Narrative의 의미 있는 명리 assertion은 canonical fact 또는 interpretation claim을 참조해야 한다.

### 8. Validation 실패 시 fail closed 한다

무제한 재시도하지 않는다.

초기 정책은:

```text
first generation
 -> validate
 -> one constrained repair
 -> validate
 -> deterministic fallback or failure
```

으로 한다.

## Consequences

### Positive

- 모델 provider를 바꿔도 명리 해석 authority가 유지된다.
- 과거 Reading의 원인을 Rule/Source까지 역추적할 수 있다.
- 출생시간 미상과 유파 차이를 정직하게 표현할 수 있다.
- LLM hallucination이 계산/해석 데이터 자체를 오염시키지 않는다.
- 웹/프로그램/PDF/채팅 등 전달 채널을 독립적으로 변경할 수 있다.

### Cost

- 단순 `prompt -> answer` 구조보다 구현량이 많다.
- Rule Registry, execution planner, claim graph, validator가 필요하다.
- Narrative fixture와 grounding test corpus가 필요하다.

이 비용은 서비스의 재현성·설명가능성·교체가능성을 위해 수용한다.

## Rejected Alternatives

### A. LLM-only Saju

거부. 계산과 해석의 authority가 모델 내부에 섞인다.

### B. Calculation engine + raw result -> LLM

거부. 해석 Rule provenance가 사라진다.

### C. One giant interpretation function

거부. 유파/방법론 버전과 conflict를 분리하기 어렵다.

### D. Pick one ambiguous candidate

거부. 존재하지 않는 정확성을 만든다.

### E. Let the LLM resolve conflicts

거부. LLM이 domain authority가 된다.

## Related Documents

- `docs/interpretation/06-interpretation-taxonomy.md`
- `docs/interpretation/07-rule-provenance-schema.md`
- `docs/interpretation/08-interpretation-engine-design.md`
- `docs/llm/09-llm-grounding-contract.md`
