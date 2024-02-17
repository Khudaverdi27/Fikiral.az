import { useEffect, useState } from "react";
import { useModalActions } from "../../../context/LoginModalProvider";
import { useCategories } from "../../../hooks/useCategories";
import { LoadingSpin } from "../../widget/Loading/ThinkSkeleton";
import { useFetchAuthResgistration } from "../../../hooks/useFetch";
import { getStorage, removeStorage, saveStorage } from "../../../utils/helpers";

function FormRegisterConfrim() {
  const [category, checkboxStates, allCategories, loading] = useCategories(
    false,
    "checkbox",
    true
  );
  const [registerAuth, authFetch, authLoading] = useFetchAuthResgistration();
  const [disabled, setDisabled] = useState(true);
  const {
    handleSubmit,
    onSubmit,
    switchLoginModal,
    switcRegisterModal,
    setSubModel,
    resRegister,
    reset,
  } = useModalActions();

  const [confrim, setConfrim] = useState(false);

  const controlRegisterAction = () => {
    setTimeout(() => {
      if (!confrim) {
        setSubModel(false);
        switcRegisterModal(true);
        setConfrim(!confrim);
      } else {
        setSubModel(false);
        switchLoginModal(true);
      }
    }, 2000);
  };

  const skipCategory = () => {
    authFetch(resRegister);
    controlRegisterAction();
    reset();
  };

  const withCategory = () => {
    authFetch(resRegister);
    const trueIndexes = checkboxStates.reduce((acc, state, index) => {
      if (state) {
        //add indexes to trueIndexes
        acc.push(index);
      }
      return acc;
    }, []);
    // find element as trueIndexes array
    const elementsWithCategory = trueIndexes.map(
      (index) => allCategories[index]
    );
    // find element id
    const categories = elementsWithCategory.map((element) => element.id);
    resRegister["categories"] = categories;

    if (!disabled) {
      controlRegisterAction();
    }
    reset();
  };

  useEffect(() => {
    //
    if (registerAuth.status) {
      setConfrim(
        (confrim) =>
          (confrim =
            "Bu mail-də istifadəçi mövcuddur yenidən qeydiyyatdan keçin !")
      );
    }
  }, [registerAuth]);

  useEffect(() => {
    if (checkboxStates.some((c) => c === true)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [checkboxStates]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <div className="text-center font-[500]">
        <h3 className="text-[27px] ">Sizi nələr maraqlandırır?</h3>
        <h4 className="text-[15px] text-[#4D4D4D]">
          Bu ana səhifənizi fərdiləşdirəcək
        </h4>
      </div>
      {loading ? (
        <LoadingSpin />
      ) : (
        <>
          {category.map((c, i) => (
            <div key={i} className="flex w-full flex-wrap">
              {c.title}
            </div>
          ))}
        </>
      )}
      {confrim && <span className="text-red-500 text-[12px] ">{confrim}</span>}
      <button
        onClick={withCategory}
        disabled={disabled}
        className="bg-[#6366F1] font-[500] text-white w-full py-[8px] rounded-[8px] disabled:opacity-50 disabled:cursor-not-allowed"
      >
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
