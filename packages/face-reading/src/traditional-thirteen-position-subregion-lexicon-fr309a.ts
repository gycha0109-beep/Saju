export type ThirteenPositionSubregionVerificationStateFR309A =
  | 'transcription_clear'
  | 'transcription_variant_open';

export interface ThirteenPositionSubregionFR309A {
  readonly subregionKey: string;
  readonly traditionalLabel: string;
  readonly variantLabels: readonly string[];
  readonly verificationState: ThirteenPositionSubregionVerificationStateFR309A;
  readonly existingFr309TermKey: string | null;
  readonly interpretationAuthorized: false;
  readonly providerGeometryBindingAuthorized: false;
}

export interface ThirteenPositionGroupFR309A {
  readonly ordinal: number;
  readonly rootTermKey: string;
  readonly traditionalLabel: string;
  readonly koreanLabel: string;
  readonly sourceRefs: readonly string[];
  readonly scanAdjudicated: false;
  readonly subregions: readonly ThirteenPositionSubregionFR309A[];
}

export interface ThirteenPositionWitnessFR309A {
  readonly witnessRef: string;
  readonly title: string;
  readonly surfaceKind:
    | 'public_domain_scan_identified'
    | 'scan_page_transcription'
    | 'transcription_variant';
  readonly locator: string;
  readonly directPageImageAdjudicated: false;
}

export interface TraditionalThirteenPositionLexiconFR309A {
  readonly schemaVersion: 'fr309a-v1';
  readonly contractId: 'traditional_thirteen_position_subregion_lexicon_fr309a';
  readonly authorityState: 'research_only';
  readonly upstreamLexiconRef: 'packages/face-reading/src/traditional-face-region-lexicon-fr309.ts';
  readonly witnesses: readonly ThirteenPositionWitnessFR309A[];
  readonly groups: readonly ThirteenPositionGroupFR309A[];
  readonly authorityBoundary: {
    readonly issuesTraditionalInterpretation: false;
    readonly issuesFortuneOrPersonalityClaims: false;
    readonly issuesProviderGeometry: false;
    readonly issuesThresholdsOrClassifiers: false;
    readonly issuesProductionActivation: false;
  };
}

export const FR309A_WITNESSES: readonly ThirteenPositionWitnessFR309A[] = Object.freeze([
  Object.freeze({
    witnessRef: 'witness.nlc416.shenxiangquanbian.1925',
    title: '1925 文明書局 神相全編 / NLC416-13jh001662-59167',
    surfaceKind: 'public_domain_scan_identified',
    locator: 'https://commons.wikimedia.org/wiki/File:NLC416-13jh001662-59167_%E7%A5%9E%E7%9B%B8%E5%85%A8%E7%B7%A8.pdf',
    directPageImageAdjudicated: false,
  }),
  Object.freeze({
    witnessRef: 'witness.gujin473.art631.wikisource',
    title: '欽定古今圖書集成 藝術典 第631卷 / 神相全編一',
    surfaceKind: 'scan_page_transcription',
    locator: 'https://zh.wikisource.org/wiki/Page:Gujin_Tushu_Jicheng,_Volume_473_(1700-1725).djvu/10',
    directPageImageAdjudicated: false,
  }),
  Object.freeze({
    witnessRef: 'witness.ctext.shenxiang.transcription',
    title: 'Chinese Text Project 神相全編 transcription',
    surfaceKind: 'transcription_variant',
    locator: 'https://ctext.org/wiki.pl?chapter=905153',
    directPageImageAdjudicated: false,
  }),
]);

