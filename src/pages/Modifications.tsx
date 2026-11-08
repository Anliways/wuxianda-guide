import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Wrench, ChevronRight, Sword, Car } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageMeta from "@/components/common/PageMeta";
import { modifications } from "@/data/mock";

export default function Modifications() {
  const [filter, setFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return modifications;
    return modifications.filter((m) => m.targetType === filter);
  }, [filter]);

  return (
    <div className="px-4 md:px-8 py-8">
      <PageMeta title="改装方案 - 无限大攻略站" description="《无限大》武器与载具改装配置推荐，含改装前后效果对比。" />
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Wrench className="h-6 w-6 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">改装方案</h1>
        </div>
        <div className="md:ml-auto">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="选择类型" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部类型</SelectItem>
              <SelectItem value="weapon">武器</SelectItem>
              <SelectItem value="vehicle">载具</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((plan) => {
          const Icon = plan.targetType === "weapon" ? Sword : Car;
          return (
            <Link key={plan.id} to={`/modifications/${plan.id}`}>
              <Card className="h-full hover:border-accent transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary">
                          <Icon className="h-3 w-3 mr-1" />
                          {plan.targetType === "weapon" ? "武器" : "载具"}
                        </Badge>
                        <Badge variant="outline">推荐度 {plan.recommendation}/5</Badge>
                      </div>
                      <CardTitle className="text-lg mb-2">{plan.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">适用：{plan.target}</p>
                      <p className="text-sm text-muted-foreground text-pretty line-clamp-2 mt-2">{plan.scene}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
