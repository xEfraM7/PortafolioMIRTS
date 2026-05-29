import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ReactLenis } from "lenis/react";
import { NavBar } from "./components/layout/NavBar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { SelectedWork } from "./components/sections/SelectedWork";
import { MoreWork } from "./components/sections/MoreWork";
import { Archive } from "./components/sections/Archive";
import { Experience } from "./components/sections/Experience";
import { Contact } from "./components/sections/Contact";

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
        <MoreWork />
        <Archive />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </ReactLenis>
  );
};
