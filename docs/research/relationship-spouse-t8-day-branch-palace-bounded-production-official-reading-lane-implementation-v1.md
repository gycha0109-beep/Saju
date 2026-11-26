# SA-5Z — 배우자궁 위치 한정 bounded Production Official Reading lane 구현 v1

> Repository: `gycha0109-beep/Saju`  
> Track: `saju-bridge`  
> Issue: #2072  
> Scope: `relationship:natal:spouse`  
> Status: implementation candidate

## 1. 목적

SA-5Y가 구현 적격성을 승인한 배우자궁 위치 한정 Official Reading에 대해,
실제 배포 프로세스를 건드리지 않은 별도의 Production candidate lane을 구현한다.

이 단계는 Production 전달 권한을 승인하지 않는다.

## 2. 구조

```text
/api/readings
→ Production service Bearer
→ spouse-only request scope guard
→ Production candidate consumer authority
→ 공통 Governed Reading executor
→ 공통 spouse position-only semantic projection core
→ Official Reading plan / renderer / artifact
```

Preview와 Production 후보는 동일한 위치 한정 의미 코어를 사용하지만
각자의 authority/provenance wrapper를 사용한다.

## 3. 허용 범위

Production candidate allowlist:

```text
relationship:natal:spouse
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

AI Narrative는 사용하지 않는다.

```text
modelCalls = 0
narrative = undefined
```

## 4. Fail-closed

다음 요청은 candidate host에서 계산/해석 경로로 넘기지 않는다.

- 관계운 general
- 올해 배우자운
- 재물운
- 직업운
- 사업운
- 일반 사주
- 궁합
- question-specific
- unknown request
- `targetPersonRef`가 있는 배우자 요청

HTTP에서는 `400 HOST_INVALID_READING_REQUEST`로 닫는다.

candidate server의 `/api/preview/readings`도 404다.

## 5. 배포 프로세스 비활성 유지

SA-5Z는 `production-calculation-process.ts`를 Production candidate host로 교체하지 않는다.

따라서 실제 배포 프로세스에서는 계속:

```text
/api/preview/readings → 기존 Preview lane
/api/readings         → 404 HOST_ROUTE_NOT_FOUND
```

상태를 유지한다.

## 6. 성공 판정

```text
POSITION_ONLY_BOUNDED_PRODUCTION_OFFICIAL_READING_LANE_IMPLEMENTED
```

다음 단계:

```text
RUN_SA_5AA_POSITION_ONLY_PRODUCTION_DELIVERY_AUTHORITY_REVIEW
```

SA-5Z가 성공해도 아래 권한은 모두 false다.

```text
productionTransportAuthorityAuthorized = false
productionSemanticDeliveryAuthorityAuthorized = false
publicSemanticAuthorityAuthorized = false
persistenceAuthorityAuthorized = false
publicGeneralAvailabilityAuthorityAuthorized = false
commerceAuthorityAuthorized = false
production = HOLD
```
