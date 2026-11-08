import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PageMeta from "@/components/common/PageMeta";
import PageBreadcrumb from "@/components/common/PageBreadcrumb";

export default function AnnouncementDetail() {
  const navigate = useNavigate();

  return (
    <div className="px-4 md:px-8 py-8 max-w-4xl mx-auto">
      <PageMeta
        title="上线公告 - 无限大攻略站"
        description="《无限大》游戏上线时间确定！2027 年 1 月 15 日正式全平台上线。"
      />
      <PageBreadcrumb items={[{ label: "公告", path: "/" }, { label: "上线公告" }]} />

      <div className="flex items-center gap-2 mb-3">
        <Badge className="bg-primary text-primary-foreground">重磅上线</Badge>
        <span className="text-sm text-muted-foreground flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5" />
          2026-08-29
        </span>
      </div>

      <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-6 text-balance">
        《无限大》游戏上线时间确定！2027 年 1 月 15 日正式全平台上线！
      </h1>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Megaphone className="h-5 w-5 text-primary" />
            公告详情
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 leading-relaxed text-foreground">
          <p>
            经过多轮测试与调优，《无限大》正式定档 <strong className="text-primary">2027 年 1 月 15 日</strong>，届时将同步登陆 PC、iOS、Android 全平台。
          </p>
          <p>
            为了让各位玩家提前做好准备，我们整理了上线前后的关键时间节点：
          </p>
          <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
            <li>预下载开启：2027 年 1 月 13 日 10:00</li>
            <li>正式开服：2027 年 1 月 15 日 10:00</li>
            <li>开服前瞻直播：2027 年 1 月 10 日 19:30</li>
            <li>预约奖励发放：开服后 7 日内登录即可领取</li>
          </ul>
          <p className="text-muted-foreground">
            敬请关注无限大攻略站与官方社区，我们将第一时间更新开服活动、礼包码、角色评测等实用内容。
          </p>
        </CardContent>
      </Card>

      <Separator className="my-8" />
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ArrowLeft className="h-4 w-4 mr-1" />
          返回
        </Button>
        <Button onClick={() => navigate("/")}>返回首页</Button>
      </div>
    </div>
  );
}
