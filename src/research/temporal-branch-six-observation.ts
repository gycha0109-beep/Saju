import type {
  ClaimTypeDefinition, ClaimValueSchemaDefinition, MethodologyDefinition,
  RuleDefinition, SourceReference,
} from '../contracts/interpretation.js';
import { STRUCTURAL_RELATION_SOURCE_CATALOG } from '../calculation/structural-relations.js';

/**
 * A real T9 observation of a classical six-combination pair between a
 * period branch and one resolved natal pillar. The cited texts establish
 * the PAIR ONLY; they cannot support auspiciousness, transformation,
 * development, event prediction, or a combined natal/temporal verdict.
 */
export const TEMPORAL_SIX_OBSERVATION_VERSION = '0.1.0-research' as const;
export const TEMPORAL_SIX_SOURCES: readonly SourceReference[] = Object.freeze([
  {
    sourceId: STRUCTURAL_RELATION_SOURCE_CATALOG.yisiZhan.sourceId,
    sourceType: 'classical_text',
    title: STRUCTURAL_RELATION_SOURCE_CATALOG.yisiZhan.title,
    language: 'zh',
    url: STRUCTURAL_RELATION_SOURCE_CATALOG.yisiZhan.url,
    accessedAt: STRUCTURAL_RELATION_SOURCE_CATALOG.yisiZhan.accessedAt,
    provenanceTier: 'cross_reference',
    rights: { copyrightStatus: 'unknown', reusePolicy: 'metadata_only' },
    notes: 'Only the classical six-combination pairing is supported. No temporal efficacy or transformation is inferred.',
  },
  {
    sourceId: STRUCTURAL_RELATION_SOURCE_CATALOG.xuanzeYaolue.sourceId,
    sourceType: 'classical_text',
    title: STRUCTURAL_RELATION_SOURCE_CATALOG.xuanzeYaolue.title,
    language: 'zh',
    url: STRUCTURAL_RELATION_SOURCE_CATALOG.xuanzeYaolue.url,
    accessedAt: STRUCTURAL_RELATION_SOURCE_CATALOG.xuanzeYaolue.accessedAt,
    provenanceTier: 'cross_reference',
    rights: { copyrightStatus: 'unknown', reusePolicy: 'metadata_only' },
    notes: 'Independent reference to six-combination pair identities, not their effects on a life.',
  },
]);
const SLOTS = ['year', 'month', 'day', 'hour'] as const;
const SEGMENTS = ['before_jeol', 'after_jeol'] as const;
type Scope = 'annual' | 'monthly';
type Segment = (typeof SEGMENTS)[number];
type Slot = (typeof SLOTS)[number];

export function temporalSixSemanticKey(scope: Scope, slot: Slot, segment?: Segment): string {
  return scope === 'annual'
    ? 'ANNUAL_BRANCH_SIX_COMBINATION_' + slot.toUpperCase()
    : 'MONTHLY_' + segment!.toUpperCase() + '_BRANCH_SIX_COMBINATION_' + slot.toUpperCase();
}

