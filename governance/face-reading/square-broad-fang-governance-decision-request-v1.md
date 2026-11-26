# MyeongHa Face Reading — Square-Broad `方` Governance Decision Request v1

Status: pending explicit decisions
Effective date: not applicable until an explicit governed decision is recorded
Target criterion: `criterion.intake.square_broad`
Active construct scope: `fang_shape_candidate_features_only`

## Purpose

This request packages the two distinct authority decisions required before any human semantic collection for the FR138 `方` research protocol may begin.

This file is **not** approval evidence and is **not** an annotation-authority designation.

## Decision A — target-specific methodology review promotion

Current governed methodology:

```text
target methodology = method.shenxiang.five_officers.intake_criteria@0.2.0
proposed reviewed successor = method.shenxiang.five_officers.intake_criteria@0.3.0
source snapshot = passage.shenxiang.five_officers.intake.nlc_1925
source verification status = scan_checked
authority actor = actor.myeongha.project_owner@0.1.0
required approval count = 1
```

FR131 requires an explicit project-owner decision bound to exactly this target, successor, and source snapshot.

A future approval record must be explicit. A generic instruction such as `continue`, repository authorship, pull-request merge, CI success, source verification, or the existence of this request file does not satisfy the evidence policy.

### Approval statement template

The following text is a **template only** until explicitly adopted by the governed project owner and persisted as separate decision evidence:

```text
I approve the promotion of method.shenxiang.five_officers.intake_criteria@0.2.0
as the target research methodology to the proposed reviewed successor
method.shenxiang.five_officers.intake_criteria@0.3.0, using the exact source
snapshot passage.shenxiang.five_officers.intake.nlc_1925, for methodology
review promotion under the current project-owner governance.
```

A rejection must likewise be explicit and bound to the same target/successor/source tuple.

## Decision B — criterion-specific research semantic annotation governance

FR136 established that methodology-review governance is not annotation semantic authority.

The FR138 protocol candidate is:

```text
protocol = research.protocol.face.intake.square_broad.fang_blinded_annotation@0.1.0
label schema = research.label_schema.face.intake.square_broad.fang_shape_hypothesis@0.1.0
criterion = criterion.intake.square_broad
construct scope = fang_shape_candidate_features_only
```

Before collection, a separately scoped governance decision must establish:

```text
annotation authority ref
designation actor ref
designation evidence refs
criterion-specific research semantic annotation scope
```

The designation source must independently authorize the annotation scope. The existing methodology-promotion governance source cannot be silently reused for this purpose.

FR139 does **not** choose an annotation authority or a designation actor because no governed source currently supplies that authority.

## Reviewer policy remains unresolved

No reviewer design is created by this request:

```text
reviewerCount = null
quorum = null
consensusThreshold = null
adjudicationRuleRef = null
reviewerQualificationRef = null
```

FR101's criterion-specific values are not transferable.

## Collection gate

Current state:

```text
methodology target-specific decision satisfied = false
annotation authority satisfied = false
human semantic collection authorized = false
empirical semantic evidence acquisition authorized = false
```

Collection may begin only after both authority tracks are separately satisfied and a later collection-authorization artifact consumes those governed records.
