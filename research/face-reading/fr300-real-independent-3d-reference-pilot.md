# FR300 — Real independent 3D nose reference pilot gate

Watchtower-Track: face-engine

## 1. Decision

FR300 is the first gate between the abstract FR299 reference-bundle contract and a real external RGB + 3D source.

It does not claim that a real subject reference has already been materialized.

The current primary candidate, iBUG `3dMDLab_real`, is deliberately blocked because the official resource page does not provide enough rights evidence or metric-scale evidence for the MyeongHa product-development reference pipeline.

FR300 therefore implements the executable gate now and refuses to manufacture a reference from unresolved evidence.

## 2. Primary candidate audit — iBUG 3dMDLab_real

Official source:

`https://ibug.doc.ic.ac.uk/resources/itwmm/`

The official iBUG page states that the 3dMDLab benchmark was captured under controlled conditions using a high-resolution 3dMD facial scanner.

For `3dMDLab_real`, the page documents:

- 8 real RGB images;
- images coming directly from an RGB camera of the 3dMD scanning system;
- 2048 x 2448 resolution;
- corresponding ground-truth 3D meshes;
- one ground-truth OBJ per input image;
- ground-truth meshes registered with the LSFM model.

The page also states that the sparse `.pts` landmarks were extracted using a CNN-based landmarker.

Therefore FR300 records:

- real RGB documented: yes;
- independent 3D ground truth documented: yes;
- RGB/3D pairing documented: yes;
- source registration documented: yes, to LSFM;
- image-model sparse landmarks present: yes;
- image-model sparse landmarks usable as FR266/FR297 ground truth: no.

## 3. Rights blocker

The official ITWMM resource page says that users of the code or data should cite the listed papers.

On the audited page, no explicit commercial-product-development grant, local raw-data processing grant, raw-data redistribution grant, or derived-reference-metadata publication grant was found.

FR300 does not infer those rights from the presence of a public download link.

Current statuses are therefore:

- commercial product development: `unresolved`;
- local raw-data processing: `unresolved`;
- raw-data redistribution: `unresolved`;
- derived reference metadata publication: `unresolved`.

The qualification receipt also requires an explicit license evidence reference. None is currently available from the audited resource page.

Result:

`blocked`

This is a provenance/legal-evidence gate, not a statement that iBUG has prohibited all such uses. Explicit permission or a governing license can change the receipt.

## 4. Metric-scale blocker

The official page says the ground-truth meshes are registered with LSFM.

It does not, on the audited resource page, specify the physical unit required by the FR299 reference lane.

FR300 therefore records:

`metricScaleDocumented = false`

until a source document or inspected dataset artifact provides governed unit/scale evidence.

LSFM registration is also not treated as equivalent to:

`canonical_aligned_right_handed_metric_3d`

A separate externally validated registration receipt remains mandatory.

## 5. Download/materialization state

The public download endpoint identified from the official resource page is:

`https://ibug.doc.ic.ac.uk/media/uploads/3dmdlab_real.zip`

The current execution environment could not fetch that ZIP.

Therefore FR300 does not claim:

- a local raw RGB file;
- a local OBJ;
- an RGB SHA-256;
- a mesh SHA-256;
- an inspected vertex/face count;
- a verified source unit;
- a canonical registration artifact;
- FR266/FR297 real annotations;
- a real FR299 bundle.

Test fixtures are synthetic contract fixtures only and are not research evidence.

## 6. Dataset qualification gate

A dataset can enter the real pilot only when all of the following are evidenced:

1. official source;
2. source description;
3. explicit license/permission evidence;
4. real RGB;
5. independent 3D ground truth;
6. documented RGB/3D pairing;
7. documented metric scale;
8. documented source 3D registration/frame;
9. explicit permission for commercial product development;
10. explicit permission for local raw-data processing;
11. explicit permission to publish the derived reference metadata that will be committed as evidence.

Raw-data redistribution permission is recorded separately.

MyeongHa does not need raw-data redistribution to run the local pilot, and raw face data remains forbidden from repository persistence by this contract.

## 7. Source manifest

After qualification, the locally supplied sample must produce a source manifest containing:

### RGB

- opaque artifact reference;
- SHA-256;
- width;
- height;
- format.

### 3D mesh

- opaque artifact reference;
- SHA-256;
- OBJ format;
- vertex count;
- face count;
- source coordinate-frame reference;
- source unit.

### Pairing

- exact subject binding;
- exact capture binding;
- pairing evidence reference.

The manifest asserts that neither raw RGB nor raw mesh is committed to the repository.

## 8. Registration boundary

The source mesh frame must match the source frame declared by the FR299 registration receipt.

The registration receipt must then independently satisfy FR299:

- exact source artifact binding;
- target `canonical_aligned_right_handed_metric_3d`;
- centimeter target unit;
- external registration method reference;
- registration artifact digest;
- validation reference;
- metric scale preserved or calibrated;
- candidate-provider independence;
- frozen before reference derivation and RGB candidate scoring.

FR300 does not create a transform merely because a mesh is registered with LSFM.

## 9. Annotation boundary

FR300 delegates the two governed landmarks to the existing contracts:

- FR266 nasal apex;
- FR297 nasal bridge root.

The FR299 input must bind both to the exact manifest subject and capture.

CNN-generated sparse landmarks supplied by a dataset cannot silently become either governed landmark.

## 10. Materialization

Once qualification, source manifest, registration, RGB/reference correspondence, and frozen annotations are valid, FR300 calls the FR299 constructor.

FR299 in turn derives the FR298 scalar.

FR300 executes the same frozen FR299 input twice.

The pilot succeeds only when:

- the reference scalar is exactly reproducible;
- bundle identity is unchanged;
- source digest is unchanged;
- registration digest is unchanged;
- tip annotation digest is unchanged;
- bridge-root annotation digest is unchanged.

The result is then:

`real_reference_pilot_materialized`

## 11. Current iBUG status

At FR300 merge time the iBUG candidate must remain:

`blocked`

Expected blockers include:

- `license_evidence_missing`;
- `metric_scale_not_documented`;
- `commercial_product_development_rights_unresolved`;
- `local_raw_data_processing_rights_unresolved`;
- `derived_reference_metadata_publication_rights_unresolved`.

This prevents a public download link from being mistaken for product-development authority.

## 12. Authority boundary

FR300 issues no:

- inferred dataset rights;
- external source-to-canonical registration transform;
- promotion of CNN sparse landmarks to ground truth;
- RGB candidate;
- benchmark winner;
- acceptance threshold;
- traditional binding;
- product-column materialization;
- Production activation;
- Commerce activation.

Product materialization remains 18/29.

## 13. Next executable step

The next step is no longer another geometry definition.

It is to obtain one source that satisfies the FR300 qualification gate.

For `3dMDLab_real`, that means obtaining explicit governing rights evidence plus physical unit/scale evidence and the actual sample files.

If those cannot be obtained, FR301 should not be started against that dataset. A different independently acquired RGB + calibrated 3D source with explicit product-development rights should be qualified instead.

Watchtower-Track: face-engine
