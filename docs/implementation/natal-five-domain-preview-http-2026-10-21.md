# 동일 원국 5개 분야 Preview HTTP 연결

2026-10-21 · 기존 제품화 [#2626](https://github.com/gycha0109-beep/Saju/issues/2626) 후속 기능

- `POST /api/preview/natal-five-domains` JSON: `{"birth":{"calendarType":"solar","date":"2024-03-10","time":"12:00"},"outputPreferences":{"preferredDetail":"standard"}}`.
- 기존 Product Preview 서버의 같은 Bearer 인증·입력 크기 제한·JSON 검증을 이용한다. **Production-only reading host에는 이 경로가 없어 404**를 반환한다.
- 생년월일→Canonical **계산 1회** → 서로 구별되는 다섯 ReadingIntent 별 `interpret(...,resolvedReadingRequest)` **5회** → 기존 `runProductReadingInternals` / `ProductReadingResponse` → 전송용 `domains[]` 묶음.
- `deliveryState`는 읽을 수 있는 분야 응답의 전달 상태만 나타내며 완성된 종합 사주·공식 사용/판매 권한을 뜻하지 않는다.
- 부분 미지원 분야는 지원 중인 다른 메뉴에 영향을 주지 않는다. 독립 source-bound rule/reading profile 및 기존 Meaning authority를 그대로 사용.
- 현재는 Preview HTTP **실제 호출 경로**이며 명하 Web/Mobile Reader 화면 연결은 별도 담당. Unknown-hour, 미래 예측, research HOLD는 기존 각 분야 검사에 맡긴다.

## 구현 보정

기존 공용 `createMyeonghwaProductHost`는 `requestReading` **하나만 제공**하도록 보존한다. 다섯 분야 일괄 호출은 내부 `createMyeonghwaPreviewNatalFiveDomainHost` 전용으로 분리하고, 승인된 Preview E2E 팩토리에서만 opt-in 병합한다. 공개 ProductHost export 계약 및 Production-only 경로는 그대로 유지한다.
