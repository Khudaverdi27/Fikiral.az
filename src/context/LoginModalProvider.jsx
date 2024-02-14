import { createContext, useContext, useState } from "react";
import { useForm } from "react-hook-form";

const LoginModal = createContext();

function ModalProvider({ children }) {
  const [isMainModel, setMainModel] = useState(false); // First Model
  const [isSubModel, setSubModel] = useState(false); // Second Model
  const [accescLogin, setAccesLogin] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
    setResetPassword(true);
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
    resetPassword,
    setResetPassword,
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
