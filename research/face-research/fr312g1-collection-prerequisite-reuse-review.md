# FR312G1 — Collection Prerequisite Reuse Review

## 1. 목적

FR312G neutral metric reliability study를 실제 실행하기 전에 필요한 collection prerequisite를 기존 face-reading 연구 자산에서 그대로 재사용할 수 있는지 검토한다.

검토 대상:

- FR239 retention/privacy policy
- FR240 participant consent + one-person dry-run admission
- FR241 one-person dry-run runtime
- FR312F dataset/capture protocol
- FR312G neutral metric reliability study design

결론은 **template reuse는 가능하지만 authority reuse는 불가**다.

---

## 2. FR239

FR239는 다음 유용한 선례를 가진다.

- raw capture는 ephemeral processing
- finite review-image retention
- pseudonymous participant ref
- identity matching 금지
- training / production reuse 금지
- deletion evidence

그러나 FR239는 FR238 runtime lineage에 직접 binding되어 있다.

따라서 FR239를 FR312G에 그대로 연결해:

```text
FR239 exists
→ FR312G finite-retention authority satisfied
```

라고 할 수 없다.

또한 FR239의 30-day retention 값도 FR312G의 값으로 자동 상속하지 않는다.

FR312G1에서는:

`inheritedReviewImageRetentionDays = null`

을 유지한다.

30일은 precedent일 뿐이다.

---

## 3. FR240

FR240 consent contract에는 다음 좋은 template가 있다.

- study notice read
- voluntary participation
- live capture consent
- transient processing consent
- review-image retention consent
- pseudonymous metric storage consent
- no training reuse
- no production reuse
- no identity matching
- withdrawal procedure acknowledgment

그러나 scope는:

- maximum participants = 1
- partition = selection
- one-person dry run
- empirical evidence eligible = false
- confirmatory evidence eligible = false
- legal consent sufficiency established = false

다.

따라서 FR240 consent wording/structure는 template로 재사용 가능하지만 FR312G empirical pilot collection authority가 아니다.

---

## 4. FR241

FR241은 FR240 admission을 소비하는 one-person dry-run runtime이다.

따라서 runtime 구조/nonce/session/challenge 등의 구현 선례는 참고할 수 있지만:

```text
FR241 dry run
!=
FR312G empirical collection runtime
```

이다.

dry-run runtime을 empirical collection runtime으로 승격하지 않는다.

---

## 5. 재사용 가능한 원칙

다음 원칙은 dedicated FR312G artifact를 만들 때 재사용 가능하다.

- pseudonymous participant reference
- no identity matching / no identity template
- raw capture ephemeral processing preference
- finite review-artifact retention
- capture 전 explicit consent
- withdrawal procedure
- quality decision before metric inspection
- participant-level partition isolation

하지만 기존 artifact의 authority 또는 numeric value를 자동 상속하지 않는다.

---

## 6. FR312G 전용으로 필요한 artifact

현재 별도 발행이 필요한 항목:

1. FR312G retention/privacy policy
2. FR312G participant consent/withdrawal protocol
3. participant-count rationale
4. partition-allocation rationale
5. empirical collection runtime + admission gate

위 다섯 항목이 별도 authority로 닫히지 않으면 실제 reliability collection을 시작하지 않는다.

---

## 7. numeric boundary

현재 값:

- review-image retention days = null
- participant count = null
- partition ratios = null
- minimum reliability acceptance value = null

FR239의 30일, FR240의 1인 dry-run 같은 숫자를 FR312G에 복사하지 않는다.

---

## 8. blocker accounting

현재 모두 unresolved:

- dedicated retention/privacy policy
- dedicated consent/withdrawal protocol
- participant count rationale
- partition allocation rationale
- empirical collection runtime
- empirical collection admission
- actual participant collection
- FR312G reliability execution
- FR312H entry

따라서 FR312H morphology equivalence는 아직 시작할 수 없다.

---

## 9. authority boundary

FR312G1은 다음 권한을 만들지 않는다.

- 기존 retention authority 승격
- 기존 consent authority 승격
- 기존 dry-run runtime 승격
- participant collection
- reliability execution
- morphology equivalence
- threshold discovery
- automatic traditional binding
- product interpretation

---

## 10. 다음 작업

다음은 **FR312G 전용 precollection governance**다.

우선순위:

1. retention/privacy
2. consent/withdrawal
3. participant-count rationale
4. partition allocation rationale
5. empirical collection runtime/admission

이 단계도 실제 얼굴 데이터 수집과 분리해서 진행한다.
