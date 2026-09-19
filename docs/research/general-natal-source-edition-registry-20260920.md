# R091 — machine-readable work / edition / witness identity registry

Date: 2026-09-20  
Issue: #1041  
Status: IDENTITY LAYERS DEFINED / EDITION METADATA MAY REMAIN UNKNOWN

## Existing substrate

`SourceReference` already stores source metadata, and existing registries content-address rules. R091 adds a normalization layer rather than replacing those contracts.

## Identity layers

### WORK_IDENTITY
Abstract textual work or authorship tradition. A work identity does not imply a specific printed/digital edition.

### EDITION_IDENTITY
A specific editor/publisher/year/language/volume identity when evidence exists. Unknown fields remain null/unknown.

### WITNESS_IDENTITY
The exact scan/web/digital surface actually inspected: URL or repository locator, access date, passage locator, and content checksum when reproducible.

## Relationship types

- EDITION_OF
- WITNESS_OF_EDITION
- WITNESS_OF_WORK_EDITION_UNKNOWN
- DERIVED_FROM
- REPRINT_OF
- TRANSLATION_OF
- UNKNOWN

Different websites hosting the same text do not automatically count as independent provenance.

## Initial work identities

- WORK-ZIPING-ZHENQUAN-PINGZHU — 子平真詮評註
- WORK-SANMING-TONGHUI — 三命通會
- WORK-DITIAN-SUI-CHANWEI — 滴天髓闡微
- WORK-SHENFENG-TONGKAO — 神峰通考

These rows identify works only. R091 does not fabricate edition metadata not established by evidence.

## Rejected shortcuts

- URL_EQUALS_EDITION_IDENTITY
- SAME_TITLE_EQUALS_SAME_EDITION
- DIFFERENT_WEBSITE_EQUALS_INDEPENDENT_PROVENANCE
- FABRICATE_PUBLICATION_METADATA
- UNKNOWN_RELATIONSHIP_TREATED_AS_INDEPENDENT

No provenance-tier or Production promotion.