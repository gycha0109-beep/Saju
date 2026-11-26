# R130 — Strength-rule minimal-sufficient-predicate audit

Date: 2026-09-25
Issue: #1583
Track: saju-research
Status: RESEARCH STRENGTH MINIMAL-SUFFICIENT PREDICATE AUDIT COMPLETE

## 1. Purpose

R130 is the final audit in the R121–R130 strength-reasoning/falsification group.

It asks whether rule-like strength claims are actually necessary, sufficient, or minimal under the governed evidence.

R130 does not build a final strength classifier.

## 2. Core logical asymmetry

R130 uses counterexamples asymmetrically:

~~~text
one valid counterexample
can falsify a universal sufficient rule

one positive example
cannot prove universal sufficiency
~~~

This principle drives the entire audit.

## 3. Audit corpus

~~~text
candidate rule audits                   = 36
target families                         = 12
counterexample-backed falsifications    = 11
predicate-removal audits                = 31
addition/monotonicity audits            = 14
circularity audits                      = 3
policy-blocked audits                   = 3
source-native label targets             = 15
~~~

## 4. Necessity / sufficiency / minimality are separate

R130 distinguishes:

~~~text
NECESSARY
= source/removal evidence shows the target cannot be maintained without the predicate

SUFFICIENT
= the predicate set is source-supported as enough for the target in the stated scope

MINIMAL SUFFICIENT
= sufficient, and every predicate is individually necessary
~~~

Co-occurrence is not enough for any of these claims.

## 5. Season-only rules are falsified

R130 formally rejects:

~~~text
得時 -> 旺
失時 -> 弱
~~~

using the direct counterexamples:

~~~text
得時而不旺
失時而不弱
~~~

These are universal-sufficiency falsifications, not merely caveats.

## 6. Native label normalization is blocked

R130 also preserves the R128 vocabulary boundary:

~~~text
不旺 != 弱
不弱 != 強
旺 != 強
衰 != 弱
~~~

No binary normalization is inserted into the audit.

## 7. Spring-Wood exact bundle

The spring-Wood source case preserves:

~~~text
春木
+ 得時
+ heavy Metal opposition
+ 無火制
-> 不旺
~~~

R130 records this as:

~~~text
EXACT_CASE_ONLY
~~~

Removal of 得時, heavy Metal opposition, or 無火制 cannot currently be evaluated with a source-labeled paired case.

Therefore the bundle is observed but not minimal.

## 8. Autumn-Wood exact bundle

The autumn-Wood source case preserves:

~~~text
秋木
+ 失時
+ visible 甲乙
+ 寅卯 root
+ 木根深
-> 不弱
~~~

Again, the exact source bundle is preserved.

But the corpus does not establish which individual constituent is necessary.

R127 explicitly withholds the no-root counterfactual label.

## 9. Four-Xin / Four-Bing falsification

R130 uses the exact cases:

~~~text
四辛卯，金不通根，雖天元一氣，仍作弱論
四丙申，火不通根，雖天元一氣，仍作弱論
~~~

to falsify:

~~~text
repeated visible peer support
-> 強
~~~

This is one of the strongest anti-counting results in the strength corpus.

## 10. Repeated-visible + no-root is still not a universal rule

The same two cases may tempt the rule:

~~~text
repeated visible support + no root
-> 弱
~~~

R130 does not universalize it.

The result is:

~~~text
two exact weak-labeled cases
= observed

universal sufficiency
= not established

minimality
= not established
~~~

## 11. One-root rules remain unproven

R130 audits:

~~~text
one root -> 強
one root -> 不弱
~~~

Both remain:

~~~text
INSUFFICIENT_EVIDENCE
~~~

R127's synthetic root-addition probes deliberately withhold the post-addition label.

Therefore a positive root remains support evidence, not a final-label theorem.

## 12. Heavy root is not a final-label predicate

R130 audits:

~~~text
HEAVY_ROOT_CLASS_BOUNDED -> 強
~~~

and finds no sufficient final-label rule.

重/輕 remains qualitative.

## 13. Month-root priority is not a global override

R130 formally falsifies:

~~~text
MONTH_ROOT_PRIORITY_WITHIN_TONGGEN
-> global chart override
~~~

because the month-root statement is source-scoped and Yuanhai anti-rigidity evidence rejects exclusive month authority.

## 14. Mixed support bundle

The bounded 比印 + root support case reaches:

~~~text
黨眾 / 不弱
~~~

But R130 cannot establish a minimal set from:

~~~text
PEER
RESOURCE
ROOT
ACCUMULATION
~~~

because removing each constituent lacks a source-labeled paired result.

