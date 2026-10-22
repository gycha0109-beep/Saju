import type { BirthInput } from '../contracts/calculation.js';
import { runInterpretation } from '../interpretation/interpretation-engine.js';
import { calculateAuthorizedMyeonghwaProductionSnapshot } from '../production/production-calculation-runtime.js';
import { createGeneralNatalMultifactorRegistry } from '../research/general-natal-multifactor-candidate.js';
import { createCareerMultifactorResearchRegistry } from '../research/career-natal-multifactor-candidate.js';
import { createWealthNatalMultifactorRegistry } from '../research/wealth-natal-multifactor-candidate.js';
import { createBusinessNatalMultifactorRegistry } from '../research/business-natal-multifactor-candidate.js';
import { createRelationshipNatalMultifactorRegistry } from '../research/relationship-natal-multifactor-candidate.js';
import { buildGeneralNatalMultifactorReport } from './general-natal-multifactor-report.js';
import { buildCareerMultifactorResearchReport } from './career-natal-multifactor-report.js';
import { buildWealthNatalMultifactorReport } from './wealth-natal-multifactor-report.js';
import { buildBusinessNatalMultifactorReport } from './business-natal-multifactor-report.js';
import { buildRelationshipNatalMultifactorReport } from './relationship-natal-multifactor-report.js';
import { renderNatalFiveDomainMultifactorResearchHtml } from './natal-five-domain-multifactor-reader.js';

/**
 * Preview-only execution adapter for the existing NATAL five-domain
 * T5/T8 source-owned research reports. Do not reuse this HTML as Official
 * ProductReadingResponse or promote research claims to Production.
 *
 * One canonical snapshot is shared. Each domain runs its own existing
 * registry and emits only its existing paragraph/Claim/Source provenance.
 */
export function renderNatalFiveDomainResearchPreviewForBirth(birth: BirthInput): string {
  const snapshot = calculateAuthorizedMyeonghwaProductionSnapshot(birth).snapshot;
  const now = new Date();
  const generalRegistry = createGeneralNatalMultifactorRegistry();
  const careerRegistry = createCareerMultifactorResearchRegistry();
  const wealthRegistry = createWealthNatalMultifactorRegistry();
  const businessRegistry = createBusinessNatalMultifactorRegistry();
  const relationshipRegistry = createRelationshipNatalMultifactorRegistry();

  const reports = {
    general: buildGeneralNatalMultifactorReport(
      snapshot, runInterpretation(snapshot, generalRegistry, { now }), generalRegistry,
    ),
    career: buildCareerMultifactorResearchReport(
      snapshot, runInterpretation(snapshot, careerRegistry, { now }), careerRegistry,
    ),
    wealth: buildWealthNatalMultifactorReport(
      snapshot, runInterpretation(snapshot, wealthRegistry, { now }), wealthRegistry,
    ),
    business: buildBusinessNatalMultifactorReport(
      snapshot, runInterpretation(snapshot, businessRegistry, { now }), businessRegistry,
    ),
    relationship: buildRelationshipNatalMultifactorReport(
      snapshot, runInterpretation(snapshot, relationshipRegistry, { now }), relationshipRegistry,
    ),
  };
  return renderNatalFiveDomainMultifactorResearchHtml(snapshot, reports);
}
