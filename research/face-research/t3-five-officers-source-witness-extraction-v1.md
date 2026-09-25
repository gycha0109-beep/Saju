# T3 — 神相全編 五官 Direct Source Witness Extraction v1

> Status: scan-qualified source extraction  
> Watchtower-Track: face-research  
> Baseline main: `73be25d1608b624826438c74c9ae12f4b8f20de7`  
> Issue: #1529

## 1. Result

The first two source gates created by the 五官 / 六府 T2 extension are now resolved for the **神相全編 NLC-1925 witness**.

The repository already contained immutable page images from FR103:

- scan page 87
- scan page 88

FR103 originally acquired them for the 出納官 source-verification chain. T3 re-adjudicates the same immutable images for additional 五官 targets.

This is evidence reuse inside one witness, **not independent corroboration**.

## 2. Witness

```text
witness.shenxiang_quanbian.nlc_1925
文明書局 民國十四年本
National Library of China
576-page scan
```

The public Commons record identifies the work as `神相全編`, publisher `文明書局`, publication year 1925, and a 576-page NLC scan.

Repository-pinned PDF identity:

```text
sha256:94167d8d19d47525535b39e18a20c6b315a3a30751c2063bc2492760f1d927af
```

## 3. Page 87 — 五官 mapping

Direct visual review of the immutable page-87 image shows `五官說` and the mapping:

```text
五官者，一曰耳為採聽官，二曰眉為保壽官，
三曰眼為監察官，四曰鼻為審辨官，五曰口為出納官。
```

T3 successor:

`passage.shenxiang.nlc_1925.five_officers.mapping`

Status:

`scan_checked`

This resolves the T2 gate that previously treated the mapping as electronic/unverified only.

### Authority boundary

The mapping establishes the named relation:

| Feature | Officer |
|---|---|
| 耳 | 採聽官 |
| 眉 | 保壽官 |
| 眼 | 監察官 |
| 鼻 | 審辨官 |
| 口 | 出納官 |

It does not itself establish machine criteria or Production interpretation.

## 4. Page 88 — all five 官成 source passages

Page 88 visibly contains the five criterion sections.

### 採聽官

```text
耳須要色鮮，高聳於眉，輪廓完成，貼肉敦厚，
風門寬大者，謂之採聽官成。
```

New T3 successor:

`passage.shenxiang.nlc_1925.five_officers.listening`

### 保壽官

```text
眉須要寬廣清長，雙分入鬢，或如懸犀新月之樣，
首尾豐盈，高居額中，乃為保壽官成。
```

New T3 successor:

`passage.shenxiang.nlc_1925.five_officers.longevity`

### 監察官

```text
眼須要含藏不露，黑白分明，瞳子端定，光彩射人，
或細長極寸，乃為監察官成。
```

New T3 successor:

`passage.shenxiang.nlc_1925.five_officers.inspection`

### 審辨官

```text
鼻須要梁柱端直，印堂平闊，山根連印，年壽高隆，
準圓庫起，形如懸膽，齊如截筒，色鮮黃明，
乃為審辨官成。
```

New T3 successor:

`passage.shenxiang.nlc_1925.five_officers.discernment`

### 出納官

The same page also contains:

```text
口須要方大，唇紅端厚，角弓，開大合小，
乃為出納官成。
```

This target was already promoted through FR104 → FR117 as:

`passage.shenxiang.five_officers.intake.nlc_1925`

T3 does **not** mint another independent 出納官 passage or another witness vote.

## 5. What changed from T2

Before T3:

| Target | T2 state |
|---|---|
| 神相 五官 mapping | direct page required |
| 採聽官 criterion | direct page required |
| 保壽官 criterion | direct page required |
| 監察官 criterion | direct page required |
| 審辨官 criterion | direct page required |
| 出納官 criterion | scan-checked successor available |

After T3:

| Target | T3 state |
|---|---|
| 神相 五官 mapping | **scan_checked** |
| 採聽官 criterion | **scan_checked** |
| 保壽官 criterion | **scan_checked** |
| 監察官 criterion | **scan_checked** |
| 審辨官 criterion | **scan_checked** |
| 出納官 criterion | **scan_checked / existing FR117 successor** |

The source layer is therefore complete enough to begin **神相 五官 methodology reconstruction**.

## 6. Static morphology vs appearance/dynamic language

Source verification does not mean all criterion terms are static-image observable.

### Mixed or appearance-sensitive examples

- 採聽官: `色鮮`
- 監察官: `黑白分明`, `光彩射人`
- 審辨官: `色鮮黃明`
- 出納官: `唇紅`, `開大合小`

These must remain distinct from stable morphology.

The T3 source passage authorizes the historical wording only. It does not authorize camera-color inference, dynamic-state inference, thresholds, or classifier output.

## 7. No modern-unit conversion

The 監察官 phrase `細長極寸` is retained as source wording.

T3 does not convert `寸` into:

- pixels;
- normalized face units;
- millimetres;
- a percentage of face width;
- any fixed modern threshold.

That belongs to later methodology/operationalization research and requires independent justification.

## 8. Evidence genealogy

Page 87 and page 88 are the same NLC-1925 witness already acquired by FR103.

Therefore:

```text
new target adjudication
!=
new witness
!=
independent corroboration
```

The page-88 出納官 evidence overlaps FR103/FR104/FR117 exactly.

T3 records zero increase in independent witness count.

## 9. Remaining source gates

This PR does not promote the remaining T2 candidates.

Still blocked:

1. 神相 六府 exact scan-page adjudication;
2. 柳莊 五官 exact scan-page adjudication;
3. 柳莊 六府 exact scan-page adjudication;
4. direct-witness comparison of 神相 `審辨官` vs 柳莊 electronic `審判官`.

There is an additional reason not to rush 六府 normalization: electronic material associated with 神相 preserves more than one 六府 framing/context. The exact target passage and chapter must therefore be pinned before methodology reconstruction.

## 10. T3 verdict

```text
神相 NLC-1925 五官 mapping
= SCAN_CHECKED

神相 採聽官 criterion
= SCAN_CHECKED

神相 保壽官 criterion
= SCAN_CHECKED

神相 監察官 criterion
= SCAN_CHECKED

神相 審辨官 criterion
= SCAN_CHECKED

神相 出納官 criterion
= SCAN_CHECKED / EXISTING FR117 SUCCESSOR

INDEPENDENT WITNESS DELTA
= 0

MACHINE OPERATIONALIZATION
= NOT AUTHORIZED

PRODUCTION
= NOT AUTHORIZED

NEXT
= 神相 五官 METHODOLOGY RECONSTRUCTION
  + separate 六府 / 柳莊 direct-witness extraction
```
