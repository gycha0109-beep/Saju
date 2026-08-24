import { randomUUID } from 'node:crypto';
import process from 'node:process';
import { createMyeonghwaProductHostServer } from '../dist/product-host.js';
import {
  SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
  calculateCanonicalSajuSnapshot,
  runInterpretation,
} from '../dist/index.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../dist/production/production-calculation-policy.js';
import { createGeneralNatalConclusionCandidateRegistry } from '../dist/research/general-natal-conclusion-synthesis-candidate.js';

const RESEARCH_PREVIEW_VERSION = 'myeonghwa-research-ux-preview-v4';
const SCOPE_GUARD_CLAIM_TYPE = 'GENERAL_NATAL_USEFUL_READING_SCOPE-GUARD';
const smokeMode = process.env.MYEONGHWA_PREVIEW_SMOKE === '1';
const fetchRequest = globalThis.fetch.bind(globalThis);

const narrativePolicy = {
  policyId: RESEARCH_PREVIEW_VERSION,
  version: '4.0.0-preview',
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

function valueRecord(claim) {
  if (claim.value === null || typeof claim.value !== 'object' || Array.isArray(claim.value)) {
    throw new Error(`Preview claim ${claim.claimId} has an unsupported value shape.`);
  }
  return claim.value;
}

function conclusionKind(claim) {
  const value = valueRecord(claim);
  return typeof value.conclusionKind === 'string' ? value.conclusionKind : undefined;
}

function conclusionText(claim) {
  const value = valueRecord(claim);
  const headline = typeof value.headline === 'string' ? value.headline : '해석 결론';
  const summary = typeof value.summary === 'string' ? value.summary : '';
  return `${headline}. ${summary}`;
}

function assertion(claim) {
  return {
    type: 'assertion',
    text: conclusionText(claim),
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

function claimsOfKind(claims, kind) {
  return claims.filter((claim) => conclusionKind(claim) === kind);
}

function sectionFromClaims(sectionId, title, claims) {
  if (claims.length === 0) return undefined;
  return {
    sectionId,
    title,
    blocks: claims.map(assertion),
  };
}

function previewDraft(evidence) {
  const guard = evidence.claims.find((claim) => claim.claimType === SCOPE_GUARD_CLAIM_TYPE);
  if (guard === undefined) {
    throw new Error('General natal useful-reading scope guard is missing from preview evidence.');
  }

  const conclusions = evidence.claims.filter(
    (claim) => claim.taxonomy.tier === 'T8' && claim.predicate === 'consumer_conclusion',
  );
  if (conclusions.length === 0) {
    throw new Error('Conclusion-oriented general natal preview emitted no consumer conclusions.');
  }

  const core = claimsOfKind(conclusions, 'core');
  const strengths = claimsOfKind(conclusions, 'strength');
  const work = claimsOfKind(conclusions, 'work');
  const money = claimsOfKind(conclusions, 'money');
  const relationship = claimsOfKind(conclusions, 'relationship');
  const tensions = claimsOfKind(conclusions, 'tension');

  const summaryClaims = core.length > 0 ? core : [...strengths, ...work, ...money, ...relationship].slice(0, 2);

  const sections = [
    {
      sectionId: 'research-preview-overall-conclusion',
      title: '한눈에 보는 결론',
      blocks: [...ambiguityBlocks(evidence), ...summaryClaims.map(assertion)],
    },
    sectionFromClaims('research-preview-strengths', '강점으로 읽히는 부분', strengths),
    sectionFromClaims('research-preview-work', '일과 성과', work),
    sectionFromClaims('research-preview-money', '돈과 자원', money),
    sectionFromClaims('research-preview-relationship', '관계와 자기 기준', relationship),
    sectionFromClaims('research-preview-tensions', '부딪히는 지점', tensions),
  ].filter(Boolean);

  sections.push({
    sectionId: 'research-preview-general-natal-scope',
    title: '현재 풀이의 범위',
    blocks: [
      {
        type: 'disclosure',
        disclosureType: 'scope_limitation',
        text: '이 결과는 타고난 명식의 구조를 바탕으로 성향·일하는 방식·자원 운용·관계 방식의 경향을 해석한 연구 미리보기입니다. 특정 직업의 성공 여부, 실제 재산 규모, 배우자 결과, 건강 결과, 사건 발생이나 미래 시기는 이 화면에서 단정하지 않습니다.',
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
    modelId: 'grounded-conclusion-natal-preview',
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
    const registry = createGeneralNatalConclusionCandidateRegistry();
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
  for (const required of ['한눈에 보는 결론', '현재 풀이의 범위']) {
    if (!serialized.includes(required)) {
      throw new Error(`Preview response is missing required section: ${required}`);
    }
  }
  if (!['강점으로 읽히는 부분', '일과 성과', '돈과 자원', '관계와 자기 기준', '부딪히는 지점'].some((title) => serialized.includes(title))) {
    throw new Error('Preview response emitted no substantive conclusion section.');
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
    '"families"',
    '"conclusionKind"',
    '"dominance"',
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
