import { ReactLenis } from "lenis/react";

export const App = () => {
  return (
    <ReactLenis root options={{ anchors: true }}>
      <div className="min-h-screen bg-bg-base text-text-primary">
        <header className="sticky top-0 z-50 border-b border-border/40 backdrop-blur">
          <div className="container-hero flex h-16 items-center justify-between">
            <span className="font-mono text-sm text-text-tertiary">[ navbar placeholder ]</span>
          </div>
        </header>
        <main>
          <section id="hero" className="container-hero py-section-y-sm">
            <p className="font-mono text-xs uppercase tracking-tighter text-text-tertiary">01 — hero (placeholder)</p>
          </section>
          <section id="about" className="container-page py-section-y-sm">
            <p className="font-mono text-xs uppercase tracking-tighter text-text-tertiary">02 — about (placeholder)</p>
          </section>
          <section id="work" className="container-page py-section-y-sm">
            <p className="font-mono text-xs uppercase tracking-tighter text-text-tertiary">03 — selected work (placeholder)</p>
          </section>
          <section id="more-work" className="container-page py-section-y-sm">
            <p className="font-mono text-xs uppercase tracking-tighter text-text-tertiary">04 — more work (placeholder)</p>
          </section>
          <section id="archive" className="container-page py-section-y-sm">
            <p className="font-mono text-xs uppercase tracking-tighter text-text-tertiary">05 — archive (placeholder)</p>
          </section>
          <section id="experience" className="container-page py-section-y-sm">
            <p className="font-mono text-xs uppercase tracking-tighter text-text-tertiary">06 — experience (placeholder)</p>
          </section>
          <section id="contact" className="container-page py-section-y-sm">
            <p className="font-mono text-xs uppercase tracking-tighter text-text-tertiary">07 — contact (placeholder)</p>
          </section>
        </main>
        <footer className="border-t border-border/40">
          <div className="container-page py-10">
            <p className="font-mono text-xs text-text-tertiary">[ footer placeholder ]</p>
          </div>
        </footer>
      </div>
    </ReactLenis>
  );
};
