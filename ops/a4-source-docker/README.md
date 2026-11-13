# Saju A4 Source PostgreSQL 17 — Local Docker

This is an **isolated local installation and verification environment**, NOT a Production cost-ingestion switch.

## Start

Windows PowerShell:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\ops\a4-source-docker\start.ps1
```

The start script generates an untracked, random PostgreSQL owner secret. It then creates the external named data volume `saju_a4_source_pg17_data_v1` if missing, validates Compose, and starts PostgreSQL 17.11. Data survives normal container recreation and `docker compose down`; even `down -v` cannot delete the external volume.

The database listens **only on 127.0.0.1:55432**, never on public interfaces. The container uses a dedicated Compose bridge network; only the Windows loopback port is published. Start-up also applies local-test TLS 1.3 with an untracked, automatically generated 180-day self-signed certificate for `localhost` and `127.0.0.1`, and rejects unencrypted TCP. Private keys stay in `secrets/` (Git-ignored) and the external Docker volume. This certificate is **local-test only**, not Production-trusted service TLS. Rotate the certificate before expiry. The container-local Unix socket retains the image's local trust policy; do not treat that as Production service authentication.

## Schema installation

On the first start of an empty volume, four already-reviewed **offline** SQL candidates are run in dependency order from `docs/ops`:

1. immutable signed provider receipts
2. immutable provider callback coverage
3. single-use signed prepared-attempt claims
4. immutable pre-network provider dispatch intents

The SQL scripts initially create passwordless, least-privilege service roles, so remote password authentication fails until the optional **local-only** provisioner below is explicitly run. The provisioner generates a separate secret for each role without printing it, uses SQL standard input (not a command-line password) to set SCRAM credentials, and tests certificate-verified TLS 1.3 connections with required channel binding. Password files remain Git-ignored under `secrets/`; temporary verification copies are removed from the container. Local Unix-socket access inside this isolated container retains the image's trust policy. This is **not** a Production service or Production credential configuration.

## Verify local service credentials

From the repository root, run once or repeat to verify existing credentials:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File .\ops\a4-source-docker\provision-local-service-auth.ps1
```

This validates three separate service roles: receipt writer, receipt reader, prepared-attempt claim writer. Each must connect via PostgreSQL `sslmode=verify-full` and `channel_binding=require` using TLS 1.3 and must lack direct receipt `DELETE` privilege. It does **not** inject these credentials into the Saju application or prove Production certificate identity. Never expose or commit the generated `.pgpass` files; do not use these local credentials for Production.

## Verify and back up

```powershell
docker compose -f .\ops\a4-source-docker\compose.yaml ps
docker exec saju-a4-source-pg17 psql -U saju_a4_owner -d saju_a4_source -Atc "select version();"
powershell -NoProfile -ExecutionPolicy Bypass -File .\ops\a4-source-docker\backup.ps1
```

Backups are local and ignored by Git. The companion `.globals.sql` records password-free role declarations for future disaster recovery. A backup file is **not** a verified off-site backup or a tested restore; do not treat it as full Production disaster recovery. Protect `secrets/` and `backups/` from disclosure.

## Hard gates not waived

Source record retention/deletion and privacy rules, verified Production TLS, independently managed Production service credentials and cross-service Bearer/HMAC, Production Interpretation Authority, a bounded actual-provider budget and independent invoice comparison are **not** supplied by this local stack. Do not enable billable AI calls or A4 continuous cost collection. Keep `completeCostCoverage=false` and `invoiceReconciled=false`.
