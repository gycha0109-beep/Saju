# R142 — Competing heavenly-stem combination target corpus

Date: 2026-09-27  
Track: saju-research  
Status: research-only

## Purpose

R142 studies one narrow structural ambiguity: a visible heavenly stem may have more than one structural five-combination candidate when its canonical counterpart is repeated in multiple pillar positions.

The corpus preserves every candidate relation and records candidate degree per stem target. It does not choose which candidate is effective.

## Upstream boundaries

R051 verifies only the five canonical stem pair families. It explicitly does not authorize effective-combination or transformation resolution.

I34 allows competing relation topology to be represented while keeping precedence and effect unresolved.

I35 materializes structural combination candidates and competing topology while keeping transformation, post-relation state, effect, and numeric score unresolved.

R141 establishes that input enumeration order cannot be used as hidden relation precedence.

R142 therefore treats repeated-counterpart competition as a representation problem, not a target-selection rule.

## Corpus shape

All five R051 pair families are covered.

For each family, four repeated-counterpart topologies are generated:

1. one left stem versus two repeated right counterparts
2. two repeated left stems versus one right counterpart
3. two repeated left stems versus two repeated right counterparts
4. one left stem versus three repeated right counterparts

Totals:

- 5 combination families
- 20 competition cases
- 55 structural pair candidates
- 35 competing stem targets
- 30 degree-two targets
- 5 degree-three targets

## Candidate preservation

Each candidate is only a verified pair-identity relation.

Every candidate retains:

- family identity
- left pillar slot
- right pillar slot
- left stem
- right stem

No candidate receives:

- effective-combination status
- transformation status
- target-selection authority
- numeric priority

## Position and order controls

Each competition case has four different slot-enumeration orders.

Across those controls, the following must remain invariant:

- complete candidate set
- each target's candidate set
- absence of a selected winner

The following shortcuts are explicitly rejected:

- nearest pillar wins
- adjacent pillar wins
- day stem always wins
- month stem always wins
- earliest or latest slot wins
- first detected relation wins
- relation-id lexical order wins
- numeric distance scoring
- pair count as confidence
- duplicate counterparts collapse into one relation

## Important negative boundary

Multiple candidates do not prove effective combination.

They also do not prove that no effective combination exists.

R142 preserves ambiguity exactly at the structural-candidate layer.

## Authority

R142 does not authorize:

- a target winner resolver
- nearest/adjacent selection
- day/month stem preference
- first-match selection
- numeric distance or weighting
- effective combination
- transformation
- transformation target element
- chart-role fact emission
- engine admission
- InterpretationClaim emission
- preview promotion
- production promotion

R143 will separately study branch combination-and-clash coexistence rather than reusing R142 as a generic interaction resolver.
