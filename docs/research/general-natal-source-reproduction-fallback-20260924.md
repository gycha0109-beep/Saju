# R101 — blocked source reproduction fallback decision protocol

Date: 2026-09-24  
Issue: #1455  
Track: saju-research  
Status: RESEARCH CANDIDATE / NO ORIGINAL FRONTIER AUTO-CLOSURE

## 1. Research question

When the preferred source witness cannot currently be inspected, what can an alternate reproduction, different copy, different edition in the same lineage, OCR surface, or transcription legitimately establish?

R101 exists to prevent two opposite errors:

```text
similar text
→ same edition
→ same copy
→ exact page/glyph authority
```

and:

```text
target viewer unavailable
→ all alternate reproductions treated as useless
```

The protocol therefore separates **locator value**, **text corroboration**, **edition identity**, **exact target glyph/page verification**, and **direct-inspection closure**.

## 2. Repository authority reused

R101 does not create a parallel provenance system.

It composes existing research contracts:

- R091 — work / edition / witness identity;
- R095 — lineage and proposition-relation separation;
- R097 — exact scan inspection manifest;
- R098 — fail-closed research-to-governed promotion checklist.

Authority order for this protocol:

```text
R091 identity
+ R095 lineage
+ R101 fallback relationship/use policy
+ R097 exact visual inspection when exact glyph/page is required
→ research evidence package

research evidence package
!= governed methodology/rule
!= InterpretationClaim
!= Preview/Production authority
```

## 3. External conceptual cross-check

R101 uses external bibliographic/image-delivery models only as conceptual cross-checks.

### IFLA Library Reference Model

IFLA LRM explicitly distinguishes Work, Expression, Manifestation, and Item. A manifestation can be exemplified by multiple items, while an item exemplifies one manifestation.

This supports the repository boundary:

```text
same edition/manifestation
!= same physical copy/item
```

Reference:
- IFLA Library Reference Model, 2024 repository edition:
  https://repository.ifla.org/rest/api/core/bitstreams/7d23aa55-1f85-490f-b500-6170285585a6/content

R101 does not import IFLA entity names as repository authority. R091 remains the repository identity contract.

### IIIF Presentation API

IIIF separates presentation structure such as Manifest/Canvas from the image resource painted onto a Canvas.

This supports the repository boundary:

```text
viewer/page locator
!= immutable image bytes
!= inspected witness region
```

Reference:
- IIIF Cookbook, Simplest Manifest — Image:
  https://iiif.io/api/cookbook/recipe/0001-mvm-image/

R097 remains the repository authority for exact rendered-page inspection.

## 4. Fallback relationship taxonomy

### EXACT_TARGET_REPRODUCTION

The fallback surface is the exact target reproduction accepted by the original frontier.

Allowed:
- locator aid;
- scoped text corroboration;
- exact target glyph verification **only with R097 direct inspection**;
- exact target page verification **only with R097 direct inspection**;
- edition identity support when R091 evidence establishes it;
- direct-inspection closure when the original frontier's gate is satisfied.

Not allowed:
- textual proposition verification from relationship classification alone;
- fabricated edition metadata;
- automatic rule or Production promotion.

### SAME_EDITION_DIFFERENT_COPY

A different physical copy/item is evidenced as belonging to the same edition.

Allowed:
- locator aid;
- scoped text corroboration;
- edition identity support if the same-edition relation itself is evidenced.

Not allowed:
- target-copy exact glyph;
- target-copy exact page;
- copy-specific defect/annotation/missing-leaf claims;
- direct-inspection closure for the target copy.

Reason:

```text
same edition
!= same copy
```

### SAME_LINEAGE_DIFFERENT_EDITION

A source has evidenced lineage relation but belongs to a different edition.

Allowed:
- locator aid;
- scoped text comparison/corroboration;
- variant and inheritance research.

Not allowed:
- target-edition identity;
- target exact glyph/page;
- direct-inspection closure;
- treating shared wording as independent corroboration when textual inheritance is plausible.

### DERIVATIVE_OCR_OR_TRANSCRIPTION

A derivative text surface produced from a scan, image, or edition.

Allowed:
- locator narrowing;
- scoped text corroboration with uncertainty recorded.

Not allowed:
- exact target glyph;
- exact target page;
- edition identity from text similarity alone;
- replacement of R097 visual inspection;
- direct-inspection closure.

Core invariant:

```text
OCR/transcription
!= witness image
```

### UNRESOLVED_RELATIONSHIP

The fallback surface exists, but its relationship to the target witness is not established.

Allowed:
- retain as a search lead;
- use to guide further provenance investigation.

Not allowed:
- count as corroborating evidence;
- infer same edition;
- infer same lineage;
- infer independence;
- exact glyph/page claims;
- direct-inspection closure.

Core invariant:

```text
unknown remains unknown
```

## 5. Evidence-use matrix

| Relationship | Locator aid | Scoped text corroboration | Exact target glyph | Exact target page | Edition identity | Close direct-inspection gate |
| --- | --- | --- | --- | --- | --- | --- |
| EXACT_TARGET_REPRODUCTION | yes | yes | yes, with R097 | yes, with R097 | yes, with R091 evidence | yes, only if original gate is satisfied |
| SAME_EDITION_DIFFERENT_COPY | yes | yes | no | no | yes, if relation is evidenced | no |
| SAME_LINEAGE_DIFFERENT_EDITION | yes | yes | no | no | no | no |
| DERIVATIVE_OCR_OR_TRANSCRIPTION | yes | yes, bounded | no | no | no | no |
| UNRESOLVED_RELATIONSHIP | yes | no | no | no | no | no |

## 6. Mandatory assertion record

Every R101 relationship assertion must preserve:

- assertion ID;
- target witness ref;
- fallback witness/derivative ref;
- relationship;
- relationship evidence refs;
- work identity ref;
- target edition ref or explicit unknown;
- fallback edition ref or explicit unknown;
- lineage assertion ref or explicit unknown;
- allowed evidence purposes;
- prohibited evidence purposes;
- recorded timestamp.

A non-unknown relationship without evidence refs is invalid.

## 7. Non-equivalence invariants

R101 freezes the following boundaries:

```text
same text
!= same edition

same edition
!= same copy

same lineage
!= same edition

same host
!= same witness

different host
!= independent provenance

OCR/transcription
!= witness image

locator aid
!= textual verification

text corroboration
!= exact glyph verification

fallback relationship
!= direct-inspection closure

fallback evidence
!= authority promotion
```

## 8. Retrospective application

### R006 / #933

Current blocker remains:

```text
BLOCKED_EXTERNAL_ACQUISITION
```

Fallback reproductions may support locator or lineage research, but cannot satisfy the requested target reproduction acquisition.

R101 result:

```text
ORIGINAL FRONTIER REMAINS OPEN/BLOCKED
```

### R007 / #1254

Catalog and lineage metadata may guide acquisition and comparison.

They do not substitute for the Bukkyo reproduction/page-image acceptance gate.

R101 result:

```text
ORIGINAL FRONTIER REMAINS OPEN/BLOCKED
```

### R008 / #1255

Cataloged 敬文堂/余氏 lineage information may guide provenance research.

It does not establish exact glyphs or page location in the unavailable Tokyo target reproduction.

R101 result:

```text
ORIGINAL FRONTIER REMAINS OPEN/BLOCKED
```

### R011 / #934

Current evidence includes:

- exact work/source identities for several witnesses;
- derivative OCR/transcription surfaces containing the bounded root sequence;
- alternate Sanming witnesses useful for locator narrowing;
- suspected Yuanhai/Sanming textual inheritance.

That evidence supports locator/corroboration research, but not the missing exact direct-image locator.

R101 result:

```text
BLOCKED_DIRECT_VISUAL_LOCATOR remains
```

No universal Tonggen definition, resolver, weight scale, or strength classifier follows.

## 9. Counterexamples

### Counterexample A — same wording on two websites

```text
site A text == site B text
```

does not establish:
- different witnesses;
- independent provenance;
- same edition;
- same physical copy.

### Counterexample B — same edition, different copy

One copy may contain:
- missing leaves;
- annotations;
- rebinding;
- damage;
- scan-order differences.

Therefore a different copy cannot prove target-copy page/glyph facts.

### Counterexample C — OCR gives the expected phrase

An OCR hit can correctly narrow a page search while still containing:
- character substitutions;
- omitted columns;
- reordered text;
- page-boundary errors.

Therefore an OCR hit cannot close an exact visual-inspection requirement.

### Counterexample D — same lineage, repeated passage

Repeated wording across lineage-related editions may indicate inheritance rather than independent doctrinal corroboration.

Therefore source counting must not treat inherited wording as multiple independent votes.

## 10. Stop and escalation conditions

Escalate back to target acquisition/direct inspection when:

- exact glyph is required;
- exact page/leaf is required;
- a claim depends on target-copy-specific state;
- relationship remains unresolved;
- the original frontier explicitly requires direct visual inspection.

R101 must not relax the acceptance criteria of the original frontier.

## 11. Research status

```text
R101: RESEARCH CANDIDATE
R006: unchanged
R007: unchanged
R008: unchanged
R011: unchanged
AUTHORITY NOT GRANTED
```

## 12. Handoff

R101 is suitable for research-governance review as a reusable evidence-handling protocol.

It is not a Saju semantic rule and does not require engine admission.

```text
RESEARCH COMPLETE FOR PROTOCOL CANDIDATE
AUTHORITY NOT GRANTED
```
