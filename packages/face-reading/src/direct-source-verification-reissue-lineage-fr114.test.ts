import { describe, expect, it } from 'vitest';
import {
  FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0,
  validateDirectSourceVerificationRegistry,
  type DirectSourcePageVerificationRecord,
  type DirectSourceVerificationRelation,
  type DirectSourceVerificationRegistry,
} from './direct-source-verification.js';
import {
  FR104_NLC_1925_INTAKE_CANDIDATE,
  FR104_NLC_INTAKE_PAGE_VERIFICATION,
} from './five-officers-mouth-direct-source-page-verification-fr104.js';
import { FaceAuthorityValidationError } from './validation.js';

const PARENT_REF = 'verification.shenxiang_nlc_1925.intake@0.1.0';
const CHILD_REF = 'verification.shenxiang_nlc_1925.intake.witness_qualified@0.1.0';

function childRecord(overrides: Partial<DirectSourcePageVerificationRecord> = {}): DirectSourcePageVerificationRecord {
  const source: DirectSourcePageVerificationRecord = FR104_NLC_INTAKE_PAGE_VERIFICATION;
  return {
    verificationId: 'verification.shenxiang_nlc_1925.intake.witness_qualified',
    version: source.version,
    candidateRef: source.candidateRef,
    witnessId: source.witnessId,
    passageId: 'passage.shenxiang.five_officers.intake.nlc_1925',
    chapter: source.chapter,
    scanPage: source.scanPage,
    ...(source.printedPage === undefined ? {} : { printedPage: source.printedPage }),
    originalText: source.originalText,
    visualEvidenceRefs: source.visualEvidenceRefs,
    checkerRefs: source.checkerRefs,
    state: source.state,
    mayPromoteOtherWitness: false,
    ...overrides,
  };
}

function relation(overrides: Partial<DirectSourceVerificationRelation> = {}): DirectSourceVerificationRelation {
  return {
    relationId: 'verification-lineage.shenxiang_nlc_1925.intake.witness_qualified',
    version: '0.1.0',
    kind: 'non_independent_identity_reissue',
    parentVerificationRef: PARENT_REF,
    childVerificationRef: CHILD_REF,
    parentRetained: true,
    evidenceReusePolicy: 'exact_evidence_reuse_required',
    checkingEventPolicy: 'same_checker_refs_same_checking_event',
    allowedRecordDifferences: ['verificationId', 'passageId'],
    lineageDepthPolicy: 'single_hop_parent_root',
    independentVerificationDelta: 0,
    childMayCountAsIndependentVerification: false,
    ...overrides,
  };
}

function registry(
  relations: readonly DirectSourceVerificationRelation[] | undefined = [relation()],
  child: DirectSourcePageVerificationRecord = childRecord(),
): DirectSourceVerificationRegistry {
  return {
    registryId: 'direct-source-verification.face.fr114_core_probe',
    version: '0.1.0',
    candidates: [...FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.candidates, FR104_NLC_1925_INTAKE_CANDIDATE],
    pageVerifications: [
      ...FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0.pageVerifications,
      FR104_NLC_INTAKE_PAGE_VERIFICATION,
      child,
    ],
    ...(relations === undefined ? {} : { verificationRelations: relations }),
  };
}

describe('FR114 core direct-source verification reissue lineage contract', () => {
  it('keeps legacy registries valid without verificationRelations', () => {
    expect(() => validateDirectSourceVerificationRegistry(FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0)).not.toThrow();
    expect(Object.prototype.hasOwnProperty.call(FACE_DIRECT_SOURCE_VERIFICATION_RESEARCH_V0, 'verificationRelations')).toBe(false);
  });

  it('accepts a bounded non-independent identity-reissue relation', () => {
    expect(() => validateDirectSourceVerificationRegistry(registry())).not.toThrow();
  });

  it('rejects duplicate relations, multiple parents, unresolved refs, and chained lineage', () => {
    expect(() => validateDirectSourceVerificationRegistry(registry([relation(), relation()])))
      .toThrow(FaceAuthorityValidationError);
    expect(() => validateDirectSourceVerificationRegistry(registry([
      relation(),
      relation({ relationId: 'verification-lineage.second-parent' }),
    ]))).toThrow(FaceAuthorityValidationError);
    expect(() => validateDirectSourceVerificationRegistry(registry([
      relation({ parentVerificationRef: 'verification.missing@0.1.0' }),
    ]))).toThrow(FaceAuthorityValidationError);
    expect(() => validateDirectSourceVerificationRegistry(registry([
      relation(),
      relation({
        relationId: 'verification-lineage.reverse',
        parentVerificationRef: CHILD_REF,
        childVerificationRef: PARENT_REF,
      }),
    ]))).toThrow(FaceAuthorityValidationError);
  });

  it('rejects evidence/checking drift and independent-verification inflation', () => {
    expect(() => validateDirectSourceVerificationRegistry(registry(
      [relation()],
      childRecord({ originalText: `${FR104_NLC_INTAKE_PAGE_VERIFICATION.originalText} drift` }),
    ))).toThrow(FaceAuthorityValidationError);
    expect(() => validateDirectSourceVerificationRegistry(registry(
      [relation()],
      childRecord({ checkerRefs: ['checker:invented'] }),
    ))).toThrow(FaceAuthorityValidationError);
    expect(() => validateDirectSourceVerificationRegistry(registry([
      relation({ independentVerificationDelta: 1 } as unknown as Partial<DirectSourceVerificationRelation>),
    ]))).toThrow(FaceAuthorityValidationError);
    expect(() => validateDirectSourceVerificationRegistry(registry([
      relation({ childMayCountAsIndependentVerification: true } as unknown as Partial<DirectSourceVerificationRelation>),
    ]))).toThrow(FaceAuthorityValidationError);
  });
});
