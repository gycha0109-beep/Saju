# SA-7D-B1-R7 — 십신 명칭 Convention / 年運 기간 계약의 Owner 결정을 위한 실행 패킷 v1

> Watchtower-Track: `saju-research` · 2026-10-09 · **decision-ready proposal, NOT approved contract**. 제품/역법 정책 변경·함수 변경·CI 실행/권한 승격 금지. `sourceSupportGrade=INSUFFICIENT` Annual 8/8, `bridgeReentryReady=false`, `Production=HOLD`.

## 1. R7 기준 증거 범위 및 두 종류의 L1 통계

| 지표 | 검증된 범위 | 수치 |
|---|---|---|
| `MING_PRINT_L1_EXACT` | 明萬曆 刻本 한정 甲일간 8대상 단독명칭 | **7/8** (甲乙는 `劫財敗財` 그룹/ `敗財` directional) |
| `CROSS_EDITION_PRINT_L1_EXACT` (R7 신설 문서상의 집계) | **서로 다른 역사적 발행본**을 포괄하여 甲일간 8대상 각각의 대응 단독 十神 이름을 **적어도 한 판면에서** 확인 | **8/8**: 甲乙 단독 `劫財`는 **20세기 발행연도 미상 『子平真詮』 NLC416-11jh010455-35296 PDF p18 / printed p9**에서 직접 육안 판독. 역사적 학교/동일시대 통일성 입증 아님 |
| `ANNUAL_PRINT_L2_C` | 甲日 × 명시된 실제 流年 年干 × 정확 십신 이름을 저본 동일 문맥에서 직접 사용 | **1/8**(1935 千里命稿 甲日×辛亥年 正官) |
| `ANNUAL_PRODUCT_MEANING` | 현대 개인별 Annual 테마의 source qualified 해석 권한 | **0/8**. 시대별 역사적 十神 이름 추가만으로 갱신 불가 |

이 **8/8은 새로운 연구용 `CROSS_EDITION_PRINT_L1_EXACT` 집계**이지 기존 정식 TypeScript `sourceSupportGrade`나 명대 동질 판본 L1=8/8이 아니다. 역사 학교 교차호환/이름 선택 정책은 여전히 별도 HOLD. 정확 원본 PDF SHA 검증은 별도 보류.

## 2. D1: 겁재 정책 소유자에게 제시할 선택안

**권고되는 방향은 ① 아래의 `MODERN_CANONICAL_WITH_SOURCE_EXACT_QUOTE` 채택 심사다.** 이는 구현/승인 완료가 아니라, 기존 `TenGod` 타입·국문 사용자 경험과 역사 인용의 충돌을 최소화하는 **정책 제안**이다.

| 후보 | 사용자에게 출력될 이름 | 고전 원문·기간별 이름 인용 | 정책 장단점/판정 |
|---|---|---|---|
| **① 현대 canonical + 원문 원형 보존 (권고안)** | 연구/일반 이름 `겁재` (modern) | 원전 표시 시 항상 `rawHistoricalLabel` 및 editionRef. 明刻 그룹 `劫財敗財`, 방향 `敗財`, 後印 `劫財` 구분 | 현재 code `TenGod` 호환, 역사를 임의로 rewrite 안 함. **이름 label convention 승인 요청만**, Annual 의미 승인 불허 |
| ② 모든 고전 라벨을 `겁재`로 강제 정규화 | `겁재` | 고전에서 敗財도 `겁재`로 치환 | **기각 권고**: 사료의 학파·시대별 원래 이름 소실, 직접 인용 왜곡 |
| ③ 고전 원문을 canonical 명칭으로 채택 | `패재` 또는 `겁재패재` | 특정 명대 저본 이름만 표시 | 다른 후기 인쇄본 및 현재 `TenGod` 타입과 충돌, 학파 정책/소비자 명칭 선택이 어려움. 검토 가능하나 근거/소유자 승인 필수 |

### 소유권 승인 전 반드시 대답할 5개 질문

