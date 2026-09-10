# Relationship / Spouse T8 — 이상천 2017 direct-body equality / Wealth-wife boundary evidence

## Disposition

`『적천수천미』 「육친론」에 관한 연구` (이상천, 2017) is now resolved at direct-body level.

The earlier acquisition PR #368 correctly stopped at the National Assembly Library secure/DRM boundary. Disposable re-acquisition PR #408 later recovered the complete thesis through a separate current public route authored by RISS itself:

```text
RISS exact detail
→ detail-page-authored searchCommon.js
→ directly observed fulltextDownload()
→ directly observed loginFlag.value = "1"
→ FullTextDownload.do
→ Downloading.do
→ RISS-authored UBE dCollection item 000002321524
→ dCollection-authored non-DRM public PDF
```

No NANET DRM token/content request, login bypass, institutional-auth bypass, paywall bypass, identifier guessing, or decryption was used.

## Exact identity and content address

```text
author       = 이상천
year         = 2017
title        = 『적천수천미』 「육친론」에 관한 연구
institution  = 국제뇌교육종합대학원대학교
degree       = 석사
RISS control = 7dedd951a2b45b77ffe0bdc3ef48d419
local bibno  = KDM201800827
NANET        = KDMT1201802346
prior access-boundary PR = #368
direct-body acquisition PR = #408
dCollection item = 000002321524
```

The dCollection page directly exposed a non-DRM PDF contract:

```text
drm          = N
msg          = ''
ext          = .pdf
fileSaveName = 000002321524.pdf
fileSize     = 1,243,256
```

Exact Acquisition #1 artifact PDF:

```text
SHA-256     = b79b9e1635787ebffca08538627780314656f0d3999d4d63ef9428580df636ec
bytes       = 1,243,256
pages       = 72
encrypted   = false
PDF version = 1.4
page size   = A4
printed/body offset = physical PDF page - 10
```

The embedded ezPDF metadata contains an old 2008 creation/modification timestamp. It is not used as publication identity authority. Exact RISS identity and the thesis body/front matter are the scholarly identity surfaces.

## Render-first review

The exact PDF from the GitHub Actions acquisition artifact was independently unpacked, its SHA-256 and byte length rechecked, then all 72 pages were rendered. Text extraction was used only to locate passages; semantic judgment was made after visual inspection of the corresponding rendered pages.

### Printed 28-30 / physical 38-40 — spouse chapter

The `夫妻` chapter does not provide a neutral spouse role. It develops the inherited Wealth-as-wife framework. The Ren Tieqiao discussion explicitly presents Wealth as wife and develops wife-fortune interpretation through Wealth condition, native strength, favorable/useful relations, Peer/Rob-Wealth, Officer, Resource, and Output interactions.

This is operational natal interpretation, but it is not a spouse selector independent of native sex and partner sex.

### Printed 42 / physical 52 — modernization premise

The modern comparison section explicitly contrasts the feudal spouse structure with modern conditions. It characterizes the older setting as patriarchal and male-superior and states that modern spouse relations have changed toward male-female equality.

This is real modernization/equality evidence and is retained as a positive finding rather than dismissed.

### Printed 43-45 / physical 53-55 — modern spouse cases

The actual modern examples remain male-chart spouse readings.

The positive modern case uses Direct Wealth in the male native's Day Branch as the wife indicator and interprets good wife fortune from that natal configuration.

The negative modern case again treats the male native's wife through Wealth. The comparison then distinguishes modern practice by assigning Direct Wealth to wife and Indirect Wealth to father.

The following page says modern spouse relations are equal and mutually coexisting rather than requiring the wife's feudal sacrifice. But that social reinterpretation does not become one native-sex-independent or partner-sex-independent spouse-selection rule.

### Printed 53-54 / physical 63-64 — conclusion

The conclusion reviews the historical and Confucian background of the Yukchin rules and then summarizes the kinship mapping. In that summary, wife is assigned to Direct and Indirect Wealth.

It closes by calling for deeper study of changed social phenomena and family composition and for Mingli theories to be re-examined and improved from past through present and future.

That is a future research/improvement request, not a presently published replacement spouse selector.

## Preserve the source's internal tension

The thesis is not perfectly internally uniform on the Wealth mapping:

```text
modern comparison:
  Direct Wealth  = wife
  Indirect Wealth = father

conclusion summary:
  wife = Direct and Indirect Wealth
```

This repository does not silently repair or reconcile that tension. Both statements are recorded as written in their respective contexts.

The authority result does not depend on choosing one side of the tension: neither formulation supplies one spouse-specific selector that is independent of native sex and partner sex.

## Admission test

Positive findings:

```text
explicit patriarchal / male-superior spouse critique = YES
modern male-female equality framing                  = YES
mutual-coexistence spouse framing                    = YES
modern natal spouse examples                         = YES
future theory re-examination requested               = YES
```

Negative authority findings:

```text
modern male Wealth-wife semantics retained           = YES
native-sex-independent spouse selector               = NO
partner-sex-independent spouse selector              = NO
single role-neutral spouse selector                  = NO
complete natal-facts-only role-neutral input contract = NO
```

The equality critique is not itself an operational selector. The future-improvement request is not treated as if the thesis had already supplied the missing rule.

## No stitching

The following combinations are explicitly unauthorized:

- Lee Sangcheon equality language + Na Hyukjin scoring;
- Lee Sangcheon equality language + Park Hyeyoung modernization;
- Lee Sangcheon equality language + Song Sangseop female Yongsin-husband remapping;
- Lee Sangcheon equality language + Song Jaewoo actual-role language;
- Lee Sangcheon equality language + spouse-palace evidence;
- Lee Sangcheon equality language + same-sex-family discussion;
- Lee Sangcheon equality language + product `partner` terminology.

None of those combinations may be used to manufacture a role-neutral spouse selector absent from this single source.

## Authority ledger

This evidence is a direct-body boundary result. It does not close another authority gap.

```text
QUALIFYING_PRIMARY_WITNESS                  = CLOSED
INDEPENDENT_NORMATIVE_PROVENANCE            = CLOSED
EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING         = OPEN
CURRENT_GOVERNED_SEMANTIC_CORRESPONDENCE    = OPEN
RELATIONSHIP_T6_INPUT                        = OPEN

authorityGapsClosed = 2/5
authorityGapsOpen = 3/5
authorityAdmissionReady = false
Production = HOLD
```

No spouse producer, rule, claim, pack, narrative, preview, compatibility activation, or production activation is authorized by this evidence.

## Acquisition evidence

Disposable #408 exact final head:

```text
0f59a17955345115b2b171cb59886ff0f781ad9a
```

Exact-head gates:

```text
Acquisition #1 / run 34452670774 = SUCCESS
artifact ID = 10142176710
artifact digest = sha256:0076d6bbdf025910cb65876bbefe77866abcf822e4377b7778c87bd2a555fa03

CI #2518 / run 34452670785 = SUCCESS
actual Verify = SUCCESS

PCC #573 / run 34452670639 = SUCCESS
actual Verify production calculation container = SUCCESS

PIE #877 / run 34452671392 = SUCCESS
exact-head preflight + prospective evidence = SUCCESS
```

#408 was closed unmerged. Acquisition scripts, workflow files, HTML responses, and the PDF remain outside `main`.

## Next authority action

Continue single-source scholarly discovery for an explicit spouse mapping that is simultaneously:

- spouse-specific;
- natal-facts-only;
- independent of native sex;
- independent of partner sex;
- operational enough to define an executable selector/input contract;
- complete in that source without cross-source semantic stitching.
