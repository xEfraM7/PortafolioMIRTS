import { Container, Col, Row } from "react-bootstrap";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import colorSharp from "../assets/img/ui/color-sharp.png";
import { icons } from "../helpers/iconsHelper";
import { useCallback } from "react";

const ArrowLeftCircle = ({ size = 35 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.354 4.646a.5.5 0 0 1 0 .708L5.707 8H11.5a.5.5 0 0 1 0 1H5.707l2.647 2.646a.5.5 0 1 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0z" />
  </svg>
);

const ArrowRightCircle = ({ size = 35 }: { size?: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    width={size}
    height={size}
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
  </svg>
);

export const Skills = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 3000 })]
  );

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
                        <img
                          src={icon}
                          alt={title}
                          width={100}
                          height={100}
                          loading="lazy"
                          decoding="async"
                        />
                        <h3>{title}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="embla__prev"
                onClick={scrollPrev}
                aria-label="Previous skills"
              >
                <ArrowLeftCircle size={35} />
              </button>
              <button
                type="button"
                className="embla__next"
                onClick={scrollNext}
                aria-label="Next skills"
              >
                <ArrowRightCircle size={35} />
              </button>
            </div>
          </Col>
        </Row>
      </Container>
      <img
        className="background-image-left"
        src={colorSharp}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        width={776}
        height={1064}
      />
    </section>
  );
};
