import { randomUUID } from 'node:crypto';
import {
  createMyeonghwaProductHost,
  parseProductHostReadingRequest,
  ProductHostRequestError,
  type MyeonghwaProductHost,
} from '../host/product-host.js';
import {
  calculateAuthorizedMyeonghwaProductionSnapshot,
} from './production-calculation-runtime.js';
import {
  normalizeConsumerReadingRequest,
} from '../reading/consumer-reading-request-adapter.js';
import type {
  GovernedReadingExecutionOptions,
} from '../reading/governed-reading-execution.js';
import {
  readingSectionForIntentV1,
} from '../reading/consumer-reading-authority.js';
import {
  PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY,
  resolveProductionSpouseOfficialReadingCandidateAuthorityV1,
} from './production-spouse-official-reading-candidate-authority.js';
import {
  buildProductionSpouseOfficialReadingSemanticProjectionV1,
} from './production-spouse-official-reading-semantic-projection.js';

export const PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_RUNTIME_VERSION =
  'myeonghwa-production-spouse-official-reading-candidate-runtime-v1' as const;

export const PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_OUTPUT_SCHEMA_VERSION =
  'myeonghwa-narrative-draft-v1' as const;

export function createProductionSpouseOfficialReadingCandidateExecutionOptionsV1(
  now: Date,
): GovernedReadingExecutionOptions {
  if (!(now instanceof Date) || Number.isNaN(now.getTime())) {
    throw new TypeError(
      'Production spouse Official Reading candidate requires a valid clock.',
    );
  }
  return {
    outputSchemaVersion:
      PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_OUTPUT_SCHEMA_VERSION,
    readingVersion:
      PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_RUNTIME_VERSION,
    narrativeNow: now,
    artifactGeneratedAt: now,
    consumerReadingAuthorityResolver:
      resolveProductionSpouseOfficialReadingCandidateAuthorityV1,
    officialReadingSemanticProjectionResolver:
      buildProductionSpouseOfficialReadingSemanticProjectionV1,
  };
}

export function assertProductionSpouseOfficialReadingCandidateRequestV1(
  body: unknown,
): void {
  const parsed = parseProductHostReadingRequest(body);
  if (parsed.reading.targetPersonRef !== undefined) {
    throw new ProductHostRequestError(
      'INVALID_READING_REQUEST',
      'The bounded spouse Production candidate does not accept targetPersonRef.',
    );
  }

  const normalized = normalizeConsumerReadingRequest({
    requestId: 'production_spouse_candidate_scope_guard',
    text: parsed.reading.text,
  });
  const intent = normalized.request?.intent;
  const readingSection =
    normalized.state === 'resolved' && intent !== undefined
      ? readingSectionForIntentV1(intent)
      : undefined;

  if (
    readingSection !== 'relationship:natal:spouse' ||
    !PRODUCTION_SPOUSE_OFFICIAL_READING_CANDIDATE_AUTHORITY
      .allowedReadingSections.includes('relationship:natal:spouse')
  ) {
    throw new ProductHostRequestError(
      'INVALID_READING_REQUEST',
      'The bounded Production candidate only accepts relationship:natal:spouse.',
    );
  }
}

async function createSpousePositionOnlyProductionCandidateProductHost(
  now: Date,
): Promise<MyeonghwaProductHost> {
  const materializationModule = await import(
    '../research/relationship-spouse-t8-day-branch-palace-project-governed-narrative-materialization.js'
  );

  return createMyeonghwaProductHost({
    calculate(input) {
      return calculateAuthorizedMyeonghwaProductionSnapshot(input).snapshot;
    },
    async interpret(snapshot, context) {
      const interpretation =
        await materializationModule.runRelationshipSpouseT8DayBranchPalaceNarrativeMaterializedShadowExecution(
          snapshot,
          {
            requestId: context.requestId,
            now: new Date(context.requestedAt),
          },
        );
      return {
        registry:
          materializationModule.RELATIONSHIP_SPOUSE_T8_DAY_BRANCH_PALACE_NARRATIVE_MATERIALIZED_REGISTRY,
        interpretation,
      };
    },
    readingOptions:
      createProductionSpouseOfficialReadingCandidateExecutionOptionsV1(now),
    requestIdFactory: () =>
      `production_spouse_candidate_${randomUUID()}`,
  });
}

export function createBoundedProductionSpouseOfficialReadingCandidateHostV1(
  now: Date = new Date(),
): MyeonghwaProductHost {
  let spouseHostPromise: Promise<MyeonghwaProductHost> | undefined;

  function spouseHost(): Promise<MyeonghwaProductHost> {
    spouseHostPromise ??=
      createSpousePositionOnlyProductionCandidateProductHost(now);
    return spouseHostPromise;
  }

  return {
    async requestReading(body: unknown) {
      assertProductionSpouseOfficialReadingCandidateRequestV1(body);
      return (await spouseHost()).requestReading(body);
    },
  };
}
