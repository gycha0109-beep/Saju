# N30a — 5개 Natal Preview 분야 공통 명식의 표시 무결성

2026-10-18 · Watchtower-Track: saju · 내부 Preview 소비자 합성 안전성

## 실제 결함 경계

기존 N2 synthesis는 **서로 다른 resolved 값**과 **Canonical에서 미확정인 시주의 허위 확정**은 막았다. 그러나 Canonical에서 이미 확정된 연·월·일·시주를 어느 분야의 Product 응답이 `unavailable` 또는 `ambiguous`로 누락시켜도 N16/N21의 합성에서 조용히 넘어갈 수 있었다. `delivered`인데 `reading`이 없는 응답도 빈 분야로 간주했고, 출생시각 미상임에도 `birthInputDisplay.time`이 표시될 수 있었다.

## 수정

`src/preview/natal-grounded-reader-brief.ts`의 N16/N21 진입 게이트에 정확한 Canonical snapshot의 모든 기둥과 소비자 표시 값·상태의 완전 대조를 추가했다.

- 확정 기둥: Product 응답이 반드시 `resolved`이고 한글 간지/한자 표기까지 정확히 동일해야 한다.
- 미확정 기둥: `resolved`로 위장할 수 없다(기존 규칙 유지).
- 시간 미상: `timeKnown:false`와 동시에 구체적인 시각을 표시할 수 없다.
- `delivered` / `delivered_with_fallback`: 해당 응답에서 reading이 빠졌으면 통합 보고서 생성을 중단한다.
- 실제 기존 5분야 Product 본문/읽기 섹션/의미 원문/근거·권한은 바꾸지 않는다.

## 회귀

`test/natal-n21-reader-first-story.test.ts`에서 원래 전달된 문장 보존과 함께 확정된 월주의 미확정 강등, 본문 없는 delivered, 미상시각의 허위 시각을 음성 검증한다. CI 기존 테스트 흐름으로 실행하며 작업 전용 Workflow는 신설하지 않는다.

이는 **N30 첫 안전성 슬라이스**일 뿐이다. 다섯 분야 의미를 새로 승인하거나 기존 General의 전통 주제를 타 분야 개인 결과로 승격하지 않는다. N29 전체의 사용자 가치 판정과 P0-NATAL은 여전히 `usefulComplete:false`, 공개·판매·Production 승격 없음.
