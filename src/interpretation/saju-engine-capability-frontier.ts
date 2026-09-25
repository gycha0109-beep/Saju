import { deterministicContentHash } from './rule-registry.js';
import {
  evaluateSajuEngineAuthorityIntake,
  type SajuEngineAuthorityIntakeContract,
  type SajuEngineImplementationEvidence,
  type SajuEngineImplementationRouting,
  type SajuEngineUpstreamDisposition,
} from './saju-engine-authority-intake.js';

export const SAJU_ENGINE_CAPABILITY_FRONTIER_VERSION =
  'myeonghwa-saju-engine-capability-frontier-v1' as const;

export type SajuEngineCapabilityKey =
  | 'general:natal'
  | 'general:annual'
  | 'general:monthly'
  | 'career:natal'
  | 'career:annual'
  | 'career:monthly'
  | 'wealth:natal'
  | 'wealth:annual'
  | 'wealth:monthly'
  | 'business:natal'
  | 'business:annual'
  | 'business:monthly'
  | 'relationship:natal:general'
  | 'relationship:annual:general'
  | 'relationship:monthly:general'
  | 'relationship:natal:spouse'
  | 'family:natal:parents'
  | 'family:natal:children'
  | 'compatibility:natal'
  | 'life_stage:life_stage'
  | 'question_specific:natal';

export type SajuEngineCurrentRouting =
  | 'BOUNDED_PREVIEW_READY'
  | SajuEngineImplementationRouting;

interface CapabilityFrontierSeed {
  capabilityKey: SajuEngineCapabilityKey;
  upstreamDisposition?: SajuEngineUpstreamDisposition;
  producerRuntimeExists: boolean;
  currentBoundary: 'BOUNDED_PREVIEW' | 'UPSTREAM_INTAKE';
}

