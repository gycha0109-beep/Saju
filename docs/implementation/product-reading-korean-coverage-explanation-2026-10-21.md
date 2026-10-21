# 근거 부족 사유를 한국어로 전달하는 제품 응답

2026-10-21 · Watchtower-Track: saju

기존 제품 응답은 근거 부족 상태(`partial_evidence`, `insufficient_evidence`, `unsupported_intent`)에서 근거 개수만 제공했다.
이제 기존 `ProductReadingResponse.coverage.explanation`에 해당 scope의 **한국어 사유**를 함께 포함한다.

- 각 요청에서 실제 빠진 `ReadingClaimSelectorGroup.requirementId`의 **엄격한 분류**만 사람에게 읽을 수 있는 한국어로 번역한다.
- 예: `NATAL_GENERAL_FOUNDATION_CLAIM_REQUIRED`는 '원국의 기본 구조에 대한 풀이 근거', `NATAL_GENERAL_SYNTHESIS_CLAIM_REQUIRED`는 '명식의 여러 특징을 종합할 해석 근거'.
- `annual/monthly/compatibility/question/life_stage` 역시 **없는 시간/상대/질문 해석 근거를 만들지 않고 부족함을 알려준다**.
- 알 수 없는 내부 조건은 일반 부족 근거로만 표시하고, `Claim ID`, `Rule ID`, `sourceId`, 내부 프로필/룰 버전은 사용자에게 공개하지 않는다.
- 기존 JSON 속성/상태/유효한 `ProductReadingResponse`를 변경하지 않고 **옵션 속성**으로 하위 호환을 유지한다. 결과 예측, 낙관적 성공, researcher-only 승격 금지.
- 소비자 화면은 `coverage.explanation`을 표시해 `왜 풀이가 없나`를 전달할 수 있다.

신규 사주 의미·해석 규칙/TrustGrant·권한·HTTP 경로·판매 허가 변경 없음.