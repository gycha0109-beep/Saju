# Saju Engine — 실행 로드맵

> 범위: 이 저장소의 **사주 계산 → 명식 → 해석 → Official Reading → 제품 실행**. 관상/캐릭터/결제 트랙의 자체 로드맵을 대체하지 않는다.  
> 기준 스냅샷: 2026-10-13 KST, `main` = `257a7d0caa59f0f86847ef21e614ca2de40533a3`.  
> 상태: **작업 우선순위 문서**. 새로운 명리 의미·Production·공개·저장·판매 권한을 발행하지 않는다.  
> 담당 트랙: `saju`; 의미 판정/독립 review는 기존 Research / Bridge의 소유권을 존중한다.

## 0. 진실의 우선순위와 문서 참조

작업 시작 때마다 **GitHub의 현재 `main`, 열린 PR, 실제 CI 결과를 먼저 조회**한다. 아래 SHA와 PR은 이 문서 작성 당시의 스냅샷이지 항상 최신이라는 보증이 아니다. 완료 판정은 병합된 코드와 해당 커밋의 통과한 검사에 근거한다.

| 문서 | 역할 |
| --- | --- |
| `README.md` | 코어 원칙 및 초기 엔진 범위. 일부 '현재 상태' 숫자는 과거 스냅샷이다. |
| `docs/implementation/12-mvp-scope-and-implementation-plan.md` | I0–I10 Engine MVP 기초 구현 순서. 현행 우선순위와 구분한다. |
| `docs/implementation/saju-engine-capability-inventory-v1.md` | 21 capability의 최초 증거/권한 분류; 오래된 행은 이후 결정을 우선한다. |
| `docs/implementation/saju-engine-capability-frontier-g2b.md` | `ADMITTED` 아닌 Research를 Engine 실행 권한으로 오해하지 않기 위한 frontier. |
| `docs/implementation/sa7a-official-reading-detailed-expansion-roadmap-audit-v1.md` | spouse → annual → monthly 상세 확장 순서의 근거. SA-7B 이후 상태가 일부 갱신됐다. |
| `docs/implementation/sa7b-spouse-standard-official-reading-authority-closure-v1.md` | 배우자 position-only `ACTIVE_BOUNDED` Production 허용의 정확한 범위. |
| `docs/implementation/sa7c-spouse-position-only-detailed-official-reading-pilot-v1.md` | 승인된 spouse position-only 상세 material/표현 파일럿; 새 의미 추가 불가. |
| `docs/implementation/sa7d-annual-standard-official-reading-authority-audit-v1.md` | 연운은 계산 경로가 있으나 **연운 고유 semantic source authority 부족(Case C)**. |
| `docs/implementation/saju-refresh-post-r37-product-boundary-audit-2026-10-09.md` | 강약·support-source 효과/경쟁 정산의 미해결 경계. |
| `docs/product/22-production-interpretation-authority-audit.md` | 일반 Production 내용 승인과 Runtime 가능성의 분리; 과거 감사이므로 최신 bounded spouse 판정과 혼동 금지. |
| `docs/ops/MAIN_BRANCH_PROTECTION_EVIDENCE.md` | 병합·보호·CI 근거. |

## 1. 기준 제품/엔진 상태 — 검증 사실과 허용 경계

- 계산 계층: Governed Production 계산 정책, Canonical Saju Snapshot, 음력/윤달, 절기, 출생시간 미상 시나리오, 버전/식별자/출처 보존 경로가 존재한다. 계산 결과 자체는 명리 해석 authority가 아니다.
- Preview Natal: `general:natal`, `career:natal`, `wealth:natal`, `business:natal`, `relationship:natal:general` 다섯 영역에 bounded Official Reading/Preview 경로가 존재한다. 이를 **전체 Production 해석 허가**로 표현하지 않는다.
- Spouse Natal: `relationship:natal:spouse`는 **일지의 전통적 배우자궁 위치(position-only)**라는 정확한 의미 범위에서 SA-7B의 `ACTIVE_BOUNDED` Production Official Reading 경로가 존재한다. 배우자의 성격·외모·직업·결혼 결과는 허용되지 않는다. 공개 일반 제공·persistence·commerce는 별도 허가가 필요하다.
- SA-7C 배우자 detailed 파일럿은 별도 문서와 실행 코드/테스트 증거를 기준으로 확인한다. 상세 문구 존재 자체가 새 semantic authority나 public GA를 뜻하지 않는다.
- Annual/Monthly: 연간/월간 계산·temporal facts·Research 후보 및 일부 E2E가 존재하지만 **Official Reading의 해당 도메인별 Production semantic authority는 일반화되지 않았다**. 특히 General Annual은 SA-7D 기준 `RETURN_TO_RESEARCH` / `Production HOLD`다.
- 형상·강약/용신 확장: `saju-r*` 연구 결과는 해당 범위에서만 유효하다. partial structural support/합충 연구를 최종 강약·用神 또는 일상적 개인 예측에 바로 연결하지 않는다.

