# R134 — Special-pattern exit-condition adversarial corpus

> Date: 2026-09-26  
> Issue: #1636  
> Watchtower-Track: saju-research  
> Status: RESEARCH COMPLETE / AUTHORITY NOT GRANTED

## 1. Research target

R134 tests when a research-plausible 外格 / follow-pattern path must be blocked, retained as unresolved, or redirected back to an ordinary-pattern failure state.

This is deliberately narrower than a special-pattern classifier.

```text
EXIT CONDITION
= a bounded structural condition that defeats or suspends a special-pattern research path

EXIT CONDITION
!= temporal luck-cycle transition
!= established-pattern transition
!= executable classifier result
```

R135 remains the separate frontier for ordinary-to-special transition non-monotonicity.

## 2. Fresh source verification

The selected surface was rechecked on 2026-09-26:

- 子平真詮評註 / 論外格用捨
- https://www.ncc.com.tw/fate/paleo/bg/bg_034.htm

The page identifies 沈孝瞻 as original author and 徐樂吾 as commentator. R134 therefore labels the selected 外格用捨 surface as `COMMENTARY_DIRECT`; it does not silently promote the commentary into a universal classical rule.

Bounded anchors used by this corpus:

- `若月令自有用神，豈可另尋外格？`
- `必四柱氣象偏於一方`
- `四柱無可扶抑`
- `日與月同，則從強從旺`
- `日不與月同，而日元臨絕，則從官煞、從財、從食傷`
- `月令有用神、四柱有扶抑，豈有捨之別取之理？`
- `財被劫官被傷者，當觀其有無救應之神，無救應則為破格`

The key negative result is as important as the positive wording: a damaged ordinary pattern is not automatically evidence that the ordinary path is absent.

## 3. Upstream contract

R134 binds without widening:

| Upstream | Consumed boundary |
|---|---|
| R029 | follow/external entry propositions, exclusions, unresolved execution gaps |
| R030 | ordinary-path-blocks-external-switch and broken-ordinary states |
| R131 | candidate and establishment remain separate unauthorized canonical stages |
| R133 | rescue is source-local; no global rescue resolver or precedence |

No R134 row can cure an upstream unresolved operand.

## 4. Corpus shape

The corpus contains:

```text
adversarial pairs                  = 18
scenarios                          = 36
R029 target families               = 6
ordinary-path blocks               = 4
support/control blocks             = 1
missing-prerequisite exits         = 5
unresolved/indeterminate cases     = 4
broken-ordinary retention cases    = 4
ordinary-failure counterexamples   = 8
```

Every pair has exactly:

```text
BASELINE
+
ONE BOUNDED PERTURBATION
```

The baseline state is only `SPECIAL_PATH_REMAINS_RESEARCH_PLAUSIBLE`. It is not a candidate identity and not an establishment result.

## 5. Adversarial pair registry

| Pair | Target | Changed dimension | Perturbed state |
|---|---|---|---|
| P01 | FOLLOW_STRONG | ordinary support/control appears | BLOCKED_BY_SUPPORT_CONTROL |
| P02 | FOLLOW_PROSPEROUS | 月令 ordinary 用神 appears | BLOCKED_BY_ORDINARY_PATH |
| P03 | FOLLOW_OFFICER_KILL | 日元臨絕 removed | BLOCKED_BY_MISSING_TARGET_PREREQUISITE |
| P04 | FOLLOW_WEALTH | 日元臨絕 unresolved | UNRESOLVED_OPERAND |
| P05 | FOLLOW_OUTPUT | visible ordinary path appears | BLOCKED_BY_ORDINARY_PATH |
| P06 | TRANSFORM_QI | transformation validity unresolved | UNRESOLVED_OPERAND |
| P07 | FOLLOW_STRONG | one-sidedness contradicted | BLOCKED_BY_MISSING_TARGET_PREREQUISITE |
| P08 | FOLLOW_PROSPEROUS | one-sidedness unresolved | UNRESOLVED_OPERAND |
| P09 | FOLLOW_OFFICER_KILL | damaged ordinary 官 with rescue proposition | BROKEN_ORDINARY_RETAINED |
| P10 | FOLLOW_WEALTH | damaged ordinary 財 without rescue | BROKEN_ORDINARY_RETAINED |
| P11 | FOLLOW_OUTPUT | 日不與月同 -> 日與月同 | BLOCKED_BY_MISSING_TARGET_PREREQUISITE |
| P12 | TRANSFORM_QI | 月令 ordinary 用神 appears | BLOCKED_BY_ORDINARY_PATH |
| P13 | FOLLOW_STRONG | visible ordinary path appears | BLOCKED_BY_ORDINARY_PATH |
| P14 | FOLLOW_PROSPEROUS | ordinary pattern becomes broken | BROKEN_ORDINARY_RETAINED |
| P15 | FOLLOW_WEALTH | 日不與月同 -> 日與月同 | BLOCKED_BY_MISSING_TARGET_PREREQUISITE |
| P16 | FOLLOW_OUTPUT | 日元臨絕 removed | BLOCKED_BY_MISSING_TARGET_PREREQUISITE |
| P17 | FOLLOW_OFFICER_KILL | ordinary-use availability unresolved | INDETERMINATE |
| P18 | FOLLOW_OUTPUT | 官 damaged without rescue | BROKEN_ORDINARY_RETAINED |

