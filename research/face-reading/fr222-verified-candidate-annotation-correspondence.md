# FR222 — Verified Candidate / Annotation Correspondence

Status: implementation candidate  
Contract: `FR222-VERIFIED-CANDIDATE-ANNOTATION-CORRESPONDENCE-v1`

## 1. Purpose

FR220 can reopen and verify persisted blinded annotation evidence. FR221 can reopen and verify persisted FR218 candidate provenance. Those evidence streams remain separate until an exact candidate-to-review correspondence is assembled.

FR222 performs that assembly by `reviewItemRef`.

It is a **descriptive evidence-assembly layer**. It is not a calibration layer.

## 2. Required inputs

FR222 accepts only objects that have been verified by the active runtime through:

- `assertVerifiedPersistedAnnotationEvidenceFR220(...)`
- `assertVerifiedPersistedCandidateProvenanceEvidenceFR221(...)`

A JSON object that merely resembles either verified contract is rejected by the upstream active-runtime guard.

## 3. Exact join

For every FR220 reviewed-item distribution, FR222 requires exactly one matching FR221 candidate with the same `reviewItemRef`.

An annotation item with no candidate provenance is rejected.

FR221 already rejects duplicate candidate `reviewItemRef` values. FR222 additionally rejects duplicate annotation distributions defensively.

The joined record carries:

- `reviewItemRef`
- `sampleRef`
- `participantKey`
- `captureFamilyKey`
- selection/holdout partition
- `reviewArtifactRef`
- neutral metric ref/value/unit
- confounder tags
- annotation count
- reviewer count
- full ordinal label-count distribution

FR222 does not carry reviewer keys or session mappings into the correspondence output.

## 4. Blindness and disagreement

The metric and partition are joined **after** blinded annotation evidence has been verified.

Every joined record fixes:

- `metricValueWasExposedDuringReview=false`
- `partitionWasExposedDuringReview=false`
- `rawReviewerDisagreementPreserved=true`
- `consensusCollapsed=false`
- `consensusLabelIssued=false`

FR222 never chooses a majority, median, winner, or canonical human label.

## 5. Selection / holdout discipline

Selection and holdout membership remains attached to each candidate and is counted separately in the assembled result.

A holdout annotation may exist as descriptive evidence, but FR222 fixes:

`holdoutMayBeUsedForRuleSelection=false`

FR222 therefore cannot use holdout observations to choose a transition region, threshold, classifier, or interpretation rule.

## 6. Evidence identity

The result records the exact source evidence refs/digests from FR220 and FR221 and computes a deterministic correspondence digest/ref over:

- both source evidence identities;
- the full joined descriptive records.

This makes the assembled correspondence inspectable and reproducible within the verified inputs. It does not create external authenticity.

## 7. Human-evidence wording

FR220 may report:

- declared human annotation evidence present;
- all reviewers human-attested;
- all reviewers independence-attested.

FR222 carries those states without upgrading them.

It remains false that:

- reviewer human status was independently verified;
- reviewer independence was independently verified.

Self-attestation is not independent verification.

## 8. Capture-evidence wording

FR221 preserves unresolved capture authority. FR222 therefore keeps false:

- capture freshness independently verified;
- same-participant identity independently verified;
- capture quality validated;
- repeat-capture stability established.

A candidate/annotation correspondence is not repeatability evidence.

## 9. Prohibited authority

FR222 always leaves false:

- descriptive correspondence means empirical sufficiency;
- repeat-capture stability established;
- transition zone issued;
- threshold issued;
- classifier issued;
- consensus label issued;
- traditional binding issued;
- production activated;
- commerce activated.

No physiognomic meaning is introduced.

## 10. CI meaning

FR222 CI uses synthetic/mechanics-only candidate and annotation fixtures to test:

- active FR220 + FR221 verification requirements;
- exact `reviewItemRef` correspondence;
- orphan rejection;
- selection/holdout preservation;
- raw label-count disagreement preservation;
- no-authority behavior.

Those fixtures prove software mechanics only. They do not constitute empirical human validation, repeat-capture evidence, or calibration evidence.

## 11. Next research frontier

After FR222, the remaining empirical gaps are still substantive rather than structural.

A later stage may define a preregistered empirical study intake around real reviewed captures and repeated-capture families. It must keep at least three questions separate:

1. whether blinded human labels correspond descriptively with the neutral metric;
2. whether the neutral metric is stable across fresh repeated captures of the same participant;
3. whether evidence is sufficient to authorize any later calibration exercise.

Even then, a transition zone or threshold must be a later explicit decision, not an automatic consequence of FR222 correspondence.
