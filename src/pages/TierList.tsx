import { Link } from "react-router-dom";
import { Trophy, ChevronRight, Crown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageMeta from "@/components/common/PageMeta";
import AdSlot from "@/components/common/AdSlot";
import { characters } from "@/data/mock";
import type { Tier, Character } from "@/types/game";
import { cn } from "@/lib/utils";

/** 强度榜分级配置：颜色、描述、排序权重 */
const tierConfig: Record<Tier, { label: string; desc: string; order: number; badge: string; dot: string }> = {
  T0: { label: "T0", desc: "版本答案 · 顶级强度", order: 0, badge: "bg-primary text-primary-foreground", dot: "bg-primary" },
  "T0.5": { label: "T0.5", desc: "准顶级 · 强力核心", order: 1, badge: "bg-primary/80 text-primary-foreground", dot: "bg-primary/70" },
  T1: { label: "T1", desc: "主流强力 · 表现优秀", order: 2, badge: "bg-accent text-accent-foreground", dot: "bg-accent" },
  T2: { label: "T2", desc: "中坚力量 · 可用之选", order: 3, badge: "bg-info text-info-foreground", dot: "bg-info" },
  T3: { label: "T3", desc: "过渡角色 · 谨慎培养", order: 4, badge: "bg-muted-foreground text-background", dot: "bg-muted-foreground" },
};

const tierOrder: Tier[] = ["T0", "T0.5", "T1", "T2", "T3"];

/** 单个角色卡片 */
function CharacterCard({ character }: { character: Character }) {
  return (
    <Link to={`/wiki/character/${character.id}`} className="group">
      <Card className="h-full hover:border-accent transition-colors">
        <CardContent className="p-4 flex items-center gap-3">
          <div className="h-12 w-12 shrink-0 rounded-md bg-muted flex items-center justify-center text-primary font-bold text-lg">
            {character.name[0]}
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium truncate group-hover:text-primary transition-colors">{character.name}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <Badge variant="outline" className="text-xs">{character.role}</Badge>
              <span className="text-xs text-muted-foreground">{character.element}属性</span>
            </div>
          </div>
          <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </CardContent>
      </Card>
    </Link>
  );
}

export default function TierList() {
  // 按分级分组，组内保持数据顺序
  const grouped = tierOrder.map((tier) => ({
    tier,
    config: tierConfig[tier],
    members: characters.filter((c) => c.tier === tier),
  }));

  return (
    <div className="px-4 md:px-8 py-8 max-w-5xl mx-auto">
      <PageMeta title="强度榜 - 无限大攻略站" description="《无限大》角色强度榜，按 T0/T0.5/T1/T2/T3 五级划分角色强度排名。" />

      <div className="flex items-center gap-2 mb-2">
        <Trophy className="h-6 w-6 text-primary" />
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">角色强度榜</h1>
      </div>
      <p className="text-sm text-muted-foreground mb-6 text-pretty">
        综合角色输出、生存、泛用性与当前版本环境，将角色划分为 T0 至 T3 五个强度等级。排名仅供参考，实际强度受阵容搭配与玩法影响。
      </p>

      <div className="space-y-6">
        {grouped.map(({ tier, config, members }) => (
          <div key={tier}>
            <div className="flex items-center gap-3 mb-3">
              <Badge className={cn("text-sm font-bold px-3 py-1", config.badge)}>
                {tier === "T0" && <Crown className="h-3.5 w-3.5 mr-1" />}
                {config.label}
              </Badge>
              <span className="text-sm text-muted-foreground">{config.desc}</span>
            </div>
            {members.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {members.map((c) => (
                  <CharacterCard key={c.id} character={c} />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground/60 pl-1">暂无该等级角色</p>
            )}
          </div>
        ))}
      </div>

      {/* 文章中插广告位 */}
      <div className="mt-8">
        <AdSlot type="in-article" className="h-[120px] w-full" />
      </div>
    </div>
  );
}