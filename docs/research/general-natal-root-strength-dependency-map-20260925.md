# R121 — root / strength dependency map after R011 closure

Date: 2026-09-25  
Issue: #1464  
Track: saju-research  
Status: RESEARCH DEPENDENCY MAP CANDIDATE / POST-R011 CLOSURE

## 1. Update trigger

R011 / #934 is no longer open.

It was closed by PR #1472 and merged as:

```text
0eaf5eae84aebfde142d68651418537ffe620098
```

R011 now directly pins the compared Yuanhai and Sanming root surfaces and closes its bounded cross-source direct-visual gate.

Therefore the old R121 wording:

```text
R011 remains BLOCKED_DIRECT_VISUAL_LOCATOR
```

is stale and must not survive in the dependency map.

The correct post-closure state is:

```text
R011 prerequisite = SATISFIED
currently blocked by R011 = NONE
```

This does **not** mean a global root resolver or final strength classifier is now justified.

## 2. Core conclusion

R011 solved one foundational research question:

```text
How do the bounded root / Tonggen surfaces compare across
Yuanhai / Sanming / Ziping?
```

It did not solve:

```text
How to classify every stem/branch as root or no-root?
How to settle every Yin/Earth edge case?
How to aggregate 比劫 / 印綬 / 通根 support?
How to choose or compose competing strength methodologies?
How to emit final whole-chart 強弱 / 旺衰?
```

Therefore:

```text
R011 closure
!= global negative Tonggen resolver
!= canonical 四柱有根 resolver
!= final 強弱/旺衰 classifier
```

## 3. Dependency categories

R121 now separates five materially different states.

### AUTHORITY_REVIEW_REQUIRED

Research evidence is already bounded and sufficient to form a source-scoped candidate, but the exact proposition has not been admitted by the Authority Bridge.

### BLOCKED_BY_OTHER_RESEARCH

The R011 prerequisite is either irrelevant or already satisfied, but some other semantic/research dependency remains unresolved.

### NOT_AUTHORIZED

The requested generalization is not supported by current evidence and must not be implemented merely because adjacent bounded evidence exists.

### ENGINE_IMPLEMENTATION_GAP

This label is reserved for a proposition that has already passed research and Authority admission but lacks runtime implementation.

No row currently qualifies.

### RESEARCH_SUPPORTED_BOUNDED

Descriptive research state only. It does not itself imply Authority or Engine status.

## 4. Updated capability map

| Capability | Research state | R011 state | Current disposition | Handoff |
| --- | --- | --- | --- | --- |
| Month-branch bounded importance | SUPPORTED_BOUNDED | NOT_REQUIRED | AUTHORITY_REVIEW_REQUIRED | Authority Bridge |
| Positive bounded Tonggen evidence | SUPPORTED_BOUNDED | NOT_REQUIRED | AUTHORITY_REVIEW_REQUIRED | Authority Bridge |
| Global negative/absence Tonggen resolver | UNRESOLVED | SATISFIED_PREREQUISITE | BLOCKED_BY_OTHER_RESEARCH | Research |
| 透干 vs 通根 non-equivalence | SUPPORTED_BOUNDED | NOT_REQUIRED | AUTHORITY_REVIEW_REQUIRED | Authority Bridge |
| Non-Earth 墓庫 positive root | SUPPORTED_BOUNDED | NOT_REQUIRED | AUTHORITY_REVIEW_REQUIRED | Authority Bridge |
| Universal Yin/Earth 墓庫 | DIVERGENT | NOT_REQUIRED | BLOCKED_BY_OTHER_RESEARCH | Research |
| Non-Earth 餘氣 positive root | SUPPORTED_BOUNDED | NOT_REQUIRED | AUTHORITY_REVIEW_REQUIRED | Authority Bridge |
| 餘氣 temporal weight/classifier | PARTIAL | NOT_REQUIRED | BLOCKED_BY_OTHER_RESEARCH | Research |
| Yang 長生 positive root | SUPPORTED_BOUNDED | NOT_REQUIRED | AUTHORITY_REVIEW_REQUIRED | Authority Bridge |
| Yin 長生 universal root | DIVERGENT | NOT_REQUIRED | BLOCKED_BY_OTHER_RESEARCH | Research |
| Bounded 祿 / 旺 positives | SUPPORTED_BOUNDED | NOT_REQUIRED | AUTHORITY_REVIEW_REQUIRED | Authority Bridge |
| 臨官→祿 / 帝旺→旺 universal bridge | NOT_SUPPORTED | NOT_REQUIRED | NOT_AUTHORIZED | none |
| 比劫 support constituent | SUPPORTED_BOUNDED | NOT_REQUIRED | AUTHORITY_REVIEW_REQUIRED | Authority Bridge |
| 黨眾/助寡 support aggregation | PARTIAL | NOT_REQUIRED | BLOCKED_BY_OTHER_RESEARCH | Research |
| 得時/失時 anti-determinism | SUPPORTED_BOUNDED | NOT_REQUIRED | AUTHORITY_REVIEW_REQUIRED | Authority Bridge |
| Canonical 四柱有根 resolver | UNRESOLVED | SATISFIED_PREREQUISITE | BLOCKED_BY_OTHER_RESEARCH | Research |
| Final whole-chart 強弱/旺衰 classifier | UNRESOLVED | SATISFIED_PREREQUISITE | BLOCKED_BY_OTHER_RESEARCH | Research |
| Universal numeric strength score | NOT_SUPPORTED | NOT_REQUIRED | NOT_AUTHORIZED | none |

## 5. R011 satisfied-prerequisite rows