1. 현대 고정 `TenGod` 어휘의 **표기 정책**은 연운 계산 결과의 `canonicalTenGod='겁재'`에 제한되는가?
2. `rawHistoricalLabel`·`printedEditionRef`·`sourceModality`은 사료 인용할 때 **필수**인가?
3. `子平真詮` 후대 인쇄 「論十干配合性情」의 `甲逢乙為劫財`를 명대 淵海 刻本의 역사 명칭으로 **소급 인용하지 않는가**?
4. 동일한 단어 `劫財`가 다른 시대·학파에서 나타나더라도 **현대 상품 해석 의미를 그대로 물려주지 않는가**?
5. 이 선택이 product/engine schema migration을 반드시 요구하는가? **아니면 정책 레이어만으로 별도 허용할 수 있는가?** (후자는 책임자 심사 후 결정, 이 문서가 실제 계약을 만든 것은 아님)

**소유자 회신 계약:** `D1=ADOPT_PROPOSED_CONVENTION | CHOOSE_ALTERNATIVE | DEFER`와 선택사유, 적용 scope(`canonical label only` vs `historical display`), 편집 정책 버전, 승인자, 서명/리뷰 artifact 식별자. **이 문자열들은 새 TypeScript enum이 아니라 회신 템플릿이다.**

## 3. D2: civil 요청 연도와 立春 年運 효력 기간 정책

### 실제 main 구현 — 정적 증거

- `src/reading/consumer-reading-request-adapter.ts`: `Intl.DateTimeFormat('en-US',{timeZone:'Asia/Seoul',year:'numeric'})` 방식의 **달력 연도 요청** 생성.
- `src/reading/temporal-reading-context.ts`: `annualSexagenaryPillar(year)`은 `(year - 1984) mod 60` 단독 정수 연도 인자로 年柱 산출; **절기 시각 인자 없음**.
- `src/reading/annual-interpretation-facts.ts`: `deriveAnnualStemTenGod()`은 입력 年干으로 일간 五行陰陽에 따른 현대 十神 이름을 산출; `dayMaster`가 `resolved` 아닐 때 중단.
- `src/research/general-annual-authority-bridge-review.ts`: 위 값들은 **input facts**, Annual semantic authority 아님.

### 기간 책임 모델 결정안

**권고안은 표시 기간과 전통 年柱 유효기간을 아예 분리하는 것이다.**

| 층위 | 소유자에 묻는 결정 | 가능한 결과 |
|---|---|---|
| `DISPLAY_YEAR` | 상품이 “2026년 운세”를 **서울 달력 연도**로 표시하는가? | 현재 request adapter의 civil year 선택을 유지 가능 |
| `ASTROLOGICAL_EFFECTIVE_ANNUAL_PILLAR` | 생년 계산/유년 기간 판정을 **입춘 절입 시각**으로 하는가, calendar-year 표기 관행으로 하는가? | **정확한 천문 절기 발생시각·시간대 source/version**을 소유자가 승인해야 전자 가능 |
| `EFFECTIVE_INTERVAL` | 서로 다른 年柱를 표기하는 경우 start/end를 exact timestamp로 명시할까? | 추가 proposed `effectiveFrom/effectiveUntil/policyId`; 현재 API에 있다고 주장하지 않음 |
| `READING_SNAPSHOT` | request referenceDateTime과 年柱 판정을 어떻게 결속하며, 단순 annual overview는 어느 분기로 가는가? | 정책별 전제/실패폐쇄/사용자 표시 고지 결정 |
| `MONTHLY_NON_INHERITANCE` | 동일 `annualSexagenaryPillar(year)`를 Monthly에도 호출하는 현재 구조에서 어떤 분리를 요구하는가? | 月運 독립 연구와 정책 승인 없이 Monthly의 해석·기간 규칙 변경 금지 |

**우선순위 결정안:** `DISPLAY_YEAR`은 civil year로 유지할 수 있으나, **“특정 시점의 전통 유년 年干”을 의미하는 변수는 시간경계 정책이 없는 현재 year-only helper에서 고증된 값이라고 단정하지 않는 것**을 권고한다. 이 분리 계약을 실제로 도입/구현할지는 기간 계산 owner의 명시적 승인 및 기존 consumer 영향 분석이 필요.

## 4. D2 경계 테스트 상세 패킷 (미실행)

