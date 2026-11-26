# R010 — Yuanhai edition-family bounded stemma / variant matrix

Date: 2026-09-22  
Issue: #1258  
Master: #908 R010  
Status: BOUNDED TEXTUAL-AFFINITY MATRIX ESTABLISHED / GENEALOGICAL STEMMA UNRESOLVED

## Purpose

Synthesize the governed Yuanhai `四言獨步` inspection and collation evidence into one relationship/variant matrix.

The word **stemma** is used conservatively here. Current evidence supports some bounded textual-affinity edges, but it does not support directed parent → child edition descent.

Accordingly R010 separates:

1. observed witness/edition surfaces;
2. bounded textual correspondence;
3. lexical variants;
4. frozen-witness divergence;
5. genealogical direction.

## Matrix surfaces

| Surface | Identity state | Opening evidence | Frozen 4/4 context | Genealogical placement |
|---|---|---|---:|---|
| NLC Ming Wanli | registered/directly inspected | bounded 四言 surface; separate scan qualification record | 0/4 | unresolved |
| Tianyi 崇禎 | registered/directly inspected | R004 shared 16-anchor opening | 0/4 | unresolved |
| NLC 1634 余氏善成堂 | registered/directly inspected | R004 shared 16-anchor opening | 0/4 | unresolved |
| Zhuji 清福建余氏 | registered/directly inspected | R005: 15 exact opening anchors + one slot-12 lexical variant | 0/4 | unresolved |
| NTL 1926 秦慎安 | registered/directly inspected | full opening sequence not governed by R004/R005 | 0/4 | unresolved |
| NLC 1940 趙燕生 / 章福記 | registered/directly inspected | full opening sequence not governed by R004/R005 | 0/4 | unresolved |
| Wikisource oldid 2593607 | frozen web transcription / edition unknown | source-family attribution unresolved | 4/4 text identity | unresolved |

No row is promoted merely because it shares a title, catalog lineage, or isolated phrase.

## Established bounded affinity edges

### Tianyi ↔ NLC 1634

R004 directly establishes:

- 16 shared opening anchors;
- same opening order;
- three later recorded shared anchors: `印綬根深`, `先財後印`, `先印後財`;
- both bounded surfaces remain 0/4 for the frozen exact witnesses.

Relation:

`BOUNDED_SEQUENCE_CORRESPONDENCE`

Not established:

`REPRINT_OF`, `DERIVED_FROM`, or exact full-edition identity.

### Zhuji ↔ R004 Ming bounded sequence

R005 establishes:

- 15/16 exact shared opening anchors;
- corresponding slot 12 lexical variant:
  - R004 Ming reading: `論格推詳`
  - Zhuji reading: `論格要精`;
- exact opening identity is false;
- bounded family correspondence is true;
- Zhuji remains 0/4 for frozen exact witnesses.

For matrix purposes, the same R004 shared opening sequence is represented against both Tianyi and NLC 1634, but the evidence scope remains the R004 shared sequence rather than an independent full collation of each entire edition.

Relation:

`BOUNDED_SEQUENCE_CORRESPONDENCE_WITH_LEXICAL_VARIANT`

Genealogical direction remains unknown.

## Frozen-Wikisource branch

R009 established:

- oldid 2593607 is frozen transcription identity;
- the four frozen target strings occur in that transcription;
- directly inspected registered scan surfaces tested so far diverge in the frozen context;
- secondary web surfaces explicitly labeled `增補四言獨步` carry a strongly similar long-form family;
- those secondary surfaces are not registered scan witnesses and show wording/orthographic variance;
- exact printed edition and exact witness lineage remain INCONCLUSIVE.

R010 therefore records the frozen surface as:

`WITNESS_OF_WORK_EDITION_UNKNOWN`

with family hypothesis:

`EXPANDED_OR_ZENGBU_SIYAN_DUBU_WEB_TRANSMISSION`

This is **not** a stemma edge to a printed edition.

## Variant dimensions

The matrix preserves separate dimensions instead of collapsing them into one similarity score:

- opening-anchor sequence;
- lexical variant at corresponding slot;
- later bounded anchor overlap;
- frozen 4/4 context match count;
- same-string/different-section occurrence;
- orthographic variance;
- registered scan identity;
- exact edition identity;
- genealogical direction.

No numeric similarity/confidence score is introduced.

## Unknown edges

The following remain explicitly unresolved:

- NTL 1926 ↔ Ming bounded cluster;
- NLC 1940 ↔ Ming bounded cluster;
- NLC Ming Wanli ↔ R004/R005 bounded cluster beyond already recorded proposition/variant evidence;
- Wikisource frozen witness ↔ any registered printed edition;
- Bukkyo/Tokyo/NDL acquisition targets ↔ inspected surfaces until reproduction evidence exists.

Unknown does not mean independent.

## Acquisition-target boundary

R006, R007, and R008 remain external-acquisition blockers.

Catalog metadata for NDL, Bukkyo, and Tokyo may identify candidate transmission lineages, but no stemma edge is admitted until a retrievable bounded text/image surface is inspected.

## Rejected shortcuts

- `SHARED_OPENING_EQUALS_SAME_EDITION`
- `SHARED_OPENING_EQUALS_REPRINT_RELATION`
- `CATALOG_LINEAGE_EQUALS_TEXTUAL_STEMMA_EDGE`
- `ZERO_OF_FOUR_EQUALS_UNRELATED_EDITION`
- `FOUR_OF_FOUR_EQUALS_DIRECT_ANCESTRY`
- `UNKNOWN_EDGE_EQUALS_INDEPENDENT`
- `ORTHOGRAPHIC_NORMALIZATION_FOR_STEMMA_MATCH`
- `NUMERIC_SIMILARITY_SCORE_EQUALS_GENEALOGICAL_AUTHORITY`
- `FAMILY_HYPOTHESIS_EQUALS_EDITION_IDENTITY`

## Verdict

R010 establishes a reproducible **bounded textual-affinity and variant matrix** for the governed passages.

It does not establish a directed historical stemma.

That distinction is the research result, not a failure: the available evidence is sufficient to preserve observed affinities and divergences while insufficient for parent/child genealogy.

No witness definition, source tier, provenance quality, methodology status, lifecycle state, or Production authority changes.
