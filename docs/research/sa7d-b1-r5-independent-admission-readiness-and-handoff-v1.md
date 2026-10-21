# SA-7D-B1-R5 — 십신 계산 계약 독립 수용 심사·후속 인계 v1

> 2026-10-09 · Watchtower-Track: `saju-research` · **Research-only 독립 심사 결과**. 새 십신 계산 코드·성능 테스트·상시 CI·제품 권한 없음. 8개 Annual `sourceSupportGrade=INSUFFICIENT`; `bridgeReentryReady=false`; `Production=HOLD`.

## 1. 독립 심사 대상·결론

R4의 `T-COMP`(분류 계산)와 `T-HIST`(개별 인쇄 용례)를 독립 평가한다. R5에서 **기존 소스의 실제 계약**(아래 2절)까지 대조해 “표현할 수 있음/계산할 수 있음/역사적으로 실재함/의미 해석할 권한이 있음”을 구분했다.

| 게이트 | 요구한 증거 | 결과 | 제품/Bridge에 대한 효과 |
|---|---|---|---|
| **G1: 타입 경계** | 현재 `HeavenlyStem`, `TenGod`, `FactState` 정의 확인 | **PASS — 문서 심사** | 10종 표현 가능 ≠ 10종 역사 명칭 PASS |
| **G2: 분류 규칙의 구조** | 五行 生剋 방향·陰陽 正偏 분리·甲일간 10개 후보 매트릭스와 반례 | **PASS — 연구용 후보** | 새 알고리즘 배포/테스트 합격 아님 |
| **G3: 고전 ↔ 현대 명칭 호환** | 同일간·同방향·판본별 raw name·明刻 `劫財敗財/敗財`와 현대 `겁재`의 mapping policy | **HOLD** | 명대 단독 `甲→乙 劫財` L1 여전히 미충족 |
| **G4: 연도 및 입춘/기간 입력** | `targetYear` civil request와 `annualPillar` 원전 천간의 기간 정책·provenance, `dayMaster` resolved | **HOLD (실행 경로 독립 검증 미실시)** | 미확정 간지/정책에서는 fail closed |
| **G5: 개별 직접 인쇄연운** | 동일 역사판면의 `甲日 + 특정 流年 + 정확 十神` | **1/8만 연구용 직접 PASS** | 나머지 7종 인쇄 직접 사례/승격 불가 |
| **G6: 현대 해석 의미 권한** | Annual 고유 source statement·interpretiveReading·researchInference·허용/금지·판본/학파별 scope | **HOLD** | 현재 열 개 `ANNUAL_*` semanticKey는 internal 연구 정책; 십신 계산 결과만으로 의미 승인 불가 |
| **G7: 공식 authority admission** | reviewer attestation, trust grants, provenance/lifecycle review, Engine intake approved | **NOT ATTEMPTED / HOLD** | Research 소스 반환만 가능, Bridge/Engine/Reader/Production 권한 없음 |

**최상위 연구 판정: `R5_RESEARCH_AUDIT_COMPLETE / COMPUTATION_ADMISSION_NOT_READY`.** 이 문구는 문서 연구 상태를 표시하는 **가칭**이며 실제 enum이나 시스템 상태값이 아니다.

## 2. 기존 권한 계약과의 대조

아래는 **저장소 `main` 파일을 직접 조회한 사실**이며 R5에서 이를 수정하지 않았다.

### 2.1 이미 있는 입력·연운 Research 객체

- `src/contracts/common.ts`: `FactState<T>`는 `resolved`/`ambiguous`/`unavailable`으로 구분.
- `src/contracts/calculation.ts`: 현대 `TenGod` 10종과 `HeavenlyStem` 10종, 원국 `TenGodChartFact`, `dayMaster` 및 `solarTermContext.lichun`.
- `src/research/general-annual-reading-candidate.ts`: `METHOD_ID='M-GENERAL-ANNUAL-T9-MYEONGHA-POLICY-V1'`, `status:'research'`, `annualStemTenGod`을 `temporal_fact`의 필수 입력으로 사용; `TEN_GOD_THEME`의 semanticKey는 현대 제품 의미의 **연구 후보**. `GENERAL_ANNUAL_POLICY_SOURCE.sourceType='internal_research'`, `provenanceTier='internal'`, `QUALITY.reviewerStatus='unreviewed'`.
- `src/research/general-annual-sa7d-b1-ten-god-witness-audit.ts` 초기 연구 스냅샷: `sourceSupportGrade:'INSUFFICIENT'`, `bridgeReentryReady:false`, `production:'HOLD'`. 본 R5 원전 조사 결과로 자동 수정하지 않음.

