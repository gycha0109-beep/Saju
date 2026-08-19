# 명화 (Myeonghwa)

독립 사주/만세력 서비스 **명화**의 계산·해석 엔진 저장소입니다.

## 현재 단계

설계 및 검증 단계입니다. 아직 사용자용 웹사이트, 데스크톱 프로그램, 템플릿/패키지 등 최종 전달 형태는 확정하지 않습니다.

현재 우선순위는 특정 UI나 배포 채널에 종속되지 않는 독립 코어를 설계하는 것입니다.

## 핵심 원칙

1. **계산과 해석을 분리합니다.**
   - 생년월일시에서 도출되는 결정론적 계산값은 Calculation Layer가 담당합니다.
   - 용신·신살·성격·직업·재물·관계 등의 해석은 Interpretation Layer가 담당합니다.
   - LLM은 계산 authority가 아니며 구조화된 결과의 설명과 대화만 담당합니다.
2. **계산 결과는 재현 가능해야 합니다.**
   - 엔진 버전, 계산 정책, 입력 정규화 방식과 결과 schema를 기록합니다.
3. **해석에는 출처와 방법론을 남깁니다.**
   - 규칙별 provenance, 유파/방법론, 버전을 추적할 수 있게 설계합니다.
4. **유파 차이를 오류로 취급하지 않습니다.**
   - 결정론적 계산 충돌과 해석 관점 차이를 구분합니다.
   - 상충하는 해석 claim은 평균내거나 덮어쓰지 않고 관계를 보존합니다.
5. **과학적 예측 정확성을 과장하지 않습니다.**
   - 계산 정확도, 명리 해석 일관성, 실제 미래 예측 정확도를 별개의 문제로 취급합니다.
   - 근거 없는 운세/궁합 숫자 점수를 품질 지표처럼 사용하지 않습니다.
6. **모르는 입력을 임의값으로 채우지 않습니다.**
   - 출생시간 미상은 `12:00` 같은 가짜 값으로 대체하지 않습니다.
   - 경계에 따라 결과가 둘 이상 가능하면 `ambiguous` 상태로 보존합니다.
7. **Interpretation Engine은 deterministic 해야 합니다.**
   - 동일한 Snapshot/Pack/Registry/Engine version 조합은 동일한 claim graph를 생성해야 합니다.
   - Rule 실행은 등록 순서가 아니라 dependency DAG를 따릅니다.
8. **LLM은 근거 bundle 밖의 명리 규칙을 생성하지 않습니다.**
   - Canonical Fact와 Interpretation Claim을 선택·설명·비교·문장화하는 역할로 제한합니다.
   - 구조화 출력과 grounding validation을 통과한 Narrative만 사용자에게 전달합니다.

## 계산 코어 후보

현재 결정론적 계산 코어의 우선 후보는 [`yhj1024/manseryeok`](https://github.com/yhj1024/manseryeok) v2.0.0입니다.

직접 의존 여부와 adapter 경계는 검증 설계 후 확정합니다. 외부 라이브러리의 데이터 구조를 명화의 내부 canonical schema로 사용하지 않습니다.

## 목표 아키텍처

```text
Birth Input
  -> Input Normalization
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
  -> Delivery Channel (미정)
```

## 설계 문서

- [01. Domain Boundaries](docs/architecture/01-domain-boundaries.md)
- [02. Canonical Saju Schema](docs/architecture/02-canonical-saju-schema.md)
- [03. Calculation Policy](docs/architecture/03-calculation-policy.md)
- [04. Calculation Adapter Contract](docs/architecture/04-calculation-adapter-contract.md)
- [05. Golden Fixture / Verification Strategy](docs/verification/05-golden-fixture-strategy.md)
- [06. Interpretation Taxonomy](docs/interpretation/06-interpretation-taxonomy.md)
- [07. Rule & Provenance Schema](docs/interpretation/07-rule-provenance-schema.md)
- [08. Interpretation Engine Design](docs/interpretation/08-interpretation-engine-design.md)
- [09. LLM Grounding Contract](docs/llm/09-llm-grounding-contract.md)
- [ADR-0001 — Layered Saju Engine](docs/decisions/ADR-0001-layered-saju-engine.md)
- [ADR-0002 — Provenance-Aware Interpretation Rules](docs/decisions/ADR-0002-provenance-aware-interpretation.md)
- [ADR-0003 — Deterministic Interpretation & Grounded LLM](docs/decisions/ADR-0003-deterministic-interpretation-and-grounded-llm.md)
- [Open-source Engine Baseline](docs/research/open-source-engine-baseline.md)

## 설계 순서

1. Domain Boundary / Architecture — **작성**
2. Canonical Saju Schema — **초안 작성 / uncertainty 모델 보강**
3. Calculation Policy Specification — **초안 작성**
4. Calculation Adapter Contract — **초안 작성**
5. Golden Fixture / Verification Design — **초안 작성**
6. Interpretation Taxonomy — **초안 작성**
7. Rule & Provenance Schema — **초안 작성**
8. Interpretation Engine Design — **초안 작성**
9. LLM Grounding Contract — **초안 작성**
10. Product Delivery / UX
11. Persistence / Privacy / Security
12. MVP Scope 및 구현 계획

## 현재 핵심 미결정 사항

### Calculation

- 명화 표준 `dayBoundary`
- 진태양시 기본 적용 여부
- 균시차/역사적 DST 정책
- 대운 시작점 방법론
- 한국 외 출생 초기 지원 여부
- unknown-time partial derived fact 범위
- KASI 등 primary source 기반 golden fixture 확보 방식

### Interpretation

- 신강/신약 기본 Method Pack의 authority 및 구체 규칙
- 격국 체계와 특수격 포함 범위
- 용신 방법론별 출처 및 우선 노출 방식
- 기본 제공 신살 allowlist
- 사용자-facing domain synthesis 범위와 과도한 단정 방지 정책
- production Rule의 domain expert review 수준

### Runtime / Narrative

- production `maxScenarioCount`
- core/optional Rule Group 구체 목록
- claim type별 materiality 정책
- Narrative structured-output provider 선정
- semantic grounding validator의 초기 구현 범위
- deterministic fallback의 사용자-facing 범위

이 항목들은 구현 convenience가 아니라 방법론, 검증 근거, 재현성, 사용자 안전성을 기준으로 결정합니다.
