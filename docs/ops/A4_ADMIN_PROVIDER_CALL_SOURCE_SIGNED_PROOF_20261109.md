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

## 2026-11-11 — A4 출처 영수증·콜백 기록 불일치 대조 (오프라인)

- `src/production/reading-ai-a4-source-coverage-audit-v1.ts`: 사전에 발급된 실행 시도 UUID를 서버에서만 지정해 **기존 Saju 출처 영구 저장소의 두 불변 테이블**을 동일한 `BEGIN READ ONLY` 거래로 조회한다. 전용 Source Writer의 정확한 `current_user` 확인이 없으면 조회 거부. 별도 DB/역할·API·배치 Job·스케줄러·관리자 브라우저 권한은 추가하지 않는다.
- 요청별 `coverage.acknowledgedReceipts`와 실제 보존된 서명 영수증의 수를 비교한다. 각 영수증은 기존 도메인 HMAC-SHA256, 발급자/대상/키 식별자, DB 실행 시도 UUID, Saju 발급 ref, 호출 ID의 일치 여부를 검사한다. 영수증 누락·추가, 서명 위조·변조, 커버리지 누락·오류, 기록 실패·미완료, 500건 이상 조회 한계는 각각 명시 상태로 분리한다. 확인 불가능한 비용·호출을 0건/0원으로 보정하지 않는다.
- `test/reading-ai-a4-source-coverage-audit-v1.test.ts` 8개 신규 테스트와 기존 PostgreSQL 영수증·누락 기록 관련 테스트 14개 포함 **22건 PASS**, TypeScript/ESLint/Prettier PASS. 폐기형 PostgreSQL 17.11에서 기존 두 Source 오프라인 스키마 설치 후 **전용 Writer 역할로 두 테이블의 실제 SELECT 쿼리 성공**을 확인했으며 임시 DB는 즉시 종료했다.
- 결과 필드 `completeCostCoverage=false`는 상수다. 저장된 로컬 영수증과 관측 콜백이 맞아도 **실제 공급사 전체 HTTP 호출·청구·월간 완전성**은 검증하지 못한다. 추가 운영 환경의 전용 DB 접속·신뢰 가능한 Prepared Attempt 일회성 승인·Production Interpretation Authority·누락 공급사 호출 감지·실제 청구 대조가 필요하다.
- 이 기능은 명하 비용 원장·고객·결제·크레딧·운영 DB와 연결하거나 변경하지 않았으며 실제 호출·유료 API·비용 수집도 수행하지 않았다. **HOLD / `ROADMAP_COMPLETE` 아님.**

## 2026-11-11 — 명하의 서명된 DB 사전 승인 증명·Saju 일회성 사용 차단 (오프라인)

- `src/production/reading-ai-a4-signed-attempt-admission-v1.ts`: 명하 DB에서 정상 준비된 정확한 실행 시도 UUID의 **서버 전용 서명 증명**을 검증하는 `SajuA4PreparedAttemptAdmissionPortV1` 구현 후보. HMAC-SHA256 도메인 `myeongha/a4/prepared-attempt-proof/v1`, 발급자·대상·키 ID·정확한 Attempt/Reading/Subject·발급 시각·최대 120초 유효기간과 서명을 확인한다. 증명이 없거나 변조·만료·발급 대상을 잘못 지정하면 DB를 접속하지 않고 거절한다.
- `docs/ops/A4_ADMIN_SIGNED_PREPARED_ATTEMPT_CLAIMS_OFFLINE_V1.sql`: 기존 Saju Source 출처 스키마에 **별도 최소권한** 일회성 Claim Writer 역할 및 `execution_attempt_id` 기본키 불변 테이블 설치 후보. 최소 INSERT/SELECT만 부여하고, 실제 승인 시 `INSERT ... ON CONFLICT DO NOTHING RETURNING` + COMMIT로 동일 시도의 중복 출처 발급을 차단한다. 키·회원·Reading 개인정보는 Claim DB에 저장하지 않고 해시와 UUID만 기록한다.
- 신규 테스트 6건 + 기존 실제 OpenAI A4 capture 테스트 7건 총 **13건 PASS**, TypeScript/ESLint/Prettier PASS. 폐기형 PostgreSQL 17.11에서 기존 출처 스키마와 신규 Claim 스키마 순차 설치 및 정확한 Claim Writer로 최초 INSERT 1건, 동일 ID 재시도 INSERT 0건 확인. 임시 DB는 제거했다.
- 이 모듈은 **운영 미설치**이며, `loadSignedProof`의 실제 명하 서버 간 인증 조회·명하 측 정본 DB 준비 후 서명 발급·전용 권한/TLS/Secret 바인딩이 필요하다. 단순 호출자 제공 증명이나 무조건 성공 스텁을 실제 Production Authority로 사용하면 안 된다. 이 DB 시도 증명은 그 자체로 Production Interpretation Authority나 실제 공급사 비용·청구 완전성을 증명하지 않는다.
- 기존 Saju HTTP·OpenAI Runtime·명하 고객/결제/크레딧·운영 DB·비밀번호·유료 API 및 비용 수집 상태를 변경하지 않았다. **HOLD / `ROADMAP_COMPLETE` 아님.**

