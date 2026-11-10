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

## 2026-11-10 — A4 출처 영수증 PostgreSQL 불변 보존·서버 전용 재조회 (오프라인)

- 앞선 서명·저장 후 재검증 [PR #2767](https://github.com/gycha0109-beep/Saju/pull/2767)은 정확한 HEAD `e7aca48c1661f41f9c499f3735301fb0cc1368b6`에 대한 [필수 Integration #42740408956](https://github.com/gycha0109-beep/Saju/actions/runs/42740408956) SUCCESS 후 병합. 본 구현은 그 최신 상태에서 진행했으며 기존 기능을 재구현하지 않는다.
- `src/production/reading-ai-provider-receipt-postgres-v1.ts`: 출처 전용 PostgreSQL Writer를 통한 `callId` UNIQUE 원자적 최초 INSERT + 독립 SELECT 재조회 + COMMIT 성공 이후 영수증 반환. `READ COMMITTED`의 동시 INSERT 충돌 후 새 명령문 조회 경계를 지킨다. `synchronous_commit=on`을 거래에 설정한다. 조회 전용 별도 Reader는 호출 ID 하나로만 서명 증거를 조회하며 UI/HTTP 라우트에 노출하지 않는다.
- `docs/ops/A4_ADMIN_PROVIDER_RECEIPT_SOURCE_POSTGRES_OFFLINE_V1.sql`: 새 출처 소유 보존 스키마의 폐기형 설치 후보. Writer/Reader 각각 비밀번호 없는 별도 최소 권한 역할, RLS 전용 정책, `call_id` 기본키, 본문과 호출 ID 결속 CHECK, 변경 금지 트리거. UPDATE/DELETE/CREATE/TRUNCATE 및 외부 역할 접근 차단. 기존 명하 Reading·계정·결제·크레딧 테이블에는 어떤 SQL도 적용하지 않는다.
- `test/reading-ai-provider-receipt-postgres-v1.test.ts`: 정상 저장·조회, 재시도/영수증 충돌, 잘못된 역할 거부, 형식 오류, 저장/커밋 장애, 사전 승인 범위 밖 무기록, 조회 실패의 7건. 관련 기존 10건 포함 총 17건 및 TypeScript·ESLint·Prettier 통과.
- 임시 Docker PostgreSQL **17.11**에 해당 SQL 설치·권한 검증: Writer INSERT/중복 멱등, Reader SELECT, Writer 미허용 열·UPDATE 거부, Reader INSERT 거부, 소유자 변경 금지 트리거, 계정 비밀번호 NULL 총 8개 검사 성공. 임시 DB만 사용. 실제 운영 연결·데이터·키·고객 정보 변경 없음.
- **운영 HOLD:** 설치 파일은 Production 미적용. 실제 출처 소유 저장소의 운영 승인된 설치 위치, 전용 로그인/암호화 연결, OpenAI 콜백 설치, 승인된 사전 DB attempt admission, Saju 원본 ref 최종화, MyeongHa 서버 전용 검증·Writer 및 실호출 완전성 확인이 필요하다. 임시 DB 성공이나 로컬 테스트는 비용 수집 활성화·정산 완전성 증거가 아니다. `ROADMAP_COMPLETE` 아님.

## 2026-11-10 — A4 요청별 관측 누락 증거 영구 기록 (오프라인)

- 신규 `src/production/reading-ai-provider-coverage-postgres-v1.ts`: 기존 `withAuthorizedReadingAttemptAndCoverage()`가 전달하는 호출 횟수·기록 성공·기록 실패·미완료 수치 및 실행 성공/실패 상태를 사주 출처 전용 Writer로 `INSERT ... ON CONFLICT DO NOTHING`한 후, 정확히 같은 원본이 재조회되고 COMMIT된 경우에만 기록 완료로 수용합니다. 중복 실행에서 숫자·상태가 달라지면 충돌로 거절하고, Writer 역할이 아니거나 저장·조회·COMMIT 실패 시 요청 완료를 인정하지 않습니다.
- 신규 `docs/ops/A4_ADMIN_PROVIDER_CALLBACK_COVERAGE_OFFLINE_V1.sql`: 기존 오프라인 출처 영수증 스키마 다음에 설치하는 별도 후보. 사전 조건, 실행 시도별 기본키·출처 ref 유일 제약, 필드/카운터·`completeCostCoverage=false` 검증, RLS, 전용 Writer INSERT/SELECT 한정, Reader 접근 거부, 변경 금지 트리거. 사용자/결제/크레딧/운영 DB는 변경하지 않습니다.
- 신규 테스트 7건, 기존 관련 테스트 포함 총 18건, TypeScript/ESLint/Prettier 통과. 폐기형 PostgreSQL 17.11에서 원본 SQL + 추가 SQL 순차 설치 성공, 기록·재실행·Reader 거부·변경 금지·추가 열 거부·거짓 완전성 주장의 8개 검사 성공. 임시 DB는 폐기했습니다.
- `observedCallbacks`는 **관측된 콜백만의 분모**입니다. Provider 전체 호출과 청구 완전성은 불명확하므로 저장한 수치가 모두 성공이어도 `completeCostCoverage=false`만 허용합니다. 추후 실제 공급사 청구 대조/소스 누락 감지·재처리는 별도 잔여 작업입니다.
- **HOLD:** 이 코드는 기존 역할의 실제 운영 접근·비밀번호·연결, Production HTTP 및 Provider Adapter 자동 설치, Source/DB attempt 발급·승인/완료 참조 연결, 명하 Cost Writer 수집을 수행하지 않습니다. 독립 소스 DB를 설치하거나 운영 비용 수집을 켠 것으로 해석하지 않습니다. `ROADMAP_COMPLETE` 아님.

## 2026-11-10 — 실제 OpenAI 콜백 ↔ 서명·누락 영수증 비공개 실행 조합 (오프라인)

- `src/production/reading-ai-a4-private-provider-capture-v1.ts`: 기존 실제 `OpenAIResponsesNarrativeAdapter.onProviderCall`이 반환하는 서버 전용 이벤트를, 준비된 실행 시도 1회용 사전 승인 포트 통과 후, 요청별 Scope → 서명된 Source 영수증의 출처 소유 PostgreSQL 불변 저장 → 호출 관측·기록 실패/대기 결과의 PostgreSQL 영구 기록으로 묶는 **명시적 내부 설치 후보**를 추가했다. 승인 포트 부재/거부는 유료 호출 이전에 차단한다.
- `test/reading-ai-a4-private-provider-capture-v1.test.ts`는 **실제 OpenAIResponsesNarrativeAdapter 클래스**와 모의 HTTPS fetch를 결합하여 반환 토큰, 서버 원본 요청 ID, 실행 시도 UUID/발급 ref, HMAC signed receipt, 실행 성공/실패 coverage를 검증했다. 공급사 네트워크 실패는 토큰 `null`로 저장하고, 영수증 저장 실패를 adapter가 격리해도 `failedCallbacks`가 영구 기록되며, coverage 기록 실패 시 성공한 결과도 완료로 수용하지 않는 조건 확인. 승인 거부·Scope 밖 호출·DB Reader 오용도 검사.
- 신규 7건 및 관련 기존 합계 21건, TypeScript/ESLint/Prettier 통과. OpenAI 실제 API 통신/유료 호출은 수행하지 않았다.
- **운영 미연결/HOLD:** 이 조합 자체는 현재 Product Host, Production HTTP, 명하 요청 라우팅에 설치하지 않았다. `admitAndConsumePreparedAttempt`는 진짜 서버 간 인증과 DB 권한 검증에 의해 한 번만 승인되는 외부 Source Authority 구현이 필요하며, 단순 `true` 스텁을 운영에 넣는 것은 금지된다. 권위 있는 Saju 요청 ↔ DB 실행·종료 ref 동등성을 가정하지 않음. Source DB 설치 및 전용 접속 비밀, 실제 모델 결속, 실패 재처리, 청구·환율 대조 전 비용 원장 수집은 OFF. `ROADMAP_COMPLETE` 아님.

## 2026-11-10 — A4 인증된 Production HTTP 요청의 준비된 실행 시도 범위 연결 (오프라인)

- 기존 Saju [PR #2770](https://github.com/gycha0109-beep/Saju/pull/2770)의 실제 OpenAI 관측·서명 영수증·누락 기록 서버 내부 capture port를 기존 `/api/readings`의 Bearer 인증 완료 후 명시적으로 설치할 수 있는 `a4SourceCapture` 서버 옵션을 추가했다. **Production 설정에서 해당 옵션을 주지 않으면 종전 비A4 요청 동작 그대로이며, A4 ID 헤더가 있으면 409로 거부한다.**
- `x-myeongha-reading-execution-attempt-id`는 MyeongHa에서 실제 DB 단건 준비가 성공한 뒤 전달하는 UUID **식별 좌표**일 뿐 권한이 아니다. 이 헤더가 있거나 capture가 설치됐으면 정확한 UUID·Production 경로·capture 존재를 요구하고, capture 내부 `withPreparedAttempt()`에서 서버 전용 일회성 DB admission을 받기 전에는 `readingHost.requestReading()`을 실행하지 않는다.
- 승인된 scope가 완료되고 기존 ProductReadingResponse admission까지 통과한 경우에만 Saju 자체 발급 `saju_source_UUID`를 `x-myeongha-saju-external-request-ref` 응답 헤더로 반환한다. 헤더 자체는 HMAC 증명이 아니며, 실제 명하 DB 최종화에서는 Source 서명 영수증·종료 시도·ref 일치의 독립 검증이 필요하다.
- 별도 Preview host에 capture 설치 금지, 통합 Preview의 A4 헤더 거부, 외부 미인증 요청 차단, 누락·변조 UUID/영수증 ref/Source admission 실패 시 차단. `test/a4-prepared-reading-host-transport.test.ts` 신규 8건과 기존 실제 OpenAI capture 7건 및 인증 테스트 15건 포함 **30건 PASS**, TypeScript·ESLint PASS. 실제 OpenAI API나 운영 비용 수집 실행 없음.
- `a4SourceCapture`의 실제 운영 주입, 동일 OpenAI 어댑터 callback과의 결합, 신뢰 가능한 single-use Source admission 구현/인증, Saju Source 전용 영구 DB·Secret/TLS 설치, MyeongHa의 authenticated 외부 ref 조회·정본 DB finalize·비용 수집은 **HOLD**. 현재 미설치 hook이 존재한다는 사실만으로 실제 비용 수집 성공을 선언할 수 없다. `ROADMAP_COMPLETE` 아님.
