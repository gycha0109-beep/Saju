import type {
  NarrativeBlock,
  NarrativeDraft,
  NarrativeEpistemicType,
} from '../contracts/narrative.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';

export const BENCHMARK_A_DEFAULT_MINIMUM_CASES = 500 as const;
export const BENCHMARK_A_DEFAULT_SIMILARITY_CANDIDATE_LIMIT = 20 as const;

export type BenchmarkAFailureCode =
  | 'INSUFFICIENT_SYNTHETIC_CASES'
  | 'CROSS_SEMANTIC_EXACT_NARRATIVE_CLONE_PRESENT'
  | 'FALSE_DIVERSITY_PRESENT';

export interface BenchmarkAVisibleAssertion {
  type: 'assertion';
  text: string;
  epistemicType: NarrativeEpistemicType;
}

export interface BenchmarkAVisibleComparison {
  type: 'comparison';
  topic: string;
  perspectives: readonly string[];
  synthesis?: string;
}

export interface BenchmarkAVisibleDisclosure {
  type: 'disclosure';
  disclosureType: Extract<NarrativeBlock, { type: 'disclosure' }>['disclosureType'];
  text: string;
}

export interface BenchmarkAVisibleTransition {
  type: 'transition';
  text: string;
}

export type BenchmarkAVisibleBlock =
  | BenchmarkAVisibleAssertion
  | BenchmarkAVisibleComparison
  | BenchmarkAVisibleDisclosure
  | BenchmarkAVisibleTransition;

export interface BenchmarkAVisibleSection {
  title: string;
  blocks: readonly BenchmarkAVisibleBlock[];
}

export interface BenchmarkAFinalNarrativeSignature {
  signature: string;
  material: readonly BenchmarkAVisibleSection[];
  sectionSignatures: readonly string[];
  similarityText: string;
}

export interface BenchmarkAObservation {
  caseId: string;
  calculationHash: string;
  consumedInputFingerprint: string;
  interpretationSignature: string;
  narrativePolicyKey: string;
  finalNarrativeSignature: string;
  sectionNarrativeSignatures: readonly string[];
  narrativeSimilarityText: string;
}

export interface BenchmarkAExactFullReadingCloneGroup {
  finalNarrativeSignature: string;
  caseIds: readonly string[];
  interpretationSignatures: readonly string[];
}

export interface BenchmarkAExactSectionCloneGroup {
  sectionNarrativeSignature: string;
  occurrences: readonly {
    caseId: string;
    sectionIndex: number;
  }[];
}

export interface BenchmarkAFalseDiversityGroup {
  interpretationSignature: string;
  narrativePolicyKey: string;
  caseIds: readonly string[];
  finalNarrativeSignatures: readonly string[];
}

export interface BenchmarkAHighSimilarityCandidatePair {
  leftCaseId: string;
  rightCaseId: string;
  leftInterpretationSignature: string;
  rightInterpretationSignature: string;
  similarity: number;
  basis: 'normalized_character_bigram_dice';
  classification: 'candidate_only_no_threshold';
}

export interface BenchmarkAReport {
  minimumCases: number;
  observationCount: number;
  distinctCalculationHashes: number;
  distinctConsumedInputFingerprints: number;
  distinctInterpretationSignatures: number;
  distinctFinalNarrativeSignatures: number;
  exactFullReadingCloneGroupCount: number;
  exactSectionCloneGroupCount: number;
  crossSemanticExactFullReadingCloneGroupCount: number;
  falseDiversityGroupCount: number;
  exactFullReadingCloneGroups: readonly BenchmarkAExactFullReadingCloneGroup[];
  exactSectionCloneGroups: readonly BenchmarkAExactSectionCloneGroup[];
  crossSemanticExactFullReadingCloneGroups: readonly BenchmarkAExactFullReadingCloneGroup[];
  falseDiversityGroups: readonly BenchmarkAFalseDiversityGroup[];
  highSimilarityCandidates: readonly BenchmarkAHighSimilarityCandidatePair[];
  highSimilarityPolicy: {
    gate: 'observational_only';
    threshold: 'not_defined_by_authority';
    candidateSelection: 'top_non_exact_pairs_by_normalized_character_bigram_dice';
  };
  passed: boolean;
  failures: readonly BenchmarkAFailureCode[];
}

