/* global Blob, URL, createImageBitmap, document, performance */

import {
  assertFr21bCalibrationRegistriesRemainUnadmittedFR104,
  buildNeutralEarFr21bCalibrationCandidateFR104,
} from '/face/neutral-ear-controlled-capture-calibration-tooling-fr104.js';
import {
  openMesh6HBrowserCamera,
} from '/face/mesh6h-browser-camera-frame-source.js';

const elements = Object.freeze({
  cameraFacing: document.querySelector('#camera-facing'),
  markerAnatomicalSide:
    document.querySelector('#marker-anatomical-side'),
  runOrdinal: document.querySelector('#run-ordinal'),
  encodedExif: document.querySelector('#encoded-exif'),
  evidenceRef: document.querySelector('#evidence-ref'),
  profileRef: document.querySelector('#profile-ref'),
  targetRef: document.querySelector('#target-ref'),
  deviceContextRef: document.querySelector('#device-context-ref'),
  browserContextRef: document.querySelector('#browser-context-ref'),
  previewMirror: document.querySelector('#preview-mirror'),
  openCamera: document.querySelector('#open-camera'),
  closeCamera: document.querySelector('#close-camera'),
  captureFrame: document.querySelector('#capture-frame'),
  cameraStatus: document.querySelector('#camera-status'),
  video: document.querySelector('#camera'),
  rawCanvas: document.querySelector('#raw-canvas'),
  encodedCanvas: document.querySelector('#encoded-canvas'),
  previewSide: document.querySelector('#preview-side'),
  rawSide: document.querySelector('#raw-side'),
  encodedSide: document.querySelector('#encoded-side'),
  canonicalSide: document.querySelector('#canonical-side'),
  previewRef: document.querySelector('#preview-ref'),
  rawRef: document.querySelector('#raw-ref'),
  encodedRef: document.querySelector('#encoded-ref'),
  canonicalRef: document.querySelector('#canonical-ref'),
  buildEvidence: document.querySelector('#build-evidence'),
  downloadEvidence: document.querySelector('#download-evidence'),
  evidenceStatus: document.querySelector('#evidence-status'),
  evidenceOutput: document.querySelector('#evidence-output'),
});

for (const [name, value] of Object.entries(elements)) {
  if (value === null) {
    throw new Error(
      'FR104 calibration missing required DOM element: ' + name,
    );
  }
}

let camera = null;
let lastCandidate = null;
let captureOrdinal = 0;

function nonEmpty(element, label) {
  const value = element.value.trim();
  if (value.length === 0) {
    throw new Error(label + ' must be non-empty.');
  }
  return value;
}

function selectedSide(element, label) {
  if (element.value !== 'left' && element.value !== 'right') {
    throw new Error(label + ' must be left or right.');
  }
  return element.value;
}

function runOrdinal() {
  const value = Number(elements.runOrdinal.value);
  if (!Number.isInteger(value) || value < 1) {
    throw new Error('Run ordinal must be a positive integer.');
  }
  return value;
}

function currentFacing() {
  const value = elements.cameraFacing.value;
  if (value !== 'front' && value !== 'rear') {
    throw new Error('Camera facing must be front or rear.');
  }
  return value;
}

function updatePreviewTransform() {
  elements.video.style.transform =
    elements.previewMirror.checked ? 'scaleX(-1)' : 'none';
}

function suggestedRefs() {
  const facing = currentFacing();
  const ordinal = runOrdinal();
  return Object.freeze({
    evidenceRef: `fr104.calibration.${facing}.run${ordinal}`,
    profileRef: `fr21b.profile.${facing}.candidate`,
    previewRef: `fr104:calibration:${facing}:run${ordinal}:preview`,
    rawRef: `fr104:calibration:${facing}:run${ordinal}:raw`,
    encodedRef:
      `fr104:calibration:${facing}:run${ordinal}:encoded`,
    canonicalRef:
      `fr104:calibration:${facing}:run${ordinal}:canonical`,
  });
}

function applySuggestedRefs() {
  const refs = suggestedRefs();
  elements.evidenceRef.value = refs.evidenceRef;
  elements.profileRef.value = refs.profileRef;
  elements.previewRef.value = refs.previewRef;
  elements.rawRef.value = refs.rawRef;
  elements.encodedRef.value = refs.encodedRef;
  elements.canonicalRef.value = refs.canonicalRef;
}

