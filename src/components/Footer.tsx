import { Container, Row, Col } from "react-bootstrap";
import logo from "../assets/img/ui/logo.svg";
import navIcon1 from "../assets/img/social/nav-icon1.svg";
import navIcon3 from "../assets/img/social/nav-icon3.svg";
import navIcon4 from "../assets/img/social/nav-icon4.svg";
import navIcon5 from "../assets/img/social/nav-icon5.svg";

export const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-item-center">
          <Col sm={6}>
            <img src={logo} alt="Efrain Cabrera" width={100} height={100} />
          </Col>
          <Col sm={6} className="text-center text-sm-end">
            <div className="social-icon">
              <a
                href="https://www.linkedin.com/in/efrain-cabrera-b25489216/"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={navIcon1} alt="" width={16} height={16} />
              </a>
              <a
                href="https://www.instagram.com/efrain_lol/"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={navIcon3} alt="" width={16} height={16} />
              </a>
              <a
                href="https://twitter.com/xEfraCD"
                aria-label="Twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={navIcon4} alt="" width={20} height={20} />
              </a>
              <a
                href="https://github.com/xEfraM7"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={navIcon5} alt="" width={20} height={20} />
              </a>
            </div>
            <p>Copyright 2025. All Rights Reserved WebCoded-Efrain Cabrera</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
