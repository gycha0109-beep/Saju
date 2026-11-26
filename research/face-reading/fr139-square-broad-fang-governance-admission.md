# FR139 — Square-Broad `方` Governance Admission

## Scope

FR138 already materialized the research-only blinded annotation protocol candidate for:

```text
criterion = criterion.intake.square_broad
source concept = 方大
active construct scope = fang_shape_candidate_features_only
focal term = 方
```

FR139 does not create another generic blocker wrapper. It creates the exact admission surfaces needed to consume future explicit governance evidence while keeping collection closed until that evidence exists.

## Baseline authority

Current methodology governance remains:

```text
role = role.myeongha.project_owner
actor = actor.myeongha.project_owner@0.1.0
scope = methodology_review_promotion
required approval count = 1
target-specific approval required = true
```

Current methodology state remains:

```text
target methodology = method.shenxiang.five_officers.intake_criteria@0.2.0
proposed reviewed successor = method.shenxiang.five_officers.intake_criteria@0.3.0
source snapshot = passage.shenxiang.five_officers.intake.nlc_1925
target-specific decision present = false
reviewed promotion authorized = false
```

A `continue` instruction is operational execution permission only. It is not target-specific approval evidence.

## Materialized methodology-decision admission surface

FR139 validates a future candidate only when it is bound to the exact governed tuple:

```text
method.shenxiang.five_officers.intake_criteria@0.2.0
-> method.shenxiang.five_officers.intake_criteria@0.3.0
sourceRefsSnapshot = [passage.shenxiang.five_officers.intake.nlc_1925]
authorityActorRef = actor.myeongha.project_owner@0.1.0
```

The candidate must carry non-empty explicit decision evidence refs and an explicit project-owner decision-evidence flag.

Structural validity is deliberately insufficient for issuance. FR139 does not append a decision to FR124 and does not promote the methodology.

## Materialized annotation-governance admission surface

FR136 established:

```text
project-owner methodology governance != square-broad annotation semantic authority
```

FR139 therefore defines a separate criterion-specific research semantic annotation designation candidate contract bound to the FR138 protocol and label schema:

```text
authorityScope = criterion_specific_research_semantic_annotation
criterionRef = criterion.intake.square_broad
activeConstructScope = fang_shape_candidate_features_only
protocolRef = research.protocol.face.intake.square_broad.fang_blinded_annotation@0.1.0
labelSchemaRef = research.label_schema.face.intake.square_broad.fang_shape_hypothesis@0.1.0
```

A candidate must provide its own annotation authority ref, designation actor ref, and designation evidence refs. Its authority source must be separately scoped from methodology promotion.

Because no current governed source identifies who may designate this annotation authority, FR139 leaves:

```text
governedDesignationAuthorityResolved = false
annotationAuthorityRef = null
```

A structurally valid designation candidate is not an admitted authority.

## Reviewer policy remains intentionally null

```text
reviewerCount = null
quorum = null
consensusThreshold = null
adjudicationRuleRef = null
reviewerQualificationRef = null
```

FR101's `3 reviewers`, `2/3 agreement`, and `2 non-abstain labels` remain non-transferable precedent only.

## Decision request artifact

FR139 adds:

```text
repo:governance/face-reading/square-broad-fang-governance-decision-request-v1.md
```

The file contains the exact methodology target/successor/source tuple and a project-owner approval statement template, plus the separate annotation-governance requirements.

The request file is not approval evidence and is not a designation record.

## Collection boundary

Current state after FR139:

```text
methodologyDecisionSatisfied = false
annotationAuthoritySatisfied = false
protocolCandidateMaterialized = true
humanSemanticCollectionAuthorized = false
empiricalSemanticEvidenceAcquisitionAuthorized = false
```

No human labels, metric binding, calibration, threshold, criterion state, claim, or narrative are issued.

Production remains on the FR137 `unsupported_method` path.

## Next frontier

```text
explicit_project_owner_target_specific_methodology_review_decision_evidence_and_separately_governed_square_broad_annotation_authority_designation
```

At that frontier, actual decision evidence can be consumed. Human collection still requires a later explicit collection-authorization step after both authority tracks are satisfied.
