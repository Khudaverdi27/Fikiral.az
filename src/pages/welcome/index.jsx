import { Link } from "react-router-dom";
import ThinkSection from "../../components/widget/Section/ThinkSection";
import { useModalActions } from "../../context/LoginModalProvider";
import { getStorage } from "../../utils/helpers";

function WelcomePage() {
  const { switcRegisterModal } = useModalActions();
  const token = getStorage("token");
  return (
    <section>
      <div className="h-[70vh] flex flex-col items-center space-y-8 mt-20">
        <h1 className="text-primaryGray text-[52px] font-bold">
          Yeni biznesə fikrini
          <span className="text-[#6366F1] ml-2">doğruldaraq</span> başla!
        </h1>
        <div className="w-[770px]">
          <p className="text-2xl text-center leading-10">
            Lorem Ipsum-un keçidlərinin bir çox variantı mövcuddur, lakin
            onların əksəriyyəti inyeksiya edilmiş yumor və ya bir qədər
            inandırıcı görünməyən təsadüfi sözlər vasitəsilə müəyyən formada{" "}
          </p>
        </div>
        <Link
          to={token && "/home"}
          onClick={switcRegisterModal}
          className="bg-[#6366F1] text-center text-white py-[10px]  rounded-xl w-[170px]"
        >
          Başla
        </Link>
      </div>
      <ThinkSection title={"Popluyar fikirlər"} />
      <ThinkSection title={"Yeni fikirlər"} />
    </section>
  );
}

export default WelcomePage;
