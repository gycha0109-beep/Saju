# FR300-R1H — independent 3D reference candidate gate

Watchtower-Track: face-engine

## 1. Why this gate exists

FR300-R1G established that RAP3DF V2 cannot currently be treated as metric 3D reference evidence.

The wrong response would be to replace it with whichever well-known 3D face dataset is easiest to download.

For this product, a reference dataset must pass two independent classes of authority:

1. **technical authority** — real independent 3D geometry, same-subject 2D correspondence, metric geometry and governed registration;
2. **usage authority** — terms that actually permit the intended product-development/commercial use.

An open-access paper is not a dataset license.

A technically excellent non-commercial dataset cannot silently become commercial product calibration evidence.

## 2. Current candidate matrix

| candidate | real independent 3D | paired/corresponding 2D | metric evidence | registration support | product/commercial permission | FR300-R2 |
| --- | --- | --- | --- | --- | --- | --- |
| RAP3DF V2 | yes | yes | **blocked** by FR300-R1G | unresolved | consent/product scope unresolved | blocked |
| RAP3DF V1 | yes | yes | unresolved in current chain | unresolved | CC BY dataset, participant product scope unresolved | blocked |
| 3DWF | yes | yes | yes | yes | **CC-BY-NC-SA-4.0** | blocked |
| Florence Superface | yes | yes | yes | unresolved | **research/no-profit only** | blocked |
| Headspace | yes | texture/3dMD package | yes | unresolved | **university non-commercial research only** | blocked |
| FaceScape | yes | yes | yes | yes | **non-commercial research only** | blocked |
| SIAT-3DFE | yes | texture/3D | yes | calibration support | **academic research / author-controlled rights** | blocked |
| FRGC v2 | yes | yes | unresolved in this track | unresolved | signed license; commercial permission unresolved | blocked |

No current candidate satisfies all gates.

## 3. RAP3DF V2

Official dataset:

`https://data.mendeley.com/datasets/kpdkpcs8zb/4`

Dataset license:

`CC BY 4.0`

The rights layer is comparatively permissive, but FR300-R1G now blocks the technical metric layer because the creator acquisition code does not preserve the libfreenect2 native float-depth surface in the visible V2 GitHub pipeline.

Exact final Mendeley V4 byte identity remains unresolved.

FR300-R2 remains blocked.

## 4. RAP3DF V1

Official V3 dataset page:

`https://data.mendeley.com/datasets/kpdkpcs8zb/3`

The page records:

- 64 volunteers;
- 267 samples;
- visible, infrared and depth data;
- CC BY 4.0.

RAP3DF V1 therefore has a better rights profile than most alternative real-face 3D datasets.

However, FR300-R1H does **not** promote the V1 paper or generic Kinect semantics into exact artifact authority.

The current chain still lacks an admitted exact V1 metric artifact/serialization/coordinate contract.

For that reason V1 becomes the first technical qualification target, not an approved reference.

## 5. 3D Wide Faces (3DWF)

Official dataset DOI:

`https://doi.org/10.21950/UBTZOR`

The repository describes:

- 92 people;
- RGB and depth captures;
- registered 2K point clouds;
- high-definition scanner point clouds;
- rotation/translation registration matrices.

This is technically attractive for FR300-R2.

The dataset license is explicitly:

`CC-BY-NC-SA-4.0`

Therefore it is not admitted for the current commercial/product authority path.

The related Sensors article being CC BY does not change the dataset license.

## 6. Florence Superface

Official dataset page:

`https://www.micc.unifi.it/resources/datasets/florence-superface/`

It provides:

- Kinect 2D/3D sequences;
- 16-bit depth and 24-bit RGB frames;
- high-resolution 3dMD scans;
- approximately 40,000 vertices / 80,000 facets;
- average high-resolution scan RMS error about 0.2 mm or better.

The same official research group states that the dataset is available for research/no-profit purposes.

Technically strong does not mean product-authorized.

## 7. Headspace

Official page:

`https://www-users.york.ac.uk/~np7/research/Headspace/`

The dataset contains 1519 3D head scans acquired with a 3dMD system and provides OBJ geometry plus textures for most subjects.

The official page and current user agreement restrict it to university-based non-commercial research. The agreement also forbids commercial exploitation.

It is therefore not a current product calibration candidate.

## 8. FaceScape

Official project:

`https://github.com/zhuhao-nju/facescape`

FaceScape is technically strong:

- multi-view images;
- camera parameters;
- corresponding 3D meshes;
- uniform-topology models;
- alignment tooling.

The official project states that the dataset is released only for non-commercial research use. Its license provides a separate contact path for commercial or special licensing.

Without that separate permission, FaceScape cannot unlock FR300-R2 for this product.

## 9. SIAT-3DFE

Official project:

`https://github.com/CIESIAT/SIAT-3DFE`

The project describes:

- 500 subjects;
- 8,000 3D facial-expression models;
- high-resolution structured-light geometry.

The associated paper reports approximately 0.04 mm reconstruction accuracy.

But the project README says the data are made available for academic research purposes and states that rights to copy, distribute and use the data remain under the corresponding author's control.

The article's CC BY license must not be substituted for dataset usage permission.

## 10. FRGC v2

NIST:

`https://www.nist.gov/programs-projects/face-recognition-grand-challenge-frgc`

FRGC includes high-resolution still and 3D face data, including experiments comparing 3D galleries with 2D probes.

NIST states that the data/software license must be signed by legal authorities authorized for the requesting organization.

The current track has not established commercial product-development permission or the exact metric/registration contract required by FR299.

FRGC therefore remains license-gated and unresolved, not eligible.

## 11. Current decision

```text
candidateCount = 8
eligibleCandidateCount = 0
fr300R2Authorized = false
realFR299BundleAuthorized = false
productColumnMaterialized = false
productionActivated = false
commerceActivated = false
```

Global product materialization remains 18/29.

## 12. Next evidence priority

The current order is deliberate.

### Priority 1 — RAP3DF V1 exact metric artifact qualification

Why first:

- public;
- CC BY 4.0 dataset;
- paired visible/depth data;
- already inside the same dataset family;
- no non-commercial dataset-license blocker.

It still needs exact artifact and coordinate/metric proof.

### Priority 2 — exact RAP3DF V2 Mendeley V4 artifact resolution

If the final V4 artifact differs from the creator GitHub pipeline or has a corrected export contract, FR300-R1G can be revisited.

Without exact V4 evidence it stays blocked.

### Priority 3 — explicit commercial license path

For technically superior datasets such as 3DWF, Florence Superface, Headspace, FaceScape or SIAT-3DFE, a separate commercial/product-development permission could change the rights gate.

No such permission is inferred here.

## 13. FR300-R2 remains closed

FR300-R2 is not the next coding task.

The next task is evidence acquisition/qualification against one of the three priorities above.

Watchtower-Track: face-engine
