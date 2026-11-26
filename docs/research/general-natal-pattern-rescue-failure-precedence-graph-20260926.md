# R133 — Pattern rescue/failure precedence graph with counterexamples

Date: 2026-09-26  
Issue: #1622  
Track: saju-research  
Status: RESEARCH PATTERN RESCUE / FAILURE PRECEDENCE GRAPH COMPLETE

## 1. Purpose

R133 asks a narrow question:

> When the governed 格局 corpus says that one relation damages a path and another relation rescues it, what ordering is actually supported?

The answer is not a global resolver.

The answer is a set of bounded local graphs plus counterexamples that prevent local ordering from being generalized into universal precedence.

## 2. Governing boundary

R133 preserves:

```text
LOCAL SOURCE ORDER
!= GLOBAL PRECEDENCE

RESCUE ACTOR
!= UNIVERSAL FAVORABLE ACTOR

SAME ACTOR
!= SAME FUNCTION ACROSS CONTEXTS

SOURCE SENTENCE ORDER
!= RUNTIME EVALUATION ORDER

ALTERNATIVE RESCUES
!= RANKED RESCUES

RESCUE PROPOSITION
!= EXECUTABLE RESCUE PREDICATE

RESCUE OBSERVED
!= ESTABLISHED PATTERN

LOCAL GRAPH
!= GLOBAL DAG
```

## 3. Inputs

R133 binds the existing governed repository research:

```text
R022 財格
R023 官格
R024 印格
R025 食神格
R026 傷官格
R027 七煞格
R030 conflict-resolution state matrix
R126 local relation-order divergence
R131 candidate / establishment boundary
R132 candidate-selection variant corpus
```

R133 does not modify those artifacts.

## 4. Fresh source verification

On 2026-09-26 the selected 成敗救應 surface was checked again.

Selected surfaces:

```text
子平真詮 / 子平真詮評註
https://www.ncc.com.tw/fate/paleo/bg/bg_033.htm

NLC scan witness:
淵海子平 / 子平真詮 第2卷
https://upload.wikimedia.org/wikipedia/commons/d/d5/NLC416-13jh002326-46443_%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3_%E5%AD%90%E5%B9%B3%E7%9C%9F%E8%A9%AE_%E7%AC%AC2%E5%8D%B7.pdf
```

The NCC page contains both the base-text layer and later commentary.

R133 therefore labels:

```text
BASE_TEXT_DIRECT
LATER_COMMENTARY
GOVERNED_REPOSITORY
RESEARCH_SYNTHESIS
```

separately.

The NLC scan witness corroborates the rescue-list surface but is not counted as an independent doctrinal vote.

R133 is not an edition-stemma study.

## 5. Direct rescue inventory boundary

The reviewed base-text rescue inventory contains bounded local forms including:

```text
官逢傷 -> 透印以解
雜煞 -> 合煞以清
刑沖 -> 會合以解

財逢劫 -> 透食以化
財逢劫 -> 生官以制
財逢煞 -> 食神制煞以生財
財逢煞 -> 合煞存財

印逢財 -> 劫財以解
印逢財 -> 合財存印

食逢梟 -> 就煞
食逢梟 -> 生財護食

煞逢食制
-> 印來護煞
-> 財去印存食

傷官生財
-> 透煞
-> 煞逢合
```

These are source-local sequences.

They are not executable predicates.

## 6. Graph shape

R133 contains:

```text
graph scenarios                    = 28
direct/local rescue paths          = 13
contamination/failure paths        = 7
counterexample scenarios           = 8
same-actor opposite-function rows  = 5
represented ordinary families      = 6
```

The six represented pattern families are:

```text
財
官
印
食神
傷官
七煞
```

## 7. Edge semantics

Every graph edge is explicitly local.

Allowed research edge labels are:

```text
PRECEDES
REMEDIES
CONTAMINATES
REDIRECTS
PRESERVES
BLOCKS
COUNTEREXAMPLE_TO
```

Every edge also records one evidence type:

