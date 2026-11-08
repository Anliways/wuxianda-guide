import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageMeta from "@/components/common/PageMeta";
import { easterEggs } from "@/data/mock";

const maps = Array.from(new Set(easterEggs.map((e) => e.map)));

export default function EasterEggs() {
  const [filter, setFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return easterEggs;
    return easterEggs.filter((e) => e.map === filter);
  }, [filter]);

  return (
    <div className="px-4 md:px-8 py-8">
      <PageMeta title="场景彩蛋 - 无限大攻略站" description="《无限大》各地图隐藏彩蛋位置、触发条件与奖励说明汇总。" />
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <MapPin className="h-6 w-6 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">场景彩蛋</h1>
        </div>
        <div className="md:ml-auto">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="选择地图" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部地图</SelectItem>
              {maps.map((map) => (
                <SelectItem key={map} value={map}>{map}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((egg) => (
          <Link key={egg.id} to={`/easter-eggs/${egg.id}`}>
            <Card className="h-full hover:border-accent transition-colors">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{egg.map}</Badge>
                      <Badge variant="outline">{egg.reward}</Badge>
                    </div>
                    <CardTitle className="text-lg mb-2">{egg.name}</CardTitle>
                    <p className="text-sm text-muted-foreground text-pretty line-clamp-2">{egg.position}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
