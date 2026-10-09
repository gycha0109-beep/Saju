# SA-5X — 배우자궁 위치 한정 Official Reading Preview 전달 권한 검토 v1

> Repository: `gycha0109-beep/Saju`  
> Track: `saju-bridge`  
> Issue: #2060  
> Scope: `relationship:natal:spouse`  
> Status: implementation review candidate

## 1. 목적

SA-5W에서 구현된 배우자궁 위치 한정 기능이 실제 Preview HTTP 경로에서도 Official Reading으로 전달되는지 검토한다.

검토 대상:

```text
POST /api/preview/readings
→ service Bearer boundary
→ source-owned Product Reading response admission
→ Preview lifecycle attestation
→ official_reading
→ official artifact
```

새로운 명리 의미, Production 권한, 저장 권한, Commerce 권한을 만들지 않는다.

## 2. 고정 의미 계약

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

## 3. 검토 조건

다음을 모두 요구한다.

- 인증 없는 Preview 요청은 JSON 해석 전에 `401 HOST_AUTH_REQUIRED`
- 인증된 배우자 Preview 요청은 HTTP 200
- `x-myeonghwa-product-reading-response-admitted`가 현재 Product Reading response version과 일치
- `x-myeonghwa-reading-lifecycle = preview`
- response `state = delivered`
- Reading ID는 `official_reading_` 계열
- 요약과 필수 한정문 유지
- 금지 배우자 의미 확장 없음
- SA-5W 실행에서 `modelCalls = 0`, `narrative = undefined`
- 직접 사실은 `pillars.day` 하나
- Preview-enabled process에서 `/api/readings`는 계속 `404 HOST_ROUTE_NOT_FOUND`
- public semantic / commerce / persistence / public-GA / Production 권한은 계속 닫힘

## 4. 성공 판정

모든 검사가 통과하면:

```text
AUTHORIZE_POSITION_ONLY_OFFICIAL_READING_PREVIEW_DELIVERY
```

을 기록한다.

이 판정은 다음을 의미하지 않는다.

```text
Production activation
public semantic authority
persistence authority
commerce authority
public general availability
```

따라서 다음 경계는 유지한다.

```text
production = HOLD
nextDisposition = HOLD_POSITION_ONLY_BROADER_AUTHORITY_PENDING_SEPARATE_REVIEW
```
