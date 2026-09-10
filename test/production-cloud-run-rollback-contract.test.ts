import { readFile } from 'node:fs/promises';
import { describe, expect, test } from 'vitest';

describe('Production Cloud Run rollback evidence contract', () => {
  test('persists admitted rollback evidence before candidate creation or traffic mutation', async () => {
    const workflow = await readFile('.github/workflows/production-cloud-run.yml', 'utf8');
    const authority = workflow.indexOf('- name: Checkout workflow authority');
    const stage = workflow.indexOf('- name: Stage rollback manifest builder');
    const source = workflow.indexOf('- name: Checkout exact source SHA');
    const capture = workflow.indexOf('- name: Capture current serving revisions');
    const preserve = workflow.indexOf('- name: Preserve pre-deploy rollback manifest');
    const push = workflow.indexOf('- name: Push exact source image and resolve digest');
    const candidate = workflow.indexOf('- name: Deploy no-traffic candidate revision');
    const promote = workflow.indexOf('- name: Promote candidate to 100 percent traffic');

    expect(authority).toBeGreaterThanOrEqual(0);
    expect(stage).toBeGreaterThan(authority);
    expect(source).toBeGreaterThan(stage);
    expect(capture).toBeGreaterThan(source);
    expect(preserve).toBeGreaterThan(capture);
    expect(push).toBeGreaterThan(preserve);
    expect(candidate).toBeGreaterThan(push);
    expect(promote).toBeGreaterThan(candidate);
    expect(workflow).toContain('cp scripts/build-production-rollback-manifest.mjs');
    expect(workflow).toContain('node "${RUNNER_TEMP}/build-production-rollback-manifest.mjs"');
    expect(workflow).toContain('actions/upload-artifact@ea165f8d65b6e75b540449e92b4886f43607fa02');
    expect(workflow).toContain('retention-days: 90');
    expect(workflow).toContain('if-no-files-found: error');
  });
});
