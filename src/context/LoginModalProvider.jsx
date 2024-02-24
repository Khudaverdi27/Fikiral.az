import { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { removeStorage, saveStorage } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import {
  useFetchAuthCheckMail,
  useFetchAuthCheckUserName,
  useFetchAuthLogin,
} from "../hooks/useFetch";

const LoginModal = createContext();

function ModalProvider({ children }) {
  const [isMainModel, setMainModel] = useState(false); // First Model
  const [isSubModel, setSubModel] = useState(false); // Second Model
  const [accescLogin, setAccesLogin] = useState(false); //register to login
  const [confrimRegister, setConfrimRegister] = useState(false);
  const [resRegister, setResRegister] = useState({}); //response register
  const [authCheckMail, authCheckFetch, authCheckLoading] =
    useFetchAuthCheckMail();
  const [userLoginAuth, loginFetch, userLoginAuthLoading] = useFetchAuthLogin();
  const [authCheckUsername, authCheckUsernameFetch, authCheckUserNameLoading] =
    useFetchAuthCheckUserName();
  const [loginAuth, setLoginAuth] = useState(false); //register or login response
  const [isPosted, setIsPosted] = useState(false); //register or login response

  const [selectCategory, setSelectCategory] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
    clearErrors,
    watch,
  } = useForm();

  const onSubmit = async (data) => {
    if (data.userName) {
      setConfrimRegister(false);
      data["categories"] = [];
      setResRegister(data);
      if (!authCheckMail && !authCheckUsername) {
        setMainModel(false);
        setSubModel(true);
      }
    } else {
      loginFetch(data);
    }
  };

  useEffect(() => {
    if (userLoginAuth.tokenResponse) {
      saveStorage("token", userLoginAuth.tokenResponse.accessToken);
      saveStorage("user", userLoginAuth);

      setLoginAuth(userLoginAuth);
      navigate("/home");
      removeStorage("selectedCategories");
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
  }, [userLoginAuth]);

  const checkMail = (inputMail) => {
    authCheckFetch(inputMail);
  };
  const checkUserName = (inputUsername) => {
    authCheckUsernameFetch(inputUsername);
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

  useEffect(() => {
    if (authCheckUsername === true) {
      setError("userName", {
        type: "manual",
        message: "Bu adda istifadəçi mövcuddur.",
      });
    } else {
      clearErrors();
    }
  }, [authCheckUserNameLoading]);

  const onSubModel = (e, stateSub = true, stateMain = false) => {
    e.preventDefault();
    setMainModel(stateMain);
    setSubModel(stateSub);
    setConfrimRegister(true);
    reset();
    clearErrors();
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
    setSelectCategory,
    selectCategory,
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
    authCheckLoading,
    authCheckUserNameLoading,
    userLoginAuthLoading,
    authCheckMail,
    checkUserName,
    loginAuth,
    setLoginAuth,
    clearErrors,
    setIsPosted,
    watch,
    isPosted,
  };

  return <LoginModal.Provider value={actions}>{children}</LoginModal.Provider>;
}

export const useModalActions = () => useContext(LoginModal);
export default ModalProvider;
