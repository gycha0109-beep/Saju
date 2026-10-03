# SA-5W 배우자궁 위치 한정 공식 판독 진입 구현 v1

이슈: #2046  
트랙: `saju-bridge`

## 목적

SA-5V에서 구조적으로 적격 판정을 받은 배우자궁 위치 한정 기능을 실제 미리보기 공식 판독 경로에 편입한다.

## 구현 범위

- 판독 구역: `relationship:natal:spouse`
- 주장 유형: `relationship.spouse.traditional_spouse_palace_position`
- 의미 계열: `DAY_BRANCH_TRADITIONAL_SPOUSE_PALACE_POSITION`
- 의미 범위: `position_only`
- 직접 사실 근거: `pillars.day`

실제 실행 경로:

```text
배우자운 요청
→ 배우자 전용 해석 registry
→ 위치 한정 T8 claim
→ 배우자 전용 공식 의미 투영
→ Canonical Reading semantics
→ Official Reading plan
→ Official Reading renderer
→ Official Reading artifact
→ Preview delivery
```

배우자 공식 판독 경로에서는 legacy Narrative 모델을 호출하지 않는다.

## 가시 의미

본문:

> 전통 명리에서는 일지(日支)를 배우자궁의 위치로 봅니다.

필수 한정문:

> 이는 배우자궁의 위치에 대한 전통적 분류이며, 배우자의 성격이나 정체, 결혼 시기 또는 관계 결과를 의미하지 않습니다.

## 금지 확장

- 배우자 성격·정체
- 배우자 외모·직업
- 결혼 시기·결과
- 이혼·재혼
- 배우자궁 길흉
- 용신·기신
- 배우자 별 자동 선택
- 두 번째 명식 궁합

## 권한 변경

이번 단계에서 허용:

- `relationship:natal:spouse`의 Preview Official Reading
- exact position-only canonical semantic projection
- Official Reading plan / renderer / artifact

계속 차단:

- 공개 의미 권한
- 결제 권한
- 영속 저장
- 일반 공개
- Production 해석 권한

외부 전문가 검토, 검토 증명, 검토자 신뢰 컨텍스트와 신뢰 부여는 다시 도입하지 않는다.

## 역사 기록

SA-5T, SA-5U, SA-5V는 당시 상태를 기록하는 역사 아티팩트로 동결한다. SA-5W 이후 현재 권한 상태가 바뀌어도 과거 결론은 다시 계산하지 않는다.

## 성공 결정

`POSITION_ONLY_OFFICIAL_READING_ADMISSION_IMPLEMENTED`

## 다음 단계

`RUN_SA_5X_POSITION_ONLY_OFFICIAL_READING_DELIVERY_AUTHORITY_REVIEW`
