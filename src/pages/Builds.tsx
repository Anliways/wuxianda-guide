import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Users, Search, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import PageMeta from "@/components/common/PageMeta";
import { builds } from "@/data/mock";

export default function Builds() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return builds;
    return builds.filter((b) =>
      b.name.toLowerCase().includes(query.trim().toLowerCase()) ||
      b.coreCharacter.toLowerCase().includes(query.trim().toLowerCase())
    );
  }, [query]);

  return (
    <div className="px-4 md:px-8 py-8">
      <PageMeta title="搭配方案 - 无限大攻略站" description="《无限大》角色、武器、技能最优搭配组合及适用场景推荐。" />
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">搭配方案</h1>
        </div>
        <div className="relative md:ml-auto w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索方案或核心角色..."
            className="pl-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((build) => (
          <Link key={build.id} to={`/builds/${build.id}`}>
            <Card className="h-full hover:border-accent transition-colors">
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{build.coreCharacter}</Badge>
                      <Badge variant="outline">推荐度 {build.recommendation}/5</Badge>
                    </div>
                    <CardTitle className="text-lg mb-2">{build.name}</CardTitle>
                    <p className="text-sm text-muted-foreground text-pretty line-clamp-2">{build.reason}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {build.skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="font-normal">{skill}</Badge>
                      ))}
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground shrink-0 mt-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">未找到符合条件的搭配方案</div>
      )}
    </div>
  );
}
