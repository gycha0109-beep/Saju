# I189 — Third-Wave New Provenance Candidate Discovery Evidence

## Status

```text
RESOLVED_THIRD_WAVE_NEW_PROVENANCE_CANDIDATE_DISCOVERY_EVIDENCE
```

Decision:

```text
THIRD_WAVE_DISCOVERY_EXECUTED_FIVE_OBSERVATIONS_ONE_MINIMUM_ADEQUACY_REVIEW_CANDIDATE_QU_WEI_LI_HONGCHENG_SOURCE_IDENTITY_INCOMPLETE_THREE_DERIVATIVE_RISK_SURFACES_ZERO_INDEPENDENCE_ZERO_SELECTION
```

## Upstream boundary

I189 executes only the six search channels frozen by I188 and preserves the I132 provenance rules unchanged.

```text
candidateSetVersion = v1-candidate-set
inputPackageVersion = v2-input-package
currentV2ProvenanceDisposition = BLOCKED_UNDER_CURRENT_EVIDENCE
```

No observation is treated as independent normative provenance merely because it is new, semantically aligned, numerous, or found on a named-author surface.

## Discovery result

```text
search channels executed = 6 / 6
discovery observations = 5
genuinely new author/work observations = 2
minimum-adequacy review candidates = 1
source-identity-incomplete observations = 1
derivative-risk/retransmission observations = 3
independent normative provenance = 0
candidate selection = 0
candidate-set mutation = 0
```

## Observation 1 — 曲炜 2003

Identity:

```text
author = 曲炜
work = 《四柱特训班讲义》
chronology = author-signed preface, 2003-10; based on spring 2003 training lectures
disposition = MINIMUM_ADEQUACY_REVIEW_CANDIDATE_LINEAGE_UNRESOLVED
```

Public witness locators:

- https://www.scribd.com/document/733612931/
- https://www.scribd.com/document/778420605/
- https://www.fozhu920.com/19448.html

The witness contains exact target-scope material: visible heavenly stems are strongest when adjacent, markedly weaker across one intervening stem, weaker still across two, and the year-hour route is treated as lacking direct effective 克 in the supplied example.

This is sufficient for a dedicated evidence-adequacy/lineage review, not for independence. A separate third-party doctrinal taxonomy describes 曲炜 as an inheritor of 李涵辰's `隔不作用` doctrine, so a concrete lineage-risk lead exists and must be adjudicated rather than ignored.

Third-party lineage lead:

- https://mt.sohu.com/20160907/n467823377.shtml

```text
minimum adequacy review candidate = YES
lineage adjudication complete = NO
independent provenance = NO
```

## Observation 2 — 李洪成

Identity:

```text
author = 李洪成
surface = 《李洪成 八字资料汇总》 compilation plus separately reproduced 2003-dated training/article traces
disposition = SOURCE_IDENTITY_INCOMPLETE
```

Locators:

- https://www.scribd.com/document/424415911/
- https://zhouyisc.com/nd.jsp?id=558
- https://zhouyisc.com/nd.jsp?id=557

The compilation contains exact-scope route semantics: a remote year-stem 丙火 is described as reaching day-stem 庚金 through intervening 丁火, with direct action changing when 丁火 is combined away.

A separately reproduced 李洪成 training article is dated `030913`, but I189 does not backfill that dated article as the source of the compilation passage. The exact passage still lacks a resolved single-work/edition/publication identity.

```text
exact-scope evidence = YES
author/chronology trace = YES
exact passage source identity = INCOMPLETE
minimum adequacy review candidate = NO
independent provenance = NO
```

## Observation 3 — 胡小三 2021

Locator:

- https://www.sohu.com/a/509493797_121256312

The article has named author, date, and exact visible-stem distance semantics, but its route and wording substantially overlap the earlier 曲炜 witness.

```text
disposition = DERIVATIVE_RISK_UNRESOLVED
independent provenance = NO
```

No exact derivative edge is asserted by I189; the overlap is a lineage-risk signal requiring provenance evidence.

## Observation 4 — 黄麟 2023

Locator:

- https://www.ydygfs.com/fengshuishangpin/2023/0310/29638.html

The page reproduces the adjacent/one-gap/two-gap hierarchy and year-hour non-action example in wording closely matching the earlier 曲炜 witness.

```text
disposition = DERIVATIVE_RISK_UNRESOLVED
independent provenance = NO
```

Near-verbatim overlap is not itself converted into a definitive derivative edge, but it prevents an independence claim.

## Observation 5 — 墨谷先生 2022

Locator:

- https://www.shenjige.cn/details/ZSuhz_9SQ.html

The article states `隔不作用` rules and explicitly describes the relevant approach as `涵辰派命理`.

```text
disposition = EXPLICIT_SCHOOL_RETRANSMISSION_SIGNAL
may qualify as independent origin = NO
```

## I132 preservation

```text
explicit derivative relationship check = REQUIRED
derivative retransmission counts as independent authority = false
unresolved lineage default = REJECT_INDEPENDENCE_CLAIM
source class alone sufficient = false
source count may become numeric weight = false
provenance tier may become numeric weight = false
search result count may establish authority = false
semantic agreement alone may establish independence = false
provenance independence adjudicated by I189 = false
independent normative provenance established count = 0
```

## Li 1998 path preservation

The Li Shunxiang 1998 same-target path remains suspended-not-retired and methodologically open on a materially new direct lead.

```text
publication-medium/entity gap = OPEN
canonical digital witness normalization gap = OPEN
Li 1998 independent provenance = NO
targeted discovery exhaustion = NO
corpus exhaustion = NO
search silence creates negative finding = NO
```

## Production and methodology guards

No authority expansion occurred.

```text
evidence rebinding = NOT READY / NOT AUTHORIZED
candidate registration = NOT AUTHORIZED
candidate-set reevaluation = NOT AUTHORIZED
actual composition = NOT PERFORMED
multi-source composition = NOT AUTHORIZED
visible-stem binary effective interaction eligibility = UNRESOLVED
threshold rule = NOT CREATED
damage evaluation = NOT AUTHORIZED
classification = NOT AUTHORIZED
numeric scoring = NOT AUTHORIZED
production policy execution = NOT AUTHORIZED
hidden-stem authority gap = SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED
```

## Verification

Implementation/test exact HEAD:

```text
b7f98729d36498b269368f271b43e60448c01569
```

CI:

```text
#1187 SUCCESS
247 test files / 1622 tests / I189 8/8
lint PASS
typecheck PASS
test PASS
build PASS
```

## Next gate

```text
I190 — Third-Wave Candidate Evidence Adequacy & Lineage Adjudication Readiness Review
```

I190 must restrict targeted lineage readiness to the single minimum-adequacy candidate, 曲炜 2003. It must not promote 李洪成 while the exact-passage source identity remains incomplete, and it must not convert the three derivative-risk/retransmission surfaces into independent candidates.