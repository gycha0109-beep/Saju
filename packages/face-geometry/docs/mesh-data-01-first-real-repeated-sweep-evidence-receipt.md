# MESH-DATA-01 — First real repeated-sweep evidence receipt

Issue: #855

This document records the review of the first inspectable real post-preregistration repeated-sweep MESH6J artifact without committing the participant-derived numeric evidence values or any raw biometric material.

## Source artifact custody

The source artifact remains outside the repository.

- SHA-256: `8c60a72f04f681984297f38b254efa84ff4533fd39973dc32b3108480260f47c`
- controller schema: `mesh6i-manual-browser-capture-controller-result-v1`
- dataset schema: `mesh6f-prospective-sweep-acquisition-dataset-v1`
- source eligibility state: `mesh6e_attestations_accepted_not_independently_verified`

The digest is only a receipt identifier for the reviewed local artifact. It does not independently prove physical freshness or participant identity.

## Eligibility review

The reviewed artifact reports:

- real browser-camera capture by the operator;
- fresh post-preregistration capture attestation;
- same-participant-series attestation only, not identity proof;
- 3 sweeps;
- 15 explicitly triggered frames total;
- one capture series and one baseline capture condition;
- 13 frozen preregistered primary evidence fields in every sweep;
- identical frozen field coverage across all three sweeps;
- finite and non-zero primary values in all three sweeps;
- unique sweep refs;
- ordered sweep sequence indices 1, 2, 3;
- consistent geometry/adapter provenance across all three sweeps.

No synthetic/repository fixture, candidate-selected capture, development-capture reuse, or identity matching was admitted by the reviewed artifact.

The repository receipt intentionally records only these structural review outcomes, not the participant-derived numeric evidence values.

## Privacy review

The reviewed source artifact declares all of the following absent from the dataset artifact:

- raw image;
- raw video;
- raw provider response;
- raw landmark set;
- derived full-face metric geometry;
- face embedding;
- identity template.

The repository also retains none of the participant-derived primary numeric evidence values.

## Authority boundary

This receipt does **not** establish:

- empirical repeatability;
- repeatability pass/fail;
- capture-quality validity;
- pose-acceptance validity;
- calibration;
- numeric thresholds;
- confidence;
- population norms;
- production morphology admission;
- anatomical measurement claims;
- traditional physiognomy authority.

The source artifact's own authority boundary keeps those states false or unresolved.

## MESH-DATA-01 closure

The #855 completion condition is satisfied at the acquisition/review level: at least one inspectable real post-preregistration repeated-sweep dataset was collected and reviewed for eligibility, privacy, provenance, and the frozen 13-field coverage.

This closure is not a calibration decision. The next frontier is MESH-DATA-02: same-condition repeated-session acquisition before any threshold or calibration proposal.
