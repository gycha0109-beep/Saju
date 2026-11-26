# I169 — Second-Wave New Provenance Candidate Discovery Evidence

## Result

```text
I169 = STRICT SUCCESS / CLOSED PENDING CLOSEOUT CI

DECISION =
SECOND_WAVE_DISCOVERY_EXECUTED_FOUR_NEW_PROVENANCE_OBSERVATIONS_ONE_MINIMUM_ADEQUACY_REVIEW_CANDIDATE_ZERO_INDEPENDENCE_ZERO_SELECTION_LINEAGE_AND_IDENTITY_GAPS_REMAIN
```

I169 executed the I168 conclusion-neutral search. Four distinct provenance observations were recorded. None was adjudicated independent and none was selected for remediation.

## Discovery result

```text
discovery observations                         = 4
new normative provenance identities observed   = 4
exact print-edition identity established       = 1
direct binary-exception language observations  = 2
minimum later-adequacy-review candidates        = 1
lineage unresolved                              = 4
derivative dependency found                     = 0
explicit negative derivative finding            = 0
independent normative provenance established    = 0
candidate selected                              = 0
```

## Observation dispositions

### 1. 李顺祥 — 《四柱玄机：命理推断详解》

```text
record = LI_SHUNXIANG_SIZHU_XUANJI_2004
identity = EXACT_PRINT_EDITION_IDENTITY_ESTABLISHED
later adequacy review = YES
independence = NOT ESTABLISHED
lineage = UNRESOLVED_AFTER_SECOND_WAVE_DISCOVERY
```

The inspected corpus establishes a 2004 新疆人民出版社 edition and a directly relevant Chapter 9 passage on 干支紧密度 / 生克力量. The passage states that position changes force, strong remote stems can compensate for distance, and an intermediary 通关 condition can cause an otherwise attacking stem not to 克 the day master.

The work description also states generally that it draws on strengths of ancient and modern books. The target passage itself does not establish its exact upstream lineage. Later author-hosted and third-party copies are same-work/downstream witnesses, not additional authority.

### 2. 邵刚 — 《易魂之四柱篇》

```text
record = SHAO_GANG_YIHUN_SIZHU_PIAN_AUTHOR_HOSTED
identity = AUTHOR_WORK_IDENTITY_ESTABLISHED_PRINT_EDITION_INCOMPLETE
later adequacy review = NO
independence = NOT ESTABLISHED
lineage = UNRESOLVED_AFTER_SECOND_WAVE_DISCOVERY
```

Author/course-site material contains directly relevant rules: a 通关 intermediary may completely transform the attacking element so it cannot 克 the next element, and some 隔干/遥隔 interactions may be treated as tight interaction under branch-force conditions.

Exact print edition, publisher, publication date, and lineage were not established to the I168 identity standard.

### 3. 赵知易 — 《八字真鉴》

```text
record = ZHAO_ZHIYI_BAZI_ZHENJIAN_2003
identity = DATED_WORK_IDENTITY_ESTABLISHED_PUBLICATION_CHAIN_INCOMPLETE
later adequacy review = NO
independence = NOT ESTABLISHED
lineage = UNRESOLVED_AFTER_SECOND_WAVE_DISCOVERY
```

A digitized witness identifies 赵知易 and is dated 2003-07-08. Its 干支作用论 / 干支位置远近论 is relevant to positional interaction, but the publication chain remains incompletely corroborated and the exact governed binary 克-eligibility semantic bridge is not yet established.

### 4. 陈炳地 — 《天干相克的要点及运用》

```text
record = CHEN_BINGDI_TIANGAN_XIANGKE_WEB_ARTICLE
identity = ATTRIBUTED_WEB_WITNESS_DATE_AND_PUBLICATION_CHAIN_INCOMPLETE
later adequacy review = NO
independence = NOT ESTABLISHED
lineage = UNRESOLVED_AFTER_SECOND_WAVE_DISCOVERY
```

The attributed web article directly discusses 紧贴, 隔干, 遥隔 and conditions under which remote 克 may be treated as tight 克. Exact original date, publication identity, and upstream lineage remain unestablished.

## Important lineage-risk signal for the next gate

An already governed earlier 陈园 / 《四柱预测学入门》 line contains a materially similar normative pattern: adjacent 克 is stronger, remote 克 is weak/absent, and an intervening element that transforms the 克 can make the interaction not count as 克.

This chronology and semantic similarity do **not** establish a derivative dependency by themselves. They do require a targeted selected-set relationship question before 李顺祥 can ever count toward independent normative provenance.

## Verification

Implementation/test HEAD:

```text
b595fc2bfc23a5c8d32ddcdce09a10ba71ba27bd
```

Exact-head CI:

```text
CI #1127 = SUCCESS
lint      = PASS
typecheck = PASS
test      = PASS
build     = PASS

Test Files = 227 passed
Tests      = 1462 passed
I169       = 8 / 8 PASS
```

## Hard guards

```text
search silence used as negative finding      = false
chronology used as independence              = false
source identity used as independence         = false
source-count voting                          = false
provenance-tier weighting                    = false
candidate/remediation selected               = false / false
remediation executed                         = false
evidence rebound                             = false
candidate-set mutation                       = false
new candidate-set/input-package version      = false / false
provenance independence adjudicated          = false
I132 satisfied/relaxed                       = false / false
candidate-set reevaluation                   = false
candidate-set admissibility                  = false
current v2                                   = BLOCKED / IMMUTABLE
production policy execution                  = false
actual/multi-source composition              = false / false
visible-stem binary eligibility              = unresolved
threshold rule                               = false
damage evaluation                            = false
classification                               = false
numeric scoring                              = false
hidden-stem authority gap                    = SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED
```

## Next gate

```text
I170 — Second-Wave Candidate Evidence Adequacy & Lineage Adjudication Readiness Review
```

I170 should assess only whether the I169 records support targeted lineage adjudication. It must not infer independence from chronology or semantic similarity, must keep the three incomplete observations out of remediation candidacy, and must not mutate or reevaluate the current v2 package.
