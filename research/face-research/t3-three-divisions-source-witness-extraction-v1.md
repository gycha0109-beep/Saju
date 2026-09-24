# T3 — Three-Divisions Source Witness Extraction v1

Watchtower-Track: face-research

> Repository: gycha0109-beep/Saju
> Phase: T3 — Source Witness Extraction
> Baseline main: 1277f1ec5d11c3c34393fcd6bc2fe65cb03464cd
> Date: 2026-09-24
> Parent: T2 Three-Divisions Concept Registry
> Status: SOURCE PROVENANCE / NO METHODOLOGY PROMOTION

---

## 0. Result

T3 now separates four states that were previously easy to blur:

1. the physical/digitized witness exists;
2. the target passage is electronically locatable in or against that witness;
3. the exact scan page is pinned and checked;
4. the passage is strong enough to enter methodology reconstruction.

Only state 3 is scan_checked. A verified book scan does not automatically upgrade every OCR/electronic passage inside that book.

Structured successor records are implemented in:

- packages/face-reading/src/traditional-three-divisions-source-witnesses-t3.ts

---

## 1. Current source state matrix

| Lineage / witness | Witness exists | Target text located | Exact scan page pinned | T3 passage state | T4-ready source status |
|---|---:|---:|---:|---|---|
| 麻衣相法 1925 NLC / FR261 | yes | yes | yes | scan_checked | yes for source reconstruction, not Production |
| 神異賦 / 古今圖書集成 第636卷 FR263 | yes | yes | yes, page 48 | scan_checked transmission | yes as transmission-only lineage |
| 神異賦 / Harvard 萬曆本 53261115 | yes | not yet | no | witness verified only | no |
| 神相全編 1925 NLC | yes | yes via direct-PDF OCR index | no | unverified_ocr locator | no |
| 柳莊相法 1925 NLC | yes | electronic parallel text exists | no | witness verified / target page open | no |
| 太清神鑑 1925 NLC | yes | yes via direct-PDF OCR index | no | unverified_ocr locator | no |
| 人倫大統賦 四庫/CADAL | yes | transcription located | no | witness verified / target page open | no |

---

## 2. 麻衣 1925 — predecessor passage corrected by successor passages

The historical research-pack passage passage.mayi.sancai_three_divisions.boundaries remains preserved as a historical artifact, but its original coarse wording mixed two triplets under a Three-Divisions framing.

FR261 re-reviewed the NLC scan and adjudicated the context.

T3 therefore adds two successor SourcePassage records instead of mutating the old v0 record:

### passage.mayi.fr261.three_fus_three_governors

- witness: witness.mayi_xiangfa.nlc_1925_v1
- scan page: 35
- status: scan_checked
- semantics preserved at source level:
  - 髮際→印堂 = 上府 / 初主
  - 山根→準頭 = 中府 / 中主
  - 人中→地閣 = 下府 / 末主
- authority boundary: not admitted as the current Mayi Three-Divisions boundary.

### passage.mayi.fr261.contiguous_three_divisions

- witness: witness.mayi_xiangfa.nlc_1925_v1
- scan page: 35
- status: scan_checked
- source clauses:
  - 髮際→眉 = 上停
  - 眉→準頭 = 中停
  - 準頭→地閣 = 下停

This is now the clean source passage to feed into T4 for the pinned 1925 Mayi context.

---

## 3. 神異賦 — exact compilation transmission plus earlier witness gap

FR263 already established an exact page-pinned transmission in 欽定古今圖書集成, 博物彙編 / 藝術典 / 第636卷.

T3 materializes that evidence as:

- work.shenyi_fu
- witness.shenyi_fu.gujin_636_transmission
- passage.shenyi_fu.gujin_636.noncontiguous_three_divisions

Exact scan page: 48.

The transmitted face Three-Divisions clauses are:

- 髮際→印堂 = 上停
- 山根→準頭 = 中停
- 人中→地閣 = 下停

This establishes a scan-checked compilation transmission. It does not establish the original 神異賦 manuscript or authorize merging this formula into 麻衣 1925.

