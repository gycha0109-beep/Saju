import { describe, expect, it } from 'vitest';
import type { MediaPipeFaceLandmarkerResultFR25V1 } from './mediapipe-eye-landmark-adapter-fr25.js';
import type { MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 } from './mediapipe-face-landmarker-runtime-fr26.js';
import { runPhotoToGovernedNeutralGeometryFR62 } from './governed-neutral-geometry-fr62.js';
import {
  assessGeometryToMorphologyAdmissionFR63,
  type MorphologyAdmissionReportFR63V1,
} from './morphology-admission-fr63.js';
import { assessV1MethodologyAdmissionFR64 } from './v1-methodology-admission-fr64.js';

const DIGEST = `sha256:${'d'.repeat(64)}`;

function request(image: unknown = Object.freeze({ image: true })) {
  return {
    schemaVersion: 'fr61-production-neutral-observation-provider-request-v1' as const,
    providerRunRef: 'fr64:test-run',
    canonicalAssetDigest: DIGEST,
    image,
  };
}

function validResult(): MediaPipeFaceLandmarkerResultFR25V1 {
  return {
    faceLandmarks: [Array.from({ length: 478 }, (_, index) => Object.freeze({
      x: (index + 1) / 500,
      y: (478 - index) / 500,
      z: (index % 3) / 1000,
      visibility: 0.97,
    }))],
    faceBlendshapes: [],
    facialTransformationMatrixes: [],
  };
}

function factory(): MediaPipeFaceLandmarkerRuntimeFactoryFR26V1 {
  return {
    async create() {
      return {
        detect() {
          return validResult();
        },
        close() {},
      };
    },
  };
}

async function morphology(): Promise<MorphologyAdmissionReportFR63V1> {
  const geometry = await runPhotoToGovernedNeutralGeometryFR62(request(), factory());
  return assessGeometryToMorphologyAdmissionFR63(geometry);
}

describe('FR64 V1 methodology admission', () => {
  it('validates the FR3 research pack but does not treat F1 enablement as execution authority', async () => {
    const report = assessV1MethodologyAdmissionFR64(await morphology());

    expect(report.schemaVersion).toBe('fr64-v1-methodology-admission-v1');
    expect(report.authorityState).toBe('blocked_upstream_morphology_not_ready');
    expect(report.target).toBe('shenxiang_five_officers_static_v1');
    expect(report.pack.packRef).toBe('pack.face.fr3_research_v0@0.3.0');
    expect(report.pack.registryValidated).toBe(true);
    expect(report.pack.f1EnabledByPack).toBe(true);
    expect(report.pack.enabledTiers).toContain('F1');
    expect(report.pack.targetMethodologyRef).toBe('method.shenxiang.five_officers@0.1.0');
    expect(report.pack.targetMethodologyIncluded).toBe(true);
    expect(report.pack.targetMethodologyReviewStatus).toBe('research');
    expect(report.pack.forbiddenObservationInputs).toContain('observations.colorAppearance');
    expect(report.execution.methodologyExecutionIssued).toBe(false);
  });

  it('keeps all target methodology sources below scan_checked and reports the source gate explicitly', async () => {
    const report = assessV1MethodologyAdmissionFR64(await morphology());

    expect(report.sourceVerification).toHaveLength(6);
    expect(report.scanCheckedSourceCount).toBe(0);
    expect(report.sourceVerification.every((entry) => entry.verificationStatus === 'unverified_ocr')).toBe(true);
    expect(new Set(report.sourceVerification.map((entry) => entry.passageRef))).toEqual(new Set([
      'passage.shenxiang.five_officers.mapping',
      'passage.shenxiang.five_officers.listening',
      'passage.shenxiang.five_officers.longevity',
      'passage.shenxiang.five_officers.inspection',
      'passage.shenxiang.five_officers.discernment',
      'passage.shenxiang.five_officers.intake',
    ]));
    expect(report.blockers).toContain('methodology_sources_not_scan_checked');
  });

  it('carries the FR63 empty morphology state forward without creating a Five Officers execution input', async () => {
    const report = assessV1MethodologyAdmissionFR64(await morphology());

    expect(report.upstream.morphologyAdmissionSchemaVersion).toBe('fr63-morphology-admission-v1');
    expect(report.upstream.morphologyInputReady).toBe(false);
    expect(report.upstream.automaticMorphologyClassificationCount).toBe(0);
    expect(report.upstream.automaticCriterionStatesIssued).toBe(0);
    expect(report.upstream.fiveOfficerAssessmentInputIssued).toBe(false);
    expect(report.upstream.researchAssertionSubstitutionAllowed).toBe(false);
    expect(report.blockers).toContain('upstream_morphology_input_not_ready');
    expect(report.blockers).toContain('five_officer_assessment_input_not_issued');
  });

  it('issues no methodology-derived claims, diagnosis runtime, or narrative while blocked', async () => {
    const report = assessV1MethodologyAdmissionFR64(await morphology());
    const serialized = JSON.stringify(report);

    expect(report.execution.researchDiagnosisRuntimeInvoked).toBe(false);
    expect(report.execution.explicitAssertionAuthorityInjected).toBe(false);
    expect(report.execution.claimsIssued).toBe(0);
    expect(report.execution.narrativeIssued).toBe(false);
    expect(report.execution.productionMethodologyAuthorized).toBe(false);
    expect(report.execution.v1ClaimInputReady).toBe(false);
    expect(serialized).not.toContain('\"assertionAuthority\"');
    expect(serialized).not.toContain('\"reading\"');
    expect(serialized).not.toContain('\"claims\":[');
    expect(serialized).not.toContain('\"narrative\":');
  });

  it('pins the no-shortcut boundary between pack enablement and research diagnosis', async () => {
    const report = assessV1MethodologyAdmissionFR64(await morphology());

    expect(report.prohibitedShortcuts).toEqual([
      'pack_f1_enabled_to_methodology_execution',
      'empty_morphology_to_five_officer_assessment',
      'geometry_to_assertion_authority',
      'research_methodology_to_production_authority',
      'blocked_methodology_to_claims',
      'blocked_methodology_to_narrative',
    ]);
    expect(report.blockers).toContain('pack_enablement_is_not_execution_authority');
    expect(report.blockers).toContain('diagnosis_runtime_requires_explicit_assertion_authority');
  });

  it('preserves photo provenance and non-persistence through methodology admission', async () => {
    const report = assessV1MethodologyAdmissionFR64(await morphology());

    expect(report.provenance.providerRunRef).toBe('fr64:test-run');
    expect(report.provenance.canonicalAssetDigest).toBe(DIGEST);
    expect(report.provenance.sourceMorphologyArtifactVersion).toBe('0.1.0');
    expect(report.provenance.methodologyPackRef).toBe('pack.face.fr3_research_v0@0.3.0');
    expect(report.provenance.methodologyRef).toBe('method.shenxiang.five_officers@0.1.0');
    expect(report.provenance.rawSourcePersisted).toBe(false);
    expect(report.provenance.rawProviderResponsePersisted).toBe(false);
    expect(report.provenance.biometricEmbeddingPersisted).toBe(false);
  });

  it('rejects a forged FR63 source that claims methodology input is ready', async () => {
    const valid = await morphology();
    const forged = {
      ...valid,
      v1MethodologyInputReady: true,
    } as unknown as MorphologyAdmissionReportFR63V1;

    expect(() => assessV1MethodologyAdmissionFR64(forged)).toThrow(/explicitly blocked and empty/u);
  });
});
