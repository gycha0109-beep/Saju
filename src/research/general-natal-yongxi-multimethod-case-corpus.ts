export const R039_YONGXI_CASE_CORPUS_VERSION = '0.1.0-research' as const;

export type R039MethodRelation =
  | 'COEXISTING_DIFFERENT_ROLES'
  | 'TRUE_CONFLICT_UNRESOLVED'
  | 'METHOD_NOT_APPLICABLE'
  | 'INDETERMINATE';

export interface R039MethodSpecificNeed {
  role: string;
  value: string;
  sourcePhrase: string;
}

export interface R039YongXiCase {
  id: string;
  chart: string;
  needs: readonly R039MethodSpecificNeed[];
  relation: R039MethodRelation;
  forceSingleWinner: false;
}

export const R039_YONGXI_CASES: readonly R039YongXiCase[] = Object.freeze([
  {
    id: 'weak-winter-metal-climate-and-support',
    chart: '丁巳 壬子 辛巳 丁酉',
    needs: [
      {
        role: 'PRIMARY_USE',
        value: '酉金扶身',
        sourcePhrase: '丁火雖通根，而日元洩氣重，須以酉金扶身為用',
      },
      {
        role: 'CLIMATE_REQUIREMENT',
        value: '火不可缺',
        sourcePhrase: '特冬令金水，不可缺火，非定以為用也',
      },
    ],
    relation: 'COEXISTING_DIFFERENT_ROLES',
    forceSingleWinner: false,
  },
  {
    id: 'strong-winter-metal-output-use-and-climate',
    chart: '甲申 丙子 庚辰 甲申',
    needs: [
      {
        role: 'PRIMARY_USE',
        value: '傷官洩秀',
        sourcePhrase: '身旺以傷官洩秀為用',
      },
      {
        role: 'CLIMATE_REQUIREMENT',
        value: '丙火',
        sourcePhrase: '特丙火調候，為配合所不可缺',
      },
    ],
    relation: 'COEXISTING_DIFFERENT_ROLES',
    forceSingleWinner: false,
  },
  {
    id: 'wealth-disease-remedy-plus-climate',
    chart: '戊戌 甲子 己巳 戊辰',
    needs: [
      {
        role: 'BINGYAO_DISEASE',
        value: '比劫爭財',
        sourcePhrase: '比劫爭財為病',
      },
      {
        role: 'BINGYAO_REMEDY_USE',
        value: '甲木官星制劫',
        sourcePhrase: '取甲木官星制劫為用，蓋制劫所以護財也',
      },
      {
        role: 'CLIMATE_REQUIREMENT',
        value: '巳中丙火',
        sourcePhrase: '須兼取巳中丙火。十一月氣寒，得火暖之，方得發榮，即調候之意也',
      },
    ],
    relation: 'COEXISTING_DIFFERENT_ROLES',
    forceSingleWinner: false,
  },
]);

export const R039_CORPUS_BOUNDARY = Object.freeze({
  verifiedCaseCount: 3,
  trueConflictCaseVerified: false,
  multiMethodDifferenceImpliesConflict: false,
  forceSingleWinnerAuthorized: false,
  numericPriorityAuthorized: false,
  productionAuthorityPromoted: false,
});
