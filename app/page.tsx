import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { Footer } from "@/components/site/footer";
import { Header } from "@/components/site/header";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <Section>
          <Container>
            <div className="rounded-xl border border-border bg-card p-10">
              <h1>Home page content will be added next.</h1>
              <p className="mt-4 max-w-2xl">
                Base design tokens and layout are ready. Provide the copy for
                each section and I will populate the full layout.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg">Primary CTA</Button>
                <Button size="lg" variant="secondary">
                  Secondary CTA
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="pt-0">
          <Container>
            <div className="grid gap-6 border-b border-border pb-14 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="text-sm font-semibold text-foreground">
                  Section placeholder
                </p>
                <p className="mt-2">Waiting on final content.</p>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="text-sm font-semibold text-foreground">
                  Section placeholder
                </p>
                <p className="mt-2">Waiting on final content.</p>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
