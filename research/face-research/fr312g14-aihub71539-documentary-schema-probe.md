# FR312G14 — AI-Hub 71539 public-schema probe (non-empirical)

Issue #2433 · Track: face-research · Upstream FR312G13 / PR #2431.

## Scope and observation

This branch implements a pure public-field metadata probe plus synthetic positive/negative tests:
- packages/face-reading/src/aihub71539-public-metadata-probe-fr312g14.ts
- packages/face-reading/src/aihub71539-public-metadata-probe-fr312g14.test.ts

No biometric images, actual meshes, participant records, raw source files, applicant registration, source usage authorization, or FR299/FR312G empirical outcomes are claimed.

## Official public 71539 metadata

Official source: https://www.aihub.or.kr/aihubdata/data/view.do?currMenu=115&dataSetSn=71539&topMenu=100

Declared: 530 independent participants, 26 expressions (0 neutral), 13,780 3D sets, 551,200 JPG/raw images. Published metadata fields include mesh_id, actor_id, expression_id, obj_file_name, map_file_name in mesh; actors.id; expressions.id; Camera.filename; annotation.num_landmarks=68 and 68 indexed xyz landmarks. Their **original per-file JSON nesting is not verified**. This validator accepts an expressly normalized single-record documentary *hypothesis*, not the complete official JSON release schema.

The probe checks filename basenames, referential actor/expression consistency, neutral id 0, exactly 68 unique landmark IDs, and finite xyz components. Results never return actor IDs, actual coordinates, raw filenames, or image bytes. A passing synthetic fixture is **not** original-file evidence.

## Exact existing interface disposition

| Concern | Existing code contract | Current evidence |
|---|---|---|
| Public field hypothesis | FR312G14 probe | Tested synthetically only |
| Legal dataset qualification | real-independent-3d-nose-reference-pilot-fr300.ts | BLOCKED |
| JPG/OBJ physical bytes and source hashes | FR300RealSourceManifest | BLOCKED |
| Physical unit and validated external centimeter registration | FR299ExternalCanonicalRegistrationReceipt | BLOCKED |
| RGB + mesh exact same capture or independently validated registration | FR299RgbReferenceCorrespondenceReceipt | BLOCKED |
| Independent nasal tip and bridge root frozen annotations | FR266/FR297 to FR299 | BLOCKED |
| Two separated sessions, two fresh neutral captures each | FR312F/FR312G | BLOCKED |
| Eight exact mouth ratio axes | FR291(2)/FR80(1)/FR82(1)/FR212(1)/FR293(3) | 0/8 real external admitted evidence |

A Camera.filename field does not prove intrinsics, extrinsics or synchrony. OBJ extension and xyz units do not prove millimeters or centimeters. A 68-point schema is not a MediaPipe 468-point canonical mapping. 551,200 / 13,780 = 40 is arithmetic only, not forty recapture sessions.

## Access and scope

General policy: https://www.aihub.or.kr/intrcn/guid/usagepolicy.do?currMenu=151&topMenu=105

Commercial/noncommercial AI R&D is described, but AI dataset usage is separately restricted to model training. Before processing actual files, obtain explicit permission/clarification for independent 3D benchmarking, commercial model validation, derived geometry aggregate retention/publication, local raw-data handling, and participant privacy. Foreign transfer and unrelated third-party access require further permission. Dataset access does not automatically grant a broader commercial biometric processing right.

## Next legitimate technical experiment

1. After authorized applicant access, inspect one neutral actual paired 2D JPG, OBJ, label JSON and camera-information file on an approved local machine.
2. Compare exact released JSON hierarchy to the documentary normalized fixture; create an explicit versioned adapter only for observed differences.
3. Verify hashes, source scale, camera geometry, exact capture correspondence and independently frozen FR266/FR297 anchors; then attempt the unchanged FR299/FR300 gate.
4. Treat 71785 illumination and 71787 expression changes only as exploratory sensitivity experiments, and retain the FR312G two-session×two-capture blocker unless separately proven.
5. No new workflow: use existing standard, Face Reading and required Integration CI at exact PR head.

A=PARTIAL (metadata only); B=PARTIAL (code contracts mapped, no real sample); C=CI and merge must be separately verified. No empirical, traditional-semantic or product authority is promoted.

Watchtower-Track: face-research
