import { isIP } from 'node:net';

export function normalizeRemoteAddress(address) {
  if (typeof address !== 'string' || address.length === 0) return null;
  if (address.startsWith('::ffff:')) return address.slice('::ffff:'.length);
  const zone = address.indexOf('%');
  return zone >= 0 ? address.slice(0, zone) : address;
}

export function isPrivateOrLoopbackAddress(address) {
  const normalized = normalizeRemoteAddress(address);
  if (normalized === null) return false;

  const family = isIP(normalized);
  if (family === 4) {
    const octets = normalized.split('.').map(Number);
    const [a, b] = octets;
    if (a === 127) return true;
    if (a === 10) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 169 && b === 254) return true;
    return false;
  }

  if (family === 6) {
    const lower = normalized.toLowerCase();
    if (lower === '::1') return true;
    const first = Number.parseInt(lower.split(':')[0] || '0', 16);
    if ((first & 0xfe00) === 0xfc00) return true;
    if ((first & 0xffc0) === 0xfe80) return true;
    return false;
  }

  return false;
}

export function assertLanRequestAllowed(remoteAddress) {
  if (!isPrivateOrLoopbackAddress(remoteAddress)) {
    const error = new Error('MESH6J.1 denied non-private remote address.');
    error.code = 'MESH6J_LAN_REMOTE_DENIED';
    throw error;
  }
}
