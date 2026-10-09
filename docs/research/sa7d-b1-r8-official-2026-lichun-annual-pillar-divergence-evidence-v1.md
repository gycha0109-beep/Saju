# SA-7D-B1-R8 — 한국천문연구원 2026 입춘 경계와 현행 年干 십신 계산의 실증적 분기 v1

> 2026-10-09 · Watchtower-Track: `saju-research` · **공식 절기 분·시 + 기존 main 코드의 정적 동작 대조**. 유년 年柱를 입춘으로 교체할지 또는 연도 전체의 상징적 명칭을 표시할지는 별도 owner의 **정책 결정**. 구현/CI/Production 변경 없음. `sourceSupportGrade=INSUFFICIENT` Annual 8/8, `bridgeReentryReady=false`, `Production=HOLD`.

## 1. 공식 천문 기관에 결속한 외부 증거

**한국천문연구원 천문우주포털** [2026년 월력요항](https://astro.kasi.re.kr/kor/life/post/calendarData?search_year=2026)의 24절기 표는:

- 입춘 = **2026-02-04 05:02** (한국표준시 KST, **분 단위** 발표).
- 확인 URL/출처를 그 날짜와 함께 보존; 어떤 민간 사주 계산기에 기입된 초 단위 추정치를 공식 입춘 정확 시각으로 대체하지 않음.
- 같은 날짜·분을 일부 독립 달력·절기 사이트에서도 제공하지만 [다른 계산 페이지](https://calendar.moneycomon.com/solar-terms.html)는 **04:55**, [다른 곳](https://www.ioreum.com/jeolgi)은 **05:01**로 표기한다. **사이트끼리 불일치하므로 공식 기관 데이터를 기준으로 분 단위까지만 근거 확정**. 이 사실은 경계 초 단위 오차와 데이터 출처 검증이 필수라는 반례다.
- 정확한 **초 단위 입춘 시점, NASA/JPL/천문연산의 통일 기준 시간**은 여기서 확정하지 않음. 아래 경계 `05:02:00±1초` 자동 테스트는 **아직 불가**.

## 2. 실제 프로그램 호출경로를 확인한 자료 (main 특정 리비전)

| 소스/함수 | 확인된 계산 동작 | 한계 |
|---|---|---|
| `src/reading/consumer-reading-request-adapter.ts` `resolveTargetPeriod` | `referenceDateTime`을 서울 civil time으로 변환, `targetPeriod.year=2026` | 분 단위 절입에 따라 `targetPeriod.year`를 2025로 돌리지 않음 |
| `src/reading/temporal-reading-context.ts` `annualSexagenaryPillar(2026)` | `(2026-1984) mod 60=42` → `丙午(병오)` | 함수는 **정수 연도 하나만 입력**, `referenceDateTime`/入春 전후는 분기 불가 |
| `src/reading/annual-interpretation-facts.ts` `deriveAnnualStemTenGod` | `dayMaster` 五行/陰陽 + `annualPillar.stem`으로 `TenGod` 반환 | 주입된 年干이 해당 시점에 실제 유효한지 **여기서** 검증하지 않음 |
| `test/consumer-reading-request-adapter.test.ts` | 서울 civil year 12/31→1/1 전환, request identity, referenceDateTime 누락 등에 대한 **기존 테스트 케이스 존재** | **절입 전후 年干 교체를 검증하는 테스트는 이 파일에서 발견되지 않음**. 테스트 파일 읽기만 했고 실행하지 않음 |

### 甲日例의 **서로 다른 입력이 실제로 다른 십신을 만드는 사례**

| 특정 시간·해석 정책 | `displayYear` | 선택된 年柱 | 甲일간 대비 현대 TenGod | 도출 성격 |
|---|---|---|---|---|
| **2026-01-15 12:00 KST**, 현행 civil year-only 요청 | 2026 | **丙午**, stem **丙** | **食神(식신)** | 현재 코드의 구조적 계산 경로로부터 재현 가능한 결론(자동 실행검증 아님) |
| **2026-01-15 12:00 KST**, `SOLAR_TERM_EFFECTIVE_PERIOD`를 *가정*한 비교 | 2026 | 직전 유효 입춘년으로 보는 **乙巳**, stem **乙** | **劫財(겁재)** — 현대 naming convention | **가상 비교 정책**, 실제 코드에서 이 policy가 선택·구현됐다는 뜻 아님 |
| **2026-02-04 05:01 KST**, civil 요청 | 2026 | **丙午** | **食神** | 같은 civil year이므로 코드 같은 결과 |
| **2026-02-04 05:01 KST**, 입춘 효력기준의 *가상 모델* | 2026 | **乙巳** | **劫財** | 공식 05:02 KST 전이므로 분 단위로 확실히 이전 |
| **2026-02-04 05:03 KST**, civil 요청 | 2026 | **丙午** | **食神** | 기존 코드와 비교가치 |
| **2026-02-04 05:03 KST**, 입춘 효력기준의 *가상 모델* | 2026 | **丙午** | **食神** | 공식 05:02 KST 후이므로 분 단위로 확실히 이후 |

**중요한 소유권 경계:** `乙巳` 年柱를 2026-01-15에 적용하는 것은 **입춘을 새 年柱의 시작으로 삼는 정책을 선택했을 때에만** 성립. 공식 KASI 표는 절기 시각의 **천문학적 사실**이지 명하의 제품 사주 Year Pillar 정책을 승인해주지 않는다.

## 3. 정책·데이터 분리 요구

이 R8는 다음 두 개의 질문을 명확하게 분리한다.

- **D2-A: `DISPLAY_YEAR`**: 사용자 요청의 **2026년**은 서울 civil year일 수 있다. 이때 문구는 `2026 연운` 등 기간 상품 카테고리를 지칭.
- **D2-B: `EFFECTIVE_ANNUAL_PILLAR`**: 특정 순간의 운을 해석할 경우 `2026-01-15`에 사용할 **年柱**가 어떤 기준에서 유효한가? 이 값은 `periodPolicyId/sourceRef/timeZone/effectiveFrom/Until`(모두 향후 **제안 필드**)에 결속되어야 한다.

**R8 추천:** R7의 `DISPLAY_YEAR`와 `ASTROLOGICAL_EFFECTIVE_ANNUAL_PILLAR` 분리안에 위 **공식 연도 경계 시각과 명하 내부 甲일간 식신/겁재 분기 반례**를 추가하여, period owner가 `civil-year product`/ `solar-term effective`/ `dual display` 중 어느 것을 채택할지 명시적으로 판단하도록 한다. 별도 owner 승인 전까지 period 계산 함수·제품 테마·입춘 정책 **무변경**.

## 4. 회귀 검증 디자인 및 실패폐쇄(이번 라운드에서 자동 실행 아님)

| ID | 시험 입력 | 기대 증명 또는 차단 |
|---|---|---|
| L-01 | `2026-01-15T12:00:00+09:00`, `dayMaster=甲` | 현행 `annualSexagenaryPillar(2026)` → 丙午/식신; **만일 시점별 입춘 기준 제품이라면 정책적으로 다른 결과가 필요** |
| L-02 | `2026-02-04T05:01:00+09:00` (공식 입춘 `05:02` **이전**) | 입춘 전 정책에서 乙巳/겁재; civil year-only에서는 丙午/식신. **의도적인 divergence fixture** |
| L-03 | `2026-02-04T05:03:00+09:00` (공식 입춘 `05:02` **이후**) | 두 후보 정책 모두 丙午/식신; 입춘 기준과 civil 동일 |
| L-04 | `2026-02-04T05:02:00±1초` | **테스트 기대값 미승인**. 공식 게시값 분 정확도만 확인됐고 초가 없어 1초 전후 판정 자료 불충분 |
| L-05 | `2026-12-31T23:59:59+09:00`→`2027-01-01T00:00:00+09:00` | 기존 요청 year의 전환은 테스트에 포함; 입춘 효력경계 테스트와 별도 |
| L-06 | 같은 날짜에 `dayMaster` 미확정 | 분류 중단/fail closed; 임의 日干 보정 또는 Annual 의미 생성 금지 |
| L-07 | modern `劫財`(甲乙)와 明刻 `敗財/劫財敗財` | 시대/판본별 raw 명칭 보존; 서로 다른 canonical/printed 라벨 혼동 금지 |
| L-08 | 입력은 정확히 계산됐지만 Annual 의미 source가 `INSUFFICIENT` | `ANNUAL_OUTPUT_*`·`ANNUAL_PEER_*` 등 미래 사건 해석 **비승인** |

**도입 전 필요:** source-verified exact second if subminute boundary mandatory, period policy owner 결정, current time-zone policy compatibility, code owner의 deterministic test+CI 별도 승인 및 consumer 표시 문구 점검.

## 5. 연구 완료/보류 경계

- **A — 외부 공식 분 단위 절기 근거 및 정확 날짜별 현대 TenGod 결과 차이:** **PASS(소스 + 정적 계산 도출)**.
- **B — 제품 유년 기간 의미의 정책 선택, 정확 초 단위 경계, 실제 자동 테스트:** **HOLD**.
- **C — 코드/CI/Calendar owner·Reader/Official/Bridge/Engine·Production 무수정:** **PASS**, `sourceSupportGrade=INSUFFICIENT` 8/8, `bridgeReentryReady=false`, `Production=HOLD`.

**역사적 직접 인쇄 총계 별도 불변:** Ming L1 7/8; cross-edition L1 8/8; `甲日×流年` 직접 L2-C 1/8.
