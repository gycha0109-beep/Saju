import {
  R022_WEALTH_PATTERN_PROPOSITIONS,
  R022_WEALTH_PATTERN_VERSION,
} from './general-natal-wealth-pattern-conditions.js';
import {
  R023_OFFICER_PATTERN_PROPOSITIONS,
  R023_OFFICER_PATTERN_VERSION,
} from './general-natal-officer-pattern-conditions.js';
import {
  R024_SEAL_PATTERN_PROPOSITIONS,
  R024_SEAL_PATTERN_VERSION,
} from './general-natal-seal-pattern-conditions.js';
import {
  R025_FOOD_GOD_PATTERN_PROPOSITIONS,
  R025_FOOD_GOD_PATTERN_VERSION,
} from './general-natal-food-god-pattern-conditions.js';
import {
  R026_HURTING_OFFICER_PATTERN_VERSION,
  R026_HURTING_OFFICER_PROPOSITIONS,
} from './general-natal-hurting-officer-pattern-conditions.js';
import {
  R027_SEVEN_KILL_PATTERN_PROPOSITIONS,
  R027_SEVEN_KILL_PATTERN_VERSION,
} from './general-natal-seven-kill-pattern-conditions.js';
import { R030_GEJU_CONFLICT_MATRIX_VERSION } from './general-natal-geju-conflict-resolution-matrix.js';
import {
  R126_AUTHORITY,
  R126_CONTROL_DRAIN_OUTPUT_ORDERING_VERSION,
} from './general-natal-control-drain-output-ordering-divergence.js';
import {
  R131_AUTHORITY,
  R131_PATTERN_CANDIDATE_ESTABLISHMENT_BOUNDARY_VERSION,
} from './general-natal-pattern-candidate-establishment-formal-boundary-audit.js';
import {
  R132_AUTHORITY,
  R132_MIXED_MONTH_QI_CANDIDATE_SELECTION_VARIANT_CORPUS_VERSION,
} from './general-natal-mixed-month-qi-candidate-selection-variant-corpus.js';

export const R133_PATTERN_RESCUE_FAILURE_PRECEDENCE_GRAPH_VERSION =
  '0.1.0-research' as const;

export type R133PatternFamily =
  | 'WEALTH'
  | 'OFFICER'
  | 'SEAL'
  | 'FOOD_GOD'
  | 'HURTING_OFFICER'
  | 'SEVEN_KILL'
  | 'CROSS_PATTERN';

export type R133ScenarioKind =
  | 'RESCUE_PATH'
  | 'FAILURE_PATH'
  | 'CONTAMINATION_PATH'
  | 'COUNTEREXAMPLE';

export type R133SourceNature =
  | 'BASE_TEXT_DIRECT'
  | 'LATER_COMMENTARY'
  | 'GOVERNED_REPOSITORY'
  | 'RESEARCH_SYNTHESIS';

export type R133OrderingEvidence =
  | 'EXPLICIT_SOURCE_SEQUENCE'
  | 'COMMENTARY_LOCAL_SEQUENCE'
  | 'REPOSITORY_BOUNDED_SEQUENCE'
  | 'COUNTEREXAMPLE_SYNTHESIS';

export type R133EdgeRelation =
  | 'PRECEDES'
  | 'REMEDIES'
  | 'CONTAMINATES'
  | 'REDIRECTS'
  | 'PRESERVES'
  | 'BLOCKS'
  | 'COUNTEREXAMPLE_TO';

export interface R133GraphEdge {
  from: string;
  to: string;
  relation: R133EdgeRelation;
  orderingEvidence: R133OrderingEvidence;
  localOnly: true;
  globalPrecedenceAuthorized: false;
}

export interface R133GraphScenario {
  caseId: string;
  patternFamily: R133PatternFamily;
  scenarioKind: R133ScenarioKind;
  sourceNature: R133SourceNature;
  sourceStratum: string;
  sourceRefs: readonly string[];
  sourceStatement: string;
  interpretiveReading: string;
  researchInference: string;
  nodes: readonly string[];
  edges: readonly R133GraphEdge[];
  initialState: string;
  perturbingRelation: string;
  rescueOrContaminationRelation: string;
  sourceOutcome:
    | 'RESCUE_OBSERVED'
    | 'FAILURE_OBSERVED'
    | 'CONTAMINATION_OBSERVED'
    | 'COUNTEREXAMPLE_ONLY';
  rescuePreservesOriginalPath: boolean | null;
  rescueRedirectsPath: boolean | null;
  unresolvedOperands: readonly string[];
  rescuePath: boolean;
  contaminationOrFailurePath: boolean;
  counterexample: boolean;
  sameActorOppositeFunctionCounterexample: boolean;
  sourceSentenceOrderIsRuntimeOrder: false;
  numericPrecedenceAuthorized: false;
  globalPrecedenceAuthorized: false;
  rescueResolverAuthorized: false;
  candidateIdentityAuthorized: false;
  establishmentAuthorized: false;
  candidateFactsEmitted: false;
  establishmentFactsEmitted: false;
}

export const R133_SOURCE_REFERENCES = Object.freeze({
  selectedBaseText: Object.freeze({
    sourceId: 'SRC-R133-ZIPING-ZHENQUAN-CHENGBAI-JIUYING',
    title: '子平真詮 / 論用神成敗救應',
    url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_033.htm',
    sourceNature: 'BASE_TEXT_DIRECT' as const,
    verifiedOn: '2026-09-26',
    anchor: '成中有敗，必是帶忌；敗中有成，全憑救應',
  }),
  nlcWitness: Object.freeze({
    sourceId: 'SRC-R133-NLC-ZIPING-ZHENQUAN-VOL2',
    title: '淵海子平 / 子平真詮 第2卷 NLC scan witness',
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/NLC416-13jh002326-46443_%E6%B7%B5%E6%B5%B7%E5%AD%90%E5%B9%B3_%E5%AD%90%E5%B9%B3%E7%9C%9F%E8%A9%AE_%E7%AC%AC2%E5%8D%B7.pdf',
    sourceNature: 'BASE_TEXT_DIRECT' as const,
    verifiedOn: '2026-09-26',
    anchor: '是謂之救應也',
  }),
  selectedCommentary: Object.freeze({
    sourceId: 'SRC-R133-ZIPING-ZHENQUAN-PINGZHU-LOCAL-SEQUENCES',
    title: '子平真詮評註 / 論用神成敗救應',
    url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_033.htm',
    sourceNature: 'LATER_COMMENTARY' as const,
    verifiedOn: '2026-09-26',
    anchor: '救應之例不一',
  }),
});

