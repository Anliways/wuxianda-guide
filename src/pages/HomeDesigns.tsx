import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Sofa, Search, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import PageMeta from "@/components/common/PageMeta";
import { homeDesigns } from "@/data/mock";

export default function HomeDesigns() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return homeDesigns;
    return homeDesigns.filter((d) =>
      d.name.toLowerCase().includes(query.trim().toLowerCase()) ||
      d.style.toLowerCase().includes(query.trim().toLowerCase())
    );
  }, [query]);

  return (
    <div className="px-4 md:px-8 py-8">
      <PageMeta title="家园搭配方案 - 无限大攻略站" description="《无限大》家园装饰与布局优化建议，提供多样化风格搭配方案。" />
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Sofa className="h-6 w-6 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">家园搭配方案</h1>
        </div>
        <div className="relative md:ml-auto w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索方案或风格..."
            className="pl-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((design) => (
          <Link key={design.id} to={`/home-designs/${design.id}`}>
            <Card className="h-full hover:border-accent transition-colors">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{design.style}</Badge>
                      <Badge variant="outline">推荐度 {design.recommendation}/5</Badge>
                    </div>
                    <CardTitle className="text-lg mb-2">{design.name}</CardTitle>
                    <p className="text-sm text-muted-foreground text-pretty line-clamp-2">{design.effect}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">未找到符合的家园搭配方案</div>
      )}
    </div>
  );
}
