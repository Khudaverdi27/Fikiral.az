import { Modal } from "antd";
import { IoMdClose } from "react-icons/io";
import FormResetPassword from "./FormResetPassword";
import { useModalActions } from "../../../context/LoginModalProvider";
import FormRegisterConfrim from "./FormRegisterConfirim";
import { useMediaQuery } from "@uidotdev/usehooks";

const FormContainer = ({ children }) => {
  const {
    confrimRegister,
    switchLoginModal,
    switcRegisterModal,
    isMainModel,
    setMainModel,
    isSubModel,
    onSubModel,
  } = useModalActions();
  const isMobile = useMediaQuery("only screen and (max-width : 480px)");
  return (
    <>
      <div
        className={`${
          isMobile && "flex justify-between mt-5"
        } space-x-3 shrink-0`}
      >
        <button
          onClick={switchLoginModal}
          className={`${
            isMobile
              ? "px-[52px]  border-indigo-500 border-[0.2px]"
              : "px-4 py-2 hover:outline outline-indigo-500 outline-[0.2px]"
          }  whitespace-nowrap  text-indigo-500   rounded-xl ml-[-8px]
         `}
        >
          Daxil ol
        </button>
        <button
          onClick={switcRegisterModal}
          className={`border dark:border-[#22303c]  bg-indigo-500 text-white py-2 rounded-xl ${
            isMobile ? "px-[52px]" : "px-4"
          }`}
        >
          Qeydiyyat
        </button>
      </div>

      <Modal
        width={652}
        centered
        footer={false}
        closable={true}
        closeIcon={<IoMdClose className="text-bold text-black" />}
        className="bg-[#FBFBFB] rounded-[20px]"
        open={isMainModel}
        onOk={() => setMainModel(false)}
        onCancel={() => setMainModel(false)}
      >
        <div className="flex justify-center items-center pt-7">
          <div className="w-[300px] space-y-3">{children}</div>
        </div>
      </Modal>
      <Modal
        centered
        footer={false}
        closable={true}
        closeIcon={<IoMdClose className="text-bold text-black" />}
        className="bg-[#FBFBFB] rounded-[20px]"
        open={isSubModel}
        onOk={(e) => onSubModel(e, false)}
        onCancel={(e) => onSubModel(e, false)}
      >
        <div className="flex justify-center items-center pt-10">
          <div
            className={`${
              confrimRegister ? "w-[300px]" : "w-[455px]"
            }  space-y-3`}
          >
            {confrimRegister ? <FormResetPassword /> : <FormRegisterConfrim />}
          </div>
        </div>
      </Modal>
    </>
  );
};
export default FormContainer;
