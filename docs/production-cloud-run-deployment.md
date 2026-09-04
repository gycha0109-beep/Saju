# Saju Cloud Run Production Deployment Runbook

> Hosting authority: MyeongHa `docs/architecture/SAJU_PRODUCTION_HOSTING_DECISION_V1.md`  
> Region: `asia-southeast1` (Singapore)  
> Production workflow: `.github/workflows/production-cloud-run.yml`  
> Status: implementation contract only; production activation requires the external prerequisites below.

## 1. Operational boundary

This runbook deploys the existing Saju production calculation container. It does not change Saju calculation semantics or MyeongHa product authority.

Target path:

```text
GitHub Actions
  -> OIDC / Workload Identity Federation
  -> Artifact Registry exact image digest
  -> Cloud Run no-traffic tagged revision
  -> synthetic positive/negative smoke
  -> optional explicit 100% traffic promotion
  -> Vercel-hosted MyeongHa calls public HTTPS origin with application Bearer
```

The Cloud Run endpoint is intentionally reachable over public HTTPS because the caller is outside Google Cloud. Application authorization remains the Saju service Bearer. Public network reachability is not authorization.

## 2. One-time Google Cloud prerequisites

Before the production workflow can succeed, an owner/operator must establish:

- billing-enabled Google Cloud project,
- Cloud Run API,
- Artifact Registry API,
- Secret Manager API,
- IAM Credentials / Security Token Service requirements for Workload Identity Federation,
- Docker-format Artifact Registry repository in `asia-southeast1`,
- user-managed Cloud Run runtime service account,
- production deployer service account used through GitHub OIDC/WIF,
- Workload Identity Pool + Provider restricted to `gycha0109-beep/Saju`,
- active Saju Bearer Secret Manager secret,
- optional previous-Bearer secret for a bounded rotation window,
- existing Cloud Run service shell in `asia-southeast1`, configured for public invocation and zero product traffic until the first verified Saju candidate is promoted.

The Google Cloud project number is a bootstrap/WIF configuration input when constructing provider resource names. It is **not** a routine GitHub deployment variable because the configured Workload Identity Provider resource already carries that identity.

The existing-service prerequisite is deliberate. It lets the routine GitHub deployer be scoped to the designated Cloud Run service rather than granting project-wide service-creation authority merely for deployments.

The bootstrap revision must never be treated as a Saju production artifact. It receives no product traffic and is replaced by an exact-digest Saju revision before activation.

## 3. Public invocation setting

Current Google Cloud guidance supports disabling the Cloud Run Invoker IAM check for a public service. The one-time bootstrap must configure the designated service for public HTTPS invocation using the provider-supported public-access setting. The routine GitHub workflow does not repeatedly mutate this IAM/security setting.

Application authorization remains:

```text
Authorization: Bearer <SAJU_PRODUCTION_SERVICE_BEARER>
```

A request with no Bearer or the wrong Bearer must receive `401 HOST_AUTH_REQUIRED` even though the Cloud Run network endpoint itself is public.

## 4. IAM minimums

Use resource-scoped bindings wherever Google Cloud permits them.

### GitHub deployer service account

Required capabilities:

- push/read images in the designated Artifact Registry repository,
- update the designated Cloud Run service and create revisions,
- configure Secret Manager references on the designated Cloud Run service,
- act as the designated runtime service account,
- access only the active/previous Saju Bearer secrets for prerequisite proof and deployment smoke,
- inspect Cloud Run service/revision status.

Typical predefined-role mapping:

- `roles/artifactregistry.writer` on the designated Artifact Registry repository,
- Cloud Run permissions sufficient to update/configure the designated service; Secret Manager integration can require `roles/run.admin` on that service,
- `roles/iam.serviceAccountUser` on the designated runtime service account,
- `roles/secretmanager.secretAccessor` on the designated Saju Bearer secrets.

The workflow derives the pushed image digest directly from the authenticated `docker push` result. It does **not** require a separate Artifact Registry image-describe/Container Analysis lookup merely to recover the digest.

Do not grant project Owner or Editor to the GitHub deployer.

### Cloud Run runtime service account

Required capability:

- `roles/secretmanager.secretAccessor` on the Saju Bearer secrets referenced by the revision.

The calculation service currently has no other Google Cloud API dependency and therefore needs no broad project role.

### Workload Identity Federation

The WIF provider admission condition and service-account impersonation binding must restrict GitHub identity to the intended repository. Prefer a condition that also narrows the expected owner/repository and, where operationally practical, the production workflow/ref/environment.

