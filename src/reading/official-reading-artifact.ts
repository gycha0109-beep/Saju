import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ReadingArtifact, ReadingStatus } from '../contracts/reading.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  assertCanonicalReadingSemanticBundleV1,
  type CanonicalReadingSemanticBundleV1,
} from './canonical-reading-semantics.js';
import {
  assertOfficialReadingPlanV1,
  type OfficialReadingPlanV1,
} from './official-reading-plan.js';
import {
  OFFICIAL_READING_RENDERER_VERSION,
  type OfficialReadingRenderedContentV1,
} from './official-reading-renderer.js';
import { buildReadingArtifactShell } from './reading-artifact-shell.js';

export const OFFICIAL_READING_ARTIFACT_SCHEMA_VERSION =
  'myeonghwa-official-reading-artifact-v1' as const;

export interface OfficialReadingArtifactAssemblyOptions {
  readingVersion: string;
  generatedAt?: Date;
  displayLabel?: string;
}

export interface OfficialReadingArtifactV1
  extends Omit<ReadingArtifact, 'schemaVersion' | 'provenance'> {
  schemaVersion: typeof OFFICIAL_READING_ARTIFACT_SCHEMA_VERSION;
  provenance: {
    snapshotId: string;
    interpretationRunId: string;
    readingVersion: string;
    canonicalSemanticHash: string;
    officialReadingPlanHash: string;
    officialReadingReportId: string;
    officialReadingReportHash: string;
    contentAuthority: 'official_reading';
  };
}

function officialReadingStatus(
  snapshot: CanonicalSajuSnapshot,
  interpretation: InterpretationExecutionResult,
): ReadingStatus {
  if (interpretation.run.status === 'failed') return 'cannot_interpret';
  if (interpretation.run.status === 'partial') return 'partial';
  if (!snapshot.completeness.fullyResolved) return 'ready_with_ambiguity';
  return 'ready';
}

function assertReportBinding(
  semantics: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
  report: OfficialReadingRenderedContentV1,
): void {
  if (report.rendererVersion !== OFFICIAL_READING_RENDERER_VERSION) {
    throw new TypeError('Official Reading artifact received an unsupported renderer version.');
  }
  if (report.sourceSemanticHash !== semantics.semanticHash) {
    throw new TypeError('Official Reading artifact report semantic hash does not match canonical semantics.');
  }
  if (report.sourcePlanHash !== plan.planHash) {
    throw new TypeError('Official Reading artifact report plan hash does not match the Official Reading plan.');
  }

  const reportMaterial = {
    rendererVersion: report.rendererVersion,
    sourceSemanticHash: report.sourceSemanticHash,
    sourcePlanHash: report.sourcePlanHash,
    sections: report.sections,
    disclosures: report.disclosures,
    explainability: report.explainability,
  };
  const expectedReportHash = deterministicContentHash(reportMaterial);
  if (report.reportHash !== expectedReportHash) {
    throw new TypeError('Official Reading artifact report hash is invalid.');
  }
  if (report.reportId !== `official_reading_report_${expectedReportHash.slice(0, 24)}`) {
    throw new TypeError('Official Reading artifact report identity is invalid.');
  }
}

export function assembleOfficialReadingArtifactV1(
  snapshot: CanonicalSajuSnapshot,
  interpretation: InterpretationExecutionResult,
  semantics: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
  report: OfficialReadingRenderedContentV1,
  options: OfficialReadingArtifactAssemblyOptions,
): OfficialReadingArtifactV1 {
  if (options.readingVersion.trim().length === 0) {
    throw new TypeError('readingVersion must be a non-empty string.');
  }
  if (interpretation.run.snapshotId !== snapshot.snapshotId) {
    throw new TypeError(
      'Official Reading artifact inputs do not share the same CanonicalSajuSnapshot.',
    );
  }

  assertCanonicalReadingSemanticBundleV1(semantics);
  if (
    semantics.snapshotId !== snapshot.snapshotId ||
    semantics.interpretationRunId !== interpretation.run.interpretationRunId
  ) {
    throw new TypeError(
      'Official Reading artifact canonical semantics do not belong to the supplied execution.',
    );
  }

  assertOfficialReadingPlanV1(plan, semantics);
  assertReportBinding(semantics, plan, report);

  const shell = buildReadingArtifactShell(snapshot, {
    ...(options.displayLabel === undefined ? {} : { displayLabel: options.displayLabel }),
  });
  const generatedAt = options.generatedAt ?? new Date();
  const identityMaterial = {
    schemaVersion: OFFICIAL_READING_ARTIFACT_SCHEMA_VERSION,
    readingVersion: options.readingVersion,
    snapshotId: snapshot.snapshotId,
    interpretationRunId: interpretation.run.interpretationRunId,
    canonicalSemanticHash: semantics.semanticHash,
    officialReadingPlanHash: plan.planHash,
    officialReadingReportId: report.reportId,
    officialReadingReportHash: report.reportHash,
  };
  const readingId = `official_reading_${deterministicContentHash(identityMaterial).slice(0, 24)}`;

  return {
    readingId,
    schemaVersion: OFFICIAL_READING_ARTIFACT_SCHEMA_VERSION,
    status: officialReadingStatus(snapshot, interpretation),
    ...shell,
    sections: report.sections,
    disclosures: report.disclosures,
    explainability: report.explainability,
    provenance: {
      snapshotId: snapshot.snapshotId,
      interpretationRunId: interpretation.run.interpretationRunId,
      readingVersion: options.readingVersion,
      canonicalSemanticHash: semantics.semanticHash,
      officialReadingPlanHash: plan.planHash,
      officialReadingReportId: report.reportId,
      officialReadingReportHash: report.reportHash,
      contentAuthority: 'official_reading',
    },
    generatedAt: generatedAt.toISOString(),
  };
}
