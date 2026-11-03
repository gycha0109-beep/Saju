import { spawnSync } from 'node:child_process';
import { mkdir, mkdtemp, readFile, writeFile, rm, stat, rename } from 'node:fs/promises';
import { isAbsolute, resolve, relative, sep } from 'node:path';
import { fileURLToPath, URL } from 'node:url';
import process from 'node:process';
import { analyzePhotoThreeDivisionsResearch } from '../.face-reading-dist/photo-three-divisions-research.js';
import { FR26_MEDIAPIPE_FACE_LANDMARKER_MODEL } from '../.face-reading-dist/mediapipe-face-landmarker-runtime-fr26.js';

const root = fileURLToPath(new URL('../', import.meta.url));
const cache = resolve(root, '.cache/face-reading');
const MAX_BYTES = 16 * 1024 * 1024;

// Local output is opt-in, exclusive, and never inside tracked source directories.
function privateOutput(path) {
  const absolute = resolve(path);
  const repoRelative = relative(root, absolute);
  if (
    !isAbsolute(repoRelative) &&
    repoRelative !== '..' &&
    !repoRelative.startsWith(`..${sep}`) &&
    !absolute.startsWith(cache + sep)
  )
    throw new Error('private output must not enter repository source');
  return absolute;
}

export async function runLocalFacePhotoResearch(args) {
  let imagePath;
  let output;
  let labels;
  for (let index = 0; index < args.length; index++) {
    const arg = args[index];
    const value = args[++index];
    if (value === undefined) throw new Error('missing photo argument');
    if (arg === '--image' && imagePath === undefined) imagePath = resolve(value);
    else if (arg === '--output' && output === undefined) output = privateOutput(value);
    else if (arg === '--image-reference-y' && labels === undefined) labels = JSON.parse(value);
    else throw new Error('unsupported photo argument');
  }
  if (imagePath === undefined) throw new Error('image required');
  if ((await stat(imagePath)).size > MAX_BYTES) throw new Error('image resource limit');
  // A single immutable byte snapshot is passed to both local extractors. No
  // previously generated hairline JSON or second image can be joined here.
  const bytes = await readFile(imagePath);
  if (bytes.length === 0 || bytes.length > MAX_BYTES) throw new Error('image resource limit');
  await mkdir(cache, { recursive: true });
  const model = resolve(cache, 'photo-research-face-landmarker.task');
  try {
    await stat(model);
  } catch {
    const response = await globalThis.fetch(FR26_MEDIAPIPE_FACE_LANDMARKER_MODEL);
    if (!response.ok) throw new Error('model unavailable');
    const modelBytes = new Uint8Array(await response.arrayBuffer());
    if (modelBytes.length === 0 || modelBytes.length > 64 * 1024 * 1024)
      throw new Error('model resource limit');
    const pending = resolve(cache, `photo-research-model-${process.pid}.pending`);
    await writeFile(pending, modelBytes, { flag: 'wx', mode: 0o600 });
    await rename(pending, model);
  }
  const work = await mkdtemp(resolve(cache, 'photo-run-'));
  try {
    const snapshot = resolve(work, 'input-image');
    await writeFile(snapshot, bytes, { flag: 'wx', mode: 0o600 });
    const child = spawnSync(
      process.env.FACE_READING_PYTHON || (process.platform === 'win32' ? 'python' : 'python3'),
      [
        resolve(root, 'tools/face-reading/observe_local_photo.py'),
        '--image',
        snapshot,
        '--model',
        model,
        '--work',
        work,
      ],
      {
        cwd: root,
        encoding: 'utf8',
        maxBuffer: 4 * 1024 * 1024,
        timeout: 120000,
        windowsHide: true,
      },
    );
    if (child.error || child.status !== 0)
      throw new Error('private photo inference failed; check documented runtime dependencies');
    const observation = JSON.parse(child.stdout);
    const result = analyzePhotoThreeDivisionsResearch(observation, labels);
    const report = {
      ...result,
      runtimeAssets: {
        modelRef: FR26_MEDIAPIPE_FACE_LANDMARKER_MODEL,
        verificationState: 'reference_pinned_bytes_unverified',
        pythonRuntimeIsFr26JavaScriptRuntime: false,
      },
    };
    if (output !== undefined)
      await writeFile(output, JSON.stringify(report, null, 2) + '\n', { flag: 'wx', mode: 0o600 });
    return report;
  } finally {
    // Only this mkdtemp child may be removed; never any caller-supplied path.
    if (work.startsWith(cache + sep) && relative(cache, work).startsWith('photo-run-'))
      await rm(work, { recursive: true, force: true });
  }
}
