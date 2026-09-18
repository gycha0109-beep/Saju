# General Natal Conclusion T8 — Alternate Frozen-Witness Surface Survey

Issue: #877  
Audit base: `1675fc24efbc34e8f60983388820aa250aff2a0d`

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

Scan-linked Shidian transcription:

```text
https://www.shidianguji.com/zh/book/NGJ892411999032112149610/chapter/1lqbsmkg60o4b
```

The candidate is a genuine registered scan surface, but it does not establish the frozen `四言獨步` identity.

Observed distinctions:

```text
財旺生官
  exact string exists, but in preceding/non-frozen-context material

煞化為印
  scan-linked transcription gives 殺化爲印
  no orthographic normalization into the frozen hash is allowed

比劫羊刃，財格大忌
  not established in this candidate's frozen-context sequence

印綬見財
  exact string exists in 卷五 / 格局生死引用,
  not as the frozen 四言獨步 witness
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
context-bound frozen 4/4 exact match       = NO
same-string-different-section substitution = FORBIDDEN
orthographic normalization                 = FORBIDDEN
production authority                       = NO
```

## Candidate C — secondary exact transcriptions

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
candidateSurfaceCount                      = 3
registeredScanCandidateCount               = 1
contextBoundFourOfFourTextCandidateCount   = 2
productionAdmissibleFourOfFourCandidateCount = 0
```

No candidate currently satisfies all required evidence gates.

## Required next evidence

1. locate a registered or equivalently auditable scan containing the frozen exact strings in the relevant context;
2. allow per-witness advancement only after direct image or reviewed registered-transcription support;
3. require an actual `劫` / rob-wealth glyph for `W-YUANHAI-PEER-WEALTH`;
4. do not normalize `殺/煞`, `爲/為`, or any other orthographic variant into frozen digest identity;
5. do not treat a same string in another section as the frozen `四言獨步` witness;
6. reproduce frozen SHA-256 only after a scan-verified transcription surface is pinned;
7. if witness definitions are ever changed, use a separate reviewed re-registration process.

## Authority boundary

Still false:

- exactWitnessHashReproductionAuthorityEstablished
- sourceIntegrityQualificationEstablished
- productionEligibleProvenanceEstablished
- provenanceQualityPromotionAuthorized
- productionAdmissionAuthority

Production remains **HOLD**.
