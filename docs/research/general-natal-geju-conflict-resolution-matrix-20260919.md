# R030 — Multi-candidate 格局 conflict-resolution matrix

Date: 2026-09-19  
Issue: #966  
Status: REPRESENTATION BOUNDARY VERIFIED / WINNER RESOLUTION BLOCKED

## 1. Source topology

R021 already records the direct 子平真詮評註 boundary:

```text
用神專尋月令，以四柱配之，必有成敗
月令所藏不一，而用神遂有變化
透幹會取其清者用之
一透則一用，兼透則兼用，透而又會，則透與會並用
```

The important consequence is that **plural candidates/selections are source-permitted**.

A resolver that forces one winner immediately is therefore not source-bounded.

## 2. Required state machine

The research representation must be able to preserve:

```text
ZERO
  -> NO_CANDIDATE

ONE
  -> SINGLE_CANDIDATE_UNESTABLISHED
  -> later 成/敗/帶忌/救應 evaluation

MULTIPLE
  -> MULTIPLE_COEXISTING
  -> or MULTIPLE_CONFLICT_UNRESOLVED
  -> never guess a winner
```

## 3. Special transitions

R028 adds a different topology:

```text
建祿/月劫
-> not self-sufficient ordinary 用神
-> transition toward 官 / 財 / 煞 logic according to separately governed conditions
```

This is represented as `SPECIAL_TRANSITION_REQUIRED`, not as a direct winner.

## 4. External/follow exclusion

R029 adds a strong precedence boundary:

```text
ordinary 月令 use available + 四柱扶抑 available
-> external/follow switch blocked
```

and:

```text
財被劫 / 官被傷
-> inspect rescue / ordinary failure
-> NOT automatic 從格
```

Therefore a broken ordinary candidate is its own state.

## 5. Why R030 does not pick winners

The repository still lacks governed predicates for:

- hidden month-content selection without array-order ranking;
- 透干 selection;
- 會支 selection/transformation effect;
- compatibility between simultaneous selections;
- transformation precedence;
- establishment success/failure;
- rescue precedence.

Without those predicates, a winner algorithm would encode undocumented doctrine.

## 6. Forbidden shortcuts

```text
hidden-stem array order -> rank
month branch identity -> established pattern
numeric candidate score
always force one winner
broken ordinary pattern -> follow pattern
missing predicate -> model guess
```

## 7. Result

R030 closes the **representation problem**, not the doctrinal resolution problem.

The system can now specify what a future governed resolver must preserve, including coexistence and indeterminate states, without fabricating a final 格局.

No Production / SKU / Commerce authority is created.
