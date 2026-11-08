import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Library, Search, Users, Sword, Car, Bug, Crown, UserCircle, MapPinned, Trophy } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageMeta from "@/components/common/PageMeta";
import AdSlot from "@/components/common/AdSlot";
import type { Character, Weapon, Vehicle, Monster, Boss, NPC } from "@/types/game";
import { characters, weapons, vehicles, monsters, bosses, npcs } from "@/data/mock";

const categories = [
  { key: "character", label: "角色", icon: Users, data: characters },
  { key: "weapon", label: "武器", icon: Sword, data: weapons },
  { key: "vehicle", label: "载具", icon: Car, data: vehicles },
  { key: "monster", label: "怪物", icon: Bug, data: monsters },
  { key: "boss", label: "Boss", icon: Crown, data: bosses },
  { key: "npc", label: "NPC", icon: UserCircle, data: npcs },
];

const rarityOptions = ["全部", "5", "4", "3"];
const elementOptions = ["全部", "雷", "风", "火", "暗", "物理"];

export default function Wiki() {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "character";
  const [query, setQuery] = useState("");
  const [rarity, setRarity] = useState("全部");
  const [element, setElement] = useState("全部");

  const activeCategory = categories.find((c) => c.key === category) || categories[0];

  const filtered = useMemo(() => {
    let result = activeCategory.data as (Character | Weapon | Vehicle | Monster | Boss | NPC)[];
    if (query.trim()) {
      result = result.filter((item) => item.name.toLowerCase().includes(query.trim().toLowerCase()));
    }
    if (result[0] && "rarity" in result[0] && rarity !== "全部") {
      result = result.filter((item) => "rarity" in item && String(item.rarity) === rarity);
    }
    if (result[0] && "element" in result[0] && element !== "全部") {
      result = result.filter((item) => "element" in item && item.element === element);
    }
    return result;
  }, [activeCategory, query, rarity, element]);

  const setCategory = (value: string) => {
    setSearchParams({ category: value });
    setQuery("");
    setRarity("全部");
    setElement("全部");
  };

  return (
    <div className="px-4 md:px-8 py-8">
      <PageMeta title="Wiki - 无限大攻略站" description="《无限大》角色、武器、载具、怪物、Boss详细数据库，支持搜索与筛选。" />
      <div className="flex items-center gap-2 mb-6">
        <Library className="h-6 w-6 text-primary" />
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">Wiki</h1>
      </div>

      {/* Wiki 快捷入口 */}
      <div className="grid grid-cols-2 md:grid-cols-2 gap-3 mb-6">
        <Link to="/wiki/cities" className="group">
          <Card className="h-full hover:border-accent transition-colors">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-md bg-info/10 flex items-center justify-center">
                <MapPinned className="h-5 w-5 text-info" />
              </div>
              <div className="min-w-0">
                <CardTitle className="text-sm group-hover:text-primary transition-colors">城市信息</CardTitle>
                <p className="text-xs text-muted-foreground truncate">探索游戏内城市与区域</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/tier-list" className="group">
          <Card className="h-full hover:border-accent transition-colors">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 shrink-0 rounded-md bg-primary/10 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0">
                <CardTitle className="text-sm group-hover:text-primary transition-colors">角色强度榜</CardTitle>
                <p className="text-xs text-muted-foreground truncate">T0–T3 强度分级排名</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Tabs value={category} onValueChange={setCategory} className="mb-6">
        <TabsList className="w-full flex flex-wrap h-auto gap-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <TabsTrigger key={cat.key} value={cat.key} className="flex items-center gap-1.5">
                <Icon className="h-4 w-4" />
                <span>{cat.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </Tabs>

      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={`搜索${activeCategory.label}...`}
            className="pl-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {"rarity" in activeCategory.data[0] && (
          <Select value={rarity} onValueChange={setRarity}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="稀有度" />
            </SelectTrigger>
            <SelectContent>
              {rarityOptions.map((o) => (
                <SelectItem key={o} value={o}>{o === "全部" ? "全部稀有度" : `${o}星`}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        {"element" in activeCategory.data[0] && (
          <Select value={element} onValueChange={setElement}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="属性" />
            </SelectTrigger>
            <SelectContent>
              {elementOptions.map((o) => (
                <SelectItem key={o} value={o}>{o}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.slice(0, 3).map((item) => (
          <Link key={item.id} to={`/wiki/${activeCategory.key}/${item.id}`}>
            <Card className="h-full hover:border-accent transition-colors">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center text-primary font-bold text-lg">
                    {item.name[0]}
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="text-base truncate">{item.name}</CardTitle>
                    {"rarity" in item && (
                      <div className="flex gap-0.5">
                        {Array.from({ length: item.rarity }).map((_, i) => (
                          <span key={i} className="text-accent text-xs">★</span>
                        ))}
                      </div>
                    )}
                    {"tier" in item && (
                      <Badge className="mt-1 text-xs bg-primary text-primary-foreground">{item.tier}</Badge>
                    )}
                    {"level" in item && <Badge variant="outline" className="mt-1">Lv.{item.level}</Badge>}
                    {"function" in item && <Badge variant="outline" className="mt-1">{item.role}</Badge>}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-pretty line-clamp-2">{item.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
        {/* 信息流广告位：全宽铺满，与资料卡片网格保持一致宽度 */}
        <AdSlot type="in-feed" className="h-[180px] md:col-span-3 w-full" />
        {filtered.slice(3).map((item) => (
          <Link key={item.id} to={`/wiki/${activeCategory.key}/${item.id}`}>
            <Card className="h-full hover:border-accent transition-colors">
              <CardContent className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-md bg-muted flex items-center justify-center text-primary font-bold text-lg">
                    {item.name[0]}
                  </div>
                  <div className="min-w-0">
                    <CardTitle className="text-base truncate">{item.name}</CardTitle>
                    {"rarity" in item && (
                      <div className="flex gap-0.5">
                        {Array.from({ length: item.rarity }).map((_, i) => (
                          <span key={i} className="text-accent text-xs">★</span>
                        ))}
                      </div>
                    )}
                    {"tier" in item && (
                      <Badge className="mt-1 text-xs bg-primary text-primary-foreground">{item.tier}</Badge>
                    )}
                    {"level" in item && <Badge variant="outline" className="mt-1">Lv.{item.level}</Badge>}
                    {"function" in item && <Badge variant="outline" className="mt-1">{item.role}</Badge>}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-pretty line-clamp-2">{item.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          未找到符合条件的{activeCategory.label}
        </div>
      )}
    </div>
  );
}
