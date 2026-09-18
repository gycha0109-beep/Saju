import { readFileSync } from 'node:fs';
import process from 'node:process';
import {
  assertLanRequestAllowed,
  isPrivateOrLoopbackAddress,
  normalizeRemoteAddress,
} from './mesh6j-private-lan-transport.mjs';

const serverPath = 'scripts/mesh6j-manual-browser-capture-preview.mjs';
const clientPath = 'tools/face-geometry/capture/mesh6j-operator-capture.mjs';
const pagePath = 'tools/face-geometry/capture/mesh6j-operator-capture.html';

const server = readFileSync(serverPath, 'utf8');
const client = readFileSync(clientPath, 'utf8');
const page = readFileSync(pagePath, 'utf8');

function expect(condition, message) {
  if (!condition) throw new Error(message);
}

function expectIncludes(source, needle, message) {
  expect(source.includes(needle), message + ' Missing: ' + needle);
}

function expectExcludes(source, needle, message) {
  expect(!source.includes(needle), message + ' Forbidden: ' + needle);
}

expectIncludes(server, "const LOCALHOST_HOST = '127.0.0.1';", 'MESH6J default bind must remain localhost.');
expectIncludes(server, "const LAN_HOST = '0.0.0.0';", 'MESH6J.1 explicit LAN mode must expose a separate bind address.');
expectIncludes(server, "const LAN_MODE = process.env.MESH6J_LAN === '1' || LAN_SMOKE;", 'MESH6J.1 LAN mode must be opt-in.');
expectIncludes(server, "LAN_MODE ? LAN_HOST : LOCALHOST_HOST", 'MESH6J must choose LAN bind only after explicit opt-in.');
expectIncludes(server, "LAN mode requires MESH6J_TLS_KEY and MESH6J_TLS_CERT.", 'MESH6J.1 must fail closed without TLS material.');
expectIncludes(server, "createSecureServer(tls, requestHandler)", 'MESH6J.1 LAN mode must use HTTPS.');
expectIncludes(server, "assertLanRequestAllowed(request.socket.remoteAddress)", 'MESH6J.1 must reject non-private remote clients.');
expectIncludes(server, "transportMode: LAN_MODE ? 'private_lan_https' : 'localhost_http'", 'MESH6J runtime config must disclose transport mode.');
expectIncludes(server, "request.method !== 'GET'", 'MESH6J server must reject non-GET methods.');
expectIncludes(server, "allow: 'GET'", 'MESH6J server must advertise GET-only routing.');
expectIncludes(server, "rawCapturePersistenceEnabled: false", 'MESH6J runtime config must deny raw-capture persistence.');
expectIncludes(server, "calibrationAuthorized: false", 'MESH6J runtime config must deny calibration authority.');
expectIncludes(server, "productionMorphologyAuthorized: false", 'MESH6J runtime config must deny production morphology authority.');
expectIncludes(server, "METADATA_BLOB_SHA = '252a7b05b24c5c43c5b94179393639f7c9a2fe8f'", 'MESH6J must pin exact geometry metadata blob.');
expectIncludes(server, "project_gnm_regions_to_mediapipe468_weighted.py", 'MESH6J must regenerate the exact weighted adapter.');
expectIncludes(server, "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net", 'MESH6J CSP must permit only the inline import map plus pinned self/CDN scripts.');
expectIncludes(server, "'permissions-policy': 'camera=(self)'", 'MESH6J must restrict camera permission to self.');
expectIncludes(server, "MYEONGHWA_MESH6J_SMOKE", 'MESH6J server must expose deterministic localhost smoke mode.');
expectIncludes(server, "MYEONGHWA_MESH6J_LAN_SMOKE", 'MESH6J.1 server must expose deterministic LAN HTTPS smoke mode.');

for (const forbidden of [
  "request.method === 'POST'",
  "request.method === 'PUT'",
  "request.method === 'PATCH'",
  "request.method === 'DELETE'",
  "rawImage",
  "rawVideo",
  "MediaRecorder",
]) {
  expectExcludes(server, forbidden, 'MESH6J server must expose no upload/raw-capture persistence path.');
}

expect(normalizeRemoteAddress('::ffff:192.168.1.20') === '192.168.1.20', 'IPv4-mapped IPv6 normalization drift.');
for (const address of [
  '127.0.0.1',
  '10.1.2.3',
  '172.16.0.1',
  '172.31.255.254',
  '192.168.0.42',
  '169.254.10.20',
  '::1',
  'fc00::1',
  'fd12:3456::1',
  'fe80::1234',
  '::ffff:192.168.1.9',
]) {
  expect(isPrivateOrLoopbackAddress(address), 'Expected private/loopback admission for ' + address);
  assertLanRequestAllowed(address);
}

