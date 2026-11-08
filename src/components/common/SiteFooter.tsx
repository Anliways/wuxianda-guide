import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Infinity as InfinityIcon, Users, MessageCircle, Mail,
  ExternalLink, Copy, Check, QrCode,
} from "lucide-react";
import QRCodeDataUrl from "@/components/ui/qrcodedataurl";

/** 联系方式条目：点击复制内容，便于用户快速获取联系途径 */
function ContactItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // 剪贴板不可用时静默失败
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      title="点击复制"
      className="group flex w-full items-center gap-2.5 rounded-md py-1.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-muted-foreground">{label}</span>
        <span className="block text-sm font-medium text-foreground break-words">{value}</span>
      </span>
      {copied ? (
        <Check className="h-3.5 w-3.5 shrink-0 text-primary" />
      ) : (
        <Copy className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      )}
    </button>
  );
}

const contactItems = [
  { icon: Users, label: "玩家QQ群", value: "864212930" },
  { icon: MessageCircle, label: "站长微信", value: "wuxianda2026" },
  { icon: Mail, label: "合作邮箱", value: "contact@wuxianda.wiki" },
];

const friendLinks = [
  { name: "TapTap", url: "https://www.taptap.cn" },
  { name: "Bilibili", url: "https://www.bilibili.com" },
  { name: "NGA 玩家社区", url: "https://bbs.nga.cn" },
  { name: "网易大神", url: "https://ds.163.com" },
];

/** 站点底栏：联系方式、友情链接、公众号入口与版权信息 */
export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* 站点信息 */}
          <div>
            <div className="mb-3 flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-primary">
                <InfinityIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-foreground">无限大攻略站</span>
            </div>
            <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
              专注《无限大》的剧情攻略、场景彩蛋、资料图鉴与活动资讯，由玩家社区共建维护。
            </p>
          </div>

          {/* 联系方式 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">联系方式</h3>
            <div className="flex flex-col">
              {contactItems.map((item) => (
                <ContactItem key={item.label} icon={item.icon} label={item.label} value={item.value} />
              ))}
            </div>
          </div>

          {/* 友情链接 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">友情链接</h3>
            <ul className="flex flex-col">
              {friendLinks.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <span className="truncate">{link.name}</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                  </a>
                </li>
              ))}
              <li>
                <Link to="/about" className="group flex items-center gap-2 py-1.5 text-sm text-muted-foreground transition-colors hover:text-primary">
                  <span className="truncate">关于我们</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* 公众号入口 */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">官方公众号</h3>
            <div className="flex items-center gap-3">
              <div className="shrink-0 rounded-lg border border-border bg-white p-1.5">
                <QRCodeDataUrl text="公众号：无限大攻略站" width={88} />
              </div>
              <div className="min-w-0">
                <p className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                  <QrCode className="h-4 w-4 shrink-0 text-primary" />
                  无限大攻略站
                </p>
                <p className="mt-1 text-pretty text-xs leading-relaxed text-muted-foreground">
                  微信扫码关注，第一时间获取版本资讯、活动提醒与礼包码
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 版权与免责声明 */}
        <div className="mt-8 border-t border-border pt-5 text-center text-xs text-muted-foreground">
          <p>© {year} 无限大攻略站 · 非官方玩家社区，仅供学习交流使用</p>
          <p className="mt-1">《无限大》及相关游戏素材版权归其权利人所有，本站与游戏官方无关</p>
          {/* ICP 备案号占位符：上线前替换为实际备案号 */}
          <p className="mt-2">
            <a
              href="https://beian.miit.gov.cn"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              京ICP备XXXXXXXX号-1
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
