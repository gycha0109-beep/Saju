# FR300-R1 — RAP3DF V2 qualification and raw-depth evidence boundary

Watchtower-Track: face-engine

## 1. Decision

FR300-R1 corrects the dataset-rights model introduced by FR300 and audits RAP3DF V2 as the next real independent-depth candidate.

The result is deliberately mixed:

- the RAP3DF V2 dataset licence is no longer missing;
- copyright/database reuse under that licence is not the current blocker;
- participant personality/privacy and exact consent scope remain unresolved;
- V2 raw-depth physical-unit binding remains unresolved;
- MyeongHa canonical registration remains unresolved;
- no real source bytes were retrieved in the current execution;
- no real FR299 bundle is materialized.

Product materialization remains 18/29.

## 2. Official RAP3DF V2 dataset evidence

Official Mendeley Data source:

`https://data.mendeley.com/datasets/kpdkpcs8zb`

Version:

`4`

DOI:

`10.17632/kpdkpcs8zb.4`

The official version-4 record identifies the dataset as RAP3DF V2 and documents:

- 80 volunteers;
- approximately 1600 facial samples;
- visible, infrared and depth images;
- frontal, left, right, up, down and random-pose collections;
- `rgb_.bmp`;
- `ir_.bmp`;
- `depth_.bmp`;
- `depth_.data` described as Kinect One raw data;
- `database.json` containing face-direction descriptions;
- licence: Creative Commons Attribution 4.0 International.

The Mendeley version-comparison page is the governing licence evidence used by this contract:

`https://data.mendeley.com/datasets/compare/kpdkpcs8zb`

## 3. CC BY 4.0 correction

Creative Commons' official CC BY 4.0 deed states that licensed material may be shared and adapted for any purpose, including commercially, subject to attribution and the other licence conditions:

`https://creativecommons.org/licenses/by/4.0/`

Therefore the following FR300 states are corrected for RAP3DF V2 at the copyright/database-licence layer:

- commercial product development: `explicitly_allowed`;
- local raw-data processing: `explicitly_allowed`;
- raw-data redistribution: `explicitly_allowed`;
- derived reference metadata publication: `explicitly_allowed`.

This removes the earlier class of blocker:

`license_evidence_missing`

for RAP3DF V2.

It also removes copyright/database-licence interpretations of:

- `commercial_product_development_rights_unresolved`;
- `local_raw_data_processing_rights_unresolved`;
- `derived_reference_metadata_publication_rights_unresolved`.

Attribution remains required whenever the licence requires it.

## 4. Personality/privacy is a separate gate

CC BY 4.0 does not itself grant all publicity, privacy, moral or similar personality rights.

FR300-R1 therefore extends the generic FR300 qualification evidence with two independent dimensions:

- `personalityPrivacyUseStatus`;
- `participantConsentScopeStatus`.

The related RAP3DF Data in Brief article documents that participants were informed about the project and signed a consent form and an image-use term. It also records ethics approval CAAE `97615018.9.0000.012`.

Related article:

`https://pmc.ncbi.nlm.nih.gov/articles/PMC7509182/`

However, the exact signed consent/image-use text was not present in the audited public material.

FR300-R1 therefore does not infer that those documents explicitly authorize MyeongHa commercial product-development use.

Current blockers:

- `personality_privacy_scope_unresolved`;
- `participant_consent_scope_unresolved`.

This is not a finding that commercial use is prohibited. It is a fail-closed finding that the exact participant-level scope has not been established by the audited evidence.

## 5. V1 article versus V2 dataset

The related 2020 Data in Brief article describes the original RAP3DF collection of 64 volunteers / 267 samples.

For that documented collection it states:

- visible, IR and depth were collected at the same time for each sample;
- Kinect One was the acquisition device;
- raw depth `.data` contains a list of 8-byte floating-point values;
- the stored raw information was provided by Kinect One without manipulation.

Those statements are useful predecessor evidence.

They are not automatically treated as proof that RAP3DF V2 version 4 uses the exact same serialization or value semantics.

FR300-R1 freezes:

`relatedV1ArticleEncodingIsV2EncodingProof = false`

until the V2 bytes or V2-specific acquisition/serialization evidence is inspected.

## 6. Kinect native depth semantics are not dataset semantics

Microsoft's Kinect v2 SDK documentation states that a native DepthFrame stores 16-bit unsigned integer values representing distance in millimeters:

`https://learn.microsoft.com/en-us/previous-versions/windows/kinect/dn772983(v=ieb.10)`

This creates an important distinction:

```text
native Kinect v2 DepthFrame
    = uint16 distance in millimeters

related RAP3DF V1 .data description
    = 8-byte floating-point values

RAP3DF V2 depth_.data
    = official Mendeley page says Kinect One raw data
      but audited public metadata does not establish
      the exact serialization/value-unit bridge
```

Therefore Microsoft documentation alone cannot issue RAP3DF V2 metric-scale authority.

FR300-R1 freezes:

`microsoftNativeDepthSemanticsAreDatasetSerializationProof = false`

## 7. Raw-depth inspection contract

FR300-R1 adds an executable inspection report for a future locally supplied `depth_.data` artifact.

Required inputs include:

- opaque artifact reference;
- SHA-256 digest;
- whether the actual source bytes were inspected;
- byte length;
- width and height;
- bytes per value;
- numeric encoding;
- total value count;
- finite value count;
- finite minimum and maximum;
- dataset-specific serialization evidence;
- dataset-specific value-unit evidence;
- explicit evidence that stored values bind to native Kinect depth-distance millimeters.

The structural check verifies:

`byteLength == width * height * byteWidthPerValue`

and requires all counted values to be finite.

Even a structurally valid file only reaches:

`ready_for_metric_scale_adjudication`

FR300-R1 itself still issues:

`metricScaleVerifiedByFR300R1 = false`

The final metric-scale authority requires a separately governed adjudication of the inspected artifact and its evidence.

## 8. Current empirical execution state

The current execution environment could retrieve the public metadata and documentation but could not retrieve the actual RAP3DF V2 dataset bytes from Mendeley Data.

No substitute or synthetic digest is used.

Current state is frozen as:

```text
sourceBytesRetrievedInCurrentExecution = false
sourceArtifactDigestIssued = false
rawDepthEncodingVerifiedFromBytes = false
metricScaleVerified = false
canonicalRegistrationReady = false
realFR299BundleMaterialized = false
```

Synthetic unit-test fixtures are contract tests only and are not RAP3DF evidence.

## 9. Source metadata discrepancy

A second source-quality issue was found.

Mendeley Data version 4 says RAP3DF V2 contains:

`80 volunteers`

The author's 2021 UNIVALI thesis describes RAP3DF 2.0 as:

`90 volunteers`

and approximately 1600 samples.

Thesis:

`https://biblioteca.univali.br/pergamumweb/vinculos/pdf/Rafael%20Alexandre%20Piemontez%202021.pdf`

FR300-R1 records the discrepancy instead of choosing one value.

For dataset-version metadata, the versioned Mendeley record remains the primary source.

The 80/90 discrepancy does not itself prevent a pilot against one individually verified subject/capture, but it prevents silently treating the two source descriptions as identical.

## 10. Current qualification result

RAP3DF V2 remains:

`blocked`

but for a narrower and more accurate set of reasons.

Expected blockers are:

- `metric_scale_not_documented`;
- `source_3d_registration_not_documented`;
- `source_3d_registration_frame_missing`;
- `personality_privacy_scope_unresolved`;
- `participant_consent_scope_unresolved`.

Expected non-blockers are:

- `license_evidence_missing`;
- `commercial_product_development_rights_unresolved`;
- `local_raw_data_processing_rights_unresolved`;
- `derived_reference_metadata_publication_rights_unresolved`.

## 11. Canonical registration remains separate

Nothing in RAP3DF V2's CC BY licence, Kinect native depth semantics, the V1 article, or the V2 thesis issues the transform:

`RAP3DF depth frame -> canonical_aligned_right_handed_metric_3d`

FR300-R1 therefore issues no registration transform.

If real bytes and metric scale are later verified but no independent canonical registration method is already governed, the next evidence task is FR300-R2.

FR300-R2 must not use MediaPipe/provider output as the independent reference registration authority.

## 12. Authority boundary

FR300-R1 issues no:

- participant personality/privacy clearance;
- exact consent-scope clearance;
- V2 raw-depth serialization inference from V1;
- V2 physical metric-scale verification;
- source-to-canonical registration;
- FR266 real annotation;
- FR297 real annotation;
- FR298 real reference scalar;
- FR299 real reference bundle;
- RGB candidate;
- benchmark winner;
- threshold;
- traditional binding;
- product materialization;
- Production activation;
- Commerce activation.

Watchtower-Track: face-engine
