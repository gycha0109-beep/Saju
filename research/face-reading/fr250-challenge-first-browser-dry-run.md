# FR250 — Challenge-first browser one-person dry-run handshake

Status: implementation candidate  
Tracking: #1324  
Watchtower-Track: `face-research`

## Problem

FR249 composes the four-slot browser dry-run mechanics, but its `capture()` API accepts a browser trigger and only then issues the FR241 challenge internally.

That ordering is sufficient for synthetic mechanics tests but is not sufficient for the actual operator surface. FR243 requires the operator to attest that the challenge was presented before capture. A real shutter trigger therefore must not exist before the exact challenge has been issued and made available to the UI.

## Decision

FR250 introduces a challenge-first two-step boundary:

1. `prepareCapture({ challengeIssuedAt })`
   - issues the exact FR241 challenge;
   - returns the challenge to the caller for presentation;
   - creates one single-use prepared slot;
   - does not trigger the camera.
2. the operator surface presents the challenge and obtains the operator observations/confirmations;
3. only then does the operator create the explicit MESH6H trigger;
4. `capturePrepared(...)` consumes that exact prepared slot and executes FR244 with FR247 quality and FR246 same-frame primary metric binding.

Only one prepared slot may exist at a time. It cannot be replaced, skipped, reused, or carried into the next session.

## Preserved boundary

FR250 preserves:

- exactly two sessions in order;
- exactly two recorded slots per session;
- explicit operator-triggered capture only;
- sanitized FR243 records only;
- no raw image persistence;
- no raw image digest;
- no face embedding or identity template;
- no silent retry or best-frame selection;
- no empirical or confirmatory evidence promotion.

The API shape guarantees challenge issuance before the later trigger can be supplied to `capturePrepared()`. Actual visual presentation of that challenge remains an operator attestation and is not independently verified.

## Failure behavior

Once an FR241 challenge is issued, a technical failure during its prepared capture fails closed. FR250 does not silently reissue the same capture ordinal or substitute another frame.

## Authority

FR250 does not establish:

- participant identity;
- temporal separation;
- validated capture-quality constructs;
- repeatability;
- interpretation validity;
- traditional physiognomy binding;
- Production or Commerce authority.

## Next frontier

Wire FR250 into a localhost operator surface that displays the issued challenge before enabling the shutter, collects the FR240/FR243/FR247 confirmations, opens the caller-owned MESH6H camera, and exports only sanitized mechanics results.

Actual participant/live-camera action remains deferred until that surface is implemented and verified.
