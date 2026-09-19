import { randomUUID } from 'node:crypto';
import type {
  NarrativeDraft,
  NarrativeEvidenceBundle,
  NarrativePolicy,
  NarrativeSection,
} from '../contracts/narrative.js';
import type { InterpretationClaim } from '../contracts/interpretation.js';
import {
  createMyeonghwaProductHost,
  type MyeonghwaProductHost,
} from '../host/product-host.js';
import {
  runInterpretation,
} from '../interpretation/interpretation-engine.js';
import type {
  CompiledNarrativePrompt,
  NarrativeModelAdapter,
} from '../llm/model-adapter.js';
import {
  calculateAuthorizedMyeonghwaProductionSnapshot,
} from '../production/production-calculation-runtime.js';
import {
  createBusinessNatalReadingCandidateRegistry,
} from '../research/business-natal-reading-candidate.js';
import {
  CAREER_NATAL_CLAIM_NARRATIVE_PROFILES,
} from '../research/career-natal-narrative-profiles.js';
import {
  PREVIEW_E2E_APPROVAL,
  isPreviewE2eSupportedReadingSection,
} from './preview-authority.js';

export const PREVIEW_E2E_RUNTIME_VERSION = 'myeonghwa-preview-e2e-runtime-v1' as const;
export const PREVIEW_E2E_OUTPUT_SCHEMA_VERSION = 'myeonghwa-narrative-draft-v1' as const;

const SCOPE_GUARD_CLAIM_TYPE = 'GENERAL_NATAL_USEFUL_READING_SCOPE-GUARD';

const PREVIEW_NARRATIVE_POLICY: NarrativePolicy = Object.freeze({
  policyId: PREVIEW_E2E_RUNTIME_VERSION,
  version: '1.0.0-preview',
  language: 'ko',
  certaintyPolicy: Object.freeze({
    deterministicFacts: 'direct',
    interpretationClaims: 'method_attributed',
    contestedClaims: 'explicit_difference',
    ambiguousFacts: 'explicit_uncertainty',
    futureClaims: 'non_deterministic',
  }),
  tone: Object.freeze({
    style: 'clear',
    avoidFatalism: true,
    avoidFearInduction: true,
  }),
  sensitiveDomains: Object.freeze({
    health: 'non_diagnostic',
    finance: 'non_advisory',
    legal: 'non_advisory',
    safety: 'no_harmful_direction',
  }),
  sourceDisclosure: 'internal_only',
});

