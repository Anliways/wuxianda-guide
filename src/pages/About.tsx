import { Link } from "react-router-dom";
import {
  Infinity as InfinityIcon, Target, HeartHandshake, Users, Mail, MessageCircle, Sparkles, ArrowRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageMeta from "@/components/common/PageMeta";
import AdSlot from "@/components/common/AdSlot";

const vision = [
  {
    icon: Target,
    title: "我们的使命",
    desc: "为每一位《无限大》玩家提供准确、及时、易用的攻略与资料，让探索无限大世界更加轻松有趣。",
  },
  {
    icon: HeartHandshake,
    title: "我们的愿景",
    desc: "成为最懂玩家的《无限大》社区，汇聚热爱与智慧，共同记录这个世界的每一个精彩瞬间。",
  },
  {
    icon: Sparkles,
    title: "我们的价值观",
    desc: "内容至上、玩家优先、社区共建。坚持原创与严谨，拒绝误导与夸大，做玩家真正信任的攻略站。",
  },
];

const team = [
  { name: "攻略组", role: "内容策划", desc: "负责剧情攻略、强度榜与搭配方案的撰写与更新。" },
  { name: "资料组", role: "数据维护", desc: "维护 Wiki 资料库，确保角色、武器、城市等数据准确。" },
  { name: "运营组", role: "社区运营", desc: "管理玩家社群，跟进活动资讯与礼包码更新。" },
  { name: "技术组", role: "站点开发", desc: "负责站点功能开发、性能优化与日常维护。" },
];

const contacts = [
  { icon: Users, label: "玩家QQ群", value: "864212930" },
  { icon: MessageCircle, label: "站长微信", value: "wuxianda2026" },
  { icon: Mail, label: "合作邮箱", value: "contact@wuxianda.wiki" },
];

export default function About() {
  return (
    <div className="px-4 md:px-8 py-8 max-w-4xl mx-auto">
      <PageMeta title="关于我们 - 无限大攻略站" description="了解无限大攻略站：游戏/团队介绍、愿景使命与联系方式。" />

      {/* 头部 */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-primary mb-4">
          <InfinityIcon className="h-9 w-9 text-primary-foreground" />
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-3 text-balance">关于无限大攻略站</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
          无限大攻略站是一个由玩家自发组建的非官方社区，专注《无限大》的剧情攻略、场景彩蛋、资料图鉴、强度榜与活动资讯。我们由热爱这款游戏的玩家共同维护，致力于为社区提供高质量的内容与服务。
        </p>
      </div>

      {/* 愿景使命 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {vision.map((v) => {
          const Icon = v.icon;
          return (
            <Card key={v.title} className="h-full">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <CardTitle className="text-base">{v.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{v.desc}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* 团队介绍 */}
      <Card className="mb-10">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            团队介绍
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {team.map((t) => (
              <div key={t.name} className="rounded-lg border border-border bg-muted/30 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-foreground">{t.name}</span>
                  <Badge variant="outline" className="text-xs">{t.role}</Badge>
                </div>
                <p className="text-sm text-muted-foreground text-pretty">{t.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 联系方式 */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            联系我们
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contacts.map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="flex items-center gap-3 rounded-lg border border-border p-4">
                  <div className="h-10 w-10 shrink-0 rounded-md bg-accent/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-accent" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{c.label}</p>
                    <p className="text-sm font-medium text-foreground break-words">{c.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* 文章中插广告位 */}
      <AdSlot type="in-article" className="h-[120px] w-full mb-8" />

      <div className="text-center">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
        >
          返回首页
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}