| T | 입력 | 기존 동작(정적 코드로 추론) | 새 temporal owner가 검증할 사항 |
|---|---|---|---|
| `P01` | 서울 `2026-01-15T12:00+09:00` Annual request | `targetYear=2026`, 年柱 `병오` | 실제 `SOLAR_TERM_EFFECTIVE_PERIOD` 정책을 선택한다면 해당 타임스탬프의 年柱와 source data 확인. **현재 출력을 입춘기준 정답이라 주장 금지** |
| `P02` | 서울 `2026-02-05T12:00+09:00` Annual request | `targetYear=2026`, 年柱 `병오` | 2026 실제 입춘 정확 시각으로 전후 확인·sourceRef 유지 |
| `P03` | **실제 2026 입춘 UTC/서울 시각 T±1초** | year-only이면 전후 동일 `병오` | policy가 solar-term이면 exactly-after vs before에 따라 유효기간 구분, 오차·source 검증 |
| `P04` | 서울 12/31 23:59, 1/1 00:01 | civil year 추출 경계 변동 | 시간대/UTC 연도 섞임 여부, product display 의도, 年柱 경계 정책 충돌 |
| `P05` | UTC calendar vs Seoul calendar의 연말 경계가 다른 시각 | 서비스 시간대가 Seoul로 명시돼 있음 | 임의 UTC `getFullYear`과 혼용 금지 |
| `P06` | 요청시각 없음/invalid | consumer adapter가 invalid reason 반환 | 누락이 `annualPillar`로 조용히 보정되지 않는지 |
| `P07` | 日主 ambiguous/unavailable | `buildAnnualInterpretationFacts`에서 throw | 미래 코드 변경에서도 입력 미확정이면 fail-closed |
| `P08` | D1 historical raw `敗財` + 현대 canonical `겁재` | 동일 값으로 silent rewrite 금지 | history quote / modern candidate가 서로 독립 field임을 검증 |
| `P09` | lunar/solar birth policy와 annual target year | 출생/요청 연운의 다른 캘린더 책임 | 출생 스냅샷의 `solarTermContext.lichun`이 Annual resolver의 boundary를 자동 보증하지 않음 |
| `P10` | 年運과 月運 동일 civil target year | 현재 annualPillar helper 공유 | policy 변경으로 월운 의미/권한이 우발적으로 달라지지 않도록 격리 |
| `P11` | 의미 source `INSUFFICIENT` 상태에서 계산 TenGod가 resolved | 계산 후보는 얻을 수 있음 | `ANNUAL_*` activation이 product authority 없는데 production에 유출되는지 E2E negative test |

**각 테스트는 검증 설계**이며 `npm test`/GitHub Actions 실행 PASS를 주장하지 않는다. `P03`의 **실제 입춘 시각을 임의로 정하지 않는다**.

## 5. Owner 승인 대기용 최소 체크포인트

| 이슈 | 결정 요청 | 승인 전 차단 |
|---|---|---|
| `D1 Naming Convention` | ①/②/③ 중 채택, 기간·판본 한정 역사 인용과 modern `TenGod` 연결 scope | `甲→乙` 전역 동의어·이름/연운 새 Production authority |
| `D2 Period Policy` | `DISPLAY_YEAR` vs `ASTROLOGICAL_EFFECTIVE_ANNUAL_PILLAR`의 채택/구분, time-zone/절기 원본 source/version, period test | `annualSexagenaryPillar(year)`를 입춘 기준 절입 유년 resolver라고 주장 |
| `D3 Annual Semantics` | `ANNUAL_*` 별 독립 source statement/의미강도/예외/반례와 reviewer/Bridge/Engine trust | 계산할 수 있다는 이유만으로 운세 의미 생성 |

**R7 종료조건 A:** cross-era print-bound 甲乙 증거와 D1 명칭 결정안 **PASS**, 소유자 실제 선택/명대 호환 **HOLD**.
**B:** 달력 year-only 구현과 D2 기간 선택안·11개 부정 테스트 설계 **PASS**, 실제 solar-term 정책 선택/fixture 테스트 **HOLD**.
**C:** 문서·Research-only, 기존 CI/TypeScript/Engine/Official/Reader/Bridge/Monthly/Production 무변경 **PASS**.

**권한 불변:** `sourceSupportGrade='INSUFFICIENT'` Annual 8/8, `bridgeReentryReady=false`, `Production=HOLD`. B1 직접 甲유년 L2-C **1/8**.
