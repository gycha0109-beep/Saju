# FR312G2 — Dedicated Retention & Privacy Policy

## 1. 목적

FR312G neutral metric reliability study에 사용할 얼굴 연구 artifact의 보존·삭제·접근·identity 경계를 전용 policy로 고정한다.

FR312G1에서 확인한 것처럼 FR239 / FR240 / FR241은 구조적 선례로만 사용할 수 있고 그 authority를 FR312G에 직접 승계할 수 없다.

FR312G2는 FR312G에 직접 binding된 retention/privacy policy다.

이 policy를 발행해도 실제 participant collection은 시작되지 않는다.

---

## 2. dedicated binding

FR312G2는 다음에 직접 연결한다.

- FR312G protocol
- FR312G1 collection-prerequisite reuse review
- dedicated artifact key:
  - `fr312g_retention_and_privacy_policy`

기존 FR238 runtime authority는 상속하지 않는다.

---

## 3. retention 숫자 결정

### 결정

sanitized review image의 최대 보존 기간:

```text
30 calendar days
```

### 중요한 구분

FR239에도 30일 선례가 존재하지만:

```text
FR239 = 30 days
therefore
FR312G2 = 30 days
```

로 자동 상속한 것이 아니다.

FR312G2의 30일은 별도 dedicated operational decision이다.

근거:

- review image는 annotation / adjudication / metric audit를 위한 단기 연구 artifact다.
- 장기 보존이 연구 질문에 필요하지 않다.
- 최대치보다 먼저 annotation/adjudication/audit가 끝나면 즉시 조기 삭제한다.
- finite upper bound를 발행해 FR312F의 unbounded-retention blocker를 제거한다.
- 기존 저장소에서 30일이 short-lived review artifact 운영 선례로 존재하므로 실행 가능성 precedent로만 참고한다.

이 결정은:

- 법적 적합성 확정
- 연구 표본 충분성
- empirical reliability cutoff

를 의미하지 않는다.

---

## 4. raw capture lifecycle

원본 카메라 capture는:

```text
ephemeral processing only
```

이다.

raw original은 research dataset에 영구 편입하지 않는다.

흐름:

```text
fresh capture
→ capture admission processing
→ embedded metadata sanitization
→ same-capture sanitized review artifact 생성
→ raw original 삭제
```

sanitized review artifact가 동일 capture에서 만들어졌다는 binding은 유지해야 한다.

raw original:

- training reuse 금지
- production reuse 금지
- dataset raw-original persistence 금지

---

## 5. sanitized review artifact

artifact class:

`sanitized_morphology_research_review_image`

이 이미지는 얼굴을 포함하므로 잠재적으로 식별 가능할 수 있음을 명시한다.

요구사항:

- embedded metadata sanitization
- max retention 30 days
- annotation/adjudication/metric audit 완료 시 30일 이전이라도 삭제
- unbounded retention 금지
- default retention extension 금지
- raw provider response 미포함
- raw landmark dump 미포함
- metric value를 image artifact에 embed하지 않음
- traditional semantic tail을 image artifact에 embed하지 않음

금지:

- model training reuse
- production reuse
- product personalization reuse

---

## 6. access policy

이미지 접근 허용:

- assigned research operator
- assigned primary annotator
- assigned adjudicator
- assigned auditor

단, 접근 목적은 해당 research task에 묶여야 한다.

접근 금지:

- general product user
- unrelated product runtime
- public access

---

## 7. identity boundary

측정 데이터셋의 participant 식별자는 protocol-local pseudonymous reference다.

FR312G2는 다음을 금지한다.

- biometric identity matching
- face embedding
- identity template
- identity inference
- real-name requirement

participant grouping은 study bookkeeping이며 biometric identity inference가 아니다.

---

## 8. deletion evidence

이미지 삭제는 단순한 암묵적 처리로 끝내지 않는다.

deletion event에 필요한 것:

- participant ref
- artifact ref
- deletion reason
- deletion timestamp

deletion evidence에 들어가면 안 되는 것:

- raw image bytes
- deleted image를 복원할 수 있는 데이터

즉:

```text
deletion proof
!=
deleted image copy
```

이다.

---

## 9. withdrawal interaction

유효한 withdrawal이 들어오면 FR312G2가 담당하는 image lifecycle에서는:

- future capture 중지
- 새로운 annotation 작업 중지
- retained review image 삭제
- 남아 있는 raw original 삭제

를 요구한다.

그러나 participant-level:

- metric
- morphology annotation
- adjudication record

의 withdrawal 시 disposition은 FR312G2가 임의 결정하지 않는다.

이 항목은 다음 dedicated consent/withdrawal protocol에서 고정한다.

따라서:

`consentWithdrawalProtocolStillRequired = true`

이다.

---

## 10. blocker resolution

FR312G2가 해결하는 것은 정확히 하나다.

```text
dedicated FR312G retention/privacy policy
false → true
```

여전히 unresolved:

- dedicated consent/withdrawal protocol
- participant-count rationale
- partition-allocation rationale
- empirical collection runtime
- empirical collection admission
- actual participant collection
- FR312G reliability execution
- FR312H entry

---

## 11. authority boundary

FR312G2가 승인하지 않는 것:

- participant collection
- reliability execution
- consent/legal sufficiency
- comprehensive legal compliance
- morphology equivalence
- threshold discovery
- traditional semantic validation
- automatic traditional binding
- population norm
- product interpretation

---

## 12. 다음 단계

다음 prerequisite:

**FR312G3 — participant consent & withdrawal protocol**

FR312G3에서는 최소 다음을 고정해야 한다.

- study notice
- voluntary participation
- face capture consent
- sanitized review-image retention consent
- pseudonymous metric/annotation storage consent
- no training/product reuse acknowledgement
- withdrawal initiation
- participant-level image / annotation / metric disposition
- consent receipt/audit
- collection authority와 consent receipt의 분리

FR312G3 완료 후에도 participant count, partition allocation, runtime/admission이 남아 있으므로 실제 collection은 계속 금지한다.
