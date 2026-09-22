import { readFile } from 'node:fs/promises';
import { describe, expect, test } from 'vitest';

describe('Production cold-start evidence contract', () => {
  test('binds provider startup correlation to the exact request-serving instance', async () => {
    const workflow = await readFile(
      '.github/workflows/production-cold-start-evidence.yml',
      'utf8',
    );
    const correlator = await readFile(
      'scripts/correlate-production-cold-start.mjs',
      'utf8',
    );

    expect(workflow).toContain('name: Production Cold Start Evidence');
    expect(workflow).toContain('source_latency_run_id:');
    expect(workflow).toContain("[[ \"$MYEONGHA_WATCHTOWER_TRACK\" == 'ops' ]]");
    expect(workflow).toContain('.name == "Production Latency Evidence"');
    expect(workflow).toContain('.path == ".github/workflows/production-latency-evidence.yml"');
    expect(workflow).toContain('saju-production-latency-evidence-$SOURCE_LATENCY_RUN_ID');
    expect(workflow).toContain('gcloud logging read');
    expect(workflow).toContain('scripts/correlate-production-cold-start.mjs');
    expect(workflow).toContain('retention-days: 90');

    expect(correlator).toContain('labels?.instanceId');
    expect(correlator).toContain('Starting new instance');
    expect(correlator).toContain("reason === 'AUTOSCALING'");
    expect(correlator).toContain('sameInstanceStartupMatched');
    expect(correlator).toContain('provider_autoscaling_cold_start_same_instance_correlated');
    expect(correlator).toContain('instanceIdentifierRetained: false');
    expect(correlator).toContain('rawProviderPayloadsRetained: false');
    expect(correlator).toContain('credentialsRetained: false');
    expect(correlator).toContain('productionTrafficMutated: false');
  });

  test('retains successful latency JSON as immutable evidence for later correlation', async () => {
    const workflow = await readFile(
      '.github/workflows/production-latency-evidence.yml',
      'utf8',
    );

    expect(workflow).toContain('- name: Upload immutable latency evidence');
    expect(workflow).toContain('saju-production-latency-evidence-');
    expect(workflow).toContain('saju-production-latency-evidence.json');
    expect(workflow).toContain("if: always() && steps.latency.outcome == 'success'");
    expect(workflow).toContain('retention-days: 90');
  });

  test('does not treat timestamp-only startup proximity as proof', async () => {
    const correlator = await readFile(
      'scripts/correlate-production-cold-start.mjs',
      'utf8',
    );

    expect(correlator).toContain('instanceId(entry) === requestInstance');
    expect(correlator).not.toContain(
      'provider_startup_event_correlated_to_first_observed_request_window',
    );
  });
});
