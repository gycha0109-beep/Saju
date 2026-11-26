# 명화 (Myeonghwa)

독립 사주/만세력 서비스 **명화**의 계산·해석 엔진 저장소입니다.

최종 전달 형태는 아직 웹사이트, 설치형/운영자 프로그램, PDF·리포트 상품 중 하나로 확정하지 않았습니다. Core는 전달 채널과 독립적으로 설계합니다.

## 현재 상태

### Architecture Foundation

S1~S12 설계 baseline을 작성했습니다.

```text
S1  Domain Boundary / Architecture
S2  Canonical Saju Schema
S3  Calculation Policy
S4  Calculation Adapter Contract
S5  Golden Fixture / Verification Strategy
S6  Interpretation Taxonomy
S7  Rule & Provenance Schema
S8  Interpretation Engine Design
S9  LLM Grounding Contract
S10 Product Delivery / UX Contract
S11 Persistence / Privacy / Security
S12 Engine MVP Scope & Implementation Plan
```

### Implementation

Engine runtime의 I0~I10 코드 경로와 현재 calculation release baseline이 닫혔습니다. 더 넓은 공식 원자료 축적은 I3B 비차단 validation track으로 계속합니다.

```text
I0  Repository / Tooling Bootstrap          STRICT CLOSED
I1  Domain Contracts                       STRICT CLOSED
I2  Manseryeok Adapter                     IMPLEMENTED / VERIFIED
I3A Calculation Release Baseline           STRICT CLOSED
I3B Authority Corpus Expansion             ACTIVE / NON-BLOCKING
I4  Unknown-Time Scenario Planner          STRICT CLOSED
I5  Interpretation Runtime Foundation      STRICT CLOSED
I6  Claim Graph / Interpretation Run       STRICT CLOSED
I7  Source-backed Research Rule Pack       STRICT CLOSED (RESEARCH ONLY)
I8  Narrative Foundation                   STRICT CLOSED
I9A Provider-neutral LLM Runtime           STRICT CLOSED
I9B OpenAI Responses Adapter               IMPLEMENTED / CONTRACT VERIFIED
    Live OpenAI validation                 PENDING CREDENTIAL
I10 Developer Harness E2E                  STRICT CLOSED
```

현재 판정:

```text
ENGINE_MVP_RUNTIME_CODE_PATH       = COMPLETE CANDIDATE
CALCULATION_RELEASE_BASELINE       = STRICT CLOSED
PRODUCTION_INTERPRETATION_CONTENT  = NOT YET AUTHORIZED
PRODUCTION_SAJU_PRODUCT            = NOT YET AUTHORIZED
```

## 구현된 전체 경로

```text
Birth Input
  -> Runtime Validation / CalculationPolicy
  -> Manseryeok Adapter v2.0.0
  -> Canonical Saju Snapshot
  -> Unknown-time Scenario Preservation
  -> Versioned Rule Registry / Method Pack
  -> Deterministic Execution Plan
  -> Rule Evaluations
  -> Interpretation Claims + Claim Relations
  -> Integrity / Completeness Gate
  -> Narrative Evidence Bundle
  -> Provider-neutral NarrativeModelAdapter
  -> OpenAI Responses Adapter (optional injected provider)
  -> Untrusted Structured Output
  -> Runtime NarrativeDraft Parser
  -> Grounding Validator
  -> At Most One Constrained Repair
  -> Deterministic Fallback
  -> NarrativeRun
  -> ReadingArtifact
  -> Future Delivery Adapter
```

## 현재 코드에 포함된 주요 범위

### Calculation

