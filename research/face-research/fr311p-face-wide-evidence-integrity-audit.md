# FR311P — 얼굴 전체 전통 의미 통합 무결성 감사

## 1. 목적

FR311O까지 구축된 얼굴 전체 전통 의미 조회망을 새 의미 추가 없이 전수 감사한다.

대상은 눈썹·눈·코·입/인중·귀의 단독 의미, 눈썹×눈·코×타부위·입/인중×타부위·귀×타부위의 승인된 직접 관계/조합, 그리고 명명형 내부 context-only 문맥이다.

FR311P는 새 조회 계층을 만들지 않는다. 최신 조회 계약은 FR311O를 유지하고, FR311P는 그 계약의 완전성·소유권·조회 가능성·안전 경계를 검증하는 감사 계층이다.

## 2. 기준선 인벤토리

현재 저장소 기준으로 동결하는 수치:

- 얼굴 전체 주제 렌즈: 21
- 명명형: 119종
  - FR311J까지 103종
  - 귀 16종
- 명명형 직접 의미 주장: 348건
  - FR311J까지 302건
  - 귀 46건
- 단독/기존 직접 규칙: 230건
  - FR311J 173건
  - 귀 57건
- 눈썹×눈 직접 교차부위 근거: 10건
- 코 직접 교차부위 관계: 3건
- 입/인중 직접 교차부위 근거: 21건
- 귀 교차부위 직접 근거:
  - FR311M 소유 22건
  - FR311K 재사용 4건
- 정식 canonical evidence: 621건
- 직접 관계 key: 24개
- 직접 조합 key: 20개

context-only 인벤토리:

- 눈썹·눈 명명형 내부 문맥: 4건
- 코 명명형/동반 문맥: 12건
- 입 명명형 내부 문맥: 9건
- 귀 명명형 내부 문맥: 10건

## 3. canonical evidence 소유권

FR311P canonical evidence는 다음만 새 의미 단위로 센다.

- FR311J named claim
- FR311O ear named claim
- FR311J direct rule
- FR311O ear direct rule
- FR311K mouth/philtrum direct cross-region evidence
- FR311M 중 evidenceOwner=fr311m 인 direct cross-region evidence

다음은 canonical evidence를 새로 만들지 않는 alias/reuse다.

### FR311E

눈썹×눈 교차부위 근거의 ruleId는 FR311J direct-rule index에 이미 편입되어 있다.

따라서 FR311E를 별도 canonical evidence로 중복 계수하지 않고, 정확한 participant set을 통한 조회 가능성과 소유 구조만 감사한다.

### FR311H

코의 직접 교차부위 관계 3건은 기존 FR311F 직접 규칙을 relationKey로 접근하는 alias다.

각 FR311H relation의 sourceRuleId가 FR311J direct-rule index에 존재하고 sourceExpression이 일치해야 한다.

### FR311M의 FR311K 재사용

FR311M 역방향 감사에서 FR311K 근거를 그대로 재사용하는 4건은 새 evidence 소유권이 아니다.

조건:

- evidenceId가 FR311K canonical evidence와 동일
- relationKey 또는 combinationKey가 동일
- FR311P canonical inventory에는 한 번만 존재

별도로 FR311M에는 `fr311m.relation.earlobe_toward_mouth.634a`라는 추가 원문 witness가 있다. 이 레코드의 evidence 자체는 FR311M 소유지만, 사용하는 관계 key `ear_mouth.earlobe_toward_mouth`는 FR311K가 먼저 정의했다.

따라서 FR311P는 다음을 분리한다.

- evidence owner: FR311M
- relation-key owner: FR311K
- cross-layer key reuse: 1건

새 witness가 추가됐다는 이유로 기존 relation key의 소유권을 FR311M이 중복 획득한 것으로 계산하지 않는다.

## 4. 중복 판정

### 오류로 판정

