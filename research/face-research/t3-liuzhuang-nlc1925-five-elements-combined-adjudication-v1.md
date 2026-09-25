# T3 — 柳莊 NLC-1925 五行貴賤 Combined Locus Adjudication v1

> Status: NLC511 direct scan promoted / NLC416 same-locus comparison still open  
> Watchtower-Track: face-research  
> Issue: #1630

## 1. Research question

This unit tests the earlier `五行貴賤` combined 五官/六府 paragraph directly rather than propagating the later scan-31 `五官說` result backward.

The bounded questions are:

1. does the combined paragraph print `審辨官` or `審判官` for the nose;
2. does it print `採聽官` or another ear-title glyph;
3. does it directly preserve the 柳莊 六府 mapping `天倉 / 顴骨 / 地庫`.

## 2. Direct witness — NLC511

Witness:

`witness.liuzhuang_xiangfa.nlc511_1925_wenming`

Catalog object:

`NLC511-03030560-63880 柳莊相法`

Publication:

`文明書局 · 1925`

Exact locus:

```text
PDF scan page = 24 / 75
printed page  = 8
section       = 五行貴賤
```

The page was supplied as the original scan PDF and directly rendered for visual inspection.

## 3. Direct reading

The target paragraph visibly reads:

```text
又名五官
眉為保壽官
眼為監察官
鼻為審辨官
耳為採聽官
口為出納官
又名六府
天倉為上二府
顴骨中二府
地庫下二府
```

Therefore the NLC511 1925 manifestation at this exact combined locus is adjudicated as:

| Target | Direct reading |
|---|---|
| nose officer | **審辨官** |
| ear officer | **採聽官** |
| upper two fu | **天倉 → 上二府** |
| middle two fu | **顴骨 → 中二府** |
| lower two fu | **地庫 → 下二府** |

This is direct scan evidence, not OCR normalization.

## 4. What this resolves

For the NLC511 1925 文明書局 manifestation only:

```text
五行貴賤 combined nose = 審辨官 / scan_checked
五行貴賤 combined ear  = 採聽官 / scan_checked
六府 direct mapping    = 天倉→上二府 / 顴骨→中二府 / 地庫→下二府 / scan_checked
```

This closes the earlier uncertainty about whether the already-adjudicated scan-31 `審辨官` could safely be propagated backward. It was not propagated; the earlier locus was read independently and also prints `審辨官` in NLC511.

## 5. NLC416 comparison state

The separately cataloged NLC416 object remains:

`NLC416-13jh001257-42702 柳莊相法 / 秦慎安校勘 / 文明書局 / 1925`.

Directly rendered anchors show that NLC416 scan page 21 and scan page 31 align with the corresponding NLC511 page sequence, and scan page 31 was already adjudicated as `鼻為審辨官`.

However the exact NLC416 scan-page-24 image could not be rendered reliably in this pass.

Therefore this unit deliberately does **not** infer the NLC416 target glyphs from page alignment.

```text
NLC416 same combined locus
= PENDING DIRECT PAGE IMAGE
```

Even if NLC416 later matches NLC511, both are the same 1925 文明書局 reproduction lineage and must not be counted as two independent edition or traditional votes.

## 6. What this does not resolve

This direct page does not authorize any of the following:

- deleting the existing electronic `審判官` transmission;
- calling `審判官` an OCR error;
- claiming one canonical 柳莊 nose title across every transmission;
- resolving the separate `五官說` ear-title variant `採聽官 / 採聰官`;
- merging 柳莊 六府 with 神相 六府;
- binding neutral CV geometry to these traditional terms;
- starting T4 methodology reconstruction;
- granting Production authority.

## 7. Authority update

| Question | State |
|---|---|
| NLC511 combined nose | **審辨官 / scan_checked** |
| NLC511 combined ear | **採聽官 / scan_checked** |
| NLC511 combined 六府 | **scan_checked** |
| NLC416 same combined locus | direct page still required |
| all 柳莊 transmissions | unresolved |
| electronic 審判官 invalidated | **NO** |
| 審判官 may be called OCR error | **NO** |
| separate 五官說 ear variant | unresolved |
| cross-lineage normalization | prohibited |
| T4 methodology | blocked |
| Production | NO |

## 8. Next bounded gate

1. Directly render and read the NLC416 same combined locus.
2. Then adjudicate the separate `五官說` ear locus `採聽官 / 採聰官`.
3. Then pin the provenance of the existing electronic `審判官` transmission.
4. Only after those gates should 柳莊 transmission genealogy and T4 methodology reconstruction be considered.

## 9. Verdict

```text
NLC511 / 1925 / 五行貴賤 COMBINED LOCUS
= DIRECTLY ADJUDICATED

NOSE
= 審辨官

EAR
= 採聽官

SIX FUS
= 天倉→上二府
= 顴骨→中二府
= 地庫→下二府

NLC416 SAME LOCUS
= DIRECT PAGE STILL REQUIRED

審判官 TRANSMISSION
= RETAINED / NOT CALLED OCR ERROR

T4
= BLOCKED

PRODUCTION
= NO
```
