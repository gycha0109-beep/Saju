import { randomUUID } from 'node:crypto';
import process from 'node:process';
import { createMyeonghwaProductHostServer } from '../dist/product-host.js';
import {
  SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
  calculateCanonicalSajuSnapshot,
  runInterpretation,
} from '../dist/index.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../dist/production/production-calculation-policy.js';
import { createGeneralNatalT8StructuralSummaryCandidateRegistry } from '../dist/research/general-natal-t8-structural-summary-candidate.js';

const RESEARCH_PREVIEW_VERSION = 'myeonghwa-research-ux-preview-v2';
const GENERAL_NATAL_CLAIM_TYPE = 'GENERAL_NATAL_MONTH_BRANCH_STRUCTURAL_CONTEXT';
const SCOPE_GUARD_CLAIM_TYPE = 'DAY_MASTER_MONTH_BRANCH_SCOPE_GUARD';
const smokeMode = process.env.MYEONGHWA_PREVIEW_SMOKE === '1';
const fetchRequest = globalThis.fetch.bind(globalThis);

const narrativePolicy = {
  policyId: RESEARCH_PREVIEW_VERSION,
  version: '2.0.0-preview',
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

const relationText = {
  peer: '월지와 일간이 같은 오행에 속하는 관계입니다.',
  resource: '월지의 오행이 일간의 오행을 생하는 관계입니다.',
  output: '일간의 오행이 월지의 오행을 생하는 관계입니다.',
  wealth: '일간의 오행이 월지의 오행을 극하는 관계입니다.',
  officer: '월지의 오행이 일간의 오행을 극하는 관계입니다.',
};

function previewDraft(evidence) {
  const t8Claim = evidence.claims.find((claim) => claim.claimType === GENERAL_NATAL_CLAIM_TYPE);
  if (t8Claim === undefined) {
    throw new Error('General natal structural context claim is missing from the preview evidence bundle.');
  }

  const value = t8Claim.value;
  const relation =
    value !== null && typeof value === 'object' && typeof value.relation === 'string'
      ? value.relation
      : undefined;
  const summary = relation === undefined ? undefined : relationText[relation];
  if (summary === undefined) {
    throw new Error('General natal structural relationship is not supported by the preview renderer.');
  }

  const scopeGuard = evidence.claims.find((claim) => claim.claimType === SCOPE_GUARD_CLAIM_TYPE);
  const ambiguityBlocks = evidence.canonicalFacts
    .filter((fact) => fact.scenarioRef === undefined && fact.fact.status === 'ambiguous')
    .map((fact) => ({
      type: 'disclosure',
      disclosureType: 'calculation_ambiguity',
      text: `계산 조건에 따라 ${fact.path} 값이 하나로 확정되지 않습니다. 가능한 경우를 구분해 확인합니다.`,
      relatedRefs: [fact.ref],
    }));

  return {
    schemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
    requestId: evidence.requestId,
    sections: [
      {
        sectionId: 'research-preview-general-natal-structure',
        title: '사주의 기본 구조',
        blocks: [
          ...ambiguityBlocks,
          {
            type: 'assertion',
            text: summary,
            epistemicType: 'synthesis',
            evidenceRefs: [{ sourceType: 'claim', ref: t8Claim.claimId }],
            methodologyRefs: [t8Claim.methodologyRef],
          },
          {
            type: 'disclosure',
            disclosureType: 'scope_limitation',
            text: '이 내용은 월지의 오행과 일간의 오행 사이의 관계만 확인한 제한된 구조 정보입니다. 이것만으로 신강·신약, 길흉, 성격, 직업, 재물, 관계, 사건이나 미래를 판단하지 않습니다.',
            relatedRefs: [scopeGuard?.claimId ?? t8Claim.claimId],
          },
          {
            type: 'transition',
            text: '현재 연구 미리보기에서 제공하는 해석은 여기까지입니다. 이후 항목은 근거와 검토가 확보되는 순서대로 추가됩니다.',
          },
        ],
      },
    ],
  };
}

class ResearchPreviewNarrativeAdapter {
  metadata = {
    provider: 'deterministic-research-preview',
    modelId: 'grounded-readable-preview',
    modelRevision: RESEARCH_PREVIEW_VERSION,
  };

  async generateStructured(prompt) {
    return previewDraft(prompt.evidence);
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

  const serialized = JSON.stringify(payload);
  if (!serialized.includes('사주의 기본 구조')) {
    throw new Error('Preview response is missing the readable Korean structural summary.');
  }
  for (const forbidden of [
    'classificationAuthorized',
    'fortunePolarityAuthorized',
    'numericScoringAuthorized',
    'month_branch_structural_context',
    '"direction"',
  ]) {
    if (serialized.includes(forbidden)) {
      throw new Error(`Preview response leaked internal evidence field: ${forbidden}`);
    }
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
