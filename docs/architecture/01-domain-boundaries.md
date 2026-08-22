# 01. Domain Boundaries

## 목적

명화의 사주 엔진이 어떤 값을 **사실(Fact)** 로 취급하고, 어떤 값을 **해석(Interpretation)** 으로 취급하며, LLM이 어디까지 관여할 수 있는지 경계를 고정한다.

이 문서는 구현 언어나 최종 전달 채널(웹사이트/프로그램/템플릿)에 독립적이다.

---

## 1. 핵심 도메인 분리

명화의 결과는 세 계층으로 분리한다.

### 1.1 Calculation Fact

주어진 입력과 명시된 계산 정책에서 결정론적으로 재계산 가능한 값.

예:

- 양력/음력 변환 결과
- 연주·월주·일주·시주
- 천간/지지의 음양·오행
- 십신
- 공망
- 대운 순행/역행 및 계산값
- 절기 경계 정보
- 적용된 진태양시/시간 보정 결과

Calculation Fact는 LLM이 생성하거나 수정할 수 없다.

### 1.2 Interpretation Claim

Calculation Fact에 특정 명리 규칙, 방법론 또는 유파를 적용해 도출한 주장.

예:

- 신강/신약 판정
- 격국 판정
- 용신 후보
- 신살 의미
- 성향 해석
- 직업/재물/관계 해석
- 특정 대운/세운에 대한 해석

각 Claim은 최소 다음을 추적할 수 있어야 한다.

- 어떤 fact를 사용했는가
- 어떤 rule을 적용했는가
- rule의 버전은 무엇인가
- 어떤 유파/방법론인가
- 출처와 검토 상태는 무엇인가

Interpretation Claim은 서로 충돌할 수 있다. 유파나 방법론 차이에서 발생하는 충돌은 정상적인 domain state다.

### 1.3 Narrative

Calculation Fact와 Interpretation Claim을 사용자가 이해하기 쉬운 자연어로 표현한 결과.

예:

- 사주 리포트 문장
- 질문에 대한 설명
- 여러 해석 관점 비교
- 요약

Narrative는 LLM이 생성할 수 있으나 입력에 없는 새로운 계산값이나 해석 claim을 만들어서는 안 된다.

---

## 2. 권한 경계

```text
Birth Input
  -> Input Normalizer
  -> Calculation Adapter
  -> Canonical Saju Snapshot       [FACT]
  -> Interpretation Rule Engine
  -> Interpretation Claims         [INTERPRETATION]
  -> Narrative Composer / LLM
  -> User-facing Reading           [NARRATIVE]
```

### Calculation Adapter

외부 계산 라이브러리를 직접 도메인 모델로 노출하지 않는다.

초기 우선 후보는 `yhj1024/manseryeok` v2.0.0이지만 명화 내부에는 반드시 adapter를 둔다.

이유:

1. 외부 라이브러리 교체 가능성
2. 버전 업에 따른 출력 변화 격리
3. 자체 golden fixture 검증
4. 명화 내부 schema 안정성 확보
5. 특정 라이브러리의 편의용 문자열/객체 구조가 도메인 모델로 침투하는 것을 방지

---

## 3. 명화의 핵심 내부 자산

외부 계산 라이브러리 자체는 명화의 경쟁우위로 보지 않는다.

장기적으로 명화가 직접 축적해야 할 자산은 다음이다.

1. **Canonical Saju Schema**
2. **Calculation Policy**
3. **Golden Fixture / Regression Corpus**
4. **Interpretation Rule Registry**
5. **Rule Provenance**
6. **Interpretation Evaluation Corpus**
7. **Narrative Grounding / Safety Contract**

---

## 4. 금지 사항

### LLM 금지

LLM은 다음을 수행하지 않는다.

- 생년월일시에서 직접 사주팔자 계산
- 누락된 사주 데이터를 추측
- 없는 신살/십신/용신을 생성
- Calculation Fact 수정
- rule registry에 없는 해석을 사실처럼 추가
- 미래 사건을 확정적으로 단언

### Canonical Snapshot 금지

Canonical Snapshot에 다음을 직접 저장하지 않는다.

- 성격 좋음/나쁨
- 재물운 좋음/나쁨
- 결혼운
- 성공 시기
- 직업 추천
- 건강 결과
- 궁합 점수
- 길흉 점수

이들은 Interpretation 또는 Narrative 영역이다.

---

## 5. 계산 충돌과 해석 충돌

### Calculation Conflict

동일 입력 + 동일 정책 + 동일 엔진 버전에서 서로 다른 계산 결과가 나오는 경우.

원칙적으로 버그 또는 데이터 불일치 후보로 취급한다.

### Interpretation Conflict

동일 Calculation Fact에 서로 다른 유파/방법론이 다른 결과를 제시하는 경우.

정상 상태일 수 있다.

예:

```text
methodology: 억부
result: 木

methodology: 조후
result: 水
```

명화는 한쪽을 몰래 덮어쓰지 않고 provenance와 함께 병렬 보존할 수 있어야 한다.

---

## 6. 채널 독립성

현재 최종 제공 형태는 확정하지 않는다.

가능한 전달 채널:

- 웹사이트
- 데스크톱/설치형 프로그램
- 내부 상담 도구
- 템플릿/패키지형 상품
- API 기반 서비스

따라서 Core Domain은 UI framework, HTTP framework, DB vendor, LLM provider에 종속되지 않게 설계한다.

---

## 7. 현재 결정

- 제품 브랜드: **명화**
- 독립 사주 서비스로 개발
- BEJEWELY와 통합하지 않음
- 결정론 계산과 명리 해석 분리
- LLM은 계산 authority가 아님
- 외부 계산 엔진을 canonical model로 직접 사용하지 않음
- 정확도 주장은 `계산 정확도 / 해석 일관성 / 현실 예측 정확도`를 구분
