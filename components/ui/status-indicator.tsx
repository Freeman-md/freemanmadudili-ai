import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

type StatusIndicatorState = "pending" | "active" | "complete";

type StatusIndicatorProps = {
  state: StatusIndicatorState;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export function StatusIndicator({
  state,
  size = "md",
  className,
}: StatusIndicatorProps) {
  if (state === "complete") {
    return (
      <span
        className={cn(
          "flex items-center justify-center rounded-full bg-primary/10 text-primary",
          sizeClasses[size],
          className
        )}
      >
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>
    );
  }

  if (state === "active") {
    return (
      <span
        className={cn("relative inline-flex items-center justify-center", sizeClasses[size], className)}
        aria-hidden="true"
      >
        <span
          className={cn(
            "absolute inset-0 rounded-full bg-[conic-gradient(#2563eb_0_12deg,transparent_12deg_24deg)]",
            "animate-[spin_1.2s_linear_infinite]"
          )}
        />
        <span className="absolute inset-[2px] rounded-full bg-background" />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex rounded-full border border-border",
        sizeClasses[size],
        className
      )}
    />
  );
}
