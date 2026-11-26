# FR196 — Provider ↔ Neutral Zygion Authority Acquisition Audit

Status: research-only governance authority

Issue: #778

Reviewed: 2026-09-18

Baseline:

```text
main = 06cb490a931da5e1d01c902c1db3a0aed31e7645
FR195 = packages/face-reading/src/face-reading-cheek-mid-face-provider-correspondence-audit-fr195.ts
provider = @mediapipe/tasks-vision 0.10.35
```

## 1. Purpose

FR195 admitted one narrow provider candidate:

```text
providerPair = [234, 454]
providerRole = bilateral_lateral_facial_width_proxy_candidate
```

and explicitly blocked:

```text
provider_to_neutral_zygion_correspondence
provider index admission
provider side assignment
cheek geometry
bizygomatic metric authority
Production / Commerce
```

FR196 performs the last public external-authority acquisition audit before defining an independent validation protocol.

The question is not whether 234 and 454 look lateral on a face or are useful for width normalization. The question is whether admissible evidence establishes either:

1. a source-governed MediaPipe semantic mapping from the provider indices to anthropometric `zygion`; or
2. an independent validation study comparing the provider indices against neutral, independently labelled zygion ground truth.

## 2. Verdict

Within the reviewed public source scope as of 2026-09-18:

```text
authorityAcquisitionVerdict = candidate_evidence_found_but_validation_insufficient
sourceGovernedZygionMappingFound = false
independentProviderToZygionValidationFound = false
peerReviewedProviderWidthCandidateEvidenceExists = true
neutralZygionAnatomyEvidenceExists = true
providerToNeutralZygionCorrespondence = blocked
```

Target authority state:

```text
external_authority_exhausted_candidate_supported_direct_validation_required
```

`external_authority_exhausted` here means the reviewed public authority-acquisition scope is closed for this gate. It is not a claim that no unpublished, inaccessible, or future source can ever exist.

## 3. Exact provider source audit

Pinned source:

```text
repository = google-ai-edge/mediapipe
tag = v0.10.35
path = mediapipe/tasks/web/vision/face_landmarker/face_landmarks_connections.ts
symbol = FACE_LANDMARKS_FACE_OVAL
```

Source:

- https://github.com/google-ai-edge/mediapipe/blob/v0.10.35/mediapipe/tasks/web/vision/face_landmarker/face_landmarks_connections.ts

The exact provider source includes:

```text
[356, 454]
[454, 323]
...
[93, 234]
[234, 127]
```

Therefore the exact release establishes:

```text
234 ∈ FACE_LANDMARKS_FACE_OVAL
454 ∈ FACE_LANDMARKS_FACE_OVAL
```

It does not publish:

```text
234 = zygion
454 = zygion
234 = anatomical left/right zygion
454 = anatomical left/right zygion
234↔454 = governed bizygomatic metric
```

A repository-wide `zygion` semantic search also yielded no source-governed mapping in the reviewed public repository state.

## 4. Official MediaPipe documentation audit

Reviewed official documentation:

- https://developers.google.com/edge/mediapipe/solutions/vision/face_landmarker
- https://ai.google.dev/edge/api/mediapipe/python/mp/tasks/vision/FaceLandmarkerResult

The official documentation describes a complete dense face mesh, normalized facial landmarks, blendshapes, transformation matrices, and broad semantic regions/contours.

This is useful provider output authority. It is not a provider-index anthropometric dictionary.

No reviewed official documentation assigns `zygion` to index 234 or 454.

The distinction remains:

```text
complete face mesh output
!= per-index anthropometric semantic authority
```

## 5. Peer-reviewed provider-use evidence

Primary provider-use evidence remains Dat et al. 2025:

- *AI-Assisted Fusion Technique for Orthodontic Diagnosis Between Cone-Beam Computed Tomography and Face Scan Data*
- DOI: `10.3390/bioengineering12090975`
- PMCID: `PMC12467118`
- https://pmc.ncbi.nlm.nih.gov/articles/PMC12467118/

The study computes the distance between MediaPipe landmarks 234 and 454 and uses it as a facial-width proxy during normalization/alignment.

This directly supports:

```text
[234,454] is a published bilateral facial-width candidate pair
```

It does not directly support:

```text
234 or 454 was independently labelled as zygion
provider-to-zygion localization error was measured
anthropometric equivalence was validated
provider-side anatomical semantics were validated
```

Critical invariant:

```text
facial-width proxy != anthropometric zygion validation
```

## 6. Additional published candidate corroboration

