import Link from "next/link";

import { Container } from "@/components/layout/container";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <Container className="flex flex-col gap-4 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>2024 Automation Sales Hub</span>
        <nav className="flex flex-wrap gap-4">
          <Link className="hover:text-foreground" href="/audit">
            Audit
          </Link>
          <Link className="hover:text-foreground" href="/quickstart">
            QuickStart
          </Link>
          <Link className="hover:text-foreground" href="/proof">
            Proof
          </Link>
          <Link className="hover:text-foreground" href="/recruiters">
            Recruiters
          </Link>
        </nav>
      </Container>
    </footer>
  );
}
