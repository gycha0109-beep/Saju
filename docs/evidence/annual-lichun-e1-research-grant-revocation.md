# Saju E1 LiChun — Owner-delegated research grant and revocation

Scope: PR #2468 stacked on Draft PR #2461; research calculation only (2026 and 2027).
Decision record: https://github.com/gycha0109-beep/Saju/issues/2466#issuecomment-6097137685

## Verifiable authority boundary

- The GitHub decision was posted by the connected owner account **at the owner's explicit temporary delegation**, but the text and source examination were prepared by AI.
- No independent human source review, no attestation that the owner read original files. `reviewProvenance=OWNER_DELEGATED_AI`, `independentHumanReviewCompleted=false`.
- The code matches pinned NAOJ/KASI capture metadata and an exact decision URL **as strings**. It does not independently authenticate a live GitHub comment, its author, a signature, or the original PDF/HTML bytes.
- The KASI HTML SHA identifies a particular dynamic response; source bytes are not persistently stored in the repository. The prior Actions artifact has limited retention.
- `mayGenerateAnnualInterpretation=false`, `productionAuthorized=false`. E2, Monthly, paid reading, and real consumers remain blocked.
- `Asia/Seoul` is the supported target-period policy. ISO timestamps with UTC `Z` or explicit `+09:00` are both normalized to the same instant. Missing offsets, impossible dates, and unsupported `timeZone` values fail closed.
- Both boundaries retain a conservative ±60-second exclusion window. The published minute does not establish the exact second. The 2027 whole cycle stays unavailable without 2028 evidence.

## Withdrawal / tampering procedure

**No automatic live revocation check exists.** Deleting or editing the linked GitHub decision alone does not change a previously built offline calculation module. Treat this as a documented operational limitation, not a cryptographically verified approval.

1. Record the withdrawal and its affected years in issue #2466, without claiming independent review.
2. In the E1 research module set `OWNER_DELEGATED_E1_GRANT_STATUS[year]` to `'revoked'`; the lookup then returns `RESEARCH_APPROVAL_REVOKED` and dependent annual single-time/cycle resolvers fail closed. Do not use a runtime caller-supplied approval switch.
3. Invalidate previously generated research candidates/caches for affected years (including a cycle with a revoked start or end), then verify on the exact new commit.
4. Keep PRs Draft and do not merge or expose any consumer/Production path without separate authority.

The explicit repository revocation gate is not a substitute for verified GitHub ownership or an audit log. An authorized code change can still alter the static registry; therefore review provenance must remain attached to every positive research result and all changes remain reviewable.

Watchtower-Track: saju-temporal
