# Relationship / Spouse T8 — SA-5K Narrative & Delivery Authority Review

Issue: #1916  
Track: `saju-bridge`

## 역할

SA-5K는 Day-Branch spouse-palace 2.0 후보가 근거 선택 단계까지 정상적으로 도달했는지 확인하고,
아직 서술/전달 권한은 열지 않은 채 다음 프로젝트 결정 단계로 넘기는 검토입니다.

이 단계 자체는 다음을 하지 않습니다.

- `materialForNarrative` 변경
- reviewerStatus 변경
- narrative profile 생성
- 서술 생성
- artifact 조립
- Preview / Official / Production 승격

## 현재 의미 범위

허용 후보 의미는 오직 다음뿐입니다.

```json
{
  "position": "day_branch",
  "traditionalRole": "spouse_palace",
  "semanticScope": "position_only"
}
```

배우자 성격, 외모, 직업, 결혼 시기, 결혼 결과, 궁합, 길흉 등의 의미는 이 단계에서 허용되지 않습니다.

## SA-5K 성공 상태

모든 경계 검사가 통과하면:

```text
authorityReviewCompleted = true
decision = HOLD_NARRATIVE_AND_DELIVERY_AUTHORITY
narrativeEligibilityEstablished = false
deliveryAuthorityEstablished = false
```

즉, 검토는 끝났지만 아직 실제 서술 권한은 열지 않습니다.

## 다음 단계

SA-5K가 정상 완료되면 다음으로 이동합니다.

```text
RUN_SA_5L_PROJECT_GOVERNED_POSITION_ONLY_NARRATIVE_MATERIALITY_DECISION
```

SA-5L은 이미 고정된 근거·테스트·의미 경계를 바탕으로 프로젝트 내부 정책에서
`position_only` 서술 사용 여부를 결정합니다.

## Fail-close

다음 조건 중 하나라도 깨지면 SA-5K는 그대로 차단됩니다.

1. SA-5J identity/integrity 불일치
2. 근거 선택 admission 불일치
3. 현재 `materialForNarrative=false` 경계 훼손
4. 현재 staging 품질/registry 경계 훼손
5. spouse natal이 Official Preview로 잘못 승격됨
6. narrative runtime이 없는 상태에서 실행이 fail-close하지 않음
7. artifact 없는 상태에서 delivery가 fail-close하지 않음
8. narrative profile 권한이 몰래 주입됨
9. Preview / Official / Production 권한이 확대됨

실패 시:

```text
HOLD_AND_REPAIR_SA_5K_AUTHORITY_REVIEW
```
