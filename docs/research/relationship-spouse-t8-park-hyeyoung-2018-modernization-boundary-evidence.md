# Relationship / Spouse T8 — Park Hyeyoung 2018 direct-body modernization boundary

## Purpose

This record freezes the complete-body review of 박혜영 2018, `명리학 통변의 다양성 모색에 관한 연구 : 육친론을 중심으로`, for the still-open `EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING` frontier.

It is **positive evidence for substantive modernization of family/Yukchin interpretation** and **negative evidence for a published role-neutral spouse selector**. It does not promote authority beyond the existing 2/5 state.

## Acquisition provenance

Prior disposable PR #378 stopped correctly because the then-inspected public RISS source union did not directly expose the implementation of global `fulltextDownload()`.

Disposable recheck PR #403 used the current exact RISS detail page and followed only site-authored public contracts:

```text
RISS T14752312
control 90b96055ae1e4289ffe0bdc3ef48d419
→ exact detail-page-authored searchCommon.js
→ directly observed function fulltextDownload()
→ directly observed loginFlag.value = "1"
→ directly observed FullTextDownload.do
→ popup-authored Downloading.do
→ RISS-authored 경기대학교 dCollection item 000000052956
→ dCollection-authored public_resource PDF path
→ complete PDF
```

dCollection directly exposed:

```text
drm  = N
agree = Y
```

No guessed opaque identifier, login/session bypass, institution-auth bypass, paywall bypass, DRM request, or decryption was used. The acquisition branch was closed unmerged.

## Content address

```text
author       = 박혜영
year         = 2018
institution  = 경기대학교 예술대학원
RISS ID      = T14752312
RISS control = 90b96055ae1e4289ffe0bdc3ef48d419
local bibno  = KDM201900838
dCollection  = 000000052956
PDF SHA-256  = 55c0d5b5be9e2f5b6b49e4ccc9a2322e261a3d0235d05fe238a82f10cf219046
bytes        = 1,637,531
pages        = 91
encrypted    = false
PDF version  = 1.4
printed/body offset = physical PDF page - 9
```

The complete PDF was text-indexed only for navigation. Material pages were rendered and visually reviewed before the semantic decision.

## Direct-body findings

### Printed p.20 / physical PDF p.29

The thesis reports the `滴天髓闡微` line's flexible female-chart husband interpretation. A clear Officer indicates husband; an overly strong Officer can shift husband interpretation to Injury Officer; a very weak Officer can shift it to Wealth; the discussion ultimately explains the useful/balancing god as husband.

This is real functional remapping, but the prose is explicitly about **여명 / 남편**. It does not generalize the rule into a spouse selector independent of native sex and partner sex.

### Printed pp.56-57 / physical PDF pp.65-66

The section `가족 관계와 여성의 역할 변화의 未受容` directly criticizes inherited interpretation for failing to absorb social change.

The body identifies:

- women's move from domestic labor into professional labor;
- reduced family size and greater educational equality;
- women's participation in economic activity;
- competition with men in social fields;
- changed marriage attitudes; and
- economic independence from a husband's earnings.

The author explicitly concludes that changed women's status and roles changed family relations and that Mingli interpretation therefore needs to move from past modes toward modernized interpretation.

This is materially stronger than a generic statement that society has changed.

### Printed pp.58-60 / physical PDF pp.67-69

The thesis then asks how to overcome the limits of Yukchin interpretation. It surveys scholars who object to inherited fixed assignments and records logical disputes around parent/child and husband/wife derivations.

The significance is that inherited Yukchin is treated as contestable rather than immutable. However, the surveyed alternatives remain framed through husband/wife and male/female relations; this section does not publish a single replacement spouse selector independent of those roles.

### Printed pp.74-76 / physical PDF pp.83-85 — conclusion

The conclusion is decisive for admission.

It preserves a sex-conditioned relational structure. In the control relation, the author explicitly says the kinship interpretation produces **two cases for a man and one case for a woman**, and then states that **for a man the wife is Direct Wealth**.

When the thesis summarizes its actual remedies for the limits of Yukchin, they are:

1. prioritize the intrinsic characteristics of each Stem and Branch over mechanically wrapping everything in Yukchin;
2. use `虛字` / hidden-character theory to expand letters not visibly present in the natal eight characters; and
3. combine Saju analysis with Tarot for counseling and interpretive expansion.

Those are genuine diversification proposals. None is an operational spouse-specific selector that removes the native-sex / partner-sex branch.

## Admission analysis

```text
changed family-relations critique                         = YES
changed women's-role critique                             = YES
women's economic independence / changed marriage view    = YES
explicit demand for modernized Mingli interpretation      = YES
intrinsic Stem/Branch priority over mechanical Yukchin    = YES
Heoja-based hidden-character expansion                    = YES
Tarot-assisted interpretive/counseling expansion          = YES
female functional husband/Yongsin discussion              = YES
male wife = Direct Wealth retained in conclusion          = YES
sex-conditioned kinship branching retained                = YES

native-sex-independent spouse selector                    = NO
partner-sex-independent spouse selector                   = NO
one role-neutral replacement spouse selector              = NO
complete natal-facts-only governed spouse input contract  = NO
```

The modernization program therefore cannot be relabeled as `EXPLICIT_ROLE_NEUTRAL_NATAL_MAPPING`.

The thesis directly criticizes the historical family/gender model, but its operational response is broader interpretive diversification. It does not specify one rule that, from governed natal facts alone, selects the spouse indicator without reference to the native's sex or the partner's sex.

## No-stitching boundary

This record does not combine:

- Park Hyeyoung's modern-family critique;
- Song Sangseop's female-chart Yongsin husband remapping;
- Song Jaewoo's actual-role language;
- Noh/Kim's equality-family reinterpretation;
- spouse-palace location evidence;
- same-sex-family discussion; or
- product-level partner terminology

into a synthetic rule no single source publishes.

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

No spouse producer, rule, claim, interpretation pack, narrative, preview, compatibility activation, or production activation is authorized by this evidence.

## Acquisition evidence

Disposable PR #403 exact head:

```text
e0f5c85fffa5b3119ab75c71f3e7dc081cba209f
```

```text
Acquisition #1 / 34447624864 = SUCCESS
artifact ID = 10140250346
digest = sha256:0d120bf42c8038f9bc16587e4ba276c8622f70502f66d4aec6ffc7cd2361c2fd
CI #2507 / 34447624640 = SUCCESS; actual Verify = SUCCESS
PCC #562 / 34447624667 = SUCCESS; actual production verify = SUCCESS
PIE #866 / 34447625341 = SUCCESS
```

The PDF and acquisition machinery remain ephemeral and are not included in this permanent evidence branch.
