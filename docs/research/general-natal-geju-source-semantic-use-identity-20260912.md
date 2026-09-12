# General Natal Gyeokguk — Source-Direct Semantic Use Identity Observation

Date: 2026-09-12  
Status: research-only source-direct observation contract  
Production authority: BLOCKED

## Purpose

The existing General Natal research surface can already represent governed source signals from:

```text
透干
會支
```

and can preserve zero / one / multiple signal cardinality without treating signals as canonical Gyeokguk candidates.

This frontier asks a narrower question than candidate identity:

```text
When the selected source itself names the semantic 用 carried by each mechanism,
can exact direct exemplars show that multiple governed signals may refer to the same source use,
or to distinct source uses?
```

The answer is yes for a small set of direct examples, but only at the exact exemplar level.

The new invariant is:

```text
source-direct semantic use identity observation
!= GEJU_CANDIDATE identity
```

No generalized candidate producer is introduced.

---

## Source context

Selected source scope:

```text
子平真詮評注 / 論雜氣如何取用
```

The governing passage states:

```text
一透則一用，兼透則兼用，透而又會，則透與會並用
```

This already establishes that one use, plural uses, and transparency-plus-meeting co-use can occur.

The important new observation comes from the source's own examples immediately surrounding that rule.

---

## Direct exemplar 1 — two signals, one source-named use

Source example:

```text
甲生辰月，透癸為印，而又會子會申以成局，印綬之格也，清而不雜，是透干與會支，合而有情也
```

Governed observation surface:

```text
signal A = transparency 癸
signal B = 辰申子 branch meeting
```

Source-named semantic use:

```text
癸 transparency -> 印
辰申子 meeting   -> 水印 / 印 axis
combined example -> 印綬之格
```

Therefore this exact source example supports:

```text
2 governed signals
-> 1 directly source-named semantic use identity: 印
```

This is not semantic candidate deduplication. It is only an observation that the source itself places two mechanisms on the same named use axis in this exact example.

---

## Direct exemplar 2 — two signals, two source-named uses

Source example:

```text
壬生未月，透己為官，而地支會亥卯以成傷官之局，是透官與會支，合而無情者也
```

Governed observation surface:

```text
signal A = transparency 己
signal B = 未亥卯 branch meeting
```

Source-named semantic uses:

```text
己 transparency -> 官
未亥卯 meeting   -> 傷官
```

Therefore this exact source example supports:

```text
2 governed signals
-> 2 directly source-named semantic uses: 官 + 傷官
```

This confirms that coexisting signals are not automatically one semantic use.

---

## Direct exemplar 3 — three signals, two source-named uses

Source example:

```text
甲生戌月，透辛為官，而又透丁以傷官，月支又會寅會午以成傷官之局，是兩干並透，與會支合而無情也
```

Governed observation surface:

```text
signal A = transparency 辛
signal B = transparency 丁
signal C = 戌寅午 branch meeting
```

Source-named semantic uses:

```text
辛 transparency -> 官
丁 transparency -> 傷官
戌寅午 meeting   -> 傷官
```

Therefore this exact source example supports:

```text
3 governed signals
-> 2 directly source-named semantic uses: 官 + 傷官
```

This is the decisive boundary:

```text
governed signal count
!= source semantic use identity count
```

Different signal mechanisms may converge on one source-named use, while other signals remain semantically distinct.

---

## Exact-match rule

The executable research contract is intentionally stricter than the prose source boundary.

A direct exemplar is admitted only when all of the following exactly match:

```text
day master
month branch
governed transparency signal identity
source-aligned branch-meeting signal identity
complete governed signal count for the exemplar
```

If an additional governed signal is present, the exemplar does not match.

Reason:

```text
source example + extra chart condition
!= same exact source example
```

This prevents an exact source illustration from silently becoming a generalized semantic-use identity predicate.

---

## Research output

For an exact direct exemplar only, the report may emit:

```text
sourceSemanticUseId
sourceSemanticUseKey
sourceLabel
supportingSignalIds
supportingSignalKinds
```

Current source labels are intentionally narrow:

```text
印
官
傷官
```

They are recorded as source-named semantic uses, not as a new production Gyeokguk candidate schema.

---

## Authority gained

Research-only authority:

