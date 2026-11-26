# ADR-0001 — Layered Saju Engine

- Status: Accepted
- Date: 2026-08-19

## Context

명화는 독립 사주/만세력 서비스로 개발한다.

현재 최종 전달 형태는 웹사이트, 설치형 프로그램, 템플릿/패키지 등으로 확정되지 않았다.

사주 시스템에는 서로 성격이 다른 세 종류의 결과가 존재한다.

1. 생년월일시와 계산 정책에서 결정론적으로 산출되는 값
2. 특정 명리 규칙/유파/방법론을 적용해 도출되는 해석
3. 사용자가 읽는 자연어 설명

이 세 영역을 하나의 LLM prompt나 하나의 외부 오픈소스 엔진에 맡기면 계산 오류, 해석 출처 불명, 회귀 검증 불가, 버전 변경 시 재현 불가 문제가 발생한다.

## Decision

명화 엔진을 다음 계층으로 분리한다.

```text
Input
  -> Normalization
  -> Deterministic Calculation
  -> Canonical Saju Snapshot
  -> Interpretation Rule Engine
  -> Interpretation Claims
  -> Grounded Narrative / LLM
  -> Delivery Channel
```

### Deterministic Calculation

- Calculation authority는 결정론적 코드다.
- 초기 외부 엔진 우선 후보는 `yhj1024/manseryeok` v2.0.0이다.
- 외부 엔진 앞에 명화 adapter를 둔다.

### Canonical Saju Snapshot

- 외부 라이브러리의 반환 타입과 독립된 명화 내부 schema를 사용한다.
- immutable + versioned snapshot으로 관리한다.
- 계산 입력, 정책, 엔진 버전, provenance를 보존한다.

### Interpretation Rule Engine

- 명화가 직접 관리한다.
- rule id/version, methodology/school, required facts, provenance, review status를 추적한다.
- 유파 간 충돌을 정상 상태로 표현할 수 있어야 한다.

### Grounded Narrative / LLM

LLM은 계산 authority가 아니다.

허용:

- 설명
- 요약
- 표현 조정
- 해석 관점 비교
- 구조화된 결과에 대한 Q&A

금지:

- 사주 직접 계산
- canonical fact 수정
- registry에 없는 해석 생성 후 사실화
- 누락된 출생정보 추측

## Consequences

### Positive

- 계산 결과 회귀 검증 가능
- 외부 엔진 교체 가능
- rule provenance 추적 가능
- 해석 유파 병렬 지원 가능
- LLM 교체가 계산 정확도에 영향을 주지 않음
- 최종 제공 채널이 바뀌어도 core 유지 가능

### Cost

- 단순 `오픈소스 엔진 -> LLM` 구조보다 초기 설계/구현량 증가
- canonical mapping과 adapter 테스트 필요
- interpretation rule registry 구축 비용 발생
- provenance 관리 필요

이 비용은 실서비스의 재현성, 설명 가능성, 유지보수성을 위해 수용한다.

## Rejected Alternatives

### A. LLM 단독 사주 계산/해석

거부 이유:

- deterministic calculation 보장 불가
- hallucination과 rule drift
- 회귀 테스트 어려움
- 계산/해석 경계 불명

### B. `manseryeok` 반환 객체를 서비스 domain model로 직접 사용

거부 이유:

- 외부 package coupling
- breaking change 전파
- 명화의 schema/versioning 통제 상실

### C. `fortuneteller` 전체를 계산+해석 엔진으로 채택

거부 이유:

- 계산 authority와 해석 heuristic이 혼합됨
- 검증 gate 수준이 명화 요구사항에 부족함
- 해석 provenance가 명화 기준에 부족함
- 현재 라이선스 상태 추가 확인 필요

## Follow-up

1. Canonical schema 검토/확정
2. Calculation Policy 미결정 항목 조사
3. manseryeok Adapter Contract
4. Golden Fixture / Verification Design
5. Interpretation Taxonomy 및 Rule Schema