export function createTemporalSixCombinationObservations(scope: Scope) {
  const monthly = scope === 'monthly';
  const prefix = 'GENERAL_' + scope.toUpperCase() + '_BRANCH_SIX_COMBINATION_OBSERVATION';
  const methodId = 'M-GENERAL-' + scope.toUpperCase() + '-T9-CLASSICAL-SIX-PAIR-OBSERVATION-V1';
  const ruleSetId = 'general-' + scope + '-t9-natal-branch-six-observation';
  const schemaId = 'SCHEMA-' + prefix + '-V1';
  const semanticKeys = (monthly ? SEGMENTS : [undefined]).flatMap(segment =>
    SLOTS.map(slot => temporalSixSemanticKey(scope, slot, segment)));
  const schema: ClaimValueSchemaDefinition = {
    schemaId, version: '1.0.0',
    root: {
      kind: 'object',
      required: [
        'semanticKey', 'natalPillar', 'relation', 'narrativeRole',
        'transformationEstablished', 'outcomeAuthorized', 'forbiddenInferences',
        ...(monthly ? ['segmentId'] : []),
      ],
      properties: {
        semanticKey: { kind: 'string', enum: semanticKeys },
        natalPillar: { kind: 'string', enum: SLOTS },
        relation: { kind: 'literal', value: 'six_combination' },
        narrativeRole: { kind: 'literal', value: 'structural_observation' },
        transformationEstablished: { kind: 'literal', value: false },
        outcomeAuthorized: { kind: 'literal', value: false },
        forbiddenInferences: { kind: 'array', items: { kind: 'string' }, minItems: 1 },
        ...(monthly ? { segmentId: { kind: 'string', enum: SEGMENTS } } : {}),
      },
      additionalProperties: false,
    },
  };
  const claimType: ClaimTypeDefinition = {
    claimType: prefix, version: '1.0.0',
    valueSchemaRef: { id: schema.schemaId, version: schema.version },
    scope: 'period', exclusiveValue: false, scenarioSensitive: true,
    materialForNarrative: true, allowedTaxonomyTiers: ['T9'],
  };
  const methodology: MethodologyDefinition = {
    methodologyId: methodId, version: TEMPORAL_SIX_OBSERVATION_VERSION,
    family: 'time_dynamics',
    name: 'Period/natal classical six-branch-pair observation (research only)',
    description: 'A source-qualified pair match of an exact period branch and resolved natal branch; NOT proof of transformation or auspicious outcomes.',
    assumptions: [
      'Only a resolved pair of exact branches from the same canonical snapshot and chosen time period is admissible.',
      'Six-combination is recorded only as a classical structural match, without strength, stability, transformation, auspiciousness, or concrete outcomes.',
      'Monthly pairs are scoped to one exact solar-term interval, not inherited from yearly or the other month interval.',
      'Partial or ambiguous natal birth time does not authorize invented pair matches.',
      'This research rule creates no independent future forecast and cannot be published or sold.',
    ],
    requiredFactTypes: monthly
      ? ['temporal.targetYear', 'temporal.targetMonth', 'temporal.jeolBoundary', 'temporal.segmentsById']
      : ['temporal.targetYear', 'temporal.annualPillar', 'temporal.annualBranchRelations'],
    sourceIds: TEMPORAL_SIX_SOURCES.map(x => x.sourceId), status: 'research',
  };
  const rules: RuleDefinition[] = (monthly ? SEGMENTS : [undefined]).flatMap(segment =>
    SLOTS.map(slot => {
      const relationPath = monthly
        ? 'segmentsById.' + segment + '.monthlyBranchRelations.' + slot + '.relation'
        : 'annualBranchRelations.' + slot;
      const required = [
        { key: 'targetYear', path: 'targetYear' },
        ...(monthly ? [
          { key: 'targetMonth', path: 'targetMonth' },
          { key: 'jeolBoundaryAt', path: 'jeolBoundary.at' },
          { key: 'monthlyPillar', path: 'segmentsById.' + segment + '.monthlyPillar' },
        ] : [{ key: 'annualPillar', path: 'annualPillar' }]),
      ];
      return {
        ruleId: 'RULE-' + prefix + '-' + (segment ? segment.toUpperCase() + '-' : '') + slot.toUpperCase(),
        version: TEMPORAL_SIX_OBSERVATION_VERSION, ruleSetId,
        taxonomy: { tier: 'T9', category: 'general', subcategory: scope },
        methodologyRef: { id: methodId, version: TEMPORAL_SIX_OBSERVATION_VERSION },
        title: 'Exact ' + scope + ' / natal branch six-pair observation at ' + slot,
        description: 'Source-qualified classical pair only; no future event or combining transformation.',
        inputs: [
          ...required.map(v => ({
            key: v.key, source: 'temporal_fact' as const,
            pathOrClaimType: v.path, required: true,
            ambiguityBehavior: 'requires_resolved' as const,
          })),
          {
            key: 'relation', source: 'temporal_fact' as const,
            pathOrClaimType: relationPath, required: false,
            ambiguityBehavior: 'requires_resolved' as const,
          },
        ],
        condition: {
          op: 'and' as const,
          expressions: [
            ...required.map(v => ({
              op: 'exists' as const,
              value: { kind: 'input' as const, key: v.key },
            })),
            {
              op: 'eq' as const,
              left: { kind: 'input' as const, key: 'relation',
                ...(monthly ? {} : { path: 'relation' }) },
              right: { kind: 'literal' as const, value: 'six_combination' },
            },
          ],
        },
        output: {
          claimType: prefix,
          subject: monthly ? 'monthly_period_segment' : 'annual_period',
          predicate: 'period_to_natal_classical_six_branch_pair_observed',
          value: {
            semanticKey: temporalSixSemanticKey(scope, slot, segment),
            natalPillar: slot, relation: 'six_combination',
            narrativeRole: 'structural_observation',
            transformationEstablished: false,
            outcomeAuthorized: false,
            ...(monthly ? { segmentId: segment } : {}),
            forbiddenInferences: [
              'auspiciousness', 'branch_transformation', 'relation_strength',
              'financial_gain', 'relationships', 'career_result',
              'specific_event', 'future_timing',
            ],
          },
          polarity: 'neutral' as const, emphasis: 'minor' as const,
          tags: ['research', 'period-natal', 'six-branch-pair', 'structural-observation', scope],
        },
        sourceRefs: TEMPORAL_SIX_SOURCES.map(source => ({
          sourceId: source.sourceId, supportType: 'implementation_reference' as const,
          notes: 'Classical branch pair identity only; no predictive interpretation.',
        })),
        quality: {
          provenanceQuality: 'secondary_only' as const,
          testCoverage: 'fixture_matrix' as const,
          methodologyStability: 'contested' as const,
          reviewerStatus: 'unreviewed' as const,
        },
        status: 'research' as const,
      };
    }));
  return { ruleSetId, rules, methodology, claimType, schema,
    sources: TEMPORAL_SIX_SOURCES };
}
