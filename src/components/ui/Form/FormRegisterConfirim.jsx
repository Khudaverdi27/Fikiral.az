import { useEffect, useState } from "react";
import { useModalActions } from "../../../context/LoginModalProvider";
import { useCategories } from "../../../hooks/useCategories";
import { LoadingSpin } from "../../widget/Loading/ThinkSkeleton";
import {
  useFetchAuthResgistration,
  useVerifyMail,
} from "../../../hooks/useFetch";
import { useNavigate } from "react-router-dom";

function FormRegisterConfrim() {
  const { category, checkboxStates, allCategories, loading } = useCategories(
    false,
    "checkbox",
    true
  );
  const [registerAuth, authFetch, authLoading] = useFetchAuthResgistration();
  const [verifyRes, verifyFetch, verifyLoading] = useVerifyMail();
  const [disabled, setDisabled] = useState(true);
  const [verifyConfrim, setVerifyConfrim] = useState(true);
  const { handleSubmit, onSubmit, setSubModel, resRegister, reset } =
    useModalActions();

  const navigate = useNavigate();
  const skipCategory = () => {
    authFetch(resRegister).then(() => setVerifyConfrim(false));
    reset();
  };

  const withCategory = () => {
    reset();

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
    authFetch(resRegister).then(() => setVerifyConfrim(false));
  };

  useEffect(() => {
    registerAuth.status === 409 ? setDisabled(true) : setDisabled(false);
  }, [registerAuth]);

  useEffect(() => {
    const interval = setInterval(() => {
      verifyFetch(resRegister.gmail);
    }, [2000]);

    if (verifyRes === true) {
      setVerifyConfrim(true);
      setSubModel(false);
      navigate("/auth");
      return () => clearInterval(interval);
    }
  }, [verifyRes]);

  useEffect(() => {
    if (checkboxStates.some((c) => c === true)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [checkboxStates]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      {!verifyConfrim && (
        <div className="text-center text-base">
          E-mailinizdəki linkə klik edin və gözləyin zəhmət olmasa
        </div>
      )}
      {authLoading || !verifyConfrim ? (
        <LoadingSpin />
      ) : (
        <>
          <div className="text-center font-[500] font-fransisco">
            <h3 className="text-[27px] dark:text-white">
              Sizi nələr maraqlandırır?
            </h3>
            <h4 className="text-[15px] text-[#4D4D4D] dark:text-gray-500">
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
          {registerAuth.status === 409 && (
            <span className="text-red-500">
              Bu mail ilə başqa istifadəçi artıq fərdi hesab açmışdır!
            </span>
          )}
          <button
            onClick={withCategory}
            disabled={disabled}
            className="bg-indigo-500 font-[500] text-white w-full py-[8px] rounded-[8px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Maraqlandığınız sahələri seçin
          </button>
          <button
            disabled={registerAuth.status === 409}
            onClick={skipCategory}
            type="button"
            className="disabled:opacity-20 disabled:cursor-not-allowed w-full py-[8px] font-[500] rounded-[8px] border border-[#262626] dark:border-white dark:text-white"
          >
            Keçin
          </button>
        </>
      )}
    </form>
  );
}

export default FormRegisterConfrim;