const GENERAL_CONSUMER_COPY: Readonly<Record<string, string>> = Object.freeze({
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

const TEN_GOD_FAMILY_STRUCTURE_LABELS: Readonly<Record<string, string>> = Object.freeze({
  peer: '비겁(자기 기준·주도권)',
  resource: '인성(학습·준비)',
  output: '식상(표현·생산)',
  wealth: '재성(현실 성과·자원)',
  officer: '관성(책임·규칙)',
});

const careerProfileByClaimType = new Map(
  CAREER_NATAL_CLAIM_NARRATIVE_PROFILES.map((profile) => [profile.claimType, profile]),
);

function valueRecord(claim: InterpretationClaim): Readonly<Record<string, unknown>> {
  if (claim.value === null || typeof claim.value !== 'object' || Array.isArray(claim.value)) {
    throw new Error(`Preview claim ${claim.claimId} has an unsupported value shape.`);
  }
  return claim.value as Readonly<Record<string, unknown>>;
}

function stringValue(claim: InterpretationClaim, key: string): string | undefined {
  const value = valueRecord(claim)[key];
  return typeof value === 'string' ? value : undefined;
}

function careerProfileSummary(claim: InterpretationClaim): string | undefined {
  const profile = careerProfileByClaimType.get(claim.claimType);
  if (profile === undefined) return undefined;
  const summary = profile.templates?.find(
    (template) => template.templateKey === 'summary' && template.language === 'ko',
  )?.text;
  if (summary === undefined || summary.trim().length === 0) {
    throw new Error(
      `Career ClaimNarrativeProfile ${profile.profileId} has no Korean summary template.`,
    );
  }
  return summary;
}

function consumerText(claim: InterpretationClaim): string {
  const careerSummary = careerProfileSummary(claim);
  if (careerSummary !== undefined) return careerSummary;

  const summary = stringValue(claim, 'summary');
  if (summary !== undefined && summary.trim().length > 0) return summary.trim();

  const generalCopy = GENERAL_CONSUMER_COPY[claim.claimType];
  if (generalCopy !== undefined) return generalCopy;

  throw new Error(`Preview claim ${claim.claimId} has no consumer summary.`);
}

function assertion(claim: InterpretationClaim) {
  return {
    type: 'assertion' as const,
    text: consumerText(claim),
    epistemicType: careerProfileByClaimType.has(claim.claimType)
      ? ('interpretation' as const)
      : ('synthesis' as const),
    evidenceRefs: Object.freeze([{ sourceType: 'claim' as const, ref: claim.claimId }]),
    methodologyRefs: Object.freeze([claim.methodologyRef]),
  };
}

function claimStructureText(claim: InterpretationClaim): string | undefined {
  const families = valueRecord(claim).families;
  if (!Array.isArray(families)) return undefined;
  const labels = families.flatMap((family) =>
    typeof family === 'string' && TEN_GOD_FAMILY_STRUCTURE_LABELS[family] !== undefined
      ? [TEN_GOD_FAMILY_STRUCTURE_LABELS[family]]
      : [],
  );
  if (labels.length === 0) return undefined;
  return `근거 구조: ${labels.join(' · ')}${labels.length > 1 ? '의 결합' : ' 축'}이 이 해석의 직접 근거입니다.`;
}

function claimNarrativeBlocks(claim: InterpretationClaim) {
  const structureText = claimStructureText(claim);
  return structureText === undefined
    ? Object.freeze([assertion(claim)])
    : Object.freeze([
        assertion(claim),
        {
          type: 'assertion' as const,
          text: structureText,
          epistemicType: 'interpretation' as const,
          evidenceRefs: Object.freeze([{ sourceType: 'claim' as const, ref: claim.claimId }]),
          methodologyRefs: Object.freeze([claim.methodologyRef]),
        },
      ]);
}

function ambiguityBlocks(evidence: NarrativeEvidenceBundle) {
  return evidence.canonicalFacts
    .filter((fact) => fact.scenarioRef === undefined && fact.fact.status === 'ambiguous')
    .map((fact) => ({
      type: 'disclosure' as const,
      disclosureType: 'calculation_ambiguity' as const,
      text: '출생 정보의 경계 조건 때문에 일부 계산 결과가 달라질 수 있습니다. 이 경우에는 가능한 결과를 나눠서 확인합니다.',
      relatedRefs: Object.freeze([fact.ref]),
    }));
}

function sectionFromClaims(
  sectionId: string,
  title: string,
  claims: readonly InterpretationClaim[],
): NarrativeSection | undefined {
  if (claims.length === 0) return undefined;
  return Object.freeze({
    sectionId,
    title,
    blocks: Object.freeze(claims.flatMap((claim) => claimNarrativeBlocks(claim))),
  });
}

function claimsByValue(
  claims: readonly InterpretationClaim[],
  valueKey: string,
  value: string,
): readonly InterpretationClaim[] {
  return claims.filter((claim) => stringValue(claim, valueKey) === value);
}

function generalNatalDraft(evidence: NarrativeEvidenceBundle): NarrativeDraft {
  const guard = evidence.claims.find((claim) => claim.claimType === SCOPE_GUARD_CLAIM_TYPE);
  if (guard === undefined) {
    throw new Error('General natal useful-reading scope guard is missing from preview evidence.');
  }
  const conclusions = evidence.claims.filter(
    (claim) =>
      claim.taxonomy.tier === 'T8' &&
      claim.taxonomy.category === 'general' &&
      claim.predicate === 'consumer_conclusion',
  );
  if (conclusions.length === 0) {
    throw new Error('General natal preview emitted no consumer conclusions.');
  }

  const core = claimsByValue(conclusions, 'conclusionKind', 'core');
  const strengths = claimsByValue(conclusions, 'conclusionKind', 'strength');
  const work = claimsByValue(conclusions, 'conclusionKind', 'work');
  const money = claimsByValue(conclusions, 'conclusionKind', 'money');
  const relationship = claimsByValue(conclusions, 'conclusionKind', 'relationship');
  const tensions = claimsByValue(conclusions, 'conclusionKind', 'tension');
  const summaryClaims =
    core.length > 0
      ? core
      : [...strengths, ...work, ...money, ...relationship].slice(0, 2);

  const sections: NarrativeSection[] = [
    {
      sectionId: 'preview-overall-conclusion',
      title: '이 사주의 핵심',
      blocks: Object.freeze([
        ...ambiguityBlocks(evidence),
        ...summaryClaims.flatMap((claim) => claimNarrativeBlocks(claim)),
      ]),
    },
  ];
  for (const section of [
    sectionFromClaims('preview-strengths', '잘 맞는 방식', strengths),
    sectionFromClaims('preview-work', '일할 때', work),
    sectionFromClaims('preview-money', '돈을 다룰 때', money),
    sectionFromClaims('preview-relationship', '사람 관계에서', relationship),
    sectionFromClaims('preview-tensions', '주의할 점', tensions),
  ]) {
    if (section !== undefined) sections.push(section);
  }
  sections.push({
    sectionId: 'preview-general-natal-scope',
    title: '프리뷰 안내',
    blocks: Object.freeze([
      {
        type: 'disclosure',
        disclosureType: 'scope_limitation',
        text: '현재 결과는 연구를 계속 진행하면서 화면과 사용자 경험을 검증하기 위한 프리뷰입니다. 태어난 사주에서 보이는 기본 성향과 일·돈·관계 경향까지만 보여주며, 생산 승인이나 확정적 미래 예측을 의미하지 않습니다.',
        relatedRefs: Object.freeze([guard.claimId]),
      },
    ]),
  });
  return {
    schemaVersion: PREVIEW_E2E_OUTPUT_SCHEMA_VERSION,
    requestId: evidence.requestId,
    sections: Object.freeze(sections),
  };
}

function categoryNatalDraft(input: {
  evidence: NarrativeEvidenceBundle;
  category: 'career' | 'wealth' | 'relationship' | 'business';
  subcategory?: string;
  predicate: string;
  valueKey: string;
  coreTitle: string;
  preferredSummaryClaimTypes: readonly string[];
  groups: readonly Readonly<{ value: string; sectionId: string; title: string }>[];
  scopeText: string;
}): NarrativeDraft {
  const claims = input.evidence.claims.filter(
    (claim) =>
      claim.taxonomy.tier === 'T8' &&
      claim.taxonomy.category === input.category &&
      (input.subcategory === undefined || claim.taxonomy.subcategory === input.subcategory) &&
      claim.predicate === input.predicate,
  );
  if (claims.length === 0) {
    throw new Error(`${input.category} natal preview emitted no conclusion evidence.`);
  }

  const summary =
    input.preferredSummaryClaimTypes
      .map((claimType) => claims.find((claim) => claim.claimType === claimType))
      .find((claim): claim is InterpretationClaim => claim !== undefined) ?? claims[0];
  if (summary === undefined) throw new Error('Preview summary claim is missing.');

  const remaining =
    claims.length === 1
      ? claims
      : claims.filter((claim) => claim.claimId !== summary.claimId);

  const sections: NarrativeSection[] = [
    {
      sectionId: `preview-${input.category}-core`,
      title: input.coreTitle,
      blocks: Object.freeze([
        ...ambiguityBlocks(input.evidence),
        ...claimNarrativeBlocks(summary),
      ]),
    },
  ];

  for (const group of input.groups) {
    const section = sectionFromClaims(
      group.sectionId,
      group.title,
      claimsByValue(remaining, input.valueKey, group.value),
    );
    if (section !== undefined) sections.push(section);
  }

  sections.push({
    sectionId: `preview-${input.category}-scope`,
    title: '프리뷰 안내',
    blocks: Object.freeze([
      {
        type: 'disclosure',
        disclosureType: 'scope_limitation',
        text: input.scopeText,
        relatedRefs: Object.freeze([summary.claimId]),
      },
    ]),
  });

  return {
    schemaVersion: PREVIEW_E2E_OUTPUT_SCHEMA_VERSION,
    requestId: input.evidence.requestId,
    sections: Object.freeze(sections),
  };
}

function previewDraft(prompt: CompiledNarrativePrompt): NarrativeDraft {
  const requestedSection = prompt.userRequest?.requestedSection;
  if (!isPreviewE2eSupportedReadingSection(requestedSection)) {
    throw new Error(
      `PREVIEW_E2E_UNSUPPORTED_SECTION:${requestedSection ?? 'missing'}`,
    );
  }

  if (requestedSection === 'general:natal') {
    return generalNatalDraft(prompt.evidence);
  }
  if (requestedSection === 'career:natal') {
    return categoryNatalDraft({
      evidence: prompt.evidence,
      category: 'career',
      predicate: 'career_conclusion',
      valueKey: 'careerKind',
      coreTitle: '직업운 핵심',
      preferredSummaryClaimTypes: Object.freeze([
        'CAREER_NATAL_CONCLUSION_OUTPUT_WEALTH_OFFICER_END_TO_END',
        'CAREER_NATAL_CONCLUSION_OUTPUT_WEALTH_MAKE_TO_VALUE',
        'CAREER_NATAL_CONCLUSION_OFFICER_RESOURCE_STRUCTURED_PROBLEM_SOLVING',
      ]),
      groups: Object.freeze([
        { value: 'driver', sectionId: 'preview-career-driver', title: '일에서 힘이 나는 방식' },
        { value: 'fit', sectionId: 'preview-career-fit', title: '잘 맞을 수 있는 역할 조건' },
        { value: 'environment', sectionId: 'preview-career-environment', title: '잘 맞는 업무 환경' },
        { value: 'friction', sectionId: 'preview-career-friction', title: '일에서 막히기 쉬운 지점' },
      ]),
      scopeText:
        '현재 결과는 연구를 계속 진행하면서 화면과 사용자 경험을 검증하기 위한 직업운 프리뷰입니다. 특정 직업을 정답으로 지정하거나 취업·승진·연봉·성공 여부를 확정하지 않습니다.',
    });
  }
  if (requestedSection === 'wealth:natal') {
    return categoryNatalDraft({
      evidence: prompt.evidence,
      category: 'wealth',
      predicate: 'wealth_conclusion',
      valueKey: 'wealthKind',
      coreTitle: '재물운 핵심',
      preferredSummaryClaimTypes: Object.freeze([
        'WEALTH_NATAL_CONCLUSION_OUTPUT_WEALTH_OFFICER_VALUE_OPERATING_LOOP',
        'WEALTH_NATAL_CONCLUSION_OUTPUT_WEALTH_MAKE_TO_VALUE',
        'WEALTH_NATAL_CONCLUSION_WEALTH_OFFICER_RESULT_TO_BUDGET',
      ]),
      groups: Object.freeze([
        { value: 'value_creation', sectionId: 'preview-wealth-value', title: '돈과 가치가 연결되는 방식' },
        { value: 'spending', sectionId: 'preview-wealth-spending', title: '돈을 쓰는 기준' },
        { value: 'management', sectionId: 'preview-wealth-management', title: '돈을 관리할 때' },
        { value: 'friction', sectionId: 'preview-wealth-friction', title: '돈에서 흔들리기 쉬운 지점' },
      ]),
      scopeText:
        '현재 결과는 연구를 계속 진행하면서 화면과 사용자 경험을 검증하기 위한 재물운 프리뷰입니다. 실제 재산 규모, 수익률, 횡재 여부, 미래의 돈 시기나 개인 금융 조언을 확정하지 않습니다.',
    });
  }
  if (requestedSection === 'relationship:natal:general') {
    return categoryNatalDraft({
      evidence: prompt.evidence,
      category: 'relationship',
      subcategory: 'general',
      predicate: 'relationship_conclusion',
      valueKey: 'relationshipKind',
      coreTitle: '관계운 핵심',
      preferredSummaryClaimTypes: Object.freeze([
        'RELATIONSHIP_NATAL_CONCLUSION_PEER_OFFICER_AUTONOMY_WITH_BOUNDARY',
        'RELATIONSHIP_NATAL_CONCLUSION_OUTPUT_WEALTH_WORDS_TO_ACTION',
        'RELATIONSHIP_NATAL_CONCLUSION_RESOURCE_OUTPUT_PROCESS_THEN_SPEAK',
      ]),
      groups: Object.freeze([
        { value: 'closeness', sectionId: 'preview-relationship-closeness', title: '가까워지는 방식' },
        { value: 'values', sectionId: 'preview-relationship-values', title: '관계에서 중요하게 보는 것' },
        { value: 'expression', sectionId: 'preview-relationship-expression', title: '표현하고 소통하는 방식' },
        { value: 'boundary', sectionId: 'preview-relationship-boundary', title: '독립성과 경계' },
        { value: 'friction', sectionId: 'preview-relationship-friction', title: '관계에서 주의할 점' },
      ]),
      scopeText:
        '현재 결과는 연구를 계속 진행하면서 화면과 사용자 경험을 검증하기 위한 관계운 프리뷰입니다. 특정 상대의 성격·결혼·이별 결과나 만남 시기를 확정하지 않습니다.',
    });
  }

  return categoryNatalDraft({
    evidence: prompt.evidence,
    category: 'business',
    predicate: 'business_conclusion',
    valueKey: 'businessKind',
    coreTitle: '사업운 핵심',
    preferredSummaryClaimTypes: Object.freeze([
      'BUSINESS_NATAL_CONCLUSION_OUTPUT_WEALTH_OFFICER_OPERATING_LOOP',
      'BUSINESS_NATAL_CONCLUSION_PEER_OFFICER_PARTNER_DECISION_RIGHTS',
      'BUSINESS_NATAL_CONCLUSION_RESOURCE_OUTPUT_ANALYZE_THEN_EXPERIMENT',
    ]),
    groups: Object.freeze([
      { value: 'uncertainty', sectionId: 'preview-business-uncertainty', title: '불확실성을 다루는 방식' },
      { value: 'decision_execution', sectionId: 'preview-business-decision', title: '결정하고 실행하는 방식' },
      { value: 'allocation', sectionId: 'preview-business-allocation', title: '자원을 배분하는 방식' },
      { value: 'partnership', sectionId: 'preview-business-partnership', title: '파트너와 역할을 나눌 때' },
      { value: 'accountability', sectionId: 'preview-business-accountability', title: '책임과 운영 기준' },
      { value: 'pressure', sectionId: 'preview-business-pressure', title: '성과 압박을 받을 때' },
      { value: 'friction', sectionId: 'preview-business-friction', title: '사업에서 주의할 점' },
    ]),
    scopeText:
      '현재 결과는 연구를 계속 진행하면서 화면과 사용자 경험을 검증하기 위한 사업운 프리뷰입니다. 특정 업종, 창업 성공·매출·수익·투자·폐업 여부나 미래 사업 시기를 확정하지 않습니다.',
  });
}

class PreviewE2eNarrativeAdapter implements NarrativeModelAdapter {
  readonly metadata = Object.freeze({
    provider: 'deterministic-preview',
    modelId: 'grounded-consumer-preview',
    modelRevision: PREVIEW_E2E_RUNTIME_VERSION,
  });

  async generateStructured(prompt: CompiledNarrativePrompt): Promise<unknown> {
    return previewDraft(prompt);
  }
}

export function createApprovedPreviewE2eProductHost(): MyeonghwaProductHost {
  if (!PREVIEW_E2E_APPROVAL.approved) {
    throw new Error('Preview E2E authority is not approved.');
  }

  const now = new Date();
  return createMyeonghwaProductHost({
    calculate(input) {
      return calculateAuthorizedMyeonghwaProductionSnapshot(input).snapshot;
    },
    interpret(snapshot, context, requestContext) {
      const registry = createBusinessNatalReadingCandidateRegistry(context.requestedAt);
      return {
        registry,
        interpretation: runInterpretation(snapshot, registry, {
          requestId: context.requestId,
          now: new Date(context.requestedAt),
          ...(requestContext === undefined
            ? {}
            : { temporalFacts: requestContext.temporalFacts }),
        }),
      };
    },
    adapter: new PreviewE2eNarrativeAdapter(),
    narrativePolicy: PREVIEW_NARRATIVE_POLICY,
    readingOptions: {
      outputSchemaVersion: PREVIEW_E2E_OUTPUT_SCHEMA_VERSION,
      readingVersion: PREVIEW_E2E_RUNTIME_VERSION,
      claimNarrativeProfiles: CAREER_NATAL_CLAIM_NARRATIVE_PROFILES,
      narrativeNow: now,
      artifactGeneratedAt: now,
    },
    requestIdFactory: () => `preview_${randomUUID()}`,
  });
}
