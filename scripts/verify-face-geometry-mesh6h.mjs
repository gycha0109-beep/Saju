import process from 'node:process';

import {
  MESH6H_NEXT_FRONTIER,
  assertIssuedMesh6HBrowserCameraHandle,
  getMesh6HBrowserCameraAdapterContract,
  openMesh6HBrowserCamera,
} from '../.face-reading-dist/mesh6h-browser-camera-frame-source.js';

function expect(condition, message) {
  if (!condition) throw new Error(message);
}

async function expectAsyncFailure(label, callback) {
  try {
    await callback();
  } catch {
    return;
  }
  throw new Error('MESH6H expected fail-closed rejection: ' + label);
}

function makeVideo({ playFails = false, width = 820, height = 1024, readyState = 2 } = {}) {
  const state = {
    srcObject: null,
    playCalls: 0,
    pauseCalls: 0,
    width,
    height,
    readyState,
  };
  return {
    state,
    video: {
      get srcObject() {
        return state.srcObject;
      },
      set srcObject(value) {
        state.srcObject = value;
      },
      get videoWidth() {
        return state.width;
      },
      get videoHeight() {
        return state.height;
      },
      get readyState() {
        return state.readyState;
      },
      async play() {
        state.playCalls += 1;
        if (playFails) throw new Error('fixture play failure');
      },
      pause() {
        state.pauseCalls += 1;
      },
    },
  };
}

function makeEnvironment({ trackCount = 2 } = {}) {
  const counters = {
    getUserMedia: 0,
    createImageBitmap: 0,
    trackStops: Array.from({ length: trackCount }, () => 0),
    bitmapCloses: [],
  };
  const tracks = counters.trackStops.map((_, index) => ({
    stop() {
      counters.trackStops[index] += 1;
    },
  }));
  const stream = {
    getTracks() {
      return tracks;
    },
  };
  const environment = {
    async getUserMedia(constraints) {
      counters.getUserMedia += 1;
      expect(constraints.audio === false, 'MESH6H must request audio=false.');
      expect(constraints.video?.facingMode === 'user', 'MESH6H must request facingMode=user.');
      return stream;
    },
    async createImageBitmap() {
      const index = counters.createImageBitmap;
      counters.createImageBitmap += 1;
      counters.bitmapCloses[index] = 0;
      return {
        fixtureBitmapIndex: index,
        close() {
          counters.bitmapCloses[index] += 1;
        },
      };
    },
  };
  return { counters, stream, environment };
}

async function* triggers(values) {
  for (const value of values) yield Object.freeze(value);
}

const primaryVideo = makeVideo();
const primaryEnv = makeEnvironment();
const handle = await openMesh6HBrowserCamera(
  { video: primaryVideo.video },
  primaryEnv.environment,
);
assertIssuedMesh6HBrowserCameraHandle(handle);

expect(primaryEnv.counters.getUserMedia === 1, 'MESH6H must call getUserMedia exactly once at open.');
expect(primaryVideo.state.playCalls === 1, 'MESH6H must call video.play exactly once at open.');
expect(primaryVideo.state.srcObject === primaryEnv.stream, 'MESH6H must attach the acquired stream to the supplied video sink.');

const frameSource = handle.createSweepFrameSource(triggers([
  { timestampMs: 1000, providerRunRef: 'mesh6h:frame:1' },
  { timestampMs: 1016, providerRunRef: 'mesh6h:frame:2' },
  { timestampMs: 1032, providerRunRef: 'mesh6h:frame:3' },
]));
const iterator = frameSource[Symbol.asyncIterator]();

const first = await iterator.next();
expect(first.done === false, 'MESH6H first explicit trigger must yield one frame.');
expect(first.value.timestampMs === 1000, 'MESH6H must preserve first trigger timestamp.');
expect(first.value.providerRunRef === 'mesh6h:frame:1', 'MESH6H must preserve first providerRunRef.');
expect(first.value.frameWidth === 820 && first.value.frameHeight === 1024, 'MESH6H must copy live video dimensions.');
expect(primaryEnv.counters.createImageBitmap === 1, 'MESH6H must create one bitmap per trigger.');
expect(primaryEnv.counters.bitmapCloses[0] === 0, 'MESH6H must keep yielded bitmap alive until consumer advances.');

