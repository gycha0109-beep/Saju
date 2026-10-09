# R129 — Non-numeric strength explanation primitive inventory

Date: 2026-09-25
Issue: #1565
Track: saju-research
Status: RESEARCH NONNUMERIC STRENGTH EXPLANATION PRIMITIVE INVENTORY COMPLETE

## 1. Purpose

R129 turns the bounded findings from R121–R128 into a reusable research explanation vocabulary.

The inventory is intentionally non-executive.

~~~text
observed fact
-> explanation primitive
!= adjudication rule
!= final 強弱/旺衰
~~~

R129 therefore provides semantic building blocks for later research without introducing a hidden score.

## 2. Inventory size

~~~text
primitives        = 55
semantic families = 9
primitive relations = 46
~~~

The families are:

- season/month context
- root evidence
- root quality
- source-scoped root policy
- hidden-stem semantics
- support relations
- challenging-side relations
- relation chains
- uncertainty/policy boundaries

## 3. Four-layer boundary

R129 keeps four layers separate:

~~~text
FACT
= source/runtime fact

EXPLANATION PRIMITIVE
= one bounded semantic meaning

ADJUDICATION
= composition of multiple predicates

FINAL LABEL
= 強 / 弱 / 旺 / 衰 etc.
~~~

Only the explanation-primitive layer is created here.

## 4. Season primitives

R129 admits:

~~~text
SEASON_CONTEXT_FAVORABLE
SEASON_CONTEXT_UNFAVORABLE
SEASON_ALONE_NOT_DECISIVE
~~~

The critical bounded rule is:

~~~text
得時
!= 旺/強 settled

失時
!= 弱/衰 settled
~~~

This preserves the R122/R127 counterexamples 得時而不旺 and 失時而不弱.

## 5. Month primitives

R129 separates:

~~~text
MONTH_CONTEXT_IMPORTANT_BOUNDED
MONTH_CONTEXT_NOT_EXCLUSIVE
MONTH_ROOT_PRIORITY_WITHIN_TONGGEN
~~~

This avoids the false collapse:

~~~text
month important
=> month overrides all other evidence
~~~

The month-root priority primitive remains explicitly scoped to Tonggen comparison.

## 6. Root presence

R129 admits positive bounded root explanation:

~~~text
ROOT_SUPPORT_PRESENT_BOUNDED
~~~

while separately preserving:

~~~text
ROOT_STATUS_UNRESOLVED_OUTSIDE_GOVERNED_SCOPE
~~~

Therefore:

~~~text
no positive match
!= global 無根
~~~

## 7. Tougan and Tonggen

R129 admits:

~~~text
TOUGAN_TONGGEN_DISTINCT
~~~

Stem visibility and branch rootedness are separate relations.

Neither is converted into a numeric strength amount.

## 8. Root quality

R129 admits:

~~~text
ROOT_QUALITY_MATTERS
HEAVY_ROOT_CLASS_BOUNDED
LIGHT_ROOT_CLASS_BOUNDED
VISIBLE_SUPPORT_NOT_EQUIVALENT_ROOT
ROOT_QUALITY_NOT_NUMERIC_WEIGHT
~~~

The stable qualitative idea is:

~~~text
root quality matters
visible peer count does not freely replace root
~~~

The rejected inference is:

~~~text
重 / 輕
=> coefficient
~~~

## 9. Yuqi

R129 preserves three separate Yuqi meanings:

~~~text
YUQI_ROOT_EVIDENCE_BOUNDED
YUQI_TEMPORAL_VARIABILITY
YUQI_TEMPORAL_WEIGHT_NOT_AUTHORIZED
~~~

This allows the source-observed temporal nuance to remain visible without inventing a time-weight function.

## 10. Muku

R129 separates:

~~~text
MUKU_YANG_ROOT_BOUNDED
MUKU_YIN_POLICY_DIVERGENT
EARTH_MUKU_UNRESOLVED
~~~

The Yang bounded authority is not copied to Yin or Earth.

Policy divergence is represented as an explanation boundary rather than a default rule.

## 11. Changsheng / Lu / Wang

R129 admits bounded primitives for:

~~~text
YANG_CHANGSHENG_ROOT_BOUNDED
LU_ROOT_BOUNDED
WANG_ROOT_BOUNDED
~~~

and a policy boundary for:

~~~text
YIN_CHANGSHENG_POLICY_DIVERGENT
~~~

It also admits:

