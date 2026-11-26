# Relationship / Spouse T8 — Na Hyukjin 2017 direct-body sex-conditioned scoring boundary

## Purpose

This record freezes the complete-body review of 나혁진 2017, `명리 궁합론의 현대적 재해석에 관한 연구`, against the still-open `EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING` frontier.

The source is unusually important because it publishes an **operational scored compatibility method** and tests it empirically. That operationality is preserved as positive evidence. It still does **not** close the role-neutral natal spouse-mapping gap because the executable contract itself is split by native sex, assumes an opposite-sex partner, and requires both partner charts.

## Acquisition provenance

Prior disposable PR #371 stopped correctly at the then-observed RISS original-existence signal and the National Assembly Library DRM viewer boundary.

Disposable recheck PR #405 did not replay the NANET DRM route. It followed only the current exact RISS page-authored public dispatcher chain:

```text
RISS T14398372
control 1f8b683fad900548ffe0bdc3ef48d419
→ exact detail-page-authored searchCommon.js
→ directly observed global fulltextDownload()
→ directly observed loginFlag.value = "1"
→ FullTextDownload.do
→ popup-authored Downloading.do
→ RISS-authored UBE dCollection item 000002321514
→ same-run item re-read
→ dCollection-authored non-DRM public PDF
```

The exact UBE dCollection item directly exposed:

```text
drm          = N
msg          = ''
ext          = .pdf
fileSaveName = 000002321514.pdf
fileSize     = 1,345,857
```

The page's content branch enters DRM machinery only when `drm == 'Y'`; the non-DRM `else` branch directly redirects to the authored `/public_resource/pdf/...pdf` path.

The follow-up fetch did not hard-code or guess a content target. It accepted `000002321514` only from the same run's RISS acquisition report, re-read that exact item, revalidated the non-DRM contract, then fetched the exact page-authored PDF path.

No opaque identifier guessing, NANET DRM replay, login/session bypass, institutional-auth bypass, paywall bypass, DRM request, or decryption was used.

## Content address

```text
author       = 나혁진
year         = 2017
institution  = 국제뇌교육종합대학원대학교
RISS ID      = T14398372
RISS control = 1f8b683fad900548ffe0bdc3ef48d419
local bibno  = KDM201800823
NANET        = KDMT1201802345
dCollection  = 000002321514
PDF SHA-256  = a977d92aacbdf108e3f8afffff8335abfc97954d75127a3d52c75ddfd92ec49d
bytes        = 1,345,857
pages        = 88
encrypted    = false
PDF version  = 1.4
printed/body offset = physical PDF page - 11
```

The ezPDF producer metadata contains a stale 2008 timestamp and is not used as identity authority. The rendered title and approval/front-matter pages directly identify the 2017 thesis, author, institution, and major.

The complete PDF was text-indexed only for navigation. Material pages were rendered and visually reviewed before semantic judgment.

## Direct-body findings

### Printed p.22 / physical PDF p.33 — inherited spouse semantics

The thesis's review of `육친(六親) 궁합론` explicitly states the inherited spouse allocation:

```text
male native   → Wealth = wife
female native → Officer = husband
```

The same passage frames the husband as household head and the wife as the supporting spouse. This is not merely a bibliographic mention; it is part of the source's own theoretical setup for compatibility methods.

### Printed p.27 / physical PDF p.38 — modern method begins

The thesis introduces `십성코스(十星-Course) 궁합론` as a new compatibility-measurement tool. It uses natal Ten-Star relations and is intended to produce a compatibility score.

However, the method is defined from the outset with separate male-chart and female-chart measurement structures.

### Printed p.28 / physical PDF p.39 — executable branch table

The central measurement table is explicitly divided by sex.

For the **male chart** it measures:

```text
Food/Output → Wealth
Wealth → Officer
Peer ↔ Wealth
```

and interprets these as behavior toward a **woman**.

For the **female chart** it measures:

```text
Officer → Resource
Wealth → Officer
Food/Output ↔ Officer
```

and interprets these as receiving love from / behaving toward a **man**.

This is an executable sex-conditioned contract, not generic prose.

### Printed pp.29-30 / physical PDF pp.40-41 — separate operational semantics

