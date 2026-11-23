import { randomUUID, sign, type KeyObject } from 'node:crypto';
import {
  createMyeonghwaProductionReadingIssueHost,
  parseProductHostReadingRequest,
} from '../host/product-host.js';
import { deterministicContentHash } from '../interpretation/rule-registry.js';
import { runInterpretation } from '../interpretation/interpretation-engine.js';
import { readingSectionForIntentV1 } from '../reading/consumer-reading-authority.js';
import { admitProductReadingResponse } from '../reading/product-reading-response-admission.js';
import { RELATIONSHIP_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1 } from
  '../reading/official-reading-detailed-presentation-relationship.js';
import {
  createRelationshipNatalReadingCandidateRegistry,
  RELATIONSHIP_NATAL_READING_RULES,
} from '../research/relationship-natal-reading-candidate.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from './production-calculation-runtime.js';

export const PRODUCTION_READING_RELEASE_HEADER = 'x-myeongha-reading-release';
export const PRODUCTION_READING_ISSUE_PROOF_HEADER = 'x-myeonghwa-production-issue-proof';
export const PRODUCTION_READER_SOURCE_HEADER = 'x-myeongha-reader-source';
export const PRODUCTION_READER_SOURCE_VERSION = 'canonical-v1';
const SECTION = 'relationship:natal:general';
const READING_VERSION = 'myeonghwa-production-relationship-general-reading-v1';
const POLICY = 'myeongha-internal-commercial-saju-interpretation-2026-11-13';
const PROOF_VERSION = 'myeonghwa-production-reading-issue-proof-v1';
const SIGNATURE_DOMAIN = 'myeongha/saju/production-reading-issue/v1\0';
const TOKEN = /^[A-Za-z0-9][A-Za-z0-9._:/-]{0,127}$/u;

const registry = createRelationshipNatalReadingCandidateRegistry();
const profiles = RELATIONSHIP_NATAL_APPROVED_DETAILED_SOURCE_PROFILES_V1;
const approved = new Map(profiles.map(profile => [profile.claimType, profile]));
const rules = new Map(RELATIONSHIP_NATAL_READING_RULES.map(rule => [rule.output.claimType, rule]));

/** The pinned identity of the bounded interpretation and its approved wording. */
export const PRODUCTION_RELATIONSHIP_AUTHORITY_HASH = deterministicContentHash({
  policy: POLICY,
  readingVersion: READING_VERSION,
  registry: registry.snapshot,
  profiles,
});

export interface ProductionRelationshipIssuerOptions {
  issuer: string;
  audience: string;
  keyId: string;
  engineVersion: string;
  releaseRef: string;
  signingKey: KeyObject;
}

