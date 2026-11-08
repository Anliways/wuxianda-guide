import { useMemo, useState } from "react";
import { Gift, Search, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import PageMeta from "@/components/common/PageMeta";
import { giftCodes } from "@/data/mock";

export default function GiftCodes() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return giftCodes;
    return giftCodes.filter((g) =>
      g.code.toLowerCase().includes(query.trim().toLowerCase()) ||
      g.content.toLowerCase().includes(query.trim().toLowerCase())
    );
  }, [query]);

  const copy = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`已复制礼包码 ${code}`);
  };

  return (
    <div className="px-4 md:px-8 py-8">
      <PageMeta title="礼包码 - 无限大攻略站" description="《无限大》有效礼包兑换码集中展示，包含获取渠道与过期时间。" />
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Gift className="h-6 w-6 text-primary" />
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">礼包码</h1>
        </div>
        <div className="relative md:ml-auto w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="搜索礼包码或内容..."
            className="pl-10"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((gift) => (
          <Card key={gift.id} className={gift.isExpired ? "opacity-70" : ""}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant={gift.isExpired ? "secondary" : "default"}>
                      {gift.isExpired ? (
                        <><X className="h-3 w-3 mr-1" />已过期</>
                      ) : (
                        <><Check className="h-3 w-3 mr-1" />有效</>
                      )}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{gift.channel}</span>
                  </div>
                  <CardTitle className="text-lg font-mono mb-2">{gift.code}</CardTitle>
                  <p className="text-sm text-muted-foreground text-pretty mb-2">{gift.content}</p>
                  <p className="text-xs text-muted-foreground">过期时间：{gift.expiredAt}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="shrink-0"
                  disabled={gift.isExpired}
                  onClick={() => copy(gift.code)}
                >
                  复制
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">未找到符合条件的礼包码</div>
      )}
    </div>
  );
}
