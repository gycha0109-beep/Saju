/* global self, OffscreenCanvas, ImageData */
import {
  PARSING_VERSION,
  PARSING_PIN,
  PARSING_GROUPS,
  rgbTensor,
  classifyLogits,
  contactPixels,
} from './parsing-contract.mjs';
import * as ort from '/local-assets/ort/ort.wasm.bundle.min.mjs';
ort.env.wasm.numThreads = 1;
ort.env.wasm.proxy = false;
ort.env.wasm.wasmPaths = '/local-assets/ort/';
let session;
async function model() {
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
    const engine = await model(),
      size = PARSING_PIN.size;
    const canvas = new OffscreenCanvas(size, size),
      ctx = canvas.getContext('2d', { willReadFrequently: true });
    // Author's full-image stretch transform; invert only for display, never crop/warp the source.
    ctx.drawImage(bitmap, 0, 0, size, size);
    const pixels = ctx.getImageData(0, 0, size, size);
    const tensor = new ort.Tensor('float32', rgbTensor(pixels.data, size, size), [
      1,
      3,
      size,
      size,
    ]);
    const output = await engine.run({ [engine.inputNames[0]]: tensor });
    const first = output[engine.outputNames[0]],
      { mask, counts } = classifyLogits(first.data, first.dims);
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
    tensor.dispose();
    for (const value of Object.values(output)) value.dispose();
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
      },
    });
  } catch {
    self.postMessage({ generation, captureRef, error: 'PARSING_FAILED' });
  } finally {
    bitmap.close();
  }
};