export const R133_UPSTREAM_BINDINGS = Object.freeze({
  r022: Object.freeze({
    version: R022_WEALTH_PATTERN_VERSION,
    propositionIds: Object.freeze(R022_WEALTH_PATTERN_PROPOSITIONS.map((item) => item.id)),
  }),
  r023: Object.freeze({
    version: R023_OFFICER_PATTERN_VERSION,
    propositionIds: Object.freeze(R023_OFFICER_PATTERN_PROPOSITIONS.map((item) => item.id)),
  }),
  r024: Object.freeze({
    version: R024_SEAL_PATTERN_VERSION,
    propositionIds: Object.freeze(R024_SEAL_PATTERN_PROPOSITIONS.map((item) => item.id)),
  }),
  r025: Object.freeze({
    version: R025_FOOD_GOD_PATTERN_VERSION,
    propositionIds: Object.freeze(R025_FOOD_GOD_PATTERN_PROPOSITIONS.map((item) => item.id)),
  }),
  r026: Object.freeze({
    version: R026_HURTING_OFFICER_PATTERN_VERSION,
    propositionIds: Object.freeze(R026_HURTING_OFFICER_PROPOSITIONS.map((item) => item.id)),
  }),
  r027: Object.freeze({
    version: R027_SEVEN_KILL_PATTERN_VERSION,
    propositionIds: Object.freeze(R027_SEVEN_KILL_PROPOSITIONS.map((item) => item.id)),
  }),
  r030: Object.freeze({
    version: R030_GEJU_CONFLICT_MATRIX_VERSION,
  }),
  r126: Object.freeze({
    version: R126_CONTROL_DRAIN_OUTPUT_ORDERING_VERSION,
    localRescueOrderingObserved: R126_AUTHORITY.localRescueOrderingObserved,
    localContaminationOrderingObserved: R126_AUTHORITY.localContaminationOrderingObserved,
    globalRelationPrecedenceAuthorized: R126_AUTHORITY.globalRelationPrecedenceAuthorized,
  }),
  r131: Object.freeze({
    version: R131_PATTERN_CANDIDATE_ESTABLISHMENT_BOUNDARY_VERSION,
    candidateIdentityAuthorized: R131_AUTHORITY.candidateIdentityAuthorized,
    establishmentPredicateAuthorized: R131_AUTHORITY.establishmentPredicateAuthorized,
  }),
  r132: Object.freeze({
    version: R132_MIXED_MONTH_QI_CANDIDATE_SELECTION_VARIANT_CORPUS_VERSION,
    candidateRankingAuthorized: R132_AUTHORITY.candidateRankingAuthorized,
    candidatePrecedenceAuthorized: R132_AUTHORITY.candidatePrecedenceAuthorized,
  }),
});

function edge(
  from: string,
  to: string,
  relation: R133EdgeRelation,
  orderingEvidence: R133OrderingEvidence,
): R133GraphEdge {
  return Object.freeze({
    from,
    to,
    relation,
    orderingEvidence,
    localOnly: true,
    globalPrecedenceAuthorized: false,
  });
}

function scenario(
  input: Omit<
    R133GraphScenario,
    | 'sourceSentenceOrderIsRuntimeOrder'
    | 'numericPrecedenceAuthorized'
    | 'globalPrecedenceAuthorized'
    | 'rescueResolverAuthorized'
    | 'candidateIdentityAuthorized'
    | 'establishmentAuthorized'
    | 'candidateFactsEmitted'
    | 'establishmentFactsEmitted'
  >,
): R133GraphScenario {
  return Object.freeze({
    ...input,
    sourceSentenceOrderIsRuntimeOrder: false,
    numericPrecedenceAuthorized: false,
    globalPrecedenceAuthorized: false,
    rescueResolverAuthorized: false,
    candidateIdentityAuthorized: false,
    establishmentAuthorized: false,
    candidateFactsEmitted: false,
    establishmentFactsEmitted: false,
  });
}

const BASE = R133_SOURCE_REFERENCES.selectedBaseText.sourceId;
const COMMENTARY = R133_SOURCE_REFERENCES.selectedCommentary.sourceId;