## 15. Peer support alone is not sufficient

R130 formally rejects:

~~~text
PEER_SUPPORT_PRESENT -> 強
~~~

using the rootless repeated-stem weak examples.

## 16. Resource support alone is not sufficient

R130 does not find direct evidence that:

~~~text
RESOURCE_SUPPORT_PRESENT -> 強
~~~

Therefore this remains insufficient evidence rather than a supported rule.

## 17. Resource monotonicity is falsified

R125 preserves both favorable resource-multiplicity contexts and adverse 多/太過 contexts.

Therefore:

~~~text
more resource
-> always more favorable
~~~

is rejected.

No exact numeric multiplicity boundary is inferred.

## 18. Output fixed polarity is falsified

R130 rejects:

~~~text
OUTPUT_RELATION_PRESENT
-> always adverse
~~~

because:

~~~text
身印兩旺而用食傷洩氣
~~~

preserves a bounded context in which output leakage is useful.

## 19. Wealth fixed polarity is falsified

R130 rejects:

~~~text
WEALTH_RELATION_PRESENT
-> always adverse
~~~

because wealth can participate in:

~~~text
財生官
財生煞
財去印存食
~~~

and the last relation is a local rescue sequence.

## 20. Control fixed polarity is falsified

R130 rejects:

~~~text
CONTROL_RELATION_PRESENT
-> always adverse
~~~

because local context can include:

~~~text
食神制煞
身強七煞逢制
~~~

The control actor is context-sensitive.

## 21. Resource fixed beneficial polarity is falsified

R130 also rejects the opposite simplification:

~~~text
RESOURCE_SUPPORT_PRESENT
-> always beneficial
~~~

because:

~~~text
七煞逢食制而又逢印
~~~

is preserved as a contamination case.

## 22. Bounded relation-function rules survive

Not every rule-like proposition is rejected.

R130 preserves source-local non-final relation functions such as:

~~~text
食神制煞
七煞逢食制而又逢印
財去印存食
~~~

These receive:

~~~text
BOUNDED_SOURCE_RULE_SUPPORTED
~~~

but only for their local relation-function targets.

They are not whole-chart strength rules.

## 23. Addition sensitivity is first-class

R130 records source-backed local additions:

~~~text
七煞 + 食神
-> 食神制煞

食制煞 + 印
-> contamination

食制煞 + 印 + 財
-> 財去印存食 rescue
~~~

This directly rejects naive monotonic assumptions such as:

~~~text
support added -> always better
challenge added -> always worse
~~~

## 24. Circularity guard

R130 explicitly detects target leakage.

Examples:

~~~text
財多身弱 -> 弱
身強七煞逢制 -> 強
財旺身衰 -> 衰
~~~

These phrases already contain the target condition.

They cannot serve as non-circular proofs of the target.

R130 records them as:

~~~text
CIRCULAR_TARGET_LEAKAGE
~~~

## 25. Yang Muku survives as a bounded non-final rule

The governed non-Earth Yang own-Muku matcher remains:

~~~text
BOUNDED_SOURCE_RULE_SUPPORTED
~~~

for bounded root status only.

It does not imply final strength.

## 26. Yin Muku is policy-blocked

R130 does not choose between competing source strata for Yin Muku.

Result:

~~~text
POLICY_DEPENDENT
POLICY_BLOCKED
~~~

## 27. Yang Changsheng survives as a bounded non-final rule

The governed Yang Changsheng matcher remains a bounded heavy-root rule.

Again:

~~~text
root-status sufficiency
!= final strength sufficiency
~~~

## 28. Yin Changsheng is policy-blocked

The explicit Yin exception and broader competing wording prevent one source-neutral heavy-root rule.

R130 fails closed.

## 29. Lu / Wang bounded root rules

Governed source-native 祿 and 旺 root semantics remain bounded non-final rule candidates.

R130 explicitly does not bridge:

~~~text
臨官 -> 祿
帝旺 -> 旺
~~~

without separate authority.

## 30. Earth Muku remains blocked

No universal Earth Muku mapping is invented.

Result:

~~~text
POLICY_DEPENDENT
POLICY_BLOCKED
~~~

## 31. Yuqi fixed-light rule is falsified

R130 rejects:

~~~text
Yuqi
-> one timeless fixed light-root state
~~~

because the source preserves qualitative temporal variation between:

~~~text
清明後十二日
and
土旺之後
~~~

No numeric temporal function is inferred.

## 32. Actual necessity / sufficiency / minimality results

R130 reports actual counts rather than forcing discoveries:

~~~text
necessity established              = 0
bounded sufficiency established    = 7
minimality established             = 0
~~~

