/* 见联会档案 · 站点数据
 * 纯静态站点，无需构建。新增一届比赛时，在 seasons 里追加一个对象，
 * 并把题目、机制图片放进对应的 wcN/ 目录即可。
 *
 * 机制字段（站点级，不隶属于某一届）：
 *   page     机制页路径（相对站点根目录）
 *   related  相关机制 id 数组，单向声明（A 指向 B 不代表 B 指向 A）
 *   seasons  出现轮次，填该机制出现过的届次 id，机制页据此生成「出现轮次」按钮
 */
window.WC_DATA = {
  site: {
    name: '见联会',
    en: 'WITNESS CONFERENCE',
    tagline: '见证者玩家社群 · 解谜竞赛档案',
    intro: '这里存档「见联会」历届比赛的时间、赛制、原创机制与全部题目。题目可以直接在页面上动笔作答，也可以放大查看后自行保存。',
    updated: '2026-11-06'
  },

  mechanisms: [
    {
      id: 'ring',
      name: '圆环',
      image: 'wc1/机制/圆环.png',
      page: 'mechanism/圆环.html',
      tagline: '复制同区域内的一个符号，但不复制它的颜色',
      rule: [
        '必须复制同区域内的一个其它符号（同区域无其它符号则报错），但不复制其颜色。',
        '题目中不会出现超过一个圆环。'
      ],
      source: '见证者第一届比赛相关（新）.docx',
      related: ['dot'],
      seasons: ['wc1']
    },
    {
      id: 'dot',
      name: '实心圆',
      image: 'wc1/机制/实心圆.png',
      page: 'mechanism/实心圆.html',
      tagline: '在圆环之后结算，变成圆环复制的符号',
      rule: [
        '只会和圆环一起出现。',
        '在圆环之后结算，均变成圆环复制的符号（保留自己的颜色）。'
      ],
      source: '见证者第一届比赛相关（新）.docx',
      related: ['ring'],
      seasons: ['wc1']
    }
  ],

  seasons: [
    {
      id: 'wc1',
      no: 1,
      dir: 'wc1',
      title: '第一届见联会',
      short: '第一届',
      subtitle: '2019 夏 · QQ 群内限时赛',
      date: '2019-07-15',
      time: '20:00',
      duration: '约 90 分钟',
      format: 'QQ 群内逐题发布，限时提交',
      summary: '第 1 届见联会于 2019 年 7 月 15 日 20:00 进行，约持续 90 分钟，形式为在 QQ 群内逐题发布并限时提交。',
      facts: [
        { k: '比赛时间', v: '2019-07-15 20:00（UTC+8）· 约 90 分钟' },
        { k: '比赛形式', v: 'QQ 群内逐题发布 · 限时提交' }
      ],
      archive: {
        file: '第一届见证者群比赛.zip',
        size: '3.0 MB',
        label: '下载第一届原始资料包',
        note: '包含全部题目、机制说明、定分表与规则文档（.zip）'
      },
      puzzles: [
        { id: 'A101', name: 'A101', group: 'A1', file: '题目/A101.png' },
        { id: 'A102', name: 'A102', group: 'A1', file: '题目/A102.png' },
        { id: 'A103', name: 'A103', group: 'A1', file: '题目/A103.png' },
        { id: 'A104', name: 'A104', group: 'A1', file: '题目/A104.jpg' },
        { id: 'A105', name: 'A105', group: 'A1', file: '题目/A105.png' },
        { id: 'A106', name: 'A106', group: 'A1', file: '题目/A106.png' },

        { id: 'A201', name: 'A201', group: 'A2', file: '题目/A201.png' },
        { id: 'A202复现', name: 'A202复现', group: 'A2', file: '题目/A202复现.png' },
        { id: 'A203', name: 'A203', group: 'A2', file: '题目/A203.jpg' },
        { id: 'A204', name: 'A204', group: 'A2', file: '题目/A204.png' },
        { id: 'A205单骑', name: 'A205单骑', group: 'A2', file: '题目/A205单骑.png' },
        { id: 'A206', name: 'A206', group: 'A2', file: '题目/A206.jpg' },

        { id: 'A301三角篱笆', name: 'A301三角篱笆', group: 'A3', file: '题目/A301三角篱笆.png' },
        { id: 'A302', name: 'A302', group: 'A3', file: '题目/A302.jpg' },
        { id: 'A303', name: 'A303', group: 'A3', file: '题目/A303.png' },

        { id: 'A401', name: 'A401', group: 'A4', file: '题目/A401.png' },
        { id: 'A501重构', name: 'A501重构', group: 'A5', file: '题目/A501重构.png' },
        { id: 'AT01', name: 'AT01', group: 'AT', file: '题目/AT01.png' },

        { id: 'B101', name: 'B101', group: 'B1', file: '题目/B101.jpg' },
        { id: 'B102', name: 'B102', group: 'B1', file: '题目/B102.jpg' },
        { id: 'B103', name: 'B103', group: 'B1', file: '题目/B103.jpg' },
        { id: 'B104', name: 'B104', group: 'B1', file: '题目/B104.jpg' },
        { id: 'B105', name: 'B105', group: 'B1', file: '题目/B105.jpg' },
        { id: 'B106', name: 'B106', group: 'B1', file: '题目/B106.png' },

        { id: 'B201', name: 'B201', group: 'B2', file: '题目/B201.jpg' },
        { id: 'B202', name: 'B202', group: 'B2', file: '题目/B202.jpg' },
        { id: 'B203', name: 'B203', group: 'B2', file: '题目/B203.jpg' },
        { id: 'B204中心', name: 'B204中心', group: 'B2', file: '题目/B204中心.jpg' },
        { id: 'B205渐远', name: 'B205渐远', group: 'B2', file: '题目/B205渐远.png' },

        { id: 'B301', name: 'B301', group: 'B3', file: '题目/B301.jpg' },
        { id: 'B302', name: 'B302', group: 'B3', file: '题目/B302.jpg' },

        { id: 'B401围城', name: 'B401围城', group: 'B4', file: '题目/B401围城.png' },
        { id: 'B402', name: 'B402', group: 'B4', file: '题目/B402.png' },

        { id: 'BT03', name: 'BT03', group: 'BT', file: '题目/BT03.png' },

        { id: '压轴12合掌', name: '压轴12合掌', group: '压轴', file: '题目/压轴12合掌.jpg' }
      ]
    }
  ]
};

/* 作答记录保存在浏览器本地，键名在各页面之间共用。 */
window.WC_answerKey = function (seasonId, puzzleId) {
  return 'wc-answer-' + seasonId + '-' + puzzleId;
};
