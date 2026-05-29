import { Container, Row, Col } from "react-bootstrap";
import { ProjectCards } from "./ProjectCards";
import colorSharp2 from "../assets/img/ui/color-sharp2.png";
import { useInView, animated } from '@react-spring/web';
import { projects } from "../helpers/projectsHelper";

export const Projects = () => {
  const [ref, springs] = useInView(
    () => ({
      from: { opacity: 0, y: 100 },
      to: { opacity: 1, y: 0 },
    }),
    {
      rootMargin: '-20% 0px -20% 0px',
    }
  );

  return (
    <section className="project" id="project">
      <Container>
        <Row>
          <Col>
            <animated.div ref={ref} style={springs}>
              <h2>Projects</h2>
              <p>Here is a summary of my projects</p>
            </animated.div>
            <Row>
              {projects.map((project) => (
                <ProjectCards key={project.title} {...project} />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
      <img
        className="background-image-right"
        src={colorSharp2}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        width={667}
        height={1064}
      />
    </section>
  );
};
