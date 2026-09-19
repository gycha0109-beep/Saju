# General Natal Conclusion T8 — Alternate Frozen-Witness Surface Survey

Issue: #903  
Audit base: `1c6f0228924b61ae5341c239d4e128674b31b429`

## Purpose

After #875 / #876 established that the inspected Ming Wanli NLC `四言獨步` surface is a textual variant that does not establish the four frozen Yuanhai witness strings, this survey records alternate source surfaces without silently relaxing witness identity.

Frozen witnesses:

```text
W-YUANHAI-WEALTH-OFFICER   財旺生官
W-YUANHAI-OFFICER-RESOURCE 煞化為印
W-YUANHAI-PEER-WEALTH      比劫羊刃，財格大忌
W-YUANHAI-WEALTH-RESOURCE  印綬見財
```

## Candidate A — current Wikisource frozen transcription

The current Wikisource surface contains all four frozen strings in `四言獨步`.

However, the page itself carries a source-unknown / unverified-source warning. It is therefore the repository's frozen text identity, not scan-backed qualification evidence.

Result:

```text
context-bound exact strings = 4 / 4
registered scan identity     = NO
holding institution          = NOT ESTABLISHED
scan qualification           = NO
```

## Candidate B — 1926 秦慎安校勘《淵海子平子平真詮》v.2

Registered scan metadata:

```text
holding institution = National Taiwan Library
digitization        = NTL-9900014380
publisher           = 文明
publication year    = 1926
digital pages       = 164
```

Commons scan:

```text
https://commons.wikimedia.org/wiki/File:NTL-9900014380_淵海子平子平真詮_v.2.pdf
```

The previously registered Shidian URL is **not** linked to this NTL scan. Its book identifier belongs to a separate National Library of China digitization family.

Exact workbench binary:

```text
sha1          = f4e030871acc0a55adafcc49d107aada24f411b5
bytes         = 68883628
digital pages = 164
```

High-resolution direct page-image inspection establishes:

```text
p29      = 四言獨步 title/start
p29..33  = bounded 四言獨步 surface
p34      = 身弱論 transition
visible variant anchor = 先財後印
frozen exact witnesses established inside p29..33 = 0 / 4
```

Result:

```text
registered scan candidate             = YES
holding institution                   = National Taiwan Library
direct relevant-page inspection       = YES, p29..34
scan-linked transcription established = NO
frozen exact witnesses                = 0 / 4
production authority                  = NO
```

## Candidate C — NLC 1634 余氏善成堂 five-fascicle set

Registered scan family:

```text
holding institution = National Library of China
title               = 新刊合併官板音義評注淵海子平
edition             = 余氏善成堂 / 明崇禎7年 [1634]
digitization family = NLC892-411999032112
第1冊               = NLC892-411999032112-149610
第2冊               = NLC892-411999032112-149611
第3冊               = NLC892-411999032112-149658
第4冊               = NLC892-411999032112-149659
第5冊               = NLC892-411999032112-149660
```

The relevant 卷四 scan is 第4冊, 29 digital pages:

```text
https://commons.wikimedia.org/wiki/File:NLC892-411999032112-149659_新刊合併官板音義評注淵海子平_第4冊.pdf
```

The Shidian book identifier is tied to this NLC family:

```text
https://www.shidianguji.com/zh/book/NGJ892411999032112149610/chapter/1lqbsmkg60o4b
```

Direct page-image inspection now establishes the bounded section surface:

```text
digital page 16 = 四言獨步 title/start; opening anchors directly legible
digital pages 17-18 = continuation of the bounded 四言 surface
digital page 19 = transition; 棄命從殺論 title directly visible
frozen exact witnesses established inside bounded surface = 0 / 4
```

Directly legible opening anchors on page 16 include `先天何處 / 後天何處 / 要知來處 / 便知去處`, `四柱排定 / 三才次分 / 年干為本 / 配合元辰`, `神煞相伴 / 輕重較量 / 先觀月令 / 論格推詳`, and `以日為主 / 專論財官 / 分其貴賤 / 妙法多端`.

