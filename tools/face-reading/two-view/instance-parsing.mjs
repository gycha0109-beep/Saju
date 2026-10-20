/* global OffscreenCanvas */
// Transient source boxes, points and upright crops never leave the worker.
import {
  INSTANCE_PIN,
  bgrTensor,
  decodeFaces,
  instanceFrame,
  instanceChecks,
  projectInstance,
  mergeInstances,
} from './instance-frame.mjs';
let detector;
export async function refineInstances(bitmap, ort, size, ctx, parseCanvas) {
  const unavailable = (reason) => ({ summary: { status: 'unavailable', reason } });
  try {
    if (!detector)
      detector = await ort.InferenceSession.create('/local-assets/instance-yunet.onnx', {
        executionProviders: ['wasm'],
        graphOptimizationLevel: 'all',
      });
  } catch {
    return unavailable('MODEL_UNAVAILABLE');
  }
  try {
    if (detector.inputNames.join(',') !== 'input' || detector.outputNames.length !== 12)
      throw Error('INSTANCE_OUTPUT_INVALID');
    const inputCanvas = new OffscreenCanvas(INSTANCE_PIN.size, INSTANCE_PIN.size),
      inputCtx = inputCanvas.getContext('2d', { willReadFrequently: true }),
      scale = Math.min(INSTANCE_PIN.size / bitmap.width, INSTANCE_PIN.size / bitmap.height);
    inputCtx.fillStyle = 'black';
    inputCtx.fillRect(0, 0, inputCanvas.width, inputCanvas.height);
    inputCtx.drawImage(bitmap, 0, 0, bitmap.width * scale, bitmap.height * scale);
    const tensor = new ort.Tensor(
      'float32',
      bgrTensor(
        inputCtx.getImageData(0, 0, inputCanvas.width, inputCanvas.height).data,
        INSTANCE_PIN.size,
      ),
      [1, 3, INSTANCE_PIN.size, INSTANCE_PIN.size],
    );
    let output, boxes;
    try {
      output = await detector.run({ input: tensor });
      boxes = decodeFaces(output, bitmap.width, bitmap.height);
    } finally {
      tensor.dispose();
      if (output) for (const value of Object.values(output)) value.dispose();
    }
    if (!boxes.length) return unavailable('NO_FACES');
    if (boxes.length > INSTANCE_PIN.maxFaces) return unavailable('TOO_MANY_FACES');
    const instances = [];
    for (const box of boxes) {
      const frame = instanceFrame(box),
        scale = size / frame.side;
      ctx.resetTransform();
      ctx.fillStyle = 'rgb(128,128,128)';
      ctx.fillRect(0, 0, size, size);
      ctx.translate(size / 2, size / 2);
      ctx.rotate(frame.angle);
      ctx.scale(scale, scale);
      ctx.translate(-frame.left - frame.side / 2, -frame.top - frame.side / 2);
      ctx.drawImage(bitmap, 0, 0);
      ctx.resetTransform();
      const { mask } = await parseCanvas(),
        checks = instanceChecks(mask, size, box, frame);
      if (!checks.noseAligned) return unavailable('ANCHOR_DISAGREEMENT');
      instances.push({
        box,
        frame,
        lipsAligned: checks.lipsAligned,
        mask: projectInstance(mask, size, frame, bitmap.width, bitmap.height),
      });
    }
    // Source-aligned labels only; crop background never erases the full-frame pass.
    return {
      instances,
      summary: {
        status: 'applied',
        faces: instances.length,
        lipChecksPassed: instances.filter((i) => i.lipsAligned).length,
      },
    };
  } catch {
    return unavailable('DETECTION_FAILED');
  } finally {
    ctx.resetTransform();
  }
}
export { mergeInstances };