- Node 24 / TypeScript 6 strict project foundation
- reproducible `package-lock.json` + `npm ci` CI gate
- explicit `resolved / ambiguous / unavailable` FactState
- `BirthInput` / `CalculationPolicySnapshot`
- `CanonicalSajuSnapshot`
- `manseryeok` v2.0.0 pinned adapter
- lunar / leap-month conversion boundary
- midnight / jasi / splitJasi day-boundary policies
- true-solar-time options
- Korean historical standard-time / DST handling through the pinned calculation core
- Solar Term context
- unknown-birth-time 1,440-minute enumeration without fabricated noon input
- deterministic CalculationScenario compression
- 2021~2026 KASI official lunar anchors: 12 Tier A fixtures
- KASI institutional 6-year Lichun + 2024 monthly Jie minute-boundary corpus
- KASI institutional leap-month and day-ganji anchors
- Korean 1908/1954/1961 primary legal time references + IANA cross-check
- pre-1908 historical civil-time correction fail-closed guard
- 60-day sexagenary progression property test
- exhaustive 100 stem-to-stem Ten-God relations
- exhaustive 60 day-pillar void-branch mappings

### Interpretation

- versioned Rule / Methodology / InterpretationPack registry
- content-addressed rules, methodologies, packs, and source references
- deterministic dependency DAG
- restricted declarative Rule evaluator
- safe nested RuleOperand projection
- scenario-preserving Rule execution
- InterpretationClaim / ClaimRelation graph
- exact `ruleId@version` execution binding
- conflict preservation and deterministic relation IDs
- Claim Graph integrity gate
- ExecutionCompleteness propagation
- deterministic InterpretationRun identity
- Claim-level EvidenceIndex
- source-backed I7 research-only seasonal-support signal pack
- mandatory scope-guard claim preventing month-only signal overreach

### Narrative / LLM

- scenario-addressable NarrativeEvidenceBundle
- targeted evidence minimization
- deterministic grounding validator
- mandatory ambiguity / conflict / scope disclosures
- deterministic model-independent narrative fallback
- provider-neutral structured model adapter contract
- prompt compiler separating authority instructions from user/evidence data
- runtime parser for untrusted provider output
- exact one-repair policy
- provider failure / invalid repair deterministic fallback
- deterministic NarrativeRun audit identity
- T9 gate for future-tendency assertions

### OpenAI I9B adapter

첫 production-provider baseline은 OpenAI Responses API로 선택했습니다.

```text
provider              OpenAI
endpoint              /v1/responses
default model         gpt-5.6-terra
structured output     json_schema / strict=true
reasoning effort      low
text verbosity        medium
store                  false
```

OpenAI SDK를 runtime dependency로 추가하지 않고 Node 24 native `fetch`를 사용합니다.

Provider output은 Structured Outputs를 사용하더라도 authority로 신뢰하지 않습니다.

```text
OpenAI output
 -> JSON parse
 -> Myeonghwa NarrativeDraft parser
 -> Grounding Validator
 -> accepted OR fallback
```

실제 OpenAI API key를 사용한 live provider validation은 아직 수행하지 않았습니다. `store=false` 또한 Zero Data Retention과 동일한 의미로 취급하지 않습니다.

### Reading / Developer Harness

`ReadingArtifact` assembler와 developer-only E2E harness를 구현했습니다.

```text
runDeveloperHarness()
 -> snapshot
 -> interpretation
 -> evidence
 -> narrative
 -> reading
```

Provider는 주입식이므로 CI에서는 deterministic fixture provider로 전체 경로를 검증합니다.

검증된 E2E 경로:

```text
normal grounded path
provider outage -> deterministic fallback
unknown birth time -> ambiguity preserved to ReadingArtifact
content identity reproducibility across audit timestamps
```

## 핵심 원칙

1. **계산과 해석을 분리합니다.**
   - 결정론적 계산값은 Calculation Layer가 담당합니다.
   - 용신·신살·성격·직업·재물·관계 등의 해석은 Interpretation Layer가 담당합니다.
   - LLM은 계산 authority가 아닙니다.
2. **모르는 입력을 임의값으로 채우지 않습니다.**
   - 출생시간 미상은 `12:00` 같은 가짜 값으로 대체하지 않습니다.
   - 하나의 값을 안전하게 확정할 수 없으면 ambiguity를 보존합니다.
