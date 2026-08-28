import { describe, expect, it } from 'vitest';
import type { NarrativeBlock, NarrativeDraft, NarrativePolicy } from '../src/contracts/narrative.js';
import { calculateCanonicalSajuSnapshot } from '../src/calculation/calculation-engine.js';
import { runInterpretation } from '../src/interpretation/interpretation-engine.js';
import type { NarrativeModelAdapter } from '../src/llm/model-adapter.js';
import { generateGroundedNarrative } from '../src/llm/narrative-orchestrator.js';
import { validateNarrativeDraftGrounding } from '../src/narrative/grounding-validator.js';
import { PRODUCTION_DEFAULT_CALCULATION_POLICY } from '../src/production/production-calculation-policy.js';
import { prepareProductReading } from '../src/reading/product-reading-integration.js';
import {
  CAREER_NATAL_READING_METHODOLOGY,
  CAREER_NATAL_READING_PACK,
  createCareerNatalReadingCandidateRegistry,
} from '../src/research/career-natal-reading-candidate.js';
import { deriveDomainInterpretationSignatures } from '../src/verification/domain-interpretation-signature.js';

const FIXED_CALCULATION_TIME = new Date('2026-08-28T00:00:00.000Z');
const FIXED_INTERPRETATION_TIME = new Date('2026-08-28T00:01:00.000Z');
const FIXED_NARRATIVE_TIME = new Date('2026-08-28T00:02:00.000Z');
const SYNTHETIC_HOURS = [0, 3, 6, 9, 12, 15, 18, 21] as const;
const MAX_SCANNED_CASES = 128;

const narrativePolicy: NarrativePolicy = {
  policyId: 'myeonghwa-narrative-policy',
  version: '1.0.0-test',
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
    modelId: 'forced-provider-failure',
    modelRevision: '1',
  },
  async generateStructured() {
    throw new Error('forced-provider-failure');
  },
};

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

interface ReachableCareerReading {
  caseId: string;
  interpretationSignature: string;
  userVisibleReading: string;
}

