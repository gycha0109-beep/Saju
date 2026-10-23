import type { ProductReadingInternals } from './product-reading-service.js';
import { readReaderMenuLabelV1 } from './reading-reader-locale-resources.js';
import type {
  ProductReadingResponseBlock,
  ProductReadingResponseReading,
} from './product-reading-response.js';
import { readingSectionForIntentV1 } from './consumer-reading-authority.js';

export const TWELVE_MENU_ENGINE_READINESS_VERSION =
  'myeongha-twelve-menu-engine-readiness-v1' as const;

const MENU_DEFINITIONS = Object.freeze([
  { menuId: 'general', sections: ['general:natal'] },
  { menuId: 'career', sections: ['career:natal'] },
  { menuId: 'wealth', sections: ['wealth:natal'] },
  { menuId: 'relationship', sections: ['relationship:natal:general'] },
  { menuId: 'business', sections: ['business:natal'] },
  { menuId: 'family', sections: ['family:natal:parents', 'family:natal:children'] },
  { menuId: 'life_stage', sections: ['life_stage:life_stage'] },
  { menuId: 'annual', sections: ['general:annual'] },
  { menuId: 'monthly', sections: ['general:monthly'] },
  { menuId: 'spouse', sections: ['relationship:natal:spouse'] },
  { menuId: 'compatibility', sections: ['compatibility:natal'] },
  { menuId: 'question', sections: ['question_specific:natal'] },
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

/**
 * Product-card readiness represents something the person can actually read,
 * rather than a transport object, a disclosure, or a calculated fact table.
 * Source-bound interpretation authority is still evaluated separately.
 */
function hasReadableInterpretiveBlock(block: ProductReadingResponseBlock): boolean {
  switch (block.type) {
    case 'paragraph':
      return block.text.trim().length > 0;
    case 'key_points':
      return block.items.some(item => item.trim().length > 0);
    case 'comparison':
      return block.perspectives.some(item => item.text.trim().length > 0);
    case 'ambiguity':
      return block.summary.trim().length > 0 ||
        block.scenarios.some(item => item.text.trim().length > 0);
    case 'timeline':
      return block.entries.some(item => item.text.trim().length > 0);
    case 'fact_table':
    case 'source_hint':
      return false;
  }
}

function hasReadableInterpretation(
  reading: ProductReadingResponseReading | undefined,
  requireComplete: boolean,
): boolean {
  return reading?.sections.some(section =>
    section.state !== 'unavailable' &&
    (!requireComplete || section.state === 'complete') &&
    section.blocks.some(hasReadableInterpretiveBlock)) === true;
}

function officialEvidenceDelivered(internals: ProductReadingInternals, section: string): boolean {
  const execution = internals.execution;
  const composition = execution.preparation.composition;
  const authority = execution.consumerReadingAuthority;
  return (
    execution.state === 'completed' &&
    internals.response.state === 'delivered' &&
    execution.artifact !== undefined &&
    hasReadableInterpretation(internals.response.reading, true) &&
    execution.preparation.normalization.request !== undefined &&
    readingSectionForIntentV1(execution.preparation.normalization.request.intent) === section &&
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
    hasReadableInterpretation(internals.response.reading, false);
  // A selected Claim with no user-visible Korean section is NOT a delivered
  // partial reading. The caller may still show the insufficient-evidence
  // explanation, but must not advertise a readable interpretation.
  if (observedReading) {
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
  const unresolvedByMenu = new Map<TwelveMenuId, ProductReadingInternals>();
  for (const { menuId, internals } of executions) {
    const menu = MENU_DEFINITIONS.find(candidate => candidate.menuId === menuId);
    if (menu === undefined) throw new TypeError('Unknown menu cannot grant reading availability.');
    const request = internals.execution.preparation.normalization.request;
    if (request === undefined) {
      // Missing input is specific to its menu, not evidence for another intent.
      if (unresolvedByMenu.has(menuId)) {
        throw new TypeError('Ambiguous duplicate unresolved menu request: ' + menuId);
      }
      unresolvedByMenu.set(menuId, internals);
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
    const sections = menu.sections.map(section =>
      sectionReadiness(section, bySection.get(section) ?? unresolvedByMenu.get(menu.menuId)));
    const allAvailable = sections.every(section => section.state === 'available');
    const anyEvidence = sections.some(section => section.state !== 'unavailable');
    const state: EngineMenuReadiness = allAvailable
      ? 'available'
      : anyEvidence ? 'partial' : 'unavailable';
    return {
      version: TWELVE_MENU_ENGINE_READINESS_VERSION,
      menuId: menu.menuId, label: readReaderMenuLabelV1('ko-KR', menu.menuId), state,
      sections,
      constraints: LIMITS,
    };
  });
}
