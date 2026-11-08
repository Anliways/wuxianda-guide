import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Gift, Target, Trophy, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageMeta from "@/components/common/PageMeta";
import PageBreadcrumb from "@/components/common/PageBreadcrumb";
import VideoPreview from "@/components/common/VideoPreview";
import { activities } from "@/data/mock";

export default function EventDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const activity = activities.find((a) => a.id === id);

  if (!activity) {
    return (
      <div className="px-4 md:px-8 py-16 text-center">
        <p className="text-muted-foreground">未找到该活动</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/events")}>
          返回活动攻略
        </Button>
      </div>
    );
  }

  const now = new Date("2026-08-29");
  const active = new Date(activity.endTime) > now;

  return (
    <div className="px-4 md:px-8 py-8 max-w-5xl mx-auto">
      <PageMeta title={`${activity.name} - 活动攻略 - 无限大攻略站`} description={activity.gameplay} />
      <PageBreadcrumb items={[{ label: "活动攻略", path: "/events" }, { label: activity.name }]} />

      <div className="flex items-center gap-2 mb-2">
        <Badge variant={active ? "default" : "secondary"}>{active ? "进行中" : "已结束"}</Badge>
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          {activity.startTime} 至 {activity.endTime}
        </div>
      </div>
      <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-6">{activity.name}</h1>

      <div className="space-y-6">
        {activity.videoUrl && (
          <VideoPreview url={activity.videoUrl} title="活动视频" />
        )}

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Gift className="h-5 w-5 text-primary" />
              活动玩法
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{activity.gameplay}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              任务目标
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {activity.objectives.map((objective, index) => (
                <li key={index} className="flex items-center gap-2 text-foreground">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground text-xs font-bold">
                    {index + 1}
                  </span>
                  {objective}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Trophy className="h-5 w-5 text-accent" />
              奖励获取路径
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed mb-3">{activity.rewardPath}</p>
            <div className="flex flex-wrap gap-2">
              {activity.rewards.map((reward, index) => (
                <Badge key={index} variant="secondary">{reward}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Button variant="outline" onClick={() => navigate("/events")}>返回列表</Button>
      </div>
    </div>
  );
}
