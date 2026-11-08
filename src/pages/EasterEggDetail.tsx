import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Gift, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageMeta from "@/components/common/PageMeta";
import PageBreadcrumb from "@/components/common/PageBreadcrumb";
import VideoPreview from "@/components/common/VideoPreview";
import { easterEggs } from "@/data/mock";

export default function EasterEggDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const egg = easterEggs.find((e) => e.id === id);

  if (!egg) {
    return (
      <div className="px-4 md:px-8 py-16 text-center">
        <p className="text-muted-foreground">未找到该彩蛋</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/easter-eggs")}>
          返回场景彩蛋
        </Button>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 py-8 max-w-5xl mx-auto">
      <PageMeta title={`${egg.name} - 场景彩蛋 - 无限大攻略站`} description={egg.position} />
      <PageBreadcrumb items={[{ label: "场景彩蛋", path: "/easter-eggs" }, { label: egg.name }]} />

      <div className="flex items-center gap-2 mb-2">
        <Badge variant="secondary">{egg.map}</Badge>
        <Badge variant="outline">{egg.reward}</Badge>
      </div>
      <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-6">{egg.name}</h1>

      <div className="space-y-6">
        {egg.videoUrl && (
          <VideoPreview url={egg.videoUrl} title="视频演示" />
        )}

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              彩蛋位置
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{egg.position}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-primary" />
              触发条件
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{egg.condition}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Gift className="h-5 w-5 text-accent" />
              奖励说明
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{egg.rewardDetail}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Button variant="outline" onClick={() => navigate("/easter-eggs")}>返回列表</Button>
      </div>
    </div>
  );
}
