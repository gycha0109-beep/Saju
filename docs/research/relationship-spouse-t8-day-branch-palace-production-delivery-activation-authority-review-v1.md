# SA-5AA — 배우자궁 위치 한정 Production Delivery Activation Authority Review v1

> Repository: `gycha0109-beep/Saju`  
> Track: `saju-bridge`  
> Issue: #2082  
> Scope: `relationship:natal:spouse`

## 목적

SA-5Z에서 구현한 spouse-only bounded Production Official Reading candidate lane을
실제 Production 전달 경로에 연결하는 구현을 진행해도 되는지 최종 심사한다.

이 단계는 런타임 활성화 단계가 아니다.

## PASS 조건

- SA-5Z exact PASS
- Production candidate allowlist = `relationship:natal:spouse` 단 하나
- 비허용 섹션 및 `targetPersonRef` 요청 fail-closed
- Production service Bearer 선검증
- `ProductReadingResponse` admission 유지
- Production 응답에 Preview lifecycle header 없음
- 직접 사실은 `pillars.day` 단 하나
- `modelCalls = 0`
- `narrative = undefined`
- 현재 deployed process의 `/api/readings`는 계속 404
- persistence/public share/public GA/commerce 권한은 포함하지 않음
- 외부 reviewer/attestation/trust 요구사항은 없음

## PASS 판정

```text
AUTHORIZE_POSITION_ONLY_PRODUCTION_DELIVERY_ACTIVATION_IMPLEMENTATION
```

다음 단계:

```text
RUN_SA_5AB_POSITION_ONLY_PRODUCTION_DELIVERY_ACTIVATION_IMPLEMENTATION
```

## 권한 분리

SA-5AA PASS는 아래 두 항목의 **activation implementation**만 승인한다.

```text
productionTransportActivationImplementationAuthorized = true
productionSemanticDeliveryActivationImplementationAuthorized = true
```

하지만 이 리뷰가 끝나는 시점까지 실제 active authority는 여전히 false다.

```text
productionTransportAuthorityActive = false
productionSemanticDeliveryAuthorityActive = false
production = HOLD
```

실제 `production-calculation-process.ts` wiring은 SA-5AB에서만 변경할 수 있다.

Persistence, public semantic/public share, public GA, commerce는 Saju semantic
Production activation 범위에 포함하지 않는다.
