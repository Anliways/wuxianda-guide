import { useState } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

/** 首页版本重大事件横幅：支持关闭；关闭状态仅保存在内存中，页面刷新/重新加载后恢复初始显示状态；点击跳转到上线公告详情页 */
export default function AnnouncementBanner() {
  // 纯内存状态：每次页面刷新时组件重新挂载，visible 重置为 true，横幅恢复初始显示
  const [visible, setVisible] = useState(true);

  const handleClose = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <Link
      to="/announcements/launch"
      className="relative block w-full bg-gradient-to-r from-primary/10 via-primary/5 to-background border-b border-primary/20 px-4 md:px-8 py-2.5 transition-colors hover:bg-primary/10"
    >
      <div className="flex items-center gap-3 pr-10">
        <span className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <span className="shrink-0 inline-flex items-center rounded-md bg-primary/15 px-2 py-0.5 text-xs font-semibold text-primary">
          重磅上线
        </span>
        <p className="text-sm text-foreground truncate">
          《无限大》游戏上线时间确定！<span className="font-semibold text-primary">2027 年 1 月 15 日</span>正式全平台上线！
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
        onClick={handleClose}
        aria-label="关闭公告"
      >
        <X className="h-4 w-4" />
      </Button>
    </Link>
  );
}
