import { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { saveStorage } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import { useFetchAuthCheckMail, useFetchAuthLogin } from "../hooks/useFetch";

const LoginModal = createContext();

function ModalProvider({ children }) {
  const [isMainModel, setMainModel] = useState(false); // First Model
  const [isSubModel, setSubModel] = useState(false); // Second Model
  const [accescLogin, setAccesLogin] = useState(false);
  const [confrimRegister, setConfrimRegister] = useState(false);
  const [resRegister, setResRegister] = useState({});
  const [authCheckMail, authCheckFetch, authCheckLoading] =
    useFetchAuthCheckMail();
  const [loginAuth, loginFetch, authLoading] = useFetchAuthLogin();
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
    clearErrors,
  } = useForm();

  const onSubmit = async (data) => {
    if (data.userName) {
      setConfrimRegister(false);
      data["categories"] = [];
      setResRegister(data);
      if (authCheckMail !== true) {
        setMainModel(false);
        setSubModel(true);
      }
    } else {
      if (data.gmail) {
        loginFetch(data);
      }
    }
  };

  useEffect(() => {
    if (loginAuth.tokenResponse) {
      saveStorage("token", loginAuth.tokenResponse.accessToken);
      navigate("/home");
    } else {
      setError("gmail", {
        type: "manual",
        message: "Mail vəya parol yanlışdır",
      });
      setError("password", {
        type: "manual",
        message: "Mail vəya parol yanlışdır",
      });
      return;
    }
    setLogin(true);
  }, [loginAuth]);

  const checkMail = async (inputMail) => {
    authCheckFetch({ gmail: inputMail });
  };

  useEffect(() => {
    if (authCheckMail === true) {
      setError("gmail", {
        type: "manual",
        message: "Bu maildə istifadəçi mövcuddur.",
      });
    } else {
      clearErrors();
    }
  }, [authCheckLoading]);

  const onSubModel = (e, stateSub = true, stateMain = false) => {
    e.preventDefault();
    setMainModel(stateMain);
    setSubModel(stateSub);
    setConfrimRegister(true);
    reset();
  };

  const switchLoginModal = () => {
    clearErrors();
    setMainModel(true);
    setAccesLogin(false);
    reset();
  };
  const switcRegisterModal = () => {
    clearErrors();
    setMainModel(true);
    setAccesLogin(true);
    reset();
  };

  const actions = {
    isMainModel,
    setMainModel,
    isSubModel,
    setSubModel,
    accescLogin,
    setAccesLogin,
    onSubModel,
    confrimRegister,
    switchLoginModal,
    switcRegisterModal,
    setConfrimRegister,
    handleSubmit,
    onSubmit,
    register,
    errors,
    reset,
    resRegister,
    setResRegister,
    checkMail,
    loginAuth,
    clearErrors,
  };

  return <LoginModal.Provider value={actions}>{children}</LoginModal.Provider>;
}

export const useModalActions = () => useContext(LoginModal);
export default ModalProvider;
