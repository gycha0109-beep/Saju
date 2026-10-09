import { randomUUID } from 'node:crypto';
import {
  createMyeonghwaProductHost,
  type MyeonghwaProductHost,
} from '../host/product-host.js';
import {
  calculateAuthorizedMyeonghwaProductionSnapshot,
} from './production-calculation-runtime.js';
import type {
  GovernedReadingExecutionOptions,
} from '../reading/governed-reading-execution.js';
import {
  resolveProductionSpouseOfficialReadingDeliveryAuthorityV1,
} from './production-spouse-official-reading-delivery-authority.js';
import {
  assertProductionSpouseOfficialReadingRequestV1,
} from './production-spouse-official-reading-scope.js';

export const PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_RUNTIME_VERSION =
  'myeonghwa-production-spouse-official-reading-delivery-runtime-v1' as const;

export const PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_OUTPUT_SCHEMA_VERSION =
  'myeonghwa-narrative-draft-v1' as const;

export function createProductionSpouseOfficialReadingDeliveryExecutionOptionsV1(
  now: Date,
): GovernedReadingExecutionOptions {
  if (!(now instanceof Date) || Number.isNaN(now.getTime())) {
    throw new TypeError(
      'Production spouse Official Reading delivery requires a valid clock.',
    );
  }
  return {
    outputSchemaVersion:
      PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_OUTPUT_SCHEMA_VERSION,
    readingVersion:
      PRODUCTION_SPOUSE_OFFICIAL_READING_DELIVERY_RUNTIME_VERSION,
    narrativeNow: now,
    artifactGeneratedAt: now,
    consumerReadingAuthorityResolver:
      resolveProductionSpouseOfficialReadingDeliveryAuthorityV1,
    officialReadingSemanticProjectionResolver: async (input) =>
      import(
        './production-spouse-official-reading-delivery-semantic-projection.js'
      ).then((module) =>
        module.buildProductionSpouseOfficialReadingDeliverySemanticProjectionV1(
          input,
        ),
      ),
  };
}

async function createSpousePositionOnlyProductionProductHost(
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
      createProductionSpouseOfficialReadingDeliveryExecutionOptionsV1(now),
    requestIdFactory: () => `production_spouse_${randomUUID()}`,
  });
}

export function createBoundedProductionSpouseOfficialReadingHostV1(
  now: Date = new Date(),
): MyeonghwaProductHost {
  let spouseHostPromise: Promise<MyeonghwaProductHost> | undefined;

  function spouseHost(): Promise<MyeonghwaProductHost> {
    spouseHostPromise ??= createSpousePositionOnlyProductionProductHost(now);
    return spouseHostPromise;
  }

  return {
    async requestReading(body: unknown) {
      assertProductionSpouseOfficialReadingRequestV1(
        body,
        'production_spouse_delivery_scope_guard',
      );
      return (await spouseHost()).requestReading(body);
    },
  };
}
