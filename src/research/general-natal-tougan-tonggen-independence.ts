import { HIDDEN_STEM_MEMBERSHIP } from '../calculation/hidden-stems.js';
import type { EarthlyBranch, HeavenlyStem, StemFact } from '../contracts/calculation.js';
import { evaluateSelectedSourceExactTonggenExclusion } from './general-natal-exact-tonggen-exclusion-authority.js';
import { evaluateJiaYiWoodBoundedRootPresenceEvidence } from './general-natal-jia-yi-wood-bounded-root-presence-authority.js';

export const R013_TOUGAN_TONGGEN_VERSION = '0.2.0-research' as const;

const JIA = Object.freeze({ value: '갑', yinYang: '양', element: '목' }) satisfies Pick<
  StemFact,
  'value' | 'yinYang' | 'element'
>;
const YI = Object.freeze({ value: '을', yinYang: '음', element: '목' }) satisfies Pick<
  StemFact,
  'value' | 'yinYang' | 'element'
>;

function exactStemContained(stem: HeavenlyStem, branch: EarthlyBranch): boolean {
  return HIDDEN_STEM_MEMBERSHIP[branch].includes(stem);
}

const bothRoot = evaluateJiaYiWoodBoundedRootPresenceEvidence(JIA, { year: '인' });
const tonggenOnlyRoot = evaluateJiaYiWoodBoundedRootPresenceEvidence(YI, { year: '인' });
const neitherExclusion = evaluateSelectedSourceExactTonggenExclusion({
  stem: '을',
  branch: '술',
});

export const R013_RELATION_DEFINITIONS = Object.freeze([
  {
    relation: 'TOUGAN',
    direction: 'BRANCH_HIDDEN_STEM_TO_HEAVENLY_STEM',
    sourceStratum: 'XU_LEWU_LATER_COMMENTARY',
  },
  {
    relation: 'TONGGEN',
    direction: 'HEAVENLY_STEM_TO_BRANCH_ROOT',
    sourceStratum: 'XU_LEWU_LATER_COMMENTARY',
  },
] as const);

export const R013_REPRESENTABILITY = Object.freeze([
  {
    state: 'BOTH',
    sourceStem: '甲',
    stem: '갑',
    sourceBranch: '寅',
    branch: '인',
    tougan: exactStemContained('갑', '인'),
    tonggenDisposition: bothRoot.rootPresenceObserved
      ? 'POSITIVE_ROOT_EVIDENCE'
      : 'UNEXPECTED_NO_POSITIVE_EVIDENCE',
    representability: 'VERIFIED',
    evidenceRefs: Object.freeze([
      'HIDDEN_STEM_MEMBERSHIP',
      'GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE',
    ]),
  },
  {
    state: 'TONGGEN_ONLY',
    sourceStem: '乙',
    stem: '을',
    sourceBranch: '寅',
    branch: '인',
    tougan: exactStemContained('을', '인'),
    tonggenDisposition: tonggenOnlyRoot.rootPresenceObserved
      ? 'POSITIVE_ROOT_EVIDENCE'
      : 'UNEXPECTED_NO_POSITIVE_EVIDENCE',
    representability: 'VERIFIED',
    evidenceRefs: Object.freeze([
      'HIDDEN_STEM_MEMBERSHIP',
      'GENERAL_NATAL_JIA_YI_WOOD_BOUNDED_ROOT_PRESENCE',
    ]),
  },
  {
    state: 'NEITHER',
    sourceStem: '乙',
    stem: '을',
    sourceBranch: '戌',
    branch: '술',
    tougan: exactStemContained('을', '술'),
    tonggenDisposition: neitherExclusion.selectedSourceTonggenExcluded
      ? 'SELECTED_SOURCE_EXCLUDED'
      : 'UNEXPECTED_NOT_EXCLUDED',
    representability: 'VERIFIED_BOUNDED_EXACT_EXCLUSION',
    evidenceRefs: Object.freeze([
      'HIDDEN_STEM_MEMBERSHIP',
      'GENERAL_NATAL_EXACT_TONGGEN_EXCLUSION',
    ]),
  },
  {
    state: 'TOUGAN_ONLY',
    sourceStem: null,
    stem: null,
    sourceBranch: null,
    branch: null,
    tougan: null,
    tonggenDisposition: 'NO_GOVERNED_EXACT_NEGATIVE_PAIR_WITH_EXPOSURE',
    representability: 'INCONCLUSIVE_UNDER_CURRENT_GOVERNED_SCOPE',
    evidenceRefs: Object.freeze([
      'NO_COMPLETE_GLOBAL_TONGGEN_NEGATIVE_RESOLVER',
      'NO_POSITIVE_EVIDENCE_IS_NOT_NEGATIVE_EVIDENCE',
    ]),
  },
] as const);

export const R013_FINDINGS = Object.freeze({
  touganEqualsTonggen: false,
  nonEquivalenceEstablished: true,
  directionalSemanticDistinction: 'SUPPORTED_BOUNDED',
  complementaryInteraction: 'SUPPORTED_BOUNDED',
  fullBidirectionalIndependence: 'NOT_ESTABLISHED',
  bothRepresentable: true,
  tonggenOnlyRepresentable: true,
  neitherRepresentable: 'VERIFIED_BOUNDED_EXACT_EXCLUSION',
  touganOnlyRepresentable: 'INCONCLUSIVE',
} as const);

export const R013_REJECTED_SHORTCUTS = Object.freeze([
  'DIRECTIONAL_WORDING_EQUALS_ALL_FOUR_STATES_REPRESENTABLE',
  'NO_POSITIVE_TONGGEN_EVIDENCE_EQUALS_NOT_TONGGEN',
  'TOUGAN_IMPLIES_NUMERIC_STRENGTH',
  'TONGGEN_IMPLIES_NUMERIC_STRENGTH',
  'BOTH_IMPLIES_FINAL_QIANG_RUO',
  'BOTH_IMPLIES_GEJU_ESTABLISHMENT',
  'LATER_COMMENTARY_BACK_PROJECTED_TO_YUANHAI',
  'ONE_EXACT_EXCLUSION_EQUALS_GLOBAL_TONGGEN_NEGATIVE_RESOLVER',
] as const);

export const R013_AUTHORITY = Object.freeze({
  status: 'VERIFIED_NON_EQUIVALENCE_PARTIAL_REPRESENTABILITY' as const,
  completeTonggenResolverCreated: false,
  globalTonggenNegativeResolverCreated: false,
  touganOnlyInvented: false,
  numericStrengthAuthorized: false,
  finalQiangRuoAuthorized: false,
  gyeokgukAuthorityPromoted: false,
  productionAuthorityPromoted: false,
});