## 2026-11-11 — A4 명하 사전 승인 증명 HTTPS 전용 조회 클라이언트 (오프라인)

- `src/production/reading-ai-a4-myeongha-proof-http-loader-v1.ts`: 고정된 HTTPS 오리진 및 전용 서비스 Bearer로 정확한 `GET /api/internal/a4/prepared-attempts/<UUID>/proof`만 읽는다. 임의 경로·브라우저 오리진·Redirect·Cookie·Cache를 허용하지 않고 5초 기본 제한, 4096바이트 응답 제한, JSON 형식/ID 대조를 수행한다. 404는 증명 부재 null, 인증/장애/변조/과대 응답은 오류로 구분하여 **Saju 독립 HMAC·일회성 Claim을 우회하지 않는다**.
- 신규 HTTPS 로더 테스트 7건, TypeScript/ESLint/Prettier PASS. 실제 네트워크·비밀키 주입·서비스 접속·운영 DB/유료 호출 미실행.
- 명하 저장·사설 인증 리더는 명하 별도 PR에서 오프라인 구현. 실운영의 TLS/mTLS·네트워크 허용목록·비밀 서비스 인증·DB 계정/정본 발급·Source Claim 바인딩은 HOLD. 기존 Saju #2774와 독립 후속 연결이며 운영 비용 수집 OFF, `ROADMAP_COMPLETE` 아님.

## 2026-11-11 — A4 HTTPS 증명·DB 일회성 승인·실제 호출 영수증 단일 서버 조합 (오프라인)

- `src/production/reading-ai-a4-authenticated-capture-composition-v1.ts`: 기존 #2774 서명·일회성 승인, #2775 Saju HTTPS 증명 조회, #2770 OpenAI provider 콜백·Source 영수증·누락 기록을 **서로 다른 전용 DB 연결과 인증 자격증명**으로 한 번에 구성하는 명시적 내부 팩토리. 같은 claim/receipt DB 풀 또는 재사용된 서명 키는 생성 단계에서 거부한다.
- 통합 테스트는 명하의 정확한 HMAC 사전 승인 증명을 모의 비공개 HTTPS 서버에서 받고, 서명 검증과 Claim 1회 사용 성공 후 요청 Scope 내부 실행·관측 결과 기록을 확인한다. 두 번째 같은 시도는 Source 호출 전 거부하고, 위조 서명·404·503은 Claim이나 영수증 기록을 시작하지 않는다.
- 신규 4건 + 이전 실제 OpenAI capture/서명/HTTPS 조회 테스트 포함 **24건 PASS**, TypeScript/ESLint/Prettier 검사. `onProviderCall`은 실제 OpenAI 어댑터와, `withPreparedAttempt`는 Production HTTP host에 동일한 생성 인스턴스로 명시적으로 전달해야 한다. 운영 계정/TLS/Secret/DB 설치가 없어 해당 Runtime wiring은 아직 수행하지 않았다.
- 이 조합은 서명 증명을 사용하더라도 Saju 원본 Reading의 Production Interpretation Authority를 자동 부여하지 않는다. 명하 사설 proof DB의 개인정보(Subject/Reading UUID) 보존·삭제 정책 확정, 운영 TLS/서명키·서비스 로그/권한 검증, 실제 Provider 비용 청구 대조 전까지 비용 수집 OFF. **HOLD / `ROADMAP_COMPLETE` 아님.**

## 2026-11-11 — A4 AI 어댑터·서버 동일 출처 수집기 조합과 Production Authority 경계