Long-lived Google service-account JSON keys are not the normal deployment mechanism.

## 5. GitHub production environment

Create/configure GitHub environment:

```text
production-saju
```

The workflow's `environment: production-saju` declaration alone does not prove that review protection exists. Configure the environment's deployment protection/authorized branch policy explicitly in GitHub before treating it as an approval gate.

Because Saju `main` is currently unprotected, this environment protection is a compensating control, not a reason to leave source governance unresolved.

## 6. Required GitHub variables

Configure these as repository or `production-saju` environment variables as appropriate:

```text
GCP_PROJECT_ID
GCP_WORKLOAD_IDENTITY_PROVIDER
GCP_DEPLOYER_SERVICE_ACCOUNT
GCP_ARTIFACT_REGISTRY_REPOSITORY
GCP_CLOUD_RUN_SERVICE
GCP_CLOUD_RUN_RUNTIME_SERVICE_ACCOUNT
GCP_SAJU_ACTIVE_BEARER_SECRET
GCP_SAJU_PREVIOUS_BEARER_SECRET        # may be empty outside rotation
GCP_CLOUD_RUN_CPU
GCP_CLOUD_RUN_MEMORY
GCP_CLOUD_RUN_CONCURRENCY
GCP_CLOUD_RUN_MAX_INSTANCES
```

No Saju Bearer value is stored in GitHub variables.

`GCP_CLOUD_RUN_CONCURRENCY` and `GCP_CLOUD_RUN_MAX_INSTANCES` must be finite positive integers. CPU/memory/concurrency/max values are deployment configuration and must be chosen from measured or deliberately conservative initial capacity assumptions; they are not SLO claims.

## 7. Deployment toolchain pinning

The production workflow has privileged OIDC/deployment authority, so third-party/official GitHub actions are pinned to exact commit SHAs rather than floating major tags.

Current reviewed pins at implementation time:

```text
actions/checkout v7
  3d3c42e5aac5ba805825da76410c181273ba90b1

actions/setup-node v7
  820762786026740c76f36085b0efc47a31fe5020

google-github-actions/auth v3
  7c6bc770dae815cd3e89ee6cdf493a5fab2cc093

google-github-actions/setup-gcloud v3
  aa5489c8933f4cc7a4f7d45035b3b1440c9c10db
```

Google Cloud CLI is pinned to:

```text
583.0.0
```

Pin updates are explicit reviewed changes. They are not silently advanced during production deployment.

The auth action can create temporary `gha-creds-*.json` credentials. `.gitignore` and `.dockerignore` both exclude that pattern so generated credentials cannot enter source control or the production image context.

## 8. Secret Manager contract

Runtime environment names are fixed by the Saju process:

```text
SAJU_PRODUCTION_SERVICE_BEARER
SAJU_PRODUCTION_PREVIOUS_SERVICE_BEARER
```

The GitHub workflow takes numeric secret-version inputs and binds explicit Secret Manager versions.

Rules:

- active version is mandatory,
- previous version is optional and only present during rotation,
- no `latest` version is production provenance,
- prerequisite validation performs `gcloud secrets versions access ... >/dev/null`; this proves the requested version is readable/enabled without emitting its value,
- no secret value is committed, included in an image, printed in the workflow summary, or returned in smoke output,
- after rotation verification, previous credential binding is removed and the old version is disabled/destroyed under the credential runbook.

## 9. Artifact authority

Production image path:

```text
asia-southeast1-docker.pkg.dev/<project>/<repository>/saju-production:git-<40-char-sha>
```

The authenticated Docker push returns the registry digest. The workflow validates the digest format and deploys:

```text
asia-southeast1-docker.pkg.dev/<project>/<repository>/saju-production@sha256:<digest>
```

The digest is the deployment artifact authority. The Git tag is only a source lookup aid.

The workflow refuses a requested SHA unless it is the exact current `origin/main` head. It checks again after verification and immediately before promotion. If `main` moves, stale promotion is blocked.

Historical rollback uses the previous Cloud Run revision/digest, not a new workflow invocation pretending an old SHA is current main.

## 10. Candidate verification

The workflow deploys a new Cloud Run revision with:

```text
0% production traffic
candidate-<12-char-source-sha> traffic tag
PORT=8080
startup probe -> /health
liveness probe -> /health
service-level min instances = 0
finite service-level max instances
explicit per-instance concurrency
explicit CPU/memory
exact Secret Manager versions
```

