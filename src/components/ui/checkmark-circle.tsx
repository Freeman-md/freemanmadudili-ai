import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type CheckmarkCircleProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
  iconClassName?: string;
  strokeWidth?: number;
};

const sizeClasses = {
  sm: "h-5 w-5",
  md: "h-7 w-7",
  lg: "h-8 w-8",
};

const iconSizeClasses = {
  sm: "h-3 w-3",
  md: "h-4 w-4",
  lg: "h-4 w-4",
};

export function CheckmarkCircle({
  size = "md",
  className,
  iconClassName,
  strokeWidth = 3,
}: CheckmarkCircleProps) {
  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-full bg-primary text-primary-foreground",
        sizeClasses[size],
        className
      )}
    >
      <Check
        className={cn(iconSizeClasses[size], iconClassName)}
        strokeWidth={strokeWidth}
      />
    </span>
  );
}
