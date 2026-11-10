# Admin A4 — 사전 준비 실행 시도 영속 단일사용 DB 경계 (2026-11-10)

- **기준:** 기존 Admin A4 로드맵 7.1–7.2 및 Saju Source 출처 소유 DB. 별도 신규 상품·권한·운영 활성화가 아니다.
- **기 구현:** `src/production/reading-ai-a4-prepared-attempt-consumption-postgres-v1.ts`는 MyeongHa가 기존 DB에 사전 준비한 실행 시도 ID를 Saju가 영구적으로 **한 번만** 소비할 수 있도록 만드는 DB 경계다. Source의 HMAC handoff 검증과 서비스 Bearer 인증/Production Interpretation Authority가 사전에 성공해야 호출 가능하다.
- **최소권한:** 출처 소유 Writer 계정 `saju_a4_provider_receipt_writer_v1` 전용, BEGIN READ WRITE + current_user 검사 + synchronous_commit on + `INSERT ... ON CONFLICT DO NOTHING RETURNING execution_attempt_id` + COMMIT 성공 확인. 동일 실행 시도 또는 nonce 재사용은 INSERT 0행으로 거부, 잘못된 계정·DB 장애·COMMIT 불확실성은 예외/ROLLBACK 처리. 실제 DB의 유일 키가 동시 실행을 원자적으로 조정한다.
- **DB 후보:** `docs/ops/A4_ADMIN_PREPARED_ATTEMPT_ONE_TIME_SOURCE_OFFLINE_V1.sql`. 기존 A4 영수증 스키마를 전제로 하는 별도 Source 소유 테이블. 실행 시도 ID 기본키와 nonce UNIQUE, 값 변경 금지 트리거, RLS, Writer의 INSERT 및 실행 시도 ID만 SELECT 허용. Reader·일반 서비스·공개 인증 역할에는 권한 없음.
- **검증:** 신규 테스트 4건 및 연관 테스트 7건 등 합계 11건, TypeScript/ESLint/Prettier 검사 성공. 임시 Docker PostgreSQL 17.11에 기존 Source 스키마와 후보 SQL을 순차 설치하고 최초 INSERT/중복 ID 거부/nonce 재사용 거부/Reader 조회 거부/Writer 비허용 컬럼 조회 거부/UPDATE 차단/Owner 직접 변경 차단 등 8개 검증 성공. 임시 DB는 테스트 후 폐기.
- **주의:** 영속 단일사용 기록 자체가 원격 MyeongHa DB 사전 준비, 실 Production source 발급, HTTP request body / 서명 검증, 키 및 서비스 인증, 실제 추정 비용·청구 완전성을 보장하지 않는다. MyeongHa 사전 준비 handoff signer 및 Saju source verifier는 별도 PR로 검증 중. **Production 설치, 시크릿·HTTP 경로 연결, 유료 호출 및 비용 수집은 전부 HOLD**.
- 회원·결제·크레딧·기존 MyeongHa 운영 DB에 아무 변경도 하지 않았으며, `ROADMAP_COMPLETE` 조건 미충족.
