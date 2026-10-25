# 명하 사주 명식 전체 종합해석 강화 — 구현 로드맵

> **작성:** 2026-10-26
> **저장소/작업 브랜치:** `gycha0109-beep/Saju` / `feat/saju/500-personalized-reading-roadmap`
> **상태:** 구현 로드맵 수립 완료 / 후속 구현 미시작
> **범위:** 기존 Saju 해석 엔진의 명리적 판단 연결, 전체 명식 T8, 5개 원국 주제, 연·월·대운, 최종 일괄 검증
> **기준:** `docs/implementation/saju-r1-canonical-capability-runtime-audit-v1.md`, `docs/research/saju-500-full-interpretation-reachability-audit-2026-10-26.md`, `사주 트랙 Refresh Master Plan v1.1`
> **위치:** 기존 7단계 *500건 연구·판정 로드맵 완료 후* 진행할 구현 작업. 기존 로드맵을 미완료로 되돌리거나 새로운 계산 엔진을 시작하지 않는다.

## 0. 달성할 결과

**한 사람의 기존 명식** → 이미 등록된 십신 T5뿐 아니라 월령·통근·강약·격국·조후·조건부 구조 관계에서 **적용 근거가 허용되는 것만** 선택 → 전체 명식의 **공유 T8 종합해석** → 직업·재물·관계·사업과 연·월·대운에 **같은 공유 근거 재사용** → 읽을 수 있는 사주 결과.

전수조사에서 계산한 11개 사실 항목은 고정 500명에서 모두 생성됐다. 그러나 현재 실제 원국 T8 문단이 직접 소비한 계산 사실 경로는 **십신 배치 7종 중심**이다. 기존 통근·강약·격국·조후 등의 연구 파일이 존재한다는 사실만으로 해석 출력에 연결됐다고 볼 수 없다. 재물 118명은 여전히 직접 중심 T8 근거가 부족하다. **따라서 계산기 확장이 아니라 기존 명리 연구의 실행·소비 경로 구현이 우선**이다.

### 개발 원칙

- **기존 계약 사용:** Canonical Saju Snapshot → T0 계산 사실 → T1~T7 방법론별 Claim → **공유 구조 Claim/Graph** → T8 도메인 종합 → T9 및 대운 → 기존 Evidence Selector / Narrative / Reading 경로를 유지한다.
- **새 병렬 엔진 금지:** 별도 `CanonicalNatalAnalysis`, 새 Product Mapper, MyeongHa DB의 해석 authority 복제, 상품별 원국 계산기·공통 규칙 복제를 만들지 않는다.
- **판단은 근거에 한정:** 등록된 Methodology/Rule/Source 및 명식별 적용 조건이 없는 결론을 생성하지 않는다. 신강·신약, 격국, 용신은 전 명식에 강제로 붙이지 않고 방법론별 판정·보류·불일치를 보존한다.
- **LLM 역할 분리:** LLM·캐릭터는 허용된 Claim의 전달만 한다. 빠진 T8, 길흉, 금액, 결혼/건강/직장 사건, 시기 결과를 만들어 내지 않는다.
- **연구 권한 유지:** Research/Preview 코드가 존재한다는 이유로 Production·Official·출판·판매 권한을 올리지 않는다.
- **개발 우선:** **1~4단계는 실제 구현과 소비 경로 연결만 수행한다. 단계별 독립 QA·500명 재검사·반복 CI·추가 검증 문서 작업은 하지 않는다.** 실행이 아예 불가능한 오류를 확인하는 최소한의 필수 조치만 허용한다. 빌드·테스트·500명·의미 비교·CI 판정은 **5단계에서 한 번에 수행**한다.
- **기존 자산 우선:** 새 문헌 수집이나 미시 규칙별 반복 연구를 시작하지 않는다. 해당 판단에 쓸 수 있는 기존 근거가 없다면 임의 해석 대신 그 Claim만 unavailable/insufficient로 두고 다음 구현 범위로 진행한다.

## 구현 순서 — 5단계만 사용

### 1단계. 기존 명리 연구를 실행 가능한 **공유 구조 판단**에 연결 — P0

**목표:** 십신 T5 조합 외의 명식 요소가 실제 Interpretation Claim Graph에서 소비될 수 있게 만든다.

**구현 순서**

