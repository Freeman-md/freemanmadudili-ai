import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const faqs = [
  {
    question: "How long does it take?",
    answer:
      "QuickStart takes 48–72 hours. Ecosystem projects take 4–6 weeks.",
  },
  {
    question: "What do you need from me?",
    answer: "Access to the tools involved and clarity on the manual process.",
  },
  {
    question: "Do you offer ongoing support?",
    answer:
      "QuickStart includes 7 days of support. Ecosystem projects include 30 days. Retainers are optional after delivery.",
  },
  {
    question: "Is this AI-based?",
    answer:
      "Only when necessary. Systems are deterministic and predictable by default.",
  },
];

export function FaqsSection() {
  return (
    <Section className="bg-card">
      <Container>
        <div>
          <h2>FAQs</h2>
          <p className="mt-3 max-w-2xl">
            Direct answers to help you decide quickly.
          </p>
        </div>

        <div className="mt-10 grid gap-4">
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-border bg-background p-6"
            >
              <h3 className="text-lg">{faq.question}</h3>
              <p className="mt-3 text-sm">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
