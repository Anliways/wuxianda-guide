import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Sword, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageMeta from "@/components/common/PageMeta";
import PageBreadcrumb from "@/components/common/PageBreadcrumb";
import VideoPreview from "@/components/common/VideoPreview";
import { builds } from "@/data/mock";

export default function BuildDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const build = builds.find((b) => b.id === id);

  if (!build) {
    return (
      <div className="px-4 md:px-8 py-16 text-center">
        <p className="text-muted-foreground">未找到该搭配方案</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/builds")}>
          返回搭配方案
        </Button>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 py-8 max-w-5xl mx-auto">
      <PageMeta title={`${build.name} - 搭配方案 - 无限大攻略站`} description={build.reason} />
      <PageBreadcrumb items={[{ label: "搭配方案", path: "/builds" }, { label: build.name }]} />

      <div className="flex items-center gap-2 mb-2">
        <Badge variant="secondary">{build.coreCharacter}</Badge>
        <Badge variant="outline">推荐度 {build.recommendation}/5</Badge>
      </div>
      <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-6">{build.name}</h1>

      <div className="space-y-6">
        {build.videoUrl && (
          <VideoPreview url={build.videoUrl} title="搭配演示" />
        )}

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              角色选择
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed"><strong>核心角色：</strong>{build.coreCharacter}</p>
            <p className="text-foreground leading-relaxed mt-2">{build.reason}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Sword className="h-5 w-5 text-primary" />
              武器选择
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed"><strong>推荐武器：</strong>{build.weapon}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              技能组合
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {build.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="text-sm">{skill}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              协同效果
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{build.synergy}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Target className="h-5 w-5 text-accent" />
              适用场景
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{build.scene}</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Button variant="outline" onClick={() => navigate("/builds")}>返回列表</Button>
      </div>
    </div>
  );
}
