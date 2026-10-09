# FR312G5 — Participant-Level Partition Allocation Rationale

## 1. 목적과 범위

FR312G neutral metric reliability study의 **participant-level partition allocation contract**를 고정한다. 기존 FR312F capture/partition policy, FR312G neutral reliability study, FR312G3 consent/withdrawal protocol 및 FR312G4 participant-count planning rationale에 종속된다.

이 문서는 실제 배정·모집·데이터 수집의 실행 허가가 아니라 **향후 배정에 필요한 전제와 금지 경계**다. 배정 알고리즘·seed·참가자 수·partition별 비율과 인원·운영 manifest는 발행하지 않는다.

## 2. 분할 단위와 역할

| Partition | 예약 목적 | 현재 열람 |
|---|---|---|
| `development` | FR312G repeatability, missingness, capture-sensitivity 연구 | 현재 실행 허가 없음. 별도 admission 후에만 |
| `calibration` | 별도 승인될 형태 관측 predicate와 중립 metric 간 future association 연구 | FR312G reliability에서는 열람 불가 |
| `holdout` | analysis plan 고정 및 별도 심의 후 독립적 평가 | 봉인. threshold 탐색에 사용 불가 |

**독립 배정 단위는 사람(participant)** 이다. 동일 participant의 2 sessions × 2 accepted fresh captures 및 모든 파생 artifact는 **항상 하나의 partition**에 남아야 한다. 이 반복 capture 수는 4개의 독립 참가자를 의미하지 않는다.

FR312G의 4개 comparator families, 8개 neutral metric axes에 대한 신뢰성 연구는 향후 허가가 내려져도 **development** 범위에서만 수행한다. calibration/holdout 결과를 개발 실험이나 표본 수 산정에 사용하지 않는다.

## 3. 배정 프로토콜 — 사전 입력·동결·누출 방지

1. FR312G3의 pseudonymous participant reference와 study-local, non-biometric lineage만 인정한다. 동일 참가자를 식별하기 위해 얼굴 recognition / embedding / identity template를 생성·사용하지 않는다.
2. 미래 allocator는 participant당 하나의 assignment를 발행한다. session, capture family, image, annotation, neutral metric, snapshot, cache, export, derivative는 participant-level lineage에서 partition을 상속한다.
3. 배정은 **neutral metric 값**, **형태 annotation label**, **traditional semantic tail**을 보기 전에 동결되어야 한다. 동결 전에는 governed allocator 입증·승인 기록이 필요하며 이번 문서가 이를 제공하지 않는다.
4. 다른 partition 간 participant, session, source capture family, image 재사용 금지. image derivative를 다른 partition에 재배치하거나 metric/label 결과를 보고 participant를 옮기는 행위 금지.
5. 계보 정보가 불충분하면 임의로 얼굴 유사도를 사용하지 말고 admission을 보류한다.
6. 현재 numeric/sample authority가 없으므로 어떤 partition에도 실제 참가자를 배정하지 않는다.

### 배정 알고리즘 승인 전 필수 증거

- participant-level effective N에 대한 FR312G4 근거 및 별도 승인
- 목적별 partition allocation rationale와 비율/인원에 관한 승인
- versioned allocator algorithm/configuration/seed, input manifest, authorization record
- consent eligibility, freeze timestamp 및 비생체 participant lineage
- tamper-evident non-image audit 기록
- 독립 empirical collection runtime 및 admission 심사

위 항목은 **미래 allocator 승인 시 필요한 입력 정의**이지, 입력이 현재 존재하거나 승인됐다는 주장이 아니다.

## 4. 철회·인원 부족

FR312G3에 따른 유효한 withdrawal은 향후 capture 및 annotation을 중단하고 retained image, participant-linked annotation/metric, partition assignment를 삭제한다. study linkage는 retirement 처리한다. 삭제 증거는 참가자나 원본 이미지의 재구성 정보를 포함하지 않는다.

철회한 참가자를 다른 partition으로 옮기거나 aggregate에서 연결을 복원할 수 없다. 탈락·누락으로 목표 유효 인원에 못 미쳐도 **사후 재배정 및 outcome-aware top-up은 금지**다. 필요한 경우 별도 governance에서 prospective replan/승인을 다시 수행한다. Holdout 데이터 관측 이후 모집 수·분할 비율 조정도 금지한다.

## 5. 실행 및 검증 경계

`reviewSyntheticPartitionLineageFR312G5`는 **시험용 합성 fixture만** 검토하는 순수 진단 함수다. 중복된 participant의 상이한 partition, session/capture/image의 타인 간 공유, 동결 누락, 철회 participant 잔존, 필수 lineage 누락을 판정한다. 이 함수는 실제 participant 배정, 이미지 접근, DB 변경, collection admission, 개인 식별을 수행하지 않는다.

### 미발행 상태

| 구분 | 상태 |
|---|---|
| FR312G2 retention/privacy | 발행 |
| FR312G3 consent/withdrawal | 발행 |
| FR312G4 participant-count sizing **방법** | 정의 |
| FR312G5 partition allocation **방법** | 정의 |
| Numeric participant count / development effective N | null |
| Numeric partition counts / ratios | null |
| Allocator algorithm / seed / manifest / audit | null |
| Demographic quota | null |
| Actual participant recruitment / collection | false |
| FR312G neutral reliability execution | false |
| Calibration/holdout access | false |
| FR312H morphology equivalence | false |
| Traditional binding / semantic validation / production interpretation | false |

## 6. 종료 조건

**A.** FR312F·FR312G·FR312G3·FR312G4 계약 정합성과 split hierarchy가 보장된다.

**B.** Synthetic leakage cases 및 numeric authorization, runtime, future downstream authority의 부당 확장을 회귀 테스트로 차단한다.

**C.** 표준 CI·Face Reading CI·Integration CI 통과 후 전용 변경 3개 파일만 squash merge한다.

## 7. 다음 검토

FR312G4에서 요구한 **근거 기반 participant-count numeric decision**과 FR312G5의 **partition allocation numeric decision**은 여전히 별도의 승인 게이트를 필요로 한다. 따라서 다음 단계는 G4/G5를 토대로 **evidence-backed numeric sizing/partition governance review**를 마련하는 것이다. 이 검토에서도 자료가 없다면 수치를 발행하지 않는다.

법적 개인정보 적합성, 연구윤리 심사 승인, empirical admission, 실제 모집·수집 실행, 모델 성능 및 전통 해석의 타당성은 이 문서만으로 확정되지 않는다.

Watchtower-Track: face-research
