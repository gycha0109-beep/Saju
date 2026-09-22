import { readFile } from 'node:fs/promises';
import { describe, expect, test } from 'vitest';

describe('Production cold-start evidence contract', () => {
  test('binds provider startup correlation to an immutable latency artifact', async () => {
    const workflow = await readFile(
      '.github/workflows/production-cold-start-evidence.yml',
      'utf8',
    );

    expect(workflow).toContain('name: Production Cold Start Evidence');
    expect(workflow).toContain('source_latency_run_id:');
    expect(workflow).toContain("[[ \"$MYEONGHA_WATCHTOWER_TRACK\" == 'ops' ]]");
    expect(workflow).toContain('.name == "Production Latency Evidence"');
    expect(workflow).toContain('.path == ".github/workflows/production-latency-evidence.yml"');
    expect(workflow).toContain('saju-production-latency-evidence-$SOURCE_LATENCY_RUN_ID');
    expect(workflow).toContain('first_observed_not_proven_cold_start');
    expect(workflow).toContain('gcloud logging read');
    expect(workflow).toContain('cloud_run_instance_start');
    expect(workflow).toContain('cloud_run_calculation_request');
    expect(workflow).toContain('provider_startup_event_correlated_to_first_observed_request_window');
    expect(workflow).toContain('coldStartProven: $coldStartProven');
    expect(workflow).toContain("[[ \"$cold_start_proven\" == 'true' ]]");
    expect(workflow).toContain('rawProviderPayloadsRetained: false');
    expect(workflow).toContain('credentialsRetained: false');
    expect(workflow).toContain('retention-days: 90');
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
});
