import { Col } from "react-bootstrap";

interface Props {
  title: string
  description: string
  imgUrl: string
  href?: string
}

export const ProjectCards = ({ title, description, imgUrl, href }: Props) => {
  return (
    <Col xs={12} sm={6} md={4}>
      <div className="proj-imgbx">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-decoration-none"
        >
          <img src={imgUrl} alt={title} />
          <div className="proj-txtx">
            <h4>{title}</h4>
            <span>{description}</span>
          </div>
        </a>
      </div>
    </Col>
  );
};
