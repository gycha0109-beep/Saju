import { describe, expect, it } from 'vitest';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import type { NarrativeBlock, NarrativeDraft, NarrativePolicy } from '../src/contracts/narrative.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import type { NarrativeModelAdapter } from '../src/llm/model-adapter.js';
import { generateGroundedNarrative } from '../src/llm/narrative-orchestrator.js';
import { validateNarrativeDraftGrounding } from '../src/narrative/grounding-validator.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { prepareProductReading } from '../src/reading/product-reading-integration.js';
import { CAREER_NATAL_CLAIM_NARRATIVE_PROFILES } from '../src/research/career-natal-narrative-profiles.js';
import { createCareerNatalReadingCandidateRegistry } from '../src/research/career-natal-reading-candidate.js';
import {
  CAREER_RESEARCH_PREVIEW_SELECTION,
  assertCareerResearchPreviewEvidenceIsolation,
} from '../src/research/career-research-preview-isolation.js';
import { deriveDomainInterpretationSignatures } from '../src/verification/domain-interpretation-signature.js';

const FIXED_CALCULATION_TIME = new Date('2026-08-28T00:00:00.000Z');
const FIXED_INTERPRETATION_TIME = new Date('2026-08-28T00:01:00.000Z');
const FIXED_NARRATIVE_TIME = new Date('2026-08-28T00:02:00.000Z');
const SYNTHETIC_HOURS = [0, 3, 6, 9, 12, 15, 18, 21] as const;
const MAX_SCANNED_CASES = 128;
const MAX_DISTINCT_SIGNATURES = 8;

const narrativePolicy: NarrativePolicy = {
  policyId: 'myeonghwa-narrative-policy',
  version: '1.0.0-p7-ux-baseline',
  language: 'ko',
  certaintyPolicy: {
    deterministicFacts: 'direct',
    interpretationClaims: 'method_attributed',
    contestedClaims: 'explicit_difference',
    ambiguousFacts: 'explicit_uncertainty',
    futureClaims: 'non_deterministic',
  },
  tone: {
    style: 'clear',
    avoidFatalism: true,
    avoidFearInduction: true,
  },
  sensitiveDomains: {
    health: 'non_diagnostic',
    finance: 'non_advisory',
    legal: 'non_advisory',
    safety: 'no_harmful_direction',
  },
  sourceDisclosure: 'internal_only',
};

const integrationOptions = {
  narrativePolicyRef: { id: narrativePolicy.policyId, version: narrativePolicy.version },
  outputSchemaVersion: 'myeonghwa-narrative-draft-v1',
} as const;

const failingAdapter: NarrativeModelAdapter = {
  metadata: {
    provider: 'test-provider',
    modelId: 'forced-provider-failure-p7-ux-baseline',
    modelRevision: '1',
  },
  async generateStructured() {
    throw new Error('forced-provider-failure-p7-ux-baseline');
  },
};

interface SyntheticCase {
  month: number;
  day: number;
  hour: (typeof SYNTHETIC_HOURS)[number];
}

interface BaselineReading {
  caseId: string;
  input: SyntheticCase;
  interpretationSignature: string;
  userVisibleReading: string;
  visibleBlocks: readonly string[];
}

function userVisibleBlock(block: NarrativeBlock): unknown {
  switch (block.type) {
    case 'assertion':
      return {
        type: block.type,
        text: block.text,
        epistemicType: block.epistemicType,
      };
    case 'comparison':
      return {
        type: block.type,
        topic: block.topic,
        perspectives: block.perspectives.map((perspective) => perspective.summary),
        ...(block.synthesis === undefined ? {} : { synthesis: block.synthesis }),
      };
    case 'disclosure':
      return {
        type: block.type,
        disclosureType: block.disclosureType,
        text: block.text,
      };
    case 'transition':
      return { type: block.type, text: block.text };
  }
}

function userVisibleReading(draft: NarrativeDraft): string {
  return JSON.stringify(
    draft.sections.map((section) => ({
      title: section.title,
      blocks: section.blocks.map(userVisibleBlock),
    })),
  );
}

