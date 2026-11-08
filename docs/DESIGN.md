## Vibe
- 二次元都市未来感（Anime Urban Futurism）：以明亮蓝天、玻璃幕墙与霓虹青蓝为基调，营造开放、清新的都市冒险氛围，契合《无限大》游戏世界观。

## Color
- Primary: #0099FF
- On Primary: #FFFFFF
- Accent: #00E5FF
- On Accent: #0A1628
- Background: #F0F7FF
- Foreground: #0A1628
- Muted: #E1EEFB
- Border: #B8D8F8
- Secondary: #1A3A5C

## Typography
- Heading: 思源黑体 (family: "Noto Sans SC", weight: 700, url: https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap)
- Body: 思源黑体 (family: "Noto Sans SC", weight: 400, url: https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&display=swap)

## Visual Language
- 核心视觉签名：以青蓝到浅蓝的“天际渐变”作为页面主视觉背景，叠加来自用户提供的二次元城市插画作为首页氛围大图，形成“都市天际线”视觉锚点。
- 材质与深度：卡片使用浅蓝中性背景（#F0F7FF）搭配极细蓝灰边框， hover 时仅通过 1px Accent 色边框与微提亮背景反馈，避免阴影与毛玻璃。
- 容器与按钮：主按钮使用 Primary 纯色填充，次按钮使用 Muted 背景 + Foreground 文字；圆角统一为 8px，保持利落科技感。
- 布局节奏：首页采用大背景图 + 居中搜索 + 九宫格模块入口，后续页面左侧固定侧边栏导航，右侧内容区清晰分区，避免大色块铺底。

## Animation
- 入场：模块卡片自底部轻微上浮 12px + 透明度渐变，时长 400ms，ease-out。
- 交互：按钮与卡片 hover 时 150ms 内完成边框色与背景色切换，无缩放。
- 滚动：内容区使用标准滚动，无视差或滚动触发动画。

## Forbidden
- 禁止紫色渐变或粉紫霓虹色调
- 禁止大面积 Primary/Accent 纯色块作为背景
- 禁止装饰性 emoji 与拟物图标

## Additional Notes
- 所有用户可见文案使用中文
- 背景图使用用户提供的 URL：https://miaoda-conversation-file.cdn.bcebos.com/user-bxvsopsf0g00/app-e1nndy02f37l/20260829/10001.jpg
- 配色参考图使用用户提供的 URL：https://miaoda-conversation-file.cdn.bcebos.com/user-bxvsopsf0g00/app-e1nndy02f37l/20260829/10001.png
