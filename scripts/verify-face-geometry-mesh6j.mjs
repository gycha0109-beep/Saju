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
const scriptSrcMatch = /script-src ([^;]+); connect-src/.exec(server);
expect(scriptSrcMatch !== null, 'MESH6J CSP script-src directive must be statically inspectable.');
const scriptSrcTokens = scriptSrcMatch[1].trim().split(/\s+/);
expect(scriptSrcTokens.includes("'wasm-unsafe-eval'"), 'MESH6J must narrowly permit WebAssembly compilation.');
expect(!scriptSrcTokens.includes("'unsafe-eval'"), 'MESH6J must not broaden CSP to unsafe-eval.');
expectIncludes(server, "'permissions-policy': 'camera=(self)'", 'MESH6J must restrict camera permission to self.');
expectIncludes(server, "MYEONGHWA_MESH6J_SMOKE", 'MESH6J server must expose deterministic localhost smoke mode.');
expectIncludes(server, "MYEONGHWA_MESH6J_LAN_SMOKE", 'MESH6J.1 server must expose deterministic LAN HTTPS smoke mode.');

for (const forbidden of [
  "request.method === 'POST'",
  "request.method === 'PUT'",
  "request.method === 'PATCH'",
  "request.method === 'DELETE'",
  'rawImage',
  'rawVideo',
  'MediaRecorder',
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

expectIncludes(page, 'id="prep-view"', 'MESH6J.3 must expose a preparation view.');
expectIncludes(page, 'id="capture-view"', 'MESH6J.3 must expose a dedicated capture view.');
expectIncludes(page, 'id="result-view"', 'MESH6J.3 must expose a result view.');
expectIncludes(page, 'id="fresh-attestation"', 'MESH6J page must require explicit freshness attestation.');
expectIncludes(page, 'id="participant-attestation"', 'MESH6J page must require explicit same-participant-series attestation.');
expectIncludes(page, 'id="start-capture"', 'MESH6J.3 preparation view must expose one capture-start control.');
expectIncludes(page, 'id="shutter"', 'MESH6J.3 capture view must expose a dedicated shutter control.');
expectIncludes(page, 'class="shutter"', 'MESH6J.3 shutter must use the camera-style shutter class.');
expectIncludes(page, '.shutter {', 'MESH6J.3 shutter styling must be explicit.');
expectIncludes(page, 'border-radius:50%;', 'MESH6J.3 shutter must be circular.');
expectIncludes(page, 'position:fixed;', 'MESH6J.3 capture view must be fixed to the viewport.');
expectIncludes(page, 'overflow:hidden;', 'MESH6J.3 capture view must prevent scrolling.');
expectIncludes(page, 'height:100dvh;', 'MESH6J.3 capture view must fit the mobile viewport.');
expectIncludes(page, 'id="sweep-progress"', 'MESH6J.3 capture view must show measurement progress.');
expectIncludes(page, 'id="frame-progress"', 'MESH6J.3 capture view must show per-sweep frame progress.');
expectIncludes(page, 'id="sweep-count" type="number" min="1" max="12" step="1" value="3"', 'MESH6J.3 default sweep count must be three.');
expectIncludes(page, 'id="frames-per-sweep" type="number" min="2" max="30" step="1" value="5"', 'MESH6J.3 default frames per sweep must be five and cannot be one.');
expectIncludes(page, 'id="download-result"', 'MESH6J.3 result view must expose descriptive JSON download.');
expectIncludes(page, 'id="retry-capture"', 'MESH6J.3 result view must allow another capture session.');
expectIncludes(page, 'id="result"', 'MESH6J.3 result view must expose bounded JSON preview.');
expectIncludes(page, '__MEDIAPIPE_ENTRY__', 'MESH6J page must receive the installed pinned MediaPipe entry through an import map.');

for (const removed of [
  'id="start-session"',
  'id="capture-frame"',
  'id="finish-sweep"',
  'id="capture-analyze"',
  'id="capture-count"',
]) {
  expectExcludes(page, removed, 'MESH6J.3 must not expose legacy session/sweep orchestration controls.');
}

expectIncludes(client, 'openMesh6HBrowserCamera', 'MESH6J client must open camera only through MESH6H.');
expectIncludes(client, 'runMesh6IManualBrowserCaptureController', 'MESH6J client must execute sessions only through MESH6I.');
expectIncludes(client, "cameraOwnership: 'caller_retains_camera'", 'MESH6J interactive session must retain camera ownership explicitly.');
expectIncludes(client, 'postPreregistrationFreshCaptureAttested: true', 'MESH6J must map the operator freshness attestation into MESH6E input.');
expectIncludes(client, 'sameParticipantSeriesAttested: true', 'MESH6J must map the operator participant-series attestation into MESH6E input.');
expectIncludes(client, 'usedForCandidateSelection: false', 'MESH6J must prohibit candidate-selection use.');
expectIncludes(client, 'developmentCaptureReuse: false', 'MESH6J must prohibit development-capture reuse.');
expectIncludes(client, 'identityMatchingPerformed: false', 'MESH6J must prohibit identity matching.');
expectIncludes(client, 'performance.timeOrigin + performance.now()', 'MESH6J capture timestamps must originate from the explicit shutter-time monotonic browser clock.');
expectIncludes(client, "elements.startCapture.addEventListener('click'", 'MESH6J.3 camera opening must be initiated by the preparation control.');
expectIncludes(client, "elements.shutter.addEventListener('click'", 'MESH6J.3 capture must originate from the explicit shutter control.');
expectIncludes(client, 'await session.queues[sweepIndex].push', 'MESH6J.3 each shutter click must wait until exactly one explicit trigger is consumed.');
expectIncludes(client, "':frame:' + (frameIndex + 1)", 'MESH6J.3 provider run references must preserve explicit frame sequence.');
expectIncludes(client, 'session.frameCounts[sweepIndex] += 1', 'MESH6J.3 must increment the current sweep frame count only after trigger consumption.');
expectIncludes(client, 'const sweepComplete = session.frameCounts[sweepIndex] === session.framesPerSweep;', 'MESH6J.3 sweep completion must require all configured explicit frames.');
expectIncludes(client, 'if (sweepComplete) {', 'MESH6J.3 queue closure must be guarded by sweep completion.');
expectIncludes(client, 'session.queues[sweepIndex].close();', 'MESH6J.3 must close the current queue only after the explicit frame quota is reached.');
expectIncludes(client, 'session.currentSweepIndex += 1;', 'MESH6J.3 must advance only after the current sweep closes.');
expectIncludes(client, 'const sessionComplete = session.currentSweepIndex === session.sweepCount;', 'MESH6J.3 session completion must require every sweep.');
expectIncludes(client, 'await session.promise;', 'MESH6J.3 must await descriptive analysis only after the final configured explicit frame.');
expectIncludes(client, "showView('result');", 'MESH6J.3 must switch to the result view after analysis.');
expectIncludes(client, "new Blob([payload], { type: 'application/json' })", 'MESH6J export must be the descriptive JSON artifact.');
expectIncludes(client, 'for (const queue of session.queues) queue.close()', 'MESH6J must close outstanding trigger streams on cancellation/failure.');

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

const controllerCount = (client.match(/runMesh6IManualBrowserCaptureController/g) || []).length;
expect(controllerCount === 2, 'MESH6J should import and invoke the MESH6I controller exactly once each.');

process.stdout.write(JSON.stringify({
  status: 'MESH6J_MANUAL_BROWSER_CAPTURE_SURFACE_CONTRACT_PASS',
  defaultLocalhostVerified: true,
  optInPrivateLanHttpsVerified: true,
  nonPrivateRemoteDenialVerified: true,
  getOnlyServerVerified: true,
  wasmCompilationCspNarrowlyAuthorized: true,
  threeViewMobileUxVerified: true,
  fixedCameraShutterCompositionVerified: true,
  defaultThreeSweepsFiveFramesVerified: true,
  multiFrameSweepExplicitTriggerVerified: true,
  finalFrameAnalysisTransitionVerified: true,
  manifestAttestationsVerified: true,
  noAutomaticCaptureVerified: true,
  noRawCapturePersistenceVerified: true,
  descriptiveJsonOnlyVerified: true,
  noThresholdOrCalibrationAuthorityVerified: true,
}) + '\n');