export const R133_GRAPH_SCENARIOS: readonly R133GraphScenario[] = Object.freeze([
  scenario({
    caseId: 'R133-C01-OFFICER-HURTING-SEAL-RESCUE',
    patternFamily: 'OFFICER',
    scenarioKind: 'RESCUE_PATH',
    sourceNature: 'BASE_TEXT_DIRECT',
    sourceStratum: '子平真詮 / 論用神成敗救應',
    sourceRefs: [BASE, 'R023:seal-controls-hurting-protects-officer'],
    sourceStatement: '官逢傷而透印以解之',
    interpretiveReading:
      'The source presents harm to the Officer path first and exposed Resource as the bounded rescue relation.',
    researchInference:
      'Resource follows the local Officer-harmed configuration as rescue; this does not make Resource globally prior to Output.',
    nodes: ['官', '傷', '透印', '解傷'],
    edges: [
      edge('官', '傷', 'CONTAMINATES', 'EXPLICIT_SOURCE_SEQUENCE'),
      edge('傷', '透印', 'PRECEDES', 'EXPLICIT_SOURCE_SEQUENCE'),
      edge('透印', '解傷', 'REMEDIES', 'EXPLICIT_SOURCE_SEQUENCE'),
    ],
    initialState: '官 path',
    perturbingRelation: '傷 harms 官',
    rescueOrContaminationRelation: '透印解傷',
    sourceOutcome: 'RESCUE_OBSERVED',
    rescuePreservesOriginalPath: true,
    rescueRedirectsPath: false,
    unresolvedOperands: ['傷剋 effectiveness', '印制傷 effectiveness', 'position/configuration'],
    rescuePath: true,
    contaminationOrFailurePath: false,
    counterexample: false,
    sameActorOppositeFunctionCounterexample: false,
  }),
  scenario({
    caseId: 'R133-C02-OFFICER-MIXED-KILL-COMBINATION-RESCUE',
    patternFamily: 'OFFICER',
    scenarioKind: 'RESCUE_PATH',
    sourceNature: 'BASE_TEXT_DIRECT',
    sourceStratum: '子平真詮 / 論用神成敗救應',
    sourceRefs: [BASE],
    sourceStatement: '雜煞而合煞以清之',
    interpretiveReading:
      'The source gives combining the mixed Kill as a local clearing response.',
    researchInference:
      'Combination is target- and context-specific; combination presence alone is not a universal rescue operator.',
    nodes: ['官', '雜煞', '合煞', '清'],
    edges: [
      edge('官', '雜煞', 'CONTAMINATES', 'EXPLICIT_SOURCE_SEQUENCE'),
      edge('雜煞', '合煞', 'PRECEDES', 'EXPLICIT_SOURCE_SEQUENCE'),
      edge('合煞', '清', 'REMEDIES', 'EXPLICIT_SOURCE_SEQUENCE'),
    ],
    initialState: '官 path',
    perturbingRelation: '雜煞',
    rescueOrContaminationRelation: '合煞以清',
    sourceOutcome: 'RESCUE_OBSERVED',
    rescuePreservesOriginalPath: true,
    rescueRedirectsPath: false,
    unresolvedOperands: ['which Kill is effectively combined', 'combination effectiveness'],
    rescuePath: true,
    contaminationOrFailurePath: false,
    counterexample: false,
    sameActorOppositeFunctionCounterexample: false,
  }),
  scenario({
    caseId: 'R133-C03-OFFICER-CLASH-MEETING-COMBINATION-RESCUE',
    patternFamily: 'OFFICER',
    scenarioKind: 'RESCUE_PATH',
    sourceNature: 'BASE_TEXT_DIRECT',
    sourceStratum: '子平真詮 / 論用神成敗救應',
    sourceRefs: [BASE],
    sourceStatement: '刑沖而會合以解之',
    interpretiveReading:
      'Meeting/combination is named as a bounded response to punishment/clash in the rescue inventory.',
    researchInference:
      'This local rescue wording cannot be converted into a universal interaction precedence table.',
    nodes: ['官', '刑沖', '會合', '解'],
    edges: [
      edge('官', '刑沖', 'CONTAMINATES', 'EXPLICIT_SOURCE_SEQUENCE'),
      edge('刑沖', '會合', 'PRECEDES', 'EXPLICIT_SOURCE_SEQUENCE'),
      edge('會合', '解', 'REMEDIES', 'EXPLICIT_SOURCE_SEQUENCE'),
    ],
    initialState: '官 path',
    perturbingRelation: '刑沖',
    rescueOrContaminationRelation: '會合解沖',
    sourceOutcome: 'RESCUE_OBSERVED',
    rescuePreservesOriginalPath: true,
    rescueRedirectsPath: false,
    unresolvedOperands: ['刑沖 severity', 'meeting/combination effectiveness', 'interaction settlement'],
    rescuePath: true,
    contaminationOrFailurePath: false,
    counterexample: false,
    sameActorOppositeFunctionCounterexample: false,
  }),
  scenario({
    caseId: 'R133-C04-OFFICER-WEALTH-THEN-HURTING-CONTAMINATION',
    patternFamily: 'OFFICER',
    scenarioKind: 'CONTAMINATION_PATH',
    sourceNature: 'GOVERNED_REPOSITORY',
    sourceStratum: 'R023 / 子平真詮 成中有敗',
    sourceRefs: ['R023:officer-with-wealth-then-hurting'],
    sourceStatement: '正官逢財而又逢傷',
    interpretiveReading:
      'A favorable/supportive Officer-Wealth path can become contaminated when Hurting Officer is added.',
    researchInference:
      'Earlier success ingredients do not establish a terminal outcome before later configuration is considered.',
    nodes: ['正官', '財', '傷'],
    edges: [
      edge('正官', '財', 'PRESERVES', 'REPOSITORY_BOUNDED_SEQUENCE'),
      edge('財', '傷', 'PRECEDES', 'REPOSITORY_BOUNDED_SEQUENCE'),
      edge('傷', '正官', 'CONTAMINATES', 'REPOSITORY_BOUNDED_SEQUENCE'),
    ],
    initialState: '正官逢財',
    perturbingRelation: '又逢傷',
    rescueOrContaminationRelation: '傷官傷官星',
    sourceOutcome: 'CONTAMINATION_OBSERVED',
    rescuePreservesOriginalPath: null,
    rescueRedirectsPath: null,
    unresolvedOperands: ['傷剋 effectiveness', 'full-chart settlement'],
    rescuePath: false,
    contaminationOrFailurePath: true,
    counterexample: false,
    sameActorOppositeFunctionCounterexample: false,
  }),
  scenario({
    caseId: 'R133-C05-WEALTH-ROBBERY-FOOD-RESCUE',
    patternFamily: 'WEALTH',
    scenarioKind: 'RESCUE_PATH',
    sourceNature: 'BASE_TEXT_DIRECT',
    sourceStratum: '子平真詮 / 論用神成敗救應',
    sourceRefs: [BASE, 'R022:wealth-meets-robwealth-output-transforms'],
    sourceStatement: '財逢劫而透食以化之',
    interpretiveReading:
      'The source gives exposed Food God as one rescue path after Wealth encounters Rob Wealth.',
    researchInference:
      'This is one alternative rescue path; it is not ranked above the Officer-control alternative.',
    nodes: ['財', '劫', '透食', '化劫護財'],
    edges: [
      edge('財', '劫', 'CONTAMINATES', 'EXPLICIT_SOURCE_SEQUENCE'),
      edge('劫', '透食', 'PRECEDES', 'EXPLICIT_SOURCE_SEQUENCE'),
      edge('透食', '化劫護財', 'REMEDIES', 'EXPLICIT_SOURCE_SEQUENCE'),
    ],
    initialState: '財 path',
    perturbingRelation: '劫財爭財',
    rescueOrContaminationRelation: '透食化劫',
    sourceOutcome: 'RESCUE_OBSERVED',
    rescuePreservesOriginalPath: true,
    rescueRedirectsPath: false,
    unresolvedOperands: ['劫 effect', '食化 effectiveness', 'position/configuration'],
    rescuePath: true,
    contaminationOrFailurePath: false,
    counterexample: false,
    sameActorOppositeFunctionCounterexample: false,
  }),
  scenario({
    caseId: 'R133-C06-WEALTH-ROBBERY-OFFICER-RESCUE',
    patternFamily: 'WEALTH',
    scenarioKind: 'RESCUE_PATH',
    sourceNature: 'BASE_TEXT_DIRECT',
    sourceStratum: '子平真詮 / 論用神成敗救應',
    sourceRefs: [BASE, 'R022:generate-officer-to-control'],
    sourceStatement: '財逢劫而生官以制之',
    interpretiveReading:
      'The source gives Officer control as another rescue path for the same Wealth-versus-Rob-Wealth problem.',
    researchInference:
      'Food transformation and Officer control are alternatives in the source inventory; no preference ordering is supplied.',
    nodes: ['財', '劫', '生官', '官制劫'],
    edges: [
      edge('財', '劫', 'CONTAMINATES', 'EXPLICIT_SOURCE_SEQUENCE'),
      edge('劫', '生官', 'PRECEDES', 'EXPLICIT_SOURCE_SEQUENCE'),
      edge('生官', '官制劫', 'REMEDIES', 'EXPLICIT_SOURCE_SEQUENCE'),
    ],
    initialState: '財 path',
    perturbingRelation: '劫財爭財',
    rescueOrContaminationRelation: '生官制劫',
    sourceOutcome: 'RESCUE_OBSERVED',
    rescuePreservesOriginalPath: true,
    rescueRedirectsPath: false,
    unresolvedOperands: ['官 control effectiveness', '財生官 applicability', 'position/configuration'],
    rescuePath: true,
    contaminationOrFailurePath: false,
    counterexample: false,
    sameActorOppositeFunctionCounterexample: false,
  }),
  scenario({
    caseId: 'R133-C07-WEALTH-KILL-FOOD-CONTROL-RESCUE',
    patternFamily: 'WEALTH',
    scenarioKind: 'RESCUE_PATH',
    sourceNature: 'BASE_TEXT_DIRECT',
    sourceStratum: '子平真詮 / 論用神成敗救應',
    sourceRefs: [BASE, 'R022:food-controls-kill-and-generates-wealth'],
    sourceStatement: '逢煞而食神制煞以生財',
    interpretiveReading:
      'Food God controls Kill inside the Wealth rescue path and is described together with preserving/generating Wealth.',
    researchInference:
      'The local chain is ordered but does not define Food > Kill > Wealth as a universal runtime precedence.',
    nodes: ['財逢煞', '食神', '制煞', '生財'],
    edges: [
      edge('財逢煞', '食神', 'PRECEDES', 'EXPLICIT_SOURCE_SEQUENCE'),
      edge('食神', '制煞', 'REMEDIES', 'EXPLICIT_SOURCE_SEQUENCE'),
      edge('制煞', '生財', 'PRESERVES', 'EXPLICIT_SOURCE_SEQUENCE'),
    ],
    initialState: '財逢煞',
    perturbingRelation: '煞 threatens Wealth path',
    rescueOrContaminationRelation: '食神制煞以生財',
    sourceOutcome: 'RESCUE_OBSERVED',
    rescuePreservesOriginalPath: true,
    rescueRedirectsPath: false,
    unresolvedOperands: ['制煞 effectiveness', '生財 applicability', 'relative strength'],
    rescuePath: true,
    contaminationOrFailurePath: false,
    counterexample: false,
    sameActorOppositeFunctionCounterexample: false,
  }),
  scenario({
    caseId: 'R133-C08-WEALTH-KILL-COMBINATION-RESCUE',
    patternFamily: 'WEALTH',
    scenarioKind: 'RESCUE_PATH',
    sourceNature: 'BASE_TEXT_DIRECT',
    sourceStratum: '子平真詮 / 論用神成敗救應',
    sourceRefs: [BASE, 'R022:preserve-wealth-combine-kill'],
    sourceStatement: '或存財而合煞',
    interpretiveReading:
      'Combining Kill while preserving Wealth is an alternative bounded rescue.',
    researchInference:
      'This alternative is not ranked against Food-control rescue.',
    nodes: ['財逢煞', '存財', '合煞'],
    edges: [
      edge('財逢煞', '存財', 'PRECEDES', 'EXPLICIT_SOURCE_SEQUENCE'),
      edge('存財', '合煞', 'REMEDIES', 'EXPLICIT_SOURCE_SEQUENCE'),
    ],
    initialState: '財逢煞',
    perturbingRelation: '煞',
    rescueOrContaminationRelation: '合煞存財',
    sourceOutcome: 'RESCUE_OBSERVED',
    rescuePreservesOriginalPath: true,
    rescueRedirectsPath: false,
    unresolvedOperands: ['combination effectiveness', 'preservation of Wealth'],
    rescuePath: true,
    contaminationOrFailurePath: false,
    counterexample: false,
    sameActorOppositeFunctionCounterexample: false,
  }),
  scenario({
    caseId: 'R133-C09-WEALTH-GENERATES-OFFICER-THEN-CONTAMINATED',
    patternFamily: 'WEALTH',
    scenarioKind: 'CONTAMINATION_PATH',
    sourceNature: 'GOVERNED_REPOSITORY',
    sourceStratum: 'R022 / 子平真詮 成中有敗',
    sourceRefs: ['R022:wealth-generates-officer-but-meets-hurting-or-combination'],
    sourceStatement: '財旺生官而又逢傷逢合',
    interpretiveReading:
      'An initially successful Wealth-generates-Officer path is not terminal when Hurting Officer or combination intervenes.',
    researchInference:
      'Success-path recognition must not short-circuit later contamination evidence.',
    nodes: ['財旺', '生官', '傷或合', '帶忌'],
    edges: [
      edge('財旺', '生官', 'PRESERVES', 'REPOSITORY_BOUNDED_SEQUENCE'),
      edge('生官', '傷或合', 'PRECEDES', 'REPOSITORY_BOUNDED_SEQUENCE'),
      edge('傷或合', '帶忌', 'CONTAMINATES', 'REPOSITORY_BOUNDED_SEQUENCE'),
    ],
    initialState: '財旺生官',
    perturbingRelation: '傷或合',
    rescueOrContaminationRelation: '官被傷或財被合',
    sourceOutcome: 'CONTAMINATION_OBSERVED',
    rescuePreservesOriginalPath: null,
    rescueRedirectsPath: null,
    unresolvedOperands: ['傷 effect', '合 effect', 'position/configuration'],
    rescuePath: false,
    contaminationOrFailurePath: true,
    counterexample: false,
    sameActorOppositeFunctionCounterexample: false,
  }),
  scenario({
    caseId: 'R133-C10-SEAL-WEALTH-ROBBERY-RESCUE',
    patternFamily: 'SEAL',
    scenarioKind: 'RESCUE_PATH',
    sourceNature: 'BASE_TEXT_DIRECT',
    sourceStratum: '子平真詮 / 論用神成敗救應',
    sourceRefs: [BASE],
    sourceStatement: '印逢財而劫財以解之',
    interpretiveReading:
      'Rob Wealth is named as a rescue response when Wealth damages Resource.',
    researchInference:
      'Rob Wealth can be rescue in this exact relation despite being a Wealth-path threat elsewhere.',
    nodes: ['印', '財破印', '劫財', '解財護印'],
    edges: [
      edge('印', '財破印', 'CONTAMINATES', 'EXPLICIT_SOURCE_SEQUENCE'),
      edge('財破印', '劫財', 'PRECEDES', 'EXPLICIT_SOURCE_SEQUENCE'),
      edge('劫財', '解財護印', 'REMEDIES', 'EXPLICIT_SOURCE_SEQUENCE'),
    ],
    initialState: '印 path',
    perturbingRelation: '財破印',
    rescueOrContaminationRelation: '劫財解財',
    sourceOutcome: 'RESCUE_OBSERVED',
    rescuePreservesOriginalPath: true,
    rescueRedirectsPath: false,
    unresolvedOperands: ['財破印 effectiveness', '劫財制財 effectiveness'],
    rescuePath: true,
    contaminationOrFailurePath: false,
    counterexample: false,
    sameActorOppositeFunctionCounterexample: false,
  }),
  scenario({
    caseId: 'R133-C11-SEAL-WEALTH-COMBINATION-RESCUE',
    patternFamily: 'SEAL',
    scenarioKind: 'RESCUE_PATH',
    sourceNature: 'BASE_TEXT_DIRECT',
    sourceStratum: '子平真詮 / 論用神成敗救應',
    sourceRefs: [BASE],
    sourceStatement: '或合財而存印',
    interpretiveReading:
      'Combining Wealth to preserve Resource is an alternative Resource rescue.',
    researchInference:
      'Combination has a local target-specific function; it is not globally favorable.',
    nodes: ['印', '財破印', '合財', '存印'],
    edges: [
      edge('印', '財破印', 'CONTAMINATES', 'EXPLICIT_SOURCE_SEQUENCE'),
      edge('財破印', '合財', 'PRECEDES', 'EXPLICIT_SOURCE_SEQUENCE'),
      edge('合財', '存印', 'REMEDIES', 'EXPLICIT_SOURCE_SEQUENCE'),
    ],
    initialState: '印 path',
    perturbingRelation: '財破印',
    rescueOrContaminationRelation: '合財存印',
    sourceOutcome: 'RESCUE_OBSERVED',
    rescuePreservesOriginalPath: true,
    rescueRedirectsPath: false,
    unresolvedOperands: ['combination effectiveness', 'Resource preservation'],
    rescuePath: true,
    contaminationOrFailurePath: false,
    counterexample: false,
    sameActorOppositeFunctionCounterexample: false,
  }),
  scenario({
    caseId: 'R133-C12-SEAL-KILL-GENERATION-WEALTH-CONTAMINATION',
    patternFamily: 'SEAL',
    scenarioKind: 'CONTAMINATION_PATH',
    sourceNature: 'GOVERNED_REPOSITORY',
    sourceStratum: 'R024 / 子平真詮 成中有敗',
    sourceRefs: ['R024:kill-generates-seal-then-wealth-breaks-seal'],
    sourceStatement: '透煞以生印，而又透財，以去印存煞',
    interpretiveReading:
      'Wealth removing Resource preserves Kill here and is recorded as contamination rather than rescue.',
    researchInference:
      '財去印 is not intrinsically rescuing; its function depends on which local path is being protected.',
    nodes: ['透煞', '生印', '透財', '去印', '存煞'],
    edges: [
      edge('透煞', '生印', 'PRESERVES', 'REPOSITORY_BOUNDED_SEQUENCE'),
      edge('生印', '透財', 'PRECEDES', 'REPOSITORY_BOUNDED_SEQUENCE'),
      edge('透財', '去印', 'CONTAMINATES', 'REPOSITORY_BOUNDED_SEQUENCE'),
      edge('去印', '存煞', 'PRESERVES', 'REPOSITORY_BOUNDED_SEQUENCE'),
    ],
    initialState: '煞生印 path',
    perturbingRelation: '透財',
    rescueOrContaminationRelation: '財去印存煞',
    sourceOutcome: 'CONTAMINATION_OBSERVED',
    rescuePreservesOriginalPath: null,
    rescueRedirectsPath: null,
    unresolvedOperands: ['財破印 effectiveness', 'Kill preservation effect'],
    rescuePath: false,
    contaminationOrFailurePath: true,
    counterexample: false,
    sameActorOppositeFunctionCounterexample: false,
  }),
  scenario({
    caseId: 'R133-C13-FOOD-OWL-REDIRECT-TO-KILL',
    patternFamily: 'FOOD_GOD',
    scenarioKind: 'RESCUE_PATH',
    sourceNature: 'BASE_TEXT_DIRECT',
    sourceStratum: '子平真詮 / 論用神成敗救應',
    sourceRefs: [BASE, 'R025:food-meets-owl-switch-to-kill'],
    sourceStatement: '食逢梟而就煞以成格',
    interpretiveReading:
      'The source describes a rescue that redirects away from the ordinary Food path toward Kill.',
    researchInference:
      'Rescue does not always preserve the original path; redirecting rescue must remain distinct.',
    nodes: ['食', '逢梟', '就煞', 'source rescue outcome'],
    edges: [
      edge('食', '逢梟', 'CONTAMINATES', 'EXPLICIT_SOURCE_SEQUENCE'),
      edge('逢梟', '就煞', 'REDIRECTS', 'EXPLICIT_SOURCE_SEQUENCE'),
      edge('就煞', 'source rescue outcome', 'REMEDIES', 'EXPLICIT_SOURCE_SEQUENCE'),
    ],
    initialState: '食 path',
    perturbingRelation: '梟奪食',
    rescueOrContaminationRelation: '就煞',
    sourceOutcome: 'RESCUE_OBSERVED',
    rescuePreservesOriginalPath: false,
    rescueRedirectsPath: true,
    unresolvedOperands: ['棄食/就煞 switch condition', 'Kill suitability', 'Seal relation'],
    rescuePath: true,
    contaminationOrFailurePath: false,
    counterexample: false,
    sameActorOppositeFunctionCounterexample: false,
  }),
  scenario({
    caseId: 'R133-C14-FOOD-OWL-WEALTH-PROTECTS-FOOD',
    patternFamily: 'FOOD_GOD',
    scenarioKind: 'RESCUE_PATH',
    sourceNature: 'BASE_TEXT_DIRECT',
    sourceStratum: '子平真詮 / 論用神成敗救應',
    sourceRefs: [BASE, 'R025:wealth-protects-food'],
    sourceStatement: '或生財以護食',
    interpretiveReading:
      'Generating Wealth to protect Food is an alternative rescue that preserves the Food path.',
    researchInference:
      'The source lists this beside the redirect-to-Kill path without ranking the alternatives.',
    nodes: ['食', '逢梟', '生財', '護食'],
    edges: [
      edge('食', '逢梟', 'CONTAMINATES', 'EXPLICIT_SOURCE_SEQUENCE'),
      edge('逢梟', '生財', 'PRECEDES', 'EXPLICIT_SOURCE_SEQUENCE'),
      edge('生財', '護食', 'REMEDIES', 'EXPLICIT_SOURCE_SEQUENCE'),
    ],
    initialState: '食 path',
    perturbingRelation: '梟奪食',
    rescueOrContaminationRelation: '生財護食',
    sourceOutcome: 'RESCUE_OBSERVED',
    rescuePreservesOriginalPath: true,
    rescueRedirectsPath: false,
    unresolvedOperands: ['財制梟 effectiveness', 'position/configuration'],
    rescuePath: true,
    contaminationOrFailurePath: false,
    counterexample: false,
    sameActorOppositeFunctionCounterexample: false,
  }),
  scenario({
    caseId: 'R133-C15-FOOD-KILL-SEAL-WEALTH-CONTAMINATION',
    patternFamily: 'FOOD_GOD',
    scenarioKind: 'CONTAMINATION_PATH',
    sourceNature: 'GOVERNED_REPOSITORY',
    sourceStratum: 'R025 / 子平真詮 成中有敗',
    sourceRefs: ['R025:food-kill-seal-then-wealth'],
    sourceStatement: '食神帶煞印而又逢財',
    interpretiveReading:
      'Adding Wealth to the bounded Food-Kill-Resource configuration is recorded as contamination.',
    researchInference:
      'Wealth cannot be assigned a fixed rescue polarity across pattern contexts.',
    nodes: ['食神', '煞印', '逢財', '帶忌'],
    edges: [
      edge('食神', '煞印', 'PRESERVES', 'REPOSITORY_BOUNDED_SEQUENCE'),
      edge('煞印', '逢財', 'PRECEDES', 'REPOSITORY_BOUNDED_SEQUENCE'),
      edge('逢財', '帶忌', 'CONTAMINATES', 'REPOSITORY_BOUNDED_SEQUENCE'),
    ],
    initialState: '食神帶煞印',
    perturbingRelation: '又逢財',
    rescueOrContaminationRelation: '財 changes the local chain',
    sourceOutcome: 'CONTAMINATION_OBSERVED',
    rescuePreservesOriginalPath: null,
    rescueRedirectsPath: null,
    unresolvedOperands: ['財黨煞 effect', '財破印 effect', 'relative strength'],
    rescuePath: false,
    contaminationOrFailurePath: true,
    counterexample: false,
    sameActorOppositeFunctionCounterexample: false,
  }),
  scenario({
    caseId: 'R133-C16-HURTING-WEALTH-KILL-COMBINATION-RESCUE',
    patternFamily: 'HURTING_OFFICER',
    scenarioKind: 'RESCUE_PATH',
    sourceNature: 'BASE_TEXT_DIRECT',
    sourceStratum: '子平真詮 / 論用神成敗救應',
    sourceRefs: [BASE, 'R026:kill-combined-rescue'],
    sourceStatement: '傷官生財透煞而煞逢合',
    interpretiveReading:
      'The source gives combination of Kill as rescue after the Hurting-Officer-generates-Wealth path is contaminated by exposed Kill.',
    researchInference:
      'Combination is locally rescuing because of its target; it is not a universal last-step winner.',
    nodes: ['傷官', '生財', '透煞', '煞逢合'],
    edges: [
      edge('傷官', '生財', 'PRESERVES', 'EXPLICIT_SOURCE_SEQUENCE'),
      edge('生財', '透煞', 'PRECEDES', 'EXPLICIT_SOURCE_SEQUENCE'),
      edge('透煞', '煞逢合', 'REMEDIES', 'EXPLICIT_SOURCE_SEQUENCE'),
    ],
    initialState: '傷官生財',
    perturbingRelation: '透煞',
    rescueOrContaminationRelation: '煞逢合',
    sourceOutcome: 'RESCUE_OBSERVED',
    rescuePreservesOriginalPath: true,
    rescueRedirectsPath: false,
    unresolvedOperands: ['Kill combination effectiveness', 'position/configuration'],
    rescuePath: true,
    contaminationOrFailurePath: false,
    counterexample: false,
    sameActorOppositeFunctionCounterexample: false,
  }),
  scenario({
    caseId: 'R133-C17-HURTING-WEALTH-COMBINED-CONTAMINATION',
    patternFamily: 'HURTING_OFFICER',
    scenarioKind: 'CONTAMINATION_PATH',
    sourceNature: 'GOVERNED_REPOSITORY',
    sourceStratum: 'R026 / 子平真詮 成中有敗',
    sourceRefs: ['R026:wealth-combined-away'],
    sourceStatement: '傷官生財而財又逢合',
    interpretiveReading:
      'Combination of Wealth disrupts the Hurting-Officer-generates-Wealth path.',
    researchInference:
      'The same broad mechanism, 合, can rescue or contaminate depending on its target.',
    nodes: ['傷官', '生財', '財逢合', '帶忌'],
    edges: [
      edge('傷官', '生財', 'PRESERVES', 'REPOSITORY_BOUNDED_SEQUENCE'),
      edge('生財', '財逢合', 'PRECEDES', 'REPOSITORY_BOUNDED_SEQUENCE'),
      edge('財逢合', '帶忌', 'CONTAMINATES', 'REPOSITORY_BOUNDED_SEQUENCE'),
    ],
    initialState: '傷官生財',
    perturbingRelation: '財逢合',
    rescueOrContaminationRelation: '財被合',
    sourceOutcome: 'CONTAMINATION_OBSERVED',
    rescuePreservesOriginalPath: null,
    rescueRedirectsPath: null,
    unresolvedOperands: ['combination effectiveness', 'Wealth-path continuity'],
    rescuePath: false,
    contaminationOrFailurePath: true,
    counterexample: false,
    sameActorOppositeFunctionCounterexample: false,
  }),
  scenario({
    caseId: 'R133-C18-HURTING-SEAL-DAMAGED-CONTAMINATION',
    patternFamily: 'HURTING_OFFICER',
    scenarioKind: 'CONTAMINATION_PATH',
    sourceNature: 'GOVERNED_REPOSITORY',
    sourceStratum: 'R026 / 子平真詮 成中有敗',
    sourceRefs: ['R026:seal-damaged'],
    sourceStatement: '佩印而印又遭傷',
    interpretiveReading:
      'A Resource-supported Hurting Officer path becomes contaminated when the Resource is damaged.',
    researchInference:
      'Presence of a rescue/support actor is not terminal if that actor itself is later impaired.',
    nodes: ['傷官佩印', '印遭傷', '帶忌'],
    edges: [
      edge('傷官佩印', '印遭傷', 'PRECEDES', 'REPOSITORY_BOUNDED_SEQUENCE'),
      edge('印遭傷', '帶忌', 'CONTAMINATES', 'REPOSITORY_BOUNDED_SEQUENCE'),
    ],
    initialState: '傷官佩印',
    perturbingRelation: '印遭傷',
    rescueOrContaminationRelation: 'support actor damaged',
    sourceOutcome: 'CONTAMINATION_OBSERVED',
    rescuePreservesOriginalPath: null,
    rescueRedirectsPath: null,
    unresolvedOperands: ['印 damage effectiveness', 'root/strength context'],
    rescuePath: false,
    contaminationOrFailurePath: true,
    counterexample: false,
    sameActorOppositeFunctionCounterexample: false,
  }),
  scenario({
    caseId: 'R133-C19-SEVEN-KILL-FOOD-CONTROL-SEAL-CONTAMINATION',
    patternFamily: 'SEVEN_KILL',
    scenarioKind: 'CONTAMINATION_PATH',
    sourceNature: 'GOVERNED_REPOSITORY',
    sourceStratum: 'R027 / 子平真詮 成中有敗',
    sourceRefs: ['R027:food-controls-kill-then-seal'],
    sourceStatement: '七煞逢食制而又逢印',
    interpretiveReading:
      'Resource is contamination here because it interferes with Food controlling Kill.',
    researchInference:
      'Resource cannot have a universal rescue priority merely because it rescues Officer in another pattern.',
    nodes: ['七煞', '食制', '又逢印', '帶忌'],
    edges: [
      edge('七煞', '食制', 'PRESERVES', 'REPOSITORY_BOUNDED_SEQUENCE'),
      edge('食制', '又逢印', 'PRECEDES', 'REPOSITORY_BOUNDED_SEQUENCE'),
      edge('又逢印', '帶忌', 'CONTAMINATES', 'REPOSITORY_BOUNDED_SEQUENCE'),
    ],
    initialState: '煞逢食制',
    perturbingRelation: '印來護煞/奪食',
    rescueOrContaminationRelation: '印 interferes with 食制',
    sourceOutcome: 'CONTAMINATION_OBSERVED',
    rescuePreservesOriginalPath: null,
    rescueRedirectsPath: null,
    unresolvedOperands: ['印奪食 effectiveness', '食制煞 effectiveness', 'relative strength'],
    rescuePath: false,
    contaminationOrFailurePath: true,
    counterexample: false,
    sameActorOppositeFunctionCounterexample: false,
  }),
  scenario({
    caseId: 'R133-C20-SEVEN-KILL-FOOD-SEAL-WEALTH-MULTISTEP-RESCUE',
    patternFamily: 'SEVEN_KILL',
    scenarioKind: 'RESCUE_PATH',
    sourceNature: 'BASE_TEXT_DIRECT',
    sourceStratum: '子平真詮 / 論用神成敗救應',
    sourceRefs: [BASE, 'R027:wealth-removes-seal-preserves-food'],
    sourceStatement: '煞逢食制，印來護煞，而逢財以去印存食',
    interpretiveReading:
      'The source explicitly preserves a multi-step chain: Food controls Kill, Resource protects Kill/interferes with Food, then Wealth removes Resource and preserves Food.',
    researchInference:
      'This is strong local ordering evidence but still not a global 財 > 印 > 食 > 煞 precedence rule.',
    nodes: ['煞', '食制', '印護煞', '財去印', '存食'],
    edges: [
      edge('煞', '食制', 'PRESERVES', 'EXPLICIT_SOURCE_SEQUENCE'),
      edge('食制', '印護煞', 'CONTAMINATES', 'EXPLICIT_SOURCE_SEQUENCE'),
      edge('印護煞', '財去印', 'PRECEDES', 'EXPLICIT_SOURCE_SEQUENCE'),
      edge('財去印', '存食', 'REMEDIES', 'EXPLICIT_SOURCE_SEQUENCE'),
    ],
    initialState: '煞逢食制',
    perturbingRelation: '印來護煞',
    rescueOrContaminationRelation: '財去印存食',
    sourceOutcome: 'RESCUE_OBSERVED',
    rescuePreservesOriginalPath: true,
    rescueRedirectsPath: false,
    unresolvedOperands: ['食制 effectiveness', '印護煞 effect', '財去印 effect', 'position/configuration'],
    rescuePath: true,
    contaminationOrFailurePath: false,
    counterexample: false,
    sameActorOppositeFunctionCounterexample: false,
  }),
  scenario({
    caseId: 'R133-C21-COUNTEREXAMPLE-WEALTH-REMOVES-SEAL-OPPOSITE-FUNCTION',
    patternFamily: 'CROSS_PATTERN',
    scenarioKind: 'COUNTEREXAMPLE',
    sourceNature: 'RESEARCH_SYNTHESIS',
    sourceStratum: 'R024 vs R027',
    sourceRefs: ['R024:kill-generates-seal-then-wealth-breaks-seal', 'R027:wealth-removes-seal-preserves-food'],
    sourceStatement:
      'R024 preserves 財去印存煞 as contamination; R027 preserves 財去印存食 as rescue.',
    interpretiveReading:
      'The same broad Wealth-removes-Resource action has opposite bounded function depending on which path is being preserved.',
    researchInference:
      'No universal 財去印 = rescue or 財去印 = failure rule is authorized.',
    nodes: ['財去印:R024', 'CONTAMINATION', '財去印:R027', 'RESCUE'],
    edges: [
      edge('財去印:R024', 'CONTAMINATION', 'COUNTEREXAMPLE_TO', 'COUNTEREXAMPLE_SYNTHESIS'),
      edge('財去印:R027', 'RESCUE', 'COUNTEREXAMPLE_TO', 'COUNTEREXAMPLE_SYNTHESIS'),
    ],
    initialState: 'cross-pattern comparison',
    perturbingRelation: '財去印',
    rescueOrContaminationRelation: 'context-dependent opposite function',
    sourceOutcome: 'COUNTEREXAMPLE_ONLY',
    rescuePreservesOriginalPath: null,
    rescueRedirectsPath: null,
    unresolvedOperands: ['pattern context', 'target relation', 'effectiveness'],
    rescuePath: false,
    contaminationOrFailurePath: false,
    counterexample: true,
    sameActorOppositeFunctionCounterexample: true,
  }),
  scenario({
    caseId: 'R133-C22-COUNTEREXAMPLE-RESOURCE-RESCUES-OFFICER-CONTAMINATES-KILL',
    patternFamily: 'CROSS_PATTERN',
    scenarioKind: 'COUNTEREXAMPLE',
    sourceNature: 'RESEARCH_SYNTHESIS',
    sourceStratum: 'R023 vs R027',
    sourceRefs: ['R023:seal-controls-hurting-protects-officer', 'R027:food-controls-kill-then-seal'],
    sourceStatement:
      'Resource rescues 官逢傷 in R023 but contaminates 七煞逢食制 in R027.',
    interpretiveReading:
      'Resource protects one local path while disrupting another.',
    researchInference:
      'No universal Resource rescue precedence is authorized.',
    nodes: ['印:R023', 'RESCUE', '印:R027', 'CONTAMINATION'],
    edges: [
      edge('印:R023', 'RESCUE', 'COUNTEREXAMPLE_TO', 'COUNTEREXAMPLE_SYNTHESIS'),
      edge('印:R027', 'CONTAMINATION', 'COUNTEREXAMPLE_TO', 'COUNTEREXAMPLE_SYNTHESIS'),
    ],
    initialState: 'cross-pattern comparison',
    perturbingRelation: '印',
    rescueOrContaminationRelation: 'context-dependent opposite function',
    sourceOutcome: 'COUNTEREXAMPLE_ONLY',
    rescuePreservesOriginalPath: null,
    rescueRedirectsPath: null,
    unresolvedOperands: ['pattern context', 'target relation', 'relative strength'],
    rescuePath: false,
    contaminationOrFailurePath: false,
    counterexample: true,
    sameActorOppositeFunctionCounterexample: true,
  }),
  scenario({
    caseId: 'R133-C23-COUNTEREXAMPLE-COMBINATION-RESCUES-KILL-BUT-HARMS-WEALTH',
    patternFamily: 'CROSS_PATTERN',
    scenarioKind: 'COUNTEREXAMPLE',
    sourceNature: 'RESEARCH_SYNTHESIS',
    sourceStratum: 'R026 vs R022',
    sourceRefs: ['R026:kill-combined-rescue', 'R022:wealth-generates-officer-but-meets-hurting-or-combination'],
    sourceStatement:
      '煞逢合 is rescue in the Hurting-Officer path, while 財又逢合 is contamination in the Wealth path.',
    interpretiveReading:
      'Combination polarity depends on what is combined and what local path requires preservation.',
    researchInference:
      'No universal 合-before-沖, 合-wins, or 合-is-rescue precedence is authorized.',
    nodes: ['合煞', 'RESCUE', '合財', 'CONTAMINATION'],
    edges: [
      edge('合煞', 'RESCUE', 'COUNTEREXAMPLE_TO', 'COUNTEREXAMPLE_SYNTHESIS'),
      edge('合財', 'CONTAMINATION', 'COUNTEREXAMPLE_TO', 'COUNTEREXAMPLE_SYNTHESIS'),
    ],
    initialState: 'cross-pattern comparison',
    perturbingRelation: '合',
    rescueOrContaminationRelation: 'target-dependent opposite function',
    sourceOutcome: 'COUNTEREXAMPLE_ONLY',
    rescuePreservesOriginalPath: null,
    rescueRedirectsPath: null,
    unresolvedOperands: ['combination target', 'combination effectiveness', 'position'],
    rescuePath: false,
    contaminationOrFailurePath: false,
    counterexample: true,
    sameActorOppositeFunctionCounterexample: true,
  }),
  scenario({
    caseId: 'R133-C24-COUNTEREXAMPLE-WEALTH-PROTECTS-FOOD-BUT-DAMAGES-SEAL',
    patternFamily: 'CROSS_PATTERN',
    scenarioKind: 'COUNTEREXAMPLE',
    sourceNature: 'RESEARCH_SYNTHESIS',
    sourceStratum: 'R025 vs R024',
    sourceRefs: ['R025:wealth-protects-food', 'R024:light-seal-meets-wealth'],
    sourceStatement:
      '生財以護食 is rescue in the Food path, while 印輕逢財 is failure in the Resource path.',
    interpretiveReading:
      'Wealth can protect Food and damage Resource in different bounded contexts.',
    researchInference:
      'No universal Wealth polarity or rescue priority is authorized.',
    nodes: ['財:R025', 'RESCUE', '財:R024', 'FAILURE'],
    edges: [
      edge('財:R025', 'RESCUE', 'COUNTEREXAMPLE_TO', 'COUNTEREXAMPLE_SYNTHESIS'),
      edge('財:R024', 'FAILURE', 'COUNTEREXAMPLE_TO', 'COUNTEREXAMPLE_SYNTHESIS'),
    ],
    initialState: 'cross-pattern comparison',
    perturbingRelation: '財',
    rescueOrContaminationRelation: 'context-dependent opposite function',
    sourceOutcome: 'COUNTEREXAMPLE_ONLY',
    rescuePreservesOriginalPath: null,
    rescueRedirectsPath: null,
    unresolvedOperands: ['pattern context', 'relative strength', 'position'],
    rescuePath: false,
    contaminationOrFailurePath: false,
    counterexample: true,
    sameActorOppositeFunctionCounterexample: true,
  }),
  scenario({
    caseId: 'R133-C25-COUNTEREXAMPLE-KILL-SUPPORTS-SEAL-BUT-BREAKS-WEALTH',
    patternFamily: 'CROSS_PATTERN',
    scenarioKind: 'COUNTEREXAMPLE',
    sourceNature: 'RESEARCH_SYNTHESIS',
    sourceStratum: 'R024 vs R022',
    sourceRefs: ['R024:light-seal-meets-kill', 'R022:wealth-exposes-seven-kill'],
    sourceStatement:
      '印輕逢煞 is a bounded success proposition, while 財透七煞 is a bounded failure proposition.',
    interpretiveReading:
      'Kill can support Resource in one path and contaminate Wealth in another.',
    researchInference:
      'No universal Kill failure priority or fixed unfavorable polarity is authorized.',
    nodes: ['煞:R024', 'SUCCESS', '煞:R022', 'FAILURE'],
    edges: [
      edge('煞:R024', 'SUCCESS', 'COUNTEREXAMPLE_TO', 'COUNTEREXAMPLE_SYNTHESIS'),
      edge('煞:R022', 'FAILURE', 'COUNTEREXAMPLE_TO', 'COUNTEREXAMPLE_SYNTHESIS'),
    ],
    initialState: 'cross-pattern comparison',
    perturbingRelation: '煞',
    rescueOrContaminationRelation: 'context-dependent opposite function',
    sourceOutcome: 'COUNTEREXAMPLE_ONLY',
    rescuePreservesOriginalPath: null,
    rescueRedirectsPath: null,
    unresolvedOperands: ['pattern context', 'relative strength', 'control/support relations'],
    rescuePath: false,
    contaminationOrFailurePath: false,
    counterexample: true,
    sameActorOppositeFunctionCounterexample: true,
  }),
  scenario({
    caseId: 'R133-C26-COUNTEREXAMPLE-ALTERNATIVE-WEALTH-ROBBERY-RESCUES-UNRANKED',
    patternFamily: 'WEALTH',
    scenarioKind: 'COUNTEREXAMPLE',
    sourceNature: 'RESEARCH_SYNTHESIS',
    sourceStratum: 'R022 / direct rescue alternatives',
    sourceRefs: [BASE, 'R022:wealth-meets-robwealth-output-transforms', 'R022:generate-officer-to-control'],
    sourceStatement:
      '財逢劫而透食以化之，生官以制之',
    interpretiveReading:
      'The source gives two rescue alternatives for the same perturbation.',
    researchInference:
      'Listing order does not rank 透食 over 生官 and does not authorize first-match-wins.',
    nodes: ['財逢劫', '透食以化', '生官以制', 'UNRANKED_ALTERNATIVES'],
    edges: [
      edge('財逢劫', '透食以化', 'REMEDIES', 'COUNTEREXAMPLE_SYNTHESIS'),
      edge('財逢劫', '生官以制', 'REMEDIES', 'COUNTEREXAMPLE_SYNTHESIS'),
    ],
    initialState: '財逢劫',
    perturbingRelation: '劫',
    rescueOrContaminationRelation: 'two source-listed alternatives',
    sourceOutcome: 'COUNTEREXAMPLE_ONLY',
    rescuePreservesOriginalPath: null,
    rescueRedirectsPath: null,
    unresolvedOperands: ['alternative applicability', 'relative strength', 'position'],
    rescuePath: false,
    contaminationOrFailurePath: false,
    counterexample: true,
    sameActorOppositeFunctionCounterexample: false,
  }),
  scenario({
    caseId: 'R133-C27-COUNTEREXAMPLE-FOOD-OWL-RESCUE-PRESERVE-VS-REDIRECT',
    patternFamily: 'FOOD_GOD',
    scenarioKind: 'COUNTEREXAMPLE',
    sourceNature: 'RESEARCH_SYNTHESIS',
    sourceStratum: 'R025 / direct rescue alternatives',
    sourceRefs: [BASE, 'R025:food-meets-owl-switch-to-kill', 'R025:wealth-protects-food'],
    sourceStatement: '食逢梟而就煞以成格，或生財以護食',
    interpretiveReading:
      'One listed rescue redirects away from the Food path while the other preserves it.',
    researchInference:
      'Rescue is not one uniform state transition and the two alternatives are not source-ranked.',
    nodes: ['食逢梟', '就煞', '生財護食', 'REDIRECT_VS_PRESERVE'],
    edges: [
      edge('食逢梟', '就煞', 'REDIRECTS', 'COUNTEREXAMPLE_SYNTHESIS'),
      edge('食逢梟', '生財護食', 'PRESERVES', 'COUNTEREXAMPLE_SYNTHESIS'),
    ],
    initialState: '食逢梟',
    perturbingRelation: '梟',
    rescueOrContaminationRelation: 'redirect versus preserve alternatives',
    sourceOutcome: 'COUNTEREXAMPLE_ONLY',
    rescuePreservesOriginalPath: null,
    rescueRedirectsPath: null,
    unresolvedOperands: ['switch condition', 'Wealth protection effectiveness', 'Kill suitability'],
    rescuePath: false,
    contaminationOrFailurePath: false,
    counterexample: true,
    sameActorOppositeFunctionCounterexample: false,
  }),
  scenario({
    caseId: 'R133-C28-COUNTEREXAMPLE-LOCAL-CHAINS-DO-NOT-FORM-GLOBAL-DAG',
    patternFamily: 'CROSS_PATTERN',
    scenarioKind: 'COUNTEREXAMPLE',
    sourceNature: 'RESEARCH_SYNTHESIS',
    sourceStratum: 'R022-R027 + R126 synthesis',
    sourceRefs: ['R126:no-global-precedence', 'R126:no-independent-chain-counting'],
    sourceStatement:
      'The governed corpus contains incompatible local actor orderings and opposite-function reuse across pattern contexts.',
    interpretiveReading:
      'Local edges are meaningful only inside their bounded source configuration.',
    researchInference:
      'Merging all local edges into one global DAG would create unsupported precedence and erase context-dependent reversals.',
    nodes: ['LOCAL_GRAPH_A', 'LOCAL_GRAPH_B', 'GLOBAL_DAG_REJECTED'],
    edges: [
      edge('LOCAL_GRAPH_A', 'GLOBAL_DAG_REJECTED', 'COUNTEREXAMPLE_TO', 'COUNTEREXAMPLE_SYNTHESIS'),
      edge('LOCAL_GRAPH_B', 'GLOBAL_DAG_REJECTED', 'COUNTEREXAMPLE_TO', 'COUNTEREXAMPLE_SYNTHESIS'),
    ],
    initialState: 'multiple bounded local graphs',
    perturbingRelation: 'attempted graph union',
    rescueOrContaminationRelation: 'context erasure',
    sourceOutcome: 'COUNTEREXAMPLE_ONLY',
    rescuePreservesOriginalPath: null,
    rescueRedirectsPath: null,
    unresolvedOperands: ['cross-context precedence methodology'],
    rescuePath: false,
    contaminationOrFailurePath: false,
    counterexample: true,
    sameActorOppositeFunctionCounterexample: false,
  }),
]);

