export default function Home() {
  return (
    <main className="flex flex-col min-h-full">
      {/* Minimal nav */}
      <nav className="flex items-center justify-between px-6 py-5 md:px-10">
        <span className="font-heading text-lg font-medium tracking-tight">
          Meridian
        </span>
        <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground font-body">
          <span className="hover:text-foreground transition-colors cursor-pointer">
            Features
          </span>
          <span className="hover:text-foreground transition-colors cursor-pointer">
            About
          </span>
          <span className="hover:text-foreground transition-colors cursor-pointer">
            Contact
          </span>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center justify-center flex-1 px-6 text-center">
        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight leading-[1.05] max-w-4xl">
          Organize your
          <br />
          <span className="text-muted-foreground">daily life</span>
        </h1>

        <p className="mt-8 text-base md:text-lg text-muted-foreground font-body max-w-md leading-relaxed">
          A calm space for your todos, reminders, events, and mindful
          moments. Built for focus, not noise.
        </p>

        <div className="mt-10 flex items-center gap-4">
          <button className="px-6 py-3 bg-foreground text-background rounded-full font-body text-sm font-medium hover:opacity-80 transition-opacity">
            Get Started
          </button>
          <button className="px-6 py-3 border border-border rounded-full font-body text-sm font-medium hover:bg-muted transition-colors">
            Learn More
          </button>
        </div>
      </section>

      {/* Minimal footer */}
      <footer className="px-6 py-6 md:px-10 flex items-center justify-between text-xs text-muted-foreground font-body">
        <span>© 2026 Meridian</span>
        <span>Designed with calm</span>
      </footer>
    </main>
  );
}
