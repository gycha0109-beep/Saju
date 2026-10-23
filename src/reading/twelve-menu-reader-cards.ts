import type { ProductReadingResponseReading, ProductReadingResponseState } from './product-reading-response.js';
import {
  getReadingReaderLocaleResourcesV1,
  readReaderReasonMessageV1,
  readReaderSectionTitleV1,
} from './reading-reader-locale-resources.js';
import {
  resolveReadingLocaleV1,
  type ReadingLocalePreferencesV1,
} from './reading-localization.js';
import { readingSectionForIntentV1 } from './consumer-reading-authority.js';
import {
  buildTwelveMenuEngineReadiness,
  type EngineMenuReadiness,
  type MenuReadingExecution,
  type TwelveMenuId,
} from './twelve-menu-engine-readiness.js';

export const TWELVE_MENU_READER_CARDS_VERSION =
  'myeongha-twelve-menu-reader-cards-preview-v1' as const;

export interface TwelveMenuReaderSection {
  readingSection: string;
  title: string;
  state: EngineMenuReadiness;
  message: string;
  responseState?: ProductReadingResponseState;
  reading?: Pick<ProductReadingResponseReading, 'sections' | 'disclosures'>;
}

export interface TwelveMenuReaderCard {
  version: typeof TWELVE_MENU_READER_CARDS_VERSION;
  menuId: TwelveMenuId;
  title: string;
  state: EngineMenuReadiness;
  sections: readonly TwelveMenuReaderSection[];
  constraints: {
    previewOnly: true;
    mayPublish: false;
    maySell: false;
    mayGrantPublicAvailability: false;
    mayTreatReadinessAsMeaningQualityCompletion: false;
  };
}

const CONSTRAINTS = Object.freeze({
  previewOnly: true as const,
  mayPublish: false as const,
  maySell: false as const,
  mayGrantPublicAvailability: false as const,
  mayTreatReadinessAsMeaningQualityCompletion: false as const,
});

/**
 * Bind actual governed ProductReadingResponse content to the twelve visible
 * reader cards. No card acquires interpretation authority from its label,
 * another card's evidence, or a successful HTTP delivery alone.
 *
 * Preview-only: exposing research or fallback text as an Official/Production
 * product requires an independent authority decision outside this projection.
 */
export function buildTwelveMenuReaderCards(
  executions: readonly MenuReadingExecution[],
  localePreferences: ReadingLocalePreferencesV1 = {},
): readonly TwelveMenuReaderCard[] {
  // Reader status copy and delivered Korean paragraphs share one explicit
  // reading locale. Unknown/undeployed locales must never receive ko-KR text.
  const locale = resolveReadingLocaleV1(localePreferences);
  getReadingReaderLocaleResourcesV1(locale);
  const readiness = buildTwelveMenuEngineReadiness(executions, localePreferences);
  const bySection = new Map<string, MenuReadingExecution['internals']>();
  const unresolvedByMenu = new Map<TwelveMenuId, MenuReadingExecution['internals']>();

  for (const { menuId, internals } of executions) {
    const request = internals.execution.preparation.normalization.request;
    if (request === undefined) {
      unresolvedByMenu.set(menuId, internals);
    } else {
      bySection.set(readingSectionForIntentV1(request.intent), internals);
    }
  }

  return readiness.map(menu => ({
    version: TWELVE_MENU_READER_CARDS_VERSION,
    menuId: menu.menuId,
    title: menu.label,
    state: menu.state,
    sections: menu.sections.map(section => {
      const internals = bySection.get(section.readingSection)
        ?? unresolvedByMenu.get(menu.menuId);
      const response = internals?.response;
      const extraExplanation = response?.coverage?.explanation;
      const message = readReaderReasonMessageV1(locale, section.reason) +
        (extraExplanation === undefined ? '' : ' ' + extraExplanation);
      const reading = section.state === 'unavailable' ||
        response?.reading === undefined ||
        (response.state !== 'delivered' && response.state !== 'delivered_with_fallback')
        ? undefined
        : {
            sections: response.reading.sections,
            disclosures: response.reading.disclosures,
          };
      return {
        readingSection: section.readingSection,
        title: readReaderSectionTitleV1(locale, menu.label, section.readingSection),
        state: section.state,
        message,
        ...(section.responseState === undefined
          ? {} : { responseState: section.responseState }),
        ...(reading === undefined ? {} : { reading }),
      };
    }),
    constraints: CONSTRAINTS,
  }));
}
