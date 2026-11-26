# Admin A4 사주 공급사 호출·Reading 실행 결속 — 출처측 구현 (2026-11-09)

- Saju 실제 OpenAI Responses 어댑터의 서버 전용 `onProviderCall`에 연결할 **소스 소유자 요청 범위 어댑터**: `src/production/reading-ai-source-call-correlation-v1.ts`.
- MyeongHa에서 구매/현재 Birth/Reading 권한을 확인한 **사전 할당된 실행 시도 UUID**만 허용. 이 확인 자체는 본 모듈이 수행하지 않으며 외부 HTTP나 브라우저가 직접 호출할 수 없음.
- Saju 쪽에서 새 `externalRequestRef`를 직접 발급하고, 실제 공급사 호출 관측값(requestId/callId/model/시각/토큰/실패)을 동시에 묶어 발행. 비동기 동시 요청 간 연결이 섞이지 않도록 요청 범위 격리. 사용량이 관측되지 않은 실패는 null 유지.
- 단위 테스트 4개 및 TypeScript 검사 통과. 비용 쓰기/운영 DB/배포/라우트/가격·환율/청구 근거는 변경하지 않음.
- **미완료:** 인증된 Production HTTP 입구에서 사전 할당 시도를 제공하고, 실제 OpenAI 어댑터 콜백에 모듈을 설치하고, 발행된 source ref/호출 증거를 지속성 있는 별도 출처 저장소에 기록해야 함. 실제 Production 발급자는 아직 검증되지 않았으며 기존 Preview proof는 대체 불가.
- MyeongHa 종료된 Reading attempt에 원문 `external_request_ref`가 반영된 것을 독립된 DB reader로 대조하고, 해당 호출 단위의 출처 증명·실패 누락·재처리를 수용하기 전까지 비용 원장 수집과 완전 비용 집계는 HOLD.
