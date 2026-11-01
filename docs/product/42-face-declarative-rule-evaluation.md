# Face declarative rule execution — existing FR-3 continuation

Watchtower-Track: face-reading

Issue: [#2746](https://github.com/gycha0109-beep/Saju/issues/2746)

## Current-code audit and scope

Baseline: `342bf183616cf2a62c73b374b6801576a37f07b2` (remote main checked
2026-11-01, Asia/Seoul). The local primary checkout was stale and contained private
untracked artifacts; work uses a clean existing Saju worktree and a new branch.
No private captures or other checkout changes are part of this change.

The named `MyeongHa_Face_Reading_Engine_Architecture_v0.3_THIRD_REVIEWED`
document is not present by that name in current Saju. The executable contracts,
migration manifest and current source/authority documents are the baseline;
the requested pipeline is a target, not evidence of authorized content.

`contracts.ts` already defines expressions and versioned rules/packs.
`research-pack-v0.ts` already contains five Three-Divisions research rules.
`validation.ts` already validates claim types, source references, production
dependencies, laterality and comparison policy. `research-diagnosis-runtime.ts`
has a separate, explicitly research-only five-officer assertion path.
None executes `FaceRuleDefinition.condition` through a common evaluator.
The missing shared evaluator is the bounded FR-3 implementation here.

Current downstream code already includes semantic projection, Character grounding
and topic HTTP handoff. These do not authorize the real Three-Divisions source.
See [current partial bindings](39-face-six-reference-partial-binding.md) and
[source decision surface](38-face-traditional-authority-decision-surface.md).
The current binding review is 13/16 slots and six of seven neutral references;
real hairline evidence and exact methodology approval remain external gates.
Historical FRB005 0/16 remains immutable.

## Execution contract

`packages/face-reading/src/rule-evaluation.ts` exports:

- `evaluateFaceRuleExpression`: finite scalar conditions over exact input keys;
- `evaluateRegisteredFaceRule`: exact `ruleId@version` and `packId@version`
  selection from the existing repository-owned `FaceAuthorityRegistry`.

This is a trusted in-process registry API, not an HTTP registry ingestion API.
The caller binds already-observed/operationalized values to declared rule input
keys. It must not substitute caller assertions for governed observation evidence.
This evaluator neither derives observations nor resolves a dependency graph.
Production claim inputs remain blocked pending a governed producer resolver.

Supported operators: `eq`, `in`, `lt`, `lte`, `gt`, `gte`, `between`, `exists`,
`not`, `and`, `or`, `all`, `any`. `between` includes both endpoints. Equality and
membership compare scalar values with no coercion. No object projection,
functions, eval, generated JavaScript, LLM decisions or implicit thresholds exist.

`all`/`any` have an explicit collection `input` and member `expression`:

```json
{
  "op": "all",
  "input": "syntheticValues",
  "expression": { "op": "gte", "input": "$item", "value": 0 }
}
```

This example is synthetic; zero is not a face-measurement threshold. `$item` is
lexically scoped to the nearest collection expression, cannot be supplied by a
caller, and cannot be read outside a collection expression. Other keys refer to
the same top-level bound input map. Arrays contain finite scalar values only.
For an explicitly supplied empty collection, `all=[]` is true and `any=[]` false.
Required measurement counts must be governed separately; none are inferred here.

Missing/null values and numeric type mismatches evaluate to `null` (unavailable).
`not(null)` stays null. Boolean groups use three-valued logic: a known false
conjunct can resolve an `and`, and a known true disjunct can resolve an `or`.
`exists` explicitly tests presence and returns false for missing/null values;
zero and false are present. Required missing inputs withhold the entire individual
rule regardless of its condition. They do not invalidate unrelated rules or the
observation bundle. This does not set Observation State or Diagnosis Resolution.

The complete expression is validated before evaluation, including branches whose
values would otherwise allow short-circuiting. Malformed operators/fields,
undeclared input keys, sparse/accessor arrays, nonfinite values and executable
object properties are rejected. Depth 64 and work 4096 are execution resource
limits, not domain thresholds.

## Authority and downstream boundary

The existing authority validator runs before selecting/evaluating a rule.
Production requires `promotionStatus=production_authorized`; reviewed/research
rules remain unavailable to production. Methodology membership, enabled tiers,
static forbidden inputs and referenced region maps are checked. A region map
from a different methodology cannot be mixed into the rule. Referenced production
source witnesses must be verified. Dynamic-appearance claim types and F5/F8 stay disabled.

Results retain exact rule/pack/methodology/source references, execution status,
outcome and required missing keys. Only a matched condition returns a copied
semantic `FaceClaimTemplate`; consumer-prose fields are rejected. It does not
issue a `FaceClaim`, semantic product reading, narrative, claim/rule promotion,
Character publication decision, comparison order or product capability.
All returned state is deterministic and frozen; no image or persistent storage
API is involved. Real-source production remains closed.

## Validation and roadmap boundary

Direct Vitest coverage exercises every operator, unknown propagation, resource
and malformed-input rejection, existing research rule execution, source trace,
exact version selection, section isolation and production denial. An explicitly
synthetic registry tests the production branch/dependency denials; it grants no
real authority. The test runs in the existing Face Reading CI. No workflow added.
The existing migration evolution ledger records additive contract/index changes
without rewriting historical source hashes or any methodology definition.

Local verification (Node 24.14.0; locked dependencies installed with `npm ci`):

- Direct evaluator plus three existing topic/grounding authority files: 58 tests pass.
- Root and Face TypeScript checks, Face build, migration manifest, scoped ESLint,
  formatting and whitespace checks pass.
- Built `index.js` invokes the existing registered research rule successfully.
- Existing `check:face-reading` passed its TypeScript/build/FR158/159/160/178 and
  local executor/review checks, then failed at the Windows `python3` app alias
  (Python self-check launch stage, environment/tooling classification). Reproduction:
  `npm run check:face-reading`. Expected: candidate self-check JSON; observed:
  alias printed `Python` and exited 1. The same candidate self-check passed with
  `python tools/face-reading/hairline/run_multisignal_visible_hairline_candidate.py --self-check`;
  the final review-packet self-check also passed separately. No unrelated launcher
  or dependency was changed. Hosted Linux aggregate verification remains a CI gate.

Roadmap markers below describe inspected implementation surfaces, not percentages
or end-to-end completion. `partial` means code exists with authority/runtime work
remaining; `unassessed` means no completion claim is made in this bounded audit.

| Existing stage | Current audited state                                                                   |
| -------------- | --------------------------------------------------------------------------------------- |
| FR-0 / FR-0.5  | Source/claim/methodology contracts present; real traditional authority partial          |
| FR-1 / FR-2    | Observation/adapter/metric and binding code present; hairline evidence blocked          |
| FR-3           | Shared declarative evaluator implemented here; real semantic rule admission remains     |
| FR-4 / FR-4.5  | Research assertion tension and comparison contracts present; full production unassessed |
| FR-5           | F7 contracts present; governed dependency resolution unassessed                         |
| FR-6 / FR-7    | Semantic/grounding and research narrative code present; real source activation blocked  |
| FR-8           | Full product UX unassessed; no UI change here                                           |
| FR-9           | Source-owned governed Character handoff present; publication remains gated              |
| FR-10 / FR-11  | Compatibility contracts present; bridge activation/future scope unassessed              |

Next bounded implementation should connect an admitted static observation and
operationalization producer to the evaluator with exact snapshot provenance.
Do not introduce a second source of semantic truth or automatically convert
research thresholds/labels into production values. The #2343/#2213 external
evidence and exact-target approval requirements remain independent.

Architecture Check:

- Docs updated: yes
- Ghost-code risk: passed for registered rule -> condition -> semantic template,
  with direct execution and compiled-entry checks. Product activation is excluded.
- Notes: additive `all`/`any` expression nodes and scoped `$item` binding extend the
  existing language. Existing source validator and rule/pack identities are reused.
  No new stage, methodology, alias for a measured feature, fallback classifier,
  normalization path, DB contract or second rule engine is introduced.
