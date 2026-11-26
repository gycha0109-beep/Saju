# R092 — conservative variant-glyph normalization policy

Date: 2026-09-22  
Issue: #1042  
Status: CURATED SEARCH ALIASES DEFINED / SOURCE WITNESSES IMMUTABLE

## Purpose

Expand retrieval recall for explicitly reviewed glyph variants without rewriting source witnesses or turning orthographic similarity into semantic authority.

R092 is a research-only text matching policy.

## Layers

### 1. ORIGINAL_GLYPH

Exact quoted/witness text.

This layer owns evidence identity.

It must not be rewritten by search aliases or display normalization.

### 2. SEARCH_ALIAS

Curated glyph-alias groups used only to widen retrieval/matching.

Search matching is symmetric inside one reviewed group:

`A matches B for search <=> B matches A for search`.

Alias membership does not select a preferred original glyph.

### 3. CANONICAL_DISPLAY

Optional presentation-only normalization.

It may improve readability in UI/export surfaces, but must not:
- replace stored witness text;
- participate in witness checksum identity;
- change source provenance;
- become the text used to prove a quotation.

### 4. SEMANTIC_EQUIVALENCE

A proposition-level evidence question.

Semantic equivalence is **not** granted by:
- search alias membership;
- same/similar character shape;
- Simplified/Traditional conversion;
- same normalized display string.

It requires separate evidence for the technical term or proposition being compared.

## Initial curated search-alias groups

- `殺 / 煞`
- `爲 / 為`
- `劫 / 刼`
- `祿 / 禄`
- `氣 / 气`
- `從 / 从`
- `會 / 会`
- `歲 / 岁`
- `運 / 运`
- `沖 / 冲`
- `體 / 体`

Each group is:
- explicit;
- search-only;
- symmetric for retrieval;
- non-semantic;
- non-authoritative for witness identity.

## Matching boundary

R092 does not authorize:
- whole-string automatic Simplified↔Traditional conversion as evidence normalization;
- automatic alias discovery;
- unknown pair insertion;
- transitive closure between separate alias groups;
- fuzzy matching based on edit distance or visual similarity.

A new alias requires a new reviewed registry change.

## Evidence / checksum boundary

Witness checksum and source identity remain bound to the original inspected witness content.

Forbidden:

`original witness -> glyph normalization -> checksum -> claim this is the witness identity`

Allowed:

`original witness -> witness identity/checksum`

and separately:

`original witness -> curated alias expansion -> search candidates`

Search-expanded or display-normalized text is derivative retrieval/presentation material only.

## Rejected shortcuts

- `REWRITE_SOURCE_WITNESS_TO_CANONICAL_GLYPHS`
- `WHOLE_STRING_SIMPLIFIED_TRADITIONAL_CONVERSION_AS_EVIDENCE_NORMALIZATION`
- `ALIAS_MEMBERSHIP_IMPLIES_SEMANTIC_EQUIVALENCE`
- `NORMALIZED_TEXT_USED_FOR_WITNESS_CHECKSUM`
- `CANONICAL_DISPLAY_USED_AS_EVIDENCE_IDENTITY`
- `UNKNOWN_GLYPH_PAIR_AUTO_ADDED`
- `CROSS_GROUP_TRANSITIVE_ALIAS_EXPANSION`
- `FUZZY_GLYPH_MATCHING_AS_GOVERNED_ALIAS`

## Authority boundary

No source content mutation, source-tier promotion, semantic-rule change, interpretation-rule activation, or Production authority follows from this policy.
