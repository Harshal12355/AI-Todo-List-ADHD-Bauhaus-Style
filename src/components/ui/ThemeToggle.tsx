import { useTheme } from "@/contexts/ThemeContext";
import { Switch } from "@/components/ui/switch";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">
        {theme === "light" ? "Light" : "Dark"}
      </span>
      <Switch checked={theme === "dark"} onCheckedChange={toggleTheme} />
    </div>
  );
};
