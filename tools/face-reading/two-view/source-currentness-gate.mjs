// Browser-local request freshness gate. Probe returns only a fixed status;
// no source paths, bytes, digests or model/reviewer data leave the client.
export const SOURCE_CURRENTNESS_GATE_VERSION = 'local-face-source-currentness-gate@0.1.0';

export function createSourceCurrentnessGate({ probe, onBlocked }) {
  if (typeof probe !== 'function' || typeof onBlocked !== 'function')
    throw Error('SOURCE_CURRENTNESS_GATE_INVALID');

  let blocked = false;
  let pending = null;
  async function check() {
    if (blocked) return false;
    if (pending) return pending;
    pending = (async () => {
      let status = 'check_failed';
      try {
        status = await probe();
      } catch {
        // When the local review server is unreachable, stale observations
        // must not remain visible as if the source were verified.
      }
      if (blocked) return false;
      if (status === 'current') return true;
      blocked = true;
      onBlocked(status === 'source_changed' ? 'source_changed' : 'check_failed');
      return false;
    })();
    try {
      return await pending;
    } finally {
      pending = null;
    }
  }
  return Object.freeze({
    check,
    get blocked() {
      return blocked;
    },
  });
}