function setCameraStatus(message) {
  elements.cameraStatus.textContent = message;
}

function setEvidenceStatus(message) {
  elements.evidenceStatus.textContent = message;
}

function clearCanvas(canvas) {
  canvas.width = 1;
  canvas.height = 1;
  const context = canvas.getContext('2d');
  context?.clearRect(0, 0, 1, 1);
}

function drawImageToCanvas(canvas, image, width, height) {
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d', {
    alpha: false,
    willReadFrequently: false,
  });
  if (context === null) {
    throw new Error('2D canvas context is unavailable.');
  }
  context.drawImage(image, 0, 0, width, height);
}

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob === null) {
        reject(new Error('PNG encoding returned no Blob.'));
        return;
      }
      resolve(blob);
    }, 'image/png');
  });
}

async function* singleTrigger(providerRunRef) {
  yield Object.freeze({
    timestampMs: performance.now(),
    providerRunRef,
  });
}

async function openCamera() {
  if (camera !== null) return;
  const facing = currentFacing();
  setCameraStatus(
    `${facing} camera permission / stream 준비 중…`,
  );
  camera = await openMesh6HBrowserCamera({
    video: elements.video,
    cameraFacing: facing,
  });
  elements.openCamera.disabled = true;
  elements.closeCamera.disabled = false;
  elements.captureFrame.disabled = false;
  elements.cameraFacing.disabled = true;
  setCameraStatus(
    `${facing} camera가 열렸습니다. preview mirror는 presentation 설정일 뿐 source-pixel 권위가 아닙니다.`,
  );
}

function closeCamera() {
  if (camera !== null) {
    camera.close();
    camera = null;
  }
  elements.openCamera.disabled = false;
  elements.closeCamera.disabled = true;
  elements.captureFrame.disabled = true;
  elements.cameraFacing.disabled = false;
  setCameraStatus('카메라를 닫았습니다.');
}

async function captureFrame() {
  if (camera === null) {
    throw new Error('Open the camera before capture.');
  }
  const facing = currentFacing();
  captureOrdinal += 1;
  const providerRunRef =
    `fr104:calibration:${facing}:frame:${captureOrdinal}`;
  const iterator = camera
    .createSweepFrameSource(singleTrigger(providerRunRef))
    [Symbol.asyncIterator]();

  const next = await iterator.next();
  if (next.done) {
    throw new Error('Mesh6H did not yield a captured frame.');
  }

  try {
    drawImageToCanvas(
      elements.rawCanvas,
      next.value.image,
      next.value.frameWidth,
      next.value.frameHeight,
    );

    const encodedBlob = await canvasToBlob(elements.rawCanvas);
    const encodedBitmap = await createImageBitmap(encodedBlob);
    try {
      drawImageToCanvas(
        elements.encodedCanvas,
        encodedBitmap,
        encodedBitmap.width,
        encodedBitmap.height,
      );
    } finally {
      encodedBitmap.close();
    }

    setCameraStatus(
      'raw_pixels와 in-memory PNG encoded_pixels를 갱신했습니다. 이미지는 export하지 않습니다.',
    );
  } finally {
    if (typeof iterator.return === 'function') {
      await iterator.return();
    }
  }
}

function encodedExifOrientation() {
  if (elements.encodedExif.value === '') return null;
  const value = Number(elements.encodedExif.value);
  if (!Number.isInteger(value) || value < 1 || value > 8) {
    throw new Error('Encoded EXIF Orientation must be 1..8 or null.');
  }
  return value;
}

