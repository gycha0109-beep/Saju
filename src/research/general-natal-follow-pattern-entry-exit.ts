export const R029_FOLLOW_PATTERN_VERSION='0.1.0-research' as const;
export type R029FollowTarget='FOLLOW_STRONG'|'FOLLOW_PROSPEROUS'|'FOLLOW_OFFICER_KILL'|'FOLLOW_WEALTH'|'FOLLOW_OUTPUT'|'TRANSFORM_QI';
export interface R029EntryProposition{
 id:string;sourcePhrase:string;target:R029FollowTarget;preconditions:readonly string[];executable:false;
}
export const R029_GLOBAL_ENTRY_GATES=Object.freeze([
 '四柱氣象偏於一方',
 '四柱無可扶抑',
] as const);
export const R029_ENTRY_PROPOSITIONS:readonly R029EntryProposition[]=Object.freeze([
 {id:'day-month-same-follow-strong',sourcePhrase:'日與月同，則從強從旺',target:'FOLLOW_STRONG',preconditions:['日與月同','四柱氣象偏於一方','四柱無可扶抑'],executable:false},
 {id:'day-month-same-follow-prosperous',sourcePhrase:'日與月同，則從強從旺',target:'FOLLOW_PROSPEROUS',preconditions:['日與月同','四柱氣象偏於一方','四柱無可扶抑'],executable:false},
 {id:'day-month-different-daymaster-extinct-follow-officer-kill',sourcePhrase:'日不與月同，而日元臨絕，則從官煞、從財、從食傷',target:'FOLLOW_OFFICER_KILL',preconditions:['日不與月同','日元臨絕','四柱無可扶抑'],executable:false},
 {id:'day-month-different-daymaster-extinct-follow-wealth',sourcePhrase:'日不與月同，而日元臨絕，則從官煞、從財、從食傷',target:'FOLLOW_WEALTH',preconditions:['日不與月同','日元臨絕','四柱無可扶抑'],executable:false},
 {id:'day-month-different-daymaster-extinct-follow-output',sourcePhrase:'日不與月同，而日元臨絕，則從官煞、從財、從食傷',target:'FOLLOW_OUTPUT',preconditions:['日不與月同','日元臨絕','四柱無可扶抑'],executable:false},
 {id:'daystem-transformation',sourcePhrase:'日干化合，則為化氣',target:'TRANSFORM_QI',preconditions:['日干化合'],executable:false},
]);
export const R029_EXCLUSIONS=Object.freeze([
 {id:'month-order-has-usable-yongshen',sourcePhrase:'若月令自有用神，豈可另尋外格？',blocksFollow:true},
 {id:'visible-ordinary-path',sourcePhrase:'干頭已有財官七煞，而棄之以就外格，亦太謬矣',blocksFollow:true},
 {id:'month-use-and-four-pillar-support-control',sourcePhrase:'月令有用神、四柱有扶抑，豈有捨之別取之理？',blocksFollow:true},
 {id:'broken-ordinary-pattern-is-not-month-order-useless',sourcePhrase:'財被劫官被傷...皆以為月令無取，而棄之以就外格，則謬之又謬矣',blocksFollow:true},
] as const);
export const R029_EXECUTION_GAPS=Object.freeze([
 'WHOLE_CHART_ONE_SIDEDNESS','NO_ORDINARY_SUPPORT_CONTROL_PATH','DAY_MONTH_SAME_SEMANTICS',
 'DAY_MASTER_LIN_JUE','ORDINARY_YONGSHEN_AVAILABILITY','VISIBLE_ORDINARY_PATH',
 'RESCUE_AVAILABILITY','DAY_STEM_TRANSFORMATION_VALIDITY'
] as const);
export const R029_AUTHORITY=Object.freeze({
 status:'research' as const,entryAndExclusionFamiliesVerified:true,
 brokenOrdinaryPatternImpliesFollow:false,
 executableFollowPatternResolverAuthorized:false,
 productionAuthorityPromoted:false,
});
