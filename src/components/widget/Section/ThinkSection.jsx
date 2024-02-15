import { Col, Row } from "antd";
import ChangePage from "../../ui/Pagination";
import ThinkCard from "./ThinkCard";
import { useFetchThinksList } from "../../../hooks/useFetch";
import { useEffect } from "react";

function ThinkSection({ title }) {
  const [data, apiFetch, loading] = useFetchThinksList();

  useEffect(() => {
    apiFetch();
  }, []);
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
        {data.map((think, index) => (
          <Col
            key={index}
            className="my-5"
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
            <ThinkCard key={index} thinks={think} />
          </Col>
        ))}
      </Row>

      {title === "Popular fikirlər" ? (
        <ChangePage />
      ) : (
        <div className="flex justify-end text-primaryGray mt-2 text-sm ">
          <button className="hover:bg-[#6366F1]  space-x-2 hover:text-white rounded-[4px] py-2 px-4">
            Hamısına bax
          </button>
        </div>
      )}
    </article>
  );
}

export default ThinkSection;
