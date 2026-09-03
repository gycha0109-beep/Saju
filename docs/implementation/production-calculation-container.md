# Production Calculation Container

The repository exposes a provider-neutral OCI image for the independently deployed Saju calculation-only process.

This container is transport composition only. It does not make the Saju repository a product website, add `/api/readings`, or move MyeongHa identity, persistence, entitlement, or interpretation authority into this service.

## Runtime contract

The image runs:

```text
node dist/production-calculation-server.js
```

Required environment:

```text
SAJU_PRODUCTION_SERVICE_BEARER
```

Optional environment:

```text
SAJU_PRODUCTION_PREVIOUS_SERVICE_BEARER
SAJU_PRODUCTION_HOST                    default: 0.0.0.0
PORT                                    default: 3000
```

The active service Bearer remains mandatory and startup fails closed when it is missing or invalid. The previous Bearer exists only for credential rotation.

## HTTP boundary

```text
GET  /healthz           public health probe
POST /api/calculations  Bearer-authenticated calculation-only request
/api/readings            unavailable
```

The container does not receive MyeongHa database credentials, Member/Guest credentials, or user-data authority.

## Build

```bash
docker build -t myeonghwa-saju-production .
```

The multi-stage build installs root-workspace dependencies only, compiles `src` into `dist`, prunes development dependencies, and copies only the compiled runtime plus production dependencies into the final image. The final process runs as the non-root `node` user.

## Run

```bash
docker run --rm \
  -p 3000:3000 \
  -e SAJU_PRODUCTION_SERVICE_BEARER='<provisioned-service-credential>' \
  myeonghwa-saju-production
```

Do not commit or bake the credential into the image. Provision it through the selected runtime platform's secret/environment mechanism.

## Verification gate

`.github/workflows/production-calculation-container.yml` builds and boots the exact repository image on pull requests and `main` pushes. It verifies:

- final image user is non-root `node`;
- `/healthz` returns HTTP 200;
- unauthenticated `/api/calculations` fails with HTTP 401;
- the active Bearer reaches request authorization before malformed-body validation (HTTP 400);
- an incorrect Bearer returns HTTP 401;
- the active service credential is not reflected in tested HTTP responses or container logs.

Actual production activation remains separate from this image gate: a runtime host, service origin, and active credential must be provisioned and then bound into MyeongHa as `MYEONGHA_SAJU_SERVICE_ORIGIN` and `MYEONGHA_SAJU_SERVICE_BEARER`.
