# Relationship / Spouse T8 — 조만섭 2007 public-reader access boundary evidence

## Disposition

`명리이론과 궁합의 상관관계 연구` (조만섭, 2007) is **not resolved at direct-body semantic level**.

Disposable acquisition PR #425 reproduced the current NANET page-authored viewer chain without opaque identifier guessing and successfully acquired an identity-matching `DOC_INFO` manifest. Static inspection of the exact reader client then established that protected `drm/` page/body requests are wrapped by an encrypted-token security transform. The acquisition stopped at that boundary. #425 was closed unmerged.

This permanent record freezes only that access/security boundary. It does not infer a spouse-selector rule from table-of-contents metadata and does not close `EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING`.

## Exact identity

```text
author       = 조만섭
year         = 2007
title        = 명리이론과 궁합의 상관관계 연구
school       = 경기대학교 국제·문화대학원
NANET        = KDMT1200725555
catalog      = vi, 135 p.
acquisition  = PR #425
```

The current NANET detail page directly authored:

```text
viewDoc(this, 'KDMT1200725555', '1')
```

Its directly authored viewer script resolved that control to:

```text
GET https://dl.nanet.go.kr/view/callViewer.do?controlNo=KDMT1200725555&orgId=dl&linkSysId=NADL
```

The viewer response authored a redirect to a current `https://docviewer.nanet.go.kr/reader/<certId>` URL. The server-issued reader `certId` was consumed as authored; no opaque identifier was guessed.

## Exact bounded metadata acquisition

Final disposable acquisition head:

```text
609d05c622cf908a26505e6e1a362ea4f9634d8c
```

`DOC_INFO` returned:

```text
HTTP             = 200
Content-Type     = application/json; charset=utf-8
response bytes   = 11,228
response SHA-256 = 7fce958d13aa2f44dec1526e62b634b4454b73c7e13d608ced7a7879542302ee
filename         = KDMT1200725555.pdf.docinfo.json
physical pages   = 145
meta.Author      = 조만섭
meta.Title       = 명리이론과 궁합의 상관관계 연구
```

The catalog extent `vi, 135 p.` and reader manifest `145 physical pages` are deliberately preserved as distinct provenance values. They are not normalized into one another.

The manifest contains high-relevance locators including:

```text
남자와 여자의 사주 분석 방법
명리학과 부부관계 활용법
궁합
사주로 보는 궁합법
```

These are **manifest/table-of-contents relevance locators only**. They are not treated as direct-body propositions and do not establish any operational spouse selector.

## Security-transform hard stop

Static inspection of the exact reader client established `USE_SEC=true`. For requests whose URL contains `drm/`, the reader HTTP interceptor encrypts the original request and rewrites it to an encrypted-token POST at a `drm/req?token=...` route.

That creates the acquisition boundary. This track did not:

- reproduce or generate the encrypted request token;
- decrypt or unwrap protected page payloads;
- directly call protected `/drm/info/...` or `/drm/page/...` endpoints to avoid the security transform;
- use a login-gated download route;
- guess alternate document or page identifiers.

No complete PDF was acquired and `candidate.pdf` was absent. Therefore no render-first body review is claimed and no body-level semantic admission decision is made.

## What this evidence does and does not establish

Established:

```text
exact scholarly identity                              = YES
page-authored public viewer chain                     = YES
identity-matching DOC_INFO manifest                   = YES
manifest-level spouse/compatibility topic relevance   = YES
protected reader security-transform boundary          = YES
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

`NOT EVALUATED FROM BODY` must not be silently rewritten as a negative semantic finding. The only authority consequence is that the source cannot be admitted on the evidence currently acquired.

## No stitching

Jo Manseop 2007 manifest locators must not be combined with Nam/Kim 2018 spouse-palace priority, Lee Sangcheon 2017 equality language, other partial scholarly findings, or product `partner` terminology to manufacture a role-neutral natal spouse selector absent from a single qualifying source.

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

## Acquisition exact-head verification

```text
Acquisition #15 / run 34514260820 = SUCCESS
artifact ID = 10167029281
artifact digest = sha256:3a8d4812fab74e7427dfebf732fa89c721c69b9759b5adf2a874ca51d5cade3e

CI #2581 / run 34514260666 = SUCCESS
actual Verify = SUCCESS

PCC #636 / run 34514260806 = SUCCESS
Build production calculation image = SUCCESS
Verify production calculation container = SUCCESS

PIE #938 / run 34514261401 = SUCCESS
profile preflight = SUCCESS
caller/workflow binding = SUCCESS
exact PR-head checkout = SUCCESS
clean worktree = SUCCESS
read-only prospective orchestration = SUCCESS
```

#425 is Draft / CLOSED / unmerged. Its acquisition workflow, scripts, downloaded HTML/JS/JSON, artifacts, and any binary material remain outside permanent `main`.

## Next authority action

Continue single-source scholarly discovery for an explicit spouse mapping that is simultaneously spouse-specific, natal-facts-only, operational/executable, native-sex-independent, partner-sex-independent, and complete without cross-source semantic stitching. Public fulltext acquisition must remain within directly authored routes and must not cross protected-reader security transforms.
