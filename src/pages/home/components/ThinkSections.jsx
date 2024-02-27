import { Col, Row } from "antd";
import ThinkCard from "../../../components/widget/Thinks/ThinkCard";
import Section from "../../../components/ui/Section";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useGetUserById } from "../../../hooks/useFetch";
import { getStorage } from "../../../utils/helpers";

function ThinkSection({ items, loading, title }) {
  const [showAll, setShowAll] = useState(false);
  const modifyItems = showAll ? items : items?.slice(0, 6);
  const [userById, getUserFetch, userLoading] = useGetUserById();

  const user = getStorage("user");
  const token = getStorage("token");
  const showAllItems = () => {
    setShowAll(!showAll);
  };

  useEffect(() => {
    if (token.length > 0) {
      getUserFetch(user.userResponse.id);
    }
  }, []);
  return (
    <Section title={title} loading={loading}>
      <Helmet>
        <title>{`Fikir al ${title.length > 0 ? "/" + title : ""}`}</title>
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
        {modifyItems?.map((item) => (
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
            <ThinkCard thinks={item} items={items} userById={userById} />
          </Col>
        ))}
      </Row>
      {items.length > 6 && (
        <div className="flex justify-end text-primaryGray mt-2 text-sm ">
          <button
            onClick={showAllItems}
            className={`hover:bg-indigo-500  space-x-2 hover:text-white rounded-[4px] py-2 px-4 ${
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
