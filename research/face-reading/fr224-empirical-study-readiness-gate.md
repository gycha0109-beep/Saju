# FR224 — Empirical Study Readiness Gate

Status: implementation candidate  
Contract: `FR224-EMPIRICAL-STUDY-READINESS-GATE-v1`

## Purpose

FR222 and FR223 close two different structural gaps:

- FR222: verified neutral metric candidate ↔ blinded human annotation correspondence;
- FR223: declared repeat-capture family descriptives for the same neutral metric.

FR224 checks whether those two evidence streams are coherent enough to describe the remaining empirical blockers.

It does **not** decide that the evidence is empirically sufficient and does not authorize calibration.

## Exact source coherence

FR224 requires active-runtime FR222 and FR223 objects.

Both must derive from the exact same FR221 candidate evidence:

- same FR221 evidence ref;
- same FR221 evidence digest.

A correspondence artifact and repeat-family artifact built from different candidate pools are rejected.

## Structural diagnostics

Without inventing numeric sufficiency thresholds, FR224 reports:

- reviewed item count;
- annotation count;
- selection reviewed-item count;
- holdout reviewed-item count;
- repeat-family count;
- selection repeat-family count;
- holdout repeat-family count;
- reviewed items belonging to declared repeat families;
- self-declared human annotation evidence state;
- reviewer human/independence attestations.

The following zero/absence states become explicit structural gaps:

- no declared human annotation evidence;
- no selection review coverage;
- no holdout review coverage;
- no selection repeat-family coverage;
- no holdout repeat-family coverage;
- no overlap between reviewed items and declared repeat families.

These are presence checks only. They are not sample-size adequacy rules.

## No invented sufficiency rule

FR224 explicitly records that it has not invented:

- a minimum sample threshold;
- a minimum reviewer threshold;
- a minimum repeat-family threshold;
- a numeric repeatability acceptance threshold.

A nonzero count is not treated as a sufficient count.

## Mandatory empirical blockers

Even when all structural presence checks pass, current upstream evidence still does not independently establish:

- reviewer human status;
- reviewer independence;
- capture freshness;
- same-participant identity;
- capture quality;
- empirical repeatability;
- repeat-capture stability;
- empirical sufficiency.

FR224 therefore has two possible states:

- `STRUCTURAL_GAPS_AND_EMPIRICAL_AUTHORITY_BLOCKERS_PRESENT`
- `STRUCTURAL_EVIDENCE_PRESENT_EMPIRICAL_AUTHORITY_BLOCKED`

There is intentionally no `READY_FOR_CALIBRATION` state in FR224.

## Authority boundary

FR224 always keeps false:

- evidence presence means empirical sufficiency;
- structural readiness means calibration authorized;
- reviewer human status independently verified;
- reviewer independence independently verified;
- capture freshness independently verified;
- same-participant identity independently verified;
- capture quality validated;
- empirical repeatability established;
- repeat-capture stability established;
- empirical sufficiency established;
- transition zone issued;
- threshold issued;
- classifier issued;
- consensus label issued;
- traditional binding issued;
- production activated;
- commerce activated.

## CI meaning

Synthetic/mechanics fixtures can prove:

- source-coherence rejection;
- structural presence diagnostics;
- repeat-family overlap calculation;
- active-runtime authority guards;
- no-threshold/no-calibration boundary preservation.

They cannot prove that a reviewer was human, that captures were fresh, that capture-family members were the same participant, or that the metric is repeatable in the real world.

## Next frontier

Once FR224 is structurally closed, further progress requires **actual empirical collection and independent verification**, not another synthetic promotion.

The next operational step should make those missing facts collectable/auditable while preserving privacy and blindness. Until such evidence exists, calibration, transition-zone selection, classifier issuance, traditional criterion binding, production activation, and commerce activation remain blocked.
