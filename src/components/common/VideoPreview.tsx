import { useState } from "react";
import { Play } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toBilibiliEmbedUrl } from "@/lib/video";

interface VideoPreviewProps {
  /** B站视频 BV 号或完整视频页链接 */
  url: string;
  /** 预览区标题，例如 "视频攻略" */
  title?: string;
  /** 视频封面图片 URL */
  poster?: string;
  /** 自定义外层 className */
  className?: string;
}

/** 站内视频预览卡片：点击封面在弹窗中使用 B 站嵌入式播放器播放，支持原生暂停、进度、全屏、音量控制 */
export default function VideoPreview({ url, title = "视频攻略", poster, className }: VideoPreviewProps) {
  const [open, setOpen] = useState(false);
  const embedUrl = toBilibiliEmbedUrl(url);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Card className={cn(className)}>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center justify-between gap-3">
            <span className="flex items-center gap-2">
              <Play className="h-5 w-5 text-primary" />
              {title}
            </span>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="shrink-0">
                点击播放
              </Button>
            </DialogTrigger>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <DialogTrigger asChild>
            <button
              type="button"
              className="group relative block w-full aspect-video overflow-hidden rounded-lg bg-muted text-left"
              aria-label={`播放${title}`}
            >
              {poster ? (
                <img src={poster} alt={title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary/10">
                  <Play className="h-12 w-12 text-primary/60 transition-transform duration-300 group-hover:scale-110" />
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg">
                  <Play className="h-6 w-6 fill-current" />
                </div>
              </div>
            </button>
          </DialogTrigger>
        </CardContent>
      </Card>

      <DialogContent className="max-w-[calc(100%-2rem)] md:max-w-4xl p-0 overflow-hidden border-0 bg-background">
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="relative w-full aspect-video bg-black">
          {embedUrl ? (
            <iframe
              key={open ? "open" : "closed"}
              src={open ? embedUrl : ""}
              title={title}
              className="absolute inset-0 h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; gyroscope; picture-in-picture"
              allowFullScreen
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              视频地址无效，无法播放
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
