/* global self, OffscreenCanvas, ImageData */
// Classic worker: the pinned MediaPipe loader uses importScripts. All source
// coordinates and crop transforms remain here, never in HTTP or UI summaries.
const contractReady = import('./parsing-contract.mjs');
const frameReady = import('./parsing-frame.mjs');
let session, localizer, FaceLandmarker, ort;
async function localizationModel() {
  if (!localizer) {
    const vision = await import('/local-assets/vision_bundle.mjs');
    FaceLandmarker = vision.FaceLandmarker;
    localizer = await FaceLandmarker.createFromOptions(
      await vision.FilesetResolver.forVisionTasks('/local-assets/wasm'),
      {
        baseOptions: { modelAssetPath: '/local-assets/face_landmarker.task', delegate: 'CPU' },
        runningMode: 'IMAGE',
        numFaces: 2,
        outputFaceBlendshapes: false,
        outputFacialTransformationMatrixes: false,
      },
    );
  }
  return localizer;
}
async function model() {
  if (!ort) {
    ort = await import('/local-assets/ort/ort.wasm.bundle.min.mjs');
    ort.env.wasm.numThreads = 1;
    ort.env.wasm.proxy = false;
    ort.env.wasm.wasmPaths = '/local-assets/ort/';
  }
  if (!session)
    session = await ort.InferenceSession.create('/local-assets/parsing-resnet18.onnx', {
      executionProviders: ['wasm'],
      graphOptimizationLevel: 'all',
    });
  const value = await session;
  if (
    value.inputNames.join(',') !== 'input' ||
    value.outputNames.length !== 3 ||
    value.outputNames[0] !== 'output'
  )
    throw Error('PARSING_PROVIDER_INVALID');
  return value;
}
self.onmessage = async ({ data }) => {
  const { bitmap, generation, captureRef } = data;
  try {
    const {
      PARSING_VERSION,
      PARSING_PIN,
      PARSING_GROUPS,
      rgbTensor,
      classifyLogits,
      contactPixels,
    } = await contractReady;
    const { faceFrame, supportedAnchors, removeEarFragments, projectMask } = await frameReady;
    const unavailable = (reason) =>
      self.postMessage({
        generation,
        captureRef,
        parsing: {
          methodVersion: PARSING_VERSION,
          candidateOnly: true,
          status: 'unavailable',
          reason,
        },
      });
    const detected = (await localizationModel()).detect(bitmap);
    if (detected.faceLandmarks.length !== 1) {
      unavailable(detected.faceLandmarks.length ? 'MULTIPLE_FACES' : 'NO_SINGLE_FACE');
      return;
    }
    const points = detected.faceLandmarks[0];
    let frame;
    try {
      frame = faceFrame(points, bitmap.width, bitmap.height);
    } catch {
      unavailable('FACE_FRAME_INVALID');
      return;
    }
    const engine = await model(),
      size = PARSING_PIN.size;
    const canvas = new OffscreenCanvas(size, size),
      ctx = canvas.getContext('2d', { willReadFrequently: true });
    ctx.fillStyle = 'rgb(128,128,128)';
    ctx.fillRect(0, 0, size, size);
    const scale = size / frame.side;
    ctx.drawImage(
      bitmap,
      -frame.left * scale,
      -frame.top * scale,
      bitmap.width * scale,
      bitmap.height * scale,
    );
    const pixels = ctx.getImageData(0, 0, size, size);
    const tensor = new ort.Tensor('float32', rgbTensor(pixels.data, size, size), [
      1,
      3,
      size,
      size,
    ]);
    const output = await engine.run({ [engine.inputNames[0]]: tensor });
    const first = output[engine.outputNames[0]];
    const crop = classifyLogits(first.data, first.dims).mask;
    const eyesAligned = supportedAnchors(
      crop,
      size,
      points,
      [...FaceLandmarker.FACE_LANDMARKS_LEFT_EYE, ...FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE],
      [4, 5],
      frame,
      bitmap.width,
      bitmap.height,
    );
    const lipsAligned = supportedAnchors(
      crop,
      size,
      points,
      FaceLandmarker.FACE_LANDMARKS_LIPS,
      [12, 13],
      frame,
      bitmap.width,
      bitmap.height,
    );
    tensor.dispose();
    for (const value of Object.values(output)) value.dispose();
    if (!eyesAligned || !lipsAligned) {
      unavailable('ANCHOR_DISAGREEMENT');
      return;
    }
    const { mask, counts } = projectMask(
      removeEarFragments(crop, size),
      size,
      frame,
      bitmap.width,
      bitmap.height,
    );
    const contact = contactPixels(mask, size, size),
      layers = {};
    for (const group of PARSING_GROUPS) {
      const rgba = new Uint8ClampedArray(size * size * 4);
      for (let p = 0; p < mask.length; p++) {
        if (group.id === 'interface' ? contact[p] : group.classes.includes(mask[p])) {
          rgba.set(group.color, p * 4);
          rgba[p * 4 + 3] = 255;
        }
      }
      ctx.putImageData(new ImageData(rgba, size, size), 0, 0);
      layers[group.id] = await canvas.convertToBlob({ type: 'image/png' });
    }
    self.postMessage({
      generation,
      captureRef,
      layers,
      parsing: {
        methodVersion: PARSING_VERSION,
        candidateOnly: true,
        status: 'completed',
        counts,
        interfacePixels: contact.reduce((a, b) => a + b, 0),
        checks: { singleFace: true, eyesAligned: true, lipsAligned: true },
      },
    });
  } catch {
    self.postMessage({ generation, captureRef, error: 'PARSING_FAILED' });
  } finally {
    bitmap.close();
  }
};
