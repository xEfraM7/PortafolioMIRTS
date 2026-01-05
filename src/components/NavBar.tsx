import { useEffect, useState } from "react";
import { Nav, Navbar, Container } from "react-bootstrap";
import { useLenis } from 'lenis/react';

import logo from "../assets/img/ui/logo.svg";
import navIcon1 from "../assets/img/social/nav-icon1.svg";
import navIcon3 from "../assets/img/social/nav-icon3.svg";
import navIcon4 from "../assets/img/social/nav-icon4.svg";
import navIcon5 from "../assets/img/social/nav-icon5.svg";

export const NavBar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const onUpdateActiveLink = (value: string, anchor?: string) => {
    setActiveLink(value);
    if (anchor && lenis) {
      lenis.scrollTo(anchor, { offset: -400 });
    }
  };

  return (
    <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              href="#home"
              className={
                activeLink === "home" ? "active navbar-link" : "navbar-link"
              }
              onClick={() => onUpdateActiveLink("home", "#home")}
            >
              Home
            </Nav.Link>
            <Nav.Link
              href="#skills"
              className={
                activeLink === "skills" ? "active navbar-link" : "navbar-link"
              }
              onClick={(e) => {
                e.preventDefault();
                onUpdateActiveLink("skills", "#skills");
              }}
            >
              Skills
            </Nav.Link>
            <Nav.Link
              href="#project"
              className={
                activeLink === "projects" ? "active navbar-link" : "navbar-link"
              }
              onClick={(e) => {
                e.preventDefault();
                onUpdateActiveLink("projects", "#project");
              }}
            >
              Projects
            </Nav.Link>
          </Nav>
          <span className="navbar-text">
            <div className="social-icon">
              <a href="https://www.linkedin.com/in/efrain-cabrera-b25489216/">
                <img src={navIcon1} alt="" />
              </a>
              <a href="https://www.instagram.com/efrain_lol/">
                <img src={navIcon3} alt="" />
              </a>
              <a href="https://twitter.com/xEfraCD">
                <img src={navIcon4} alt="" />
              </a>
              <a href="https://github.com/xEfraM7">
                <img src={navIcon5} alt="" />
              </a>
            </div>
            <a href="https://www.linkedin.com/in/efrain-cabrera-b25489216/">
              <button className="vvd">
                <span>Let's Connect</span>
              </button>
            </a>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
