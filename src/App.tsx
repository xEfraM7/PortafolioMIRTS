import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ReactLenis } from "lenis/react";
import { NavBar } from "./components/layout/NavBar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { SelectedWork } from "./components/sections/SelectedWork";
import { MoreWork } from "./components/sections/MoreWork";
import { Contact } from "./components/sections/Contact";

export const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lang = i18n.resolvedLanguage ?? "en";
    document.documentElement.lang = lang;
    document.title = "Efrain Cabrera — Forward Deployed Engineer & Full-Stack AI Developer";
  }, [i18n.resolvedLanguage]);

  return (
    <ReactLenis root options={{ anchors: true }}>
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-text-primary focus:px-4 focus:py-2 focus:text-bg-base"
      >
        Skip to content
      </a>
      <NavBar />
      <main className="pt-16">
        <Hero />
        <About />
        <SelectedWork />
        <MoreWork />
        <Contact />
      </main>
      <Footer />
    </ReactLenis>
  );
};
