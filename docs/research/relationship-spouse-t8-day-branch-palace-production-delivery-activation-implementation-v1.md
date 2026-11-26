# SA-5AB — 배우자궁 위치 한정 Production Delivery Activation 구현 v1

> Repository: gycha0109-beep/Saju  
> Track: saju-bridge  
> Issue: #2091  
> Scope: relationship:natal:spouse

## 결과

SA-5AA가 승인한 activation implementation을 실제 배포 프로세스에 반영한다.

Production 경로:

    /api/readings
    → bearer auth
    → spouse-only Production scope guard
    → active Production spouse authority
    → governed reading executor
    → shared position-only semantic core
    → Official Reading

동일 프로세스의 Preview 경로는 별도 host로 유지한다.

    /api/preview/readings
    → Preview host
    → x-myeonghwa-reading-lifecycle: preview

## Production 활성 범위

오직 relationship:natal:spouse만 활성화한다.

직접 근거는 pillars.day 단 하나다.

소비자 의미:

    전통 명리에서는 일지(日支)를 배우자궁의 위치로 봅니다.

필수 한정:

    이는 배우자궁의 위치에 대한 전통적 분류이며,
    배우자의 성격이나 정체, 결혼 시기 또는 관계 결과를 의미하지 않습니다.

AI narrative는 사용하지 않는다.

    modelCalls = 0
    narrative = undefined

## Fail-closed

Production /api/readings에서는 relationship general, annual spouse, wealth, career, business, general natal, question-specific, unknown, compatibility, spouse + targetPersonRef를 계속 거부한다.

## 역사적 판정 보존

SA-5Z와 SA-5AA가 당시 확인한 deployed /api/readings = 404 증거는 현재 런타임을 재관찰하는 방식으로 덮어쓰지 않는다.

Preview-only 이전 composition을 명시적인 historical baseline helper로 보존하고, 기존 SA-5Z/SA-5AA 판정은 그 시점의 의미를 유지한다.

## 최종 권한

    spousePositionOnlyProductionTransportAuthorityActive = true
    spousePositionOnlyProductionSemanticDeliveryAuthorityActive = true
    nonSpouseProductionSemanticAuthorityAuthorized = false
    persistenceAuthorityAuthorized = false
    publicSemanticAuthorityAuthorized = false
    publicGeneralAvailabilityAuthorityAuthorized = false
    commerceAuthorityAuthorized = false
    production = ACTIVE_BOUNDED

## 완료 판정

    POSITION_ONLY_PRODUCTION_DELIVERY_ACTIVATION_IMPLEMENTED

다음 disposition:

    CLOSE_SPOUSE_POSITION_ONLY_PRODUCTION_VERTICAL_SLICE_AND_RETURN_TO_ENGINE_COMPLETION

이 단계 뒤에 배우자궁 위치 한정 경로를 위한 추가 미세 권한 리뷰는 만들지 않는다.
