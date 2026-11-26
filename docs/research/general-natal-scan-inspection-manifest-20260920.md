# R097 — reproducible scan-page inspection manifest

Date: 2026-09-22  
Issue: #1050  
Status: REPRODUCIBLE INSPECTION MANIFEST CONTRACT DEFINED / NO SCREENSHOT-ONLY PROVENANCE

## Purpose

Make PDF/image/scan inspection reproducible when stable machine-readable text is unavailable.

R097 records exactly which witness file, file page, rendered region, and visible transcription an inspection used.

It does not turn OCR, screenshots, or visual inspection metadata into source authority.

## Identity ownership

R097 references, but does not replace, R091 identity records.

Required identity refs are separate:

- `workIdentityRef`
- `editionIdentityRef` when established
- `witnessIdentityRef`

A combined free-form "work/edition/witness" string is insufficient.

## File identity

Every inspection records:

- `fileLocatorRef`
- `locatorStability`
- `checksumAlgorithm`
- `fileChecksum`

Locator stability:

- `IMMUTABLE_REF`
- `MUTABLE_LOCATOR`
- `LOCAL_ARCHIVE_REF`
- `UNKNOWN`

The checksum identifies the inspected bytes.

A URL alone is not an immutable witness.

A checksum change requires a new inspection manifest; the old manifest remains historical evidence and is not rewritten.

## Page identity

Record:

- `filePageIndex`
- `pageIndexConvention`
- `printedPageLabel` when visible

R097 fixes the file-page convention to:

`ZERO_BASED_FILE_PAGE_INDEX`

The printed page label is separate metadata and is never inferred to equal the file page index.

## Render and coordinate contract

Every inspection declares:

- `coordinateSystem`
- `coordinateOrigin`
- `coordinateUnits`
- `renderedPageWidth`
- `renderedPageHeight`
- `rotationDegrees`
- `renderDpiOrScale`
- `transformOrder`

The canonical region coordinate system is:

- origin: `TOP_LEFT`
- units: `RENDERED_PAGE_PIXELS`
- bounding box: `X_Y_WIDTH_HEIGHT`

A claim-local region records an exact bounding box after the declared render/rotation transform.

Coordinates without rendered page dimensions are not reproducible.

## Transcription

Methods:

- `HUMAN_VISUAL`
- `BUILT_IN_VISION`
- `OCR_LAST_RESORT`

Each transcription records:

- exact visible-text transcription;
- method;
- tool/version when applicable;
- inspector timestamp;
- uncertainty/illegible spans;
- alternative readings only when explicitly marked as alternatives.

Unclear characters remain marked uncertain.

OCR output is a transcription attempt, not the witness text itself.

No OCR or vision output may silently overwrite the original visible transcription record.

## Claim binding

An inspection may bind a region to claim IDs, but the binding means:

`INSPECTED_REGION_EVIDENCE_FOR_CLAIM`

It does not mean:

`CLAIM_VERIFIED_BY_SCREENSHOT`

Each claim binding records:
- claim ID;
- region ref;
- transcription ref;
- provenance ref;
- relation.

Semantic support/rejection remains governed by the research evidence/provenance contracts, including R093/R096 where applicable.

## Derived crops and screenshots

A crop/screenshot derived from the inspected page records:

- parent inspection manifest ref;
- derivative checksum;
- exact parent region ref.

A detached screenshot without witness identity and parent provenance is insufficient.

## Immutability and invalidation

Inspection manifests are immutable evidence records.

A changed file checksum invalidates reuse of:
- page coordinates;
- region crops;
- transcription bindings;
- claim bindings

for the new file bytes until re-inspected.

The previous manifest remains valid only for the exact bytes it identifies.

## Rejected shortcuts

- `PDF_INDEX_EQUALS_PRINTED_PAGE`
- `PAGE_INDEX_WITHOUT_DECLARED_CONVENTION`
- `URL_EQUALS_IMMUTABLE_WITNESS`
- `CHECKSUM_WITHOUT_ALGORITHM`
- `COORDINATES_WITHOUT_RENDERED_PAGE_DIMENSIONS`
- `OCR_OUTPUT_EQUALS_WITNESS_TEXT`
- `SILENTLY_GUESS_ILLEGIBLE_CHARACTERS`
- `SCREENSHOT_WITHOUT_WITNESS_IDENTITY`
- `DETACHED_CROP_WITHOUT_PARENT_MANIFEST`
- `REUSE_REGION_AFTER_FILE_CHECKSUM_CHANGE`
- `CLAIM_BINDING_EQUALS_CLAIM_VERIFICATION`
- `R097_DUPLICATES_R091_IDENTITY_AUTHORITY`

## Authority boundary

R097 defines reproducible inspection metadata only.

It does not:
- establish edition identity;
- establish semantic equivalence;
- verify a research claim by itself;
- promote evidence state;
- authorize Production behavior.

No Production authority promotion follows from R097.
