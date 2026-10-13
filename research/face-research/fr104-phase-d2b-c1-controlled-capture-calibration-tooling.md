# FR104 Phase D2B-C1 — FR21b controlled-capture calibration tooling

## 상태

`research_candidate_tooling_only`

이 단계는 실제 front/rear camera calibration을 수행하거나 reviewed evidence를 registry에 admission하는 단계가 아니다.

## 목적

FR21b의 다음 real-device gate를 실행할 수 있도록 기존 Mesh6J operator runtime 안에 calibration mode를 추가한다.

필수 관찰 축:

- cameraFacing: `front | rear`
- known marker anatomical side: `left | right`
- stage:
  - `preview`
  - `raw_pixels`
  - `encoded_pixels`
  - `canonical_pixels`
- 각 stage의 `markerImageSide: left | right`

known anatomical side와 image-space side는 별도 필드로 보존한다.

## 구현

### 1. FR21b-compatible candidate builder

파일:

`packages/face-reading/src/neutral-ear-controlled-capture-calibration-tooling-fr104.ts`

역할:

- 기존 `ControlledCaptureCalibrationEvidenceFR21BV1` shape를 사용한다.
- `reviewState = research_candidate`만 발행한다.
- front/rear 모두 지원한다.
- 정확히 4개 stage가 없으면 거부한다.
- operator/device/browser context는 opaque ref로만 기록한다.
- preview presentation mirror 여부를 별도 기록한다.
- FR19 canonicalization authority/version/operation을 참조하지만 C1 자체가 canonicalizer를 구현하지 않는다.
- sanitized JSON 외 raw image/frame bytes/image digest를 export하지 않는다.

C1이 발행하지 않는 것:

- reviewed calibration
- verified controlled-capture profile
- subject-relative mirror provenance
- anatomical laterality
- validated external-ear observation
- traditional binding
- Production authorization

## 2. Mesh6J calibration mode

파일:

- `tools/face-geometry/capture/fr104-fr21b-calibration.html`
- `tools/face-geometry/capture/fr104-fr21b-calibration.mjs`

route:

`/fr104-calibration/`

기존 `Mesh6H` browser camera source를 그대로 사용한다.

front:

`cameraFacing=front -> facingMode=user`

rear:

`cameraFacing=rear -> facingMode=environment`

이 매핑 자체는 mirror semantics가 아니다.

### preview

presentation mirror checkbox는 UI transform만 제어한다.

`previewPresentationMirrorApplied`로 기록되지만 saved/source pixel authority로 승격되지 않는다.

### raw_pixels

exact Mesh6H captured frame image object를 in-memory canvas에 표시한다.

- 저장하지 않는다.
- JSON에 넣지 않는다.
- digest를 export하지 않는다.

### encoded_pixels

raw canvas를 in-memory PNG Blob으로 encode하고 다시 decode하여 별도 canvas에 표시한다.

- encoded artifact를 저장하지 않는다.
- operator가 실제 marker image side를 관찰해 기록한다.

### canonical_pixels

C1은 별도 canonicalizer를 만들지 않는다.

기존 FR19:

`sharp_auto_orient_then_reencode_same_supported_format`

경로를 통과한 실제 artifact를 별도로 확인한 후 marker image side와 evidence ref를 기록해야 한다.

따라서 C1 export의 canonicalization state는:

`not_executed_by_c1_tooling_operator_observation_required`

이다.

## 3. Registry 상태

C1에서는 다음을 수정하지 않는다.

```text
CONTROLLED_CAPTURE_PROFILES_FR21B = []
CONTROLLED_CAPTURE_CALIBRATION_EVIDENCE_FR21B = []
```

실제 device/browser calibration evidence가 수집되고 C2 validation/review가 끝나기 전에는 registry admission을 수행하지 않는다.

## 4. Privacy

C1 tooling:

```text
rawCapturePersistedByTooling = false
rawFrameBytesExportedByTooling = false
encodedArtifactPersistedByTooling = false
canonicalArtifactPersistedByTooling = false
imageDigestExportedByTooling = false
biometricEmbeddingProduced = false
identityTemplateProduced = false
sanitizedJsonOnlyExport = true
```

## 5. CI

기존 Face Reading CI에 다음 bounded test만 추가한다.

`neutral-ear-controlled-capture-calibration-tooling-fr104.test.ts`

Mesh6J smoke route에도:

- `/fr104-calibration/`
- `/fr104-calibration/operator.mjs`

를 추가한다.

새 workflow는 만들지 않는다.

## 6. 종료조건

### A

front/rear 모두 명시적으로 선택 가능.

### B

preview/raw_pixels/encoded_pixels/canonical_pixels가 서로 다른 stage로 기록 가능.

### C

known marker anatomical side와 image-space side를 별도 필드로 보존.

### D

raw user image / raw frame bytes / digest를 repository 또는 CI artifact에 넣지 않음.

### E

synthetic/CI fixture가 empirical calibration으로 승격되지 않음.

### F

real evidence 전까지 FR21b verified profile registry는 비어 있음.

### G

다음 authority는 계속 false:

```text
subjectRelativeMirrorProvenanceAuthorized
anatomicalLateralityAuthorized
validatedExternalEarObservationAuthorized
traditionalBindingAuthorized
productionAuthorization
```

## 다음 단계

C2:

`real calibration evidence intake / review`

에서 수행:

- front/rear completeness
- 4-stage completeness
- implementation identity validation
- repeatability consistency
- raw_pixels -> encoded_pixels contradiction detection
- encoded_pixels -> canonical_pixels transform explainability
- profile candidate build

실제 physical calibration이 수행되기 전에는 C2에서도 verified profile을 만들 수 없다.

Watchtower-Track: face-observation-engine
