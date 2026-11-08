import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { BookOpen, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PageMeta from "@/components/common/PageMeta";
import AdSlot from "@/components/common/AdSlot";
import { storyChapters } from "@/data/mock";

const difficultyMap = {
  easy: { label: "简单", className: "bg-success text-success-foreground" },
  normal: { label: "普通", className: "bg-info text-info-foreground" },
  hard: { label: "困难", className: "bg-warning text-warning-foreground" },
  extreme: { label: "极限", className: "bg-destructive text-destructive-foreground" },
};

const chapters = Array.from(new Set(storyChapters.map((c) => c.chapter)));

export default function StoryGuide() {
  const [filter, setFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    if (filter === "all") return storyChapters;
    return storyChapters.filter((c) => c.chapter === filter);
  }, [filter]);

  return (
    <div className="px-4 md:px-8 py-8">
      <PageMeta title="剧情攻略 - 无限大攻略站" description="《无限大》剧情攻略，按章节/关卡提供通关路线、剧情解读与隐藏要素指引。" />
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <BookOpen className="h-6 w-6 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">剧情攻略</h1>
        </div>
        <div className="md:ml-auto">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="选择章节" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">全部章节</SelectItem>
              {chapters.map((chapter) => (
                <SelectItem key={chapter} value={chapter}>{chapter}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* 主内容区：列表 + 信息流广告 */}
        <div className="flex-1 min-w-0">
          <div className="grid gap-4">
            {filtered.map((chapter) => {
              const diff = difficultyMap[chapter.difficulty];
              return (
                <Link key={chapter.id} to={`/story/${chapter.id}`}>
                  <Card className="hover:border-accent transition-colors">
                    <CardContent className="p-5 flex flex-col md:flex-row md:items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{chapter.chapter} {chapter.stage}</Badge>
                          <Badge className={diff.className}>{diff.label}</Badge>
                        </div>
                        <CardTitle className="text-lg md:text-xl mb-1">{chapter.title}</CardTitle>
                        <p className="text-sm text-muted-foreground text-pretty line-clamp-2">{chapter.route}</p>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground shrink-0">
                        <span>更新于 {chapter.updatedAt}</span>
                        <ChevronRight className="h-5 w-5" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
            {/* 信息流广告位：插入列表中部，移动端与桌面端均展示 */}
            <AdSlot type="in-feed" className="h-[120px] w-full" />
          </div>
        </div>
        {/* 右侧栏广告位：仅桌面端展示 */}
        <aside className="hidden md:block w-[300px] shrink-0">
          <div className="sticky top-32">
            <AdSlot type="sidebar-right" className="h-[250px] w-full" />
          </div>
        </aside>
      </div>
    </div>
  );
}
