import { useState, useRef, useCallback, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Menu, Search, Home, BookOpen, MapPin, Library, GraduationCap, CalendarDays, Gift,
  Wrench, Users, Sofa, ChevronDown, Compass, Database, Lightbulb, Trophy, Info,
  Sword, Car, Bug, Crown, UserCircle, Images, MapPinned,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/common/ThemeToggle";
import ScrollToTop from "@/components/common/ScrollToTop";
import AnnouncementBanner from "@/components/common/AnnouncementBanner";
import SiteFooter from "@/components/common/SiteFooter";
import AdSlot from "@/components/common/AdSlot";

interface LeafItem {
  name: string;
  path: string;
  icon: React.ElementType;
  /** 前缀匹配高亮（如 /wiki/character/...） */
  matchPrefix?: string;
}

interface NavGroup {
  name: string;
  icon: React.ElementType;
  children?: LeafItem[];
}

const navGroups: NavGroup[] = [
  {
    name: "攻略指南",
    icon: Compass,
    children: [
      { name: "剧情攻略", path: "/story", icon: BookOpen },
      { name: "场景彩蛋", path: "/easter-eggs", icon: MapPin },
      { name: "新手攻略", path: "/beginner", icon: GraduationCap },
      { name: "活动攻略", path: "/events", icon: CalendarDays },
    ],
  },
  {
    name: "Wiki",
    icon: Database,
    children: [
      { name: "资料库 Wiki", path: "/wiki", icon: Library, matchPrefix: "/wiki" },
      { name: "城市信息", path: "/wiki/cities", icon: MapPinned },
      { name: "强度榜", path: "/tier-list", icon: Trophy },
    ],
  },
  {
    name: "方案推荐",
    icon: Lightbulb,
    children: [
      { name: "改装方案", path: "/modifications", icon: Wrench },
      { name: "搭配方案", path: "/builds", icon: Users },
      { name: "家园搭配方案", path: "/home-designs", icon: Sofa },
    ],
  },
];

const wikiCategories = [
  { name: "角色", path: "/wiki?category=character", icon: Users },
  { name: "武器", path: "/wiki?category=weapon", icon: Sword },
  { name: "载具", path: "/wiki?category=vehicle", icon: Car },
  { name: "怪物", path: "/wiki?category=monster", icon: Bug },
  { name: "Boss", path: "/wiki?category=boss", icon: Crown },
  { name: "NPC", path: "/wiki?category=npc", icon: UserCircle },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path?: string, matchPrefix?: string) => {
    if (matchPrefix) return location.pathname.startsWith(matchPrefix);
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?q=${encodeURIComponent(search.trim())}`);
      setSearch("");
      setMobileOpen(false);
    }
  };

  const brand = (
    <Link to="/" className="flex items-center gap-2 shrink-0">
      <img
        src="/images/logo-light.png"
        alt="无限大攻略站"
        className="h-8 w-auto object-contain block dark:hidden"
      />
      <img
        src="/images/logo-dark.png"
        alt="无限大攻略站"
        className="h-8 w-auto object-contain hidden dark:block"
      />
      <span className="font-bold text-foreground text-lg">无限大攻略站</span>
    </Link>
  );

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/85">
        {/* 顶部公告横幅：置于吸顶容器内，滚动页面时始终保持在顶部不动 */}
        <AnnouncementBanner />
        {/* 第一行：品牌 + 全局搜索 + 主题切换 */}
        <div className="flex items-center gap-3 px-4 md:px-8 h-16">
          <div className="md:hidden shrink-0">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">打开菜单</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0 bg-sidebar border-sidebar-border overflow-y-auto">
                <div className="p-4 border-b border-sidebar-border">
                  <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
                    <img
                      src="/images/logo-light.png"
                      alt="无限大攻略站"
                      className="h-8 w-auto object-contain block dark:hidden"
                    />
                    <img
                      src="/images/logo-dark.png"
                      alt="无限大攻略站"
                      className="h-8 w-auto object-contain hidden dark:block"
                    />
                    <span className="font-bold text-sidebar-foreground text-lg">无限大攻略站</span>
                  </Link>
                </div>
                <div className="p-3">
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="搜索攻略、资料..."
                      className="pl-9 bg-sidebar-accent border-sidebar-border text-sidebar-foreground placeholder:text-muted-foreground"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </form>
                </div>
                <nav className="p-3 space-y-4" aria-label="移动端主导航">
                  <Link
                    to="/"
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                      location.pathname === "/"
                        ? "bg-primary text-primary-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    }`}
                  >
                    <Home className="h-4 w-4 shrink-0" />
                    首页
                  </Link>
                  {navGroups.map((group) => {
                    const GroupIcon = group.icon;
                    return (
                      <div key={group.name}>
                        <p className="px-3 mb-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{group.name}</p>
                        <div className="flex flex-col gap-1">
                          {(group.children ?? []).map((item) => {
                            const ItemIcon = item.icon;
                            const active = isActive(item.path, item.matchPrefix);
                            return (
                              <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setMobileOpen(false)}
                                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                                  active
                                    ? "bg-primary text-primary-foreground"
                                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                                }`}
                              >
                                <ItemIcon className="h-4 w-4 shrink-0" />
                                <span className="truncate">{item.name}</span>
                              </Link>
                            );
                          })}
                          {group.name === "游戏资料" && (
                            <div className="grid grid-cols-2 gap-1 mt-1 pl-6 border-l border-sidebar-border">
                              {wikiCategories.map((cat) => {
                                const CatIcon = cat.icon;
                                return (
                                  <Link
                                    key={cat.name}
                                    to={cat.path}
                                    onClick={() => setMobileOpen(false)}
                                    className="flex items-center gap-2 rounded-md px-2 py-2 text-xs font-medium text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
                                  >
                                    <CatIcon className="h-3.5 w-3.5 shrink-0" />
                                    <span className="truncate">{cat.name}</span>
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  <div>
                    <p className="px-3 mb-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">其他</p>
                    <Link
                      to="/gift-codes"
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive("/gift-codes")
                          ? "bg-primary text-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }`}
                    >
                      <Gift className="h-4 w-4 shrink-0" />
                      礼包码
                    </Link>
                    <Link
                      to="/gallery"
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive("/gallery")
                          ? "bg-primary text-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }`}
                    >
                      <Images className="h-4 w-4 shrink-0" />
                      图片中心
                    </Link>
                    <Link
                      to="/about"
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors ${
                        isActive("/about")
                          ? "bg-primary text-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      }`}
                    >
                      <Info className="h-4 w-4 shrink-0" />
                      关于我们
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {brand}

          <div className="flex items-center gap-2 ml-auto shrink-0">
            <form onSubmit={handleSearch} className="hidden md:flex relative w-64 lg:w-80">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="搜索攻略、资料、礼包码..."
                className="pl-9"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
            <ThemeToggle />
          </div>
        </div>

        {/* 第二行：PC 端分组下拉导航（悬浮展开） */}
        <nav className="hidden md:block border-t border-border/60" aria-label="主导航">
          <div className="flex items-stretch gap-1 px-4 md:px-8">
            <Link
              to="/"
              className={cn(
                "flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 transition-colors",
                location.pathname === "/"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              )}
            >
              <Home className="h-4 w-4 shrink-0" />
              首页
            </Link>

            {navGroups.map((group) => {
              const groupActive = (group.children ?? []).some((c) => isActive(c.path, c.matchPrefix));
              const GroupIcon = group.icon;
              return (
                <HoverDropdown key={group.name} label={group.name} icon={GroupIcon} active={groupActive}>
                  {group.name === "Wiki" ? (
                    <>
                      <DropdownMenuLabel className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Library className="h-3.5 w-3.5" />
                        Wiki 导航
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/wiki" className="cursor-pointer font-medium text-primary">
                          <Library className="h-4 w-4 mr-1" />
                          进入资料库首页
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/wiki/cities" className="cursor-pointer pl-8">
                          <MapPinned className="h-4 w-4 mr-1" />
                          城市信息
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/tier-list" className="cursor-pointer pl-8">
                          <Trophy className="h-4 w-4 mr-1" />
                          强度榜
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel className="text-xs text-muted-foreground">资料库 Wiki 分类</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {wikiCategories.map((cat) => (
                        <DropdownMenuItem key={cat.name} asChild>
                          <Link to={cat.path} className="cursor-pointer pl-8">
                            {cat.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </>
                  ) : (
                    <>
                      <DropdownMenuLabel className="text-xs text-muted-foreground">{group.name}</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {(group.children ?? []).map((item) => (
                        <DropdownMenuItem key={item.path} asChild>
                          <Link to={item.path} className="cursor-pointer">
                            {item.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </>
                  )}
                </HoverDropdown>
              );
            })}

            <Link
              to="/gift-codes"
              className={cn(
                "flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 transition-colors",
                isActive("/gift-codes")
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              )}
            >
              <Gift className="h-4 w-4 shrink-0" />
              礼包码
            </Link>
            <Link
              to="/gallery"
              className={cn(
                "flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 transition-colors",
                isActive("/gallery")
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              )}
            >
              <Images className="h-4 w-4 shrink-0" />
              图片中心
            </Link>
            <Link
              to="/about"
              className={cn(
                "flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 transition-colors",
                isActive("/about")
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              )}
            >
              <Info className="h-4 w-4 shrink-0" />
              关于我们
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 min-w-0 overflow-x-hidden">
        {/* 顶部横幅广告位：铺满屏幕宽度（左右无留白），与主体内容保持间距 */}
        <div className="py-4">
          <AdSlot type="banner-top" className="h-[64px] md:h-[90px] w-full rounded-none" />
        </div>
        {children}
        {/* 底部横幅广告位：铺满屏幕宽度（左右无留白），与主体内容保持间距 */}
        <div className="py-4">
          <AdSlot type="banner-bottom" className="h-[64px] md:h-[90px] w-full rounded-none" />
        </div>
      </main>

      <SiteFooter />
      <ScrollToTop />
    </div>
  );
}

/** 悬浮触发的下拉菜单：鼠标移入触发器延迟展开，移出后延迟收起，避免快速划过时频繁闪烁；内容跟随触发器定位 */
function HoverDropdown({
  label,
  icon: Icon,
  active,
  children,
}: {
  label: string;
  icon: React.ElementType;
  active: boolean;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    if (openTimerRef.current) {
      clearTimeout(openTimerRef.current);
      openTimerRef.current = null;
    }
  }, []);

  // 组件卸载时清理计时器，避免卸载后仍触发状态更新
  useEffect(() => clearTimers, [clearTimers]);

  const scheduleOpen = useCallback(() => {
    clearTimers();
    // 菜单已打开时保持稳定，不重复调度，防止指针微小移动导致状态抖动
    if (open) return;
    openTimerRef.current = setTimeout(() => {
      openTimerRef.current = null;
      setOpen(true);
    }, 100);
  }, [clearTimers, open]);

  const scheduleClose = useCallback(() => {
    clearTimers();
    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = null;
      setOpen(false);
    }, 180);
  }, [clearTimers]);

  // Radix 主动关闭（点击外部/Escape/选中菜单项）时同步清理计时器
  const handleOpenChange = useCallback((next: boolean) => {
    clearTimers();
    setOpen(next);
  }, [clearTimers]);

  return (
    <DropdownMenu open={open} onOpenChange={handleOpenChange} modal={false}>
      <DropdownMenuTrigger
        className={cn(
          "group flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium border-b-2 transition-colors outline-none data-[state=open]:text-primary data-[state=open]:border-primary",
          active
            ? "border-primary text-primary"
            : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
        )}
        onMouseEnter={scheduleOpen}
        onMouseLeave={scheduleClose}
      >
        <Icon className="h-4 w-4 shrink-0" />
        {label}
        <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-300 ease-out group-data-[state=open]:rotate-180" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        sideOffset={2}
        className="w-56 origin-top data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-90 data-[state=closed]:zoom-out-90 data-[state=open]:slide-in-from-top-2 data-[state=closed]:slide-out-to-top-2 duration-300"
        style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
        onMouseEnter={clearTimers}
        onMouseLeave={scheduleClose}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
