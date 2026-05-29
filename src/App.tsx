import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ReactLenis } from "lenis/react";
import { NavBar } from "./components/layout/NavBar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { SelectedWork } from "./components/sections/SelectedWork";

export const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.resolvedLanguage ?? "en";
  }, [i18n.resolvedLanguage]);

  return (
    <ReactLenis root options={{ anchors: true }}>
      <NavBar />
      <main className="pt-16">
        <Hero />
        <About />
        <SelectedWork />
        <section id="more-work" className="container-page py-section-y-sm">
          <p className="font-mono text-xs uppercase tracking-tighter text-text-tertiary">04 — more work</p>
        </section>
        <section id="archive" className="container-page py-section-y-sm">
          <p className="font-mono text-xs uppercase tracking-tighter text-text-tertiary">05 — archive</p>
        </section>
        <section id="experience" className="container-page py-section-y-sm">
          <p className="font-mono text-xs uppercase tracking-tighter text-text-tertiary">06 — experience</p>
        </section>
        <section id="contact" className="container-page py-section-y-sm">
          <p className="font-mono text-xs uppercase tracking-tighter text-text-tertiary">07 — contact</p>
        </section>
      </main>
      <Footer />
    </ReactLenis>
  );
};
