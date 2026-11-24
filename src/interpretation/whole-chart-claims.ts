import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type {
  ClaimTypeDefinition,
  ClaimValueSchemaDefinition,
  InterpretationPack,
  MethodologyDefinition,
  RuleDefinition,
  SourceReference,
} from '../contracts/interpretation.js';
import {
  createResearchEvidenceEnvelope,
  researchEvidenceDefinitionContentHash,
  type ResearchEvidenceDefinition,
} from './research-evidence.js';
import {
  createRuleRegistrySnapshot,
  deterministicContentHash,
  type RuleRegistryInput,
} from './rule-registry.js';
import {
  WHOLE_CHART_JUDGMENT_VERSION,
  type ObservedWholeChart,
  type WholeChartJudgment,
} from './whole-chart-judgment.js';

const VERSION = '1.3.0';
const METHOD = { id: 'M-WHOLE-CHART-STRUCTURAL-JUDGMENT', version: VERSION };
const RULE_SET = 'whole-chart-structural-judgment';
export const WHOLE_CHART_CLAIM = 'WHOLE_CHART_STRUCTURAL_JUDGMENT';
type State = ObservedWholeChart['pattern']['state'] | 'unavailable';
const STATES = [
  'unavailable',
  'unresolved',
  'competing_month_signals',
  'candidate_only',
  'repair_under_review',
  'locally_protected',
  'challenged',
  'strength_required',
  'supported',
] as const satisfies readonly State[];

const SOURCE: SourceReference = {
  sourceId: 'SRC-WHOLE-CHART-ZIPING-ZHENQUAN',
  sourceType: 'classical_text',
  title: '子平真詮',
  author: '沈孝瞻',
  language: 'zh-Hant',
  url: 'https://www.donglishuzhai.net/chapter/3722.html',
  accessedAt: '2026-11-24',
  provenanceTier: 'cross_reference',
  rights: { copyrightStatus: 'unknown', reusePolicy: 'metadata_only' },
  notes: '월령을 바탕으로 성립 근거, 손상 및 구응 후보를 비교하는 범위에 적용합니다.',
};

const EVIDENCE: ResearchEvidenceDefinition = {
  definitionId: 'EVIDENCE-WHOLE-CHART-JUDGMENT',
  version: VERSION,
  evidenceType: 'whole_chart_structural_judgment',
  evidenceVersion: WHOLE_CHART_JUDGMENT_VERSION,
  producerRef: { id: 'whole-chart-judgment', version: WHOLE_CHART_JUDGMENT_VERSION },
  payloadContractRef: { id: 'whole-chart-pattern-state', version: VERSION },
  sourceIds: [SOURCE.sourceId],
  authority: 'research_only',
  snapshotBinding: 'snapshot_id_and_hash',
};
const evidenceRef = { id: EVIDENCE.definitionId, version: VERSION };
const methodology: MethodologyDefinition = {
  methodologyId: METHOD.id,
  version: VERSION,
  family: 'gyeokguk',
  name: '원국의 월령, 통근, 지원과 손상 판단',
  description: '명식에 결속된 공통 판단에서 성립 근거, 상충과 구응의 판정을 선택합니다.',
  assumptions: ['정해진 월령의 후보와 그 후보의 실제 작용을 구분합니다.'],
  requiredFactTypes: [],
  sourceIds: EVIDENCE.sourceIds,
  status: 'research',
};
const schema: ClaimValueSchemaDefinition = {
  schemaId: 'SCHEMA-WHOLE-CHART-STRUCTURAL-JUDGMENT',
  version: VERSION,
  root: { kind: 'string', enum: STATES },
};
const claimType: ClaimTypeDefinition = {
  claimType: WHOLE_CHART_CLAIM,
  version: VERSION,
  valueSchemaRef: { id: schema.schemaId, version: VERSION },
  scope: 'natal',
  exclusiveValue: true,
  scenarioSensitive: false,
  materialForNarrative: false,
  allowedTaxonomyTiers: ['T3'],
};

const rules: readonly RuleDefinition[] = STATES.map((state) => ({
  ruleId: `RULE-WHOLE-CHART-${state.toUpperCase()}`,
  version: VERSION,
  ruleSetId: RULE_SET,
  taxonomy: { tier: 'T3', category: 'gyeokguk', subcategory: 'whole_chart' },
  methodologyRef: METHOD,
  title: '명식의 월령과 구조 판단',
  description: '같은 계산 명식에서 공통 엔진이 내린 판단 상태를 근거로 선택합니다.',
  inputs: [
    {
      key: 'decision',
      source: 'research_evidence',
      pathOrClaimType: EVIDENCE.evidenceType,
      evidenceVersion: EVIDENCE.evidenceVersion,
      researchEvidenceDefinitionRef: evidenceRef,
      required: true,
      ambiguityBehavior: 'requires_resolved',
    },
  ],
  condition: {
    op: 'eq',
    left: { kind: 'input', key: 'decision', path: 'patternState' },
    right: { kind: 'literal', value: state },
  },
  output: {
    claimType: WHOLE_CHART_CLAIM,
    subject: 'natal_chart',
    predicate: 'whole_chart_structural_judgment',
    value: state,
  },
  sourceRefs: [{ sourceId: SOURCE.sourceId, supportType: 'direct_basis' }],
  quality: {
    provenanceQuality: 'primary_supported',
    testCoverage: 'fixture_matrix',
    methodologyStability: 'contested',
    reviewerStatus: 'unreviewed',
  },
  status: 'research',
}));

export function wholeChartClaimValue(judgment: WholeChartJudgment): State {
  return judgment.state === 'observed' ? judgment.pattern.state : 'unavailable';
}

export function wholeChartRuleEvidence(
  snapshot: CanonicalSajuSnapshot,
  judgment: WholeChartJudgment,
) {
  const envelope = createResearchEvidenceEnvelope(EVIDENCE, snapshot, {
    patternState: wholeChartClaimValue(judgment),
    judgmentHash: deterministicContentHash(judgment),
  });
  return {
    definition: EVIDENCE,
    envelope,
    definitionContentHash: researchEvidenceDefinitionContentHash(EVIDENCE),
  };
}

export function withWholeChartRules(input: RuleRegistryInput, pack: InterpretationPack) {
  if (pack.status !== 'research' || pack.wholeChartJudgment !== 'research') {
    throw new TypeError('Whole-chart rules require an opted-in research pack.');
  }
  return {
    input: {
      ...input,
      rules: [...input.rules, ...rules],
      methodologies: [...input.methodologies, methodology],
      sources: [...(input.sources ?? []), SOURCE],
      claimTypeDefinitions: [...(input.claimTypeDefinitions ?? []), claimType],
      claimValueSchemas: [...(input.claimValueSchemas ?? []), schema],
    },
    pack: {
      ...pack,
      methodologyRefs: [...pack.methodologyRefs, METHOD],
      enabledRuleSets: [...pack.enabledRuleSets, RULE_SET],
    },
  };
}

export function createWholeChartRegistrySnapshot(
  input: RuleRegistryInput,
  pack: InterpretationPack,
  createdAt: string,
) {
  const configured = withWholeChartRules(input, pack);
  return createRuleRegistrySnapshot(configured.input, configured.pack, createdAt);
}
