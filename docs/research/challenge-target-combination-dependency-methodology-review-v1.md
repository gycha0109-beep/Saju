# I34 Challenge Target Combination Dependency Methodology Review v1

## Purpose

I34 audits what combination-related context can legitimately be materialized for challenge targets after I31 relation participation and after I33 closed the clash-dependency substrate.

The review is methodology-only. It does **not** establish stem or branch transformation, binding, preservation, post-relation root state, effective mechanism force, usefulness/harmfulness, numeric scoring, or strong/weak classification.

## Decision

```text
CHALLENGE_SPECIFIC_COMBINATION_DEPENDENCY_ADAPTER_REQUIRED
```

I34 authorizes a dependency-evidence adapter, not a transformation/effect engine.

## Source audit

### Structural relation membership

`SRC-T0-YISI-ZHAN-10` and `SRC-T0-XUANZE-YAOLUE-UPPER` support deterministic structural identification of:

- stem five-combination,
- branch six-combination,
- branch three-combination,
- related competing structural relations.

This supports participation and topology only.

### Stem transformation scope limit

`SRC-T0-SANMING-TONGHUI-V2` imposes month/structure conditions for ten-stem `化氣` and frames the transformation discussion around the day stem and its combining counterpart.

Therefore:

```text
directSanmingDayStemTransformationContractReuseAuthorized = false
transformationTargetElementEmissionAuthorized              = false
```

A visible challenge-target stem may be identified as participating in a five-combination, but I34 does not authorize a transformed-product element or target disappearance/binding verdict.

### Branch combination completion

The same source tradition treats combination/bureau formation as conditional rather than implied by pair or group membership.

Therefore even a structurally complete three-combination remains:

```text
structural membership complete != effective/transformed bureau
```

### Seasonal/support/interference context

`SRC-METHOD-DITIANSUI-CHANWEI-WIKISOURCE` and `SRC-I20C-DITIANSUI-ROOT-SUPPORT-WIKISOURCE` support preserving season and named support channels as context.

They do not supply a complete additive or precedence model.

```text
completeSupportInterferenceModelAvailable = false
```

## Authorized dependency substrate

```text
I31 combination participation
structural relation participants / arity / kind / source IDs
month-command seasonal context
same-element/resource stem and branch positions
competing tracked relation topology
```

These may be adapted under a challenge-specific namespace.

## Explicitly blocked outputs

```text
stem combination transformation target element
branch combination transformation target element
combination transformation/effect verdict
post-relation root state
effective mechanism force
relation-specific usefulness/harmfulness
hidden-only target root effect
earth target root effect
numeric scoring
strong/weak classification
```

## Implementation guards

The next adapter must:

1. consume only I31 stem-five and root-candidate branch-six/three participation aligned to the same resolved pillar and I29 identity;
2. materialize structural participants, relation arity/kind/source IDs only;
3. attach month-command seasonal evidence without treating it as proof of transformation;
4. project same-element/resource positions as named channels without sums or weights;
5. route other tracked structural relations sharing participants as competing topology without assigning precedence/effect;
6. emit no transformation product element;
7. keep structurally complete three-combination distinct from an effective bureau;
8. keep hidden-only and earth root-effect subjects fail-closed;
9. emit no post-relation root state, effective force, usefulness/harmfulness, scoring, or classification.

## Verification

Initial CI #500 failed one regression assertion because the test expected the literal phrase `full three-combination` while the actual guard stated `structurally complete three-combination`.

No methodology or implementation contract was changed. The assertion was relaxed to the semantic phrase `three-combination`.

```text
I34 remediated code HEAD: e996bd3de9c2c4794f4da4d20dd7a469e4904560
CI run:                   #501
result:                   SUCCESS

lint:                     PASS
typecheck:                PASS
Vitest:                   73 files / 393 tests PASS
build:                    PASS
```

## Conclusion

```text
COMBINATION_DEPENDENCY_METHODOLOGY       = CLOSED
COMBINATION_DEPENDENCY_ADAPTER            = AUTHORIZED
TRANSFORMATION_TARGET_ELEMENT             = NOT AUTHORIZED
COMBINATION_EFFECT                        = NOT RESOLVED
TARGET_POST_RELATION_ROOT_STATE            = NOT DETERMINED
EFFECTIVE_MECHANISM_FORCE                  = NOT DETERMINED
STRENGTH_CLASSIFICATION                    = NOT AUTHORIZED
NUMERIC_SCORING                            = NOT AUTHORIZED
```

## Next gate

```text
I35 — Challenge Target Combination Dependency Evidence Adapter
```

I35 may materialize only the context channels authorized above. It must remain fail-closed on transformation and all downstream effect verdicts.
