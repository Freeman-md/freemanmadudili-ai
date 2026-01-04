export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
          <span className="text-sm font-semibold tracking-wide text-foreground">
            Automation Sales Hub
          </span>
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
            Free Workflow Audit
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-16">
        <section className="rounded-xl border border-border bg-card p-10">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            Home page content will be added next.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
            Base design tokens and layout are ready. Provide the copy for each
            section and I will populate the full layout.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90">
              Primary CTA
            </button>
            <button className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-muted">
              Secondary CTA
            </button>
          </div>
        </section>

        <section className="mt-14 grid gap-6 border-b border-border pb-14 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-sm font-semibold text-foreground">
              Section placeholder
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Waiting on final content.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <p className="text-sm font-semibold text-foreground">
              Section placeholder
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Waiting on final content.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 text-xs text-muted-foreground">
          <span>2024 Automation Sales Hub</span>
          <span>Privacy · Terms</span>
        </div>
      </footer>
    </div>
  );
}
