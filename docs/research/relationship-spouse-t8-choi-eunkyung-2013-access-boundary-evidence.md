# Relationship / Spouse T8 — 최은경 2013 RISS / dCollection TLS access-boundary evidence

## Disposition

`命理學 六親論의 傷官에 관한 硏究` (최은경, 2013) is **not resolved at direct-body semantic level**.

Disposable acquisition PR #427 reproduced the current exact RISS identity, fulltext form tuple, site-authored fulltext dispatcher, RISS `Downloading.do` route, and the exact RISS-authored Wonkwang dCollection item route without guessing opaque identifiers. RISS returned HTML rather than a direct PDF. The Wonkwang route redirected to HTTPS, where the GitHub hosted runner could not validate the server certificate chain. TLS verification was not disabled to cross that boundary. #427 was closed unmerged.

This permanent record freezes only that public-route / TLS verification boundary. It does not infer a spouse-selector rule from abstract or catalog metadata and does not close `EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING`.

## Exact identity

```text
author       = 최은경
year         = 2013
title        = 命理學 六親論의 傷官에 관한 硏究
school       = 원광대학교 동양학대학원
RISS ID      = T13097800
RISS control = a2d2aa37279fbaaaffe0bdc3ef48d419
acquisition  = PR #427
```

The current public RISS detail page re-established the exact identity and exposed this fulltext tuple:

```text
control_no     = a2d2aa37279fbaaaffe0bdc3ef48d419
p_mat_type     = be54d9b8bc7cdb09
p_submat_type  = f1a8c7a1de0e08b8
fulltext_kind  = a8cb3aaead67ab5b
```

The current page also exposed the `originalCheck` contract and the site-authored `FullTextDownload.do` dispatcher implementation.

## Exact bounded acquisition evidence

Final disposable acquisition head:

```text
b39fd06aa1d0ce7b7855040305f7b63e05bf856c
```

Exact-head verification:

```text
Acquisition #5 / run 34530063646 = SUCCESS
artifact ID = 10173140266
artifact digest = sha256:fafca5141769d495b3f671fdf366f4cfcc62cfcc9a720fee3ac66828c7fee4c4

CI #2589 / run 34530063651 = SUCCESS
actual CI Verify / Verify = SUCCESS

PCC #644 / run 34530063714 = SUCCESS

PIE #945 / run 34530064571 = SUCCESS
```

The exact site-authored RISS `Downloading.do` replay returned:

```text
HTTP             = 200
Content-Type     = text/html; charset=utf-8
response bytes   = 3,053
response SHA-256 = ee69b793c7f796279516d872addd7d241b398fc7626e1bc4f40d530209160fa3
direct PDF       = NO
```

No same-origin PDF literal or direct thesis body was obtained from that response.

## Exact Wonkwang dCollection transport boundary

The RISS dispatcher authored this exact external item route:

```text
http://wonkwang.dcollection.net/jsp/common/DcLoOrgPer.jsp?sItemId=000001991979
```

The site-authored item identifier was consumed exactly as observed:

```text
sItemId = 000001991979
```

The HTTP route redirected to HTTPS. On the GitHub hosted runner, the HTTPS connection failed standard certificate-chain validation with:

```text
CERTIFICATE_VERIFY_FAILED
unable to get local issuer certificate
```

That is the acquisition boundary. This track did **not** disable TLS certificate verification, install an untrusted certificate workaround, guess an alternate dCollection identifier, or bypass any authentication/security mechanism merely to obtain the body.

The bounded RISS-side public route remained available and was inspected normally; only the exact dCollection HTTPS follow could not cross normal certificate validation.

## Direct-body status

The final body extractor recorded:

```text
bodyObserved        = false
semanticDisposition = NO_DIRECT_BODY_ACQUIRED_NO_BODY_LEVEL_DECISION
pdfSha256           = null
pdfBytes            = 0
pdfPages            = 0
```

Therefore no render-first thesis review is claimed and no body-level semantic admission decision is made.

The abstract's mention of a female native and husband/children remains a **discovery/relevance signal only**. It is not treated as a body proposition and is not promoted into an operational spouse selector.

## What this evidence does and does not establish

Established:

```text
exact scholarly identity                              = YES
exact current RISS fulltext form tuple                = YES
site-authored RISS dispatcher contract                = YES
site-authored RISS Downloading route                  = YES
exact RISS-authored Wonkwang dCollection item route   = YES
hosted-runner TLS certificate-validation boundary     = YES
```

Not established:

```text
complete PDF acquired                                 = NO
direct body rendered                                  = NO
direct body semantically reviewed                     = NO
native-sex-independent spouse selector found          = NOT EVALUATED FROM BODY
partner-sex-independent spouse selector found         = NOT EVALUATED FROM BODY
single-native natal-only spouse selector found        = NOT EVALUATED FROM BODY
complete role-neutral natal input contract found      = NOT EVALUATED FROM BODY
```

`NOT EVALUATED FROM BODY` must not be silently rewritten as a negative semantic finding. The source is simply not admissible for the missing selector on the evidence currently acquired.

## No-bypass / no-stitching boundary

The disposable acquisition preserved:

```text
guessedOpaqueIdentifierCount = 0
loginBypass                   = false
institutionAuthBypass         = false
paywallBypass                 = false
drmRequestExecuted            = false
decryptionActionExecuted      = false
crossSourceSemanticStitching  = false
TLS verification disabled     = false
```

Choi Eunkyung 2013 abstract language, RISS metadata, dispatcher metadata, and the dCollection transport boundary must not be combined with Jo Manseop 2007, Nam/Kim 2018, Lee Sangcheon 2017, any other partial scholarly result, or product terminology to manufacture a role-neutral natal spouse selector absent from one qualifying source.

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

PR #427 is Draft / CLOSED / unmerged. Its network acquisition workflow, public-route scripts, downloaded HTML/JS, transient reports, artifact payloads, and any binary material remain outside permanent `main`.

Permanent `main` retains only this bounded `src + test + docs` evidence contract.

## Next authority action

Continue single-source scholarly discovery for an explicit spouse mapping that is simultaneously spouse-specific, natal-facts-only, operational/executable, native-sex-independent, partner-sex-independent, and complete without cross-source semantic stitching. Public fulltext acquisition must continue to respect normal TLS validation and directly authored public routes; no TLS/security bypass is authorized.
