# FR140 — Square-Broad `方` Approved Governance Materialization

## Result

FR139의 두 pending governance surface 중 다음을 실제 positive authority record로 materialize했다.

1. `method.shenxiang.five_officers.intake_criteria@0.2.0`에 대한 project-owner target-specific methodology review approval.
2. FR138 `方` research protocol을 위한 별도 criterion-specific independent-human-reviewer annotation authority role designation.

Authority state:

```text
square_broad_fang_project_owner_approval_materialized_reviewed_successor_and_independent_human_annotation_role_designated_collection_closed
```

## Methodology promotion

Exact approved tuple:

```text
target = method.shenxiang.five_officers.intake_criteria@0.2.0
reviewed successor = method.shenxiang.five_officers.intake_criteria@0.3.0
source snapshot = passage.shenxiang.five_officers.intake.nlc_1925
actor = actor.myeongha.project_owner@0.1.0
scope = methodology_review_promotion
outcome = approved_for_reviewed_promotion
```

FR140 appends `0.3.0` as a new `reviewed` methodology definition to a derived registry. FR119 historical state is not mutated and the `0.2.0` research methodology remains present as provenance.

The reviewed successor keeps the exact witness-qualified source ref and does not mutate methodology packs.

## Annotation governance

Exact designation:

```text
criterion = criterion.intake.square_broad
construct scope = fang_shape_candidate_features_only
protocol = research.protocol.face.intake.square_broad.fang_blinded_annotation@0.1.0
label schema = research.label_schema.face.intake.square_broad.fang_shape_hypothesis@0.1.0
annotation authority role = role.face.intake.square_broad.fang.independent_human_reviewer@0.1.0
designation actor = actor.myeongha.project_owner@0.1.0
```

The designation is separately scoped from methodology review promotion. It establishes an authority role only; it does not assign a concrete reviewer actor and does not authorize the project owner to self-annotate.

## Reviewer policy and collection gate

Still unresolved:

```text
concreteReviewerActorRefs = []
reviewerCount = null
quorum = null
consensusThreshold = null
adjudicationRuleRef = null
reviewerQualificationRef = null
collectionAuthorizationPresent = false
humanSemanticCollectionAuthorized = false
empiricalSemanticEvidenceAcquisitionAuthorized = false
```

No FR101 numeric reviewer policy is copied.

## Authority boundary

`reviewed` methodology status does not mean:

- FR134 neutral metric = `方`;
- construct validity established;
- metric binding authorized;
- calibration or threshold authorized;
- traditional criterion state authorized;
- structured claim or bounded narrative authorized.

The annotation authority role also does not mean any of the above and does not itself permit collection.

Production therefore remains on the FR137 `unsupported_method` path for `five_officers.intake.static_support` until empirical and operationalization gates are separately satisfied.

## Next frontier

```text
square_broad_fang_independent_human_reviewer_actor_assignment_and_collection_policy_without_invented_numeric_thresholds
```
