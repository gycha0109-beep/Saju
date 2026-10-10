# SA-7D-B1-R15 — 十神 계산 계약(T-COMP) 재진입 준비도·증거/권한 차단 독립 감사 v1

> 2026-10-09 · Watchtower-Track: `saju-research` · **연구 문서 전용. 계산 함수·제품 로직·테스트·CI workflow·권한 상태 수정 금지.** 이 라운드에서 실행한 npm/Vitest 테스트 **0건**. 기존 테스트 **소스 열람**과 실제 테스트 통과는 다르다. `sourceSupportGrade=INSUFFICIENT` Annual 8/8, `bridgeReentryReady=false`, `Production=HOLD` 유지.

## 1. R15의 판단 대상과 의도적 제외

R4는 **T-COMP 계산 분류**와 **T-HIST 역사적 직접 유년 명례**를 별도 증거 계약으로 정의했다. R13/R14는 구체 甲日 流年 名稱 **L2-C=1/8**의 7건 공백을 확인했지만, 이것을 계산 알고리즘의 논리적 필수 선행조건으로 설정하지 않았다. 이번 R15는 R12 결정 패킷의 D1 명칭·D2 年柱 시간 경계·D3 현대 개인 해석 권한을 실제 최신 `main` 코드·기존 검사 소스에 결부하고, **T-COMP의 심사 개시 가능 범위만** 판정한다.

**결론:** `T_COMP_OWNER_REVIEW_PACKET_READY=YES (scope-limited)`; `T_COMP_AS_APPROVED_CONTRACT=NO`; `T_COMP_YEAR_EFFECTIVE_PERIOD_RESOLVED=NO`; `ANNUAL_SEMANTIC_AUTHORITY=NO`. 이 문자열은 **연구용 의사결정 표지**이며 TS enum/승인 기록이 아니다.

### 조사한 최신 main 소스와 기존 테스트 (정적 열람만)

- `src/reading/consumer-reading-request-adapter.ts` — blob `e147f384650e1a8752855a6572189b660f328922`: `PRODUCT_READING_TIME_ZONE='Asia/Seoul'`, `periodNumber()`, `resolveTargetPeriod()`; 참조 시각 파싱과 target civil year/month.
- `src/reading/temporal-reading-context.ts` — blob `8c2bfffb437881f594f37264cc4d5ad97630e7a8`: 1984년 기준 `annualSexagenaryPillar(year)`, `buildTemporalReadingContext()`의 Annual/Monthly 공통 연주.
- `src/reading/annual-interpretation-facts.ts` — blob `74c238039be7a5f92cf52f21f6d783ebd8415dfb`: `GENERATES`/`CONTROLS`·`deriveAnnualStemTenGod()`, 일간 `resolved` 게이트, `annualBranchRelations`.
- `src/research/general-annual-authority-bridge-review.ts` — blob `7d20334ad720cd42f36a8a35b6224c001d38e0a6`: `RETURN_TO_RESEARCH`, Annual semantic source blockers, `production='HOLD'`, `NO_ANNUAL_TO_MONTHLY_AUTHORITY_EXPANSION`.
- `src/research/general-annual-sa7d-b1-ten-god-witness-audit.ts` — blob `c2911f215268689008c21e69f3777ce0b39105a4`: **초기 연구 v1 snapshot**은 전사 locator-only로 8대상 모두 직접 인쇄 미검증, `0/8`으로 고정. R7~R14에서 새로 확인한 문서 증거가 해당 과거 TS snapshot의 생성 시점과 다르므로 이 값을 현재까지의 역사 L1/L2-C 총계라고 재해석하면 안 된다.
- 소스 검토에 사용한 기존 테스트 세트: `test/temporal-reading-context.test.ts` (blob `6cd3115f1a55abff7da350ac22614485ab71b39d`), `test/consumer-reading-request-adapter.test.ts` (`98424630815ccbf6c867e8246c7e93e7583a0dde`), `test/general-annual-sa7d-b1-ten-god-witness-audit.test.ts` (`397bc902fc57ea87bcd602f99ae0b70a001881dc`), `test/general-annual-authority-bridge-review.test.ts` (`8fc4e021f1f5276d5c200ec1b11cf00c790975fc`). **이 네 파일은 전체 테스트 목록의 완전한 열거라는 주장 아님**. 실행 결과·CI PASS 주장 없음.

## 2. 甲日 10천간 계산 분류에 대한 정적 계약(제안)

