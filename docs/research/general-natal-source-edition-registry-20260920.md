# R091 — machine-readable work / edition / witness identity registry

Date: 2026-09-22  
Issue: #1041  
Status: IDENTITY NORMALIZATION LAYER DEFINED / EDITION OR WITNESS DETAILS MAY REMAIN UNKNOWN

## Purpose

Define a machine-readable identity layer that separates abstract works, specific editions, and actually inspected witnesses without replacing the repository's existing source metadata contracts.

R091 is an identity/provenance normalization artifact only.

It does **not**:
- verify a textual claim merely because a registry row exists;
- create source-tier authority;
- create passage-level textual authority;
- establish independence between sources;
- promote research to Production.

## Existing substrate

The existing `SourceReference` substrate remains authoritative for the source metadata already used by repository research records.

R091 does not replace or fork that substrate.

Instead:

`SourceReference metadata -> optional R091 normalized identity refs -> research provenance consumers`

Unknown legacy mappings may remain unresolved.

## Identity layers

### WORK_IDENTITY

Represents an abstract work/title/authorship tradition.

A work identity does not imply:
- a specific printed edition;
- a specific editor;
- a publication year;
- a digital witness;
- an independently verified textual lineage.

Minimum identity:
- `workId`;
- canonical title;
- identity layer.

### EDITION_IDENTITY

Represents a specific edition when edition-level evidence exists.

Possible fields include:
- `editionId`;
- `workId`;
- editor;
- publisher;
- publication year;
- language;
- volume/set identity;
- asserted-field evidence refs.

Unknown edition metadata remains null/unknown. It is never fabricated from title, URL, website metadata, or guesswork.

### WITNESS_IDENTITY

Represents the exact digital/scan/web surface actually inspected.

Fields:
- `witnessId`;
- `workId`;
- `editionId` or explicit edition-unknown state;
- URL/archive/repository locator;
- access date;
- passage/page/section/anchor locator;
- content checksum when reproducible;
- witness stability state.

## Witness stability

A locator is not automatically an immutable witness.

States:

### REPRODUCIBLE_SNAPSHOT

The inspected content can be re-identified through immutable/archive content identity or reproducible checksum evidence.

### LOCATOR_ONLY_MUTABLE

The inspected content is identified by URL/repository locator + access date + passage locator, but no immutable content identity is available.

This may still be useful provenance, but it must not be represented as content-addressed immutable passage evidence.

### INSUFFICIENT

The witness cannot be re-identified well enough for governed use.

Missing checksum does not fabricate one, and mutable web content is not silently upgraded to a stable witness.

## Relationship types

- `EDITION_OF`
- `WITNESS_OF_EDITION`
- `WITNESS_OF_WORK_EDITION_UNKNOWN`
- `DERIVED_FROM`
- `REPRINT_OF`
- `TRANSLATION_OF`
- `UNKNOWN`

Any asserted non-`UNKNOWN` relationship requires evidence refs.

If lineage is not established:

`relationship = UNKNOWN`

not:

`independent = true`.

Different websites hosting the same or similar text do not automatically count as independent provenance.

## Initial work identities

R091 seeds work-level identities only:

- `WORK-ZIPING-ZHENQUAN-PINGZHU` — 子平真詮評註
- `WORK-SANMING-TONGHUI` — 三命通會
- `WORK-DITIAN-SUI-CHANWEI` — 滴天髓闡微
- `WORK-SHENFENG-TONGKAO` — 神峰通考

These rows intentionally contain no fabricated edition identity.

Later edition/witness records require their own evidence.

## Registry admission boundary

Registry membership means only:

> this identity record satisfies the R091 machine-readable identity contract.

It does **not** mean:
- the full text was verified;
- every passage was inspected;
- the source is independent of another witness;
- the source has a higher provenance tier;
- a rule using it is reviewed/active/Production-authorized.

## Rejected shortcuts

- `URL_EQUALS_EDITION_IDENTITY`
- `SAME_TITLE_EQUALS_SAME_EDITION`
- `DIFFERENT_WEBSITE_EQUALS_INDEPENDENT_PROVENANCE`
- `FABRICATE_PUBLICATION_METADATA`
- `UNKNOWN_RELATIONSHIP_TREATED_AS_INDEPENDENT`
- `MISSING_CHECKSUM_EQUALS_IMMUTABLE_WITNESS`
- `REGISTRY_MEMBERSHIP_EQUALS_TEXT_VERIFICATION`
- `IDENTITY_REGISTRY_REPLACES_SOURCE_REFERENCE`

## Authority boundary

R091 is research-only identity normalization.

No source-tier promotion, textual-claim verification, methodology/rule activation, or Production promotion follows from registry membership alone.
