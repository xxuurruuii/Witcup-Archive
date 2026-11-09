/* 见联会存档 · 站点数据
 * 纯静态站点，无需构建。新增一届比赛时，在 seasons 里追加一个对象，
 * 并把题目、机制图片放进对应的 wcN/ 目录即可。
 *
 * 届次字段：
 *   short    用于「出现轮次」按钮的文字，如「第3届样卷」
 *   no       首页按此倒序；相同时保持 seasons 中的先后（第3届在前，样卷在后）
 *   date     首页卡片上的日期，留空则显示「无」
 *   archive  原始资料包（可选）：url 为 GitHub Release 附件地址，label 为按钮说明
 *   facts    赛制信息卡片；样卷之类没有举办时间的，时间写「无」
 *   links    相关链接（可选）：{ label, url, primary }，primary 的用实心按钮
 *   spoilerMechanisms  为 true 时，自定义机制卡片的名称与简介默认被剧透条盖住
 *
 * 机制字段（站点级，不隶属于某一届）：
 *   page     机制页路径（相对站点根目录）
 *   note     机制页上「规则」上方的一句话说明，留空则不显示
 *   related  相关机制 id 数组，单向声明（A 指向 B 不代表 B 指向 A）
 *   seasons  出现轮次，填该机制出现过的届次 id，机制页据此生成「出现轮次」按钮
 */
/* 第4届第2章的所有题目共用同一条备注，抽成常量避免重复。 */
const CHAPTER2_NOTE = '此章节的所有符号均隐藏，需要通过报错猜测符号';

