# I164 — Provenance Independence Remediation Candidate Discovery Evidence

## Status

`STRICT SUCCESS / CLOSED`

Decision:

```text
REMEDIATION_CANDIDATE_DISCOVERY_EXECUTED_ONE_NEW_PROVENANCE_CANDIDATE_AND_ONE_LINEAGE_RISK_SIGNAL_DISCOVERED_ZERO_INDEPENDENCE_OR_REMEDIATION_SELECTION
```

## Authority boundary

I164 executes only the conclusion-neutral discovery authorized by I163.

It does **not**:

- establish independent normative provenance,
- select a remediation strategy,
- mutate the frozen v1 candidate set,
- create a replacement candidate set,
- rebind current evidence,
- create a new input package,
- authorize candidate-set reevaluation,
- authorize multi-source composition,
- create a visible-stem threshold rule,
- authorize production classification or numeric scoring.

## Discovery records

### 1. 李涵辰 — 《八字预测真踪》

Recorded as:

```text
NEW_PROVENANCE_CANDIDATE_PENDING_DERIVATIVE_RELATIONSHIP_ADJUDICATION
```

Evidence recorded:

- reproducible authored witness located,
- inspected 2003-06 edition records 李涵辰 as author,
- the inspected preface self-reports 《四柱预测真踪》 work in 1996–1997 and 《八字预测真踪》 publication in spring 1999,
- visible-heavenly-stem positional rules are expressed with explicit `隔不作用 / 互不作用` binary language,
- year-day, month-hour, and hour-year direct interaction is denied while adjacent positional interaction is specified.

The evidence is relevant to:

```text
EXPLICIT_BINARY_EFFECTIVE_INTERACTION_SEMANTICS
VISIBLE_STEM_POSITION_SCOPE_AND_POSITION_CLASS_APPLICABILITY
```

However, discovery did not establish the exact upstream normative origin of the `隔不作用` rule. Authorship, chronology, or a unique work identity cannot by themselves prove provenance independence.

Therefore:

```text
independence = NOT ESTABLISHED
candidate selection = NOT AUTHORIZED
replacement = NOT AUTHORIZED
```

### 2. 孙海义 — 《命理过三关》

Recorded as:

```text
LINEAGE_DEPENDENCY_RISK_UNRESOLVED_NOT_ELIGIBLE_AS_INDEPENDENT_AUTHORITY
```

Evidence recorded:

- reproducible 2004 revised witness located,
- the work explicitly distinguishes adjacent / separated / remote heavenly-stem interaction,
- it states that separated and remote `生克耗泄` have no effect for the 旺衰-analysis rule,
- it separately states that remote images may still be referenced after旺衰 is fixed or when岁运 activates them,
- third-party historical discussion places 孙海义 among representatives of the 李涵辰-led modern `新派` lineage.

This is a **lineage-risk signal only**.

The current evidence does not prove that the specific 孙海义 passage was copied from 李涵辰. Shared school lineage, chronology, and doctrine similarity are insufficient to promote the relationship to a specific derivative-dependency finding.

Therefore:

```text
specific textual dependency = NOT PROVEN
independent authority = NOT ESTABLISHED
```

## Exact discovery counts

```text
candidate evidence records                         = 2
new provenance candidate pending adjudication      = 1
lineage-dependency risk signal                      = 1
derivative dependency established                  = 0
explicit negative derivative finding established   = 0
independent normative provenance established       = 0
remediation strategy selected                      = 0
candidate-set mutations                            = 0
```

## Frozen guards

```text
current v2 package/candidate set immutable = true
I132 provenance requirement relaxed        = false
source-count voting                         = false
provenance-tier weighting                   = false
candidate-set reevaluation authorized       = false
actual multi-source composition             = false
visible-stem binary eligibility resolved    = false
threshold rule created                      = false
damage evaluation authorized                = false
classification authorized                   = false
numeric scoring authorized                  = false
```

Hidden-stem authority gap remains exactly:

```text
SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED
```

## Verification

Implementation/test HEAD:

```text
27edab94cbb3705885437848f786f584048c08c0
```

CI:

```text
#1103 SUCCESS
222 test files / 1422 tests
I164 8/8
lint PASS
typecheck PASS
test PASS
build PASS
```

## Next gate

```text
I165 — Source 克 Visible-Stem Interaction Threshold Multi-Source Composition
       Provenance Independence Remediation Candidate Evidence Adequacy
       & Lineage Adjudication Readiness Review
```

I165 may determine whether the I164 evidence is adequate to justify a narrowly bounded lineage-adjudication stage. It must not adjudicate independence itself, select remediation, mutate the candidate set, or create a new package.
