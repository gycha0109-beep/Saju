import type { InterpretationPack, RuleDefinition, RuleExpression } from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from './rule-registry.js';
import {
  GENERAL_NATAL_USEFUL_READING_SOURCE,
  GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY,
  GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY,
  GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
  GENERAL_NATAL_USEFUL_T8_RULES,
} from '../research/general-natal-useful-reading-candidate.js';
import {
  GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_METHODOLOGY,
  GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_RULES,
} from '../research/general-natal-t8-structural-summary-candidate.js';
import {
  I18A_MONTH_BRANCH_STRENGTH_METHODOLOGY,
  I18A_MONTH_BRANCH_STRENGTH_RULES,
  I18A_MONTH_BRANCH_STRENGTH_SOURCES,
} from '../research/i18a-month-branch-strength-evidence.js';
import {
  GENERAL_NATAL_INTEGRATED_READING_PACK,
  GENERAL_NATAL_INTEGRATED_READING_VERSION,
} from './general-natal-integrated-reading-registry.js';

type ExactTenGodPath =
  | 'year.stem'
  | 'month.stem'
  | 'hour.stem'
  | 'year.branch'
  | 'month.branch'
  | 'day.branch'
  | 'hour.branch';

const VISIBLE_STEM_PATHS: readonly ExactTenGodPath[] = [
  'year.stem',
  'month.stem',
  'hour.stem',
];
const BRANCH_PATHS: readonly ExactTenGodPath[] = [
  'year.branch',
  'month.branch',
  'day.branch',
  'hour.branch',
];

/**
 * Refine each existing T5 theme's broad OR condition into positional fact
 * witnesses. Reuse its exact membership sets, claim type, output, method and
 * sources: this produces no new positional meaning or strength inference.
 * Exact factRefs and independent T5 claim IDs survive into the existing T8's
 * upstreamClaimRefs when a theme occurs in multiple positions.
 */
function positionalVariant(source: RuleDefinition, path: ExactTenGodPath): RuleDefinition {
  const originalCondition = source.condition;
  const expression = originalCondition.op === 'or'
    ? originalCondition.expressions.find((candidate) =>
      candidate.op === 'in' &&
      candidate.value.kind === 'input' &&
      candidate.value.key === 'tenGods' &&
      candidate.value.path === `${path}.value`,
    )
    : undefined;
  if (expression === undefined || expression.op !== 'in') {
    throw new Error(`Unrecognized Ten-God source rule ${source.ruleId} at ${path}`);
  }
  const input = source.inputs[0];
  if (
    input === undefined ||
    input.source !== 'derived_fact' ||
    input.pathOrClaimType !== 'derivedFacts.tenGods'
  ) {
    throw new Error(`Unexpected source fact contract for ${source.ruleId}`);
  }
  return {
    ...source,
    ruleId: `${source.ruleId}-POSITION-${path.replace('.', '-').toUpperCase()}`,
    title: `${source.title} at ${path}`,
    description:
      'Exact-slot witness of the unchanged neutral Ten-God family theme. The slot is structural provenance only; no pillar-specific meaning or outcome is inferred.',
    inputs: [{
      ...input,
      key: 'positionTenGod',
      pathOrClaimType: `derivedFacts.tenGods.${path}`,
    }],
    condition: {
      op: 'in',
      value: { kind: 'input', key: 'positionTenGod' },
      set: expression.set,
    } satisfies RuleExpression,
  };
}

export const GENERAL_NATAL_POSITION_QUALIFIED_T5_RULES: readonly RuleDefinition[] =
  Object.freeze(GENERAL_NATAL_USEFUL_TEN_GOD_RULES.flatMap((source) => {
    const channel = (source.output.value as { channel?: string }).channel;
    const paths = channel === 'visible_stems'
      ? VISIBLE_STEM_PATHS
      : channel === 'branches'
        ? BRANCH_PATHS
        : undefined;
    if (paths === undefined) throw new Error(`Unexpected Ten-God channel ${source.ruleId}`);
    return paths.map((path) => positionalVariant(source, path));
  }));

/** Opt-in C2 engine trial. The existing general Preview host remains unchanged. */
export const GENERAL_NATAL_POSITION_QUALIFIED_RESEARCH_PACK: InterpretationPack = Object.freeze({
  ...GENERAL_NATAL_INTEGRATED_READING_PACK,
  packId: 'PACK-GENERAL-NATAL-EXACT-POSITION-T5-TO-T8-RESEARCH',
  name: 'General Natal exact-position T5 witnesses for existing T8 themes (research)',
  compositionPolicyRef: {
    id: 'COMPOSITION-GENERAL-NATAL-POSITION-QUALIFIED-RESEARCH',
    version: GENERAL_NATAL_INTEGRATED_READING_VERSION,
  },
  status: 'research',
});

export function createGeneralNatalPositionQualifiedResearchRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: [
        ...I18A_MONTH_BRANCH_STRENGTH_RULES,
        ...GENERAL_NATAL_POSITION_QUALIFIED_T5_RULES,
        ...GENERAL_NATAL_USEFUL_T8_RULES,
        ...GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_RULES,
      ],
      methodologies: [
        I18A_MONTH_BRANCH_STRENGTH_METHODOLOGY,
        GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY,
        GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY,
        GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_METHODOLOGY,
      ],
      sources: [
        ...I18A_MONTH_BRANCH_STRENGTH_SOURCES,
        GENERAL_NATAL_USEFUL_READING_SOURCE,
      ],
    },
    GENERAL_NATAL_POSITION_QUALIFIED_RESEARCH_PACK,
    createdAt,
  );
}
