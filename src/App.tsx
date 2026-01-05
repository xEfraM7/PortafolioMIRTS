import "./App.css";
import { NavBar } from "./components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Banner } from "./components/Banner";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Footer } from "./components/Footer";

import { ReactLenis } from 'lenis/react';

export const App = () => {
  return (
    <ReactLenis root options={{ anchors: true }}>
      <div className="App">
        <NavBar />
        <Banner />
        <Skills />
        <Projects />
        <Footer />
      </div>
    </ReactLenis>
  );
};
