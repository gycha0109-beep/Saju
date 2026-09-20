# FR221 — Persisted FR218 Candidate Provenance

Status: implementation candidate  
Contract: `FR221-PERSISTED-CANDIDATE-PROVENANCE-v1`

## 1. Why FR221 exists

FR220 made the blinded FR219 annotation ledger reopenable after process restart. That is only one side of a later empirical join.

FR218 candidate measurements still carry active-runtime issuance authority through `WeakSet` guards. Once the process exits, a JSON copy cannot be treated as an actively issued FR218 object. A later study therefore needs a durable operator-side provenance artifact before it can safely join a human annotation's `reviewItemRef` back to the exact neutral metric candidate, partition, participant key, and capture-family key that produced that review item.

FR221 closes that persistence gap. It does **not** perform the empirical join and does **not** establish construct validity.

## 2. Materialization boundary

`materializeCandidateProvenanceEvidenceFR221(...)` accepts only a candidate pool that passes the active FR218 `assertSelectionHoldoutCoverageFR218` gate.

This means materialization requires, in the same runtime:

- FR218-issued candidates;
- unique sample, review-item, and review-artifact references;
- no participant leakage between selection and holdout;
- no capture-family leakage between selection and holdout;
- one participant owner per capture family;
- both selection and holdout represented.

The materialized evidence records only the neutral research fields required for a later join:

- `sampleRef`
- `participantKey`
- `captureFamilyKey`
- `partition`
- `reviewItemRef`
- `reviewArtifactRef`
- FR218 capture-admission reference/source and its unresolved verification flags
- neutral candidate metric ref/value/unit
- confounder tags
- fixed no-classification/no-threshold/no-traditional-binding flags

Raw images, raw provider responses, and raw landmark sets are not persisted by FR221.

## 3. Reviewer blindness

The candidate metric value is operator-side research evidence. It is never authorized for the FR219 reviewer surface.

Every persisted candidate record fixes:

`reviewerExposureAllowed=false`

FR221 therefore cannot be used as a reviewer manifest and must not be routed to the localhost blinded review UI.

## 4. Persistence integrity

Each record receives a canonical SHA-256 digest. The evidence package receives a canonical aggregate digest and:

`evidence.fr221.observable_morphology_candidate:<sha256>`

On reload, `verifyPersistedCandidateProvenanceEvidenceFR221(...)` recomputes:

- every record digest;
- aggregate evidence digest;
- evidence ref;
- candidate/selection/holdout counts;
- duplicate-reference constraints;
- participant partition isolation;
- capture-family partition isolation;
- capture-family ownership consistency;
- presence of both selection and holdout.

A caller that edits one persisted metric value without updating the digest is rejected.

Cross-record invariants are also rechecked after reload, so recomputing digests cannot turn participant/capture-family leakage into admissible evidence.

## 5. What the digest does **not** prove

Canonical digest consistency is an internal integrity/consistency mechanism. It is not a digital signature, external timestamp, trusted hardware attestation, or independent evidence of original FR218 issuance.

After reload, FR221 therefore fixes:

- `persistedDigestConsistencyMeansOriginalFR218IssuanceIndependentlyProven=false`
- `freshnessIndependentlyVerified=false`
- `sameParticipantIdentityIndependentlyVerified=false`
- `captureQualityValidated=false`

The active-runtime materializer can assert that its input passed FR218 issuance in that runtime. A later JSON verifier cannot independently reconstruct that ephemeral WeakSet fact.

## 6. Authority boundary

FR221 always leaves the following false:

- empirical sufficiency established;
- repeat-capture stability established;
- transition zone issued;
- threshold issued;
- classifier issued;
- traditional binding issued;
- production activated;
- commerce activated.

FR221 does not assign a consensus human label and does not bind any traditional physiognomic meaning.

## 7. CI and smoke evidence

The dedicated smoke path:

1. creates mechanics-only FR218 candidates through the active FR159 → FR218 admission path;
2. materializes selection/holdout candidate provenance;
3. writes the evidence package to temporary disk;
4. reopens it through the FR221 persisted verifier;
5. verifies counts and digests;
6. mutates a persisted metric value;
7. requires the mutation to be rejected;
8. deletes the temporary evidence.

The smoke output must state:

- `syntheticMechanicsOnly=true`
- `empiricalHumanEvidenceClaimed=false`
- `empiricalSufficiencyEstablished=false`
- `repeatCaptureStabilityEstablished=false`
- `thresholdIssued=false`
- `classifierIssued=false`
- `traditionalBindingIssued=false`

This proves persistence mechanics only.

## 8. Operator verification

After `npm run face:build`:

```bash
FR221_EVIDENCE_PATH=/private/evidence/fr218-candidates.json \
node scripts/verify-fr221-persisted-candidate-provenance.mjs
```

The verifier prints only evidence identity, partition counts, and authority state. It does not print candidate metric values or participant/review-item mappings.

## 9. Next frontier

Once FR221 candidate provenance and FR220 blinded annotation evidence are both durably reopenable, the next stage may assemble an exact `reviewItemRef` join.

That later stage must still:

1. keep selection and holdout isolated;
2. preserve reviewer disagreement rather than inventing consensus;
3. keep repeat-capture evidence distinct from annotation evidence;
4. avoid pre-labeling a near-boundary region from metric values;
5. distinguish descriptive evidence from empirical sufficiency;
6. establish any calibration/transition rule only in a separate, explicitly authorized step;
7. keep traditional criterion binding out of the observable-morphology layer until separately validated.
