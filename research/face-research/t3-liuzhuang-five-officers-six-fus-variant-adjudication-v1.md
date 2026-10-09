# T3 — 柳莊 五官 / 六府 Transmission Variant Adjudication v1

> Status: witness metadata pinned / electronic variants explicit / direct scan still gated  
> Watchtower-Track: face-research  
> Issue: #1603

## 1. Why this unit exists

The current 神相全編 六府 Gujin-qualified slice is complete through T7.

The next unresolved traditional-research frontier is 柳莊.

The old T2 registry stored one electronic reading:

- 五官 nose officer = `審判官`;
- 六府 = `天倉→上二府 / 顴骨→中二府 / 地庫→下二府`.

Fresh source review shows that the nose title is not stable enough to preserve as one normalized 柳莊 reading.

## 2. Newly located 柳莊 transmission

A digitized transcription of `新刻袁柳庄先生秘傳相法`, attributed on the record to 袁忠徹選 and 雲林子校訂, contains the combined 五官/六府 paragraph.

The relevant electronic reading is:

```text
眉爲保壽官
眼爲監察官
鼻爲審辨官
耳爲採聽官
口爲出納官

天倉爲上二府
顴骨中二府
地庫下二府
```

This is materially different from the repository's existing 柳莊 electronic nose reading `審判官`.

A second section in the same digitized transmission, `五官說`, again reads the nose title as `審辨官`.

Therefore the old conflict can no longer be framed only as:

```text
神相 = 審辨官
柳莊 = 審判官
```

The stronger statement is now:

```text
柳莊 transmission A = 審判官
柳莊 transmission B = 審辨官
神相 admitted witness = 審辨官

therefore:
柳莊 nose title itself is transmission-variant / unresolved
```

No lineage normalization follows from the shared `審辨官` glyphs.

## 3. A second transcription instability

The same digitized 柳莊 source gives:

- combined paragraph: `耳爲採聽官`;
- `五官說`: `耳爲採聰官`.

This may be OCR/transcription noise, a printed variant, or another transmission issue.

T3 does not guess.

It records:

`採聽官 vs 採聰官 = unresolved until direct scan adjudication`.

## 4. 六府 is more stable electronically

The newly located source agrees with the existing repository electronic mapping:

| Pair role | 柳莊 term |
|---|---|
| upper | 天倉 = 上二府 |
| middle | 顴骨 = 中二府 |
| lower | 地庫 = 下二府 |

This is useful evidence, but its authority is limited.

```text
two electronic transmissions agree
!=
scan_checked
!=
independent tradition votes
!=
modern region geometry
```

The mapping remains source semantics only.

## 5. 1925 NLC witness targets

Two verified National Library of China scan records are now pinned as direct adjudication targets.

### NLC416 / 文明書局 / 1925

`NLC416-13jh001257-42702 柳莊相法`

Catalog metadata identifies:

- 秦慎安校勘;
- 文明書局;
- 1925;
- target chapters including `五行貴賤` and `五官說`;
- 152 PDF pages;
- SHA-1 `72b7765d3a0b3d8cc7dc4cb4d3a197ec91eda7e4`.

### NLC511 / 文明書局 / 1925

`NLC511-03030560-63880 柳莊相法`

Catalog metadata identifies:

- 文明書局;
- 1925;
- 75 PDF pages;
- SHA-1 `9b79ef9a02113cdfa054ee9ed0c210b34e2d7215`.

These two scan records are not counted as independent traditional votes merely because they are separate catalog objects.

## 6. Why this PR does not fabricate a scan promotion

The public scan records are verified, and the target text is electronically locatable.

However, this research pass did not obtain a reliable exact target-page visual adjudication for the 1925 scans.

Therefore:

- no NLC target page number is invented;
- no `scan_checked` passage is emitted;
- no glyph is declared resolved from catalog metadata alone.

The correct state is:

`verified witness metadata + unverified electronic passages + exact scan page pending`.

## 7. Authority effect

### Newly established

- 柳莊 has an **intra-tradition nose-title transmission conflict**;
- `審判官` is no longer safe as the sole 柳莊 canonical electronic reading;
- `審辨官` appears twice in the newly located digitized transmission;
- `採聽官 / 採聰官` also requires direct glyph adjudication;
- 柳莊 六府 `天倉/顴骨/地庫` has cross-electronic agreement.

### Not established

- which nose title the 1925 NLC scan actually prints at each target passage;
- whether `採聰官` is a print reading or transcription error;
- one canonical 柳莊 五官 methodology;
- modern 六府 region geometry;
- equivalence with 神相 六府;
- any outcome claim.

## 8. Next gate

The next bounded source action is direct scan adjudication of the pinned 1925 NLC targets.

The questions are exact:

1. What glyph does `五行貴賤` print for the nose officer?
2. What glyph does `五官說` print for the nose officer?
3. What glyph does `五官說` print for the ear officer?
4. Does the same scan directly preserve `天倉/顴骨/地庫` as 上/中/下二府?
5. Are NLC416 and NLC511 manifestations textually identical at those loci?

Until then, 柳莊 methodology reconstruction remains blocked.

## 9. Verdict

```text
柳莊 審判官
= EXISTING ELECTRONIC READING, NOT CANONICALIZED

柳莊 審辨官
= NEWLY LOCATED TWICE IN ANOTHER ELECTRONIC TRANSMISSION

NOSE TITLE
= INTRA-LIUZHUANG TRANSMISSION CONFLICT

採聽官 / 採聰官
= UNRESOLVED TRANSCRIPTION/GLYPH VARIANT

柳莊 六府
= ELECTRONIC AGREEMENT FOR 天倉/顴骨/地庫

1925 NLC WITNESS METADATA
= VERIFIED

1925 EXACT TARGET PAGES / GLYPHS
= NOT YET ADJUDICATED

SCAN_CHECKED PASSAGES ADDED
= 0

METHODOLOGY RECONSTRUCTION
= BLOCKED

PRODUCTION
= NO
```
