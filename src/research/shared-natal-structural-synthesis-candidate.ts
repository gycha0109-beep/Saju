import type {
  InterpretationPack, MethodologyDefinition, RuleDefinition, SourceReference,
} from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import { createGeneralNatalMultifactorRegistry } from './general-natal-multifactor-candidate.js';
import {
  I13_STRENGTH_EVIDENCE_RULES, I13_STRENGTH_EVIDENCE_METHODOLOGY,
  I13_STRENGTH_EVIDENCE_SOURCES,
} from './i13-strength-evidence-pack.js';
import {
  I18A_MONTH_BRANCH_STRENGTH_RULES,
  I18A_MONTH_BRANCH_STRENGTH_METHODOLOGY,
  I18A_MONTH_BRANCH_STRENGTH_SOURCES,
} from './i18a-month-branch-strength-evidence.js';
import {
  I18B_HIDDEN_CHALLENGE_RULES, I18B_HIDDEN_CHALLENGE_METHODOLOGY,
  I18B_HIDDEN_CHALLENGE_SOURCES,
} from './i18b-hidden-challenge-strength-evidence.js';
import {
  I18C_ROOT_CLASS_RULES, I18C_ROOT_CLASS_METHODOLOGY,
  I18C_ROOT_CLASS_SOURCES,
} from './i18c-root-class-evidence.js';

export const SHARED_NATAL_STRUCTURAL_SYNTHESIS_VERSION = '0.1.0-research' as const;
export const SHARED_NATAL_STRUCTURAL_CLAIM_PREFIX = 'SHARED_NATAL_STRUCTURAL_CONTEXT_' as const;
const METHOD_ID = 'M-SHARED-NATAL-STRUCTURAL-CONTEXT-INTEGRATION-V1';
const RULE_SET = 'shared-natal-exact-context-integration-research';
const FAMILIES = ['peer', 'resource', 'output', 'wealth', 'officer'] as const;
const CHANNELS = ['visible_stems', 'branches'] as const;
const QUALITIES: RuleDefinition['quality'] = {
  provenanceQuality: 'secondary_only',
  testCoverage: 'fixture_matrix',
  methodologyStability: 'contested',
  reviewerStatus: 'unreviewed',
};
const base = createGeneralNatalMultifactorRegistry();
const sources: readonly SourceReference[] = Object.freeze(
  [...new Map([
    ...base.sources,
    ...I13_STRENGTH_EVIDENCE_SOURCES,
    ...I18A_MONTH_BRANCH_STRENGTH_SOURCES,
    ...I18B_HIDDEN_CHALLENGE_SOURCES,
    ...I18C_ROOT_CLASS_SOURCES,
  ].map(item => [item.sourceId, item])).values()],
);
const sourceIds = sources.map(source => source.sourceId);
export const SHARED_NATAL_STRUCTURAL_METHODOLOGY: MethodologyDefinition = {
  methodologyId: METHOD_ID,
  version: SHARED_NATAL_STRUCTURAL_SYNTHESIS_VERSION,
  family: 'domain_synthesis',
  name: 'Same-chart T2 seasonal and intrinsic root observations contextualize T5, research only',
  description: 'Materializes source-limited season/root structural observations in the same chart as an independently observed Ten-God family. This is NOT a strong/weak, Gyeokguk, Yongshin, personal-outcome or general fortune judgment.',
  assumptions: [
    'Season is the exact month-branch element, not the effective hidden-stem command or final strength.',
    'Only a T5 family equal to the actual month-branch element relation may be linked as a structural theme. This is not a strength score.',
    'An intrinsic root-class candidate is pre-interaction and may not settle positive effective Tonggen, strength, auspiciousness or the lack of roots.',
    'An observed peer/resource month context may coexist with hidden output/wealth/officer membership elsewhere in the same chart; no support-versus-challenge precedence or scalar is inferred.',
    'Hidden-stem challenge membership is not actual activation, effective strength, personal difficulty or an adverse outcome.',
    'A challenging-direction month context may coexist with hidden peer-root or hidden resource membership; neither positive effectiveness nor balancing dominance is settled.',
    'I13 hidden peer-root and hidden resource-support observations must remain separate, and never become a universal Tonggen, strength score or favorable-period prediction.',
    'Actual I13 visible-stem T2 may independently oppose month-direction relation; year, month and hour are only unweighted distinct observations, not an outcome.',
    'A visible observation must be selected by exact evidence kind and direction rather than mixing unrelated hidden-stem Claims.',
    'Different upstream claims are bound to one snapshot and the same scenario. No ranking across schools or methods is authorized.',
    'A structural observation alongside a Ten-God family does not establish causation, strength, quality, domain outcomes or future timing.',
    'All outputs are Research only. Production/Official/Publish/Sell are prohibited.',
  ],
  requiredFactTypes: ['derivedFacts.dayMaster', 'pillars.month', 'derivedFacts.tenGods'],
  optionalFactTypes: ['derivedFacts.hiddenStems'],
  sourceIds,
  status: 'research',
};

