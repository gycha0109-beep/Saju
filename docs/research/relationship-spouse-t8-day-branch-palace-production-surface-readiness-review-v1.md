# SA-5Y — 배우자궁 위치 한정 Production 표면 적격성 검토 v1

> Repository: `gycha0109-beep/Saju`  
> Track: `saju-bridge`  
> Issue: #2065  
> Scope: `relationship:natal:spouse`  
> Status: implementation review candidate

## 1. 목적

SA-5X에서 실제 Preview HTTP 전달까지 승인된 배우자궁 위치 한정 Official Reading을 다음 단계에서 어떻게 다룰지 권한 축별로 분해한다.

SA-5Y는 Production을 활성화하지 않는다. 다음 한 가지 질문만 판정한다.

```text
현재의 위치 한정 의미를 그대로 유지하면서
배우자궁 단독 Production Official Reading lane을
별도 구현하는 것이 구조적으로 가능한가?
```

## 2. 현재 상태

현재 실행 프로세스는 Preview host를 기동한다.

```text
production-calculation-server
→ production-calculation-process
→ createMyeonghwaProductionPreviewHostServer
→ createApprovedPreviewE2eProductHost
```

SA-5X 실제 HTTP 증거에서는:

```text
POST /api/preview/readings → 200
POST /api/readings         → 404 HOST_ROUTE_NOT_FOUND
```

이다.

동시에 저수준 HTTP 계층에는 Production Reading transport primitive인
`createMyeonghwaProductionProductHostServer`가 존재한다.

따라서 transport primitive의 존재와 실제 Production 권한은 구분한다.

## 3. Preview host를 그대로 Production에 연결하지 않는 이유

현재 Preview Official Reading allowlist에는 다음 여러 섹션이 함께 존재한다.

```text
general:natal
career:natal
wealth:natal
relationship:natal:general
relationship:natal:spouse
business:natal
```

배우자궁 위치 한정 기능만 Production 후보로 검토하면서 이 host를 그대로 재사용하면 다른 Preview 권한까지 같이 노출할 수 있다.

SA-5Y의 Production 후보 allowlist는 정확히 다음 하나다.

```text
relationship:natal:spouse
```

그 외 섹션은 모두 fail closed여야 한다.

## 4. 유지되는 의미 계약

Claim:

```text
relationship.spouse.traditional_spouse_palace_position
```

직접 사실:

```text
pillars.day
```

소비자 의미:

```text
전통 명리에서는 일지(日支)를 배우자궁의 위치로 봅니다.
```

필수 한정문:

```text
이는 배우자궁의 위치에 대한 전통적 분류이며,
배우자의 성격이나 정체, 결혼 시기 또는 관계 결과를 의미하지 않습니다.
```

배우자 성격·정체·외모·직업, 결혼 시기·결과, 이혼·재혼,
배우자궁 길흉, 용신/기신, 배우자성 자동 선택, 두 번째 명식 궁합으로 확장하지 않는다.

Official Reading 후보 경로는 계속 model-free다.

```text
modelCalls = 0
narrative = undefined
consumer authority = official_reading
```

## 5. 권한 축 분리

SA-5Y는 다음을 서로 독립적으로 취급한다.

```text
1. exact position-only semantic authority
2. Preview Official Reading authority
3. Production transport eligibility
4. Production semantic delivery authority
5. persistence authority
6. public semantic / public share authority
7. public general availability authority
8. commerce / entitlement authority
```

단일 `productionAuthorized` boolean으로 합치지 않는다.

## 6. 성공 조건

다음을 모두 만족해야 한다.

- SA-5X 성공 상태에 정확히 바인딩
- 위치 한정 의미와 `pillars.day` 직접 사실 유지
- 요약/필수 한정문/금지 확장 유지
- 배우자 Official Reading 경로 `modelCalls = 0`
- Production transport primitive 존재
- 현재 배포 프로세스에서는 Production route가 계속 닫혀 있음
- Preview host가 배우자 외 여러 Official Reading 섹션을 포함함을 확인
- Preview host wholesale reuse 금지
- Production 후보 allowlist가 `relationship:natal:spouse` 하나로 고정
- 나머지 섹션에 대한 fail-closed 경계를 표현 가능
- persistence/public share/public GA/commerce를 Saju-side Production gate에 결합하지 않음
- 외부 인간 리뷰/attestation/trust 요구를 재도입하지 않음

## 7. 성공 판정

모든 검사가 통과하면:

```text
POSITION_ONLY_PRODUCTION_SURFACE_ELIGIBLE_FOR_BOUNDED_IMPLEMENTATION
```

을 기록한다.

이는 실제 Production 권한 승인이 아니다.

```text
productionTransportAuthorityAuthorized = false
productionSemanticDeliveryAuthorityAuthorized = false
publicSemanticAuthorityAuthorized = false
persistenceAuthorityAuthorized = false
publicGeneralAvailabilityAuthorityAuthorized = false
commerceAuthorityAuthorized = false
production = HOLD
```

다음 단계만 허용한다.

```text
RUN_SA_5Z_POSITION_ONLY_BOUNDED_PRODUCTION_OFFICIAL_READING_LANE_IMPLEMENTATION
```

SA-5Z는 Preview host를 그대로 재사용하지 않고 배우자궁 단독 allowlist를 가진 별도 bounded Production lane을 구현해야 한다.
