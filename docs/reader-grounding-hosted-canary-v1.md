# Reader Grounding Hosted Canary V1

## Goal

Prove the bounded MyeongHa Reader Preview path against the actually serving Saju Production Cloud Run revision without changing Production traffic or enabling any public Reader Interpretation surface.

## Authority prerequisites

The canary admits two exact source identities:

- Saju: an exact 40-character deployed source SHA that contains merge commit `b17896099a4919124dfa67ed6f0ada265e460501` from Saju PR #1143.
- MyeongHa: an exact 40-character SHA whose `test/saju-character-grounding-cross-service.e2e.test.ts` resolves to reviewed blob `a747b4f9bb8596a96e2ee705028a92c40bae1199` from MyeongHa PR #1173.

The MyeongHa harness is admitted by immutable blob identity rather than commit ancestry, so safe branch reconstruction/rebase does not invalidate the reviewed test authority.\n\nThe canary does not trust `/health` alone as deployment identity.

## Deployment identity

The workflow reads the Cloud Run control plane and requires:

1. exactly one active revision;
2. exactly 100% total Production traffic;
3. a digest-qualified active image;
4. the Artifact Registry tag `git-<expected_saju_sha>` to resolve to the exact active digest;
5. the active revision to reference the configured Saju active Bearer secret at an exact numeric version.

This binds the network probe to the deployed artifact rather than merely proving that some server answered.

## Credential handling

The active Bearer is resolved from the exact Secret Manager version referenced by the active Cloud Run revision.

- the value is masked immediately;
- it is passed only to the MyeongHa adapter process;
- it is never written to the evidence artifact;
- the workflow retains only revision/image/source identity.

## Executed hosted path

```text
GitHub hosted canary
→ Cloud Run deployment identity admission
→ stable Saju Production origin /health
→ MyeongHa exact canary harness
→ real HTTPS service Bearer request
→ Saju /api/character-grounding
→ Saju CharacterGroundingBundleV1 admission
→ MyeongHa source/grounding identity checks
→ reviewed Reader perspective
→ bounded renderer
→ semantic preservation guard
→ Reader Preview envelope
```

The negative path also proves:

- wrong Bearer → hosted Saju HTTP 401;
- revoked Reader → no grounding transport call.

## Execution policy

- trigger: manual `workflow_dispatch` only;
- GitHub environment: `production-saju`;
- no Cloud Run, traffic, IAM, Secret Manager, or Artifact Registry mutation;
- hard job timeout: 7 minutes;
- HTTP connect timeout: 5 seconds;
- HTTP health max time: 15 seconds;
- MyeongHa grounding adapter timeout remains 5 seconds.

## Activation boundary

A GREEN canary proves only that the deployed Saju revision can serve the bounded Reader grounding path.

It does not authorize:

- public Reader Interpretation activation;
- Production Reader route activation;
- Product Offers;
- Charge Terms;
- PortOne;
- payment;
- any Production traffic mutation.

Those remain separate explicit approval gates.

## Current deployment prerequisite

The last documented successful Production deployment source is `6c90c9a941963604991477caba76051837cae824`. Git history places Saju PR #1143 merge commit `b17896099a4919124dfa67ed6f0ada265e460501` 681 commits after that source.

Therefore the Hosted Canary must fail closed until Production is deliberately redeployed to an admitted Saju source containing PR #1143. The deployment workflow itself has a 45-minute timeout and is not part of this canary.
