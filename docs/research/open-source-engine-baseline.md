# Open-source Engine Baseline

## 목적

명화가 참고하거나 의존할 오픈소스 사주/만세력 프로젝트의 역할을 구분한다.

README나 package metadata의 주장과 실제 사용 범위를 동일시하지 않는다. 계산 authority와 해석 참고 구현을 분리한다.

검토 기준일: 2026-08-19

---

## 1. 후보 A — `yhj1024/manseryeok`

Repository: https://github.com/yhj1024/manseryeok

### 현재 위치

**결정론적 계산 코어의 우선 후보.**

현재 `package.json` 기준 버전은 `2.0.0`이다.

### 확인된 주요 특성

- TypeScript 라이브러리
- Node.js >= 18
- runtime dependency 없음
- `prepublishOnly = lint -> test:run -> build`
- root에 실제 MIT `LICENSE` 존재
- 양력/음력 변환
- 윤달
- 연주/월주/일주/시주
- 24절기
- 입춘 경계
- 진태양시 옵션
- 역사적 표준시/DST 처리 옵션
- `midnight` / `jasi` / `splitJasi` day boundary 지원
- 십신
- 공망
- 대운

### 명화에서의 사용 원칙

직접 domain model로 사용하지 않는다.

```text
manseryeok
  -> Myeonghwa Calculation Adapter
  -> Canonical Saju Snapshot
```

이유:

1. 외부 패키지 버전 변화 격리
2. 자체 golden fixture 검증
3. 명화 schema 독립성
4. 향후 엔진 교체/이중검산 가능성
5. 외부 편의 API와 내부 domain contract 분리

### 주의

- 과거 1.x의 계산 오류 이력이 있으므로 1.x를 지원 대상으로 삼지 않는다.
- v2.0.0 이상만 검토 대상으로 한다.
- 라이브러리 자체 default와 명화의 계산 방법론 default를 동일시하지 않는다.
- 특히 `dayBoundary`와 `trueSolarTime`은 명화 정책으로 별도 결정한다.
- 대운 시작점 등 유파 차이가 가능한 항목은 별도 검증한다.

### 잠정 평가

```text
Role: Calculation Core Candidate
Confidence: B+ ~ A-
Adoption: conditional
Version floor: 2.0.0
```

실서비스 채택 전 자체 regression corpus가 필요하다.

---

## 2. 후보 B — `hjsh200219/fortuneteller`

Repository: https://github.com/hjsh200219/fortuneteller

### 현재 위치

**해석 기능 목록과 구현 아이디어 참고 후보. 계산 authority로 사용하지 않는다.**

현재 `package.json` 기준 버전은 `1.2.0`이다.

### 확인된 특성

- TypeScript
- MCP server 구조
- 사주 분석/운세/직업/재물/건강/애정/궁합 등 다수 해석 기능
- rule-based 로직과 정적 설명문
- LLM과 연결하기 쉬운 tool interface
- package metadata상 MIT 선언
- `test` script는 존재
- `prepublishOnly`에는 build + lint만 있고 test가 포함되지 않음

### 검토상 주의

기존 검진에서 다음을 확인했다.

- 일부 운세 점수는 heuristic
- 직업·재물·성격 등 상당 부분이 정적 rule/copy 기반
- 품질 주장 대비 검증 gate가 약함
- 일부 문서와 실제 tolerance/구현 불일치
- 오류를 삼켜 false positive가 가능한 테스트 패턴 존재
- 과거 Critical/High/Medium 만세력 버그 수정 문서 존재
- 현재 root의 `LICENSE` 파일은 조회되지 않음

특히 `package.json`은 `files`에 `LICENSE`를 포함하고 `license: MIT`라고 선언하지만, 현재 repository root에서는 `LICENSE`가 확인되지 않는다.

따라서 상업 서비스 코드 직접 복제나 재배포는 라이선스 상태를 별도로 확인하기 전 보류한다.

### 명화에서 허용하는 사용 방식

- 기능 taxonomy 조사
- 용신/신살/궁합/운세 기능 목록 참고
- rule engine 구조 아이디어 참고
- MCP/tool interface 참고

### 허용하지 않는 방식

- 계산 authority로 채택
- heuristic 점수를 검증된 정확도처럼 사용
- 출처 없는 해석 rule 대량 복사
- 라이선스 확인 전 코드 직접 복제
- README 품질 수치를 독립 검증 없이 명화 품질 근거로 사용

### 잠정 평가

```text
Role: Interpretation Reference
Confidence: C+
Adoption: no (core)
Code reuse: hold pending license/provenance review
```

---

## 3. 명화의 기본 조합

현재 설계 기준은 다음과 같다.

```text
Birth Input
  -> Calculation Policy
  -> manseryeok Adapter (candidate)
  -> Canonical Saju Snapshot
  -> Myeonghwa-owned Interpretation Rule Registry
  -> Interpretation Claims
  -> Grounded LLM Narrative
```

`fortuneteller`는 위 pipeline에 런타임 dependency로 들어가지 않는다.

---

## 4. 채택 전 필수 검증

`manseryeok`을 실제 dependency로 추가하기 전에 다음을 완료한다.

1. supported date range 확인
2. 입춘 직전/직후 fixture
3. 월 절입 직전/직후 fixture
4. 23:00~00:59 자시 경계 fixture
5. 음력/윤달 fixture
6. 역사적 한국 표준시 fixture
7. DST fixture
8. 진태양시로 시주가 바뀌는 fixture
9. 대운 순/역행 fixture
10. 대운 시작점 fixture
11. 외부 reference와 교차검증
12. regression test 자동화

검증이 끝나기 전에는 “정확한 사주 엔진” 같은 제품 claim을 하지 않는다.