- canonical evidenceId가 둘 이상의 소유 레코드에 존재
- 동일 relationKey를 서로 다른 canonical key owner가 독립적으로 소유
- 동일 combinationKey를 서로 다른 canonical owner가 소유
- reuse가 새 canonical record로 다시 생성됨

### 오류가 아님

같은 관계 key에 동일 소유 계층이 복수 원문 witness를 보유하는 경우.

예:

- 같은 귀↔관골 관계에 서로 다른 권차의 직접 근거가 존재
- 같은 입↔치아 관계에 결과 의미가 다른 복수 직접 원문이 존재

이는 relation key의 복수 witness이며 소유권 충돌이 아니다.

## 5. 주제 렌즈 감사

각 evidence의 topic을 기존 21개 렌즈의 topicKeys/ruleTopicKeys와 대조한다.

named claim은 기존 계약과 동일하게 relationTarget을 통한 직접 연결도 인정한다.

감사 과정에서 현재 21개 렌즈로 직접 조회할 수 없는 canonical evidence 28건이 확인되었다. 이는 색인 누락이나 소유권 오류가 아니라 기존 렌즈 계약이 의도적으로 다루지 않는 주제를 가진 근거다.

현재 확인된 미지원 topic token에는 다음이 포함된다.

- intelligence
- ability
- longevity_mortality
- sexuality
- wealth_status
- family

특히 wealth_status는 기존 FR311J가 wealth/status 자동 분해를 명시적으로 금지한다. 따라서 FR311P에서 재물 또는 관직 렌즈로 임의 분해하지 않는다. longevity_mortality 역시 longevity로 자동 치환하지 않는다.

감사 결과는 다음을 분리한다.

- lens-mapped evidence: 기존 렌즈에 직접 대응하며 실제 조회 가능성을 전수 검증
- lens-unmapped evidence: 현재 렌즈 계약에 직접 대응하지 않는 근거로 별도 기록
- unmapped topic token: evidence의 topic 중 현재 렌즈에 직접 연결되지 않은 개별 주제 문자열

FR311P는 미지원 주제를 비슷한 개념의 렌즈로 임의 재매핑하지 않는다. 따라서 28건은 통합 결함으로 숨기지 않고 기준선의 명시적 렌즈 공백으로 동결한다.

## 6. 전수 조회 감사

테스트는 정적 샘플이 아니라 배열 전체를 순회한다.

### 명명형

모든 FR311J/FR311O 명명형 claim에 대해:

1. 해당 topic/relation target을 허용하는 렌즈를 찾는다.
2. 정확한 formKey로 FR311O query를 호출한다.
3. 해당 evidenceId가 실제 반환되는지 확인한다.
4. 비허용 렌즈에서는 해당 evidenceId가 반환되지 않는지 확인한다.

### 직접 규칙

모든 FR311J/FR311O direct rule에 대해:

1. 허용 렌즈를 찾는다.
2. 정확한 traditionalRuleId를 넣는다.
3. 해당 ruleId가 반환되는지 확인한다.
4. 비허용 렌즈에서는 반환되지 않는지 확인한다.

형태 관찰값에서 ruleId를 자동 추론하지 않는다.

### 입/인중 교차부위

FR311K 직접 근거 21건 전부에 대해 exact relationKey 또는 combinationKey로 조회한다.

### 귀 교차부위

FR311M 소유 22건 전부에 대해 exact relationKey 또는 combinationKey로 조회한다.

FR311K 소유 재사용 4건은 FR311K 경로에서만 canonical ownership을 가진다.

### 코 교차부위

FR311H 3개 relationKey가 기존 sourceRuleId를 정확히 반환하는지 확인한다.

### 눈썹×눈 교차부위

FR311E 직접 근거 10건의 participant set을 그대로 복원해서 조회한다.

- morphology participant → morphologyTermKeys
- named_form participant → formKeys
- cross_region_relation participant → relationKeys

추가 participant 추론은 하지 않는다.

## 7. 과잉 조회 감사

허용 렌즈 조회만 확인하는 것으로 끝내지 않는다.

