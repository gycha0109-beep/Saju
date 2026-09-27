# FR300-R2D-AQ — AST Controlled Access Request Gate

Watchtower-Track: face-engine

## Decision

The user has explicitly authorized the authenticated AST-Face controlled-access workflow.

Authorized actions now include:

- authenticated OSF DUA retrieval;
- authoritative DUA review;
- rights adjudication;
- controlled-access request execution if authoritative rights are compatible;
- bounded rights clarification if authoritative rights are ambiguous.

This authorization does **not** fabricate an authenticated OSF/browser session, signer identity, authoritative DUA review, signature, request submission, provider acknowledgement, or controlled access.

Canonical current disposition:

```text
user_authorized_external_execution_blocked_authenticated_osf_session_required
```

## Current external blocker

The current tool environment does not expose an authenticated OSF session.

Public OSF retrieval remains forbidden/insufficient for the authoritative document.

Therefore:

```text
authenticatedOsfSessionAvailable = false
authoritativeDuaRetrieved = false
authoritativeDuaReviewed = false
signerIdentityBound = false
duaSigned = false
requestSubmitted = false
```

## State machine

The controlled-access flow is fail-closed:

```text
dua_retrieval_required
→ dua_under_review
→ one of:
   rights_compatible_ready_to_submit
   rights_clarification_required
   rights_incompatible_terminal_hold

compatible only:
→ submitted
→ verification_pending
→ approved | rejected | clarification_requested
```

No raw participant artifact may be downloaded in R2D.

## Authoritative DUA gate

The GitHub DUA mirror remains non-authoritative.

Rights compatibility may not be issued until:

1. authenticated OSF access is available;
2. the authoritative DUA is retrieved;
3. the authoritative file is hashed;
4. its text is reviewed.

A retrieved authoritative DUA requires a SHA-256 receipt.

## Rights adjudication

Allowed rights states:

```text
not_reviewed
compatible
ambiguous
incompatible
```

Rules:

- no non-`not_reviewed` state before authoritative review;
- ambiguous rights route to clarification;
- incompatible rights route to terminal HOLD for current AST use;
- only compatible rights may reach signature/submission readiness.

## Signature gate

A signed DUA requires all of:

```text
authoritative DUA reviewed
rights = compatible
signer identity bound
signature explicitly authorized
```

A signature is never inferred from user authorization alone.

## Request submission gate

Submission requires:

```text
rights = compatible
DUA signed
submission authorized
submittedAtUtc present
```

Provider acknowledgement/access state cannot advance before submission.

## User authorization boundary

The user explicitly authorized execution of the access workflow if compatible.

This stage records:

```text
accessRequestExecutionAuthorizedByUser = true
```

but preserves:

```text
accessRequestActuallySubmitted = false
controlledAccessApproved = false
```

until external evidence exists.

## Request packet

R2C's minimum pilot packet remains authoritative.

It requests only:

- neutral raw 3D;
- corresponding frontal RGB;
- subject/capture manifest or equivalent;
- metric-scale metadata.

It explicitly excludes:

- identity recognition;
- biometric verification;
- surveillance;
- tracking;
- demographic profiling;
- raw artifact redistribution.

Raw participant artifacts remain prohibited in Git/Git LFS.

## Clarification path

If the authoritative DUA is ambiguous, the already prepared three-question clarification packet may be sent under the user authorization now granted.

Controlled data access may not be requested while rights remain ambiguous.

## Access approval boundary

Even if provider access is eventually approved in R2D:

```text
rawParticipantArtifactUseAuthorized = false
FR299 reference materialized = false
FR300-R2 authorized = false
```

Raw artifact intake belongs to the later R2E-INTAKE stage.

## Current product boundary

```text
FR299 = 0
FR300-R2 = 0
Product = 18/29
paid spend = 0
production = inactive
commerce = inactive
```

## Next executable action

The next executable external action is:

```text
connect an authenticated browser/session
→ open OSF AST project
→ retrieve authoritative DUA
→ hash + review
→ adjudicate rights
```

If rights are compatible, continue to signer binding and request submission.

If ambiguous, send clarification only.

If incompatible, do not request controlled access.

Watchtower-Track: face-engine
