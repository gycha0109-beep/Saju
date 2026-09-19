import { describe, expect, it } from 'vitest';
import {
 R024_AUTHORITY,R024_EXECUTION_GAPS,R024_SEAL_PATTERN_PROPOSITIONS,R024_SEAL_PATTERN_VERSION,
} from '../src/research/general-natal-seal-pattern-conditions.js';

describe('R024 Seal-pattern condition matrix',()=>{
 it('preserves source condition roles',()=>{
  expect(R024_SEAL_PATTERN_VERSION).toBe('0.1.0-research');
  expect(new Set(R024_SEAL_PATTERN_PROPOSITIONS.map(p=>p.role))).toEqual(new Set(['SUCCESS','FAILURE','CONTAMINATION']));
 });
 it('keeps all propositions non-executable',()=>{
  expect(R024_SEAL_PATTERN_PROPOSITIONS.every(p=>p.executable===false)).toBe(true);
  expect(R024_EXECUTION_GAPS).toContain('BODY_STRENGTH');
  expect(R024_EXECUTION_GAPS).toContain('SEAL_RELATIVE_LIGHTNESS_HEAVINESS');
 });
 it('does not promote final authority',()=>{
  expect(R024_AUTHORITY).toEqual({
   status:'research',propositionFamiliesVerified:true,
   executableSealPatternResolverAuthorized:false,
   establishmentBooleanAuthorized:false,
   productionAuthorityPromoted:false,
  });
 });
});