### Earlier rare-book witness now independently verified to exist

Harvard-Yenching / DRS 53261115:

- 新刻麻衣相神異賦
- 胡文煥校刊 / 文會堂
- 明萬曆間, 1573–1620
- one juan + image juan + attached 金鎻賦
- three digitized PDF volumes are publicly catalogued.

T3 adds witness.shenyi_fu.harvard_wanli_53261115 as a verified witness record.

However, the Three-Divisions target passage has not been pinned inside this Harvard witness. Therefore no SourcePassage from that witness is promoted yet.

---

## 4. 神相全編 1925 NLC

The existing verified witness remains:

- witness.shenxiang_quanbian.nlc_1925
- 文明書局, 1925
- NLC scan
- 576 scan pages

The scan catalogue explicitly includes 卷二 sections 六府三才三停圖, 六府論, 三才三停論, 相三主 and 相身三停.

Search indexing against the direct NLC PDF also exposes the expected 三才三停論 wording. That is stronger provenance than a free-floating modern webpage, but it is still OCR indexing rather than a manually pinned scan page.

T3 therefore adds:

- passage.shenxiang.nlc_1925.sancai_three_divisions_ocr_locator
- verificationStatus = unverified_ocr
- no scanPage.

Important OCR cautions:

- 輔 / 府 varies in OCR;
- 頤 / 頦 varies;
- heading OCR may be malformed;
- punctuation is editorial.

No scan_checked promotion occurs until the exact PDF page is visually pinned.

---

## 5. 柳莊相法 1925 NLC

The repository already has a verified NLC witness:

- witness.liuzhuang_xiangfa.nlc_1925

and an electronic candidate passage:

- passage.liuzhuang.three_divisions
- 永樂百問 / 三停有面有身何說

Multiple electronic transmissions consistently expose the key structure:

- 髮際→山根 = 上停 / 初限
- 山根→準頭 = 中停 / 中限
- 人中→地閣 = 下停 / 末限
- 三停平等
- contextual statement that 三停 is also called 三才.

But T3 did not obtain an exact NLC scan page for that paragraph.

Therefore the existing electronic passage remains unverified_ocr and the NLC witness remains verified separately. T3 deliberately does not re-point the electronic passage to the NLC witness.

An earlier Ming printed tradition, 新刻袁柳庄先生秘傳相法, is also electronically represented and contains the same 永樂百問 question, but it likewise remains a later direct-witness extraction target rather than an authority shortcut.

---

## 6. 太清神鑑

T3 adds:

- work.taiqing_shenjian
- witness.taiqing_shenjian.nlc_1925

The witness is the 1925 文明書局 edition, 秦慎安校勘, digitized from the National Library of China; the Commons scan has 114 pages.

The direct PDF search index locates 卷五 / 論面部 and reads the Three-Divisions passage as:

- 髮際→眉間 = 上停
- 眉間→鼻準 = 中停
- 準/人中→頤 = 下停
- upper/middle/lower analogized to 天/人/地.

This is important because some secondary electronic transcriptions render the lower endpoint with OCR corruption such as 頰.

T3 therefore stores the NLC-PDF OCR locator as unverified_ocr and explicitly refuses to normalize the lower boundary beyond the indexed reading until the exact scan page is pinned.

---

## 7. 人倫大統賦

The existing work identity work.renlun_datongfu is retained.

T3 adds a verified scan witness:

- witness.renlun_datongfu.cadal_siku
- 欽定四庫全書本
- CADAL scan surfaced through the Chinese Text Project library.

The electronic 四庫 transmission/commentary contains the target 三才 statement:

- 額 = 天
- 頦 = 地
- 鼻 = 人.

The statement is in commentary attached to 欲察人倫，先從額上, not automatically the base 賦 line itself.

The exact scan page has not been pinned in this pass, so T3 adds the witness but does not create a scan_checked SourcePassage for this statement.

That base-text/commentary distinction must survive into T4.

---

## 8. New structured records

### New SourceWork records

- work.shenyi_fu
- work.taiqing_shenjian