This direct negative result is bounded to pages 16..19 and does not claim that no other historical exemplar contains the frozen strings.

The linked transcription separately establishes the previously observed context mismatch on the NLC surface:

```text
財旺生官
  exact string exists in material preceding the frozen 四言獨步 context

煞化為印
  linked transcription gives 殺化爲印
  no 殺/煞 or 爲/為 normalization into the frozen hash is allowed

比劫羊刃，財格大忌
  not established in this candidate's frozen-context sequence

印綬見財
  exact string exists elsewhere in the same NLC set,
  in 卷三 / 論格局生死引用 rather than the frozen 四言獨步 context
```

The candidate `四言獨步` sequence instead includes anchors such as:

```text
印殺相輕
印綬根深
先財後印
先印後財
```

Result:

```text
registered scan candidate                  = YES
direct bounded page-image inspection       = YES, digital pages 16..19
frozen exact witnesses in bounded surface  = 0 / 4
scan-linked transcription                  = YES, NLC family
context-bound frozen 4/4 exact match       = NO
same-string-different-section substitution = FORBIDDEN
orthographic normalization                 = FORBIDDEN
production authority                       = NO
```

## Candidate D — NLC 1940 later-edition control

Registered scan:

```text
holding institution = National Library of China
title               = 增補淵海子平音義評註
editor field        = 趙燕生
publisher           = 章福記書局
date                = 康德七年 [1940]
holding call        = MG/B992.3/28
digitization        = NLC416-12jh002712-40330
digital pages       = 306
sha1                = a75396935b08d948ae972a2f456d1860ff136880
bytes               = 13474114
```

High-resolution direct inspection establishes:

```text
p175      = plain 四言獨步 title/start
p175..179 = bounded 四言獨步 surface
p180      = 五言獨步 transition
增補四言獨步 heading = NOT ESTABLISHED
frozen exact witnesses inside p175..179 = 0 / 4
```

This later-edition control closely tracks the directly inspected variant sequence rather than the frozen four-string transcription. The book title contains `增補`, but the visible section heading is plain `四言獨步`; the title must not be projected into the section heading.

Result:

```text
registered scan candidate                  = YES
later-edition control                      = YES
direct bounded page-image inspection       = YES
context-bound frozen 4/4 exact match       = NO
production authority                       = NO
```

## Candidate E — secondary exact transcriptions

Multiple secondary online transcriptions reproduce the frozen sequence:

```text
比劫羊刃，財格大忌
...
煞化為印
財旺生官
...
印綬見財
```

These surfaces demonstrate that the textual variant exists in circulation, but they do not establish a registered scan identity or auditable holding institution.

Result:

```text
context-bound exact strings = 4 / 4
registered scan identity     = NO
scan qualification           = NO
```

## Deterministic survey verdict

```text
targetWitnessCount                         = 4
candidateSurfaceCount                      = 5
registeredScanCandidateCount               = 3
directlyInspectedRegisteredScanCandidateCount = 3
contextBoundFourOfFourTextCandidateCount   = 2
productionAdmissibleFourOfFourCandidateCount = 0
```

No candidate currently satisfies all required evidence gates.

## Required next evidence

1. locate a registered or equivalently auditable scan containing the frozen exact strings in the relevant context;
2. preserve the NTL 1926 direct negative/divergence result without normalizing related 財/官/印 language into frozen witness identity;
3. allow per-witness advancement only after direct image or reviewed registered-transcription support;
4. require an actual `劫` / rob-wealth glyph for `W-YUANHAI-PEER-WEALTH`;
5. do not normalize `殺/煞`, `爲/為`, or any other orthographic variant into frozen digest identity;
6. do not treat a same string in another section as the frozen `四言獨步` witness;
7. reproduce frozen SHA-256 only after a scan-verified transcription surface is pinned;
8. if witness definitions are ever changed, use a separate reviewed re-registration process.

## Authority boundary

Still false:

- exactWitnessHashReproductionAuthorityEstablished
- sourceIntegrityQualificationEstablished
- productionEligibleProvenanceEstablished
- provenanceQualityPromotionAuthorized
- productionAdmissionAuthority

Production remains **HOLD**.
