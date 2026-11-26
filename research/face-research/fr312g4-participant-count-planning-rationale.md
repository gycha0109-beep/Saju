# FR312G4 — Participant-count Planning Rationale

## 1. 목적 및 종료 경계

FR312G neutral metric reliability study의 **참여자 단위 표본 수 산정 방법**을 사전에 고정한다. 이 단계는 연구 설계 근거(method rationale)를 발행하는 것이며, 특정 참여자 수를 발행하거나 데이터 수집을 허용하는 단계가 아니다.

- 전용 study: `fr312g.neutral_metric_reliability_study_design`
- 전용 consent/withdrawal: FR312G3
- 표본 수 산정 방법: **정의**
- 실제 목표 참여자 수: **null / 미승인**
- 표본 수의 정량적 충분성: **미검증**
- collection / execution / FR312H 권한: **없음**

## 2. 독립 통계 단위

**Participant가 독립 표본 단위**다. 동일 참가자의 session, fresh capture, admitted image, neutral metric axis는 서로 독립된 participant가 아니다.

FR312F의 반복 촬영 구조:

- 1 participant → 2 temporally distinct sessions
- 1 session → accepted captures target 2
- 1 participant → accepted captures target 4

이는 within-session 및 between-session 반복측정을 가능하게 하는 설계이지, 참여자 표본의 충분성이나 precision을 입증하지 않는다.

따라서 `4 captures × N participants`를 `4N independent participants`로 계산할 수 없다. 분석과 불확실성 평가는 participant-level clustering을 유지해야 한다.

## 3. 추정 대상과 분할 경계

FR312G의 4 neutral comparator families, 총 8 metric axes를 그대로 사용한다. 각 axis에서 필요한 기술적 대상은 다음과 같다.

- within-session absolute pair difference
- between-session absolute session-mean difference
- within-participant range
- missingness rate와 unavailable reasons

계획 대상은 FR312G **development** partition뿐이다.

- calibration partition: 향후 association research 용도로 보류
- holdout partition: 사전 분석계획 고정 전까지 밀봉
- morphology annotation label: sizing 근거 입력 불가
- traditional semantic tail: sizing 근거 입력 불가
- traditional equivalence, threshold search: 이 단계의 목표가 아님

FR312G4가 development participant 수를 정의한다고 해도 전체 recruitment count와 development/calibration/holdout 배분 수는 FR312G5에서 별도로 논증해야 한다.

## 4. Numeric approval에 필요한 근거

숫자는 다음 근거가 모두 마련되고 검토자가 사전 승인하기 전에는 `null`이다.

1. **Axis별 사전 등록 precision 목표:** 어떤 기술통계의 불확실성을 얼마까지 허용할지 연구 기준과 승인 근거를 분리해서 결정
2. **변동성과 가용성의 근거:** 명시적 authority가 있는 선행 자료, 별도 승인된 pilot, 또는 문헌 근거를 바탕으로 axis별 within/between variation, missingness 확보
3. **Participant-clustered 불확실성 계산:** 동일 참가자의 이미지/세션 상관을 반영한 confidence interval 또는 이에 준하는 계획의 재현 가능한 계산
4. **탈락·철회·unavailable 가정:** 승인된 수집 범위 안에서 분석 가능한 유효 참가자 수와 모집 인원의 차이 설명
5. **Development에서 필요한 유효 participant 수:** 8개 axis 중 가장 제약적인 충분성 요구를 근거와 함께 심의
6. **FR312G5 partition-allocation rationale:** development 목표와 calibration/holdout 분리 정책이 충돌하지 않도록 전체 참가자 단위 배분 검토
7. **Reviewer sign-off:** 사용한 자료·가정·계산 버전·승인자·결정 시점을 추적 가능한 decision record로 승인

권고 분석 절차는 participant resampling/clustered uncertainty를 사용해 반복측정 의존성을 보전하는 것이다. 단, bootstrap 반복 횟수, confidence level, 허용 precision 폭, 모집 인원, 배분 비율 등은 여기에서 임의로 정하지 않는다.

## 5. 누락·withdrawal 대응

- accepted capture가 4개라는 사실을 4개의 독립적 통계 사례로 취급하지 않는다.
- axis-specific missingness와 unavailable reasons를 별도로 기록한다.
- participant withdrawal은 FR312G3의 disposition을 우선 적용한다.
- 철회 후 제거된 자료를 과거의 목표 표본 수를 맞추기 위해 비공식 복원하지 않는다.
- missingness 보간, last observation carry forward, zero substitution으로 유효 표본 수를 부풀리지 않는다.
- selection/recruitment 중 morphology label 또는 metric value를 보고 post-hoc cherry-pick하지 않는다.
- holdout 결과를 본 후 목표 표본 수나 분할을 수정하지 않는다.

## 6. 권한 회계

| 계약 항목 | 현재 |
|---|---|
| 전용 retention/privacy (FR312G2) | 발행 |
| 전용 consent/withdrawal (FR312G3) | 정의 |
| Participant count 산정 방법 | 정의 |
| 정량적 participant-count rationale | 미발행 |
| Participant count / effective development N | null |
| Participant count authorization | false |
| Partition allocation rationale (FR312G5) | 미발행 |
| Calibration/holdout 열람 | 불가 |
| Empirical runtime/admission | 미발행 |
| Actual participant collection | 금지 |
| FR312G reliability execution | 금지 |
| FR312H morphology equivalence | 금지 |

### A. 방법 정의: 완료

독립 단위, 추정량, repeat-capture correlation, missingness, precision 및 uncertainty 검토의 필수 입력을 고정한다.

### B. 숫자 승인: 미완료

추정 변동성·가용성 자료, precision 목표, withdrawal 가정, partition allocation 및 reviewer sign-off가 없으므로 참여자 수나 quota를 발행하지 않는다. `participantCountRationaleMethodDefined=true`는 `participantCountAuthorized=true`를 뜻하지 않는다.

### C. 다음 작업

**FR312G5 — participant-level partition allocation rationale**를 먼저 정의하고, 실제 numeric sizing 결정을 별도 승인 절차로 묶는다. 그 뒤에야 empirical collection runtime/admission을 검토할 수 있다.

본 문서는 통계적 연구 운영 계획이다. 모집 허가, 수집·분석 실행 허가, 개인정보 법적 적합성, 모델 성능 및 전통 해석 타당성을 주장하지 않는다.
