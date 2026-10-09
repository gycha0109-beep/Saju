import { describe, expect, it } from 'vitest';
import {
  FR311V_METHODOLOGY_AUDIT,
} from './traditional-expanded-static-observation-gap-audit-fr311v.js';
import {
  FR311Y_AUTHORITY_BOUNDARY,
  FR311Y_CAPTURE_PROTOCOLS,
  FR311Y_EIGHT_STUDY_HALLS_CAPTURE_PROTOCOL,
  FR311Y_FOUR_STUDY_HALLS_CAPTURE_PROTOCOL,
  FR311Y_RESEARCH_SUMMARY,
  FR311Y_TEN_OBSERVATIONS_CAPTURE_PROTOCOL,
  FR311Y_THREE_PILLARS_CAPTURE_PROTOCOL,
  assertCaptureScopeProtocolResearchFR311Y,
} from './traditional-capture-scope-protocol-research-fr311y.js';

describe('FR311Y capture-scope protocol research', () => {
  it('covers all four FR311V capture-protocol research methodologies', () => {
    assertCaptureScopeProtocolResearchFR311Y();

    const expected = FR311V_METHODOLOGY_AUDIT
      .filter((item) =>
        item.nextResearchLane === 'capture_protocol_research')
      .map((item) => item.targetId)
      .sort();

    expect(expected).toHaveLength(4);
    expect(
      FR311Y_CAPTURE_PROTOCOLS
        .map((item) => item.methodologyId)
        .sort(),
    ).toEqual(expected);
  });

  it('freezes the 18 capture requirements without making V1 static face complete', () => {
    expect(FR311Y_RESEARCH_SUMMARY).toEqual({
      methodologyTargets: 4,
      captureRequirements: 18,
      currentV1StaticFaceRequirements: 4,
      additionalRgbStateRequirements: 3,
      additionalViewRequirements: 4,
      nonFaceVisualScopeRequirements: 5,
      audioScopeRequirements: 1,
      unresolvedSourceRegionRequirements: 1,
      currentV1CompleteMethodologies: 0,
      empiricalValidationStarted: false,
      automaticTraditionalBindingsAuthorized: 0,
      thresholdsAuthorized: 0,
      productActivationsAuthorized: 0,
    });
  });

  it('requires explicit teeth and ear capture for Four Study Halls', () => {
    const states = new Map(
      FR311Y_FOUR_STUDY_HALLS_CAPTURE_PROTOCOL.requirements
        .map((item) => [item.requirementId, item] as const),
    );

    expect(states.get('fr311y.four_study_halls.teeth')).toMatchObject({
      state: 'additional_rgb_state_required',
      captureMode: 'frontal_teeth_visible',
      currentV1StaticFaceSatisfies: false,
    });
    expect(states.get('fr311y.four_study_halls.ear_gate_front'))
      .toMatchObject({
        state: 'additional_view_required',
        captureMode: 'ear_visible_oblique_or_profile',
        currentV1StaticFaceSatisfies: false,
      });
  });

  it('does not infer hidden tongue, teeth, ear, or unresolved Bansun surface', () => {
    const reqs = FR311Y_EIGHT_STUDY_HALLS_CAPTURE_PROTOCOL.requirements;
    expect(
      reqs.find((item) => item.requirementId.endsWith('.teeth'))?.captureMode,
    ).toBe('frontal_teeth_visible');
    expect(
      reqs.find((item) => item.requirementId.endsWith('.tongue'))?.captureMode,
    ).toBe('frontal_tongue_extended');
    expect(
      reqs.find((item) => item.requirementId.endsWith('.ear'))?.captureMode,
    ).toBe('ear_visible_oblique_or_profile');
    expect(
      reqs.find((item) => item.requirementId.endsWith('.bansun')),
    ).toMatchObject({
      state: 'source_region_unresolved',
      captureMode: 'no_capture_until_source_region_resolved',
    });

    for (const item of reqs) {
      expect(item.inferenceFromMissingInputAuthorized, item.requirementId)
        .toBe(false);
    }
  });

  it('keeps Ten Observations outside a single static face capture', () => {
    expect(FR311Y_TEN_OBSERVATIONS_CAPTURE_PROTOCOL.resolution)
      .toBe('multimodal_outside_v1_static_face_scope');

    const modes = new Set(
      FR311Y_TEN_OBSERVATIONS_CAPTURE_PROTOCOL.requirements
        .map((item) => item.captureMode),
    );
    expect(modes.has('full_body_posture_visible')).toBe(true);
    expect(modes.has('waist_back_visible')).toBe(true);
    expect(modes.has('hands_visible')).toBe(true);
    expect(modes.has('feet_visible')).toBe(true);
    expect(modes.has('voice_audio')).toBe(true);
  });

  it('keeps Three Pillars nose, head, and feet as separate capture scopes', () => {
    expect(FR311Y_THREE_PILLARS_CAPTURE_PROTOCOL.resolution)
      .toBe('multi_region_outside_v1_static_face_scope');

    expect(
      FR311Y_THREE_PILLARS_CAPTURE_PROTOCOL.requirements
        .map((item) => [item.state, item.captureMode]),
    ).toEqual([
      ['available_in_current_v1_static_face', 'frontal_neutral_face'],
      ['additional_view_required', 'whole_head_visible'],
      ['non_face_visual_scope_required', 'feet_visible'],
    ]);
  });

  it('keeps every capture and semantic promotion gate closed', () => {
    for (const protocolValue of FR311Y_CAPTURE_PROTOCOLS) {
      expect(protocolValue.currentV1StaticFaceComplete).toBe(false);
      expect(protocolValue.captureExecutionAuthorizedByThisStudy).toBe(false);
      expect(protocolValue.empiricalValidationStarted).toBe(false);
      expect(protocolValue.automaticTraditionalBindingAuthorized).toBe(false);
      expect(protocolValue.thresholdAuthorized).toBe(false);
      expect(protocolValue.productActivationAuthorized).toBe(false);

      for (const item of protocolValue.requirements) {
        expect(item.inferenceFromMissingInputAuthorized).toBe(false);
        expect(item.traditionalSemanticInferenceAuthorized).toBe(false);
      }
    }

    for (const [key, value] of Object.entries(FR311Y_AUTHORITY_BOUNDARY)) {
      expect(value, key).toBe(false);
    }
  });
});
