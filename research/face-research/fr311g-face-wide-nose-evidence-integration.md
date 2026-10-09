# FR311G 얼굴 공통 근거 질의 및 코 통합 출력

## 목적

FR311C/D의 눈·눈썹 질의 구조와 FR311F의 코 전통 의미 자료를
하나의 얼굴 공통 근거 엔진으로 연결한다.

이번 단계는 새로운 관상 의미를 추가하지 않는다.

- 기존 연구 자료를 공통 색인으로 묶는다.
- 질문 주제와 직접 연결되는 근거만 반환한다.
- 코 일반 규칙도 명시적으로 선택해 조회할 수 있게 한다.
- 긍정/부정 근거가 동시에 존재하면 충돌을 보존한다.
- 건강·수명 관련 전통 주장을 현대 의학이나 실제 예측으로 표현하지 않는다.

## 통합 규모

### 명명형

기존 눈썹·눈:

- 눈썹 24형
- 눈 39형
- 합계 63형

코:

- 24형

FR311G:

- 총 87개 명명형

### 명명형 의미 주장

기존 눈썹·눈:

- 203개

코:

- 54개

FR311G:

- 총 257개

### 코 일반 직접 규칙

- 20개

## 얼굴 공통 근거 색인

지원 부위:

- eyebrow
- eye
- nose

기존 FR311C 자료를 복제해서 수정하지 않고
공통 색인에서 읽어들인다.

코 자료는 FR311F를 공급원으로 사용한다.

## 코 일반 규칙 보강

FR311F의 일반 직접 규칙 20개에 다음 메타데이터를 추가한다.

- polarity
- lifeStage
- relationTarget

예:

### 山根不陷，主壽

- topic: longevity
- polarity: favorable
- lifeStage: whole_life

### 鼻梁無骨，必夭壽沒

- topic: longevity
- polarity: challenging
- lifeStage: whole_life

따라서 같은 수명 질문에 두 규칙이 함께 선택되면
source_conflict로 보존할 수 있다.

### 鼻梁圓而貫印堂者，此人主美貌之妻

- topic: spouse_relationship
- polarity: favorable
- relationTarget: spouse

## 질의 렌즈

기존 9개:

- temperament
- inbok
- interpersonal_relations
- wealth
- spouse
- siblings
- patron
- career
- children

신규 7개:

- longevity
- traditional_health
- legal_penalty
- household
- inheritance
- livelihood
- integrity_conduct

총 16개다.

## 입력 종류

### formKeys

전통 명명형을 이미 판정했다고 가정한 입력.

예:

- eyebrow.named.willow_leaf
- eye.named.calling_phoenix
- nose.named.garlic

### morphologyTermKeys

기존 눈·눈썹 직접 형태 규칙용 입력.

### relationKeys

기존 눈×눈썹 직접 상대관계용 입력.

### traditionalRuleIds

코의 일반 전통 규칙처럼
이미 해당 전통 조건이 성립한다고 판정된 규칙을 명시적으로 입력한다.

예:

- fr311f.shangen.not_sunken
- fr311f.bridge.no_bone

중요:

traditionalRuleIds는 사진이나 독립 수치에서 자동 생성하지 않는다.

## 대표 질의

### 蒜鼻 / 형제

원문 근거:

弟兄情欠

결과:

- evidence
- challenging
- siblings

동일 蒜鼻의 心無毒, 家必隆은 형제 질문에 섞지 않는다.

### 猴鼻 / 재물

원문 근거:

富貴

결과:

- favorable

같은 猴鼻의 恐奸情은 integrity_conduct 질의에서만 반환한다.

### 龍鼻 / 인복

龍鼻의 등록 의미는 높은 지위에 관한 직접 주장이다.

인복 직접 근거는 없으므로:

- no_evidence

재물·지위 의미로 인복 빈칸을 채우지 않는다.

### 伏犀鼻 / 관직·출세

原文:

位立至三公

career 렌즈에서 favorable 직접 근거로 반환한다.

### 山根不陷 + 鼻梁無骨 / 수명

- 山根不陷，主壽 -> favorable
- 鼻梁無骨，必夭壽沒 -> challenging

두 규칙을 같이 선택하면:

- source_conflict

어느 쪽도 우선하지 않는다.

### 鼻梁圓而貫印堂 / 배우자

배우자 질문에서 직접 규칙으로 반환한다.

### 獅鼻 / 재물

기존 FR311F의:

- conditional
- mixed

를 그대로 보존한다.

단일 favorable로 평탄화하지 않는다.

## 주제 오염 방지

금지:

- status -> inbok
- wealth -> spouse
- longevity -> traditional_health
- temperament -> integrity_conduct

질문 렌즈에 직접 연결된 topic 또는 relationTarget만 사용한다.

## 기존 눈·눈썹 호환

FR311G는 기존 FR311C 조합 판정기를 재사용한다.

따라서:

- 目短 + 眉長 / wealth
  - direct_source_combination
- 龍眉 + 鳳眼 / career
  - direct_source_combination
- brow_eye.brow_shorter_than_eye / temperament
  - direct_source_relation
- 눈·눈썹 명명형 직접 주장
  - 기존과 동일

을 유지한다.

## 출력 계약

FR311G는 얼굴 공통 출력 계약을 별도로 제공한다.

구분:

- favorable
- challenging
- mixedOrConditional
- uncertain
- nonDirectionalDirectRules
- contextOnly

출력 상태:

- conflict
- direct_combination
- direct_relation
- named_form_context
- parallel_evidence
- evidence
- no_direct_evidence

## 건강·수명 고지

모든 결과는 역사적 전통 관상 자료다.

특히 longevity와 traditional_health는 다음을 명시한다.

- 의료 판단이 아님
- 건강 진단이 아님
- 실제 수명 예측이 아님
- 현대 과학적 사실이 아님

## 권한 경계

FR311G는 다음을 허용하지 않는다.

- 인복/재물/수명 점수
- 긍정·부정 다수결
- 강화·상쇄 자동 계산
- 출전 우선순위 자동 생성
- 코 명명형 사진 자동 판정
- traditionalRuleIds 자동 추론
- 準頭/山根 등과 provider landmark 자동 연결
- metric threshold
- 현대 심리·의학 사실화
- 건강 진단
- 실제 수명 예측
- 상품 예측 자동 활성화

## 종료 조건

A. 명명형 87종 통합
B. 명명형 의미 주장 257개 통합
C. 코 일반 직접 규칙 20개 질의 가능
D. 기존 9개 + 신규 7개 = 16개 렌즈
E. 코 일반 규칙 polarity/lifeStage/relationTarget 보존
F. 같은 주제 favorable/challenging 동시 존재 시 source_conflict
G. 다른 주제 근거로 빈칸 보정 금지
H. 기존 눈·눈썹 직접 조합/상대관계 회귀 통과
I. 건강·수명 출력 경계 유지
J. 사진 자동 판정·중립 기하 자동 바인딩 금지
K. 전체 CI 및 통합검증 통과

## 다음 단계

FR311G가 안정되면 코 트랙은
'단일 부위 의미를 실제 질의에 사용 가능'한 단계까지 올라간다.

그 다음에는:

1. 코와 다른 얼굴 부위의 직접 조합을 문헌에서 조사하거나
2. 입/인중 등 다음 단일 부위 의미 연구로 이동

할 수 있다.

조합 문헌 근거가 없는 상태에서 코 의미를 다른 부위 의미와 임의 합성하지 않는다.
