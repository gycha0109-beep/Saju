# SA-7D-B1-R11 — 2026 월력요항 원문 검색·입춘 값 선후 출처 계보 독립 감사 v1

> 2026-10-09 · Watchtower-Track: `saju-research` · docs/research/ 전용 · **정부 발표문 직접 확인 PASS / 기관 비공식 달력자료 실제 수치·생성시각 확인 PASS / 관보 2025-06-30 해당 호·입춘 판면 직접 확보 HOLD / PDF 바이너리 SHA HOLD / 기간·의미 정책 미승인**.

## 1. 연구 목표, 시도 범위와 산출 판정

**목표:** 2025-06-30 발표된 우주항공청 「2026년 월력요항」의 **실제 관보 원문 PDF/공고 객체**에서 **입춘 날짜·시·분**을 직접 읽고, KASI 기관 달력자료 `2026-02-04 05:02 (Asia/Seoul)`와 별개 출처로 대조한다. 명리 年柱의 유효기간 정책/제품 채택을 결정하는 연구가 아니다.

### R11 소스 탐색 및 결과

| 시도 | 실제 직접 열람·검색 객체 | 확보한 근거 | 결과/금지 과장 |
|---|---|---|---|
| P1 정부 원 발표 | [우주항공청 「2026년 월력요항」 발표](https://www.kasa.go.kr/prog/bbsArticle/BBSMSTR_000000000010/view.do?bbsId=BBSMSTR_000000000010&nttId=B000000001860Pe2zT3) | 등록일 **2025-06-30**, 천문역법 기반 24절기 포함한 2026년 월력요항 발표, '6월 30일부터 관보 등에서 확인' 공지. 보도자료 본문에 구체 **입춘 시각 없음** | `OFFICIAL_PUBLICATION_ANNOUNCED=YES`만 PASS. `GAZETTE_LICHUN_VALUE` 아님 |
| P2 KASI 월력요항 안내 | [월력요항 2026](https://astro.kasi.re.kr/kor/life/post/almanac?search_year=2026), [대체 진입 주소](https://astro.kasi.re.kr/life/post/almanac?year=2026) | '2024년부터 우주항공청이 매년 관보에 게재', 2020년 이후 관보 링크 제공 및 '2026년 월력요항 대한민국 전자관보로 이동' 표기 | 일부 직접 열람은 `Permission denied`/cache miss. 관보 링크 존재 ≠ 실제 대상 관보 페이지 판독 |
| P3 KASI 사전 달력자료 | [2026년 달력자료](https://astro.kasi.re.kr/kor/life/post/calendarData?search_year=2026) | '입춘 2월 4일 5시 2분'; 기관의 **'이 자료는 공식 발표 자료가 아닙니다'** 주의문; **자료생성(V1.0a): 2024-07-25 16:57** | `KASI_PREPUBLICATION_MINUTE_VALUE=2026-02-04 05:02 Asia/Seoul` 확인. 추후 우주항공청 관보 원본이라고 주장 금지 |
| P4 대한민국 전자관보 | [관보 일자별](https://gwanbo.go.kr/user/search/searchDaily.do) | 2001년부터 일자별 원문 열람 가능한 공식 포털의 **기본 진입 화면** 확인 | 해당 기본 페이지의 시점·'총 0건' 같은 표시를 **2025-06-30 대상 날짜의 검색 결과**로 오독 금지. 대상 날짜의 정확 관보 호수·본문·판면 **미확보** |
| P5 정부 공식 공고 게시 계통 추가 탐색 | [우주항공청 공고 예시: 「2027년 월력요항」(2026-06-29)](https://www.kasa.go.kr/bbs/BBSMSTR_000000000018/view.do?nttId=B000000003234Li6nD2) | 기관의 **다른 연도**에는 공고번호·PDF/HWPX 첨부가 공개되는 방식 확인 | 2027 객체로 **2026년 원문 내용/공고번호/입춘 시각**을 소급 추정 금지 |
| P6 후행 규정의 공식적인 행정예고 계보 | [2025-12-12 우주항공청 공고 제2025-0090호 행정예고](https://www.kasa.go.kr/prog/bbsArticle/BBSMSTR_000000000170/view.do?bbsId=BBSMSTR_000000000170&nttId=B000000002580Wk5aX2) | 「월력요항 작성에 관한 규정」의 **제정안에 대한 행정예고가 2025-12-12에 있었다**는 공식 기록 | 이 제정안 예고나 2026-02-02 재게시된 최종 훈령을 **2025-06-30 공표 당시 소급 적용하지 않음**; 확정 규정의 1차 조문 세부 검증은 별도 |
| P7 대상 연도 PDF/관보 문자열 검색 | 기관명·월력요항·'공고'·'2025-06-30'·'입춘'·'filetype:pdf' 조합 등으로 공개 자료 검색 | 보도자료, KASI 사전표, 다른 연도 공고, 비권위 매체의 발표 재전재는 검색됨 | **2025-06-30 관보 해당 호 원문 파일과 입춘 판면을 재현 가능한 링크로 확보하지 못함**. '관보에 없다'는 부존재 주장 불가 |

**이번 bounded research 종료 상태**: 관보 원문 `GAZETTE_OBJECT_ACQUIRED=false`; `GAZETTE_ISSUE_NUMBER=UNVERIFIED`; `GAZETTE_PAGE=UNVERIFIED`; `GAZETTE_LICHUN_TIME_MATCH=UNVERIFIED`; `ORIGINAL_GAZETTE_BINARY_SHA256=UNVERIFIED`. 공식 관보에 해당 입춘 시각이 기재돼 있는지 여부 자체가 아직 **미확인**이다. 그러므로 `NOT_STATED`(원문에 없음을 실제 본 경우)와 혼동하지 않는다.

## 2. R11 신규 출처 선후관계 결론

- **2024-07-25 16:57** — KASI 2026년 **사전 달력자료 V1.0a 생성일시**(페이지 자체 메타데이터). 이 데이터가 공식 발표 뒤에 생성된 것이 아니다.
- **2025-06-30** — 우주항공청 2026년 **월력요항 공식 발표일**(기관 직접 게시). 기관 발표 보도문의 날짜는 절입 시각의 공식 관보 판면 증거가 아니다.
- **2025-12-12** — 「월력요항 작성에 관한 규정」 **제정안 행정예고**(공식 기관 페이지). 이는 그보다 전의 2025-06-30 월력요항 작성·발표에 소급해 근거를 제공하지 않는다.
- **2026-02-02** — R10에 재게시 출처로 적힌 최종 규정 제정·시행 후보일. 이번 R11에서 **국가법령정보센터 1차 조문/연혁을 직접 대조하지 않았으므로** 그 날짜의 authority grade를 추가 승격하지 않는다.

공표의 공식성, 달력 자료의 공식성, 시간값의 정확성, 명리 입춘 年柱 기간 채택, 그리고 현대 Annual semantic authority는 **독립 판단 단계**다. 특히 KASI 달력자료가 사전 생성됐다는 이유만으로 오차라고 단정하지 않지만, **공식 관보 수치 검증을 했다고도 하지 않는다**.

## 3. 원문 확보 시에만 실행하는 충돌·정밀도 판정 계약

| 공식 원문 관측 결과 | 상태 | 연구상 처분 |
|---|---|---|
| 2025-06-30 관보 본문·문서 연계 증거 및 2026 입춘 `2월 4일 05시 02분` 직접 판독 | `MATCH_VERIFIED_MINUTE` | 관보 호수·원문 링크·페이지·인쇄 문자·KST 표기·시각 분 정밀도·PDF SHA를 기록; **초 단위나 명리 유효기간 정책은 별도 HOLD** |
| 관보에 다른 분 시각이 직접 확인됨 | `SOURCE_CONFLICT` | 기관표 V1.0a와 공식 발표 문서의 생성일·수정이력·시간대 차이를 확인, 계산 owner에 분리 전달 |
| 실제 관보 해당 원문을 판면 전체 검독했고도 입춘 시각이 기재되지 않음 | `NOT_STATED_AFTER_DIRECT_READ` | 월력요항이 시각을 명시하지 않는다는 **실제 근거**가 있을 때만 |
| 링크·관보호·원문·판면 중 대상 특정 불가 | `UNVERIFIED` | **R11 실제 상태**. `MATCH`/ `CONFLICT`/ `NOT_STATED` 중 어느 것도 추정하지 않음 |

R8/R9의 가상 경계 예시 중 KASI 사전표 **분값** 전/후 `2026-02-04 05:01` / `05:03 Asia/Seoul`은 **연운 입춘정책을 가정**한 비교로만 유효하다. `05:02±1초`은 공식 판면·절입 초 정밀도 부재로 기대값 HOLD. 같은 UTC/KST instant는 동일 결과여야 한다는 fixture 요구, Annual/Monthly 공용 helper 영향 격리 및 `dayMaster` 모호값 fail-closed 요구 모두 **R9·R7 설계 그대로이며 자동 실행된 테스트가 아니다**.

## 4. 경계 owner 핸드오프 준비와 승인 금지

**D1 이름:** 현대 canonical `겁재` + 역사 raw `劫財敗財`/`敗財`/`劫財`를 직접 판본·저술·시대·문맥별로 분리 보존하는 `MODERN_CANONICAL_WITH_SOURCE_EXACT_QUOTE` **제안**, 미채택. 명대 집합명 → 후대 단독명 보편 치환 금지.

**D2 기간:** `DISPLAY_YEAR=Seoul civil year`와 `ASTROLOGICAL_EFFECTIVE_ANNUAL_PILLAR`의 **정책 소유권** 분리. `consumer-reading-request-adapter.ts` → `temporal-reading-context.ts:annualSexagenaryPillar(year)`(1984 기점 year-only) → `annual-interpretation-facts.ts:deriveAnnualStemTenGod()`의 현행 정적 코드 근거는 R9 기준. 이번 R11에서 새 런타임·E2E·스모크 시험을 하지 않았고 최신 main 코드 변경 유무를 재감사한 것으로 주장하지 않는다. Annual/Monthly shared helper를 사주 연구 문서에서 임의 교체하지 않는다.

**D3 의미:** 年干 十神 계산 가능 / 공표 절기 분값 일치 여부 / 역사 十神 이름 인쇄 / 특정 시대 流年 직접 인용 / 현대 개인 유년 해석 승인 **서로 구별**. `L1+L2-M ≠ L2-C`, `L2-C ≠ L3`.

**R12에 넘길 조건부 결정 패킷:** 표시연도 정의, 入春 전후 시점의 사용자 고지, temporal source version, 간지 효력시작·종료, ambiguity/failure handling, 年運↔月運 분리, D1 raw-label 인용 provenance, 관련 regression design. 연구는 제안만 할 수 있고 정책 승인·코드 변경·실제 테스트는 owner 책임이다.

## 5. 연구 수치, 권한과 A/B/C 종료

- 역사 명대 인쇄 정확 단독 L1 `MING_PRINT_L1_EXACT=7/8` 유지; 혼합 인쇄 저본 `CROSS_EDITION_PRINT_L1_EXACT=8/8` 유지. 후대 『子平真詮』 p18 `甲逢乙為劫財`와 명대 『淵海子平』 복합 `劫財敗財`는 한 인쇄본으로 합치지 않는다.
- 1935 『千里命稿 第一集』 특정 甲日 × 辛亥年正官 한 사례만 `ANNUAL_PRINT_L2_C=1/8`; 새 L2-C 0. 현대 Annual 의미 승인 `0/8`.
- 『子平真詮』 **원본 전체 바이너리 SHA 아직 미검증**. 이번 관보 PDF 전체 SHA도 **미검증**.
- `sourceSupportGrade='INSUFFICIENT'` Annual 8/8, `bridgeReentryReady=false`, `RETURN_TO_RESEARCH`, `Production=HOLD`. Bridge·Engine·Official·Reader·Monthly·Product·CI workflow·TS schema, period resolver 수정 **0건**.

**A — PARTIAL / 핵심 관보 직접판면 HOLD:** 정부 발표일·사전 달력표 수치 및 생성 메타·제정안 예고일 PASS. **관보 원문 시각·호수·PDF SHA HOLD**.

**B — HOLD:** D1/D2/D3 정책 채택·owner 승인은 하지 않았고, 경계/Timezone/Month/Bridge 음성 회귀는 **설계만 존재하고 미실행**.

**C — PASS (docs-only 범위):** 이번 R11의 변경은 `docs/research/` 연구 문서와 원장·PR 메타만 허용. PR #2441 **Draft/Open/미병합** 유지. 새로운 CI workflow·수동 dispatch **0건**; 기존 Actions는 문서 push로 **자동 실행될 수 있으며 CI 완료/통과를 미검증 상태에서 선언하지 않음**.

### R11 후속 재진입 트리거
`2025-06-30 실제 전자관보 호수+게재면 원본 링크+PDF 파일·직접 입춘 판독`을 확보했거나 source-owner가 정확한 관보 원문 식별자를 제공한 경우에만 **관보 원문 일치 심사**를 다시 개방한다. 같은 열린 포털 초기 화면/정부 보도자료/사전 KASI 표만 반복 열람하며 관보 확인 PASS를 조작하거나 불필요한 CI 자동 실행을 늘리지 않는다.