export const R133_REJECTED_GLOBALIZATIONS = Object.freeze([
  'RESCUE_PRESENT_EQUALS_RESCUE_WINS',
  'SOURCE_SENTENCE_ORDER_EQUALS_RUNTIME_PRECEDENCE',
  'FIRST_MATCH_EQUALS_FINAL_OUTCOME',
  'LOCAL_RESCUE_CHAIN_EQUALS_GLOBAL_DAG',
  'SAME_ACTOR_EQUALS_SAME_FUNCTION_ACROSS_CONTEXTS',
  'COMBINATION_EQUALS_UNIVERSAL_RESCUE',
  'WEALTH_REMOVES_RESOURCE_EQUALS_UNIVERSAL_RESCUE',
  'RESOURCE_EQUALS_UNIVERSAL_RESCUE',
  'ALTERNATIVE_RESCUES_ARE_SOURCE_RANKED',
  'RESCUE_PROPOSITION_EQUALS_EXECUTABLE_RESCUE_PREDICATE',
  'RESCUE_OBSERVED_EQUALS_ESTABLISHED_PATTERN',
  'LOCAL_ORDER_EQUALS_NUMERIC_PRIORITY',
] as const);

export const R133_SUMMARY = Object.freeze({
  scenarioCount: R133_GRAPH_SCENARIOS.length,
  rescuePathCount: R133_GRAPH_SCENARIOS.filter((item) => item.rescuePath).length,
  contaminationOrFailurePathCount: R133_GRAPH_SCENARIOS.filter(
    (item) => item.contaminationOrFailurePath,
  ).length,
  counterexampleCount: R133_GRAPH_SCENARIOS.filter((item) => item.counterexample).length,
  sameActorOppositeFunctionCounterexampleCount: R133_GRAPH_SCENARIOS.filter(
    (item) => item.sameActorOppositeFunctionCounterexample,
  ).length,
  representedPatternFamilyCount: new Set(
    R133_GRAPH_SCENARIOS.filter((item) => item.patternFamily !== 'CROSS_PATTERN').map(
      (item) => item.patternFamily,
    ),
  ).size,
  explicitSourceSequenceEdgeCount: R133_GRAPH_SCENARIOS.flatMap((item) => item.edges).filter(
    (item) => item.orderingEvidence === 'EXPLICIT_SOURCE_SEQUENCE',
  ).length,
  numericPrecedenceAuthorizedCount: R133_GRAPH_SCENARIOS.filter(
    (item) => item.numericPrecedenceAuthorized,
  ).length,
  globalPrecedenceAuthorizedCount: R133_GRAPH_SCENARIOS.filter(
    (item) => item.globalPrecedenceAuthorized,
  ).length,
  rescueResolverAuthorizedCount: R133_GRAPH_SCENARIOS.filter(
    (item) => item.rescueResolverAuthorized,
  ).length,
  candidateFactsEmittedCount: R133_GRAPH_SCENARIOS.filter(
    (item) => item.candidateFactsEmitted,
  ).length,
  establishmentFactsEmittedCount: R133_GRAPH_SCENARIOS.filter(
    (item) => item.establishmentFactsEmitted,
  ).length,
});

