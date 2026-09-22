import type {
  CanonicalSajuSnapshot,
  ReadingArtifact,
  ReadingBlockView,
  ReadingDisclosureView,
  ReadingSectionView,
  ReadingStatus,
} from '../contracts/index.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { NarrativeGenerationResult } from '../llm/narrative-orchestrator.js';
import { buildReadingArtifactShell } from './reading-artifact-shell.js';

export const READING_ARTIFACT_SCHEMA_VERSION = 'myeonghwa-reading-artifact-v1';

export interface ReadingArtifactAssemblyOptions {
  readingVersion: string;
  generatedAt?: Date;
  displayLabel?: string;
}

function readingStatus(
  snapshot: CanonicalSajuSnapshot,
  interpretation: InterpretationExecutionResult,
  narrative: NarrativeGenerationResult,
): ReadingStatus {
  if (interpretation.run.status === 'failed') return 'cannot_interpret';
  if (narrative.outcome === 'deterministic_fallback') return 'narrative_fallback';
  if (interpretation.run.status === 'partial') return 'partial';
  if (!snapshot.completeness.fullyResolved) return 'ready_with_ambiguity';
  return 'ready';
}

function disclosureId(
  sectionId: string,
  blockIndex: number,
  type: ReadingDisclosureView['type'],
  text: string,
): string {
  return `disclosure_${deterministicContentHash({ sectionId, blockIndex, type, text }).slice(0, 16)}`;
}

function methodologyLabel(id: string, version: string): string {
  return `${id}@${version}`;
}

function buildSectionsAndIndexes(
  narrative: NarrativeGenerationResult,
  interpretation: InterpretationExecutionResult,
): {
  sections: readonly ReadingSectionView[];
  disclosures: readonly ReadingDisclosureView[];
  explainability: ReadingArtifact['explainability'];
} {
  const claimIndex = new Map(interpretation.claims.map((claim) => [claim.claimId, claim]));
  const disclosures: ReadingDisclosureView[] = [];
  const explainabilityEntries = new Map<
    string,
    ReadingArtifact['explainability']['entries'][number]
  >();
  const sections: ReadingSectionView[] = [];

  for (const section of narrative.draft.sections) {
    const blocks: ReadingBlockView[] = [];
    const sectionDisclosureRefs = new Set<string>();
    const sectionExplainabilityRefs = new Set<string>();

    section.blocks.forEach((block, blockIndex) => {
      if (block.type === 'disclosure') {
        const id = disclosureId(section.sectionId, blockIndex, block.disclosureType, block.text);
        disclosures.push({ disclosureId: id, type: block.disclosureType, text: block.text });
        sectionDisclosureRefs.add(id);
        return;
      }

      if (block.type === 'comparison') {
        blocks.push({
          type: 'comparison',
          title: block.topic,
          perspectives: block.perspectives.map((perspective) => ({
            label: methodologyLabel(
              perspective.methodologyRef.id,
              perspective.methodologyRef.version,
            ),
            text: perspective.summary,
          })),
        });
        for (const perspective of block.perspectives) {
          const claims = perspective.claimRefs
            .map((claimId) => claimIndex.get(claimId))
            .filter((claim) => claim !== undefined);
          const explainabilityRef = `explain_${deterministicContentHash({
            sectionId: section.sectionId,
            blockIndex,
            claimIds: perspective.claimRefs,
            methodologyRef: perspective.methodologyRef,
          }).slice(0, 16)}`;
          explainabilityEntries.set(explainabilityRef, {
            explainabilityRef,
            claimIds: perspective.claimRefs,
            factRefs: [...new Set(claims.flatMap((claim) => claim.factRefs))].sort(),
            methodologyIds: [
              methodologyLabel(
                perspective.methodologyRef.id,
                perspective.methodologyRef.version,
              ),
            ],
            sourceIds: [...new Set(claims.flatMap((claim) => claim.sourceRefs))].sort(),
          });
          sectionExplainabilityRefs.add(explainabilityRef);
        }
        return;
      }

      if (block.type === 'assertion') {
        blocks.push({ type: 'paragraph', text: block.text });
        const claimIds = block.evidenceRefs
          .filter((ref) => ref.sourceType === 'claim')
          .map((ref) => ref.ref);
        const factRefs = block.evidenceRefs
          .filter((ref) => ref.sourceType === 'canonical_fact')
          .map((ref) => ref.ref);
        const claims = claimIds
          .map((claimId) => claimIndex.get(claimId))
          .filter((claim) => claim !== undefined);
        const methodologyIds = (block.methodologyRefs ?? []).map((ref) =>
          methodologyLabel(ref.id, ref.version),
        );
        const explainabilityRef = `explain_${deterministicContentHash({
          sectionId: section.sectionId,
          blockIndex,
          claimIds,
          factRefs,
          methodologyIds,
        }).slice(0, 16)}`;
        explainabilityEntries.set(explainabilityRef, {
          explainabilityRef,
          claimIds,
          factRefs: [...new Set([...factRefs, ...claims.flatMap((claim) => claim.factRefs)])].sort(),
          methodologyIds: [...new Set(methodologyIds)].sort(),
          sourceIds: [...new Set(claims.flatMap((claim) => claim.sourceRefs))].sort(),
        });
        sectionExplainabilityRefs.add(explainabilityRef);
        return;
      }

      blocks.push({ type: 'paragraph', text: block.text });
    });

    sections.push({
      sectionId: section.sectionId,
      sectionType: 'custom',
      title: section.title,
      blocks,
      state: blocks.length === 0 && sectionDisclosureRefs.size === 0 ? 'unavailable' : 'complete',
      ...(sectionDisclosureRefs.size === 0
        ? {}
        : { disclosureRefs: [...sectionDisclosureRefs].sort() }),
      ...(sectionExplainabilityRefs.size === 0
        ? {}
        : { explainabilityRefs: [...sectionExplainabilityRefs].sort() }),
    });
  }

  return {
    sections,
    disclosures: disclosures.sort((left, right) => left.disclosureId.localeCompare(right.disclosureId)),
    explainability: {
      entries: [...explainabilityEntries.values()].sort((left, right) =>
        left.explainabilityRef.localeCompare(right.explainabilityRef),
      ),
    },
  };
}

