# FR311N — 귀 교차부위 근거의 얼굴 전체 조회·출력 통합

## 1. 목적

FR311M에서 승인한 귀(耳) 교차부위 직접 관계·직접 조합 근거를 기존 FR311J 얼굴 전체 evidence query/output 흐름에 추가한다.

이번 단계는 새 관상 의미를 발굴하는 단계가 아니다. FR311M에서 이미 판정한 근거를 기존 얼굴 전체 질의 표면에서 안전하게 소비할 수 있도록 연결하는 단계다.

## 2. 통합 전략

FR311J 자체를 직접 변경하지 않고 FR311N 확장 계층을 추가한다.

- 기존 얼굴 전체 질의: FR311J
- 입·인중 교차부위 소유 근거: FR311K
- 귀 교차부위 감사 및 직접 근거: FR311M
- 얼굴 전체 귀 통합 질의/출력: FR311N

이 방식으로 기존 21개 렌즈와 FR311J/FR311K 회귀 계약을 그대로 유지한다.

## 3. 근거 소유권

FR311M 직접 근거는 총 26개다.

- FR311M 자체 소유: 22개
- FR311K 재사용: 4개

FR311N에서는 FR311M 자체 소유 22개만 새 경로에서 추가한다.

다음 4개는 FR311K가 이미 소유하므로 기존 FR311J → FR311K 경로에서 한 번만 사용한다.

- `fr311k.combination.shape_surplus_lip_teeth_whole_face`
- `fr311k.combination.five_officials_late_fortune`
- `fr311k.combination.middle_noble`
- `fr311k.relation.earlobe_toward_mouth`

따라서 같은 원문 주장에 대한 evidenceId를 FR311N에서 새로 만들지 않는다.

## 4. 질의 규칙

귀 교차부위 근거는 아래 조건을 모두 만족해야 얼굴 전체 결과에 포함된다.

1. 입력에 정확한 `relationKey` 또는 `combinationKey`가 있다.
2. 해당 key가 FR311M의 승인된 direct evidence에 존재한다.
3. 해당 근거의 topic이 기존 FR311J 렌즈의 topic/rule topic과 직접 일치한다.
4. evidence owner가 FR311M이다.

독립 특징, 명명형, 세부 형태, 위치 관찰값만으로 관계 key나 조합 key를 만들지 않는다.

예:

- `ear_eye.ear_higher_than_eye` + 생계 렌즈 → 승인 근거 반환
- 같은 key + 재물 렌즈 → topic 불일치이므로 귀 근거 미반환
- 귀와 눈 특징이 각각 존재하지만 relationKey가 없음 → 자동 관계 추론 없음

## 5. 상태 결정

FR311N은 FR311J 상태를 기본으로 보존한다.

FR311M 근거가 추가된 경우:

- 직접 조합 근거가 있으면 `direct_source_combination`
- 직접 관계 근거만 있으면 `direct_source_relation`
- 동일 렌즈에서 유리/불리 직접 근거가 함께 있으면 `source_conflict`

충돌 상태에서 다음을 하지 않는다.

- 근거 수 다수결
- 출처 우선순위
- 강화 계산
- 상쇄 계산
- 점수화
- 단일 길흉 결론

## 6. 출력 통합

FR311N 출력은 FR311J 출력 섹션을 유지하고 FR311M 자체 소유 근거만 추가한다.

추가되는 교차부위 근거는 다음 필드를 그대로 보존한다.

- 원문 표현
- 의미 요약
- topic
- polarity
- life stage
- relation target
- source refs

출력에서도 FR311K 재사용 evidenceId는 기존 FR311J 결과를 재사용하며 중복으로 추가하지 않는다.

## 7. 승격 금지 대상

FR311M 감사 후보 중 아래 분류는 FR311N 얼굴 전체 직접 근거로 승격하지 않는다.

- named_form_context
- descriptive_companion
- phrase_boundary_uncertain
- excluded_non_relation

후보 문장에 귀와 타부위가 함께 등장한다는 사실만으로 관계·조합을 만들지 않는다.

## 8. 권한 경계

FR311N은 다음 권한을 모두 false로 유지한다.

- 관계 자동 추론
- 조합 자동 추론
- 명명형 문맥의 의미 승격
- 점수화
- 근거 개수 가중
- 출처 우선순위
- 강화/상쇄
- 주제 재매핑
- 전통 부위 ↔ 현대 geometry 자동 바인딩
- provider landmark 바인딩
- 임의 metric threshold
- 명명형 자동 분류
- 현대 과학·심리·의학 사실화
- 건강 진단
- 실제 수명 예측
- 생식·자녀 성별 예측
- 성격 사실화
- 범죄성 추론
- 제품 판단

모든 전통 의미는 역사적 전통 관상 문헌의 주장으로만 유지한다.

## 9. 검증 항목

- 기존 FR311J 입력에서 FR311N이 동일 결과를 유지하는지
- 정확 relation key만 귀 관계 근거를 반환하는지
- 정확 combination key만 귀 조합 근거를 반환하는지
- 한 key에 복수 원문 witness가 있으면 모두 보존하는지
- FR311K 소유 evidenceId가 중복되지 않는지
- 비직접 후보가 승격되지 않는지
- 렌즈 topic 불일치 시 근거가 반환되지 않는지
- 귀 근거와 기존 근거의 방향이 충돌하면 source conflict가 보존되는지
- query/output 권한 경계가 모두 닫혀 있는지

## 10. 종료 조건

A. FR311M 승인 direct evidence가 기존 FR311J 렌즈에서 exact key 입력 시 조회 가능  
B. FR311K 재사용 evidenceId 중복 0  
C. named/uncertain/non-relation 자동 승격 0  
D. relation/combination 자동 추론·점수화·현대 사실화 0  
E. 기존 FR311J 회귀 유지 및 표준 CI/통합검증 PASS
