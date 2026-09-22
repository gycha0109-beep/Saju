import type {
  CanonicalSajuSnapshot,
  FactState,
  PillarFact,
  ReadingArtifact,
  ReadingBlockView,
  ReadingDisclosureView,
  ReadingSectionView,
  ReadingStatus,
} from '../contracts/index.js';
import type { InterpretationExecutionResult } from '../interpretation/interpretation-engine.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import type { NarrativeGenerationResult } from '../llm/narrative-orchestrator.js';

export const READING_ARTIFACT_SCHEMA_VERSION = 'myeonghwa-reading-artifact-v1';

export interface ReadingArtifactAssemblyOptions {
  readingVersion: string;
  generatedAt?: Date;
  displayLabel?: string;
}

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

function displayDate(snapshot: CanonicalSajuSnapshot): string {
  const { year, month, day } = snapshot.input.date;
  return `${year}-${pad(month)}-${pad(day)}`;
}

function displayTime(snapshot: CanonicalSajuSnapshot): string | undefined {
  if (!snapshot.input.time.known) return undefined;
  return `${pad(snapshot.input.time.hour)}:${pad(snapshot.input.time.minute)}`;
}

function formatPillar(value: PillarFact): string {
  return `${value.stem.value}${value.branch.value} (${value.stem.hanja}${value.branch.hanja})`;
}

function pillarDisplayFact(
  label: string,
  state: FactState<PillarFact>,
): ReadingArtifact['calculationSummary']['pillars']['year'] {
  if (state.status === 'resolved') {
    return { label, value: formatPillar(state.value), status: 'resolved' };
  }
  if (state.status === 'ambiguous') {
    const values = [...new Set(state.candidates.map((candidate) => formatPillar(candidate.value)))];
    return {
      label,
      ...(values.length === 0 ? {} : { value: values.join(' / ') }),
      status: 'ambiguous',
    };
  }
  return { label, status: 'unavailable' };
}

function calculationState(
  snapshot: CanonicalSajuSnapshot,
): ReadingArtifact['subject']['calculationState'] {
  if (snapshot.completeness.fullyResolved) return 'resolved';
  if (snapshot.completeness.resolvedPaths.length > 0) return 'partially_ambiguous';
  return 'insufficient_input';
}

function ambiguityViews(snapshot: CanonicalSajuSnapshot) {
  return snapshot.completeness.ambiguousPaths.map((path) => ({
    ambiguityId: `ambiguity_${deterministicContentHash({ snapshotId: snapshot.snapshotId, path }).slice(0, 16)}`,
    title: '계산 불확실성',
    summary: '입력 정보 또는 계산 경계 때문에 이 항목은 하나의 값으로 확정되지 않았습니다.',
    affectedPaths: [path],
  }));
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
  const time = displayTime(snapshot);
  const ambiguity = ambiguityViews(snapshot);
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
    brand: { brandId: 'myeonghwa', displayName: '명화' },
    subject: {
      ...(options.displayLabel === undefined ? {} : { displayLabel: options.displayLabel }),
      birthInputDisplay: {
        calendarType: snapshot.input.calendarType,
        date: displayDate(snapshot),
        ...(time === undefined ? {} : { time }),
        timeKnown: snapshot.input.time.known,
        ...(snapshot.input.calendarType === 'lunar'
          ? { leapMonth: snapshot.input.isLeapMonth ?? false }
          : {}),
        ...(snapshot.input.birthplace?.label === undefined
          ? {}
          : { birthplaceLabel: snapshot.input.birthplace.label }),
      },
      calculationState: calculationState(snapshot),
    },
    calculationSummary: {
      pillars: {
        year: pillarDisplayFact('년주', snapshot.pillars.year),
        month: pillarDisplayFact('월주', snapshot.pillars.month),
        day: pillarDisplayFact('일주', snapshot.pillars.day),
        hour: pillarDisplayFact('시주', snapshot.pillars.hour),
      },
      ...(ambiguity.length === 0 ? {} : { ambiguity }),
    },
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
