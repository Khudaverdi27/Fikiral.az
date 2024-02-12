import { Modal } from "antd";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

const FormContainer = ({ children, modalName, classs = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <button
        onClick={showModal}
        className={`${classs ? classs : "bg-indigo-500"} py-2 px-4 rounded-xl`}
      >
        {modalName}
      </button>
      <Modal
        width={652}
        centered
        footer={false}
        closable={true}
        closeIcon={<IoMdClose className="text-bold text-black" />}
        className="bg-[#FBFBFB] rounded-[20px]"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form className="flex justify-center items-center pt-10">
          <div className="w-[300px] space-y-3">{children}</div>
        </form>
      </Modal>
    </>
  );
};
export default FormContainer;
