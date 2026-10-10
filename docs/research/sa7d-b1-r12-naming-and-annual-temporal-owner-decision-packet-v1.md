# SA-7D-B1-R12 — 十神 명칭 D1·연운 年柱 기간 D2·Annual 의미 D3 소유자 결정 패킷 v1

> 2026-10-09 · Watchtower-Track: `saju-research` · **승인요청 문서/아직 승인되지 않은 제안**. 최신 `main` TypeScript 정적 재열람 수행. **실행/테스트 0건, 정책 채택 0건, 제품 authority 승격 0건, 관보 원문 수치 일치 HOLD**. 연구 PR #2441 Draft/Open/미병합 유지.

## 0. 범위·증거·변경 금지

**범위:** `docs/research/`에서 R7~R11의 甲日 십신명·공식 月曆要項 출처 계보·입춘 경계 후보를 **계산 및 제품 소유자의 분리된 결정 질문과 수락 기준**으로 번역한다. 본 연구자는 명칭 canonical, 기간 효력, Annual 의미, 월운 소유권을 채택할 수 없다. **계산 코드를 이 연구에서 수정하지 않는다**.

증거 계열:
- R7 [명칭·期間 정책 선택지](sa7d-b1-r7-modern-label-convention-and-annual-period-decision-packet-v1.md) D1/D2와 P01~P11 설계.
- R9 [KASI 비공식 달력자료 및 年柱 경계 9종 독립 감사](sa7d-b1-r9-kasi-source-authority-and-annual-boundary-independent-audit-v1.md).
- R10 [우주항공청 공식 발표 사실과 관보 원문 시간 HOLD](sa7d-b1-r10-official-2026-almanac-publication-and-gazette-boundary-audit-v1.md).
- R11 [KASI 사전표(2024-07-25 V1.0a) ↔ 우주항공청 2025-06-30 공식 발표](sa7d-b1-r11-official-gazette-primary-witness-retrieval-and-lichun-source-chain-audit-v1.md).
- 이번 R12의 실제 `main` 소스 정적 재열람: `src/reading/consumer-reading-request-adapter.ts`, `src/reading/temporal-reading-context.ts`, `src/reading/annual-interpretation-facts.ts`, `src/research/general-annual-authority-bridge-review.ts`. **실행·CI 테스트 PASS가 아니라 코드 텍스트 대조**.

### 증거 충족 및 권한

| 주장 | 현재 상태 | 범위 |
|---|---|---|
| 명대 원전에서 甲乙 단독 `劫財` | **7/8** 한정, 甲乙는 `劫財敗財`/방향 `敗財` 문구 | 明刻 L1, 단독 이름 자동 보정 금지 |
| 후대 다른 인쇄본까지 甲乙 단독 `劫財` | **8/8** 교차 판본 내 단독 대응 존재 | 명대 8/8 또는 동일시대 합의가 아님 |
| 甲日과 구체 流年이 같은 인쇄 맥락에 이름으로 나옴 | **1/8** | 1935 `甲木日元` × `辛亥年又屬正官之鄉` 한 사례 |
| 현대 개인 年運 제품 의미 | **0/8** | 年柱 계산·고전 라벨만으로 L3 승격 불허 |
| 입춘 2026-02-04 05:02 (KST, 분 단위) | **KASI V1.0a 사전 달력자료에서만 확인** | 공식 관보 해당 호 입춘 문구/페이지/원본 PDF SHA 및 초 단위 **미확인** |

## 1. 최신 main 코드의 사실/책임 경계 (R12 새 재열람)

