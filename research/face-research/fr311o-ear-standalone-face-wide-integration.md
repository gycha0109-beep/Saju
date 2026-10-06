# FR311O — 귀 단독 의미의 얼굴 전체 조회·출력 통합

## 1. 목적

FR311L에서 확정한 귀 단독 직접 규칙과 귀 명명형 의미를 기존 얼굴 전체 조회·출력 체계에 연결한다.

이번 단계는 새 전통 관상 의미를 연구하는 단계가 아니다. FR311L 데이터를 얼굴 전체 질의 표면에서 안전하게 소비하기 위한 통합 단계다.

## 2. 계층 구조

- FR311L: 귀 단독 전통 의미 연구
- FR311M: 귀와 타부위 직접 관계·조합 감사
- FR311N: FR311M 귀 교차부위 근거의 얼굴 전체 통합
- FR311O: FR311L 귀 단독 의미의 얼굴 전체 통합

FR311O query는 FR311N query 위에 귀 단독 근거를 additive 방식으로 추가한다.

## 3. 편입 범위

FR311L 원본 기준:

- 귀 전통 세부 명칭: 9
- 귀 단독 직접 규칙: 57
- 귀 명명형: 16
- 귀 명명형 descriptor: 58
- 귀 명명형 의미 주장: 46
- 귀 명명형 내부 cross-region descriptor: 10
- 귀 단독 연구 과정에서 분리한 cross-region context: 5

FR311O는 다음만 얼굴 전체 단독 의미로 편입한다.

- 귀 단독 직접 규칙 57건
- 귀 명명형 16종
- 귀 명명형 의미 주장 46건

명명형 내부 cross-region descriptor 10건은 context-only로만 편입한다.

FR311L의 별도 cross-region context 5건은 FR311M/N에서 이미 감사·소유권이 정리되었으므로 FR311O에서 새 관계 evidence로 만들지 않는다.

## 4. 색인

파일:

- `traditional-face-ear-evidence-index-fr311o.ts`

FR311L 원본 배열을 복제하지 않고 런타임 변환한다.

### 귀 명명형 evidence

각 FR311L claim을 다음 구조로 편입한다.

- evidenceId
- formKey
- traditionalLabel
- claimId
- topicKey
- lifeStage
- polarity
- certainty
- sourceFragment
- meaningSummary
- sourceText
- sourceRefs

명명형 분류 권한은 없다.

### 귀 직접 규칙 evidence

각 FR311L direct rule을 다음 구조로 편입한다.

- evidenceId
- ruleId
- 전통 귀 region
- sourceExpression
- observationKind
- meaningSummary
- topicKeys
- polarity
- lifeStage
- relationTarget
- certainty
- sourceRefs

형태 관찰값에서 ruleId를 자동 생성하거나 선택하지 않는다.

### 명명형 내부 문맥

descriptor 중 다음 조건만 context-only로 편입한다.

- `observationKind === cross_region_context`
- 또는 `region === context`

총 10건이다.

## 5. 조회 규칙

파일:

- `traditional-face-evidence-query-fr311o.ts`

기존 FR311J 21개 렌즈를 그대로 사용한다.

### 명명형 의미

다음 조건을 모두 만족해야 반환한다.

1. 정확한 `formKey`가 입력됨
2. formKey가 FR311L 승인 명명형에 존재
3. claim topic이 해당 기존 얼굴 전체 렌즈 topic과 직접 일치

관찰 특징으로 formKey를 자동 추론하지 않는다.

### 직접 규칙

다음 조건을 모두 만족해야 반환한다.

1. 정확한 `traditionalRuleId`가 입력됨
2. ruleId가 FR311L 직접 규칙에 존재
3. rule topic이 해당 렌즈 topic과 직접 일치

관찰 특징 또는 morphology term에서 ruleId를 자동 선택하지 않는다.

### 명명형 내부 타부위 문맥

FR311J의 mouth context와 같은 보수적 패턴을 사용한다.

다음이 모두 명시돼야 context-only로 반환한다.

