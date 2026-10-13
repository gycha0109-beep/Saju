/* global self, OffscreenCanvas */
// MediaPipe's pinned WASM loader uses importScripts. Keep a classic worker and
// dynamically import ESM modules; module workers reject that loader operation.
const visionReady = import('/local-assets/vision_bundle.mjs');
const metricsReady = import('./frontal-metrics.mjs');
let FaceLandmarker;
let model;
async function initialize() {
  if (model) return model;
  const vision = await visionReady;
  FaceLandmarker = vision.FaceLandmarker;
  const { FilesetResolver } = vision;
  const files = await FilesetResolver.forVisionTasks('/local-assets/wasm');
  model = await FaceLandmarker.createFromOptions(files, {
    baseOptions: { modelAssetPath: '/local-assets/face_landmarker.task', delegate: 'CPU' },
    runningMode: 'IMAGE',
    numFaces: 2,
    outputFaceBlendshapes: false,
    outputFacialTransformationMatrixes: false,
  });
  return model;
}
self.onmessage = async (event) => {
  const { generation, captureRef, bitmap, viewRole } = event.data;
  let failureStage = 'model_initialization';
  try {
    const provider = await initialize();
    failureStage = 'landmark_detection';
    const detected = provider.detect(bitmap);
    const unique = detected.faceLandmarks.length === 1;
    const topology = {
      eyeA: FaceLandmarker.FACE_LANDMARKS_LEFT_EYE,
      eyeB: FaceLandmarker.FACE_LANDMARKS_RIGHT_EYE,
      mouth: FaceLandmarker.FACE_LANDMARKS_LIPS,
      oval: FaceLandmarker.FACE_LANDMARKS_FACE_OVAL,
    };
    const landmarks = unique ? detected.faceLandmarks[0] : [];
    // Both closed lip components stay unordered. Only their combined envelope
    // is measured; no outer/inner role or lip-band thickness is assigned.
    failureStage = 'metric_computation';
    const { computeFrontalMetrics } = await metricsReady;
    const metrics = computeFrontalMetrics({
      landmarks,
      width: bitmap.width,
      height: bitmap.height,
      topology,
      captureRef,
      viewRole,
    });
    if (!unique)
      for (const metric of metrics)
        metric.reason = detected.faceLandmarks.length
          ? 'ambiguous_multiple_faces'
          : 'face_not_detected';
    failureStage = 'overlay_render';
    const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(bitmap, 0, 0);
    if (unique) {
      const sets = [
        [topology.eyeA, '#26b8ff'],
        [topology.eyeB, '#26b8ff'],
        [FaceLandmarker.FACE_LANDMARKS_LEFT_EYEBROW, '#64ee88'],
        [FaceLandmarker.FACE_LANDMARKS_RIGHT_EYEBROW, '#64ee88'],
        [FaceLandmarker.FACE_LANDMARKS_LIPS, '#ff76bc'],
        [topology.oval, '#c394ff'],
      ];
      ctx.lineWidth = Math.max(1.2, bitmap.width / 500);
      for (const [edges, color] of sets) {
        ctx.strokeStyle = color;
        ctx.beginPath();
        for (const edge of edges) {
          const a = landmarks[edge.start],
            b = landmarks[edge.end];
          ctx.moveTo(a.x * bitmap.width, a.y * bitmap.height);
          ctx.lineTo(b.x * bitmap.width, b.y * bitmap.height);
        }
        ctx.stroke();
      }
    }
    const overlay = await canvas.convertToBlob({ type: 'image/png' });
    self.postMessage({
      generation,
      captureRef,
      metrics,
      overlay,
      providerState: unique
        ? 'single_face_model_candidate'
        : detected.faceLandmarks.length
          ? 'ambiguous_multiple_faces'
          : 'face_not_detected',
    });
  } catch (error) {
    self.postMessage({
      generation,
      captureRef,
      failureStage,
      error: ['TOPOLOGY_INVALID', 'FRAME_INVALID', 'CAPTURE_REF_INVALID'].includes(error.message)
        ? error.message
        : 'MODEL_EXECUTION_FAILED',
    });
  } finally {
    bitmap?.close();
  }
};
