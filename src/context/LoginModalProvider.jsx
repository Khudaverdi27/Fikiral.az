import { createContext, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getStorage, removeStorage, saveStorage } from "../utils/helpers";
import { useNavigate } from "react-router-dom";
import {
  useFetchAuthCheckMail,
  useFetchAuthCheckUserName,
  useFetchAuthLogin,
  useGetNotifyUserById,
  useGetUserById,
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
  const [userById, getUserFetch, userLoading] = useGetUserById();
  const [userByIdData, setUserById] = useState([]); //for use all pages
  const [notifyRes, getUserNotify, notifyResloading] = useGetNotifyUserById();
  const navigate = useNavigate();
  const token = getStorage("token");
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
    saveStorage("admin", "admin");
    if (data.userName) {
      setConfrimRegister(false);
      data["categories"] = [];
      setResRegister(data);

      if ((!authCheckMail && !authCheckUsername) || withGoogle || withFb) {
        setMainModel(false);
        setSubModel(true);
      }
    } else {
      setResRegister(data);
      loginFetch(data);
    }
  };

  useEffect(() => {
    if (userLoginAuth.tokenResponse) {
      setLoginAuth(userLoginAuth);
      const isAdmin = userLoginAuth.userResponse.roleType === "ADMIN";
      navigate(isAdmin ? "/dashboard" : "/home");
      removeStorage("selectedCategories");
    } else {
      let errorMessage = "";
      if (withGoogle) {
        authCheckFetch(resRegister.gmail);
        if (userLoginAuth.status === 404) {
          errorMessage = "Google'a bağlı istifadəçi yoxdur. Hesab yaradın!";
          setError("gmail", { type: "manual", message: errorMessage });
        } else if (userLoginAuth.status === 500 && withGoogle && !accescLogin) {
          errorMessage = "Google'a bağlı şifrə yanlışdır";
          setError("password", { type: "manual", message: errorMessage });
        }
      } else if (withFb) {
        errorMessage = "Facebook'a bağlı istifadəçi yoxdur. Hesab yarat!";
        setError("gmail", { type: "manual", message: errorMessage });
      } else if (userLoginAuth.status === 500) {
        errorMessage = "Daxil etdiyiniz şifrə yanlışdır";
        setError("password", { type: "manual", message: errorMessage });
      } else if (userLoginAuth.status === 404) {
        errorMessage = "Bu mail-də hesab tapılmadı";
        setError("gmail", { type: "manual", message: errorMessage });
      }
    }
  }, [userLoginAuth, authCheckMail]);

  useEffect(() => {
    if (userLoginAuth?.userResponse?.id) {
      getUserFetch(userLoginAuth.userResponse.id);
    }
  }, [userLoginAuth]);

  useEffect(() => {
    if (userById.id) {
      setUserById(userById);
      getUserNotify(userById.id);
      saveStorage("token", userLoginAuth?.tokenResponse?.accessToken || token);
      saveStorage("userId", userById.id);
    }
  }, [userById]);

  const checkMail = (inputMail) => {
    if (inputMail) {
      authCheckFetch(inputMail);
    }
  };
  const checkUserName = (inputUsername) => {
    if (inputUsername) {
      authCheckUsernameFetch(inputUsername);
    }
  };

  useEffect(() => {
    const errorMessage = authCheckMail
      ? "Bu mail-də istifadəçi mövcuddur."
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

  const actions = {
    getUserFetch,
    userLoginAuthLoading,
    setUserById,
    userByIdData,
    userById,
    userLoading,
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
    notifyRes,
    notifyResloading,
  };

  return <LoginModal.Provider value={actions}>{children}</LoginModal.Provider>;
}

export const useModalActions = () => useContext(LoginModal);
export default ModalProvider;