1. **1A 월령·계절·통근:** 기존 절기·월지·지장간·오행·일간 T0 사실과 `general-natal-root-strength-dependency-map.ts`, `general-natal-root-term-binding-authority.ts`, `i18a-month-branch-strength-evidence.ts`의 조건을 연결한다. 먼저 **성립 여부를 말할 수 있는 관측 Claim**부터 만든다. 존재 관측을 강약의 최종 판정으로 바꾸지 않는다.
2. **1B 왕쇠·강약·당중·조과:** `i23-strength-decision-readiness-v2.ts`, `general-natal-wang-shuai-qiang-ruo-semantic-axis-authority.ts`, `general-natal-tonggen-dang-zhong-support-constituent-authority.ts`에서 실제 충족한 전제에 한해 **방법론별 조건부 판단**을 낸다. 전제가 빠지면 unresolved.
3. **1C 격국·조후·용신·희기신:** 이미 기록된 성립 조건·반례·기법 구분을 각각의 기존 연구 출처와 연결한다. `general-natal-pattern-candidate-establishment-formal-boundary-audit.ts`, `general-natal-tiaohou-priority-conditions.ts`, `general-natal-xi-yong-ji-shen-scope-observation-authority.ts` 등을 재사용한다. **격국 하나·용신 하나 강제 확정 금지.**
4. **1D 천간·지지 조건부 관계:** `src/calculation/structural-relations.ts`와 `general-natal-minimal-interaction-predicate-set-executable-claims.ts`의 관측/적용 조건을 규칙에 연결한다. 합·충의 존재, 성립 조건, 의미와 효과를 서로 다른 Claim으로 유지한다.
5. 모든 신규/재사용 구조 Claim에 `sourceRefs`, `methodologyRef`, `ruleId`, `input fact path`, `scenario`, `unresolved reason`을 남긴다. 상충하는 학파 판단은 `preserve_all` 경로로 보존한다.

**접속 코드:** `src/interpretation/interpretation-engine.ts`, `src/interpretation/rule-registry.ts`와 위의 `src/research/` 자산. 새 병렬 호출·저장소는 만들지 않는다.

**산출물:** 같은 계산 스냅샷에서 실행되는 방법론별 **공유 구조 Claim 군**. 일부 결론이 보류되더라도 나머지 허용된 관측은 사용 가능하도록 구현.

### 2단계. 전체 명식의 **T8 종합해석** 구현 — P0

**목표:** 별개 십신 문단을 쌓는 방식에서 벗어나 **원국 전체의 주요 구조와 그 관계**가 하나의 의미 있는 결론으로 이어지게 한다.

**구현 순서**

1. `src/research/general-natal-multifactor-candidate.ts`의 **같은 채널 십신 T5 조합**에 1단계의 허용된 공유 구조 Claim을 **명시적 Rule 입력**으로 결합한다. `src/research/general-natal-useful-reading-candidate.ts`에 이미 있는 원국 기초 경로를 재사용한다.
2. 출처가 허용하는 **핵심 구조 / 구조적 보완 / 긴장 또는 충돌 / 적용 불가**를 서로 구분하는 T8 규칙을 만든다. 근거 수나 임의 가중치로 `최종 신강/용신/우세 요소`를 정하는 범용 결정기 금지.
3. `Rule/Methodology/Source → T8 Claim → upstreamClaimRefs`가 실제로 이어지게 구성한다. 다른 방법론이 다른 결론을 낼 경우 결과를 함께 보존하고, 근거가 없는 명식에는 근거 부족을 출력한다.
4. `src/preview/general-natal-multifactor-report.ts`와 기존 전체 사주 소비 경로를 **핵심 설명 → 보조 구조 → 예외·상충 → 제한 사항** 순서로 연결한다. 문장 증가가 아니라 실제 해석 구조가 추가되어야 한다.

**산출물:** 같은 명식에 공통으로 적용되는 **근거 기반 전체 사주 T8 보고서**. 후속 메뉴는 이 구조를 다시 계산하지 않고 소비한다.

### 3단계. 공유 구조를 **재물·직업·연애·사업**에 적용 — P1

**목표:** 2단계 전체 명식 구조를 다섯 원국 메뉴가 **공유하되 서로 다른 주제 해석**으로 사용하는 것.

**구현 순서**

