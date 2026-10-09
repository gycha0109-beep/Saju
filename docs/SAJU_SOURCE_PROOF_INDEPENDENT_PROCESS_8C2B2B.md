# 8C-2B-2B — Protected Source Proof independent process

Watchtower-Track: saju-bridge

## Scope

Dedicated local-only Preview/Held Saju Proof server, using existing HTTP issuer and
approved Preview E2E general-natal calculation/interpretation/narrative dependencies.
No independent interpretation engine or Product/Commerce authority is created.

## Execution

Run npm run build and then npm run start:source-proof-staging.
The existing Dockerfile CMD continues to start the Production Calculation server.
The alternative executable is dist/source-reading-proof-server.js.

## Required isolated runtime variables

- SAJU_SOURCE_PROOF_STAGING_PORT: integer 1..65535
- SAJU_SOURCE_PROOF_STAGING_SERVICE_BEARER: dedicated non-whitespace bearer
- SAJU_SOURCE_PROOF_STAGING_HMAC_KEY: canonical Base64 encoding of 32+ random bytes
- SAJU_SOURCE_PROOF_STAGING_ISSUER: exact agreed Proof issuer ID
- SAJU_SOURCE_PROOF_STAGING_AUDIENCE: exact agreed MyeongHa audience ID
- SAJU_SOURCE_PROOF_STAGING_KEY_ID: exact agreed key ID

Optional SAJU_SOURCE_PROOF_STAGING_TTL_MS defaults to 60000 (max 120000).
Optional SAJU_SOURCE_PROOF_STAGING_HOST defaults to 127.0.0.1;
only 127.0.0.1 and ::1 are currently permitted.
Remote binding and ingress remain blocked pending separate staging network approval.
Production Calculation environment values are never fallback settings.
Previous Proof bearer auto-rotation is disabled.

## Evidence and authority

Local tests and CI are not staging deployment verification.
Real staging Auth, Subject/nonce DB logins, TLS peer/network ingress, independent
staging Secrets, signed one-shot operator approval, and durable atomic consumption
require independent approvals and execution evidence.

lifecycle=preview; state=held; sourceAuthority=NOT_EVALUATED;
releaseAuthorization=NOT_EVALUATED; canExecute=false; canPublish=false; canSell=false.
MyeongHa stagingConnection=NOT_VERIFIED; stagingAdmission=HOLD.
