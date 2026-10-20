/* global self, OffscreenCanvas, ImageData */
// Source coordinates and crop transforms stay inside this owned classic worker.
const contractReady = import('./parsing-contract.mjs');
const frameReady = import('./parsing-frame.mjs');
const qualityReady = import('./region-quality.mjs');
const profileReady = import('./profile-metrics.mjs');
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
  const { bitmap, generation, captureRef, viewRole } = data;
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
    const { screenRegions, screenEarOverlay } = await qualityReady;
    const { measureProfile, unavailableProfile, sourceFaceClipped } = await profileReady;
    const engine = await model(),
      size = PARSING_PIN.size;
    const canvas = new OffscreenCanvas(size, size),
      ctx = canvas.getContext('2d', { willReadFrequently: true });
    async function parseCanvas() {
      const pixels = ctx.getImageData(0, 0, size, size),
        tensor = new ort.Tensor('float32', rgbTensor(pixels.data, size, size), [1, 3, size, size]);
      let output;
      try {
        output = await engine.run({ [engine.inputNames[0]]: tensor });
        const first = output[engine.outputNames[0]];
        return classifyLogits(first.data, first.dims);
      } finally {
        tensor.dispose();
        if (output) for (const value of Object.values(output)) value.dispose();
      }
    }
    // Preserve the exact full-image pass; optional instance routing is isolated below.
    ctx.drawImage(bitmap, 0, 0, size, size);
    const { mask: base, counts } = await parseCanvas();
    let earMask = null,
      earRefinement = { status: 'unavailable', reason: 'REFINEMENT_FAILED', pixels: 0 };
    let anchors = null,
      backgroundRemoved = 0;
    let profile =
      viewRole === 'profile' ? unavailableProfile('NO_SINGLE_FACE') : { status: 'not_requested' };
    const skipped = (reason) => {
      earRefinement = { status: 'unavailable', reason, pixels: 0 };
    };
    try {
      const detected = (await localizationModel()).detect(bitmap);
      if (detected.faceLandmarks.length !== 1)
        skipped(detected.faceLandmarks.length ? 'MULTIPLE_FACES' : 'NO_SINGLE_FACE');
      else {
        if (viewRole === 'profile') profile = unavailableProfile('FRAME_UNAVAILABLE');
        const points = detected.faceLandmarks[0];
        let frame;
        try {
          frame = faceFrame(points, bitmap.width, bitmap.height);
        } catch {
          skipped('FACE_FRAME_INVALID');
        }
        if (frame) {
          ctx.clearRect(0, 0, size, size);
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
          const crop = (await parseCanvas()).mask;
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
          const topologyPoints = (edges) =>
            [...new Set(edges.flatMap((e) => [e.start, e.end]))].map((i) => points[i]);
          const sourceSets = {
            brows: topologyPoints([
              ...FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW,
              ...FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW,
            ]),
            lips: topologyPoints(FaceLandmarker.FACE_LANDMARKS_LIPS),
            face: topologyPoints([
              ...FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
              ...FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
              ...FaceLandmarker.FACE_LANDMARKS_LIPS,
            ]),
          };
          anchors = Object.fromEntries(
            Object.entries(sourceSets).map(([id, ps]) => [
              id,
              ps.map((p) => ({
                x: p.x * size,
                y: p.y * size,
                radiusX: (12 * frame.side) / bitmap.width,
                radiusY: (12 * frame.side) / bitmap.height,
              })),
            ]),
          );
          if (!lipsAligned) anchors.lips = [];
          if (viewRole === 'profile') {
            const cropAnchors = Object.fromEntries(
              Object.entries(sourceSets).map(([id, ps]) => [
                id,
                ps.map((p) => ({
                  x: ((p.x * bitmap.width - frame.left) * size) / frame.side,
                  y: ((p.y * bitmap.height - frame.top) * size) / frame.side,
                })),
              ]),
            );
            if (!lipsAligned) cropAnchors.lips = [];
            const cleanCrop = screenRegions(crop, size, cropAnchors, 12).mask;
            profile = measureProfile(cleanCrop, size, {
              referenceSupported: eyesAligned && lipsAligned,
              lipsAligned,
              sourceClipped: sourceFaceClipped(cleanCrop, size, frame, bitmap.width, bitmap.height),
            });
          }
          if (!eyesAligned || !lipsAligned) skipped('ANCHOR_DISAGREEMENT');
          else {
            const projected = projectMask(
              removeEarFragments(crop, size),
              size,
              frame,
              bitmap.width,
              bitmap.height,
            );
            const pixels = projected.counts[7] + projected.counts[8];
            if (!pixels) skipped('EAR_FRAGMENT_ONLY');
            else {
              earMask = projected.mask;
              earRefinement = {
                status: 'applied',
                pixels,
                checks: { singleFace: true, eyesAligned: true, lipsAligned: true },
              };
            }
          }
        }
      }
    } catch {
      skipped('REFINEMENT_FAILED');
    }
    let display = base,
      instanceRefinement = { status: 'not_requested' };
    if (['MULTIPLE_FACES', 'NO_SINGLE_FACE'].includes(earRefinement.reason)) {
      try {
        const { refineInstances, mergeInstances } = await import('./instance-parsing.mjs');
        const refined = await refineInstances(
          bitmap,
          ort,
          size,
          ctx,
          parseCanvas,
          viewRole === 'profile',
        );
        instanceRefinement = refined.summary;
        if (refined.instances) {
          const merged = mergeInstances(base, size, refined.instances, bitmap.width, bitmap.height);
          display = merged.mask;
          backgroundRemoved = merged.backgroundRemoved;
          anchors = Object.fromEntries(
            ['nose', 'lips', 'brows'].map((id) => [
              id,
              refined.instances.flatMap((i) => i.anchors[id]),
            ]),
          );
          if (viewRole === 'profile')
            profile =
              refined.instances.length === 1
                ? refined.instances[0].profile
                : unavailableProfile('NO_SINGLE_FACE');
          instanceRefinement = {
            ...instanceRefinement,
            counts: merged.counts,
            interfacePixels: contactPixels(display, size, size).reduce((a, b) => a + b, 0),
          };
        }
      } catch {
        display = base;
        instanceRefinement = { status: 'unavailable', reason: 'DETECTION_FAILED' };
      }
    }
    const screened = screenRegions(display, size, anchors, 12);
    display = screened.mask;
    if (earMask) {
      const screenedEar = screenEarOverlay(display, earMask, size, anchors, 12);
      earMask = screenedEar.mask;
      screened.quality.ears = screenedEar.quality;
    }
    const contact = contactPixels(display, size, size),
      layers = {};
    for (const group of PARSING_GROUPS) {
      // Never leak the cropped input's rectangular boundary into full-frame layers.
      const mask = group.id === 'ears' && earMask ? earMask : display,
        rgba = new Uint8ClampedArray(size * size * 4);
      for (let p = 0; p < mask.length; p++)
        if (group.id === 'interface' ? contact[p] : group.classes.includes(mask[p])) {
          rgba.set(group.color, p * 4);
          rgba[p * 4 + 3] = 255;
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
        interfacePixels: contactPixels(base, size, size).reduce((a, b) => a + b, 0),
        earRefinement,
        instanceRefinement,
        regionScreening: { backgroundRemoved, regions: screened.quality },
        profile,
      },
    });
  } catch {
    self.postMessage({ generation, captureRef, error: 'PARSING_FAILED' });
  } finally {
    bitmap.close();
  }
};
