import { randomUUID } from 'node:crypto';
import process from 'node:process';
import { createMyeonghwaProductHostServer } from '../dist/product-host.js';
import {
  SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
  calculateCanonicalSajuSnapshot,
  runInterpretation,
} from '../dist/index.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../dist/production/production-calculation-policy.js';
import { createCareerNatalReadingCandidateRegistry } from '../dist/research/career-natal-reading-candidate.js';

const RESEARCH_PREVIEW_VERSION = 'myeonghwa-research-ux-preview-v6';
const SCOPE_GUARD_CLAIM_TYPE = 'GENERAL_NATAL_USEFUL_READING_SCOPE-GUARD';
const smokeMode = process.env.MYEONGHWA_PREVIEW_SMOKE === '1';
const fetchRequest = globalThis.fetch.bind(globalThis);

const narrativePolicy = {
  policyId: RESEARCH_PREVIEW_VERSION,
  version: '6.0.0-preview',
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

const CONSUMER_COPY = Object.freeze({
  GENERAL_NATAL_CONCLUSION_CORE_FIVE_FAMILY_CYCLE:
    '여러 가지를 두루 생각하지만, 결국 직접 해보고 결과를 만들어야 속이 풀리는 편에 가깝습니다. 배운 것을 실제로 써보고, 만든 결과까지 책임지는 흐름이 잘 맞습니다. 다만 내 방식대로 하고 싶은 마음과 현실적인 조건이 부딪히면 스트레스를 크게 받을 수 있습니다.',
  GENERAL_NATAL_CONCLUSION_OUTPUT_TO_WEALTH:
    '생각한 것은 직접 만들어봐야 만족하는 편입니다. 아이디어나 기술을 머릿속에만 두기보다 실제 결과물로 꺼낼 때 강점이 살아납니다. 만든 것이 성과나 수입처럼 눈에 보이는 결과로 이어지면 동력도 더 커질 수 있습니다.',
  GENERAL_NATAL_CONCLUSION_WEALTH_TO_OFFICER:
    '결과를 내는 데서 끝나기보다, 그다음에 어떻게 굴리고 관리할지까지 신경 쓰는 편입니다. 맡은 일이 생기면 기준을 만들고 책임지고 마무리하려는 성향이 함께 나타날 수 있습니다.',
  GENERAL_NATAL_CONCLUSION_OFFICER_TO_RESOURCE:
    '압박을 받으면 감으로 버티기보다 정보를 찾고 구조를 파악하려는 쪽에 가깝습니다. 갑자기 일이 꼬여도 자료를 모으고 이해한 뒤 해결책을 만드는 방식이 더 잘 맞을 수 있습니다.',
  GENERAL_NATAL_CONCLUSION_PEER_WEALTH_TENSION:
    '하고 싶은 방식이 분명한데 돈·시간·효율 같은 현실 조건이 끼어들면 답답함을 느끼기 쉽습니다. 특히 “내가 원하는 방식”과 “지금 가장 효율적인 선택”이 다를 때 갈등이 생길 수 있습니다.',
  GENERAL_NATAL_CONCLUSION_WEALTH_RESOURCE_TENSION:
    '충분히 알아보고 시작하고 싶지만, 동시에 빨리 결과도 보고 싶어 하는 편입니다. 그래서 준비가 길어지거나, 반대로 너무 빨리 시작해서 나중에 다시 고치는 일이 반복될 수 있습니다.',
  GENERAL_NATAL_CONCLUSION_PEER_OFFICER_TENSION:
    '내가 납득한 방식대로 하고 싶은 마음이 있는 반면, 책임이나 규칙도 대충 넘기지는 못하는 편입니다. 자율성은 없고 책임만 큰 환경에서는 특히 답답함을 느끼기 쉽습니다.',
  GENERAL_NATAL_CONCLUSION_WORK_OUTPUT_WEALTH_OFFICER:
    '일에서는 한 조각만 맡는 것보다 기획부터 실행, 결과 확인까지 연결해서 볼 수 있을 때 강점이 잘 드러납니다. 시키는 일만 반복하기보다 직접 만들고 개선하고 운영하는 역할이 더 잘 맞을 가능성이 있습니다.',
  GENERAL_NATAL_CONCLUSION_MONEY_WEALTH_PEER_RESOURCE:
    '돈은 단순히 많이 모으는 것보다 “어디에 써야 가치가 커지는가”를 중요하게 보는 편입니다. 배우는 데 쓰는 돈, 일을 키우는 데 쓰는 돈, 그냥 갖고 싶은 데 쓰는 돈을 구분하면 판단이 훨씬 편해질 수 있습니다.',
  GENERAL_NATAL_CONCLUSION_RELATIONSHIP_PEER_OFFICER:
    '사람 관계에서도 선이 분명한 편에 가깝습니다. 무조건 맞춰주기보다 서로 무엇을 맡고 어디까지 책임지는지가 분명할 때 편하고, 기준이 애매하거나 일방적으로 맞춰줘야 하는 관계는 피로하게 느낄 수 있습니다.',
});

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

function careerKind(claim) {
  const value = valueRecord(claim);
  return typeof value.careerKind === 'string' ? value.careerKind : undefined;
}

function consumerText(claim) {
  const mapped = CONSUMER_COPY[claim.claimType];
  if (mapped !== undefined) return mapped;
  const value = valueRecord(claim);
  const summary = typeof value.summary === 'string' ? value.summary : '';
  return summary;
}

function assertion(claim) {
  return {
    type: 'assertion',
    text: consumerText(claim),
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
      text: '출생 정보의 경계 조건 때문에 일부 계산 결과가 달라질 수 있습니다. 이 경우에는 가능한 결과를 나눠서 확인합니다.',
      relatedRefs: [fact.ref],
    }));
}

