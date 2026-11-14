# Local Saju A4 Source — Node.js PostgreSQL connection verification

This adapter uses the **existing**, least-privilege PostgreSQL source roles. It is an explicit local verification-only connection, not a Production host deployment.

## Prerequisites

- Docker PostgreSQL 17.11 source instance from `ops/a4-source-docker/start.ps1`, bound only to `127.0.0.1:55432`.
- TLS 1.3 enabled and the local self-signed `local_tls_server.crt` preserved in Git-ignored `secrets/`.
- Three dedicated local role credentials created with `provision-local-service-auth.ps1`.
- Node 24 and npm 11, with `npm ci --ignore-scripts` and `npm run build` completed.

## Verify using the existing local secret folder

PowerShell from the Saju repository root (substitute your **existing**, authorized secrets directory, without printing the passwords):

```powershell
$env:SAJU_A4_LOCAL_SECRETS_DIR = 'C:\Users\hun\Documents\Saju-A4-Docker\ops\a4-source-docker\secrets'
try {
  node ops/a4-source-docker/verify-node-source-pools.mjs
} finally {
  Remove-Item Env:SAJU_A4_LOCAL_SECRETS_DIR -ErrorAction SilentlyContinue
}
```

The script reads the trusted local certificate and the `.pgpass` files at runtime and uses the Saju Node.js pool adapter over actual certificate-validated TLS 1.3. It verifies all three dedicated roles, disallows direct receipt DELETE privileges, and calls the **existing** signed-receipt reader to check that a randomly generated non-existent receipt is absent. It also runs the existing receipt Writer's real, read-only Source readiness check (receipt, callback coverage and pre-network dispatch intent grants). The separate Claim Writer must have precisely its approved INSERT and ID-only SELECT grants, with no proof digest read, UPDATE, DELETE or TRUNCATE authority. These checks use the existing local Docker database and never consume a prepared attempt. It performs **no INSERT, DELETE, paid provider call or cost ingestion**.

The runtime pool implementation is `src/production/reading-ai-a4-local-postgres-pool-v1.ts`; it exposes the existing `SajuA4ReceiptDatabasePoolV1` contract and has no automatic production service registration.

The server-only `createUnstartedSajuA4LocalAuthorizedHostBindingV1` composes these two local Source principals with the **existing** official A4 Production Host factory; it introduces no new Reading Host, listener, public endpoint, credentials, or service deployment. It checks the governed Production interpretation authority **before** constructing Source pools. With today's missing official Production interpretation registry, construction remains blocked even when the local Docker DB is healthy. Local credentials and self-signed TLS do not establish an operational Saju↔MyeongHa connection. The existing authorized host refuses injected A4 proof fetch transports as well as injected provider observers or custom refs.

## Safety and remaining requirements

- The local self-signed certificate is **not a Production trust anchor**. These Docker role credentials are local verification credentials, not deployable service secrets.
- Only local IPv4 loopback, `saju_a4_source` and the three approved Source roles are permitted; TLS 1.3 and CA verification are enforced. Channel binding support is enabled but must not be represented as proof of external Production identity.
- Real Saju Production Interpretation Authority and MyeongHa authenticated proof endpoint/HMAC, private Source DB endpoint/service identities, Source evidence retention/deletion policy, bounded actual provider spending, and independent invoice reconciliation remain **HOLD**.
- `completeCostCoverage=false`, `invoiceReconciled=false`; do not enable continuous cost collection or external AI calls.
