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
        <img src={imgUrl} alt="proj-img" />
        <a
          href={href} target="_blank"
          className="text-decoration-none"
        >
          <div className="proj-txtx">
            <h4>{title}</h4>
            <span>{description}</span>
          </div>
        </a>
      </div>
    </Col>
  );
};
