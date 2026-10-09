# FR312G10 — Verified Primary Licence Rights & Owner Inquiry Routes

Issue #2415 · Track: face-research · Date: 2026-10-08
Upstream: FR312G6–FR312G9. No raw images, derived face measurements, licence execution, owner communications or data access occurred.

## Actual finding, not assumed permission

### S02 — FRGC v2.0 (NIST project / University of Notre Dame data copyright)

**Read the actual primary legal text**, not the NIST programme summary alone:

- NIST project: https://www.nist.gov/programs-projects/face-recognition-grand-challenge-frgc
- Current Notre Dame CVRL dataset catalogue and instructions: https://cvrl.nd.edu/projects/data/
- FRGC v2.0 **actual one-page agreement, revised 2006-04-21**: https://cvrl.nd.edu/media/django-summernote/2018-09-19/c7654649-5277-4d8c-b069-483d8ffa3039.pdf
- NIST FRGC routing contact, as listed by NIST Biometrics Evaluations: frgc@nist.gov (https://www.nist.gov/itl/iad/btg/resources/biometrics-evaluations)
- UND CVRL licensing route: cvrl@nd.edu. The CVRL page requires the executed agreement from an institution's own email and an institutionally authorised signer; public email service providers do not qualify for licence submission.

Specific source passages reviewed:

1. Section **Redistribution**: owner PI approval is required to redistribute, copy, publish or transfer data, including to another unit in the same organisation.
2. Section **Modification and Commercial Use**: the ordinary agreement is limited to the licensee's **internal research**. Prior UND written permission is expressly required for modification and commercial purposes, including product/technology commercialization.
3. Section **Requests**: the request must be directed through the FRGC programme manager, with UND PI receiving the executed organisation agreement.
4. Section **Publication**: additional permission for more than ten rendered faces, publication citation and copies of published research are addressed separately. None grants permission to process face images for the MyeongHa commercial product.

FRGC v2.0 is listed as about **72 GB** of 3D and visible-face images; the superseded 1.0a distribution is unavailable. Its 4,003 subject sessions are **sessions, not independent participants**. Controlled stills vary in lighting and expression; a nominal multi-image session is NOT two FR312F fresh accepted neutral recaptures. The existence of multi-session observations is not proof of exact 8-axis variance or per-axis missingness.

**Decision:** FRGC public base licence **does not authorize MyeongHa commercial product research, raw image modification/reanalysis, licensed image distribution, image upload to a cloud provider, or exported ratio statistics as product assets**. Ratio-statistics derivatives are not independently licensed in the published agreement; determine scope with UND **in writing**, rather than assume consent. Do not obtain images on this public licence.

### S01 — CMU Multi-PIE

- Dataset project home: https://www.cs.cmu.edu/afs/cs/project/PIE/MultiPie/Multi-Pie/Home.html
- Project shows 337 people imaged in up to four sessions; dataset distribution points to a historical Flintbox route. It does not show a current licence or confirmed commercial rights.
- CMU technology-transfer general *routing inquiry*, **not a dataset-specific grant**: https://www.cmu.edu/cttec/contact-us/ and innovation@cmu.edu. CMU CTTEC public pages confirm it handles licensing inquiries. They do **not** establish CTTEC owns or is currently able to license Multi-PIE.
- Contact images / old author email references are not evidence that an address is current or has signature authority. Do not transpose an unrelated CMU licence onto Multi-PIE.

**Decision:** Current distribution method and dataset-specific rights remain **unverified**. Owner identity, applicable licence, commercial reuse, third-party processing and independent two-session fresh-capture availability require a direct authorised answer before any image download.

## No external email sent — prepared contact messages

**CMU enquiry**, for the responsible operator to send from an appropriately identified account to the CTTEC general-routing contact:

Subject: CMU Multi-PIE dataset — current rights holder and commercial measurement research enquiry

Hello, I am working on MyeongHa, a potential commercial software product using neutral image-geometry measurements. The historical CMU Multi-PIE page links to Flintbox, but I cannot verify the current distributor or dataset-specific licence. Could you identify the current Multi-PIE rights holder and appropriate contact for (1) current access/fees, (2) commercial product R&D, (3) extraction and publication of aggregate geometry-ratio statistics, (4) use of vetted third-party processing services and retention/deletion rules, and (5) existence of participant-linked temporally distinct neutral sessions and repeated independently captured images? No dataset has been downloaded or used. Thank you.

**UND/CVRL preliminary enquiry**, **not** a signed licence submission, to be sent by a qualified representative to cvrl@nd.edu, optionally asking NIST FRGC programme team for referral first:

Subject: FRGC v2.0 — separate written commercial/reanalysis permission feasibility enquiry

Hello, I reviewed the published FRGC v2.0 licence (revised 21 April 2006). I understand its default grant is for internal research and that prior UND written permission is required for modification and commercial use. Before requesting images, can the UND rights holder consider a separately negotiated licence for a prospective commercial software product's neutral facial geometry measurement research, including derived scalar ratios, aggregate variance summaries, third-party service processing if permitted, and deletion/withdrawal constraints? Can you clarify whether the acquisition contains sufficiently linked independent subjects, two temporally distinct sessions and two fresh comparable neutral captures per session? Please advise current institutional signing requirements, exact licensing authority, commercial permission scope, required evidence of consent rights and any applicable fees. No images or subject records have been acquired. Thank you.

**Important operational constraint:** neither enquiry nor an executed licence has been sent, submitted or signed. An independent developer cannot manufacture an institutional email address or an organisation's authorised signature. Contact must be routed through the actual applicant. An ordinary email reply is not a dataset licence or legal sufficiency.

## Required rights-holder reply checklist

Record only when actually received with verifiable provenance:

- current dataset title/version, owner and distributor; applicable contract and signatory authority
- whether proposed **commercial software development** (rather than only academic/internal research) is expressly allowed
- written rights covering reconstruction of **eight FR312G exact ratio estimands**, extracted aggregate numeric statistics, model fitting, and derivative works
- storage region, sharing, outsourced/cloud model processing, sub-processors, permitted exports and redistribution
- participant consent/privacy, retention, deletion, withdrawal, audit and publication restrictions
- dated participant/session linkages, multiple independently taken accepted neutral images per session, unavailable-reason data, and how repeat counts avoid inflating independent N

A route to ask the owner is not a grant. Without independently reviewable positive answers **all eight exact-axis approvals stay 0** and FR312G6 numbers, sample splits, FR312H and collection remain closed.

## Executable regression guard

- `packages/face-reading/src/traditional-neutral-metric-primary-licence-rights-fr312g10.ts`
- `packages/face-reading/src/traditional-neutral-metric-primary-licence-rights-fr312g10.test.ts`

Returns a **blocked** result for each of CMU Multi-PIE and FRGC for commercial, derived-statistics, cloud or internal-research requests. Requesters cannot set `licenceSigned` or `ownerApproved` flags as substitutes for an actual executed document. No personal biometric or image input accepted.

### Exit gates

A — Sources: genuine licence clauses, responsible contacts and legally meaningful blockers. B — Rights: blocked permission regardless of caller assertions. C — Standard + Face CI + Integration green, squash merge, Issue closed, current main verified.

Watchtower-Track: face-research