### 2.2 이미 선언된 Bridge·Engine 권한 경로

- `src/research/general-annual-authority-bridge-review.ts`: 현재 `decision.disposition='RETURN_TO_RESEARCH'`, `annualSpecificSourceAuthorityEstablished=false`, `sourceResearchBlockers`에 **annual-theme / branch-clash-tension / annual-methodology** 각각 권한 부족이 독립적으로 기록됨. `annualPillarIsInputFactNotInterpretationAuthority=true`, `annualStemTenGodIsInputFactNotThemeAuthority=true`.
- `src/research/general-annual-research-return-handoff.ts`: 연구 반환은 Annual TenGod semantic authority, Branch clash semantic authority, Annual scope & qualifiers, internal policy separation **별도 workstreams**를 요구. 연구 완료 후에도 `sourceCompletionOnlyAuthorizesBridgeRereview=true`, `highestPermittedFutureReentryState='READY_FOR_BRIDGE_REREVIEW'`. 이것은 **지금 READY라는 선언이 아니다**.
- `src/interpretation/saju-engine-authority-intake.ts`: `upstreamDisposition='RESEARCH_GAP'`이면 `routing='HOLD_RESEARCH'`, `AUTHORITY_GAP`이면 `HOLD_AUTHORITY`. `implementationMayProceed`는 별도 admitted branch에서만 결정; `mayInferAuthorityFromResearchRuntime=false`, `mayImplementNewSemanticsWithoutAdmission=false`.
- `src/interpretation/promotion-authority.ts`: 소스 심사 권한/production 권한을 분리하고 `productionAuthorityAuthorized:false`를 source-adjudication-only 조건으로 유지.

**결론:** 일반 십신 계산에 필요한 천간 타입과 연구용 의미 매핑이 존재해도 **권한 gate를 통과하는 경로가 없다**. R5 문서를 만들어 `READY_FOR_BRIDGE_REREVIEW`로 반환하는 것도 source authority와 reviewer requirements를 갖추기 전에는 불허.

## 3. 도출 계산 T-COMP에 대한 잠정 경계

현재 역사 자료에서 **단독 명칭 L1-EXACT 7/8**, 유년 입력 방법 L2-M의 직접 인쇄, 甲辛 정관 유년 직접 L2-C 1/8을 확인했다. 이에 따라 현대 십신 계산 후보는 **연구용 명시적 오행·음양 테이블**로 설계할 수 있으나, 다른 문헌의 원국 이름과 `流歲取天干`를 합쳤다고 명대에서 실제 甲日×모든 유년 十神을 명명한 증거로 승인할 수 없다.

**필수 명칭 정책 미결:** `甲→乙`의 현대 이름 `겁재`와 明刻 판본 내 `劫財敗財` 그룹·양→음 `敗財` 규칙. `targetCanonicalName`(현대 타입)과 `historicalRawLabel`(인쇄 문구) **별도 필드/출처** 계약이 실제 authority 소유자의 승인을 받기 전에는 역사 이름 호환 PASS 불허.

## 4. 제안되는 후속 인계 항목 (반환 가능 ≠ 실행 권한)