| 코드 경로 | 실제 코드 관찰 | 이 코드만으로 말할 수 없는 것 |
|---|---|---|
| `consumer-reading-request-adapter.ts`의 `PRODUCT_READING_TIME_ZONE`, `periodNumber`, `resolveTargetPeriod` | `Asia/Seoul` 기준 `Intl.DateTimeFormat`으로 `year`와 필요시 `month` 추출. annual/monthly 상대 기간 요청의 `referenceDateTime` **없음/빈값 → `REFERENCE_DATETIME_REQUIRED_FOR_RELATIVE_PERIOD` invalid**; `new Date()` 파싱 실패 → `REFERENCE_DATETIME_INVALID` invalid. `referenceDateTime`은 `toISOString()`으로 보존. | 해당 서울 달력연도가 입춘 기준 年柱 효력 경계와 동치라는 주장 |
| `temporal-reading-context.ts:annualSexagenaryPillar(year)` | 인자: `number year` 하나, 양의 정수 검증, `(year-1984) mod 60`으로 `STEMS/BRANCHES` 조합 산출. **입춘 원문 sourceRef/epoch timestamp/precision 정보나 입력 파라미터 자체가 없음**. | 법정 월력요항 검증, `effectiveFrom`, 태양절기 年柱의 실제 변경 시각 |
| `temporal-reading-context.ts:buildTemporalReadingContext` | `annual`·`monthly` 분기 **앞에서 동일한 `annualSexagenaryPillar(targetPeriod.year)` 한 번 실행**. monthly에도 `annualPillar` 포함. | Annual 기간정책을 조정하면 Monthly가 자동으로 승인된다는 주장 |
| `annual-interpretation-facts.ts:deriveAnnualStemTenGod` | 해석 의미가 아닌 입력 연간의 오행/음양과 `dayMaster`의 오행/음양으로 현대 `TenGod` 이름 결정. `buildAnnualInterpretationFacts`는 `temporalContext.scope !== 'annual'` 및 `dayMaster.status !== 'resolved'`에서 오류. | 역법 기준 적절성·특정 미래 사건·제품 의미 승격 |
| `general-annual-authority-bridge-review.ts` | `GeneralAnnualBridgeDecision='RETURN_TO_RESEARCH'`; `annualSpecificSourceAuthorityEstablished=false`, `production='HOLD'`; Nat​al→Annual authority 자동 상속 금지. | 컴파일되는 후보나 계산 가능한 fact만으로 Annual semantic authority 획득 |

**중요:** `targetPeriod.year=2026`과 `targetPeriod.referenceDateTime=2026-01-15`가 함께 존재해도, 현행 `annualSexagenaryPillar`은 **시각을 쓰지 않는다**. 이는 *구현의 사실*이지 그 구현이 잘못됐다는 정책 판정은 아니다.

## 2. D1 — 현대 canonical 십신명과 역사적 printed exact label

**검토 안건 `D1.NAMING`:** `MODERN_CANONICAL_WITH_SOURCE_EXACT_QUOTE`를 **권고안으로 제출**하되, 승인되지 않은 계약/새 TS enum이라 주장하지 않는다.

| 의사결정 선택 | 소비자/코드 이름 | 고전 원문 노출 규칙 | 위험 |
|---|---|---|---|
| D1-A **권고, 미채택** | 현대 `겁재` (현행 TenGod lexical) | 인용 때는 **원문 exact string + 시대·서지·인쇄/전사 modality + 일간 방향** 동반. 明刻 그룹 `劫財敗財`, 방향 `敗財`; 후대 子平真詮 단독 `劫財` | UI에서 historical raw alias를 canonical으로 자동 치환하면 출처 왜곡 |
| D1-B | 모든 역사 인쇄명을 canonical 하나로 치환 | `敗財`, `劫財敗財` 원문의 실제 인쇄 형태 소멸 | 증거 재현 불가, 원전 오인용 |
| D1-C | 역사 원어를 기본 canonical으로 변경 | 출판본/시대별 서로 다른 이름 중 어느 것을 기본으로 하는지 새 정책 필요 | 기존 `TenGod`·reader 표기와 호환 충돌 |

**필수 승인 필드(회신 문서 템플릿):** `decisionId`, `ownerRole`, `decision=D1-A|D1-B|D1-C|DEFER`, `scope`(modern classification / historical quote / Natal / Annual), `sourceRefs`, `historicalExactDisplayRequired`, `effectivePolicyVersion`, `reviewArtifact`, `limitations`.

**부정 제약:** (1) 明刻 복합 `劫財敗財`에서 단독 `劫財` 추출 금지, (2) 후대 `甲逢乙為劫財`를 명대 출처로 소급 금지, (3) 단어 이름 합치기를 **Annual 사건·강도·시점 의미 합치기**로 간주 금지, (4) 새 `rawHistoricalLabel` 등 용어는 **논리 예시**이며 기존 API 필드라고 주장 금지.

## 3. D2 — 연운 대상 표시연도와 年柱 효력기간 선택

