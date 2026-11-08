import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Search, FileText, MapPin, Library, Gift, Wrench, Users, Sofa } from "lucide-react";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageMeta from "@/components/common/PageMeta";
import { storyChapters, easterEggs, characters, weapons, vehicles, monsters, bosses, giftCodes, modifications, builds, homeDesigns } from "@/data/mock";

interface SearchResult {
  id: string;
  title: string;
  category: string;
  path: string;
  summary: string;
  icon: React.ElementType;
}

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const results = useMemo<SearchResult[]>(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    const all: SearchResult[] = [
      ...storyChapters.map((c) => ({
        id: c.id,
        title: c.title,
        category: "剧情攻略",
        path: `/story/${c.id}`,
        summary: c.route,
        icon: FileText,
      })),
      ...easterEggs.map((e) => ({
        id: e.id,
        title: e.name,
        category: "场景彩蛋",
        path: `/easter-eggs/${e.id}`,
        summary: e.position,
        icon: MapPin,
      })),
      ...characters.map((c) => ({
        id: c.id,
        title: c.name,
        category: "角色",
        path: `/wiki/character/${c.id}`,
        summary: c.description,
        icon: Library,
      })),
      ...weapons.map((c) => ({
        id: c.id,
        title: c.name,
        category: "武器",
        path: `/wiki/weapon/${c.id}`,
        summary: c.description,
        icon: Library,
      })),
      ...vehicles.map((c) => ({
        id: c.id,
        title: c.name,
        category: "载具",
        path: `/wiki/vehicle/${c.id}`,
        summary: c.description,
        icon: Library,
      })),
      ...monsters.map((c) => ({
        id: c.id,
        title: c.name,
        category: "怪物",
        path: `/wiki/monster/${c.id}`,
        summary: c.description,
        icon: Library,
      })),
      ...bosses.map((c) => ({
        id: c.id,
        title: c.name,
        category: "Boss",
        path: `/wiki/boss/${c.id}`,
        summary: c.description,
        icon: Library,
      })),
      ...giftCodes.map((c) => ({
        id: c.id,
        title: c.code,
        category: "礼包码",
        path: "/gift-codes",
        summary: c.content,
        icon: Gift,
      })),
      ...modifications.map((c) => ({
        id: c.id,
        title: c.name,
        category: "改装方案",
        path: `/modifications/${c.id}`,
        summary: c.scene,
        icon: Wrench,
      })),
      ...builds.map((c) => ({
        id: c.id,
        title: c.name,
        category: "搭配方案",
        path: `/builds/${c.id}`,
        summary: c.reason,
        icon: Users,
      })),
      ...homeDesigns.map((c) => ({
        id: c.id,
        title: c.name,
        category: "家园搭配",
        path: `/home-designs/${c.id}`,
        summary: c.effect,
        icon: Sofa,
      })),
    ];
    return all.filter((item) =>
      item.title.toLowerCase().includes(q) || item.summary.toLowerCase().includes(q) || item.category.toLowerCase().includes(q)
    );
  }, [query]);

  return (
    <div className="px-4 md:px-8 py-8">
      <PageMeta title={`搜索：${query} - 无限大攻略站`} description="搜索无限大攻略站中的攻略、资料、方案与礼包码。" />
      <div className="flex items-center gap-2 mb-6">
        <Search className="h-6 w-6 text-primary" />
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">搜索结果</h1>
      </div>

      <p className="text-muted-foreground mb-6">
        {query ? `关键词：${query}，共找到 ${results.length} 条结果` : "请输入关键词进行搜索"}
      </p>

      <div className="grid gap-4">
        {results.map((item) => {
          const Icon = item.icon;
          return (
            <Link key={`${item.category}-${item.id}`} to={item.path}>
              <Card className="hover:border-accent transition-colors">
                <CardContent className="p-4 flex items-start gap-4">
                  <div className="shrink-0 h-10 w-10 rounded-md bg-muted flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-base font-bold">{item.title}</CardTitle>
                      <Badge variant="outline" className="font-normal">{item.category}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground text-pretty line-clamp-2">{item.summary}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {query && results.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          未找到相关内容，建议调整搜索关键词
        </div>
      )}
    </div>
  );
}
