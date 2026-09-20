# FR220 — Persisted Blinded Annotation Evidence Intake

## Status

Durable research-evidence integrity layer only.

FR219 creates a localhost human-review session, writes annotation JSONL, and writes an evidence receipt. FR220 verifies those persisted artifacts after the original FR219 process is gone.

FR220 does not trust persisted JSON merely because it has an FR219 schema name.

## 1. Why FR220 exists

FR219 uses in-process issuance guards for active runtime objects. Those guards intentionally disappear when the process exits.

Real research therefore needs a second boundary:

```text
FR219 runtime-issued annotation
→ JSONL persistence
→ process exit
→ FR220 persisted-integrity verification
→ later study assembly
```

Without FR220, a later process could not distinguish an untouched FR219 ledger from caller-edited JSON.

## 2. Annotation verification

For every persisted FR219 annotation record, FR220 verifies:

- FR219 schema/contract version;
- bounded opaque session/reviewer/item references;
- supported FR218 ordinal label;
- parseable `recordedAt`;
- reviewer-attestation booleans;
- every no-authority/no-exposure flag;
- canonical `sha256:<64-hex>` annotation digest;
- exact digest recomputation from:

```text
sessionRef
reviewItemRef
reviewerKey
label
recordedAt
```

Changing a label, timestamp, reviewer key, item ref, or session ref without recomputing the FR219-issued digest is rejected.

## 3. Receipt verification

FR220 does not accept receipt aggregate fields at face value.

It recomputes from the annotation ledger:

- session ref set;
- reviewer key set;
- review item ref set;
- annotation count;
- reviewed item count;
- reviewer count;
- per-session human-reviewer attestation state;
- per-session reviewer-independence attestation state;
- human-attested session count;
- independence-attested session count;
- FR219 evidence digest;
- FR219 evidence reference.

The evidence digest is recomputed using the same canonical sorted annotation projection used by FR219.

## 4. Duplicate and session-drift rejection

FR220 rejects:

- duplicate reviewer/item annotations;
- duplicate values inside persisted receipt sets;
- one session ref changing reviewer key across records;
- one session ref changing human/independence attestation across records;
- receipts that claim a session with no persisted annotation record.

The last rule is deliberate. A receipt containing an empty session cannot be fully reconstructed from an annotation-only persisted ledger.

## 5. Disagreement preservation

FR220 produces per-item label counts only.

It does not collapse raw reviewer disagreement into a consensus label.

```text
rawReviewerDisagreementPreserved = true
consensusCollapsed = false
```

No median ordinal, majority label, transition zone, or classification is issued.

## 6. Authority boundary

Even after complete persisted-integrity verification:

```text
persistedIntegrityVerificationMeansReviewerIsHuman = false
persistedIntegrityVerificationMeansReviewerIndependenceVerified = false
reviewerHumanStatusIndependentlyVerified = false
reviewerIndependenceIndependentlyVerified = false
empiricalSufficiencyEstablished = false
repeatCaptureStabilityEstablished = false
transitionZoneIssued = false
thresholdIssued = false
classifierIssued = false
traditionalBindingIssued = false
productionActivated = false
commerceActivated = false
```

A valid digest proves integrity of the recorded artifact, not truth of the human/research claim.

## 7. Operator CLI

After FR219 collection:

```bash
npm run face:build

FR220_LEDGER_PATH=/private/evidence/reviewer-1.jsonl \
node scripts/verify-fr220-persisted-annotation-evidence.mjs
```

By default the receipt path is:

```text
<ledger path>.receipt.json
```

An alternate receipt may be supplied with:

```bash
FR220_RECEIPT_PATH=/private/evidence/custom-receipt.json
```

The CLI prints only research-integrity counts and authority states. It does not print raw labels or reviewer-item mappings.

## 8. Automated validation

CI executes:

```bash
npm run face:build
npx vitest run packages/face-reading/src/observable-morphology-persisted-annotation-intake-fr220.test.ts
FR220_SMOKE=1 node scripts/verify-fr220-persisted-annotation-evidence.mjs
```

The round-trip test uses actual FR219-issued objects:

```text
FR219 session
→ FR219 annotations
→ FR219 receipt
→ JSON serialization
→ JSON parse
→ FR220 persisted verification
```

The smoke test additionally edits one persisted label after issuance and requires FR220 to reject it.

Expected smoke status:

```text
FR220_PERSISTED_ANNOTATION_EVIDENCE_INTAKE_PASS
```

## 9. Next frontier

FR220 makes persisted annotation evidence reusable.

It still does not connect that evidence to a complete observable-morphology empirical study. The next research layer must join:

- verified FR220 annotation evidence;
- FR218 candidate/partition provenance;
- fresh repeated capture evidence;
- participant/capture-family split controls;

while preserving the rule:

```text
descriptive evidence
≠ empirical sufficiency
≠ transition zone
≠ threshold
≠ traditional binding
```
