export const R074_ANNUAL_STEM_BRANCH_PRECEDENCE_VERSION = '0.1.0-research' as const;

export const R074_PROPOSITIONS = Object.freeze([
  {
    id: 'YUANHAI-ANNUAL-STEM-EMPHASIS',
    sourceSurface: '子平之法，大運看支，歲君看干',
    proposition: 'ANNUAL_STEM_EMPHASIS',
    numericWeightAuthorized: false,
    executable: false,
  },
  {
    id: 'LIUNIANFU-BRANCH-OPERATIVE',
    sourceSurface: '歲干如君，固應從重；歲支為輔，實則同功',
    proposition: 'ANNUAL_BRANCH_REMAINS_OPERATIVE',
    numericWeightAuthorized: false,
    executable: false,
  },
  {
    id: 'SUIYUN-ROOT-SUPPORT',
    sourceSurface: '太歲重天干，未曾無地支；干支配合判其力',
    proposition: 'STEM_BRANCH_ROOT_SUPPORT_MODULATES_EFFECT',
    numericWeightAuthorized: false,
    executable: false,
  },
  {
    id: 'SUIYUN-COMPOSITION',
    sourceSurface: '先觀歲與日干，次詳歲與大運，並考會合刑沖',
    proposition: 'ANNUAL_STATE_COMPOSES_WITH_DAYUN_AND_NATAL',
    numericWeightAuthorized: false,
    executable: false,
  },
] as const);

export const R074_REJECTED_SHORTCUTS = Object.freeze([
  'ANNUAL_STEM_ONLY',
  'ANNUAL_BRANCH_IGNORED',
  'ANNUAL_STEM_ALWAYS_WINS_BRANCH',
  'ANNUAL_STEM_70_BRANCH_30',
  'ANNUAL_STEM_BRANCH_CONFLICT_HAS_FIXED_PRECEDENCE',
  'ANNUAL_PILLAR_ALONE_IMPLIES_EVENT',
] as const);

export const R074_EXECUTION_GAPS = Object.freeze([
  'ANNUAL_TRADITION_SELECTION',
  'STEM_BRANCH_ROOT_SUPPORT',
  'STEM_BRANCH_CONFLICT_SETTLEMENT',
  'DAYUN_ANNUAL_COMPOSITION',
  'NATAL_ANNUAL_COMPOSITION',
  'EVENT_BRIDGE',
] as const);

export const R074_AUTHORITY = Object.freeze({
  status: 'VERIFIED_STEM_EMPHASIS_WITH_BRANCH_PARTICIPATION' as const,
  propositionCount: 4,
  annualStemOnlyAuthorized: false,
  universalNumericWeightAuthorized: false,
  executableAnnualPrecedenceResolverAuthorized: false,
  productionAuthorityPromoted: false,
});
