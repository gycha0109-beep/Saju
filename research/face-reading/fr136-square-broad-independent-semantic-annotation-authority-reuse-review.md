# FR136 — Square-Broad Independent Semantic Annotation Authority Reuse Review

## Decision

No existing repository authority or protocol may be reused as semantic annotation authority for `criterion.intake.square_broad` / `方大`.

The repository contains useful independent-human-review infrastructure and criterion-specific research precedents, but those artifacts are construct-bound. Reusing their label vocabulary, reviewer counts, agreement rules, or adjudication outcomes for `方大` would create authority that the existing evidence does not issue.

## Exact predecessor

FR135 ends at:

` square_broad_independent_semantic_annotation_authority_and_protocol_materialization_then_empirical_collection `

FR135 requires independent semantic annotation evidence that is independent of candidate metric values, while leaving all of the following unresolved:

- annotation authority
- annotation protocol
- label schema
- reviewer count
- quorum
- consensus threshold

FR136 reviews whether any already-governed repository artifact can fill those slots without creating new semantic authority by analogy.

## Reviewed human-annotation precedents

### FR-DATA-07 — independent face ground truth

`authority.face.independent_face_ground_truth_protocol.frdata07` is a provider-blind human annotation protocol for categorical human-face-count state. Its vocabulary is `zero_human_faces`, `one_human_face`, `multiple_human_faces`, and `indeterminate`.

It deliberately keeps minimum annotator counts and inter-annotator agreement thresholds unset and explicitly does not validate traditional semantic authority.

Reusable pattern: provider-blind independent human annotation.

Not reusable: `方大` semantic authority, label vocabulary, reviewer policy, or consensus policy.

### FR-DATA-07C — provider-blind annotation packet

`authority.face.independent_face_annotation_packet.frdata07c` provides opaque packet construction and hides source/provider/suggested-label metadata from annotators. It is still bound downstream to the human-face-count ground-truth schema and does not establish human annotation by packet generation alone.

Reusable pattern: opaque provider-blind annotation packet mechanics.

Not reusable: `方大` semantic authority or label vocabulary.

### FR-DATA-10 — independent adjudication

`authority.face.independent_face_count_adjudication.frdata10` defines provider-blind human adjudication for disagreements in the face-count construct. Automatic majority, unanimity, and annotation-count rules are forbidden; minimum annotator/adjudicator counts and decision thresholds remain unset.

Reusable pattern: separate human adjudication with provider blindness and unresolved-outcome preservation.

Not reusable: `方大` adjudication authority, outcomes, reviewer counts, or decision policy.

### FR-DATA-14 / FR-DATA-15 — reference admission and external review

These slices freeze a construct-specific human reference candidate set and an external review package for categorical human-face-count state. They explicitly require construct-specific and external review before reviewed reference-standard authority can exist. Neither validates traditional semantic authority.

Reusable pattern: exact construct binding, reference-candidate admission discipline, and external-review package binding.

Not reusable: a new traditional semantic construct or its label authority.

## Reviewed FR100–FR102 criterion-specific precedent

FR100–FR102 define and review a construct-validity research path for `criterion.intake.lips_substantial` / `端厚`.

FR101 contains research design values of:

- 3 reviewers per item
- 2/3 minimum agreement fraction
- 2 minimum non-abstain labels

Those values are explicitly criterion-specific research-framework design parameters, not traditional or calibration thresholds. The chain does not authorize human collection or traditional semantic binding.

Therefore FR136 records those values only as evidence that such parameters existed in another criterion-specific research design. It does **not** transfer them to `方大`.

## Current `方大` source and methodology authority

FR132 establishes:

- governed source: `passage.shenxiang.five_officers.intake.nlc_1925`
- source verification: `scan_checked`
- methodology: `method.shenxiang.five_officers.intake_criteria@0.2.0`
- methodology review status: `research`
- target-specific reviewed decision: absent/deferred
- `方大` construct validity: not established
- traditional semantic authority: false

A scan-checked source proves the source passage is verified. It does not make the research methodology reviewed and does not issue an independent annotation authority.

Project-owner methodology governance also does not equal target-specific semantic annotation authority.

## FR136 authority decision

FR136 therefore issues no semantic annotation authority and no empirical collection authority.

The following remain `null`:

- `annotationAuthorityRef`
- `annotationProtocolRef`
- `labelSchemaRef`
- `reviewerCount`
- `quorum`
- `consensusThreshold`
- `adjudicationRuleRef`
- `reviewerQualificationRef`

The following remain zero/false:

- annotation authorities issued
- annotation protocols issued
- label schemas issued
- empirical semantic labels issued
- traditional metric bindings
- calibration protocols
- thresholds
- criterion states
- structured claims
- bounded narratives
- traditional semantic authority
- human semantic collection authorization

## Requirements preserved for the next review

A future criterion-specific protocol review must preserve at least these boundaries:

- source-grounded `方大` instructions are required;
- initial semantic labels must be independent;
- candidate metric values must be hidden during semantic annotation;
- candidate thresholds must be hidden;
- peer labels must be hidden during initial annotation;
- an abstain / unable-to-conclude path is required;
- reviewer actor governance must be explicitly defined;
- the target-specific methodology decision must be resolved;
- reviewer counts, quorum, consensus rules, qualifications, and adjudication policy must not be copied from another construct without authority.

No empirical semantic collection is authorized by this review.

## Next frontier

`square_broad_criterion_specific_independent_annotation_authority_and_protocol_definition_review_without_empirical_collection`

The next slice may review a source-grounded, criterion-specific annotation authority/protocol definition. It must not treat protocol design as collection authority, construct-validity evidence as a traditional binding, or a human label as a calibration threshold or criterion state.
