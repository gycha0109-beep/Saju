# SA-7D-B1-R6 — civil 요청 연도와 立春 기반 연운 기간의 실제 구현 경계 감사 v1

> 2026-10-09 · Watchtower-Track: `saju-research` · **main 소스 정적 읽기 기반**. 연운 60갑자 계산·연간 십신 분류는 코드에 이미 있으나, 그것이 특정 절입 시각의 전통적 太歲 적용 시점을 구현했다는 사실은 아직 확인되지 않았다. **특정 역법 정책을 임의 지정하거나 현재 civil-year 선택을 버그라고 단정하지 않음.** `Production=HOLD`.

## 1. 실제 코드에서 확인한 시간 경로 — R5 후속 실증

| 단계 | 현재 `main` 파일·함수 | 실제 관측된 동작 | 미해결/비포함 |
|---|---|---|---|
| **① 요청 연도 선택** | `src/reading/consumer-reading-request-adapter.ts` `periodNumber()`(L209–222), `resolveTargetPeriod()`(L224–264) | `referenceDateTime`을 `Date`로 해석하고 `Intl.DateTimeFormat`의 `PRODUCT_READING_TIME_ZONE`에서 `year`를 얻어 `targetPeriod={scope:'annual',year,timeZone,referenceDateTime,resolution:'relative_current'}` 구성 | **현재 코드에는 연도 추출 시 입춘 조건 없음**. 요청 연도와 전통 절기 연도는 개념상 다름 |
| **② 年柱 산출** | `src/reading/temporal-reading-context.ts` `annualSexagenaryPillar(year)`(L43–54), `buildTemporalReadingContext()`(L64–95) | `SEXAGENARY_BASE_YEAR=1984`; `cycleIndex=(year-1984) mod 60`을 이용해 천간·지지 배열 색인 산출. Annual뿐 아니라 monthly scope에서도 해당 `targetPeriod.year`로 `annualPillar` 구성 | 함수 서명은 **정수 year 단독**, `referenceDateTime`/절기 시각/`lichun`을 연간 산출에 사용하지 않음. 60갑자 연도 명칭 계산의 타당성과 **경계시각 유년 적용의 타당성은 별도** |
| **③ 원국과 유년 관계 분류** | `src/reading/annual-interpretation-facts.ts` `deriveAnnualStemTenGod()`(L117–132), `buildAnnualInterpretationFacts()`(L180–215) | 日主 五行/陰陽 + 年干의 五行/陰陽을 비교해 현대 `TenGod`를 도출. `snapshot.derivedFacts.dayMaster.status!=='resolved'`이면 throw | 별도 역사 고전명칭 policy 또는 원본 direct case ID를 소비하지 않음; 입력 年干이 어느 간지 기간에 대응하는지 검증하지 않음 |
| **④ 의미 해석 후보** | `src/research/general-annual-reading-candidate.ts` `GENERAL_ANNUAL_READING_METHODOLOGY`(L125–171), `activationRule()`(L202–260) | `temporal.targetYear`, `temporal.annualPillar`, `temporal.annualStemTenGod`의 resolved 입력을 가정하고 `ANNUAL_*` semanticKey에 대응. 소스 `internal_research`, 품질 experimental/unreviewed, `status:'research'` | 계산값/fixture의 존재만으로 역사적 Annual 독립 의미·승격을 승인할 수 없음 |
| **참고 ⑤ 출생 절기 정보** | `src/calculation/calculation-engine.ts` `buildSolarTermContext()`(L156–190), `solarTermContext.lichun` | 원국 계산 스냅샷에는 입춘 문맥을 구성하는 코드가 존재 | 본 조사가 확인한 **①→② 요청 연도 연간 계산 함수의 호출 경로**에는 그 절기 문맥의 사용이 나타나지 않음. 출생 계산과 요청 연운의 owner 경계 분리 |

### 가장 중요한 구현상 사실

`annualSexagenaryPillar(year)`은 **시간대/정확한 날짜를 인자로 받지 않는다**. 따라서 **같은 civil year에 대해 입춘 전후 서로 다른 간지 결과를 내도록 설계된 함수가 아니다**. 예컨대 2026년의 서로 다른 요청시점이 모두 `targetPeriod.year=2026`으로 해결된다면 해당 함수의 年柱 산출은 동일하게 `병오`가 된다. 이는 코드 로직의 성질을 설명한 것이며, **특정 역사적 학파·서비스 정책에서 입춘 이전 연운은 반드시 다른 간지여야 한다는 채택 결정을 이 문서가 내리는 것은 아니다**.

### 이 문제를 왜 Research/Authority에 올리는가

원전 『三命通會』의 `流歲取天干`은 **무슨 천간을 판단에 사용**하는가를 말하지만, 현대 서비스의 **`referenceDateTime`가 입춘 전후에 위치할 때 年柱를 어느 해의 것으로 볼지**와 요청 API의 기간/시간대 정책을 직접 증명하지 않는다. 입력 `annualPillar`가 한 정책으로 정해졌다 해도 사용자에게 유년 의미를 낼 권한은 또 다른 독립 심사.

## 2. 두 가지 가능한 명세 선택지 (어느 쪽도 R6에서 승인 안 함)