export const R133_AUTHORITY = Object.freeze({
  status: 'RESEARCH_PATTERN_RESCUE_FAILURE_PRECEDENCE_GRAPH_COMPLETE' as const,
  researchOnly: true,
  localSourceOrderingObserved: true,
  localRescueOrderingObserved: true,
  localContaminationOrderingObserved: true,
  rescuePreserveVsRedirectDistinctionObserved: true,
  sameActorOppositeFunctionObserved: true,
  alternativeRescuePathsObserved: true,
  counterexamplesToGlobalPrecedenceEstablished: true,
  sourceSentenceOrderRuntimePrecedenceAuthorized: false,
  firstMatchWinsAuthorized: false,
  globalRelationPrecedenceAuthorized: false,
  globalAcyclicPrecedenceGraphAuthorized: false,
  numericRescueWeightAuthorized: false,
  rescueRankingAuthorized: false,
  rescueResolverAuthorized: false,
  candidateIdentityAuthorized: false,
  candidateRankingAuthorized: false,
  candidatePrecedenceAuthorized: false,
  establishmentPredicateAuthorized: false,
  canonicalTerminalStateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  automaticAuthorityAdmissionAuthorized: false,
  automaticEngineAdmissionAuthorized: false,
  interpretationClaimEmissionAuthorized: false,
  previewPromotionAuthorized: false,
  productionAuthorityPromoted: false,
});
