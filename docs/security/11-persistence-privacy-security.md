# 11. Persistence / Privacy / Security

## 1. 목적

명화가 생년월일시, 출생지, 성별, 사주 계산 결과, 해석 결과, LLM 실행 기록을 다룰 때 **재현성에 필요한 데이터와 개인정보를 분리**하고, 제품 형태가 웹/프로그램/운영자 도구 중 무엇이 되더라도 적용 가능한 저장·보안 원칙을 정의한다.

이 문서는 특정 국가의 법률 준수 판정을 선언하지 않는다.

실제 서비스 국가, 결제/회원 구조, 운영 방식이 확정되면 별도의 법적/정책 검토가 필요하다.

---

## 2. 핵심 원칙

```text
Data Minimization
Purpose Separation
Identity Separation
Immutable Audit Where Needed
Explicit Retention
Least Privilege
No Sensitive Data in Logs by Default
Reproducibility Without Over-Collection
```

---

## 3. 데이터 영역 분리

명화의 저장 데이터는 최소 다음 영역으로 분리한다.

```text
A. Identity Data
B. Birth Input Data
C. Calculation / Canonical Data
D. Interpretation / Rule Audit Data
E. Narrative Data
F. Delivery / Product Data
G. Operational Logs
H. Research / Evaluation Fixtures
```

각 영역의 보존 목적과 기간을 독립적으로 결정한다.

---

## 4. Identity Data

제품이 회원 기능을 사용한다면 Identity와 사주 Domain 데이터를 직접 한 테이블에 섞지 않는다.

```ts
interface UserIdentity {
  userId: string;
  email?: string;
  phone?: string;
  displayName?: string;
}
```

Domain 쪽에서는 가능한 한:

```text
subjectId
```

만 참조한다.

### 목적

DB dump, debug query, analytics export에서 개인 식별정보와 생년월일 데이터가 불필요하게 함께 노출되는 범위를 줄인다.

---

## 5. BirthProfile

```ts
interface BirthProfile {
  birthProfileId: string;
  subjectId?: string;

  calendarType: 'solar' | 'lunar';
  birthDate: string;

  birthTime?: string;
  birthTimeKnown: boolean;

  isLeapMonth?: boolean;
  gender?: string;

  birthplace?: {
    displayName?: string;
    countryCode?: string;
    latitude?: number;
    longitude?: number;
    timezone?: string;
  };

  createdAt: string;
  updatedAt: string;
}
```

### 원칙

- 실명이 없어도 BirthProfile 생성 가능하도록 한다.
- 정확한 주소 전체를 저장할 필요가 없다면 저장하지 않는다.
- 계산에 경도만 필요하면 원 주소와 경도를 분리할 수 있다.
- 출생지 geocoding을 외부 서비스로 수행할 경우 별도 데이터 전송 검토가 필요하다.

---

## 6. Birth Input과 Canonical Snapshot 분리

원 입력과 계산 결과는 분리한다.

```text
BirthProfile
   ↓
CalculationRun
   ↓
CanonicalSajuSnapshot
```

왜냐하면:

- 입력 수정 이력을 보존할 수 있음
- 정책/엔진 version별 재계산 가능
- 과거 Reading 재현 가능
- Canonical Snapshot을 직접 수정하는 잘못된 workflow 방지

---

## 7. CalculationRun

```ts
interface CalculationRunRecord {
  calculationRunId: string;
  birthProfileId: string;

  calculationPolicyRef: VersionedRef;
  adapterRef: VersionedRef;
  engineDependencyRef: VersionedRef;

  inputHash: string;
  outputSnapshotId: string;

  status: 'completed' | 'ambiguous' | 'failed';
  createdAt: string;
}
```

원 birth input이 변경되면 기존 Snapshot을 덮어쓰지 않는다.

새 CalculationRun을 생성한다.

---

## 8. Canonical Snapshot 저장

Canonical Snapshot은 결과 재현을 위해 immutable에 가깝게 취급한다.

수정 대신:

```text
new snapshot
```

을 생성한다.

오류가 확인된 Snapshot은:

```text
invalidated / superseded
```

상태를 붙일 수 있지만 과거 Reading audit를 위해 존재 자체를 지우지 않을 수 있다.

단, 사용자가 개인정보 삭제를 요청하는 product policy가 적용되는 경우 audit 보존과 삭제 요구의 충돌을 별도로 설계해야 한다.

