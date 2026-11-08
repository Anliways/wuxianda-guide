import { Images } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import PageMeta from "@/components/common/PageMeta";

const galleryImages = [
  { src: "https://miaoda-conversation-file.cdn.bcebos.com/user-bxvsopsf0g00/app-e1nndy02f37l/20260829/screenshot-1787991309568.png", alt: "都市黎明剧情攻略" },
  { src: "https://miaoda-conversation-file.cdn.bcebos.com/user-bxvsopsf0g00/app-e1nndy02f37l/20260829/screenshot-1787991358542.png", alt: "角色黎星资料" },
  { src: "https://miaoda-conversation-file.cdn.bcebos.com/user-bxvsopsf0g00/app-e1nndy02f37l/20260829/screenshot-1787991377458.png", alt: "苍穹暴击流改装方案" },
];

/** 图片中心：集中展示游戏攻略、角色与方案相关的图片素材 */
export default function Gallery() {
  return (
    <div className="px-4 md:px-8 py-8 max-w-6xl mx-auto">
      <PageMeta title="图片中心 - 无限大攻略站" description="《无限大》游戏攻略、角色资料与方案推荐相关的图片素材集中展示。" />

      <div className="flex items-center gap-3 mb-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Images className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">图片中心</h1>
          <p className="text-sm text-muted-foreground">游戏攻略、角色资料与方案图片素材</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {galleryImages.map((img, index) => (
          <Card key={index} className="overflow-hidden group">
            <CardContent className="p-0">
              <div className="aspect-video w-full bg-muted">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <p className="px-4 py-3 text-sm font-medium text-foreground truncate">{img.alt}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
