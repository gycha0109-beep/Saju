export const R052_LIUHE_BINDING_TRANSFORMATION_VERSION = '0.1.0-research' as const;

export type R052RelationStage =
  | 'PAIR_IDENTITY'
  | 'EFFECTIVE_BINDING'
  | 'CONTEXTUAL_EFFECT'
  | 'TRANSFORMATION_ELIGIBILITY'
  | 'TRANSFORMATION';

export interface R052BoundedExample {
  id: string;
  pair: readonly [string, string];
  observedRole: 'BINDING_OR_CONFLICT_RESOLUTION' | 'TRANSFORMATION';
  boundedMeaning: string;
  executable: false;
}

export const R052_BOUNDED_EXAMPLES: readonly R052BoundedExample[] = Object.freeze([
  {
    id: 'ZI-CHOU-RESOLVES-ZI-WU-CLASH',
    pair: ['子', '丑'],
    observedRole: 'BINDING_OR_CONFLICT_RESOLUTION',
    boundedMeaning:
      'A Liuhe relation can be used as a clash-resolving relation without itself establishing transformation.',
    executable: false,
  },
  {
    id: 'YIN-HAI-WOOD-TRANSFORMATION-CONTEXT',
    pair: ['寅', '亥'],
    observedRole: 'TRANSFORMATION',
    boundedMeaning:
      'A separate Liuhe example is described as transforming toward Wood under additional context.',
    executable: false,
  },
]);

export const R052_STAGE_MODEL: readonly {
  stage: R052RelationStage;
  automaticFromPrevious: false;
  executable: false;
}[] = Object.freeze([
  { stage: 'PAIR_IDENTITY', automaticFromPrevious: false, executable: false },
  { stage: 'EFFECTIVE_BINDING', automaticFromPrevious: false, executable: false },
  { stage: 'CONTEXTUAL_EFFECT', automaticFromPrevious: false, executable: false },
  { stage: 'TRANSFORMATION_ELIGIBILITY', automaticFromPrevious: false, executable: false },
  { stage: 'TRANSFORMATION', automaticFromPrevious: false, executable: false },
]);

export const R052_EXECUTION_GAPS = Object.freeze([
  'LIUHE_PAIR_IDENTITY_REGISTRY',
  'POSITIONAL_BINDING_ELIGIBILITY',
  'HEAVENLY_STEM_SUPPORT_FOR_TRANSFORMATION',
  'SEASONAL_TRANSFORMATION_SUPPORT',
  'ROOTING_EFFECT',
  'CONFLICT_RESOLUTION_EFFECT',
  'TRANSFORMATION_SUFFICIENCY',
  'DOWNSTREAM_ROLE_REASSIGNMENT',
] as const);

export const R052_REJECTED_SHORTCUTS = Object.freeze([
  'LIUHE_PAIR_PRESENT_IMPLIES_TRANSFORMED',
  'LIUHE_PAIR_PRESENT_IMPLIES_FIXED_TRANSFORMED_ELEMENT',
  'LIUHE_PAIR_PRESENT_IMPLIES_CLASH_RESOLUTION',
  'BINDING_IMPLIES_TRANSFORMATION',
  'TRANSFORMATION_IMPLIES_FAVORABLE_POLARITY',
] as const);

export const R052_AUTHORITY = Object.freeze({
  status: 'VERIFIED_SEMANTIC_DISTINCTION' as const,
  bindingAndTransformationSeparated: true,
  presenceOnlyTransformationAuthorized: false,
  universalClashResolutionAuthorized: false,
  executableLiuheResolverAuthorized: false,
  productionAuthorityPromoted: false,
});
