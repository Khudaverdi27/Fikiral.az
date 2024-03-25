import { Col, Row } from "antd";
import ThinkCard from "../../../components/widget/Thinks/ThinkCard";
import Section from "../../../components/ui/Section";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useSearchActions } from "../../../context/FormSearchProvider";
import { useLocation } from "react-router-dom";
import { useModalActions } from "../../../context/LoginModalProvider";
import { slice } from "lodash";
import { useMediaQuery } from "@uidotdev/usehooks";

function ThinkSection({ items, loading, title }) {
  const [showAll, setShowAll] = useState(false);
  const { searchResponse } = useSearchActions();
  const { userByIdData } = useModalActions();
  const isMobile = useMediaQuery("only screen and (max-width : 480px)");

  let newItems =
    searchResponse.length > 0
      ? searchResponse
      : showAll
      ? items
      : slice(items, 0, 6);

  const showAllItems = () => {
    setShowAll(!showAll);
  };

  const path = useLocation().pathname.split("/").at(-1);

  return (
    <Section className={"overflow-x-hidden"} title={title} loading={loading}>
      <Helmet>
        <title>{`Fikir al ${path ? "/" + path : ""}`}</title>
      </Helmet>
      <Row
        className={`gap-y-5  ${
          isMobile ? "min-w-[300px] " : "min-w-[352px] min-h-[280px] "
        } `}
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
      {newItems?.length > 5 && (
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
