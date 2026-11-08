import { cn } from "@/lib/utils"
import { Megaphone } from "lucide-react"
import { AD_SLOT_CONFIGS, AD_LOAD_STATUS, type AdSlotType } from "@/data/adSlots"

interface AdSlotProps {
  /** 广告位类型 */
  type: AdSlotType
  /** 自定义容器 className */
  className?: string
  /** 是否显示尺寸标注 */
  showSize?: boolean
}

/**
 * 广告位占位符组件
 *
 * 当前为占位符阶段：渲染灰色虚线边框 + 类型标签 + 尺寸标注，
 * 不发起网络请求，用于布局调试与视觉确认。
 *
 * 后续接入真实广告时，只需在此组件内根据加载状态
 * （placeholder/loading/filled/empty）渲染对应内容即可，
 * 外部调用方式保持不变。
 */
export default function AdSlot({ type, className, showSize = true }: AdSlotProps) {
  const config = AD_SLOT_CONFIGS[type]
  const status = AD_LOAD_STATUS

  // 占位符阶段统一渲染灰色框
  return (
    <div
      className={cn(
        "group relative flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border bg-muted/40 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-muted/60",
        className,
      )}
      data-ad-slot={type}
      data-ad-status={status}
      aria-label={config.label}
    >
      <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground/80">
        <Megaphone className="h-3.5 w-3.5" />
        <span>{config.label}</span>
      </div>
      {showSize && (
        <span className="text-[10px] text-muted-foreground/60">
          {config.size.width} × {config.size.height}
        </span>
      )}
    </div>
  )
}