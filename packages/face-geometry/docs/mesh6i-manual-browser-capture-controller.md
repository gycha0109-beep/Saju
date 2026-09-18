# MESH6I — Manual Browser Capture Controller

MESH6I binds the browser camera adapter from MESH6H to the prospective operator capture session from MESH6G.

The Saju repository does not currently provide a browser product host. MESH6I therefore stops at the engine-side controller boundary that a later operator page can call.

## Runtime flow

```text
manual operator trigger stream
  -> MESH6H browser camera handle
  -> one MESH6G frame source per sweep
  -> MESH6G prospective capture session
  -> MESH6F descriptive acquisition dataset
```

MESH6I does not create a UI, synthesize capture events, or choose frames.

## Input boundary

Each controller run requires:

```text
active-issued MESH6H browser camera handle
canonical asset digest
geometry metadata
FR76 parity authority
MESH5.1 weighted region adapter
one or more manual sweep plans
```

Each manual sweep plan contains:

```text
MESH6E manifest input
AsyncIterable<MESH6H explicit operator trigger>
```

Copied or forged MESH6H handles are rejected by the active issuance boundary.

## Trigger semantics

MESH6I delegates every sweep trigger stream directly to:

```text
camera.createSweepFrameSource(triggers)
```

It does not:

```text
create missing triggers
change trigger timestamps
sort triggers
drop triggers
choose a best frame
apply pose filters
apply capture-quality filters
```

Ordering and timestamp admission remain governed by MESH6H and MESH6G.

## Camera ownership

Default:

```text
controller_closes_after_session
```

The controller closes the MESH6H camera in `finally` after success or failure.

A caller may explicitly choose:

```text
caller_retains_camera
```

In that mode the caller remains responsible for closing the MESH6H handle.

MESH6I does not stop MediaStream tracks directly. Track lifecycle remains delegated to MESH6H.

## Shared runtime

MESH6I does not create a second geometry pipeline.

It calls the existing MESH6G session runtime, preserving:

```text
one shared MediaPipe runtime per session
borrowed per-frame runtime close = no-op
shared runtime close exactly once
sequential frame iteration
strict timestamp ordering
```

## Output

The controller returns:

```text
MESH6I bounded execution metadata
active-issued MESH6G session artifact
MESH6F descriptive dataset nested through MESH6G
```

It does not accept an externally prebuilt MESH6G session.

## Privacy boundary

MESH6I does not add or persist:

```text
raw image
raw video
raw provider response
raw landmark set
derived full-face metric geometry
face embedding
identity template
```

The only live image objects exist inside the MESH6H/MESH6G processing lifecycle and are not copied into the controller result.

## Authority boundary

A successful controller run means only that the manual browser-capture pipeline executed.

It does not establish:

```text
independent physical freshness proof
participant identity proof
repeatability
capture-quality validity
pose acceptance
classification
numeric threshold
confidence score
population norm
calibration
production morphology admission
anatomical measurement
beauty interpretation
traditional physiognomy interpretation
```

MESH6E attestations remain attestations, not independent proofs.

## Verification

The dedicated verifier uses exact MediaPipe release witnesses and an exact regenerated MESH5.1 weighted adapter.

It verifies:

- two manual sweep plans become two MESH6G sweeps;
- four explicit triggers become four processed frames with no synthesis;
- one shared MediaPipe runtime is created and closed exactly once;
- every MESH6H bitmap closes exactly once;
- default controller ownership closes the camera on success;
- controller ownership closes the camera on downstream admission failure;
- caller-retained ownership leaves the camera open until the caller closes it;
- copied/forged MESH6H handles fail closed;
- raw capture/full-geometry fields do not appear in the controller result;
- no threshold, calibration, confidence, production, anatomical, beauty, or traditional authority is widened.

Synthetic verifier captures prove mechanics only. They are not empirical prospective participant evidence.

## Next frontier

Mount MESH6I in an actual browser/product operator page and collect real post-preregistration repeated sweep datasets.

No numeric calibration proposal is justified until real inspectable prospective capture data exists.
