# 고객용 사주 화면에 기존 계산 사실 표시

2026-10-21 · Track: saju

Saju의 `ProductReadingResponse.reading.calculationSummary`에는 연월일시 기둥 외에도 `calendar`, `fiveElements`, `tenGods`, `luckPillars`, `ambiguity`가 이미 존재한다.

기존 `src/host/static-page.ts`는 사주 네 기둥만 렌더링해 **제품 응답이 가진 계산 사실 대부분을 실제 고객에게 표시하지 않았다**. 이번 변경으로 다음 정보가 있을 때 표시한다.

- 달력 및 절기: 기존 label/value/status 그대로 표시
- 오행 계산 정보: 정확히 계산된 결과만 표시
- 십신 계산 정보: 결과 자체만 보여주고 성격·직업·재물의 새 의미 추론을 하지 않음
- 대운 계산 정보: 기존 canonical 운세 구조 사실만 표시
- 출생시각 미상 등 `ambiguity`: 명시적인 제목·설명으로 알려줌

`status`가 `ambiguous` 또는 `unavailable`이면 숫자를 지어내지 않고 '확정되지 않음' 또는 '확인할 수 없음'을 표시한다. 기존 JSON 필드나 명리 권한을 바꾸지 않고 **이미 있는 사실의 사용자 노출만 개선**한다.

이 변경은 [5분야 브라우저 화면 #2637](https://github.com/gycha0109-beep/Saju/pull/2637)에 스택되며, 해당 구현의 단일/일괄 두 화면 모두 `renderReading`을 공유한다.

## 중복 표시 개선

단일 Canonical 명식이 보장되는 Preview 일괄 응답에서는 **원국 계산 정보·오행·십신·대운·불확실성**을 상단 한 번만 표시하고 각 분야는 서로 다른 해석 문단으로 구분한다. 개별 API 5회 폴백은 동일 Snapshot이 보장되지 않으므로 분야별 계산 정보를 삭제하지 않는다. 이 UI 분리는 기존 의미 Claim과 계산을 변경하지 않는다.