const second = await iterator.next();
expect(second.done === false, 'MESH6H second explicit trigger must yield one frame.');
expect(second.value.timestampMs === 1016, 'MESH6H must preserve second trigger timestamp.');
expect(second.value.providerRunRef === 'mesh6h:frame:2', 'MESH6H must preserve second providerRunRef.');
expect(primaryEnv.counters.createImageBitmap === 2, 'MESH6H must create exactly one second bitmap.');
expect(primaryEnv.counters.bitmapCloses[0] === 1, 'MESH6H must close first bitmap exactly once after consumer advances.');
expect(primaryEnv.counters.bitmapCloses[1] === 0, 'MESH6H must keep current yielded bitmap alive.');

await iterator.return();
expect(primaryEnv.counters.bitmapCloses[1] === 1, 'MESH6H must close current bitmap on early iterator termination.');
expect(primaryEnv.counters.createImageBitmap === 2, 'MESH6H must not capture unrequested remaining trigger frames.');

handle.close();
handle.close();
expect(primaryEnv.counters.trackStops.every((count) => count === 1), 'MESH6H close must stop every acquired track exactly once.');
expect(primaryVideo.state.pauseCalls === 1, 'MESH6H idempotent close must pause video exactly once.');
expect(primaryVideo.state.srcObject === null, 'MESH6H close must detach the stream.');

const descendingVideo = makeVideo();
const descendingEnv = makeEnvironment({ trackCount: 1 });
const descendingHandle = await openMesh6HBrowserCamera(
  { video: descendingVideo.video },
  descendingEnv.environment,
);
const descendingSource = descendingHandle.createSweepFrameSource(triggers([
  { timestampMs: 2000, providerRunRef: 'mesh6h:descending:1' },
  { timestampMs: 1999, providerRunRef: 'mesh6h:descending:2' },
]));
const descendingIterator = descendingSource[Symbol.asyncIterator]();
const descendingFirst = await descendingIterator.next();
expect(descendingFirst.done === false, 'MESH6H descending test must yield first frame.');
await expectAsyncFailure('descending timestamp order', () => descendingIterator.next());
expect(descendingEnv.counters.bitmapCloses[0] === 1, 'MESH6H must close prior bitmap before rejecting descending timestamp.');
expect(descendingEnv.counters.createImageBitmap === 1, 'MESH6H must not create a bitmap for rejected descending trigger.');
descendingHandle.close();
expect(descendingEnv.counters.trackStops[0] === 1, 'MESH6H descending-test handle must stop its track exactly once.');

const notReadyVideo = makeVideo({ width: 0, height: 0, readyState: 1 });
const notReadyEnv = makeEnvironment({ trackCount: 1 });
const notReadyHandle = await openMesh6HBrowserCamera(
  { video: notReadyVideo.video },
  notReadyEnv.environment,
);
const notReadyIterator = notReadyHandle.createSweepFrameSource(triggers([
  { timestampMs: 3000, providerRunRef: 'mesh6h:not-ready:1' },
]))[Symbol.asyncIterator]();
await expectAsyncFailure('video dimensions/readiness', () => notReadyIterator.next());
expect(notReadyEnv.counters.createImageBitmap === 0, 'MESH6H must reject unready video before bitmap capture.');
notReadyHandle.close();
expect(notReadyEnv.counters.trackStops[0] === 1, 'MESH6H unready-video handle must stop its track exactly once.');

const playFailureVideo = makeVideo({ playFails: true });
const playFailureEnv = makeEnvironment({ trackCount: 2 });
await expectAsyncFailure('video play setup failure', () =>
  openMesh6HBrowserCamera({ video: playFailureVideo.video }, playFailureEnv.environment));
