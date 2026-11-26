# FR195 — Provider ↔ Neutral Zygion Correspondence Evidence Audit

Status: research-only governance authority

Issue: #768

Baseline:

```text
main = 2d3f06d7a1f58b82d7ec7aa59d5991a18ff42e1c
FR194 = packages/face-reading/src/face-reading-cheek-mid-face-neutral-target-feasibility-fr194.ts
provider = @mediapipe/tasks-vision 0.10.35
```

## 1. Purpose

FR194 established a neutral bilateral cheek/mid-face target model and exact-provider surface feasibility while leaving the first semantic gate blocked:

```text
provider_to_neutral_zygion_correspondence = blocked
```

FR195 audits whether currently available evidence is strong enough to assign any MediaPipe provider index to the neutral anthropometric `zygion` concept.

Verdict:

```text
provider_pair_candidate_supported_zygion_correspondence_unresolved
```

## 2. Exact provider evidence

Pinned provider source:

```text
repository = google-ai-edge/mediapipe
tag = v0.10.35
path = mediapipe/tasks/web/vision/face_landmarker/face_landmarks_connections.ts
symbol = FACE_LANDMARKS_FACE_OVAL
```

The published face oval includes both provider indices:

```text
234
454
```

This supports only:

```text
both indices are release-exact face-oval members
```

It does not support:

```text
234 = zygion
454 = zygion
234/454 order = anatomical left/right
234↔454 = governed bizygomatic metric
```

## 3. Peer-reviewed provider-use evidence

Dat et al. 2025:

- *AI-Assisted Fusion Technique for Orthodontic Diagnosis Between Cone-Beam Computed Tomography and Face Scan Data*
- DOI: `10.3390/bioengineering12090975`
- PMCID: `PMC12467118`

The paper uses MediaPipe landmarks `234` and `454` as a bilateral facial-width proxy during pose/scale normalization.

FR195 admits exactly this observation:

```text
provider pair [234,454] has peer-reviewed use as a facial-width proxy
```

Critical limitation:

```text
facial-width proxy != independently validated anthropometric zygion correspondence
```

The study does not provide:

- expert-labeled zygion ground truth,
- direct per-index zygion validation,
- MyeongHa provider-side semantics,
- universal anthropometric mapping,
- cheek boundary authority,
- metric/threshold/calibration authority.

## 4. Candidate pair admitted by FR195

```text
providerIndices = [234, 454]
providerRole = bilateral_lateral_facial_width_proxy_candidate
pairOrderHasSemanticMeaning = false
faceOvalMembershipSupported = true
peerReviewedFacialWidthProxyUseSupported = true
neutralZygionCorrespondenceEstablished = false
anatomicalLeftRightAssignmentEstablished = false
admittedProviderIndices = []
```

The pair is a research candidate only. No provider index is admitted as neutral anatomy.

## 5. Runtime inspection boundary

`inspectMediaPipeProviderZygionCandidatePairFR195()` may verify only that both candidate indices are present in the exact runtime `FACE_LANDMARKS_FACE_OVAL` graph.

It always reports:

```text
pairOrderHasSemanticMeaning = false
zygionCorrespondenceObserved = false
providerSideSemanticsObserved = false
```

Runtime topology presence cannot create anatomical semantics.

## 6. Admission gates

```text
release_exact_provider_pair_membership     = satisfied
peer_reviewed_facial_width_proxy_use       = satisfied
provider_to_neutral_zygion_correspondence  = blocked
provider_side_assignment                   = blocked
cheek_boundary_correspondence              = blocked
deterministic_cheek_geometry               = blocked
```

## 7. Why explicit community mappings are not authority

Community code, tutorials, and dissertation-like materials sometimes call `234/454` cheek or zygion points.

FR195 does not treat those labels as provider semantic authority because they do not establish independently validated anthropometric correspondence for the exact pinned provider release.

They may motivate candidate investigation, but cannot authorize index admission.

## 8. Authority firewall

All remain false:

```text
provider234IsZygion
provider454IsZygion
providerPairOrderMeansAnatomicalLaterality
facialWidthProxyMeansBizygomaticAuthority
faceOvalMembershipMeansZygionCorrespondence
providerIndexSelectionAuthorized
providerSubgraphSelectionAuthorized
cheekBoundaryAuthorized
cheekMetricAuthorized
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

## 9. Next required gate

```text
direct_provider_to_neutral_zygion_correspondence_validation
```

Acceptable future evidence must be one of:

1. a source-governed provider semantic mapping that explicitly identifies the relevant provider landmark as zygion-equivalent; or
2. an independently validated cross-system study comparing provider landmarks against neutral anthropometric zygion ground truth with a reproducible correspondence method.

FR195 itself does not authorize participant/expert collection and does not create such a study.

## 10. Next frontier

```text
obtain_source_governed_or_independently_validated_provider_to_zygion_correspondence_before_any_provider_index_admission
```

## 11. Non-scope

```text
provider index admission
234/454 anatomical side assignment
zygion equivalence assertion
cheek polygon or mask
provider cheek subgraph
bizygomatic metric
thresholds/calibration/classifiers
new capture requirements
traditional 六府 projection
Production / Commerce
MediaPipe upgrade
```