3. **결과는 재현 가능해야 합니다.**
   - 엔진, adapter, 계산 정책, schema, Rule/Pack, prompt compiler, model metadata를 기록합니다.
4. **검증하지 못한 historical correction은 추정하지 않습니다.**
   - 1908-04-01 이전 한국 historical civil-time correction은 현재 fail-closed 합니다.
5. **해석은 provenance-aware rule로 관리합니다.**
   - 규칙별 출처, 방법론, 버전, 품질 상태를 추적합니다.
6. **유파 차이를 오류로 취급하지 않습니다.**
   - 서로 다른 방법론의 claim을 평균내거나 덮어쓰지 않습니다.
7. **Scenario를 몰래 합치지 않습니다.**
   - 출생시간 미상 등으로 발생한 후보 scenario는 명시적으로 격리합니다.
8. **Narrative는 Evidence Bundle 밖으로 나가지 않습니다.**
   - ambiguous fact, conflict, scope guard는 required disclosure 없이 숨길 수 없습니다.
9. **Provider output을 신뢰하지 않습니다.**
   - provider 결과는 `unknown`으로 받고 parser + grounding validator를 통과해야 합니다.
10. **모델 실패는 authority 완화의 이유가 아닙니다.**
    - invalid output은 최대 한 번 repair하며 이후 deterministic fallback으로 종료합니다.
11. **근거 없는 정확도 숫자를 만들지 않습니다.**
    - 계산 정확도, 명리 해석 일관성, 실제 미래 예측 정확도를 별개로 취급합니다.

## 계산 코어

