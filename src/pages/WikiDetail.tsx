import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Sword, Car, Bug, Crown, UserCircle, Radar as RadarIcon, Sparkles, MapPin, MessageSquare, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PageMeta from "@/components/common/PageMeta";
import PageBreadcrumb from "@/components/common/PageBreadcrumb";
import VideoPreview from "@/components/common/VideoPreview";
import AttributeRadar from "@/components/wiki/AttributeRadar";
import { SkillIcon } from "@/components/wiki/SkillIcon";
import { characters, weapons, vehicles, monsters, bosses, npcs } from "@/data/mock";
import type { Character, Weapon, Vehicle, Monster, Boss, NPC } from "@/types/game";

const categoryMap: Record<string, { label: string; icon: React.ElementType }> = {
  character: { label: "角色", icon: Users },
  weapon: { label: "武器", icon: Sword },
  vehicle: { label: "载具", icon: Car },
  monster: { label: "怪物", icon: Bug },
  boss: { label: "Boss", icon: Crown },
  npc: { label: "NPC", icon: UserCircle },
};

type WikiItem = Character | Weapon | Vehicle | Monster | Boss | NPC;

export default function WikiDetail() {
  const { category, id } = useParams<{ category: string; id: string }>();
  const navigate = useNavigate();

  const dataMap: Record<string, WikiItem[]> = {
    character: characters,
    weapon: weapons,
    vehicle: vehicles,
    monster: monsters,
    boss: bosses,
    npc: npcs,
  };

  const item = category ? dataMap[category]?.find((d) => d.id === id) : undefined;
  const meta = category ? categoryMap[category] : null;

  if (!item || !meta) {
    return (
      <div className="px-4 md:px-8 py-16 text-center">
        <p className="text-muted-foreground">未找到该资料</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/wiki")}>
          返回资料库
        </Button>
      </div>
    );
  }

  const Icon = meta.icon;

  const renderStats = (compact = false) => {
    const gridCls = compact ? "grid grid-cols-2 gap-3" : "grid grid-cols-2 md:grid-cols-4 gap-3";
    if ("hp" in item) {
      const statsItem = item as Character | Monster | Boss;
      return (
        <div className={gridCls}>
          <Stat label="生命值" value={statsItem.hp} />
          {"attack" in statsItem && <Stat label="攻击力" value={statsItem.attack} />}
          {"defense" in statsItem && <Stat label="防御力" value={statsItem.defense} />}
          {"level" in statsItem && <Stat label="等级" value={statsItem.level} />}
        </div>
      );
    }
    if ("speed" in item) {
      const vehicleItem = item as Vehicle;
      return (
        <div className={gridCls}>
          <Stat label="速度" value={vehicleItem.speed} />
          <Stat label="耐久度" value={vehicleItem.durability} />
          <Stat label="载员数" value={vehicleItem.capacity} />
        </div>
      );
    }
    if ("range" in item) {
      const weaponItem = item as Weapon;
      return (
        <div className={gridCls}>
          <Stat label="攻击力" value={weaponItem.attack} />
          <Stat label="射程" value={weaponItem.range} />
          <Stat label="弹药容量" value={weaponItem.ammo} />
        </div>
      );
    }
    if ("function" in item) {
      const npcItem = item as NPC;
      return (
        <div className={gridCls}>
          <Stat label="身份" value={npcItem.role} />
          <Stat label="位置" value={npcItem.location} />
          <Stat label="功能" value={npcItem.function} />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="px-4 md:px-8 py-8 max-w-5xl mx-auto">
      <PageMeta title={`${item.name} - ${meta.label} - 无限大攻略站`} description={item.description} />
      <PageBreadcrumb
        items={[
          { label: "资料库 Wiki", path: "/wiki" },
          { label: meta.label, path: `/wiki?category=${category}` },
          { label: item.name },
        ]}
      />

      {/* 顶栏：主要信息展示 */}
      <Card className="mb-6 overflow-hidden">
        <div className="relative bg-gradient-primary px-5 py-6 md:px-8 md:py-8">
          <div className="absolute -right-12 -top-12 h-44 w-44 rounded-full bg-primary-foreground/10 pointer-events-none" />
          <div className="absolute -right-6 -bottom-20 h-36 w-36 rounded-full bg-primary-foreground/10 pointer-events-none" />
          <div className="relative flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <div className="h-16 w-16 md:h-20 md:w-20 shrink-0 rounded-lg bg-primary-foreground/15 border border-primary-foreground/30 flex items-center justify-center text-primary-foreground">
              <Icon className="h-8 w-8 md:h-10 md:w-10" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge className="border-primary-foreground/30 bg-primary-foreground/15 text-primary-foreground hover:bg-primary-foreground/15">{meta.label}</Badge>
                {"rarity" in item && (
                  <span className="text-sm tracking-widest text-primary-foreground">{"★".repeat(item.rarity)}</span>
                )}
                {"tier" in item && (
                  <Badge className="border-primary-foreground/40 bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20">强度 {item.tier}</Badge>
                )}
                {"element" in item && (
                  <Badge variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground">{item.element}属性</Badge>
                )}
                {"role" in item && (
                  <Badge variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground">{item.role}</Badge>
                )}
                {"location" in item && "function" in item && (
                  <Badge variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground">{item.location}</Badge>
                )}
                {"type" in item && (
                  <Badge variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground">{item.type}</Badge>
                )}
                {"level" in item && (
                  <Badge variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground">Lv.{item.level}</Badge>
                )}
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-primary-foreground mb-2 text-balance">{item.name}</h1>
              <p className="text-sm md:text-base leading-relaxed text-primary-foreground/90 text-pretty">{item.description}</p>
            </div>
          </div>
        </div>
      </Card>

      {"radar" in item ? (
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <RadarIcon className="h-5 w-5 text-primary" />
              属性雷达图
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:items-center">
              <div className="h-72 md:h-80 w-full min-w-0">
                <AttributeRadar data={item.radar} />
              </div>
              <div>{renderStats(true)}</div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">基础数据</CardTitle>
          </CardHeader>
          <CardContent>{renderStats()}</CardContent>
        </Card>
      )}

      {"videoUrl" in item && item.videoUrl && (
        <VideoPreview url={item.videoUrl} title="视频介绍" className="mb-6" />
      )}

      <div className="space-y-6">
        {"skills" in item && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-primary" />
                技能列表
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {item.skills.map((skill) => (
                  <div key={skill.name} className="flex gap-3 rounded-lg border border-border bg-muted/40 p-4">
                    <div className="shrink-0 h-11 w-11 rounded-md bg-gradient-primary flex items-center justify-center text-primary-foreground">
                      <SkillIcon name={skill.icon} className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-foreground text-sm md:text-base">{skill.name}</span>
                        <Badge variant="outline" className="font-normal shrink-0">{skill.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed text-pretty">{skill.description}</p>
                      {skill.cost && <p className="text-xs text-muted-foreground mt-1">消耗：{skill.cost}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {"skill" in item && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">攻击模式</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{item.skill}</p>
            </CardContent>
          </Card>
        )}

        {"weakness" in item && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">弱点与打法</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed mb-2"><strong>弱点：</strong>{item.weakness}</p>
              <p className="text-foreground leading-relaxed"><strong>打法建议：</strong>{item.strategy}</p>
            </CardContent>
          </Card>
        )}

        {"effect" in item && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">特殊效果</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{item.effect}</p>
            </CardContent>
          </Card>
        )}

        {"ability" in item && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">特殊能力</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{item.ability}</p>
            </CardContent>
          </Card>
        )}

        {"location" in item && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">出现地点</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{item.location}</p>
            </CardContent>
          </Card>
        )}

        {"obtain" in item && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">获取途径</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{item.obtain}</p>
            </CardContent>
          </Card>
        )}

        {"reward" in item && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <Gift className="h-5 w-5 text-primary" />
                {"function" in item ? "交互奖励" : "击败奖励"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{item.reward}</p>
            </CardContent>
          </Card>
        )}

        {"dialogue" in item && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                经典对话
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {item.dialogue.map((line, index) => (
                  <li key={index} className="flex gap-3 text-foreground leading-relaxed">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-muted text-xs font-medium flex items-center justify-center">{index + 1}</span>
                    <span className="text-pretty">{line}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>

      <Separator className="my-8" />
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => navigate(`/wiki?category=${category}`)}>返回列表</Button>
        <Button onClick={() => navigate("/builds")}>查看搭配方案</Button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-md bg-muted p-3 text-center">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-lg font-bold text-foreground">{value}</p>
    </div>
  );
}
