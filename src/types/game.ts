export interface StoryChapter {
  id: string;
  chapter: string;
  stage: string;
  title: string;
  difficulty: "easy" | "normal" | "hard" | "extreme";
  updatedAt: string;
  route: string;
  interpretation: string;
  hidden: string[];
  /** B站视频 BV 号或完整视频页链接，用于详情页视频预览入口 */
  videoUrl?: string;
}

export interface EasterEgg {
  id: string;
  name: string;
  map: string;
  reward: string;
  position: string;
  condition: string;
  rewardDetail: string;
  /** B站视频 BV 号或完整视频页链接，用于站内视频预览播放 */
  videoUrl?: string;
}

export type SkillIconName =
  | "zap" | "wind" | "flame" | "shield" | "target" | "sparkles"
  | "swords" | "crosshair" | "flask" | "moon" | "sun" | "gauge"
  | "bomb" | "heart" | "wand" | "skull" | "rotate" | "eye";

/** 角色强度榜分级：T0 最强，T3 最弱 */
export type Tier = "T0" | "T0.5" | "T1" | "T2" | "T3";

export interface SkillInfo {
  name: string;
  type: "主动" | "被动" | "终结技" | "攻击模式";
  icon: SkillIconName;
  description: string;
  cost?: string;
}

export interface RadarStat {
  label: string;
  value: number;
}

export interface Character {
  id: string;
  name: string;
  rarity: number;
  role: string;
  element: string;
  hp: number;
  attack: number;
  defense: number;
  skills: SkillInfo[];
  radar: RadarStat[];
  obtain: string;
  description: string;
  /** 强度榜分级 T0/T0.5/T1/T2/T3 */
  tier: Tier;
  /** B站视频 BV 号或完整视频页链接，用于详情页视频预览入口 */
  videoUrl?: string;
}

export interface Weapon {
  id: string;
  name: string;
  rarity: number;
  type: string;
  attack: number;
  range: number;
  ammo: number;
  skills: SkillInfo[];
  radar: RadarStat[];
  effect: string;
  obtain: string;
  description: string;
}

export interface Vehicle {
  id: string;
  name: string;
  rarity: number;
  speed: number;
  durability: number;
  capacity: number;
  ability: string;
  obtain: string;
  description: string;
}

export interface Monster {
  id: string;
  name: string;
  level: number;
  type: string;
  hp: number;
  attack: number;
  defense: number;
  skill: string;
  location: string;
  reward: string;
  description: string;
}

export interface Boss {
  id: string;
  name: string;
  level: number;
  element: string;
  hp: number;
  attack: number;
  defense: number;
  skills: SkillInfo[];
  radar: RadarStat[];
  weakness: string;
  strategy: string;
  reward: string;
  description: string;
}

export interface NPC {
  id: string;
  name: string;
  role: string;
  location: string;
  function: string;
  dialogue: string[];
  reward: string;
  description: string;
}

export type WikiEntry = Character | Weapon | Vehicle | Monster | Boss | NPC;

/** 游戏内城市/区域信息 */
export interface City {
  id: string;
  name: string;
  /** 所属大区 */
  region: string;
  /** 城市定位标签 */
  tag: string;
  /** 背景简介 */
  background: string;
  /** 特色设定 */
  features: string[];
  /** 代表地标 */
  landmarks: string[];
  /** 氛围关键词 */
  vibe: string;
  /** 城市主色调（语义色名，用于卡片点缀） */
  accent: "primary" | "accent" | "info" | "warning";
}

export interface Activity {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  rewards: string[];
  gameplay: string;
  objectives: string[];
  rewardPath: string;
  /** B站视频 BV 号或完整视频页链接，用于站内视频预览播放 */
  videoUrl?: string;
}

export interface GiftCode {
  id: string;
  code: string;
  content: string;
  channel: string;
  expiredAt: string;
  isExpired: boolean;
}

export interface ModificationPlan {
  id: string;
  name: string;
  target: string;
  targetType: "weapon" | "vehicle";
  recommendation: number;
  parts: string[];
  stats: { before: number; after: number; label: string }[];
  scene: string;
  /** B站视频 BV 号或完整视频页链接，用于详情页视频预览入口 */
  videoUrl?: string;
}

export interface BuildPlan {
  id: string;
  name: string;
  coreCharacter: string;
  weapon: string;
  skills: string[];
  reason: string;
  synergy: string;
  scene: string;
  recommendation: number;
  /** B站视频 BV 号或完整视频页链接，用于站内视频预览播放 */
  videoUrl?: string;
}

export interface HomeDesignPlan {
  id: string;
  name: string;
  style: string;
  recommendation: number;
  items: string[];
  layout: string;
  effect: string;
  /** B站视频 BV 号或完整视频页链接，用于站内视频预览播放 */
  videoUrl?: string;
}

export interface NavItem {
  name: string;
  path: string;
  icon: string;
}