현재 결정론적 계산 adapter는 [`yhj1024/manseryeok`](https://github.com/yhj1024/manseryeok) **v2.0.0**에 pin되어 있습니다.

명화는 upstream 반환 타입을 public Core contract로 노출하지 않습니다. 모든 결과는 명화 Canonical Saju schema로 변환합니다.

검증 authority는 upstream regression과 분리합니다.

```text
Tier A  authoritative / primary reference
Tier B  independent institutional reference
Tier C  cross-engine concordance
Tier D  upstream regression
Tier E  Myeonghwa internal regression
```

I3A release baseline은 닫혔고, I3B에서는 공식 절기 원문·추가 윤달·역사자료·대운 계산 근거를 계속 확장합니다. I3B 확장은 이미 닫힌 I3A를 자동으로 reopen하지 않습니다.

## Interpretation Research

I7의 첫 source-backed corpus는 **research-only**입니다.

현재 범위:

```text
month branch elemental context
+
day stem element
-> seasonal support signal
```

가능한 출력:

```text
same-element support signal
generating-element support signal
overall-strength scope guard
```

아직 production 출력하지 않는 범위:

```text
final strong / weak classification
yongshin
gyeokguk
career / wealth / relationship / health prediction
future-event prediction
```

## 최신 검증 gate

I3A close + 전체 runtime regression gate:

```text
HEAD:          4ae4e084d227e8959a20313467803e803498c3bb
CI run number: 285
run id:        32217659759
job id:        95962091692

npm ci:        PASS
lint:          PASS
TS6 typecheck: PASS
Vitest:        PASS
build:         PASS

Test files:    26 passed
Tests:         174 passed
```

I9B OpenAI adapter 자체는 provider-contract tests를 포함하며, I10 developer E2E도 동일 전체 regression suite에 포함됩니다.

## 구현 Toolchain Baseline

```text
Node.js            24 LTS
TypeScript         6.0.2
ESLint             10.8.0
typescript-eslint  8.66.0
Prettier           3.9.6
Vitest             4.1.10
```

## 주요 문서

### Architecture / Verification

- [01. Domain Boundaries](docs/architecture/01-domain-boundaries.md)
- [02. Canonical Saju Schema](docs/architecture/02-canonical-saju-schema.md)
- [03. Calculation Policy](docs/architecture/03-calculation-policy.md)
- [04. Calculation Adapter Contract](docs/architecture/04-calculation-adapter-contract.md)
- [05. Golden Fixture / Verification Strategy](docs/verification/05-golden-fixture-strategy.md)

### Interpretation / LLM

- [06. Interpretation Taxonomy](docs/interpretation/06-interpretation-taxonomy.md)
- [07. Rule & Provenance Schema](docs/interpretation/07-rule-provenance-schema.md)
- [08. Interpretation Engine Design](docs/interpretation/08-interpretation-engine-design.md)
- [09. LLM Grounding Contract](docs/llm/09-llm-grounding-contract.md)

### Product / Security / Implementation

- [10. Delivery / UX Contract](docs/product/10-delivery-ux-contract.md)
- [11. Persistence / Privacy / Security](docs/security/11-persistence-privacy-security.md)
- [12. Engine MVP Scope & Implementation Plan](docs/implementation/12-mvp-scope-and-implementation-plan.md)
- [I0/I1 Foundation Status](docs/implementation/i0-i1-foundation-status.md)
- [I3 Calculation Verification Status](docs/implementation/i3-calculation-verification-status.md)
- [I4 Unknown-Time Status](docs/implementation/i4-unknown-time-status.md)
- [I5 Rule Engine Foundation Status](docs/implementation/i5-rule-engine-foundation-status.md)
- [I6 Claim Graph / Runtime Status](docs/implementation/i6-claim-graph-runtime-status.md)
- [I7 Source-backed Research Pack Status](docs/implementation/i7-source-backed-research-pack-status.md)
- [I8 Narrative Foundation Status](docs/implementation/i8-narrative-foundation-status.md)
- [I9A Provider-neutral LLM Runtime Status](docs/implementation/i9-provider-neutral-llm-runtime-status.md)
- [I9B OpenAI Responses Adapter Status](docs/implementation/i9b-openai-responses-adapter-status.md)
- [I10 Developer Harness E2E Status](docs/implementation/i10-developer-harness-e2e-status.md)

### Decisions / Research

- [ADR-0001 — Layered Saju Engine](docs/decisions/ADR-0001-layered-saju-engine.md)
- [ADR-0002 — Provenance-Aware Interpretation Rules](docs/decisions/ADR-0002-provenance-aware-interpretation.md)
- [ADR-0003 — Deterministic Interpretation & Grounded LLM](docs/decisions/ADR-0003-deterministic-interpretation-and-grounded-llm.md)
- [ADR-0004 — Initial Toolchain Baseline](docs/decisions/ADR-0004-toolchain-baseline.md)
- [Open-source Engine Baseline](docs/research/open-source-engine-baseline.md)

## 현재 open gate

### Calculation Policy / Authority Expansion

- 명화 production 표준 `dayBoundary`
- 진태양시 기본 적용 여부
- 균시차/역사적 DST 기본 정책
- 대운 시작점의 최종 노출 정책
- 한국 외 출생 초기 지원 여부
- I3B official solar-term / leap-month / historical authority expansion

### Interpretation Content

- 신강/신약 production Method Pack authority
- 격국/특수격 범위
- 용신 방법론별 출처와 노출 정책
- 기본 신살 allowlist
- production Rule domain review 수준

### LLM / Operations

- OpenAI API credential strategy
- live `gpt-5.6-terra` Structured Outputs validation
- provider snapshot model pinning / upgrade policy
- latency / token / cost baseline
- account-level retention / ZDR policy if required
- semantic overstatement detector 범위

### Product

- 웹 / 운영자 프로그램 / standalone / report-template 중 최종 전달 형태
- 회원/결제/재방문 구조
- delivery/security/privacy operating policy

이 open gate들은 Core runtime의 구조적 구현을 무효화하지 않지만, **production 사주 서비스 출시 권한과는 별도**입니다.