const RAW_GROUPS = [
  {
    "ordinal": 1,
    "rootTermKey": "tianzhong",
    "traditionalLabel": "天中",
    "koreanLabel": "천중",
    "sourceRefs": [
      "witness.nlc416.shenxiangquanbian.1925",
      "witness.gujin473.art631.wikisource",
      "witness.ctext.shenxiang.transcription"
    ],
    "scanAdjudicated": false,
    "subregions": [
      {
        "subregionKey": "tianzhong.tianyue",
        "traditionalLabel": "天嶽",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "tianzhong.zuoxiang",
        "traditionalLabel": "左廂",
        "variantLabels": [
          "左眉"
        ],
        "verificationState": "transcription_variant_open",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "tianzhong.neifu",
        "traditionalLabel": "內府",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "tianzhong.gaoguang",
        "traditionalLabel": "高廣",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "tianzhong.chiyang",
        "traditionalLabel": "尺陽",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "tianzhong.wuku",
        "traditionalLabel": "武庫",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "tianzhong.junmen",
        "traditionalLabel": "軍門",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "tianzhong.fujiao",
        "traditionalLabel": "輔角",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "tianzhong.biandi",
        "traditionalLabel": "邊地",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": "biandi"
      }
    ]
  },
  {
    "ordinal": 2,
    "rootTermKey": "tianting",
    "traditionalLabel": "天庭",
    "koreanLabel": "천정",
    "sourceRefs": [
      "witness.nlc416.shenxiangquanbian.1925",
      "witness.gujin473.art631.wikisource",
      "witness.ctext.shenxiang.transcription"
    ],
    "scanAdjudicated": false,
    "subregions": [
      {
        "subregionKey": "tianting.rijiao",
        "traditionalLabel": "日角",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "tianting.longjiao",
        "traditionalLabel": "龍角",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "tianting.tianfu",
        "traditionalLabel": "天府",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "tianting.fangxin",
        "traditionalLabel": "房心",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "tianting.shangmu",
        "traditionalLabel": "上墓",
        "variantLabels": [
          "墓上"
        ],
        "verificationState": "transcription_variant_open",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "tianting.sisha",
        "traditionalLabel": "四殺",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "tianting.zhantang",
        "traditionalLabel": "戰堂",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "tianting.yima",
        "traditionalLabel": "驛馬",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": "yima"
      },
      {
        "subregionKey": "tianting.diaoting",
        "traditionalLabel": "弔庭",
        "variantLabels": [
          "吊庭"
        ],
        "verificationState": "transcription_variant_open",
        "existingFr309TermKey": null
      }
    ]
  },
  {
    "ordinal": 3,
    "rootTermKey": "sikong",
    "traditionalLabel": "司空",
    "koreanLabel": "사공",
    "sourceRefs": [
      "witness.nlc416.shenxiangquanbian.1925",
      "witness.gujin473.art631.wikisource",
      "witness.ctext.shenxiang.transcription"
    ],
    "scanAdjudicated": false,
    "subregions": [
      {
        "subregionKey": "sikong.ejiao",
        "traditionalLabel": "額角",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "sikong.shangqing",
        "traditionalLabel": "上卿",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "sikong.shaofu",
        "traditionalLabel": "少府",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "sikong.jiaoyou",
        "traditionalLabel": "交友",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "sikong.daozhong",
        "traditionalLabel": "道中",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "sikong.jiaoe",
        "traditionalLabel": "交額",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "sikong.meizhong",
        "traditionalLabel": "眉重",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "sikong.shanlin",
        "traditionalLabel": "山林",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": "shanlin"
      }
    ]
  },
  {
    "ordinal": 4,
    "rootTermKey": "zhongzheng",
    "traditionalLabel": "中正",
    "koreanLabel": "중정",
    "sourceRefs": [
      "witness.nlc416.shenxiangquanbian.1925",
      "witness.gujin473.art631.wikisource",
      "witness.ctext.shenxiang.transcription"
    ],
    "scanAdjudicated": false,
    "subregions": [
      {
        "subregionKey": "zhongzheng.ejiao",
        "traditionalLabel": "額角",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "zhongzheng.hujiao",
        "traditionalLabel": "虎角",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "zhongzheng.niujiao",
        "traditionalLabel": "牛角",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "zhongzheng.fugu",
        "traditionalLabel": "輔骨",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "zhongzheng.xuanjiao",
        "traditionalLabel": "玄角",
        "variantLabels": [
          "元角"
        ],
        "verificationState": "transcription_variant_open",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "zhongzheng.fuji",
        "traditionalLabel": "斧戟",
        "variantLabels": [
          "斧裁"
        ],
        "verificationState": "transcription_variant_open",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "zhongzheng.huagai",
        "traditionalLabel": "華蓋",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "zhongzheng.futang",
        "traditionalLabel": "福堂",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "zhongzheng.caixia",
        "traditionalLabel": "彩霞",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "zhongzheng.jiaowai",
        "traditionalLabel": "郊外",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      }
    ]
  },
  {
    "ordinal": 5,
    "rootTermKey": "yintang",
    "traditionalLabel": "印堂",
    "koreanLabel": "인당",
    "sourceRefs": [
      "witness.nlc416.shenxiangquanbian.1925",
      "witness.gujin473.art631.wikisource",
      "witness.ctext.shenxiang.transcription"
    ],
    "scanAdjudicated": false,
    "subregions": [
      {
        "subregionKey": "yintang.jiaosuo",
        "traditionalLabel": "交鎖",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "yintang.zuomu",
        "traditionalLabel": "左目",
        "variantLabels": [
          "左日"
        ],
        "verificationState": "transcription_variant_open",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "yintang.canshi",
        "traditionalLabel": "蠶室",
        "variantLabels": [
          "蚕室"
        ],
        "verificationState": "transcription_variant_open",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "yintang.linzhong",
        "traditionalLabel": "林中",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "yintang.jiuzun",
        "traditionalLabel": "酒樽",
        "variantLabels": [
          "酒櫃"
        ],
        "verificationState": "transcription_variant_open",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "yintang.jingshe",
        "traditionalLabel": "精舍",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "yintang.pinmen",
        "traditionalLabel": "嬪門",
        "variantLabels": [
          "繽門"
        ],
        "verificationState": "transcription_variant_open",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "yintang.jielu",
        "traditionalLabel": "劫路",
        "variantLabels": [
          "刧路"
        ],
        "verificationState": "transcription_variant_open",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "yintang.xianglu",
        "traditionalLabel": "巷路",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "yintang.qinglu",
        "traditionalLabel": "青路",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      }
    ]
  },
  {
    "ordinal": 6,
    "rootTermKey": "shangen",
    "traditionalLabel": "山根",
    "koreanLabel": "산근",
    "sourceRefs": [
      "witness.nlc416.shenxiangquanbian.1925",
      "witness.gujin473.art631.wikisource",
      "witness.ctext.shenxiang.transcription"
    ],
    "scanAdjudicated": false,
    "subregions": [
      {
        "subregionKey": "shangen.taiyang",
        "traditionalLabel": "太陽",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "shangen.zhongyang",
        "traditionalLabel": "中陽",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "shangen.shaoyang",
        "traditionalLabel": "少陽",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "shangen.waiyang",
        "traditionalLabel": "外陽",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "shangen.yuwei",
        "traditionalLabel": "魚尾",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": "yuwei"
      },
      {
        "subregionKey": "shangen.jianmen",
        "traditionalLabel": "奸門",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": "jianmen"
      },
      {
        "subregionKey": "shangen.shenguang",
        "traditionalLabel": "神光",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "shangen.cangjing",
        "traditionalLabel": "倉井",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "shangen.tianmen",
        "traditionalLabel": "天門",
        "variantLabels": [
          "大門"
        ],
        "verificationState": "transcription_variant_open",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "shangen.xuanwu",
        "traditionalLabel": "玄武",
        "variantLabels": [
          "元武"
        ],
        "verificationState": "transcription_variant_open",
        "existingFr309TermKey": null
      }
    ]
  },
  {
    "ordinal": 7,
    "rootTermKey": "nian_shang",
    "traditionalLabel": "年上",
    "koreanLabel": "연상",
    "sourceRefs": [
      "witness.nlc416.shenxiangquanbian.1925",
      "witness.gujin473.art631.wikisource",
      "witness.ctext.shenxiang.transcription"
    ],
    "scanAdjudicated": false,
    "subregions": [
      {
        "subregionKey": "nian_shang.fuzuo",
        "traditionalLabel": "夫座",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "nian_shang.zhangnan",
        "traditionalLabel": "長男",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "nian_shang.zhongnan",
        "traditionalLabel": "中男",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "nian_shang.shaonan",
        "traditionalLabel": "少男",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "nian_shang.jingui",
        "traditionalLabel": "金匱",
        "variantLabels": [
          "金櫃",
          "金柜"
        ],
        "verificationState": "transcription_variant_open",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "nian_shang.jinfang",
        "traditionalLabel": "禁房",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "nian_shang.zeidao",
        "traditionalLabel": "賊盜",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "nian_shang.youjun",
        "traditionalLabel": "游軍",
        "variantLabels": [
          "遊軍"
        ],
        "verificationState": "transcription_variant_open",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "nian_shang.shushang",
        "traditionalLabel": "書上",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "nian_shang.yutang",
        "traditionalLabel": "玉堂",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      }
    ]
  },
  {
    "ordinal": 8,
    "rootTermKey": "shou_shang",
    "traditionalLabel": "壽上",
    "koreanLabel": "수상",
    "sourceRefs": [
      "witness.nlc416.shenxiangquanbian.1925",
      "witness.gujin473.art631.wikisource",
      "witness.ctext.shenxiang.transcription"
    ],
    "scanAdjudicated": false,
    "subregions": [
      {
        "subregionKey": "shou_shang.jiagui",
        "traditionalLabel": "甲匱",
        "variantLabels": [
          "甲櫃",
          "甲柜"
        ],
        "verificationState": "transcription_variant_open",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "shou_shang.guilai",
        "traditionalLabel": "歸來",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "shou_shang.tangshang",
        "traditionalLabel": "堂上",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "shou_shang.zhengmian",
        "traditionalLabel": "正面",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "shou_shang.guyi",
        "traditionalLabel": "姑姨",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "shou_shang.zimei",
        "traditionalLabel": "姊妹",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "shou_shang.xiongdi",
        "traditionalLabel": "兄弟",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "shou_shang.waisheng",
        "traditionalLabel": "外甥",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "shou_shang.mingmen",
        "traditionalLabel": "命門",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "shou_shang.xuetang",
        "traditionalLabel": "學堂",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      }
    ]
  },
  {
    "ordinal": 9,
    "rootTermKey": "zhuntou",
    "traditionalLabel": "準頭",
    "koreanLabel": "준두",
    "sourceRefs": [
      "witness.nlc416.shenxiangquanbian.1925",
      "witness.gujin473.art631.wikisource",
      "witness.ctext.shenxiang.transcription"
    ],
    "scanAdjudicated": false,
    "subregions": [
      {
        "subregionKey": "zhuntou.lantai",
        "traditionalLabel": "蘭臺",
        "variantLabels": [
          "蘭台"
        ],
        "verificationState": "transcription_variant_open",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "zhuntou.faling",
        "traditionalLabel": "法令",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "zhuntou.zaoshang",
        "traditionalLabel": "竈上",
        "variantLabels": [
          "灶上"
        ],
        "verificationState": "transcription_variant_open",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "zhuntou.gongshi",
        "traditionalLabel": "宮室",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "zhuntou.dianyu",
        "traditionalLabel": "典御",
        "variantLabels": [
          "典禦"
        ],
        "verificationState": "transcription_variant_open",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "zhuntou.yuancang",
        "traditionalLabel": "園倉",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "zhuntou.houge",
        "traditionalLabel": "後閣",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "zhuntou.shoumen",
        "traditionalLabel": "守門",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "zhuntou.bingzu",
        "traditionalLabel": "兵卒",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "zhuntou.yinshou",
        "traditionalLabel": "印綬",
        "variantLabels": [
          "印綏"
        ],
        "verificationState": "transcription_variant_open",
        "existingFr309TermKey": null
      }
    ]
  },
  {
    "ordinal": 10,
    "rootTermKey": "renshong",
    "traditionalLabel": "人中",
    "koreanLabel": "인중",
    "sourceRefs": [
      "witness.nlc416.shenxiangquanbian.1925",
      "witness.gujin473.art631.wikisource",
      "witness.ctext.shenxiang.transcription"
    ],
    "scanAdjudicated": false,
    "subregions": [
      {
        "subregionKey": "renshong.jingbu",
        "traditionalLabel": "井部",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "renshong.zhangxia",
        "traditionalLabel": "帳下",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "renshong.xichu",
        "traditionalLabel": "細廚",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "renshong.neige",
        "traditionalLabel": "內閣",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "renshong.xiaoshi",
        "traditionalLabel": "小使",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "renshong.pucong",
        "traditionalLabel": "僕從",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "renshong.jitang",
        "traditionalLabel": "妓堂",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "renshong.yingmen",
        "traditionalLabel": "嬰門",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "renshong.boshi",
        "traditionalLabel": "博士",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "renshong.xuanbi",
        "traditionalLabel": "懸壁",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      }
    ]
  },
  {
    "ordinal": 11,
    "rootTermKey": "water_star",
    "traditionalLabel": "水星",
    "koreanLabel": "수성",
    "sourceRefs": [
      "witness.nlc416.shenxiangquanbian.1925",
      "witness.gujin473.art631.wikisource",
      "witness.ctext.shenxiang.transcription"
    ],
    "scanAdjudicated": false,
    "subregions": [
      {
        "subregionKey": "water_star.gemen",
        "traditionalLabel": "閣門",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "water_star.beilin",
        "traditionalLabel": "北鄰",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "water_star.weixiang",
        "traditionalLabel": "委巷",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "water_star.tongqu",
        "traditionalLabel": "通衢",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "water_star.keshe",
        "traditionalLabel": "客舍",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "water_star.binglan",
        "traditionalLabel": "兵蘭",
        "variantLabels": [
          "兵闌"
        ],
        "verificationState": "transcription_variant_open",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "water_star.jiaku",
        "traditionalLabel": "家庫",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "water_star.shanglv",
        "traditionalLabel": "商旅",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "water_star.shengmen",
        "traditionalLabel": "生門",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "water_star.shantou",
        "traditionalLabel": "山頭",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      }
    ]
  },
  {
    "ordinal": 12,
    "rootTermKey": "chengjiang",
    "traditionalLabel": "承漿",
    "koreanLabel": "승장",
    "sourceRefs": [
      "witness.nlc416.shenxiangquanbian.1925",
      "witness.gujin473.art631.wikisource",
      "witness.ctext.shenxiang.transcription"
    ],
    "scanAdjudicated": false,
    "subregions": [
      {
        "subregionKey": "chengjiang.zuzhai",
        "traditionalLabel": "祖宅",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "chengjiang.sunzhai",
        "traditionalLabel": "孫宅",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "chengjiang.waiyuan",
        "traditionalLabel": "外院",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "chengjiang.linyuan",
        "traditionalLabel": "林苑",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "chengjiang.xiamu",
        "traditionalLabel": "下墓",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "chengjiang.zhuangtian",
        "traditionalLabel": "莊田",
        "variantLabels": [
          "庄田"
        ],
        "verificationState": "transcription_variant_open",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "chengjiang.jiuchi",
        "traditionalLabel": "酒池",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "chengjiang.jiaokuo",
        "traditionalLabel": "郊廓",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "chengjiang.huangqiu",
        "traditionalLabel": "荒丘",
        "variantLabels": [
          "荒坵",
          "荒斤"
        ],
        "verificationState": "transcription_variant_open",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "chengjiang.daolu",
        "traditionalLabel": "道路",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      }
    ]
  },
  {
    "ordinal": 13,
    "rootTermKey": "dige",
    "traditionalLabel": "地閣",
    "koreanLabel": "지각",
    "sourceRefs": [
      "witness.nlc416.shenxiangquanbian.1925",
      "witness.gujin473.art631.wikisource",
      "witness.ctext.shenxiang.transcription"
    ],
    "scanAdjudicated": false,
    "subregions": [
      {
        "subregionKey": "dige.xiashe",
        "traditionalLabel": "下舍",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "dige.nupu",
        "traditionalLabel": "奴僕",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "dige.duimo",
        "traditionalLabel": "碓磨",
        "variantLabels": [
          "推磨"
        ],
        "verificationState": "transcription_variant_open",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "dige.kengqian",
        "traditionalLabel": "坑塹",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "dige.diku",
        "traditionalLabel": "地庫",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": "diku"
      },
      {
        "subregionKey": "dige.beichi",
        "traditionalLabel": "陂池",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "dige.eya",
        "traditionalLabel": "鵝鴨",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "dige.dahai",
        "traditionalLabel": "大海",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      },
      {
        "subregionKey": "dige.zhouche",
        "traditionalLabel": "舟車",
        "variantLabels": [],
        "verificationState": "transcription_clear",
        "existingFr309TermKey": null
      }
    ]
  }
] as const;

