# Myeonghwa Production Interpretation Authority Audit

Status: `PRODUCTION_RUNTIME_BLOCKED_BY_INTERPRETATION_AUTHORITY_GAPS`

Audit base:

```text
main = 063d68a897cccbcec0be61b60536a4a52ce45c95
production calculation authority = authorized
```

## 2026-11-13 현행 내부 상용 해석 기준 정정 (당시 감사 기록 보존)

> 이 문서의 아래 `main = 063d68a8` 감사와 `NO_BUILD` 판정은 **그 당시 저장소·의미 레지스트리에 대한 역사적 검사**다. 2026-11-13 제품 소유자는 [내부 상용 사주 해석 정책](43-internal-commercial-saju-interpretation-policy-20261113.md)을 별도 확정했다.

- **외부 고전·학술 원문·전문가 감수의 추가 확보만을 기다리는 규칙은 공식 해석의 필수 조건이 아니다.** 제품 소유자가 채택한 명하 내부 명리 풀이 규칙과 실제 계산/한국어 해석·기간·상대 결속을 직접 검증한다.
- **보존할 차단:** 내부 채택 의미의 미구현·원본 불일치·불완전한 문장 검증, 실제 운영 서명/Release·구매/동의/권한·Reader·환불/복구/배포의 보호 계약은 여전히 미충족시 중단한다. 이 문서를 수정했다고 이전의 BLOCKED 운영 설정이 자동 해제되지는 않는다.
- 실제 진행 중인 Saju [연·월운 #2762](https://github.com/gycha0109-beep/Saju/pull/2762) 및 [T10 #2763](https://github.com/gycha0109-beep/Saju/pull/2763)의 최신 HEAD/CI·해석 구현/사용자 읽기 결과를 별도로 판정한다. MyeongHa [#3174](https://github.com/gycha0109-beep/MyeongHa/pull/3174) 구매/보호 발급은 변경 없이 유지한다.
- **현재 이 문서의 갱신은 정책 정정이며 Production admission 결과가 아니다.** 과거 검사 코드/전문 서지/당시 결정에 손대지 않는다.

## Question

Can Myeonghwa compose a real minimum production interpretation registry from existing repository authority **without** promoting research content, inventing provenance, weakening the production gate, or introducing new Saju semantics?

## Decision

```text
NO_BUILD
```

No repository-backed real Saju interpretation registry currently satisfies the production authorization contract.

The blocker is content authority, not runtime plumbing.

## What exists

### Interpretation runtime infrastructure

`src/interpretation/*` provides the rule registry, evaluator, execution plan, claim graph, reviewer trust, provenance policy, and interpretation engine. These are execution/authorization mechanisms, not a product-domain rule pack.

### Research-domain assets

Concrete Saju methodology/rule assets are exposed from `src/research/*`.

Representative audited assets include:

```text
I7 seasonal-support pack
I13 strength evidence package
I14 strength evidence registry
interpretation methodology catalog
subsequent research authority/evidence stages
```

Their current authority metadata is intentionally research-grade. Representative states include:

```text
pack.status                 = research
rule.quality.reviewerStatus = unreviewed
rule.status                 = research
methodology quality/review  = research / research
source quality/review       = cross_reference / research
```

These assets may be valuable research evidence, but they are not production interpretation authority.

Existing HOLD/SUSPENDED/research dispositions remain unchanged. This audit does not reinterpret absence of production authority as evidence exhaustion, negative evidence, retirement, or rejection of the underlying Saju proposition.

### Synthetic production fixtures

Tests such as `production-interpretation-authorization.test.ts` and `promoted-empty-pack-trust.test.ts` intentionally construct synthetic production fixtures to verify gate behavior.

They are not deployable Saju authority because their purpose is infrastructure verification, including synthetic sources/rules or an empty pack.

Therefore:

```text
Gate can authorize a valid production package = PROVEN
A real Saju production package exists          = NOT PROVEN / NO
```

## Production authorization contract

For a real production rule, the existing gate requires the production pack and its active content to satisfy the established authorization policy. Material requirements include:

### Pack

```text
pack.status = production
```

### Rule

```text
qualityTier / reviewer status = domain reviewed
provenance                    = source traceable
fixture coverage              = fixture matrix
negative/boundary coverage    = complete
rule execution status         = production-eligible active content
```

### Methodology

```text
quality tier  = domain reviewed
review status = approved
```

### Sources

```text
quality tier      = primary supported
review status     = approved
provenance status = corroborated OR normative source
```

### Domain review trust

A production rule also requires a real domain-level `ReviewAttestation` and an active reviewer trust grant that pins the exact deterministic SHA-256 content hash of that attestation.

Changing metadata labels without the corresponding evidence/review history would create false provenance and is forbidden.

## Product coverage gap

The consumer Reading layer does not turn structural facts into domain fortunes by itself.

Its frozen v1 reading profiles require active interpretation claims such as:

```text
general natal       → T8 domain-synthesis claim
career natal        → T8 category=career
business natal      → T8 category=business
wealth natal        → T8 category=wealth
parents/children    → T8 family subcategory claim
relationship/spouse → T8 relationship claim
annual/monthly      → T9 period claim
life stage          → T9 category=life_stage
compatibility       → T10 claim
question-specific   → T11 claim
```

Therefore an empty production pack, or a pack containing only lower-tier structural/strength research, cannot make the current consumer product meaningfully usable. It would correctly terminate in partial/insufficient evidence states.

## Why automatic promotion is forbidden

The following shortcuts would make the runtime technically green while invalidating the authority model:

```text
research pack → status=production only
unreviewed rule → domain_reviewed by code change
research methodology → approved by code change
cross-reference source → primary_supported by relabeling
synthetic fixture → product authority
empty production pack → claim that public reading is ready
LLM-generated T8/T9 rule → authority
Host-generated missing claim → authority
user request text → evidence
```

All remain forbidden.

## Smallest honest unblock path

The smallest useful product slice is **general natal** first, not the entire 19-profile reading surface.

A future `Minimum Production Interpretation Pack V1` can begin only when there is materially new qualifying evidence and a real domain review for at least one deterministic T8 general-domain synthesis rule set.

Minimum sequence:

1. Define candidate T8 general-natal rule semantics from traceable Saju source material; do not infer them from UI requirements.
2. Bind each semantic proposition to qualifying source locators and methodology definitions.
3. Build fixture, negative, ambiguity, and boundary coverage for each candidate rule.
4. Obtain a real domain-level review decision for the exact content-addressed methodology/rules.
5. Create the corresponding `ReviewAttestation` records.
6. Establish reviewer trust grants that pin the exact attestation hashes.
7. Only then create a `production` interpretation pack and run `buildInterpretationExecutionPlan()` preflight.
8. Run browser/API E2E for general natal before expanding to career/business/wealth/relationship/time dynamics.

Expansion to T8 domain categories, T9 periods, T10 compatibility, or T11 question-specific reading must be evidence-driven and separately covered; the product profile registry is not evidence for those semantics.

## Human/research trigger

Repository work should resume on interpretation authority only when at least one of these is available:

```text
A. materially new qualifying source evidence for an MVP T8 rule set
B. an actual domain reviewer able to review exact candidate rules and issue a domain attestation
C. an independently approved interpretation package that already satisfies the production gate
```

Without A/B/C:

```text
PRODUCTION INTERPRETATION AUTHORITY = NO_BUILD
```

This is not a request to weaken the gate. It is the point at which additional code alone no longer increases product truthfulness.

## Current production state

```text
UI                                      = READY
HTTP HOST                               = READY
CONSUMER INPUT VALIDATION               = READY
CALCULATION ENGINE                      = READY
PRODUCTION CALCULATION AUTHORITY        = READY / V1 C-OPTION
READING ORCHESTRATION                   = READY
CONSUMER TRANSPORT SANITIZATION         = READY
PRODUCTION INTERPRETATION AUTHORITY     = BLOCKED
NARRATIVE DEPLOYMENT CONFIGURATION      = APPLICATION RESPONSIBILITY
PUBLIC PRODUCTION READING RUNTIME       = BLOCKED
```