These are research identities. Traditional authorship labels are not treated as proven historical authorship.

### New SourceWitness records

- witness.shenyi_fu.gujin_636_transmission
- witness.shenyi_fu.harvard_wanli_53261115
- witness.taiqing_shenjian.nlc_1925
- witness.renlun_datongfu.cadal_siku

### New SourcePassage successor/locator records

- passage.mayi.fr261.three_fus_three_governors — scan_checked
- passage.mayi.fr261.contiguous_three_divisions — scan_checked
- passage.shenyi_fu.gujin_636.noncontiguous_three_divisions — scan_checked transmission
- passage.shenxiang.nlc_1925.sancai_three_divisions_ocr_locator — unverified_ocr
- passage.taiqing.nlc_1925.face_three_divisions_ocr_locator — unverified_ocr

---

## 9. Source gate invariant

T3 establishes the following invariant for all later traditional research:

verified SourceWitness != scan_checked SourcePassage.

A passage becomes scan_checked only when the target text itself has been checked against a pinned scan page/window.

Search snippets, OCR indexes, CText transcriptions, Wikisource transcriptions and modern transcriptions may locate a target, but they do not by themselves satisfy the scan_checked gate.

---

## 10. What T4 may now use

T4 Methodology Reconstruction may immediately use two source sets without reopening their basic passage identity:

1. 麻衣 1925 / FR261 successor passages;
2. 神異賦 / Gujin page-48 transmission, strictly as a separate transmission lineage.

T4 may inspect but must not promote the following until their page-level source gates advance:

- 神相全編 1925 NLC 三才三停論;
- 柳莊相法 1925 NLC 永樂百問 三停;
- 太清神鑑 1925 NLC 論面部;
- 人倫大統賦 四庫/CADAL 三才 commentary.

---

## 11. T3 decision

| Decision | State |
|---|---|
| Mayi FR261 source split | MATERIALIZED |
| Mayi contiguous Three-Divisions passage | SCAN_CHECKED |
| Mayi Three-Fu/Three-Governor passage | SCAN_CHECKED / NOT THREE-DIVISIONS WINNER |
| Shenyi Fu Gujin transmission | SCAN_CHECKED / TRANSMISSION ONLY |
| Harvard Wanli Shenyi Fu witness | VERIFIED WITNESS / TARGET PAGE OPEN |
| Shenxiang 1925 NLC | VERIFIED WITNESS / OCR LOCATOR / PAGE OPEN |
| Liuzhuang 1925 NLC | VERIFIED WITNESS / TARGET PAGE OPEN |
| Taiqing 1925 NLC | VERIFIED WITNESS / OCR LOCATOR / PAGE OPEN |
| Renlun Siku/CADAL | VERIFIED WITNESS / COMMENTARY TARGET PAGE OPEN |
| Production methodology promotion | NO |
| Next | T4 Methodology Reconstruction for source-qualified Three-Divisions rules |

---

## 12. Primary locators

- 神相全編 1925 NLC scan: https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_神相全編.pdf
- 柳莊相法 1925 NLC scan: https://commons.wikimedia.org/wiki/File:NLC416-13jh001257-42702_柳莊相法.pdf
- 太清神鑑 1925 NLC scan: https://commons.wikimedia.org/wiki/File:NLC416-13jh001253-42698_太清神鑒.pdf
- 人倫大統賦 四庫/CADAL library record: https://ctext.org/library.pl?if=gb&res=98480
- 神異賦 Gujin exact page: https://zh.wikisource.org/wiki/Page:Gujin_Tushu_Jicheng,_Volume_473_(1700-1725).djvu/48
- 新刻麻衣相神異賦 Harvard witness: https://commons.wikimedia.org/wiki/File:Harvard_drs_53261115_新刻麻衣相神異賦_v.1.pdf

---

## 13. Non-authorization

T3 does not authorize methodology winner selection, cross-lineage merging, numeric Three-Divisions equality, age prediction, fortune/personality claims, CV geometry, landmark mapping, thresholds, calibration, narrative output or Production activation.