# R097 — reproducible scan-page inspection manifest

Date: 2026-09-20  
Issue: #1050  
Status: INSPECTION MANIFEST DEFINED

## Required identity

- work / edition / witness IDs;
- immutable file locator when available;
- file checksum;
- PDF/image page index;
- printed page label separately, if present.

## Region/render metadata

- declared coordinate system;
- crop/bounding box when claim-local;
- rotation/orientation;
- rendering DPI/scale;
- exact visible-text transcription;
- transcription method;
- uncertainty/illegible spans;
- inspector timestamp/tool version where applicable;
- supported claim IDs.

## Transcription methods

`HUMAN_VISUAL | BUILT_IN_VISION | OCR_LAST_RESORT`

OCR output is a transcription attempt, not the witness itself.

## Reproducibility rules

- page index and printed page label are distinct;
- coordinates require an explicit coordinate system;
- unclear characters remain marked uncertain;
- changed file checksum requires re-inspection;
- screenshot/crop without source/witness identity is insufficient provenance.

## Rejected shortcuts

- PDF_INDEX_EQUALS_PRINTED_PAGE
- OCR_OUTPUT_EQUALS_WITNESS_TEXT
- SILENTLY_GUESS_ILLEGIBLE_CHARACTERS
- SCREENSHOT_WITHOUT_WITNESS_IDENTITY
- REUSE_REGION_AFTER_FILE_CHECKSUM_CHANGE

No Production promotion from inspection metadata alone.