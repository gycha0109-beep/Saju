import type {
  ResolvedAnnualTemporalStructureIntegration,
} from './annual-temporal-structure-integration.js';
import {
  projectTemporalStructureTransitionForReading,
  type ReadingTemporalStructureTransitionV1,
} from './temporal-structure-transition-projection.js';
import type { HeavenlyStem, EarthlyBranch, TenGod } from '../contracts/calculation.js';

export const READING_ANNUAL_TEMPORAL_STRUCTURE_SCHEMA_VERSION =
  'myeongha-reading-annual-temporal-structure-v1' as const;

export interface ReadingAnnualTemporalStructureV1 {
  schemaVersion: typeof READING_ANNUAL_TEMPORAL_STRUCTURE_SCHEMA_VERSION;
  integrationId: string;
  structureId: string;
  targetYear: number;
  annualPillar: {
    stem: HeavenlyStem;
    branch: EarthlyBranch;
    cycleIndex: number;
  };
  annualStemTenGod: TenGod;
  transition: ReadingTemporalStructureTransitionV1;
}

export function projectAnnualTemporalStructureForReading(
  integration: ResolvedAnnualTemporalStructureIntegration,
): ReadingAnnualTemporalStructureV1 {
  return {
    schemaVersion: READING_ANNUAL_TEMPORAL_STRUCTURE_SCHEMA_VERSION,
    integrationId: integration.integrationId,
    structureId: integration.structureId,
    targetYear: integration.annualFacts.targetYear,
    annualPillar: { ...integration.annualFacts.annualPillar },
    annualStemTenGod: integration.annualFacts.annualStemTenGod,
    transition: projectTemporalStructureTransitionForReading(
      integration.transition,
    ),
  };
}
