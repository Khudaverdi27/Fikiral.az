import { createContext, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { saveStorage } from "../utils/helpers";
import { useNavigate } from "react-router-dom";

const LoginModal = createContext();

function ModalProvider({ children }) {
  const [isMainModel, setMainModel] = useState(false); // First Model
  const [isSubModel, setSubModel] = useState(false); // Second Model
  const [accescLogin, setAccesLogin] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    saveStorage("token", 123);
    reset();
    console.log(data);
    if (data.password) {
      navigate("/home");
    }
  };

  const onSubModel = (e, stateSub = true, stateMain = false) => {
    e.preventDefault();
    setMainModel(stateMain);
    setSubModel(stateSub);

    reset();
  };

  const switchLoginModal = () => {
    setMainModel(true);
    setAccesLogin(false);
    reset();
  };
  const switcRegisterModal = () => {
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
    switchLoginModal,
    switcRegisterModal,
    handleSubmit,
    onSubmit,
    register,
    errors,
    reset,
  };

  return <LoginModal.Provider value={actions}>{children}</LoginModal.Provider>;
}

export const useModalActions = () => useContext(LoginModal);
export default ModalProvider;