const CURRENT_CAPABILITY_SEEDS: readonly CapabilityFrontierSeed[] = Object.freeze([
  {
    capabilityKey: 'general:natal',
    producerRuntimeExists: true,
    currentBoundary: 'BOUNDED_PREVIEW',
  },
  {
    capabilityKey: 'general:annual',
    upstreamDisposition: 'RESEARCH_GAP',
    producerRuntimeExists: true,
    currentBoundary: 'UPSTREAM_INTAKE',
  },
  {
    capabilityKey: 'general:monthly',
    upstreamDisposition: 'AUTHORITY_GAP',
    producerRuntimeExists: true,
    currentBoundary: 'UPSTREAM_INTAKE',
  },
  {
    capabilityKey: 'career:natal',
    producerRuntimeExists: true,
    currentBoundary: 'BOUNDED_PREVIEW',
  },
  {
    capabilityKey: 'career:annual',
    upstreamDisposition: 'AUTHORITY_GAP',
    producerRuntimeExists: true,
    currentBoundary: 'UPSTREAM_INTAKE',
  },
  {
    capabilityKey: 'career:monthly',
    upstreamDisposition: 'AUTHORITY_GAP',
    producerRuntimeExists: true,
    currentBoundary: 'UPSTREAM_INTAKE',
  },
  {
    capabilityKey: 'wealth:natal',
    producerRuntimeExists: true,
    currentBoundary: 'BOUNDED_PREVIEW',
  },
  {
    capabilityKey: 'wealth:annual',
    upstreamDisposition: 'AUTHORITY_GAP',
    producerRuntimeExists: true,
    currentBoundary: 'UPSTREAM_INTAKE',
  },
  {
    capabilityKey: 'wealth:monthly',
    upstreamDisposition: 'AUTHORITY_GAP',
    producerRuntimeExists: true,
    currentBoundary: 'UPSTREAM_INTAKE',
  },
  {
    capabilityKey: 'business:natal',
    producerRuntimeExists: true,
    currentBoundary: 'BOUNDED_PREVIEW',
  },
  {
    capabilityKey: 'business:annual',
    upstreamDisposition: 'AUTHORITY_GAP',
    producerRuntimeExists: true,
    currentBoundary: 'UPSTREAM_INTAKE',
  },
  {
    capabilityKey: 'business:monthly',
    upstreamDisposition: 'AUTHORITY_GAP',
    producerRuntimeExists: true,
    currentBoundary: 'UPSTREAM_INTAKE',
  },
  {
    capabilityKey: 'relationship:natal:general',
    producerRuntimeExists: true,
    currentBoundary: 'BOUNDED_PREVIEW',
  },
  {
    capabilityKey: 'relationship:annual:general',
    upstreamDisposition: 'AUTHORITY_GAP',
    producerRuntimeExists: true,
    currentBoundary: 'UPSTREAM_INTAKE',
  },
  {
    capabilityKey: 'relationship:monthly:general',
    upstreamDisposition: 'AUTHORITY_GAP',
    producerRuntimeExists: true,
    currentBoundary: 'UPSTREAM_INTAKE',
  },
  {
    capabilityKey: 'relationship:natal:spouse',
    upstreamDisposition: 'AUTHORITY_GAP',
    producerRuntimeExists: true,
    currentBoundary: 'UPSTREAM_INTAKE',
  },
  {
    capabilityKey: 'family:natal:parents',
    upstreamDisposition: 'RESEARCH_GAP',
    producerRuntimeExists: false,
    currentBoundary: 'UPSTREAM_INTAKE',
  },
  {
    capabilityKey: 'family:natal:children',
    upstreamDisposition: 'RESEARCH_GAP',
    producerRuntimeExists: false,
    currentBoundary: 'UPSTREAM_INTAKE',
  },
  {
    capabilityKey: 'compatibility:natal',
    upstreamDisposition: 'RESEARCH_GAP',
    producerRuntimeExists: false,
    currentBoundary: 'UPSTREAM_INTAKE',
  },
  {
    capabilityKey: 'life_stage:life_stage',
    upstreamDisposition: 'RESEARCH_GAP',
    producerRuntimeExists: false,
    currentBoundary: 'UPSTREAM_INTAKE',
  },
  {
    capabilityKey: 'question_specific:natal',
    upstreamDisposition: 'RESEARCH_GAP',
    producerRuntimeExists: false,
    currentBoundary: 'UPSTREAM_INTAKE',
  },
]);

function blockedContract(seed: CapabilityFrontierSeed): SajuEngineAuthorityIntakeContract {
  if (seed.upstreamDisposition === undefined) {
    throw new Error(`Missing upstream disposition for ${seed.capabilityKey}`);
  }

  return {
    capabilityKey: seed.capabilityKey,
    upstreamDisposition: seed.upstreamDisposition,
    requiredInputs: [],
    allowedClaims: [],
    forbiddenClaims: [],
    runtimePrerequisites: [],
    negativeCases: [],
  };
}

function implementationEvidence(
  seed: CapabilityFrontierSeed,
): SajuEngineImplementationEvidence {
  return {
    producerRuntimeExists: seed.producerRuntimeExists,
    compositionIntegrated: false,
    deterministicGuardsComplete: false,
    e2eComplete: false,
  };
}

export interface SajuEngineCapabilityFrontierEntry {
  capabilityKey: SajuEngineCapabilityKey;
  currentRouting: SajuEngineCurrentRouting;
  producerRuntimeExists: boolean;
  currentBoundary: 'BOUNDED_PREVIEW' | 'UPSTREAM_INTAKE';
  intakeEvaluationHash: string | null;
  implementationMayProceed: boolean;
  constraints: {
    boundedPreviewReadinessIsNewEngineAdmission: false;
    researchRuntimeIsSemanticAdmission: false;
    readingProfileSelectionIsSemanticAdmission: false;
    mayPromoteProductionAuthority: false;
  };
}

