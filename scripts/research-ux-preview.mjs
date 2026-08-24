import { randomUUID } from 'node:crypto';
import process from 'node:process';
import { createMyeonghwaProductHostServer } from '../dist/product-host.js';
import {
  SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
  buildDeterministicFallbackDraft,
  calculateCanonicalSajuSnapshot,
  runInterpretation,
} from '../dist/index.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../dist/production/production-calculation-policy.js';
import { createGeneralNatalT8StructuralSummaryCandidateRegistry } from '../dist/research/general-natal-t8-structural-summary-candidate.js';

const RESEARCH_PREVIEW_VERSION = 'myeonghwa-research-ux-preview-v1';
const smokeMode = process.env.MYEONGHWA_PREVIEW_SMOKE === '1';
const fetchRequest = globalThis.fetch.bind(globalThis);

const narrativePolicy = {
  policyId: RESEARCH_PREVIEW_VERSION,
  version: '1.0.0-preview',
  language: 'ko',
  certaintyPolicy: {
    deterministicFacts: 'direct',
    interpretationClaims: 'method_attributed',
    contestedClaims: 'explicit_difference',
    ambiguousFacts: 'explicit_uncertainty',
    futureClaims: 'non_deterministic',
  },
  tone: {
    style: 'clear',
    avoidFatalism: true,
    avoidFearInduction: true,
  },
  sensitiveDomains: {
    health: 'non_diagnostic',
    finance: 'non_advisory',
    legal: 'non_advisory',
    safety: 'no_harmful_direction',
  },
  sourceDisclosure: 'internal_only',
};

class ResearchPreviewNarrativeAdapter {
  metadata = {
    provider: 'deterministic-research-preview',
    modelId: 'deterministic-fallback',
    modelRevision: RESEARCH_PREVIEW_VERSION,
  };

  async generateStructured(prompt) {
    return buildDeterministicFallbackDraft(prompt.evidence);
  }
}

const dependencies = {
  calculate(input) {
    return calculateCanonicalSajuSnapshot(input, PRODUCTION_DEFAULT_CALCULATION_POLICY, {
      now: new Date(),
    });
  },
  interpret(snapshot) {
    const registry = createGeneralNatalT8StructuralSummaryCandidateRegistry();
    return {
      registry,
      interpretation: runInterpretation(snapshot, registry, { now: new Date() }),
    };
  },
  adapter: new ResearchPreviewNarrativeAdapter(),
  narrativePolicy,
  readingOptions: {
    outputSchemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
    readingVersion: RESEARCH_PREVIEW_VERSION,
    narrativeNow: new Date(),
    artifactGeneratedAt: new Date(),
  },
  requestIdFactory: () => `research-preview-${randomUUID()}`,
};

const requestedPort = smokeMode ? 0 : Number(process.env.PORT ?? 4173);
if (!Number.isInteger(requestedPort) || requestedPort < 0 || requestedPort > 65535) {
  throw new Error('PORT must be an integer between 1 and 65535.');
}

const server = createMyeonghwaProductHostServer(dependencies);

async function runSmoke(baseUrl) {
  const health = await fetchRequest(`${baseUrl}/healthz`);
  if (!health.ok) throw new Error(`Preview health check failed: ${health.status}`);

  const reading = await fetchRequest(`${baseUrl}/api/readings`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      birth: {
        calendarType: 'solar',
        date: '2024-03-10',
        time: '12:00',
        sex: 'unspecified',
      },
      reading: { text: '사주' },
    }),
  });
  if (!reading.ok) throw new Error(`Preview reading request failed: ${reading.status}`);
  const payload = await reading.json();
  if (payload.state !== 'delivered' && payload.state !== 'delivered_with_fallback') {
    throw new Error(`Preview reading did not deliver: ${String(payload.state)}`);
  }
}

function writeStdout(message) {
  process.stdout.write(`${message}\n`);
}

function writeStderr(error) {
  process.stderr.write(`${error instanceof Error ? error.stack ?? error.message : String(error)}\n`);
}

server.listen(requestedPort, '127.0.0.1', async () => {
  const address = server.address();
  if (address === null || typeof address === 'string') {
    throw new Error('Unable to resolve preview server address.');
  }
  const baseUrl = `http://127.0.0.1:${address.port}`;

  if (smokeMode) {
    try {
      await runSmoke(baseUrl);
      writeStdout('Myeonghwa research UX preview smoke: PASS');
      server.close();
    } catch (error) {
      writeStderr(error);
      process.exitCode = 1;
      server.close();
    }
    return;
  }

  writeStdout('');
  writeStdout('Myeonghwa Research UX Preview');
  writeStdout('NOT PRODUCTION AUTHORITY');
  writeStdout(`Open: ${baseUrl}`);
  writeStdout('Current meaningful test target: 전체 사주 (general / natal)');
  writeStdout('Other reading intents remain fail-closed when evidence is insufficient.');
  writeStdout('Press Ctrl+C to stop.');
  writeStdout('');
});

function shutdown() {
  server.close((error) => {
    if (error) {
      writeStderr(error);
      process.exitCode = 1;
    }
  });
}

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);
