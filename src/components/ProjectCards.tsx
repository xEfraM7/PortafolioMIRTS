import { Col } from "react-bootstrap";

interface Props {
  title: string;
  description: string;
  imgUrl: string;
  href?: string;
}

export const ProjectCards = ({ title, description, imgUrl, href }: Props) => {
  const content = (
    <>
      <img
        src={imgUrl}
        alt={title}
        width={1920}
        height={918}
        loading="lazy"
        decoding="async"
      />
      <div className="proj-txtx">
        <h3>{title}</h3>
        <span>{description}</span>
      </div>
    </>
  );

  return (
    <Col xs={12} sm={6} md={4}>
      <div className="proj-imgbx">
        {href ? (
          <a
            href={href.trim()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none"
            aria-label={`${title} — open in new tab`}
          >
            {content}
          </a>
        ) : (
          content
        )}
      </div>
    </Col>
  );
};
