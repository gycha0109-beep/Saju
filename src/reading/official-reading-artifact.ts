import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { ReadingArtifact, ReadingStatus } from '../contracts/reading.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import {
  assertCanonicalReadingSemanticBundleV1,
  type CanonicalReadingSemanticBundleV1,
} from './canonical-reading-semantics.js';
import {
  OFFICIAL_READING_EXPLAINABILITY_BINDING_POLICY_VERSION,
  assertOfficialReadingPlanV1,
  type OfficialReadingPlanV1,
} from './official-reading-plan.js';
import {
  OFFICIAL_READING_ORDINARY_MULTI_CLAIM_PRESENTATION_POLICY_VERSION,
  OFFICIAL_READING_RENDERER_VERSION,
  OFFICIAL_READING_SOURCE_SUMMARY_PRESENTATION_POLICY_VERSION,
  OFFICIAL_READING_STRUCTURED_INSIGHT_MATERIALIZATION_POLICY_VERSION,
  OFFICIAL_READING_STRUCTURAL_REALIZATION_POLICY_VERSION,
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

function assertOfficialExplainabilityBindings(
  semantics: CanonicalReadingSemanticBundleV1,
  report: OfficialReadingRenderedContentV1,
): void {
  const semanticUnitIds = new Set(semantics.units.map((unit) => unit.unitId));
  const entriesByRef = new Map(
    report.explainability.entries.map((entry) => [
      entry.explainabilityRef,
      entry,
    ]),
  );
  if (entriesByRef.size !== report.explainability.entries.length) {
    throw new TypeError(
      'Official Reading explainability refs must be unique.',
    );
  }

  for (const entry of report.explainability.entries) {
    if (
      entry.primaryUnitRefs === undefined ||
      entry.supportingUnitRefs === undefined ||
      entry.primaryUnitRefs.length === 0
    ) {
      throw new TypeError(
        'Official Reading explainability entries require canonical unit bindings.',
      );
    }
    for (const ref of [
      ...entry.primaryUnitRefs,
      ...entry.supportingUnitRefs,
    ]) {
      if (!semanticUnitIds.has(ref)) {
        throw new TypeError(
          'Official Reading explainability entry contains an unknown canonical unit ref.',
        );
      }
    }
  }

  for (const section of report.sections) {
    const sectionRefs = section.explainabilityRefs ?? [];
    for (const ref of sectionRefs) {
      if (!entriesByRef.has(ref)) {
        throw new TypeError(
          'Official Reading section contains a dangling explainability ref.',
        );
      }
    }

    const atomRefs: string[] = [];
    const addAtomRef = (ref: string | undefined): void => {
      if (ref === undefined || !entriesByRef.has(ref)) {
        throw new TypeError(
          'Official Reading visible atom is missing a valid explainability ref.',
        );
      }
      if (!atomRefs.includes(ref)) atomRefs.push(ref);
    };

    for (const block of section.blocks) {
      if (block.type === 'source_hint') {
        if (
          !entriesByRef.has(block.explainabilityRef) ||
          !sectionRefs.includes(block.explainabilityRef)
        ) {
          throw new TypeError(
            'Official Reading source hint is not bound to a visible atom in its section.',
          );
        }
      } else if (block.type === 'insights') {
        for (const item of block.items) addAtomRef(item.explainabilityRef);
      } else if (block.type === 'comparison') {
        for (const item of block.perspectives) addAtomRef(item.explainabilityRef);
      } else if (block.type === 'ambiguity') {
        for (const scenario of block.scenarios) {
          if (
            scenario.explainabilityRefs === undefined ||
            scenario.explainabilityRefs.length === 0
          ) {
            throw new TypeError(
              'Official Reading ambiguity scenario is missing explainability refs.',
            );
          }
          for (const ref of scenario.explainabilityRefs) addAtomRef(ref);
        }
      }
    }

    if (
      atomRefs.length > 0 &&
      (atomRefs.length !== sectionRefs.length ||
        atomRefs.some((ref, index) => ref !== sectionRefs[index]))
    ) {
      throw new TypeError(
        'Official Reading section explainability refs must equal its visible atom ref union.',
      );
    }
  }
}

function assertReportBinding(
  semantics: CanonicalReadingSemanticBundleV1,
  plan: OfficialReadingPlanV1,
  report: OfficialReadingRenderedContentV1,
): void {
  if (report.rendererVersion !== OFFICIAL_READING_RENDERER_VERSION) {
    throw new TypeError('Official Reading artifact received an unsupported renderer version.');
  }
  if (
    report.structuralRealizationPolicyVersion !==
    OFFICIAL_READING_STRUCTURAL_REALIZATION_POLICY_VERSION
  ) {
    throw new TypeError(
      'Official Reading artifact received an unsupported structural realization policy version.',
    );
  }
  if (
    report.ordinaryMultiClaimPresentationPolicyVersion !==
    OFFICIAL_READING_ORDINARY_MULTI_CLAIM_PRESENTATION_POLICY_VERSION
  ) {
    throw new TypeError(
      'Official Reading artifact received an unsupported ordinary multi-claim presentation policy version.',
    );
  }
  if (
    report.structuredInsightMaterializationPolicyVersion !==
    OFFICIAL_READING_STRUCTURED_INSIGHT_MATERIALIZATION_POLICY_VERSION
  ) {
    throw new TypeError(
      'Official Reading artifact received an unsupported structured insight materialization policy version.',
    );
  }
  const hasSourceHints = report.sections.some((section) =>
    section.blocks.some((block) => block.type === 'source_hint'),
  );
  if (
    report.sourceSummaryPresentationPolicyVersion !== undefined &&
    report.sourceSummaryPresentationPolicyVersion !==
      OFFICIAL_READING_SOURCE_SUMMARY_PRESENTATION_POLICY_VERSION
  ) {
    throw new TypeError(
      'Official Reading artifact received an unsupported source-summary presentation policy version.',
    );
  }
  if (
    hasSourceHints &&
    report.sourceSummaryPresentationPolicyVersion !==
      OFFICIAL_READING_SOURCE_SUMMARY_PRESENTATION_POLICY_VERSION
  ) {
    throw new TypeError(
      'Official Reading source hints require the governed source-summary presentation policy.',
    );
  }
  if (
    report.explainabilityBindingPolicyVersion !==
    OFFICIAL_READING_EXPLAINABILITY_BINDING_POLICY_VERSION ||
    report.explainabilityBindingPolicyVersion !==
    plan.explainabilityBindingPolicyVersion
  ) {
    throw new TypeError(
      'Official Reading artifact received an unsupported explainability binding policy version.',
    );
  }
  if (report.sourceSemanticHash !== semantics.semanticHash) {
    throw new TypeError('Official Reading artifact report semantic hash does not match canonical semantics.');
  }
  if (report.sourcePlanHash !== plan.planHash) {
    throw new TypeError('Official Reading artifact report plan hash does not match the Official Reading plan.');
  }
  assertOfficialExplainabilityBindings(semantics, report);

  const reportMaterial = {
    rendererVersion: report.rendererVersion,
    structuralRealizationPolicyVersion:
      report.structuralRealizationPolicyVersion,
    ordinaryMultiClaimPresentationPolicyVersion:
      report.ordinaryMultiClaimPresentationPolicyVersion,
    structuredInsightMaterializationPolicyVersion:
      report.structuredInsightMaterializationPolicyVersion,
    explainabilityBindingPolicyVersion:
      report.explainabilityBindingPolicyVersion,
    ...(report.sourceSummaryPresentationPolicyVersion === undefined
      ? {}
      : {
          sourceSummaryPresentationPolicyVersion:
            report.sourceSummaryPresentationPolicyVersion,
        }),
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
