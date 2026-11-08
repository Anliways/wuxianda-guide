import { Link } from "react-router-dom";
import { MapPinned, Landmark, Sparkles, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageMeta from "@/components/common/PageMeta";
import AdSlot from "@/components/common/AdSlot";
import { cities } from "@/data/mock";
import type { City } from "@/types/game";
import { cn } from "@/lib/utils";

const accentMap: Record<City["accent"], string> = {
  primary: "bg-primary/10 text-primary border-primary/20",
  accent: "bg-accent/10 text-accent border-accent/20",
  info: "bg-info/10 text-info border-info/20",
  warning: "bg-warning/10 text-warning border-warning/20",
};

export default function Cities() {
  return (
    <div className="px-4 md:px-8 py-8 max-w-6xl mx-auto">
      <PageMeta title="城市信息 - Wiki - 无限大攻略站" description="《无限大》游戏内城市与区域背景、特色设定与代表地标介绍。" />

      <div className="flex items-center gap-2 mb-2">
        <MapPinned className="h-6 w-6 text-primary" />
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">城市信息</h1>
      </div>
      <p className="text-sm text-muted-foreground mb-6 text-pretty">
        探索《无限大》世界中各具特色的城市与区域，了解它们的背景故事、特色设定与代表地标。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {cities.map((city) => (
          <Card key={city.id} className="h-full flex flex-col hover:border-accent transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2">
                <CardTitle className="text-lg md:text-xl text-balance">{city.name}</CardTitle>
                <Badge variant="outline" className={cn("shrink-0", accentMap[city.accent])}>
                  {city.tag}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="h-3 w-3" />
                {city.region}
              </p>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{city.background}</p>

              <div>
                <div className="flex items-center gap-1.5 mb-2 text-sm font-medium text-foreground">
                  <Sparkles className="h-4 w-4 text-accent" />
                  特色设定
                </div>
                <ul className="space-y-1.5">
                  {city.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      <span className="text-pretty">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-1.5 mb-2 text-sm font-medium text-foreground">
                  <Landmark className="h-4 w-4 text-primary" />
                  代表地标
                </div>
                <div className="flex flex-wrap gap-2">
                  {city.landmarks.map((l) => (
                    <Badge key={l} variant="secondary" className="text-xs">
                      {l}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-2">
                <Badge variant="outline" className="text-xs text-muted-foreground">
                  氛围：{city.vibe}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 信息流广告位 */}
      <div className="mt-8">
        <AdSlot type="in-feed" className="h-[120px] w-full" />
      </div>

      <div className="mt-6 text-center">
        <Link to="/wiki" className="text-sm text-primary hover:underline">
          返回 Wiki 首页
        </Link>
      </div>
    </div>
  );
}