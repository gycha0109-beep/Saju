import { createHash } from 'node:crypto';
import {
  GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_DEFINITION_HASH,
  GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_VERSION,
} from './general-natal-wang-shuai-qiang-ruo-semantic-axis-authority.js';

export const GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_VERSION = '0.1.0-research' as const;
export const GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_SCOPE =
  'xi_yong_ji_shen_semantic_axis_scope_observation' as const;
export const GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_DECISION =
  'AUTHORIZED_OBSERVATION_ONLY' as const;

export const GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_SOURCE = Object.freeze({
  title: '子平真詮 / 子平真詮評註',
  section: '論十干得時不旺失時不弱',
  url: 'https://www.ncc.com.tw/fate/paleo/bg/bg_032.htm',
  accessedAt: '2026-09-17',
  sourceType: 'classical_transcription_with_commentary',
} as const);

export const GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_SOURCE_TEXT =
  '不特日主如此，喜用忌神皆同此論。' as const;

export const GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_EXTENDED_TARGETS = Object.freeze([
  '喜',
  '用',
  '忌神',
] as const);

export const GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_OBSERVATIONS = Object.freeze([
  Object.freeze({
    id: 'non_day_master_xi_yong_ji_shen_scope_extension',
    sourceText: GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_SOURCE_TEXT,
    sourceSubjectBaseline: '日主' as const,
    sourceExtendedTargets: GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_EXTENDED_TARGETS,
    sourceScopePhrase: '不特日主如此，喜用忌神皆同此論' as const,
    scopeExtensionObserved: true as const,
    executableRoleResolverAuthorized: false as const,
  }),
] as const);

export const GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_CANONICAL_REPRESENTABILITY = Object.freeze({
  canonicalInputRequired: false,
  chartFactsConsumed: false,
  canonicalXiShenResolverAuthorized: false,
  canonicalYongShenResolverAuthorized: false,
  canonicalJiShenResolverAuthorized: false,
  status: 'NOT_REQUIRED_FOR_OBSERVATION_ONLY' as const,
});

export const GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_UNAUTHORIZED_DERIVATIONS = Object.freeze([
  'source_scope_to_canonical_xi_shen_identity',
  'source_scope_to_canonical_yong_shen_identity',
  'source_scope_to_canonical_ji_shen_identity',
  'month_command_to_yong_shen',
  'ten_god_to_xi_or_ji_shen',
  'root_to_xi_yong_ji_shen',
  'tonggen_to_xi_yong_ji_shen',
  'sizhu_has_root_to_xi_yong_ji_shen',
  'semantic_axis_observation_to_chart_role_assignment',
  'xi_yong_ji_shen_scope_to_final_wang_shuai',
  'xi_yong_ji_shen_scope_to_final_qiang_ruo',
  'xi_yong_ji_shen_scope_to_numeric_strength',
  'xi_yong_ji_shen_scope_to_nonnumeric_strength_scalar',
  'source_scope_to_yong_shen_methodology_selection',
  'cross_source_yong_shen_methodology_stitching',
  'source_scope_to_geju_candidate',
  'source_scope_to_geju_establishment',
  'source_scope_to_production_fact',
] as const);

const upstream = Object.freeze({
  semanticAxisVersion: GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_VERSION,
  semanticAxisDefinitionHash:
    GENERAL_NATAL_WANG_SHUAI_QIANG_RUO_SEMANTIC_AXIS_DEFINITION_HASH,
});

export const GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_DEFINITION_HASH = createHash('sha256')
  .update(
    JSON.stringify({
      version: GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_VERSION,
      scope: GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_SCOPE,
      decision: GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_DECISION,
      source: GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_SOURCE,
      sourceText: GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_SOURCE_TEXT,
      observations: GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_OBSERVATIONS,
      representability: GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_CANONICAL_REPRESENTABILITY,
      upstream,
      unauthorizedDerivations: GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_UNAUTHORIZED_DERIVATIONS,
      productionFactEmissionAuthorized: false,
    }),
  )
  .digest('hex');

export const GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_AUTHORITY = Object.freeze({
  version: GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_VERSION,
  definitionHash: GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_DEFINITION_HASH,
  decision: GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_DECISION,
  upstreamSemanticAxisVersion: upstream.semanticAxisVersion,
  upstreamSemanticAxisDefinitionHash: upstream.semanticAxisDefinitionHash,
  directSourceNonDayMasterScopeExtensionObserved: true,
  directSourceXiYongJiShenScopeObserved: true,
  sourceSubjectBaseline: '日主' as const,
  sourceExtendedTargets: GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_EXTENDED_TARGETS,
  canonicalInputRequired: false,
  chartFactsConsumed: false,
  canonicalXiShenResolverAuthorized: false,
  canonicalYongShenResolverAuthorized: false,
  canonicalJiShenResolverAuthorized: false,
  yongShenMethodologySelectionAuthorized: false,
  sourceScopeToChartRoleAssignmentAuthorized: false,
  chartLevelWangShuaiClassifierAuthorized: false,
  chartLevelQiangRuoClassifierAuthorized: false,
  numericStrengthAuthorized: false,
  nonNumericStrengthScalarAuthorized: false,
  generalizedRootWeightClassifierAuthorized: false,
  ordinaryStrengthClassificationAuthorized: false,
  candidateDerivationAuthorized: false,
  establishmentPredicateAuthorized: false,
  candidateFactsEmitted: false,
  establishmentFactsEmitted: false,
  productionFactEmissionAuthorized: false,
  unauthorizedDerivations: GENERAL_NATAL_XI_YONG_JI_SHEN_SCOPE_UNAUTHORIZED_DERIVATIONS,
  authorityBoundary:
    'Observation-only source registry. The selected passage states that the immediately preceding reasoning is not limited to 日主 and also applies, in the source wording, to 喜用忌神. This does not identify any canonical 喜神, 用神, or 忌神; choose a 用神 methodology; assign chart roles; classify final 旺衰/強弱; create a strength scalar; derive Gyeokguk; or emit production facts.',
});
