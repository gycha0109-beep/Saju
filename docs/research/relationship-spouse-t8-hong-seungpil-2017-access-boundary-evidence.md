# Relationship / Spouse T8 — 홍승필 2017 RISS / Kongju dCollection TLS access-boundary evidence

## Disposition

`『자평진전』에 기초한 궁합실관 연구` (홍승필, 2017) is **not resolved at direct-body semantic level**.

Disposable acquisition PR #431 re-established the exact RISS identity and site-authored fulltext dispatcher. The dispatcher authored the exact Kongju dCollection item route `https://kongju.dcollection.net/common/orgView/200000999222` without opaque identifier guessing. Standard TLS certificate verification on the GitHub hosted runner stopped at that route with `CERTIFICATE_VERIFY_FAILED: unable to get local issuer certificate`.

TLS verification was not disabled. No login, institution-authentication, paywall, DRM, or decryption bypass was attempted. No complete thesis body was acquired, so no body-level semantic admission decision is made. PR #431 is Draft / CLOSED / unmerged.

This permanent record freezes only that exact public-route / TLS verification boundary. It does not convert abstract, catalog, or dispatcher metadata into a spouse-selector proposition and does not close `EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING`.

## Exact identity

```text
author       = 홍승필
year         = 2017
title        = 『자평진전』에 기초한 궁합실관 연구
school       = 공주대학교 대학원 동양학과
RISS ID      = T14388745
RISS control = 8ebdb4487e4de984ffe0bdc3ef48d419
acquisition  = PR #431
```

## Exact current RISS form observation

The current RISS detail document exposed these exact observed values:

```text
control_no     = 8ebdb4487e4de984ffe0bdc3ef48d419
p_mat_type     = be54d9b8bc7cdb09
p_submat_type  = f1a8c7a1de0e08b8
fulltext_kind  = ""
```

The empty `fulltext_kind` is preserved as observed. This evidence does not invent or backfill a non-empty value.

The current page and loaded scripts also exposed the site-authored `FullTextDownload.do` dispatcher contract used by the disposable acquisition.

## Exact bounded acquisition evidence

Final disposable acquisition head:

```text
6924d2e4ce0f2de20fce3e6364d5def4060b5ed6
```

Exact-head verification:

```text
Acquisition #3 / run 34543130721 = SUCCESS
artifact ID = 10178025781
artifact digest = sha256:11e7325b4537999a78171ad21165ead321f72aca9b0371fd56bddcd1e5b0e26d

CI #2601 / run 34543130773 = SUCCESS
actual CI Verify / Verify = SUCCESS

PCC #656 / run 34543130704 = SUCCESS
production image build = SUCCESS
production container verify = SUCCESS

PIE #957 / run 34543131227 = SUCCESS
exact PR-head checkout = SUCCESS
clean worktree verification = SUCCESS
read-only prospective orchestration = SUCCESS
evidence uploads = SUCCESS
```

The final artifact recorded:

```text
fullLengthPdfAcquired          = false
guessedOpaqueIdentifierCount  = 0
loginBypass                    = false
institutionAuthBypass         = false
paywallBypass                  = false
drmRequestExecuted             = false
decryptionActionExecuted       = false
tlsVerificationDisabled       = false
crossSourceSemanticStitching  = false
semanticDisposition            = PUBLIC_ACCESS_BOUNDARY_ONLY_NO_DIRECT_BODY_DECISION
```

## Exact Kongju dCollection transport boundary

The RISS dispatcher authored this exact external item route:

```text
https://kongju.dcollection.net/common/orgView/200000999222
```

The site-authored item identifier is therefore:

```text
item ID = 200000999222
```

No alternate item identifier was guessed or enumerated.

A normal strict-TLS request on the GitHub hosted runner failed certificate-chain validation with:

```text
SSLCertVerificationError
CERTIFICATE_VERIFY_FAILED
unable to get local issuer certificate
```

That is the acquisition boundary. The track did **not** disable TLS certificate verification, install an untrusted-certificate workaround, switch to an unverified client, or bypass any authentication/security mechanism merely to obtain the body.

## Direct-body status

No complete PDF was acquired. Therefore:

```text
complete PDF acquired                             = NO
all physical pages rendered                       = NO
body semantically reviewed                        = NO
body-level spouse-selector admission decision     = NO
native-sex-independent selector found from body   = NOT EVALUATED FROM BODY
partner-sex-independent selector found from body  = NOT EVALUATED FROM BODY
single-native natal-only selector found from body = NOT EVALUATED FROM BODY
```

`NOT EVALUATED FROM BODY` must not be rewritten as a negative semantic finding. Abstract and metadata remain discovery signals only.

## No-bypass / no-stitching boundary

Permanent evidence freezes:

```text
guessedOpaqueIdentifierCount = 0
loginBypass                   = false
institutionAuthBypass         = false
paywallBypass                 = false
drmRequestExecuted            = false
decryptionActionExecuted      = false
TLS verification disabled     = false
crossSourceSemanticStitching  = false
```

Hong Seungpil 2017 abstract/catalog language, RISS metadata, dispatcher metadata, and the dCollection transport boundary must not be combined with Lee Changim 2016, Choi Eunkyung 2013, Jo Manseop 2007, or any other partial authority to manufacture the missing role-neutral natal spouse selector.

## Authority ledger

Unchanged:

```text
QUALIFYING_PRIMARY_WITNESS                  = CLOSED
INDEPENDENT_NORMATIVE_PROVENANCE            = CLOSED
EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING         = OPEN
CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE    = OPEN
RELATIONSHIP_T6_INPUT                        = OPEN

authorityGapsClosed = 2/5
authorityGapsOpen = 3/5
authorityAdmissionReady = false
spouseT8ProducerReady = false
productionPromotionReady = false
Production = HOLD
```

No spouse producer, rule, claim, pack, narrative, preview, compatibility activation, or production activation is authorized by this evidence.

## Disposable acquisition status

PR #431 is Draft / CLOSED / unmerged. Its acquisition workflow, route-following script, transient HTML/JS/reports, artifact payloads, and any future binary material remain outside permanent `main`.

Permanent `main` retains only bounded `src + test + docs` evidence.

## Next authority action

Continue single-source scholarly discovery for a source that explicitly publishes one complete spouse mapping that is spouse-specific, natal-facts-only, operational/executable, native-sex-independent, partner-sex-independent, and complete without cross-source semantic stitching. Public fulltext acquisition must continue to respect normal TLS validation and directly authored public routes; no TLS/security bypass is authorized.
