import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import headerImg from "../assets/img/header-img.svg";
import "animate.css";
import TrackVisibility from "react-on-screen";

export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const toRotate = ["Front-End Developer", "Data Analyst", "Software Enginner"];
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const period = 1000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
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
  };

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
                    Software Engineer and Front-End Developer with experience in
                    data analysis (SQL, Excel, Python) and web interface
                    development using React, Next.js, and TypeScript. I have
                    worked with databases such as PostgreSQL and MySQL,
                    optimizing queries and designing backend solutions. I
                    possess expertise in responsive design using CSS3 and
                    Tailwind CSS, implementing efficient data manipulation
                    processes that enhance decision-making. I am known for my
                    critical thinking and ability to work collaboratively,
                    providing creative and effective solutions
                  </p>
                  <a
                    href="https://drive.google.com/file/d/16ir9w0sSDbfNtH6TAtgT3VGSOHAZ3AQh/view?usp=drive_link"
                    className="text-decoration-none"
                  >
                    <button>
                      Get my Data Analyst Cv <ArrowRightCircle size={25} />
                    </button>
                  </a>
                  <a href="https://drive.google.com/file/d/1DX80VF4ZiBZbzmFj0YNFPsVpFn3smd6e/view?usp=drive_link" className="text-decoration-none">
                    <button>
                      Get my Web developer Cv <ArrowRightCircle size={25} />
                    </button>
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
