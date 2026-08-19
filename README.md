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

현재 I0~I9A foundation이 구현되어 있습니다.

```text
I0  Repository / Tooling Bootstrap          STRICT CLOSED
I1  Domain Contracts                       STRICT CLOSED
I2  Manseryeok Adapter                     IMPLEMENTED / VERIFIED
I3  Calculation Verification               IN PROGRESS
I4  Unknown-Time Scenario Planner          STRICT CLOSED
I5  Interpretation Runtime Foundation      STRICT CLOSED
I6  Claim Graph / Interpretation Run       STRICT CLOSED
I7  Source-backed Research Rule Pack       STRICT CLOSED (RESEARCH ONLY)
I8  Narrative Foundation                   STRICT CLOSED
I9A Provider-neutral LLM Runtime           STRICT CLOSED
I9B Production Provider Adapter            USER DECISION REQUIRED
I10 Developer Harness E2E
```

현재 코드에 포함된 주요 범위:

- Node 24 / TypeScript 6 strict project foundation
- reproducible `package-lock.json` + `npm ci` CI gate
- explicit `resolved / ambiguous / unavailable` FactState
- `BirthInput` / `CalculationPolicySnapshot`
- `CanonicalSajuSnapshot`
- `manseryeok` v2.0.0 calculation adapter
- lunar / leap-month conversion boundary
- midnight / jasi / splitJasi day-boundary policies
- true-solar-time options
- Korean historical standard-time / DST handling through the pinned calculation core
- Solar Term context
- unknown-birth-time 1,440-minute enumeration without fabricated noon input
- deterministic CalculationScenario compression
- versioned Rule / Methodology / InterpretationPack registry
- content-addressed rules, methodologies, packs, and source references
- deterministic dependency DAG
- restricted declarative Rule evaluator
- safe nested RuleOperand projection
- scenario-preserving Rule execution
- InterpretationClaim / ClaimRelation graph
- conflict preservation and deterministic relation IDs
- exact `ruleId@version` execution binding
- Claim Graph integrity gate
- ExecutionCompleteness propagation
- deterministic InterpretationRun identity
- Claim-level EvidenceIndex
- source-backed I7 research-only seasonal-support signal pack
- mandatory scope-guard claim preventing month-only signal overreach
- scenario-addressable NarrativeEvidenceBundle
- targeted evidence minimization
- deterministic narrative grounding validator
- mandatory ambiguity / conflict / scope disclosures
- deterministic model-independent narrative fallback
- provider-neutral structured model adapter contract
- prompt compiler with separated authority instructions and user data
- runtime parser for untrusted model output
- exact one-repair policy for invalid model output
- provider failure / invalid repair deterministic fallback
- deterministic NarrativeRun audit identity
- T9 gate for future-tendency narrative assertions

아직 **실제 명리 해석 규칙을 production authority로 승인하지 않았습니다.** I7 corpus는 research-only이며 production pack으로 단순 승격할 수 없도록 fail-closed 되어 있습니다.

또한 실제 production LLM provider/model/API credential은 아직 선택하지 않았습니다. I9A는 provider-neutral runtime만 검증한 상태입니다.

## 핵심 원칙

1. **계산과 해석을 분리합니다.**
   - 생년월일시에서 도출되는 결정론적 계산값은 Calculation Layer가 담당합니다.
   - 용신·신살·성격·직업·재물·관계 등의 해석은 Interpretation Layer가 담당합니다.
   - LLM은 계산 authority가 아닙니다.
2. **모르는 입력을 임의값으로 채우지 않습니다.**
   - 출생시간 미상은 `12:00` 같은 가짜 값으로 대체하지 않습니다.
   - 하나의 값을 안전하게 확정할 수 없으면 ambiguity를 보존합니다.
3. **계산 결과는 재현 가능해야 합니다.**
   - 엔진, adapter, 계산 정책, schema version을 기록합니다.
4. **해석은 provenance-aware rule로 관리합니다.**
   - 규칙별 출처, 방법론, 버전, 품질 상태를 추적합니다.
5. **유파 차이를 오류로 취급하지 않습니다.**
   - 서로 다른 방법론의 claim을 평균내거나 덮어쓰지 않습니다.
6. **Interpretation Engine은 deterministic 합니다.**
   - 동일 Snapshot/Pack/Registry/Engine version은 동일한 claim graph를 만들어야 합니다.
7. **Scenario를 몰래 합치지 않습니다.**
   - 출생시간 미상 등으로 발생한 후보 scenario는 명시적으로 격리합니다.
8. **Narrative는 Evidence Bundle 밖으로 나가지 않습니다.**
   - Evidence Selector는 필요한 claim/fact/context만 선택합니다.
   - ambiguous fact, conflict, scope guard는 disclosure 없이 사용자 주장으로 숨길 수 없습니다.
9. **LLM은 Evidence Bundle 밖의 명리 규칙을 생성하지 않습니다.**
   - 설명, 비교, 요약, 질문응답, 문장화에 한정합니다.
   - provider 출력은 `unknown`으로 취급하고 runtime parser + grounding validator를 통과해야 합니다.
10. **모델 실패는 authority 완화의 이유가 아닙니다.**
    - invalid output은 최대 한 번 repair합니다.
    - repair 실패나 provider failure은 deterministic fallback으로 종료합니다.
11. **근거 없는 정확도 숫자를 만들지 않습니다.**
    - 계산 정확도, 명리 해석 일관성, 실제 미래 예측 정확도를 별개로 취급합니다.

## 목표 아키텍처

