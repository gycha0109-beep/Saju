export const R013_TOUGAN_TONGGEN_VERSION = '0.1.0-research' as const;

export type R013DirectionalState =
  | 'TOUGAN_ONLY'
  | 'TONGGEN_ONLY'
  | 'BOTH'
  | 'NEITHER';

export interface R013RelationDefinition {
  relation: 'TOUGAN' | 'TONGGEN';
  direction: 'BRANCH_HIDDEN_STEM_TO_HEAVENLY_STEM' | 'HEAVENLY_STEM_TO_BRANCH_ROOT';
  sourceStratum: 'XU_LEWU_LATER_COMMENTARY';
  meaning: string;
}

export const R013_RELATION_DEFINITIONS: readonly R013RelationDefinition[] = Object.freeze([
  {
    relation: 'TOUGAN',
    direction: 'BRANCH_HIDDEN_STEM_TO_HEAVENLY_STEM',
    sourceStratum: 'XU_LEWU_LATER_COMMENTARY',
    meaning: 'A stem contained in a branch becomes manifest in the heavenly-stem surface.',
  },
  {
    relation: 'TONGGEN',
    direction: 'HEAVENLY_STEM_TO_BRANCH_ROOT',
    sourceStratum: 'XU_LEWU_LATER_COMMENTARY',
    meaning: 'A heavenly stem is carried/supported by an applicable root in the earthly-branch surface.',
  },
]);

export const R013_ADVERSARIAL_STATE_MATRIX = Object.freeze([
  {
    state: 'TOUGAN_ONLY' as const,
    tougan: true,
    tonggen: false,
    semanticPurpose: 'Proves that visible emergence does not logically imply root support.',
    canonicalRepresentability: 'OPEN' as const,
  },
  {
    state: 'TONGGEN_ONLY' as const,
    tougan: false,
    tonggen: true,
    semanticPurpose: 'Proves that root support does not logically imply that the same hidden stem is exposed.',
    canonicalRepresentability: 'OPEN' as const,
  },
  {
    state: 'BOTH' as const,
    tougan: true,
    tonggen: true,
    semanticPurpose: 'Both directional relations are satisfied.',
    canonicalRepresentability: 'OPEN' as const,
  },
  {
    state: 'NEITHER' as const,
    tougan: false,
    tonggen: false,
    semanticPurpose: 'Neither directional relation is satisfied.',
    canonicalRepresentability: 'OPEN' as const,
  },
] satisfies readonly {
  state: R013DirectionalState;
  tougan: boolean;
  tonggen: boolean;
  semanticPurpose: string;
  canonicalRepresentability: 'OPEN';
}[]);

export const R013_SOURCE_OBSERVATIONS = Object.freeze([
  {
    sourceFamily: 'ziping_zhenquan_pingzhu',
    sourceStratum: 'XU_LEWU_LATER_COMMENTARY',
    proposition: '干以通根為美，支以透出為貴',
    classification: 'DIRECTIONAL_COMPLEMENTARITY',
  },
  {
    sourceFamily: 'ziping_zhenquan_pingzhu',
    sourceStratum: 'XU_LEWU_LATER_COMMENTARY',
    proposition: '凡八字支中所藏，必須透干；天干所用，必須通根',
    classification: 'SEPARATE_DIRECTIONAL_REQUIREMENTS',
  },
  {
    sourceFamily: 'yuanhai_ziping',
    sourceStratum: 'BASE_TEXT_SURFACE',
    proposition: '人元三用，透旺為真',
    classification: 'OLDER_TOU_OR_MANIFESTATION_SURFACE_ONLY',
  },
] as const);

export const R013_AUTHORITY = Object.freeze({
  status: 'research' as const,
  touganEqualsTonggen: false,
  directionalIndependenceSupported: true,
  complementaryInteractionSupported: true,
  canonicalFourStateRepresentabilityVerified: false,
  universalDownstreamRequirementAuthorized: false,
  numericStrengthAuthorized: false,
  gyeokgukAuthorityPromoted: false,
  productionAuthorityPromoted: false,
});