function visibleBlocks(draft: NarrativeDraft): readonly string[] {
  return draft.sections.flatMap((section) =>
    section.blocks.map((block) => JSON.stringify(userVisibleBlock(block))),
  );
}

function countExactRepetition(readings: readonly BaselineReading[]) {
  const blockCounts = new Map<string, number>();
  for (const reading of readings) {
    for (const block of new Set(reading.visibleBlocks)) {
      blockCounts.set(block, (blockCounts.get(block) ?? 0) + 1);
    }
  }

  const repeatedKinds = [...blockCounts.values()].filter((count) => count > 1).length;
  const repeatedOccurrences = [...blockCounts.values()].reduce(
    (total, count) => total + Math.max(0, count - 1),
    0,
  );

  return {
    uniqueVisibleBlockKinds: blockCounts.size,
    exactRepeatedBlockKindsAcrossDistinctSemanticReadings: repeatedKinds,
    exactRepeatedBlockOccurrencesAcrossDistinctSemanticReadings: repeatedOccurrences,
  };
}

async function renderCareerCase(
  registry: ReturnType<typeof createCareerNatalReadingCandidateRegistry>,
  input: SyntheticCase,
  requestId: string,
): Promise<BaselineReading | null> {
  const snapshot = calculateCanonicalSajuSnapshot(
    {
      calendarType: 'solar',
      date: { year: 2024, month: input.month, day: input.day },
      time: { known: true, hour: input.hour, minute: 0 },
      sexForTraditionalCalculation: 'unspecified',
    },
    PRODUCTION_DEFAULT_CALCULATION_POLICY,
    { now: FIXED_CALCULATION_TIME },
  );
  const execution = runInterpretation(snapshot, registry, {
    requestId,
    now: FIXED_INTERPRETATION_TIME,
  });
  const prepared = prepareProductReading(
    snapshot,
    execution,
    registry,
    { requestId, text: '직업운' },
    integrationOptions,
  );

  if (prepared.state !== 'ready_for_narrative' || prepared.narrativeRequest === undefined) {
    return null;
  }

  const isolation = assertCareerResearchPreviewEvidenceIsolation(
    prepared.narrativeRequest.evidenceBundle,
  );
  expect(isolation.state).toBe('isolated_legacy_direct_t8');
  expect(isolation.configuredPath).toBe('legacy_direct_t8');
  expect(isolation.nonLegacyCareerT8ClaimCount).toBe(0);
  expect(isolation.personalizedDefaultAllowed).toBe(false);
  expect(CAREER_RESEARCH_PREVIEW_SELECTION.personalizedDefaultAllowed).toBe(false);

  const signatures = deriveDomainInterpretationSignatures(
    execution.claims,
    execution.claimRelations,
    prepared.composition?.selection,
  );
  expect(signatures).toHaveLength(1);
  const signature = signatures[0];
  if (signature === undefined) {
    throw new Error(`Missing selected Career interpretation signature for ${requestId}.`);
  }

  const narrative = await generateGroundedNarrative(
    failingAdapter,
    prepared.narrativeRequest,
    narrativePolicy,
    {
      claimNarrativeProfiles: CAREER_NATAL_CLAIM_NARRATIVE_PROFILES,
      now: FIXED_NARRATIVE_TIME,
    },
  );
  expect(narrative.outcome).toBe('deterministic_fallback');
  const grounding = validateNarrativeDraftGrounding(
    narrative.draft,
    prepared.narrativeRequest.evidenceBundle,
  );
  expect(grounding.valid).toBe(true);
  expect(grounding.violations).toEqual([]);

  return {
    caseId: requestId,
    input,
    interpretationSignature: signature.signature,
    userVisibleReading: userVisibleReading(narrative.draft),
    visibleBlocks: visibleBlocks(narrative.draft),
  };
}