```text
EXPLICIT_SOURCE_SEQUENCE
COMMENTARY_LOCAL_SEQUENCE
REPOSITORY_BOUNDED_SEQUENCE
COUNTEREXAMPLE_SYNTHESIS
```

Every edge carries:

```text
localOnly = true
globalPrecedenceAuthorized = false
```

## 8. 官 — 傷 then 印 rescue

Bounded graph:

```text
官
 |
 v
傷
 |
 v
透印
 |
 v
解傷
```

Source statement:

```text
官逢傷而透印以解之
```

Research consequence:

```text
印 is local rescue here
!= 印 globally outranks 傷
```

## 9. 官 — mixed Kill then combination rescue

Bounded graph:

```text
官
 |
 v
雜煞
 |
 v
合煞
 |
 v
清
```

The target matters.

This does not authorize:

```text
合 present
-> conflict always cleared
```

## 10. 官 — clash then meeting/combination rescue

Bounded graph:

```text
官
 |
 v
刑沖
 |
 v
會合
 |
 v
解
```

This is evidence for a source-local rescue relation.

It is not a universal interaction table such as:

```text
會合 > 沖 > 刑
```

## 11. 官 — success ingredients can still be contaminated

R023 preserves:

```text
正官逢財
-> 又逢傷
-> 帶忌
```

This blocks early terminal evaluation.

The engine cannot safely do:

```text
官 + 財
-> success
-> stop
```

## 12. 財逢劫 — two rescue alternatives

The source gives at least two bounded responses:

```text
財逢劫
├─> 透食以化
└─> 生官以制
```

R133 deliberately does not add an edge between the two rescue alternatives.

Therefore:

```text
透食
!= higher priority than 生官

source listing order
!= ranking
```

## 13. 財逢煞 — two rescue alternatives

The source also preserves:

```text
財逢煞
├─> 食神制煞以生財
└─> 合煞存財
```

Again:

```text
control path
!= automatically preferred to combination path
```

No source-governed ranking is supplied.

## 14. 財旺生官 — later contamination

R022 preserves:

```text
財旺
-> 生官
-> 傷 / 合
-> 帶忌
```

This is another anti-short-circuit case.

A recognized success path is not automatically terminal.

## 15. 印逢財 — 劫財 rescue

Freshly rechecked base-text surface:

```text
印逢財
-> 劫財以解
```

This is important because 劫財 has a different role in 財格.

Therefore actor names cannot carry fixed polarity.

## 16. 印逢財 — 合財存印

Alternative local rescue:

```text
印逢財
-> 合財
-> 存印
```

This does not imply:

```text
合財 always good
```

The target path determines the bounded meaning.

## 17. 印 — 財去印 can be contamination

R024 preserves:

```text
透煞
-> 生印
-> 透財
-> 去印
-> 存煞
```

The governed R024 role is contamination.

This case becomes one of the most important R133 counterexamples.

## 18. 食逢梟 — rescue can redirect

One source-listed response is:

```text
食逢梟
-> 就煞
```

This does not simply restore the original Food path.

R133 marks it:

```text
rescuePreservesOriginalPath = false
rescueRedirectsPath = true
```

## 19. 食逢梟 — rescue can preserve

The alternative source-listed response is:

```text
食逢梟
-> 生財
-> 護食
```

R133 marks it:

```text
rescuePreservesOriginalPath = true
rescueRedirectsPath = false
```

The two rescue forms therefore do not share one uniform transition semantics.

## 20. Food rescue alternatives are not ranked

The source gives:

```text
就煞
or
生財護食
```

R133 records:

```text
alternative applicability = unresolved
alternative ranking = unauthorized
first-match-wins = unauthorized
```

## 21. 食神帶煞印 + 財 contamination

R025 preserves:

```text
食神帶煞印
-> 又逢財
-> 帶忌
```

This is another counterexample to:

```text
財 = universal rescue
```

## 22. 傷官生財 + 煞合 rescue

Bounded rescue graph:

```text
傷官
-> 生財
-> 透煞
-> 煞逢合
```

The same broad interaction mechanism, 合, is not always rescue.

The target must be preserved.

## 23. 傷官生財 + 財合 contamination

R026 also preserves:

```text
傷官
-> 生財
-> 財逢合
-> 帶忌
```

Compare:

```text
合煞 -> rescue
合財 -> contamination
```

This blocks a universal combination priority.

## 24. 傷官佩印 — rescue/support actor can itself be damaged

R026 preserves:

```text
傷官佩印
-> 印遭傷
-> 帶忌
```

Therefore:

```text
support actor observed
!= terminal rescue
```

A later relation can damage the support actor.

## 25. 七煞 — 印 can contaminate 食制

R027 preserves:

```text
七煞
-> 食制
-> 又逢印
-> 帶忌
```

Here Resource is not rescue.

It interferes with the local Food-controls-Kill path.

## 26. 七煞 — explicit multi-step rescue

The most important ordered rescue chain in R133 is:

```text
煞
 |
 v
食制
 |
 v
印護煞
 |
 v
財去印
 |
 v
存食
```

The base text explicitly preserves this local sequence.

R126 had already shown why it cannot be converted into equal scalar units.

R133 now adds the graph-level conclusion:

```text
local sequence
!= global actor precedence
```

## 27. Counterexample 1 — 財去印 has opposite functions

Compare:

```text
R024 印 context:
財去印
-> 存煞
-> contamination

R027 七煞 context:
財去印
-> 存食
-> rescue
```

Therefore:

```text
財去印
!= intrinsically rescue

財去印
!= intrinsically failure
```

## 28. Counterexample 2 — 印 rescues 官 but contaminates 七煞食制

Compare:

```text
官逢傷
-> 印
-> rescue

煞逢食制
-> 印
-> contamination
```

Therefore:

```text
印
!= universal rescue actor
```

## 29. Counterexample 3 — 合 can rescue or contaminate

Compare:

```text
煞逢合
-> rescue

財逢合
-> contamination
```

Therefore:

```text
合
!= universal conflict winner
```

## 30. Counterexample 4 — 財 protects 食 but damages 印

Compare:

```text
食逢梟
-> 生財護食
-> rescue

印輕逢財
-> failure
```

Therefore:

```text
財
!= fixed favorable actor
```

## 31. Counterexample 5 — 煞 can support 印 but break 財

Compare:

```text
印輕逢煞
-> bounded success proposition

財透七煞
-> bounded failure proposition
```

Therefore:

```text
煞
!= fixed unfavorable actor
```

## 32. Counterexample 6 — 財逢劫 rescue alternatives are unordered

Graph:

```text
             ┌─> 透食以化
財逢劫 ------|
             └─> 生官以制
```

There is no governed edge:

```text
透食 -> 生官
```

or:

```text
生官 -> 透食
```

R133 therefore rejects rescue ranking.

## 33. Counterexample 7 — 食逢梟 rescue can preserve or redirect

Graph:

```text
             ┌─> 就煞        [redirect]
食逢梟 ------|
             └─> 生財護食    [preserve]
```

A generic state named merely RESCUED would lose a material semantic distinction.

## 34. Counterexample 8 — local graphs cannot be unioned into one global DAG

Across the corpus:

```text
印 can rescue
印 can contaminate

財 can rescue
財 can contaminate

合 can rescue
合 can contaminate

煞 can support
煞 can damage
```

A global graph union would therefore erase the configuration that gives each edge meaning.

R133 explicitly rejects:

```text
LOCAL_GRAPH_A
+
LOCAL_GRAPH_B
=
GLOBAL_PRECEDENCE_DAG
```

## 35. Source sentence order audit

The base text lists multiple rescue forms sequentially.

That textual order is evidence that the propositions are presented in a sequence of examples.

It is not evidence that a runtime engine should evaluate them in that order.

R133 locks:

```text
sourceSentenceOrderIsRuntimeOrder = false
```

for every scenario.

## 36. First-match audit

A first-match resolver would be especially unsafe for:

```text
財逢劫
食逢梟
財逢煞
```

because the source lists alternative rescue paths without a generalized winner predicate.

R133 therefore locks:

```text
firstMatchWinsAuthorized = false
```

## 37. Numeric priority audit

