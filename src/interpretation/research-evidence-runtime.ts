import type { CanonicalSajuSnapshot } from '../contracts/calculation.js';
import type { VersionedRef } from '../contracts/common.js';
import {
  researchEvidenceDefinitionContentHash,
  type ResearchEvidenceDefinition,
  type ResearchEvidenceEnvelope,
  type ResearchEvidenceValidationResult,
} from './research-evidence.js';
import { deterministicContentHash } from './rule-registry.js';

export interface ResearchEvidenceRuntimeAdapter {
  definition: ResearchEvidenceDefinition;
  validate: (
    envelope: ResearchEvidenceEnvelope,
    snapshot: CanonicalSajuSnapshot,
  ) => ResearchEvidenceValidationResult;
}

export interface RegisteredResearchEvidenceRuntimeAdapter {
  definitionRef: VersionedRef;
  definitionContentHash: string;
  evidenceType: string;
  evidenceVersion: string;
  producerRef: VersionedRef;
  payloadContractRef: VersionedRef;
  sourceIds: readonly string[];
}

export interface ValidatedResearchEvidence {
  envelope: ResearchEvidenceEnvelope;
  definition: ResearchEvidenceDefinition;
  definitionContentHash: string;
}

export type ResearchEvidenceRuntimeValidation =
  | {
      status: 'validated';
      value: ValidatedResearchEvidence;
    }
  | {
      status: 'rejected';
      errors: readonly string[];
    };

export interface ResearchEvidenceRuntimeRegistry {
  registryId: string;
  adapters: readonly RegisteredResearchEvidenceRuntimeAdapter[];
  validate(
    envelope: ResearchEvidenceEnvelope,
    snapshot: CanonicalSajuSnapshot,
  ): ResearchEvidenceRuntimeValidation;
}

function definitionKey(ref: VersionedRef): string {
  return `${ref.id}@${ref.version}`;
}

function evidenceKey(evidenceType: string, evidenceVersion: string): string {
  return `${evidenceType}@${evidenceVersion}`;
}

function registeredMetadata(
  adapter: ResearchEvidenceRuntimeAdapter,
): RegisteredResearchEvidenceRuntimeAdapter {
  return {
    definitionRef: {
      id: adapter.definition.definitionId,
      version: adapter.definition.version,
    },
    definitionContentHash: researchEvidenceDefinitionContentHash(adapter.definition),
    evidenceType: adapter.definition.evidenceType,
    evidenceVersion: adapter.definition.evidenceVersion,
    producerRef: adapter.definition.producerRef,
    payloadContractRef: adapter.definition.payloadContractRef,
    sourceIds: [...adapter.definition.sourceIds].sort(),
  };
}

function validateAdapterSet(adapters: readonly ResearchEvidenceRuntimeAdapter[]): void {
  const definitionRefs = new Set<string>();
  const evidenceTypes = new Set<string>();

  for (const adapter of adapters) {
    if (adapter.definition.authority !== 'research_only') {
      throw new Error(
        `Research evidence runtime adapter ${adapter.definition.definitionId} must remain research_only.`,
      );
    }
    if (adapter.definition.snapshotBinding !== 'snapshot_id_and_hash') {
      throw new Error(
        `Research evidence runtime adapter ${adapter.definition.definitionId} must bind snapshot_id_and_hash.`,
      );
    }

    const refKey = definitionKey({
      id: adapter.definition.definitionId,
      version: adapter.definition.version,
    });
    if (definitionRefs.has(refKey)) {
      throw new Error(`Duplicate research evidence definition ref: ${refKey}`);
    }
    definitionRefs.add(refKey);

    const typeKey = evidenceKey(
      adapter.definition.evidenceType,
      adapter.definition.evidenceVersion,
    );
    if (evidenceTypes.has(typeKey)) {
      throw new Error(`Duplicate research evidence type/version: ${typeKey}`);
    }
    evidenceTypes.add(typeKey);
  }
}

export function createResearchEvidenceRuntimeRegistry(
  adapters: readonly ResearchEvidenceRuntimeAdapter[],
): ResearchEvidenceRuntimeRegistry {
  validateAdapterSet(adapters);

  const sortedAdapters = [...adapters].sort((left, right) => {
    const leftKey = definitionKey({
      id: left.definition.definitionId,
      version: left.definition.version,
    });
    const rightKey = definitionKey({
      id: right.definition.definitionId,
      version: right.definition.version,
    });
    return leftKey.localeCompare(rightKey);
  });
  const metadata = sortedAdapters.map(registeredMetadata);
  const registryId = `research_evidence_runtime_${deterministicContentHash(metadata).slice(0, 24)}`;
  const byDefinitionRef = new Map(
    sortedAdapters.map((adapter) => [
      definitionKey({
        id: adapter.definition.definitionId,
        version: adapter.definition.version,
      }),
      adapter,
    ]),
  );

  return {
    registryId,
    adapters: metadata,
    validate(envelope, snapshot) {
      const refKey = definitionKey(envelope.definitionRef);
      const adapter = byDefinitionRef.get(refKey);
      if (adapter === undefined) {
        return {
          status: 'rejected',
          errors: [`unregistered_research_evidence_definition:${refKey}`],
        };
      }

      const expectedDefinitionHash = researchEvidenceDefinitionContentHash(adapter.definition);
      if (envelope.definitionContentHash !== expectedDefinitionHash) {
        return {
          status: 'rejected',
          errors: ['registered_definition_content_hash_mismatch'],
        };
      }
      if (
        envelope.evidenceType !== adapter.definition.evidenceType ||
        envelope.evidenceVersion !== adapter.definition.evidenceVersion
      ) {
        return {
          status: 'rejected',
          errors: [
            `registered_evidence_type_version_mismatch:${envelope.evidenceType}@${envelope.evidenceVersion}`,
          ],
        };
      }

      const validation = adapter.validate(envelope, snapshot);
      if (!validation.valid) {
        return { status: 'rejected', errors: validation.errors };
      }

      return {
        status: 'validated',
        value: {
          envelope,
          definition: adapter.definition,
          definitionContentHash: expectedDefinitionHash,
        },
      };
    },
  };
}
