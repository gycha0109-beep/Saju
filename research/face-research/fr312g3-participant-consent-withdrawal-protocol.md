# FR312G3 — Participant Consent & Withdrawal Protocol

## 1. 목적

FR312G neutral metric reliability study의 participant consent와 withdrawal 처리를 전용 protocol로 고정한다.

FR312G2는 image retention/privacy lifecycle을 정의했다. FR312G3는 participant가 무엇에 동의하는지, consent receipt가 무엇을 의미하는지, withdrawal 이후 participant-linked artifact를 어떻게 처리하는지 정의한다.

이 protocol을 발행해도 실제 participant collection은 승인되지 않는다.

## 2. upstream binding

- FR312G neutral metric reliability study
- FR312G2 dedicated retention/privacy policy
- review-image maximum retention: `30 days`

## 3. study notice

연구 목적은 visible neutral morphology metric의 repeatability, missingness, capture sensitivity 평가다.

포함하지 않는 것:

- traditional semantic claim validation
- automatic traditional binding
- production personalization
- identity recognition

participant collection에는 별도 empirical admission이 계속 필요하다.

## 4. required consent items

모든 항목은 개별적으로 명시적 확인이 필요하다.

1. study notice read
2. voluntary participation confirmed
3. face capture consent
4. transient raw capture processing consent
5. sanitized review-image retention consent
6. pseudonymous morphology annotation storage consent
7. pseudonymous neutral metric storage consent
8. no training reuse acknowledgement
9. no production/product-personalization reuse acknowledgement
10. no biometric identity matching acknowledgement
11. withdrawal procedure acknowledgement

## 5. consent receipt

consent receipt는 protocol-local pseudonymous participant ref에 binding한다.

measurement dataset에 저장하지 않는 것:

- real name
- email
- signature image
- face embedding
- identity template

withdrawal handle은 직접 신원정보를 encode하면 안 된다. handle을 분실해도 withdrawal 경로가 사라지면 안 되며, governed non-biometric verification 대체 경로를 둘 수 있다.

`consent receipt exists != collection authorized`

consent receipt는 legal consent sufficiency, empirical admission, collection execution authority를 자동 발행하지 않는다.

## 6. withdrawal request

유효한 withdrawal request는 study participant에 binding되어야 한다.

허용:

- study-issued withdrawal handle
- equivalent protocol-local study credential
- governed non-biometric verification path

금지:

- biometric face matching을 withdrawal identification에 사용
- identity template 생성

withdrawal timestamp와 audit event를 기록한다.

## 7. withdrawal 즉시 효과

- future capture 중지
- new primary annotation 중지
- new adjudication 중지
- retained raw image 삭제
- retained sanitized review image 삭제

FR312G2 deletion evidence 규칙을 따른다.

## 8. participant-linked record disposition

withdrawal 이후 participant와 연결 가능한 row는 future analysis에서 제거한다.

삭제·retirement 대상:

- participant-linked morphology annotation
- participant-linked adjudication record
- participant-linked neutral metric
- participant partition assignment
- participant-study linkage

withdrawal participant의 participant-level record는 이후 FR312G 분석에 다시 포함하지 않는다.

## 9. aggregate without participant-level linkage boundary

- participant-linked rows는 제거한다.
- participant-level linkage가 없는 aggregate는 남을 수 있다.
- aggregate를 participant 재식별에 사용하지 않는다.
- aggregate에서 participant-level linkage를 재생성하지 않는다.
- deidentification sufficiency를 이 protocol이 확정하지 않는다.
- aggregate 보존에 대한 포괄적 legal right를 이 protocol이 주장하지 않는다.
- later governance가 더 엄격한 disposition을 요구할 수 있다.

## 10. blocker resolution

해결:

- dedicated retention/privacy policy = true
- dedicated consent/withdrawal protocol = true

여전히 미해결:

- participant-count rationale
- partition-allocation rationale
- empirical collection runtime
- empirical collection admission
- actual participant collection
- FR312G reliability execution
- FR312H entry

## 11. authority boundary

FR312G3는 다음 권한을 발행하지 않는다.

- participant collection
- sample size
- partition allocation
- reliability execution
- morphology equivalence
- threshold discovery
- traditional semantic validation
- automatic traditional binding
- production/product authority
- legal consent sufficiency

## 12. 다음 단계

participant count와 partition allocation의 근거를 별도 단계에서 고정한다.

근거 없는 임의 participant count 또는 임의 partition ratio는 만들지 않는다.