export function createProductionRelationshipIssuer(options: ProductionRelationshipIssuerOptions) {
  const { issuer, audience, keyId, engineVersion, releaseRef, signingKey } = options;
  if (
    signingKey.type !== 'private' || signingKey.asymmetricKeyType !== 'ed25519' ||
    ![issuer, audience, keyId, engineVersion, releaseRef].every(value => TOKEN.test(value))
  ) {
    throw new TypeError('Invalid Production relationship issuer configuration.');
  }
  const host = createMyeonghwaProductionReadingIssueHost({
    calculate(input, context) {
      return calculateAuthorizedMyeonghwaProductionSnapshot(input, {
        now: new Date(context.requestedAt),
      }).snapshot;
    },
    interpret(snapshot, context) {
      return {
        registry,
        interpretation: runInterpretation(snapshot, registry, {
          requestId: context.requestId,
          now: new Date(context.requestedAt),
        }),
      };
    },
    readingOptions: {
      outputSchemaVersion: 'myeonghwa-narrative-draft-v1',
      readingVersion: READING_VERSION,
      consumerReadingAuthorityResolver(intent) {
        const readingSection = readingSectionForIntentV1(intent);
        if (readingSection !== SECTION) throw new TypeError('Production relationship intent changed.');
        return {
          authorityVersion: POLICY,
          readingSection,
          authority: 'official_reading',
          supportedOfficialReadingSection: SECTION,
          constraints: {
            mayPromoteProductionInterpretationAuthority: false,
            mayGrantPersistenceAuthority: false,
            mayGrantPublicGeneralAvailabilityAuthority: false,
            mayTreatUnsupportedSectionAsOfficialReading: false,
          },
        };
      },
      officialReadingSemanticProjectionResolver({ evidence, targetClaimIds }) {
        const claims = new Map(evidence.claims.map(claim => [claim.claimId, claim]));
        for (const claimId of targetClaimIds) {
          const claim = claims.get(claimId);
          const profile = claim && approved.get(claim.claimType);
          const rule = claim && rules.get(claim.claimType);
          if (!claim || !profile || !rule ||
              claim.taxonomy.tier !== 'T8' || claim.taxonomy.category !== 'relationship' ||
              claim.taxonomy.subcategory !== 'general' || claim.methodologyRef.id !== profile.methodologyRef.id ||
              claim.methodologyRef.version !== profile.methodologyRef.version ||
              !claim.ruleRefs.some(ref => ref.ruleId === rule.ruleId && ref.version === rule.version)) {
            throw new TypeError('Relationship claim is outside the approved source profiles.');
          }
          const supportingTypes = [...new Set(claim.upstreamClaimRefs.map(ref => {
            const support = claims.get(ref);
            if (support?.snapshotId !== evidence.snapshotId || support.factRefs.length === 0 ||
                support.predicate !== 'ten_god_family_presence') {
              throw new TypeError('Relationship Ten-God evidence is missing.');
            }
            return support.claimType;
          }))].sort();
          const value = claim.value as Record<string, unknown>;
          if (supportingTypes.join() !== profile.supportingClaimTypes.join() ||
              value.headline !== profile.standardText.headline ||
              value.summary !== profile.standardText.summary ||
              profile.prohibitedExtensions.some(key => value[key] !== false)) {
            throw new TypeError('Relationship claim text or Ten-God evidence changed.');
          }
        }
        return { semanticTextBindings: [], semanticQualifierBindings: [] };
      },
    },
  });

  return {
    async issue(request: unknown, executionAttemptId: string, requestedRelease: unknown) {
      if (requestedRelease !== releaseRef) return null;
      const parsed = parseProductHostReadingRequest(request);
      if (parsed.reading.text !== '연애운' || parsed.reading.targetPersonRef !== undefined) return null;

      const result = await host.requestReadingForIssue(request, engineVersion);
      const response = admitProductReadingResponse(result.response);
      const { readerSource } = result;
      if (response.state !== 'delivered' || response.reading === undefined || readerSource === undefined ||
          Buffer.byteLength(JSON.stringify(readerSource)) > 128 * 1024) return null;

      // Existing MyeongHa single-chart proof envelope and signing domain.
      const externalRequestRef = 'saju_source_' + randomUUID();
      const payload = {
        version: PROOF_VERSION, issuer, audience, keyId, executionAttemptId, externalRequestRef,
        authorityHash: PRODUCTION_RELATIONSHIP_AUTHORITY_HASH, releaseRef,
        requestBodyHash: deterministicContentHash(request),
        responseBodyHash: deterministicContentHash(JSON.parse(JSON.stringify(response))),
        nativeReadingId: response.reading.readingId, engineVersion, issuedAtMs: Date.now(),
        readerSourceHash: deterministicContentHash(JSON.parse(JSON.stringify(readerSource))),
      };
      const signature = sign(null, Buffer.from(SIGNATURE_DOMAIN + deterministicContentHash(payload)),
        signingKey).toString('base64url');
      return {
        body: { ...response, readerSource },
        externalRequestRef,
        proof: Buffer.from(JSON.stringify({ payload, signature })).toString('base64url'),
      };
    },
  };
}
