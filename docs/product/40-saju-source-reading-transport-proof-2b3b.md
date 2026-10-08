# Saju 2B-3B — 서버 전용 Preview 출처 전송 증빙 계약 v1

> 상태: HMAC 발급/검증 순수 계약. **실제 HTTP 발급/명하 접속/Production Interpretation Authority는 미연동·HOLD**.
> 선행: [PR #2409](https://github.com/gycha0109-beep/Saju/pull/2409) / 후속: [Issue #2410](https://github.com/gycha0109-beep/Saju/issues/2410).

## 구현 범위

- `src/reading/source-reading-transport-proof.ts`: HMAC-SHA256 server-only MAC 발급기와 소비자 측 검증기.
- `test/source-reading-transport-proof.test.ts`: 정상 전송 무결성 검증, Body/Profile/Evidence tampering, issuer/audience/key/nonce mismatch, clock/TTL/replay, storage error.
- Saju 2B-3A의 **내부에서 생산·검증한 readiness material**이 있을 때만 발급. 무조건 `lifecycle=preview`, `productionInterpretationAuthority=NOT_EVALUATED`, `releaseAuthorization=NOT_EVALUATED`, `canExecute/canPublish/canSell=false`.
- 서버가 실제로 처리한 `ProductHostRequestBody`의 결정론적 내용 해시와 `ProductReadingResponse v2`의 해시, 응답 식별자, snapshot/run/registry, profile ID/version/contentHash 및 근거 bundle hash를 하나의 MAC에 결속.
- 검증자: 고정 issuer/audience/key ID, 예상 nonce·request body·response body 해시, 2분 이하 TTL, clock skew, HMAC timing-safe 검증, **모든 인스턴스에서 원자적으로 공유되는 nonce 소비 저장소**가 성공했을 때만 HOLD 검증 성공.
- 별도 버전/키 ID + 도메인 분리. 검증 결과에는 내부 사용자 정보와 Reading 원문이 담기지 않음.

## 중요한 보안·권한 경계

1. HMAC은 **발급 키 보유 및 바이트 무결성**만 인증한다. 원전의 의미·실제 Source Citation·Claim 품질 또는 Production 해석 승인을 보증하지 않는다.
2. 서버 간 키는 최소 32바이트이며 비밀 저장소 관리, 서비스 신원 검증 및 교체 정책이 선행되어야 한다. 키를 Repo/env 로그/클라이언트/HTTP 공개 경로로 노출하면 안 된다.
3. `issueHeldSourceReadingTransportProofV1`의 `readiness`는 신뢰된 Saju 인프로세스 3A 검사에서 즉시 생산된 인자여야 한다. 사용자 전달 readiness/material을 서명하는 호스트는 금지.
4. `executedRequestBody`는 서버가 실제 파싱·실행한 본문이어야 한다. 클라이언트가 선언한 Digest에 서명 금지.
5. 검증자 `expectedRequestBody`와 `expectedNonce`는 **명하의 인증된 서버 실행 컨텍스트**에서 독립적으로 얻어야 한다. Saju가 명하 Subject ID, Birth Revision을 자체 승인했다고 간주하지 않는다.
6. 검증자의 `claimNonceOnce`는 Redis/DB 등 원자적 공유 저장소로 구현해야 한다. 예제에서 테스트용 Set은 실제 배포 불가. 저장소 실패는 무조건 BLOCKED.
7. Preview/Production 별도: 2B-3B는 `preview`에만 발급. 공식 Reading Release/판매 연동 금지.
8. 내부 증빙에는 Source 식별자가 들어가므로 소비자용 `ProductReadingResponse v2`에 붙이지 않는다. 전송 시 서버 인증·보안 경계 확정 필요.

## 아직 미구현 (2B-3B 후반/2B-3C)

- Saju Product Host가 하나의 원본 요청으로 3A readiness와 v2 응답을 원자적으로 발급해 MAC을 부착하는 **실제 보호된 HTTP 호출 경로**.
- 명하 서버에서 발급 키 신뢰, 현재 Birth Revision과 예상 요청 바디, 공유 nonce 저장소를 결속한 실 검증 어댑터.
- Production Interpretation Claim/source authority를 Source Owner가 실제로 승인한 증빙 및 실제 상품 실행.
- 키 교체/폐기와 nonce 원자 저장소 장애시나리오 운영 검증.

## 종료 조건

- A. Source-owned 기존 자료 바탕 HMAC 요청/응답 변조 방지 및 replay contract: 본 PR 대상.
- B. 기존 Saju CI와 pinned Integration 모두 통과: 병합 요건.
- C. 실제 Product/Character/Commerce/Production 권한은 여전히 HOLD: 필수 불변.