export interface SajuEngineCapabilityFrontier {
  version: typeof SAJU_ENGINE_CAPABILITY_FRONTIER_VERSION;
  entries: readonly SajuEngineCapabilityFrontierEntry[];
  counts: {
    total: number;
    boundedPreviewReady: number;
    holdAuthority: number;
    holdResearch: number;
    p0Runtime: number;
    p1Composition: number;
    p2Hardening: number;
    readyFromAdmittedIntake: number;
    invalidEvidence: number;
  };
  engineWorkQueue: readonly SajuEngineCapabilityKey[];
  constraints: {
    snapshotIsAuthoritySource: false;
    mayPromoteResearchAuthority: false;
    mayTreatPreviewAsProductionAuthority: false;
    mayCreateSemanticsFromInventory: false;
  };
  frontierHash: string;
}

export function buildCurrentSajuEngineCapabilityFrontier(): SajuEngineCapabilityFrontier {
  const entries = Object.freeze(
    CURRENT_CAPABILITY_SEEDS.map((seed): SajuEngineCapabilityFrontierEntry => {
      if (seed.currentBoundary === 'BOUNDED_PREVIEW') {
        return Object.freeze({
          capabilityKey: seed.capabilityKey,
          currentRouting: 'BOUNDED_PREVIEW_READY' as const,
          producerRuntimeExists: seed.producerRuntimeExists,
          currentBoundary: seed.currentBoundary,
          intakeEvaluationHash: null,
          implementationMayProceed: false,
          constraints: Object.freeze({
            boundedPreviewReadinessIsNewEngineAdmission: false as const,
            researchRuntimeIsSemanticAdmission: false as const,
            readingProfileSelectionIsSemanticAdmission: false as const,
            mayPromoteProductionAuthority: false as const,
          }),
        });
      }

      const evaluation = evaluateSajuEngineAuthorityIntake(
        blockedContract(seed),
        implementationEvidence(seed),
      );

      return Object.freeze({
        capabilityKey: seed.capabilityKey,
        currentRouting: evaluation.routing,
        producerRuntimeExists: seed.producerRuntimeExists,
        currentBoundary: seed.currentBoundary,
        intakeEvaluationHash: evaluation.evaluationHash,
        implementationMayProceed: evaluation.implementationMayProceed,
        constraints: Object.freeze({
          boundedPreviewReadinessIsNewEngineAdmission: false as const,
          researchRuntimeIsSemanticAdmission: false as const,
          readingProfileSelectionIsSemanticAdmission: false as const,
          mayPromoteProductionAuthority: false as const,
        }),
      });
    }),
  );

  const count = (routing: SajuEngineCurrentRouting): number =>
    entries.filter((entry) => entry.currentRouting === routing).length;

  const engineWorkQueue = Object.freeze(
    entries
      .filter((entry) => entry.implementationMayProceed)
      .map((entry) => entry.capabilityKey),
  );

  const material = Object.freeze({
    version: SAJU_ENGINE_CAPABILITY_FRONTIER_VERSION,
    entries,
    counts: Object.freeze({
      total: entries.length,
      boundedPreviewReady: count('BOUNDED_PREVIEW_READY'),
      holdAuthority: count('HOLD_AUTHORITY'),
      holdResearch: count('HOLD_RESEARCH'),
      p0Runtime: count('P0_RUNTIME'),
      p1Composition: count('P1_COMPOSITION'),
      p2Hardening: count('P2_HARDENING'),
      readyFromAdmittedIntake: count('READY'),
      invalidEvidence: count('INVALID_EVIDENCE'),
    }),
    engineWorkQueue,
    constraints: Object.freeze({
      snapshotIsAuthoritySource: false as const,
      mayPromoteResearchAuthority: false as const,
      mayTreatPreviewAsProductionAuthority: false as const,
      mayCreateSemanticsFromInventory: false as const,
    }),
  });

  return Object.freeze({
    ...material,
    frontierHash: deterministicContentHash(material),
  });
}
