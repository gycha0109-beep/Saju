# R095 — school / lineage tags without forced reconciliation

Date: 2026-09-20  
Issue: #1047  
Status: DESCRIPTIVE TAG TAXONOMY DEFINED

## Purpose

Represent provenance strata for schools, lineages, commentary traditions, and practitioner methods without synthesizing incompatible propositions into one doctrine.

## Tag dimensions

- TRADITION_FAMILY
- WORK_OR_COMMENTARY_LINEAGE
- AUTHOR_COMMENTATOR_PRACTITIONER
- HISTORICAL_OR_PUBLICATION_CONTEXT
- METHODOLOGY_FAMILY
- TERMINOLOGY_PROFILE
- CALCULATION_CONVENTION_DEPENDENCY

## Inter-lineage relations

`SAME_TRADITION | DERIVED | COMMENTARY_ON | PARTIAL_OVERLAP | DIVERGENT | UNKNOWN`

## Governance

- multiple evidenced tags may coexist;
- tags are descriptive provenance, never authority weights;
- same terminology does not imply same semantics;
- different terminology does not imply disagreement;
- proposition-level comparison is required before recording divergence;
- divergence is preserved rather than force-reconciled;
- unknown lineage remains `UNKNOWN`.

## Rejected shortcuts

- POPULARITY_EQUALS_AUTHORITY
- SENIORITY_EQUALS_CONFIDENCE
- AUTO_SELECT_CANONICAL_SCHOOL
- SAME_LABEL_EQUALS_SAME_SEMANTICS
- DIFFERENT_LABEL_EQUALS_DIVERGENCE
- CROSS_SCHOOL_BLEND_WITHOUT_COMPOSITION_POLICY

No Production authority promotion.