```text
Birth Input
  -> Input Validation / Normalization
  -> Calculation Planner
  -> Manseryeok Adapter
  -> Canonical Saju Snapshot
  -> Derived Structural Facts
  -> Versioned Rule Registry / Method Packs
  -> Deterministic Execution Plan
  -> Rule Evaluations
  -> Interpretation Claims + Claim Relations
  -> Integrity / Completeness Gate
  -> Narrative Evidence Bundle
  -> provider-neutral Structured Model Adapter
  -> untrusted NarrativeDraft output
  -> Runtime Parser
  -> Grounding / Policy Validation
  -> at most one constrained repair
  -> deterministic fallback if required
  -> ReadingArtifact
  -> Delivery Adapter
```

## 계산 코어

현재 결정론적 계산 adapter는 [`yhj1024/manseryeok`](https://github.com/yhj1024/manseryeok) **v2.0.0**에 pin되어 있습니다.

명화는 upstream 반환 타입을 public Core contract로 노출하지 않습니다. 모든 결과는 명화의 Canonical Saju schema로 변환합니다.

검증 authority는 upstream regression과 분리합니다.

```text
Tier A  authoritative / primary reference
Tier B  independent institutional reference
Tier C  cross-engine concordance
Tier D  upstream regression
Tier E  Myeonghwa internal regression
```

현재 KASI / IANA 기반 fixture provenance를 별도로 관리하며 I3에서 authoritative corpus를 계속 확장합니다.

## Interpretation Research

I7에서 첫 source-backed corpus를 추가했지만 **research-only**입니다.

현재 범위:

```text
month branch elemental context
+
day stem element
-> seasonal support signal
```

가능한 출력도 다음으로 제한합니다.

```text
same-element support signal
generating-element support signal
overall-strength scope guard
```

다음은 아직 출력하지 않습니다.

```text
final strong / weak classification
yongshin
gyeokguk
career / wealth / relationship / health prediction
future-event prediction
```

## Narrative Foundation

I8은 LLM 없이 먼저 narrative authority boundary를 구현했습니다.

```text
InterpretationRun
-> Evidence Selector
-> scenario-addressable NarrativeEvidenceBundle
-> Grounding Validator
-> deterministic fallback
```

다음은 deterministic validation fail 대상입니다.

```text
unknown evidence ref
inactive claim evidence
ambiguous fact asserted as deterministic
interpretation claim relabeled as deterministic fact
future tendency without a T9 time-dynamic claim
missing methodology attribution
missing calculation ambiguity disclosure
missing conflict disclosure
missing scope-limitation disclosure
```

Targeted reading은 upstream dependency와 material relation만 포함하며 downstream claim을 역으로 끌어오지 않습니다.

## Provider-neutral LLM Runtime

I9A는 특정 LLM 회사나 SDK에 종속되지 않는 실행 경계를 구현했습니다.

```text
GroundedNarrativeRequest
-> Prompt Compiler
-> NarrativeModelAdapter
-> provider output: unknown
-> NarrativeDraft Parser
-> Grounding Validator
-> one repair maximum
-> deterministic fallback
-> NarrativeRun
```

User text와 source/evidence 문자열은 prompt authority instructions와 분리하여 data로 전달합니다.

실제 provider가 예외를 내면 repair를 시도하지 않고 deterministic fallback으로 종료합니다. Provider가 정상 응답했지만 구조적으로 잘못된 값을 반환하면 정확히 한 번 repair합니다. 세 번째 모델 호출은 없습니다.

## 구현 Toolchain Baseline

```text
Node.js            24 LTS
TypeScript         6.0.2
ESLint             10.8.0
typescript-eslint  8.66.0
Prettier           3.9.6
Vitest             4.1.10
```

TypeScript 7은 stable이지만 현재 lint/tooling 공식 지원 상태를 고려해 초기 baseline에서는 보류합니다. 근거와 upgrade policy는 ADR-0004에 기록합니다.

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
- [I9 Provider-neutral LLM Runtime Status](docs/implementation/i9-provider-neutral-llm-runtime-status.md)

### Decisions / Research

- [ADR-0001 — Layered Saju Engine](docs/decisions/ADR-0001-layered-saju-engine.md)
- [ADR-0002 — Provenance-Aware Interpretation Rules](docs/decisions/ADR-0002-provenance-aware-interpretation.md)
- [ADR-0003 — Deterministic Interpretation & Grounded LLM](docs/decisions/ADR-0003-deterministic-interpretation-and-grounded-llm.md)
- [ADR-0004 — Initial Toolchain Baseline](docs/decisions/ADR-0004-toolchain-baseline.md)
- [Open-source Engine Baseline](docs/research/open-source-engine-baseline.md)

## 현재 미결정 사항

### Calculation Methodology

- 명화 production 표준 `dayBoundary`
- 진태양시 기본 적용 여부
- 균시차/역사적 DST 기본 정책
- 대운 시작점의 최종 노출 정책
- 한국 외 출생 초기 지원 여부
- 추가 primary-source golden fixture 확보 범위

### Interpretation Content

- 신강/신약 기본 Method Pack authority
- 격국/특수격 범위
- 용신 방법론별 출처와 노출 정책
- 기본 신살 allowlist
- production Rule의 domain review 수준

### LLM / Narrative

- **production LLM provider / model (I9B decision gate)**
- provider credential strategy
- provider-specific structured-output adapter
- provider-specific retry/quota/error mapping
- semantic overstatement detector 범위

### Product

- 웹 / 운영자 프로그램 / standalone / report-template 중 최종 전달 형태
- 회원/결제/재방문 구조

이 항목들은 Core infrastructure 구현을 임의로 막지 않되, production 결과를 확정하기 전에 근거와 정책을 별도로 고정합니다.