function claimsOfKind(claims, kind) {
  return claims.filter((claim) => conclusionKind(claim) === kind);
}

function careerClaimsOfKind(claims, kind) {
  return claims.filter((claim) => careerKind(claim) === kind);
}

function sectionFromClaims(sectionId, title, claims) {
  if (claims.length === 0) return undefined;
  return { sectionId, title, blocks: claims.map(assertion) };
}

function generalNatalPreviewDraft(evidence) {
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
      title: '이 사주의 핵심',
      blocks: [...ambiguityBlocks(evidence), ...summaryClaims.map(assertion)],
    },
    sectionFromClaims('research-preview-strengths', '잘 맞는 방식', strengths),
    sectionFromClaims('research-preview-work', '일할 때', work),
    sectionFromClaims('research-preview-money', '돈을 다룰 때', money),
    sectionFromClaims('research-preview-relationship', '사람 관계에서', relationship),
    sectionFromClaims('research-preview-tensions', '주의할 점', tensions),
  ].filter(Boolean);

  sections.push({
    sectionId: 'research-preview-general-natal-scope',
    title: '참고',
    blocks: [
      {
        type: 'disclosure',
        disclosureType: 'scope_limitation',
        text: '지금 결과는 태어난 사주에서 보이는 기본 성향과 일·돈·관계의 경향을 먼저 풀어본 것입니다. 특정 직업의 성공 여부, 실제 재산 규모, 배우자 결과, 건강 문제나 미래의 사건·시기까지 확정해서 말하는 단계는 아닙니다.',
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

function careerNatalPreviewDraft(evidence, careerClaims) {
  const preferredSummary = [
    'CAREER_NATAL_CONCLUSION_OUTPUT_WEALTH_OFFICER_END_TO_END',
    'CAREER_NATAL_CONCLUSION_OUTPUT_WEALTH_MAKE_TO_VALUE',
    'CAREER_NATAL_CONCLUSION_OFFICER_RESOURCE_STRUCTURED_PROBLEM_SOLVING',
  ];
  const summaryClaim =
    preferredSummary
      .map((claimType) => careerClaims.find((claim) => claim.claimType === claimType))
      .find(Boolean) ?? careerClaims[0];
  if (summaryClaim === undefined) {
    throw new Error('Career natal preview emitted no career conclusion.');
  }

  const remaining =
    careerClaims.length === 1
      ? careerClaims
      : careerClaims.filter((claim) => claim.claimId !== summaryClaim.claimId);
  const drivers = careerClaimsOfKind(remaining, 'driver');
  const fits = careerClaimsOfKind(remaining, 'fit');
  const environments = careerClaimsOfKind(remaining, 'environment');
  const friction = careerClaimsOfKind(remaining, 'friction');

  const sections = [
    {
      sectionId: 'research-preview-career-core',
      title: '직업운 핵심',
      blocks: [...ambiguityBlocks(evidence), assertion(summaryClaim)],
    },
    sectionFromClaims('research-preview-career-driver', '일에서 힘이 나는 방식', drivers),
    sectionFromClaims('research-preview-career-fit', '잘 맞을 수 있는 역할 조건', fits),
    sectionFromClaims('research-preview-career-environment', '잘 맞는 업무 환경', environments),
    sectionFromClaims('research-preview-career-friction', '일에서 막히기 쉬운 지점', friction),
  ].filter(Boolean);

  sections.push({
    sectionId: 'research-preview-career-scope',
    title: '참고',
    blocks: [
      {
        type: 'disclosure',
        disclosureType: 'scope_limitation',
        text: '이 직업운은 태어난 사주에서 보이는 일하는 방식과 역할·환경의 경향을 보는 풀이입니다. 특정 직업을 정답으로 지정하거나 취업·승진·연봉·성공 여부, 미래의 시기를 예측하지 않습니다.',
        relatedRefs: [summaryClaim.claimId],
      },
    ],
  });

  return {
    schemaVersion: SUPPORTED_NARRATIVE_OUTPUT_SCHEMA,
    requestId: evidence.requestId,
    sections,
  };
}

function previewDraft(prompt) {
  const evidence = prompt.evidence;
  const requestedSection = prompt.userRequest?.requestedSection;

  if (requestedSection === 'general:natal') {
    return generalNatalPreviewDraft(evidence);
  }
  if (requestedSection === 'career:natal') {
    const careerClaims = evidence.claims.filter(
      (claim) =>
        claim.taxonomy.tier === 'T8' &&
        claim.taxonomy.category === 'career' &&
        claim.predicate === 'career_conclusion',
    );
    if (careerClaims.length === 0) {
      throw new Error('Career natal preview request has no career conclusion evidence.');
    }
    return careerNatalPreviewDraft(evidence, careerClaims);
  }

  throw new Error(`Unsupported research preview section: ${String(requestedSection)}`);
}

class ResearchPreviewNarrativeAdapter {
  metadata = {
    provider: 'deterministic-research-preview',
    modelId: 'grounded-friendly-consumer-preview',
    modelRevision: RESEARCH_PREVIEW_VERSION,
  };

  async generateStructured(prompt) {
    return previewDraft(prompt);
  }
}

const dependencies = {
  calculate(input) {
    return calculateCanonicalSajuSnapshot(input, PRODUCTION_DEFAULT_CALCULATION_POLICY, {
      now: new Date(),
    });
  },
  interpret(snapshot) {
    const registry = createCareerNatalReadingCandidateRegistry();
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

async function requestReading(baseUrl, text) {
  const response = await fetchRequest(`${baseUrl}/api/readings`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      birth: {
        calendarType: 'solar',
        date: '2024-03-10',
        time: '12:00',
        sex: 'unspecified',
      },
      reading: { text },
    }),
  });
  if (!response.ok) throw new Error(`Preview ${text} request failed: ${response.status}`);
  const payload = await response.json();
  if (payload.state !== 'delivered' && payload.state !== 'delivered_with_fallback') {
    throw new Error(`Preview ${text} did not deliver: ${String(payload.state)}`);
  }
  return payload;
}

function assertNoInternalLeak(serialized) {
  for (const forbidden of [
    'classificationAuthorized',
    'fortunePolarityAuthorized',
    'numericScoringAuthorized',
    'wholePersonConclusionAuthorized',
    'outcomeAuthorized',
    'futureTimingAuthorized',
    'specificOccupationAuthorized',
    'careerSuccessAuthorized',
    'incomeOutcomeAuthorized',
    'month_branch_structural_context',
    '"direction"',
    '"families"',
    '"conclusionKind"',
    '"careerKind"',
    '"dominance"',
  ]) {
    if (serialized.includes(forbidden)) {
      throw new Error(`Preview response leaked internal evidence field: ${forbidden}`);
    }
  }
}

async function runSmoke(baseUrl) {
  const health = await fetchRequest(`${baseUrl}/healthz`);
  if (!health.ok) throw new Error(`Preview health check failed: ${health.status}`);

  const generalPayload = await requestReading(baseUrl, '사주');
  const generalSerialized = JSON.stringify(generalPayload);
  for (const required of ['이 사주의 핵심', '참고']) {
    if (!generalSerialized.includes(required)) {
      throw new Error(`Preview response is missing required section: ${required}`);
    }
  }
  if (!['잘 맞는 방식', '일할 때', '돈을 다룰 때', '사람 관계에서', '주의할 점'].some((title) => generalSerialized.includes(title))) {
    throw new Error('Preview response emitted no substantive general consumer section.');
  }
  for (const unfriendly of ['명식 안에', '구조로 읽힙니다', '축이 ', '서로 견제합니다', '작동 방식']) {
    if (generalSerialized.includes(unfriendly)) {
      throw new Error(`Preview response contains analyst-facing wording: ${unfriendly}`);
    }
  }
  assertNoInternalLeak(generalSerialized);

  const careerPayload = await requestReading(baseUrl, '직업운');
  const careerSerialized = JSON.stringify(careerPayload);
  for (const required of ['직업운 핵심', '참고']) {
    if (!careerSerialized.includes(required)) {
      throw new Error(`Career preview is missing required section: ${required}`);
    }
  }
  if (!['일에서 힘이 나는 방식', '잘 맞을 수 있는 역할 조건', '잘 맞는 업무 환경', '일에서 막히기 쉬운 지점'].some((title) => careerSerialized.includes(title))) {
    throw new Error('Career preview emitted no substantive career section.');
  }
  for (const forbiddenPromise of ['취업하게 됩니다', '승진하게 됩니다', '연봉이', '성공합니다', '정답 직업']) {
    if (careerSerialized.includes(forbiddenPromise)) {
      throw new Error(`Career preview contains deterministic career promise: ${forbiddenPromise}`);
    }
  }
  assertNoInternalLeak(careerSerialized);
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
  writeStdout('Current meaningful test targets: 전체 사주, 직업운 (natal)');
  writeStdout('Annual/monthly career and other specialized intents remain fail-closed when evidence is insufficient.');
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