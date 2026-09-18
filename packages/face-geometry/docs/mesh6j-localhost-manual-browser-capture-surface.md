# MESH6J — Localhost Manual Browser Capture Surface

MESH6J is the first executable human-operator surface for the prospective MESH capture path.

It is deliberately a local research tool rather than a product UI.

```text
localhost operator page
  -> MESH6H explicit browser camera trigger
  -> MESH6I manual browser capture controller
  -> MESH6G prospective capture session
  -> MESH6F descriptive dataset
```

## Why localhost

The Saju repository is an engine repository and does not currently contain a browser application framework. MESH6J therefore adds no React, Vite, routing framework, database, upload service, or remote capture API.

The server binds only `127.0.0.1`, accepts GET requests only, and exposes no POST/PUT/PATCH/DELETE capture endpoint.

## Start

Prerequisites: Node 24, Python 3.12+, numpy, and a camera-capable browser.

```bash
npm ci
npm run face:build
python -m pip install numpy
node scripts/mesh6j-manual-browser-capture-preview.mjs
```

Default URL:

```text
http://127.0.0.1:4316/
```

A different localhost port may be supplied with `MESH6J_PORT`. The bind address is not configurable.

## Runtime preparation

Every server start prepares the runtime evidence inputs before serving the page.

### Canonical MediaPipe face asset

MESH6J calls the existing exact fetcher `tools/face-reading/blender/fetch_mediapipe_canonical_face.py`. The fetcher verifies the pinned MediaPipe canonical OBJ against the existing manifest and Git blob SHA. MESH6J computes `canonicalAssetDigest` as SHA-256 over those verified OBJ bytes.

### GNM weighted adapter

MESH6J regenerates the adapter through the existing authoring tools:

```text
tools/face-geometry/gnm/fetch_gnm_head.py
tools/face-geometry/gnm/export_gnm_region_ontology.py
tools/face-geometry/gnm/project_gnm_regions_to_mediapipe468_weighted.py
```

The generated adapter must remain fail-closed: 468 target vertices, weighted overlap allowed, no semantic side assignment, product-neutral, no production metric authority, and no anatomical diagnostic claim.

### Geometry metadata

MESH6J fetches exact MediaPipe geometry metadata from release commit `f8ef212d5c962c0e853db7e59d217056b187084b`.

Required path:

```text
mediapipe/tasks/cc/vision/face_geometry/data/geometry_pipeline_metadata_landmarks.pbtxt
```

Required Git blob SHA:

```text
252a7b05b24c5c43c5b94179393639f7c9a2fe8f
```

The server refuses to start if exact blob verification fails.

### FR76 parity bootstrap

The browser reconstructs the existing FR66 → FR76 authority chain using the exact pinned MediaPipe provider fixture:

```text
mediapipe/tasks/testdata/vision/face_blendshapes_in_landmarks.prototxt
Git blob SHA ea2e60eefaf6a5c13aee4bb468384edab7e7d5d7
```

This is a release-parity bootstrap only. A fixture is not empirical participant capture evidence.

## MediaPipe runtime

The live capture path continues to use the existing FR26 research runtime with `@mediapipe/tasks-vision@0.10.35`, the pinned WASM root, the pinned face-landmarker model reference, IMAGE running mode, one face, and disabled blendshape/provider transformation outputs.

MESH6J serves the installed package entry from the local Node installation so compiled Face Reading modules can resolve the browser package without adding a bundler.

The existing FR26 caveat remains: pinned WASM/model references are not independently hashed production runtime assets. MESH6J does not promote FR26 to production provider activation.

## Operator workflow

1. The operator explicitly opens the camera through MESH6H.
2. The operator enters protocol-local `prospectiveCollectionRef`, `captureSeriesRef`, `captureConditionRef`, sweep prefix, and planned sweep count.
3. The operator explicitly attests post-preregistration fresh capture and same-participant series.
4. The page fixes candidate-selection use, development-capture reuse, and identity matching to false.
5. The page starts one MESH6I run with `cameraOwnership = caller_retains_camera`.
6. Each press of **프레임 촬영** emits exactly one trigger containing `timestampMs` and `providerRunRef`.
7. The capture button remains disabled until that trigger is consumed downstream.
8. **현재 sweep 종료** explicitly closes the current trigger stream; a zero-frame sweep cannot be completed.
9. After the final sweep, MESH6I/MESH6G materialize the MESH6F descriptive dataset.
10. The operator may download only the returned descriptive JSON artifact.

The executable page contains no capture timer, autocapture loop, best-frame selection, pose score, quality score, confidence score, or numeric acceptance threshold.

## Persistence and privacy

The localhost server has no capture upload route. Browser capture objects remain inside the MESH6H/MESH6G in-memory lifecycle.

MESH6J introduces no MediaRecorder, localStorage, sessionStorage, IndexedDB, canvas image export, raw image endpoint, raw video endpoint, biometric embedding, or identity template.

The cache contains only authoring/runtime support assets: canonical MediaPipe OBJ, GNM NPZ, generated ontology, generated weighted adapter, and exact geometry metadata. It does not contain participant captures.

## Security boundary

The research server binds `127.0.0.1` only, allows GET only, sends no-store and nosniff, restricts camera permission to self, and applies a CSP for self/pinned provider asset origins.

The inline CSP allowance exists only for the generated import map that points the bare `@mediapipe/tasks-vision` specifier at the locally served installed package entry.

## Smoke verification

CI runs:

```bash
MYEONGHWA_MESH6J_SMOKE=1 node scripts/mesh6j-manual-browser-capture-preview.mjs
```

Smoke mode prepares the exact runtime assets, starts on an ephemeral localhost port, verifies all required page/runtime/module/vendor routes and authority flags, then closes the server.

A separate contract verifier checks that the executable surface does not add automatic capture, raw-capture persistence, scoring, or calibration authority.

## Authority boundary

MESH6J does not establish or issue independent freshness proof, participant identity proof, expression-neutrality verdict, occlusion verdict, pose acceptance, capture-quality acceptance, repeatability pass/fail, confidence score, population norm, numeric morphology threshold, calibration, production morphology admission, anatomical measurement, beauty interpretation, or traditional physiognomy interpretation.

A successfully exported dataset is descriptive prospective evidence only.

## Next frontier

```text
run MESH6J with an actual operator and participant
collect real post-preregistration repeated sweep datasets
review the inspectable MESH6F descriptive evidence
```

Until that happens, verifier fixtures and synthetic browser tests do not justify numeric calibration.