| 정책 후보 | 동작 정의 | 요구되는 증거/책임 |
|---|---|---|
| `CIVIL_CALENDAR_TARGET_YEAR` | 읽기 요청의 **서울 표준시 달력 연도**를 연운 표현의 기준으로 삼고 정수 연도 60갑자를 붙임 | 현재 ①② 구현과 일치할 수 있음. **"2026년(병오년)"이 요청 연도 전체에서 사용되는 서비스 관례**를 UX/제품 정책으로 정확히 공표하고 전통 입춘 기준의 순간별 태세 진단과 구별 |
| `SOLAR_TERM_EFFECTIVE_PERIOD` | 특정 판본/학파·계산 정책의 入春/절입 **정확 시각** 이전/이후에 年干支 유효구간을 달리 정함 | 역법 owner가 `effectiveFrom`/`effectiveUntil`, 경계시각 산출 출처, Asia/Seoul DST/역사시각 처리, 정책버전, 비교 테스트와 기대값을 제공해야 함 |
| `USER_SELECTED_COMPAT_POLICY` (향후 검토 가능) | 위의 두 가지를 별도 scope/profile로 명시 선택 | UI·도메인 정책 owner의 승인, 소비자에게 정책 표기, 동일연도 두 결과의 근거/의미 강도 차이 및 혼동 방지 |

**실제로 기존 코드에 위 문자열의 정책 enum이 있다고 주장하지 않는다.** R6는 선택지를 **검토용 대안**으로 제출한다.

## 3. 경계 테스트 설계 (문서용, 자동 실행 X)

| TC | 입력 | 현재 코드에서 기대되는 구조/필요한 반례 검사 | 책임 |
|---|---|---|---|
| **T-01** | 서울 시간 기준 **2026-01-15** 연운 요청 | 소비자 adapter는 civil `year=2026`; `annualSexagenaryPillar(2026)`은 `병오`. **입춘 유효기간의 올바른 2026-01-15 유년이라는 주장은 미승인** | request owner |
| **T-02** | 서울 시간 기준 **2026-02-05** 연운 요청 | 동일 civil year일 때 ①②는 같은 `병오` 산출. 입춘 날짜가 해마다 상이하므로 해당 일자의 경계 후 여부는 **실제 절기시각 원본 기준으로 별도 확인 필요** | temporal owner |
| **T-03** | 특정 연도의 실제 입춘 **경계 직전/직후** 타임스탬프 | 현 ② 함수는 입력이 `year` 하나이므로 **같은 연도의 절입 전후 분기 없음**. 입춘 적용 모델이라면 interval-specific year pillar resolver를 별도로 검증해야 함 | temporal owner |
| **T-04** | 서울 12/31 23:59 및 1/1 00:01 | 서울 civil year 자체가 다르면 ①의 `year`가 바뀌고 ②의 干支도 교체. 입춘 경계와 동일 개념이라는 결론 불가 | request owner |
| **T-05** | UTC로는 전날이나 서울에서는 연도 경계 지난 시각 | `Intl.DateTimeFormat(Asia/Seoul)` 기준과 UTC 년을 섞지 않음 | request owner |
| **T-06** | 日主 상태 `ambiguous/unavailable` | `buildAnnualInterpretationFacts()`은 RangeError로 중단해야 함; 임의 후보를 예언 문장에 투입 금지 | calculation/reading owner |
| **T-07** | 日主=甲; `annualStem=乙` | `deriveAnnualStemTenGod()`는 현대 `겁재`를 내도록 정의됨. 明刻 역사 label `劫財敗財/敗財`를 덮어쓰기 금지 | naming/research owner |
| **T-08** | Annual context vs Monthly context 동일 `targetYear` | `buildTemporalReadingContext()`가 두 범위에서 같은 `annualSexagenaryPillar(year)` 함수를 사용. **Annual 정책을 Monthly 공식 해석에 자동 상속하지 않음** | period/Monthly owner |
| **T-09** | `temporal.annualStemTenGod` 데이터와 `ANNUAL_*` semanticKey | source `internal_research`, `status:'research'`, 실제 Bridge `RETURN_TO_RESEARCH`이면 **제품 의미 직접 승인 차단** | authority owner |

**T01–T09는 코드 정적 독해로 예상되는 테스트 시나리오다.** 실제 실행 결과가 아님. 실제 입춘 경계 표/fixture, 정책 선택, E2E/관찰값은 미확보.

## 4. 판정

- **A — 현행 구현 위치/책임:** 요청 calendar-year owner → 1984 60갑자 함수 → TenGod 오행/음양 대응 함수 → T9 연구 의미 후보의 실제 호출 책임을 추적한 **정적 코드 감사 PASS**.
- **B — 기간 정책·출력 해석:** **civil-year 분류임은 현 코드로 확인**, 역사적 절입시각 기반 `annualPillar` 동치·policyId/계산단위 정의·절입 직전/직후 테스트·제품기간 표시 합의 **HOLD**.
- **C — 권한:** 실제 기간 정책·해석 타입·시스템 상태 수정 없이 문서만 반환. `sourceSupportGrade=INSUFFICIENT` 8/8, `bridgeReentryReady=false`, `Production=HOLD`.

**R6 최종 제안:** Period owner가 실제 정책을 선택할 수 있도록 `CIVIL_CALENDAR_TARGET_YEAR`와 `SOLAR_TERM_EFFECTIVE_PERIOD`를 별도 이슈/계약으로 비교하되, Research가 이를 승인 없이 기존 함수에 소급 수정하지 않는다.
