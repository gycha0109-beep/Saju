# I10 — Developer Harness E2E Status

Date: 2026-08-19

## Terminal

```text
I10_DEVELOPER_HARNESS_E2E_STRICT_CLOSED
ENGINE_MVP_CODE_PATH_COMPLETION_CANDIDATE_REACHED
```

I10은 제품 UI가 아니라 명화 Core의 전체 실행 경로를 한 번에 검증하는 developer-only harness를 구현한다.

---

## 1. Implemented flow

```text
BirthInput
  -> CalculationPolicy
  -> CanonicalSajuSnapshot
  -> Interpretation Registry / Pack
  -> InterpretationRun / Claims / Relations
  -> NarrativeEvidenceBundle
  -> injected NarrativeModelAdapter
  -> parser / grounding / repair-or-fallback
  -> NarrativeRun
  -> ReadingArtifact
```

`runDeveloperHarness()`는 최종 Reading만 반환하지 않고 다음 audit surface를 함께 반환한다.

```text
snapshot
interpretation
evidence
narrative
reading
```

따라서 E2E 실패 시 어느 authority layer에서 문제가 발생했는지 추적할 수 있다.

---

## 2. Provider injection

Harness는 특정 provider를 내부에서 생성하지 않는다.

```text
NarrativeModelAdapter
```

를 외부에서 주입한다.

CI에서는 deterministic fixture adapter를 사용한다.

실제 운영에서는 I9B OpenAI adapter를 같은 interface로 주입할 수 있다.

이 구조 때문에:

```text
OpenAI credential 없음
```

이 Engine E2E 자체를 막지 않는다.

---

## 3. ReadingArtifact assembler

새로운 channel-neutral assembler를 추가했다.

```text
src/reading/reading-assembler.ts
```

역할:

```text
Canonical calculation state
+
Interpretation audit state
+
validated NarrativeDraft
+
NarrativeRun
  -> ReadingArtifact
```

### 보존하는 정보

```text
readingId
reading status
birth input display
pillar display state
calculation ambiguity summary
narrative sections
mandatory disclosures
explainability index
snapshot / interpretation / narrative provenance
reading version
```

### 보존하지 않는 것

ReadingArtifact는 다음을 새로 계산하거나 해석하지 않는다.

```text
new Saju facts
new interpretation claims
new methodology decisions
new future predictions
```

Delivery view model assembler일 뿐이다.

---

## 4. Identity binding

ReadingArtifact 조립 시 다음 관계를 fail-closed 검증한다.

```text
InterpretationRun.snapshotId == CanonicalSnapshot.snapshotId
NarrativeRun.interpretationRunId == InterpretationRun.interpretationRunId
```

서로 다른 run의 결과를 우연히 조합할 수 없다.

`readingId`는 content/version provenance에서 deterministic하게 생성하며 `generatedAt`은 ID material에 넣지 않는다.

따라서 동일 content-derived pipeline은 audit timestamp가 달라도 동일 Reading identity를 유지한다.

---

## 5. Ambiguity preservation

Unknown birth time fixture에서:

```text
birthTimeKnown = false
hour pillar = unavailable
jasi-sensitive day pillar = ambiguous
```

가 최종 ReadingArtifact까지 유지된다.

Harness 또는 Reading assembler가:

```text
12:00
```

같은 가짜 시간을 생성하지 않는다.

사용자-facing state는:

```text
partially_ambiguous
ready_with_ambiguity
```

처럼 구조화한다.

---

## 6. Provider failure behavior

Injected provider가 예외를 발생시키면:

```text
Calculation       preserved
Interpretation    preserved
Evidence          preserved
Narrative         deterministic fallback
Reading status    narrative_fallback
```

으로 종료된다.

즉 LLM outage가 Calculation/Interpretation authority를 손상시키지 않는다.

---

## 7. Explainability projection

Validated Narrative assertion/comparison의 evidence를 ReadingArtifact의 `ExplainabilityIndex`로 투영한다.

기본 연결:

```text
Reading section
  -> explainabilityRef
  -> claimIds
  -> factRefs
  -> methodologyIds
  -> sourceIds
```

Delivery layer가 내부 RuleExpression 전체를 노출하지 않고도 “왜 이렇게 나왔는가?” drill-down을 구현할 수 있는 최소 연결을 보존한다.

---

## 8. E2E verification

### CI close gate

```text
CI run number: 250
run id:        32212973712
job id:        95949113508

npm ci:        PASS
lint:          PASS
TS6 typecheck: PASS
Vitest:        PASS
build:         PASS

Test files:    20 passed
Tests:         127 passed
```

I10 E2E test:

```text
test/developer-harness-e2e.test.ts
4 tests PASS
```

검증 경로:

### E2E-1 normal grounded path

```text
input
 -> snapshot
 -> claims
 -> evidence
 -> validated model draft
 -> ReadingArtifact
```

### E2E-2 provider outage

```text
provider throw
 -> one provider call
 -> deterministic fallback
 -> narrative_fallback ReadingArtifact
```

### E2E-3 unknown birth time

```text
unknown time
 -> no fabricated hour
 -> ambiguity preserved
 -> final ReadingArtifact reflects unavailable/ambiguous state
```

### E2E-4 reproducibility

서로 다른 audit timestamp에서:

```text
snapshotId                SAME
calculationHash           SAME
interpretationRunId       SAME
evidenceBundleHash        SAME
narrativeRunId            SAME
readingId                 SAME
generatedAt               DIFFERENT
```

을 검증한다.

---

## 9. I10 판정

```text
Developer orchestration     CLOSED
ReadingArtifact assembler   CLOSED
Normal E2E path             CLOSED
Fallback E2E path           CLOSED
Unknown-time E2E path       CLOSED
Reproducibility E2E         CLOSED
CI                          GREEN
```

따라서:

```text
I10 = STRICT CLOSED
```

이다.

---

## 10. Engine MVP와 production readiness는 다르다

I10 완료로 다음 **코드 경로**는 연결됐다.

```text
Birth Input -> ReadingArtifact
```

그러나 이것은 production 사주 서비스가 완성되었다는 뜻이 아니다.

여전히 별도 open gate가 있다.

```text
I3 authoritative calculation corpus expansion
production calculation defaults
production interpretation methodology corpus
production domain review
I9B live OpenAI provider validation
product / delivery track decision
security / privacy operations
```

특히 현재 I7 corpus는 research-only이며 생활/미래 예측을 production authority로 제공하지 않는다.

따라서 현재 판정은:

```text
ENGINE_MVP_RUNTIME_CODE_PATH = COMPLETE CANDIDATE
PRODUCTION_SAJU_PRODUCT = NOT YET AUTHORIZED
```

이다.
