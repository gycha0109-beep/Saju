import type { ProductReadingInternals } from './product-reading-service.js';
import { readingSectionForIntentV1 } from './consumer-reading-authority.js';

export const TWELVE_MENU_ENGINE_READINESS_VERSION =
  'myeongha-twelve-menu-engine-readiness-v1' as const;

const MENU_DEFINITIONS = Object.freeze([
  { menuId: 'general', label: '전체 사주', sections: ['general:natal'] },
  { menuId: 'career', label: '직업·커리어', sections: ['career:natal'] },
  { menuId: 'wealth', label: '재물', sections: ['wealth:natal'] },
  { menuId: 'relationship', label: '연애·관계', sections: ['relationship:natal:general'] },
  { menuId: 'business', label: '사업', sections: ['business:natal'] },
  { menuId: 'family', label: '가족', sections: ['family:natal:parents', 'family:natal:children'] },
  { menuId: 'life_stage', label: '삶의 단계', sections: ['life_stage:life_stage'] },
  { menuId: 'annual', label: '올해', sections: ['general:annual'] },
  { menuId: 'monthly', label: '이번 달', sections: ['general:monthly'] },
  { menuId: 'spouse', label: '배우자·관계', sections: ['relationship:natal:spouse'] },
  { menuId: 'compatibility', label: '궁합', sections: ['compatibility:natal'] },
  { menuId: 'question', label: '지금 고민으로 보기', sections: ['question_specific:natal'] },
] as const);

export type TwelveMenuId = (typeof MENU_DEFINITIONS)[number]['menuId'];
export type EngineMenuReadiness = 'available' | 'partial' | 'unavailable';
export type EngineMenuReason =
  | 'not_executed'
  | 'input_required'
  | 'evidence_insufficient'
  | 'limited_reading'
  | 'official_grounded_response';

export interface MenuReadingExecution {
  menuId: TwelveMenuId;
  internals: ProductReadingInternals;
}

export interface MenuReadingSectionReadiness {
  readingSection: string;
  state: EngineMenuReadiness;
  reason: EngineMenuReason;
  responseState?: ProductReadingInternals['response']['state'];
}

export interface TwelveMenuEngineReadiness {
  version: typeof TWELVE_MENU_ENGINE_READINESS_VERSION;
  menuId: TwelveMenuId;
  label: string;
  state: EngineMenuReadiness;
  sections: readonly MenuReadingSectionReadiness[];
  constraints: {
    mayTreatTopicVisibilityAsReadiness: false;
    mayTreatProfileSelectionAsReadingCompletion: false;
    mayPromoteResearchToOfficial: false;
    mayGrantPublicAvailability: false;
    mayAuthorizePersistence: false;
    mayAuthorizeSelling: false;
  };
}

const LIMITS = Object.freeze({
  mayTreatTopicVisibilityAsReadiness: false as const,
  mayTreatProfileSelectionAsReadingCompletion: false as const,
  mayPromoteResearchToOfficial: false as const,
  mayGrantPublicAvailability: false as const,
  mayAuthorizePersistence: false as const,
  mayAuthorizeSelling: false as const,
});

function officialEvidenceDelivered(internals: ProductReadingInternals, section: string): boolean {
  const execution = internals.execution;
  const composition = execution.preparation.composition;
  const authority = execution.consumerReadingAuthority;
  return (
    execution.state === 'completed' &&
    internals.response.state === 'delivered' &&
    execution.artifact !== undefined &&
    execution.officialReadingPlan !== undefined &&
    execution.officialReadingReport !== undefined &&
    authority?.authority === 'official_reading' &&
    authority.readingSection === section &&
    composition?.selection.coverageState === 'complete' &&
    composition.selection.profileAuthorization.state === 'authorized' &&
    composition.evidence !== undefined &&
    composition.selection.selectedClaimIds.length > 0
  );
}

function sectionReadiness(
  section: string,
  internals: ProductReadingInternals | undefined,
): MenuReadingSectionReadiness {
  if (internals === undefined) {
    return { readingSection: section, state: 'unavailable', reason: 'not_executed' };
  }
  const responseState = internals.response.state;
  const responseInfo = { responseState };
  if (officialEvidenceDelivered(internals, section)) {
    return {
      readingSection: section, state: 'available',
      reason: 'official_grounded_response', ...responseInfo,
    };
  }
  const observedReading =
    (responseState === 'delivered' || responseState === 'delivered_with_fallback') &&
    internals.response.reading !== undefined;
  const partialClaimEvidence =
    responseState === 'partial_evidence' &&
    (internals.execution.preparation.composition?.selection.selectedClaimIds.length ?? 0) > 0;
  if (observedReading || partialClaimEvidence) {
    return {
      readingSection: section, state: 'partial',
      reason: 'limited_reading', ...responseInfo,
    };
  }
  const requiredInput =
    responseState === 'clarification_required' ||
    responseState === 'invalid_request';
  return {
    readingSection: section, state: 'unavailable',
    reason: requiredInput ? 'input_required' : 'evidence_insufficient',
    ...responseInfo,
  };
}

/**
 * Runtime signal for product UX; never a static catalogue-wide entitlement.
 * Only an actual official governed reading with source-bound evidence can be
 * marked available. Missing or research-only results are not advertised as
 * complete. Separate MyeongHa UI/auth/payment/commerce admission still applies.
 */
export function buildTwelveMenuEngineReadiness(
  executions: readonly MenuReadingExecution[],
): readonly TwelveMenuEngineReadiness[] {
  const bySection = new Map<string, ProductReadingInternals>();
  for (const { menuId, internals } of executions) {
    const menu = MENU_DEFINITIONS.find(candidate => candidate.menuId === menuId);
    if (menu === undefined) throw new TypeError('Unknown menu cannot grant reading availability.');
    const request = internals.execution.preparation.normalization.request;
    if (request === undefined) {
      // An unresolved input must be associated with the requested menu only.
      // Never turn a no-intent result into a competing section's evidence.
      continue;
    }
    const section = readingSectionForIntentV1(request.intent);
    if (!menu.sections.some(candidate => candidate === section)) {
      throw new TypeError('Menu reading evidence belongs to a different intent: ' + section);
    }
    if (bySection.has(section)) {
      throw new TypeError('Ambiguous duplicate runtime reading section: ' + section);
    }
    bySection.set(section, internals);
  }
  return MENU_DEFINITIONS.map(menu => {
    const sections = menu.sections.map(section => sectionReadiness(section, bySection.get(section)));
    const allAvailable = sections.every(section => section.state === 'available');
    const anyEvidence = sections.some(section => section.state !== 'unavailable');
    const state: EngineMenuReadiness = allAvailable
      ? 'available'
      : anyEvidence ? 'partial' : 'unavailable';
    return {
      version: TWELVE_MENU_ENGINE_READINESS_VERSION,
      menuId: menu.menuId, label: menu.label, state,
      sections,
      constraints: LIMITS,
    };
  });
}
