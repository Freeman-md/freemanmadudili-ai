import Link from "next/link";

import { Container } from "@/components/layout/container";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HeaderProps = {
  brand?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export function Header({
  brand = "Automation Sales Hub",
  ctaLabel = "Free Workflow Audit",
  ctaHref = "/audit",
}: HeaderProps) {
  return (
    <header className="border-b border-border bg-background">
      <Container className="flex items-center justify-between py-5">
        <Link className="text-sm font-semibold tracking-wide text-foreground" href="/">
          {brand}
        </Link>
        <Link className={cn(buttonVariants())} href={ctaHref}>
          {ctaLabel}
        </Link>
      </Container>
    </header>
  );
}
