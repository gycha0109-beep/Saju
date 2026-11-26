# FR138 — `方` Research-only Blinded Semantic Annotation Protocol Candidate

## Scope

Target:

```text
criterion.intake.square_broad
sourceConcept = 方大
activeConstructScope = fang_shape_candidate_features_only
focal construct = 方
```

This artifact materializes a practical annotation protocol/packet candidate for the `方` construct-validity research frontier. It does **not** authorize human semantic collection and it does **not** promote the intake methodology.

## Current governed source

```text
passage = passage.shenxiang.five_officers.intake.nlc_1925
witness status = scan_checked
methodology = method.shenxiang.five_officers.intake_criteria@0.2.0
methodology review status = research
```

Relevant source segment:

```text
口須要方大
```

The focal term for this phase is only:

```text
方
```

`scan_checked` is source provenance, not reviewed semantic authority.

## Governance audit carried forward

FR131 materializes current-stage methodology review governance:

```text
authority role = role.myeongha.project_owner
scope = methodology_review_promotion
required approvals = 1
target-specific approval required = true
external expert required = false
```

But FR131 explicitly does not issue a target-specific methodology review decision. Current state remains:

```text
target-specific review decision present = false
reviewed promotion authorized = false
methodology review decisions issued = 0
```

FR136 separately established that project-owner methodology governance does not become square-broad annotation semantic authority. No reusable `square_broad` annotation authority, protocol, label schema, reviewer policy, consensus policy, adjudication policy, or reviewer qualification policy exists.

## Materialized research protocol candidate

Protocol candidate ref:

```text
research.protocol.face.intake.square_broad.fang_blinded_annotation@0.1.0
```

Label-schema candidate ref:

```text
research.label_schema.face.intake.square_broad.fang_shape_hypothesis@0.1.0
```

Research labels:

```text
supports_fang_shape_hypothesis
does_not_support_fang_shape_hypothesis
unable_to_conclude
```

These labels are deliberately phrased as **hypothesis assessments**. They are not traditional criterion states and do not establish that any neutral image metric is equivalent to `方`.

### Reviewer instruction

The reviewer is asked to assess only whether the visible mouth contour-set, as a whole, supports the research hypothesis of a predominantly square or rectilinear form for `方`.

The reviewer must not:

- equate aspect ratio with `方`
- equate angularity with `方`
- equate rectilinearity with `方`
- judge `大`
- judge `端厚`
- judge `角弓`
- judge `開大合小`
- judge `唇紅`
- assign outer/inner anatomical contour roles
- infer a threshold or traditional metric binding

## Blinding contract

The initial semantic reviewer must not receive:

```text
FR134 candidate metric values
candidate thresholds
peer labels
model/provider results
automated traditional interpretation
```

Initial assessments must be independent. An `unable_to_conclude` path is mandatory.

## Packet provenance

The packet template carries only opaque/provenance references required to bind a future assessment to the acquisition record:

```text
packetRef
researchSubjectRef
captureSeriesRef
captureRef
criterionRef
sourcePassageRef
methodologyRef
protocolRef
labelSchemaRef
```

Packet input rejects extra fields so candidate metric values, thresholds, peer labels, provider results, or automated interpretations cannot be smuggled into the reviewer packet contract.

The packet persists no:

```text
raw image content
source image content
face embedding
identity template
candidate metric values
candidate thresholds
peer labels
```

## Unresolved policy — intentionally not invented

```text
annotationAuthorityRef = null
reviewerCount = null
quorum = null
consensusThreshold = null
adjudicationRuleRef = null
reviewerQualificationRef = null
```

The FR101 values for `criterion.intake.lips_substantial` are not transferred.

## Collection gate

Protocol design is not collection authority.

Current state remains:

```text
humanSemanticCollectionAuthorized = false
empiricalSemanticEvidenceAcquisitionAuthorized = false
```

Before actual human semantic collection, at minimum the unresolved target-specific methodology decision and reviewer/annotation governance must be explicitly resolved under their own authority.

## Downstream authority remains closed

FR138 issues no:

```text
annotation semantic authority
human semantic labels
traditional metric binding
calibration protocol
threshold
criterion state
structured claim
bounded narrative
traditional semantic authority
```

Production remains governed by the FR137 fail-closed `unsupported_method` path.

## Next frontier

```text
square_broad_fang_annotation_governance_and_target_specific_methodology_decision_before_any_human_semantic_collection
```

The next step is no longer another generic blocker wrapper. The protocol mechanics, blinding, provenance packet, hypothesis labels, and abstention path are materialized. What remains is an explicit policy/authority decision before collection can legally and methodologically begin.
