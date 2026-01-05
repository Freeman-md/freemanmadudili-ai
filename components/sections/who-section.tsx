import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const signals = [
  "Same messages answered every day",
  "Leads slipping through slow follow-ups",
  "Copying data between tools by hand",
  "Operations held together by spreadsheets",
];

export function WhoSection() {
  return (
    <Section className="py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2>This is for you if...</h2>
          <p className="mt-3 text-base text-muted-foreground">
            Manual steps keep interrupting work that should flow.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            If one clear manual process is causing friction, this is a good
            place to start.
          </p>
        </div>
        <div className="mx-auto mt-6 grid max-w-3xl gap-3 sm:grid-cols-2">
          {signals.map((item) => (
            <div
              key={item}
              className="flex items-center gap-4 rounded-xl bg-card px-6 py-3 text-left"
            >
              <span className="h-5 w-0.5 rounded-full bg-primary/25" />
              <p className="text-sm font-semibold text-foreground">{item}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
