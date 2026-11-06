# 见联会存档

「见联会」（见证者玩家社群解谜竞赛）的静态档案站，可直接托管到 GitHub Pages。

## 目录结构

```
index.html                  首页：历届比赛入口
mechanism/                  各原创机制的规则页（站点级，跨届次通用）
wc1/
  index.html                第一届：赛制、机制、题目
  puzzle.html               作答页：画笔 / 橡皮 / 同组切换
  题目/ 机制/ info.txt       原始素材
  第一届见证者群比赛.zip      原始资料包（页面提供下载）
assets/
  css/site.css              全站样式
  js/data.js                站点数据（机制、届次、题目）
  js/site.js                列表页渲染
  js/mechanism.js           机制页渲染
  js/puzzle.js              作答页逻辑
```

## 本地预览

作答页需要从本地读取题目图片，建议用本地服务器打开：

```powershell
cd "D:\1 Game\witness\archive web"
python -m http.server 8080
```

然后访问 <http://localhost:8080/>。

## 部署到 GitHub Pages

1. 把本目录推送到 GitHub 仓库（`.nojekyll` 需一并提交）。
2. 仓库 Settings → Pages → Build and deployment：Source 选 `Deploy from a branch`，Branch 选 `main`、目录选 `/ (root)`。
3. 稍等片刻即可通过 `https://<用户名>.github.io/<仓库名>/` 访问。

所有链接均为相对路径，放在仓库子目录下也能正常工作。

## 新增一届比赛

1. 建立 `wcN/` 目录，放入该届的 `题目/`、`机制/` 等素材。
2. 在 `assets/js/data.js` 的 `seasons` 数组中追加一个对象（可参考 `wc1`）：
   - `id` / `dir` / `title` / `date` / `format` 等基本信息；
   - `facts`：赛制信息卡片；
   - `archive`：原始资料包（可选）；
   - `mechanisms`：机制名称、图片、规则页链接；
   - `puzzles`：题目 id、文件名、分组（`group` 默认为文件名前两位）。
3. 复制 `wc1/index.html`、`wc1/puzzle.html` 与 `wc1/mechanism/` 页面，把内部相对路径调整为 `wcN/`，并为每个机制补一个规则页。

机制是站点级数据（`data.js` 顶层的 `mechanisms`），机制页只放一个带 `data-mechanism="<机制 id>"` 的空容器，内容由 `mechanism.js` 渲染，页面本身不隶属于任何一届。相关字段：

- `page`：机制页路径，相对站点根目录。
- `related`：相关机制 id 数组，用于生成「相关机制」按钮。关系按条目单向声明，A 写了 B 不代表 B 也写到 A。
- `seasons`：出现轮次，填该机制出现过的届次 id，例如 `['wc1']`。每一项会生成一个「出现轮次：第一届」按钮，跳到对应届次页面。留空则不显示该按钮。

届次页面上的机制列表由 `mechanisms` 里包含该届 `id` 的条目自动生成。

题目列表与分组由 `data.js` 自动生成：同一 `group` 的题目会排在同一行，作答页的左右箭头只在同组内切换。

## 说明

- 作答记录保存在浏览器 `localStorage`，不会上传到任何服务器；题目列表的缩略图会自动叠加显示本机保存的笔迹。
- 画笔模式下按住右键拖动可临时擦除；画笔光标为实际笔触大小的圆点，橡皮光标为与擦除范围等大的半透明白色圆圈。
- 在画布上滚动滚轮可直接调整笔触粗细，默认颜色为红色；橡皮直径约为画笔的 3.2 倍。
- 每道题会记住上次使用的画笔颜色与粗细（存在 `localStorage`，键名 `wc-tool-<届次>-<题目>`），再次打开时自动恢复。
- 题目与机制版权归原作者所有，本站仅作社群存档与交流使用。
