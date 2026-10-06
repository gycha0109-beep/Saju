# FR313 → FR319 private local evidence pipeline

> FR308 → FR312 engineering validation is handled by `README-fr308-fr312-local-validation.md`. Its governed FR312 receipt can be injected with `--fr312-receipt`.

This runner connects the already-governed hairline contracts into one local-only execution path.

It does **not** create evidence, repair missing authority, promote repository state, or persist subject-level geometry.

## Pipeline

```text
FR313 model admission review
→ FR314 local visible-hairline observation materialization
→ FR316 exact same-capture registration assessment
→ FR318 local metric hairline materialization
→ optional FR319 exact-capture seven-reference bundle assembly
```

Each stage uses the existing contract function from `packages/face-reading/src`.

The older FR318 → FR319 command remains available and unchanged.

## Build and self-check

```bash
npm run face:build
npm run face:verify:fr313-fr319-local-executor
```

The self-check:

- imports all five governed contract functions;
- verifies the output guard rejects a subject-level scalar;
- verifies the output guard rejects a digest-shaped string;
- verifies an injected FR312 receipt carries exact candidate identity fields;
- rejects ambiguous or identity-incomplete FR312 handoff;
- uses no real or synthetic biometric evidence.

## Run

Recommended private input path:

```text
.cache/face-reading/fr313-fr319-local/private-input.json
```

Run:

```bash
npm run face:run:fr313-fr319-local -- \
  --input .cache/face-reading/fr313-fr319-local/private-input.json
```

Optional repository-safe output path:

```bash
npm run face:run:fr313-fr319-local -- \
  --input .cache/face-reading/fr313-fr319-local/private-input.json \
  --output .cache/face-reading/fr313-fr319-local/repo-safe-receipt.json
```

Private input is accepted only when:

- it is outside the repository working directory; or
- it is under the ignored `.cache/face-reading/` tree.

Do not force-add private input files to Git.

## Top-level private input

```json
{
  "schemaVersion": "fr313-fr319-local-private-execution-input-v1",
  "fr313": {
    "...": "FR313AdmissionReviewInput"
  },
  "fr314": {
    "...": "FR314LocalObservationInput"
  },
  "fr316": {
    "schemaVersion": "fr313-fr319-local-fr316-stage-input-v1",
    "artifactClass": "real_local_capture",
    "method": "exact_calibrated_surface_registration",
    "evidence": {
      "...": "FR316PrivateRegistrationEvidence"
    }
  },
  "fr318": {
    "schemaVersion": "fr313-fr319-local-fr318-stage-input-v1",
    "localMetricExecution": {
      "...": "FR318PrivateLocalMetricExecution"
    }
  },
  "fr319": {
    "schemaVersion": "fr318-fr319-local-fr319-stage-input-v1",
    "...": "six non-hairline predecessor results plus exact-capture provenance"
  }
}
```

This is a structural map, not an evidence template.

Do not copy synthetic unit-test fixtures into a real run.

`fr319` may be omitted. In that case a successful run stops after FR318.

## FR313 requirements

`fr313` must be a genuine `FR313AdmissionReviewInput`.

The runner calls `reviewHairlineModelAdmissionFR313` and proceeds only when disposition is:

```text
admitted_for_neutral_visible_hair_skin_boundary_runtime
```

The input must already contain a genuine FR312 expanded-validation receipt and separately reviewed representative ordinary-RGB coverage/model-behavior evidence.

The FR312 receipt must also contain one exact registered FR306 candidate identity:

- non-empty `candidateId`;
- non-empty `runtimeProviderId`;
- non-empty `exactRevision`;
- non-empty `runnerContractVersion`.

The FR313 input `modelId` / `modelRevision` must resolve to that same registered candidate. Provider, revision, or runner-contract swapping between FR312 and FR313 is rejected. The same identity requirement applies when the receipt is injected through `--fr312-receipt`.

The runner does not:

- create an FR312 receipt;
- invent representative coverage;
- infer subject demographics;
- convert synthetic-only validation into representative evidence;
- override a rejected or blocked FR313 result.

When FR313 is blocked or rejected, the run ends with `blocked_at_fr313`.

## FR314 requirements

`fr314` is the private local visible-hairline observation input.

The runner constructs the FR314 materialization request using the FR313 receipt produced in the same process.

The local observation still must satisfy the existing contract, including:

- exact admitted model identity/revision;
- visible boundary segment only;
- occlusion handling applied;
- no hidden segment completion;
- no face-oval substitution;
- no face-mesh top-vertex substitution;
- no traditional binding;
- source image, boundary, digest and derived scalar not publicly persisted.