describe('P5 Career narrative reachability', () => {
  it(
    'reaches a grounded deterministic narrative through selection-only research authorization without semantic collapse',
    async () => {
      const registry = createCareerNatalReadingCandidateRegistry(
        FIXED_CALCULATION_TIME.toISOString(),
      );
      const byInterpretationSignature = new Map<string, ReachableCareerReading>();
      let scannedCases = 0;
      let readyCases = 0;

      expect(CAREER_NATAL_READING_PACK.status).toBe('research');
      expect(CAREER_NATAL_READING_METHODOLOGY.status).toBe('research');

      outer: for (let month = 1; month <= 12; month += 1) {
        for (let day = 1; day <= 28; day += 1) {
          for (const hour of SYNTHETIC_HOURS) {
            scannedCases += 1;
            const caseId = `career-narrative-engine-${String(scannedCases).padStart(4, '0')}`;
            const snapshot = calculateCanonicalSajuSnapshot(
              {
                calendarType: 'solar',
                date: { year: 2024, month, day },
                time: { known: true, hour, minute: 0 },
                sexForTraditionalCalculation: 'unspecified',
              },
              PRODUCTION_DEFAULT_CALCULATION_POLICY,
              { now: FIXED_CALCULATION_TIME },
            );
            const execution = runInterpretation(snapshot, registry, {
              requestId: caseId,
              now: FIXED_INTERPRETATION_TIME,
            });
            const prepared = prepareProductReading(
              snapshot,
              execution,
              registry,
              { requestId: caseId, text: '직업운' },
              integrationOptions,
            );

            if (prepared.state !== 'ready_for_narrative') {
              if (scannedCases >= MAX_SCANNED_CASES) break outer;
              continue;
            }
            readyCases += 1;

            const composition = prepared.composition;
            const request = prepared.narrativeRequest;
            expect(composition).toBeDefined();
            expect(request).toBeDefined();
            if (composition === undefined || request === undefined) {
              throw new Error(`ready_for_narrative must carry composition and request for ${caseId}.`);
            }

            expect(composition.selection.coverageState).toBe('complete');
            expect(composition.selection.profileAuthorization.state).toBe('authorized');
            expect(composition.selection.constraints.mayPromoteResearchAuthority).toBe(false);
            expect(composition.profileAuthorization?.scope).toBe('reading_evidence_selection_only');
            expect(composition.profileAuthorization?.constraints).toEqual({
              mayAuthorizeInterpretationRules: false,
              mayAuthorizeClaimGeneration: false,
              mayAuthorizeDomainSemantics: false,
              mayPromoteResearchAuthority: false,
              mayOverrideInterpretationAuthorization: false,
            });
            expect(prepared.deliveryEligibility.constraints.mayPromoteResearchAuthority).toBe(false);
            expect(prepared.deliveryEligibility.constraints.mayGenerateInterpretationClaims).toBe(false);
            expect(prepared.deliveryEligibility.narrativeGeneration).toBe('allowed');
            expect(prepared.deliveryEligibility.artifactAssembly).toBe(
              'allowed_after_grounded_narrative',
            );

            expect(composition.selection.selectedClaimIds.length).toBeGreaterThan(0);
            expect(request.evidenceBundle.claims.map((claim) => claim.claimId).sort()).toEqual(
              [...composition.selection.selectedClaimIds].sort(),
            );

            for (const bundledClaim of request.evidenceBundle.claims) {
              const originalClaim = execution.claims.find(
                (claim) => claim.claimId === bundledClaim.claimId,
              );
              expect(originalClaim).toBeDefined();
              if (originalClaim === undefined) {
                throw new Error(`Missing original selected claim ${bundledClaim.claimId}.`);
              }
              expect(bundledClaim.taxonomy.tier).toBe('T8');
              expect(bundledClaim.taxonomy.category).toBe('career');
              expect(bundledClaim.sourceRefs).toEqual(originalClaim.sourceRefs);
              expect(bundledClaim.ruleRefs).toEqual(originalClaim.ruleRefs);
              expect(bundledClaim.methodologyRef).toEqual(originalClaim.methodologyRef);
            }

            const signatures = deriveDomainInterpretationSignatures(
              execution.claims,
              execution.claimRelations,
              composition.selection,
            );
            expect(signatures).toHaveLength(1);
            const signature = signatures[0];
            if (signature === undefined) {
              throw new Error(`Missing selected Career interpretation signature for ${caseId}.`);
            }

            const narrative = await generateGroundedNarrative(
              failingAdapter,
              request,
              narrativePolicy,
              { now: FIXED_NARRATIVE_TIME },
            );
            expect(narrative.outcome).toBe('deterministic_fallback');
            expect(narrative.modelCalls).toBe(1);
            expect(narrative.run.validation.firstPass).toBe('failed');
            expect(narrative.run.validation.repairAttempted).toBe(false);
            expect(narrative.run.validation.final).toBe('fallback');
            expect(narrative.run.requestId).toBe(request.requestId);
            expect(narrative.run.interpretationRunId).toBe(
              request.evidenceBundle.interpretationRunId,
            );

            const grounding = validateNarrativeDraftGrounding(
              narrative.draft,
              request.evidenceBundle,
            );
            expect(grounding.valid).toBe(true);
            expect(grounding.violations).toEqual([]);

            if (!byInterpretationSignature.has(signature.signature)) {
              byInterpretationSignature.set(signature.signature, {
                caseId,
                interpretationSignature: signature.signature,
                userVisibleReading: userVisibleReading(narrative.draft),
              });
            }

            if (byInterpretationSignature.size >= 2) break outer;
            if (scannedCases >= MAX_SCANNED_CASES) break outer;
          }
        }
      }

      expect(readyCases).toBeGreaterThan(0);
      expect(byInterpretationSignature.size).toBeGreaterThanOrEqual(2);

      const [left, right] = [...byInterpretationSignature.values()];
      expect(left).toBeDefined();
      expect(right).toBeDefined();
      if (left === undefined || right === undefined) {
        throw new Error('Expected two reachable Career readings with distinct selected semantics.');
      }

      expect(left.interpretationSignature).not.toBe(right.interpretationSignature);
      expect(left.userVisibleReading).not.toBe(right.userVisibleReading);

      process.stdout.write(
        `CAREER_NARRATIVE_REACHABILITY ${JSON.stringify({
          scannedCases,
          readyCases,
          leftCaseId: left.caseId,
          rightCaseId: right.caseId,
          distinctInterpretationSignatures: byInterpretationSignature.size,
        })}\n`,
      );
    },
    30_000,
  );
});
