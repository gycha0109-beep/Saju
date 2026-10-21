# SA-7D-B1-R9 — KASI 달력자료/공식 월력요항 출처 등급 분리 및 유년 경계 독립 감사 v1

> 2026-10-09 · Watchtower-Track: `saju-research` · 연구 전용, 기존 R8 역사적 스냅샷 보존 · **원전 판면 재확인 PASS / 공표된 절기 분값 존재 PASS / 관보 원문과의 직접 일치 대조 HOLD / 자동 테스트 미실행**.
>
> 이 문서는 앞선 R8의 출처 **지위 기술을 후속 감사에서 정정·한정**한다. R8 문서나 과거 원장을 덮어쓰지 않고 출처 계보를 보충한다. 최신 소스나 공식 계산 계약을 변경하지 않는다.

## 1. R8 복구 검증과 실제 근거
| 대상 | 독립 확인 | 허용하는 주장 | 비허용 주장 |
|---|---|---|---|
| 『子平真詮』 NLC `NLC416-11jh010455-35296` | Wikimedia Commons 원본 PDF **287쪽**, PDF **p18(1-based)/index17/인쇄 九** 판면 재열람. `甲逢乙為劫財` 문자 확인 | 특정 별도 인쇄본에서 甲乙의 단독 `劫財` 용례 확인 | 명대 『淵海子平』가 甲乙을 단독 `劫財`로 적었다고 소급; 특정 乙流年 L2-C 확정; PDF 전체 원본 SHA 검증 |
| KASI **2026년 달력자료** | `https://astro.kasi.re.kr/kor/life/post/calendarData?search_year=2026`의 검색 색인/공개 표에서 **입춘 2월 4일 05시 02분** 확인; 기관 제공 표는 시·분까지만 제공 | **KASI 기관 게시 달력자료 값 2026-02-04 05:02 (KST, 분 단위)**이라는 연구상 근거 | 이 달력자료를 곧바로 **공식 공표된 2026년 월력요항의 관보 원문**이라 부름 |
| KASI **공식 월력요항** 안내 | `https://astro.kasi.re.kr/kor/life/post/almanac?search_year=2026` / `https://astro.kasi.re.kr/life/post/almanac?year=2026`에서 **2026년 월력요항 및 전자관보 연결 안내** 확인 | 실제 공식 발표 계통은 2024년부터 우주항공청의 **관보 게재**라는 출처 계보 | **관보 본문 속 입춘 05:02**가 이번 R9에 직접 판독됐다고 주장 |

### 1.1 중요한 R8 provenance 교정

KASI `달력자료`는 자기 페이지에서 **“이 자료는 공식 발표 자료가 아닙니다”**, **“공식 발표 자료는 월력요항을 확인”**이라고 명시한다. 따라서 R8이 기관 공개 데이터를 `공식 2026 월력요항`과 동격으로 서술한 대목은 **source status 과잉**이다.

- `OBSERVED_INSTITUTIONAL_CALENDAR_VALUE = 2026-02-04 05:02 KST` (**확인**).
- `DIRECT_OFFICIAL_GAZETTE_VALUE_MATCH = UNVERIFIED` (**HOLD**).
- `SUBMINUTE_INGRESS_BOUNDARY = UNVERIFIED` (**HOLD**).
- 기존 R8 연운의 **조건부 비교 반례는 정책 간 차이를 보여주는 연구 fixture로 유지**. 단, 입춘 절입의 *최종 공식 관보 기준* 채택·고정 전 실제 서비스 경계 정책의 진리값으로 취급하지 않는다.

