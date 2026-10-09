# FR300-R1Q — commercial-compatible metric 3D candidate refresh

Watchtower-Track: face-engine

## Decision context

FR300-R1H was a useful first inventory, but its evidence priority is now stale.

- FR300-R1N proved that RAP3DF V1 does not preserve the source float depth value or physical unit.
- FR300-R1P bound five official Mendeley V4 depth artifacts exactly to creator V2 bytes and therefore bound the official V4 samples to the same one-byte projection lineage.
- Neither RAP3DF release may return to the metric-reference path without contradictory source authority stronger than the frozen predecessor evidence.

R1Q therefore changes the search order from **technical-first** to **rights-first + metric-authority-first**.

## Admission model

A candidate can eventually reach FR299 only if all of the following are source-bound:

1. independent real-human 3D geometry;
2. explicit or recoverable physical metric scale;
3. no destructive normalization or serialization loss;
4. same-subject 2D correspondence or deterministic registered rendering;
5. registration/calibration support sufficient for canonicalization;
6. dataset copyright/license permission for the intended commercial product-development use;
7. participant/data-subject scope compatible with that intended use;
8. reproducible version/artifact identity;
9. deterministic conversion into the FR299 canonical metric 3D contract.

Dataset copyright permission and participant/data-subject scope are separate gates. A commercial dataset license is not treated as participant product-development consent.

## Screened inventory

R1Q freezes twenty candidates. The historical R1H candidates remain traceable rather than being rewritten.

| Candidate | Rights | Geometry | R1Q disposition | Primary blocker |
| --- | --- | --- | --- | --- |
| RAP3DF V1 | commercial license surface | metric blocked | terminal reject | R1N one-byte projection |
| RAP3DF V2 | commercial license surface | metric blocked | terminal reject | R1P official V4 exact-byte lineage |
| 3DWF | noncommercial | metric verified | terminal reject | CC BY-NC-SA |
| Florence Superface | noncommercial | metric verified | terminal reject | research/no-profit |
| Headspace / LYHM | noncommercial | metric verified | terminal reject | commercial exploitation forbidden |
| FaceScape | noncommercial | metric blocked for current need | terminal reject | noncommercial release + non-metric-space evidence |
| SIAT-3DFE | research only | metric verified | terminal reject | academic research purpose |
| FRGC v2 | unresolved | unresolved | hold rights | commercial/product scope not bound |
| BFM 2009 ten example scans | commercial license path | real 3D; official unit contract unresolved | **qualify next** | commercial license + metric unit + participant scope |
| Nexdata 200 Vietnamese 3D Living Face | paid commercial dataset | metric artifact unresolved | **qualify next** | public schema exposes JPG/XML/JSON, not metric depth/mesh contract |
| Nexdata 40 People 3D&2D Living Face | commercial license path | metric artifact unresolved | **qualify next** | public schema does not expose metric depth/mesh contract |
| FaceBase 3D Facial Norms | unresolved for product use | metric verified | hold rights | IRB/DAC controlled access; product permission not established |
| D4FLY | research only | 3D PLY | terminal reject | project policy says research only |
| UEA 3D Face | noncommercial | scanning ground truth | terminal reject | noncommercial academic research only |
| Stirling/ESRC 3D Face | research only | real 3D | terminal reject | research-purpose license |
| Texas 3DFRD | noncommercial | metric verified | terminal reject | official page forbids commercial use |
| IIIT-D Kinect RGB-D | noncommercial | RGB-D | terminal reject | official page forbids commercial use |
| Notre Dame 3D-TEC | unresolved | real 3D | hold rights | signed agreement; public page does not bind product scope |
| Lock3DFace | unresolved | RGB-D | hold rights | signed agreement; product scope not public |
| EURECOM KinectFaceDB | unresolved | RGB + depth + associated 3D | hold rights | organization agreement; product scope not public |

No candidate is promoted to FR299 or FR300-R2 by this screen.

## Source-bound new evidence

### Basel Face Model 2009 example scans

