# R017 — 祿 / 旺 / 帝旺 root-strength treatment workbench

Date: 2026-09-19  
Issue: #943  
Status: VERIFIED_BOUNDED / CROSS-SOURCE EXECUTABLE BRIDGE REJECTED

## Existing authority audit

R017 is **not** empty work.

The repository already governs three adjacent surfaces:

```text
#561/#575  source-native 旺 heavy-root matcher
#590/#738  bounded four-Yang 祿 heavy-root/root-presence matcher
#547       complete 十干 × 十二支 Twelve-Growth stage table
```

The important unresolved point is the bridge between those surfaces.

## 1. 祿

Selected 子平真詮/評註 source:

https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm

The source directly includes:

```text
長生祿旺，根之重者也
```

Therefore `祿` as a heavy-root class is already source-supported.

The current executable matcher remains deliberately narrower:

```text
甲 + 寅
丙 + 巳
庚 + 申
壬 + 亥
```

Yin 祿 and Earth 祿 are not inferred from symmetry.

## 2. 旺 is not silently rewritten as 十二長生 帝旺

Existing #561/#575 selected-source authority governs a five-element `旺` heavy-root surface.

It explicitly forbids:

```text
#547 帝旺 cell -> 旺 heavy-root class
```

That boundary remains correct.

## 3. Twelve-Growth 帝旺 exists independently

#547 governs a complete Twelve-Growth mapping from:

```text
命理探源 / 天干生旺死絕
https://ctext.org/wiki.pl?chapter=827425&if=gb
```

It proves that every stem/branch pair has a stage, including `臨官` and `帝旺`.

It does not prove that those stage labels inherit the root semantics of a different source chain.

## 4. Xu Lewu commentary association

A separate 子平真詮評註 commentary surface:

https://www.ncc.com.tw/fate/paleo/bg/bg_03.htm

does **not** support the previously drafted literal quote `祿臨官也` as an exact verified quotation. Fresh direct verification instead supports this narrower pair of observations:

```text
寅申巳亥，為五行長生臨官之地
寅申巳亥，稱為四生（亦是四祿）之地
```

and separately:

```text
卯者，春木專旺之地，故稱帝旺
子午卯酉，為專旺之方
```

Thus the branch-set association is observed in Xu's commentary, but a literal universal `祿 == 臨官` identity claim is withdrawn.

This is meaningful evidence that the commentary vocabulary relates the terms.

However:

```text
commentary lexical association
!= permission to feed #547 命理探源 stage cells
   into #561/#590 root matchers
```

The sources and governed tables are not the same authority object.

## 5. Preliminary verdict

```text
祿 AS HEAVY ROOT                 = SUPPORTED_BOUNDED
旺 AS HEAVY ROOT                 = GOVERNED_RESEARCH_ONLY
帝旺 STAGE                       = GOVERNED_RESEARCH_ONLY
臨官 branch-set / 四祿 COMMENTARY ASSOCIATION = OBSERVED_BOUNDED
帝旺 / 專旺 ASSOCIATION          = OBSERVED_BOUNDED
LITERAL 祿臨官也 QUOTE              = WITHDRAWN_UNVERIFIED

#547 臨官 -> 祿 heavy root         = UNAUTHORIZED
#547 帝旺 -> 旺 heavy root         = UNAUTHORIZED

YIN 祿                            = UNRESOLVED
EARTH 祿                          = UNRESOLVED
NUMERIC ROOT STRENGTH            = UNAUTHORIZED
FINAL 身強身弱 / 旺衰             = UNAUTHORIZED
PRODUCTION                       = NOT PROMOTED
```

## 6. Closure verdict

Fresh direct review of the Xu commentary answers the remaining bounded question.

The commentary explicitly frames the relevant surface at the **five-element / seasonal branch-set** level and warns against treating Yin stems as having a separate independent 長生祿旺墓 sequence for practical use. It therefore does not provide a complete same-source ten-stem × twelve-branch bridge that can replace #547's separate 命理探源 mapping.

Accordingly:

```text
SAME_SOURCE_XU_COMMENTARY_BRIDGE_REVIEW = COMPLETE
COMPLETE_STEM_BRANCH_LINGUAN_TO_LU_BRIDGE = NOT_AVAILABLE
COMPLETE_STEM_BRANCH_DIWANG_TO_WANG_ROOT_BRIDGE = NOT_AVAILABLE
CROSS_SOURCE_AUTOMATIC_BRIDGE = REJECTED
R017 = VERIFIED_BOUNDED
```

This closes R017 as a **boundary result**, not as a generalized classifier.

Yin-Lu and Earth-Lu remain unresolved subquestions and may be reopened as narrower future frontiers if useful. They are not silently inferred.

No Product, SKU, Commerce, or Production behavior changes.
