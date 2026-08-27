import type { VersionedRef } from '../contracts/common.js';
import type {
  MethodologyDefinition,
  RuleDefinition,
} from '../contracts/interpretation.js';

export interface UncoveredMethodologyRequiredInput {
  methodologyId: string;
  methodologyVersion: string;
  inputKind: 'fact' | 'claim' | 'research_evidence';
  inputIdentity: string;
}

function versionKey(ref: VersionedRef): string {
  return `${ref.id}@${ref.version}`;
}

function methodologyKey(methodology: MethodologyDefinition): string {
  return versionKey({ id: methodology.methodologyId, version: methodology.version });
}

function pathPatternMatches(pattern: string, path: string): boolean {
  const patternSegments = pattern.split('.').filter(Boolean);
  const pathSegments = path.split('.').filter(Boolean);
  let pi = 0;
  let vi = 0;
  while (pi < patternSegments.length && vi < pathSegments.length) {
    const segment = patternSegments[pi];
    if (segment === '**') return pi === patternSegments.length - 1;
    if (segment !== '*' && segment !== pathSegments[vi]) return false;
    pi += 1;
    vi += 1;
  }
  if (pi === patternSegments.length && vi === pathSegments.length) return true;
  return pi === patternSegments.length - 1 && patternSegments[pi] === '**';
}

function researchEvidenceContractMatches(
  candidate: NonNullable<MethodologyDefinition['inputContract']>['researchEvidenceInputs'] extends readonly (infer T)[] | undefined
    ? T
    : never,
  input: RuleDefinition['inputs'][number],
): boolean {
  if (input.source !== 'research_evidence') return false;
  if (candidate.evidenceType !== input.pathOrClaimType) return false;
  if (candidate.evidenceVersion !== undefined && candidate.evidenceVersion !== input.evidenceVersion) {
    return false;
  }
  if (candidate.definitionRef !== undefined) {
    if (input.researchEvidenceDefinitionRef === undefined) return false;
    if (versionKey(candidate.definitionRef) !== versionKey(input.researchEvidenceDefinitionRef)) return false;
  }
  return true;
}

function selectedInputsForMethodology(
  rules: readonly RuleDefinition[],
  methodology: MethodologyDefinition,
): readonly RuleDefinition['inputs'][number][] {
  const expected = methodologyKey(methodology);
  return rules
    .filter((rule) => versionKey(rule.methodologyRef) === expected)
    .flatMap((rule) => rule.inputs);
}

export function findUncoveredMethodologyRequiredInputs(
  selectedRules: readonly RuleDefinition[],
  selectedMethodologies: readonly MethodologyDefinition[],
): readonly UncoveredMethodologyRequiredInput[] {
  const missing: UncoveredMethodologyRequiredInput[] = [];

  for (const methodology of selectedMethodologies) {
    const contract = methodology.inputContract;
    if (contract === undefined) continue;
    const inputs = selectedInputsForMethodology(selectedRules, methodology);

    for (const required of (contract.factInputs ?? []).filter((candidate) => candidate.mode === 'required')) {
      const covered = inputs.some(
        (input) =>
          input.source === required.source &&
          pathPatternMatches(required.pathPattern, input.pathOrClaimType),
      );
      if (!covered) {
        missing.push({
          methodologyId: methodology.methodologyId,
          methodologyVersion: methodology.version,
          inputKind: 'fact',
          inputIdentity: `${required.source}:${required.pathPattern}`,
        });
      }
    }

    for (const required of (contract.claimInputs ?? []).filter((candidate) => candidate.mode === 'required')) {
      const covered = inputs.some(
        (input) =>
          input.source === 'interpretation_claim' && input.pathOrClaimType === required.claimType,
      );
      if (!covered) {
        missing.push({
          methodologyId: methodology.methodologyId,
          methodologyVersion: methodology.version,
          inputKind: 'claim',
          inputIdentity: required.claimType,
        });
      }
    }

    for (const required of (contract.researchEvidenceInputs ?? []).filter(
      (candidate) => candidate.mode === 'required',
    )) {
      const covered = inputs.some((input) => researchEvidenceContractMatches(required, input));
      if (!covered) {
        const version = required.evidenceVersion ?? '*';
        const definition = required.definitionRef === undefined ? '*' : versionKey(required.definitionRef);
        missing.push({
          methodologyId: methodology.methodologyId,
          methodologyVersion: methodology.version,
          inputKind: 'research_evidence',
          inputIdentity: `${required.evidenceType}@${version}#${definition}`,
        });
      }
    }
  }

  return missing;
}
