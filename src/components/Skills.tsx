import { Container, Col, Row } from "react-bootstrap";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from 'embla-carousel-autoplay';
import colorSharp from "../assets/img/ui/color-sharp.png";
import { icons } from "../helpers/iconsHelper";
import { useCallback } from "react";
import { ArrowLeftCircle, ArrowRightCircle } from 'react-bootstrap-icons';

export const Skills = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay({ delay: 3000 })]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="skills" id="skills">
      <Container>
        <Row>
          <Col>
            <div className="skill-bx">
              <h2>Skills</h2>
              <p>Here is a summary of my skills</p>

              <div className="embla" ref={emblaRef}>
                <div className="embla__container">
                  {icons.map(({ icon, title }) => (
                    <div className="embla__slide" key={title}>
                      <div className="item">
                        <img src={icon} alt={title} />
                        <h5>{title}</h5>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button className="embla__prev" onClick={scrollPrev}>
                <ArrowLeftCircle size={35} />
              </button>
              <button className="embla__next" onClick={scrollNext}>
                <ArrowRightCircle size={35} />
              </button>

            </div>
          </Col>
        </Row>
      </Container>
      <img className="background-image-left" src={colorSharp} />
    </section>
  );
};
