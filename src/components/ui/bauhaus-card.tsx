import { cn } from "@/lib/utils";

interface BauhausCardProps {
  children: React.ReactNode;
  className?: string;
  color?: "red" | "blue" | "yellow" | "black" | "white";
  accent?: "left" | "right" | "top" | "bottom" | "none";
}

const BauhausCard = ({ 
  children, 
  className,
  color = "white",
  accent = "left"
}: BauhausCardProps) => {
  const accentClasses = {
    left: "border-l-8",
    right: "border-r-8",
    top: "border-t-8",
    bottom: "border-b-8",
    none: ""
  };

  const accentColorClasses = {
    red: "border-l-bauhaus-red",
    blue: "border-l-bauhaus-blue",
    yellow: "border-l-bauhaus-yellow",
    black: "border-l-bauhaus-black",
    white: "border-l-white"
  };

  const getAccentClass = () => {
    if (accent === "none") return "";
    return `${accentClasses[accent]} ${
      accent === "left" ? accentColorClasses[color === "white" ? "black" : color] : ""
    }`;
  };

  return (
    <div 
      className={cn(
        "rounded-2xl border-2 border-bauhaus-black p-6 transition-all shadow-sm hover:shadow-md",
        getAccentClass(),
        color === "white" && "bg-white",
        color === "red" && "bg-bauhaus-red text-white",
        color === "blue" && "bg-bauhaus-blue text-white",
        color === "yellow" && "bg-bauhaus-yellow",
        color === "black" && "bg-bauhaus-black text-white",
        className
      )}
    >
      {children}
    </div>
  );
};

export default BauhausCard;
