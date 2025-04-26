import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface BauhausButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "black" | "blue" | "yellow";
}

const BauhausButton = forwardRef<HTMLButtonElement, BauhausButtonProps>(
  ({ className, variant = "primary", children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "px-8 py-3 rounded-full font-bold text-sm transition-all duration-200 uppercase tracking-wide flex items-center justify-center",
          variant === "primary" && "bg-bauhaus-black text-white hover:bg-bauhaus-black/90",
          variant === "secondary" && "bg-bauhaus-red text-white hover:bg-bauhaus-red/90",
          variant === "black" && "bg-bauhaus-black text-white hover:bg-bauhaus-black/90",
          variant === "blue" && "bg-bauhaus-blue text-white hover:bg-bauhaus-blue/90",
          variant === "yellow" && "bg-bauhaus-yellow text-bauhaus-black hover:bg-bauhaus-yellow/90",
          variant === "outline" && "bg-white border-2 border-bauhaus-black text-bauhaus-black hover:bg-gray-50",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

BauhausButton.displayName = "BauhausButton";

export default BauhausButton;
