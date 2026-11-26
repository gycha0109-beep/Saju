# I171 — Li Shunxiang Targeted Lineage Adjudication Evidence

## Result

```text
I171 = STRICT SUCCESS / CLOSED PENDING CLOSEOUT CI

DECISION =
LI_SHUNXIANG_TARGETED_LINEAGE_DISCOVERY_EXECUTED_ONE_PRIOR_SAME_AUTHOR_DERIVATIVE_DEPENDENCY_FOUND_THREE_LINEAGE_QUESTIONS_UNRESOLVED_ZERO_EXPLICIT_NEGATIVE_ZERO_INDEPENDENCE_CURRENT_2004_WITNESS_REQUIRES_REASSESSMENT_BEFORE_REMEDIATION
```

I171 executed only the four lineage questions prospectively frozen by I170.

The decisive new result is that the 2004 《四柱玄机》 target passage is not the earliest located 李顺祥 normative witness. The same distinctive `干支紧密度及其生克力量` chapter, terminology, ordering, A–E examples, and intermediary non-克 example are attributable to 李顺祥's earlier 1998 《四柱命理学自修教程（普及班）》.

Therefore the current 2004 witness is downstream of a prior same-author work for this target passage and cannot be treated as the original provenance origin without reassessment.

## Exact lineage findings

### 1. 李顺祥 target rule → 陈园 1995 selected-set dependency

```text
finding = UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY
relationship class = SELECTED_SET_SPECIFIC_DEPENDENCY_UNRESOLVED
```

The 陈园 material predates the located Li witnesses and contains a materially similar normative pattern: adjacent 克 is stronger than separated 克, remote 克 can be ineffective, and an intervening transforming stem can make a 克 relation not count as 克.

The Li material later contains distance-sensitive 生克 force and an intermediary 丁火 example where 甲木 does not 克 the day master.

Chronology and semantic similarity create a lineage-risk signal, but no inspected Li preface, chapter attribution, bibliography, or target-passage statement explicitly attributes this rule to 陈园. A selected-set-specific derivative dependency is therefore not established.

### 2. 李顺祥 target rule → 邵伟华 / research-center lineage

```text
finding = UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY
relationship class = COMMON_SCHOOL_OR_INSTITUTIONAL_LINEAGE_UNRESOLVED
```

Li's first-edition preface and author biography record professional activity at 邵伟华易学研究服务中心 before the 1998 tutorial publication. This establishes institutional/common-school lineage risk only.

No inspected evidence states that 邵伟华 or the research center taught, authored, supplied, or approved the exact `干支紧密度` / intermediary non-克 target rule.

### 3. 张志春 editorial role → target-rule authorship

```text
finding = UNRESOLVED_AFTER_TARGETED_LINEAGE_DISCOVERY
relationship class = EDITORIAL_ROLE_TARGET_AUTHORSHIP_UNRESOLVED
```

The 2004 first-edition front matter separates `主编：张志春` from `编著：李顺祥`. 张志春 signs a general series-editor introduction, while 李顺祥 signs the book-specific preface; bibliographic metadata likewise identifies Li as author and Zhang as contributor.

No inspected target chapter attributes the rule to Zhang. That absence alone is not enough for a governed explicit negative relationship finding, so authorship contribution remains unresolved rather than rejected.

### 4. Other earlier source/origin

```text
finding = DERIVATIVE_DEPENDENCY_FOUND
relationship class = PRIOR_SAME_AUTHOR_WORK_RETRANSMISSION
dependency target = LI_SHUNXIANG_SIZHU_MINGLI_ZIXIU_JIAOCHENG_PUJIBAN_1998
```

Li author-site chronology states that 《四柱命理学自修教程（普及班）》 formally appeared in 1998. Multiple attributed same-work reproductions identify the exact `日干 / 干支紧密度及其生克力量` material as Chapter 9 of that tutorial. The 2004 《四柱玄机》 chapter reuses the same distinctive terminology, sequence, examples, and conclusion.

This is sufficient to establish a prior-same-author-work dependency for the 2004 witness.

It does **not** establish that the 1998 Li normative origin is independent from 陈园 / 邵伟华 or any other earlier source.

## Counts

```text
lineage questions                         = 4
derivative dependency found               = 1
unresolved after targeted discovery       = 3
explicit negative derivative finding      = 0
independent normative provenance           = 0
selected-set Chen dependency established  = false
Shao/center target dependency established = false
Zhang target-rule authorship established  = false
prior same-author dependency established  = true
```

## Current witness disposition

```text
2004 witness =
PRIOR_SAME_AUTHOR_NORMATIVE_WITNESS_LOCATED_CURRENT_2004_WITNESS_NOT_ORIGINAL_ORIGIN_REBINDING_OR_REMEDIATION_REASSESSMENT_REQUIRED

2004 may count as new independent provenance without reassessment = false
1998 same-author witness automatically independent from selected set = false
```

The finding changes only the provenance interpretation of the I169 discovery observation. No evidence rebinding is executed by I171.

## Verification

Implementation/test HEAD:

```text
2cdf1b1b60d244b78dcefbb78984847dff971857
```

Exact-head CI:

```text
CI #1133 = SUCCESS
lint      = PASS
typecheck = PASS
test      = PASS
build     = PASS

Test Files = 229 passed
Tests      = 1478 passed
I171       = 8 / 8 PASS
```

## Hard guards

```text
search silence used as negative finding          = false
chronology used as independence finding           = false
semantic similarity alone used as dependency      = false
institutional association used as dependency      = false
editor credit used as target authorship finding   = false
source-count voting                               = false
provenance-tier weighting                         = false
candidate/remediation selected                    = false / false
remediation executed                              = false
evidence rebound                                  = false
candidate-set mutation                            = false
new candidate-set/input-package version           = false / false
provenance independence adjudicated               = false
I132 satisfied/relaxed                            = false / false
candidate-set reevaluation                        = false
candidate-set admissibility                       = false
current v2                                        = BLOCKED / IMMUTABLE
production policy execution                       = false
actual/multi-source composition                   = false / false
visible-stem binary eligibility                   = unresolved
threshold rule                                    = false
damage evaluation                                 = false
classification                                    = false
numeric scoring                                   = false
hidden-stem authority gap                         = SOURCE_KE_HIDDEN_STEM_INTERACTION_ELIGIBILITY_AUTHORITY_NOT_ESTABLISHED
```

## Next gate

```text
I172 — Li Shunxiang Lineage Evidence Adequacy & Remediation Reassessment Review
```

I172 should determine whether the I171 evidence is adequate to retire the 2004 witness as a presumed origin and whether a separate prospective prior-witness identity/rebinding path is methodologically justified.

I172 must not perform rebinding, must not treat the earlier same-author witness as a new independent source, must keep the three external-lineage questions unresolved, and must not mutate or reevaluate the current v2 package.
