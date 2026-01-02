import { useState, useEffect, useCallback } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/img/ui/header-img.svg";
import "animate.css";
import TrackVisibility from "react-on-screen";

const toRotate = ["Fullstack Developer", "Software Engineer"];

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const period = 1000;

  const tick = useCallback(() => {
    const i = loopNum % toRotate.length;
    const fullText = toRotate[i];
    const updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  }, [loopNum, isDeleting, text.length, period]);

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [delta, tick]);

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={isVisible ? "animate_animated animate_FadeIn" : ""}
                >
                  <span className="tagline">Welcome to my Portfolio</span>
                  <h1>
                    {`Hi, i'm Efra and I'm `}
                    <span className="wrap">{text}</span>
                  </h1>
                  <p>
                    Full-Stack Developer with over 3 years of experience creating
                    responsive and scalable applications using React, Next.js,
                    Laravel, and React Native. I specialize in user-centric
                    platforms and mobile solutions applied in sectors such as
                    hospitality, real estate, and healthcare.
                    <br />
                    <br />
                    Passionate about performance optimization (lazy loading, code
                    splitting), clean UI/UX design, and cross-functional
                    collaboration. I have led frontend architectures, integrated
                    APIs, and launched mobile products with active users on
                    Google Play.
                    <br />
                    <br />
                    Currently, I am looking for opportunities where I can
                    contribute to the development of innovative products and
                    continue growing in technology-driven environments focused
                    on user experience.
                  </p>
                  <a
                    href="https://drive.google.com/file/d/1sGAXoRGEefajNz_hERwppXJIHJlzSXer/view?usp=sharing"
                    className="text-decoration-none"
                  >
                    {/* <button>
                      Get my Cv <ArrowRightCircle size={25} />
                    </button> */}
                  </a>
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <img src={headerImg} alt="header img" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};
