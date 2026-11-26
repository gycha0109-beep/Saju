# FR248 — Browser-portable FR237-FR243 authority runtime

Status: implementation candidate  
Tracking: #1317  
Watchtower-Track: `face-research`

## Problem

FR244, FR246, and FR247 now provide the browser live-camera, same-frame primary-metric, and governed dry-run quality bindings needed for the first real FR243 execution.

The remaining execution blocker is module portability.

FR237, FR238, FR239, FR240, and FR241 directly import `node:crypto`. FR242 and FR243 depend on those modules and on their in-memory provenance registries. A real browser operator surface therefore cannot simply substitute reconstructed JSON artifacts or execute only the later modules.

## Decision

FR248 moves only the two cryptographic primitives used by the FR237-FR241 authority chain behind a browser-portable synchronous boundary:

- SHA-256 over canonical UTF-8 strings;
- secure random bytes for 24-byte nonces.

SHA-256 remains synchronous so existing issuance APIs and provenance semantics do not change.

Nonce generation uses `globalThis.crypto.getRandomValues`. Modern Node and secure browser contexts expose this API. The boundary fails closed if a secure random source is unavailable.

No insecure randomness fallback is permitted.

## Compatibility

FR248 preserves:

- `sha256:<64 lowercase hex>` digest format;
- 24-byte / 48-lowercase-hex nonce format;
- existing canonical JSON inputs;
- all FR237-FR243 WeakSet/WeakMap provenance behavior;
- all authority boundaries.

Known SHA-256 vectors are pinned in tests.

## Non-goals

FR248 does not:

- execute participant capture;
- change consent semantics;
- persist raw media;
- validate capture quality constructs;
- issue repeatability thresholds;
- establish interpretation validity;
- issue traditional bindings;
- activate Production or Commerce.

## Next frontier

After FR248 merges, the repository can build the actual localhost FR243 operator surface in one browser realm using the existing MESH6H camera plus FR244/FR246/FR247 bindings.

Actual participant and camera action remains deferred until that operator surface is implemented and verified.
