# R050 — exhaustive Ten-God pair directionality / prerequisite matrix

Date: 2026-09-19  
Issue: #981  
Status: EXHAUSTIVE INVENTORY BUILT / MOST MEMBER PAIRS UNRESOLVED

## Purpose

R050 does **not** invent a complete traditional interaction system.

It creates an exhaustive ordered-pair inventory over the ten ordinary Ten Gods:

```text
比肩 劫財 食神 傷官 偏財 正財 偏官 正官 偏印 正印
```

That gives exactly 100 ordered pairs. Every cell is classified as one of:

```text
FAMILY_LEVEL_EVIDENCE
EXACT_MEMBER_INTERSECTION
UNRESOLVED
```

`UNRESOLVED` means the repository has not established a source-bounded relation for that exact pair. It does **not** mean “no relation exists.”

## Existing bounded relation surface

The matrix reuses only already-governed evidence:

```text
#801 / #860
OUTPUT -> WEALTH
WEALTH -> OFFICER
OFFICER -> RESOURCE
WEALTH <-> RESOURCE conflict

#801 exact two-source intersection
劫財 -> 財 adverse
```

The first four are family-level evidence. They are **not silently upgraded to exact individual-member propositions**.

Therefore cells such as `食神 -> 正財` may carry `FAMILY_LEVEL_EVIDENCE`, which means only:

> this exact pair lies inside an already verified family-level relation envelope.

It does not mean that the exact member pair received separate direct textual verification.

## Directionality

```text
OUTPUT -> WEALTH       directed
WEALTH -> OFFICER      directed
OFFICER -> RESOURCE    directed
劫財 -> WEALTH          directed
WEALTH <-> RESOURCE    symmetric conflict envelope
```

For the symmetric wealth/resource conflict, both ordered directions appear in the 10×10 matrix, but both point to the same family-level symmetric evidence envelope.

## Prerequisites

Endpoint presence alone is not promoted to a success/failure resolver.

R041–R049 already show additional prerequisites can include:

```text
relative strength
body strength
control effectiveness
combination effects
rootedness
methodology applicability
rescue precedence
exact member intersection
```

The matrix therefore records prerequisite classes but never evaluates them.

The peer/wealth relation is narrower:

```text
劫財 exact member present
AND wealth-family endpoint present
```

Mere 比肩 presence remains unresolved for the two-source adverse relation.

## Counts

```text
total ordered pairs                  100
family-level evidence envelope        20
exact-member intersection              2
unresolved                            78
```

## Hard boundary

This artifact does not authorize:

- member-level semantic widening from family-level evidence;
- presence-only favorable/unfavorable polarity;
- a generic Ten-God relation resolver;
- missing-evidence => no-relation inference;
- numeric scoring or hidden weighting;
- Production, SKU, or Commerce authority.