The body then implements the two branches separately under `남자사주의 측정과 상대방 심리` and `여자사주의 측정과 상대방 심리`.

The male branch explicitly interprets Wealth as woman and evaluates behavior toward a female partner. The female branch separately interprets Officer as man and evaluates behavior toward a male partner.

The same Ten-Star relation can therefore carry different operational meaning depending on the native's sex.

### Printed pp.33-34 / physical PDF pp.44-45 — 24-point scoring contract

The thesis gives a concrete score table:

```text
male branch:   3 factors × 0-4 points = 12
female branch: 3 factors × 0-4 points = 12
combined compatibility score          = 24
```

Stage 1 explicitly uses different relations for men and women. Stage 3 also uses different relations. Even Stage 2, which uses Wealth→Officer on both sides, assigns different relational semantics to the male and female charts.

This is strong evidence that the source has a real operational decision contract. It is equally strong evidence that the contract is not native-sex independent.

### Printed pp.50-51 / physical PDF pp.61-62 — conclusion

The conclusion restates the modern Ten-Star-Course method in the same sex-separated form:

```text
male:   Food/Output→Wealth, Wealth→Officer, Peer↔Wealth
female: Officer→Resource, Wealth→Officer, Food/Output↔Officer
```

The empirical validation population remains married and divorced male-female couples. The thesis reports correlations between the compatibility score and marital satisfaction / divorce outcomes and concludes that the method has practical value as a modern compatibility method.

The result therefore cannot be dismissed as merely abstract or non-operational. But the conclusion never replaces the male/female branches with one spouse selector independent of native sex and partner sex.

## Admission analysis

```text
operational compatibility scoring method published       = YES
natal chart facts used operationally                      = YES
24-point executable score contract                        = YES
empirical validation against divorce/marital satisfaction = YES
explicit modern-reinterpretation claim                    = YES

male/female separate operational branches                 = YES
opposite-sex partner framing                              = YES
both partner charts required                              = YES
male Wealth = wife retained                               = YES
female Officer = husband retained                         = YES

native-sex-independent spouse selector                    = NO
partner-sex-independent spouse selector                   = NO
single role-neutral replacement spouse selector           = NO
single-native natal spouse selector                       = NO
complete governed Relationship T6 input contract          = NO
```

The crucial distinction is between **operationality** and **role neutrality**.

Na Hyukjin 2017 supplies the former but not the latter. The method can actually be scored, but the scoring logic itself branches on male versus female natives and targets women versus men respectively. It also requires two charts, so it is a dyadic compatibility algorithm rather than a natal spouse selector for one native.

## No-stitching boundary

This evidence does not combine:

- Na Hyukjin's operational score;
- spouse-palace location evidence;
- Song Jaewoo's actual-role language;
- Song Sangseop's female-chart Yongsin husband remapping;
- Park Hyeyoung's modern-family critique;
- same-sex-family discussion; or
- product-level partner terminology

into a synthetic role-neutral spouse selector no single source publishes.

## Authority result

```text
QUALIFYING_PRIMARY_WITNESS                  = CLOSED
INDEPENDENT_NORMATIVE_PROVENANCE            = CLOSED
EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING         = OPEN
CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE    = OPEN
RELATIONSHIP_T6_INPUT                        = OPEN

authorityGapsClosed = 2/5
authorityGapsOpen   = 3/5
authorityAdmissionReady = false
Production = HOLD
```

No spouse producer, claim, rule, interpretation pack, preview, compatibility activation, or production activation is authorized by this evidence.

## Acquisition evidence

Disposable PR #405 exact final head:

```text
2ee97873d10882d0a80d43e9fbd9e742e08e90d3
```

```text
Acquisition #3 / run 34450946771 = SUCCESS
artifact ID = 10141508556
digest = sha256:585320ac205adbe9906151aaa9f812599529d17aec49ee1f2b386cbd28807986
CI #2512 / run 34450946772 = SUCCESS; actual Verify = SUCCESS
PCC #567 / run 34450946754 = SUCCESS; actual production verify = SUCCESS
PIE #871 / run 34450947431 = SUCCESS
```

The PDF and acquisition machinery remain ephemeral and are not part of this permanent evidence branch.