## 6. Why the pairs are adversarial

The pairs are not synthetic chart scores. They isolate one semantic boundary at a time.

Examples:

```text
one-sided + no ordinary 扶抑
-> ordinary 扶抑 becomes available
-> special research path blocked
```

```text
日不與月同 + 日元臨絕
-> 日元臨絕 becomes unresolved
-> unresolved operand
-> NOT "exit confirmed"
```

```text
ordinary 財 path damaged
-> no rescue observed
-> broken ordinary pattern retained
-> NOT automatic 從財
```

```text
日干化合 wording observed
-> transformation validity unresolved
-> unresolved operand
-> NOT established 化氣
```

## 7. Broken ordinary is not absent ordinary

This is the central adversarial boundary.

R029 already preserves the commentary warning that 財被劫 / 官被傷 is not equivalent to 月令無取. R030 gives this a research state: `BROKEN_ORDINARY_PATTERN`. R133 further shows that rescue relations are local and cannot be converted into a global winner algorithm.

Therefore R134 records both:

```text
DAMAGED ORDINARY + RESCUE PROPOSITION
-> ordinary path remains an ordinary-path problem

DAMAGED ORDINARY + NO RESCUE
-> broken ordinary path

neither implies:

-> special pattern established
```

## 8. Missing prerequisite is not a proved opposite

R134 distinguishes:

```text
prerequisite contradicted
!= prerequisite unresolved
```

A contradicted prerequisite may block the bounded research path.

An unresolved prerequisite yields `UNRESOLVED_OPERAND` or `INDETERMINATE`.

This prevents fail-open logic such as:

```text
cannot prove ordinary path
-> assume no ordinary path
-> choose special pattern
```

That inference is rejected.

## 9. Transformation boundary

R029 preserves:

`日干化合，則為化氣`

but also records `DAY_STEM_TRANSFORMATION_VALIDITY` as an execution gap.

R134 therefore allows a bounded source observation while refusing:

```text
stem combination observed
-> transformation effective
-> 化氣 established
```

No transformation-effect resolver is introduced.

## 10. Minimal perturbation boundary

The pair structure is qualitative.

```text
one changed research dimension
!= numeric distance
!= confidence delta
!= special-pattern score
```

No hidden score, weight, threshold, or probability is created.

## 11. Rejected shortcuts

R134 mechanically rejects:

- ordinary failure = special-pattern entry;
- broken ordinary = absent ordinary path;
- special-looking chart = established special pattern;
- missing prerequisite = proved opposite fact;
- unresolved operand = confirmed exit;
- minimal perturbation = numeric distance;
- exit condition = temporal transition;
- source exclusion = executable classifier;
- day-stem combination = valid 化氣;
- one-sidedness wording = executable one-sidedness detector.

## 12. Authority boundary

```text
SPECIAL-PATTERN RESEARCH PATH
!= ESTABLISHED SPECIAL PATTERN

ORDINARY FAILURE
!= SPECIAL-PATTERN ENTRY

BROKEN ORDINARY
!= ABSENT ORDINARY PATH

MISSING PREREQUISITE
!= PROVEN OPPOSITE FACT

UNRESOLVED OPERAND
!= EXIT CONFIRMED

MINIMAL PERTURBATION
!= NUMERIC DISTANCE

EXIT CONDITION
!= TEMPORAL TRANSITION

SOURCE EXCLUSION
!= EXECUTABLE CLASSIFIER
```

Explicitly unauthorized:

- executable 從強/從旺/從官煞/從財/從食傷/化氣 resolver;
- canonical special-pattern candidate identity;
- establishment predicate;
- one-sidedness detector;
- 日元臨絕 executable predicate;
- ordinary-yongshen availability predicate;
- transformation validity predicate;
- numeric special-pattern score;
- temporal transition semantics;
- candidate or establishment fact emission;
- Preview / Production / Official Reading / Commerce promotion.

## 13. Closure

```text
RESEARCH COMPLETE.
AUTHORITY NOT GRANTED.
```

R134 closes the adversarial exit-condition corpus only. It does not establish a special pattern and does not authorize runtime classification.

Watchtower-Track: saju-research