1. `src/research/wealth-natal-multifactor-candidate.ts`의 기존 재성·식상·관성·인성·비겁 근거에 **출처가 허용하는 공통 구조 Claim**을 입력으로 받는 재물 T8 규칙을 연결한다. 간접 맥락/긴장만 있는 문단은 직접 재물 중심 풀이로 승격하지 않는다.
2. `career-natal-multifactor-candidate.ts`, `business-natal-multifactor-candidate.ts`, `relationship-natal-multifactor-candidate.ts`도 동일 공유 구조를 각 주제에 필요한 경우에만 선택한다. 각 메뉴가 공통 구조를 독립적으로 재판정·복제하지 않는다.
3. 기존 5개 원국 메뉴의 보고서/프로필에서 **공통 중심 판단 → 그 주제의 조건부 해석 → 긴장·불확실성**을 소비하도록 연결한다. `src/preview/natal-five-domain-multifactor-reader.ts` 등 현재 출력 경로 활용.
4. `src/reading/product-reading-integration.ts`, `src/reading/governed-reading-evidence.ts`에서 **동일 명식 공유 근거의 식별자**와 방법론 불일치 정보를 원형 그대로 전달한다. 충돌을 범용 우선순위 규칙으로 묻지 않는다.
5. 근거가 남아 있는 재물 118명에 대한 **직접 중심 T8 적용 가능 범위**는 구현 대상이지만, 아무 명식이나 `complete`로 채우는 기능은 추가하지 않는다.

**산출물:** 원국 전체·직업·재물·관계·사업이 **공통 구조를 재사용**하고 각 메뉴의 의미·한계를 분리하는 출력 경로.

### 4단계. **연운·월운·대운**을 원국 종합판단과 연결 — P2

**목표:** 시기별 간지나 육합 짝의 단순 관찰을 넘어, **허용된 원국 T8와 시간 T9/대운 규칙의 실제 상호작용**을 설명하는 것.

**구현 순서**

1. **올해:** `src/research/general-annual-reading-candidate.ts`, `src/preview/temporal-natal-correspondence.ts`에서 시간 Claim과 공유 원국 구조 Claim이 실제로 결합 가능한 경우에만 관계 규칙을 실행한다.
2. **이번 달:** `src/research/general-monthly-reading-candidate.ts`, `src/reading/monthly-interpretation-facts.ts`의 절입 전후 구간·효력 시점을 유지하면서 1~3단계의 원국 구조와 결합한다. 연운 결과를 월운 결론으로 자동 상속하지 않는다.
3. **대운:** `src/research/general-natal-dayun-natal-interaction.ts`와 기존 대운 계산을 연결할 수 있는 **근거 있는 시기별 의미 Claim**부터 구현한다. 연령/대운 간지 목록을 `10년 인생 사건 예측`으로 승격하지 않는다.
4. 연·월·대운의 방법론, 효력 기간, 시간 간 겹침과 보류 상태를 분리해 기록한다. `src/reading/temporal-reading-context.ts` 및 기존 시간 문맥 계약을 재사용한다.
5. 최종 출력은 기존 Evidence/Narrative 경로를 따라 **Reader용 근거 전달 데이터와 기록 탭 상세 보고서용 구조적 결과**를 제공한다. 캐릭터의 고유 말투는 별도 명하 렌더러가 담당한다.

**산출물:** 원국 근거와 결합된 **연운·월운·대운의 조건부 해석 결과** 및 현재 사용 경로. 근거 없는 실제 사건·길흉·시점 예측은 여전히 보류한다.

### 5단계. **마지막에만 일괄 검증 및 최종 판정**

> **1~4단계 중간에 별도 500명 재실행, 단계별 QA, 반복 회귀 테스트, CI 기다림, 마이크로 연구 재검토를 끼워 넣지 않는다.** 이 단계가 유일한 통합 검증 단계다.

1. 빌드·타입 확인·린트·관련 자동 테스트를 **통합 수행**한다.
2. 동일 난수 시드 `0x5a1a2026`의 500명·8개 메뉴 재실행으로 각 명리 요소가 **계산 → 구조 Claim → 전체 명식 T8 → 주제/시간 해석 → 읽기 출력**까지 실제로 도달했는지 검사한다. 기존 `saju-500-capability-reachability-audit.mjs`를 재사용·확장한다.
3. 기존 500명 결과와 **명식별 직접 근거 경로·실제 사용된 규칙·의미 차이**를 비교한다. 출력 글자 수, 서로 다른 문자열 수, 등록 규칙 수를 해석 품질로 오인하지 않는다.
4. 재물 118명 등 미충족 사례, 같은 명식의 5개 메뉴 간 모순, 신강/격국/용신 방법론 충돌, 절입 경계, 생시 불명, 출처 누락, 근거 없는 권한 승격을 함께 판정한다.
5. 최종 승인 범위를 **근거 있는 연구 구현 완료**와 **실제 소비자 상품 준비 여부**로 나눠 보고한다. 도달하지 못한 원인은 정확한 Rule/Methodology/Source 또는 소비 경로에 연결하고, 근거 부족을 가짜 `complete`로 만들지 않는다.
6. 최종 단계의 관련 CI가 실행되면 결과를 확인하고, 성공 근거가 없는 workflow는 PASS로 보고하지 않는다.