export const THIRTEEN_POSITION_GROUPS_FR309A: readonly ThirteenPositionGroupFR309A[] =
  Object.freeze(RAW_GROUPS.map((group) => Object.freeze({
    ...group,
    sourceRefs: Object.freeze([...group.sourceRefs]),
    subregions: Object.freeze(group.subregions.map((subregion) => Object.freeze({
      ...subregion,
      variantLabels: Object.freeze([...subregion.variantLabels]),
      interpretationAuthorized: false as const,
      providerGeometryBindingAuthorized: false as const,
    }))),
  })));

export const TRADITIONAL_THIRTEEN_POSITION_LEXICON_FR309A: TraditionalThirteenPositionLexiconFR309A =
  Object.freeze({
    schemaVersion: 'fr309a-v1',
    contractId: 'traditional_thirteen_position_subregion_lexicon_fr309a',
    authorityState: 'research_only',
    upstreamLexiconRef: 'packages/face-reading/src/traditional-face-region-lexicon-fr309.ts',
    witnesses: FR309A_WITNESSES,
    groups: THIRTEEN_POSITION_GROUPS_FR309A,
    authorityBoundary: Object.freeze({
      issuesTraditionalInterpretation: false,
      issuesFortuneOrPersonalityClaims: false,
      issuesProviderGeometry: false,
      issuesThresholdsOrClassifiers: false,
      issuesProductionActivation: false,
    }),
  });

