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

I0/I1 구현 foundation을 시작했습니다.

현재 코드에 포함된 범위:

- Node/TypeScript project scaffold
- strict compiler configuration
- ESLint / Prettier / Vitest configuration
- GitHub Actions CI workflow
- versioned common references
- explicit `resolved / ambiguous / unavailable` fact states
- `BirthInput`
- `CalculationPolicySnapshot`
- `CanonicalSajuSnapshot`
- Rule / Methodology / Interpretation Pack contracts
- RuleEvaluation / InterpretationClaim / ClaimRelation contracts
- grounded Narrative contracts
- channel-neutral `ReadingArtifact`
- runtime boundary validation
- unknown birth time regression tests

아직 `manseryeok` 계산 호출은 연결하지 않았습니다. I0/I1 검증 후 I2에서 Adapter를 구현합니다.

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
7. **LLM은 Evidence Bundle 밖의 명리 규칙을 생성하지 않습니다.**
   - 설명, 비교, 요약, 질문응답, 문장화에 한정합니다.
8. **근거 없는 정확도 숫자를 만들지 않습니다.**
   - 계산 정확도, 명리 해석 일관성, 실제 미래 예측 정확도를 별개로 취급합니다.

## 목표 아키텍처

```text
Birth Input
  -> Input Validation / Normalization
  -> Calculation Planner
  -> Deterministic Calculation Adapter
  -> Canonical Saju Snapshot
  -> Derived Structural Facts
  -> Interpretation Execution Plan
  -> Versioned Rules / Method Packs
  -> Rule Evaluations
  -> Interpretation Claims + Claim Relations
  -> Integrity / Completeness Gate
  -> Narrative Evidence Bundle
  -> Grounded LLM Structured Draft
  -> Grounding / Policy Validation
  -> ReadingArtifact
  -> Delivery Adapter
```

## 계산 코어 후보

결정론적 계산 코어의 우선 후보는 [`yhj1024/manseryeok`](https://github.com/yhj1024/manseryeok) v2.0.0입니다.

명화는 upstream 반환 타입을 내부 canonical schema로 직접 노출하지 않습니다. I2에서 Adapter 뒤에 격리합니다.

## 구현 Toolchain Baseline

현재 I0 baseline:

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

### Decisions

- [ADR-0001 — Layered Saju Engine](docs/decisions/ADR-0001-layered-saju-engine.md)
- [ADR-0002 — Provenance-Aware Interpretation Rules](docs/decisions/ADR-0002-provenance-aware-interpretation.md)
- [ADR-0003 — Deterministic Interpretation & Grounded LLM](docs/decisions/ADR-0003-deterministic-interpretation-and-grounded-llm.md)
- [ADR-0004 — Initial Toolchain Baseline](docs/decisions/ADR-0004-toolchain-baseline.md)
- [Open-source Engine Baseline](docs/research/open-source-engine-baseline.md)

## 구현 Roadmap

```text
I0  Repository / Tooling Bootstrap          IN PROGRESS
I1  Domain Contracts                       IN PROGRESS
I2  Manseryeok Adapter
I3  Calculation Verification
I4  Unknown-Time Scenario Planner
I5  Interpretation Runtime Skeleton
I6  Claim Graph
I7  Source-backed Research Rule Pack
I8  Narrative Foundation
I9  LLM Adapter
I10 Developer Harness E2E
```

I0/I1은 외부 계산 엔진을 호출하지 않고 architecture contract를 executable code로 고정하는 단계입니다.

## 현재 미결정 사항

### Calculation Methodology

- 명화 표준 `dayBoundary`
- 진태양시 기본 적용 여부
- 균시차/역사적 DST 정책
- 대운 시작점 방법론
- 한국 외 출생 초기 지원 여부
- KASI 등 primary-source golden fixture 확보 방식

### Interpretation Content

- 신강/신약 기본 Method Pack authority
- 격국/특수격 범위
- 용신 방법론별 출처와 노출 정책
- 기본 신살 allowlist
- production Rule의 domain review 수준

### Product

- 웹 / 운영자 프로그램 / standalone / report-template 중 최종 전달 형태
- 회원/결제/재방문 구조

이 항목들은 Core 구현을 임의로 막지 않되, production 결과를 확정하기 전에 근거와 정책을 별도로 고정합니다.
