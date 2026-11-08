import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

/** 返回顶部按钮：滚动超过一屏时显示，点击平滑回到顶部 */
export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <Button
      size="icon"
      className="fixed bottom-6 right-6 z-40 rounded-full shadow-lg"
      onClick={scrollToTop}
      aria-label="返回顶部"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
}
