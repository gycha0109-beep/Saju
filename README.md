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
5. **과학적 예측 정확성을 과장하지 않습니다.**
   - 계산 정확도, 명리 해석 일관성, 실제 미래 예측 정확도를 별개의 문제로 취급합니다.

## 계산 코어 후보

현재 결정론적 계산 코어의 우선 후보는 [`yhj1024/manseryeok`](https://github.com/yhj1024/manseryeok) v2.0.0입니다.

직접 의존 여부와 adapter 경계는 검증 설계 후 확정합니다. 외부 라이브러리의 데이터 구조를 명화의 내부 canonical schema로 사용하지 않습니다.

## 목표 아키텍처

```text
Birth Input
  -> Input Normalization
  -> Deterministic Calculation
  -> Canonical Saju Snapshot
  -> Interpretation Rules
  -> Interpretation Claims
  -> Grounded LLM Narrative
  -> Delivery Channel (미정)
```

## 설계 순서

1. Domain Boundary / Architecture
2. Canonical Saju Schema
3. Calculation Policy Specification
4. Calculation Adapter Contract
5. Golden Fixture / Verification Design
6. Interpretation Taxonomy
7. Rule & Provenance Schema
8. Interpretation Engine Design
9. LLM Grounding Contract
10. Product Delivery / UX
11. Persistence / Privacy / Security
12. MVP Scope 및 구현 계획

상세 설계는 `docs/`에 누적합니다.
