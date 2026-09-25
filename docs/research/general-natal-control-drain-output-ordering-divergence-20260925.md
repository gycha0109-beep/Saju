# R126 — Control, drain, and output ordering divergence study

Date: 2026-09-25  
Issue: #1519  
Track: saju-research  
Status: RESEARCH CONTROL / DRAIN / OUTPUT ORDERING DIVERGENCE COMPLETE

## 1. Research question

R126 audits whether the current research-level strength collector's three "challenging" relation families can be treated as one semantic or scalar class:

~~~text
output / 食傷 / 我生
wealth / 財 / 我克
officer-kill / 官殺 / 克我
~~~

The reviewed corpus says they may all matter to day-master strength analysis, but it does **not** support treating them as equal negative units.

## 2. Current repository starting point

I13 intentionally records:

~~~text
peer      -> supporting
resource  -> supporting

output    -> challenging
wealth    -> challenging
officer   -> challenging
~~~

with:

~~~text
weight = not_assigned
overallStrength = not_determined
~~~

R126 preserves that collection boundary.

It does not rewrite I13.

It instead audits whether the shared "challenging" category can safely become:

~~~text
output = -1
wealth = -1
officer = -1
~~~

The answer from the reviewed corpus is no.

## 3. Corpus

R126 contains:

~~~text
cases             = 24
comparison groups = 11
~~~

The corpus covers:

- direct control;
- useful and obstructed output/leakage;
- wealth-capacity contexts;
- output -> wealth generation;
- wealth -> officer/kill generation;
- output controls kill;
- rescue and contamination chains;
- position-dependent settlement;
- global-precedence and double-counting audits.

## 4. Output is not pure leakage

The source preserves:

~~~text
身印兩旺而用食傷洩氣
~~~

This is critical.

The bounded implication is:

~~~text
output/leakage can be useful
when body/resource are already strong in that source context
~~~

Therefore:

~~~text
OUTPUT_ALWAYS_NEGATIVE
~~~

is rejected.

This does not mean output is always beneficial.

The same source also preserves 食神 being constrained by 梟/印 and needing rescue in other contexts.

## 5. 食神 and 傷官 can generate 財

The source directly preserves:

~~~text
食神生財
傷官生財
~~~

This establishes local causal chains:

~~~text
OUTPUT
-> WEALTH
~~~

The research implication is not a score.

It is:

~~~text
output presence
and
wealth presence

may belong to one causal path
~~~

Therefore independent counting creates a double-counting risk.

## 6. 傷官 -> 財 -> 煞

Selected commentary preserves:

~~~text
傷官生財
帶煞則財轉而生煞
~~~

The semantic chain is:

~~~text
傷官
-> 財
-> 煞
~~~

This is one of the clearest R126 counterexamples against:

~~~text
傷官 = -1
財   = -1
煞   = -1
total = -3
~~~

The source supplies ordered causal meaning, not three independent equal penalties.

## 7. 財 can generate 官 or 煞

The reviewed material preserves:

~~~text
財生官旺
財生煞
財多生煞
~~~

Therefore wealth is not semantically exhausted by an expenditure/drain interpretation.

It may also become an intermediate generator of a control actor.

Thus:

~~~text
WEALTH
!= fixed drain-only primitive
~~~

## 8. 食神 can control 煞

The source preserves:

~~~text
食神制煞
~~~

This matters because the same 食神 can participate in:

~~~text
DAY MASTER -> OUTPUT
OUTPUT -> control KILL
~~~

A single actor can therefore carry more than one semantic role.

R126 rejects:

~~~text
SAME_ACTOR_CAN_ONLY_HAVE_ONE_ROLE
~~~

and also rejects the opposite shortcut:

~~~text
食神制煞
=> output leakage no longer matters
~~~

The source does not provide that simplification either.

## 9. Control depends on context

The source preserves:

~~~text
身強七煞逢制
~~~

as a bounded successful condition.

It also preserves adverse contexts where:

~~~text
財生煞
無制
~~~

creates failure.

Selected commentary further preserves:

~~~text
身弱官重
-> 印化官
~~~

The resulting R126 distinction is:

~~~text
control actor present
!= control outcome settled
~~~

Body state, control state, and mediation all matter.

## 10. 財 is capacity-sensitive

三命通會 preserves:

~~~text
財多身弱
財旺身衰
~~~

and also a bounded remedy:

~~~text
財多身弱
-> 印扶身
~~~

This gives direct strength-context evidence that 財 cannot be represented as one fixed drain coefficient.

The source compares:

~~~text
wealth state
against
day-master capacity
~~~

rather than assigning a fixed subtraction.

## 11. 財輕比重 is relational

子平真詮 preserves:

~~~text
財輕比重
~~~

with the bounded interpretation that peer force can divide or take wealth.

Again:

~~~text
WEALTH PRESENT
~~~

does not settle the result.

The relation depends on relative configuration.

The qualitative terms 輕 / 重 are not converted into numeric ratios.

## 12. Contamination chain: 七煞 + 食制 + 印

The source preserves:

~~~text
七煞逢食制而又逢印
~~~

as a contamination structure.

This means:

1. kill exists;
2. food controls kill;
3. resource arrives;
4. the prior settlement changes.

Thus the meaning of 印 cannot be read independently of the prior 食制煞 relation.

This is local ordering evidence.

It is not a global precedence rule.

## 13. Multi-step rescue: 食制煞 -> 印護煞 -> 財去印存食

The source directly preserves:

~~~text
煞逢食制
-> 印來護煞
-> 財去印
-> 存食
~~~

This is the strongest ordered-relation case in R126.

The same 財 that may be adverse elsewhere acts as rescue here because it removes 印 and restores the 食制煞 path.

Therefore:

~~~text
actor type
!= fixed polarity
~~~

and:

~~~text
local rescue order
!= global runtime precedence
~~~

## 14. 財逢劫 -> 透食以化之

The source preserves:

~~~text
財逢劫
-> 透食
-> 化之
~~~

Here output mediates a conflict between wealth and peer.

That directly rejects:

~~~text
OUTPUT_ONLY_MEANS_LEAKAGE
~~~

and:

~~~text
WEALTH + PEER + OUTPUT
= three independent scalar terms
~~~

## 15. 官逢傷 -> 透印以解之

The source also preserves:

~~~text
官逢傷
-> 透印
-> 解之
~~~

The meaning of officer, hurting officer, and resource is relational.

The actor set by itself does not settle the outcome.

## 16. Position matters

子平真詮 preserves:

~~~text
財格透印而位置妥貼
兩不相剋
~~~

This is an explicit warning against unordered actor-set reasoning.

The same broad actor types may settle differently depending on position and obstruction.

R126 does not invent a complete positional resolver.

It only preserves:

~~~text
position can matter
actor presence is insufficient
~~~

## 17. Pattern evidence is not automatically strength evidence

Many of the strongest ordered chains come from:

~~~text
成格
敗格
救應
~~~

contexts.

R126 therefore records scope per row:

~~~text
STRENGTH_CONTEXT
PATTERN_CONTEXT
BOTH_EXPLICIT
UNCERTAIN_TRANSFER
~~~

This prevents:

~~~text
pattern success
=> positive strength score

pattern failure
=> negative strength score
~~~

No such transfer is authorized.

## 18. Double-counting audit

R126 identifies repeated causal-chain double-counting risk.

Examples:

~~~text
食神 -> 財
傷官 -> 財
財 -> 官
財 -> 煞
傷官 -> 財 -> 煞
~~~

If each actor were independently counted merely because I13 calls the relation "challenging", a single source-local causal path could be counted multiple times.

Therefore:

~~~text
chain membership
!= independent countability
~~~

is a core R126 boundary.

## 19. No global precedence

R126 confirms local ordering.

It does **not** establish:

~~~text
always evaluate output first
then wealth
then officer/kill
~~~

The reviewed corpus contains:

- generative order;
- control order;
- contamination order;
- rescue order;
- position-dependent settlement.

No one actor-type sequence explains all of them.

Therefore:

~~~text
GLOBAL RELATION PRECEDENCE
= NOT AUTHORIZED
~~~

