# General Natal Conclusion T8 — Alternate Frozen-Witness Surface Survey

Issue: #886  
Audit base: `7f5c0b7923d3b8a79ca6a4fa9781a95b48ef3068`

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

The previously registered Shidian URL is **not** linked to this NTL scan. Its book identifier belongs to a separate National Library of China digitization family. Until the NTL pages themselves are directly inspected, no per-witness textual observation is attributed to this candidate.

Result:

```text
registered scan candidate            = YES
holding institution                  = National Taiwan Library
direct relevant-page inspection      = NO
scan-linked transcription established = NO
textual claim for frozen witnesses   = NONE
production authority                 = NO
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

The linked transcription establishes the previously observed context mismatch on the NLC surface:

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
scan-linked transcription                  = YES, NLC family
context-bound frozen 4/4 exact match       = NO
same-string-different-section substitution = FORBIDDEN
orthographic normalization                 = FORBIDDEN
production authority                       = NO
```

## Candidate D — secondary exact transcriptions

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
candidateSurfaceCount                      = 4
registeredScanCandidateCount               = 2
contextBoundFourOfFourTextCandidateCount   = 2
productionAdmissibleFourOfFourCandidateCount = 0
```

No candidate currently satisfies all required evidence gates.

## Required next evidence

1. locate a registered or equivalently auditable scan containing the frozen exact strings in the relevant context;
2. directly inspect the NTL 1926 scan before making any NTL-specific textual claim;
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
