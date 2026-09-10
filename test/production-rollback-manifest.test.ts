import { execFile } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { promisify } from 'node:util';
import { afterEach, describe, expect, test } from 'vitest';

const execFileAsync = promisify(execFile);
const createdDirectories: string[] = [];
const sourceSha = 'a'.repeat(40);
const workflowSha = 'b'.repeat(40);
const digestA = '1'.repeat(64);
const digestB = '2'.repeat(64);

async function fixture(options?: {
  trafficTotal?: number;
  firstReady?: string;
  firstImage?: string;
}) {
  const root = await mkdtemp(join(tmpdir(), 'saju-rollback-manifest-'));
  createdDirectories.push(root);
  const revisionsDir = join(root, 'revisions');
  const serviceJson = join(root, 'service.json');
  const output = join(root, 'manifest.json');
  await mkdir(revisionsDir);

  const secondPercent = options?.trafficTotal === undefined ? 40 : options.trafficTotal - 60;
  await writeFile(
    serviceJson,
    JSON.stringify({
      metadata: { name: 'saju-production', annotations: { private: 'do-not-copy' } },
      spec: { template: { spec: { containers: [{ env: [{ name: 'SECRET', value: 'hidden' }] }] } } },
      status: {
        url: 'https://saju-production.example.test',
        traffic: [
          { revisionName: 'saju-production-00006-bul', percent: 60, tag: 'stable' },
          { revisionName: 'saju-production-00005-leg', percent: secondPercent },
        ],
      },
    }),
  );

  await writeFile(
    join(revisionsDir, 'saju-production-00006-bul.json'),
    JSON.stringify({
      metadata: { name: 'saju-production-00006-bul' },
      spec: {
        containers: [
          {
            image:
              options?.firstImage ??
              `asia-southeast1-docker.pkg.dev/project/repository/saju-production@sha256:${digestA}`,
          },
        ],
      },
      status: { conditions: [{ type: 'Ready', status: options?.firstReady ?? 'True' }] },
    }),
  );
  await writeFile(
    join(revisionsDir, 'saju-production-00005-leg.json'),
    JSON.stringify({
      metadata: { name: 'saju-production-00005-leg' },
      spec: {
        containers: [
          {
            image: `asia-southeast1-docker.pkg.dev/project/repository/saju-production@sha256:${digestB}`,
          },
        ],
      },
      status: { conditions: [{ type: 'Ready', status: 'True' }] },
    }),
  );

  return { root, revisionsDir, serviceJson, output };
}

async function runBuilder(paths: Awaited<ReturnType<typeof fixture>>) {
  return execFileAsync(process.execPath, [
    'scripts/build-production-rollback-manifest.mjs',
    '--service-json',
    paths.serviceJson,
    '--revisions-dir',
    paths.revisionsDir,
    '--output',
    paths.output,
    '--project',
    'project',
    '--region',
    'asia-southeast1',
    '--service',
    'saju-production',
    '--captured-at',
    '2026-09-11T00:00:00Z',
    '--source-repository',
    'gycha0109-beep/Saju',
    '--source-branch',
    'ops/prod-snapshot-test',
    '--source-sha',
    sourceSha,
    '--workflow-sha',
    workflowSha,
    '--run-id',
    '12345',
    '--run-attempt',
    '2',
  ]);
}

afterEach(async () => {
  await Promise.all(createdDirectories.splice(0).map((path) => rm(path, { recursive: true, force: true })));
});

describe('production rollback manifest', () => {
  test('writes only admitted rollback evidence with deterministic revision percentages', async () => {
    const paths = await fixture();
    await runBuilder(paths);

    const raw = await readFile(paths.output, 'utf8');
    const manifest = JSON.parse(raw) as {
      activeTraffic: Array<{ revisionName: string; percent: number; tag: string }>;
      servingRevisions: Array<{ revisionName: string; imageRef: string; ready: boolean }>;
      restore: { trafficArgument: string; argv: string[] };
      classification: { predecessorInferenceFromRevisionOrderingAllowed: boolean };
    };

    expect(manifest.activeTraffic).toEqual([
      { revisionName: 'saju-production-00005-leg', percent: 40, tag: '' },
      { revisionName: 'saju-production-00006-bul', percent: 60, tag: 'stable' },
    ]);
    expect(manifest.servingRevisions).toHaveLength(2);
    expect(manifest.servingRevisions.every((revision) => revision.ready)).toBe(true);
    expect(manifest.servingRevisions.every((revision) => /@sha256:[0-9a-f]{64}$/.test(revision.imageRef))).toBe(true);
    expect(manifest.restore.trafficArgument).toBe(
      'saju-production-00005-leg=40,saju-production-00006-bul=60',
    );
    expect(manifest.restore.argv).toContain('--to-revisions');
    expect(manifest.classification.predecessorInferenceFromRevisionOrderingAllowed).toBe(false);
    expect(raw).not.toContain('do-not-copy');
    expect(raw).not.toContain('hidden');
  });

  test('rejects incomplete serving traffic', async () => {
    const paths = await fixture({ trafficTotal: 90 });
    await expect(runBuilder(paths)).rejects.toMatchObject({
      stderr: expect.stringContaining('Positive-percent traffic must total 100'),
    });
  });

  test('rejects a serving revision that is not Ready=True', async () => {
    const paths = await fixture({ firstReady: 'False' });
    await expect(runBuilder(paths)).rejects.toMatchObject({
      stderr: expect.stringContaining('is not Ready=True'),
    });
  });

  test('rejects a serving revision whose image is not digest-qualified', async () => {
    const paths = await fixture({
      firstImage: 'asia-southeast1-docker.pkg.dev/project/repository/saju-production:mutable',
    });
    await expect(runBuilder(paths)).rejects.toMatchObject({
      stderr: expect.stringContaining('image is not digest-qualified'),
    });
  });
});