`deriveAnnualStemTenGod(dayMaster, annualStem)`은 `manseryeok`에서 연간 오행·음양을 조회하고, `GENERATES`, `CONTROLS` 및 동일 음양 여부에 따라 다섯 관계의 正/偏 또는 같은/다른 음양 분기를 만든다. 甲을 **양목** 일간으로 놓은 아래 표는 **코드 로직·통상적 십간 오행음양 대응으로 도출한 정적 기대값**이다. 이번 연구에서 함수 호출·라이브 테스트나 모든 간지 조합의 완전성 증명을 한 것은 아니다.

| 甲日 → 비교천간 | 오행 관계 / 음양 | 현대 계산 기대 TenGod | 증거 모집단 |
|---|---|---|---|
| 甲→甲 | 同木 / 同陽 | 비견 | B1 |
| 甲→乙 | 同木 / 陰陽相反 | 겁재 | B1; 明刻 원문 `劫財敗財`/方向 `敗財` vs 後印 `劫財` 별도 D1 |
| 甲→丙 | 木生火 / 同陽 | 식신 | B1 |
| 甲→丁 | 木生火 / 陰陽相反 | 상관 | B1 |
| 甲→戊 | 木剋土 / 同陽 | 편재 | **기존 A2**, B1 8개에 합산 금지 |
| 甲→己 | 木剋土 / 陰陽相反 | 정재 | B1 |
| 甲→庚 | 金剋木 / 同陽 | 편관 | **기존 A2**, B1 8개에 합산 금지 |
| 甲→辛 | 金剋木 / 陰陽相反 | 정관 | B1; 1935 甲日×辛亥年 正官 L2-C **1건** |
| 甲→壬 | 水生木 / 同陽 | 편인 | B1; R14 壬辰年 사례에서는 `偏印` 동일 유년 직접 명칭 미확인 |
| 甲→癸 | 水生木 / 陰陽相反 | 정인 | B1 |

**분리:** `MODERN_TEN_GOD_CLASSIFICATION=정적 코드 후보` ≠ `PRINTED_HISTORICAL_LABEL_EXACT` ≠ `SAME_PRINTED_ANNUAL_CASE_L2_C` ≠ `PRODUCTION_ANNUAL_THEME_MEANING`. 표의 10개가 코드에 나타난다는 사실로 `MING_PRINT_L1=10/10` 또는 `L2-C=10/10`이라고 보고하면 안 된다.

## 3. T-COMP 준비도 항목별 감사: 구현 사실과 승인 조건의 구분

