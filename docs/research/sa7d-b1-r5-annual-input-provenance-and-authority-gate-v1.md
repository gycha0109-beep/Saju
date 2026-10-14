# SA-7D-B1-R5 — 연운 입력의 시점·출처·계산 권한 분리 감사 v1

> 2026-10-09 · Watchtower-Track: `saju-research` · **기존 컴포넌트 실제 계약을 읽은 후 작성한 연구용 admission 심사**. 새로운 temporal 계산이나 API를 구현·승인하지 않음. Annual 8종 `sourceSupportGrade=INSUFFICIENT`, `bridgeReentryReady=false`, `Production=HOLD`.

## 1. 저장소에서 실제로 확인한 필드·책임 경계

| 현재 파일(메인 기준 관찰) | 실제 정의·서술 | 본 감사의 해석 한계 |
|---|---|---|
| `src/contracts/calculation.ts` | `HeavenlyStem`의 한글 천간 열 항목, `TenGod`의 한글 열 항목, `TenGodChartFact`의 원국 `year/month/day/hour`, `dayMaster: FactState<StemFact>`, `solarTermContext?.lichun` | **원국 표에서 year 지위**를 요청시점의 annual pillar로 오용 불허; 일간·운 입력의 역할 구분이 필요 |
| `src/contracts/common.ts` | `FactState<T> = ResolvedFact<T> | AmbiguousFact<T> | UnavailableFact`, 값은 `status:'resolved'`일 때만 명확 | ambiguous 두 후보 중 임의 한쪽을 택해 십신 생성하지 않음 |
| `src/calculation/calculation-engine.ts` | 절기 `lichun`을 `solarTermContext`에 기록하는 로직 존재; 로컬 계산 정책 예시 `Asia/Seoul` | 이것만으로 **요청 대상 특정 연도의 `annualPillar`를 절입 시각 경계로 산출한다는 주장은 불가**. 코드 실행으로 검증하지 않음 |
| `src/research/general-annual-reading-candidate.ts` | `GENERAL_ANNUAL_POLICY_SOURCE`는 내부 연구 정책, `targetYear`가 consumer request adapter가 정한 **civil Asia/Seoul target year**라고 밝힘. `annualPillar`·`annualStemTenGod`을 `temporal_fact`의 **required** 입력으로 요구. `status:'research'`. | **연간의 원전 천간**과 **civil targetYear**의 의미를 설명 없이 한 입력으로 동일화 금지. 이 `T9` 후보가 연구적 해석 테마라고 해서 역사적 검증이 통과한 것은 아님 |
| `src/research/general-annual-sa7d-b1-ten-god-witness-audit.ts` | B1 첫 스냅샷 `sourceSupportGrade:'INSUFFICIENT'`, `annualSpecificDirectWitnessVerified:false`, `production:'HOLD'`, `bridgeReentryReady:false` | 후속 print-bound L2-C 1/8 연구결과를 이 초기 타입스크립트 스냅샷에 **무단 동기화하거나 Production PASS로 해석 금지** |

**문서 결론:** `targetYear`의 **요청 기간**, `annualPillar`의 **역법에 따른 간지**, `annualStemTenGod`의 **日主 대비 분류 결과**, `ANNUAL_* semanticKey`의 **제품 표시용 의미**는 **네 단계**이며 합쳐서는 안 된다.

## 2. 연구용 4층 인터페이스 계약 제안 (실제 기존 TS 타입·필드가 아님)

```text
[INPUT_REQUEST]     civilTargetYear, requestTimeZone, readingScope
  ↓ ① consumer request resolution — 기존 owner 별도
[PERIOD_RESOLUTION] periodPolicyId, effectivePeriod, annualPillar, pillarProvenance
  ↓ ② canonical calendar/solar-term owner 별도
[CLASSIFICATION]    natalDayStem(resolved), annualStem(resolved),
                    labelConventionId, mappingProvenance
  ↓ ③ deterministic computation candidate — 미승인 연구 제안
[AUTHORITY]         evidenceKind, historicalDirectWitnessRef(nullable),
                    historicalLabelRaw(nullable), semanticAuthority,
                    productReleaseGate
  ↓ ④ semantic/product owner 별도
[OUTPUT]            계산된 후보 이름 (연구) 또는 차단, 독립 의미 설명 불허
```

