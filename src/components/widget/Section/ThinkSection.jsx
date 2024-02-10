import { Col, Row } from "antd";
import ChangePage from "../../ui/Pagination";
import ThinkCard from "./ThinkCard";

function ThinkSection({ title, thinks = false }) {
  return (
    <article>
      <h4 className="text-2xl text-white font-semibold mt-5 mb-6">{title}</h4>
      <Row
        className="gap-y-5  min-w-[352px] min-h-[280px]  overflow-hidden"
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col
          xl={{
            span: 8,
          }}
          lg={{
            span: 12,
          }}
          md={{ span: 12 }}
          sm={{ span: 24 }}
          xs={{ span: 24 }}
        >
          <ThinkCard />
        </Col>
      </Row>

      {title === "Sizin üçün" ? (
        <div className="flex justify-end text-white mt-2 text-sm ">
          <button className="hover:bg-[#280069] rounded-[4px] py-2 px-4">
            Daha Çox
          </button>
        </div>
      ) : (
        <ChangePage />
      )}
    </article>
  );
}

export default ThinkSection;