| 항목 | 현재 Research 반환 내용 | 남은 증빙·실행 주체 |
|---|---|---|
| **H-01 분류 convention** | 甲 예시 10천간 modern candidate table, 역사 L1의 7/8 별도 provenance | **명칭/기준학파 정책 owner**: 현대 겁재·명대 패재 정책 선택 및 정확 historical citation |
| **H-02 annual temporal contract** | `targetYear` civil 요청과 `annualPillar`의 분리, unresolved fail-closed 테스트 제안 | **canonical 시간·역법 owner**: 실제 연주 해석 대상 기간/節入/시간대/제공 필드 및 경계 결정·테스트 |
| **H-03 research source evidence** | `sa7d-b1-witness-ledger-v2.md`, 명대/민국 판면, 연구용 L2-M/C/D 분리 | **전통 사주 Research**: 우선 타깃 7건 또는 동일 판본 독립 mapping 근거 추가될 때만 재개 |
| **H-04 annual semantic authority** | 십신명·유년 천간 **계산 가능성**과 `ANNUAL_PEER_SELF_DIRECTION` 등 **사용자 설명 의미**를 분리 | **연운 해석 Research**: Annual-specific claims에 대해 sourceStatement/interpretiveReading/researchInference, 강도/예외/반례·범위. 제품 Policy 단독 근거 불허 |
| **H-05 branch-clash semantics** | Annual-to-natal clash는 숫자/관계 fact와 의미별로 별도 평가 필요 | **해석 Research 별도 항목**: 충·형의 사건 효과 단정 금지 |
| **H-06 Bridge/Trust/Engine** | 위 Research artefacts는 심사용 반환 가능, 운영 source authority 아님 | **별도 Bridge domain review/trust** 후 Engine authority intake 및 코드/CI/Official/Reader 단계로 진행 |

이 목록은 작업 할당을 강제로 새로 발행한 것이 아니라 기존 파일들의 책임 경계를 바탕으로 정리한 **후속 심사 요청안**이다.

## 5. 재검토 트리거 / 자동 중단 조건

**바로 재검토를 요청할 수 있는 사건(증빙 확보 이후만):**

1. `甲→乙` 현대 겁재·역사 패재의 **정책적 이름 선택과 역사 인용 한계**가 승인되어 `conventionId`/적용 범위·반례가 생김.
2. 요청 `civilTargetYear` → `annualPillar`의 **정확한 계산 주체·적용 기간·정책 버전**이 명세/테스트로 검증되고 원국 `dayMaster`의 `FactState`와 결속됨.
3. `GENERAL_ANNUAL_THEME_ACTIVATION` 등 **소스 적격성**이 의미별로 확보되고 예외/금지/학파·범위가 재검토됨.
4. 실제 독립 도메인 reviewer/trust/provenance/lifecycle 승격 심사가 별도 소유권으로 완료됨.

**즉시 중단할 전개:** `L2-C` 직접 사례 1/8 → 8/8 치환, `L2-D` 연구 추론을 direct scan으로 제시, 甲乙 역사 원문을 modern 겁재와 무단 동의어화, `status:'research'`인 T9 규칙을 권한 승인으로 간주, 월간 또는 Reader/Official/Engine/Production 자동 승격.

## 6. 검증 성격·종료 조건

R5는 **GitHub 연구 문서와 현행 계약 소스의 정적 대조**를 수행한 것이다. 위 시나리오는 **문서 심사/향후 테스트 입력**이며 실행된 단위/E2E 테스트가 아니다. 새로운 원전 직접 판면이나 PDF SHA를 취득하지 않았다.

**A — 계산·명칭 계약:** 현대 분류 테이블과 고전 rawLabel·판본·음양 방향 분리 **문서 심사 PASS**, historical name mapping 선정 **HOLD**.

**B — 입력·권한 계약:** civil target year vs annualPillar·FactState fail-closed·기존 Bridge/Engine permission 경계 감사 **PASS (계약 분석)**. 실제 period policy/semantic source/admission **HOLD**.

**C — 무결성:** `docs/research/` 전용, TypeScript·API·테스트·CI 및 Reader/Engine/Official/Bridge/Monthly·Product 변경 **0건**, PR draft·미병합 유지 **PASS**.

**최종 연구 수치 불변:** `L1=7/8`, `L2-C=1/8`, `Product L3=0/8`, `sourceSupportGrade=INSUFFICIENT` Annual 8/8, `bridgeReentryReady=false`, `Production=HOLD`.