## 2. 실행 백로그 — 높은 우선순위부터

### P0 — Production spouse 요청 시각 문제 정리 (병합 완료, 사후 CI 검증 중)

**병합 완료: PR #2517** — `fix/saju/production-spouse-request-provenance`, SHA `114ed409db77ef86f0ce33e4476d9c2ec281d047`.

- [x] 최신 PR HEAD·base·mergeability·표준 CI·PIE·Production Container를 **실시간 재확인**한다.
- [x] 제출 HEAD의 일반 CI Quality + full regression 16/16 + CI Verify가 성공했고 컨테이너/PIE도 성공했다면 `ci-integration-ready`로 **해당 HEAD에 고정된 Integration 실행**을 요청한다. 다른 SHA의 결과를 재사용하지 않는다.
- [x] integration admission / full Quality / 16개 full test / full Verify / CI Integration Verify가 전부 성공하면 exact expected HEAD로 **squash merge**한다.
- [ ] 병합 후 `main` SHA와 `main` CI Quality / 16개 테스트 / CI Verify / Production Container를 검증한다.
- [ ] PR #2517의 의도: bounded **Production 배우자운**의 명식 `createdAt`·공식 해석 결과물 `generatedAt`·Narrative clock을 **각 요청 시각**에 맞추되, 기존 semantic/consumer authority resolver와 spouse-only scope를 유지한다.
- [ ] 실패 시 정확한 샤드 로그를 분석해 최소 수정 → 새 SHA에서 처음부터 검증한다. 16-shard 워커 부하로 인한 장시간 Full Interpretation 테스트를 새 단위 테스트에 중복 생성하지 않는다.

PR #2517이 이미 병합/대체/폐기됐다면 위 체크리스트를 그 현재 결과에 맞게 갱신하고 **미완료 선행 PR부터** 처리한다.

**2026-10-13 실제 실행 근거**

