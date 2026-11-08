import { GraduationCap, Gamepad2, ListChecks, Zap, Lightbulb, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import PageMeta from "@/components/common/PageMeta";
import VideoPreview from "@/components/common/VideoPreview";

const basics = [
  { title: "移动与视角", content: "左侧虚拟摇杆控制移动，右侧滑动调整视角。双击闪避可触发冲刺，长按跳跃可攀爬低矮障碍。" },
  { title: "攻击与技能", content: "普通攻击与重击交替可触发连段，技能释放需要消耗能量槽。切换角色可继承部分能量。" },
  { title: "交互与任务", content: "靠近可交互目标会出现提示，主线任务以蓝色标记显示，支线任务为灰色标记。" },
];

const newbieTasks = [
  "完成第一章主线剧情，解锁城市传送点",
  "领取新手七日登录奖励，获取角色黎星",
  "进行一次标准祈愿，熟悉卡池机制",
  "升级一次武器，了解强化系统",
  "完成首次载具试驾，解锁追光摩托",
];

const tips = [
  "优先培养1名输出型角色与1名辅助型角色，避免资源分散",
  "每日完成委托任务与活跃度宝箱，稳定获取养成资源",
  "礼包码与活动奖励优先兑换限定道具，避免过期浪费",
  "加入公会可解锁额外商店与团队副本，提升成长效率",
  "多探索地图彩蛋，可获得隐藏资源与成就奖励",
];

const beginnerVideoUrl = "https://www.bilibili.com/video/BV1xx411c7mD";

export default function BeginnerGuide() {
  return (
    <div className="px-4 md:px-8 py-8 max-w-5xl mx-auto">
      <PageMeta title="新手攻略 - 无限大攻略站" description="《无限大》新手攻略，涵盖基础操作、新手任务流程与快速上手建议。" />
      <div className="flex items-center gap-2 mb-6">
        <GraduationCap className="h-6 w-6 text-primary" />
        <h1 className="text-2xl md:text-3xl font-bold text-foreground">新手攻略</h1>
      </div>

      <div className="space-y-6">
        <VideoPreview url={beginnerVideoUrl} title="新手引导视频" />

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Gamepad2 className="h-5 w-5 text-primary" />
              基础操作
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" defaultValue={["item-0"]}>
              {basics.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{item.title}</AccordionTrigger>
                  <AccordionContent>{item.content}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <ListChecks className="h-5 w-5 text-primary" />
              新手任务流程
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3">
              {newbieTasks.map((task, index) => (
                <li key={index} className="flex items-start gap-3 text-foreground">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                    {index + 1}
                  </span>
                  <span>{task}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              快速上手建议
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-foreground">
                  <Lightbulb className="h-4 w-4 text-accent mt-1 shrink-0" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="flex items-start gap-3 rounded-md border border-warning p-4 text-warning-foreground bg-warning/10">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <div>
            <p className="font-medium">温馨提示</p>
            <p className="text-sm">游戏版本更新可能导致数值与机制变化，建议结合当前版本公告查看攻略。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
