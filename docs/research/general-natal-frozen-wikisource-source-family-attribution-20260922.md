# R009 — Frozen Wikisource witness source-family attribution

Date: 2026-09-22  
Issue: #1256  
Master: #908 R009  
Status: INCONCLUSIVE EXACT EDITION / BOUNDED SOURCE-FAMILY HYPOTHESIS

## Purpose

Study the source-family identity of the frozen Yuanhai Wikisource witness without converting textual similarity into edition identity.

The frozen repository witness is the permanent Wikisource revision:

`https://zh.wikisource.org/w/index.php?title=%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3&oldid=2593607`

The existing repository already treats this revision as `IMMUTABLE_BUT_SOURCE_INTEGRITY_LIMITED`.

R009 asks a narrower bibliographic question: what source family best explains the frozen long-form `四言獨步` block, and what remains unknown?

## Frozen target

The four unresolved frozen witness strings are:

- `財旺生官`
- `煞化為印`
- `比劫羊刃，財格大忌`
- `印綬見財`

The permanent Wikisource revision contains all four in the section labeled `四言獨步`.

This establishes frozen transcription identity only. It does not identify a printed edition.

## Repository-backed negative evidence

Directly inspected registered scan surfaces already show that the frozen block cannot be silently identified with the inspected Ming / later scan witnesses.

Existing repository evidence records 0/4 frozen-context matches for the relevant directly inspected `四言獨步` surfaces, including:

- Ming Wanli NLC family;
- NLC 1634 余氏善成堂;
- 1926 National Taiwan Library 秦慎安校勘 surface;
- NLC 1940 趙燕生 / 章福記書局 surface;
- Tianyi 崇禎 scan;
- Zhuji 清福建余氏 scan.

These are bounded negative comparisons. They do not prove that every exemplar in a broader edition family lacks the frozen strings.

## Web-family observation

A fresh web survey found multiple secondary transcription surfaces that explicitly label a long block `增補四言獨步`.

Examples used only as discovery evidence:

- `https://www.getit01.com/p201805262349442/`
- `https://read01.com/0M2RoK.html`
- `https://read01.com/zh-hk/E8mdda.html`

Those secondary surfaces reproduce the same distinctive neighborhood as the frozen Wikisource block, including the sequence around:

- `比劫羊刃 / 財格大忌`;
- a 殺/煞化為印 line;
- `財旺生官`;
- `印綬見財`.

However, they also contain orthographic and wording differences such as `殺/煞`, and differing adjacent wording. They have no registered scan identity sufficient for exact witness attribution.

Therefore they support only this bounded hypothesis:

> the frozen long-form Wikisource block is associated with a circulating expanded / `增補四言獨步` transcription family.

They do **not** establish which printed edition produced the frozen revision.

## Additional negative comparator

A secondary transcription presented as the 民國上海校經山房石印本 has a materially different `四言獨步` surface and does not establish the frozen four-string block as that edition's exact text.

Discovery surface:

`https://destiny.to/ubbthreads/topic/191179`

Because this is itself a secondary transcription rather than a pinned scan, it is not used to exclude the 校經山房 edition absolutely. It only prevents unsupported positive attribution.

## Attribution result

### Established

- frozen Wikisource revision identity is pinned;
- all four frozen strings occur in the frozen web transcription;
- directly inspected registered scans tested so far are textually divergent in the frozen context;
- a secondary web-transcription family explicitly called `增補四言獨步` contains a strongly similar long-form block;
- the secondary family is not byte-identical to the frozen witness and shows orthographic/wording variance.

### Not established

- exact printed edition;
- exact publisher/imprint;
- exact editor;
- exact work/edition/witness lineage from a physical scan to Wikisource;
- independence of the secondary web copies;
- whether the Wikisource block was copied from one of those secondary copies or from a common upstream source;
- exact scan-derived reproduction of the four frozen digests.

## R091 identity mapping

R009 may record the frozen surface only as a witness whose edition remains unresolved.

Allowed shape:

`WITNESS_OF_WORK_EDITION_UNKNOWN`

Not allowed:

`WITNESS_OF_EDITION(<guessed edition>)`

The family hypothesis is descriptive metadata, not an edition relationship.

## Required next evidence

Exact attribution requires at least one of:

1. a scan/reproduction whose bounded `增補四言獨步` surface directly matches the frozen sequence closely enough for explicit collation;
2. a documented transcription statement naming the source edition plus a reproducible image surface;
3. Wikisource edit/import provenance that explicitly identifies the source and can be independently tied to a witness;
4. a reviewed stemma showing the frozen block's relationship to inspected edition families without collapsing orthographic variants.

## Rejected shortcuts

- `SAME_FOUR_STRINGS_EQUALS_SAME_EDITION`
- `SECONDARY_WEB_LABEL_EQUALS_PRINTED_EDITION`
- `DIFFERENT_WEBSITES_EQUALS_INDEPENDENT_PROVENANCE`
- `ORTHOGRAPHIC_VARIANT_EQUALS_FROZEN_HASH_MATCH`
- `NO_MATCH_IN_INSPECTED_COPY_EQUALS_FAMILY_WIDE_ABSENCE`
- `WIKISOURCE_SECTION_HEADING_EQUALS_HISTORICAL_SECTION_IDENTITY`
- `FAMILY_HYPOTHESIS_EQUALS_R091_EDITION_IDENTITY`

## Authority boundary

R009 ends as `INCONCLUSIVE` for exact edition attribution while preserving a bounded `增補四言獨步`-family hypothesis.

No witness definition is changed. No frozen digest is rewritten. No source tier, provenance quality, methodology status, lifecycle state, or Production authority is promoted.