The seven bounded sufficiency results are non-final source-local/root-status rules.

No global final-strength sufficient rule is established.

No minimal sufficient whole-chart strength set is established.

## 33. Why zero minimal sets is a valid result

R130 does not require the research to find a minimal sufficient final-strength set.

~~~text
minimalityEstablishedCount = 0
~~~

is a valid closure result because the available evidence does not supply the required removal/paired comparisons.

## 34. Monotonicity result

The reviewed evidence does not authorize:

~~~text
more support -> always stronger
more challenge -> always weaker
more resource -> always better
one root added -> opposite strength label
~~~

Local relation chains and policy-sensitive root semantics break these shortcuts.

## 35. Main R130 finding

The strongest final conclusion is:

~~~text
source-observed case bundles
= real

bounded non-final relation/root rules
= real

global strength necessities
= not established

global final-strength sufficiency
= not established

global minimal sufficient set
= not established
~~~

## 36. Rejected derivations

R130 explicitly rejects:

~~~text
POSITIVE CASE = SUFFICIENCY PROOF
SOURCE CASE BUNDLE = MINIMAL PREDICATE SET
CO-OCCURRENCE = NECESSITY
CO-OCCURRENCE = SUFFICIENCY
SUFFICIENCY WITHOUT REMOVAL AUDIT = MINIMALITY
POLICY-SENSITIVE PREDICATE = UNIVERSAL RULE
SOURCE-NATIVE LABEL = NORMALIZED BINARY LABEL
LOCAL RELATION SETTLEMENT = WHOLE-CHART STRENGTH
COUNTERFACTUAL LABEL CAN BE INVENTED
NO MINIMAL SET FOUND = LICENSE TO SCORE
TEXTUALLY DEPENDENT REPETITION = REPLICATED RULE
TARGET LEAKAGE = VALID RULE
~~~

## 37. Machine-readable result

~~~text
candidate rule audit                    = COMPLETE
counterexample falsification            = OPERATIONAL
predicate-removal audit                 = OPERATIONAL
addition sensitivity audit              = OPERATIONAL
circularity guard                       = OPERATIONAL
source-policy blocking                  = OPERATIONAL

bounded non-final predicate rules       = OBSERVED

global necessary predicate              = NOT ESTABLISHED
global final-strength sufficiency       = NOT ESTABLISHED
global minimal sufficient strength set  = NOT ESTABLISHED

numeric strength rule                   = NOT AUTHORIZED
final 強弱 classifier                   = NOT AUTHORIZED
final 旺衰 classifier                   = NOT AUTHORIZED
~~~

## 38. R121–R130 closure

R130 closes the strength-reasoning/falsification group:

~~~text
R121
dependency map

R122–R128
counterexamples / perturbations / source divergence

R129
non-numeric explanation vocabulary

R130
necessity / sufficiency / minimality audit
~~~

The result is not a finished strength engine.

It is a formal map of what can and cannot currently be claimed as a rule.

## 39. Next frontier

The next frontier is R131:

~~~text
Pattern candidate versus establishment formal-boundary audit
~~~

This moves from strength reasoning into structure/methodology composition.

## 40. Final status

~~~text
R130
= RESEARCH STRENGTH MINIMAL-SUFFICIENT PREDICATE AUDIT COMPLETE

COUNTEREXAMPLE-BACKED FALSIFICATION
= OPERATIONAL

REMOVAL / ADDITION AUDITS
= OPERATIONAL

CIRCULARITY / POLICY BLOCKING
= OPERATIONAL

GLOBAL NECESSITY
= NOT ESTABLISHED

GLOBAL FINAL-STRENGTH SUFFICIENCY
= NOT ESTABLISHED

GLOBAL MINIMAL SUFFICIENT SET
= NOT ESTABLISHED

NUMERIC STRENGTH RULE
= NOT AUTHORIZED

FINAL 強弱 / 旺衰
= NOT AUTHORIZED

AUTHORITY NOT GRANTED
ENGINE ADMISSION NOT GRANTED
PREVIEW/PRODUCTION AUTHORITY NOT GRANTED
~~~

RESEARCH COMPLETE.
AUTHORITY NOT GRANTED.

## Repository evidence surfaces

- R121 root-strength dependency map
- R122 season/root interaction counterexamples
- R124 support accumulation/saturation audit
- R125 peer/resource support discriminant corpus
- R126 control/drain/output ordering divergence
- R127 single-feature perturbation audit
- R128 cross-surface borderline-strength adjudication
- R129 non-numeric strength explanation primitives
- R014/R015/R016/R017 governed root-semantics studies