type Family = (typeof FAMILIES)[number];
type Channel = (typeof CHANNELS)[number];
type Context = 'season' | 'intrinsic_root' | 'hidden_challenge' |
  'hidden_support_peer' | 'hidden_support_resource' |
  'visible_challenge' | 'visible_support';

function rule(family: Family, channel: Channel, context: Context): RuleDefinition {
  const kind = context === 'season' ? 'SEASONAL_RELATION' : context === 'intrinsic_root' ?
    'INTRINSIC_ROOT_CONTEXT' : context === 'hidden_challenge' ?
    'SUPPORT_AND_HIDDEN_CHALLENGE_CONTEXT' :
    context === 'hidden_support_peer' ? 'CHALLENGE_AND_HIDDEN_PEER_CONTEXT' :
    context === 'hidden_support_resource' ? 'CHALLENGE_AND_HIDDEN_RESOURCE_CONTEXT' :
    context === 'visible_challenge' ? 'SUPPORT_AND_VISIBLE_CHALLENGE_CONTEXT' :
    'CHALLENGE_AND_VISIBLE_SUPPORT_CONTEXT';
  const claimType = SHARED_NATAL_STRUCTURAL_CLAIM_PREFIX +
    kind + '_' + family.toUpperCase() + '_' + channel.toUpperCase();
  const t5 = 'TEN_GOD_' + family.toUpperCase() + '_' + channel.toUpperCase() + '_THEME';
  const extra = context === 'intrinsic_root'
    ? [{
      key: 'intrinsicRoot',
      source: 'interpretation_claim' as const,
      pathOrClaimType: 'DAY_MASTER_ROOT_CLASS_EVIDENCE',
      required: true,
      cardinality: 'one_or_more' as const,
      ambiguityBehavior: 'scenario_preserving' as const,
    }] : context === 'hidden_challenge' ? [
      {
        key: 'hiddenChallenge',
        source: 'interpretation_claim' as const,
        pathOrClaimType: 'DAY_MASTER_STRENGTH_EVIDENCE',
        claimSelector: {valueEquals:[{path:'evidenceKind',value:'hidden_challenge_membership'}]},
        required: true,
        cardinality: 'one_or_more' as const,
        ambiguityBehavior: 'scenario_preserving' as const,
      },
      {
        key: 'challengeScope',
        source: 'interpretation_claim' as const,
        pathOrClaimType: 'DAY_MASTER_HIDDEN_CHALLENGE_SCOPE_GUARD',
        required: true,
        cardinality: 'exactly_one' as const,
        ambiguityBehavior: 'scenario_preserving' as const,
      },
    ] : context === 'hidden_support_peer' || context === 'hidden_support_resource' ? [
      {
        key: 'hiddenSupport',
        source: 'interpretation_claim' as const,
        pathOrClaimType: 'DAY_MASTER_STRENGTH_EVIDENCE',
        claimSelector: {valueEquals:[{path:'evidenceKind',
          value: context === 'hidden_support_peer' ? 'hidden_peer_root' : 'hidden_resource_support'}]},
        required: true,
        cardinality: 'one_or_more' as const,
        ambiguityBehavior: 'scenario_preserving' as const,
      },
      {
        key: 'supportScope',
        source: 'interpretation_claim' as const,
        pathOrClaimType: 'DAY_MASTER_STRENGTH_SCOPE_GUARD',
        required: true,
        cardinality: 'exactly_one' as const,
        ambiguityBehavior: 'scenario_preserving' as const,
      },
    ] : context === 'visible_challenge' || context === 'visible_support' ? [
      {
        key: 'visibleContrast',
        source: 'interpretation_claim' as const,
        pathOrClaimType: 'DAY_MASTER_STRENGTH_EVIDENCE',
        claimSelector: { valueEquals: [
          { path: 'evidenceKind', value: 'visible_stem_relation' },
          { path: 'direction', value: context === 'visible_support' ? 'supporting' : 'challenging' },
        ] },
        required: true,
        cardinality: 'one_or_more' as const,
        ambiguityBehavior: 'scenario_preserving' as const,
      },
      {
        key: 'visibleScope',
        source: 'interpretation_claim' as const,
        pathOrClaimType: 'DAY_MASTER_STRENGTH_SCOPE_GUARD',
        required: true,
        cardinality: 'exactly_one' as const,
        ambiguityBehavior: 'scenario_preserving' as const,
      },
    ] : [];
  return {
    ruleId: 'RULE-' + claimType,
    version: SHARED_NATAL_STRUCTURAL_SYNTHESIS_VERSION,
    ruleSetId: RULE_SET,
    taxonomy: { tier: 'T8', category: 'general', subcategory: 'structural_context' },
    methodologyRef: { id: METHOD_ID, version: SHARED_NATAL_STRUCTURAL_SYNTHESIS_VERSION },
    title: context === 'season' ? 'Source-limited month/season context with Ten-God family' :
      context === 'intrinsic_root' ? 'Source-limited intrinsic root observations with month and Ten-God family' :
      context === 'hidden_challenge' ?
      'Observed support-oriented month relation alongside non-effective hidden challenge membership' :
      context === 'hidden_support_peer' || context === 'hidden_support_resource' ?
      'Observed challenging month relation alongside hidden peer/root or resource support membership' :
      'Unweighted visible-stem evidence contrasting with the opposite month-direction context',
    description: 'Only a same-chart qualified contextual relationship, not an overall life or strength judgment.',
    inputs: [
      {
        key: 'theme', source: 'interpretation_claim',
        pathOrClaimType: t5, required: true,
        cardinality: 'exactly_one', ambiguityBehavior: 'scenario_preserving',
      },
      {
        key: 'month', source: 'interpretation_claim',
        pathOrClaimType: 'DAY_MASTER_MONTH_BRANCH_EVIDENCE', required: true,
        cardinality: 'exactly_one', ambiguityBehavior: 'scenario_preserving',
      },
      {
        key: 'monthScope', source: 'interpretation_claim',
        pathOrClaimType: 'DAY_MASTER_MONTH_BRANCH_SCOPE_GUARD', required: true,
        cardinality: 'exactly_one', ambiguityBehavior: 'scenario_preserving',
      },
      ...extra,
    ],
    condition: {
      op: 'and',
      expressions: [
        { op: 'exists', value: { kind: 'input', key: 'theme' } },
        { op: 'exists', value: { kind: 'input', key: 'month' } },
        { op: 'exists', value: { kind: 'input', key: 'monthScope' } },
        { op: 'eq', left: { kind: 'input', key: 'month', path: 'relation' },
          right: { kind: 'literal', value: family } },
        ...(context === 'intrinsic_root'
          ? [{ op: 'exists' as const, value: { kind: 'input' as const, key: 'intrinsicRoot' } }]
          : context === 'hidden_challenge' ? [
            { op: 'in' as const, value: { kind: 'input' as const, key: 'month', path: 'relation' },
              set: ['peer', 'resource'] },
            { op: 'exists' as const, value: { kind: 'input' as const, key: 'hiddenChallenge' } },
            { op: 'exists' as const, value: { kind: 'input' as const, key: 'challengeScope' } },
          ] : context === 'hidden_support_peer' || context === 'hidden_support_resource' ? [
            { op: 'in' as const, value: { kind: 'input' as const, key: 'month', path: 'relation' },
              set: ['output','wealth','officer'] },
            { op: 'exists' as const, value: { kind: 'input' as const, key: 'hiddenSupport' } },
            { op: 'exists' as const, value: { kind: 'input' as const, key: 'supportScope' } },
          ] : context === 'visible_challenge' || context === 'visible_support' ? [
            { op: 'exists' as const, value: { kind: 'input' as const, key: 'visibleContrast' } },
            { op: 'exists' as const, value: { kind: 'input' as const, key: 'visibleScope' } },
          ] : []),
      ],
    },
    output: {
      claimType,
      subject: 'natal_chart',
      predicate: 'shared_natal_structural_context_observation',
      value: {
        family, channel, context,
        evidenceRole: 'structural_observation_not_final_chart_verdict',
        monthContext: 'branch_element_only',
        monthRelationMatchesThemeFamily: true,
        rootEffect: 'not_determined',
        hiddenChallengeEffect: 'not_determined',
        hiddenSupportEffect: 'not_determined',
        visibleContrastEffect: 'not_determined',
        interactionPrecedence: 'not_determined',
        strength: 'not_determined',
        gyeokguk: 'not_determined',
        yongshin: 'not_determined',
        outcomeAuthorized: false,
        futureTimingAuthorized: false,
        numericScoringAuthorized: false,
      },
      polarity: 'neutral',
      emphasis: 'minor',
      tags: ['research', 'shared-natal-structural-context', family, channel, context],
    },
    sourceRefs: [
      ...I18A_MONTH_BRANCH_STRENGTH_SOURCES.map(x => ({
        sourceId: x.sourceId, supportType: 'interpretive_basis' as const,
        notes: 'Only the month-branch/element relation, not total strength.',
      })),
      ...(['hidden_support_peer','hidden_support_resource',
        'visible_challenge','visible_support'].includes(context)
        ? I13_STRENGTH_EVIDENCE_SOURCES.map(x => ({
          sourceId: x.sourceId, supportType: 'interpretive_basis' as const,
          notes: 'Only hidden peer/root or resource membership; not effective strength or total support.',
        })) : []),
      ...(context === 'hidden_challenge'
        ? I18B_HIDDEN_CHALLENGE_SOURCES.map(x => ({
          sourceId: x.sourceId, supportType: 'interpretive_basis' as const,
          notes: 'Only hidden challenge membership, not activation or actual effective strength.',
        })) : []),
      ...(context === 'intrinsic_root'
        ? I18C_ROOT_CLASS_SOURCES.map(x => ({
          sourceId: x.sourceId, supportType: 'implementation_reference' as const,
          notes: 'Only an intrinsic candidate class, not effective root strength.',
        })) : []),
      ...base.sources.filter(x => x.sourceId.startsWith('SRC-GENERAL-NATAL')).map(x => ({
        sourceId: x.sourceId, supportType: 'interpretive_basis' as const,
        notes: 'Ten-God theme is contextual, not a personal outcome.',
      })),
    ],
    quality: QUALITIES,
    status: 'research',
  };
}

