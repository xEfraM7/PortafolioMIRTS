import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
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
            <Tab.Container id="projects-tabs" defaultActiveKey="first">
              <Nav
                variant="pills"
                className="nav-pills mb-5 justify-content-center align-items-center"
                id="pills"
              >
                <Nav.Item>
                  <Nav.Link
                  >
                    Own Projects
                  </Nav.Link>
                </Nav.Item>
              </Nav>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <Row>
                    {projects.map((project, index) => {
                      return <ProjectCards key={index} {...project} />;
                    })}
                  </Row>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
      <img className="background-image-right" src={colorSharp2} />
    </section>
  );
};