**산출물:** 동일 500명 종합 리포트 + 직접 해석 공백 목록 + 실행 경로 증거 + 최종 품질 판정.

## 첫 구현 작업 — 바로 시작할 지점

**1A 월령·계절·통근의 공유 구조 Claim 연결**부터 수행한다.

- 기존 `CanonicalSajuSnapshot`의 `derivedFacts.dayMaster`, `derivedFacts.hiddenStems`, `solarTermContext`, `pillars.month` 정보를 가져온다.
- 이미 존재하는 월령·통근 관련 **적용 조건과 사용 권한이 있는** Rule/Methodology/Source를 우선 연결한다.
- 구조 관계의 존재와 강약 판정을 분리한 Claim을 기존 registry/execution에 연결한다.
- 충분한 근거가 없는 신강·신약·용신 결론은 생성하지 않고 다음 구조/도메인 구현을 계속한다.

## 진행 보고 기준

| 단계 | 구현 현황 |
| --- | --- |
| 1. 명리 연구 → 공유 구조 Claim 연결 | **월령·뿌리 후보 T2와 십신 T5의 연구용 구조 연결 구현; 최종 강약·격국·용신은 근거 제한으로 미구현** |
| 2. 전체 명식 T8 종합해석 | **출처 한정 공유 구조 T8 구현; 전체 명식 최종 우선순위·강약 판정은 미완료** |
| 3. 5개 원국 주제에 공유 구조 재사용 | **실제 선택된 영역 T8과 공유 T8의 조건부 참고 경로 구현; 분야별 결과 인과 판단은 미승인** |
| 4. 연운·월운·대운 상호작용 구현 | **연·월운 T9/원국 T8 대응 구현; 대운 R072 효력 판정기는 근거상 비허용** |
| 5. 통합 검증·500명 최종 판정 | **500명 실행·출처 추적 완료, 상품 완성 미승인. 원격 CI는 별도 확인 대상** |

구현 진척도는 실제 코드 변경/연결 완료만 표기한다. 확인되지 않은 퍼센트나 근거 없는 완료 선언은 하지 않는다. 작업 도중 실패하는 필수 실행 문제만 고치고, 그 외 검증·CI 업무는 **5단계까지 미룬다**.

### 2026-10-26 구현 실행 기록

[첫 통합 구현 결과 및 남은 명리 한계](saju-whole-chart-structural-first-implementation-result-2026-10-26.md)를 참조한다. 완료로 표시된 부분은 **실제 구조 관측·출처 소비 경로**에 한정되며, 신강·격국·용신·대운 운세의 최종 결론과 제품 권한은 포함되지 않는다.

### 2026-10-26 후속 구현 — I18B 지장간 도전 관측 연결

[지원 방향 월령과 도전 방향 지장간의 출처 기반 공존 구조 구현](saju-hidden-challenge-structural-followup-2026-10-26.md): 기존 I18B T2와 범위 가드를 공유 구조 T8에 연결, 500명 최종 실행 오류 0건, 실제 복합 T8 307건·211명. 구조 관측만 새로 구현했으며 최종 강약/격국/용신 또는 상품 해석 완료를 뜻하지 않는다.

### 2026-10-26 양방향 지장간 지원·도전 실제 구현

[I13/I18B 추가 구조 구현 및 500건 최종 결과](saju-two-way-hidden-evidence-implementation-2026-10-26.md): 기존 월령 관계를 기준으로 지원·도전 양쪽 지장간 근거를 실제 T8로 연결했다. 총 2,434건 구조 T8, 500명 실행 오류 0건. **신강·격국·용신·대운 최종 해석은 미완료**이며 공식 판매 권한은 변경되지 않았다.

### 2026-10-26 I13 천간 대비 구조 연결 구현

[월령과 연간·월간·시간의 상반된 십신 관계를 실제 공유 T8로 소비](saju-i13-visible-stem-contrast-2026-10-26.md). I13의 원본 T2와 필수 강약 판정 금지 가드를 재사용한다. 동일 500명 새 구조 604건·422명, 전체 공유 구조 T8 3,038건, 실행 오류 0건. 상품용 명식 전체 강약·격국·용신·대운 효과 판정은 **미완료**이다.
