import type { InterpretationPack } from '../contracts/interpretation.js';
import { createRuleRegistrySnapshot } from '../interpretation/rule-registry.js';
import {
  I7_RESEARCH_SOURCES,
  I7_SEASONAL_SUPPORT_METHODOLOGY,
  I7_SEASONAL_SUPPORT_PACK,
  I7_SEASONAL_SUPPORT_RULES,
} from './i7-seasonal-support-pack.js';
import {
  I13_STRENGTH_EVIDENCE_METHODOLOGY,
  I13_STRENGTH_EVIDENCE_PACK,
  I13_STRENGTH_EVIDENCE_RULES,
  I13_STRENGTH_EVIDENCE_SOURCES,
} from './i13-strength-evidence-pack.js';

export const I14_STRENGTH_EVIDENCE_COMPOSITE_PACK: InterpretationPack = Object.freeze({
  packId: 'PACK-I14-STRENGTH-EVIDENCE-MATRIX-RESEARCH',
  version: '0.1.0-research',
  name: 'I14 Strength Evidence Matrix Research Pack',
  methodologyRefs: [
    {
      id: I7_SEASONAL_SUPPORT_METHODOLOGY.methodologyId,
      version: I7_SEASONAL_SUPPORT_METHODOLOGY.version,
    },
    {
      id: I13_STRENGTH_EVIDENCE_METHODOLOGY.methodologyId,
      version: I13_STRENGTH_EVIDENCE_METHODOLOGY.version,
    },
  ],
  enabledRuleSets: [
    ...I7_SEASONAL_SUPPORT_PACK.enabledRuleSets,
    ...I13_STRENGTH_EVIDENCE_PACK.enabledRuleSets,
  ],
  conflictPolicy: 'preserve_all',
  ambiguityPolicy: 'propagate',
  compositionPolicyRef: { id: 'COMPOSITION-I14-EVIDENCE-MATRIX-ONLY', version: '0.1.0' },
  status: 'research',
});

function uniqueSources() {
  const byId = new Map(
    [
      ...Object.values(I7_RESEARCH_SOURCES),
      ...I13_STRENGTH_EVIDENCE_SOURCES,
    ].map((source) => [source.sourceId, source] as const),
  );
  return [...byId.values()].sort((left, right) => left.sourceId.localeCompare(right.sourceId));
}

export function createI14StrengthEvidenceRegistry(createdAt = '1970-01-01T00:00:00.000Z') {
  return createRuleRegistrySnapshot(
    {
      rules: [...I7_SEASONAL_SUPPORT_RULES, ...I13_STRENGTH_EVIDENCE_RULES],
      methodologies: [
        I7_SEASONAL_SUPPORT_METHODOLOGY,
        I13_STRENGTH_EVIDENCE_METHODOLOGY,
      ],
      sources: uniqueSources(),
    },
    I14_STRENGTH_EVIDENCE_COMPOSITE_PACK,
    createdAt,
  );
}