const ISSUED_FR309A = new WeakSet<object>();

function assertUnique(values: readonly string[], path: string): void {
  if (new Set(values).size !== values.length) throw new Error(`fr309a_duplicate:${path}`);
}

export function assertTraditionalThirteenPositionLexiconFR309A(
  value: TraditionalThirteenPositionLexiconFR309A,
): void {
  if (value.schemaVersion !== 'fr309a-v1') throw new Error('fr309a_schema_version_drift');
  if (value.contractId !== 'traditional_thirteen_position_subregion_lexicon_fr309a') {
    throw new Error('fr309a_contract_id_drift');
  }
  if (value.authorityState !== 'research_only') throw new Error('fr309a_authority_state_widening');
  if (value.upstreamLexiconRef !== 'packages/face-reading/src/traditional-face-region-lexicon-fr309.ts') {
    throw new Error('fr309a_upstream_lexicon_ref_drift');
  }
  if (value.groups.length !== 13) throw new Error('fr309a_requires_exactly_13_groups');
  if (value.witnesses.length < 2) throw new Error('fr309a_requires_multiple_witness_surfaces');

  assertUnique(value.groups.map((group) => group.rootTermKey), 'root_term_key');
  assertUnique(value.groups.map((group) => String(group.ordinal)), 'ordinal');
  assertUnique(value.witnesses.map((witness) => witness.witnessRef), 'witness_ref');

  const expectedOrdinals = Array.from({ length: 13 }, (_, index) => index + 1);
  if (!value.groups.every((group, index) => group.ordinal === expectedOrdinals[index])) {
    throw new Error('fr309a_ordinal_drift');
  }

  const allSubregionKeys: string[] = [];
  for (const group of value.groups) {
    if (group.scanAdjudicated !== false) throw new Error(`fr309a_scan_authority_widening:${group.rootTermKey}`);
    if (group.subregions.length === 0) throw new Error(`fr309a_empty_subregions:${group.rootTermKey}`);
    if (group.sourceRefs.length === 0) throw new Error(`fr309a_missing_source_refs:${group.rootTermKey}`);

    for (const subregion of group.subregions) {
      allSubregionKeys.push(subregion.subregionKey);
      if (!subregion.subregionKey.startsWith(`${group.rootTermKey}.`)) {
        throw new Error(`fr309a_wrong_parent:${subregion.subregionKey}`);
      }
      if (subregion.traditionalLabel.trim().length === 0) {
        throw new Error(`fr309a_empty_label:${subregion.subregionKey}`);
      }
      assertUnique(subregion.variantLabels, `variant:${subregion.subregionKey}`);
      if (
        subregion.verificationState !== 'transcription_clear' &&
        subregion.verificationState !== 'transcription_variant_open'
      ) {
        throw new Error(`fr309a_invalid_verification_state:${subregion.subregionKey}`);
      }
      if (subregion.variantLabels.length > 0 && subregion.verificationState !== 'transcription_variant_open') {
        throw new Error(`fr309a_variant_must_remain_open:${subregion.subregionKey}`);
      }
      if (subregion.interpretationAuthorized !== false) {
        throw new Error(`fr309a_interpretation_authority_widening:${subregion.subregionKey}`);
      }
      if (subregion.providerGeometryBindingAuthorized !== false) {
        throw new Error(`fr309a_geometry_authority_widening:${subregion.subregionKey}`);
      }
    }
  }
  assertUnique(allSubregionKeys, 'subregion_key');

  for (const witness of value.witnesses) {
    if (witness.directPageImageAdjudicated !== false) {
      throw new Error(`fr309a_direct_scan_authority_widening:${witness.witnessRef}`);
    }
    if (witness.locator.trim().length === 0) throw new Error(`fr309a_missing_locator:${witness.witnessRef}`);
  }

  for (const [key, flag] of Object.entries(value.authorityBoundary)) {
    if (flag !== false) throw new Error(`fr309a_authority_boundary_widening:${key}`);
  }
}

export function issueTraditionalThirteenPositionLexiconFR309A(): TraditionalThirteenPositionLexiconFR309A {
  assertTraditionalThirteenPositionLexiconFR309A(TRADITIONAL_THIRTEEN_POSITION_LEXICON_FR309A);
  ISSUED_FR309A.add(TRADITIONAL_THIRTEEN_POSITION_LEXICON_FR309A);
  return TRADITIONAL_THIRTEEN_POSITION_LEXICON_FR309A;
}

export function assertIssuedTraditionalThirteenPositionLexiconFR309A(
  value: TraditionalThirteenPositionLexiconFR309A,
): void {
  assertTraditionalThirteenPositionLexiconFR309A(value);
  if (!ISSUED_FR309A.has(value)) throw new Error('fr309a_unissued_lexicon');
}
