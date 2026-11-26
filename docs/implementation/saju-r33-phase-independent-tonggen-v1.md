# SAJU-R33 phase-independent intrinsic Tonggen v1

Issue: [#2351](https://github.com/gycha0109-beep/Saju/issues/2351)

Watchtower-Track: saju

## Adopted decision and scope

The user's 2026-10-07 additional research supersedes the earlier instruction to
leave the calculation policy unresolved. V1 separates 十二長生 stage from intrinsic
通根. A day master has an intrinsic root **in a particular branch** exactly when
that branch's complete canonical hidden membership contains a stem of the same
Five Element. Yin/Yang equality is not required. This is an explicit project
methodology, not an assertion that one historical tradition is erroneous.

| Pair | Unchanged stage | Canonical hidden members | Branch intrinsic root |
| ---- | --------------- | ------------------------ | --------------------- |
| 乙午 | 長生            | 丁、己                   | false                 |
| 丁酉 | 長生            | 辛                       | false                 |
| 乙亥 | 死              | 甲、壬                   | true, through 甲      |
| 丁寅 | 死              | 甲、丙、戊               | true, through 丙      |

Stage mapping retains its existing 十干陰陽順逆 convention and source identity
(the existing mapping authority cites 命理探源). R33 neither consumes stage nor
rewrites that authority. Shen's Yin Changsheng root/support interpretation and
餘氣 comparison, Xu's objection and the source-strata conflict remain observations
within their source-specific scopes. No source winner or 餘氣 weight is inferred.

This closes the missing executable intrinsic predicate: the isolated engine path
emits actual branch-local **true and false T2 verdicts**, rather than an availability
marker. Four checked branch verdicts do not grant a chart-wide 無根 classification.
No chart OR is introduced because the direct consumer does not require it.

## Canonical inputs and evidence flow

`projectIntrinsicTonggen` consumes the existing canonical snapshot, all four pillar
slots including day, canonical hidden membership and pinned manseryeok 2.0.0 stem
element/YinYang metadata. It checks master/day-pillar full stem parity and canonical
stem/Hanja metadata. Each branch requires its exact complete hidden membership,
storage order and uniqueness. Existing membership version/content hash/source are
bound in the new definition/hash; no alternate membership table is created.

Canonical 亥 stays 甲/壬 and canonical 申 retains 戊. Storage order does not express
rank, strength or month-command duration. Every hidden occurrence retains identity
`slot:stem`, source pillar/fact references and its same-element predicate, including
nonmatching members and repeated stems across different slots.

Missing ID/hash, scenarios, unresolved/ambiguous master, pillar or hidden membership,
malformed stem metadata, master/day parity or branch/member mismatch aborts the
entire projection. Uncertainty never becomes false or a partial negative verdict.

Producer → ID/hash-bound research envelope → independent full-payload replay →
registered eight-rule T2 registry (four slots × true/false) is exercised with an
actual calculated canonical fixture. Replay rejects rehashed verdict changes,
omitted/renamed members or slots, source crosslinks, authority/hash promotion,
phase injection and extra counts. Generic envelope hashing alone is insufficient.

## Existing authority and product boundary

Historical #740/#741 and R6/R29/R31/R32 flags are unchanged in their original
source-local contracts. R32's suggested applicability router describes its earlier
frontier; the user's later project-adopted intrinsic definition takes priority for
R33. This does not resolve the older source-local root-completeness gates or
automatically make R33 evidence consumable by those modules.

`productRootAuthority=NOT_GRANTED`, `materialForNarrative=false`; Production pack
promotion is rejected. Intrinsic presence is not usable support, seasonal effect,
interaction damage, manifestation, weight/count, 黨眾/助寡, 旺衰/強弱, 格局, 調候 or
喜用忌. Effective-root/support/challenge composition and classifier methodology
remain separate work. Branch false is not chart no-support, weak, or absence of
all traditional root concepts.

Public exports/API, canonical schema, default registry, DB, dependencies and
product routes are unchanged. `ReadingIntent → Profile → Claims → Evidence →
Narrative` remains the sole product path. Full product consumption/smoke and A/B/C
completion are still unverified and Production blockers remain.

## Research provenance

The calculation policy is authorized by the explicit user decision recorded in
#2351; the registered source is labeled project policy/cross-reference, not a
primary classical source. Supporting witnesses inspected during that decision:

- [子平真詮 chapter transcription](https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm)
  preserves the Shen/Xu contrast; its 明根 and the paper's 有根 quotation remain
  distinct witness labels. The user's scan claim was not independently verified
  as a scan; no edition adjudication is claimed.
- [三命通會 卷八 transcription](https://zh.wikisource.org/zh-hant/三命通會/卷八)
  supplies an earlier Yin Changsheng witness. It does not establish this engine's
  same-element intrinsic root definition.
- 우연화·김만태, 「천간과 지지의 상조(相助)와 상극(相剋)에 관한 연구」,
  대순사상논총 42 (2022), 109–141,
  [DOI](https://doi.org/10.25050/jdaos.2022.42.0.109),
  [paper](https://www.jdaos.org/download/download_pdf?pid=jdaos-42-0-109).
  The definition/comparison on pp.114–119 supports separating membership from
  phase. The paper's full seasonal model, exceptions, weights and alternative
  hidden table are not imported. Its Ren attribution is secondary evidence;
  a primary witness of the literal four-Changsheng quotation is not claimed.

## Verification and architecture check

Pinned Node 24.14.0 / Vitest 4.1.10 / manseryeok 2.0.0. Direct coverage includes
the independent 120-pair expected matrix, paired polarity parity, the four
counterexamples, actual canonical engine provenance, all slots/repeated identities,
uncertainty and parity boundaries, rehashed forgery, ID/hash/fact drift,
determinism, historical evidence noninterference and Production rejection.

Local direct suite: **160 tests PASS**. Direct plus unchanged stage/source-strata/
R6/R29/R31/R32 regressions: **7 files / 232 tests PASS**. `npm run typecheck`,
`npm run build`, changed-file ESLint/Prettier and whitespace checks pass. Initial
test-draft optional-property/readonly typing and parameter-table errors were
corrected in tests; no shared contract was changed. One focused review found no
remaining Critical/High issue or acceptance gap within this scope.

Hosted CI/Container/PIE/Integration remain pending PR submission and must be
checked at the submitted head. Local validation is not product smoke or hosted
verification.

Architecture Check:

- Docs updated: yes.
- Ghost-code risk: producer/replay/registered T2 true-and-false consumer exercised;
  default product activation remains explicitly unauthorized.
- New branch intrinsic root concept is justified by the user's policy. Existing
  canonical membership/metadata are reused; no parallel canonical truth, fallback,
  duplicate TenGod mapper or storage-contract change is introduced.
