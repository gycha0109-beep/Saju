# FR300-R1I — RAP3DF V1 float64 artifact qualification gate

Watchtower-Track: face-engine

## 1. Purpose

FR300-R1H selected RAP3DF V1 as the first replacement-candidate evidence target because its dataset is public under CC BY 4.0 and the V1 publication documents a raw depth representation that is materially different from the blocked V2 creator pipeline.

FR300-R1I freezes what the V1 sources actually establish and adds a byte-level intake contract that can inspect a future exact publisher artifact without guessing endianness or physical units.

## 2. Official V1 dataset evidence

Mendeley V3:

`https://data.mendeley.com/datasets/kpdkpcs8zb/3`

DOI:

`10.17632/kpdkpcs8zb.3`

The publisher records:

- 64 volunteers;
- 267 samples;
- 267 visible images;
- 267 infrared images;
- 267 depth images;
- paired visible/infrared/depth collection;
- CC BY 4.0.

## 3. Article evidence

Data in Brief:

`10.1016/j.dib.2020.106281`

The article states that:

- the three image types were collected at the same time with Kinect One;
- the depth representation is based on distance from each 3D face point to a virtual surface colocated with the Kinect camera;
- Kinect information was also saved without manipulation in data-extension files;
- depth data files contain a list of 8-byte floating-point values;
- images are 119 pixels wide by 149 pixels high.

The article does **not** state the exact byte order or the exact physical unit of those floating-point values.

FR300-R1I therefore binds the article to an expected candidate shape of:

```text
119 × 149 = 17,731 values
17,731 × 8 bytes = 141,848 bytes
```

That byte length is a qualification gate for an exact V1 depth artifact, not proof that an arbitrary 141,848-byte file is V1 depth.

## 4. Dual-endian inspection

The byte intake computes SHA-256 from the supplied bytes and independently decodes:

- IEEE-754 float64 little-endian;
- IEEE-754 float64 big-endian.

For each interpretation it records:

- total values;
- finite values;
- positive finite values;
- zero values;
- negative finite values;
- non-finite values;
- finite minimum and maximum.

The implementation intentionally does not choose the interpretation with the more plausible numeric range.

A selected endianness requires an independent evidence reference.

## 5. Physical-unit boundary

The article describes a distance relationship but does not state whether the raw float64 values are millimeters, centimeters, meters or another scale.

Numeric magnitude is not accepted as a unit witness.

A physical unit can only be bound when the caller supplies both:

1. a non-unknown declared unit;
2. an independent physical-unit evidence reference.

Without that evidence, metric adjudication remains blocked.

## 6. Publisher provenance

A future real artifact must also be bound to actually fetched Mendeley file metadata.

The receipt requires:

- dataset DOI `10.17632/kpdkpcs8zb.3`;
- dataset version 3;
- HTTPS metadata from the exact Mendeley dataset/file route;
- valid file UUID;
- V1 depth-artifact filename pattern;
- exact publisher SHA-256 equality;
- exact publisher size equality;
- exact 141,848-byte article-bound shape.

Both current Digital Commons API and anonymous Mendeley public-api route forms are accepted only when they are explicitly versioned to V1 version 3.

## 7. Participant-use boundary

The article reports:

- 71 people participated in acquisition;
- only 64 agreed to make their images available;
- participants were informed of risks, benefits and withdrawal rights;
- participating volunteers signed a consent form and image-use term;
- ethics approval CAAE `97615018.9.0000.012`.

This is meaningful participant-governance evidence.

It is **not** enough to infer that the signed image-use term authorizes this product's commercial development or production use.

Likewise:

```text
dataset CC BY 4.0
!= participant commercial product consent
!= production authorization
```

## 8. Current execution state

No exact V1 publisher depth artifact was retrieved in this execution.

Therefore:

```text
realRap3dfV1BytesRetrievedInCurrentExecution = false
realRap3dfV1PublicFileMetadataCaptured = false
realRap3dfV1ArtifactBindingIssued = false
realRap3dfV1EndiannessIssued = false
realRap3dfV1PhysicalUnitIssued = false
realRap3dfV1MetricAdjudicationIssued = false
realFR299BundleIssued = false
FR300-R2 = blocked
```

Static tests use generated float64 fixtures only.

## 9. What would reopen the path

The technical path can advance only after an exact publisher artifact is acquired and authenticated.

Then the track still needs:

1. exact endianness evidence;
2. exact physical-unit evidence;
3. canonical registration evidence for FR299;
4. participant-use scope compatible with the intended product-development path.

Until those are separately established, V1 is a qualified research candidate, not a production reference.

Product materialization remains 18/29.

Watchtower-Track: face-engine
