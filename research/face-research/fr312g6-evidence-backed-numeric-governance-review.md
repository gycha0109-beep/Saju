# FR312G6 — Evidence-Backed Numeric Sizing and Partition Governance Review

## 1. 목적과 상태

FR312G4의 **participant-count sizing method**와 FR312G5의 **participant-level partition allocation method**를 근거 기반 의사결정 심사로 연결한다.

현재 검토 상태는 **review contract issued, no evidence approval**다. FR312F·G4·G5에서 미승인으로 남겨둔 참여자 수, Development 유효 참가자 수, 분할별 인원과 비율, 알고리즘·seed, 신뢰성 합격 임계값을 임의로 채우지 않는다.

본 단계에서 발행되는 것은 **수치 승인 기준과 증거 제출 계약**, 그리고 별도 권한이 없는 synthetic diagnostics다. 실제 수치 승인 자체는 아직 발행되지 않았다.

## 2. 독립 단위와 조사 목적

- 독립 인원 단위 = participant. 2 temporally distinct sessions × accepted 2 fresh captures는 반복측정 설계로, 4개의 독립 참가자로 환산할 수 없다.
- FR312G의 neutral comparator 4 families, 8 axes에 대한 repeatability / missingness / capture-sensitivity 분석은 **Development 전용**이다.
- Calibration은 **미래의 별도 승인된 association 연구**를 위해 예약되어 있다. 이 단계에서 접근하거나 신뢰성 표본 수를 추정하는 데 사용할 수 없다.
- Holdout은 분석계획 고정 및 독립 admission 전까지 봉인한다. Holdout 관측치로 표본 수, precision target, 분할 비율, 합격 기준을 사후 재설정할 수 없다.

## 3. 숫자 결정을 위한 승인 기록

독립 검토자가 승인하기 전에 다음 **11개 기록**을 증거와 함께 제출해야 한다.

| 제출 기록 | 판정 기준 |
|---|---|
| Versioned study and analysis plan | 사전 연구 범위와 계획 버전 고정 |
| Preregistered per-axis estimand and precision objective | 8개 axis별 추정 대상과 요구 precision의 사전 등록 |
| Governed variance / availability evidence | 출처, 수집 허가, 이용 권한, 적용 범위, 결측 여부 검토 |
| Participant-clustered uncertainty calculation | 사람 단위 의존성과 반복 촬영 상관을 반영한 재현 가능한 추정 |
| Missingness / withdrawal / attrition sensitivity | 이용 가능성·철회·탈락에 따른 effective N 변동 평가 |
| Effective Development N rationale | FR312G 연구를 위해 필요한 유효 독립 참가자 수 제시 |
| Calibration / Holdout purpose-specific rationale | 추후 활용 범위와 별도 인원 필요성 근거 분리 |
| Proposed count/ratio reconciliation | Development + Calibration + Holdout = 전체 participant count 검증 |
| Pre-observation freeze and no-leakage attestation | metric·annotation·semantic 값 열람 전 사전 고정과 leakage 금지 |
| Independent methodological reviewer signoff | 의사결정자와 근거·계산 버전 및 시점 추적 |
| Versioned non-biometric audit / replan trigger | 재심의 조건, 변경 사유, 사후 outcome-aware 조정 금지 |

계산의 가정에는 axis별 변동성·가용성, cluster dependence, 허용 불확실성 목표, participant dropout·withdrawal의 민감도가 포함되어야 한다. 근거가 없다면 **insufficient evidence**로 유지한다. 의미가 없는 임의 모집 숫자나 정밀도 목표는 허용하지 않는다.

## 4. 심사 절차