각 명명형 claim과 direct rule을 모든 비허용 렌즈에 넣어 해당 근거가 새지 않는지 검사한다.

즉:

- 허용 렌즈 조회 실패 0
- 비허용 렌즈 의미 누출 0

을 동시에 검증한다.

## 8. 불확실 근거

certainty=phrase_uncertain인 named claim/direct rule은:

- uncertainEvidenceIds에는 존재
- favorableEvidenceIds에는 없음
- challengingEvidenceIds에는 없음
- mixedOrConditionalEvidenceIds에는 없음

이어야 한다.

따라서 불확실 문구는 source_conflict를 만들 수 없다.

## 9. context-only 무결성

전체 context-only 레코드에 대해 실제 query를 수행한다.

대상:

- FR311C 눈썹·눈 4건
- FR311H 코 12건
- FR311J 입 9건
- FR311O 귀 10건

context가 반환되더라도 다음은 생성되지 않아야 한다.

- 새 cross-region direct evidence
- relationKey
- combinationKey

즉 명명형 내부 동반 묘사를 독립 관계/조합 의미로 승격하지 않는다.

## 10. 회귀 감사

### FR311G

FR311G 렌즈와 기존 명명형 입력을 FR311G와 FR311O에 각각 넣고 기존 소유 필드가 동일한지 확인한다.

### FR311J

후속 귀 입력이 없는 상태에서 FR311J와 FR311O의:

- status
- namedEvidenceIds
- directRuleIds
- combinationRuleIds
- namedFormContextIds
- crossRegionEvidenceIds

가 동일해야 한다.

### FR311N

귀 단독 form/rule 입력 없이 FR311M exact key만 사용했을 때 FR311N과 FR311O의 귀 교차부위 결과가 동일해야 한다.

## 11. 출처 무결성

canonical evidence 621건 전부 sourceRefs가 1개 이상이어야 한다.

sourceRef 수는 근거 강도, 우선순위, 점수에 사용하지 않는다.

## 12. 충돌 처리

favorable와 challenging 확정 직접 근거가 같은 렌즈에서 동시에 선택되면 source_conflict를 유지한다.

다음 권한은 계속 없다.

- source priority
- source count weighting
- reinforcement
- cancellation
- 평균화
- 점수화

## 13. 권한 경계

FR311P와 최신 FR311O query/output에서 다음은 false다.

- 명명형 자동 분류
- 직접 규칙 자동 추론
- 관계 자동 추론
- 조합 자동 추론
- context 의미 승격
- 점수화
- 종합 길흉 판단
- unsupported synthesis
- source priority
- source count weighting
- reinforcement
- cancellation
- topic remapping
- 전통 부위→neutral geometry 자동 바인딩
- provider landmark 바인딩
- metric threshold 생성
- 현대 과학/심리 사실화
- 의료 진단
- 실제 수명 예측
- 배우자/가족 사망 예측
- 생식·자녀 성별 예측
- 성격·도덕성·범죄성 사실화
- 제품 해석

## 14. 종료 조건

A. canonical 누락·출처 누락 0, 렌즈 미지원 evidence 28건은 명시적 공백으로 별도 기록  
B. evidence ID 중복 및 관계/조합 소유권 충돌 0  
C. 렌즈가 정의된 근거의 허용 렌즈 조회 실패 및 비허용 렌즈 누출 0  
D. FR311G/J/N 회귀 0  
E. phrase_uncertain의 확정 판정 참여 0  
F. context-only 의미 승격 0  
G. 모든 자동 추론·점수화·현대 사실화 권한 false  
H. 표준 CI, 얼굴 관상 회귀, 통합 검증 PASS

FR311P가 닫히면 현재 얼굴 전통 의미 계층을 안정 기준선으로 동결하고, 후속 단계에서는 새 의미를 덧붙이기보다 관찰 계층과 의미 계층 사이의 허용 가능한 binding 범위를 별도 검토한다.
