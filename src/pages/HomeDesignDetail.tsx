import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Sofa, LayoutGrid, Sparkles, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageMeta from "@/components/common/PageMeta";
import PageBreadcrumb from "@/components/common/PageBreadcrumb";
import VideoPreview from "@/components/common/VideoPreview";
import { homeDesigns } from "@/data/mock";

export default function HomeDesignDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const design = homeDesigns.find((d) => d.id === id);

  if (!design) {
    return (
      <div className="px-4 md:px-8 py-16 text-center">
        <p className="text-muted-foreground">未找到该家园搭配方案</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/home-designs")}>
          返回家园搭配方案
        </Button>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 py-8 max-w-5xl mx-auto">
      <PageMeta title={`${design.name} - 家园搭配方案 - 无限大攻略站`} description={design.effect} />
      <PageBreadcrumb items={[{ label: "家园搭配方案", path: "/home-designs" }, { label: design.name }]} />

      <div className="flex items-center gap-2 mb-2">
        <Badge variant="secondary">{design.style}</Badge>
        <Badge variant="outline">推荐度 {design.recommendation}/5</Badge>
      </div>
      <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-6">{design.name}</h1>

      <div className="space-y-6">
        {design.videoUrl && (
          <VideoPreview url={design.videoUrl} title="家园漫游" />
        )}

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Sofa className="h-5 w-5 text-primary" />
              装饰物品
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {design.items.map((item, index) => (
                <Badge key={index} variant="secondary" className="text-sm">{item}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <LayoutGrid className="h-5 w-5 text-primary" />
              布局优化建议
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{design.layout}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" />
              方案效果
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-foreground leading-relaxed">{design.effect}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Image className="h-5 w-5 text-accent" />
              效果示意
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video rounded-md bg-muted flex items-center justify-center text-muted-foreground">
              示意图待补充
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Button variant="outline" onClick={() => navigate("/home-designs")}>返回列表</Button>
      </div>
    </div>
  );
}