1. **Upstream binding:** FR312F capture/partition, FR312G reliability design, FR312G3 consent/withdrawal, FR312G4 sizing, FR312G5 allocation 목적과 최신 버전 검증.
2. **Evidence intake (향후 별도 authority 필요):** 승인된 선행 연구·독립된 외부 근거 또는 별도 심의를 받은 pilot에서만 variance/missingness 자료를 사용. 출처 불명 예측치·실제 무단 수집 데이터 불허.
3. **Preregistration and computation:** axis별 estimand, precision target, uncertainty 계산 방식, participant-level clustering 및 sensitivity를 사전 고정.
4. **Population reconciliation:** 전체 목표 인원과 분할별 인원·비율, Development의 effective N 관계를 검토. 반복 촬영 row는 분모로 이용하지 않음.
5. **Independent signoff:** 신뢰할 수 있는 재현 가능한 자료와 기록으로 별도 승인 여부 심의. 설계 자체를 승인의 증거로 대체하지 않음.
6. **Separate empirical admission:** 수치가 향후 승인되더라도 그 자체가 participant recruitment, image collection, FR312G execution 권한을 발생시키지 않음.

### 금지하는 순환 논리

- '방법이 설계됨' ⇒ '참여자 숫자가 승인됨' 아님
- '분할 정책이 존재함' ⇒ '배정 비율이 승인됨' 아님
- '모든 checkbox가 true' ⇒ '증거의 실재성과 적합성을 검증함' 아님
- '합성 사례 수치가 합산됨' ⇒ '해당 수치로 모집해도 됨' 아님
- '참여자 수가 정해짐' ⇒ '이미지 수집 가능' 아님

## 5. Synthetic diagnostic

`reviewSyntheticNumericPacketFR312G6`는 가상의 정수 합계와 항목 표시를 대상으로 **형식상 정합성**을 시험한다.

- 모든 count가 안전한 0 이상의 정수인지 확인
- Development + Calibration + Holdout = hypothetical total 확인
- effective Development N ≤ Development participant N 확인
- preregistration, evidence provenance, clustered calculation, missingness/withdrawal, partition rationale, no leakage, reviewer signoff, audit 항목 존재 여부 확인
- 결과의 `numericDecisionAuthorized`와 `empiricalCollectionAuthorized`는 **항상 false**

함수는 데이터 파일·실제 사람·이미지·비밀 식별자를 받거나 읽지 않는다. 단순 true/false 입력을 확인할 뿐 근거의 진위나 법적 적정성을 검증하지 않으며, 연구·데이터 수집 허가 기능도 없다.

## 6. 권한 및 미발행 상태

| 범위 | 현 상태 |
|---|---|
| FR312G2 retention/privacy | 전용 정책 발행 |
| FR312G3 consent/withdrawal | 전용 절차 정의 |
| FR312G4 sample planning method | 정의 |
| FR312G5 partition allocation method | 정의 |
| FR312G6 numeric governance review contract | 정의 |
| 실제 numeric evidence packet | 미발행 |
| Independent numeric reviewer signoff | 미발행 |
| Approved participant count / effective Development N | null |
| Approved partition counts / ratios | null |
| Allocator algorithm / seed | null |
| Evidence freeze record / approval decision record | null |
| Recruitment / empirical collection runtime / admission | false |
| Actual participant collection / FR312G reliability execution | false |
| Calibration/holdout empirical use, FR312H entry | false |
| Traditional semantic validation / automatic binding / product claims | false |

## 7. 종료 기준

**A — Upstream integrity.** FR312F·FR312G·FR312G3·FR312G4·FR312G5의 participant/axis/partition/consent 경계를 검사.

**B — Negative authority.** 유효해 보이는 합성 packet이어도 승인과 수집은 false, 숫자 null, 출처 불충분이나 형식 오류는 정확히 탐지.

**C — CI and merge.** 세 개의 신규 파일만 수정, 표준 CI + Face Reading CI + Integration CI PASS, squash merge.

## 8. 남는 의사결정

현재 승인된 분산·결측 자료, axis별 사전 precision 목표, participant-level clustered uncertainty 계산, 승인 기록이 없으므로 수치 결정을 발행할 수 없다.

후속 단계에서는 독립적으로 승인된 근거 수집·검토(또는 이미 허용된 외부 자료의 진위와 범위 확인)를 먼저 수행한다. evidence의 수집·이용 권한이 미확인이라면 empirical runtime/admission까지 진행하지 않는다. 법적/윤리적 적합성, 연구 타당성 또는 재현성은 이 심사 계약만으로 자동 확정되지 않는다.

Watchtower-Track: face-research
