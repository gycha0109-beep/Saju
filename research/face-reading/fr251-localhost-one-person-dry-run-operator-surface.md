# FR251 — Localhost one-person dry-run operator surface

Status: implementation candidate  
Tracking: #1327  
Watchtower-Track: `face-research`

## Purpose

FR251 is the first browser surface intended to let an operator execute the already-issued one-person mechanics dry run without manually constructing FR237-FR250 objects.

It reuses the existing MESH6J localhost server, compiled Face Reading modules, pinned MediaPipe release witness, geometry metadata, and camera adapter.

## Browser flow

1. Load and verify the pinned runtime/parity inputs.
2. Require every FR240 consent confirmation.
3. Open one caller-owned MESH6H camera.
4. Materialize FR237, FR238, FR239, FR240, FR241, FR242, FR243, and FR250 in the same browser realm.
5. Begin Session 1.
6. FR250 issues the exact FR241 challenge.
7. The page displays challenge ref and nonce before the shutter can be enabled.
8. The operator reconfirms consent and records all four FR247 quality observations.
9. The operator explicitly presses the shutter.
10. FR250 consumes the exact prepared challenge slot with the later MESH6H trigger, FR247 quality binding, FR246 same-frame metric binding, and FR243 recorder.
11. Repeat for Session 1 Capture 2.
12. Require an explicit operator confirmation before beginning temporally separated Session 2.
13. Repeat two explicit slots.
14. Review the exact four FR243 slots and export sanitized JSON only.

## Fail-closed behavior

There is no silent retry after a challenge has been issued and capture execution fails.

A technical failure, cancellation, or spent challenge aborts the current run. The operator must restart from a fresh authority chain.

Rejected quality slots remain recorded as rejected slots; the UI does not substitute a best frame.

## Persistence

The page does not use localStorage or sessionStorage.

It does not persist:

- raw image/video bytes;
- raw image digests;
- provider landmark payloads;
- face embeddings;
- identity templates.

The explicit download contains pseudonymous refs, sanitized FR243 records, the FR243 mechanics review, and a frozen non-authority boundary.

## Authority boundary

The operator confirmations are not independent verification.

FR251 does not establish participant identity, temporal separation, capture-quality construct validity, empirical repeatability, interpretation validity, traditional physiognomy binding, Production authority, or Commerce authority.

## Execution handoff

After FR251 is merged and post-merge CI is healthy, the next action requires the actual operator:

- run `npm run face:dry-run:operator`;
- open the printed `/fr251/` localhost URL;
- allow camera access;
- complete the consent confirmations;
- perform the four explicit captures.

That is the first point in this chain where user camera action is required.