for (const address of [
  '8.8.8.8',
  '1.1.1.1',
  '172.15.0.1',
  '172.32.0.1',
  '192.0.2.1',
  '2001:4860:4860::8888',
  '',
]) {
  expect(!isPrivateOrLoopbackAddress(address), 'Expected public/invalid denial for ' + address);
  let denied = false;
  try {
    assertLanRequestAllowed(address);
  } catch {
    denied = true;
  }
  expect(denied, 'Expected LAN request denial for ' + address);
}

expectIncludes(page, 'id="fresh-attestation"', 'MESH6J page must require explicit freshness attestation.');
expectIncludes(page, 'id="participant-attestation"', 'MESH6J page must require explicit same-participant-series attestation.');
expectIncludes(page, 'id="capture-frame"', 'MESH6J page must expose an explicit one-frame capture control.');
expectIncludes(page, 'id="finish-sweep"', 'MESH6J page must expose manual sweep completion.');
expectIncludes(page, 'id="download-result"', 'MESH6J page must expose descriptive JSON download.');
expectIncludes(page, '__MEDIAPIPE_ENTRY__', 'MESH6J page must receive the installed pinned MediaPipe entry through an import map.');

expectIncludes(client, "openMesh6HBrowserCamera", 'MESH6J client must open camera only through MESH6H.');
expectIncludes(client, "runMesh6IManualBrowserCaptureController", 'MESH6J client must execute sessions only through MESH6I.');
expectIncludes(client, "cameraOwnership: 'caller_retains_camera'", 'MESH6J interactive session must retain camera ownership explicitly.');
expectIncludes(client, 'postPreregistrationFreshCaptureAttested: true', 'MESH6J must map the operator freshness attestation into MESH6E input.');
expectIncludes(client, 'sameParticipantSeriesAttested: true', 'MESH6J must map the operator participant-series attestation into MESH6E input.');
expectIncludes(client, 'usedForCandidateSelection: false', 'MESH6J must prohibit candidate-selection use.');
expectIncludes(client, 'developmentCaptureReuse: false', 'MESH6J must prohibit development-capture reuse.');
expectIncludes(client, 'identityMatchingPerformed: false', 'MESH6J must prohibit identity matching.');
expectIncludes(client, 'performance.timeOrigin + performance.now()', 'MESH6J capture timestamps must originate from the explicit click-time monotonic browser clock.');
expectIncludes(client, 'await active.queues[index].push', 'MESH6J capture button must wait until exactly one explicit trigger is consumed.');
expectIncludes(client, 'active.queues[index].close()', 'MESH6J must end each sweep only through explicit queue closure.');
expectIncludes(client, "new Blob([payload], { type: 'application/json' })", 'MESH6J export must be the descriptive JSON artifact.');
expectIncludes(client, 'for (const queue of failedSession.queues) queue.close()', 'MESH6J must close outstanding trigger streams on session failure.');

for (const forbidden of [
  'setInterval(',
  'setTimeout(',
  'requestAnimationFrame(',
  'requestVideoFrameCallback(',
  'MediaRecorder',
  'localStorage',
  'sessionStorage',
  'indexedDB',
  'toDataURL(',
  'canvas.toBlob(',
  "method: 'POST'",
  'automaticFrameSelection',
  'poseScore',
  'qualityScore',
  'confidenceScore',
  'repeatabilityThreshold',
  'captureQualityThreshold',
  'poseAcceptanceThreshold',
]) {
  expectExcludes(client, forbidden, 'MESH6J executable client must not automate, persist, score, or threshold capture.');
}

expectExcludes(client, 'throw error;', 'MESH6J session promise must not create an unhandled rejection after UI failure handling.');

const importCount = (client.match(/runMesh6IManualBrowserCaptureController/g) || []).length;
expect(importCount === 2, 'MESH6J should import and invoke the MESH6I controller exactly once each.');

process.stdout.write(JSON.stringify({
  status: 'MESH6J_MANUAL_BROWSER_CAPTURE_SURFACE_CONTRACT_PASS',
  defaultLocalhostVerified: true,
  optInPrivateLanHttpsVerified: true,
  nonPrivateRemoteDenialVerified: true,
  getOnlyServerVerified: true,
  explicitManualTriggerVerified: true,
  manifestAttestationsVerified: true,
  noAutomaticCaptureVerified: true,
  noRawCapturePersistenceVerified: true,
  descriptiveJsonOnlyVerified: true,
  noThresholdOrCalibrationAuthorityVerified: true,
}) + '\n');
