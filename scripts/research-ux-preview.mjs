import { randomUUID } from 'node:crypto';
import process from 'node:process';
import { createMyeonghwaProductHostServer } from '../dist/product-host.js';
import {
  SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
  calculateCanonicalSajuSnapshot,
  runInterpretation,
} from '../dist/index.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../dist/production/production-calculation-policy.js';
import { createGeneralNatalUsefulReadingCandidateRegistry } from '../dist/research/general-natal-useful-reading-candidate.js';

const RESEARCH_PREVIEW_VERSION = 'myeonghwa-research-ux-preview-v3';
const BASELINE_CLAIM_TYPE = 'GENERAL_NATAL_DAY_MASTER_BASELINE';
const SCOPE_GUARD_CLAIM_TYPE = 'GENERAL_NATAL_USEFUL_READING_SCOPE-GUARD';
const smokeMode = process.env.MYEONGHWA_PREVIEW_SMOKE === '1';
const fetchRequest = globalThis.fetch.bind(globalThis);

const narrativePolicy = {
  policyId: RESEARCH_PREVIEW_VERSION,
  version: '3.0.0-preview',
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

const SECTION_ORDER = [
  ['relationships_and_agency', '관계와 자기주도'],
  ['learning_and_support', '생각과 학습'],
  ['expression_and_workstyle', '표현과 일하는 방식'],
  ['resources_and_results', '돈과 자원'],
  ['responsibility_and_pressure', '책임과 압박'],
];

function valueRecord(claim) {
  if (claim.value === null || typeof claim.value !== 'object' || Array.isArray(claim.value)) {
    throw new Error(`Preview claim ${claim.claimId} has an unsupported value shape.`);
  }
  return claim.value;
}

function assertion(claim, text) {
  return {
    type: 'assertion',
    text,
    epistemicType: 'synthesis',
    evidenceRefs: [{ sourceType: 'claim', ref: claim.claimId }],
    methodologyRefs: [claim.methodologyRef],
  };
}

function ambiguityBlocks(evidence) {
  return evidence.canonicalFacts
    .filter((fact) => fact.scenarioRef === undefined && fact.fact.status === 'ambiguous')
    .map((fact) => ({
      type: 'disclosure',
      disclosureType: 'calculation_ambiguity',
      text: `계산 조건에 따라 ${fact.path} 값이 하나로 확정되지 않습니다. 가능한 경우를 구분해 확인합니다.`,
      relatedRefs: [fact.ref],
    }));
}

function themeText(claim) {
  const value = valueRecord(claim);
  const headline = typeof value.headline === 'string' ? value.headline : '해석 주제';
  const summary = typeof value.summary === 'string' ? value.summary : '';
  const channel = value.channel;
  const channelText =
    channel === 'visible_stems'
      ? '겉으로 드러나는 천간에서 확인되는 축입니다.'
      : channel === 'branches'
        ? '지지에서 확인되는 축입니다.'
        : '명식에서 확인되는 축입니다.';
  return `${headline}. ${channelText} ${summary}`;
}

function previewDraft(evidence) {
  const baseline = evidence.claims.find((claim) => claim.claimType === BASELINE_CLAIM_TYPE);
  if (baseline === undefined) {
    throw new Error('General natal day-master baseline is missing from preview evidence.');
  }
  const guard = evidence.claims.find((claim) => claim.claimType === SCOPE_GUARD_CLAIM_TYPE);
  if (guard === undefined) {
    throw new Error('General natal useful-reading scope guard is missing from preview evidence.');
  }

  const baselineValue = valueRecord(baseline);
  const baselineHeadline =
    typeof baselineValue.headline === 'string' ? baselineValue.headline : '기본 성향의 출발점';
  const baselineSummary = typeof baselineValue.summary === 'string' ? baselineValue.summary : '';
  const themeClaims = evidence.claims.filter(
    (claim) => claim.taxonomy.tier === 'T8' && claim.predicate === 'consumer_theme',
  );

  const sections = [
    {
      sectionId: 'research-preview-general-natal-baseline',
      title: '기본 성향',
      blocks: [
        ...ambiguityBlocks(evidence),
        assertion(baseline, `${baselineHeadline}. ${baselineSummary}`),
        {
          type: 'transition',
          text: '아래 내용은 월지 하나가 아니라 명식 전체의 십신 배치에서 실제로 확인되는 주제를 나눠서 봅니다.',
        },
      ],
    },
  ];

  for (const [consumerSection, title] of SECTION_ORDER) {
    const claims = themeClaims.filter(
      (claim) => valueRecord(claim).consumerSection === consumerSection,
    );
    if (claims.length === 0) continue;
    sections.push({
      sectionId: `research-preview-${consumerSection}`,
      title,
      blocks: claims
        .sort((left, right) => left.claimId.localeCompare(right.claimId))
        .map((claim) => assertion(claim, themeText(claim))),
    });
  }

  sections.push({
    sectionId: 'research-preview-general-natal-scope',
    title: '이 풀이에서 아직 단정하지 않는 것',
    blocks: [
      {
        type: 'disclosure',
        disclosureType: 'scope_limitation',
        text: '현재 풀이는 타고난 명식의 성향·학습·표현·자원·책임·협업 주제를 읽는 연구 미리보기입니다. 이 단계에서 돈이 많다/적다, 직업 성공 여부, 배우자 결과, 건강 결과, 길흉, 사건 발생이나 미래 시기를 단정하지 않습니다.',
        relatedRefs: [guard.claimId],
      },
    ],
  });

  return {
    schemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
    requestId: evidence.requestId,
    sections,
  };
}

class ResearchPreviewNarrativeAdapter {
  metadata = {
    provider: 'deterministic-research-preview',
    modelId: 'grounded-useful-natal-preview',
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
    const registry = createGeneralNatalUsefulReadingCandidateRegistry();
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
  if (!serialized.includes('기본 성향')) {
    throw new Error('Preview response is missing the consumer baseline section.');
  }
  if (!SECTION_ORDER.some(([, title]) => serialized.includes(title))) {
    throw new Error('Preview response is missing all whole-chart consumer theme sections.');
  }
  for (const forbidden of [
    'classificationAuthorized',
    'fortunePolarityAuthorized',
    'numericScoringAuthorized',
    'wholePersonConclusionAuthorized',
    'outcomeAuthorized',
    'futureTimingAuthorized',
    'month_branch_structural_context',
    '"direction"',
    '"family"',
    '"channel"',
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
