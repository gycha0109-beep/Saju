# T3 — 神相全編 六府 Source Witness Extraction v1

> Status: scan-addressed compilation transmission / intra-work context split established  
> Watchtower-Track: face-research  
> Issue: #1563

## 1. Result

The next 六府 source gate produced a more important result than a simple page promotion.

`神相全編` does not expose only one 六府 formulation in the currently admitted transmission evidence.

Two separate contexts are directly scan-addressable in `欽定古今圖書集成` 第473冊:

1. `神相全編一 / 十觀 / 六取五官六府` — scan page 4;
2. `神相全編二 / 六府論` — scan page 22.

They use materially different region vocabularies.

Therefore T3 does **not** create one universal `神相 六府` region map.

## 2. Witness

New witness record:

```text
witness.shenxiang_quanbian.gujin_473_1725_transmission
欽定古今圖書集成 第473冊
博物彙編 / 藝術典 / 第631–632卷
1725 compilation transmission
```

This is a scan-addressed transmission of `神相全編`, not an independent traditional authority.

```text
new witness record                  = 1
independent tradition/source vote   = 0
```

The genealogy rule remains unchanged.

## 3. Context A — 卷首 / 十觀 / 六取五官六府

Scan page 4 preserves three named pair roles.

### 天府

Source-local location vocabulary:

- 天庭
- 日角
- 月角

Formation wording includes:

- 方員明淨
- 不露骨
- negative wording such as 欹削 / 低塌 / 偏尖

### 人府

Source-local location vocabulary:

- 兩顴

Formation wording includes:

- 方正插鬢
- 不粗不露
- 齊揖方拱
- negative 粗露 / 高低 / 尖員綳鼓

### 地府

Source-local location vocabulary:

- 地角
- 邊腮

Formation wording also invokes 地閣 and visible condition language.

This passage additionally contains historical period/fortune language.

T3 records that language as historical source semantics only.

It does not authorize:

- an age engine;
- wealth prediction;
- fortune claims;
- product narrative;
- Production execution.

Successor passage:

`passage.shenxiang.gujin_631.six_fus.ten_observations`

## 4. Context B — 卷二 / 六府論

Scan page 22 gives a different formulation:

```text
六府者
= 兩輔骨
+ 兩顴骨
+ 兩頤骨
```

It then states:

```text
上二府: 輔角 → 天倉
中二府: 命門 → 虎耳
下二府: 肩骨 → 地閣
```

and describes the six fu as wanting `充實相輔` rather than `支離孤露`.

Successor passage:

`passage.shenxiang.gujin_632.six_fus.treatise`

The wording is retained as source-local terminology. T3 does not silently rewrite these terms into modern anatomical or landmark geometry.

## 5. The intra-work conflict is now explicit

The old v0 research artifact effectively represented only the 卷首 formulation:

```text
天府 = 天庭 / 日角 / 月角
人府 = 兩顴
地府 = 地角 / 邊腮
```

The scan-addressed 卷二 `六府論` instead exposes:

```text
上二府 = 兩輔骨 / 輔角→天倉
中二府 = 兩顴骨 / 命門→虎耳
下二府 = 兩頤骨 / 肩骨→地閣
```

The overlap at the middle pair does not establish whole-map identity.

Therefore:

```text
same work title
!=
same 六府 context
!=
same region vocabulary
!=
one executable region map
```

T3 freezes:

`conflict.shenxiang.six_fus.intra_work_context_mapping_t3`

with:

`oneUniversalShenxiangSixFusRegionMapAuthorized = false`

## 6. Why this matters for later methodology reconstruction

The next methodology phase must be context-specific.

It may reconstruct, separately:

1. `method.shenxiang.ten_observations.six_fus...`
2. `method.shenxiang.volume_two.six_fus_treatise...`

It must **not** begin from the historical v0 region map and choose whichever source terms are convenient.

The first methodology question is textual:

> What relation, if any, does the source tradition itself establish between these two 六府 formulations?

Until that is resolved, geometry cannot resolve it for us.

## 7. NLC-1925 state

The NLC-1925 `神相全編` witness remains important.

Public file metadata confirms the 1925 文明書局 NLC scan and its contents include both the 卷首 material and 卷二 `六府論`.

For the current T3 source-authority standard, however:

- the 卷首 六府 text is electronically locatable in the direct PDF;
- the exact NLC scan page has not yet been pinned/adjudicated;
- the 卷二 `六府論` chapter is present, but its exact NLC target page has not yet been pinned/adjudicated.

Therefore the new scan-qualified authority in this PR is explicitly the **1725 Gujin compilation transmission**, not a fabricated NLC-1925 page promotion.

## 8. Evidence quality boundary

The Gujin page namespace gives exact scan-addressable pages, matching the transmission pattern already used by the Three-Divisions T3 work.

That does not establish:

- an original `神相全編` manuscript;
- independent corroboration;
- original authorship;
- one universal 六府 definition.

The evidence is sufficient for a **transmission-qualified, context-specific T4 reconstruction**, not for cross-witness finalization.

## 9. What remains blocked

Still open:

1. NLC-1925 exact scan page for 卷首 六府;
2. NLC-1925 exact scan page for 卷二 六府論;
3. source relationship between the two 神相 六府 contexts;
4. 柳莊 五官 direct witness;
5. 柳莊 六府 direct witness;
6. 柳莊 `審判官` vs 神相 `審辨官` direct-witness comparison.

## 10. T3 verdict

```text
神相 / Gujin 1725 / 卷首 十觀 六府
= SCAN_CHECKED COMPILATION TRANSMISSION

神相 / Gujin 1725 / 卷二 六府論
= SCAN_CHECKED COMPILATION TRANSMISSION

SAME REGION MAP
= NOT ESTABLISHED

ONE UNIVERSAL 神相 六府 METHODOLOGY
= NOT AUTHORIZED

NLC-1925 EXACT TARGET PAGES
= STILL UNRESOLVED

INDEPENDENT TRADITION VOTE DELTA
= 0

MACHINE REGION MAP
= NOT AUTHORIZED

OUTCOME CLAIMS
= NOT AUTHORIZED

PRODUCTION
= NOT AUTHORIZED

NEXT
= CONTEXT-SPECIFIC T4 METHODOLOGY RECONSTRUCTION
  OR NLC-1925 PAGE ADJUDICATION
```
