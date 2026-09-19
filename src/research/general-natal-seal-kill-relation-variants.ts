export const R049_SEAL_KILL_VARIANTS_VERSION = '0.1.0-research' as const;

export type R049RelationRole =
  | 'SUPPORT_OR_GENERATION'
  | 'FAILURE_CONTEXT'
  | 'CONTAMINATION'
  | 'PROTECTION_AGAINST_CONTROL'
  | 'RESCUE_CHAIN';

export interface R049SealKillVariant {
  id: string;
  role: R049RelationRole;
  sourcePhrase: string;
  interpretationBoundary: string;
  executable: false;
}

export const R049_SEAL_KILL_VARIANTS: readonly R049SealKillVariant[] = Object.freeze([
  {
    id: 'light-seal-meets-kill',
    role: 'SUPPORT_OR_GENERATION',
    sourcePhrase: '印輕逢煞 / 透煞以生印',
    interpretationBoundary: 'Kill may support/generate Seal in the bounded light-Seal configuration.',
    executable: false,
  },
  {
    id: 'strong-body-heavy-seal-exposes-kill',
    role: 'FAILURE_CONTEXT',
    sourcePhrase: '身強印重而透煞',
    interpretationBoundary: 'Seal+Kill presence is not automatically favorable.',
    executable: false,
  },
  {
    id: 'kill-generates-seal-wealth-removes-seal',
    role: 'CONTAMINATION',
    sourcePhrase: '透煞以生印，而又透財，以去印存煞',
    interpretationBoundary: 'Wealth can alter the Kill/Seal configuration; effect is contextual.',
    executable: false,
  },
  {
    id: 'seal-protects-kill-from-food-control',
    role: 'PROTECTION_AGAINST_CONTROL',
    sourcePhrase: '七煞逢食制而又逢印 / 印來護煞',
    interpretationBoundary: 'Seal may protect Kill against Food-God control rather than neutralize Kill.',
    executable: false,
  },
  {
    id: 'wealth-removes-seal-restores-food-control',
    role: 'RESCUE_CHAIN',
    sourcePhrase: '逢財以去印存食',
    interpretationBoundary: 'A rescue chain can remove Seal to preserve Food-God control.',
    executable: false,
  },
]);

export const R049_EXECUTION_GAPS = Object.freeze([
  'SEAL_RELATIVE_STRENGTH',
  'BODY_STRENGTH',
  'KILL_RELATIVE_STRENGTH',
  'KILL_GENERATES_SEAL_EFFECT',
  'SEAL_PROTECTS_KILL_EFFECT',
  'FOOD_CONTROLS_KILL_EFFECT',
  'WEALTH_REMOVES_SEAL_EFFECT',
  'RESCUE_PRECEDENCE',
] as const);

export const R049_AUTHORITY = Object.freeze({
  status: 'VERIFIED_VARIANT_CORPUS' as const,
  universalSealTransformsKillRuleAuthorized: false,
  presenceOnlyFavorabilityAuthorized: false,
  executableRelationResolverAuthorized: false,
  productionAuthorityPromoted: false,
});
