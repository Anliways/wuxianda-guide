import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Map, Eye, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PageMeta from "@/components/common/PageMeta";
import PageBreadcrumb from "@/components/common/PageBreadcrumb";
import VideoPreview from "@/components/common/VideoPreview";
import AdSlot from "@/components/common/AdSlot";
import { storyChapters } from "@/data/mock";

const difficultyMap = {
  easy: { label: "简单" },
  normal: { label: "普通" },
  hard: { label: "困难" },
  extreme: { label: "极限" },
};

export default function StoryGuideDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const chapter = storyChapters.find((c) => c.id === id);

  if (!chapter) {
    return (
      <div className="px-4 md:px-8 py-16 text-center">
        <p className="text-muted-foreground">未找到该章节攻略</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/story")}>
          返回剧情攻略
        </Button>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 py-8 max-w-5xl mx-auto">
      <PageMeta title={`${chapter.title} - 剧情攻略 - 无限大攻略站`} description={chapter.route} />
      <PageBreadcrumb items={[{ label: "剧情攻略", path: "/story" }, { label: chapter.title }]} />

      <div className="flex items-center gap-2 mb-2">
        <Badge variant="secondary">{chapter.chapter} {chapter.stage}</Badge>
        <Badge>{difficultyMap[chapter.difficulty].label}</Badge>
      </div>
      <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-2">{chapter.title}</h1>
      <p className="text-sm text-muted-foreground mb-8">更新时间：{chapter.updatedAt}</p>

      <div className="flex flex-col md:flex-row gap-6">
        {/* 主内容区：攻略正文 + 文章中插广告 */}
        <div className="flex-1 min-w-0">
          <div className="space-y-6">
            {chapter.videoUrl && (
              <VideoPreview url={chapter.videoUrl} title="剧情视频" />
            )}

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Map className="h-5 w-5 text-primary" />
                  通关路线
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{chapter.route}</p>
              </CardContent>
            </Card>

            {/* 文章中插广告位：置于通关路线与剧情解读之间 */}
            <AdSlot type="in-article" className="h-[120px] w-full" />

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  剧情解读
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed">{chapter.interpretation}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-accent" />
                  隐藏要素
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {chapter.hidden.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-foreground">
                      <Eye className="h-4 w-4 text-accent mt-1 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* 右侧栏广告位：仅桌面端展示 */}
        <aside className="hidden md:block w-[300px] shrink-0">
          <div className="sticky top-32">
            <AdSlot type="sidebar-right" className="h-[250px] w-full" />
          </div>
        </aside>
      </div>

      <Separator className="my-8" />
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => navigate("/story")}>返回列表</Button>
        <Button onClick={() => navigate("/wiki")}>查看资料库</Button>
      </div>
    </div>
  );
}
