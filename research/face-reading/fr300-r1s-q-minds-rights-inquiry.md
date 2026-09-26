# FR300-R1S-Q — MINDS-Libras rights inquiry packet

Watchtower-Track: face-engine

## Decision

The current public-source search for participant/data-subject authority is exhausted without locating a source that explicitly permits third-party commercial product/service R&D and validation using the MINDS-Libras RGB, depth, and 1,347-point FaceModel data.

Current authority: `participantCommercialProductDevelopmentScope = unresolved_after_additional_public_search`.

This does not mean that participants never consented. No subject artifact is downloaded or inspected by this track.

## Additional public surfaces reviewed

The additional pass covered the official MINDS project page, UFMG repository/thesis surface, official IFMG MINDS-Libras expansion-project page, official IFMG and UFMG institutional pages, related MINDS-Libras publications, and Zenodo-derived public dataset metadata.

Search terms included consent, consentimento, informed consent, ethical approval, CAAE, CEP, TCLE, uso de imagem, direito de imagem, commercial use, and commercial product development.

No reviewed public source established the required participant commercial product-development scope.

## Official contact routes

### Primary

Sílvia Grasiella Moreira Almeida  
Official IFMG address: `silvia.almeida@ifmg.edu.br`

Reason for priority: collaborator on MINDS-Libras, official contact on the IFMG MINDS-Libras expansion project, and current institutional route published by IFMG.

### Secondary

Frederico Gadelha Guimarães  
Official UFMG address: `fredericoguimaraes@ufmg.br`

Reason: MINDS founder, advisor of the MINDS-Libras doctoral thesis, and current institutional route published by UFMG.

The existence of these addresses does not authorize sending.

## Prepared inquiry

Subject: `MINDS-Libras RGB-D dataset — participant/data-use scope clarification`

```text
Dear Professor,

I am evaluating the MINDS-Libras RGB-D dataset (DOI: 10.5281/zenodo.4322984) as a validation reference for facial-geometry measurement software.

Before accessing or processing participant facial RGB, depth, or FaceModel data, I would like to clarify the participant/data-use scope separately from the dataset's CC BY 4.0 copyright license.

1. Did the original participant consent or data-use authorization permit third-party use of identifiable facial RGB, depth, and 1,347-point FaceModel data for commercial product or service research, development, and validation?

2. If yes, does that permission include development and validation of facial-geometry measurement software when the purpose is not biometric identity recognition?

3. Are there restrictions on storing or processing the facial data, deriving numerical validation measurements, or publishing only aggregate and non-identifying validation results?

4. Is there an authoritative participant-consent, data-use, ethics, or image-rights document that can be cited or supplied for this scope?

5. Does the CC BY 4.0 Zenodo distribution have participant-rights or data-use restrictions that are not expressed in the dataset copyright license?

A brief yes/no answer with any applicable restrictions or a pointer to the governing document would be sufficient.

Thank you.
```

## Why the inquiry is narrow

The project does not need a broad legal opinion. It needs only enough source authority to decide whether subject artifacts may be inspected for commercial product-development validation.

The inquiry does not ask for a new paid license, a custom commercial agreement, access to additional private participant data, biometric identity rights, or permission to republish identifiable faces.

If the answer is clearly affirmative and source-bound, a later authority change may permit technical artifact inspection. If the answer is negative or remains ambiguous, MINDS stays on hold.

## Frozen guardrails

```text
sendAuthorized = false
sendPerformed = false
paidSpendAuthorized = false
subjectArtifactInspectionAuthorized = false
subjectArtifactDownloadPerformed = false
FR299 = false
FR300-R2 = false
product = 18/29
```

## Next action without new authorization

Because public evidence is exhausted and sending is not authorized, the next zero-cost engineering action is:

```text
hold MINDS
→ evaluate the next zero-cost candidate
→ or evaluate existing-hardware metric-reference feasibility
```

MINDS should not consume more implementation effort until participant/data-use authority changes.

Watchtower-Track: face-engine