`gcloud run deploy` uses the current stable Cloud SDK contract supporting `--no-traffic`, tagged revision access, `--deploy-health-check`, startup/liveness probes, explicit concurrency, service-level min/max settings, and Secret Manager bindings.

The tagged URL is then tested with `scripts/verify-production-calculation-service.mjs`.

Required smoke behavior:

- `GET /health` -> 200 JSON + `Cache-Control: no-store`,
- valid synthetic calculation with no Bearer -> 401,
- valid synthetic calculation with wrong Bearer -> 401,
- valid synthetic calculation with active Bearer -> 200 JSON,
- no tested response reflects the active Bearer,
- no redirect is accepted by the verifier.

The synthetic Birth payload is a fixed test fixture and is not a production-user record.

## 11. Promotion

Default manual-dispatch input:

```text
promote = false
```

This builds and verifies a no-traffic candidate only.

For production traffic migration, explicitly dispatch with:

```text
promote = true
```

After candidate smoke and a final current-main check, the workflow performs:

```text
gcloud run services update-traffic <service> \
  --region asia-southeast1 \
  --to-tags candidate-<sha12>=100
```

It then runs the same authenticated smoke against the stable service URL.

Provider deployment success without both candidate smoke and requested post-promotion smoke is not production acceptance.

## 12. Rollback

Before deployment, the workflow records the currently serving revision name(s) in its step summary.

For a single previous healthy revision:

```text
gcloud run services update-traffic <service> \
  --project <project> \
  --region asia-southeast1 \
  --to-revisions <previous-revision>=100
```

After rollback, run:

```text
SAJU_SMOKE_BASE_URL=<stable-service-origin> \
SAJU_SMOKE_BEARER=<active-bearer-from-secure-source> \
node scripts/verify-production-calculation-service.mjs
```

Never paste the Bearer into an issue, PR, shell history capture, or incident report.

If the previous revision is incompatible with current MyeongHa API expectations, do not rollback blindly; use the MyeongHa<->Saju compatibility gate and choose a coordinated roll-forward/rollback.

## 13. Bearer rotation sequence

The runtime supports active + optional previous credential.

Zero-downtime rotation sequence:

```text
1. create new Secret Manager version/value
2. deploy Saju candidate with new active + old previous
3. candidate smoke using new active
4. promote Saju candidate
5. update MyeongHa MYEONGHA_SAJU_SERVICE_BEARER to new value
6. verify authenticated MyeongHa -> Saju E2E
7. deploy Saju revision with previous binding removed
8. verify old credential is rejected
9. disable/destroy old secret version under retention policy
```

Do not remove the previous credential before MyeongHa is verified on the new active credential.

## 14. Cold-start gate

Initial architecture allows service-level minimum instances `0`.

Before closing production activation, measure at least:

- cold candidate first request,
- warm calculation latency,
- MyeongHa->Saju network + calculation latency,
- p50/p95/p99 under the initial controlled load profile.

If cold-start behavior materially consumes the MyeongHa caller's current 5-second timeout, set service-level minimum instances to `1` or revise the caller timeout only through the performance/reliability decision process. Do not silently raise the timeout to hide capacity/startup defects.

## 15. Failure conditions

The workflow must fail closed when any of the following occurs:

- missing required GitHub variable,
- non-exact/non-current source SHA,
- missing Artifact Registry repository,
- missing Cloud Run service bootstrap,
- unreadable/disabled requested secret version,
- repository verification failure,
- local container smoke failure,
- image digest parse/validation failure,
- Cloud Run candidate health failure,
- candidate positive/negative smoke failure,
- source main moves before candidate or promotion,
- post-promotion smoke failure.

A failed post-promotion smoke is an incident requiring immediate rollback/containment; the workflow does not silently report success.

## 16. Still-open activation work

This repository implementation does not itself prove:

```text
GCP project/billing exists
APIs are enabled
IAM is correctly scoped
WIF is configured
GitHub environment protection is configured
Artifact Registry exists
Cloud Run bootstrap service exists
Secret Manager versions exist
actual production deploy succeeded
MyeongHa origin/bearer is bound
production E2E passed
cold-start/load thresholds are acceptable
monitoring/alerts exist
rollback drill passed
```

Until those are evidenced, status remains:

```text
Cloud Run deployment implementation: PREPARED
Saju production hosting: NOT ACTIVATED
Production Operations Complete: NO
```