**핵심 문제:** `DISPLAY_YEAR`는 소비자에게 보이는 "2026년"을 가리키며, `ASTROLOGICAL_EFFECTIVE_ANNUAL_PILLAR`는 실제 **연운 간지 판단이 어느 시각부터 바뀌는가**라는 별도 계약이다. **R12는 어느 쪽도 채택하지 않는다.**

| 정책 옵션 | 계산·소비자 의미 | 채택 전 필수 확인 | 위험/중단 |
|---|---|---|---|
| D2-A `CIVIL_YEAR_ONLY` 현행 구현 유지 | `Asia/Seoul` 달력연도로 2026 → `丙午`. 단, 출력에서 **'입춘 기준 특정 순간의 전통 年柱'**로 잘못 표현하지 않도록 scope 경계 필요 | 제품 노출 문구/업무 목적과 전통 年柱 주장 범위 owner 승인 | 입춘 이전의 역사적 年柱 효력 표시가 요구될 때 불일치 |
| D2-B `DISPLAY_CIVIL_YEAR__EFFECTIVE_SOLAR_TERM_PILLAR` **조건부 검토 추천, 미채택** | 표시는 2026년 그대로, "유효 연주"는 승인된 source version+절입 순간에 따라 분기. 설명 텍스트·effective interval을 별도로 보존할지 심사 | **정확한 소스 판면/제공 정밀도/시각대/시점 포함 규칙/미확인 초 단위 fail-closed/월운 비상속 검토/제품 회귀 테스트** | 관보 분 단위조차 직접 미검증, 초 단위 경계 불확실; API와 월운에 광범위한 영향 |
| D2-C `ANNUAL_PERIOD_UNRESOLVED_FAIL_CLOSED` | 공식 원문이나 효력 정책이 불확실한 순간에는 구체 年柱/십신을 특정 시점의 확정값으로 내보내지 않음 | fail-closed 노출·서비스 사용자 안내·연구/제품 분리 | 응답 가용성 감소; temporal owner/consumer owner 조율 필요 |
| D2-DEFER | 변경·기간 승인 보류 | 선행 원전·scope 검증 | 현재 계산의 범위를 승인된 입춘 모델로 오인 금지 |

**R11 상태가 D2-B에 미치는 영향:** 우주항공청 **2025-06-30 공식 발표** 자체는 PASS; KASI 사전 달력자료 **2024-07-25 V1.0a** `2026-02-04 05:02`은 관측; 하지만 실제 전자관보 **호수·게재페이지·입춘 원문 시간·PDF SHA 미검증**. 단순히 "공식 발표했다"는 출처로 `D2-B`를 채택하거나 `05:02:00`이라는 **추정 초**를 hardcode 할 수 없다.

### D2 교차 소유권 매트릭스

| 결정 책임 | 요청할 소유자 역할 | 연구 문서에서 허용 |
|---|---|---|
| 표시연도/유저 문구/annual overview 의미 | Consumer/Reader/Product | 현행 `Asia/Seoul` civil extraction과 정책 선택지를 설명하는 것만 |
| 節入 데이터 공급·역법 계산 유효시각/정밀도 | Saju calculation/Temporal owner + source authority 검토자 | KASI 사전 분값과 관보 미검증 표기, 대조 조건 제시만 |
| Annual/Monthly 연주 공통 함수 영향 | Annual + Monthly 책임자 동시 검토 | shared helper 경로 인벤토리와 비상속 테스트 설계 |
| D1 고전 명칭 출처 | 연구/lexical owner | raw printed quote 및 edition provenance 예시, **채택 없이** |
| Annual 의미 source/reviewer/gate | Annual authority/Bridge/Engine owner | 현재 `RETURN_TO_RESEARCH`과 source blockers 명시, promote 금지 |

**회신 템플릿(새 코드 enum이 아님):** `D2.choice=A|B|C|DEFER`, `DISPLAY_YEAR_POLICY`, `EFFECTIVE_ANNUAL_PILLAR_POLICY`, `timeZone=Asia/Seoul`, `boundarySourceId`, `boundaryPrecision`, `intervalStartInclusive?`, `unknownInstantHandling`, `MonthlyScope`, `consumerDisclosure`, `approvalEvidence`, `owner`. 임의 기본 승인값을 넣지 않는다.

## 4. R12 실행 전 회귀/부정 검증 패킷 — **설계 13건, 실제 테스트 미작성·미실행**