Additional published work was found using 234/454 as cheek or full-face-width reference points, including a 2025 ICCV workshop paper on automated facial aesthetic assessment.

Example:

- *Automated Assessment of Aesthetic Outcomes in Facial Plastic Surgery*
- https://openaccess.thecvf.com/content/ICCV2025W/CVAMD/papers/Varghaei_Automated_Assessment_of_Aesthetic_Outcomes_in_Facial_Plastic_Surgery_ICCVW_2025_paper.pdf

The paper identifies 234 and 454 as cheek reference points and uses them for full facial width in its morphometric pipeline.

This is corroboration of practical provider usage only. It is not admitted as anthropometric zygion validation because it does not report independently labelled zygion ground truth or a provider↔zygion validation protocol.

Other application papers similarly select MediaPipe landmarks for facial measurements, ROI tracking, symmetry, or feature extraction. Such downstream naming cannot back-propagate semantic authority into the MediaPipe provider.

## 7. Neutral zygion anatomy remains independently supported

FR194 already pinned neutral anthropometric support including Anas et al. 2019:

- *A comparison between 2D and 3D methods of quantifying facial morphology*
- DOI: `10.1016/j.heliyon.2019.e01880`
- PMCID: `PMC6579906`

That evidence supports a neutral `zygion` anatomical concept independently of MediaPipe.

Other 3D facial studies manually digitize zygion as an anatomical landmark, confirming that a neutral ground-truth concept can be defined without MediaPipe.

However:

```text
neutral zygion definition
+
MediaPipe lateral face vertex
!=
validated provider↔zygion correspondence
```

No reviewed neutral-anatomy source maps its zygion labels to MediaPipe 234/454 under a reproducible cross-system validation method.

## 8. Why visual and community mappings remain inadmissible

The reviewed ecosystem contains diagrams, tutorials, packages, repositories, and application papers that call 234/454 `cheek`, `face width`, or similar names.

Those materials can support candidate selection for research, but they cannot satisfy the correspondence gate unless they provide at least one of:

```text
source-governed provider semantics explicitly naming zygion
OR
independently labelled neutral zygion ground truth + reproducible provider correspondence validation
```

FR196 therefore refuses semantic promotion from:

```text
visual appearance
face-oval location
community labels
cheek naming
facial-width use
canonical mesh position
```

## 9. Evidence-class firewall

FR196 keeps four evidence classes separate:

```text
provider_source
official_documentation
peer_reviewed_provider_use
neutral_anatomy
```

Their allowed contributions are intentionally non-interchangeable.

### provider_source

Can establish exact release topology membership.

Cannot establish zygion because no such semantic label is published.

### official_documentation

Can establish provider output shape and broad face-mesh semantics.

Cannot establish an unpublished per-index anthropometric label.

### peer_reviewed_provider_use

Can establish that 234/454 are used as a facial-width proxy candidate.

Cannot convert downstream use into provider semantic authority.

### neutral_anatomy

Can establish what zygion means independently of MediaPipe.

Cannot choose a MediaPipe index without correspondence validation.

## 10. Authority firewall

All remain false:

```text
provider234IsZygion
provider454IsZygion
providerPairOrderMeansAnatomicalLaterality
providerIndexAdmissionAuthorized
providerSideAssignmentAuthorized
bizygomaticMetricAuthorized
cheekBoundaryAuthorized
cheekSubgraphAuthorized
cheekGeometryAuthorized
thresholdAuthorized
calibrationAuthorized
classifierAuthorized
captureSufficiencyAuthorized
participantOrExpertCollectionAuthorized
traditionalProjectionAuthorized
productionActivationAuthorized
commerceActivationAuthorized
```

Coverage remains:

```text
coverage_target_unverified
```

## 11. Next required gate

FR196 closes the external authority-acquisition branch without finding sufficient direct correspondence evidence.

Next gate:

```text
independent_provider_to_neutral_zygion_validation_protocol_definition
```

Next frontier:

```text
define_independent_provider_to_neutral_zygion_validation_protocol_before_any_provider_index_admission
```

FR197 may define what an admissible independent validation protocol would require, but FR196 does not authorize participant recruitment, expert annotation collection, thresholds, acceptance criteria, provider-index admission, or any production geometry.

## 12. Non-scope

```text
234 = zygion assertion
454 = zygion assertion
provider anatomical left/right assignment
participant recruitment
expert annotation collection
new validation experiment
cheek boundary/polygon/subgraph
bizygomatic metric issuance
threshold/calibration/classifier
traditional 六府 projection
Production / Commerce
MediaPipe upgrade
```
