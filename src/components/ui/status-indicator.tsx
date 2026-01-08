import { CheckmarkCircle } from "@/components/ui/checkmark-circle";
import { cn } from "@/lib/utils";

type StatusIndicatorState = "pending" | "active" | "complete";

type StatusIndicatorProps = {
  state: StatusIndicatorState;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeClasses = {
  sm: "h-6 w-6",
  md: "h-7 w-7",
  lg: "h-8 w-8",
};

export function StatusIndicator({
  state,
  size = "md",
  className,
}: StatusIndicatorProps) {
  if (state === "complete") {
    return <CheckmarkCircle size={size} className={className} />;
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
