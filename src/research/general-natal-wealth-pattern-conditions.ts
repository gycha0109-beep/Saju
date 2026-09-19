export const R022_WEALTH_PATTERN_VERSION = '0.1.0-research' as const;

export type R022ConditionRole = 'SUCCESS' | 'FAILURE' | 'CONTAMINATION' | 'RESCUE';

export interface R022WealthPatternProposition {
  id: string;
  role: R022ConditionRole;
  sourcePhrase: string;
  operands: readonly string[];
  executable: false;
}

export const R022_WEALTH_PATTERN_PROPOSITIONS: readonly R022WealthPatternProposition[] = Object.freeze([
  {
    id: 'wealth-generates-officer',
    role: 'SUCCESS',
    sourcePhrase: '財生官旺',
    operands: ['財', '官旺'],
    executable: false,
  },
  {
    id: 'wealth-fed-by-output-with-strong-body-and-peer',
    role: 'SUCCESS',
    sourcePhrase: '財逢食生而身強帶比',
    operands: ['財', '食神', '身強', '比'],
    executable: false,
  },
  {
    id: 'wealth-with-seal-positioned-without-mutual-obstruction',
    role: 'SUCCESS',
    sourcePhrase: '財格透印而位置妥貼，兩不相剋',
    operands: ['財格', '透印', '位置妥貼', '兩不相剋'],
    executable: false,
  },
  {
    id: 'light-wealth-heavy-peer',
    role: 'FAILURE',
    sourcePhrase: '財輕比重',
    operands: ['財輕', '比重'],
    executable: false,
  },
  {
    id: 'wealth-exposes-seven-kill',
    role: 'FAILURE',
    sourcePhrase: '財透七煞',
    operands: ['財', '透七煞'],
    executable: false,
  },
  {
    id: 'wealth-generates-officer-but-meets-hurting-or-combination',
    role: 'CONTAMINATION',
    sourcePhrase: '財旺生官而又逢傷逢合',
    operands: ['財旺生官', '傷', '合'],
    executable: false,
  },
  {
    id: 'wealth-meets-robwealth-output-transforms',
    role: 'RESCUE',
    sourcePhrase: '財逢劫而透食以化之',
    operands: ['財', '劫', '透食', '化'],
    executable: false,
  },
  {
    id: 'generate-officer-to-control',
    role: 'RESCUE',
    sourcePhrase: '生官以制之',
    operands: ['官', '制'],
    executable: false,
  },
  {
    id: 'food-controls-kill-and-generates-wealth',
    role: 'RESCUE',
    sourcePhrase: '逢煞而食神制煞以生財',
    operands: ['煞', '食神', '制煞', '生財'],
    executable: false,
  },
  {
    id: 'preserve-wealth-combine-kill',
    role: 'RESCUE',
    sourcePhrase: '或存財而合煞',
    operands: ['存財', '合煞'],
    executable: false,
  },
]);

export const R022_EXECUTION_GAPS = Object.freeze([
  'WEALTH_PATTERN_CANDIDATE_SELECTION',
  'CAI_QING_RELATIVE_LIGHTNESS',
  'BI_ZHONG_RELATIVE_HEAVINESS',
  'BODY_STRENGTH',
  'POSITION_COMPATIBILITY',
  'MUTUAL_OBSTRUCTION',
  'HURTING_OFFICER_EFFECT',
  'COMBINATION_EFFECT',
  'SEVEN_KILL_CONTROL',
  'RESCUE_PRECEDENCE',
] as const);

export const R022_AUTHORITY = Object.freeze({
  status: 'research' as const,
  propositionFamiliesVerified: true,
  executableWealthPatternResolverAuthorized: false,
  successBooleanAuthorized: false,
  failureBooleanAuthorized: false,
  rescueResolverAuthorized: false,
  productionAuthorityPromoted: false,
});
