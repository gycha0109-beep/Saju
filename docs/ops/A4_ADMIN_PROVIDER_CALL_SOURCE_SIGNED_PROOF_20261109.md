# Admin A4 — 소스측 AI 공급사 호출 영수증 서명 후보 (2026-11-09)

- 기존 요청별 source correlation 모듈과 실제 OpenAI `onProviderCall` 내부 관측 출처를 이어주는 **서버 전용** 서명 모듈: `src/production/reading-ai-provider-call-source-proof-v1.ts`.
- `saju-provider-call-source-proof-v1` 증명은 Saju가 발급한 `externalRequestRef`, 사전 준비된 명하 실행 시도 UUID, 해당 호출의 `callId/requestId/modelKey/observedAt/usage/outcome`를 보호하는 HMAC-SHA256이며, 도메인/issuer/audience/keyId로 분리함. 프롬프트/응답/출생 입력·키 비밀은 영수증에 포함하지 않음.
- MyeongHa의 `reading-ai-saju-signed-call-source-v1.ts` 독립 검증 후보와 서명 도메인 및 canonical JSON 계약을 맞춤. 통합 테스트/실서비스 호출·사용량 대조는 미실시.
- Source signer는 현재 독립 함수이며 Saju Production HTTP에서 자동 활성화되지 않음. Caller가 서버 전용으로 진짜 발급·DB attempt admission을 검증하고, 서명 영수증을 소스 소유 불변 저장소에 원자적 보존해야 함. 재처리·관측 누락·청구 정산 검증도 필요.
- 신규 단위 테스트 3건·TypeScript·ESLint 통과. 운영 비용 수집 OFF, 계정/회원/결제/크레딧/DB 데이터 변경 없음.

## 2026-11-09 — 요청별 호출 증거 누락 관측 후보 (OFFLINE)

- 실제 OpenAI adapter의 `onProviderCall`에서 오류를 삼키더라도, 동일한 비동기 실행 범위에서 `observedCallbacks`, `acknowledgedReceipts`, `failedCallbacks`, `pendingCallbacks`를 집계하는 `withAuthorizedReadingAttemptAndCoverage()`를 추가.
- 실행 성공/실패 양쪽에서 **필수 외부 영구 보존 콜백**에 상태를 전달. 콜백 실패를 무시하지 않으며 AI 실행과 기록이 모두 실패한 경우 두 오류를 함께 보존.
- 결과의 `completeCostCoverage`는 항상 `false`로 고정. 이 수치는 소스에서 관측한 이벤트만 의미하며 전체 공급사 호출 건수·정산 일치를 증명하지 못함. 운영 저장소, 실제 발급 HTTP, DB attempt 외부 ref 연결은 아직 HOLD.
- 기존 `withAuthorizedReadingAttempt()` 사용법은 유지하고, 실행 종료 후 비동기 콜백이 재사용된 컨텍스트로 잘못 귀속되는 상황도 차단.
- 기존·신규 테스트 8건, TypeScript, ESLint 검증 통과. 운영 데이터·설정/비밀번호/비용 수집 변경 없음.

## 2026-11-10 — 서명 영수증 불변 저장·재조회 포트 (오프라인 구현)

- `src/production/reading-ai-signed-provider-receipt-emitter-v1.ts`: 실제 서버 전용 `SajuSourceProviderCallLinkV1`을 기존 HMAC signer로 서명하고, 독립 영속 저장 포트 `appendOnceAndRead`가 원자적 callId 최초 삽입 후 이미 확정된 영수증을 반환할 때만 관측 콜백 성공으로 간주한다.
- 반환된 영수증의 issuer/audience/keyId, 실행 시도 ID, source ref, callId/requestId, 모델·결과·시각·토큰 전체가 입력과 정확히 일치하고 HMAC 서명이 검증되는지 재생성 후 상수 시간 비교한다. 기존 callId 충돌로 내용이 다른 영수증이 반환되면 거부. 저장 실패·미조회·변조도 예외로 전달되어 요청별 관측 누락 경로에 반영 가능.
- `test/reading-ai-signed-provider-receipt-emitter-v1.test.ts`: 정상 저장·동일 재생 멱등·사용량/시도/참조 충돌·변조·누락·저장 장애·사전 승인 scope 밖 호출 무기록 6건. 기존 출처 범위 4건, 서명 3건과 합계 13건 통과. TypeScript, ESLint, Prettier 검사 통과.
- **중요:** 이것은 저장소 구현 자체가 아닌 영속 저장 **포트와 서명 저장 어댑터**다. 실제 DB 또는 객체 저장소의 원자적 UNIQUE(callId) 최초 삽입·불변 보존·인증된 재조회 구현, 비밀키 바인딩, Production Interpretation Authority 사전 입장, DB 실행 종료 참조 대조, 명하 비용 Writer 연결은 아직 HOLD. 이 코드만으로 실제 공급사 호출 관측의 완전성 또는 비용 수집 활성화를 주장할 수 없다.
- 비밀키·고객·Reading/결제/크레딧·운영 DB·Worker 설정 변경 없음. `ROADMAP_COMPLETE` 아님.