No reviewed source supplies a numeric rescue weight such as:

```text
印 rescue = +2
財 rescue = +1
合 rescue = +3
```

No source supplies a universal priority table such as:

```text
印 > 財 > 食 > 官
```

R133 locks:

```text
numericRescueWeightAuthorized = false
globalRelationPrecedenceAuthorized = false
```

## 38. Rescue resolver remains blocked

Every rescue path retains unresolved operands.

Examples:

```text
傷剋 effectiveness
印制傷 effectiveness
合 effectiveness
制煞 effectiveness
財去印 effectiveness
relative strength
position/configuration
switch conditions
interaction settlement
```

Therefore:

```text
source rescue proposition
!= executable rescue predicate
```

## 39. Candidate and establishment boundary

R131 remains controlling.

R133 operates below the missing executable establishment bridge.

R133 does not authorize:

```text
candidate identity
candidate ranking
candidate precedence
establishment predicate
canonical terminal state
```

## 40. Relationship to R132

R132 established:

```text
signal order
!= candidate precedence
```

R133 adds:

```text
rescue sentence order
!= runtime precedence
```

These are distinct boundaries.

Neither supplies the missing canonical candidate or establishment resolver.

## 41. Relationship to R126

R126 established:

```text
local causal ordering observed
global relation precedence unauthorized
scalar aggregation unauthorized
```

R133 sharpens the same problem specifically for pattern rescue/failure graphs.

The new contribution is the explicit counterexample graph showing the same actor or mechanism taking opposite bounded functions.

## 42. Machine-readable invariants

Every R133 scenario keeps:

```text
sourceSentenceOrderIsRuntimeOrder = false
numericPrecedenceAuthorized = false
globalPrecedenceAuthorized = false
rescueResolverAuthorized = false
candidateIdentityAuthorized = false
establishmentAuthorized = false
candidateFactsEmitted = false
establishmentFactsEmitted = false
```

Every graph edge keeps:

```text
localOnly = true
globalPrecedenceAuthorized = false
```

## 43. Rejected globalizations

R133 explicitly rejects:

```text
RESCUE_PRESENT_EQUALS_RESCUE_WINS

SOURCE_SENTENCE_ORDER_EQUALS_RUNTIME_PRECEDENCE

FIRST_MATCH_EQUALS_FINAL_OUTCOME

LOCAL_RESCUE_CHAIN_EQUALS_GLOBAL_DAG

SAME_ACTOR_EQUALS_SAME_FUNCTION_ACROSS_CONTEXTS

COMBINATION_EQUALS_UNIVERSAL_RESCUE

WEALTH_REMOVES_RESOURCE_EQUALS_UNIVERSAL_RESCUE

RESOURCE_EQUALS_UNIVERSAL_RESCUE

ALTERNATIVE_RESCUES_ARE_SOURCE_RANKED

RESCUE_PROPOSITION_EQUALS_EXECUTABLE_RESCUE_PREDICATE

RESCUE_OBSERVED_EQUALS_ESTABLISHED_PATTERN

LOCAL_ORDER_EQUALS_NUMERIC_PRIORITY
```

## 44. R134 handoff

R134 is:

```text
Special-pattern exit-condition adversarial corpus
```

R133 hands forward two constraints that matter directly to R134:

```text
broken ordinary path
must still check bounded rescue possibilities

rescue absence / failure
does not automatically authorize a special-pattern transition
```

R134 must therefore test exit conditions adversarially rather than treating ordinary-pattern damage as an automatic special-pattern entry signal.

## 45. Final authority status

```text
local source ordering
= OBSERVED

local rescue ordering
= OBSERVED

local contamination ordering
= OBSERVED

preserve-vs-redirect rescue distinction
= OBSERVED

same-actor opposite function
= OBSERVED

global relation precedence
= NOT AUTHORIZED

global acyclic precedence graph
= NOT AUTHORIZED

numeric rescue weight
= NOT AUTHORIZED

rescue ranking
= NOT AUTHORIZED

first-match-wins
= NOT AUTHORIZED

rescue resolver
= NOT AUTHORIZED

candidate identity
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