expect(playFailureEnv.counters.getUserMedia === 1, 'MESH6H play-failure path must call getUserMedia once.');
expect(playFailureEnv.counters.trackStops.every((count) => count === 1), 'MESH6H play-failure path must stop every acquired track exactly once.');
expect(playFailureVideo.state.pauseCalls === 1, 'MESH6H play-failure cleanup must pause video once.');
expect(playFailureVideo.state.srcObject === null, 'MESH6H play-failure cleanup must detach stream.');

await expectAsyncFailure('empty/invalid trigger timestamp', async () => {
  const videoFixture = makeVideo();
  const envFixture = makeEnvironment({ trackCount: 1 });
  const localHandle = await openMesh6HBrowserCamera({ video: videoFixture.video }, envFixture.environment);
  try {
    const invalid = localHandle.createSweepFrameSource(triggers([
      { timestampMs: Number.NaN, providerRunRef: 'mesh6h:invalid:nan' },
    ]))[Symbol.asyncIterator]();
    await invalid.next();
  } finally {
    localHandle.close();
  }
});

const forged = { ...handle };
let forgedRejected = false;
try {
  assertIssuedMesh6HBrowserCameraHandle(forged);
} catch {
  forgedRejected = true;
}
expect(forgedRejected, 'MESH6H must reject copied/forged camera handles.');

const contract = getMesh6HBrowserCameraAdapterContract();
expect(contract.camera.getUserMediaCalledAtOpen === true, 'MESH6H contract must require getUserMedia at open.');
expect(contract.camera.automaticCaptureTriggering === false, 'MESH6H contract must prohibit automatic capture triggering.');
expect(contract.camera.automaticFrameSelection === false, 'MESH6H contract must prohibit automatic frame selection.');
expect(contract.camera.automaticPoseFiltering === false, 'MESH6H contract must prohibit automatic pose filtering.');
expect(contract.camera.automaticCaptureQualityFiltering === false, 'MESH6H contract must prohibit automatic capture-quality filtering.');
expect(contract.camera.triggerTimestampRepairAllowed === false, 'MESH6H contract must prohibit timestamp repair/reordering.');
expect(contract.camera.minimumFrameCountForProduction === null, 'MESH6H must not invent a production minimum frame count.');
expect(contract.camera.minimumSweepCountForProduction === null, 'MESH6H must not invent a production minimum sweep count.');
expect(contract.persistence.rawImagePersisted === false, 'MESH6H must not persist raw image data.');
expect(contract.persistence.rawVideoPersisted === false, 'MESH6H must not persist raw video data.');
expect(contract.authorityBoundary.freshCaptureProofIssued === false, 'MESH6H must not claim independent fresh-capture proof.');
expect(contract.authorityBoundary.identityMatchingPerformed === false, 'MESH6H must not perform identity matching.');
expect(contract.authorityBoundary.poseAcceptanceIssued === false, 'MESH6H must not issue pose acceptance.');
expect(contract.authorityBoundary.captureQualityAcceptanceIssued === false, 'MESH6H must not issue capture-quality acceptance.');
expect(contract.authorityBoundary.calibrationIssued === false, 'MESH6H must not issue calibration.');
expect(contract.authorityBoundary.thresholdsIssued === false, 'MESH6H must not issue thresholds.');
expect(contract.authorityBoundary.productionMorphologyAuthorized === false, 'MESH6H must not authorize production morphology.');
expect(contract.nextFrontier === MESH6H_NEXT_FRONTIER, 'MESH6H next frontier drift.');

process.stdout.write(JSON.stringify({
  status: 'MESH6H_BROWSER_CAMERA_FRAME_SOURCE_PASS',
  getUserMediaOnceVerified: true,
  explicitTriggerOneFrameVerified: true,
  triggerOrderPreserved: true,
  bitmapCloseLifecycleVerified: true,
  streamTrackCloseLifecycleVerified: true,
  setupFailureCleanupVerified: true,
  noAutomaticSelectionOrFilteringVerified: true,
  noThresholdOrCalibrationAuthorityVerified: true,
}) + '\n');
