# FR300-R1S-ZC — MINDS-Libras exact public metadata and metric-schema qualification

Watchtower-Track: face-engine

## Decision

FR300-R1S-ZC executes only the metadata-first half of the MINDS-Libras qualification.

It does not download, inspect, commit, or derive measurements from subject RGB, depth, or face-coordinate artifacts.

The current gate is:

```text
public metadata          = bound where exposed
creator metric schema    = bound
exact publisher filename = unresolved
exact publisher checksum = unresolved
participant commercial product-development scope = unresolved
released-byte meter survivability = unresolved

subject artifact inspection = not authorized by this contract
FR299 = false
FR300-R2 = false
paid spend = false
product = 18/29
```

## 1. Public distribution identity

The public catalog record derived from Zenodo metadata binds:

- DOI `10.5281/zenodo.4322984`;
- version `1`;
- publication date `2020-12-15`;
- downloadable distribution;
- ZIP format;
- distribution size `2,149,770,033` bytes;
- Creative Commons Attribution 4.0 International.

This is enough to bind a specific public distribution description, but not enough to claim exact archive identity.

The public evidence surface used in this task did not expose an authoritative archive filename, publisher file identifier, or publisher checksum.

Those fields are deliberately persisted as `null`.

No guessed filename and no locally invented digest may satisfy the publisher-identity gate.

## 2. Creator-described FaceModel schema

The UFMG creator thesis documents the RGB-D sensor path using Kinect v2 for Xbox One.

For each described RGB-D sample:

- 150 frames are represented;
- face information uses 11 logical rows per frame;
- the corresponding text representation is described as 1,650 logical lines for 150 frames;
- `FaceModel` rows 5, 6, and 7 contain X, Y, and Z for 1,347 face points;
- `ColorFaceModel` rows 8 and 9 map the same 1,347 points to the RGB frame;
- `DepthFaceModel` rows 10 and 11 map the same 1,347 points to the depth frame.

The creator documentation describes FaceModel as referenced to the sensor geometric center and documents ranges in meters:

```text
X = [-2.2, +2.2] m
Y = [-1.6, +1.6] m
Z = [ 0.0, +4.0] m
```

This establishes a documented metric schema.

It does **not** establish that the exact released bytes preserve that metric representation.

## 3. RAP3DF lesson carried forward

RAP3DF demonstrated that source/native metric semantics and released artifact semantics can diverge.

Therefore R1S-ZC explicitly separates:

```text
creatorDocumentationBindsMeterSemantics = true
releasedBytesInspected = false
releasedByteMeterSurvivability = unresolved
fr299MetricScaleVerifiedIssued = false
```

No paper/thesis statement can silently set FR299 `metricScaleVerified=true`.

A later artifact-inspection task must prove that the released FaceModel values retain the documented meter-space semantics and were not normalized, quantized, projected, or otherwise transformed in a scale-destroying way.

## 4. Kinect landmark indices are not FR299 truth

The creator documentation identifies Kinect face topology labels including:

- `NoseTip = 18`;
- `NoseTop = 24`.

R1S-ZC does not promote either index into the provider-independent FR299 reference.

Index 18 may be used only for bounded topology/debugging purposes. It is not automatically the FR266 annotation:

```text
most_prominent_midline_nasal_apex_point_in_canonical_aligned_metric_3d
```

Index 24 is not established as the FR297 bridge-root definition:

```text
point_of_maximal_curvature_of_midline_nasal_profile_curve_at_nasal_root_end
```

The following remain false:

```text
fr266GroundTruthIssued = false
fr297GroundTruthIssued = false
providerIndicesVisibleDuringFR266Annotation = false
providerIndicesVisibleDuringFR297Annotation = false
noseTopEquivalentToFR297BridgeRootIssued = false
```

This preserves the provider-blind annotation boundary already frozen by FR266, FR297, FR298, and FR299.

## 5. Copyright license and participant rights remain separate

The dataset distribution is described as CC BY 4.0.

R1S-ZC treats that as dataset copyright-license authority only.

It does not infer from CC BY 4.0 that every participant authorized facial RGB, depth, or 3D face-coordinate data for commercial product-development validation.

No public source located in this task established that participant scope.

Therefore:

```text
datasetCopyrightLicenseBound = true
participantCommercialProductDevelopmentScope = unresolved
datasetLicenseMaySubstituteForParticipantConsent = false
subjectArtifactInspectionAuthorizedByThisContract = false
```

This is a rights/consent fail-closed boundary, not a claim that the use is prohibited.

## 6. No subject artifact acquisition in R1S-ZC

The public distribution is approximately 2.15 GB and contains human RGB-D/face data.

R1S-ZC intentionally does not fetch it merely because the archive is zero-cost.

This track records:

```text
subjectArtifactDownloadPerformedByThisTrack = false
rawSubjectArtifactCommittedToRepository = false
```

The next task must first try to resolve publisher archive identity and participant product-development scope through metadata/document authority.

Only a later explicitly authorized artifact-inspection stage may parse subject face-coordinate data.

## 7. Future artifact parser contract

If the rights gate later permits inspection, the parser must validate rather than assume the creator-described schema.

For a qualifying face sample it must verify at minimum:

```text
frameCount = 150
logicalRowsPerFrame = 11
FaceModel X/Y/Z each = 1347 values
ColorFaceModel X/Y each = 1347 values
DepthFaceModel X/Y each = 1347 values
all required FaceModel XYZ values finite
```

It must additionally adjudicate whether released XYZ values preserve physical meter scale.

Plausible numeric ranges alone are not sufficient proof of unit semantics.

## 8. Registration remains downstream

The documented source frame is:

```text
Kinect v2 sensor geometric-center referenced meter space
```

FR299 requires:

```text
canonical_aligned_right_handed_metric_3d
unit = centimeter
external validated registration receipt
```

R1S-ZC does not issue that transform.

Meter-to-centimeter conversion alone is insufficient because canonical pose/orientation and external validation remain required.

FaceRotation, HeadPivot, and AnimationUnits are documented as available auxiliary fields, but their presence does not itself issue a canonical transform or neutral-frame protocol.

## 9. Frozen gate

```text
status =
  public_metadata_and_creator_schema_bound_subject_artifact_inspection_blocked

technicalQualification =
  documented_metric_schema_not_released_byte_qualified

rightsQualification =
  dataset_copyright_license_bound_participant_product_scope_unresolved

disposition =
  hold_before_subject_artifact_inspection

paidSpendAuthorized = false
fr299EligibleCandidateCount = 0
fr300R2EligibleCandidateCount = 0
productMaterialization = 18/29
```

## 10. Next frontier

Priority remains zero-cost and metadata-first:

1. bind an authoritative Zenodo publisher archive filename/file identifier/checksum without inspecting subject content if the metadata endpoint exposes them;
2. search source authority for participant consent or data-use scope covering commercial product-development validation;
3. only after the rights gate permits it, inspect a released FaceModel artifact for exact schema and meter survivability;
4. only after metric survivability passes, design and validate the external canonical registration;
5. only after provider-blind FR266/FR297 annotations exist may a real FR299 bundle be considered.

No paid acquisition is authorized.

Watchtower-Track: face-engine
