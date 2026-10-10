import type { InterpretationPack } from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from './rule-registry.js';
import {
  GENERAL_NATAL_USEFUL_READING_PACK,
  GENERAL_NATAL_USEFUL_READING_SOURCE,
  GENERAL_NATAL_USEFUL_SYNTHESIS_METHODOLOGY,
  GENERAL_NATAL_TEN_GOD_THEME_METHODOLOGY,
  GENERAL_NATAL_USEFUL_T8_RULES,
  GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
} from '../research/general-natal-useful-reading-candidate.js';
import {
  GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_METHODOLOGY,
  GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_PACK,
  GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_RULES,
} from '../research/general-natal-t8-structural-summary-candidate.js';
import {
  I18A_MONTH_BRANCH_STRENGTH_METHODOLOGY,
  I18A_MONTH_BRANCH_STRENGTH_RULES,
  I18A_MONTH_BRANCH_STRENGTH_SOURCES,
} from '../research/i18a-month-branch-strength-evidence.js';

/**
 * Assemble existing bounded General Natal T8 producers into one executable
 * chart-level reading. This is a research-lifecycle composition, NOT a new
 * interpretation methodology, semantic claim, or production authorization.
 *
 * All source rules and their original methodology/status remain unchanged.
 * The I18A scope guard is executed together with its month-branch relation;
 * it cannot be bypassed to infer final strength, fortune, or Yong-Shen.
 */
export const GENERAL_NATAL_INTEGRATED_READING_VERSION = '0.1.0-research' as const;

export const GENERAL_NATAL_INTEGRATED_READING_PACK: InterpretationPack = Object.freeze({
  packId: 'PACK-GENERAL-NATAL-INTEGRATED-STRUCTURAL-READING',
  version: GENERAL_NATAL_INTEGRATED_READING_VERSION,
  name: 'General Natal existing-theme and month-branch integration (research)',
  methodologyRefs: [
    ...GENERAL_NATAL_USEFUL_READING_PACK.methodologyRefs,
    ...GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_PACK.methodologyRefs.filter(
      (ref) =>
        !GENERAL_NATAL_USEFUL_READING_PACK.methodologyRefs.some(
          (existing) => existing.id === ref.id && existing.version === ref.version,
        ),
    ),
  ],
  enabledRuleSets: [
    ...new Set([
      ...GENERAL_NATAL_USEFUL_READING_PACK.enabledRuleSets,
      ...GENERAL_NATAL_T8_STRUCTURAL_SUMMARY_PACK.enabledRuleSets,
    ]),
  ],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: {
    id: 'COMPOSITION-GENERAL-NATAL-EXISTING-STRUCTURES-RESEARCH',
    version: GENERAL_NATAL_INTEGRATED_READING_VERSION,
  },
  status: 'research',
});

export function createGeneralNatalIntegratedReadingRegistry(
  createdAt = '1970-01-01T00:00:00.000Z',
) {
  return createRuleRegistrySnapshot(
    {
      rules: [
        ...I18A_MONTH_BRANCH_STRENGTH_RULES,
        ...GENERAL_NATAL_USEFUL_TEN_GOD_RULES,
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
    GENERAL_NATAL_INTEGRATED_READING_PACK,
    createdAt,
  );
}
