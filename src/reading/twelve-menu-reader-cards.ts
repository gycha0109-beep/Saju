import type { ProductReadingResponseReading, ProductReadingResponseState } from './product-reading-response.js';
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

const REASON_MESSAGES = Object.freeze({
  not_executed: '이 메뉴의 실제 개인별 풀이가 아직 실행되지 않았습니다.',
  input_required: '풀이에 필요한 입력을 먼저 확인해야 합니다.',
  evidence_insufficient: '현재 입력과 승인된 출처 범위로는 이 주제의 풀이 근거가 충분하지 않습니다.',
  limited_reading: '근거가 허용하는 일부 풀이만 표시합니다. 종합해석의 품질 완료나 정식 제공 승인은 아닙니다.',
  official_grounded_response:
    '허용된 근거로 생성한 풀이입니다. 전체 제품의 공개·보관·판매 권한과는 별개입니다.',
});

function scopedTitle(menuTitle: string, readingSection: string): string {
  if (readingSection === 'family:natal:parents') return '부모와의 관계';
  if (readingSection === 'family:natal:children') return '자녀와의 관계';
  return menuTitle;
}

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
): readonly TwelveMenuReaderCard[] {
  const readiness = buildTwelveMenuEngineReadiness(executions);
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
      const message = REASON_MESSAGES[section.reason] +
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
        title: scopedTitle(menu.label, section.readingSection),
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
