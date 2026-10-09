# FR318 / FR319 private local evidence executor

> For the full FR313 → FR319 operator path, use `README-fr313-fr319-local-pipeline.md`. This document remains the backward-compatible FR318-entry path.

This runner executes the already-governed FR318 and FR319 contracts against **private local evidence**.

It does not create evidence, infer missing authority, or promote repository state.

## What it does

The runner:

1. reads one private JSON input from disk;
2. calls FR318;
3. optionally passes the successful FR318 runtime hairline result directly into FR319;
4. writes only repository-safe receipts;
5. prints only a repository-safe execution summary to stdout.

The runner never serializes the FR318 runtime metric scalar or the FR319 runtime seven-reference values.

## Build and self-check

```bash
npm run face:build
npm run face:verify:fr318-fr319-local-executor
```

The self-check imports the compiled FR318 and FR319 contract functions and verifies that the runner's repository-safe output guard is active.

It uses no real or synthetic biometric evidence.

## Private input location

Private input is accepted only when either:

- it is outside the repository working directory; or
- it is under `.cache/face-reading/`.

Repository-local private input anywhere else is rejected.

The repository already ignores:

```text
.cache/face-reading/
```

Recommended location:

```text
.cache/face-reading/fr318-fr319-local/private-input.json
```

Do not add that private input with `git add -f`.

## Run FR318 only

```bash
npm run face:run:fr318-fr319-local -- \
  --input .cache/face-reading/fr318-fr319-local/private-input.json \
  --fr318-only
```

Default repository-safe output:

```text
.cache/face-reading/fr318-fr319-local/repo-safe-receipt.json
```

## Run FR318 then FR319

```bash
npm run face:run:fr318-fr319-local -- \
  --input .cache/face-reading/fr318-fr319-local/private-input.json
```

FR319 is attempted only when:

- FR318 returns `available`; and
- the private input contains an FR319 stage.

The runner injects the successful FR318 runtime hairline result into FR319 in memory. The private input must not duplicate or persist that generated hairline result.

## Top-level private input shape

```json
{
  "schemaVersion": "fr318-fr319-local-private-execution-input-v1",
  "fr318": {
    "...": "FR318MaterializationInput"
  },
  "fr319": {
    "schemaVersion": "fr318-fr319-local-fr319-stage-input-v1",
    "lowerFace": {
      "...": "FR301LowerFaceVerticalReferenceHandoff"
    },
    "browInterbrow": {
      "...": "FR302BrowInterbrowVerticalReferenceResult"
    },
    "nasalApex": {
      "...": "FR304NasalApexVerticalReferenceHandoff"
    },
    "nasalBridgeRoot": {
      "...": "FR304NasalBridgeRootVerticalReferenceHandoff"
    },
    "centralGroove": {
      "...": "FR315CentralGrooveMetricBridgeResult"
    },
    "exactCaptureProvenance": {
      "...": "FR319PrivateExactCaptureProvenance"
    }
  }
}
```

For FR318-only execution, `fr319` may be omitted or set to `null`.

The placeholder objects above describe TypeScript contract types. They are not evidence templates and do not authorize copying synthetic test fixtures into real execution.

## FR318 input requirements

The FR318 object must already contain genuine private/local evidence satisfying the existing contract, including:

- `artifactClass = real_local_capture`;
- FR314 materialization available;
- exact same-capture binding;
- M3 metric scale authority;
- one selected FR316 registration method with complete evidence;
- validated hairline support region;
- private local metric execution;
- canonical aligned right-handed metric XY;
- centimeters;
- x-right / y-up;
- transformed visible-boundary polyline;
- cardinality and point-order preservation;
- no extrapolation;
- no hidden completion;
- no face-oval or top-mesh substitution;
- all public-persistence flags false.

The runner does not manufacture or repair any missing field.

## FR319 input requirements

The FR319 stage must supply the six non-hairline predecessor results plus private exact-capture provenance.

FR319 still requires:

- all seven references available;
- finite canonical metric XY centimeter values;
- all seven values bound to the same exact capture;
- exact source-value binding;
- source authority verified;
- private provenance available;
- identical exact capture digest across all seven reference bindings;
- all public-persistence flags false.

Same subject, same session, synchronization, or coordinate-frame equality is not a substitute for exact-capture binding.

## Output privacy

The full repository-safe receipt is written to the requested output path.

The runner blocks serialization of keys that could expose private runtime material, including:

- metric `value`;
- runtime hairline reference;
- runtime seven-reference bundle;
- transformed boundary polyline;
- source capture digest;
- subject id;
- capture id;
- raw provenance;
- raw registration parameters;
- raw correspondences;
- private registration input;
- private metric execution input.

A digest-shaped string is also rejected from repository-safe output.

The output file is created with mode `0600` where the platform honors POSIX file modes.

## Status and exit codes

### Exit 0

- `fr318_available_local_only`
- `fr319_bundle_available_local_only`
- `self_check_pass`

These statuses mean only that the local contract execution reached the corresponding neutral runtime boundary.

They do not mutate repository authority.

### Exit 2

- `blocked_at_fr318`
- `blocked_at_fr319`

This is a governed fail-closed result, not a runner crash.

Inspect the repository-safe reason and predecessor receipt. Do not fill missing evidence with assumptions.

### Exit 1

Runner/input error.

Errors are printed without stack traces or private input echo. Digest-shaped error material is redacted.

## Authority boundary

Even when FR319 succeeds locally, this runner does not authorize:

- repository 7/7 state;
- public persistence of subject-level scalar values;
- anatomical ground truth;
- 髮際 / 眉 / 印堂 / 山根 / 準頭 / 人中 / 地閣 binding;
- Three-Divisions boundaries or spans;
- 平等 thresholds;
- classifier or calibration;
- FaceClaim;
- Product materialization;
- Production;
- Commerce.

A repository state change requires separately governed, reviewable evidence and an explicit authority decision. Local success alone is not that decision.
