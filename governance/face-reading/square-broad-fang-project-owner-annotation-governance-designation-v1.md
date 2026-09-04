# MyeongHa Face Reading — Square-Broad `方` Annotation Governance Designation v1

Status: designated
Effective date: 2026-09-04
Designation actor: `actor.myeongha.project_owner@0.1.0`
Authority scope: `criterion_specific_research_semantic_annotation`

## Criterion-specific designation

The project owner establishes a separately scoped research annotation authority role for the FR138 `方` protocol:

```text
criterion = criterion.intake.square_broad
construct scope = fang_shape_candidate_features_only
protocol = research.protocol.face.intake.square_broad.fang_blinded_annotation@0.1.0
label schema = research.label_schema.face.intake.square_broad.fang_shape_hypothesis@0.1.0
annotation authority role = role.face.intake.square_broad.fang.independent_human_reviewer@0.1.0
```

This designation is intentionally independent from the project owner's methodology-review-promotion authority. It is a project governance decision establishing which role may later be populated by concrete human reviewer actors for this research protocol.

The project owner does **not** become a semantic reviewer merely by issuing this designation.

## Reviewer policy remains unresolved

This designation does not invent reviewer mechanics:

```text
concrete reviewer actor refs = []
reviewerCount = null
quorum = null
consensusThreshold = null
adjudicationRuleRef = null
reviewerQualificationRef = null
```

FR101 values are criterion-specific precedent and are not reused here.

## Collection remains closed

This designation does not itself authorize human semantic collection or empirical semantic evidence acquisition. Before collection, downstream governance must assign concrete independent human reviewer actor(s), establish whatever reviewer policy is explicitly approved, and issue a separate collection authorization.

## Boundaries

The annotation role does not establish traditional semantic authority, metric binding, construct validity, calibration, threshold, criterion state, claim, or narrative authority. Human research labels produced later remain research evidence until separately evaluated under construct-validity and operationalization authority.
