import { Modal } from "antd";
import { IoMdClose } from "react-icons/io";
import FormResetPassword from "./FormResetPassword";
import { useModalActions } from "../../../context/LoginModalProvider";

const FormContainer = ({ children }) => {
  const {
    switchLoginModal,
    switcRegisterModal,
    isMainModel,
    setMainModel,
    isSubModel,
    onSubModel,
  } = useModalActions();
  return (
    <>
      <button
        onClick={switchLoginModal}
        className=" border border-white whitespace-nowrap  text-indigo-500 py-2 px-4 rounded-xl"
      >
        Daxil ol
      </button>
      <button
        onClick={switcRegisterModal}
        className=" border   bg-indigo-500 text-white py-2 px-4 rounded-xl"
      >
        Qeydiyyat
      </button>

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
          <div className="w-[300px] space-y-3">
            <FormResetPassword />
          </div>
        </div>
      </Modal>
    </>
  );
};
export default FormContainer;
