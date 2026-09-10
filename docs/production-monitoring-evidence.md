# Saju Production Monitoring Evidence

## Purpose

`.github/workflows/production-monitoring-evidence.yml` collects read-only provider evidence for the Production Saju Cloud Run service. It exists to distinguish actual Google Cloud Monitoring configuration from repository assumptions.

The workflow is evidence collection, not alert provisioning. It does not create, update, delete, enable, disable, or otherwise mutate Cloud Monitoring resources. It does not change Cloud Run traffic, revisions, IAM, Secret Manager, or application state.

## Evidence collected

Each successful collection binds the snapshot to:

- UTC capture timestamp,
- Google Cloud project and region,
- exact currently serving Cloud Run revision,
- exact digest-qualified serving image,
- 100 percent serving traffic state,
- current alerting policies readable through Cloud Monitoring,
- policy condition filters/queries and threshold configuration,
- notification-channel resource references,
- referenced channel type and verification status.

Notification-channel destination labels and destination values are intentionally excluded from retained artifacts.

## Coverage classification

The evidence workflow classifies a policy as Cloud Run-targeted when its condition filter/query references the Cloud Run revision resource type or Cloud Run metrics. It classifies coverage of the current Saju service when either:

1. the condition explicitly contains the configured Saju Cloud Run service name, or
2. the condition is Cloud Run-wide in the project and contains no `service_name` matcher.

This is an evidence-selection heuristic over the provider-returned condition text. It is not a claim that every possible Monitoring query language construct has been semantically evaluated.

A successful workflow run proves that the provider configuration was readable and that the sanitized snapshot was produced. It does not by itself prove `Monitoring Ready`.

## Ownership boundary

The operational role for this runbook is the **Production operator**: a repository maintainer authorized to use the `production-saju` GitHub environment and the corresponding Google Cloud production identity.

This role definition does not identify a human on-call assignee. A human owner/on-call assignment must be evidenced separately before `monitoring/alert ownership` is considered closed.

## Incident response procedure

When a qualifying Saju Cloud Run alert fires, the Production operator must:

1. record the incident start time in UTC and the alert policy identity,
2. read the current Cloud Run service traffic and serving revision before taking action,
3. verify `/health` and authenticated calculation behavior using the governed production verifier,
4. compare the serving revision and image digest with the last accepted Production evidence,
5. contain the incident without changing traffic unless an exact rollback or roll-forward target has been verified,
6. if rollback is selected, use only a previously recorded real serving revision whose image/digest and compatibility are known; never infer a revision from sequence numbering,
7. after recovery, verify stable-service health, authenticated calculation, exact final traffic, serving revision, and image digest,
8. record the recovery time in UTC and retain the workflow/run evidence used for the decision.

If no exact compatible rollback target is available, Production traffic must not be switched to a guessed historical revision. Use containment or a verified roll-forward instead.

## Closure interpretation

The following are separate gates:

- **provider evidence readable**: Monitoring APIs were successfully read,
- **alert path present**: at least one enabled policy covers the current service and references an existing notification channel,
- **operational response defined**: this repository contains the incident response procedure above,
- **human owner/on-call evidenced**: an accountable human/on-call assignment is recorded in an approved operational source.

`Monitoring Ready` must not be claimed unless the applicable gates are all directly evidenced.