describe('P7 legacy-isolated Career research preview UX baseline', () => {
  it(
    'measures deterministic consistency, semantic differentiation, and exact repetition without certifying personalized UX',
    async () => {
      const registry = createCareerNatalReadingCandidateRegistry(
        FIXED_CALCULATION_TIME.toISOString(),
      );
      const byInterpretationSignature = new Map<string, BaselineReading>();
      let scannedCases = 0;
      let readyCases = 0;
      let firstReady: BaselineReading | null = null;

      outer: for (let month = 1; month <= 12; month += 1) {
        for (let day = 1; day <= 28; day += 1) {
          for (const hour of SYNTHETIC_HOURS) {
            scannedCases += 1;
            const input: SyntheticCase = { month, day, hour };
            const caseId = `p7-legacy-ux-${String(scannedCases).padStart(4, '0')}`;
            const reading = await renderCareerCase(registry, input, caseId);

            if (reading !== null) {
              readyCases += 1;
              firstReady ??= reading;

              const existing = byInterpretationSignature.get(reading.interpretationSignature);
              if (existing !== undefined) {
                expect(reading.userVisibleReading).toBe(existing.userVisibleReading);
              } else {
                byInterpretationSignature.set(reading.interpretationSignature, reading);
              }
            }

            if (
              byInterpretationSignature.size >= MAX_DISTINCT_SIGNATURES ||
              scannedCases >= MAX_SCANNED_CASES
            ) {
              break outer;
            }
          }
        }
      }

      expect(firstReady).not.toBeNull();
      expect(readyCases).toBeGreaterThan(0);
      expect(byInterpretationSignature.size).toBeGreaterThanOrEqual(2);
      if (firstReady === null) {
        throw new Error('Expected at least one reachable legacy-isolated Career preview case.');
      }

      const repeatedSameInput = await renderCareerCase(
        registry,
        firstReady.input,
        `${firstReady.caseId}-repeat`,
      );
      expect(repeatedSameInput).not.toBeNull();
      if (repeatedSameInput === null) {
        throw new Error('The same reachable Career input must remain reachable on repeat.');
      }
      expect(repeatedSameInput.interpretationSignature).toBe(firstReady.interpretationSignature);
      expect(repeatedSameInput.userVisibleReading).toBe(firstReady.userVisibleReading);
      expect(repeatedSameInput.visibleBlocks).toEqual(firstReady.visibleBlocks);

      const distinctSemanticReadings = [...byInterpretationSignature.values()];
      const readingToSignature = new Map<string, string>();
      let exactReadingClonesAcrossDistinctSignatures = 0;
      for (const reading of distinctSemanticReadings) {
        const previousSignature = readingToSignature.get(reading.userVisibleReading);
        if (
          previousSignature !== undefined &&
          previousSignature !== reading.interpretationSignature
        ) {
          exactReadingClonesAcrossDistinctSignatures += 1;
        }
        readingToSignature.set(reading.userVisibleReading, reading.interpretationSignature);
      }
      expect(exactReadingClonesAcrossDistinctSignatures).toBe(0);

      const repetition = countExactRepetition(distinctSemanticReadings);
      expect(repetition.uniqueVisibleBlockKinds).toBeGreaterThan(0);
      expect(
        repetition.exactRepeatedBlockKindsAcrossDistinctSemanticReadings,
      ).toBeGreaterThanOrEqual(0);
      expect(
        repetition.exactRepeatedBlockOccurrencesAcrossDistinctSemanticReadings,
      ).toBeGreaterThanOrEqual(0);

      process.stdout.write(
        `P7_LEGACY_ISOLATED_CAREER_UX_BASELINE ${JSON.stringify({
          scannedCases,
          readyCases,
          distinctInterpretationSignatures: byInterpretationSignature.size,
          sameInputDeterministic: true,
          exactReadingClonesAcrossDistinctSignatures,
          ...repetition,
          previewPath: CAREER_RESEARCH_PREVIEW_SELECTION.defaultPath,
          personalizedDefaultAllowed: CAREER_RESEARCH_PREVIEW_SELECTION.personalizedDefaultAllowed,
          subjectiveTemplateFeelCertified: false,
          personalizedUxCertified: false,
        })}\n`,
      );
    },
    45_000,
  );
});
