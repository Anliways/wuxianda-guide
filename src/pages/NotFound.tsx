import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PageMeta from "@/components/common/PageMeta";

export default function NotFound() {
  return (
    <>
      <PageMeta title="页面未找到 - 无限大攻略站" description="页面可能已被删除或不存在。" />
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 py-16 text-center">
        <div className="h-20 w-20 rounded-full bg-gradient-primary flex items-center justify-center mb-6">
          <span className="text-4xl font-bold text-primary-foreground">404</span>
        </div>
        <h1 className="text-2xl md:text-4xl font-bold text-foreground mb-4">
          页面未找到
        </h1>
        <p className="text-base text-muted-foreground max-w-md mb-8 text-pretty">
          页面可能已被删除或不存在，请检查网址是否正确，或返回首页继续浏览。
        </p>
        <Button asChild>
          <Link to="/">返回首页</Link>
        </Button>
      </div>
    </>
  );
}
