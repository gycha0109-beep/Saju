# R132 — Mixed month-qi candidate-selection variant corpus

Date: 2026-09-26  
Issue: #1612  
Track: saju-research  
Status: RESEARCH MIXED MONTH-QI CANDIDATE-SELECTION VARIANT CORPUS COMPLETE

## 1. Purpose

R132 builds an adversarial corpus for mixed month-qi candidate-selection research.

It does **not** build a selector.

The corpus exists so later work cannot silently collapse:

```text
source signal
-> candidate

signal count
-> candidate count

source-use count
-> candidate count

array order
-> rank

branch meeting
-> effective transformation

exact exemplar
-> generalized rule
```

R131 remains the controlling semantic boundary.

## 2. Governed source basis

R132 introduces no new traditional proposition.

It binds existing governed research around the selected mixed-qi material, including the source boundaries:

```text
透幹會取其清者用之
```

and:

```text
一透則一用，兼透則兼用，透而又會，則透與會並用
```

The existing repository already treats these as bounded source evidence, not as a complete generalized selector.

## 3. Corpus shape

R132 contains:

```text
cases                         = 24
comparison groups             = 12
variant classes               = 12

direct semantic exemplar rows = 6
exact 寅 role rows            = 2
governed meeting rows         = 2
synthetic counterfactual rows = 10
negative-control rows         = 4
exact-source-match rows       = 8
```

Some direct exemplars intentionally appear in more than one comparison group because the same source example tests different cardinality boundaries.

## 4. Variant classes

The twelve variant classes are:

```text
ZERO_VS_ONE_TRANSPARENCY
ONE_VS_MULTIPLE_TRANSPARENCIES
SAME_USE_CROSS_MECHANISM
DISTINCT_USE_CROSS_MECHANISM
THREE_SIGNALS_TWO_USES
EXACT_YIN_ROLE_AND_SUBSTITUTION
HIDDEN_STEM_STORAGE_ORDER_CONTROL
PARTIAL_VS_FULL_BRANCH_MEETING
STRUCTURAL_MEETING_EFFECTIVENESS_UNRESOLVED
SIGNAL_ARRAY_ORDER_CONTROL
SOURCE_USE_CARDINALITY_CONTRAST
EXACT_EXEMPLAR_EXTRA_SIGNAL_BOUNDARY
```

## 5. Zero signal is not no candidate

The governed selection-signal set is explicitly non-exhaustive.

Therefore:

```text
governedSignalCount = 0
```

does not authorize:

```text
candidateCount = 0
```

or:

```text
no candidate exists
```

R132-C01 / C02 preserve this boundary.

## 6. One transparency versus multiple transparencies

R132-C03 / C04 vary one transparency into two transparencies.

The source permits plural/coexisting selection through 兼透.

But:

```text
1 signal != 1 candidate
2 signals != 2 candidates
```

No candidate multiplicity, rank, precedence, or winner semantics are admitted.

## 7. 甲辰 — two signal mechanisms, one direct source use

The governed direct exemplar:

```text
甲辰
癸 transparency
+
申子辰 meeting
```

is source-observed on one 印 use axis.

R132 preserves:

```text
2 governed signals
-> 1 directly source-named use
```

for this exact exemplar.

It does not infer:

```text
1 source use
-> 1 canonical candidate
```

R132-C05 is the exact row.

R132-C06 removes the meeting synthetically. Once one required signal is removed, the exact source semantic-use label is not inherited.

## 8. 壬未 — two signals, two direct source uses

The governed direct exemplar:

```text
壬未
己 transparency -> 官
亥卯未 meeting -> 傷官
```

preserves two distinct source-named uses.

R132-C07 records the exact exemplar.

R132-C08 removes the transparency synthetically.

The exact two-signal source-use set is not generalized to the reduced configuration.

## 9. 甲戌 — three signals, two direct source uses

The governed direct exemplar:

```text
甲戌
辛 transparency -> 官
丁 transparency -> 傷官
寅午戌 meeting -> 傷官
```

gives:

```text
3 governed signals
-> 2 directly source-named uses
```

