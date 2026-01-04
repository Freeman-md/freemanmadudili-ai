import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const bullets = [
  "Teams replying to the same messages every day",
  "Businesses losing leads due to slow or inconsistent follow-ups",
  "Founders copying data between tools manually",
  "Operations held together by spreadsheets and human effort",
];

export function WhoSection() {
  return (
    <Section className="bg-card">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2>Who this is for</h2>
            <p className="mt-3 max-w-lg">
              This is for growing businesses that are tired of manual work
              slowing them down.
            </p>
            <p className="mt-6 max-w-lg text-sm font-semibold text-foreground">
              If one clear manual process is causing friction, this is for you.
            </p>
          </div>
          <div className="grid gap-4">
            {bullets.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-border bg-background p-5"
              >
                <p className="text-sm font-semibold text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
