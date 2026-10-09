# FR300-R1S-RIGHTS — MINDS-Libras participant product-use scope

Watchtower-Track: face-engine

## Decision

Public source review does not currently establish participant consent/data-use authority for using MINDS-Libras facial RGB, depth, or FaceModel data in commercial product-development validation.

This is an **unresolved authority** finding.

It is not a claim that participant consent never existed.

## Sources reviewed

### UFMG creator thesis

The creator thesis describes the MINDS-Libras recording protocol, twelve signallers, public dataset, RGB/depth/body/face data, and the Kinect FaceModel schema.

The reviewed public text did not locate a participant consent statement that specifically authorizes commercial product-development validation.

No CAAE/IRB/CEP authority for the MINDS collection was source-bound in the reviewed surface.

### 2021 Neural Computing & Applications article

DOI: `10.1007/s00521-021-05802-4`.

The article describes MINDS-Libras as a public database created from twelve signallers and 1,200 RGB-D samples.

Its accessible full-text copy contains a section titled `Compliance with ethical standards`.

In that section the located statement is:

```text
Conflict of interest: authors report no conflict of interest.
```

The reviewed article surface did not locate separate statements for:

- informed consent;
- ethical approval;
- CAAE/IRB/CEP;
- image-rights authorization;
- commercial product-development consent.

The absence of those statements in the reviewed public surface is not proof that no underlying consent record exists.

### Public distribution metadata

The public distribution is CC BY 4.0.

That resolves a dataset copyright-license question.

It does not independently resolve the participants' consent/data-subject scope for commercial product-development validation of identifiable facial data.

## Adjudication

```text
datasetCopyrightLicenseStatus =
  cc_by_4_0_bound

participantCommercialProductDevelopmentScope =
  unresolved_after_public_source_review

participantConsentNeverExistedClaimed = false

publicReleaseEqualsCommercialProductConsent = false
ccByCopyrightLicenseEqualsParticipantConsent = false

subjectArtifactInspectionAuthorized = false
subjectArtifactDownloadPerformed = false
externalContactAuthorized = false

FR299 = false
FR300-R2 = false
product = 18/29
```

## Why the gate remains closed

MINDS-Libras contains human facial RGB/depth/coordinate information.

The project does not need to inspect those subject artifacts merely to discover that public documentation is insufficient on participant scope.

R1S-RIGHTS therefore stops before subject artifact inspection.

This preserves the R1S-ZC distinction:

```text
dataset copyright authority
!=
participant/data-subject authority
```

## Next frontier

The remaining zero-cost options are:

1. obtain authoritative Zenodo publisher file identity metadata if a public metadata endpoint exposes filename/file-id/checksum;
2. locate a primary public participant-consent/data-use record if one exists;
3. if public authority remains exhausted, prepare a narrow rights question for the authors/institution without sending it;
4. do not inspect subject FaceModel/RGB/depth artifacts until the rights gate is explicitly changed.

No author/institution contact is authorized by this track.

No paid acquisition is authorized.

Watchtower-Track: face-engine