- 로드맵 선행 PR [#2518](https://github.com/gycha0109-beep/Saju/pull/2518): SHA `62f2e0d803a2748d6ceb156c477de6894ef68df9` 통합 20개 job PASS, squash merge `e53556e3cfd2e2d53a1104acb2fcb8162a854b92`. 해당 `main`의 CI Quality + 16/16 + Verify + Production Container PASS.
- Production spouse 요청 시각 수정 [#2517](https://github.com/gycha0109-beep/Saju/pull/2517): 정확한 HEAD `114ed409db77ef86f0ce33e4476d9c2ec281d047`, 일반 CI / PIE / Production Container 및 [SHA-pinned Integration](https://github.com/gycha0109-beep/Saju/actions/runs/38354513635) admission + Quality + 16/16 + Verify + Integration Verify PASS; squash merge `257a7d0caa59f0f86847ef21e614ca2de40533a3`.
- #2517 병합 후 `main` 검증: [CI](https://github.com/gycha0109-beep/Saju/actions/runs/38355835988)는 **진행 중**이며 완료 판정 전, [Production Container](https://github.com/gycha0109-beep/Saju/actions/runs/38355836024)는 PASS. 위 체크박스의 사후 검증은 CI 종료 후에만 체크한다.

### P1 — 현행 Natal/Spouse 제품 경로의 실행 무결성 (P0 이후)

**목표:** ONE PERSON → ONE CANONICAL NATAL BASIS → MANY BOUNDED READINGS의 런타임 불일치 없이 소비자 응답까지 전달.

- [ ] 5개 Natal Preview + spouse position-only Production/Preview + Source Proof의 **같은 출생정보·같은 계산 정책에 대한 명식 ID/시간 미상 처리/증거/해석 범위**를 확인한다.
- [ ] 일반 Natal과 spouse의 정확한 registry/admission을 유지한다. Source Proof가 더 넓은 Research registry 의미로 조용히 이동하지 않도록 regression을 유지한다.
- [ ] 각 요청의 `requestedAt`, snapshot `createdAt`, report `generatedAt`, 재현성·도메인 격리·HOLD/no-sell을 검증한다.
- [ ] **검증에서 실제 관측된 결함만** 작은 PR로 보완한다. 중복 실행이나 캐시 도입은 별도 요구·보안/정합성 검토 없이는 하지 않는다.
- 완료 기준: 허용된 범위의 HTTP/Host E2E 및 실패/unknown-time 사례 PASS, unadmitted cross-domain 의미 없음, 기존 Production/Preview/Source Proof 권한 변경 없음.

**P1 감사 증거 및 미충족 항목 (2026-10-13)**

- `test/preview-e2e-runtime.test.ts`는 5개 Natal Preview 실제 HTTP 요청의 pillars / fiveElements / tenGods 표시값 동등성을 검증한다. 다만 소비자 응답은 내부 `snapshotId`를 노출하지 않으므로 이것만으로 모든 실행 레인의 내부 ID 동일성을 주장하지 않는다.
- `test/preview-calculation-request-clock.test.ts`와 `test/preview-reading-artifact-request-clock.test.ts`는 Preview 시각 정합성, `test/production-spouse-official-request-clock.test.ts`는 bounded Production spouse의 snapshot / narrative / artifact 요청 시각 및 spouse-only gate를 검증한다.
- `test/source-reading-proof-readiness.test.ts`는 snapshot/registry/interpretation/evidence/artifact identity mismatch 차단을 검증한다. Source Proof는 **HOLD**이고 `canExecute / canPublish / canSell = false`; Proof metadata 또는 transport 무결성은 의미 승인이나 판매 허가가 아니다.
- 새 경량 테스트 [#2519](https://github.com/gycha0109-beep/Saju/pull/2519)는 출생시간 확정/미상에서 Production spouse, Preview spouse, Source Proof 계산 경계의 내부 `snapshotId` 직접 일치 여부를 검증하도록 추가했다. 현재 **CI 미확정**, P1 완료 처리하지 않는다.
- 기존 승인된 registry/semantic/authority 경로에서 결함 확정 전까지 해석 의미, 캐시, 계산 방식, public/persistence/commerce를 변경하지 않는다.

### P2 — Spouse standard/detailed 파일럿의 현재 상태 확정

- [ ] SA-7B가 승인한 **bounded Production standard**와 SA-7C **position-only detailed** 코드를 실제 Production host/renderer/contract test로 확인한다.
- [ ] standard/detailed canonical meaning, source semantic hash, plan/evidence/disclosure 보존과 `modelCalls=0`, 미허용 의미 표현 0건, material mismatch 전체 standard fallback을 확인한다.
- [ ] 이미 입증된 구현은 중복 구현하지 않는다. 결함이 확인될 때만 보완한다.
- **금지:** 배우자 외모·성격·특정 인물·혼인 결과 예측, public GA/persistence/commerce 자동 승인.

**기존 증거 확인 (재구현 없음)**

- `docs/implementation/sa7b-spouse-standard-official-reading-authority-closure-v1.md`는 Production standard의 `ACTIVE_BOUNDED`(position-only)를 명시한다.
- `test/official-reading-detailed-spouse-pilot.test.ts`는 standard/detailed 동일 canonical semantic hash·plan hash·disclosures·explainability, `modelCalls=0`, 제한 문구 미노출 및 stale material의 **whole-response standard fallback**을 검증한다. 해당 파일럿은 기존 통합 회귀에서 PASS됐지만 새 공개·판매 권한을 뜻하지 않는다.
- P2의 추가 구현은 실제 위반이 재현될 때만 별도 작업으로 연다. SA-7D의 General Annual은 `RETURN_TO_RESEARCH`, `Production HOLD`를 유지한다.

### P3 — SA-7D: Annual standard Official Reading의 **의미 권한 선행 조건** (BLOCKED: Research/Bridge)

**선후관계:** 연운 Engine/렌더러 신규 제작보다 **연운 고유 source-qualified semantic prerequisite**가 먼저다.

1. [ ] General Annual의 출처 원문, 정확한 locator, 명제, exception/counterexample, scope, provenance, domain review와 bridge disposition을 확보한다.
2. [ ] 실제 Bridge decision이 `ADMITTED`를 명시할 때에만 exact annual semantic producer의 Engine 경로·해당 scope/rule/claim 테스트를 연다.
3. [ ] 이후 승인 가능한 범위에서 `general:annual` Official Reading authority resolver + semantic projection + model-free default product cutover를 검증한다(`modelCalls=0`).
4. [ ] **각각 독립 판정**: `career:annual` → `wealth:annual` → `relationship:annual:general` → `business:annual`.

기존 R194–R200 annual temporal calculation, impact bundle, timing renderer 및 R199 자동 연결은 **재사용**한다. fallback 성공·Profile 선택·Research 후보 실행을 semantic authority라고 부르지 않는다.

### P4 — SA-7E: Annual detailed 확대 (P3의 개별 도메인 승인 후)

- [ ] **Standard Official Reading이 승인·실행되는 정확한 annual domain만** detailed material, source semantic hash/plan/evidence parity 및 fail-closed fallback을 구현한다.
- [ ] 단순 더 긴 문구 또는 LLM 출력을 근거 없이 승인된 material로 승격하지 않는다.

### P5 — SA-7F: Monthly standard Official Reading (P3 선행)

- [ ] Annual context/temporal layer precedence, 절기 전후 구간, 도메인별 source/authority를 확정한다.
- [ ] Annual 승인 상태의 해당 context를 상속한다고 해서 월운 자체가 자동 승인되지는 않는다.
- [ ] General부터 도메인별 별도 admission/Official reading cutover/0-model 검증.
- **금지:** annual 맥락 부재 시 standalone monthly oracle.

### P6 — SA-7G: Monthly detailed (P5 도메인별 승인 후)

- [ ] 각 monthly standard 권한이 닫힌 domain에 한해 detailed material/표현/검증을 별도 승인한다.
- [ ] 기존 natal/annual 상세 material을 근거 없이 재사용하지 않는다.

### 병렬 Research frontier — 의미 권한이 생기기 전까지 HOLD

- `docs/implementation/saju-refresh-post-r37-product-boundary-audit-2026-10-09.md`의 **support-source activation / contest settlement** 등 미충족 source-backed 조건을 연구한다.
- `saju-r38`–`r41`처럼 source-exact 구조 연구는 정해진 사례/범위 내에서만 평가한다. 구조적 관찰을 최종 強弱/旺衰/用神, 격국, 상대 강도, 연운 결과에 자동 연결하지 않는다.
- Family/Compatibility/Life-stage/Question-specific는 별도 source authority/Engine intake가 생길 때까지 임의로 제품 지원 선언하지 않는다.
- 증거·review가 추가되지 않으면 판정을 `HOLD_RESEARCH` 또는 `HOLD_AUTHORITY`로 기록하고 **억지 구현하지 않는다**.

## 3. PR 작업 규약 / Definition of Done

1. **현황:** `main` SHA, 열린 PR, 정확한 files/contracts, test/GitHub Actions 상태를 읽는다. 과거 채팅이나 README 상태 숫자만으로 완료 판단 금지.
2. **범위:** 현재 로드맵에서 미완료된 가장 높은 우선순위 **하나**를 선정한다. Research/Bridge/Production admission/제품 권한을 섞지 않는다.
3. **구현:** 코드+경량 focused regression+필요한 문서. fixture와 실제 source provenance는 구분. 스냅샷/Rule/Plan 식별자 불변성 확인.
4. **일반 검증:** lockfile install, lint, typecheck, build, full regression 16/16, CI Verify, Production Container, PIE. 이름만 비슷한 다른 run은 혼동 금지.
5. **통합 검증:** SHA 고정 admission → full Quality → full regression 16/16 → full Verify → CI Integration Verify. 모두 성공해야 HEAD SHA를 지정하여 squash merge.
6. **병합 후 검증:** 해당 `main` SHA에서 CI Quality, full regression 16/16, CI Verify, Production Container 확인.
7. **검증 대기:** 3–5분 내 끝나는 정상 CI는 한 차례 확인하고 진행; 장기 실행/이상은 중단 보고. **진행 중 CI를 성공으로 선언하거나 미검증 PR을 병합하지 않는다.**
8. **기록:** 각 phase/PR마다 목적, 변경 파일, 일반 CI, SHA 고정 CI, 병합 SHA, 남은 blocker와 다음 작업을 PR/관련 docs에 기록. 문서의 날짜·상태도 갱신.

종료 판정: **A** 실질 수정 없음 / **B** 중요 이슈 없음(선택적 개선만 잔존) / **C** 새 원자료·review·외부 실행 또는 장기 CI 필요. 각 종료 시 해당 원인과 남은 리스크를 명시한다.

## 4. 다음 세션 시작 위치

1. 현재 `main` / PR #2517 / 전체 관련 CI를 다시 확인한다.
2. P0가 미완료면 우선 종료한다.
3. P1의 실제 실행 parity 결함이 있는지 검사하고 확인된 결함만 수정한다.
4. P2 구현/SA-7C 코드의 parity·권한·fallback 상태를 감사한다.
5. P3 이후는 **연운 고유 source authority와 Bridge admission** 없이는 제품 의미 확장 대신 구체적인 HOLD 근거와 Research/Bridge handoff를 만든다.
6. 매 완료 시 본 `docs/ROADMAP.md`의 체크박스와 최신 상태를 사실에 맞게 갱신한다.