- `src/production/reading-ai-a4-authorized-product-host-composition-v1.ts`: #2776의 동일 private capture 인스턴스를 **실제 OpenAIResponsesNarrativeAdapter의 `onProviderCall`**과 **인가된 Production Reading Host의 `a4SourceCapture`**에 동시에 전달하는 비실행 Server Factory. 기존 `inspectMyeonghwaProductionComposition`을 먼저 호출하여 Production Interpretation Registry/ReadingOptions/계산 정책 등이 미승인 상태이면 생성 자체를 거부한다. 연구/Preview Registry를 공식 Production으로 승격하지 않는다.
- 외부에서 기존 Narrative Runtime·다른 Provider observer·다른 Host Capture·출처 참조 생성기를 강제 주입하는 경우 즉시 거절한다. 테스트 4건 + #2776의 기존 통합 연결 4건 통과, TypeScript/ESLint/Prettier 통과. 테스트 도중 Socket listen·OpenAI 네트워크·DB 연결은 0건이었다.
- **아직 운영 설치 아님:** 실제 Production Interpretation Authority, 승인된 실행/모델/보존 정책, 사설 TLS·DB 서비스 로그인·Secret 및 실제 호출/청구 대조가 없으므로 이 팩토리를 Runtime에 등록하거나 운영 서버를 실행하지 않는다. 비용 수집 OFF, `ROADMAP_COMPLETE` 아님.

## 2026-11-11 — A4 Saju 실제 콜백·서명 영수증의 사후 대조를 성공 응답 경계에 연결 (오프라인)

