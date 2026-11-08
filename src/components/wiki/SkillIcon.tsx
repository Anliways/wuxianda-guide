import type { ElementType } from "react";
import {
  Zap, Wind, Flame, Shield, Target, Sparkles, Swords, Crosshair,
  FlaskConical, Moon, Sun, Gauge, Bomb, Heart, Wand2, Skull, RotateCcw, Eye,
} from "lucide-react";
import type { SkillIconName } from "@/types/game";

const iconMap: Record<SkillIconName, ElementType> = {
  zap: Zap,
  wind: Wind,
  flame: Flame,
  shield: Shield,
  target: Target,
  sparkles: Sparkles,
  swords: Swords,
  crosshair: Crosshair,
  flask: FlaskConical,
  moon: Moon,
  sun: Sun,
  gauge: Gauge,
  bomb: Bomb,
  heart: Heart,
  wand: Wand2,
  skull: Skull,
  rotate: RotateCcw,
  eye: Eye,
};

/** 技能图标：按名称映射 lucide 图标，缺失时回退默认图标 */
export function SkillIcon({ name, className }: { name: SkillIconName; className?: string }) {
  const Icon = iconMap[name] ?? Sparkles;
  return <Icon className={className} />;
}