Three rows previously depended on R011.

They still depend on its result, but they are no longer blocked by it.

### 5.1 Global negative / absence Tonggen resolver

R011 now establishes that the compared source families must remain source-scoped and cannot be collapsed into one universal Tonggen predicate.

That removes the old cross-source comparison blocker.

What remains unresolved is different:

- bounded exact exclusions do not establish universal negative semantics;
- no-positive-match is not negative evidence;
- Yin and Earth root surfaces remain incomplete.

Therefore:

```text
R011 = satisfied prerequisite
global negative resolver = still unresolved
blocker = OTHER RESEARCH
```

### 5.2 Canonical 四柱有根 resolver

R011 closure prevents a false universal normalization, but the repository still lacks complete settlement for:

- Yin 長生;
- Yin 祿;
- Earth 祿;
- Earth 餘氣;
- universal negative/absence semantics.

Thus:

```text
R011 closure
+ bounded positive cases
!= complete 四柱有根 resolver
```

### 5.3 Final whole-chart 強弱 / 旺衰 classifier

R011 only resolves one root-semantics prerequisite.

A final classifier still needs:

- complete root presence/absence;
- support aggregation;
- opposition/drain/control handling;
- methodology composition;
- preserved school/source disagreement;
- explicit Authority admission.

R019/R020 also preserve the anti-deterministic boundary:

```text
得時 != automatically 旺
失時 != automatically 弱
```

Therefore R011 cannot be used as a shortcut to a final classifier.

## 6. Authority Bridge candidates

Nine bounded primitive families remain ready for **Authority review**, not Engine implementation.

1. Month-branch importance without exclusivity.
2. Already-governed positive Tonggen observations.
3. 透干 / 通根 non-equivalence.
4. Bounded non-Earth 墓庫 positive root.
5. Bounded non-Earth 餘氣 positive root.
6. Yang 長生 positive root.
7. Bounded 祿 / 旺 positive evidence.
8. Bounded 比劫 support-constituent evidence.
9. 得時 / 失時 anti-deterministic constraints.

These should remain separate source-scoped admissions.

Do not combine them into one generic "strength methodology" vote.

## 7. Remaining research blockers

Seven capability rows remain blocked by research other than R011.

### Global negative/absence Tonggen

Still lacks universal negative semantics beyond exact bounded exclusions and still has Yin/Earth scope gaps.

### Universal Yin/Earth 墓庫

R014 preserves source-internal Yin tension and Earth ambiguity.

### 餘氣 temporal weight/classifier

Temporal variability is observed, but no executable weighting/classifier is established.

### Yin 長生 universal root

The source-strata conflict remains deliberately unresolved.

### 黨眾 / 助寡 support aggregation

The repository has bounded support constituents but does not have a governed collection/count/threshold/aggregation rule.

### Canonical 四柱有根

Still depends on unresolved Yin/Earth and global absence semantics.

### Final whole-chart 強弱 / 旺衰

Still depends on the complete root resolver, support aggregation, methodology composition, and cross-school textual-dependency handling.

## 8. Not-authorized generalizations

Two rows remain explicitly unsupported.

### 臨官 → 祿 / 帝旺 → 旺 executable bridge

R017 preserves separate source authorities.

Lexical/commentary association does not silently create a cross-source executable bridge.

### Universal numeric strength score

No reviewed source package authorizes universal numeric root weights or a hidden strength score.

R011 closure changes nothing about this boundary.

## 9. Research gap vs Authority gap vs Engine gap

### Research gap

Current research gaps include:

- global negative/absence root semantics;
- Yin/Earth completion;
- Yin 長生 conflict;
- support aggregation;
- final methodology composition.

### Authority gap

The nine bounded primitives above have enough research evidence to proceed to Authority Bridge review.

### Engine gap

Current pure Engine-gap count remains:

```text
0
```

Reason:

```text
research-supported
!= Authority-admitted

Authority-admitted but runtime-missing
= Engine implementation gap
```

The first condition exists; the second has not yet been established for these R121 rows.

## 10. Counts

Post-R011 classification:

```text
total capability rows              = 18
Authority review candidates        = 9
R011 satisfied-prerequisite rows   = 3
currently blocked by R011          = 0
blocked by other research          = 7
not authorized                     = 2
pure Engine implementation gaps    = 0
```

The three R011-satisfied rows are included within the seven other-research-blocked rows.

## 11. Explicit non-authority

R121 does not authorize:

- one universal Tonggen definition;
- global no-root inference from unmatched positive evidence;
- complete 四柱有根 settlement;
- numeric root weights;
- hidden strength score;
- forced Yin/Earth completion;
- support count/threshold invention;
- cross-school majority voting;
- silent methodology blending;
- final 強弱/旺衰 classifier;
- InterpretationClaim emission;
- Preview/Production promotion.

## 12. Final status

```text
R121
= RESEARCH COMPLETE FOR DEPENDENCY-MAP CANDIDATE

R011
= VERIFIED_BOUNDED_DIRECT_VISUAL_CLOSURE_COMPLETE
= prerequisite satisfied where applicable

CURRENTLY BLOCKED BY R011
= NONE

AUTHORITY REVIEW CANDIDATES
= 9

OTHER RESEARCH BLOCKERS
= 7

PURE ENGINE GAPS
= 0

AUTHORITY NOT GRANTED
ENGINE HANDOFF NOT YET GRANTED
PREVIEW/PRODUCTION AUTHORITY NOT GRANTED
```

RESEARCH COMPLETE.  
AUTHORITY NOT GRANTED.