window.WC_DATA = {
  site: {
    name: '见联会',
    tagline: '见证者玩家社群 · 解谜竞赛档案',
    intro: '这里存档「见联会」历届比赛的时间、赛制、原创机制与全部题目。',
    updated: '2026-11-08'
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
        '在消除阶段开头，云终端以任意顺序发生效果：选取一个所在区域的格子，将这格和云终端所在的格子从原先的区域中分离并放入该颜色的“云区域”中，该操作不会切割原先区域中的其他格子。云终端发生作用时不能处于自身颜色对应的云区域中。云终端必须发生作用，否则会报错。'
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
    },
    {
      id: 'twopoint',
      name: '二重点',
      image: 'wc3/机制/二重点.png',
      page: 'mechanism/二重点.html',
      note: '第3届见联会原创机制',
      tagline: '二重点可以且必须经过两次',
      rule: [
        '二重点可以且必须经过两次。'
      ],
      related: [],
      seasons: ['wc3']
    },
    {
      id: 'phagocyte',
      name: '吞噬细胞',
      image: 'wc3/机制/吞噬细胞.png',
      page: 'mechanism/吞噬细胞.html',
      note: '第3届见联会原创机制',
      tagline: '所在区域符号全部报错时，消除整区符号',
      rule: [
        '在消除阶段开头，若吞噬细胞所在区域所有符号均报错，则消除区域内所有符号，否则不消除并报错。'
      ],
      related: [],
      seasons: ['wc3']
    },
    {
      id: 'antigen',
      name: '抗原',
      image: 'wc3/机制/抗原.png',
      page: 'mechanism/抗原.html',
      note: '第3届见联会原创机制',
      tagline: '可以且必须消除同区域一个正确符号',
      rule: [
        '在消除阶段，抗原可以且必须消除同区域一个正确符号。'
      ],
      related: [],
      seasons: ['wc3']
    },
    {
      id: 'fractal',
      name: '分形格',
      image: 'wc3/机制/分形格.png',
      page: 'mechanism/分形格.html',
      note: '第3届见联会原创机制，仅在第3届特定题目中使用',
      tagline: '选定起点与终点后变成传送门，把起点传送到终点',
      rule: [
        '分形格是一块与题板相同形状不同大小的范围，玩家选定题板的起点与终点后，分形格将转换为传送门，将对应的起点传送到对应的终点，此时两个点都视为被经过。传送门允许不被线条经过，但线条经过时必定被传送。除了这两点之外的位置没有其他限制。',
        '对于双线题目，分形格要么被两条线都经过，要么都不经过。有时分形格之间有重叠，会通过给格子涂不同颜色来表示。'
      ],
      related: [],
      seasons: ['wc3']
    },
    {
      id: 'congruent',
      name: '全等俄方',
      image: 'wc4/机制/全等俄方.png',
      page: 'mechanism/全等俄方.html',
      note: '第4届见联会原创机制，以赛中猜规则形式给出',
      tagline: '区域可由与本符号数量相同的全等俄方拼成',
      rule: [
        '含有全等俄方的区域至少包含两个此符号，该区域的形状可以由与区域内此符号数量相同的全等的俄方拼成，斜的此符号允许旋转。',
        '不与普通俄方共享判定。'
      ],
      related: [],
      seasons: ['wc4']
    },
    {
      id: 'pushblock',
      name: '可推动符号',
      image: 'wc4/机制/可推动符号.png',
      page: 'mechanism/可推动符号.html',
      note: '第4届见联会原创机制，以赛中猜规则形式给出',
      tagline: '带框符号可被画线推动，在最终位置发挥作用',
      rule: [
        '带有框的符号可以被画线推动，允许多推，若无法推动则会阻挡画线。',
        '被推动的符号将在最终位置发挥作用。'
      ],
      related: ['boxpoint'],
      seasons: ['wc4']
    },
    {
      id: 'enlarge',
      name: '放大俄方',
      image: 'wc4/机制/放大俄方.png',
      page: 'mechanism/放大俄方.html',
      note: '第4届见联会原创机制，以赛中猜规则形式给出',
      tagline: '使同区域的一个俄方大小放大一倍',
      rule: [
        '选取一个同区域的俄方或空心俄方，使其大小放大一倍。'
      ],
      related: [],
      seasons: ['wc4']
    },
    {
      id: 'boxpoint',
      name: '箱子必经点',
      image: 'wc4/机制/箱子必经点.png',
      page: 'mechanism/箱子必经点.html',
      note: '第4届见联会原创机制，以赛中猜规则形式给出',
      tagline: '品红色的必经点需要有伙伴方块占据',
      rule: [
        '品红色的必经点需要有伙伴方块（带有爱心的可移动符号）占据。'
      ],
      related: ['pushblock'],
      seasons: ['wc4']
    },
    {
      id: 'linesplit',
      name: '线分裂',
      image: 'wc4/机制/线分裂.png',
      page: 'mechanism/线分裂.html',
      note: '第4届见联会原创机制，以赛中猜规则形式给出',
      tagline: '画线经过时向两侧分裂成两条对称的线',
      rule: [
        '画线经过此处时向两侧分裂成两条线，两条线关于进入此处的线段对称。'
      ],
      related: [],
      seasons: ['wc4']
    },
    {
      id: 'newpath',
      name: '新路径点',
      image: 'wc5/机制/新路径点.png',
      page: 'mechanism/新路径点.html',
      note: '第5届见联会原创机制，以赛中猜规则形式给出',
      tagline: '恰有一种颜色的点全部被经过',
      rule: [
        '对于多种颜色的新路径点，恰有一种颜色的全部点被经过，其他颜色的点均不经过。'
      ],
      related: [],
      seasons: ['wc5']
    },
    {
      id: 'newcolor',
      name: '新色块',
      image: 'wc5/机制/新色块.png',
      page: 'mechanism/新色块.html',
      note: '第5届见联会原创机制，以赛中猜规则形式给出',
      tagline: '相同颜色的新色块不能处于同一区域',
      rule: [
        '相同颜色的新色块不能处于同一区域。不同颜色的新色块不作要求。'
      ],
      related: [],
      seasons: ['wc5']
    },
    {
      id: 'newocto',
      name: '新八角星',
      image: 'wc5/机制/新八角星.png',
      page: 'mechanism/新八角星.html',
      note: '第5届见联会原创机制，以赛中猜规则形式给出',
      tagline: '所在区域恰有另外两个与自身同色的符号',
      rule: [
        '新八角星所在的区域恰有另外两个与自身颜色相同的符号。'
      ],
      related: [],
      seasons: ['wc5']
    },
    {
      id: 'newpoly',
      name: '新俄方',
      image: 'wc5/机制/新俄方.png',
      page: 'mechanism/新俄方.html',
      note: '第5届见联会原创机制，以赛中猜规则形式给出',
      tagline: '区域空白格的形状可由区域内俄方拼出',
      rule: [
        '新俄方所在区域的空格形状能由该区域的俄方拼出。',
        '斜的新俄方允许形状旋转，空心的新俄方是消除一层。'
      ],
      related: [],
      seasons: ['wc5']
    },
    {
      id: 'newanti',
      name: '新抗体',
      image: 'wc5/机制/新抗体.png',
      page: 'mechanism/新抗体.html',
      note: '第5届见联会原创机制，以赛中猜规则形式给出',
      tagline: '使区域内一类未全部报错的符号改用原版判定',
      rule: [
        '新抗体使所在区域内的一类没有全部不报错的符号改为使用原版判定。',
        '新抗体生效后不会消失。'
      ],
      related: [],
      seasons: ['wc5']
    },
    {
      id: 'newtri',
      name: '新三角',
      image: 'wc5/机制/新三角.png',
      page: 'mechanism/新三角.html',
      note: '第5届见联会原创机制，以赛中猜规则形式给出',
      tagline: '数字表示所在格四个顶点被经过的数量',
      rule: [
        '新三角的个数表示所在格四个顶点被经过的数量。'
      ],
      related: [],
      seasons: ['wc5']
    },
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
        url: 'https://github.com/xxuurruuii/Witcup-Archive/releases/download/wc1/wc1.zip',
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
        url: 'https://github.com/xxuurruuii/Witcup-Archive/releases/download/wc2/wc2.zip',
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
      id: 'wc3',
      no: 3,
      dir: 'wc3',
      title: '第3届见联会',
      short: '第3届',
      date: '2020-01-30',
      time: '晚',
      duration: '约 90 分钟',
      format: 'QQ 群内逐章发布，限时提交',
      facts: [
        { k: '比赛时间', v: '2020-01-30 晚（UTC+8）· 约 90 分钟' },
        { k: '比赛形式', v: 'QQ 群内逐章发布 · 四部分依次 20、15、20、25 分钟' }
      ],
      archive: {
        url: 'https://github.com/xxuurruuii/Witcup-Archive/releases/download/wc3/wc3.zip',
        label: '下载第3届原始资料包'
      },
      puzzles: [
        { id: '11', name: '11', group: '第1部分', file: '题目/11.png' },
        { id: '12', name: '12', group: '第1部分', file: '题目/12.png' },
        { id: '13', name: '13', group: '第1部分', file: '题目/13.png' },
        { id: '14', name: '14', group: '第1部分', file: '题目/14.png' },
        { id: '15', name: '15', group: '第1部分', file: '题目/15.png' },
        { id: '16', name: '16', group: '第1部分', file: '题目/16.png' },
        { id: '17', name: '17', group: '第1部分', file: '题目/17.png' },
        { id: '18', name: '18', group: '第1部分', file: '题目/18.png' },

        { id: '21同步', name: '21同步', group: '第2部分', file: '题目/21同步.png' },
        { id: '21挡板', name: '21挡板', group: '第2部分', file: '题目/21挡板.png' },
        { id: '21点断', name: '21点断', group: '第2部分', file: '题目/21点断.png' },
        { id: '22二重点', name: '22二重点', group: '第2部分', file: '题目/22二重点.png' },
        { id: '22吞噬细胞', name: '22吞噬细胞', group: '第2部分', file: '题目/22吞噬细胞.png' },
        { id: '22抗原', name: '22抗原', group: '第2部分', file: '题目/22抗原.png' },

        { id: '31', name: '31', group: '第3部分', file: '题目/31.png' },
        { id: '32', name: '32', group: '第3部分', file: '题目/32.png' },
        { id: '33', name: '33', group: '第3部分', file: '题目/33.png' },
        { id: '34', name: '34', group: '第3部分', file: '题目/34.png' },
        { id: '35', name: '35', group: '第3部分', file: '题目/35.png' },
        { id: '36', name: '36', group: '第3部分', file: '题目/36.png' },
        { id: '37', name: '37', group: '第3部分', file: '题目/37.png' },
        { id: '38', name: '38', group: '第3部分', file: '题目/38.png' },

        { id: '41压轴', name: '41压轴', group: '第4部分', file: '题目/41压轴.png' },
        { id: '42大轴', name: '42大轴', group: '第4部分', file: '题目/42大轴.png' }
      ]
    },

    {
      id: 'wc3pre',
      no: 3,
      dir: 'wc3pre',
      title: '第3届见联会样卷',
      short: '第3届样卷',
      date: '',
      time: '',
      duration: '',
      format: '随第3届见联会发布的样卷，非正式比赛',
      facts: [
        { k: '时间', v: '无' },
        { k: '形式', v: '非正式比赛' }
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
    },

    {
      id: 'wc4',
      no: 4,
      dir: 'wc4',
      title: '第4届见联会 Meant To Be A Witness Clone',
      short: '第4届',
      date: '2020-02-23',
      time: '晚',
      duration: '',
      format: '客户端内进行，互动式猜规则',
      spoilerMechanisms: true,
      facts: [
        { k: '比赛时间', v: '2020-02-23 晚（UTC+8）' },
        { k: '比赛形式', v: '首次引入客户端 · 互动式猜规则' }
      ],
      links: [
        {
          label: '打开互动版本',
          url: 'https://html-classic.itch.zone/html/20362935/index.html?v=1794121388',
          primary: true
        },
        {
          label: 'itch.io 页面',
          url: 'https://artless.itch.io/meant-to-be-a-witness-clone'
        }
      ],
      puzzles: [
        { id: '1-1', name: '1-1', group: '第1章', file: '题目/1-1.png' },
        { id: '1-2', name: '1-2', group: '第1章', file: '题目/1-2.png' },
        { id: '1-3', name: '1-3', group: '第1章', file: '题目/1-3.png' },
        { id: '1-4', name: '1-4', group: '第1章', file: '题目/1-4.png' },
        { id: '1-5', name: '1-5', group: '第1章', file: '题目/1-5.png' },
        { id: '1-6', name: '1-6', group: '第1章', file: '题目/1-6.png' },
        { id: '1-7', name: '1-7', group: '第1章', file: '题目/1-7.png' },

        { id: '2-1', name: '2-1', group: '第2章', file: '题目/2-1.png', note: CHAPTER2_NOTE },
        { id: '2-2', name: '2-2', group: '第2章', file: '题目/2-2.png', note: CHAPTER2_NOTE },
        { id: '2-3', name: '2-3', group: '第2章', file: '题目/2-3.png', note: CHAPTER2_NOTE },
        { id: '2-4', name: '2-4', group: '第2章', file: '题目/2-4.png', note: CHAPTER2_NOTE },
        { id: '2-5', name: '2-5', group: '第2章', file: '题目/2-5.png', note: CHAPTER2_NOTE },
        { id: '2-6', name: '2-6', group: '第2章', file: '题目/2-6.png', note: CHAPTER2_NOTE },

        { id: '3-1', name: '3-1', group: '第3章', file: '题目/3-1.png' },
        { id: '3-2', name: '3-2', group: '第3章', file: '题目/3-2.png' },
        { id: '3-3', name: '3-3', group: '第3章', file: '题目/3-3.png' },
        { id: '3-4', name: '3-4', group: '第3章', file: '题目/3-4.png' },
        { id: '3-5', name: '3-5', group: '第3章', file: '题目/3-5.png' },
        { id: '3-6', name: '3-6', group: '第3章', file: '题目/3-6.png' },
        { id: '3-7', name: '3-7', group: '第3章', file: '题目/3-7.png' },
        { id: '3-8', name: '3-8', group: '第3章', file: '题目/3-8.png' },
        { id: '3-9', name: '3-9', group: '第3章', file: '题目/3-9.png' },
        { id: '3-10', name: '3-10', group: '第3章', file: '题目/3-10.png' },
        { id: '3-11', name: '3-11', group: '第3章', file: '题目/3-11.png' },
        { id: '3-12', name: '3-12', group: '第3章', file: '题目/3-12.png' },

        { id: '4-1', name: '4-1', group: '第4章', file: '题目/4-1.png' },
        { id: '4-2', name: '4-2', group: '第4章', file: '题目/4-2.png' },
        { id: '4-3', name: '4-3', group: '第4章', file: '题目/4-3.png' },
        { id: '4-4', name: '4-4', group: '第4章', file: '题目/4-4.png' },
        { id: '4-5', name: '4-5', group: '第4章', file: '题目/4-5.png' },
        { id: '4-6', name: '4-6', group: '第4章', file: '题目/4-6.png' },

        { id: '5-1', name: '5-1', group: '第5章', file: '题目/5-1.png' },
        { id: '5-2', name: '5-2', group: '第5章', file: '题目/5-2.png' },
        { id: '5-3', name: '5-3', group: '第5章', file: '题目/5-3.png' },
        { id: '5-4', name: '5-4', group: '第5章', file: '题目/5-4.png' },
        { id: '5-5', name: '5-5', group: '第5章', file: '题目/5-5.png' },
        { id: '5-6', name: '5-6', group: '第5章', file: '题目/5-6.png' },
        { id: '5-7', name: '5-7', group: '第5章', file: '题目/5-7.png' },
        { id: '5-8', name: '5-8', group: '第5章', file: '题目/5-8.png' },
        { id: '5-9', name: '5-9', group: '第5章', file: '题目/5-9.png' },
        { id: '5-10', name: '5-10', group: '第5章', file: '题目/5-10.png' },
        { id: '5-11', name: '5-11', group: '第5章', file: '题目/5-11.png' },
        { id: '5-12', name: '5-12', group: '第5章', file: '题目/5-12.png' },
        { id: '5-13', name: '5-13', group: '第5章', file: '题目/5-13.png' },

        { id: '6-1', name: '6-1', group: '第6章', file: '题目/6-1.png' },
        { id: '6-2', name: '6-2', group: '第6章', file: '题目/6-2.png' },
        { id: '6-3', name: '6-3', group: '第6章', file: '题目/6-3.png' },
        { id: '6-4', name: '6-4', group: '第6章', file: '题目/6-4.png' },
        { id: '6-5', name: '6-5', group: '第6章', file: '题目/6-5.png' },
        { id: '6-6', name: '6-6', group: '第6章', file: '题目/6-6.png' },
        { id: '6-7', name: '6-7', group: '第6章', file: '题目/6-7.png' },
        { id: '6-8', name: '6-8', group: '第6章', file: '题目/6-8.png' },
        { id: '6-9', name: '6-9', group: '第6章', file: '题目/6-9.png' }
      ]
    },
    {
      id: 'wc5',
      no: 5,
      dir: 'wc5',
      title: '第5届见联会 Meant To Be A Witness Clone 2',
      short: '第5届',
      date: '2020-08-08',
      time: '晚',
      duration: '',
      format: '客户端内进行，交互式猜规则',
      spoilerMechanisms: true,
      facts: [
        { k: '比赛时间', v: '2020-08-08 晚（UTC+8）' },
        { k: '比赛形式', v: '客户端内进行 · 互动式猜规则' }
      ],
      links: [
        {
          label: '打开互动版本',
          url: 'https://html-classic.itch.zone/html/20366691/index.html?v=1794134752',
          primary: true
        },
        {
          label: 'itch.io 页面',
          url: 'https://artless.itch.io/meant-to-be-a-witness-clone-2-not-witness'
        }
      ],
      puzzles: [
        { id: '1-1', name: '1-1', group: '第1章', file: '题目/1-1.png' },
        { id: '1-2', name: '1-2', group: '第1章', file: '题目/1-2.png' },
        { id: '1-3', name: '1-3', group: '第1章', file: '题目/1-3.png' },
        { id: '1-4', name: '1-4', group: '第1章', file: '题目/1-4.png' },
        { id: '1-5', name: '1-5', group: '第1章', file: '题目/1-5.png' },
        { id: '1-6', name: '1-6', group: '第1章', file: '题目/1-6.png' },
        { id: '1-7', name: '1-7', group: '第1章', file: '题目/1-7.png' },

        { id: '2-1', name: '2-1', group: '第2章', file: '题目/2-1.png' },
        { id: '2-2', name: '2-2', group: '第2章', file: '题目/2-2.png' },
        { id: '2-3', name: '2-3', group: '第2章', file: '题目/2-3.png' },
        { id: '2-4', name: '2-4', group: '第2章', file: '题目/2-4.png' },
        { id: '2-5', name: '2-5', group: '第2章', file: '题目/2-5.png' },
        { id: '2-6', name: '2-6', group: '第2章', file: '题目/2-6.png' },
        { id: '2-7', name: '2-7', group: '第2章', file: '题目/2-7.png' },
        { id: '2-8', name: '2-8', group: '第2章', file: '题目/2-8.png' },
        { id: '2-9', name: '2-9', group: '第2章', file: '题目/2-9.png' },
        { id: '2-10', name: '2-10', group: '第2章', file: '题目/2-10.png' },
        { id: '2-11', name: '2-11', group: '第2章', file: '题目/2-11.png' },
        { id: '2-12', name: '2-12', group: '第2章', file: '题目/2-12.png' },
        { id: '2-13', name: '2-13', group: '第2章', file: '题目/2-13.png' },
        { id: '2-14', name: '2-14', group: '第2章', file: '题目/2-14.png' },
        { id: '2-15', name: '2-15', group: '第2章', file: '题目/2-15.png' },

        { id: '3-1', name: '3-1', group: '第3章', file: '题目/3-1.png' },
        { id: '3-2', name: '3-2', group: '第3章', file: '题目/3-2.png' },
        { id: '3-3', name: '3-3', group: '第3章', file: '题目/3-3.png' },
        { id: '3-4', name: '3-4', group: '第3章', file: '题目/3-4.png' },
        { id: '3-5', name: '3-5', group: '第3章', file: '题目/3-5.png' },
        { id: '3-6', name: '3-6', group: '第3章', file: '题目/3-6.png' },
        { id: '3-7', name: '3-7', group: '第3章', file: '题目/3-7.png' },
        { id: '3-8', name: '3-8', group: '第3章', file: '题目/3-8.png' },
        { id: '3-9', name: '3-9', group: '第3章', file: '题目/3-9.png' },
        { id: '3-10', name: '3-10', group: '第3章', file: '题目/3-10.png' },
        { id: '3-11', name: '3-11', group: '第3章', file: '题目/3-11.png' },
        { id: '3-12', name: '3-12', group: '第3章', file: '题目/3-12.png' },
        { id: '3-13', name: '3-13', group: '第3章', file: '题目/3-13.png' },
        { id: '3-14', name: '3-14', group: '第3章', file: '题目/3-14.png' },
        { id: '3-15', name: '3-15', group: '第3章', file: '题目/3-15.png' },
        { id: '3-16', name: '3-16', group: '第3章', file: '题目/3-16.png' },
        { id: '3-17', name: '3-17', group: '第3章', file: '题目/3-17.png' },
        { id: '3-18', name: '3-18', group: '第3章', file: '题目/3-18.png' },
        { id: '3-19', name: '3-19', group: '第3章', file: '题目/3-19.png' },
        { id: '3-20', name: '3-20', group: '第3章', file: '题目/3-20.png' },
        { id: '3-21', name: '3-21', group: '第3章', file: '题目/3-21.png' },
        { id: '3-22', name: '3-22', group: '第3章', file: '题目/3-22.png' },
        { id: '3-23', name: '3-23', group: '第3章', file: '题目/3-23.png' },
        { id: '3-24', name: '3-24', group: '第3章', file: '题目/3-24.png' },
        { id: '3-25', name: '3-25', group: '第3章', file: '题目/3-25.png' },
        { id: '3-26', name: '3-26', group: '第3章', file: '题目/3-26.png' },

        { id: '4-1', name: '4-1', group: '第4章', file: '题目/4-1.png' },
        { id: '4-2', name: '4-2', group: '第4章', file: '题目/4-2.png' },
        { id: '4-3', name: '4-3', group: '第4章', file: '题目/4-3.png' },
        { id: '4-4', name: '4-4', group: '第4章', file: '题目/4-4.png' },
        { id: '4-5', name: '4-5', group: '第4章', file: '题目/4-5.png' },
        { id: '4-6', name: '4-6', group: '第4章', file: '题目/4-6.png' },
        { id: '4-7', name: '4-7', group: '第4章', file: '题目/4-7.png' },
        { id: '4-8', name: '4-8', group: '第4章', file: '题目/4-8.png' },
        { id: '4-9', name: '4-9', group: '第4章', file: '题目/4-9.png' },
        { id: '4-10', name: '4-10', group: '第4章', file: '题目/4-10.png' },
        { id: '4-11', name: '4-11', group: '第4章', file: '题目/4-11.png' },
        { id: '4-12', name: '4-12', group: '第4章', file: '题目/4-12.png' },
        { id: '4-13', name: '4-13', group: '第4章', file: '题目/4-13.png' },
        { id: '4-14', name: '4-14', group: '第4章', file: '题目/4-14.png' },
        { id: '4-15', name: '4-15', group: '第4章', file: '题目/4-15.png' },
        { id: '4-16', name: '4-16', group: '第4章', file: '题目/4-16.png' },
        { id: '4-17', name: '4-17', group: '第4章', file: '题目/4-17.png' },
        { id: '4-18', name: '4-18', group: '第4章', file: '题目/4-18.png' },
        { id: '4-19', name: '4-19', group: '第4章', file: '题目/4-19.png' },
        { id: '4-20', name: '4-20', group: '第4章', file: '题目/4-20.png' },
        { id: '4-21', name: '4-21', group: '第4章', file: '题目/4-21.png' },
        { id: '4-22', name: '4-22', group: '第4章', file: '题目/4-22.png' },
        { id: '4-23', name: '4-23', group: '第4章', file: '题目/4-23.png' },
        { id: '4-24', name: '4-24', group: '第4章', file: '题目/4-24.png' },
        { id: '4-25', name: '4-25', group: '第4章', file: '题目/4-25.png' },
        { id: '4-26', name: '4-26', group: '第4章', file: '题目/4-26.png' },
        { id: '4-27', name: '4-27', group: '第4章', file: '题目/4-27.png' },
        { id: '4-28', name: '4-28', group: '第4章', file: '题目/4-28.png' },
        { id: '4-29', name: '4-29', group: '第4章', file: '题目/4-29.png' },

        { id: '5-1', name: '5-1', group: '第5章', file: '题目/5-1.png' },
        { id: '5-2', name: '5-2', group: '第5章', file: '题目/5-2.png' },
        { id: '5-3', name: '5-3', group: '第5章', file: '题目/5-3.png' },
        { id: '5-4', name: '5-4', group: '第5章', file: '题目/5-4.png' },
        { id: '5-5', name: '5-5', group: '第5章', file: '题目/5-5.png' },
        { id: '5-6', name: '5-6', group: '第5章', file: '题目/5-6.png' },
        { id: '5-7', name: '5-7', group: '第5章', file: '题目/5-7.png' },
        { id: '5-8', name: '5-8', group: '第5章', file: '题目/5-8.png' },
        { id: '5-9', name: '5-9', group: '第5章', file: '题目/5-9.png' },
        { id: '5-10', name: '5-10', group: '第5章', file: '题目/5-10.png' },
        { id: '5-11', name: '5-11', group: '第5章', file: '题目/5-11.png' },
        { id: '5-12', name: '5-12', group: '第5章', file: '题目/5-12.png' },
        { id: '5-13', name: '5-13', group: '第5章', file: '题目/5-13.png' },
        { id: '5-14', name: '5-14', group: '第5章', file: '题目/5-14.png' },
        { id: '5-15', name: '5-15', group: '第5章', file: '题目/5-15.png' },
        { id: '5-16', name: '5-16', group: '第5章', file: '题目/5-16.png' },
        { id: '5-17', name: '5-17', group: '第5章', file: '题目/5-17.png' },

        { id: '6-1', name: '6-1', group: '第6章', file: '题目/6-1.png' },
        { id: '6-2', name: '6-2', group: '第6章', file: '题目/6-2.png' },
        { id: '6-3', name: '6-3', group: '第6章', file: '题目/6-3.png' },
        { id: '6-4', name: '6-4', group: '第6章', file: '题目/6-4.png' },
        { id: '6-5', name: '6-5', group: '第6章', file: '题目/6-5.png' },
        { id: '6-6', name: '6-6', group: '第6章', file: '题目/6-6.png' },
        { id: '6-7', name: '6-7', group: '第6章', file: '题目/6-7.png' },
        { id: '6-8', name: '6-8', group: '第6章', file: '题目/6-8.png' },
        { id: '6-9', name: '6-9', group: '第6章', file: '题目/6-9.png' },
        { id: '6-10', name: '6-10', group: '第6章', file: '题目/6-10.png' },
        { id: '6-11', name: '6-11', group: '第6章', file: '题目/6-11.png' },
        { id: '6-12', name: '6-12', group: '第6章', file: '题目/6-12.png' },
        { id: '6-13', name: '6-13', group: '第6章', file: '题目/6-13.png' },
        { id: '6-14', name: '6-14', group: '第6章', file: '题目/6-14.png' },
        { id: '6-15', name: '6-15', group: '第6章', file: '题目/6-15.png' },
        { id: '6-16', name: '6-16', group: '第6章', file: '题目/6-16.png' },
        { id: '6-17', name: '6-17', group: '第6章', file: '题目/6-17.png' },

        { id: '7-1', name: '7-1', group: '第7章', file: '题目/7-1.png' },
        { id: '7-2', name: '7-2', group: '第7章', file: '题目/7-2.png' },
        { id: '7-3', name: '7-3', group: '第7章', file: '题目/7-3.png' },
        { id: '7-4', name: '7-4', group: '第7章', file: '题目/7-4.png' },
        { id: '7-5', name: '7-5', group: '第7章', file: '题目/7-5.png' },
        { id: '7-6', name: '7-6', group: '第7章', file: '题目/7-6.png' },
        { id: '7-7', name: '7-7', group: '第7章', file: '题目/7-7.png' },
        { id: '7-8', name: '7-8', group: '第7章', file: '题目/7-8.png' },
        { id: '7-9', name: '7-9', group: '第7章', file: '题目/7-9.png' },
        { id: '7-10', name: '7-10', group: '第7章', file: '题目/7-10.png' },
        { id: '7-11', name: '7-11', group: '第7章', file: '题目/7-11.png' },
        { id: '7-12', name: '7-12', group: '第7章', file: '题目/7-12.png' },
        { id: '7-13', name: '7-13', group: '第7章', file: '题目/7-13.png' },
        { id: '7-14', name: '7-14', group: '第7章', file: '题目/7-14.png' },
        { id: '7-15', name: '7-15', group: '第7章', file: '题目/7-15.png' },
        { id: '7-16', name: '7-16', group: '第7章', file: '题目/7-16.png' },

        { id: '8-1', name: '8-1', group: '第8章', file: '题目/8-1.png' }
      ]
    }
  ]
};

/* 作答记录保存在浏览器本地，键名在各页面之间共用。 */
window.WC_answerKey = function (seasonId, puzzleId) {
  return 'wc-answer-' + seasonId + '-' + puzzleId;
};
