# Relationship / Spouse T8 — SA-5L Automated Narrative-Materiality Gate

Issue: #1925  
Track: `saju-bridge`

## Decision

External expert approval is not a required gate for this Saju path.

SA-5L is now a deterministic repository check. It consumes the already source-adjudicated, multi-source-supported, staging-tested Spouse T8 Day-Branch claim and verifies that the only allowed narrative proposition is:

```json
{
  "position": "day_branch",
  "traditionalRole": "spouse_palace",
  "semanticScope": "position_only"
}
```

## What was removed

The following are not required:

- external expert review;
- human/domain reviewer;
- ReviewAttestation;
- reviewer identity;
- ReviewerTrustContext / ReviewerTrustGrant;
- separately signed narrative-materiality decision.

The previous external-review request implementation and its tests/docs are deleted.

## Automated gate

The gate passes only when all of the following remain true:

1. exact SA-5K lineage and integrity;
2. exact current staging registry shape;
3. exact `position_only` spouse-palace semantic;
4. current claim contract still has no broader narrative semantics;
5. multi-source provenance is present;
6. governed evidence selection is admitted;
7. Preview / Official Reading / public semantic / Production authority has not been widened.

If those checks pass:

```text
APPROVE_POSITION_ONLY_NARRATIVE_MATERIALITY
→ RUN_SA_5M_POSITION_ONLY_NARRATIVE_MATERIALIZATION
```

## Still prohibited

This change does not authorize:

- spouse-star selection;
- partner personality or identity;
- marriage timing or outcome;
- relationship outcome;
- favorable/unfavorable spouse-palace judgment;
- Yong/Ji-Shen semantics;
- second-chart compatibility;
- sex-scoped spouse-role expansion.

It also does not directly enable narrative generation, artifact assembly, delivery, Preview, Official Reading, public semantic authority, or Production.

Those remain separate runtime/product gates.
