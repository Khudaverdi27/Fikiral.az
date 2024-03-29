import { Link } from "react-router-dom";
import { useModalActions } from "../../context/LoginModalProvider";
import { getStorage } from "../../utils/helpers";
import ThinkSection from "../home/components/ThinkSections";
import { useFetchThinkPopular, useFetchThinksList } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { useSearchActions } from "../../context/FormSearchProvider";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Col, Row } from "antd";
function WelcomePage() {
  const { switcRegisterModal, selectCategory } = useModalActions();
  const token = getStorage("token");
  const [popular, fetchPopular, popularLoading] = useFetchThinkPopular();
  const [data, apiFetch, loading] = useFetchThinksList();
  const [newCategories, setNewCategories] = useState([]);
  const { searchResponse } = useSearchActions();
  const isMobile = useMediaQuery("only screen and (max-width : 480px)");
  const sortedData = data?.sort((a, b) => b.id - a.id);

  useEffect(() => {
    const categoryFromStorage = getStorage("selectedCategories");
    setNewCategories(categoryFromStorage);
  }, [selectCategory]);

  const filteredCategories = sortedData.filter((item) =>
    newCategories?.includes(item.category.id)
  );

  useEffect(() => {
    fetchPopular();
  }, []);

  useEffect(() => {
    apiFetch();
  }, []);

  return (
    <section>
      {filteredCategories.length <= 0 && searchResponse.length <= 0 && (
        <Row
          className={`text-center ${
            isMobile ? "space-y-3 mx-6" : " space-y-10 my-[100px]"
          }`}
        >
          <Col
            className={`${
              isMobile ? "text-[38px] " : "text-[52px]"
            } text-primaryGray  font-bold dark:text-white`}
            span={24}
          >
            <h1>
              Yeni biznesə fikrini
              <span className="text-indigo-500 ml-2">doğruldaraq</span> başla!
            </h1>
          </Col>
          <Col span={24}>
            <p className={`text-[22px] leading-10 `}>
              Bizim missiyamız biznes ideyalarının mübadiləsi prosesini
              cəmiyyətimizin bütün üzvləri üçün mümkün qədər rahat, effektiv və
              ruhlandırıcı etməkdir.
            </p>
          </Col>
          <Col span={24}>
            <Link to={token.length !== 0 && "/home"}>
              <button
                onClick={switcRegisterModal}
                className="bg-indigo-500 text-base text-center text-white py-[10px]  rounded-xl w-[170px]"
              >
                Başla
              </button>
            </Link>
          </Col>
        </Row>
      )}

      {!filteredCategories.length > 0 && searchResponse.length <= 0 && (
        <ThinkSection
          title={<p className="text-center ">Popluyar fikirlər</p>}
          items={popular?.sort((a, b) => b.likeCount - a.likeCount)}
          loading={popularLoading}
        />
      )}

      <ThinkSection
        title={
          <p className="text-center">{`${
            filteredCategories.length > 0
              ? "Seçdiyiniz kateqoriyalardan"
              : searchResponse.length > 0
              ? "Axtarış nəticələri"
              : "Bütün fikirlər"
          }`}</p>
        }
        items={filteredCategories.length > 0 ? filteredCategories : sortedData}
        loading={loading}
      />
    </section>
  );
}

export default WelcomePage;
