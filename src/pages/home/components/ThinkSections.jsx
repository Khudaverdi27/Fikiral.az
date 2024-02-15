import { Col, Row } from "antd";
import ChangePage from "../../../components/ui/Pagination";
import ThinkCard from "../../../components/widget/Thinks/ThinkCard";
import Section from "../../../components/ui/Section";
import ThinkLoader from "../../../components/widget/Thinks/ThinkSkeleton";

function ThinkSection({ items, loading, title }) {
  return (
    <Section title={title} loading={loading}>
      <Row
        className="gap-y-5  min-w-[352px] min-h-[280px]  overflow-hidden"
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        {items.map((item, index) => (
          <Col
            key={item.id}
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
            <ThinkCard thinks={item} />
          </Col>
        ))}
      </Row>

      {title === "Popluyar fikirlər" ? (
        <ChangePage />
      ) : (
        <div className="flex justify-end text-primaryGray mt-2 text-sm ">
          <button className="hover:bg-[#6366F1]  space-x-2 hover:text-white rounded-[4px] py-2 px-4">
            Hamısına bax
          </button>
        </div>
      )}
    </Section>
  );
}

export default ThinkSection;