```text
SOURCE_DIRECT_SEMANTIC_USE_IDENTITY_OBSERVATION = AUTHORIZED
SOURCE_DIRECT_CROSS_SIGNAL_SAME_USE_OBSERVATION = AUTHORIZED
SOURCE_DIRECT_DISTINCT_USE_OBSERVATION = AUTHORIZED
SOURCE_DIRECT_MANY_SIGNALS_TO_FEWER_USES_OBSERVATION = AUTHORIZED
```

This means only that the selected source's exact examples can preserve their own named-use identity relationships.

---

## Authority not gained

The following remain explicitly unauthorized:

```text
semantic-use set exhaustiveness
no-direct-exemplar -> no semantic use inference
general signal -> semantic-use identity predicate
semantic-use array order as priority
semantic-use ranking
semantic-use precedence
semantic-use strength
signal semantic deduplication into candidate
candidate identity
candidate semantic type
multiple canonical candidate representation
candidate derivation
GEJU_CANDIDATE producer
branch-meeting post-interaction effectiveness
establishment success/failure predicate
GEJU_ESTABLISHMENT_STATE
General Natal production authority
Commerce
```

In particular:

```text
same source semantic use
!= same GEJU_CANDIDATE established

different source semantic use
!= different GEJU_CANDIDATE established
```

and:

```text
3 signals -> 2 source uses
!= 2 canonical candidates
```

---

## No-exemplar boundary

If the governed signal report resolves but no exact direct exemplar matches:

```text
resolved_no_direct_source_identity_exemplar
sourceSemanticUses = []
```

This means only:

```text
this bounded direct-exemplar contract has no matching source identity observation
```

It must not be rewritten as:

```text
no semantic use exists
no candidate exists
```

The exemplar set is explicitly non-exhaustive.

---

## Fail-closed substrate rule

If the upstream governed selection-signal report is unavailable:

```text
canonical_substrate_unavailable
```

this report also fails closed.

The direct exemplar contract additionally requires resolved day-master identity because the selected source examples are day-master-specific.

Outside the selected mixed-qi source scope:

```text
outside_selected_mixed_qi_scope
sourceSemanticUses = []
```

No universal negative inference is permitted.

---

## Candidate-identity consequence

This frontier materially narrows the next research question but does not close it.

What is now source-backed:

```text
signal identity and semantic-use identity are different layers
signal cardinality and source-use cardinality can differ
cross-mechanism same-use identity exists in exact examples
cross-mechanism distinct-use identity also exists in exact examples
```

What is still missing:

```text
whether source semantic-use identity is sufficient to define canonical GEJU_CANDIDATE identity
how candidate identity behaves outside exact exemplars
whether two source uses must become two candidates
whether one source use supported by multiple mechanisms must deduplicate to one candidate
how post-interaction effectiveness changes candidate identity
how candidate representation interacts with 清 / 濁, 有情 / 無情, 成 / 敗
```

Therefore:

```text
MULTIPLE_GEJU_CANDIDATE_REPRESENTATION_AUTHORITY_MISSING = OPEN
```

remains unchanged.

---

## Five coarse gaps remain OPEN

```text
MONTH_ORDER_HIDDEN_STEM_SELECTION_PREDICATE_AUTHORITY_MISSING
VISIBLE_STEM_TRANSPARENCY_SELECTION_PREDICATE_AUTHORITY_MISSING
BRANCH_MEETING_SELECTION_EFFECT_AUTHORITY_MISSING
MULTIPLE_GEJU_CANDIDATE_REPRESENTATION_AUTHORITY_MISSING
GEJU_ESTABLISHMENT_SUCCESS_FAILURE_PREDICATE_AUTHORITY_MISSING
```

This frontier is an identity-observation substrate only.

---

## Product / Commerce invariant

```text
GENERAL_NATAL_PRODUCTION_AUTHORITY = BLOCKED
P0-CM-03 = OPEN
GEJU_CANDIDATE = NOT_EMITTED
GEJU_ESTABLISHMENT_STATE = NOT_EMITTED
Commerce = HOLD
```

ProductHost, Character, LLM, API/browser, SKU, payment, entitlement, and refund layers must not reinterpret source-semantic-use observations as candidate or establishment facts.

---

## Next honest frontier

The next research question is narrower than before:

```text
Does the selected source define a rule that promotes a source-named 用 identity
into a canonical candidate identity independently of exact exemplar wording,
without importing ranking, post-interaction effectiveness, or establishment semantics?
```

If not, candidate identity remains blocked even though exact source-use identity relationships are now observable.