function buildCandidate() {
  assertFr21bCalibrationRegistriesRemainUnadmittedFR104();

  const evidenceRef = nonEmpty(
    elements.evidenceRef,
    'Evidence ref',
  );
  const facing = currentFacing();
  const candidate =
    buildNeutralEarFr21bCalibrationCandidateFR104({
      schemaVersion:
        'fr104-fr21b-c1-calibration-candidate-input-v1',
      evidenceRef,
      profileCandidateRef: nonEmpty(
        elements.profileRef,
        'Profile candidate ref',
      ),
      targetRef: nonEmpty(elements.targetRef, 'Target ref'),
      cameraFacing: facing,
      knownMarkerAnatomicalSide: selectedSide(
        elements.markerAnatomicalSide,
        'Known marker anatomical side',
      ),
      runOrdinal: runOrdinal(),
      deviceContextRef: nonEmpty(
        elements.deviceContextRef,
        'Device context ref',
      ),
      browserContextRef: nonEmpty(
        elements.browserContextRef,
        'Browser context ref',
      ),
      previewPresentationMirrorApplied:
        elements.previewMirror.checked,
      stages: {
        preview: {
          markerImageSide: selectedSide(
            elements.previewSide,
            'preview marker image side',
          ),
          artifactEvidenceRef: nonEmpty(
            elements.previewRef,
            'preview artifact evidence ref',
          ),
        },
        raw_pixels: {
          markerImageSide: selectedSide(
            elements.rawSide,
            'raw_pixels marker image side',
          ),
          artifactEvidenceRef: nonEmpty(
            elements.rawRef,
            'raw_pixels artifact evidence ref',
          ),
        },
        encoded_pixels: {
          markerImageSide: selectedSide(
            elements.encodedSide,
            'encoded_pixels marker image side',
          ),
          artifactEvidenceRef: nonEmpty(
            elements.encodedRef,
            'encoded_pixels artifact evidence ref',
          ),
        },
        canonical_pixels: {
          markerImageSide: selectedSide(
            elements.canonicalSide,
            'canonical_pixels marker image side',
          ),
          artifactEvidenceRef: nonEmpty(
            elements.canonicalRef,
            'canonical_pixels artifact evidence ref',
          ),
        },
      },
      encodedExifOrientation: encodedExifOrientation(),
      evidenceRefs: [
        `operator-session:${evidenceRef}`,
        `mesh6h-facing:${facing}`,
        'fr19:capture-orientation-authority:0.1.0',
      ],
      limitations: [
        'raw_pixels and encoded_pixels visualizations are ephemeral browser canvases and are not exported.',
        'canonical_pixels side must be transcribed from separately executed FR19-path evidence; C1 does not synthesize that artifact.',
      ],
    });

  lastCandidate = candidate;
  elements.evidenceOutput.textContent =
    JSON.stringify(candidate, null, 2);
  elements.downloadEvidence.disabled = false;
  setEvidenceStatus(
    'research_candidate 생성 완료. registry admission/verified profile/anatomical laterality 권한은 모두 false입니다.',
  );
}

function downloadCandidate() {
  if (lastCandidate === null) return;
  const blob = new Blob(
    [JSON.stringify(lastCandidate, null, 2) + '\n'],
    { type: 'application/json;charset=utf-8' },
  );
  const href = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = href;
  anchor.download =
    lastCandidate.calibrationEvidence.evidenceRef + '.json';
  anchor.click();
  URL.revokeObjectURL(href);
}

elements.previewMirror.addEventListener(
  'change',
  updatePreviewTransform,
);
elements.cameraFacing.addEventListener('change', applySuggestedRefs);
elements.runOrdinal.addEventListener('change', applySuggestedRefs);
elements.openCamera.addEventListener('click', () => {
  void openCamera().catch((error) => {
    closeCamera();
    setCameraStatus(
      error instanceof Error ? error.message : String(error),
    );
  });
});
elements.closeCamera.addEventListener('click', closeCamera);
elements.captureFrame.addEventListener('click', () => {
  void captureFrame().catch((error) => {
    setCameraStatus(
      error instanceof Error ? error.message : String(error),
    );
  });
});
elements.buildEvidence.addEventListener('click', () => {
  try {
    buildCandidate();
  } catch (error) {
    lastCandidate = null;
    elements.downloadEvidence.disabled = true;
    setEvidenceStatus(
      error instanceof Error ? error.message : String(error),
    );
  }
});
elements.downloadEvidence.addEventListener(
  'click',
  downloadCandidate,
);

window.addEventListener('pagehide', closeCamera, { once: true });

updatePreviewTransform();
applySuggestedRefs();
clearCanvas(elements.rawCanvas);
clearCanvas(elements.encodedCanvas);
assertFr21bCalibrationRegistriesRemainUnadmittedFR104();