네 단계에 대한 **누가 무엇을 생성했는지**는 별도 책임을 가진다. 연구 원전이 시간대·절입시점·기준년 정책을 자동 결정하는 것은 아니다.

### 반드시 검증할 경계

1. **원국 日干의 해석 기준:** `dayMaster.status='resolved'`가 아닌 `ambiguous/unavailable`이면 분류 시도 금지. `乙`이 출생 年柱로 있으면 `dayStem=乙`로 대체할 수 없다.
2. **유년 연간 해석 기준:** 정확한 `annualPillar`에 `stem`이 명시돼야 한다. `targetYear=2026` 등 숫자만 있고 어떤 운기간의 간지인지 불명확하면 연간 十神 후보 계산도 보류.
3. **시간 경계 분리:** `civilTargetYear`/표준시와 `立春`·절입에 따른 연간/年柱 정책은 개념적으로 다르다. 역법 엔진 owner가 `effectivePeriod`과 `periodPolicyId`를 제공하지 않으면 연구에서 직접 연간을 추정하지 않는다.
4. **연도·시간대 정합성:** 요청 대상 연도와 산출된 `annualPillar`이 동일 `periodPolicyId`에서 나온 것인지 검토. `Asia/Seoul` consumer 정책이 존재하더라도 모든 원전의 太歲 기간과 자동 동치라는 뜻 아님.
5. **출처와 기간 구분:** 원국 年柱·時干·大運의 글자를 `annualStem`에 복사하면 잘못된 L2-C 도출. `流年`과 `歲運`도 고전의 출처 범위를 분리.
6. **계산 이름과 역사 이름:** `calculatedModernTenGod='겁재'`는 `sourceHistoricalRawLabel='劫財敗財'` 또는 `敗財`의 번역 완료·역사 동치 승인이라는 뜻이 아니다.
7. **출력 제약:** `GENERAL_ANNUAL_THEME_ACTIVATION`과 `ANNUAL_*` 테마는 `tenGod` 데이터 존재만으로 승인 불가. 실제 `GENERAL_ANNUAL_POLICY_SOURCE`는 `provenanceTier:'internal'`, `QUALITY.reviewerStatus:'unreviewed'`·`status:'research'`로 기록된다.
8. **부정 예측 금지:** 미래 사건의 필연, 건강·재산손실·배우자 결과, 운세 점수, 타이밍 보장 같은 정책 외 추론은 원전/계산 근거에 포함되지 않는다.

## 3. R5용 실패폐쇄 반환 상태 (새 코드 enum 아님)

| 상태 가칭 | 발생 이유 | 올바른 처리 |
|---|---|---|
| `BLOCK_UNRESOLVED_DAY_MASTER` | 日干 `ambiguous` 또는 `unavailable` | 관계명 계산 중지, reasonRef 유지 |
| `BLOCK_ANNUAL_PERIOD_UNRESOLVED` | 年 기간 정책·annualPillar 未확정 | 추정 年干 입력 금지 |
| `BLOCK_ROLE_MISMATCH` | natal year/month/hour/daiyun ↔ annual stem 혼동 | 입력 조인 거부 |
| `BLOCK_CONVENTION_UNSELECTED` | 현대 `겁재`와 명대 `敗財`의 이름 선택 정책 미정 | 역사 동치/사용 권한 없는 mapping 결과 차단 |
| `RESEARCH_LABEL_CANDIDATE_ONLY` | 입력과 현대 분류 규칙은 있으나 역사/운/제품 권한 미승인 | 비권한 계산 연구 후보로만 취급 |
| `BLOCK_SEMANTIC_PROMOTION` | 十神 이름을 `ANNUAL_*` 재물·직업·관계 의미로 승격 시도 | Claim/Bridge/Reader/Production 반영 불허 |

