# R095 — school / lineage tags without forced reconciliation

Date: 2026-09-22  
Issue: #1047  
Status: DESCRIPTIVE LINEAGE TAXONOMY DEFINED / NO FORCED RECONCILIATION

## Purpose

Represent school, lineage, commentary tradition, practitioner method, terminology, and calculation-convention provenance without turning descriptive metadata into authority weight or synthesizing incompatible doctrines into one canonical school.

R095 is research-only provenance taxonomy.

## Tag dimensions

- `TRADITION_FAMILY`
- `WORK_OR_COMMENTARY_LINEAGE`
- `AUTHOR_COMMENTATOR_PRACTITIONER`
- `HISTORICAL_OR_PUBLICATION_CONTEXT`
- `METHODOLOGY_FAMILY`
- `TERMINOLOGY_PROFILE`
- `CALCULATION_CONVENTION_DEPENDENCY`

A source or methodology may carry multiple tag assertions when each assertion has evidence.

## Tag assertion contract

Each tag assertion records:
- assertion ID;
- subject ref;
- dimension;
- tag value;
- evidence refs;
- review state;
- scope ref.

Review states:
- `VERIFIED`
- `REVIEWED`
- `INCONCLUSIVE`

A tag without evidence is not silently promoted into a lineage fact.

Practitioner metadata also does not automatically propagate backward to every work/source the practitioner cites.

## Genealogy relation and proposition relation are separate

The stale single relation list mixed historical/genealogical relations with semantic proposition comparison.

These are separated.

### A. Lineage / genealogy relation

- `SAME_TRADITION`
- `DERIVED`
- `COMMENTARY_ON`
- `UNKNOWN`

These describe historical/provenance relation only.

Every non-UNKNOWN relation requires evidence refs.

No relation is inferred solely from:
- same title;
- same terminology;
- same website;
- same practitioner;
- source count.

### B. Proposition comparison relation

- `EQUIVALENT_WITHIN_SCOPE`
- `PARTIAL_OVERLAP`
- `DIVERGENT`
- `INCOMPARABLE`
- `UNKNOWN`

These require explicit proposition-level comparison refs.

Different labels do not imply divergence.

The same label does not imply semantic equivalence.

A proposition comparison result does not rewrite the underlying lineage relation.

## Multiple tags and multiple lineages

Multiple evidenced tags may coexist on one source or methodology.

This is not ambiguity to be forcibly reduced.

Examples:
- one commentary may belong to a broader tradition while introducing a distinct methodology family;
- one methodology may inherit terminology from one lineage but calculation convention from another;
- one source may have unresolved lineage and still have verified publication-context metadata.

## Divergence handling

When proposition-level evidence establishes divergence:

- preserve both propositions;
- preserve each lineage/source scope;
- preserve calculation-convention dependencies;
- do not majority-vote a winner;
- do not select a canonical school automatically;
- do not combine rules unless an explicit composition policy exists.

## Composition policy boundary

Cross-school composition, if ever authorized, requires a separate explicit and versioned composition policy.

A composition policy must define:
- eligible methodology/source families;
- compatibility conditions;
- preserved conflicts/ambiguities;
- prohibited combinations;
- output scope.

R095 itself does not define such a policy.

## Non-transitive authority

Lineage tags and relations do not propagate authority transitively.

Examples:

`A DERIVED_FROM B`
and
`B is reviewed`

does not mean:
`A is reviewed`.

Likewise:

`A COMMENTARY_ON B`
does not mean every proposition in A is equivalent to B.

## Rejected shortcuts

- `POPULARITY_EQUALS_AUTHORITY`
- `SENIORITY_EQUALS_CONFIDENCE`
- `AUTO_SELECT_CANONICAL_SCHOOL`
- `SAME_LABEL_EQUALS_SAME_SEMANTICS`
- `DIFFERENT_LABEL_EQUALS_DIVERGENCE`
- `LINEAGE_RELATION_EQUALS_PROPOSITION_EQUIVALENCE`
- `PRACTITIONER_TAG_PROPAGATES_TO_ALL_CITED_SOURCES`
- `LINEAGE_RELATION_TRANSITIVELY_PROPAGATES_AUTHORITY`
- `CROSS_SCHOOL_BLEND_WITHOUT_COMPOSITION_POLICY`

## Authority boundary

Tags are descriptive provenance metadata only.

They are not:
- confidence weights;
- school rankings;
- rule precedence;
- Production authorization;
- automatic conflict resolution.

No Production authority promotion follows from R095.