[2026 달력자료](https://astro.kasi.re.kr/kor/life/post/calendarData?search_year=2026) / [2026 공식 월력요항 진입점](https://astro.kasi.re.kr/kor/life/post/almanac?search_year=2026) / [『子平真詮』 Commons 인쇄본](https://commons.wikimedia.org/wiki/File:NLC416-11jh010455-35296_%E5%AD%90%E5%B9%B3%E7%9C%9F%E8%A9%AE.pdf).

## 2. 실제 `main` 코드 정적 교차검증

확인한 소스 경로와 책임:
1. `src/reading/consumer-reading-request-adapter.ts`: `PRODUCT_READING_TIME_ZONE='Asia/Seoul'`; `resolveTargetPeriod`는 `Intl.DateTimeFormat`으로 참조시각의 **서울 달력 연도**를 결정. Annual/Monthly에 모두 사용.
2. `src/reading/temporal-reading-context.ts`: `annualSexagenaryPillar(targetPeriod.year)`; `(year-1984) mod 60` 年柱. `buildTemporalReadingContext`는 **Annual과 Monthly에 동일 연주 함수** 사용. 함수의 입력은 정수 연도뿐이며 절입 시각/출처 버전 미전달.
3. `src/reading/annual-interpretation-facts.ts`: `deriveAnnualStemTenGod`는 **주어진 연간과 일간 오행/음양**으로만 현대 십신명 분류. 年柱의 역법상 시점 유효성은 판단하지 않음.
4. `src/research/general-annual-authority-bridge-review.ts`: `RETURN_TO_RESEARCH`, `production='HOLD'` 확인. 의미 출처의 독립적 적격성 불충분.

이 항목들은 **코드 정적 열람 결과**이며 호출 실행·단위/E2E/CI 검증 결과가 아니다. `main`의 소스 권한이 2026-10-09 시점 이후 바뀌면 새로 대조해야 한다.

## 3. R9 조건부 재현 행렬 (실행 전 설계, 자동 테스트 0건)

다음은 **일간 甲이 resolved**인 경우의 현재 코드 정적 분류와, 입춘 효력기간을 별도 채택했을 때의 *가상 비교*다.

| Case | 동일 시점 / 경계 | 서울 표시연도·현행 年柱 → 十神 | 가상 입춘 효력 年柱 → 十神 | 판정 |
|---|---|---|---|---|
| R9-01 | 2025-12-31 23:59:59 KST | 2025 · 乙巳 → 劫財 | 乙巳 → 劫財 | 정적 예상, 미실행 |
| R9-02 | 2026-01-01 00:00:00 KST = 2025-12-31 15:00:00 UTC | 2026 · 丙午 → 食神 | 乙巳 → 劫財 | 달력 변경과 유년 경계 분기 |
| R9-03 | 2026-01-15 12:00 KST | 2026 · 丙午 → 食神 | 乙巳 → 劫財 | R8 반례 유지 |
| R9-04 | 2026-02-04 05:01 KST = 02-03 20:01 UTC | 2026 · 丙午 → 食神 | 乙巳 → 劫財 | KASI 게시 **분값**에 따른 조건부 전 구간 |
| R9-05 | 2026-02-04 05:03 KST = 02-03 20:03 UTC | 2026 · 丙午 → 食神 | 丙午 → 食神 | KASI 게시 **분값**에 따른 조건부 후 구간 |
| R9-06 | 2026-02-04 05:02:00±1초 KST | 2026 · 丙午 → 食神 | **예상값 미설정** | 공식 관보 원문/초 단위 기준 미검증 |
| R9-07 | 동일 순간 `2026-01-01T00:00+09:00` / `2025-12-31T15:00Z` | **동일 2026** 요구 | 선택된 기간정책 내 동일 결과 요구 | timezone 동치 fixture 제안, 미실행 |
| R9-08 | `monthly` 요청 (2026-01-15) | `annualPillar`는 동일 year-only helper로 丙午 | 月運 의미·기간 변경 **권한 없음** | 월운 비상속/회귀 영향 검토 |
| R9-09 | 日干 unavailable/ambiguous, 요청 연도 미상/invalid | 입력·계산 문제별 별도 fail-closed 검토 | 임의 甲 대입·해석 금지 | 원본 불확실성 유지 |

`R9-04/05`의 *가상 입춘 정책* 결과는 발표된 **분값 전후 간격**의 재현 사례이지, 특정 초 시각에 대한 법정 최종 절입 책임 인정이 아니다.

## 4. D1/D2 소유자 판단 준비도

**D1 — 현대 canonical + 원문 exact 인용:** `MODERN_CANONICAL_WITH_SOURCE_EXACT_QUOTE`를 **채택 심사에 제출할 정도로 증거가 정리된 제안**으로 유지한다. 필요할 때 `modernTenGod='겁재'`와 `rawHistoricalLabel='劫財敗財'|'敗財'|'劫財'`, `printedEditionRef`, `sourceModality`의 독립 보존 필요. 필드들은 **논리 예시**이며 승인된 DB/TS 필드가 아니다. 동일 판본·일간·방향·인쇄 vs 전사 구분. Natal research-only에서 Annual 의미 자동 상속 금지. 실제 제도 채택 **HOLD**.

**D2 — 표시연도와 年柱 효력기간:** source taxonomy 검수에서 **공식 관보 원문 직접 대조**가 미충족으로 추가 식별되었다. 표시연도는 현행 서울 달력 연도 유지 가능하나, `effectiveFrom/Until`, KST 시각정밀도, boundary source version, Annual/Monthly 영향, consumer 의미, 오류 시 fail-closed, 실제 테스트는 **기간 owner 승인 전 미채택/HOLD**. 특히 `01월 초에 丙午 식신`을 특정 순간의 입춘 유년 사실로 자동 소개하면 안 된다.

**D3 — Annual 해석 의미:** (L1 + L2-M \neq L2-C), (L2-C \neq L3). 새 자료는 **역법상 분기 후보와 명칭 출처**를 제공할 뿐, 현대 사건 예측·상품 의미 authority를 부여하지 않는다. `RETURN_TO_RESEARCH` 불변.

## 5. 연구 검증과 종료

- **A — 역사 인쇄 근거:** PDF p18 직접 인쇄명 재열람 및 Commons 서지 **PASS**. 원본 PDF 바이트 전체 SHA-256, 정확 출판연도 **HOLD**. 새로운 직접 甲日×특정 流年 L2-C **0건**.
- **B — 명칭·기간 계약:** D1은 제안으로 decision-ready, **정식 채택 HOLD**. D2는 KASI 제공 **달력자료 값** 확인, 공식 관보 시각 원문 일치 **HOLD**, 초 단위 **HOLD**, 자동 테스트 **미실행**.
- **C — 권한/CI 무결성:** 이 문서는 `docs/research/` 내 연구 기록만 추가. 별도 CI workflow 생성·수동 dispatch 0건. 문서 커밋으로 **기존 GitHub Actions가 자동 기동되어 실행 중**이므로 `CI 실행 0건`이라 주장하지 않음. 이 R9 경계 행렬의 새로운 전용 자동 테스트는 미작성·미실행. 계산/Official/Engine/Reader/Bridge/Monthly/Production, TypeScript enum·source grade·admission gate 변경 **0건**. 본 PR은 **Draft/Open/미병합** 유지 대상.
- **수치 불변:** 明刻 단독 L1 **7/8** / 교차 저본 L1 **8/8** / 甲일간 직접 L2-C **1/8** / Annual 제품 의미 **0/8**. Annual 8종 `sourceSupportGrade='INSUFFICIENT'`, `bridgeReentryReady=false`, `Production=HOLD`.

다음 독립 연구는 **공식 2026 월력요항 관보의 판면·절기 실제 문구 직접 확보**(중복 다운로드·상시 CI 금지) → 기관 `달력자료`와 일치 여부 확인 → 기간 owner에게 범위별 차단/회귀 fixtures 전달이다. 관보 미확보 시 시각 근거를 `KASI 기관 데이터(비공식 달력자료)`로만 표기하고 종료한다.