This is especially important because it directly blocks:

```text
signal count = source-use count
```

and still does not establish:

```text
source-use count = candidate count
```

R132-C09 records the exact exemplar.

R132-C10 removes 辛 transparency and deliberately withholds inherited source-use labels.

## 10. Exact 寅 role evidence

R132 preserves both governed exact 寅 observations.

First:

```text
甲為本主
```

Second:

```text
不透甲而透丙
-> 丙可作主
```

These are R132-C11 / C12.

They are exact-source role observations.

They are not:

```text
all-branch 本/中/餘 mapping

hiddenStems.month[0] = 本主

general transparency winner rule

candidate identity
```

## 11. Hidden-stem storage-order negative control

R132-C13 / C14 contain the same hidden-stem membership with different array order.

Example research control:

```text
[甲, 丙, 戊]
vs
[丙, 甲, 戊]
```

The membership set is unchanged.

Because repository storage order has no admitted semantic rank:

```text
reordering
!= candidate-rank change
```

This is a deliberate negative control.

## 12. Partial versus full branch meeting

R132-C15 / C16 distinguish:

```text
partial participant set
```

from:

```text
source-aligned full-three structural match
```

The governed branch-meeting bridge requires the exact full-three structural relation.

A partial set is not promoted into full meeting evidence.

## 13. Full structural meeting is not effective transformation

Even when a source-aligned full-three meeting is structurally observed:

```text
structuralMatchOnly = true
transformationEstablished = false
```

remains the governing boundary.

R132-C17 / C18 preserve the distinction between:

```text
full structural match
```

and:

```text
post-interaction effective bureau
```

The latter remains unresolved because clash, damage, and competing-interaction settlement are not authorized.

## 14. Signal-array order negative control

R132-C19 / C20 contain the same signal set in opposite serialization order.

```text
[transparency, meeting]
vs
[meeting, transparency]
```

The upstream signal artifact already makes array order non-semantic.

Therefore:

```text
first signal
!= primary candidate

signal order
!= rank

signal order
!= precedence
```

## 15. Source-use cardinality contrast

R132-C21 / C22 compare two direct exemplars with the same signal cardinality.

```text
甲辰:
2 signals -> 1 source use

壬未:
2 signals -> 2 source uses
```

This shows that signal cardinality alone does not determine source-use cardinality.

It still does not define candidate cardinality.

## 16. Exact exemplar plus extra signal

R132-C23 is the exact 甲戌 three-signal exemplar.

R132-C24 adds a synthetic extra signal.

The upstream exact matcher requires the governed signal set to match exactly.

Therefore:

```text
exact exemplar
+ extra signal
!= same exact exemplar
```

The synthetic superset receives no inherited source-use labels.

## 17. Source rows versus synthetic rows

Every corpus row explicitly records provenance.

Direct evidence categories:

```text
DIRECT_SOURCE_SEMANTIC_EXEMPLAR
DIRECT_EXACT_SOURCE_ROLE
GOVERNED_SOURCE_ALIGNED_OBSERVATION
```

Research-only perturbation categories:

```text
SYNTHETIC_COUNTERFACTUAL
SYNTHETIC_NEGATIVE_CONTROL
```

Synthetic rows are mechanically required to keep:

```text
sourceDirectStatementObserved = false
exactSourceExemplarMatch = false
sourceSemanticUseLabels = null
sourceSemanticUseCount = null
```

This prevents counterfactuals from becoming fake source evidence.

## 18. Cardinality invariants

R132 locks:

```text
zero governed signals
!= no candidate

signal count
!= candidate count

source-use count
!= candidate count
```

Every corpus row therefore keeps:

```text
candidateCount = null
```

## 19. Ranking and precedence invariants

Every row keeps:

```text
candidateRank = null
candidatePrecedence = null
```

This applies even when:

- multiple transparencies exist;
- transparency and meeting coexist;
- multiple source-named uses coexist;
- one direct source use has multiple supporting signal mechanisms.

## 20. Branch-meeting invariant

Every row keeps:

```text
branchMeetingEffectEstablished = false
```

This does not deny the source meeting evidence.

