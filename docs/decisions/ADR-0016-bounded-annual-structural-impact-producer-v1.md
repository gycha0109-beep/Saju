# ADR-0016 — Bounded Annual Structural Impact Producer V1

- Status: Accepted
- Date: 2026-10-07
- Scope: produce R196 annual structural impact bundles for a deliberately bounded product subset
- Extends: ADR-0015

## Context

R196 introduced a governed annual structural-impact bundle but required an upstream producer.
R197 supplied deterministic Dayun temporal context.

Research R153 establishes that annual evaluation must preserve:

- annual stem;
- annual branch;
- natal context;
- Dayun context;
- meeting/combination checks;
- punishment/clash checks.

R159 separately establishes that observed temporal triggers do not by themselves prove structural-change,
break, rescue, polarity, or concrete events.

The product nevertheless requires deterministic behavior. As with R189-R193, MyeongHa therefore adopts an
explicit product convention for a narrow executable subset instead of claiming a universal classical rule.

## Decision

R198 V1 operates only when the temporal branch/root layer is quiet enough that no unresolved branch settlement
is required.

### Eligible scope

The producer requires:

- an annual ReadingRequest;
- resolved annual facts;
- exactly one R197 Dayun segment across the target year;
- at least one canonical R191 natal stem-five-combination settlement;
- resolved natal pillars;
- exactly one governed R192 role assignment per settlement participant.

### Temporal stem overlay

Annual stem and active Dayun stem are coexisting sources. Neither has precedence.

For each natal R191 settlement participant:

- source controls target => CONTROL;
- source generates target => SUPPORT;
- CONTROL outranks SUPPORT on the same target;
- no numeric weights are used;
- source input order is irrelevant.

The canonical natal R191 final state is the baseline.

- an already impaired controller is not restored by SUPPORT;
- temporal CONTROL impairs the controller;
- an impaired controller disables pair control;
- temporal CONTROL keeps the controlled participant impaired;
- otherwise temporal SUPPORT or disabled pair control constrains the controlled participant;
- otherwise the natal controlled state is preserved.

The overlay settlement is ephemeral. The canonical natal settlement is never mutated.

### Branch and root gate

V1 does not map branch relations or root support into structure impact.

Instead it fails closed when it observes:

- annual/Dayun/natal branch clash;
- six-combination;
- a complete three-combination with a temporal participant;
- pair/group punishment or supported self-punishment patterns;
- annual stem root/support through same-element hidden stems in the annual branch;
- Dayun stem root/support through same-element hidden stems in the Dayun branch.

This means branch participation is checked rather than discarded, while unsupported branch semantics are not
invented.

### Dayun transition year

If the annual window overlaps two R197 Dayun segments, V1 returns unavailable. It does not collapse two
different Dayun contexts into one annual structure-impact bundle.

## Output

Every eligible natal settlement becomes one ephemeral overlay settlement and one R192 structural-role impact
assessment.

The complete assessment set is wrapped with createGovernedAnnualStructuralImpactBundleV1, binding it to:

- snapshotId;
- targetYear;
- structureId;
- producer policy id/version.

The resulting bundle is directly consumable by R194 and R195.

## Authority boundary

R198 is a MyeongHa product convention, not a claim that the retained research sources establish a universal
annual/Dayun resolver.

R198 does not authorize:

- a universal annual-vs-Dayun winner;
- five-year stem/branch Dayun splitting;
- numeric temporal weighting;
- branch relation -> structure-impact conversion;
- temporal trigger -> structural-change sufficiency;
- favorable/unfavorable polarity;
- concrete event prediction;
- LLM semantic judgment;
- permanent natal mutation.
