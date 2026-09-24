# FRB001 — Face Reading Binding Foundation

Status: implementation

Watchtower-Track: face-reading-binding

## Purpose

FRB001 establishes the dedicated binding boundary between:

1. the product-neutral canonical face-observation engine; and
2. the source-governed traditional Face Methodology / Metric / Operationalization / Rule system.

It intentionally does not implement another observation extractor and does not perform traditional-source research.

The runtime direction remains:

```text
RGB selfie
  -> canonical observation features
  -> FRB metric binding
  -> existing FaceMetricDefinition
  -> existing FaceOperationalizationDefinition
  -> existing FaceRuleDefinition
  -> structured FaceClaim
```

FRB001 stops before metric value execution. Its job is to make the ownership boundary and missing-capability handoff explicit.

## Why a separate binding track is needed

The repository already separates:

- neutral observation authority;
- traditional methodology authority;
- rule/claim semantics.

However, older research surfaces may still accept human-labelled criterion states directly, and the current traditional registry may contain methodology metrics whose canonical observation source has not yet been explicitly bound.

FRB001 closes that architectural gap without merging those authorities.

## Stable inputs

### Engine-side baseline

FRB001 uses the merged FR282 RGB-selfie feature authority matrix as the canonical vocabulary baseline.

Important:

`FR282 readiness != engine materialization`

A feature marked `reusable_now` by FR282 means reusable observation authority exists. It does not mean that the current product-facing canonical payload already materializes that feature.

FRB001 therefore reports every non-unavailable FR282 entry as:

`materializationAssertion = not_asserted_by_fr282`

Actual materialization must be supplied by the observation-engine track.

### Methodology-side baseline

FRB001 reuses the existing contracts:

- `FaceMetricDefinition`
- `FaceOperationalizationDefinition`
- `FaceRuleDefinition`
- `FaceClaim`
- `FaceMethodologyPackDefinition`

It does not create a parallel traditional-rule model.

## Binding unit

The first executable boundary is a methodology metric.

A binding definition connects:

```text
FaceMetricDefinition
        <- binding ->
canonical observation feature(s)
```

Three binding forms are supported:

### direct_numeric

One canonical numeric feature is already semantically the metric value.

No hidden adapter or transformation is permitted.

### component_numeric

One structured canonical feature contains the metric as an explicit component.

The extraction must be named by an `adapterRef`.

### derived_numeric

One or more canonical features are required to derive the metric.

The derivation must be implemented by an explicit `adapterRef`.

FRB001 deliberately has no free-form formula or threshold field.

A binding adapter may not smuggle in:

- a traditional category threshold;
- a camera correction;
- a new physiognomy meaning;
- consumer prose.

## Review authority

A binding cannot have greater review authority than its upstream `FaceMetricDefinition`.

FRB001 also refuses `production_authorized` binding while the FR282 matrix itself keeps product production authority disabled.

This foundation is therefore research/review infrastructure, not a production promotion shortcut.

## Runtime capability handshake

The observation engine reports feature capability separately:

```text
materializationState
  materialized
  not_materialized
  unsupported

availabilityState
  available
  section_limited
  unavailable
  not_evaluated
```

This allows FRB to distinguish:

```text
feature exists in the authority vocabulary
!=
feature is implemented
!=
feature is usable in this capture
```

## Explicit handoff ownership

FRB001 emits bounded gaps.

### To face-observation-engine

```text
canonical_feature_not_materialized
canonical_feature_unsupported
```

Meaning:

The traditional metric/binding is known, but the observation engine cannot currently supply the required canonical feature.

FRB does not open MediaPipe, landmark, camera, or depth work itself.

### To face-traditional-research

```text
required_observation_outside_product_authority
```

Meaning:

The pinned methodology requires something that the current ordinary-RGB product authority explicitly marks unavailable.

Traditional research must preserve the section as unavailable/limited or supply a source-governed alternative requirement.

FRB must not invent an observation proxy.

### To face-reading-binding

```text
metric_binding_missing
binding_adapter_not_materialized
```

Meaning:

Both sides may exist, but the explicit mapping/adapter has not yet been implemented in this track.

## Current repository baseline

The existing `pack.face.research_v0@0.2.0` contains three registered Shenxiang three-division metrics:

- `metric.shenxiang.three_divisions.upper_length@0.1.0`
- `metric.shenxiang.three_divisions.middle_length@0.1.0`
- `metric.shenxiang.three_divisions.lower_length@0.1.0`

At FRB001 foundation time, no FRB metric binding is declared for them.

Therefore the deterministic coverage audit reports:

```text
metricCount = 3
declaredBindingCount = 0
missingBindingCount = 3
outsideProductAuthorityCount = 0
```

This is intentional.

FRB001 does not guess that an existing eye/nose/mouth feature is equivalent to 三停 length.

A later binding task must either:

1. consume a canonical feature actually authorized/materialized for those spans; or
2. send an explicit observation requirement to the engine track.

## Coordination with FR284

FR284 is concurrently materializing the first product-facing RGB morphology cluster.

FRB001 does not depend on unmerged FR284 code and does not modify FR284 files.

Once FR284 or its successors merge, the next binding step can adapt their canonical payload capability metadata into FRB001 runtime capabilities and declare the first real methodology-metric bindings.

## What FRB001 does not do

FRB001 performs none of the following:

- MediaPipe extraction;
- provider-landmark mapping;
- image analysis;
- camera validation;
- pose correction;
- ARCore/depth work;
- traditional source research;
- traditional threshold invention;
- operationalization classification;
- rule execution;
- claim generation;
- narrative rendering;
- character grounding.

Those remain owned by their respective tracks/layers.

## Next binding frontier

After FRB001 merges:

1. wait for/consume the first merged canonical morphology payload contract from the observation-engine track;
2. consume source-governed methodology requirements from the traditional-research track;
3. declare the smallest real metric binding vertical slice;
4. materialize any required component/derived adapter in this track;
5. only then execute existing operationalization/rule/claim contracts.

The first real vertical slice must be chosen from an observation and methodology pair that both have explicit authority.

FRB will not choose a traditional threshold merely because an engine column is convenient.