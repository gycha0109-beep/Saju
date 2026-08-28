import type { TenGod } from '../contracts/calculation.js';

export type CareerConclusionKind = 'driver' | 'fit' | 'environment' | 'friction';
export type CareerTenGodChannel = 'visible_stems' | 'branches';

export interface CareerTenGodSemanticSpec {
  id: string;
  kind: CareerConclusionKind;
}

export const CAREER_TEN_GOD_SEMANTIC_SPECS: Readonly<
  Record<TenGod, CareerTenGodSemanticSpec>
> = Object.freeze({
  비견: { id: 'BI_GYEON', kind: 'environment' },
  겁재: { id: 'GEOP_JAE', kind: 'friction' },
  식신: { id: 'SIK_SIN', kind: 'driver' },
  상관: { id: 'SANG_GWAN', kind: 'driver' },
  편재: { id: 'PYEON_JAE', kind: 'fit' },
  정재: { id: 'JEONG_JAE', kind: 'fit' },
  편관: { id: 'PYEON_GWAN', kind: 'fit' },
  정관: { id: 'JEONG_GWAN', kind: 'fit' },
  편인: { id: 'PYEON_IN', kind: 'driver' },
  정인: { id: 'JEONG_IN', kind: 'driver' },
});

export function careerTenGodClaimType(
  god: TenGod,
  channel: CareerTenGodChannel,
): string {
  const spec = CAREER_TEN_GOD_SEMANTIC_SPECS[god];
  return `CAREER_NATAL_TEN_GOD_${spec.id}_${channel.toUpperCase()}`;
}
