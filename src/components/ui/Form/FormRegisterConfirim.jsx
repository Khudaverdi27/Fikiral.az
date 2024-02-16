import { useNavigate } from "react-router-dom";
import { useModalActions } from "../../../context/LoginModalProvider";
import { useCategories } from "../../../hooks/useCategories";
import { saveStorage } from "../../../utils/helpers";

function FormRegisterConfrim() {
  const [categories] = useCategories(false, "checkbox", true);
  const { handleSubmit, onSubmit, setSubModel } = useModalActions();
  const navigate = useNavigate();
  const skipCategory = () => {
    setSubModel(false);
    navigate("/");
    saveStorage("token", 123);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="text-center font-[500]">
        <h3 className="text-[28px] ">Sizi nələr maraqlandırır?</h3>
        <h4 className="text-[16px] text-[#4D4D4D]">
          Bu ana səhifənizi fərdiləşdirəcək
        </h4>
      </div>
      {categories.map((c, i) => (
        <div key={i} className="flex w-full flex-wrap">
          {c.title}
        </div>
      ))}

      <button className="bg-[#6366F1] font-[500] text-white w-full py-[8px] rounded-[8px]">
        Maraqlandığınız sahələri seçin
      </button>
      <button
        onClick={skipCategory}
        type="button"
        className=" w-full py-[8px] font-[500] rounded-[8px] border border-[#262626]"
      >
        Keçin
      </button>
    </form>
  );
}

export default FormRegisterConfrim;
