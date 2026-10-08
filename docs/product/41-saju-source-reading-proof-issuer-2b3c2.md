# Saju 2B-3C-2 — 보호형 Preview Source Reading Proof HTTP 발급

> 상태: Preview-only 보호형 서버 간 발급 경로. **Production Interpretation Authority/출시/판매는 HOLD.**
>
> 선행: [Saju #2418](https://github.com/gycha0109-beep/Saju/pull/2418) (단일 실행)
> / [Saju #2410](https://github.com/gycha0109-beep/Saju/issues/2410) (발급 근거)
> / [MyeongHa #1728](https://github.com/gycha0109-beep/MyeongHa/issues/1728) (소비자 측 후속).
>
> Watchtower-Track: saju-bridge

## 1. 범위와 호출 경계

- 서버 전용 factory: `createMyeonghwaSourceReadingProofIssuerHttpServerV1(dependencies, options)`.
- 유일한 경로: `POST /api/internal/preview/source-readings`.
- 별도 HTTP server factory로 구성한다. **기존 `/api/readings`, `/api/preview/readings`, `/api/calculations`, 정적 UI, Character 경로를 게시하지 않는다.**
- 실제 배포 서비스, DNS, 공개 인입, 포트 및 Secret provisioning은 본 구현에서 활성화하지 않는다. 인증된 서버 환경에서 호출하는 어댑터/테스트 계약만 마련한다.
- 기존 `ProductReadingResponse v2` 소비자용 응답 스키마는 수정하지 않는다. Signed proof는 별도 보호 HTTP wrapper의 `proof` 필드에만 포함한다.

## 2. 보호형 요청/응답

서버 인증: `Authorization: Bearer <dedicated-service-credential>`.
`Content-Type: application/json`, 상한 16KiB, `Cache-Control: no-store`.

요청의 허용 키는 정확히 `nonce`, `request`이다.

```json
{
  "nonce": "abcdefghijklmnopqrstuvwx",
  "request": {
    "birth": { "calendarType": "solar", "date": "2001-07-14", "time": null },
    "reading": { "text": "전체 사주" }
  }
}
```

`nonce`: 인증된 **명하 서버**가 CSPRNG로 생성하는 base64url 등의 충분히 예측 불가능한 22~128자 ASCII 식별자. Saju는 형식만 검사하며 난수 엔트로피를 보증하지 않는다. 동일한 nonce를 재발급 요청에 사용하는 것이 불가능하다고 주장하지 않는다. **명하 검증기**가 모든 replica가 공유하는 원자적 nonce claim으로 재생을 차단한다.

Saju에서는 `parseProductHostReadingRequest()`로 본문을 검사·정규화하고, **동일한 계산/해석/렌더 실행**의 정규화 본문을 `executedRequestBody`로 내부적으로 회수한다. 클라이언트가 준 `requestBodyHash`, source proof, profile ref, production flag는 입력받지 않는다.

성공 응답:

```text
{
  schemaVersion: "myeonghwa-source-reading-proof-http-v1",
  lifecycle: "preview",
  state: "held",
  response: ProductReadingResponseV2,
  proof: { payload: SourceReadingTransportProofPayloadV1, signatureHex: string },
  productionInterpretationAuthority: "NOT_EVALUATED",
  releaseAuthorization: "NOT_EVALUATED",
  canExecute: false,
  canPublish: false,
  canSell: false
}
```

`proof.payload`는 버전/발급자/대상자/keyId/nonce/시각/정규화 요청 해시/응답 해시/동일 실행의 source material을 MAC으로 결속한다. `response`에는 기존 소비자용 내부 source 정보를 주입하지 않는다.

## 3. 서명과 신뢰 범위

1. `createMyeonghwaProductionServiceBearerAuthorizer`의 timing-safe 서비스 Bearer 검사 성공 **후** 읽기와 계산을 수행한다. 키 교체 시 이전 Bearer는 별도 옵션으로 명시적인 범위에서만 허용한다.
2. 전용 HMAC 키를 최소 32바이트로 구성하고 Bearer와 분리한다. `issuer`/`audience`/`keyId`는 **서버 구성**에서만 받는다. 만료기간 기본 60초, 허용 상한 120초. 시각도 서버에서 생성한다.
3. `createMyeonghwaSourceReadingProofHost`의 `readiness`가 `held`이고 기존 발급기의 검사가 통과한 경우에만 서명한다. 계산 및 해석은 재실행하지 않는다.
4. 비밀키는 시작할 때 메모리로 복제한다. 저장소·코드 로그·브라우저에 설정값을 노출하지 않는다. 운영 비밀 관리·키 폐기/교체·네트워크 TLS/서비스 인입 제어는 배포 시 별도 충족이 필요하다.
5. HMAC 검증은 **전송 출처/무결성만** 증명한다. Source meaning, 실 Production Claim 허가, 사용자/출생 revision 권한, SKU 구매 권한을 증명하지 않는다.
6. Saju는 명하의 canonical `subject_id`, `birth_profile_revision`을 자체 인증하거나 확인하지 않는다. 명하가 자신의 인증 실행 문맥에서 예상 요청 본문, nonce 및 검증에 사용한 Birth Revision을 독립적으로 pin해야 한다.

## 4. 오류 처리 (fail closed)

| 실패 | HTTP 코드 | 차단 |
| --- | --- | --- |
| 인증 불충분 | 401 | body 처리 이전 종료 |
| nonce/shape/내부 요청 오류 | 400 | 해시 서명 금지 |
| JSON Content-Type 불일치 | 415 | 처리 금지 |
| 16KiB 초과 | 413 | 처리 금지 |
| 원천 증빙 미충족 / 발급기 거부 | 409 | 증빙 응답 없음 |
| 계산·해석 오류 또는 시계 결함 | 500 | 내부 정보 제거 |
| 정상 발급 | 200 | Preview HOLD만 반환 |

서비스 인증·HMAC 구성 부정합은 서버 생성 시 예외로 차단한다. 모든 응답은 `no-store`이며 상세 Source 디버그 내용은 HTTP 오류에 포함하지 않는다.

## 5. 테스트 및 차기 단계

- HTTP 수준 정상 발급 → 기존 `verifyHeldSourceReadingTransportProofV1`로 일치 검증.
- 단일 실행 횟수 검사, MAC/요청/nonce/응답 결속, 중복 nonce 검증자 측 차단.
- 인증 실패·요청 주입·결손 근거·키/TTL 부정·본문 크기/형식·일반 경로 격리.
- 기존 CI + SHA-pinned 통합 CI만 재사용. 별도 장기 CI나 새로운 GitHub workflow를 만들지 않는다.
- 다음 단계 2B-3C-3: 명하 서버 verifier 어댑터, 중앙 replay 저장소, 실제 Subject/Birth Revision 연동.
- 이 단계의 synthetic fixture/Preview proof는 Production 의미 권한 근거가 아니며, `canExecute/canPublish/canSell=false`를 강제한다.