1. 해당 귀 `formKey`
2. 정확한 `earContextDescriptorId`

문맥만 존재할 경우 직접 의미 evidence로 승격하지 않는다.

## 6. FR311M/N과의 소유권 경계

FR311O는 귀 단독 의미만 소유한다.

다음은 FR311M/N 소유권을 유지한다.

- 귀↔눈
- 귀↔눈썹
- 귀↔입
- 귀↔얼굴색
- 귀↔어깨
- 광대↔귀
- 귀가 포함된 승인 다부위 조합

예를 들어 水耳의 `高過目` descriptor는 context-only다.

이 descriptor가 존재한다고 해서:

- `ear_eye.ear_higher_than_eye`

관계 key를 자동 생성하지 않는다.

관계 key는 FR311M/N의 exact-key 입력 경로에서만 사용한다.

## 7. 불확실 근거

FR311L의 `phrase_uncertain` 규칙/claim은 색인에는 보존하되:

- favorable/challenging 직접 방향 근거 목록에 넣지 않는다.
- uncertain evidence로 분리한다.
- source conflict 판정에 사용하지 않는다.

## 8. 충돌

동일 렌즈에서 확정 직접 근거가 서로 반대 방향이면 `source_conflict`를 유지한다.

하지 않는 것:

- 근거 수 다수결
- source priority
- 강화 계산
- 상쇄 계산
- 평균화
- 길흉 점수
- 단일 합성 결론

## 9. 출력

파일:

- `traditional-face-reading-output-fr311o.ts`

FR311N 출력에 다음을 추가한다.

- 귀 명명형 직접 의미
- 귀 단독 직접 규칙
- 귀 명명형 context-only

귀 단독 의미와 귀 교차부위 관계가 함께 선택되더라도 병렬 근거로만 제시한다.

예:

- 土耳의 재물 관련 전통 주장
- 귀↔입 관계의 재물 관련 전통 주장

이 둘을 합쳐 "재물운이 매우 강하다" 같은 강화 결론을 만들지 않는다.

## 10. 안전 경계

모두 false 유지:

- named form 자동 분류
- direct rule 자동 추론/선택
- relation 자동 추론
- combination 자동 추론
- context 의미 승격
- topic remapping
- score
- aggregate 길흉 판정
- source priority
- source count weighting
- reinforcement
- cancellation
- 전통 부위 ↔ 현대 geometry 자동 바인딩
- provider landmark 바인딩
- metric threshold
- 현대 과학 사실화
- 의료 진단
- 실제 수명 예측
- 배우자/가족 사망 예측
- 생식·자녀 성별 예측
- 성격 사실화
- 도덕성 사실화
- 범죄성 사실화
- 제품 해석

## 11. 검증

- 귀 명명형 16종 편입
- 명명형 의미 주장 46건 편입
- 귀 직접 규칙 57건 편입
- 명명형 내부 context 10건 편입
- exact formKey 없이는 귀 명명형 evidence 0
- exact traditionalRuleId 없이는 귀 직접 규칙 evidence 0
- morphologyTermKeys로 귀 form/rule 자동 선택 0
- context descriptor가 relation/combination key로 승격되지 않음
- FR311N 귀 교차부위 결과 회귀 보존
- phrase_uncertain 분리
- favorable/challenging 충돌 보존
- 배우자 사망 등 민감한 역사적 문구의 예측 권한 false
- index/query/output authority boundary 전부 false

## 12. 종료 조건

A. 귀 명명형 16종 / 의미 주장 46건 / 직접 규칙 57건 누락 0  
B. 명명형 자동 판별 / 직접 규칙 자동 선택 0  
C. 명명형 내부 타부위 문맥의 relation/combination 승격 0  
D. FR311M/N 교차부위 소유권 침범 및 evidence 중복 0  
E. 불확실 근거가 확정 충돌 판정에 참여하지 않음  
F. 점수화·현대 사실화·geometry 자동 바인딩 0  
G. 기존 FR311J/N 회귀 및 표준 CI/통합검증 PASS