It preserves the distinction:

```text
source-aligned meeting observation
!= canonical post-interaction transformation
```

## 21. Corpus is not exhaustive

R132 is deliberately bounded to the currently governed source surface.

It does not claim that the 24 rows exhaust:

- all mixed month-qi configurations;
- all transparency combinations;
- all branch meetings;
- all source semantic uses;
- all candidate possibilities;
- all conflict/rescue interactions.

Therefore:

```text
corpusExhaustiveAuthorized = false
```

## 22. Invalid inference inventory

The corpus records a specific invalid inference for every row.

Representative rejected shortcuts include:

```text
ZERO_GOVERNED_SIGNALS_EQUALS_NO_CANDIDATE

ONE_TRANSPARENCY_EQUALS_ONE_CANDIDATE

MULTIPLE_TRANSPARENCIES_EQUAL_RANKED_CANDIDATES

SAME_SOURCE_USE_EQUALS_ONE_CANONICAL_CANDIDATE

TWO_SOURCE_USES_EQUAL_TWO_CANONICAL_CANDIDATES

THREE_SIGNALS_EQUAL_THREE_CANDIDATES

ARRAY_INDEX_EQUALS_HIDDEN_STEM_RANK

FULL_STRUCTURAL_MEETING_EQUALS_EFFECTIVE_TRANSFORMATION

FIRST_SIGNAL_EQUALS_PRIMARY_CANDIDATE

SUPERSET_OF_EXACT_SIGNALS_INHERITS_EXACT_SOURCE_LABELS
```

## 23. R131 boundary remains controlling

R132 does not reopen R131.

The governing sequence remains:

```text
SOURCE OBSERVATION
        |
        v
SOURCE SEMANTIC LAYER
        |
        X canonical bridge missing
CANONICAL CANDIDATE
        |
        X executable establishment bridge missing
CANONICAL ESTABLISHMENT
```

R132 adds corpus coverage only below the missing candidate bridge.

## 24. What R132 authorizes

R132 authorizes research use of the corpus for:

```text
variant classification
counterexample generation
negative-control testing
exact-exemplar boundary testing
cardinality fallacy testing
storage/serialization order invariance testing
branch-meeting structural/effectiveness separation testing
```

It does not authorize a selector.

## 25. What R132 does not authorize

```text
generalized mixed-qi selector
= NOT AUTHORIZED

generalized 清 predicate
= NOT AUTHORIZED

candidate identity
= NOT AUTHORIZED

candidate derivation
= NOT AUTHORIZED

candidate multiplicity
= NOT AUTHORIZED

candidate ranking
= NOT AUTHORIZED

candidate precedence
= NOT AUTHORIZED

generalized transparency selector
= NOT AUTHORIZED

generalized branch-meeting selection effect
= NOT AUTHORIZED

canonical transformation
= NOT AUTHORIZED

establishment predicate
= NOT AUTHORIZED

canonical terminal state
= NOT AUTHORIZED
```

## 26. R133 handoff

R133 is:

```text
Pattern rescue/failure precedence graph with counterexamples
```

R132 hands forward a key constraint:

```text
plural signals / plural source uses
do not already contain precedence semantics
```

Therefore R133 must derive rescue/failure precedence, if possible, from its own governed evidence rather than reading precedence out of R132 signal ordering or candidate assumptions.

## 27. Final authority status

```text
variant corpus
= COMPLETE FOR CURRENT GOVERNED SCOPE

direct source rows
= PRESERVED

synthetic rows
= EXPLICITLY SEPARATED

negative controls
= PRESERVED

candidate identity
= NOT AUTHORIZED

candidate derivation
= NOT AUTHORIZED

candidate ranking
= NOT AUTHORIZED

candidate precedence
= NOT AUTHORIZED

establishment predicate
= NOT AUTHORIZED

candidate facts
= NOT EMITTED

establishment facts
= NOT EMITTED

Production authority
= NOT GRANTED
```

Research-only. No automatic engine admission. No Preview/Production promotion.

RESEARCH COMPLETE.

AUTHORITY NOT GRANTED.