## 20. Main distinctions

| Dimension | Output / 食傷 | Wealth / 財 | Control / 官殺 |
| --- | --- | --- | --- |
| Broad strength collector role | challenging | challenging | challenging |
| Core source behavior | 洩 / 生出 / 制 | capacity / 生官煞 / target of peer | 克 / pressure / regulated actor |
| Can be useful | yes, bounded | yes, bounded | yes, bounded |
| Can be adverse | yes, bounded | yes, bounded | yes, bounded |
| Can generate another actor | wealth | officer/kill | not established as same mechanism |
| Can control another actor | kill | indirect rescue/removal paths | itself may require control |
| Fixed polarity authorized | no | no | no |
| Equal scalar unit authorized | no | no | no |
| Global order authorized | no | no | no |

## 21. R126 machine-readable result

~~~text
control mechanism observed              = yes
output/leakage mechanism observed       = yes
wealth-capacity mechanism observed      = yes

local generative ordering observed      = yes
local control ordering observed         = yes
local rescue ordering observed          = yes
local contamination ordering observed   = yes
position-dependent settlement observed  = yes

challenging mechanism equivalence       = not established
independent chain counting              = not authorized
generic challenging scalar              = not authorized
global relation precedence              = not authorized
numeric strength weights                = not authorized
pattern -> strength transfer             = not authorized
final 強弱 / 旺衰                        = not authorized
~~~

## 22. Rejected derivations

R126 explicitly rejects:

~~~text
OFFICER = -1
OUTPUT = -1
WEALTH = -1

challenging count = strength

relation-list order = semantic order
Ten-God enum order = interpretive order
source sentence order = runtime precedence

output always negative
wealth always drain
officer/kill always negative

食神制煞 means output has no leakage role

one actor can have only one role

chain components can be summed independently

pattern success = strength score

local order = global precedence
~~~

## 23. Repository implication

R126 does not invalidate I13.

I13 remains a research-level evidence collector.

The correct interpretation is:

~~~text
I13 "challenging"
= broad collection direction

not
= semantic equivalence
not
= scalar polarity
not
= aggregation rule
not
= ordering rule
~~~

Any later strength resolver must preserve these R126 distinctions.

## 24. R127 handoff

R127 studies:

~~~text
Strength-label instability under single-feature perturbation
~~~

R126 supplies a necessary precondition.

When R127 perturbs one feature, it must not assume:

~~~text
+ 食神 == -1
+ 財   == -1
+ 官   == -1
~~~

Instead it must preserve the relation-specific mechanism and local chain context.

That makes R127 an instability study rather than a hidden numeric scoring exercise.

## 25. Final status

~~~text
R126
= RESEARCH CONTROL / DRAIN / OUTPUT ORDERING DIVERGENCE COMPLETE

CONTROL
= DISTINCT QUALITATIVE MECHANISM OBSERVED

OUTPUT
= DISTINCT QUALITATIVE MECHANISM OBSERVED

WEALTH / CAPACITY
= DISTINCT QUALITATIVE MECHANISM OBSERVED

LOCAL ORDERING
= OBSERVED

GLOBAL PRECEDENCE
= NOT AUTHORIZED

GENERIC CHALLENGING SCALAR
= NOT AUTHORIZED

INDEPENDENT CHAIN COUNTING
= NOT AUTHORIZED

NUMERIC STRENGTH WEIGHTS
= NOT AUTHORIZED

FINAL 強弱 / 旺衰
= NOT AUTHORIZED

AUTHORITY NOT GRANTED
ENGINE ADMISSION NOT GRANTED
PREVIEW/PRODUCTION AUTHORITY NOT GRANTED
~~~

RESEARCH COMPLETE.  
AUTHORITY NOT GRANTED.

## Source surfaces

- 子平真詮 / 子平真詮評註 / 論用神成敗救應:
  https://www.ncc.com.tw/fate/paleo/bg/bg_033.htm
- 子平真詮 original-text comparison:
  https://donglishuzhai.net/chapter/3722.html
- 三命通會 卷六:
  https://zh.wikisource.org/zh-hant/三命通會/卷六
