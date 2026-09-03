# Production Calculation Process V1

## Purpose

This repository now exposes a provider-neutral Node.js process composition for the already-governed production calculation HTTP host.

The process exists so an independently deployed internal Saju calculation service can start from the verified engine revision without adding a Vercel-specific API surface or a product-reading deployment surface.

## Runtime command

```bash
npm run build
npm run start:production-calculation
```

The executable is `dist/production-calculation-server.js` and requires Node.js 24.

## Environment contract

| Variable | Required | Default | Meaning |
| --- | --- | --- | --- |
| `SAJU_PRODUCTION_SERVICE_BEARER` | yes | none | Active service-to-service Bearer credential for `POST /api/calculations` |
| `SAJU_PRODUCTION_PREVIOUS_SERVICE_BEARER` | no | unset | Previous credential accepted during explicit rotation windows |
| `SAJU_PRODUCTION_HOST` | no | `0.0.0.0` | TCP bind host |
| `PORT` | no | `3000` | TCP port, integer `1..65535` |

Bearer values must be non-empty and contain no whitespace. The active credential is mandatory and startup fails closed when it is missing or invalid. Configuration errors identify the environment variable but never echo the credential value.

## HTTP boundary

The process reuses `createMyeonghwaProductionCalculationHostServer` without changing its authority contract:

- `GET /healthz` is public.
- `POST /api/calculations` requires the active or explicitly configured previous Bearer credential.
- Authentication occurs before request-body parsing.
- `/api/readings` remains unavailable from the production calculation host.
- Existing deterministic calculation and response serialization remain owned by the engine host.

## Deployment boundary

This is process composition only. It does not create or assume:

- a Vercel project or `api/` directory;
- a public website deployment for the Saju repository;
- a production service origin;
- a generated service credential;
- a reading or interpretation product endpoint;
- client-owned authority over service origin or credentials.

The hosting platform must provide a Node.js 24 process, bind the environment contract above, and keep the calculation service network exposure consistent with the consuming application architecture. The consumer service origin and credential must be provisioned separately and remain server-owned.