가정 표: 日干 `甲` resolved일 때 (서울 달력 2026=丙午 → 食神; **가상** 입춘 효력 2026-01-15=乙巳 → 劫財). 이는 역사적 학파·제품 의미 authority가 아닌 **현행 year-only 구현 vs 후보 정책 비교**다.

| ID | 사례/입력 | 현행 코드 정적 예측 | 미래 owner가 별도 검증해야 할 조건 |
|---|---|---|---|
| R12-01 | `2026-01-15T12:00:00+09:00` Annual, 甲 | `targetYear=2026`; `丙午→식신` | D2-B를 선택할 때에만 절입 전 `乙巳→겁재` 후보, 사료·source version 확인 |
| R12-02 | `2026-02-05T12:00:00+09:00` Annual, 甲 | `丙午→식신` | 입춘 이후 양 정책 계산 수렴 여부; source의 정확 절입 정의 필요 |
| R12-03 | `2025-12-31T23:59:59+09:00` vs `2026-01-01T00:00:00+09:00` | 표기 연도 2025→2026, 연주 `乙巳→丙午` | 연도 UI 변경과 D2-B 효력 구간 변경 분리, 무단 제품 정책 변경 금지 |
| R12-04 | `2026-01-01T00:00:00+09:00` == `2025-12-31T15:00:00Z` | 동일 `2026/丙午` | UTC/KST 문자열이 동일 instant면 동일 판정, DST/UTC 달력연도 직접 사용 금지 |
| R12-05 | `2026-02-04T05:01:00+09:00` | civil `丙午` | KASI **분값 05:02**보다 앞이라는 가상 D2-B 판정 사례. 관보 일치 미검증 |
| R12-06 | `2026-02-04T05:03:00+09:00` | civil `丙午` | KASI **분값 05:02** 이후라는 가상 D2-B 판정 사례 |
| R12-07 | `2026-02-04T05:02:00±1초+09:00` | civil `丙午` | **입춘 초·시점 포함 규칙 unknown; D2-B expected = UNSET**, 임의 결정 금지 |
| R12-08 | annual/monthly `referenceDateTime` 누락/빈값 | `REFERENCE_DATETIME_REQUIRED_FOR_RELATIVE_PERIOD` invalid | 자동 '현재' 또는 fallback으로 조용히 복구 금지 |
| R12-09 | annual/monthly `referenceDateTime` invalid 문자열 | `REFERENCE_DATETIME_INVALID` invalid | 잘못된 날짜 silent coercion/수정 금지. 파서의 엄격성은 별도 owner 테스트 |
| R12-10 | Annual snapshot `dayMaster.status=unavailable/ambiguous` | `buildAnnualInterpretationFacts` RangeError | default 甲 가정, 유년 TenGod 제품 의미 발생 금지 |
| R12-11 | `monthly`, `2026-01-15` | 공유 annualPillar `丙午` | Annual 전용 기간 변경을 Monthly에 묵시 전파 금지; 月運 별도 owner 승인 |
| R12-12 | historical `甲見乙爲劫財敗財` / `甲逢乙為劫財` | 역사 인용은 현행 `TenGod` 도출에서 별도 처리되어야 함 | 판본별 raw provenance 보존, 혼합 판본을 단일 동시대 증거로 만들지 않음 |
| R12-13 | `ANNUAL_*` source `INSUFFICIENT`, TenGod 계산은 resolved | 계산 경로는 유효할 수 있음 | **음성 규칙:** Annual 해석 `RETURN_TO_RESEARCH`, 제품/Bridge/Engine/Official `HOLD`, automatic admission **절대 금지** |

- 테스트 도입 위치·테스트 runner·fixtures 수정은 **기간/월운/제품 owner 승인 이후 해당 트랙에서만** 수행.
- 공식 원문이 시·분 단위인 경우, 실시간 유효시각 `05:02:00`로 zero seconds를 임의 완성하지 않는다.
- 입력 소유자가 특정 2026년 기간 전체를 하나의 年柱로 설명하려는 경우, Annual overview와 특정 reference instant의 運勢를 **같은 의미로 간주하지 않는 정책 질문**을 별도로 제출한다.

## 5. D3 — 고전/천문/사주 계산과 Annual 의미 authority 분리