---

## 9. Rule / Methodology 데이터

다음은 개인정보가 아니다.

```text
SourceReference
MethodologyDefinition
RuleDefinition
InterpretationPack
ClaimTypeDefinition
NarrativePolicy
```

이 데이터는 repo/version control과 runtime registry 양쪽에서 관리 가능하다.

### 권장

초기에는 Rule source of truth를 Git repository로 두고, production registry는 build artifact 또는 migration을 통해 생성하는 방식을 우선 검토한다.

DB에서 운영자가 직접 조건을 즉시 수정하는 방식은 audit/review를 어렵게 만든다.

---

## 10. InterpretationRun 저장

```text
InterpretationRun
RuleEvaluation
InterpretationClaim
ClaimRelation
```

은 Reading 재현에 핵심이다.

하지만 모든 `observedValue`를 로그성 데이터로 중복 저장할 필요는 없다.

Canonical Snapshot reference와 필요한 evaluation trace만으로 충분한지 구현 단계에서 최적화한다.

---

## 11. NarrativeRun 저장

LLM 감사에 필요한 메타데이터:

```text
model provider/id
prompt compiler version
narrative policy version
evidence bundle hash
output schema version
validation status
repair/fallback status
```

### 기본적으로 저장하지 않도록 검토할 항목

- provider request 전체 raw payload
- provider response의 내부 reasoning
- 불필요한 system prompt 복제
- 전체 사용자 프로필

재현성과 개인정보 최소화를 균형 있게 설계한다.

---

## 12. Prompt / LLM Logging

운영 로그에 다음이 그대로 남지 않게 한다.

```text
생년월일시
출생지
실명
질문 전체
Reading 전체
```

필요하면:

```text
requestId
runId
status
latency
modelId
errorCode
```

중심으로 기록한다.

Debug 환경에서 payload logging을 활성화할 경우 명시적 개발 설정으로 제한한다.

---

## 13. Operational Log Redaction

예:

### 나쁜 로그

```text
Failed calculation for 홍길동 1984-06-15 09:00 Seoul
```

### 권장

```text
calculation_failed
requestId=REQ-...
calculationRunId=CALC-...
errorCode=INVALID_BOUNDARY_STATE
```

사용자 입력 값이 반드시 필요한 장애 분석은 별도 privileged audit 접근으로 처리한다.

---

## 14. Encryption Boundary

제품 형태가 서버 기반이면 최소 다음을 구분한다.

```text
in transit
at rest
backup
secret storage
```

### 원칙

- network 전송 시 TLS 계층 사용
- 데이터베이스/디스크 암호화 기능 사용 검토
- application secret을 source code/repository에 저장하지 않음
- backup도 production data와 동일한 민감도로 취급

특정 클라우드/제품 기술은 deployment 결정 이후 확정한다.

---

## 15. Secret Management

금지:

```text
OPENAI_API_KEY를 repo에 commit
DB password를 README에 저장
운영자 계정 비밀번호를 코드 상수로 저장
```

사용:

```text
environment / secret manager / deployment secret
```

으로 분리한다.

---

## 16. Access Control

최종 제품에서 역할이 필요하다면 최소:

```text
consumer
operator
admin
```

을 구분할 수 있다.

### Consumer

자신에게 허용된 Reading 접근.

### Operator

업무상 필요한 Reading 생성/조회.

### Admin

시스템 설정 및 운영 관리.

### 원칙

Operator가 RuleDefinition을 임의 편집하는 권한과 사용자 Reading을 조회하는 권한은 동일한 권한으로 묶지 않는다.

---

## 17. Operator Privacy

아버지가 직접 운영하는 모델이 되더라도 operator UI는 최소 필요한 데이터만 보여준다.

예:

```text
고객명 대신 주문/Reading 번호로 처리 가능
```

한 사용자의 사주 결과를 다른 사용자에게 잘못 전달하는 사고를 막기 위해 Reading/subject binding을 명확히 한다.

---

## 18. Authorization Invariants

최소 불변 조건:

```text
1. Reading은 정확히 하나의 subject scope에 속한다.
2. 사용자는 다른 subject의 Reading을 ID 추측으로 조회할 수 없다.
3. export/download도 동일 authorization을 적용한다.
4. operator action은 audit 가능해야 한다.
5. deleted/revoked subject에 새 Reading을 임의 생성하지 않는다.
```