function visibleBlock(block: NarrativeBlock): BenchmarkAVisibleBlock {
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

function visibleBlockText(block: BenchmarkAVisibleBlock): readonly string[] {
  switch (block.type) {
    case 'assertion':
      return [block.text];
    case 'comparison':
      return [
        block.topic,
        ...block.perspectives,
        ...(block.synthesis === undefined ? [] : [block.synthesis]),
      ];
    case 'disclosure':
    case 'transition':
      return [block.text];
  }
}

export function deriveBenchmarkAFinalNarrativeSignature(
  draft: NarrativeDraft,
): BenchmarkAFinalNarrativeSignature {
  const material: readonly BenchmarkAVisibleSection[] = draft.sections.map((section) => ({
    title: section.title,
    blocks: section.blocks.map(visibleBlock),
  }));
  const sectionSignatures = material.map(
    (section) => `section_narrative_signature_${deterministicContentHash(section)}`,
  );
  const similarityText = material
    .flatMap((section) => [
      section.title,
      ...section.blocks.flatMap((block) => visibleBlockText(block)),
    ])
    .join('\n');

  return {
    signature: `final_narrative_signature_${deterministicContentHash(material)}`,
    material,
    sectionSignatures,
    similarityText,
  };
}

function exactFullReadingCloneGroups(
  observations: readonly BenchmarkAObservation[],
): readonly BenchmarkAExactFullReadingCloneGroup[] {
  const grouped = new Map<string, BenchmarkAObservation[]>();
  for (const observation of observations) {
    const group = grouped.get(observation.finalNarrativeSignature) ?? [];
    group.push(observation);
    grouped.set(observation.finalNarrativeSignature, group);
  }

  return [...grouped.entries()]
    .filter(([, group]) => group.length > 1)
    .map(([finalNarrativeSignature, group]) => ({
      finalNarrativeSignature,
      caseIds: group.map((observation) => observation.caseId).sort(),
      interpretationSignatures: [
        ...new Set(group.map((observation) => observation.interpretationSignature)),
      ].sort(),
    }))
    .sort((left, right) => left.finalNarrativeSignature.localeCompare(right.finalNarrativeSignature));
}

function exactSectionCloneGroups(
  observations: readonly BenchmarkAObservation[],
): readonly BenchmarkAExactSectionCloneGroup[] {
  const grouped = new Map<
    string,
    Array<{
      caseId: string;
      sectionIndex: number;
    }>
  >();

  for (const observation of observations) {
    observation.sectionNarrativeSignatures.forEach((sectionNarrativeSignature, sectionIndex) => {
      const group = grouped.get(sectionNarrativeSignature) ?? [];
      group.push({ caseId: observation.caseId, sectionIndex });
      grouped.set(sectionNarrativeSignature, group);
    });
  }

  return [...grouped.entries()]
    .filter(([, occurrences]) => new Set(occurrences.map((occurrence) => occurrence.caseId)).size > 1)
    .map(([sectionNarrativeSignature, occurrences]) => ({
      sectionNarrativeSignature,
      occurrences: [...occurrences].sort((left, right) =>
        left.caseId === right.caseId
          ? left.sectionIndex - right.sectionIndex
          : left.caseId.localeCompare(right.caseId),
      ),
    }))
    .sort((left, right) =>
      left.sectionNarrativeSignature.localeCompare(right.sectionNarrativeSignature),
    );
}

function falseDiversityGroups(
  observations: readonly BenchmarkAObservation[],
): readonly BenchmarkAFalseDiversityGroup[] {
  const grouped = new Map<string, BenchmarkAObservation[]>();
  for (const observation of observations) {
    const key = `${observation.interpretationSignature}\u0000${observation.narrativePolicyKey}`;
    const group = grouped.get(key) ?? [];
    group.push(observation);
    grouped.set(key, group);
  }

  return [...grouped.values()]
    .filter(
      (group) => new Set(group.map((observation) => observation.finalNarrativeSignature)).size > 1,
    )
    .map((group) => ({
      interpretationSignature: group[0]?.interpretationSignature ?? '',
      narrativePolicyKey: group[0]?.narrativePolicyKey ?? '',
      caseIds: group.map((observation) => observation.caseId).sort(),
      finalNarrativeSignatures: [
        ...new Set(group.map((observation) => observation.finalNarrativeSignature)),
      ].sort(),
    }))
    .sort((left, right) =>
      left.interpretationSignature === right.interpretationSignature
        ? left.narrativePolicyKey.localeCompare(right.narrativePolicyKey)
        : left.interpretationSignature.localeCompare(right.interpretationSignature),
    );
}

function normalizedText(value: string): string {
  return value.normalize('NFKC').replace(/\s+/g, ' ').trim();
}

function bigramMultiset(value: string): ReadonlyMap<string, number> {
  const characters = Array.from(normalizedText(value));
  if (characters.length === 0) return new Map();
  if (characters.length === 1) return new Map([[characters[0] ?? '', 1]]);

  const counts = new Map<string, number>();
  for (let index = 0; index < characters.length - 1; index += 1) {
    const gram = `${characters[index] ?? ''}${characters[index + 1] ?? ''}`;
    counts.set(gram, (counts.get(gram) ?? 0) + 1);
  }
  return counts;
}

function multisetSize(values: ReadonlyMap<string, number>): number {
  return [...values.values()].reduce((total, count) => total + count, 0);
}

function bigramDice(
  left: ReadonlyMap<string, number>,
  right: ReadonlyMap<string, number>,
): number {
  const leftSize = multisetSize(left);
  const rightSize = multisetSize(right);
  if (leftSize === 0 && rightSize === 0) return 1;
  if (leftSize === 0 || rightSize === 0) return 0;

  let intersection = 0;
  for (const [gram, leftCount] of left.entries()) {
    const rightCount = right.get(gram);
    if (rightCount !== undefined) intersection += Math.min(leftCount, rightCount);
  }
  return (2 * intersection) / (leftSize + rightSize);
}

function similarityPairOrder(
  left: BenchmarkAHighSimilarityCandidatePair,
  right: BenchmarkAHighSimilarityCandidatePair,
): number {
  if (left.similarity !== right.similarity) return right.similarity - left.similarity;
  if (left.leftCaseId !== right.leftCaseId) return left.leftCaseId.localeCompare(right.leftCaseId);
  return left.rightCaseId.localeCompare(right.rightCaseId);
}

function highSimilarityCandidates(
  observations: readonly BenchmarkAObservation[],
  limit: number,
): readonly BenchmarkAHighSimilarityCandidatePair[] {
  if (limit === 0) return [];
  const gramSets = observations.map((observation) => bigramMultiset(observation.narrativeSimilarityText));
  const candidates: BenchmarkAHighSimilarityCandidatePair[] = [];

  for (let leftIndex = 0; leftIndex < observations.length; leftIndex += 1) {
    const left = observations[leftIndex];
    const leftGrams = gramSets[leftIndex];
    if (left === undefined || leftGrams === undefined) continue;

    for (let rightIndex = leftIndex + 1; rightIndex < observations.length; rightIndex += 1) {
      const right = observations[rightIndex];
      const rightGrams = gramSets[rightIndex];
      if (right === undefined || rightGrams === undefined) continue;
      if (left.finalNarrativeSignature === right.finalNarrativeSignature) continue;

      candidates.push({
        leftCaseId: left.caseId,
        rightCaseId: right.caseId,
        leftInterpretationSignature: left.interpretationSignature,
        rightInterpretationSignature: right.interpretationSignature,
        similarity: bigramDice(leftGrams, rightGrams),
        basis: 'normalized_character_bigram_dice',
        classification: 'candidate_only_no_threshold',
      });
      candidates.sort(similarityPairOrder);
      if (candidates.length > limit) candidates.pop();
    }
  }

  return candidates;
}

export function auditBenchmarkANaturalSyntheticCorpus(
  observations: readonly BenchmarkAObservation[],
  minimumCases: number = BENCHMARK_A_DEFAULT_MINIMUM_CASES,
  similarityCandidateLimit: number = BENCHMARK_A_DEFAULT_SIMILARITY_CANDIDATE_LIMIT,
): BenchmarkAReport {
  if (!Number.isInteger(minimumCases) || minimumCases <= 0) {
    throw new RangeError('minimumCases must be a positive integer.');
  }
  if (!Number.isInteger(similarityCandidateLimit) || similarityCandidateLimit < 0) {
    throw new RangeError('similarityCandidateLimit must be a non-negative integer.');
  }

  const exactFullReadingCloneGroupsResult = exactFullReadingCloneGroups(observations);
  const exactSectionCloneGroupsResult = exactSectionCloneGroups(observations);
  const crossSemanticExactFullReadingCloneGroups = exactFullReadingCloneGroupsResult.filter(
    (group) => group.interpretationSignatures.length > 1,
  );
  const falseDiversityGroupsResult = falseDiversityGroups(observations);
  const failures: BenchmarkAFailureCode[] = [];

  if (observations.length < minimumCases) failures.push('INSUFFICIENT_SYNTHETIC_CASES');
  if (crossSemanticExactFullReadingCloneGroups.length > 0) {
    failures.push('CROSS_SEMANTIC_EXACT_NARRATIVE_CLONE_PRESENT');
  }
  if (falseDiversityGroupsResult.length > 0) failures.push('FALSE_DIVERSITY_PRESENT');

  return {
    minimumCases,
    observationCount: observations.length,
    distinctCalculationHashes: new Set(observations.map((value) => value.calculationHash)).size,
    distinctConsumedInputFingerprints: new Set(
      observations.map((value) => value.consumedInputFingerprint),
    ).size,
    distinctInterpretationSignatures: new Set(
      observations.map((value) => value.interpretationSignature),
    ).size,
    distinctFinalNarrativeSignatures: new Set(
      observations.map((value) => value.finalNarrativeSignature),
    ).size,
    exactFullReadingCloneGroupCount: exactFullReadingCloneGroupsResult.length,
    exactSectionCloneGroupCount: exactSectionCloneGroupsResult.length,
    crossSemanticExactFullReadingCloneGroupCount:
      crossSemanticExactFullReadingCloneGroups.length,
    falseDiversityGroupCount: falseDiversityGroupsResult.length,
    exactFullReadingCloneGroups: exactFullReadingCloneGroupsResult,
    exactSectionCloneGroups: exactSectionCloneGroupsResult,
    crossSemanticExactFullReadingCloneGroups,
    falseDiversityGroups: falseDiversityGroupsResult,
    highSimilarityCandidates: highSimilarityCandidates(observations, similarityCandidateLimit),
    highSimilarityPolicy: {
      gate: 'observational_only',
      threshold: 'not_defined_by_authority',
      candidateSelection: 'top_non_exact_pairs_by_normalized_character_bigram_dice',
    },
    passed: failures.length === 0,
    failures,
  };
}
