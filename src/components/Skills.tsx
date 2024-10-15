import { Container, Col, Row } from "react-bootstrap";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import colorSharp from "../assets/img/color-sharp.png";
import { responsive } from "../helpers/responsiveHelper";
import { icons } from "../helpers/iconsHelper";


export const Skills = () => {
  return (
    <section className="skills" id="skills">
      <Container>
        <Row>
          <Col>
            <div className="skill-bx">
              <h2>Skills</h2>
              <p>Here is a summary of my skills</p>
              <Carousel
                responsive={responsive}
                infinite={true}
                className="skill-slider"
              >
                {icons.map(({ icon, title }) => (
                  <div className="item" key={title}>
                    <img src={icon} alt="image" />
                    <h5>{title}</h5>
                  </div>
                ))}
              </Carousel>
            </div>
          </Col>
        </Row>
      </Container>
      <img className="background-image-left" src={colorSharp} />
    </section>
  );
};
