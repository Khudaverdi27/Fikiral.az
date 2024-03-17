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
  const [isPosted, setIsPosted] = useState(false); //post think and refresh state
  const [isCommented, setIsCommented] = useState(false); //post comment and refresh state
  const [selectCategory, setSelectCategory] = useState(false);
  const [withGoogle, setWithGoogle] = useState(false);
  const [withFb, setWithFb] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    setError,
    clearErrors,
    watch,
    setValue,
  } = useForm();

  const onSubmit = async (data) => {
    if (data.userName) {
      setConfrimRegister(false);
      data["categories"] = [];
      setResRegister(data);
      if ((!authCheckMail && !authCheckUsername) || withGoogle || withFb) {
        setMainModel(false);
        setSubModel(true);
      }
    } else {
      loginFetch(data);
    }
  };

  useEffect(() => {
    if (userLoginAuth.tokenResponse) {
      const { accessToken } = userLoginAuth.tokenResponse;
      saveStorage("token", accessToken);
      saveStorage("user", userLoginAuth);
      setLoginAuth(userLoginAuth);
      navigate("/home");
      removeStorage("selectedCategories");
    } else {
      let errorMessage = "";
      if (withGoogle) {
        errorMessage = "Google'a bağlı istifadəçi yoxdur. Hesab yaradın!";
      } else if (withFb) {
        errorMessage = "Facebook'a bağlı istifadəçi yoxdur. Hesab yarat!";
      } else {
        errorMessage = "Mail vəya parol yanlışdır";
        setError("password", {
          type: "manual",
          message: errorMessage,
        });
      }
      setError("gmail", {
        type: "manual",
        message: errorMessage,
      });
    }
  }, [userLoginAuth]);

  const checkMail = (inputMail) => {
    authCheckFetch(inputMail);
  };
  const checkUserName = (inputUsername) => {
    authCheckUsernameFetch(inputUsername);
  };

  useEffect(() => {
    const errorMessage = authCheckMail
      ? "Bu mailde istifadəçi mövcuddur."
      : "Bu mail-də istifadəçi tapılmadı!";
    const errorField = authCheckMail ? "gmail" : "gmailReset";
    if (authCheckMail) {
      setError(errorField, {
        type: "manual",
        message: errorMessage,
      });
      setValue("gmail", "");
    } else {
      clearErrors();
    }
  }, [authCheckMail]);

  useEffect(() => {
    if (authCheckUsername === true) {
      setError("userName", {
        type: "manual",
        message: "Bu adda istifadəçi mövcuddur.",
      });
      setValue("userName", "");
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
    removeStorage("selectedCategories");
    reset();
  };
  const switcRegisterModal = () => {
    clearErrors();
    setMainModel(true);
    setAccesLogin(true);
    removeStorage("selectedCategories");
    reset();
  };

  const [notify, setNotify] = useState([
    "postunuza rəy bildirdi. Baxmaq üçün toxunun.",
    "postunuza rəy bildirdi. Baxmaq üçün toxunun.",
    "postunuza rəy bildirdi. Baxmaq üçün toxunun.",
  ]);

  const actions = {
    setWithFb,
    setWithGoogle,
    setError,
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
    isCommented,
    setIsCommented,
    notify,
    setNotify,
  };

  return <LoginModal.Provider value={actions}>{children}</LoginModal.Provider>;
}

export const useModalActions = () => useContext(LoginModal);
export default ModalProvider;