export const SHARED_NATAL_STRUCTURAL_T8_RULES: readonly RuleDefinition[] = Object.freeze(
  FAMILIES.flatMap(family => CHANNELS.flatMap(channel =>
    (family === 'peer' || family === 'resource' ?
      (['season', 'intrinsic_root', 'hidden_challenge', 'visible_challenge'] as const) :
      (['season', 'intrinsic_root', 'hidden_support_peer', 'hidden_support_resource',
        'visible_support'] as const))
      .map(context => rule(family, channel, context)))),
);

export const SHARED_NATAL_STRUCTURAL_PACK: InterpretationPack = Object.freeze({
  packId: 'PACK-SHARED-NATAL-STRUCTURAL-T2-T5-T8-RESEARCH',
  version: SHARED_NATAL_STRUCTURAL_SYNTHESIS_VERSION,
  name: 'Shared chart-limited structural context, Research only',
  methodologyRefs: [
    ...base.pack.methodologyRefs,
    { id: I13_STRENGTH_EVIDENCE_METHODOLOGY.methodologyId,
      version: I13_STRENGTH_EVIDENCE_METHODOLOGY.version },
    { id: I18A_MONTH_BRANCH_STRENGTH_METHODOLOGY.methodologyId,
      version: I18A_MONTH_BRANCH_STRENGTH_METHODOLOGY.version },
    { id: I18B_HIDDEN_CHALLENGE_METHODOLOGY.methodologyId,
      version: I18B_HIDDEN_CHALLENGE_METHODOLOGY.version },
    { id: I18C_ROOT_CLASS_METHODOLOGY.methodologyId,
      version: I18C_ROOT_CLASS_METHODOLOGY.version },
    { id: METHOD_ID, version: SHARED_NATAL_STRUCTURAL_SYNTHESIS_VERSION },
  ],
  enabledRuleSets: [
    ...base.pack.enabledRuleSets,
    ...new Set([...I13_STRENGTH_EVIDENCE_RULES, ...I18A_MONTH_BRANCH_STRENGTH_RULES,
      ...I18B_HIDDEN_CHALLENGE_RULES, ...I18C_ROOT_CLASS_RULES,
      ...SHARED_NATAL_STRUCTURAL_T8_RULES]
      .map(x => x.ruleSetId)),
  ],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: {
    id: 'COMPOSITION-SHARED-NATAL-STRUCTURAL-CONTEXT-RESEARCH',
    version: SHARED_NATAL_STRUCTURAL_SYNTHESIS_VERSION,
  },
  claimContractMode: 'legacy_permissive',
  status: 'research',
});

export function createSharedNatalStructuralSynthesisRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot({
    rules: [...base.rules, ...I13_STRENGTH_EVIDENCE_RULES, ...I18A_MONTH_BRANCH_STRENGTH_RULES,
      ...I18B_HIDDEN_CHALLENGE_RULES, ...I18C_ROOT_CLASS_RULES,
      ...SHARED_NATAL_STRUCTURAL_T8_RULES],
    methodologies: [...base.methodologies,
      I13_STRENGTH_EVIDENCE_METHODOLOGY,
      I18A_MONTH_BRANCH_STRENGTH_METHODOLOGY,
      I18B_HIDDEN_CHALLENGE_METHODOLOGY,
      I18C_ROOT_CLASS_METHODOLOGY,
      SHARED_NATAL_STRUCTURAL_METHODOLOGY],
    sources,
  }, SHARED_NATAL_STRUCTURAL_PACK, createdAt);
}
