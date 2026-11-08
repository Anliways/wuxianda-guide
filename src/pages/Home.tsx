import { Link, useNavigate } from "react-router-dom";
import {
  BookOpen,
  MapPin,
  Library,
  GraduationCap,
  Gift,
  Wrench,
  Users,
  Sofa,
  Search,
  Flame,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageMeta from "@/components/common/PageMeta";
import AdSlot from "@/components/common/AdSlot";
import { storyChapters, activities, giftCodes } from "@/data/mock";

const modules = [
  { name: "剧情攻略", path: "/story", icon: BookOpen, desc: "章节通关路线与剧情解读" },
  { name: "场景彩蛋", path: "/easter-eggs", icon: MapPin, desc: "隐藏彩蛋位置与奖励" },
  { name: "资料库 Wiki", path: "/wiki", icon: Library, desc: "角色、武器、载具、怪物、Boss、NPC" },
  { name: "新手攻略", path: "/beginner", icon: GraduationCap, desc: "基础操作与快速上手" },
  { name: "活动攻略", path: "/events", icon: Gift, desc: "当前活动玩法与奖励" },
  { name: "礼包码", path: "/gift-codes", icon: Gift, desc: "有效兑换码集中展示" },
  { name: "改装方案", path: "/modifications", icon: Wrench, desc: "武器/载具改装推荐" },
  { name: "搭配方案", path: "/builds", icon: Users, desc: "角色、武器、技能组合" },
  { name: "家园搭配", path: "/home-designs", icon: Sofa, desc: "家园装饰与布局优化" },
];

export default function Home() {
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.elements.namedItem("q") as HTMLInputElement).value.trim();
    if (q) navigate(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div className="min-h-screen">
      <PageMeta title="无限大攻略站" description="为《无限大》玩家提供剧情攻略、场景彩蛋、资料库Wiki、新手攻略、活动攻略、礼包码、改装方案等全面攻略信息。" />
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(/images/hero-bg.jpg)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        <div className="relative px-6 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 border border-primary/20">
            <span className="w-2 h-2 rounded-full bg-accent" />
            《无限大》玩家攻略社区
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            无限大攻略站
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 text-pretty">{"一站式攻略平台，助你轻松探索新启市。"}</p>

          <form onSubmit={handleSearch} className="max-w-xl mx-auto relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              name="q"
              placeholder="搜索剧情、角色、武器、礼包码..."
              className="pl-11 h-12 text-base bg-card/90 backdrop-blur border-border"
            />
            <Button type="submit" className="absolute right-1 top-1 h-10">
              搜索
            </Button>
          </form>
        </div>
      </section>
      <section className="px-4 md:px-8 py-10">
        <div className="w-full">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 text-center">攻略模块</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <Link
                  key={module.path}
                  to={module.path}
                  className="group animate-fade-in"
                  style={{ animationDelay: `${index * 60}ms` }}
                >
                  <Card className="h-full hover:border-accent transition-colors duration-150">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="shrink-0 h-10 w-10 rounded-md bg-gradient-primary flex items-center justify-center text-primary-foreground">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <CardTitle className="text-base md:text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                          {module.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground text-pretty">{module.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      {/* 信息流广告位：全宽铺满，与信息流内容保持一致宽度 */}
      <section className="px-4 md:px-8">
        <AdSlot type="in-feed" className="h-[120px] w-full" />
      </section>
      <section className="px-4 md:px-8 py-10 bg-muted/30">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">热门攻略</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {storyChapters.slice(0, 3).map((chapter) => (
                <Link
                  key={chapter.id}
                  to={`/story/${chapter.id}`}
                  className="flex items-center justify-between rounded-md p-3 hover:bg-muted transition-colors"
                >
                  <div className="min-w-0">
                    <p className="font-medium truncate">{chapter.title}</p>
                    <p className="text-sm text-muted-foreground">{chapter.chapter} {chapter.stage}</p>
                  </div>
                  <span className="text-xs text-muted-foreground shrink-0">{chapter.updatedAt}</span>
                </Link>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-accent" />
                <CardTitle className="text-lg">最新活动 & 礼包码</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {activities.slice(0, 2).map((activity) => (
                <Link
                  key={activity.id}
                  to={`/events/${activity.id}`}
                  className="flex items-center justify-between rounded-md p-3 hover:bg-muted transition-colors"
                >
                  <div className="min-w-0">
                    <p className="font-medium truncate">{activity.name}</p>
                    <p className="text-sm text-muted-foreground">{activity.startTime} 至 {activity.endTime}</p>
                  </div>
                  <span className="text-xs text-primary shrink-0">进行中</span>
                </Link>
              ))}
              {giftCodes.filter((g) => !g.isExpired).slice(0, 1).map((code) => (
                <Link
                  key={code.id}
                  to="/gift-codes"
                  className="flex items-center justify-between rounded-md p-3 hover:bg-muted transition-colors"
                >
                  <div className="min-w-0">
                    <p className="font-medium truncate">礼包码 {code.code}</p>
                    <p className="text-sm text-muted-foreground">{code.content}</p>
                  </div>
                  <span className="text-xs text-accent shrink-0">有效</span>
                </Link>
              ))}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