현재 **실제 배포 인터페이스**에 위 이름의 반환 코드가 존재한다고 주장하지 않는다. 보수적 입력 검증과 담당 트랙 반환을 위한 문서적 검사 분류다.

## 4. 독립 수용 테스트 설계 (자동 실행 X)

| ID | Given | Expected |
|---|---|---|
| T-01 | 日干=甲 resolved, **유년 壬** resolved, 명칭 정책 미선택 | 원전 역사 명칭 승인 **HOLD**, 계산 연구 후보만 보관 |
| T-02 | 日干=甲 ambiguous(甲/乙 후보), `annualPillar=辛亥` resolved | `BLOCK_UNRESOLVED_DAY_MASTER`, 正官 단정 금지 |
| T-03 | 원국의 출생 `year.stem=丁`, 유년 `annualPillar` 누락 | `BLOCK_ANNUAL_PERIOD_UNRESOLVED`; 상관 유년이라고 하지 않음 |
| T-04 | `civilTargetYear`만 알려지고 solar-term 정책 불명 | 연운 天干 확정하지 않음 |
| T-05 | 기간 정책 A/B에서 연간 경계가 다른 요청 시각 | 정책을 명시하지 않으면 의미 해석·비교 실패폐쇄 |
| T-06 | `甲` 日主와 `己` annualStem resolved | `정재` 현대 계산 후보 가능, 역사 직접 L2-C **NO** |
| T-07 | `甲` 日主와 `乙` annualStem resolved | 현대 관행 `겁재` 후보, 明刻 `敗財`/그룹 표기 raw label 보존; source grade 상향 금지 |
| T-08 | `甲` 日主와 `辛亥` 유년 resolved + 정확 1935 원전 증거 | 역사 직접 사용례 L2-C **한 건**, 현대 직장·역할 예측 **NO** |
| T-09 | `annualStemTenGod='정재'`이지만 의미 증거 `INSUFFICIENT` | `ANNUAL_WEALTH_STRUCTURED_RESOURCES` 일반 제품 의미로 자동 연결 **BLOCK** |
| T-10 | 동일 요청에 TimeZonePolicy만 다르고 annualStem unverified | 다른 사용자/간지로 조용히 치환하지 않고 정책 누락 보고 |
| T-11 | 기존 `src/research/general-annual-sa7d-b1-ten-god-witness-audit.ts`의 0/8 초기 버전과 뒤의 문서 연구 1/8 | 시점별 증거 원장 구분, 소급 코드 수치 변경 없이 R5 HOLD |

**모두 문서상 수용 테스트 조건이며 실제 `npm test` 실행 결과가 아니다.** 실제 코드 테스트·period resolver 구현·입춘 경계의 deterministic fixtures는 해당 owner가 별도 변경 승인 후 수행할 사항이다.

## 5. 결론 및 담당 트랙 반환

- **입력 계약:** 원국 日干과 요청 유년 年干의 타입/역할 분리 **필수**, unresolved state는 fail-closed.
- **시간 계약:** 기존 `targetYear`의 *civil Asia/Seoul request*와 원전 `流年` 범위의 동일성은 **아직 보장되지 않음**, canonical temporal resolver owner와 정책 확정 필요.
- **십신 이름:** `TenGod` enum에 이름이 있는 사실은 역사적인 단독 이름/제품적 의미를 승인하지 않음.
- **权限:** 기존 T9 연구용 narrative 규칙이 이미 존재하지만, `sourceSupportGrade=INSUFFICIENT`를 뚫는 사용 허가가 아님. Engine·Official·Reader·Bridge·Monthly 권한 승격 불허.

**A:** 실제 저장소의 현재 타입·연운 입력·초기 B1 스냅샷에 맞춘 개념적 4층 계약 도출 PASS. **B:** 시간 경계·명칭 convention·semantic admission 실제 권한과 자동 테스트 **HOLD**. **C:** 코드·API·CI/Production 무변경 PASS.