~~~text
TWELVE_GROWTH_STAGE_NOT_AUTOMATIC_ROOT_CLASS
~~~

so 臨官/帝旺 stage labels do not silently become executable 祿/旺 root classes.

## 12. Hidden stems

R129 preserves:

~~~text
HIDDEN_STEM_MEMBERSHIP_NOT_DEPTH
HIDDEN_TRANSPARENCY_CAN_CHANGE_ROLE
HIDDEN_ROLE_NOT_STRENGTH_LABEL
~~~

Storage-array order remains non-semantic.

Source-local transparency may change qualitative hidden-stem role, but that role does not become a final strength label.

## 13. Peer support

R129 admits:

~~~text
PEER_SUPPORT_PRESENT
~~~

but explicitly rejects:

~~~text
peer present
=> 黨眾 settled
=> 強 settled
~~~

Exact rootless repeated-stem examples remain a counterweight to visible-count simplification.

## 14. Resource support

R129 admits:

~~~text
RESOURCE_SUPPORT_PRESENT
PEER_RESOURCE_MECHANISM_DISTINCT
~~~

Peer and resource can both support in a broad sense while remaining different mechanisms.

They are not one-for-one support units.

## 15. Support accumulation

R129 intentionally keeps two primitives together:

~~~text
SUPPORT_ACCUMULATION_QUALITATIVE
SUPPORT_THRESHOLD_NOT_ESTABLISHED
~~~

This means several support relations may matter together, while no universal count threshold or saturation point is authorized.

## 16. Support is not a final label

R129 admits:

~~~text
SUPPORT_FAMILY_PRESENCE_NOT_FINAL_STRENGTH
~~~

This blocks a downstream shortcut from constituent support evidence to 強/旺.

## 17. Output

R129 separates:

~~~text
OUTPUT_RELATION_PRESENT
OUTPUT_CAN_FUNCTION_AS_LEAKAGE
OUTPUT_CAN_BE_USEFUL_OVER_SUPPORTED_CONTEXT
~~~

Output can participate in leakage, generation, or control depending on context.

Therefore it is not encoded as a fixed negative point.

## 18. Wealth

R129 separates:

~~~text
WEALTH_RELATION_PRESENT
WEALTH_CAPACITY_DEPENDENT
WEALTH_CAN_FEED_CONTROL
~~~

Wealth can be interpreted relative to day-master capacity and can also generate officer/kill relations.

It is not reduced to a fixed drain coefficient.

## 19. Control

R129 admits:

~~~text
CONTROL_RELATION_PRESENT
CONTROL_EFFECT_CONTEXT_DEPENDENT
~~~

Officer/kill presence is explained as a control relation whose effect depends on body state and mediation/control context.

## 20. Relation chains

R129 admits:

~~~text
RELATION_CHAIN_PRESENT
SAME_ACTOR_MULTIPLE_ROLES
OUTPUT_GENERATES_WEALTH
OUTPUT_CONTROLS_KILL
WEALTH_GENERATES_CONTROL
LOCAL_CHAIN_ORDER_MATTERS
LOCAL_ORDER_NOT_GLOBAL_PRECEDENCE
~~~

These primitives preserve causal/control/rescue ordering while blocking global execution-order inference.

## 21. Same actor, multiple roles

R126 showed that one actor can participate in more than one local role.

For example, output can both leak and control kill; wealth can participate in capacity burden, control generation, or local rescue.

Therefore:

~~~text
Ten-God identity
!= one fixed strength polarity
~~~

## 22. Anti-determinism primitives

R129 includes explicit first-class boundaries:

~~~text
ONE_FEATURE_CHANGE_NOT_OPPOSITE_LABEL
SOURCE_LABEL_NOT_COUNTERFACTUAL_LABEL
SOURCE_COUNT_NOT_VOTE_COUNT
SOURCE_POLICY_DIFFERENCE_NOT_DEFAULT_CHOICE
CHALLENGING_RELATION_NOT_NEGATIVE_POINT
EXPLANATION_PRIMITIVE_NOT_CLASSIFIER_RULE
~~~

These are not secondary documentation notes.

They are part of the primitive inventory so downstream work must consume the uncertainty boundary together with the positive semantic unit.

## 23. Primitive relation graph

R129 defines semantic relations:

~~~text
QUALIFIES
CONTRASTS_WITH
CAN_COEXIST_WITH
DOES_NOT_IMPLY
SCOPE_LIMITS
POLICY_FORKS
~~~

