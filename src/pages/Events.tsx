import { Link } from "react-router-dom";
import { Gift, Clock, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageMeta from "@/components/common/PageMeta";
import { activities } from "@/data/mock";

export default function Events() {
  const now = new Date("2026-08-29");

  return (
    <div className="px-4 md:px-8 py-8">
      <PageMeta title="活动攻略 - 无限大攻略站" description="《无限大》当前活动玩法、任务目标与奖励获取路径实时更新。" />
      <div className="flex items-center gap-2 mb-6">
        <Gift className="h-6 w-6 text-primary" />
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">活动攻略</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {activities.map((activity) => {
          const end = new Date(activity.endTime);
          const active = end > now;
          return (
            <Link key={activity.id} to={`/events/${activity.id}`}>
              <Card className="h-full hover:border-accent transition-colors">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant={active ? "default" : "secondary"}>{active ? "进行中" : "已结束"}</Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3.5 w-3.5" />
                          {activity.startTime} 至 {activity.endTime}
                        </div>
                      </div>
                      <CardTitle className="text-lg mb-2">{activity.name}</CardTitle>
                      <p className="text-sm text-muted-foreground text-pretty line-clamp-2">{activity.gameplay}</p>
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {activity.rewards.map((reward, index) => (
                          <Badge key={index} variant="outline" className="font-normal">{reward}</Badge>
                        ))}
                      </div>
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
