export const R023_OFFICER_PATTERN_VERSION = '0.1.0-research' as const;

export type R023ConditionRole = 'SUCCESS' | 'FAILURE' | 'CONTAMINATION' | 'RESCUE';

export interface R023OfficerPatternProposition {
  id: string;
  role: R023ConditionRole;
  sourcePhrase: string;
  operands: readonly string[];
  executable: false;
}

export const R023_OFFICER_PATTERN_PROPOSITIONS: readonly R023OfficerPatternProposition[] = Object.freeze([
  {
    id: 'officer-meets-wealth-seal-without-structural-damage',
    role: 'SUCCESS',
    sourcePhrase: '官逢財印，又無刑衝破害，官格成也',
    operands: ['官', '財', '印', '無刑衝破害'],
    executable: false,
  },
  {
    id: 'strong-body-light-officer-use-wealth',
    role: 'SUCCESS',
    sourcePhrase: '身旺官輕，四柱有財生官',
    operands: ['身旺', '官輕', '財生官'],
    executable: false,
  },
  {
    id: 'weak-body-heavy-officer-use-seal',
    role: 'SUCCESS',
    sourcePhrase: '身弱官重，四柱有印化官',
    operands: ['身弱', '官重', '印化官'],
    executable: false,
  },
  {
    id: 'wealth-seal-both-present-noninterference',
    role: 'SUCCESS',
    sourcePhrase: '正官兼帶財印者，須財與印兩不相礙',
    operands: ['正官', '財', '印', '兩不相礙'],
    executable: false,
  },
  {
    id: 'officer-meets-hurting-control-punishment-clash',
    role: 'FAILURE',
    sourcePhrase: '官逢傷剋刑沖，官格敗也',
    operands: ['官', '傷剋', '刑', '沖'],
    executable: false,
  },
  {
    id: 'officer-with-wealth-then-hurting',
    role: 'CONTAMINATION',
    sourcePhrase: '正官逢財而又逢傷',
    operands: ['正官', '財', '傷'],
    executable: false,
  },
  {
    id: 'exposed-officer-then-combined',
    role: 'CONTAMINATION',
    sourcePhrase: '透官而又逢合',
    operands: ['透官', '合'],
    executable: false,
  },
  {
    id: 'seal-controls-hurting-protects-officer',
    role: 'RESCUE',
    sourcePhrase: '印製傷護官',
    operands: ['印', '制傷', '護官'],
    executable: false,
  },
]);

export const R023_EXECUTION_GAPS = Object.freeze([
  'OFFICER_PATTERN_CANDIDATE_SELECTION',
  'BODY_STRENGTH',
  'OFFICER_RELATIVE_WEIGHT',
  'WEALTH_SEAL_NONINTERFERENCE',
  'XING_CHONG_PO_HAI_EFFECT',
  'HURTING_OFFICER_DAMAGE',
  'STEM_COMBINATION_EFFECT',
  'RESCUE_PRECEDENCE',
] as const);

export const R023_AUTHORITY = Object.freeze({
  status: 'research' as const,
  propositionFamiliesVerified: true,
  executableOfficerPatternResolverAuthorized: false,
  successBooleanAuthorized: false,
  failureBooleanAuthorized: false,
  rescueResolverAuthorized: false,
  productionAuthorityPromoted: false,
});