The University of Basel page states that ten registered example 3D scans are supplied in Matlab and PLY form. It also supplies 270 deterministic renderings and projected feature-point sets. The download page explicitly separates the default non-commercial terms from a commercial-licensing contact.

This makes the ten example scans a useful **license-first qualification target**, not an admitted metric reference. R1Q does not download them under the non-commercial agreement for product work.

Open questions for the next pass:

- does a commercial license cover the ten example scans and their renderings for internal product-development validation;
- what participant/data-subject scope attaches to those scans;
- what official artifact/unit authority establishes the physical coordinate unit;
- can the commercial agreement permit the deterministic derived validation receipts needed by FR299.

### Nexdata commercial 3D-liveness data

The 200-person Vietnamese listing explicitly describes the dataset as paid and available for commercial use, and identifies iPhone X or newer devices. The public file-format description, however, lists JPG/XML/JSON rather than a documented raw depth, point-cloud, or metric mesh contract.

The 40-person 3D&2D listing similarly advertises 3D/2D face use but does not publicly bind a metric geometry artifact.

Therefore these are **sample-schema qualification targets**. “3D face” marketing terminology is not accepted as metric geometry.

The next evidence request must establish:

- exact sample file manifest;
- whether raw TrueDepth/depth/mesh data exists;
- unit and scale semantics;
- RGB↔depth registration/calibration;
- whether the commercial license and participant consent cover internal commercial product-development validation.

### FaceBase 3D Facial Norms

FaceBase is technically strong: its official technical notes describe stereophotogrammetry, OBJ facial surfaces, 3D coordinates, and millimeter measurements. Individual-level data are controlled and require IRB/ethics approval plus Data Access Committee approval.

That is not enough to claim commercial product-development permission. It remains a rights hold rather than a technical reject.

### Cheap rights rejections

The refresh intentionally stops technical deep-dives when primary sources already exclude the intended use:

- D4FLY: project policy describes the shared databases as research-purpose resources.
- UEA: free only for non-commercial academic research.
- Stirling/ESRC: license restricts images/scans to research purposes.
- Texas 3DFRD: official page explicitly says no commercial purposes.
- IIIT-D Kinect RGB-D: official page explicitly limits use to research/education and excludes commercial use.

These candidates are not worth expensive artifact qualification for the current product path.

## Queue after R1Q

### Qualification queue

1. `bfm2009_example_scans`
   - rights first: commercial license scope;
   - then official metric unit/artifact contract;
   - then participant scope;
   - no scan download before a compatible commercial path is established.

2. `nexdata_vietnam_200_3d_liveness` and `nexdata_40_3d_2d_liveness`
   - request sample manifest/schema;
   - require raw metric geometry, not merely RGB images or liveness metadata;
   - bind participant product-development scope separately from the vendor's commercial license.

### Rights-hold queue

FRGC v2, FaceBase 3D Facial Norms, Notre Dame 3D-TEC, Lock3DFace, and EURECOM KinectFaceDB remain visible but cannot consume deep technical work until their commercial/product-use scope is source-bound.

### Acquisition fallback

If the market candidates fail, the next route is a small consent-forward reference corpus collected or commissioned specifically for:

- real-human metric 3D;
- corresponding 2D;
- explicit internal commercial product-development validation consent;
- deterministic calibration and artifact hashing.

This is an acquisition fallback, not an existing dataset and not a shortcut around consent.

## Frozen authority

```text
candidateCount = 20
qualifyNext = 3
holdRights = 5
terminalReject = 12

fr299EligibleCandidateCount = 0
fr300R2EligibleCandidateCount = 0

RAP3DF V1 = terminal metric reject
RAP3DF V2 = terminal metric reject

nextEvidencePriority =
  1. BFM 2009 commercial-license + official metric-unit qualification
  2. Nexdata metric-artifact schema + participant product-scope qualification
  3. custom metric-3D acquisition design if market candidates fail

productMaterialization = 18/29
```

R1Q changes the search frontier; it does not authorize production, commerce, FR299, or FR300-R2.

Watchtower-Track: face-engine