---

## 19. AuditEvent

운영자/관리자 actions는 선택적으로 audit한다.

```ts
interface AuditEvent {
  auditEventId: string;
  actorType: 'user' | 'operator' | 'admin' | 'system';
  actorId?: string;

  action: string;
  resourceType: string;
  resourceId: string;

  result: 'success' | 'failure';
  occurredAt: string;
}
```

민감한 before/after payload 전체를 audit log에 복제하지 않는다.

---

## 20. Retention Policy

모든 데이터를 영구 보관하지 않는다.

데이터 클래스별 정책을 둔다.

```ts
interface RetentionPolicy {
  policyId: string;
  version: string;

  classes: Array<{
    dataClass: string;
    retentionMode:
      | 'session_only'
      | 'until_delivery'
      | 'account_lifetime'
      | 'fixed_period'
      | 'indefinite_registry';
    periodDays?: number;
  }>;
}
```

### 예시 후보

Rule Registry는 장기 보존이 필요하지만, anonymous one-time Reading의 raw BirthProfile은 전달 후 삭제하는 상품 모델도 가능하다.

최종 정책은 제품 형태 확정 후 결정한다.

---

## 21. Anonymous / One-time Mode

템플릿/PDF 판매 또는 비회원 웹 형태라면 account 없는 Reading도 고려할 수 있다.

```text
Anonymous Request
  -> temporary BirthProfile
  -> Reading
  -> delivery
  -> retention policy에 따라 삭제
```

회원가입이 Core architecture의 필수 조건이 아니다.

---

## 22. Deletion Architecture

삭제는 단순 `users` row 하나를 지우는 것으로 끝나지 않는다.

dependency map 필요:

```text
Identity
  ↓
BirthProfile
  ↓
CalculationRuns / Snapshots
  ↓
InterpretationRuns / Claims
  ↓
NarrativeRuns / Readings / Exports
```

개인 데이터 삭제 시 어떤 audit metadata를 비식별 상태로 보존할지 별도 정책을 둔다.

---

## 23. Pseudonymization

analytics/reliability 데이터는 가능한 경우:

```text
userId 제거
subjectId 비가역/임시 identifier 사용
정확한 birth datetime 제거/범주화
```

등을 적용한다.

사주 데이터 자체는 출생정보와 강하게 연결되므로 단순 ID 제거만으로 완전한 익명화를 가정하지 않는다.

---

## 24. Analytics Separation

제품 analytics에 전체 사주 데이터를 보내지 않는다.

예:

### 허용 후보

```text
reading_generated
unknown_time_used
ambiguity_displayed
explainability_opened
export_completed
```

### 기본 제외 후보

```text
exact_birth_date
exact_birth_time
full_chart
full_reading_text
user_question_text
```

필요성이 생기면 별도 privacy review 후 추가한다.

---

## 25. Research Dataset Separation

실사용자 Reading을 자동으로 Rule 연구 dataset으로 승격하지 않는다.

```text
Production Data
!= Research Fixture
```

명시적인 수집 목적과 처리 정책 없이 사용자 데이터를 golden fixture로 복제하지 않는다.

초기 Rule/Regression fixture는 synthetic 또는 공개/검증 가능한 사례 중심으로 구축한다.

---

## 26. Backups

Backup은 삭제/retention 설계에서 빠지기 쉽다.

최종 deployment에서 반드시 정의할 것:

```text
backup frequency
backup encryption
backup access role
backup retention
restore test
expired data propagation
```

백업이 영구 개인정보 보관 우회 수단이 되지 않도록 한다.

---

## 27. Export Security

PDF/파일 export는 DB보다 더 쉽게 외부로 유출될 수 있다.

### 고려

- 파일명에 생년월일 전체 포함 금지 기본값
- public URL 무기한 노출 금지
- signed/expiring download 방식 검토
- operator PC download 흔적 정책
- 재다운로드 authorization

예:

```text
명화_19840615_홍길동.pdf
```

같은 파일명은 기본값으로 피한다.

---

## 28. Cache Privacy

Cache key에 raw birth input을 문자열로 그대로 넣지 않는다.

권장:

```text
canonical hash / opaque run ID
```

Cache dump에서도 생년월일이 쉽게 노출되지 않게 한다.