`src/research/general-annual-authority-bridge-review.ts` (이번 `main` 재열람):
- `GeneralAnnualBridgeDecision` 타입은 **`'RETURN_TO_RESEARCH'`**만 포함.
- `sourceResearchBlockers`에 `ANNUAL_THEME_SEMANTIC_SOURCE_AUTHORITY_NOT_ESTABLISHED`, `ANNUAL_BRANCH_CLASH_TENSION_SOURCE_AUTHORITY_NOT_ESTABLISHED`, `ANNUAL_SPECIFIC_METHODOLOGY_AUTHORITY_NOT_ESTABLISHED`.
- `annualSpecificSourceAuthorityEstablished=false`, `production='HOLD'`. `NO_NATAL_TO_ANNUAL_AUTHORITY_INHERITANCE`, `NO_ANNUAL_TO_MONTHLY_AUTHORITY_EXPANSION` 및 `NO_ENGINE_PREVIEW_OFFICIAL_OR_PRODUCTION_PROMOTION_FROM_THIS_REVIEW`.
- **D1의 단어 라벨 정책이 통과**하거나 **D2 기간 산출이 공식적으로 검증**되더라도 D3 Annual semantic authority가 승인되는 것은 아니다. 甲日×특정 실제 流年 L2-C 1/8을 8/8로 추정하지 않는다.
- 공식 역법 원문은 절기·역법 데이터 근거일 뿐, 직업/재산/건강/관계/사건을 예측하는 현대 Annual 의미 승인·과학적 타당성 증거가 아니다.

## 6. 결정 요청 순서·승인·정지 기준

### 가능한 소유자 조치 (이 연구에서 실제로 수행한 작업 아님)
1. **Naming owner:** D1-A/B/C/DEFER와 인용 provenance·scope에 명시적 기록, 기존 UI/코드 호환성 검토.
2. **Temporal/Saju owner:** 공식 관보 원문 식별자 확보 전 D2-B 시행 결정/초 단위 경계 구현 금지; A/B/C/DEFER 선택과 예외·분 단위·source version 결정. 확보 불가능 시 D2-C/DEFER 가능성 심사.
3. **Annual/Monthly owners:** 공용 연주 helper 영향 분석, 실행할 경우 독립 회귀 검증.
4. **Annual authority owner:** D3 독립 소스·scope·반례·검토자·Bridge entry criteria. 8종 `sourceSupportGrade=INSUFFICIENT` 유지.
5. **Governance/CI owner:** 실제 이행은 별도 트랙/PR로만 수행, 이 연구 PR과 겹치는 소유권 변경 금지.

**STOP:** D1을 Annual 의미 승인과 혼동, D2를 KASI 기관 사전표만으로 official signed-off 변경, 원문 시분에서 초 단위 조작, Monthly 자동 상속, Bridge/Engine/Production 자동승격, 변경 diff의 `docs/research/` 밖 침범, PR ready/merge/squash/rebase.

### A/B/C 완료 조건

- **A — 역사·출처 경계: PASS(현재 증거 분류), 관보 원문 HOLD.** R7~R11 용례·출처 위계를 구분했고 `MING_PRINT_L1_EXACT=7/8`, `CROSS_EDITION_PRINT_L1_EXACT=8/8`, `ANNUAL_PRINT_L2_C=1/8`, `PRODUCT_ANNUAL_L3=0/8`. 전자관보 호수·입춘 판면·원본 SHA는 **NOT VERIFIED**.
- **B — 정책 설계: PASS(선택지/책임/13개 회귀 설계), 채택·실제 테스트 HOLD.** D1/D2/D3 소유자에게 *결정 가능하도록 쟁점 정리*하는 작업만 종료. **승인이 있었다고 주장하지 않음**.
- **C — 운영 무결성: 목표 PASS.** 문서·두 원장·PR 설명만 갱신, Actions workflow/TS code/Engine/Reader/Official/Bridge/Monthly/Production/권한 변경 불허. 본 연구에서 새 workflow 생성·manual dispatch·전용 테스트 실행 0건. 문서 커밋의 기존 CI 자동기동 여부/완료는 최종 HEAD에서 따로 확인하고 **전체 통과 주장 금지**.

R12 다음의 **R13 진입 제안**은 고전 직접 L2-C가 정책 선택에 추가로 필요한지 소유자에게 확인하는 *증거 충분성 기준 재점검*을 먼저 하는 것이다. 위 숫자를 목표로 두고 무차별 원문 검색하거나 `8/8`을 사실상 완료 조건으로 강제하지 않는다.
