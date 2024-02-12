import { Col, Row } from "antd";
import ChangePage from "../../ui/Pagination";
import ThinkCard from "./ThinkCard";
import { FaArrowRightLong } from "react-icons/fa6";

function ThinkSection({ title, thinks = false }) {
  return (
    <article>
      <h4 className="text-2xl text-primaryGray font-semibold mt-5 mb-6">
        {title}
      </h4>
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

      {title === "Popular fikirlər" ? (
        <ChangePage />
      ) : (
        <div className="flex justify-end text-[#929292] mt-2 text-sm ">
          <button className="hover:bg-[#280069] flex items-center space-x-2 hover:text-white rounded-[4px] py-2 px-4">
            <span> Hamısına bax</span> <FaArrowRightLong />
          </button>
        </div>
      )}
    </article>
  );
}

export default ThinkSection;
