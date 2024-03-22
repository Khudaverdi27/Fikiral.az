import { Col, Row } from "antd";
import ThinkCard from "../../../components/widget/Thinks/ThinkCard";
import Section from "../../../components/ui/Section";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useSearchActions } from "../../../context/FormSearchProvider";
import { useLocation } from "react-router-dom";
import { useModalActions } from "../../../context/LoginModalProvider";

function ThinkSection({ items, loading, title }) {
  const [showAll, setShowAll] = useState(false);
  const { searchResponse } = useSearchActions();
  const { userByIdData } = useModalActions();

  let newItems =
    searchResponse.length > 0
      ? searchResponse
      : showAll
      ? items
      : items?.slice(0, 6);

  const showAllItems = () => {
    setShowAll(!showAll);
  };

  const path = useLocation().pathname.split("/").at(-1);

  return (
    <Section title={title} loading={loading}>
      <Helmet>
        <title>{`Fikir al ${path ? "/" + path : ""}`}</title>
      </Helmet>
      <Row
        className="gap-y-5  min-w-[352px] min-h-[280px]  overflow-hidden"
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        {newItems?.map((item) => (
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
            <ThinkCard
              thinks={item}
              items={newItems}
              userByIdData={userByIdData}
            />
          </Col>
        ))}
      </Row>
      {newItems.length > 5 && (
        <div className="flex justify-end text-primaryGray mt-2 text-sm ">
          <button
            onClick={showAllItems}
            className={`hover:bg-indigo-500  dark:text-white space-x-2 hover:text-white rounded-[4px] py-2 px-4 ${
              loading ? "text-white" : ""
            }`}
          >
            {showAll ? "Daha az" : " Hamısına bax"}
          </button>
        </div>
      )}
    </Section>
  );
}

export default ThinkSection;
