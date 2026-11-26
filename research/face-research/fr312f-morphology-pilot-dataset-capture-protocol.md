# FR312F — Morphology Pilot Dataset & Capture Protocol Design

## 1. 목적

FR312E에서 고정한 morphology-only annotation specification을 실제 연구에 사용할 수 있도록 데이터셋 단위, 반복 촬영 구조, partition, annotation assignment, metric timing, privacy prerequisite를 설계한다.

FR312F는 **실제 데이터 수집이나 threshold 탐색을 시작하는 단계가 아니다.**

이번 단계의 질문은 다음이다.

> 형태 annotation과 neutral metric 연구를 나중에 수행할 때, 어떤 단위와 순서로 데이터를 생성·분리·가려야 circular validation과 leakage를 피할 수 있는가?

---

## 2. upstream authority

FR312F는 다음을 변경하지 않고 소비한다.

### FR312D

- morphology-only pilot candidate rule: 10
- required partition names:
  - development
  - calibration
  - holdout

### FR312E

- source rule: 10
- source morphology clause: 11
- canonical morphology predicate: 10
- annotation label:
  - present
  - absent
  - indeterminate
  - not_observable
- morphology / semantic separation
- annotator metric/semantic blind contract
- qualitative capture validity

FR312D 또는 FR312E가 바뀌면 FR312F test도 실패하도록 regression 연결한다.

---

## 3. 저장소 선례 재검토

FR312F 설계 전 다음 기존 face-reading 연구 프로토콜을 재검토했다.

### FR159

prospective repeatability protocol에서:

- fresh prospective capture
- same-participant repeated capture series
- 기존 development capture 재사용 금지
- acceptance threshold 사전 미설정
- descriptive analysis와 empirical validation 분리

를 사용한다.

### FR188

repeat-capture dataset split protocol에서:

- participant-level split
- capture-family leakage 금지
- holdout을 threshold selection에 사용 금지
- metric/label 관찰 전 partition freeze

를 사용한다.

### FR237

repeatability preregistration에서:

- 2 sessions per participant
- 2 accepted captures per session
- temporally separated sessions
- quality decision before metric inspection
- finite retention prerequisite
- 실제 collection authorization 별도

를 사용한다.

FR312F는 위 선례의 **연구 설계 구조**만 재사용한다.

기존 phase의 numeric threshold, 대상-specific metric, semantic authority는 가져오지 않는다.

---

## 4. 연구 단위 계층

FR312F는 아래 계층을 고정한다.

```text
participant
  └─ capture session
       └─ fresh capture attempt
            └─ admitted image
                 ├─ morphology annotation tasks
                 └─ neutral metric records
```

### participant

protocol-local pseudonymous participant ref만 사용한다.

측정 데이터셋에 직접 신원정보가 필요하지 않다.

### capture session

한 participant의 독립적인 촬영 세션.

반복성 연구를 위해 같은 session 안의 연속 프레임만으로 repeatability를 대체하지 않는다.

### capture

한 session에서 발생한 fresh capture attempt.

### image

capture quality gate를 통과한 primary frame.

### annotation task

`single image × single canonical morphology predicate`

### neutral metric record

`single admitted image × single registered neutral comparator`

---

## 5. repeat-capture 구조

pilot의 최소 반복 구조는:

- participant당 2개의 서로 다른 session
- session당 accepted capture 2개
- participant당 accepted capture 목표 4개

로 둔다.

이 구조는 FR188/FR237의 저장소 선례를 따른다.

중요한 제한:

```text
2 sessions × 2 captures
!=
empirical sufficiency
```

이 값은 repeatability를 계산할 수 있는 최소 구조일 뿐이며:

- participant 수
- 충분한 statistical power
- population representativeness
- acceptance threshold

를 의미하지 않는다.

session 간 최소 시간 간격도 숫자로 승인하지 않는다.

단지 서로 다른 session이어야 한다는 구조만 고정한다.

---

## 6. capture admission

capture admission은 morphology label이나 metric 값을 보기 전에 결정해야 한다.

### admission에서 볼 수 있는 것

FR312E의 qualitative capture validity:

- frontal / near-frontal
- neutral resting expression
- mouth closed without deliberate pursing/compression
- target region fully visible
- adequate focus/resolution
- no shape-distorting filter

### admission에서 볼 수 없는 것

- morphology annotation label
- neutral metric value
- comparator calculation
- traditional semantic meaning
- future threshold candidate

따라서:

```text
capture quality decision
→ image admission
→ annotation / metric extraction
```

순서를 유지한다.

---

## 7. capture rejection

FR312E의 모든 not-observable reason을 그대로 수용한다.

추가 dataset-level rejection reason:

- multiple faces
- capture not fresh
- session / participant provenance missing

rejected capture는 primary dataset에 들어가지 않는다.

rejected capture 때문에 accepted target을 채우기 위한 재촬영은 허용할 수 있다.

하지만 accepted image가 충분히 확보된 뒤 더 많은 capture 중 유리한 것만 고르는 cherry-picking은 금지한다.

따라서 accepted target 도달 후 primary capture sequence는 종료한다.

---

## 8. annotation assignment

각 admitted image는 10개 canonical morphology predicate에 대해 annotation task를 가진다.

primary annotation은 task마다 **2개의 독립 판정**으로 설계한다.

두 annotator는 서로의 답을 보지 않는다.

primary annotator에게 보이지 않는 것:

- 다른 annotator 답
- neutral metric
- comparator calculation
- historical semantic consequence
- product result