export function assembleReadingArtifact(
  snapshot: CanonicalSajuSnapshot,
  interpretation: InterpretationExecutionResult,
  narrative: NarrativeGenerationResult,
  options: ReadingArtifactAssemblyOptions,
): ReadingArtifact {
  if (options.readingVersion.trim().length === 0) {
    throw new TypeError('readingVersion must be a non-empty string.');
  }
  if (interpretation.run.snapshotId !== snapshot.snapshotId) {
    throw new Error('ReadingArtifact inputs do not share the same CanonicalSajuSnapshot.');
  }
  if (narrative.run.interpretationRunId !== interpretation.run.interpretationRunId) {
    throw new Error('ReadingArtifact narrative does not belong to the supplied InterpretationRun.');
  }

  const generatedAt = options.generatedAt ?? new Date();
  const content = buildSectionsAndIndexes(narrative, interpretation);
  const shell = buildReadingArtifactShell(snapshot, {
    ...(options.displayLabel === undefined ? {} : { displayLabel: options.displayLabel }),
  });
  const identityMaterial = {
    schemaVersion: READING_ARTIFACT_SCHEMA_VERSION,
    readingVersion: options.readingVersion,
    snapshotId: snapshot.snapshotId,
    interpretationRunId: interpretation.run.interpretationRunId,
    narrativeRunId: narrative.run.narrativeRunId,
    sections: content.sections,
    disclosures: content.disclosures,
    explainability: content.explainability,
  };
  const readingId = `reading_${deterministicContentHash(identityMaterial).slice(0, 24)}`;

  return {
    readingId,
    schemaVersion: READING_ARTIFACT_SCHEMA_VERSION,
    status: readingStatus(snapshot, interpretation, narrative),
    ...shell,
    sections: content.sections,
    disclosures: content.disclosures,
    explainability: content.explainability,
    provenance: {
      snapshotId: snapshot.snapshotId,
      interpretationRunId: interpretation.run.interpretationRunId,
      narrativeRunId: narrative.run.narrativeRunId,
      readingVersion: options.readingVersion,
    },
    generatedAt: generatedAt.toISOString(),
  };
}