- 명하 [PR #3210](https://github.com/gycha0109-beep/MyeongHa/pull/3210)의 실행 시도별 다중 Source 영수증 재처리는 [Integration #42964445259](https://github.com/gycha0109-beep/MyeongHa/actions/runs/42964445259) **SUCCESS 후 병합**됐다.
- `src/production/reading-ai-a4-authenticated-capture-composition-v1.ts`: 기존 Saju의 실제 OpenAI callback → 불변 HMAC 영수증 → Source 호출 관측/누락 보고서 보존이 끝난 **후**, 기존 `createPostgresSajuA4SourceCoverageAuditV1`의 독립 출처 증거 대조를 수행하고, **양쪽 기록이 일치하며 검증된 콜백이 1건 이상일 때만** 성공한 Production Reading 응답을 반환한다.
- 한 Source execution attempt 내에서 **콜백 0건·저장 영수증 누락/초과·서명 변조·커버리지 보고서 누락/위변조·관측 콜백 미완료/실패·감사 DB 접근/권한 실패**는 성공 응답을 차단한다. Saju 정본 Source Writer의 동일 최소 SELECT 권한을 읽기 전용 감사에 사용하며, 새 DB 테이블/역할/로그인/키/가격/청구 경로를 추가하지 않는다. 원 실행의 비정상 종료는 기존 예외 전달 경로를 유지한다.
- `test/reading-ai-a4-coverage-gate.test.ts` 신규 4건 + 수정된 통합 4건 + 기존 Source 영수증·관측 대조 테스트 8건 = **16건 PASS**, TypeScript/ESLint/Prettier PASS. 실제 유료 AI 호출/운영 DB 접근 없이 서명 증거의 모의 DB 입출력으로 검증한다.
- 검증 범위는 **Saju에 관측되어 보존된 콜백과 영수증의 정합성**뿐이다. 외부 공급사 전체 API 호출 수·청구·사용량 완전성, 실제 서비스 설치, 명하 비용 Writer의 운영 바인딩 및 Production Interpretation Authority를 입증하지 못한다. **`completeCostCoverage=false`, 비용 수집 OFF, `ROADMAP_COMPLETE` 아님.**



## 2026-11-11 — A4 공식 공급사 전송 경계 강화 (오프라인)

- Saju PR #2777: HEAD 78ccaddf1f42d6d2d6a4db8e398967c9e270fb49, 필수 통합 검사 https://github.com/gycha0109-beep/Saju/actions/runs/42969724190 성공, 병합 2095a77c8be599166ac6c378e02dfb892f2ce45e.
- Saju PR #2778: 공식 Production Host에서 다른 HTTP 전송 함수 주입과 정본 OpenAI Responses 이외의 API 주소를 차단한다. 기존 해석 승인·호출 증명·DB 검증을 유지한다.
- 관련 테스트 4건, 타입·코드·서식 검사 통과. 필수 통합 검사 https://github.com/gycha0109-beep/Saju/actions/runs/42974983168 성공, 병합 7d962c5015b7721f04b2603fe13041255e520fc9.
- 외부 공급사의 실제 전체 호출 및 청구 비용은 이 검증으로 증명되지 않는다. completeCostCoverage=false, 운영 비용 수집 OFF.

## 2026-11-11 — A4 영수증 전용 저장소 호출 전 점검 (오프라인)

- src/production/reading-ai-a4-source-writer-preflight-v1.ts: Reading의 일회성 실행 승인을 소비하거나 유료 공급사 호출을 시작하기 전에 Source 영수증 Writer의 DB 연결을 읽기 전용 거래로 점검한다.
- 정확한 DB 역할 saju_a4_provider_receipt_writer_v1, 서명 영수증·콜백 커버리지 테이블의 존재, 필요한 각 열의 SELECT·INSERT 권한을 확인한다. 접속·권한·테이블·거래 종료 오류는 즉시 차단한다.
- src/production/reading-ai-a4-private-provider-capture-v1.ts: 위 점검을 정본 실행 시도 승인 이전에 수행해 불필요한 승인 소비와 비용 발생 위험을 줄인다.
- 기존 테스트와 신규 점검 테스트 총 22건 통과, 타입·코드·서식 검사 통과. 실제 유료 API 호출이나 운영 DB 변경·서비스 설치는 수행하지 않았다.
- 이 읽기 전용 사전 점검은 향후 INSERT 성공, 실제 공급사 호출 전수, 청구서와 비용의 일치를 보장하지 않는다. completeCostCoverage=false, 비용 수집 OFF.
- 남은 차단 조건: 독립 Source DB 및 명하 증명 DB의 운영 설치·전용 계정·TLS, Production Interpretation Authority, 개인정보 증명 보존·삭제 정책, 실제 청구·환율 대조.

### 2026-11-11 — 영수증 Writer 사전 점검 도입 후 기존 회귀 테스트 수정

- PR #2779 초기 HEAD c28400da5171bcbf45d30c876a936af58e4e34f9의 CI Tests (13/16)에서 688건 중 4건 실패: 새 호출 전 영수증 Writer DB 준비 점검을 기존 test/reading-ai-a4-coverage-gate.test.ts의 모의 DB가 반환하지 않아 실제 정상 경로까지 사전 차단되었다.
- 실패 기록: https://github.com/gycha0109-beep/Saju/actions/runs/42977260420/job/130381015760
- 모의 Source Reader/Writer의 준비 상태에 정본 테이블 식별자, 정확한 역할 및 기존 최소 열 권한을 추가했다. 실제 구현의 차단 조건, Production 해석 승인 및 Source 서명 검증은 변경하지 않았다.
- 직접 관련된 4개 테스트 파일의 26건을 재실행해 PASS. 실제 운영 API 호출, 유료 토큰 사용, 운영 DB 설치·수정 및 비용 수집은 계속 없음.
- 새 커밋의 일반 CI·필수 Integration은 별도 성공 근거 확인 전까지 미완료로 취급한다. completeCostCoverage=false, 운영 수집 OFF 유지.

## 2026-11-12 — A4 실제 공급사 요청 직전 서버 전용 전달 의도 경계 (오프라인)

- `OpenAIResponsesNarrativeAdapter`에 `onBeforeProviderRequest(intent)` 서버 전용 선택적 콜백을 추가했다. 생성된 `callId`, `requestId`, `providerKey`, `modelKey`, `preparedAt`만 공개하며 실제 요청 전송 본문·프롬프트·출생 데이터·API 키·공급사 응답 ID는 포함하지 않는다.
- 검증/기록용 콜백이 실패하면 HTTP 요청 전에 즉시 중단하는 **fail-closed** 경계다. 콜백 성공 후에만 기존 HTTP fetch가 시작되며, 종료 콜백(`onProviderCall`)은 같은 `callId`를 유지한다. 일반 adapter의 선택적 호출 방식은 그대로 보존한다.
- A4 공식 Production Host는 임의 `onBeforeProviderRequest` 주입을 거부한다. **현재 A4 capture에 이 콜백을 설치하지 않았고**, 지속 저장 Source dispatch intent Writer, 단건 송신 여부 확인, 프로세스 강제 종료 복구, 공급사 청구 전수 대조는 후속 미완료 조건이다. 이 코드를 운영 활성화로 해석하면 안 된다.
- 테스트는 기록 실패 시 네트워크 요청 0건, 송신 전 의도와 종료 콜백의 동일 식별자, 전송 장애 시 동일 call ID, 공식 A4 Host의 외부 콜백 차단을 검증한다. 외부 유료 API 호출·운영 데이터 변경·기존 회원·결제·크레딧 변경은 수행하지 않았다.
- **`preparedAt`은 네트워크를 실제 송신했다는 증거가 아니다.** `completeCostCoverage=false`, 운영 비용 수집 OFF. 서버 간 인증·Source DB 출처·개인정보 보존·실제 공급사 요청/청구 대조는 계속 HOLD.
