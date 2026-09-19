import process from 'node:process';

import {
  deriveZygionSourceExactFR199,
  parseObjVerticesFR199,
} from '../.face-reading-dist/face-reading-public-synthetic-zygion-correspondence-fr199.js';

const ICT_COMMIT = 'da5f95a607f5e6b37755b38d3385d7f2853732e5';
const FACE_VERTEX_COUNT = 9409;
const FILES = Object.freeze([
  'generic_neutral_mesh.obj',
  'identity000.obj',
  'identity050.obj',
  'identity099.obj',
]);

async function fetchText(path) {
  const url =
    'https://raw.githubusercontent.com/USC-ICT/ICT-FaceKit/' +
    ICT_COMMIT +
    '/FaceXModel/' +
    path;
  const response = await globalThis.fetch(url, {
    redirect: 'follow',
    headers: { 'user-agent': 'myeongha-fr205-ict-probe' },
    signal: globalThis.AbortSignal.timeout(120000),
  });
  if (!response.ok) {
    throw new Error('FR205 ICT fetch failed ' + response.status + ' ' + url);
  }
  return response.text();
}

function bounds(vertices) {
  const axis = (key) => vertices.map((point) => point[key]);
  const xs = axis('x');
  const ys = axis('y');
  const zs = axis('z');
  return {
    x: { min: Math.min(...xs), max: Math.max(...xs), span: Math.max(...xs) - Math.min(...xs) },
    y: { min: Math.min(...ys), max: Math.max(...ys), span: Math.max(...ys) - Math.min(...ys) },
    z: { min: Math.min(...zs), max: Math.max(...zs), span: Math.max(...zs) - Math.min(...zs) },
  };
}

async function main() {
  const receipts = [];
  for (const file of FILES) {
    const objText = await fetchText(file);
    const allVertices = parseObjVerticesFR199(objText);
    const faceVertices = allVertices.slice(0, FACE_VERTEX_COUNT);
    const deriveReceipt = (vertices) => {
      try {
        const derived = deriveZygionSourceExactFR199(vertices);
        return {
          status: 'bilateral',
          pronasale: derived.pronasale,
          bilateral: derived.bilateral,
          width: Math.abs(derived.bilateral[0].x - derived.bilateral[1].x),
        };
      } catch (error) {
        return {
          status: 'fail_closed',
          error: error instanceof Error ? error.message : String(error),
        };
      }
    };
    const sourceExact = deriveReceipt(faceVertices);
    const centimeterToMillimeterVertices = faceVertices.map((point) => ({
      x: point.x * 10,
      y: point.y * 10,
      z: point.z * 10,
    }));
    const sourceExactAfterCentimeterToMillimeter = deriveReceipt(
      centimeterToMillimeterVertices,
    );
    receipts.push({
      file,
      totalVertexCount: allVertices.length,
      faceVertexCount: faceVertices.length,
      faceBounds: bounds(faceVertices),
      sourceExact,
      centimeterToMillimeter: {
        scaleFactor: 10,
        faceBounds: bounds(centimeterToMillimeterVertices),
        sourceExact: sourceExactAfterCentimeterToMillimeter,
      },
    });
  }

  process.stdout.write(
    JSON.stringify({
      schemaVersion: 'fr205-ict-geometry-probe-v1',
      upstream: {
        repository: 'USC-ICT/ICT-FaceKit',
        commit: ICT_COMMIT,
        license: 'MIT',
      },
      faceTopologyVertexRange: [0, 9408],
      providerExecuted: false,
      receipts,
    }) + '\n',
  );
}

main().catch((error) => {
  globalThis.console.error(error instanceof Error ? error.stack ?? error.message : String(error));
  process.exitCode = 1;
});