| Gate | 주제 | 정적 증거·현 상태 | 다음 승인 주체/미충족 조건 |
|---|---|---|---|
| C01 입력역할 | `dayMaster.element/yinYang`와 `annualStem`의 분리 | `deriveAnnualStemTenGod()`가 두 인자를 별도 받음. `buildAnnualInterpretationFacts()`는 일간 `resolved`·scope `annual` 검증 | **정적 PASS**, 전체 입력 파이프라인 E2E 및 잘못된 stem runtime은 미실행 |
| C02 일반 십신 분기 | 5 오행관계×음양 분기 10 출력명 | 코드가 `비견/겁재/식신/상관/편재/정재/편관/정관/편인/정인` 반환; 제2절 표는 **甲日 정적 예상** | **구현 확인**, A2·B1 10쌍/타 日干 전수 deterministic 실제 fixture 및 source/명칭 호환 승인 필요 |
| C03 달력 타임스탬프 | `Asia/Seoul` 달력 표시연도와 참조 시각 | adapter에서 `Intl.DateTimeFormat`, 누락/NaN invalid reason, `toISOString` 보존 | **기존 구현·테스트 소스 존재**. `new Date(...)`가 정규화하는 일부 경계형 문자열의 엄격 거부 동작은 이 라운드에서 검증하지 않았고 runtime 소유자 확인 필요 |
| C04 年柱 resolver | `annualSexagenaryPillar(year)` | `(year-1984) mod 60`, 정수 양수 검증, 2026 `丙午` 정적 도출; **입춘 source/time parameter 없음** | **현행 civil year-only 구현 확인**, D2 `A/B/C/DEFER` owner 결정·실제 절입 근거/초정밀도/사용자 표시/규칙 필요 |
| C05 공유 함수 파급 | Annual/Monthly 공용 연주 | `buildTemporalReadingContext`는 scope 분기 **전에** 연주를 계산, monthly에도 반환 | **위험 경로 확인**. Annual period 수정 시 Monthly/계산 소유자 승인 및 회귀 격리 필수 |
| C06 D1 이름 선택 | 현대 `겁재` / 원문 `劫財敗財·敗財·劫財` | 현대 `TenGod` 반환 함수는 서지/원문 raw 필드 갖지 않음(조회한 함수 범위 기준); R7 후대 별본 단독 `劫財`, 明刻 복합구 존재 | **미충족**: `MODERN_CANONICAL_WITH_SOURCE_EXACT_QUOTE`는 정책 제안; edition·原印/전사·direction/sourceId 분리 및 UI scope 명시 |
| C07 역사 일반 방법과 직접 사례 | L1/L2-M/L2-D/L2-C 구분 | R4는 계산법 `流歲取天干` 등 L2-M, 名稱 L1을 구분. R14 전사 `甲日×壬辰年`은 실제 연간 壬水 논변이나 `偏印` 직접 이름 아님 | **T-COMP에 L2-C 8/8 일괄 필수조건 부여 금지**. 고전 직접 특정 명례 인용에만 해당 L2-C 요구. cross-school alignment/레퍼런스 확정 HOLD |
| C08 입력 Fact vs 해석 의미 | Annual TenGod·지지 충돌 계산 입력과 현대 theme | `annual-interpretation-facts.ts`는 `annualStemTenGod`와 `annualBranchRelations` 산출. Bridge는 Annual theme 의미 sources를 내부 research heuristic으로 판정 | **D3 미충족**: Annual-specific 의미 출처·scope·예외·반례·검토자·Bridge 및 Engine 리뷰 필요 |
| C09 연구 스냅샷 | B1 v1 TypeScript audit vs 이후 증거 누적 | v1 소스·테스트는 `exactPrimaryPagesVerifiedForEight=0`, `directlyAnnualQualifiedAmongEight=0`를 고정하여 구 시점 재현 | **버전 경계 보존**. 이 숫자를 2026-10-09 최신 역사 총계로 주장하지 않음. 별도 연구 문서 MING L1=7/8, CROSS L1=8/8, direct Annual L2-C=1/8. 과거 audit/TS 수정 금지 |
| C10 결정·테스트 권한 | 구현·Test presence와 제품 승인 구분 | 일부 테스트 파일은 UTC/Seoul 경계, 연주 연도 예시, 결측 참조일시/인텐트 차단, B1 old snapshot, Bridge RETURN_TO_RESEARCH를 **검사하도록 작성됨** | 이번 검토 **테스트 명령 실행 0건**, 전체 성공률 알 수 없음. R12의 13개 solar-term 경계·negative 신규 테스트도 **미구현·미실행** |

### 구체적으로 기존 테스트와 새 회귀 간 격차

| 확인한 테스트 파일 | 코드에 작성된 검사 예 | 검증하지 않는다고 분리해야 하는 항목 |
|---|---|---|
| `test/temporal-reading-context.test.ts` | 1984 甲子·2026 丙午·2027 丁未, UTC 연말 경계에 이미 설정된 `targetPeriod.year=2027`, targetPeriod 누락·scope mismatch 예외 | 2026 입춘 정확 절입시각 기준 乙巳↔丙午 변경, D2 미승인 |
| `test/consumer-reading-request-adapter.test.ts` | Seoul calendar year change, monthly target year/month, 같은 instant 정규화, reference datetime 누락/invalid, 사용자 의미 ambiguous/unsupported | 연주 효력구간의 천문적 경계, 비정상 입력 **모든** 가능한 Date rollover 유형 검증했다고 주장 금지 |
| `test/general-annual-sa7d-b1-ten-god-witness-audit.test.ts` | B1 v1의 8개 pair·exact 甲↔stem 후보 목록, v1 원전 페이지 미확보 `0/8`, Annual grade insufficiency, content hash | 이후 R7~R14 문서의 L1 추가, 직접 사례 1/8을 코드 감사가 다시 계산했다는 주장 |
| `test/general-annual-authority-bridge-review.test.ts` | 내부 policy만으로 Annual authority 없음, `RETURN_TO_RESEARCH`, `production='HOLD'`, Natal·Monthly inheritance 차단 | 실제 Annual 제품 활성화 승인이나 미래 사건 예측 근거; R12 새 13 fixture 실행 |

테스트 소스가 존재하는 것과 테스트가 이 R15에서 실제 **PASS**했다는 것은 전혀 다른 주장이다. 코드 검색의 일부 결과 부재를 **저장소 전역 테스트가 없다**는 증거로 쓰지 않는다.

## 4. 소유자별 최소 반환 패킷과 제한된 권고

