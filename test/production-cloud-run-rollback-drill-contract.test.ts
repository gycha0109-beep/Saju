import { readFile } from 'node:fs/promises';
import { describe, expect, test } from 'vitest';

describe('Production Cloud Run rollback drill contract', () => {
  test('binds a real rollback to prior manifest authority and always restores original traffic', async () => {
    const workflow = await readFile(
      '.github/workflows/production-cloud-run-rollback-drill.yml',
      'utf8',
    );

    expect(workflow).toContain('name: Production Cloud Run Rollback Drill');
    expect(workflow).toContain('workflow_dispatch:');
    expect(workflow).toContain("RUN_PRODUCTION_ROLLBACK_DRILL");
    expect(workflow).toContain("[[ \"$MYEONGHA_WATCHTOWER_TRACK\" == 'ops' ]]");
    expect(workflow).toContain('source_deployment_run_id:');
    expect(workflow).toContain('.name == "Production Cloud Run"');
    expect(workflow).toContain('.path == ".github/workflows/production-cloud-run.yml"');
    expect(workflow).toContain('pre_deploy_rollback_manifest');
    expect(workflow).toContain('predecessorInferenceFromRevisionOrderingAllowed == false');
    expect(workflow).toContain('productionTrafficMutatedByThisCapture == false');
    expect(workflow).toContain('steps.source.outputs.artifact_id');
    expect(workflow).toContain('steps.preflight.outputs.rollback_revision');
    expect(workflow).toContain('steps.preflight.outputs.original_revision');

    const rollback = workflow.indexOf(
      '- name: Switch 100 percent traffic to manifest rollback revision',
    );
    const rollbackVerify = workflow.indexOf(
      '- name: Verify rollback traffic and authenticated smoke',
    );
    const restore = workflow.indexOf('- name: Restore original production traffic');
    const restoreVerify = workflow.indexOf(
      '- name: Verify original traffic restored and smoke again',
    );
    const requireEvidence = workflow.indexOf(
      '- name: Require successful rollback and final restoration',
    );

    expect(rollback).toBeGreaterThan(0);
    expect(rollbackVerify).toBeGreaterThan(rollback);
    expect(restore).toBeGreaterThan(rollbackVerify);
    expect(restoreVerify).toBeGreaterThan(restore);
    expect(requireEvidence).toBeGreaterThan(restoreVerify);

    expect(workflow).toContain(
      "if: always() && steps.rollback-switch.outputs.attempted == 'true'",
    );
    expect(workflow).toContain('--to-revisions "$ROLLBACK_REVISION=100"');
    expect(workflow).toContain('--to-revisions "$ORIGINAL_REVISION=100"');
    expect(workflow).toContain('verify-production-calculation-service.mjs');
    expect(workflow).toContain('verify-preview-reading-service.mjs');
    expect(workflow).toContain('.finalState.originalTrafficRestored == true');
    expect(workflow).toContain('.finalState.rollbackDrillPassed == true');
    expect(workflow).toContain('.classification.secretValuesRetained == false');
    expect(workflow).toContain('.classification.rawProviderPayloadsRetained == false');
    expect(workflow).toContain('retention-days: 90');
  });

  test('does not authorize rollback by inferred revision ordering or embed a bearer value', async () => {
    const workflow = await readFile(
      '.github/workflows/production-cloud-run-rollback-drill.yml',
      'utf8',
    );

    expect(workflow).not.toContain('sort -V');
    expect(workflow).not.toContain('revisionName | max');
    expect(workflow).not.toContain('SAJU_PRODUCTION_SERVICE_BEARER=');
    expect(workflow).not.toContain('serviceAccountKey');
  });
});
