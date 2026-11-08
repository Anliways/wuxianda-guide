/**
 * 广告位框架配置
 * 定义广告位类型、规格尺寸、适用页面与加载策略，
 * 供 AdSlot 占位符组件与后续广告投放系统对接使用。
 */

/** 广告位类型标识 */
export type AdSlotType =
  | "banner-top" // 页头横幅（顶部）
  | "banner-bottom" // 页尾横幅（底部）
  | "sidebar-left" // 内容左侧栏
  | "sidebar-right" // 内容右侧栏
  | "in-feed" // 信息流插入
  | "in-article" // 文章中插
  | "interstitial" // 弹窗/插屏（预留）

/** 广告位规格尺寸（宽×高，单位 px） */
export interface AdSlotSize {
  width: number
  height: number
}

/** 广告位元信息 */
export interface AdSlotConfig {
  /** 广告位类型 */
  type: AdSlotType
  /** 人类可读名称 */
  label: string
  /** 标准尺寸 */
  size: AdSlotSize
  /** 适用页面类型 */
  pages: ("home" | "list" | "detail" | "all")[]
  /** 是否在移动端展示 */
  mobile: boolean
  /** 是否在桌面端展示 */
  desktop: boolean
}

/** 广告位类型配置表 */
export const AD_SLOT_CONFIGS: Record<AdSlotType, AdSlotConfig> = {
  "banner-top": {
    type: "banner-top",
    label: "顶部横幅广告",
    size: { width: 728, height: 90 },
    pages: ["all"],
    mobile: true,
    desktop: true,
  },
  "banner-bottom": {
    type: "banner-bottom",
    label: "底部横幅广告",
    size: { width: 728, height: 90 },
    pages: ["all"],
    mobile: true,
    desktop: true,
  },
  "sidebar-left": {
    type: "sidebar-left",
    label: "左侧栏广告",
    size: { width: 160, height: 600 },
    pages: ["home", "list", "detail"],
    mobile: false,
    desktop: true,
  },
  "sidebar-right": {
    type: "sidebar-right",
    label: "右侧栏广告",
    size: { width: 300, height: 250 },
    pages: ["home", "list", "detail"],
    mobile: false,
    desktop: true,
  },
  "in-feed": {
    type: "in-feed",
    label: "信息流广告",
    size: { width: 1200, height: 200 },
    pages: ["list"],
    mobile: true,
    desktop: true,
  },
  "in-article": {
    type: "in-article",
    label: "文章中插广告",
    size: { width: 728, height: 120 },
    pages: ["detail"],
    mobile: true,
    desktop: true,
  },
  interstitial: {
    type: "interstitial",
    label: "插屏广告",
    size: { width: 320, height: 480 },
    pages: ["all"],
    mobile: true,
    desktop: false,
  },
}

/**
 * 广告加载状态：
 * - placeholder：占位符（当前默认，展示灰色框）
 * - loading：正在请求广告
 * - filled：已填充真实广告内容
 * - empty：无广告填充，隐藏占位
 */
export type AdLoadStatus = "placeholder" | "loading" | "filled" | "empty"

/**
 * 广告位加载逻辑说明：
 * 1. 占位符阶段（当前）：直接渲染灰色虚线框，标注广告位类型与尺寸，
 *    不发起任何网络请求，便于前端布局调试与视觉确认。
 * 2. 接入阶段：AdSlot 组件根据 type 查询广告位配置，
 *    通过广告 SDK / 服务端接口请求广告内容（支持异步、超时、兜底）。
 * 3. 填充阶段：拿到广告素材后渲染真实内容；超时或无填充时降级为兜底素材或隐藏。
 * 4. 数据上报：曝光、点击、关闭事件统一埋点，供统计与优化使用。
 */
export const AD_LOAD_STATUS: AdLoadStatus = "placeholder"