---

## 29. Error Handling

사용자에게 내부 stack trace, DB query, source path를 노출하지 않는다.

```text
public error code
internal correlation id
```

를 분리한다.

예:

```text
사용자: "현재 입력으로 계산을 완료하지 못했습니다."
내부: CALC_SOLAR_TERM_RANGE_ERROR / REQ-...
```

---

## 30. Dependency Security

외부 라이브러리는 version pinning과 upgrade gate를 둔다.

특히 Calculation authority에 영향을 주는 dependency는:

```text
new version
 -> changelog/source audit
 -> golden fixture
 -> boundary regression
 -> diff review
 -> explicit upgrade
```

절차를 따른다.

자동 major upgrade 후 production 계산값이 바뀌게 두지 않는다.

---

## 31. Rule Supply Chain

Rule Registry 역시 supply chain으로 본다.

금지:

```text
운영 중 외부 URL에서 최신 rule JSON 자동 다운로드
LLM이 생성한 rule 즉시 production 등록
관리자 UI에서 review 없이 production rule 수정
```

권장:

```text
source research
 -> rule definition
 -> review
 -> tests
 -> versioned registry snapshot
 -> production pack release
```

---

## 32. Environment Separation

최소 개념적 환경:

```text
development
staging
production
```

Production 사용자 데이터를 개발 convenience 때문에 local dev DB로 복제하지 않는다.

테스트는 synthetic fixture를 기본으로 한다.

---

## 33. Data Model 후보

```text
identity/
  UserIdentity

subject/
  Subject
  BirthProfile

calculation/
  CalculationRun
  CanonicalSajuSnapshot

interpretation/
  InterpretationRun
  RuleEvaluation
  InterpretationClaim
  ClaimRelation

narrative/
  NarrativeRun
  NarrativeDraft

reading/
  ReadingArtifact
  ExportArtifact

registry/
  SourceReference
  MethodologyDefinition
  RuleDefinition
  InterpretationPack
  NarrativePolicy

audit/
  AuditEvent
```

물리 DB schema는 기술 스택 결정 후 설계한다.

---

## 34. Stateless Engine 가능성

명화 Core 자체는 가능한 한 pure/functional 경계를 유지해 DB 없이도 실행할 수 있게 한다.

```text
input
 + versioned configs
 -> output
```

Persistence는 orchestration/application layer가 담당한다.

이렇게 하면:

- 웹 서버
- 데스크톱 프로그램
- CLI/batch
- 테스트 runner

에서 동일 Core를 재사용하기 쉽다.

---

## 35. Local-only Program 옵션

향후 설치형 프로그램이 선택될 경우:

```text
Birth Data local storage
Core local execution
LLM remote or local 선택
```

같은 구조도 가능하다.

따라서 Core가 cloud DB에 강하게 결합되지 않게 한다.

단, remote LLM을 쓰면 해당 evidence가 외부 provider로 전송될 수 있으므로 별도 policy가 필요하다.

---

## 36. Security Verification 후보

구현 이후 최소:

```text
unit tests
schema validation
access-control tests
IDOR tests
export authorization tests
log redaction tests
secret scanning
repository dependency scanning
backup restore test
```

을 단계적으로 추가한다.

---

## 37. 법적/정책 검토 Trigger

다음이 결정되면 별도 최신 법률/정책 검토를 수행한다.

```text
서비스 국가
회원가입 여부
유료 결제 여부
미성년자 허용 여부
광고/마케팅 수집 여부
제3자 analytics
LLM provider로 보내는 데이터 범위
데이터 보존 기간
해외 서버 사용 여부
```

현재 문서는 compliance 인증이 아니라 architecture baseline이다.

---

## 38. S11 결정 요약

명화는 재현성을 위해 데이터를 저장할 수 있지만, 재현성을 이유로 모든 개인정보를 영구 보관하지 않는다.

핵심 구조:

```text
Identity
   │   (separate)
   ▼
BirthProfile
   ↓
Versioned Runs / Snapshots
   ↓
ReadingArtifact
```

그리고:

```text
Rule / Methodology Registry
```

는 사용자 개인정보와 별도 lifecycle로 관리한다.

Core 엔진은 가능한 한 stateless하게 설계하고, 저장/회원/운영자 기능은 외부 application layer로 분리한다.
