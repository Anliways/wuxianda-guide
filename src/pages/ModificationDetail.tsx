import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Wrench, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import PageMeta from "@/components/common/PageMeta";
import PageBreadcrumb from "@/components/common/PageBreadcrumb";
import VideoPreview from "@/components/common/VideoPreview";
import { modifications } from "@/data/mock";

export default function ModificationDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const plan = modifications.find((p) => p.id === id);

  if (!plan) {
    return (
      <div className="px-4 md:px-8 py-16 text-center">
        <p className="text-muted-foreground">未找到该改装方案</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/modifications")}>
          返回改装方案
        </Button>
      </div>
    );
  }

  const maxValue = Math.max(...plan.stats.map((s) => s.after));

  return (
    <div className="px-4 md:px-8 py-8 max-w-5xl mx-auto">
      <PageMeta title={`${plan.name} - 改装方案 - 无限大攻略站`} description={plan.scene} />
      <PageBreadcrumb items={[{ label: "改装方案", path: "/modifications" }, { label: plan.name }]} />

      <div className="flex items-center gap-2 mb-2">
        <Badge variant="secondary">{plan.targetType === "weapon" ? "武器" : "载具"}</Badge>
        <Badge variant="outline">推荐度 {plan.recommendation}/5</Badge>
      </div>
      <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">{plan.name}</h1>
      <p className="text-muted-foreground mb-6">适用对象：{plan.target}</p>

      <div className="space-y-6">
        {plan.videoUrl && (
          <VideoPreview url={plan.videoUrl} title="视频演示" />
        )}

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              改装配置
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {plan.parts.map((part, index) => (
                <Badge key={index} variant="secondary" className="text-sm">{part}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-accent" />
              效果对比
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {plan.stats.map((stat, index) => {
              const beforePct = (Number(stat.before) / maxValue) * 100;
              const afterPct = (Number(stat.after) / maxValue) * 100;
              return (
                <div key={index}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <span className="font-medium">{stat.label}</span>
                    <span className="text-muted-foreground">
                      {stat.before} → <span className="text-primary font-bold">{stat.after}</span>
                    </span>
                  </div>
                  <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="absolute h-full bg-muted-foreground/40 rounded-full"
                      style={{ width: `${beforePct}%` }}
                    />
                    <div
                      className="absolute h-full bg-primary rounded-full"
                      style={{ width: `${afterPct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">适用场景</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{plan.scene}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Button variant="outline" onClick={() => navigate("/modifications")}>返回列表</Button>
      </div>
    </div>
  );
}
