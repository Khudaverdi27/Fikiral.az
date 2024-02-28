import { Link } from "react-router-dom";
import { useModalActions } from "../../context/LoginModalProvider";
import { getStorage } from "../../utils/helpers";
import ThinkSection from "../home/components/ThinkSections";
import { useFetchThinkPopular, useFetchThinksList } from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import ErrorBoundary from "../../components/common/ErrorBoundary";
import { useSearchActions } from "../../context/FormSearchProvider";

function WelcomePage() {
  const { switcRegisterModal, selectCategory } = useModalActions();
  const token = getStorage("token");
  const [popular, fetchPopular, popularLoading] = useFetchThinkPopular();
  const [data, apiFetch, loading] = useFetchThinksList();
  const [newCategories, setNewCategories] = useState([]);
  const { searchResponse } = useSearchActions();
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
      {filteredCategories.length <= 0 && (
        <div className="h-[70vh] flex flex-col items-center space-y-8 mt-20">
          <h1 className="text-primaryGray text-[52px] font-bold">
            Yeni biznesə fikrini
            <span className="text-indigo-500 ml-2">doğruldaraq</span> başla!
          </h1>
          <div className="w-[770px]">
            <p className="text-2xl text-center leading-10">
              Lorem Ipsum-un keçidlərinin bir çox variantı mövcuddur, lakin
              onların əksəriyyəti inyeksiya edilmiş yumor və ya bir qədər
              inandırıcı görünməyən təsadüfi sözlər vasitəsilə müəyyən formada{" "}
            </p>
          </div>
          <Link
            to={token.length !== 0 && "/home"}
            onClick={switcRegisterModal}
            className="bg-indigo-500 text-center text-white py-[10px]  rounded-xl w-[170px]"
          >
            Başla
          </Link>
        </div>
      )}

      <>
        <ErrorBoundary>
          {!filteredCategories.length > 0 && (
            <ThinkSection
              title={<p className="text-center">Popluyar fikirlər</p>}
              items={popular}
              loading={popularLoading}
            />
          )}
        </ErrorBoundary>
        <ErrorBoundary>
          <ThinkSection
            title={
              <p className="text-center">{`${
                filteredCategories.length > 0
                  ? "Seçdiyiniz kateqoriyalardan..."
                  : "Bütün fikirlər"
              }`}</p>
            }
            items={
              filteredCategories.length > 0 ? filteredCategories : sortedData
            }
            loading={loading}
          />
        </ErrorBoundary>
      </>
    </section>
  );
}

export default WelcomePage;