두 primary label은 먼저 lock한다.

그 후 disagreement가 있으면 adjudication을 수행한다.

---

## 9. adjudication

adjudicator가 볼 수 있는 것:

- image
- morphology-only predicate/card
- lock된 두 primary annotation

adjudicator가 볼 수 없는 것:

- neutral metric
- comparator calculation
- traditional semantic tail
- future threshold

adjudicated label은 primary label을 덮어쓰지 않고 별도 field로 저장한다.

원래 disagreement history도 보존한다.

FR312F는:

- minimum agreement value
- Cohen's kappa cutoff
- adjudication acceptance score

를 정하지 않는다.

---

## 10. partition policy

partition은 participant 단위다.

```text
participant
→ exactly one of
development / calibration / holdout
```

동일 participant의:

- session
- capture family
- image

가 서로 다른 partition으로 분리되면 안 된다.

금지:

- participant leakage
- session leakage
- capture-family leakage
- image leakage

partition assignment는 다음을 보기 전에 freeze한다.

- morphology label
- neutral metric value

---

## 11. partition 역할

### development

향후:

- workflow/tooling 문제 발견
- protocol implementation debugging
- analysis code 개발

에 사용할 수 있다.

### calibration

향후 FR312H/FR312I에서 metric ↔ morphology relation 및 threshold candidate 연구에 사용할 수 있도록 예약한다.

FR312F 자체는 threshold를 만들지 않는다.

### holdout

analysis plan과 candidate threshold가 고정되기 전까지 sealed 상태다.

holdout을 보고:

- comparator 선택
- threshold 조정
- rule 수정
- participant 재배치

를 하면 안 된다.

---

## 12. partition ratio / participant count

FR312F에서는 숫자를 만들지 않는다.

현재:

- participant count = null
- partition ratio = null
- assignment algorithm = null
- demographic quota = null

이다.

이유는 현재 단계에서 다음이 없기 때문이다.

- expected prevalence basis
- variance basis
- desired confidence interval
- statistical power target
- attrition estimate
- reliability estimate
- recruitment feasibility evidence

근거 없이:

```text
N = 30
70/15/15
50:50 sex ratio
```

같은 값을 넣지 않는다.

---

## 13. neutral metric timing

등록 comparator는 현재:

- `mouth.philtrum_length_width`
- `mouth.width_and_relative_size`
- `mouth.corner_orientation`
- `mouth.visible_lip_fullness`

이다.

metric extraction은 admitted image에 대해서만 수행한다.

capture quality 판단 전에 metric을 계산하고 그 값으로 admission 여부를 정하면 안 된다.

primary annotation은 metric과 독립이어야 하므로 권장 순서는:

```text
capture admission
→ primary morphology annotations lock
→ neutral metric extraction
→ later governed analysis
```

이다.

metric을 먼저 계산하더라도 annotator에게 노출하지 않는 것만으로 이론상 blind를 유지할 수 있지만, FR312F는 운영상 leakage 위험을 줄이기 위해 **primary annotation lock 이후 extraction**을 기본 timing으로 고정한다.

---

## 14. privacy prerequisite

실제 얼굴 이미지 수집 전에 최소 다음이 별도 승인되어야 한다.

- pseudonymous participant reference
- finite image retention policy
- consent procedure
- withdrawal procedure

현재는:

- finite retention 기간 미정
- consent/withdrawal procedure 미발행
- participant collection 미승인

상태다.

또한 FR312F는 identity matching이나 identity template을 요구하거나 승인하지 않는다.

동일 participant grouping은 protocol-level collection bookkeeping이며, 별도 identity inference authority가 아니다.

---

## 15. FR312F에서 승인하지 않는 것

다음은 전부 0/false 상태를 유지한다.

- actual participant recruitment
- actual image collection
- actual annotation collection
- actual metric collection
- empirical execution
- semantic claim validation
- threshold discovery
- threshold value
- participant count
- partition ratio
- demographic quota
- population norm
- minimum acceptance value
- automatic traditional binding
- score / rank
- product interpretation
- prohibited person-level inference

---

## 16. 다음 단계와 중요한 정정

기존 roadmap은:

```text
FR312F
→ FR312G neutral metric reliability
→ FR312H morphology equivalence
→ FR312I threshold candidate
```

다.

다만 FR312F 자체가 **실제 collection을 승인하지 않으므로**, FR312G 실행 전에 다음 collection prerequisite가 먼저 충족되어야 한다.

- finite retention
- consent / withdrawal
- participant count rationale
- partition allocation rationale
- 실제 capture runtime
- collection authorization

즉 FR312F 완료 후 곧바로 participant data를 수집하는 것이 아니다.

FR312G는 neutral metric reliability study의 분석 설계/실행 단계이며, 필요한 collection authority가 별도로 충족되어야 한다.

---

## 17. 종료 조건

FR312F 완료 조건:

- FR312D partition contract와 regression 연결
- FR312E canonical predicate 10/10 regression 연결
- participant → session → capture → image → annotation / metric 계층 고정
- repeat-capture minimum structure 고정
- capture-quality decision이 morphology/metric과 독립
- dual independent annotation + adjudication 구조 고정
- development/calibration/holdout participant-level split
- participant/session/capture-family/image leakage 0
- holdout sealed
- primary annotation lock 전 metric-label association 금지
- finite retention / consent prerequisite 명시
- participant count / partition ratio / quota / acceptance cutoff 미발명
- empirical execution 0
- automatic traditional binding 0
- standard CI + Face Reading CI + Integration CI PASS 후 squash merge