| 순서 | Owner 역할 | 결정해야 할 내용 | 권한부여 금지 |
|---|---|---|---|
| O1 | Lexical/D1 owner | 현대 `겁재` canonical + 역사 원문·판본 exact 인용의 적용 scope, Natal/Annual 비상속, D1-A/B/C/DEFER 서명 | 후대 `劫財`를 명대 단독명으로 rewrite |
| O2 | Temporal+D2 owner | `CIVIL_YEAR_ONLY` 유지 / `DISPLAY_CIVIL_YEAR__EFFECTIVE_SOLAR_TERM_PILLAR` / 미확정 fail-closed / DEFER; 공식 관보 원문, 시각정밀도, source version, UX 문구 | KASI 사전표 시·분 `05:02`를 근거 없는 `05:02:00`으로 고정 |
| O3 | Annual+Monthly code owners | 연주 공동 헬퍼 분리 범위·구 버전 회귀·같은 instant 결과 일관성, 월운 독립 승인 | Monthly semantic authority 묵시 승계 |
| O4 | Calculation owner | `甲`10간 및 다른 日干 전수분류·source convention 일관성, invalid/ambiguous 입력, deterministic test 계획 | 문서 정적 계산표만으로 계산 정식승인 |
| O5 | Annual semantic/Bridge/Engine owner | 각 `ANNUAL_*`의 independent source statement/예외/반례/강도/검토자가 존재하는가 | `L1 + L2-M` 또는 수치 매칭을 미래 개인 사건 권한으로 승격 |

**즉시 권고:** 코드 변경 대신 위 **5개 소유자에게 1회 반환**하고, D1 및 D2 결정이 명확해질 때만 해당 소유 트랙에서 10간 매핑 fixture·새 기간/월운 격리 테스트를 작성한다. 연구 문서 커밋을 반복하는 것만으로 빠진 정책 서명을 대체할 수 없다.

## 5. 불변 지표·R15 A/B/C 판정

- `MING_PRINT_L1_EXACT=7/8`(명대 원전 각 단독명), `CROSS_EDITION_PRINT_L1_EXACT=8/8`(명대+후대 인쇄본 존재), `ANNUAL_PRINT_L2_C=1/8`(1935 甲日×辛亥年 正官), `PRODUCT_ANNUAL_L3=0/8`. R15 신규 역사 인쇄 L1·L2-C **0건**.
- 甲日 10천간 정적 코드 매핑은 **연구상 계산 기대값**이지 10개 역사 직접 용례/CI PASS/제품 의미 승격이 아니다. 초기 B1 v1 audit가 `exactPrimaryPagesVerifiedForEight=0`인 것은 **시점 고정된 소스 스냅샷**이므로 고전 판면 연구의 뒤이은 누적 7/8에 맞추어 코드 값을 강제로 덮어쓰지 않는다.
- Annual 8종 `sourceSupportGrade='INSUFFICIENT'`, `bridgeReentryReady=false`, Bridge `RETURN_TO_RESEARCH`, `Production=HOLD`. D1/D2/D3 실제 owner 승인 **0건**. R11 2025-06-30 전자관보 원문 직접 입춘 시각 `UNVERIFIED`, 정확 초경계 HOLD.
- **A — PASS(정적 계약 감사):** 네 `main` 핵심 소스·B1 v1 및 위 네 테스트 파일·선행 R4/R12/R14 범위로 계산 구현/누락 점검. 전체 실제 계산 정확성·역사학파 명칭·관보 원문 인증을 PASS라고 주장하지 않음.
- **B — PASS(결정 패킷 작성), 계약 실제 채택 HOLD:** 10간 정적 예상표, C01~C10 게이트, 소유자 O1~O5 의사결정·회귀 격차를 구분. R12의 13개 신규 입춘 fixture는 미실행. 새로운 분류코드·TS/API/정식 정책 결정 없음.
- **C — docs-only 최종 확인 대상:** 신규 연구 문서 1개+기존 원장 2개+PR 설명만 허용. Engine/Reader/Official/Bridge/Monthly/CI workflow 및 제품 수정·PR 병합·수동 Actions 실행 **0건**. 문서 push에 의해 기존 CI가 자동 시작될 수 있으며 완주 여부를 구분 보고한다.

**R16 실행 재개 조건:** 담당 소유자의 **구체 D1/D2 정책 결정 또는 정밀한 직접 문헌 리드**가 새로 존재할 때만. 없는 경우 **연구 반복 대신 위 5개 소유권 결정을 반환하고 STOP**. 불필요한 대형 CI/문서 커밋 반복을 줄인다.