FR314 runtime observation and vertical-reference values remain in memory only.

The output contains only the FR314 repository-safe receipt.

## FR316 requirements

The runner injects the FR314 result into the FR316 registration input.

The private FR316 stage supplies:

- `artifactClass`;
- one registration `method`;
- the corresponding private registration `evidence`.

For real evidence, `artifactClass` must be `real_local_capture`.

FR316 still requires the existing authority boundary:

- exact same capture;
- exact same session;
- exact artifact-pair binding;
- exact hairline observation provenance;
- M3 metric-scale authority;
- canonical aligned metric frame in centimeters;
- no unknown-scale fitting;
- selected registration evidence complete;
- visible hairline support region verified;
- no provider-landmark registration truth;
- no face-box / face-oval / average-face-size scale shortcut;
- no normalized-coordinate relabeling as metric;
- no 2D homography claim as metric depth truth;
- all private persistence flags false.

The pipeline proceeds to FR318 only when FR316 returns:

```text
eligible_for_local_hairline_metric_mapping_execution
```

The repository-safe output may contain the FR316 adjudication booleans and disposition, but not private evidence.

## FR318 requirements

The FR318 stage supplies only the private local metric execution.

The runner reuses the exact FR316 registration input assembled in memory and passes it together with that local metric execution into FR318.

FR318 still enforces:

- method identity consistency;
- canonical aligned right-handed metric XY;
- centimeters;
- x-right / y-up;
- transformed visible-boundary polyline;
- finite output;
- source boundary point cardinality/order preservation;
- no extrapolation beyond the validated support region;
- no hidden completion;
- no face-oval/top-mesh substitution;
- no public persistence of transformed boundary, digest, registration parameters, correspondences, or subject metric scalar.

The subject-level metric coordinate is never serialized by this runner.

## FR319 requirements

If `fr319` is present, the runner passes the successful FR318 result directly in memory as the hairline reference.

The private stage must supply:

- FR301 lower-face handoff;
- FR302 brow/interbrow result;
- FR304 nasal apex handoff;
- FR304 nasal bridge-root handoff;
- FR315 central-groove metric bridge result;
- private exact-capture provenance for all seven references.

FR319 still requires all seven references to be:

- available;
- finite;
- in `canonical_aligned_right_handed_metric_xy`;
- in centimeters;
- bound to the same exact capture;
- bound to the exact source value;
- source-authority verified;
- backed by private provenance;
- represented by the same exact source-capture digest across all seven bindings.

Same subject, same session, synchronized acquisition, or common coordinate frame does not substitute for exact-capture binding.

## Fail-closed statuses

Exit code `2` means a governed stage blocked execution:

- `blocked_at_fr313`
- `blocked_at_fr314`
- `blocked_at_fr316`
- `blocked_at_fr318`
- `blocked_at_fr319`

This is not a request to fill missing evidence with assumptions.

Exit code `1` means malformed input or runner error.

Errors:

- do not print stack traces;
- do not echo private input;
- redact digest-shaped strings.

## Success statuses

```text
fr318_available_local_only
fr319_bundle_available_local_only
```

These mean only that the existing neutral local contracts succeeded for that private execution.

They do **not** automatically change the repository gate.

## Output privacy

The runner writes only repository-safe stage information.

It rejects serialization of private/runtime keys including:

- subject-level `value`;
- runtime FR314 observation/reference;
- runtime FR318 metric reference;
- runtime FR319 bundle/reference values;
- raw boundary polyline;
- transformed boundary polyline;
- source image/capture digests;
- RGB and metric-support digests;
- subject/capture identifiers;
- registration evidence;
- raw registration parameters;
- raw correspondences;
- camera parameters;
- local metric execution;
- exact-capture provenance.

Digest-shaped strings are independently rejected from safe output.

The receipt file is written with mode `0600` on platforms honoring POSIX modes.

## Authority boundary

Even a successful FR319 local run does not itself authorize:

- repository 7/7 promotion;
- public subject-level geometry persistence;
- anatomical ground truth;
- 髮際 / 眉 / 印堂 / 山根 / 準頭 / 人中 / 地閣 binding;
- Three-Divisions boundary or span computation;
- thresholds;
- calibration/classifier issuance;
- FaceClaim issuance;
- Product materialization;
- Production;
- Commerce.

Any repository authority change requires a separate governed review of evidence that can be represented without violating the private biometric boundary.
