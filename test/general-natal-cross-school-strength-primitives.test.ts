import { describe, expect, it } from 'vitest';
import {
 R020_AUTHORITY,R020_PRIMITIVE_COMPARISON,R020_TEXTUAL_OVERLAP,
 R020_TRADITION_SURFACES,R020_CROSS_SCHOOL_STRENGTH_VERSION,
} from '../src/research/general-natal-cross-school-strength-primitives.js';

describe('R020 cross-school strength primitives',()=>{
 it('tracks source strata instead of flattening schools',()=>{
  expect(R020_CROSS_SCHOOL_STRENGTH_VERSION).toBe('0.1.0-research');
  expect(R020_TRADITION_SURFACES.map(s=>s.id)).toEqual([
   'XU_ZIPING_PINGZHU','REN_DITIAN_SUI_CHANWEI','MINGLI_TANYUAN_CANDIDATE'
  ]);
  expect(R020_TRADITION_SURFACES[2].directlyVerified).toBe(false);
 });
 it('records textual overlap and the material branch variant',()=>{
  expect(R020_TEXTUAL_OVERLAP.sharedSpringWoodAutumnWoodExamples).toBe(true);
  expect(R020_TEXTUAL_OVERLAP.exactIdentity).toBe(false);
  expect(R020_TEXTUAL_OVERLAP.materialVariant).toEqual({
   context:'spring Wood heavy Metal branch pair',xuReading:'支酉丑',renReading:'支申酉'
  });
 });
 it('forbids fake cross-school confidence and final classification',()=>{
  expect(R020_PRIMITIVE_COMPARISON.crossSchoolMajorityVoteSupported).toBe(false);
  expect(R020_PRIMITIVE_COMPARISON.sharedPhraseCountAsIndependentConfidenceSupported).toBe(false);
  expect(R020_AUTHORITY).toEqual({
   status:'DIVERGENT_WITH_TEXTUAL_DEPENDENCY_RISK',
   crossSchoolPrimitiveComparisonStarted:true,
   independentTraditionCountSettled:false,
   generalizedStrengthClassifierAuthorized:false,
   productionAuthorityPromoted:false,
  });
 });
});
