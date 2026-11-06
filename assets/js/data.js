/* 见联会存档 · 站点数据
 * 纯静态站点，无需构建。新增一届比赛时，在 seasons 里追加一个对象，
 * 并把题目、机制图片放进对应的 wcN/ 目录即可。
 *
 * 届次字段：
 *   short    用于「出现轮次」按钮的文字，如「第3届样卷」
 *   facts    赛制信息卡片；样卷之类没有举办时间的，只写发布时间与性质
 *
 * 机制字段（站点级，不隶属于某一届）：
 *   page     机制页路径（相对站点根目录）
 *   note     机制页上「规则」上方的一句话说明，留空则不显示
 *   related  相关机制 id 数组，单向声明（A 指向 B 不代表 B 指向 A）
 *   seasons  出现轮次，填该机制出现过的届次 id，机制页据此生成「出现轮次」按钮
 */
window.WC_DATA = {
  site: {
    name: '见联会',
    tagline: '见证者玩家社群 · 解谜竞赛档案',
    intro: '这里存档「见联会」历届比赛的时间、赛制、原创机制与全部题目。',
    updated: '2026-11-06'
  },

  mechanisms: [
    {
      id: 'ring',
      name: '圆环',
      image: 'wc1/机制/圆环.png',
      page: 'mechanism/圆环.html',
      note: '第1届见联会原创机制',
      tagline: '复制同区域内的一个符号，但不复制它的颜色',
      rule: [
        '必须复制同区域内的一个其它符号（同区域无其它符号则报错），但不复制其颜色。',
        '题目中不会出现超过一个圆环。'
      ],
      related: ['dot'],
      seasons: ['wc1', 'wc2']
    },
    {
      id: 'dot',
      name: '实心圆',
      image: 'wc1/机制/实心圆.png',
      page: 'mechanism/实心圆.html',
      note: '第1届见联会原创机制',
      tagline: '在圆环之后结算，变成圆环复制的符号',
      rule: [
        '只会和圆环一起出现。',
        '在圆环之后结算，均变成圆环复制的符号（保留自己的颜色）。'
      ],
      related: ['ring'],
      seasons: ['wc1', 'wc2']
    },
    {
      id: 'resist',
      name: '反抗体',
      image: 'wc2/机制/反抗体.png',
      page: 'mechanism/反抗体.html',
      note: '第2届见联会原创机制，以赛中阅读文本形式给出',
      tagline: '空心抗体可消除区域外的一个错误符号',
      rule: [
        '空心抗体为反抗体，它可以且必须消除自己所在区域外的一个错误符号。'
      ],
      related: [],
      seasons: ['wc2']
    },
    {
      id: 'num',
      name: '数方',
      image: 'wc2/机制/数方.png',
      page: 'mechanism/数方.html',
      note: '第2届见联会原创机制，以赛中阅读文本形式给出',
      tagline: '带圈数字表示所在区域的面积',
      rule: [
        '带圆圈的数字为数方，数字表示所在区域的面积，同区域的多个数方数字会叠加。'
      ],
      related: [],
      seasons: ['wc2']
    },
    {
      id: 'flip',
      name: '翻转俄方',
      image: 'wc2/机制/翻转俄方.png',
      page: 'mechanism/翻转俄方.html',
      note: '第2届见联会原创机制，以赛中阅读文本形式给出，仅在题目说明时使用',
      tagline: '绿色的俄方不能旋转，但可至多翻转一次',
      rule: [
        '定义绿色的俄方为翻转俄方，它不能旋转，但可以进行至多一次水平或竖直翻转。'
      ],
      related: [],
      seasons: ['wc2']
    },
    {
      id: 'climit',
      name: '色限',
      image: null,
      page: 'mechanism/色限.html',
      note: '第2届见联会原创机制，以赛中阅读文本形式给出，仅在题目说明时使用',
      tagline: '浅蓝 / 黄色符号所在格须被同色线经过',
      rule: [
        '题目为双线对称且两条线的颜色分别为浅蓝和黄，题目中的浅蓝/黄色符号所在格子周围必须被至少一条同色线经过且不被异色线经过。'
      ],
      related: [],
      seasons: ['wc2']
    },
    {
      id: 'cloud',
      name: '云终端',
      image: 'wc3pre/机制/云终端.png',
      page: 'mechanism/云终端.html',
      note: '第3届见联会样卷原创机制',
      tagline: '消除阶段开头，把一格与自身分离进云区域',
      rule: [
        '在消除阶段开头，云终端以任意顺序发生效果：选取一个所在区域的格子，将这格和云终端所在的格子从原先的区域中分离并放入该颜色的「云区域」中，该操作不会切割原先区域中的其他格子。',
        '云终端必须发生作用，否则会报错。'
      ],
      related: [],
      seasons: ['wc3pre']
    },
    {
      id: 'choice',
      name: '抉择点',
      image: 'wc3pre/机制/抉择点.png',
      page: 'mechanism/抉择点.html',
      note: '第3届见联会样卷原创机制，以赛中阅读文本形式给出',
      tagline: '含 n 个三角的抉择点中恰好有 n 个被经过',
      rule: [
        '在盘面中所有包含 n 个三角的抉择点中恰好有 n 个被经过。'
      ],
      related: [],
      seasons: ['wc3pre']
    },
    {
      id: 'vaccine',
      name: '疫苗元素',
      image: 'wc3pre/机制/疫苗元素.png',
      page: 'mechanism/疫苗元素.html',
      note: '第3届见联会样卷原创机制，以赛中阅读文本形式给出',
      tagline: '抗体消除之后，带有疫苗元素的符号消除自身',
      rule: [
        '带有疫苗元素的符号在消除阶段中，抗体消除之后消除自身。',
        '疫苗元素视为其他符号的词缀，不视为单独的元素。'
      ],
      related: [],
      seasons: ['wc3pre']
    }
  ],

  seasons: [
    {
      id: 'wc1',
      no: 1,
      dir: 'wc1',
      title: '第1届见联会',
      short: '第1届',
      date: '2019-07-15',
      time: '20:00',
      duration: '约 90 分钟',
      format: 'QQ 群内逐题发布，限时提交',
      facts: [
        { k: '比赛时间', v: '2019-07-15 20:00（UTC+8）· 约 90 分钟' },
        { k: '比赛形式', v: 'QQ 群内逐题发布 · 限时提交' }
      ],
      archive: {
        file: '第一届见证者群比赛.zip',
        label: '下载第1届原始资料包'
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
    },

    {
      id: 'wc2',
      no: 2,
      dir: 'wc2',
      title: '第2届见联会',
      short: '第2届',
      date: '2019-10-05',
      time: '晚',
      duration: '约 90 分钟',
      format: 'QQ 群内逐章发布，限时提交',
      facts: [
        { k: '比赛时间', v: '2019-10-05 晚（UTC+8）· 约 90 分钟' },
        { k: '比赛形式', v: 'QQ 群内逐章发布 · A–D 章各 15 分钟，压轴 20 分钟' }
      ],
      archive: {
        file: '第二届见证者群比赛.zip',
        label: '下载第2届原始资料包'
      },
      puzzles: [
        { id: 'A01', name: 'A01', group: 'A卷', file: '题目/A卷/A01.png' },
        { id: 'A02', name: 'A02', group: 'A卷', file: '题目/A卷/A02.png' },
        { id: 'A03', name: 'A03', group: 'A卷', file: '题目/A卷/A03.jpg' },
        { id: 'A04初见', name: 'A04初见', group: 'A卷', file: '题目/A卷/A04初见.png' },
        { id: 'A05', name: 'A05', group: 'A卷', file: '题目/A卷/A05.jpg' },
        { id: 'A06', name: 'A06', group: 'A卷', file: '题目/A卷/A06.jpg' },
        { id: 'A07', name: 'A07', group: 'A卷', file: '题目/A卷/A07.png' },
        { id: 'A08双生', name: 'A08双生', group: 'A卷', file: '题目/A卷/A08双生.png' },
        { id: 'A09三个三', name: 'A09三个三', group: 'A卷', file: '题目/A卷/A09三个三.png' },

        { id: 'B反抗1', name: 'B反抗1', group: 'B卷', file: '题目/B卷/B反抗1.jpg' },
        { id: 'B反抗2', name: 'B反抗2', group: 'B卷', file: '题目/B卷/B反抗2.jpg' },
        { id: 'B数方1', name: 'B数方1', group: 'B卷', file: '题目/B卷/B数方1.jpg' },
        { id: 'B数方2', name: 'B数方2', group: 'B卷', file: '题目/B卷/B数方2.jpg' },
        {
          id: 'B竹林',
          name: 'B竹林',
          group: 'B卷',
          file: '题目/B卷/B竹林.jpg',
          note: '含有音频附件，点的顺序为大中小中小 或 小中大中小'
        },
        { id: 'B翻转1', name: 'B翻转1', group: 'B卷', file: '题目/B卷/B翻转1.jpg' },
        { id: 'B翻转2', name: 'B翻转2', group: 'B卷', file: '题目/B卷/B翻转2.jpg' },
        { id: 'B色限1', name: 'B色限1', group: 'B卷', file: '题目/B卷/B色限1.jpg' },
        { id: 'B色限2', name: 'B色限2', group: 'B卷', file: '题目/B卷/B色限2.jpg' },

        { id: 'C01', name: 'C01', group: 'C卷', file: '题目/C卷/C01.png' },
        { id: 'C02升维复现', name: 'C02升维复现', group: 'C卷', file: '题目/C卷/C02升维复现.png' },
        { id: 'C03增长', name: 'C03增长', group: 'C卷', file: '题目/C卷/C03增长.png' },
        { id: 'C04', name: 'C04', group: 'C卷', file: '题目/C卷/C04.png' },
        { id: 'C05九符清一色', name: 'C05九符清一色', group: 'C卷', file: '题目/C卷/C05九符清一色.png' },
        { id: 'C06', name: 'C06', group: 'C卷', file: '题目/C卷/C06.png' },
        { id: 'C07', name: 'C07', group: 'C卷', file: '题目/C卷/C07.png' },
        { id: 'C08', name: 'C08', group: 'C卷', file: '题目/C卷/C08.png' },
        { id: 'C09回旋镖', name: 'C09回旋镖', group: 'C卷', file: '题目/C卷/C09回旋镖.jpg' },

        { id: 'D01', name: 'D01', group: 'D卷', file: '题目/D卷/D01.png' },
        { id: 'D02演化', name: 'D02演化', group: 'D卷', file: '题目/D卷/D02演化.png' },
        { id: 'D03冰雪三色', name: 'D03冰雪三色', group: 'D卷', file: '题目/D卷/D03冰雪三色.jpg' },
        { id: 'D04', name: 'D04', group: 'D卷', file: '题目/D卷/D04.png' },
        { id: 'D05', name: 'D05', group: 'D卷', file: '题目/D卷/D05.png' },
        { id: 'D06', name: 'D06', group: 'D卷', file: '题目/D卷/D06.png' },
        { id: 'D07', name: 'D07', group: 'D卷', file: '题目/D卷/D07.png' },
        { id: 'D08', name: 'D08', group: 'D卷', file: '题目/D卷/D08.png' },
        { id: 'D09超量', name: 'D09超量', group: 'D卷', file: '题目/D卷/D09超量.png' },

        { id: '压轴 插接', name: '压轴 插接', group: '压轴', file: '题目/压轴 插接.png' }
      ]
    },

    {
      id: 'wc3pre',
      no: 3,
      dir: 'wc3pre',
      title: '第3届见联会样卷',
      short: '第3届样卷',
      date: '2020-01-30',
      time: '',
      duration: '',
      format: '随第3届见联会发布的样卷，非正式比赛',
      facts: [
        { k: '发布时间', v: '2020-01-30' },
        { k: '性质', v: '随第3届见联会发布的样卷，非正式比赛' }
      ],
      puzzles: [
        { id: '11射影几何', name: '11射影几何', group: '第1部分', file: '题目/11射影几何.png' },
        { id: '12墙头水渍', name: '12墙头水渍', group: '第1部分', file: '题目/12墙头水渍.png' },
        { id: '13九子不同', name: '13九子不同', group: '第1部分', file: '题目/13九子不同.png' },
        { id: '14环城高速', name: '14环城高速', group: '第1部分', file: '题目/14环城高速.png' },

        { id: '21位置', name: '21位置', group: '第2部分', file: '题目/21位置.png' },
        { id: '21颜色', name: '21颜色', group: '第2部分', file: '题目/21颜色.png' },
        { id: '22抉择点', name: '22抉择点', group: '第2部分', file: '题目/22抉择点.png' },
        { id: '22疫苗元素', name: '22疫苗元素', group: '第2部分', file: '题目/22疫苗元素.png' },

        { id: '31多孔材料', name: '31多孔材料', group: '第3部分', file: '题目/31多孔材料.png' },
        { id: '32暴雨', name: '32暴雨', group: '第3部分', file: '题目/32暴雨.png' },
        { id: '33飞地', name: '33飞地', group: '第3部分', file: '题目/33飞地.png' },
        { id: '34矩阵', name: '34矩阵', group: '第3部分', file: '题目/34矩阵.png' },

        { id: '41压轴', name: '41压轴', group: '第4部分', file: '题目/41压轴.png' },
        { id: '42大轴', name: '42大轴', group: '第4部分', file: '题目/42大轴.png' }
      ]
    }
  ]
};

/* 作答记录保存在浏览器本地，键名在各页面之间共用。 */
window.WC_answerKey = function (seasonId, puzzleId) {
  return 'wc-answer-' + seasonId + '-' + puzzleId;
};