Examples:

~~~text
SEASON_ALONE_NOT_DECISIVE
QUALIFIES
SEASON_CONTEXT_FAVORABLE

ROOT_QUALITY_NOT_NUMERIC_WEIGHT
QUALIFIES
ROOT_QUALITY_MATTERS

MUKU_YIN_POLICY_DIVERGENT
POLICY_FORKS
MUKU_YANG_ROOT_BOUNDED

LOCAL_ORDER_NOT_GLOBAL_PRECEDENCE
DOES_NOT_IMPLY
LOCAL_CHAIN_ORDER_MATTERS
~~~

The graph describes semantic relationships only.

It is not an executable inference engine.

## 24. Portability

R129 distinguishes:

~~~text
CROSS_SURFACE_BOUNDED
SOURCE_SCOPED
METHODOLOGY_SCOPED
POLICY_SENSITIVE
UNRESOLVED
~~~

A source sentence may have strong evidence while still having low portability.

Evidence strength and portability are therefore not treated as the same property.

## 25. Explanation admission

Primitive dispositions include:

~~~text
ADMIT_EXPLANATION_PRIMITIVE
ADMIT_SOURCE_SCOPED_PRIMITIVE
ADMIT_POLICY_BOUNDARY_PRIMITIVE
HOLD_FOR_MORE_RESEARCH
~~~

Admission means the semantic unit can exist in the research inventory.

It does not mean the primitive can emit product copy or a final claim.

## 26. No user-facing copy authority

Each primitive includes a research safeExplanationPattern.

This is a research gloss/pattern only.

~~~text
safeExplanationPattern
!= Official Reading copy
!= InterpretationClaim
!= product copy
~~~

R129 explicitly keeps those authorities false.

## 27. Rejected hidden-classifier shortcuts

R129 rejects semantic shortcuts including:

~~~text
得時 therefore strong
失時 therefore weak
one root therefore strong
no positive root match therefore rootless
many peers therefore strong
many resources therefore strong
output therefore weaker
wealth therefore drained
control therefore weaker
month branch therefore overrides all
multiple classics therefore certain
root quality therefore numeric weight
support accumulation therefore support score
challenging relation therefore negative point
local chain order therefore global precedence
policy divergence therefore pick majority
explanation primitive therefore final label
~~~

## 28. Machine-readable result

~~~text
primitive inventory                     = ESTABLISHED BOUNDED
primitive relation graph                = ESTABLISHED BOUNDED

season/month explanation primitives      = AVAILABLE
root presence/quality primitives         = AVAILABLE
peer/resource distinct support           = AVAILABLE
output/wealth/control distinct relations = AVAILABLE
local relation-chain primitives          = AVAILABLE
source-policy boundary primitives        = AVAILABLE
uncertainty/anti-determinism primitives  = AVAILABLE

numeric strength model                   = NOT AUTHORIZED
primitive aggregation rule               = NOT AUTHORIZED
final 強弱 classifier                    = NOT AUTHORIZED
final 旺衰 classifier                    = NOT AUTHORIZED
user-facing Reading copy                 = NOT AUTHORIZED
InterpretationClaim emission             = NOT AUTHORIZED
~~~

## 29. R130 handoff

R130 can now audit minimal and sufficient predicates using a fixed vocabulary rather than raw prose.

For example, R130 can ask whether:

~~~text
SEASON_CONTEXT_UNFAVORABLE
+ ROOT_SUPPORT_PRESENT_BOUNDED
+ PEER_SUPPORT_PRESENT
~~~

is necessary or sufficient for any source-local label.

R129 itself does not answer that question.

## 30. Final status

~~~text
R129
= RESEARCH NONNUMERIC STRENGTH EXPLANATION PRIMITIVE INVENTORY COMPLETE

EXPLANATION VOCABULARY
= ESTABLISHED BOUNDED

NUMERIC WEIGHT
= NOT AUTHORIZED

AGGREGATION RULE
= NOT AUTHORIZED

FINAL 強弱 / 旺衰
= NOT AUTHORIZED

INTERPRETATION CLAIM
= NOT AUTHORIZED

USER-FACING READING COPY
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
- R123 hidden-stem qualitative-depth evidence
- R124 support accumulation/saturation audit
- R125 peer/resource support discriminant corpus
- R126 control/drain/output ordering divergence
- R127 single-feature perturbation audit
- R128 cross-surface borderline-strength adjudication
- R012–R017 governed month/root semantic research