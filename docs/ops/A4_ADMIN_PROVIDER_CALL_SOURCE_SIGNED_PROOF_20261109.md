# Admin A4 — 소스측 AI 공급사 호출 영수증 서명 후보 (2026-11-09)

- 기존 요청별 source correlation 모듈과 실제 OpenAI `onProviderCall` 내부 관측 출처를 이어주는 **서버 전용** 서명 모듈: `src/production/reading-ai-provider-call-source-proof-v1.ts`.
- `saju-provider-call-source-proof-v1` 증명은 Saju가 발급한 `externalRequestRef`, 사전 준비된 명하 실행 시도 UUID, 해당 호출의 `callId/requestId/modelKey/observedAt/usage/outcome`를 보호하는 HMAC-SHA256이며, 도메인/issuer/audience/keyId로 분리함. 프롬프트/응답/출생 입력·키 비밀은 영수증에 포함하지 않음.
- MyeongHa의 `reading-ai-saju-signed-call-source-v1.ts` 독립 검증 후보와 서명 도메인 및 canonical JSON 계약을 맞춤. 통합 테스트/실서비스 호출·사용량 대조는 미실시.
- Source signer는 현재 독립 함수이며 Saju Production HTTP에서 자동 활성화되지 않음. Caller가 서버 전용으로 진짜 발급·DB attempt admission을 검증하고, 서명 영수증을 소스 소유 불변 저장소에 원자적 보존해야 함. 재처리·관측 누락·청구 정산 검증도 필요.
- 신규 단위 테스트 3건·TypeScript·ESLint 통과. 운영 비용 수집 OFF, 계정/회원/결제/크레딧/DB 데이터 변경 없음.
