import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "wiki-theme-preference";

/** 明暗主题切换按钮：切换亮色/暗色模式，偏好实时保存至 localStorage */
export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setIsDark(stored === "dark");
      document.documentElement.classList.toggle("dark", stored === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    } catch {
      // 存储不可用时保持当前主题，仅本次会话生效
    }
  };

  return (
    <Button variant="ghost" size="icon" className="relative" onClick={toggleTheme} aria-label={isDark ? "切换为亮色模式" : "切换为暗色模式"}>
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-transform dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-transform dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
