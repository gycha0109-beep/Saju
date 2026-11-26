# I9B — OpenAI Responses Adapter Status

Date: 2026-08-19

## Terminal

```text
I9B_OPENAI_RESPONSES_ADAPTER_IMPLEMENTED_AND_CONTRACT_VERIFIED
LIVE_PROVIDER_VALIDATION_REMAINS_CREDENTIAL_GATED
```

I9B는 OpenAI를 명화의 첫 production-provider baseline으로 선택한 뒤, provider-neutral I9A 계약을 실제 OpenAI Responses API request/response 경계에 연결한다.

현재 상태는 **코드/계약 검증 완료**이며, 실제 OpenAI 계정에 비용이 발생하는 live call은 아직 수행하지 않았다.

---

## 1. Provider baseline

```text
provider              OpenAI
API                   Responses API
endpoint              https://api.openai.com/v1/responses
default model         gpt-5.6-terra
reasoning effort      low
text verbosity        medium
max output tokens     4,000 default
timeout               60,000 ms default
response storage      store=false
structured output     json_schema / strict=true
```

`gpt-5.6-terra`는 현재 baseline alias다.

명화의 provider-level strict reproducibility를 위해서는 향후 실제 운영 시 OpenAI가 제공하는 구체적인 snapshot model ID를 검토하고, 선택한 snapshot을 `model` 자체에 pin해야 한다. `modelRevision` metadata는 audit field일 뿐 provider-side snapshot pin을 대신하지 않는다.

---

## 2. Dependency policy

OpenAI SDK를 runtime dependency로 추가하지 않았다.

```text
Node 24 native fetch
  -> POST /v1/responses
```

를 사용한다.

이유:

- provider adapter surface가 작다.
- package-lock/runtime dependency를 불필요하게 확대하지 않는다.
- OpenAI-specific SDK object를 Core public contract로 누출하지 않는다.
- provider-neutral `NarrativeModelAdapter` 경계를 유지한다.

현재 runtime dependency는 기존 `manseryeok` pin과 분리되어 유지된다.

---

## 3. Authority boundary

OpenAI adapter가 추가되어도 authority 구조는 바뀌지 않는다.

```text
Canonical Fact
  -> Interpretation Claim
  -> NarrativeEvidenceBundle
  -> OpenAI Responses Adapter
  -> untrusted unknown output
  -> JSON parse
  -> NarrativeDraft runtime parser
  -> Grounding Validator
  -> accepted narrative OR deterministic fallback
```

OpenAI model은 다음 authority를 갖지 않는다.

```text
사주 재계산
Canonical Fact 수정
새 명리 Rule 생성
Evidence Bundle 밖 claim 생성
methodology conflict 임의 해소
출생시간 ambiguity 임의 선택
```

Structured Outputs는 구조적 형식을 강화할 뿐 명리 정확성이나 grounding correctness의 authority가 아니다.

---

## 4. Prompt/data separation

Responses request는 두 role로 분리한다.

### developer role

고정 authority constraint와 NarrativePolicy의 구조적 표현만 포함한다.

### user role

다음 데이터를 JSON envelope로 전달한다.

```text
request metadata
Evidence Bundle
userRequest
repair context when present
```

Evidence/user/source string에 instruction처럼 보이는 문자열이 들어 있어도 data로 취급한다.

사용자 입력을 developer authority string에 interpolation하지 않는다.

---

## 5. Structured Output schema

`NarrativeDraft`용 OpenAI JSON Schema를 별도로 둔다.

```text
src/llm/openai/narrative-draft-json-schema.ts
```

원칙:

```text
strict=true
additionalProperties=false
all object properties required
supported structural subset 중심
type / enum / required / anyOf 중심
```

TypeScript contract에서 optional인 값은 provider schema에서는 빈 배열/빈 문자열 같은 명시값을 사용하게 할 수 있다.

비어 있으면 안 되는 의미적 제약은 기존 runtime parser/grounding validator가 다시 검증한다.

즉:

```text
OpenAI schema acceptance
!=
Myeonghwa narrative acceptance
```

이다.

---

## 6. Generation parameter policy

Provider-neutral contract에는 `temperature`가 존재하지만, 현재 GPT-5.6 baseline adapter는 이를 조용히 전달하지 않는다.

`temperature`가 전달되면:

```text
CONFIGURATION_ERROR
```

로 fail-closed 한다.

현재 provider-specific 조정축은:

```text
reasoningEffort
verbosity
maxOutputTokens
```

이다.

---

## 7. Provider failure model

다음 상태를 명시적으로 구분한다.

```text
CONFIGURATION_ERROR
HTTP_ERROR
NETWORK_ERROR
TIMEOUT
RESPONSE_INVALID
RESPONSE_INCOMPLETE
RESPONSE_REFUSED
OUTPUT_MISSING
OUTPUT_JSON_INVALID
```

Provider error는 I9A orchestrator에서 deterministic fallback으로 전파된다.

Refusal text 또는 credential을 사용자-facing/error message에 불필요하게 echo하지 않는다.

`x-request-id`가 있으면 provider troubleshooting metadata로 캡처할 수 있다.

---

## 8. Privacy / retention note

Request에는:

```text
store=false
```

를 고정한다.

그러나 이것을 Zero Data Retention과 동일한 것으로 간주하지 않는다.

OpenAI 계정/조직 차원의 retention 정책과 ZDR eligibility는 별도 운영/계약 항목이다.

명화 Core는 API key를 source, fixture, test, ReadingArtifact에 저장하지 않는다.

---

## 9. Verification

### CI contract gate

```text
CI run number: 236
run id:        32212685282
job id:        95948295896

npm ci:        PASS
lint:          PASS
TS6 typecheck: PASS
Vitest:        PASS
build:         PASS

Test files:    19 passed
Tests:         123 passed
```

OpenAI adapter 전용 테스트:

```text
test/openai-responses-adapter.test.ts
10 tests PASS
```

검증 범위:

```text
strict Responses request shape
default Terra model
store=false
reasoning/verbosity mapping
max output token mapping
developer/user data separation
malicious instruction-like user text isolation
organization/project routing headers
unsupported temperature fail-closed
HTTP error mapping
request-id capture
credential non-leakage
provider refusal mapping
incomplete response mapping
malformed output JSON mapping
network failure mapping
non-JSON response mapping
configuration validation
```

---

## 10. Live validation gap

현재 CI는 provider transport를 deterministic fake `fetch`로 검증한다.

따라서 다음은 아직 실증하지 않았다.

```text
actual OpenAI credential authentication
actual gpt-5.6-terra availability for the project
provider-side acceptance of the exact JSON Schema
real structured-output first-pass rate
real repair rate
real refusal behavior
latency
token usage
per-reading cost
rate-limit behavior
actual request-id operational logging
```

이 항목은 실제 API key와 외부 비용이 필요하므로 별도 live gate다.

---

## 11. I9B 판정

```text
Provider choice                      CLOSED
OpenAI adapter implementation        CLOSED
Responses request contract           CLOSED
Structured-output contract tests     CLOSED
Provider error semantics             CLOSED
Credential leakage test              CLOSED
CI                                  GREEN
Live paid/provider validation        OPEN
```

따라서 I9B를 다음처럼 표기한다.

```text
IMPLEMENTED / CONTRACT VERIFIED
LIVE VALIDATION PENDING CREDENTIAL
```

Live validation 미실행은 I10의 offline/injected-provider Engine E2E를 막지 않는다.
