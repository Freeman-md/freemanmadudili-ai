import { cn } from "@/lib/utils";

type ProgressDotsProps = {
  total: number;
  activeIndex: number;
  className?: string;
};

export function ProgressDots({ total, activeIndex, className }: ProgressDotsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === activeIndex;

        return (
          <span
            key={`dot-${index}`}
            className={cn(
              "h-2 rounded-full border border-border transition-all duration-300 ease-in-out",
              isActive ? "w-8 bg-primary border-primary" : "w-2 bg-transparent"
            )}
          />
        );
      })}
    </div>
  );
}
